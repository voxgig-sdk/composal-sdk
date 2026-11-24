package core

import (
	"encoding/json"
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/composal-sdk/go/utility/struct"
)

type ComposalSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewComposalSDK(options map[string]any) *ComposalSDK {
	sdk := &ComposalSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

// The client holds the credential in its options, so a print or a JSON dump
// carries the name alone. Value receivers: a dereferenced client prints the
// same way.
func (sdk ComposalSDK) String() string {
	return "Composal " + vs.Jsonify(map[string]any{"name": "Composal"},
		map[string]any{"indent": 0})
}

func (sdk ComposalSDK) GoString() string {
	return sdk.String()
}

func (sdk ComposalSDK) MarshalJSON() ([]byte, error) {
	return json.Marshal(map[string]any{"name": "Composal"})
}

func (sdk *ComposalSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *ComposalSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *ComposalSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *ComposalSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}
	method = strings.ToUpper(method)

	allowMethodVal := vs.GetPath(options, []any{"allow", "method"})
	if !Allowed(allowMethodVal, method) {
		allowMethod, _ := allowMethodVal.(string)
		return nil, ctx.MakeError("spec_method_allow",
			"Method \""+method+"\" not allowed by SDK option allow.method value: \""+allowMethod+"\"")
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	// A raw request has no point to declare its response type, so it asks
	// for the JSON it reads: an API that negotiates on Accept otherwise
	// answers in its own default format. A caller's own accept wins.
	hasAccept := false
	for k := range ctx.Spec.Headers {
		if strings.ToLower(k) == "accept" {
			hasAccept = true
			break
		}
	}
	if !hasAccept {
		ctx.Spec.Headers["accept"] = "application/json"
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *ComposalSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *ComposalSDK) opAllowed(op string) bool {
	return Allowed(vs.GetPath(sdk.options, []any{"allow", "op"}), op)
}

func (sdk *ComposalSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("ComposalSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *ComposalSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(sdk.rootctx, err)}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(ctx, fetchErr)}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		var bodyErr error
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
			if unreadable, _ := vs.GetProp(fm, "unreadable").(bool); unreadable {
				var failed error
				if status < 200 || status >= 300 {
					failed = ctx.MakeError("request_status",
						fmt.Sprintf("request: %d: %v", status, vs.GetProp(fm, "statusText")))
				}
				bodyErr = UnreadableBody(ctx, status, headers, vs.GetProp(fm, "body"),
					fetchdef["headers"], failed)
			}
		}

		out := map[string]any{
			"ok":      bodyErr == nil && status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}
		if bodyErr != nil {
			out["err"] = sdk.cleanErr(ctx, bodyErr)
		}
		return out, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// A raw request returns its error rather than passing it through MakeError.
func (sdk *ComposalSDK) cleanErr(ctx *Context, err error) error {
	if cleaned, ok := sdk.utility.Clean(ctx, err).(error); ok {
		return cleaned
	}
	return err
}

func (sdk *ComposalSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("ComposalSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Agent returns a Agent entity bound to this client.
// Idiomatic usage: client.Agent(nil).List(nil, nil) or
// client.Agent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Agent(data map[string]any) ComposalEntityBase {
	return NewAgentEntityFunc(sdk, data)
}


// AgentAttachment returns a AgentAttachment entity bound to this client.
// Idiomatic usage: client.AgentAttachment(nil).List(nil, nil) or
// client.AgentAttachment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentAttachment(data map[string]any) ComposalEntityBase {
	return NewAgentAttachmentEntityFunc(sdk, data)
}


// AgentAutomation returns a AgentAutomation entity bound to this client.
// Idiomatic usage: client.AgentAutomation(nil).List(nil, nil) or
// client.AgentAutomation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentAutomation(data map[string]any) ComposalEntityBase {
	return NewAgentAutomationEntityFunc(sdk, data)
}


// AgentAvatar returns a AgentAvatar entity bound to this client.
// Idiomatic usage: client.AgentAvatar(nil).List(nil, nil) or
// client.AgentAvatar(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentAvatar(data map[string]any) ComposalEntityBase {
	return NewAgentAvatarEntityFunc(sdk, data)
}


// AgentCommand returns a AgentCommand entity bound to this client.
// Idiomatic usage: client.AgentCommand(nil).List(nil, nil) or
// client.AgentCommand(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentCommand(data map[string]any) ComposalEntityBase {
	return NewAgentCommandEntityFunc(sdk, data)
}


// AgentComputer returns a AgentComputer entity bound to this client.
// Idiomatic usage: client.AgentComputer(nil).List(nil, nil) or
// client.AgentComputer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentComputer(data map[string]any) ComposalEntityBase {
	return NewAgentComputerEntityFunc(sdk, data)
}


// AgentConnection returns a AgentConnection entity bound to this client.
// Idiomatic usage: client.AgentConnection(nil).List(nil, nil) or
// client.AgentConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentConnection(data map[string]any) ComposalEntityBase {
	return NewAgentConnectionEntityFunc(sdk, data)
}


// AgentControlFlow returns a AgentControlFlow entity bound to this client.
// Idiomatic usage: client.AgentControlFlow(nil).List(nil, nil) or
// client.AgentControlFlow(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentControlFlow(data map[string]any) ComposalEntityBase {
	return NewAgentControlFlowEntityFunc(sdk, data)
}


// AgentCoordination returns a AgentCoordination entity bound to this client.
// Idiomatic usage: client.AgentCoordination(nil).List(nil, nil) or
// client.AgentCoordination(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentCoordination(data map[string]any) ComposalEntityBase {
	return NewAgentCoordinationEntityFunc(sdk, data)
}


// AgentEmail returns a AgentEmail entity bound to this client.
// Idiomatic usage: client.AgentEmail(nil).List(nil, nil) or
// client.AgentEmail(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentEmail(data map[string]any) ComposalEntityBase {
	return NewAgentEmailEntityFunc(sdk, data)
}


// AgentFile returns a AgentFile entity bound to this client.
// Idiomatic usage: client.AgentFile(nil).List(nil, nil) or
// client.AgentFile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentFile(data map[string]any) ComposalEntityBase {
	return NewAgentFileEntityFunc(sdk, data)
}


// AgentInput returns a AgentInput entity bound to this client.
// Idiomatic usage: client.AgentInput(nil).List(nil, nil) or
// client.AgentInput(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentInput(data map[string]any) ComposalEntityBase {
	return NewAgentInputEntityFunc(sdk, data)
}


// AgentIntegration returns a AgentIntegration entity bound to this client.
// Idiomatic usage: client.AgentIntegration(nil).List(nil, nil) or
// client.AgentIntegration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentIntegration(data map[string]any) ComposalEntityBase {
	return NewAgentIntegrationEntityFunc(sdk, data)
}


// AgentInteraction returns a AgentInteraction entity bound to this client.
// Idiomatic usage: client.AgentInteraction(nil).List(nil, nil) or
// client.AgentInteraction(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentInteraction(data map[string]any) ComposalEntityBase {
	return NewAgentInteractionEntityFunc(sdk, data)
}


// AgentLibrary returns a AgentLibrary entity bound to this client.
// Idiomatic usage: client.AgentLibrary(nil).List(nil, nil) or
// client.AgentLibrary(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentLibrary(data map[string]any) ComposalEntityBase {
	return NewAgentLibraryEntityFunc(sdk, data)
}


// AgentManager returns a AgentManager entity bound to this client.
// Idiomatic usage: client.AgentManager(nil).List(nil, nil) or
// client.AgentManager(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentManager(data map[string]any) ComposalEntityBase {
	return NewAgentManagerEntityFunc(sdk, data)
}


// AgentManagerChoice returns a AgentManagerChoice entity bound to this client.
// Idiomatic usage: client.AgentManagerChoice(nil).List(nil, nil) or
// client.AgentManagerChoice(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentManagerChoice(data map[string]any) ComposalEntityBase {
	return NewAgentManagerChoiceEntityFunc(sdk, data)
}


// AgentMarketplace returns a AgentMarketplace entity bound to this client.
// Idiomatic usage: client.AgentMarketplace(nil).List(nil, nil) or
// client.AgentMarketplace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentMarketplace(data map[string]any) ComposalEntityBase {
	return NewAgentMarketplaceEntityFunc(sdk, data)
}


// AgentMarketplaceShared returns a AgentMarketplaceShared entity bound to this client.
// Idiomatic usage: client.AgentMarketplaceShared(nil).List(nil, nil) or
// client.AgentMarketplaceShared(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentMarketplaceShared(data map[string]any) ComposalEntityBase {
	return NewAgentMarketplaceSharedEntityFunc(sdk, data)
}


// AgentMissionControl returns a AgentMissionControl entity bound to this client.
// Idiomatic usage: client.AgentMissionControl(nil).List(nil, nil) or
// client.AgentMissionControl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentMissionControl(data map[string]any) ComposalEntityBase {
	return NewAgentMissionControlEntityFunc(sdk, data)
}


// AgentOperation returns a AgentOperation entity bound to this client.
// Idiomatic usage: client.AgentOperation(nil).List(nil, nil) or
// client.AgentOperation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentOperation(data map[string]any) ComposalEntityBase {
	return NewAgentOperationEntityFunc(sdk, data)
}


// AgentProvisioning returns a AgentProvisioning entity bound to this client.
// Idiomatic usage: client.AgentProvisioning(nil).List(nil, nil) or
// client.AgentProvisioning(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentProvisioning(data map[string]any) ComposalEntityBase {
	return NewAgentProvisioningEntityFunc(sdk, data)
}


// AgentPullRequest returns a AgentPullRequest entity bound to this client.
// Idiomatic usage: client.AgentPullRequest(nil).List(nil, nil) or
// client.AgentPullRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentPullRequest(data map[string]any) ComposalEntityBase {
	return NewAgentPullRequestEntityFunc(sdk, data)
}


// AgentQuestion returns a AgentQuestion entity bound to this client.
// Idiomatic usage: client.AgentQuestion(nil).List(nil, nil) or
// client.AgentQuestion(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentQuestion(data map[string]any) ComposalEntityBase {
	return NewAgentQuestionEntityFunc(sdk, data)
}


// AgentRepository returns a AgentRepository entity bound to this client.
// Idiomatic usage: client.AgentRepository(nil).List(nil, nil) or
// client.AgentRepository(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentRepository(data map[string]any) ComposalEntityBase {
	return NewAgentRepositoryEntityFunc(sdk, data)
}


// AgentResource returns a AgentResource entity bound to this client.
// Idiomatic usage: client.AgentResource(nil).List(nil, nil) or
// client.AgentResource(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentResource(data map[string]any) ComposalEntityBase {
	return NewAgentResourceEntityFunc(sdk, data)
}


// AgentRoutine returns a AgentRoutine entity bound to this client.
// Idiomatic usage: client.AgentRoutine(nil).List(nil, nil) or
// client.AgentRoutine(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentRoutine(data map[string]any) ComposalEntityBase {
	return NewAgentRoutineEntityFunc(sdk, data)
}


// AgentRun returns a AgentRun entity bound to this client.
// Idiomatic usage: client.AgentRun(nil).List(nil, nil) or
// client.AgentRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentRun(data map[string]any) ComposalEntityBase {
	return NewAgentRunEntityFunc(sdk, data)
}


// AgentRuntime returns a AgentRuntime entity bound to this client.
// Idiomatic usage: client.AgentRuntime(nil).List(nil, nil) or
// client.AgentRuntime(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentRuntime(data map[string]any) ComposalEntityBase {
	return NewAgentRuntimeEntityFunc(sdk, data)
}


// AgentSetting returns a AgentSetting entity bound to this client.
// Idiomatic usage: client.AgentSetting(nil).List(nil, nil) or
// client.AgentSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSetting(data map[string]any) ComposalEntityBase {
	return NewAgentSettingEntityFunc(sdk, data)
}


// AgentSharing returns a AgentSharing entity bound to this client.
// Idiomatic usage: client.AgentSharing(nil).List(nil, nil) or
// client.AgentSharing(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSharing(data map[string]any) ComposalEntityBase {
	return NewAgentSharingEntityFunc(sdk, data)
}


// AgentSite returns a AgentSite entity bound to this client.
// Idiomatic usage: client.AgentSite(nil).List(nil, nil) or
// client.AgentSite(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSite(data map[string]any) ComposalEntityBase {
	return NewAgentSiteEntityFunc(sdk, data)
}


// AgentSkill returns a AgentSkill entity bound to this client.
// Idiomatic usage: client.AgentSkill(nil).List(nil, nil) or
// client.AgentSkill(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSkill(data map[string]any) ComposalEntityBase {
	return NewAgentSkillEntityFunc(sdk, data)
}


// AgentSlack returns a AgentSlack entity bound to this client.
// Idiomatic usage: client.AgentSlack(nil).List(nil, nil) or
// client.AgentSlack(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSlack(data map[string]any) ComposalEntityBase {
	return NewAgentSlackEntityFunc(sdk, data)
}


// AgentSubagent returns a AgentSubagent entity bound to this client.
// Idiomatic usage: client.AgentSubagent(nil).List(nil, nil) or
// client.AgentSubagent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSubagent(data map[string]any) ComposalEntityBase {
	return NewAgentSubagentEntityFunc(sdk, data)
}


// AgentSubscription returns a AgentSubscription entity bound to this client.
// Idiomatic usage: client.AgentSubscription(nil).List(nil, nil) or
// client.AgentSubscription(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSubscription(data map[string]any) ComposalEntityBase {
	return NewAgentSubscriptionEntityFunc(sdk, data)
}


// AgentTeammate returns a AgentTeammate entity bound to this client.
// Idiomatic usage: client.AgentTeammate(nil).List(nil, nil) or
// client.AgentTeammate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentTeammate(data map[string]any) ComposalEntityBase {
	return NewAgentTeammateEntityFunc(sdk, data)
}


// AgentTerminal returns a AgentTerminal entity bound to this client.
// Idiomatic usage: client.AgentTerminal(nil).List(nil, nil) or
// client.AgentTerminal(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentTerminal(data map[string]any) ComposalEntityBase {
	return NewAgentTerminalEntityFunc(sdk, data)
}


// AgentThread returns a AgentThread entity bound to this client.
// Idiomatic usage: client.AgentThread(nil).List(nil, nil) or
// client.AgentThread(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentThread(data map[string]any) ComposalEntityBase {
	return NewAgentThreadEntityFunc(sdk, data)
}


// AgentTool returns a AgentTool entity bound to this client.
// Idiomatic usage: client.AgentTool(nil).List(nil, nil) or
// client.AgentTool(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentTool(data map[string]any) ComposalEntityBase {
	return NewAgentToolEntityFunc(sdk, data)
}


// AgentVerifyProject returns a AgentVerifyProject entity bound to this client.
// Idiomatic usage: client.AgentVerifyProject(nil).List(nil, nil) or
// client.AgentVerifyProject(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentVerifyProject(data map[string]any) ComposalEntityBase {
	return NewAgentVerifyProjectEntityFunc(sdk, data)
}


// AgentWait returns a AgentWait entity bound to this client.
// Idiomatic usage: client.AgentWait(nil).List(nil, nil) or
// client.AgentWait(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWait(data map[string]any) ComposalEntityBase {
	return NewAgentWaitEntityFunc(sdk, data)
}


// AgentWebhook returns a AgentWebhook entity bound to this client.
// Idiomatic usage: client.AgentWebhook(nil).List(nil, nil) or
// client.AgentWebhook(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWebhook(data map[string]any) ComposalEntityBase {
	return NewAgentWebhookEntityFunc(sdk, data)
}


// AgentWork returns a AgentWork entity bound to this client.
// Idiomatic usage: client.AgentWork(nil).List(nil, nil) or
// client.AgentWork(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWork(data map[string]any) ComposalEntityBase {
	return NewAgentWorkEntityFunc(sdk, data)
}


// AgentWorkflow returns a AgentWorkflow entity bound to this client.
// Idiomatic usage: client.AgentWorkflow(nil).List(nil, nil) or
// client.AgentWorkflow(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWorkflow(data map[string]any) ComposalEntityBase {
	return NewAgentWorkflowEntityFunc(sdk, data)
}


// AgentWorkflowProposal returns a AgentWorkflowProposal entity bound to this client.
// Idiomatic usage: client.AgentWorkflowProposal(nil).List(nil, nil) or
// client.AgentWorkflowProposal(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWorkflowProposal(data map[string]any) ComposalEntityBase {
	return NewAgentWorkflowProposalEntityFunc(sdk, data)
}


// AgentWorkflowRun returns a AgentWorkflowRun entity bound to this client.
// Idiomatic usage: client.AgentWorkflowRun(nil).List(nil, nil) or
// client.AgentWorkflowRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWorkflowRun(data map[string]any) ComposalEntityBase {
	return NewAgentWorkflowRunEntityFunc(sdk, data)
}


// AgentWorkflowTrigger returns a AgentWorkflowTrigger entity bound to this client.
// Idiomatic usage: client.AgentWorkflowTrigger(nil).List(nil, nil) or
// client.AgentWorkflowTrigger(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWorkflowTrigger(data map[string]any) ComposalEntityBase {
	return NewAgentWorkflowTriggerEntityFunc(sdk, data)
}


// AgentWorkspace returns a AgentWorkspace entity bound to this client.
// Idiomatic usage: client.AgentWorkspace(nil).List(nil, nil) or
// client.AgentWorkspace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWorkspace(data map[string]any) ComposalEntityBase {
	return NewAgentWorkspaceEntityFunc(sdk, data)
}


// AgentWritePermission returns a AgentWritePermission entity bound to this client.
// Idiomatic usage: client.AgentWritePermission(nil).List(nil, nil) or
// client.AgentWritePermission(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWritePermission(data map[string]any) ComposalEntityBase {
	return NewAgentWritePermissionEntityFunc(sdk, data)
}


// AllocationLog returns a AllocationLog entity bound to this client.
// Idiomatic usage: client.AllocationLog(nil).List(nil, nil) or
// client.AllocationLog(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AllocationLog(data map[string]any) ComposalEntityBase {
	return NewAllocationLogEntityFunc(sdk, data)
}


// App returns a App entity bound to this client.
// Idiomatic usage: client.App(nil).List(nil, nil) or
// client.App(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) App(data map[string]any) ComposalEntityBase {
	return NewAppEntityFunc(sdk, data)
}


// AppCdn returns a AppCdn entity bound to this client.
// Idiomatic usage: client.AppCdn(nil).List(nil, nil) or
// client.AppCdn(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppCdn(data map[string]any) ComposalEntityBase {
	return NewAppCdnEntityFunc(sdk, data)
}


// AppConfigVariable returns a AppConfigVariable entity bound to this client.
// Idiomatic usage: client.AppConfigVariable(nil).List(nil, nil) or
// client.AppConfigVariable(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppConfigVariable(data map[string]any) ComposalEntityBase {
	return NewAppConfigVariableEntityFunc(sdk, data)
}


// AppDataResource returns a AppDataResource entity bound to this client.
// Idiomatic usage: client.AppDataResource(nil).List(nil, nil) or
// client.AppDataResource(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppDataResource(data map[string]any) ComposalEntityBase {
	return NewAppDataResourceEntityFunc(sdk, data)
}


// AppDeploy returns a AppDeploy entity bound to this client.
// Idiomatic usage: client.AppDeploy(nil).List(nil, nil) or
// client.AppDeploy(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppDeploy(data map[string]any) ComposalEntityBase {
	return NewAppDeployEntityFunc(sdk, data)
}


// AppDeployment returns a AppDeployment entity bound to this client.
// Idiomatic usage: client.AppDeployment(nil).List(nil, nil) or
// client.AppDeployment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppDeployment(data map[string]any) ComposalEntityBase {
	return NewAppDeploymentEntityFunc(sdk, data)
}


// AppDeploymentOperation returns a AppDeploymentOperation entity bound to this client.
// Idiomatic usage: client.AppDeploymentOperation(nil).List(nil, nil) or
// client.AppDeploymentOperation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppDeploymentOperation(data map[string]any) ComposalEntityBase {
	return NewAppDeploymentOperationEntityFunc(sdk, data)
}


// AppDeploymentRollback returns a AppDeploymentRollback entity bound to this client.
// Idiomatic usage: client.AppDeploymentRollback(nil).List(nil, nil) or
// client.AppDeploymentRollback(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppDeploymentRollback(data map[string]any) ComposalEntityBase {
	return NewAppDeploymentRollbackEntityFunc(sdk, data)
}


// AppEnvironment returns a AppEnvironment entity bound to this client.
// Idiomatic usage: client.AppEnvironment(nil).List(nil, nil) or
// client.AppEnvironment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppEnvironment(data map[string]any) ComposalEntityBase {
	return NewAppEnvironmentEntityFunc(sdk, data)
}


// AppLocation returns a AppLocation entity bound to this client.
// Idiomatic usage: client.AppLocation(nil).List(nil, nil) or
// client.AppLocation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppLocation(data map[string]any) ComposalEntityBase {
	return NewAppLocationEntityFunc(sdk, data)
}


// AppMetric returns a AppMetric entity bound to this client.
// Idiomatic usage: client.AppMetric(nil).List(nil, nil) or
// client.AppMetric(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppMetric(data map[string]any) ComposalEntityBase {
	return NewAppMetricEntityFunc(sdk, data)
}


// AppPreview returns a AppPreview entity bound to this client.
// Idiomatic usage: client.AppPreview(nil).List(nil, nil) or
// client.AppPreview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppPreview(data map[string]any) ComposalEntityBase {
	return NewAppPreviewEntityFunc(sdk, data)
}


// AppPreviewProfile returns a AppPreviewProfile entity bound to this client.
// Idiomatic usage: client.AppPreviewProfile(nil).List(nil, nil) or
// client.AppPreviewProfile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppPreviewProfile(data map[string]any) ComposalEntityBase {
	return NewAppPreviewProfileEntityFunc(sdk, data)
}


// AppRun returns a AppRun entity bound to this client.
// Idiomatic usage: client.AppRun(nil).List(nil, nil) or
// client.AppRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppRun(data map[string]any) ComposalEntityBase {
	return NewAppRunEntityFunc(sdk, data)
}


// AppSecret returns a AppSecret entity bound to this client.
// Idiomatic usage: client.AppSecret(nil).List(nil, nil) or
// client.AppSecret(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppSecret(data map[string]any) ComposalEntityBase {
	return NewAppSecretEntityFunc(sdk, data)
}


// AppService returns a AppService entity bound to this client.
// Idiomatic usage: client.AppService(nil).List(nil, nil) or
// client.AppService(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppService(data map[string]any) ComposalEntityBase {
	return NewAppServiceEntityFunc(sdk, data)
}


// AppServiceBinding returns a AppServiceBinding entity bound to this client.
// Idiomatic usage: client.AppServiceBinding(nil).List(nil, nil) or
// client.AppServiceBinding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppServiceBinding(data map[string]any) ComposalEntityBase {
	return NewAppServiceBindingEntityFunc(sdk, data)
}


// AppServicePlacement returns a AppServicePlacement entity bound to this client.
// Idiomatic usage: client.AppServicePlacement(nil).List(nil, nil) or
// client.AppServicePlacement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppServicePlacement(data map[string]any) ComposalEntityBase {
	return NewAppServicePlacementEntityFunc(sdk, data)
}


// AppStorageResource returns a AppStorageResource entity bound to this client.
// Idiomatic usage: client.AppStorageResource(nil).List(nil, nil) or
// client.AppStorageResource(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppStorageResource(data map[string]any) ComposalEntityBase {
	return NewAppStorageResourceEntityFunc(sdk, data)
}


// AttachmentPart returns a AttachmentPart entity bound to this client.
// Idiomatic usage: client.AttachmentPart(nil).List(nil, nil) or
// client.AttachmentPart(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AttachmentPart(data map[string]any) ComposalEntityBase {
	return NewAttachmentPartEntityFunc(sdk, data)
}


// AutomationEvent returns a AutomationEvent entity bound to this client.
// Idiomatic usage: client.AutomationEvent(nil).List(nil, nil) or
// client.AutomationEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AutomationEvent(data map[string]any) ComposalEntityBase {
	return NewAutomationEventEntityFunc(sdk, data)
}


// AutomationRun returns a AutomationRun entity bound to this client.
// Idiomatic usage: client.AutomationRun(nil).List(nil, nil) or
// client.AutomationRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AutomationRun(data map[string]any) ComposalEntityBase {
	return NewAutomationRunEntityFunc(sdk, data)
}


// Binary returns a Binary entity bound to this client.
// Idiomatic usage: client.Binary(nil).List(nil, nil) or
// client.Binary(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Binary(data map[string]any) ComposalEntityBase {
	return NewBinaryEntityFunc(sdk, data)
}


// BinaryVersion returns a BinaryVersion entity bound to this client.
// Idiomatic usage: client.BinaryVersion(nil).List(nil, nil) or
// client.BinaryVersion(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BinaryVersion(data map[string]any) ComposalEntityBase {
	return NewBinaryVersionEntityFunc(sdk, data)
}


// BrowserEgressCandidate returns a BrowserEgressCandidate entity bound to this client.
// Idiomatic usage: client.BrowserEgressCandidate(nil).List(nil, nil) or
// client.BrowserEgressCandidate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserEgressCandidate(data map[string]any) ComposalEntityBase {
	return NewBrowserEgressCandidateEntityFunc(sdk, data)
}


// BrowserSession returns a BrowserSession entity bound to this client.
// Idiomatic usage: client.BrowserSession(nil).List(nil, nil) or
// client.BrowserSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserSession(data map[string]any) ComposalEntityBase {
	return NewBrowserSessionEntityFunc(sdk, data)
}


// BrowserSessionConnection returns a BrowserSessionConnection entity bound to this client.
// Idiomatic usage: client.BrowserSessionConnection(nil).List(nil, nil) or
// client.BrowserSessionConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserSessionConnection(data map[string]any) ComposalEntityBase {
	return NewBrowserSessionConnectionEntityFunc(sdk, data)
}


// BrowserSessionControl returns a BrowserSessionControl entity bound to this client.
// Idiomatic usage: client.BrowserSessionControl(nil).List(nil, nil) or
// client.BrowserSessionControl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserSessionControl(data map[string]any) ComposalEntityBase {
	return NewBrowserSessionControlEntityFunc(sdk, data)
}


// BrowserSessionEvent returns a BrowserSessionEvent entity bound to this client.
// Idiomatic usage: client.BrowserSessionEvent(nil).List(nil, nil) or
// client.BrowserSessionEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserSessionEvent(data map[string]any) ComposalEntityBase {
	return NewBrowserSessionEventEntityFunc(sdk, data)
}


// BrowserSessionMedia returns a BrowserSessionMedia entity bound to this client.
// Idiomatic usage: client.BrowserSessionMedia(nil).List(nil, nil) or
// client.BrowserSessionMedia(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserSessionMedia(data map[string]any) ComposalEntityBase {
	return NewBrowserSessionMediaEntityFunc(sdk, data)
}


// BrowserSessionRecording returns a BrowserSessionRecording entity bound to this client.
// Idiomatic usage: client.BrowserSessionRecording(nil).List(nil, nil) or
// client.BrowserSessionRecording(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserSessionRecording(data map[string]any) ComposalEntityBase {
	return NewBrowserSessionRecordingEntityFunc(sdk, data)
}


// BrowserSessionScreenshot returns a BrowserSessionScreenshot entity bound to this client.
// Idiomatic usage: client.BrowserSessionScreenshot(nil).List(nil, nil) or
// client.BrowserSessionScreenshot(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserSessionScreenshot(data map[string]any) ComposalEntityBase {
	return NewBrowserSessionScreenshotEntityFunc(sdk, data)
}


// BrowserSessionTask returns a BrowserSessionTask entity bound to this client.
// Idiomatic usage: client.BrowserSessionTask(nil).List(nil, nil) or
// client.BrowserSessionTask(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BrowserSessionTask(data map[string]any) ComposalEntityBase {
	return NewBrowserSessionTaskEntityFunc(sdk, data)
}


// CatalogSelector returns a CatalogSelector entity bound to this client.
// Idiomatic usage: client.CatalogSelector(nil).List(nil, nil) or
// client.CatalogSelector(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CatalogSelector(data map[string]any) ComposalEntityBase {
	return NewCatalogSelectorEntityFunc(sdk, data)
}


// CdnDeployment returns a CdnDeployment entity bound to this client.
// Idiomatic usage: client.CdnDeployment(nil).List(nil, nil) or
// client.CdnDeployment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CdnDeployment(data map[string]any) ComposalEntityBase {
	return NewCdnDeploymentEntityFunc(sdk, data)
}


// CdnHostname returns a CdnHostname entity bound to this client.
// Idiomatic usage: client.CdnHostname(nil).List(nil, nil) or
// client.CdnHostname(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CdnHostname(data map[string]any) ComposalEntityBase {
	return NewCdnHostnameEntityFunc(sdk, data)
}


// CdnSpace returns a CdnSpace entity bound to this client.
// Idiomatic usage: client.CdnSpace(nil).List(nil, nil) or
// client.CdnSpace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CdnSpace(data map[string]any) ComposalEntityBase {
	return NewCdnSpaceEntityFunc(sdk, data)
}


// CdnSpaceObject returns a CdnSpaceObject entity bound to this client.
// Idiomatic usage: client.CdnSpaceObject(nil).List(nil, nil) or
// client.CdnSpaceObject(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CdnSpaceObject(data map[string]any) ComposalEntityBase {
	return NewCdnSpaceObjectEntityFunc(sdk, data)
}


// ConnectionRequest returns a ConnectionRequest entity bound to this client.
// Idiomatic usage: client.ConnectionRequest(nil).List(nil, nil) or
// client.ConnectionRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ConnectionRequest(data map[string]any) ComposalEntityBase {
	return NewConnectionRequestEntityFunc(sdk, data)
}


// ConnectionSource returns a ConnectionSource entity bound to this client.
// Idiomatic usage: client.ConnectionSource(nil).List(nil, nil) or
// client.ConnectionSource(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ConnectionSource(data map[string]any) ComposalEntityBase {
	return NewConnectionSourceEntityFunc(sdk, data)
}


// CoordinationWait returns a CoordinationWait entity bound to this client.
// Idiomatic usage: client.CoordinationWait(nil).List(nil, nil) or
// client.CoordinationWait(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CoordinationWait(data map[string]any) ComposalEntityBase {
	return NewCoordinationWaitEntityFunc(sdk, data)
}


// CredentialSignInCheck returns a CredentialSignInCheck entity bound to this client.
// Idiomatic usage: client.CredentialSignInCheck(nil).List(nil, nil) or
// client.CredentialSignInCheck(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CredentialSignInCheck(data map[string]any) ComposalEntityBase {
	return NewCredentialSignInCheckEntityFunc(sdk, data)
}


// DataResourceRotateCredential returns a DataResourceRotateCredential entity bound to this client.
// Idiomatic usage: client.DataResourceRotateCredential(nil).List(nil, nil) or
// client.DataResourceRotateCredential(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DataResourceRotateCredential(data map[string]any) ComposalEntityBase {
	return NewDataResourceRotateCredentialEntityFunc(sdk, data)
}


// DeepScan returns a DeepScan entity bound to this client.
// Idiomatic usage: client.DeepScan(nil).List(nil, nil) or
// client.DeepScan(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeepScan(data map[string]any) ComposalEntityBase {
	return NewDeepScanEntityFunc(sdk, data)
}


// DeepScanFinding returns a DeepScanFinding entity bound to this client.
// Idiomatic usage: client.DeepScanFinding(nil).List(nil, nil) or
// client.DeepScanFinding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeepScanFinding(data map[string]any) ComposalEntityBase {
	return NewDeepScanFindingEntityFunc(sdk, data)
}


// DeepScanFlow returns a DeepScanFlow entity bound to this client.
// Idiomatic usage: client.DeepScanFlow(nil).List(nil, nil) or
// client.DeepScanFlow(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeepScanFlow(data map[string]any) ComposalEntityBase {
	return NewDeepScanFlowEntityFunc(sdk, data)
}


// DeepScanMappedFlow returns a DeepScanMappedFlow entity bound to this client.
// Idiomatic usage: client.DeepScanMappedFlow(nil).List(nil, nil) or
// client.DeepScanMappedFlow(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeepScanMappedFlow(data map[string]any) ComposalEntityBase {
	return NewDeepScanMappedFlowEntityFunc(sdk, data)
}


// DeepScanOption returns a DeepScanOption entity bound to this client.
// Idiomatic usage: client.DeepScanOption(nil).List(nil, nil) or
// client.DeepScanOption(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeepScanOption(data map[string]any) ComposalEntityBase {
	return NewDeepScanOptionEntityFunc(sdk, data)
}


// DemoShare returns a DemoShare entity bound to this client.
// Idiomatic usage: client.DemoShare(nil).List(nil, nil) or
// client.DemoShare(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DemoShare(data map[string]any) ComposalEntityBase {
	return NewDemoShareEntityFunc(sdk, data)
}


// DemoShareSegment returns a DemoShareSegment entity bound to this client.
// Idiomatic usage: client.DemoShareSegment(nil).List(nil, nil) or
// client.DemoShareSegment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DemoShareSegment(data map[string]any) ComposalEntityBase {
	return NewDemoShareSegmentEntityFunc(sdk, data)
}


// DeploymentDashboardNomad returns a DeploymentDashboardNomad entity bound to this client.
// Idiomatic usage: client.DeploymentDashboardNomad(nil).List(nil, nil) or
// client.DeploymentDashboardNomad(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentDashboardNomad(data map[string]any) ComposalEntityBase {
	return NewDeploymentDashboardNomadEntityFunc(sdk, data)
}


// DeploymentFile returns a DeploymentFile entity bound to this client.
// Idiomatic usage: client.DeploymentFile(nil).List(nil, nil) or
// client.DeploymentFile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentFile(data map[string]any) ComposalEntityBase {
	return NewDeploymentFileEntityFunc(sdk, data)
}


// DomainPathRule returns a DomainPathRule entity bound to this client.
// Idiomatic usage: client.DomainPathRule(nil).List(nil, nil) or
// client.DomainPathRule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DomainPathRule(data map[string]any) ComposalEntityBase {
	return NewDomainPathRuleEntityFunc(sdk, data)
}


// Dream returns a Dream entity bound to this client.
// Idiomatic usage: client.Dream(nil).List(nil, nil) or
// client.Dream(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Dream(data map[string]any) ComposalEntityBase {
	return NewDreamEntityFunc(sdk, data)
}


// Environment returns a Environment entity bound to this client.
// Idiomatic usage: client.Environment(nil).List(nil, nil) or
// client.Environment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Environment(data map[string]any) ComposalEntityBase {
	return NewEnvironmentEntityFunc(sdk, data)
}


// EnvironmentDiscoveryRun returns a EnvironmentDiscoveryRun entity bound to this client.
// Idiomatic usage: client.EnvironmentDiscoveryRun(nil).List(nil, nil) or
// client.EnvironmentDiscoveryRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) EnvironmentDiscoveryRun(data map[string]any) ComposalEntityBase {
	return NewEnvironmentDiscoveryRunEntityFunc(sdk, data)
}


// EnvironmentExploration returns a EnvironmentExploration entity bound to this client.
// Idiomatic usage: client.EnvironmentExploration(nil).List(nil, nil) or
// client.EnvironmentExploration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) EnvironmentExploration(data map[string]any) ComposalEntityBase {
	return NewEnvironmentExplorationEntityFunc(sdk, data)
}


// EnvironmentFirstRun returns a EnvironmentFirstRun entity bound to this client.
// Idiomatic usage: client.EnvironmentFirstRun(nil).List(nil, nil) or
// client.EnvironmentFirstRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) EnvironmentFirstRun(data map[string]any) ComposalEntityBase {
	return NewEnvironmentFirstRunEntityFunc(sdk, data)
}


// EnvironmentRevision returns a EnvironmentRevision entity bound to this client.
// Idiomatic usage: client.EnvironmentRevision(nil).List(nil, nil) or
// client.EnvironmentRevision(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) EnvironmentRevision(data map[string]any) ComposalEntityBase {
	return NewEnvironmentRevisionEntityFunc(sdk, data)
}


// EnvironmentSecretBinding returns a EnvironmentSecretBinding entity bound to this client.
// Idiomatic usage: client.EnvironmentSecretBinding(nil).List(nil, nil) or
// client.EnvironmentSecretBinding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) EnvironmentSecretBinding(data map[string]any) ComposalEntityBase {
	return NewEnvironmentSecretBindingEntityFunc(sdk, data)
}


// EnvironmentTestAccount returns a EnvironmentTestAccount entity bound to this client.
// Idiomatic usage: client.EnvironmentTestAccount(nil).List(nil, nil) or
// client.EnvironmentTestAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) EnvironmentTestAccount(data map[string]any) ComposalEntityBase {
	return NewEnvironmentTestAccountEntityFunc(sdk, data)
}


// Evidence returns a Evidence entity bound to this client.
// Idiomatic usage: client.Evidence(nil).List(nil, nil) or
// client.Evidence(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Evidence(data map[string]any) ComposalEntityBase {
	return NewEvidenceEntityFunc(sdk, data)
}


// Exploration returns a Exploration entity bound to this client.
// Idiomatic usage: client.Exploration(nil).List(nil, nil) or
// client.Exploration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Exploration(data map[string]any) ComposalEntityBase {
	return NewExplorationEntityFunc(sdk, data)
}


// ExplorationMessage returns a ExplorationMessage entity bound to this client.
// Idiomatic usage: client.ExplorationMessage(nil).List(nil, nil) or
// client.ExplorationMessage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ExplorationMessage(data map[string]any) ComposalEntityBase {
	return NewExplorationMessageEntityFunc(sdk, data)
}


// ExplorationReport returns a ExplorationReport entity bound to this client.
// Idiomatic usage: client.ExplorationReport(nil).List(nil, nil) or
// client.ExplorationReport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ExplorationReport(data map[string]any) ComposalEntityBase {
	return NewExplorationReportEntityFunc(sdk, data)
}


// ExplorationScenario returns a ExplorationScenario entity bound to this client.
// Idiomatic usage: client.ExplorationScenario(nil).List(nil, nil) or
// client.ExplorationScenario(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ExplorationScenario(data map[string]any) ComposalEntityBase {
	return NewExplorationScenarioEntityFunc(sdk, data)
}


// Finding returns a Finding entity bound to this client.
// Idiomatic usage: client.Finding(nil).List(nil, nil) or
// client.Finding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Finding(data map[string]any) ComposalEntityBase {
	return NewFindingEntityFunc(sdk, data)
}


// GithubConnection returns a GithubConnection entity bound to this client.
// Idiomatic usage: client.GithubConnection(nil).List(nil, nil) or
// client.GithubConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubConnection(data map[string]any) ComposalEntityBase {
	return NewGithubConnectionEntityFunc(sdk, data)
}


// HostingAppDomain returns a HostingAppDomain entity bound to this client.
// Idiomatic usage: client.HostingAppDomain(nil).List(nil, nil) or
// client.HostingAppDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) HostingAppDomain(data map[string]any) ComposalEntityBase {
	return NewHostingAppDomainEntityFunc(sdk, data)
}


// ImageRepository returns a ImageRepository entity bound to this client.
// Idiomatic usage: client.ImageRepository(nil).List(nil, nil) or
// client.ImageRepository(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ImageRepository(data map[string]any) ComposalEntityBase {
	return NewImageRepositoryEntityFunc(sdk, data)
}


// Integration returns a Integration entity bound to this client.
// Idiomatic usage: client.Integration(nil).List(nil, nil) or
// client.Integration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Integration(data map[string]any) ComposalEntityBase {
	return NewIntegrationEntityFunc(sdk, data)
}


// InteractionResponse returns a InteractionResponse entity bound to this client.
// Idiomatic usage: client.InteractionResponse(nil).List(nil, nil) or
// client.InteractionResponse(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) InteractionResponse(data map[string]any) ComposalEntityBase {
	return NewInteractionResponseEntityFunc(sdk, data)
}


// Invitation returns a Invitation entity bound to this client.
// Idiomatic usage: client.Invitation(nil).List(nil, nil) or
// client.Invitation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Invitation(data map[string]any) ComposalEntityBase {
	return NewInvitationEntityFunc(sdk, data)
}


// JourneyVariantReplay returns a JourneyVariantReplay entity bound to this client.
// Idiomatic usage: client.JourneyVariantReplay(nil).List(nil, nil) or
// client.JourneyVariantReplay(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) JourneyVariantReplay(data map[string]any) ComposalEntityBase {
	return NewJourneyVariantReplayEntityFunc(sdk, data)
}


// Knowledge returns a Knowledge entity bound to this client.
// Idiomatic usage: client.Knowledge(nil).List(nil, nil) or
// client.Knowledge(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Knowledge(data map[string]any) ComposalEntityBase {
	return NewKnowledgeEntityFunc(sdk, data)
}


// LocalThreadDelivery returns a LocalThreadDelivery entity bound to this client.
// Idiomatic usage: client.LocalThreadDelivery(nil).List(nil, nil) or
// client.LocalThreadDelivery(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LocalThreadDelivery(data map[string]any) ComposalEntityBase {
	return NewLocalThreadDeliveryEntityFunc(sdk, data)
}


// LocalThreadOperation returns a LocalThreadOperation entity bound to this client.
// Idiomatic usage: client.LocalThreadOperation(nil).List(nil, nil) or
// client.LocalThreadOperation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LocalThreadOperation(data map[string]any) ComposalEntityBase {
	return NewLocalThreadOperationEntityFunc(sdk, data)
}


// Location returns a Location entity bound to this client.
// Idiomatic usage: client.Location(nil).List(nil, nil) or
// client.Location(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Location(data map[string]any) ComposalEntityBase {
	return NewLocationEntityFunc(sdk, data)
}


// Me returns a Me entity bound to this client.
// Idiomatic usage: client.Me(nil).List(nil, nil) or
// client.Me(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Me(data map[string]any) ComposalEntityBase {
	return NewMeEntityFunc(sdk, data)
}


// MeEmail returns a MeEmail entity bound to this client.
// Idiomatic usage: client.MeEmail(nil).List(nil, nil) or
// client.MeEmail(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MeEmail(data map[string]any) ComposalEntityBase {
	return NewMeEmailEntityFunc(sdk, data)
}


// MeOnboarding returns a MeOnboarding entity bound to this client.
// Idiomatic usage: client.MeOnboarding(nil).List(nil, nil) or
// client.MeOnboarding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MeOnboarding(data map[string]any) ComposalEntityBase {
	return NewMeOnboardingEntityFunc(sdk, data)
}


// MediaFile returns a MediaFile entity bound to this client.
// Idiomatic usage: client.MediaFile(nil).List(nil, nil) or
// client.MediaFile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MediaFile(data map[string]any) ComposalEntityBase {
	return NewMediaFileEntityFunc(sdk, data)
}


// Member returns a Member entity bound to this client.
// Idiomatic usage: client.Member(nil).List(nil, nil) or
// client.Member(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Member(data map[string]any) ComposalEntityBase {
	return NewMemberEntityFunc(sdk, data)
}


// Memory returns a Memory entity bound to this client.
// Idiomatic usage: client.Memory(nil).List(nil, nil) or
// client.Memory(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Memory(data map[string]any) ComposalEntityBase {
	return NewMemoryEntityFunc(sdk, data)
}


// MergeRequest returns a MergeRequest entity bound to this client.
// Idiomatic usage: client.MergeRequest(nil).List(nil, nil) or
// client.MergeRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MergeRequest(data map[string]any) ComposalEntityBase {
	return NewMergeRequestEntityFunc(sdk, data)
}


// MessagingConversationMessage returns a MessagingConversationMessage entity bound to this client.
// Idiomatic usage: client.MessagingConversationMessage(nil).List(nil, nil) or
// client.MessagingConversationMessage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MessagingConversationMessage(data map[string]any) ComposalEntityBase {
	return NewMessagingConversationMessageEntityFunc(sdk, data)
}


// MessagingConversationUpload returns a MessagingConversationUpload entity bound to this client.
// Idiomatic usage: client.MessagingConversationUpload(nil).List(nil, nil) or
// client.MessagingConversationUpload(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MessagingConversationUpload(data map[string]any) ComposalEntityBase {
	return NewMessagingConversationUploadEntityFunc(sdk, data)
}


// MetricQuery returns a MetricQuery entity bound to this client.
// Idiomatic usage: client.MetricQuery(nil).List(nil, nil) or
// client.MetricQuery(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MetricQuery(data map[string]any) ComposalEntityBase {
	return NewMetricQueryEntityFunc(sdk, data)
}


// NetworkConnection returns a NetworkConnection entity bound to this client.
// Idiomatic usage: client.NetworkConnection(nil).List(nil, nil) or
// client.NetworkConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) NetworkConnection(data map[string]any) ComposalEntityBase {
	return NewNetworkConnectionEntityFunc(sdk, data)
}


// NomadAllocation returns a NomadAllocation entity bound to this client.
// Idiomatic usage: client.NomadAllocation(nil).List(nil, nil) or
// client.NomadAllocation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) NomadAllocation(data map[string]any) ComposalEntityBase {
	return NewNomadAllocationEntityFunc(sdk, data)
}


// NomadLog returns a NomadLog entity bound to this client.
// Idiomatic usage: client.NomadLog(nil).List(nil, nil) or
// client.NomadLog(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) NomadLog(data map[string]any) ComposalEntityBase {
	return NewNomadLogEntityFunc(sdk, data)
}


// Organization returns a Organization entity bound to this client.
// Idiomatic usage: client.Organization(nil).List(nil, nil) or
// client.Organization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Organization(data map[string]any) ComposalEntityBase {
	return NewOrganizationEntityFunc(sdk, data)
}


// Page returns a Page entity bound to this client.
// Idiomatic usage: client.Page(nil).List(nil, nil) or
// client.Page(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Page(data map[string]any) ComposalEntityBase {
	return NewPageEntityFunc(sdk, data)
}


// PageAgent returns a PageAgent entity bound to this client.
// Idiomatic usage: client.PageAgent(nil).List(nil, nil) or
// client.PageAgent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PageAgent(data map[string]any) ComposalEntityBase {
	return NewPageAgentEntityFunc(sdk, data)
}


// PageProjectRun returns a PageProjectRun entity bound to this client.
// Idiomatic usage: client.PageProjectRun(nil).List(nil, nil) or
// client.PageProjectRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PageProjectRun(data map[string]any) ComposalEntityBase {
	return NewPageProjectRunEntityFunc(sdk, data)
}


// PagesProjectCredential returns a PagesProjectCredential entity bound to this client.
// Idiomatic usage: client.PagesProjectCredential(nil).List(nil, nil) or
// client.PagesProjectCredential(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesProjectCredential(data map[string]any) ComposalEntityBase {
	return NewPagesProjectCredentialEntityFunc(sdk, data)
}


// PagesProjectPersona returns a PagesProjectPersona entity bound to this client.
// Idiomatic usage: client.PagesProjectPersona(nil).List(nil, nil) or
// client.PagesProjectPersona(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesProjectPersona(data map[string]any) ComposalEntityBase {
	return NewPagesProjectPersonaEntityFunc(sdk, data)
}


// PagesProjectRun returns a PagesProjectRun entity bound to this client.
// Idiomatic usage: client.PagesProjectRun(nil).List(nil, nil) or
// client.PagesProjectRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesProjectRun(data map[string]any) ComposalEntityBase {
	return NewPagesProjectRunEntityFunc(sdk, data)
}


// PagesProjectScenario returns a PagesProjectScenario entity bound to this client.
// Idiomatic usage: client.PagesProjectScenario(nil).List(nil, nil) or
// client.PagesProjectScenario(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesProjectScenario(data map[string]any) ComposalEntityBase {
	return NewPagesProjectScenarioEntityFunc(sdk, data)
}


// PersonalAccessToken returns a PersonalAccessToken entity bound to this client.
// Idiomatic usage: client.PersonalAccessToken(nil).List(nil, nil) or
// client.PersonalAccessToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PersonalAccessToken(data map[string]any) ComposalEntityBase {
	return NewPersonalAccessTokenEntityFunc(sdk, data)
}


// PreviewOperation returns a PreviewOperation entity bound to this client.
// Idiomatic usage: client.PreviewOperation(nil).List(nil, nil) or
// client.PreviewOperation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PreviewOperation(data map[string]any) ComposalEntityBase {
	return NewPreviewOperationEntityFunc(sdk, data)
}


// PreviewProfileSecretBinding returns a PreviewProfileSecretBinding entity bound to this client.
// Idiomatic usage: client.PreviewProfileSecretBinding(nil).List(nil, nil) or
// client.PreviewProfileSecretBinding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PreviewProfileSecretBinding(data map[string]any) ComposalEntityBase {
	return NewPreviewProfileSecretBindingEntityFunc(sdk, data)
}


// PreviewSecret returns a PreviewSecret entity bound to this client.
// Idiomatic usage: client.PreviewSecret(nil).List(nil, nil) or
// client.PreviewSecret(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PreviewSecret(data map[string]any) ComposalEntityBase {
	return NewPreviewSecretEntityFunc(sdk, data)
}


// PreviewSharingApproval returns a PreviewSharingApproval entity bound to this client.
// Idiomatic usage: client.PreviewSharingApproval(nil).List(nil, nil) or
// client.PreviewSharingApproval(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PreviewSharingApproval(data map[string]any) ComposalEntityBase {
	return NewPreviewSharingApprovalEntityFunc(sdk, data)
}


// ProductMapIdentityDecision returns a ProductMapIdentityDecision entity bound to this client.
// Idiomatic usage: client.ProductMapIdentityDecision(nil).List(nil, nil) or
// client.ProductMapIdentityDecision(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProductMapIdentityDecision(data map[string]any) ComposalEntityBase {
	return NewProductMapIdentityDecisionEntityFunc(sdk, data)
}


// ProductMapJourney returns a ProductMapJourney entity bound to this client.
// Idiomatic usage: client.ProductMapJourney(nil).List(nil, nil) or
// client.ProductMapJourney(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProductMapJourney(data map[string]any) ComposalEntityBase {
	return NewProductMapJourneyEntityFunc(sdk, data)
}


// ProductMapJourneyReplay returns a ProductMapJourneyReplay entity bound to this client.
// Idiomatic usage: client.ProductMapJourneyReplay(nil).List(nil, nil) or
// client.ProductMapJourneyReplay(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProductMapJourneyReplay(data map[string]any) ComposalEntityBase {
	return NewProductMapJourneyReplayEntityFunc(sdk, data)
}


// ProductMapObservation returns a ProductMapObservation entity bound to this client.
// Idiomatic usage: client.ProductMapObservation(nil).List(nil, nil) or
// client.ProductMapObservation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProductMapObservation(data map[string]any) ComposalEntityBase {
	return NewProductMapObservationEntityFunc(sdk, data)
}


// ProductMapQuestion returns a ProductMapQuestion entity bound to this client.
// Idiomatic usage: client.ProductMapQuestion(nil).List(nil, nil) or
// client.ProductMapQuestion(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProductMapQuestion(data map[string]any) ComposalEntityBase {
	return NewProductMapQuestionEntityFunc(sdk, data)
}


// ProductMapState returns a ProductMapState entity bound to this client.
// Idiomatic usage: client.ProductMapState(nil).List(nil, nil) or
// client.ProductMapState(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProductMapState(data map[string]any) ComposalEntityBase {
	return NewProductMapStateEntityFunc(sdk, data)
}


// Project returns a Project entity bound to this client.
// Idiomatic usage: client.Project(nil).List(nil, nil) or
// client.Project(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Project(data map[string]any) ComposalEntityBase {
	return NewProjectEntityFunc(sdk, data)
}


// ProjectAndroidApk returns a ProjectAndroidApk entity bound to this client.
// Idiomatic usage: client.ProjectAndroidApk(nil).List(nil, nil) or
// client.ProjectAndroidApk(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectAndroidApk(data map[string]any) ComposalEntityBase {
	return NewProjectAndroidApkEntityFunc(sdk, data)
}


// ProjectCodeMap returns a ProjectCodeMap entity bound to this client.
// Idiomatic usage: client.ProjectCodeMap(nil).List(nil, nil) or
// client.ProjectCodeMap(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectCodeMap(data map[string]any) ComposalEntityBase {
	return NewProjectCodeMapEntityFunc(sdk, data)
}


// ProjectEnvironment returns a ProjectEnvironment entity bound to this client.
// Idiomatic usage: client.ProjectEnvironment(nil).List(nil, nil) or
// client.ProjectEnvironment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectEnvironment(data map[string]any) ComposalEntityBase {
	return NewProjectEnvironmentEntityFunc(sdk, data)
}


// ProjectFinding returns a ProjectFinding entity bound to this client.
// Idiomatic usage: client.ProjectFinding(nil).List(nil, nil) or
// client.ProjectFinding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectFinding(data map[string]any) ComposalEntityBase {
	return NewProjectFindingEntityFunc(sdk, data)
}


// ProjectFixture returns a ProjectFixture entity bound to this client.
// Idiomatic usage: client.ProjectFixture(nil).List(nil, nil) or
// client.ProjectFixture(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectFixture(data map[string]any) ComposalEntityBase {
	return NewProjectFixtureEntityFunc(sdk, data)
}


// ProjectIosApp returns a ProjectIosApp entity bound to this client.
// Idiomatic usage: client.ProjectIosApp(nil).List(nil, nil) or
// client.ProjectIosApp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectIosApp(data map[string]any) ComposalEntityBase {
	return NewProjectIosAppEntityFunc(sdk, data)
}


// ProjectMessagingConversation returns a ProjectMessagingConversation entity bound to this client.
// Idiomatic usage: client.ProjectMessagingConversation(nil).List(nil, nil) or
// client.ProjectMessagingConversation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectMessagingConversation(data map[string]any) ComposalEntityBase {
	return NewProjectMessagingConversationEntityFunc(sdk, data)
}


// ProjectOverviewMetric returns a ProjectOverviewMetric entity bound to this client.
// Idiomatic usage: client.ProjectOverviewMetric(nil).List(nil, nil) or
// client.ProjectOverviewMetric(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectOverviewMetric(data map[string]any) ComposalEntityBase {
	return NewProjectOverviewMetricEntityFunc(sdk, data)
}


// ProjectOverviewPullRequest returns a ProjectOverviewPullRequest entity bound to this client.
// Idiomatic usage: client.ProjectOverviewPullRequest(nil).List(nil, nil) or
// client.ProjectOverviewPullRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectOverviewPullRequest(data map[string]any) ComposalEntityBase {
	return NewProjectOverviewPullRequestEntityFunc(sdk, data)
}


// ProjectProductMap returns a ProjectProductMap entity bound to this client.
// Idiomatic usage: client.ProjectProductMap(nil).List(nil, nil) or
// client.ProjectProductMap(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectProductMap(data map[string]any) ComposalEntityBase {
	return NewProjectProductMapEntityFunc(sdk, data)
}


// ProjectRecording returns a ProjectRecording entity bound to this client.
// Idiomatic usage: client.ProjectRecording(nil).List(nil, nil) or
// client.ProjectRecording(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectRecording(data map[string]any) ComposalEntityBase {
	return NewProjectRecordingEntityFunc(sdk, data)
}


// ProjectRunPlan returns a ProjectRunPlan entity bound to this client.
// Idiomatic usage: client.ProjectRunPlan(nil).List(nil, nil) or
// client.ProjectRunPlan(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectRunPlan(data map[string]any) ComposalEntityBase {
	return NewProjectRunPlanEntityFunc(sdk, data)
}


// ProjectRunSchedule returns a ProjectRunSchedule entity bound to this client.
// Idiomatic usage: client.ProjectRunSchedule(nil).List(nil, nil) or
// client.ProjectRunSchedule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectRunSchedule(data map[string]any) ComposalEntityBase {
	return NewProjectRunScheduleEntityFunc(sdk, data)
}


// ProjectScenarioOption returns a ProjectScenarioOption entity bound to this client.
// Idiomatic usage: client.ProjectScenarioOption(nil).List(nil, nil) or
// client.ProjectScenarioOption(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectScenarioOption(data map[string]any) ComposalEntityBase {
	return NewProjectScenarioOptionEntityFunc(sdk, data)
}


// ProjectScenarioRow returns a ProjectScenarioRow entity bound to this client.
// Idiomatic usage: client.ProjectScenarioRow(nil).List(nil, nil) or
// client.ProjectScenarioRow(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectScenarioRow(data map[string]any) ComposalEntityBase {
	return NewProjectScenarioRowEntityFunc(sdk, data)
}


// ProjectSetting returns a ProjectSetting entity bound to this client.
// Idiomatic usage: client.ProjectSetting(nil).List(nil, nil) or
// client.ProjectSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectSetting(data map[string]any) ComposalEntityBase {
	return NewProjectSettingEntityFunc(sdk, data)
}


// PullRequest returns a PullRequest entity bound to this client.
// Idiomatic usage: client.PullRequest(nil).List(nil, nil) or
// client.PullRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PullRequest(data map[string]any) ComposalEntityBase {
	return NewPullRequestEntityFunc(sdk, data)
}


// PullRequestSetting returns a PullRequestSetting entity bound to this client.
// Idiomatic usage: client.PullRequestSetting(nil).List(nil, nil) or
// client.PullRequestSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PullRequestSetting(data map[string]any) ComposalEntityBase {
	return NewPullRequestSettingEntityFunc(sdk, data)
}


// PullRequestSettingAddRepository returns a PullRequestSettingAddRepository entity bound to this client.
// Idiomatic usage: client.PullRequestSettingAddRepository(nil).List(nil, nil) or
// client.PullRequestSettingAddRepository(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PullRequestSettingAddRepository(data map[string]any) ComposalEntityBase {
	return NewPullRequestSettingAddRepositoryEntityFunc(sdk, data)
}


// PullRequestSettingDetectComment returns a PullRequestSettingDetectComment entity bound to this client.
// Idiomatic usage: client.PullRequestSettingDetectComment(nil).List(nil, nil) or
// client.PullRequestSettingDetectComment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PullRequestSettingDetectComment(data map[string]any) ComposalEntityBase {
	return NewPullRequestSettingDetectCommentEntityFunc(sdk, data)
}


// Recorder returns a Recorder entity bound to this client.
// Idiomatic usage: client.Recorder(nil).List(nil, nil) or
// client.Recorder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Recorder(data map[string]any) ComposalEntityBase {
	return NewRecorderEntityFunc(sdk, data)
}


// Registry returns a Registry entity bound to this client.
// Idiomatic usage: client.Registry(nil).List(nil, nil) or
// client.Registry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Registry(data map[string]any) ComposalEntityBase {
	return NewRegistryEntityFunc(sdk, data)
}


// RegistryV2 returns a RegistryV2 entity bound to this client.
// Idiomatic usage: client.RegistryV2(nil).List(nil, nil) or
// client.RegistryV2(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RegistryV2(data map[string]any) ComposalEntityBase {
	return NewRegistryV2EntityFunc(sdk, data)
}


// RelayAgentLocalThread returns a RelayAgentLocalThread entity bound to this client.
// Idiomatic usage: client.RelayAgentLocalThread(nil).List(nil, nil) or
// client.RelayAgentLocalThread(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RelayAgentLocalThread(data map[string]any) ComposalEntityBase {
	return NewRelayAgentLocalThreadEntityFunc(sdk, data)
}


// ReportReplay returns a ReportReplay entity bound to this client.
// Idiomatic usage: client.ReportReplay(nil).List(nil, nil) or
// client.ReportReplay(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ReportReplay(data map[string]any) ComposalEntityBase {
	return NewReportReplayEntityFunc(sdk, data)
}


// ReportScenario returns a ReportScenario entity bound to this client.
// Idiomatic usage: client.ReportScenario(nil).List(nil, nil) or
// client.ReportScenario(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ReportScenario(data map[string]any) ComposalEntityBase {
	return NewReportScenarioEntityFunc(sdk, data)
}


// RunScenarioRun returns a RunScenarioRun entity bound to this client.
// Idiomatic usage: client.RunScenarioRun(nil).List(nil, nil) or
// client.RunScenarioRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunScenarioRun(data map[string]any) ComposalEntityBase {
	return NewRunScenarioRunEntityFunc(sdk, data)
}


// RunScheduleOption returns a RunScheduleOption entity bound to this client.
// Idiomatic usage: client.RunScheduleOption(nil).List(nil, nil) or
// client.RunScheduleOption(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunScheduleOption(data map[string]any) ComposalEntityBase {
	return NewRunScheduleOptionEntityFunc(sdk, data)
}


// RunSearch returns a RunSearch entity bound to this client.
// Idiomatic usage: client.RunSearch(nil).List(nil, nil) or
// client.RunSearch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunSearch(data map[string]any) ComposalEntityBase {
	return NewRunSearchEntityFunc(sdk, data)
}


// RunUpdate returns a RunUpdate entity bound to this client.
// Idiomatic usage: client.RunUpdate(nil).List(nil, nil) or
// client.RunUpdate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunUpdate(data map[string]any) ComposalEntityBase {
	return NewRunUpdateEntityFunc(sdk, data)
}


// ScenarioRevision returns a ScenarioRevision entity bound to this client.
// Idiomatic usage: client.ScenarioRevision(nil).List(nil, nil) or
// client.ScenarioRevision(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ScenarioRevision(data map[string]any) ComposalEntityBase {
	return NewScenarioRevisionEntityFunc(sdk, data)
}


// ScenarioRunLesson returns a ScenarioRunLesson entity bound to this client.
// Idiomatic usage: client.ScenarioRunLesson(nil).List(nil, nil) or
// client.ScenarioRunLesson(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ScenarioRunLesson(data map[string]any) ComposalEntityBase {
	return NewScenarioRunLessonEntityFunc(sdk, data)
}


// ScenarioRunScenarioEdit returns a ScenarioRunScenarioEdit entity bound to this client.
// Idiomatic usage: client.ScenarioRunScenarioEdit(nil).List(nil, nil) or
// client.ScenarioRunScenarioEdit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ScenarioRunScenarioEdit(data map[string]any) ComposalEntityBase {
	return NewScenarioRunScenarioEditEntityFunc(sdk, data)
}


// ServiceEndpoint returns a ServiceEndpoint entity bound to this client.
// Idiomatic usage: client.ServiceEndpoint(nil).List(nil, nil) or
// client.ServiceEndpoint(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ServiceEndpoint(data map[string]any) ComposalEntityBase {
	return NewServiceEndpointEntityFunc(sdk, data)
}


// SitePreview returns a SitePreview entity bound to this client.
// Idiomatic usage: client.SitePreview(nil).List(nil, nil) or
// client.SitePreview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SitePreview(data map[string]any) ComposalEntityBase {
	return NewSitePreviewEntityFunc(sdk, data)
}


// SlackChannel returns a SlackChannel entity bound to this client.
// Idiomatic usage: client.SlackChannel(nil).List(nil, nil) or
// client.SlackChannel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SlackChannel(data map[string]any) ComposalEntityBase {
	return NewSlackChannelEntityFunc(sdk, data)
}


// SparkAgentLocalThread returns a SparkAgentLocalThread entity bound to this client.
// Idiomatic usage: client.SparkAgentLocalThread(nil).List(nil, nil) or
// client.SparkAgentLocalThread(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkAgentLocalThread(data map[string]any) ComposalEntityBase {
	return NewSparkAgentLocalThreadEntityFunc(sdk, data)
}


// StaticSite returns a StaticSite entity bound to this client.
// Idiomatic usage: client.StaticSite(nil).List(nil, nil) or
// client.StaticSite(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) StaticSite(data map[string]any) ComposalEntityBase {
	return NewStaticSiteEntityFunc(sdk, data)
}


// StaticSiteDeployment returns a StaticSiteDeployment entity bound to this client.
// Idiomatic usage: client.StaticSiteDeployment(nil).List(nil, nil) or
// client.StaticSiteDeployment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) StaticSiteDeployment(data map[string]any) ComposalEntityBase {
	return NewStaticSiteDeploymentEntityFunc(sdk, data)
}


// StaticSiteDomain returns a StaticSiteDomain entity bound to this client.
// Idiomatic usage: client.StaticSiteDomain(nil).List(nil, nil) or
// client.StaticSiteDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) StaticSiteDomain(data map[string]any) ComposalEntityBase {
	return NewStaticSiteDomainEntityFunc(sdk, data)
}


// SubscriptionModel returns a SubscriptionModel entity bound to this client.
// Idiomatic usage: client.SubscriptionModel(nil).List(nil, nil) or
// client.SubscriptionModel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SubscriptionModel(data map[string]any) ComposalEntityBase {
	return NewSubscriptionModelEntityFunc(sdk, data)
}


// ThreadPreview returns a ThreadPreview entity bound to this client.
// Idiomatic usage: client.ThreadPreview(nil).List(nil, nil) or
// client.ThreadPreview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ThreadPreview(data map[string]any) ComposalEntityBase {
	return NewThreadPreviewEntityFunc(sdk, data)
}


// VerificationProjectCredential returns a VerificationProjectCredential entity bound to this client.
// Idiomatic usage: client.VerificationProjectCredential(nil).List(nil, nil) or
// client.VerificationProjectCredential(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerificationProjectCredential(data map[string]any) ComposalEntityBase {
	return NewVerificationProjectCredentialEntityFunc(sdk, data)
}


// VerificationProjectPersona returns a VerificationProjectPersona entity bound to this client.
// Idiomatic usage: client.VerificationProjectPersona(nil).List(nil, nil) or
// client.VerificationProjectPersona(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerificationProjectPersona(data map[string]any) ComposalEntityBase {
	return NewVerificationProjectPersonaEntityFunc(sdk, data)
}


// VerificationProjectRun returns a VerificationProjectRun entity bound to this client.
// Idiomatic usage: client.VerificationProjectRun(nil).List(nil, nil) or
// client.VerificationProjectRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerificationProjectRun(data map[string]any) ComposalEntityBase {
	return NewVerificationProjectRunEntityFunc(sdk, data)
}


// VerificationProjectScenario returns a VerificationProjectScenario entity bound to this client.
// Idiomatic usage: client.VerificationProjectScenario(nil).List(nil, nil) or
// client.VerificationProjectScenario(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerificationProjectScenario(data map[string]any) ComposalEntityBase {
	return NewVerificationProjectScenarioEntityFunc(sdk, data)
}


// VerifyAppDomain returns a VerifyAppDomain entity bound to this client.
// Idiomatic usage: client.VerifyAppDomain(nil).List(nil, nil) or
// client.VerifyAppDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifyAppDomain(data map[string]any) ComposalEntityBase {
	return NewVerifyAppDomainEntityFunc(sdk, data)
}


// VerifyBrowserSession returns a VerifyBrowserSession entity bound to this client.
// Idiomatic usage: client.VerifyBrowserSession(nil).List(nil, nil) or
// client.VerifyBrowserSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifyBrowserSession(data map[string]any) ComposalEntityBase {
	return NewVerifyBrowserSessionEntityFunc(sdk, data)
}


// VerifyStaticSiteDomain returns a VerifyStaticSiteDomain entity bound to this client.
// Idiomatic usage: client.VerifyStaticSiteDomain(nil).List(nil, nil) or
// client.VerifyStaticSiteDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifyStaticSiteDomain(data map[string]any) ComposalEntityBase {
	return NewVerifyStaticSiteDomainEntityFunc(sdk, data)
}


// VersionLog returns a VersionLog entity bound to this client.
// Idiomatic usage: client.VersionLog(nil).List(nil, nil) or
// client.VersionLog(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VersionLog(data map[string]any) ComposalEntityBase {
	return NewVersionLogEntityFunc(sdk, data)
}


// WebBotAuth returns a WebBotAuth entity bound to this client.
// Idiomatic usage: client.WebBotAuth(nil).List(nil, nil) or
// client.WebBotAuth(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WebBotAuth(data map[string]any) ComposalEntityBase {
	return NewWebBotAuthEntityFunc(sdk, data)
}


// WorkflowRunStep returns a WorkflowRunStep entity bound to this client.
// Idiomatic usage: client.WorkflowRunStep(nil).List(nil, nil) or
// client.WorkflowRunStep(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WorkflowRunStep(data map[string]any) ComposalEntityBase {
	return NewWorkflowRunStepEntityFunc(sdk, data)
}


// WorkflowRunStopNotice returns a WorkflowRunStopNotice entity bound to this client.
// Idiomatic usage: client.WorkflowRunStopNotice(nil).List(nil, nil) or
// client.WorkflowRunStopNotice(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WorkflowRunStopNotice(data map[string]any) ComposalEntityBase {
	return NewWorkflowRunStopNoticeEntityFunc(sdk, data)
}


// WorkflowTriggerSkipped returns a WorkflowTriggerSkipped entity bound to this client.
// Idiomatic usage: client.WorkflowTriggerSkipped(nil).List(nil, nil) or
// client.WorkflowTriggerSkipped(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WorkflowTriggerSkipped(data map[string]any) ComposalEntityBase {
	return NewWorkflowTriggerSkippedEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *ComposalSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewComposalSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
