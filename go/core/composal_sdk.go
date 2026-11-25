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


// A2aWellKnown returns a A2aWellKnown entity bound to this client.
// Idiomatic usage: client.A2aWellKnown(nil).List(nil, nil) or
// client.A2aWellKnown(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) A2aWellKnown(data map[string]any) ComposalEntityBase {
	return NewA2aWellKnownEntityFunc(sdk, data)
}


// AdminOrg returns a AdminOrg entity bound to this client.
// Idiomatic usage: client.AdminOrg(nil).List(nil, nil) or
// client.AdminOrg(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AdminOrg(data map[string]any) ComposalEntityBase {
	return NewAdminOrgEntityFunc(sdk, data)
}


// Agent returns a Agent entity bound to this client.
// Idiomatic usage: client.Agent(nil).List(nil, nil) or
// client.Agent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Agent(data map[string]any) ComposalEntityBase {
	return NewAgentEntityFunc(sdk, data)
}


// AgentApp returns a AgentApp entity bound to this client.
// Idiomatic usage: client.AgentApp(nil).List(nil, nil) or
// client.AgentApp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentApp(data map[string]any) ComposalEntityBase {
	return NewAgentAppEntityFunc(sdk, data)
}


// AgentAppInstall returns a AgentAppInstall entity bound to this client.
// Idiomatic usage: client.AgentAppInstall(nil).List(nil, nil) or
// client.AgentAppInstall(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentAppInstall(data map[string]any) ComposalEntityBase {
	return NewAgentAppInstallEntityFunc(sdk, data)
}


// AgentAttachment returns a AgentAttachment entity bound to this client.
// Idiomatic usage: client.AgentAttachment(nil).List(nil, nil) or
// client.AgentAttachment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentAttachment(data map[string]any) ComposalEntityBase {
	return NewAgentAttachmentEntityFunc(sdk, data)
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


// AgentConnectionDelegation returns a AgentConnectionDelegation entity bound to this client.
// Idiomatic usage: client.AgentConnectionDelegation(nil).List(nil, nil) or
// client.AgentConnectionDelegation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentConnectionDelegation(data map[string]any) ComposalEntityBase {
	return NewAgentConnectionDelegationEntityFunc(sdk, data)
}


// AgentConnectionGrant returns a AgentConnectionGrant entity bound to this client.
// Idiomatic usage: client.AgentConnectionGrant(nil).List(nil, nil) or
// client.AgentConnectionGrant(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentConnectionGrant(data map[string]any) ComposalEntityBase {
	return NewAgentConnectionGrantEntityFunc(sdk, data)
}


// AgentConnectionResource returns a AgentConnectionResource entity bound to this client.
// Idiomatic usage: client.AgentConnectionResource(nil).List(nil, nil) or
// client.AgentConnectionResource(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentConnectionResource(data map[string]any) ComposalEntityBase {
	return NewAgentConnectionResourceEntityFunc(sdk, data)
}


// AgentConnectionSafetyControl returns a AgentConnectionSafetyControl entity bound to this client.
// Idiomatic usage: client.AgentConnectionSafetyControl(nil).List(nil, nil) or
// client.AgentConnectionSafetyControl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentConnectionSafetyControl(data map[string]any) ComposalEntityBase {
	return NewAgentConnectionSafetyControlEntityFunc(sdk, data)
}


// AgentConnectionTriggerSubscription returns a AgentConnectionTriggerSubscription entity bound to this client.
// Idiomatic usage: client.AgentConnectionTriggerSubscription(nil).List(nil, nil) or
// client.AgentConnectionTriggerSubscription(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentConnectionTriggerSubscription(data map[string]any) ComposalEntityBase {
	return NewAgentConnectionTriggerSubscriptionEntityFunc(sdk, data)
}


// AgentContextCheckpoint returns a AgentContextCheckpoint entity bound to this client.
// Idiomatic usage: client.AgentContextCheckpoint(nil).List(nil, nil) or
// client.AgentContextCheckpoint(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentContextCheckpoint(data map[string]any) ComposalEntityBase {
	return NewAgentContextCheckpointEntityFunc(sdk, data)
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


// AgentEvent returns a AgentEvent entity bound to this client.
// Idiomatic usage: client.AgentEvent(nil).List(nil, nil) or
// client.AgentEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentEvent(data map[string]any) ComposalEntityBase {
	return NewAgentEventEntityFunc(sdk, data)
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


// AgentIntegrationAccount returns a AgentIntegrationAccount entity bound to this client.
// Idiomatic usage: client.AgentIntegrationAccount(nil).List(nil, nil) or
// client.AgentIntegrationAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentIntegrationAccount(data map[string]any) ComposalEntityBase {
	return NewAgentIntegrationAccountEntityFunc(sdk, data)
}


// AgentIntegrationCallback returns a AgentIntegrationCallback entity bound to this client.
// Idiomatic usage: client.AgentIntegrationCallback(nil).List(nil, nil) or
// client.AgentIntegrationCallback(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentIntegrationCallback(data map[string]any) ComposalEntityBase {
	return NewAgentIntegrationCallbackEntityFunc(sdk, data)
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


// AgentRelayFileGrant returns a AgentRelayFileGrant entity bound to this client.
// Idiomatic usage: client.AgentRelayFileGrant(nil).List(nil, nil) or
// client.AgentRelayFileGrant(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentRelayFileGrant(data map[string]any) ComposalEntityBase {
	return NewAgentRelayFileGrantEntityFunc(sdk, data)
}


// AgentRelayFileGrantAccount returns a AgentRelayFileGrantAccount entity bound to this client.
// Idiomatic usage: client.AgentRelayFileGrantAccount(nil).List(nil, nil) or
// client.AgentRelayFileGrantAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentRelayFileGrantAccount(data map[string]any) ComposalEntityBase {
	return NewAgentRelayFileGrantAccountEntityFunc(sdk, data)
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


// AgentRoder returns a AgentRoder entity bound to this client.
// Idiomatic usage: client.AgentRoder(nil).List(nil, nil) or
// client.AgentRoder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentRoder(data map[string]any) ComposalEntityBase {
	return NewAgentRoderEntityFunc(sdk, data)
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


// AgentSession returns a AgentSession entity bound to this client.
// Idiomatic usage: client.AgentSession(nil).List(nil, nil) or
// client.AgentSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSession(data map[string]any) ComposalEntityBase {
	return NewAgentSessionEntityFunc(sdk, data)
}


// AgentSessionCheckpoint returns a AgentSessionCheckpoint entity bound to this client.
// Idiomatic usage: client.AgentSessionCheckpoint(nil).List(nil, nil) or
// client.AgentSessionCheckpoint(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSessionCheckpoint(data map[string]any) ComposalEntityBase {
	return NewAgentSessionCheckpointEntityFunc(sdk, data)
}


// AgentSessionRoderHandoff returns a AgentSessionRoderHandoff entity bound to this client.
// Idiomatic usage: client.AgentSessionRoderHandoff(nil).List(nil, nil) or
// client.AgentSessionRoderHandoff(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSessionRoderHandoff(data map[string]any) ComposalEntityBase {
	return NewAgentSessionRoderHandoffEntityFunc(sdk, data)
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


// AgentSwarm returns a AgentSwarm entity bound to this client.
// Idiomatic usage: client.AgentSwarm(nil).List(nil, nil) or
// client.AgentSwarm(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentSwarm(data map[string]any) ComposalEntityBase {
	return NewAgentSwarmEntityFunc(sdk, data)
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


// AgentUsage returns a AgentUsage entity bound to this client.
// Idiomatic usage: client.AgentUsage(nil).List(nil, nil) or
// client.AgentUsage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentUsage(data map[string]any) ComposalEntityBase {
	return NewAgentUsageEntityFunc(sdk, data)
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


// AgentWebPreview returns a AgentWebPreview entity bound to this client.
// Idiomatic usage: client.AgentWebPreview(nil).List(nil, nil) or
// client.AgentWebPreview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgentWebPreview(data map[string]any) ComposalEntityBase {
	return NewAgentWebPreviewEntityFunc(sdk, data)
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


// Agreement returns a Agreement entity bound to this client.
// Idiomatic usage: client.Agreement(nil).List(nil, nil) or
// client.Agreement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Agreement(data map[string]any) ComposalEntityBase {
	return NewAgreementEntityFunc(sdk, data)
}


// AgreementAccessRequest returns a AgreementAccessRequest entity bound to this client.
// Idiomatic usage: client.AgreementAccessRequest(nil).List(nil, nil) or
// client.AgreementAccessRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AgreementAccessRequest(data map[string]any) ComposalEntityBase {
	return NewAgreementAccessRequestEntityFunc(sdk, data)
}


// AlertRuleEvent returns a AlertRuleEvent entity bound to this client.
// Idiomatic usage: client.AlertRuleEvent(nil).List(nil, nil) or
// client.AlertRuleEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AlertRuleEvent(data map[string]any) ComposalEntityBase {
	return NewAlertRuleEventEntityFunc(sdk, data)
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


// AppAccess returns a AppAccess entity bound to this client.
// Idiomatic usage: client.AppAccess(nil).List(nil, nil) or
// client.AppAccess(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppAccess(data map[string]any) ComposalEntityBase {
	return NewAppAccessEntityFunc(sdk, data)
}


// AppAccessJwk returns a AppAccessJwk entity bound to this client.
// Idiomatic usage: client.AppAccessJwk(nil).List(nil, nil) or
// client.AppAccessJwk(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppAccessJwk(data map[string]any) ComposalEntityBase {
	return NewAppAccessJwkEntityFunc(sdk, data)
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


// AppDeploymentDashboard returns a AppDeploymentDashboard entity bound to this client.
// Idiomatic usage: client.AppDeploymentDashboard(nil).List(nil, nil) or
// client.AppDeploymentDashboard(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AppDeploymentDashboard(data map[string]any) ComposalEntityBase {
	return NewAppDeploymentDashboardEntityFunc(sdk, data)
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


// Artefact returns a Artefact entity bound to this client.
// Idiomatic usage: client.Artefact(nil).List(nil, nil) or
// client.Artefact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Artefact(data map[string]any) ComposalEntityBase {
	return NewArtefactEntityFunc(sdk, data)
}


// ArtefactCommentThread returns a ArtefactCommentThread entity bound to this client.
// Idiomatic usage: client.ArtefactCommentThread(nil).List(nil, nil) or
// client.ArtefactCommentThread(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ArtefactCommentThread(data map[string]any) ComposalEntityBase {
	return NewArtefactCommentThreadEntityFunc(sdk, data)
}


// ArtefactRevision returns a ArtefactRevision entity bound to this client.
// Idiomatic usage: client.ArtefactRevision(nil).List(nil, nil) or
// client.ArtefactRevision(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ArtefactRevision(data map[string]any) ComposalEntityBase {
	return NewArtefactRevisionEntityFunc(sdk, data)
}


// ArtefactViewToken returns a ArtefactViewToken entity bound to this client.
// Idiomatic usage: client.ArtefactViewToken(nil).List(nil, nil) or
// client.ArtefactViewToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ArtefactViewToken(data map[string]any) ComposalEntityBase {
	return NewArtefactViewTokenEntityFunc(sdk, data)
}


// Artifact returns a Artifact entity bound to this client.
// Idiomatic usage: client.Artifact(nil).List(nil, nil) or
// client.Artifact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Artifact(data map[string]any) ComposalEntityBase {
	return NewArtifactEntityFunc(sdk, data)
}


// ArtifactCacheNamespace returns a ArtifactCacheNamespace entity bound to this client.
// Idiomatic usage: client.ArtifactCacheNamespace(nil).List(nil, nil) or
// client.ArtifactCacheNamespace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ArtifactCacheNamespace(data map[string]any) ComposalEntityBase {
	return NewArtifactCacheNamespaceEntityFunc(sdk, data)
}


// ArtifactImageRepository returns a ArtifactImageRepository entity bound to this client.
// Idiomatic usage: client.ArtifactImageRepository(nil).List(nil, nil) or
// client.ArtifactImageRepository(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ArtifactImageRepository(data map[string]any) ComposalEntityBase {
	return NewArtifactImageRepositoryEntityFunc(sdk, data)
}


// ArtifactPackageMirror returns a ArtifactPackageMirror entity bound to this client.
// Idiomatic usage: client.ArtifactPackageMirror(nil).List(nil, nil) or
// client.ArtifactPackageMirror(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ArtifactPackageMirror(data map[string]any) ComposalEntityBase {
	return NewArtifactPackageMirrorEntityFunc(sdk, data)
}


// ArtifactRetentionPolicy returns a ArtifactRetentionPolicy entity bound to this client.
// Idiomatic usage: client.ArtifactRetentionPolicy(nil).List(nil, nil) or
// client.ArtifactRetentionPolicy(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ArtifactRetentionPolicy(data map[string]any) ComposalEntityBase {
	return NewArtifactRetentionPolicyEntityFunc(sdk, data)
}


// AttachmentPart returns a AttachmentPart entity bound to this client.
// Idiomatic usage: client.AttachmentPart(nil).List(nil, nil) or
// client.AttachmentPart(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AttachmentPart(data map[string]any) ComposalEntityBase {
	return NewAttachmentPartEntityFunc(sdk, data)
}


// AuditEvent returns a AuditEvent entity bound to this client.
// Idiomatic usage: client.AuditEvent(nil).List(nil, nil) or
// client.AuditEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AuditEvent(data map[string]any) ComposalEntityBase {
	return NewAuditEventEntityFunc(sdk, data)
}


// Auth returns a Auth entity bound to this client.
// Idiomatic usage: client.Auth(nil).List(nil, nil) or
// client.Auth(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Auth(data map[string]any) ComposalEntityBase {
	return NewAuthEntityFunc(sdk, data)
}


// AuthCli returns a AuthCli entity bound to this client.
// Idiomatic usage: client.AuthCli(nil).List(nil, nil) or
// client.AuthCli(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AuthCli(data map[string]any) ComposalEntityBase {
	return NewAuthCliEntityFunc(sdk, data)
}


// AuthGithub returns a AuthGithub entity bound to this client.
// Idiomatic usage: client.AuthGithub(nil).List(nil, nil) or
// client.AuthGithub(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AuthGithub(data map[string]any) ComposalEntityBase {
	return NewAuthGithubEntityFunc(sdk, data)
}


// AuthGoogle returns a AuthGoogle entity bound to this client.
// Idiomatic usage: client.AuthGoogle(nil).List(nil, nil) or
// client.AuthGoogle(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AuthGoogle(data map[string]any) ComposalEntityBase {
	return NewAuthGoogleEntityFunc(sdk, data)
}


// AuthOpenai returns a AuthOpenai entity bound to this client.
// Idiomatic usage: client.AuthOpenai(nil).List(nil, nil) or
// client.AuthOpenai(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AuthOpenai(data map[string]any) ComposalEntityBase {
	return NewAuthOpenaiEntityFunc(sdk, data)
}


// AuthPasswordReset returns a AuthPasswordReset entity bound to this client.
// Idiomatic usage: client.AuthPasswordReset(nil).List(nil, nil) or
// client.AuthPasswordReset(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AuthPasswordReset(data map[string]any) ComposalEntityBase {
	return NewAuthPasswordResetEntityFunc(sdk, data)
}


// AuthRegistrationOption returns a AuthRegistrationOption entity bound to this client.
// Idiomatic usage: client.AuthRegistrationOption(nil).List(nil, nil) or
// client.AuthRegistrationOption(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) AuthRegistrationOption(data map[string]any) ComposalEntityBase {
	return NewAuthRegistrationOptionEntityFunc(sdk, data)
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


// BackendRunnerPool returns a BackendRunnerPool entity bound to this client.
// Idiomatic usage: client.BackendRunnerPool(nil).List(nil, nil) or
// client.BackendRunnerPool(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BackendRunnerPool(data map[string]any) ComposalEntityBase {
	return NewBackendRunnerPoolEntityFunc(sdk, data)
}


// Bazel returns a Bazel entity bound to this client.
// Idiomatic usage: client.Bazel(nil).List(nil, nil) or
// client.Bazel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Bazel(data map[string]any) ComposalEntityBase {
	return NewBazelEntityFunc(sdk, data)
}


// BazelActionResult returns a BazelActionResult entity bound to this client.
// Idiomatic usage: client.BazelActionResult(nil).List(nil, nil) or
// client.BazelActionResult(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BazelActionResult(data map[string]any) ComposalEntityBase {
	return NewBazelActionResultEntityFunc(sdk, data)
}


// BazelBackend returns a BazelBackend entity bound to this client.
// Idiomatic usage: client.BazelBackend(nil).List(nil, nil) or
// client.BazelBackend(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BazelBackend(data map[string]any) ComposalEntityBase {
	return NewBazelBackendEntityFunc(sdk, data)
}


// BazelBlob returns a BazelBlob entity bound to this client.
// Idiomatic usage: client.BazelBlob(nil).List(nil, nil) or
// client.BazelBlob(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BazelBlob(data map[string]any) ComposalEntityBase {
	return NewBazelBlobEntityFunc(sdk, data)
}


// BazelExecution returns a BazelExecution entity bound to this client.
// Idiomatic usage: client.BazelExecution(nil).List(nil, nil) or
// client.BazelExecution(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BazelExecution(data map[string]any) ComposalEntityBase {
	return NewBazelExecutionEntityFunc(sdk, data)
}


// BazelFindMissingBlob returns a BazelFindMissingBlob entity bound to this client.
// Idiomatic usage: client.BazelFindMissingBlob(nil).List(nil, nil) or
// client.BazelFindMissingBlob(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BazelFindMissingBlob(data map[string]any) ComposalEntityBase {
	return NewBazelFindMissingBlobEntityFunc(sdk, data)
}


// Billing returns a Billing entity bound to this client.
// Idiomatic usage: client.Billing(nil).List(nil, nil) or
// client.Billing(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Billing(data map[string]any) ComposalEntityBase {
	return NewBillingEntityFunc(sdk, data)
}


// BillingAddon returns a BillingAddon entity bound to this client.
// Idiomatic usage: client.BillingAddon(nil).List(nil, nil) or
// client.BillingAddon(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingAddon(data map[string]any) ComposalEntityBase {
	return NewBillingAddonEntityFunc(sdk, data)
}


// BillingBudget returns a BillingBudget entity bound to this client.
// Idiomatic usage: client.BillingBudget(nil).List(nil, nil) or
// client.BillingBudget(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingBudget(data map[string]any) ComposalEntityBase {
	return NewBillingBudgetEntityFunc(sdk, data)
}


// BillingCheckoutSession returns a BillingCheckoutSession entity bound to this client.
// Idiomatic usage: client.BillingCheckoutSession(nil).List(nil, nil) or
// client.BillingCheckoutSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingCheckoutSession(data map[string]any) ComposalEntityBase {
	return NewBillingCheckoutSessionEntityFunc(sdk, data)
}


// BillingContact returns a BillingContact entity bound to this client.
// Idiomatic usage: client.BillingContact(nil).List(nil, nil) or
// client.BillingContact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingContact(data map[string]any) ComposalEntityBase {
	return NewBillingContactEntityFunc(sdk, data)
}


// BillingExtraSpend returns a BillingExtraSpend entity bound to this client.
// Idiomatic usage: client.BillingExtraSpend(nil).List(nil, nil) or
// client.BillingExtraSpend(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingExtraSpend(data map[string]any) ComposalEntityBase {
	return NewBillingExtraSpendEntityFunc(sdk, data)
}


// BillingInvoice returns a BillingInvoice entity bound to this client.
// Idiomatic usage: client.BillingInvoice(nil).List(nil, nil) or
// client.BillingInvoice(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingInvoice(data map[string]any) ComposalEntityBase {
	return NewBillingInvoiceEntityFunc(sdk, data)
}


// BillingPackage returns a BillingPackage entity bound to this client.
// Idiomatic usage: client.BillingPackage(nil).List(nil, nil) or
// client.BillingPackage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingPackage(data map[string]any) ComposalEntityBase {
	return NewBillingPackageEntityFunc(sdk, data)
}


// BillingPortalSession returns a BillingPortalSession entity bound to this client.
// Idiomatic usage: client.BillingPortalSession(nil).List(nil, nil) or
// client.BillingPortalSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingPortalSession(data map[string]any) ComposalEntityBase {
	return NewBillingPortalSessionEntityFunc(sdk, data)
}


// BillingPrepaidPeriod returns a BillingPrepaidPeriod entity bound to this client.
// Idiomatic usage: client.BillingPrepaidPeriod(nil).List(nil, nil) or
// client.BillingPrepaidPeriod(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingPrepaidPeriod(data map[string]any) ComposalEntityBase {
	return NewBillingPrepaidPeriodEntityFunc(sdk, data)
}


// BillingPrepaidPurchase returns a BillingPrepaidPurchase entity bound to this client.
// Idiomatic usage: client.BillingPrepaidPurchase(nil).List(nil, nil) or
// client.BillingPrepaidPurchase(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingPrepaidPurchase(data map[string]any) ComposalEntityBase {
	return NewBillingPrepaidPurchaseEntityFunc(sdk, data)
}


// BillingSubscription returns a BillingSubscription entity bound to this client.
// Idiomatic usage: client.BillingSubscription(nil).List(nil, nil) or
// client.BillingSubscription(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingSubscription(data map[string]any) ComposalEntityBase {
	return NewBillingSubscriptionEntityFunc(sdk, data)
}


// BillingTokenTopUp returns a BillingTokenTopUp entity bound to this client.
// Idiomatic usage: client.BillingTokenTopUp(nil).List(nil, nil) or
// client.BillingTokenTopUp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingTokenTopUp(data map[string]any) ComposalEntityBase {
	return NewBillingTokenTopUpEntityFunc(sdk, data)
}


// BillingUsage returns a BillingUsage entity bound to this client.
// Idiomatic usage: client.BillingUsage(nil).List(nil, nil) or
// client.BillingUsage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BillingUsage(data map[string]any) ComposalEntityBase {
	return NewBillingUsageEntityFunc(sdk, data)
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


// BookmarkProtectionRefreshGithubRequiredCheck returns a BookmarkProtectionRefreshGithubRequiredCheck entity bound to this client.
// Idiomatic usage: client.BookmarkProtectionRefreshGithubRequiredCheck(nil).List(nil, nil) or
// client.BookmarkProtectionRefreshGithubRequiredCheck(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) BookmarkProtectionRefreshGithubRequiredCheck(data map[string]any) ComposalEntityBase {
	return NewBookmarkProtectionRefreshGithubRequiredCheckEntityFunc(sdk, data)
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


// CacheNamespaceEntry returns a CacheNamespaceEntry entity bound to this client.
// Idiomatic usage: client.CacheNamespaceEntry(nil).List(nil, nil) or
// client.CacheNamespaceEntry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CacheNamespaceEntry(data map[string]any) ComposalEntityBase {
	return NewCacheNamespaceEntryEntityFunc(sdk, data)
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


// Change returns a Change entity bound to this client.
// Idiomatic usage: client.Change(nil).List(nil, nil) or
// client.Change(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Change(data map[string]any) ComposalEntityBase {
	return NewChangeEntityFunc(sdk, data)
}


// ChangeAsset returns a ChangeAsset entity bound to this client.
// Idiomatic usage: client.ChangeAsset(nil).List(nil, nil) or
// client.ChangeAsset(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeAsset(data map[string]any) ComposalEntityBase {
	return NewChangeAssetEntityFunc(sdk, data)
}


// ChangeComment returns a ChangeComment entity bound to this client.
// Idiomatic usage: client.ChangeComment(nil).List(nil, nil) or
// client.ChangeComment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeComment(data map[string]any) ComposalEntityBase {
	return NewChangeCommentEntityFunc(sdk, data)
}


// ChangeFileReviewCheckpoint returns a ChangeFileReviewCheckpoint entity bound to this client.
// Idiomatic usage: client.ChangeFileReviewCheckpoint(nil).List(nil, nil) or
// client.ChangeFileReviewCheckpoint(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeFileReviewCheckpoint(data map[string]any) ComposalEntityBase {
	return NewChangeFileReviewCheckpointEntityFunc(sdk, data)
}


// ChangeGitBranchSubmission returns a ChangeGitBranchSubmission entity bound to this client.
// Idiomatic usage: client.ChangeGitBranchSubmission(nil).List(nil, nil) or
// client.ChangeGitBranchSubmission(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeGitBranchSubmission(data map[string]any) ComposalEntityBase {
	return NewChangeGitBranchSubmissionEntityFunc(sdk, data)
}


// ChangeGitCommitIdentity returns a ChangeGitCommitIdentity entity bound to this client.
// Idiomatic usage: client.ChangeGitCommitIdentity(nil).List(nil, nil) or
// client.ChangeGitCommitIdentity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeGitCommitIdentity(data map[string]any) ComposalEntityBase {
	return NewChangeGitCommitIdentityEntityFunc(sdk, data)
}


// ChangeGitPublication returns a ChangeGitPublication entity bound to this client.
// Idiomatic usage: client.ChangeGitPublication(nil).List(nil, nil) or
// client.ChangeGitPublication(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeGitPublication(data map[string]any) ComposalEntityBase {
	return NewChangeGitPublicationEntityFunc(sdk, data)
}


// ChangeGroupMember returns a ChangeGroupMember entity bound to this client.
// Idiomatic usage: client.ChangeGroupMember(nil).List(nil, nil) or
// client.ChangeGroupMember(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeGroupMember(data map[string]any) ComposalEntityBase {
	return NewChangeGroupMemberEntityFunc(sdk, data)
}


// ChangeLabel returns a ChangeLabel entity bound to this client.
// Idiomatic usage: client.ChangeLabel(nil).List(nil, nil) or
// client.ChangeLabel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeLabel(data map[string]any) ComposalEntityBase {
	return NewChangeLabelEntityFunc(sdk, data)
}


// ChangeLandingHold returns a ChangeLandingHold entity bound to this client.
// Idiomatic usage: client.ChangeLandingHold(nil).List(nil, nil) or
// client.ChangeLandingHold(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeLandingHold(data map[string]any) ComposalEntityBase {
	return NewChangeLandingHoldEntityFunc(sdk, data)
}


// ChangeLandingRequest returns a ChangeLandingRequest entity bound to this client.
// Idiomatic usage: client.ChangeLandingRequest(nil).List(nil, nil) or
// client.ChangeLandingRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeLandingRequest(data map[string]any) ComposalEntityBase {
	return NewChangeLandingRequestEntityFunc(sdk, data)
}


// ChangeRequestChange returns a ChangeRequestChange entity bound to this client.
// Idiomatic usage: client.ChangeRequestChange(nil).List(nil, nil) or
// client.ChangeRequestChange(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeRequestChange(data map[string]any) ComposalEntityBase {
	return NewChangeRequestChangeEntityFunc(sdk, data)
}


// ChangeReviewer returns a ChangeReviewer entity bound to this client.
// Idiomatic usage: client.ChangeReviewer(nil).List(nil, nil) or
// client.ChangeReviewer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeReviewer(data map[string]any) ComposalEntityBase {
	return NewChangeReviewerEntityFunc(sdk, data)
}


// ChangeTranscript returns a ChangeTranscript entity bound to this client.
// Idiomatic usage: client.ChangeTranscript(nil).List(nil, nil) or
// client.ChangeTranscript(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeTranscript(data map[string]any) ComposalEntityBase {
	return NewChangeTranscriptEntityFunc(sdk, data)
}


// ChangeTranscriptSummary returns a ChangeTranscriptSummary entity bound to this client.
// Idiomatic usage: client.ChangeTranscriptSummary(nil).List(nil, nil) or
// client.ChangeTranscriptSummary(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ChangeTranscriptSummary(data map[string]any) ComposalEntityBase {
	return NewChangeTranscriptSummaryEntityFunc(sdk, data)
}


// CheckpointPrepareChunk returns a CheckpointPrepareChunk entity bound to this client.
// Idiomatic usage: client.CheckpointPrepareChunk(nil).List(nil, nil) or
// client.CheckpointPrepareChunk(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CheckpointPrepareChunk(data map[string]any) ComposalEntityBase {
	return NewCheckpointPrepareChunkEntityFunc(sdk, data)
}


// CiNode returns a CiNode entity bound to this client.
// Idiomatic usage: client.CiNode(nil).List(nil, nil) or
// client.CiNode(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CiNode(data map[string]any) ComposalEntityBase {
	return NewCiNodeEntityFunc(sdk, data)
}


// CiPipeline returns a CiPipeline entity bound to this client.
// Idiomatic usage: client.CiPipeline(nil).List(nil, nil) or
// client.CiPipeline(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CiPipeline(data map[string]any) ComposalEntityBase {
	return NewCiPipelineEntityFunc(sdk, data)
}


// CiPipelineRun returns a CiPipelineRun entity bound to this client.
// Idiomatic usage: client.CiPipelineRun(nil).List(nil, nil) or
// client.CiPipelineRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CiPipelineRun(data map[string]any) ComposalEntityBase {
	return NewCiPipelineRunEntityFunc(sdk, data)
}


// CiRunnerPool returns a CiRunnerPool entity bound to this client.
// Idiomatic usage: client.CiRunnerPool(nil).List(nil, nil) or
// client.CiRunnerPool(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CiRunnerPool(data map[string]any) ComposalEntityBase {
	return NewCiRunnerPoolEntityFunc(sdk, data)
}


// CiStatus returns a CiStatus entity bound to this client.
// Idiomatic usage: client.CiStatus(nil).List(nil, nil) or
// client.CiStatus(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CiStatus(data map[string]any) ComposalEntityBase {
	return NewCiStatusEntityFunc(sdk, data)
}


// CliEvent returns a CliEvent entity bound to this client.
// Idiomatic usage: client.CliEvent(nil).List(nil, nil) or
// client.CliEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CliEvent(data map[string]any) ComposalEntityBase {
	return NewCliEventEntityFunc(sdk, data)
}


// CliRelease returns a CliRelease entity bound to this client.
// Idiomatic usage: client.CliRelease(nil).List(nil, nil) or
// client.CliRelease(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CliRelease(data map[string]any) ComposalEntityBase {
	return NewCliReleaseEntityFunc(sdk, data)
}


// CloudWorkspaceBackupObject returns a CloudWorkspaceBackupObject entity bound to this client.
// Idiomatic usage: client.CloudWorkspaceBackupObject(nil).List(nil, nil) or
// client.CloudWorkspaceBackupObject(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CloudWorkspaceBackupObject(data map[string]any) ComposalEntityBase {
	return NewCloudWorkspaceBackupObjectEntityFunc(sdk, data)
}


// CodeRuleEvaluation returns a CodeRuleEvaluation entity bound to this client.
// Idiomatic usage: client.CodeRuleEvaluation(nil).List(nil, nil) or
// client.CodeRuleEvaluation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CodeRuleEvaluation(data map[string]any) ComposalEntityBase {
	return NewCodeRuleEvaluationEntityFunc(sdk, data)
}


// ComSiteAccess returns a ComSiteAccess entity bound to this client.
// Idiomatic usage: client.ComSiteAccess(nil).List(nil, nil) or
// client.ComSiteAccess(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ComSiteAccess(data map[string]any) ComposalEntityBase {
	return NewComSiteAccessEntityFunc(sdk, data)
}


// ComSiteAccessSession returns a ComSiteAccessSession entity bound to this client.
// Idiomatic usage: client.ComSiteAccessSession(nil).List(nil, nil) or
// client.ComSiteAccessSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ComSiteAccessSession(data map[string]any) ComposalEntityBase {
	return NewComSiteAccessSessionEntityFunc(sdk, data)
}


// CommentThreadComment returns a CommentThreadComment entity bound to this client.
// Idiomatic usage: client.CommentThreadComment(nil).List(nil, nil) or
// client.CommentThreadComment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CommentThreadComment(data map[string]any) ComposalEntityBase {
	return NewCommentThreadCommentEntityFunc(sdk, data)
}


// CommitDiff returns a CommitDiff entity bound to this client.
// Idiomatic usage: client.CommitDiff(nil).List(nil, nil) or
// client.CommitDiff(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) CommitDiff(data map[string]any) ComposalEntityBase {
	return NewCommitDiffEntityFunc(sdk, data)
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


// ContactSubmission returns a ContactSubmission entity bound to this client.
// Idiomatic usage: client.ContactSubmission(nil).List(nil, nil) or
// client.ContactSubmission(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ContactSubmission(data map[string]any) ComposalEntityBase {
	return NewContactSubmissionEntityFunc(sdk, data)
}


// ControlComputer returns a ControlComputer entity bound to this client.
// Idiomatic usage: client.ControlComputer(nil).List(nil, nil) or
// client.ControlComputer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ControlComputer(data map[string]any) ComposalEntityBase {
	return NewControlComputerEntityFunc(sdk, data)
}


// ControlComputerControlOperation returns a ControlComputerControlOperation entity bound to this client.
// Idiomatic usage: client.ControlComputerControlOperation(nil).List(nil, nil) or
// client.ControlComputerControlOperation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ControlComputerControlOperation(data map[string]any) ComposalEntityBase {
	return NewControlComputerControlOperationEntityFunc(sdk, data)
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


// Deployment returns a Deployment entity bound to this client.
// Idiomatic usage: client.Deployment(nil).List(nil, nil) or
// client.Deployment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Deployment(data map[string]any) ComposalEntityBase {
	return NewDeploymentEntityFunc(sdk, data)
}


// DeploymentDashboardNomad returns a DeploymentDashboardNomad entity bound to this client.
// Idiomatic usage: client.DeploymentDashboardNomad(nil).List(nil, nil) or
// client.DeploymentDashboardNomad(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentDashboardNomad(data map[string]any) ComposalEntityBase {
	return NewDeploymentDashboardNomadEntityFunc(sdk, data)
}


// DeploymentDetail returns a DeploymentDetail entity bound to this client.
// Idiomatic usage: client.DeploymentDetail(nil).List(nil, nil) or
// client.DeploymentDetail(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentDetail(data map[string]any) ComposalEntityBase {
	return NewDeploymentDetailEntityFunc(sdk, data)
}


// DeploymentFile returns a DeploymentFile entity bound to this client.
// Idiomatic usage: client.DeploymentFile(nil).List(nil, nil) or
// client.DeploymentFile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentFile(data map[string]any) ComposalEntityBase {
	return NewDeploymentFileEntityFunc(sdk, data)
}


// DeploymentLog returns a DeploymentLog entity bound to this client.
// Idiomatic usage: client.DeploymentLog(nil).List(nil, nil) or
// client.DeploymentLog(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentLog(data map[string]any) ComposalEntityBase {
	return NewDeploymentLogEntityFunc(sdk, data)
}


// DeploymentMetric returns a DeploymentMetric entity bound to this client.
// Idiomatic usage: client.DeploymentMetric(nil).List(nil, nil) or
// client.DeploymentMetric(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentMetric(data map[string]any) ComposalEntityBase {
	return NewDeploymentMetricEntityFunc(sdk, data)
}


// DeploymentPreview returns a DeploymentPreview entity bound to this client.
// Idiomatic usage: client.DeploymentPreview(nil).List(nil, nil) or
// client.DeploymentPreview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentPreview(data map[string]any) ComposalEntityBase {
	return NewDeploymentPreviewEntityFunc(sdk, data)
}


// DeploymentSetting returns a DeploymentSetting entity bound to this client.
// Idiomatic usage: client.DeploymentSetting(nil).List(nil, nil) or
// client.DeploymentSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeploymentSetting(data map[string]any) ComposalEntityBase {
	return NewDeploymentSettingEntityFunc(sdk, data)
}


// DesktopLocalAgentModel returns a DesktopLocalAgentModel entity bound to this client.
// Idiomatic usage: client.DesktopLocalAgentModel(nil).List(nil, nil) or
// client.DesktopLocalAgentModel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DesktopLocalAgentModel(data map[string]any) ComposalEntityBase {
	return NewDesktopLocalAgentModelEntityFunc(sdk, data)
}


// DesktopLocalAgentResponse returns a DesktopLocalAgentResponse entity bound to this client.
// Idiomatic usage: client.DesktopLocalAgentResponse(nil).List(nil, nil) or
// client.DesktopLocalAgentResponse(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DesktopLocalAgentResponse(data map[string]any) ComposalEntityBase {
	return NewDesktopLocalAgentResponseEntityFunc(sdk, data)
}


// Device returns a Device entity bound to this client.
// Idiomatic usage: client.Device(nil).List(nil, nil) or
// client.Device(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Device(data map[string]any) ComposalEntityBase {
	return NewDeviceEntityFunc(sdk, data)
}


// DeviceBrowserOperation returns a DeviceBrowserOperation entity bound to this client.
// Idiomatic usage: client.DeviceBrowserOperation(nil).List(nil, nil) or
// client.DeviceBrowserOperation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceBrowserOperation(data map[string]any) ComposalEntityBase {
	return NewDeviceBrowserOperationEntityFunc(sdk, data)
}


// DeviceControlMessage returns a DeviceControlMessage entity bound to this client.
// Idiomatic usage: client.DeviceControlMessage(nil).List(nil, nil) or
// client.DeviceControlMessage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceControlMessage(data map[string]any) ComposalEntityBase {
	return NewDeviceControlMessageEntityFunc(sdk, data)
}


// DeviceEnterpriseRelay returns a DeviceEnterpriseRelay entity bound to this client.
// Idiomatic usage: client.DeviceEnterpriseRelay(nil).List(nil, nil) or
// client.DeviceEnterpriseRelay(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceEnterpriseRelay(data map[string]any) ComposalEntityBase {
	return NewDeviceEnterpriseRelayEntityFunc(sdk, data)
}


// DeviceFolderListing returns a DeviceFolderListing entity bound to this client.
// Idiomatic usage: client.DeviceFolderListing(nil).List(nil, nil) or
// client.DeviceFolderListing(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceFolderListing(data map[string]any) ComposalEntityBase {
	return NewDeviceFolderListingEntityFunc(sdk, data)
}


// DeviceGrant returns a DeviceGrant entity bound to this client.
// Idiomatic usage: client.DeviceGrant(nil).List(nil, nil) or
// client.DeviceGrant(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceGrant(data map[string]any) ComposalEntityBase {
	return NewDeviceGrantEntityFunc(sdk, data)
}


// DeviceInvocation returns a DeviceInvocation entity bound to this client.
// Idiomatic usage: client.DeviceInvocation(nil).List(nil, nil) or
// client.DeviceInvocation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceInvocation(data map[string]any) ComposalEntityBase {
	return NewDeviceInvocationEntityFunc(sdk, data)
}


// DeviceLocalEvent returns a DeviceLocalEvent entity bound to this client.
// Idiomatic usage: client.DeviceLocalEvent(nil).List(nil, nil) or
// client.DeviceLocalEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceLocalEvent(data map[string]any) ComposalEntityBase {
	return NewDeviceLocalEventEntityFunc(sdk, data)
}


// DeviceOperation returns a DeviceOperation entity bound to this client.
// Idiomatic usage: client.DeviceOperation(nil).List(nil, nil) or
// client.DeviceOperation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceOperation(data map[string]any) ComposalEntityBase {
	return NewDeviceOperationEntityFunc(sdk, data)
}


// DevicePairing returns a DevicePairing entity bound to this client.
// Idiomatic usage: client.DevicePairing(nil).List(nil, nil) or
// client.DevicePairing(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DevicePairing(data map[string]any) ComposalEntityBase {
	return NewDevicePairingEntityFunc(sdk, data)
}


// DeviceProject returns a DeviceProject entity bound to this client.
// Idiomatic usage: client.DeviceProject(nil).List(nil, nil) or
// client.DeviceProject(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceProject(data map[string]any) ComposalEntityBase {
	return NewDeviceProjectEntityFunc(sdk, data)
}


// DeviceScheduledCheckIn returns a DeviceScheduledCheckIn entity bound to this client.
// Idiomatic usage: client.DeviceScheduledCheckIn(nil).List(nil, nil) or
// client.DeviceScheduledCheckIn(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DeviceScheduledCheckIn(data map[string]any) ComposalEntityBase {
	return NewDeviceScheduledCheckInEntityFunc(sdk, data)
}


// DockerBuilder returns a DockerBuilder entity bound to this client.
// Idiomatic usage: client.DockerBuilder(nil).List(nil, nil) or
// client.DockerBuilder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DockerBuilder(data map[string]any) ComposalEntityBase {
	return NewDockerBuilderEntityFunc(sdk, data)
}


// DockerBuilderSession returns a DockerBuilderSession entity bound to this client.
// Idiomatic usage: client.DockerBuilderSession(nil).List(nil, nil) or
// client.DockerBuilderSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DockerBuilderSession(data map[string]any) ComposalEntityBase {
	return NewDockerBuilderSessionEntityFunc(sdk, data)
}


// DockerBuilderSetting returns a DockerBuilderSetting entity bound to this client.
// Idiomatic usage: client.DockerBuilderSetting(nil).List(nil, nil) or
// client.DockerBuilderSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DockerBuilderSetting(data map[string]any) ComposalEntityBase {
	return NewDockerBuilderSettingEntityFunc(sdk, data)
}


// DomainDnsIntegration returns a DomainDnsIntegration entity bound to this client.
// Idiomatic usage: client.DomainDnsIntegration(nil).List(nil, nil) or
// client.DomainDnsIntegration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) DomainDnsIntegration(data map[string]any) ComposalEntityBase {
	return NewDomainDnsIntegrationEntityFunc(sdk, data)
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


// Edge returns a Edge entity bound to this client.
// Idiomatic usage: client.Edge(nil).List(nil, nil) or
// client.Edge(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Edge(data map[string]any) ComposalEntityBase {
	return NewEdgeEntityFunc(sdk, data)
}


// EmailVerification returns a EmailVerification entity bound to this client.
// Idiomatic usage: client.EmailVerification(nil).List(nil, nil) or
// client.EmailVerification(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) EmailVerification(data map[string]any) ComposalEntityBase {
	return NewEmailVerificationEntityFunc(sdk, data)
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


// ExecutionDesiredState returns a ExecutionDesiredState entity bound to this client.
// Idiomatic usage: client.ExecutionDesiredState(nil).List(nil, nil) or
// client.ExecutionDesiredState(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ExecutionDesiredState(data map[string]any) ComposalEntityBase {
	return NewExecutionDesiredStateEntityFunc(sdk, data)
}


// ExecutionReconcilerTick returns a ExecutionReconcilerTick entity bound to this client.
// Idiomatic usage: client.ExecutionReconcilerTick(nil).List(nil, nil) or
// client.ExecutionReconcilerTick(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ExecutionReconcilerTick(data map[string]any) ComposalEntityBase {
	return NewExecutionReconcilerTickEntityFunc(sdk, data)
}


// ExecutionRelease returns a ExecutionRelease entity bound to this client.
// Idiomatic usage: client.ExecutionRelease(nil).List(nil, nil) or
// client.ExecutionRelease(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ExecutionRelease(data map[string]any) ComposalEntityBase {
	return NewExecutionReleaseEntityFunc(sdk, data)
}


// ExecutionRuntimeInstance returns a ExecutionRuntimeInstance entity bound to this client.
// Idiomatic usage: client.ExecutionRuntimeInstance(nil).List(nil, nil) or
// client.ExecutionRuntimeInstance(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ExecutionRuntimeInstance(data map[string]any) ComposalEntityBase {
	return NewExecutionRuntimeInstanceEntityFunc(sdk, data)
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


// Gh returns a Gh entity bound to this client.
// Idiomatic usage: client.Gh(nil).List(nil, nil) or
// client.Gh(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Gh(data map[string]any) ComposalEntityBase {
	return NewGhEntityFunc(sdk, data)
}


// GitImport returns a GitImport entity bound to this client.
// Idiomatic usage: client.GitImport(nil).List(nil, nil) or
// client.GitImport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GitImport(data map[string]any) ComposalEntityBase {
	return NewGitImportEntityFunc(sdk, data)
}


// Github returns a Github entity bound to this client.
// Idiomatic usage: client.Github(nil).List(nil, nil) or
// client.Github(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Github(data map[string]any) ComposalEntityBase {
	return NewGithubEntityFunc(sdk, data)
}


// GithubApp returns a GithubApp entity bound to this client.
// Idiomatic usage: client.GithubApp(nil).List(nil, nil) or
// client.GithubApp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubApp(data map[string]any) ComposalEntityBase {
	return NewGithubAppEntityFunc(sdk, data)
}


// GithubAppImportableRepository returns a GithubAppImportableRepository entity bound to this client.
// Idiomatic usage: client.GithubAppImportableRepository(nil).List(nil, nil) or
// client.GithubAppImportableRepository(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubAppImportableRepository(data map[string]any) ComposalEntityBase {
	return NewGithubAppImportableRepositoryEntityFunc(sdk, data)
}


// GithubAppInstallation returns a GithubAppInstallation entity bound to this client.
// Idiomatic usage: client.GithubAppInstallation(nil).List(nil, nil) or
// client.GithubAppInstallation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubAppInstallation(data map[string]any) ComposalEntityBase {
	return NewGithubAppInstallationEntityFunc(sdk, data)
}


// GithubAppInstallationAuthorization returns a GithubAppInstallationAuthorization entity bound to this client.
// Idiomatic usage: client.GithubAppInstallationAuthorization(nil).List(nil, nil) or
// client.GithubAppInstallationAuthorization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubAppInstallationAuthorization(data map[string]any) ComposalEntityBase {
	return NewGithubAppInstallationAuthorizationEntityFunc(sdk, data)
}


// GithubAppUserAuthorization returns a GithubAppUserAuthorization entity bound to this client.
// Idiomatic usage: client.GithubAppUserAuthorization(nil).List(nil, nil) or
// client.GithubAppUserAuthorization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubAppUserAuthorization(data map[string]any) ComposalEntityBase {
	return NewGithubAppUserAuthorizationEntityFunc(sdk, data)
}


// GithubCiRepository returns a GithubCiRepository entity bound to this client.
// Idiomatic usage: client.GithubCiRepository(nil).List(nil, nil) or
// client.GithubCiRepository(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubCiRepository(data map[string]any) ComposalEntityBase {
	return NewGithubCiRepositoryEntityFunc(sdk, data)
}


// GithubCiRepositoryCompatibilityReport returns a GithubCiRepositoryCompatibilityReport entity bound to this client.
// Idiomatic usage: client.GithubCiRepositoryCompatibilityReport(nil).List(nil, nil) or
// client.GithubCiRepositoryCompatibilityReport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubCiRepositoryCompatibilityReport(data map[string]any) ComposalEntityBase {
	return NewGithubCiRepositoryCompatibilityReportEntityFunc(sdk, data)
}


// GithubConnection returns a GithubConnection entity bound to this client.
// Idiomatic usage: client.GithubConnection(nil).List(nil, nil) or
// client.GithubConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubConnection(data map[string]any) ComposalEntityBase {
	return NewGithubConnectionEntityFunc(sdk, data)
}


// GithubOnboarding returns a GithubOnboarding entity bound to this client.
// Idiomatic usage: client.GithubOnboarding(nil).List(nil, nil) or
// client.GithubOnboarding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubOnboarding(data map[string]any) ComposalEntityBase {
	return NewGithubOnboardingEntityFunc(sdk, data)
}


// GithubOnboardingBranch returns a GithubOnboardingBranch entity bound to this client.
// Idiomatic usage: client.GithubOnboardingBranch(nil).List(nil, nil) or
// client.GithubOnboardingBranch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubOnboardingBranch(data map[string]any) ComposalEntityBase {
	return NewGithubOnboardingBranchEntityFunc(sdk, data)
}


// GithubOnboardingImport returns a GithubOnboardingImport entity bound to this client.
// Idiomatic usage: client.GithubOnboardingImport(nil).List(nil, nil) or
// client.GithubOnboardingImport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubOnboardingImport(data map[string]any) ComposalEntityBase {
	return NewGithubOnboardingImportEntityFunc(sdk, data)
}


// GithubOnboardingImportBatch returns a GithubOnboardingImportBatch entity bound to this client.
// Idiomatic usage: client.GithubOnboardingImportBatch(nil).List(nil, nil) or
// client.GithubOnboardingImportBatch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubOnboardingImportBatch(data map[string]any) ComposalEntityBase {
	return NewGithubOnboardingImportBatchEntityFunc(sdk, data)
}


// GithubOnboardingImportItem returns a GithubOnboardingImportItem entity bound to this client.
// Idiomatic usage: client.GithubOnboardingImportItem(nil).List(nil, nil) or
// client.GithubOnboardingImportItem(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubOnboardingImportItem(data map[string]any) ComposalEntityBase {
	return NewGithubOnboardingImportItemEntityFunc(sdk, data)
}


// GithubPullRequest returns a GithubPullRequest entity bound to this client.
// Idiomatic usage: client.GithubPullRequest(nil).List(nil, nil) or
// client.GithubPullRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubPullRequest(data map[string]any) ComposalEntityBase {
	return NewGithubPullRequestEntityFunc(sdk, data)
}


// GithubRunnerAdmission returns a GithubRunnerAdmission entity bound to this client.
// Idiomatic usage: client.GithubRunnerAdmission(nil).List(nil, nil) or
// client.GithubRunnerAdmission(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubRunnerAdmission(data map[string]any) ComposalEntityBase {
	return NewGithubRunnerAdmissionEntityFunc(sdk, data)
}


// GithubRunnerCache returns a GithubRunnerCache entity bound to this client.
// Idiomatic usage: client.GithubRunnerCache(nil).List(nil, nil) or
// client.GithubRunnerCache(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubRunnerCache(data map[string]any) ComposalEntityBase {
	return NewGithubRunnerCacheEntityFunc(sdk, data)
}


// GithubRunnerEgress returns a GithubRunnerEgress entity bound to this client.
// Idiomatic usage: client.GithubRunnerEgress(nil).List(nil, nil) or
// client.GithubRunnerEgress(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubRunnerEgress(data map[string]any) ComposalEntityBase {
	return NewGithubRunnerEgressEntityFunc(sdk, data)
}


// GithubRunnerHistory returns a GithubRunnerHistory entity bound to this client.
// Idiomatic usage: client.GithubRunnerHistory(nil).List(nil, nil) or
// client.GithubRunnerHistory(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubRunnerHistory(data map[string]any) ComposalEntityBase {
	return NewGithubRunnerHistoryEntityFunc(sdk, data)
}


// GithubRunnerImage returns a GithubRunnerImage entity bound to this client.
// Idiomatic usage: client.GithubRunnerImage(nil).List(nil, nil) or
// client.GithubRunnerImage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubRunnerImage(data map[string]any) ComposalEntityBase {
	return NewGithubRunnerImageEntityFunc(sdk, data)
}


// GithubRunnerPool returns a GithubRunnerPool entity bound to this client.
// Idiomatic usage: client.GithubRunnerPool(nil).List(nil, nil) or
// client.GithubRunnerPool(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubRunnerPool(data map[string]any) ComposalEntityBase {
	return NewGithubRunnerPoolEntityFunc(sdk, data)
}


// GithubRunnerSetup returns a GithubRunnerSetup entity bound to this client.
// Idiomatic usage: client.GithubRunnerSetup(nil).List(nil, nil) or
// client.GithubRunnerSetup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GithubRunnerSetup(data map[string]any) ComposalEntityBase {
	return NewGithubRunnerSetupEntityFunc(sdk, data)
}


// Gitlab returns a Gitlab entity bound to this client.
// Idiomatic usage: client.Gitlab(nil).List(nil, nil) or
// client.Gitlab(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Gitlab(data map[string]any) ComposalEntityBase {
	return NewGitlabEntityFunc(sdk, data)
}


// GitlabConnection returns a GitlabConnection entity bound to this client.
// Idiomatic usage: client.GitlabConnection(nil).List(nil, nil) or
// client.GitlabConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GitlabConnection(data map[string]any) ComposalEntityBase {
	return NewGitlabConnectionEntityFunc(sdk, data)
}


// GitlabImport returns a GitlabImport entity bound to this client.
// Idiomatic usage: client.GitlabImport(nil).List(nil, nil) or
// client.GitlabImport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GitlabImport(data map[string]any) ComposalEntityBase {
	return NewGitlabImportEntityFunc(sdk, data)
}


// GitlabOauth returns a GitlabOauth entity bound to this client.
// Idiomatic usage: client.GitlabOauth(nil).List(nil, nil) or
// client.GitlabOauth(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GitlabOauth(data map[string]any) ComposalEntityBase {
	return NewGitlabOauthEntityFunc(sdk, data)
}


// GrantAllAgent returns a GrantAllAgent entity bound to this client.
// Idiomatic usage: client.GrantAllAgent(nil).List(nil, nil) or
// client.GrantAllAgent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) GrantAllAgent(data map[string]any) ComposalEntityBase {
	return NewGrantAllAgentEntityFunc(sdk, data)
}


// HostingAppDomain returns a HostingAppDomain entity bound to this client.
// Idiomatic usage: client.HostingAppDomain(nil).List(nil, nil) or
// client.HostingAppDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) HostingAppDomain(data map[string]any) ComposalEntityBase {
	return NewHostingAppDomainEntityFunc(sdk, data)
}


// IdentityOrganization returns a IdentityOrganization entity bound to this client.
// Idiomatic usage: client.IdentityOrganization(nil).List(nil, nil) or
// client.IdentityOrganization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) IdentityOrganization(data map[string]any) ComposalEntityBase {
	return NewIdentityOrganizationEntityFunc(sdk, data)
}


// ImageRepository returns a ImageRepository entity bound to this client.
// Idiomatic usage: client.ImageRepository(nil).List(nil, nil) or
// client.ImageRepository(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ImageRepository(data map[string]any) ComposalEntityBase {
	return NewImageRepositoryEntityFunc(sdk, data)
}


// ImageRepositoryTag returns a ImageRepositoryTag entity bound to this client.
// Idiomatic usage: client.ImageRepositoryTag(nil).List(nil, nil) or
// client.ImageRepositoryTag(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ImageRepositoryTag(data map[string]any) ComposalEntityBase {
	return NewImageRepositoryTagEntityFunc(sdk, data)
}


// ImportBranchPolicy returns a ImportBranchPolicy entity bound to this client.
// Idiomatic usage: client.ImportBranchPolicy(nil).List(nil, nil) or
// client.ImportBranchPolicy(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ImportBranchPolicy(data map[string]any) ComposalEntityBase {
	return NewImportBranchPolicyEntityFunc(sdk, data)
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


// InvocationControl returns a InvocationControl entity bound to this client.
// Idiomatic usage: client.InvocationControl(nil).List(nil, nil) or
// client.InvocationControl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) InvocationControl(data map[string]any) ComposalEntityBase {
	return NewInvocationControlEntityFunc(sdk, data)
}


// JobLogChunk returns a JobLogChunk entity bound to this client.
// Idiomatic usage: client.JobLogChunk(nil).List(nil, nil) or
// client.JobLogChunk(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) JobLogChunk(data map[string]any) ComposalEntityBase {
	return NewJobLogChunkEntityFunc(sdk, data)
}


// JobStep returns a JobStep entity bound to this client.
// Idiomatic usage: client.JobStep(nil).List(nil, nil) or
// client.JobStep(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) JobStep(data map[string]any) ComposalEntityBase {
	return NewJobStepEntityFunc(sdk, data)
}


// JobWorkspace returns a JobWorkspace entity bound to this client.
// Idiomatic usage: client.JobWorkspace(nil).List(nil, nil) or
// client.JobWorkspace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) JobWorkspace(data map[string]any) ComposalEntityBase {
	return NewJobWorkspaceEntityFunc(sdk, data)
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


// Known returns a Known entity bound to this client.
// Idiomatic usage: client.Known(nil).List(nil, nil) or
// client.Known(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Known(data map[string]any) ComposalEntityBase {
	return NewKnownEntityFunc(sdk, data)
}


// Label returns a Label entity bound to this client.
// Idiomatic usage: client.Label(nil).List(nil, nil) or
// client.Label(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Label(data map[string]any) ComposalEntityBase {
	return NewLabelEntityFunc(sdk, data)
}


// LeaseArtifact returns a LeaseArtifact entity bound to this client.
// Idiomatic usage: client.LeaseArtifact(nil).List(nil, nil) or
// client.LeaseArtifact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LeaseArtifact(data map[string]any) ComposalEntityBase {
	return NewLeaseArtifactEntityFunc(sdk, data)
}


// LeaseCache returns a LeaseCache entity bound to this client.
// Idiomatic usage: client.LeaseCache(nil).List(nil, nil) or
// client.LeaseCache(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LeaseCache(data map[string]any) ComposalEntityBase {
	return NewLeaseCacheEntityFunc(sdk, data)
}


// LeaseLogChunk returns a LeaseLogChunk entity bound to this client.
// Idiomatic usage: client.LeaseLogChunk(nil).List(nil, nil) or
// client.LeaseLogChunk(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LeaseLogChunk(data map[string]any) ComposalEntityBase {
	return NewLeaseLogChunkEntityFunc(sdk, data)
}


// LeaseReconciliation returns a LeaseReconciliation entity bound to this client.
// Idiomatic usage: client.LeaseReconciliation(nil).List(nil, nil) or
// client.LeaseReconciliation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LeaseReconciliation(data map[string]any) ComposalEntityBase {
	return NewLeaseReconciliationEntityFunc(sdk, data)
}


// LeaseStep returns a LeaseStep entity bound to this client.
// Idiomatic usage: client.LeaseStep(nil).List(nil, nil) or
// client.LeaseStep(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LeaseStep(data map[string]any) ComposalEntityBase {
	return NewLeaseStepEntityFunc(sdk, data)
}


// LeaseVerifyDiagnostic returns a LeaseVerifyDiagnostic entity bound to this client.
// Idiomatic usage: client.LeaseVerifyDiagnostic(nil).List(nil, nil) or
// client.LeaseVerifyDiagnostic(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LeaseVerifyDiagnostic(data map[string]any) ComposalEntityBase {
	return NewLeaseVerifyDiagnosticEntityFunc(sdk, data)
}


// LeaseVerifySecret returns a LeaseVerifySecret entity bound to this client.
// Idiomatic usage: client.LeaseVerifySecret(nil).List(nil, nil) or
// client.LeaseVerifySecret(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LeaseVerifySecret(data map[string]any) ComposalEntityBase {
	return NewLeaseVerifySecretEntityFunc(sdk, data)
}


// LeaseWorkspace returns a LeaseWorkspace entity bound to this client.
// Idiomatic usage: client.LeaseWorkspace(nil).List(nil, nil) or
// client.LeaseWorkspace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LeaseWorkspace(data map[string]any) ComposalEntityBase {
	return NewLeaseWorkspaceEntityFunc(sdk, data)
}


// LocalAgentDecision returns a LocalAgentDecision entity bound to this client.
// Idiomatic usage: client.LocalAgentDecision(nil).List(nil, nil) or
// client.LocalAgentDecision(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LocalAgentDecision(data map[string]any) ComposalEntityBase {
	return NewLocalAgentDecisionEntityFunc(sdk, data)
}


// LocalAgentResponse returns a LocalAgentResponse entity bound to this client.
// Idiomatic usage: client.LocalAgentResponse(nil).List(nil, nil) or
// client.LocalAgentResponse(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LocalAgentResponse(data map[string]any) ComposalEntityBase {
	return NewLocalAgentResponseEntityFunc(sdk, data)
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


// LogStreamChunk returns a LogStreamChunk entity bound to this client.
// Idiomatic usage: client.LogStreamChunk(nil).List(nil, nil) or
// client.LogStreamChunk(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LogStreamChunk(data map[string]any) ComposalEntityBase {
	return NewLogStreamChunkEntityFunc(sdk, data)
}


// LogoImage returns a LogoImage entity bound to this client.
// Idiomatic usage: client.LogoImage(nil).List(nil, nil) or
// client.LogoImage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) LogoImage(data map[string]any) ComposalEntityBase {
	return NewLogoImageEntityFunc(sdk, data)
}


// MarketingSetting returns a MarketingSetting entity bound to this client.
// Idiomatic usage: client.MarketingSetting(nil).List(nil, nil) or
// client.MarketingSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MarketingSetting(data map[string]any) ComposalEntityBase {
	return NewMarketingSettingEntityFunc(sdk, data)
}


// McpOauth returns a McpOauth entity bound to this client.
// Idiomatic usage: client.McpOauth(nil).List(nil, nil) or
// client.McpOauth(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) McpOauth(data map[string]any) ComposalEntityBase {
	return NewMcpOauthEntityFunc(sdk, data)
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


// MergeQueueEntry returns a MergeQueueEntry entity bound to this client.
// Idiomatic usage: client.MergeQueueEntry(nil).List(nil, nil) or
// client.MergeQueueEntry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MergeQueueEntry(data map[string]any) ComposalEntityBase {
	return NewMergeQueueEntryEntityFunc(sdk, data)
}


// MergeResolution returns a MergeResolution entity bound to this client.
// Idiomatic usage: client.MergeResolution(nil).List(nil, nil) or
// client.MergeResolution(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MergeResolution(data map[string]any) ComposalEntityBase {
	return NewMergeResolutionEntityFunc(sdk, data)
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


// MetronomeWebhook returns a MetronomeWebhook entity bound to this client.
// Idiomatic usage: client.MetronomeWebhook(nil).List(nil, nil) or
// client.MetronomeWebhook(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) MetronomeWebhook(data map[string]any) ComposalEntityBase {
	return NewMetronomeWebhookEntityFunc(sdk, data)
}


// ModelSubscriptionAccount returns a ModelSubscriptionAccount entity bound to this client.
// Idiomatic usage: client.ModelSubscriptionAccount(nil).List(nil, nil) or
// client.ModelSubscriptionAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ModelSubscriptionAccount(data map[string]any) ComposalEntityBase {
	return NewModelSubscriptionAccountEntityFunc(sdk, data)
}


// ModelSubscriptionAccountConnection returns a ModelSubscriptionAccountConnection entity bound to this client.
// Idiomatic usage: client.ModelSubscriptionAccountConnection(nil).List(nil, nil) or
// client.ModelSubscriptionAccountConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ModelSubscriptionAccountConnection(data map[string]any) ComposalEntityBase {
	return NewModelSubscriptionAccountConnectionEntityFunc(sdk, data)
}


// NetworkConnection returns a NetworkConnection entity bound to this client.
// Idiomatic usage: client.NetworkConnection(nil).List(nil, nil) or
// client.NetworkConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) NetworkConnection(data map[string]any) ComposalEntityBase {
	return NewNetworkConnectionEntityFunc(sdk, data)
}


// NetworkingSpace returns a NetworkingSpace entity bound to this client.
// Idiomatic usage: client.NetworkingSpace(nil).List(nil, nil) or
// client.NetworkingSpace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) NetworkingSpace(data map[string]any) ComposalEntityBase {
	return NewNetworkingSpaceEntityFunc(sdk, data)
}


// Node returns a Node entity bound to this client.
// Idiomatic usage: client.Node(nil).List(nil, nil) or
// client.Node(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Node(data map[string]any) ComposalEntityBase {
	return NewNodeEntityFunc(sdk, data)
}


// NodeCertificate returns a NodeCertificate entity bound to this client.
// Idiomatic usage: client.NodeCertificate(nil).List(nil, nil) or
// client.NodeCertificate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) NodeCertificate(data map[string]any) ComposalEntityBase {
	return NewNodeCertificateEntityFunc(sdk, data)
}


// NodeLease returns a NodeLease entity bound to this client.
// Idiomatic usage: client.NodeLease(nil).List(nil, nil) or
// client.NodeLease(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) NodeLease(data map[string]any) ComposalEntityBase {
	return NewNodeLeaseEntityFunc(sdk, data)
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


// Now returns a Now entity bound to this client.
// Idiomatic usage: client.Now(nil).List(nil, nil) or
// client.Now(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Now(data map[string]any) ComposalEntityBase {
	return NewNowEntityFunc(sdk, data)
}


// ObservabilityClickhouseCluster returns a ObservabilityClickhouseCluster entity bound to this client.
// Idiomatic usage: client.ObservabilityClickhouseCluster(nil).List(nil, nil) or
// client.ObservabilityClickhouseCluster(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ObservabilityClickhouseCluster(data map[string]any) ComposalEntityBase {
	return NewObservabilityClickhouseClusterEntityFunc(sdk, data)
}


// ObservabilityQuickwitCluster returns a ObservabilityQuickwitCluster entity bound to this client.
// Idiomatic usage: client.ObservabilityQuickwitCluster(nil).List(nil, nil) or
// client.ObservabilityQuickwitCluster(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ObservabilityQuickwitCluster(data map[string]any) ComposalEntityBase {
	return NewObservabilityQuickwitClusterEntityFunc(sdk, data)
}


// ObservabilitySpace returns a ObservabilitySpace entity bound to this client.
// Idiomatic usage: client.ObservabilitySpace(nil).List(nil, nil) or
// client.ObservabilitySpace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ObservabilitySpace(data map[string]any) ComposalEntityBase {
	return NewObservabilitySpaceEntityFunc(sdk, data)
}


// Openapi returns a Openapi entity bound to this client.
// Idiomatic usage: client.Openapi(nil).List(nil, nil) or
// client.Openapi(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Openapi(data map[string]any) ComposalEntityBase {
	return NewOpenapiEntityFunc(sdk, data)
}


// OrgInvitation returns a OrgInvitation entity bound to this client.
// Idiomatic usage: client.OrgInvitation(nil).List(nil, nil) or
// client.OrgInvitation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrgInvitation(data map[string]any) ComposalEntityBase {
	return NewOrgInvitationEntityFunc(sdk, data)
}


// Organization returns a Organization entity bound to this client.
// Idiomatic usage: client.Organization(nil).List(nil, nil) or
// client.Organization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Organization(data map[string]any) ComposalEntityBase {
	return NewOrganizationEntityFunc(sdk, data)
}


// OrganizationApp returns a OrganizationApp entity bound to this client.
// Idiomatic usage: client.OrganizationApp(nil).List(nil, nil) or
// client.OrganizationApp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationApp(data map[string]any) ComposalEntityBase {
	return NewOrganizationAppEntityFunc(sdk, data)
}


// OrganizationControl returns a OrganizationControl entity bound to this client.
// Idiomatic usage: client.OrganizationControl(nil).List(nil, nil) or
// client.OrganizationControl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationControl(data map[string]any) ComposalEntityBase {
	return NewOrganizationControlEntityFunc(sdk, data)
}


// OrganizationDevice returns a OrganizationDevice entity bound to this client.
// Idiomatic usage: client.OrganizationDevice(nil).List(nil, nil) or
// client.OrganizationDevice(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationDevice(data map[string]any) ComposalEntityBase {
	return NewOrganizationDeviceEntityFunc(sdk, data)
}


// OrganizationIdentityCertificate returns a OrganizationIdentityCertificate entity bound to this client.
// Idiomatic usage: client.OrganizationIdentityCertificate(nil).List(nil, nil) or
// client.OrganizationIdentityCertificate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationIdentityCertificate(data map[string]any) ComposalEntityBase {
	return NewOrganizationIdentityCertificateEntityFunc(sdk, data)
}


// OrganizationInteraction returns a OrganizationInteraction entity bound to this client.
// Idiomatic usage: client.OrganizationInteraction(nil).List(nil, nil) or
// client.OrganizationInteraction(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationInteraction(data map[string]any) ComposalEntityBase {
	return NewOrganizationInteractionEntityFunc(sdk, data)
}


// OrganizationInvitation returns a OrganizationInvitation entity bound to this client.
// Idiomatic usage: client.OrganizationInvitation(nil).List(nil, nil) or
// client.OrganizationInvitation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationInvitation(data map[string]any) ComposalEntityBase {
	return NewOrganizationInvitationEntityFunc(sdk, data)
}


// OrganizationMessageFile returns a OrganizationMessageFile entity bound to this client.
// Idiomatic usage: client.OrganizationMessageFile(nil).List(nil, nil) or
// client.OrganizationMessageFile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationMessageFile(data map[string]any) ComposalEntityBase {
	return NewOrganizationMessageFileEntityFunc(sdk, data)
}


// OrganizationOidcTrust returns a OrganizationOidcTrust entity bound to this client.
// Idiomatic usage: client.OrganizationOidcTrust(nil).List(nil, nil) or
// client.OrganizationOidcTrust(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationOidcTrust(data map[string]any) ComposalEntityBase {
	return NewOrganizationOidcTrustEntityFunc(sdk, data)
}


// OrganizationRunEvent returns a OrganizationRunEvent entity bound to this client.
// Idiomatic usage: client.OrganizationRunEvent(nil).List(nil, nil) or
// client.OrganizationRunEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationRunEvent(data map[string]any) ComposalEntityBase {
	return NewOrganizationRunEventEntityFunc(sdk, data)
}


// OrganizationRunOutcome returns a OrganizationRunOutcome entity bound to this client.
// Idiomatic usage: client.OrganizationRunOutcome(nil).List(nil, nil) or
// client.OrganizationRunOutcome(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationRunOutcome(data map[string]any) ComposalEntityBase {
	return NewOrganizationRunOutcomeEntityFunc(sdk, data)
}


// OrganizationRunUsage returns a OrganizationRunUsage entity bound to this client.
// Idiomatic usage: client.OrganizationRunUsage(nil).List(nil, nil) or
// client.OrganizationRunUsage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationRunUsage(data map[string]any) ComposalEntityBase {
	return NewOrganizationRunUsageEntityFunc(sdk, data)
}


// OrganizationSandbox returns a OrganizationSandbox entity bound to this client.
// Idiomatic usage: client.OrganizationSandbox(nil).List(nil, nil) or
// client.OrganizationSandbox(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationSandbox(data map[string]any) ComposalEntityBase {
	return NewOrganizationSandboxEntityFunc(sdk, data)
}


// OrganizationSecret returns a OrganizationSecret entity bound to this client.
// Idiomatic usage: client.OrganizationSecret(nil).List(nil, nil) or
// client.OrganizationSecret(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationSecret(data map[string]any) ComposalEntityBase {
	return NewOrganizationSecretEntityFunc(sdk, data)
}


// OrganizationServiceAccount returns a OrganizationServiceAccount entity bound to this client.
// Idiomatic usage: client.OrganizationServiceAccount(nil).List(nil, nil) or
// client.OrganizationServiceAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationServiceAccount(data map[string]any) ComposalEntityBase {
	return NewOrganizationServiceAccountEntityFunc(sdk, data)
}


// OrganizationSetting returns a OrganizationSetting entity bound to this client.
// Idiomatic usage: client.OrganizationSetting(nil).List(nil, nil) or
// client.OrganizationSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationSetting(data map[string]any) ComposalEntityBase {
	return NewOrganizationSettingEntityFunc(sdk, data)
}


// OrganizationSite returns a OrganizationSite entity bound to this client.
// Idiomatic usage: client.OrganizationSite(nil).List(nil, nil) or
// client.OrganizationSite(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationSite(data map[string]any) ComposalEntityBase {
	return NewOrganizationSiteEntityFunc(sdk, data)
}


// OrganizationSubscription returns a OrganizationSubscription entity bound to this client.
// Idiomatic usage: client.OrganizationSubscription(nil).List(nil, nil) or
// client.OrganizationSubscription(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationSubscription(data map[string]any) ComposalEntityBase {
	return NewOrganizationSubscriptionEntityFunc(sdk, data)
}


// OrganizationTool returns a OrganizationTool entity bound to this client.
// Idiomatic usage: client.OrganizationTool(nil).List(nil, nil) or
// client.OrganizationTool(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationTool(data map[string]any) ComposalEntityBase {
	return NewOrganizationToolEntityFunc(sdk, data)
}


// OrganizationWorkloadIdentity returns a OrganizationWorkloadIdentity entity bound to this client.
// Idiomatic usage: client.OrganizationWorkloadIdentity(nil).List(nil, nil) or
// client.OrganizationWorkloadIdentity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OrganizationWorkloadIdentity(data map[string]any) ComposalEntityBase {
	return NewOrganizationWorkloadIdentityEntityFunc(sdk, data)
}


// OtelIngest returns a OtelIngest entity bound to this client.
// Idiomatic usage: client.OtelIngest(nil).List(nil, nil) or
// client.OtelIngest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) OtelIngest(data map[string]any) ComposalEntityBase {
	return NewOtelIngestEntityFunc(sdk, data)
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


// PageArtefact returns a PageArtefact entity bound to this client.
// Idiomatic usage: client.PageArtefact(nil).List(nil, nil) or
// client.PageArtefact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PageArtefact(data map[string]any) ComposalEntityBase {
	return NewPageArtefactEntityFunc(sdk, data)
}


// PageCiPipelineRun returns a PageCiPipelineRun entity bound to this client.
// Idiomatic usage: client.PageCiPipelineRun(nil).List(nil, nil) or
// client.PageCiPipelineRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PageCiPipelineRun(data map[string]any) ComposalEntityBase {
	return NewPageCiPipelineRunEntityFunc(sdk, data)
}


// PageProjectRun returns a PageProjectRun entity bound to this client.
// Idiomatic usage: client.PageProjectRun(nil).List(nil, nil) or
// client.PageProjectRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PageProjectRun(data map[string]any) ComposalEntityBase {
	return NewPageProjectRunEntityFunc(sdk, data)
}


// PageRepoVcCommit returns a PageRepoVcCommit entity bound to this client.
// Idiomatic usage: client.PageRepoVcCommit(nil).List(nil, nil) or
// client.PageRepoVcCommit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PageRepoVcCommit(data map[string]any) ComposalEntityBase {
	return NewPageRepoVcCommitEntityFunc(sdk, data)
}


// PagesBilling returns a PagesBilling entity bound to this client.
// Idiomatic usage: client.PagesBilling(nil).List(nil, nil) or
// client.PagesBilling(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesBilling(data map[string]any) ComposalEntityBase {
	return NewPagesBillingEntityFunc(sdk, data)
}


// PagesGithubIntegration returns a PagesGithubIntegration entity bound to this client.
// Idiomatic usage: client.PagesGithubIntegration(nil).List(nil, nil) or
// client.PagesGithubIntegration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesGithubIntegration(data map[string]any) ComposalEntityBase {
	return NewPagesGithubIntegrationEntityFunc(sdk, data)
}


// PagesGithubOnboarding returns a PagesGithubOnboarding entity bound to this client.
// Idiomatic usage: client.PagesGithubOnboarding(nil).List(nil, nil) or
// client.PagesGithubOnboarding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesGithubOnboarding(data map[string]any) ComposalEntityBase {
	return NewPagesGithubOnboardingEntityFunc(sdk, data)
}


// PagesMember returns a PagesMember entity bound to this client.
// Idiomatic usage: client.PagesMember(nil).List(nil, nil) or
// client.PagesMember(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesMember(data map[string]any) ComposalEntityBase {
	return NewPagesMemberEntityFunc(sdk, data)
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


// PagesRegistry returns a PagesRegistry entity bound to this client.
// Idiomatic usage: client.PagesRegistry(nil).List(nil, nil) or
// client.PagesRegistry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesRegistry(data map[string]any) ComposalEntityBase {
	return NewPagesRegistryEntityFunc(sdk, data)
}


// PagesSession returns a PagesSession entity bound to this client.
// Idiomatic usage: client.PagesSession(nil).List(nil, nil) or
// client.PagesSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PagesSession(data map[string]any) ComposalEntityBase {
	return NewPagesSessionEntityFunc(sdk, data)
}


// Pairing returns a Pairing entity bound to this client.
// Idiomatic usage: client.Pairing(nil).List(nil, nil) or
// client.Pairing(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Pairing(data map[string]any) ComposalEntityBase {
	return NewPairingEntityFunc(sdk, data)
}


// PairingEvent returns a PairingEvent entity bound to this client.
// Idiomatic usage: client.PairingEvent(nil).List(nil, nil) or
// client.PairingEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PairingEvent(data map[string]any) ComposalEntityBase {
	return NewPairingEventEntityFunc(sdk, data)
}


// ParallelV1 returns a ParallelV1 entity bound to this client.
// Idiomatic usage: client.ParallelV1(nil).List(nil, nil) or
// client.ParallelV1(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ParallelV1(data map[string]any) ComposalEntityBase {
	return NewParallelV1EntityFunc(sdk, data)
}


// PatchsetDiff returns a PatchsetDiff entity bound to this client.
// Idiomatic usage: client.PatchsetDiff(nil).List(nil, nil) or
// client.PatchsetDiff(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PatchsetDiff(data map[string]any) ComposalEntityBase {
	return NewPatchsetDiffEntityFunc(sdk, data)
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


// ProactiveAgentWaitlistEntry returns a ProactiveAgentWaitlistEntry entity bound to this client.
// Idiomatic usage: client.ProactiveAgentWaitlistEntry(nil).List(nil, nil) or
// client.ProactiveAgentWaitlistEntry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProactiveAgentWaitlistEntry(data map[string]any) ComposalEntityBase {
	return NewProactiveAgentWaitlistEntryEntityFunc(sdk, data)
}


// Product returns a Product entity bound to this client.
// Idiomatic usage: client.Product(nil).List(nil, nil) or
// client.Product(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Product(data map[string]any) ComposalEntityBase {
	return NewProductEntityFunc(sdk, data)
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


// ProjectPrTesting returns a ProjectPrTesting entity bound to this client.
// Idiomatic usage: client.ProjectPrTesting(nil).List(nil, nil) or
// client.ProjectPrTesting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectPrTesting(data map[string]any) ComposalEntityBase {
	return NewProjectPrTestingEntityFunc(sdk, data)
}


// ProjectProductMap returns a ProjectProductMap entity bound to this client.
// Idiomatic usage: client.ProjectProductMap(nil).List(nil, nil) or
// client.ProjectProductMap(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectProductMap(data map[string]any) ComposalEntityBase {
	return NewProjectProductMapEntityFunc(sdk, data)
}


// ProjectProductMapComparison returns a ProjectProductMapComparison entity bound to this client.
// Idiomatic usage: client.ProjectProductMapComparison(nil).List(nil, nil) or
// client.ProjectProductMapComparison(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ProjectProductMapComparison(data map[string]any) ComposalEntityBase {
	return NewProjectProductMapComparisonEntityFunc(sdk, data)
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


// PullRequestAction returns a PullRequestAction entity bound to this client.
// Idiomatic usage: client.PullRequestAction(nil).List(nil, nil) or
// client.PullRequestAction(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PullRequestAction(data map[string]any) ComposalEntityBase {
	return NewPullRequestActionEntityFunc(sdk, data)
}


// PullRequestMagicMerge returns a PullRequestMagicMerge entity bound to this client.
// Idiomatic usage: client.PullRequestMagicMerge(nil).List(nil, nil) or
// client.PullRequestMagicMerge(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PullRequestMagicMerge(data map[string]any) ComposalEntityBase {
	return NewPullRequestMagicMergeEntityFunc(sdk, data)
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


// PullRequestTranscript returns a PullRequestTranscript entity bound to this client.
// Idiomatic usage: client.PullRequestTranscript(nil).List(nil, nil) or
// client.PullRequestTranscript(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PullRequestTranscript(data map[string]any) ComposalEntityBase {
	return NewPullRequestTranscriptEntityFunc(sdk, data)
}


// PullZone returns a PullZone entity bound to this client.
// Idiomatic usage: client.PullZone(nil).List(nil, nil) or
// client.PullZone(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) PullZone(data map[string]any) ComposalEntityBase {
	return NewPullZoneEntityFunc(sdk, data)
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


// RelayAgentConnection returns a RelayAgentConnection entity bound to this client.
// Idiomatic usage: client.RelayAgentConnection(nil).List(nil, nil) or
// client.RelayAgentConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RelayAgentConnection(data map[string]any) ComposalEntityBase {
	return NewRelayAgentConnectionEntityFunc(sdk, data)
}


// RelayAgentLocalThread returns a RelayAgentLocalThread entity bound to this client.
// Idiomatic usage: client.RelayAgentLocalThread(nil).List(nil, nil) or
// client.RelayAgentLocalThread(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RelayAgentLocalThread(data map[string]any) ComposalEntityBase {
	return NewRelayAgentLocalThreadEntityFunc(sdk, data)
}


// RelaySignal returns a RelaySignal entity bound to this client.
// Idiomatic usage: client.RelaySignal(nil).List(nil, nil) or
// client.RelaySignal(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RelaySignal(data map[string]any) ComposalEntityBase {
	return NewRelaySignalEntityFunc(sdk, data)
}


// ReleaseRollout returns a ReleaseRollout entity bound to this client.
// Idiomatic usage: client.ReleaseRollout(nil).List(nil, nil) or
// client.ReleaseRollout(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ReleaseRollout(data map[string]any) ComposalEntityBase {
	return NewReleaseRolloutEntityFunc(sdk, data)
}


// Repo returns a Repo entity bound to this client.
// Idiomatic usage: client.Repo(nil).List(nil, nil) or
// client.Repo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Repo(data map[string]any) ComposalEntityBase {
	return NewRepoEntityFunc(sdk, data)
}


// RepoAccessToken returns a RepoAccessToken entity bound to this client.
// Idiomatic usage: client.RepoAccessToken(nil).List(nil, nil) or
// client.RepoAccessToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoAccessToken(data map[string]any) ComposalEntityBase {
	return NewRepoAccessTokenEntityFunc(sdk, data)
}


// RepoAction returns a RepoAction entity bound to this client.
// Idiomatic usage: client.RepoAction(nil).List(nil, nil) or
// client.RepoAction(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoAction(data map[string]any) ComposalEntityBase {
	return NewRepoActionEntityFunc(sdk, data)
}


// RepoAgentCheckpoint returns a RepoAgentCheckpoint entity bound to this client.
// Idiomatic usage: client.RepoAgentCheckpoint(nil).List(nil, nil) or
// client.RepoAgentCheckpoint(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoAgentCheckpoint(data map[string]any) ComposalEntityBase {
	return NewRepoAgentCheckpointEntityFunc(sdk, data)
}


// RepoAgentSession returns a RepoAgentSession entity bound to this client.
// Idiomatic usage: client.RepoAgentSession(nil).List(nil, nil) or
// client.RepoAgentSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoAgentSession(data map[string]any) ComposalEntityBase {
	return NewRepoAgentSessionEntityFunc(sdk, data)
}


// RepoBookmarkProtection returns a RepoBookmarkProtection entity bound to this client.
// Idiomatic usage: client.RepoBookmarkProtection(nil).List(nil, nil) or
// client.RepoBookmarkProtection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoBookmarkProtection(data map[string]any) ComposalEntityBase {
	return NewRepoBookmarkProtectionEntityFunc(sdk, data)
}


// RepoBookmarkProtectionEvent returns a RepoBookmarkProtectionEvent entity bound to this client.
// Idiomatic usage: client.RepoBookmarkProtectionEvent(nil).List(nil, nil) or
// client.RepoBookmarkProtectionEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoBookmarkProtectionEvent(data map[string]any) ComposalEntityBase {
	return NewRepoBookmarkProtectionEventEntityFunc(sdk, data)
}


// RepoCloudWorkspaceBackup returns a RepoCloudWorkspaceBackup entity bound to this client.
// Idiomatic usage: client.RepoCloudWorkspaceBackup(nil).List(nil, nil) or
// client.RepoCloudWorkspaceBackup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoCloudWorkspaceBackup(data map[string]any) ComposalEntityBase {
	return NewRepoCloudWorkspaceBackupEntityFunc(sdk, data)
}


// RepoCodeRule returns a RepoCodeRule entity bound to this client.
// Idiomatic usage: client.RepoCodeRule(nil).List(nil, nil) or
// client.RepoCodeRule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoCodeRule(data map[string]any) ComposalEntityBase {
	return NewRepoCodeRuleEntityFunc(sdk, data)
}


// RepoSetting returns a RepoSetting entity bound to this client.
// Idiomatic usage: client.RepoSetting(nil).List(nil, nil) or
// client.RepoSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoSetting(data map[string]any) ComposalEntityBase {
	return NewRepoSettingEntityFunc(sdk, data)
}


// RepoStat returns a RepoStat entity bound to this client.
// Idiomatic usage: client.RepoStat(nil).List(nil, nil) or
// client.RepoStat(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoStat(data map[string]any) ComposalEntityBase {
	return NewRepoStatEntityFunc(sdk, data)
}


// RepoVc returns a RepoVc entity bound to this client.
// Idiomatic usage: client.RepoVc(nil).List(nil, nil) or
// client.RepoVc(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoVc(data map[string]any) ComposalEntityBase {
	return NewRepoVcEntityFunc(sdk, data)
}


// RepoVcCommit returns a RepoVcCommit entity bound to this client.
// Idiomatic usage: client.RepoVcCommit(nil).List(nil, nil) or
// client.RepoVcCommit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepoVcCommit(data map[string]any) ComposalEntityBase {
	return NewRepoVcCommitEntityFunc(sdk, data)
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


// RepositoryAccess returns a RepositoryAccess entity bound to this client.
// Idiomatic usage: client.RepositoryAccess(nil).List(nil, nil) or
// client.RepositoryAccess(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepositoryAccess(data map[string]any) ComposalEntityBase {
	return NewRepositoryAccessEntityFunc(sdk, data)
}


// RepositoryAccessResolve returns a RepositoryAccessResolve entity bound to this client.
// Idiomatic usage: client.RepositoryAccessResolve(nil).List(nil, nil) or
// client.RepositoryAccessResolve(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepositoryAccessResolve(data map[string]any) ComposalEntityBase {
	return NewRepositoryAccessResolveEntityFunc(sdk, data)
}


// RepositoryEvent returns a RepositoryEvent entity bound to this client.
// Idiomatic usage: client.RepositoryEvent(nil).List(nil, nil) or
// client.RepositoryEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepositoryEvent(data map[string]any) ComposalEntityBase {
	return NewRepositoryEventEntityFunc(sdk, data)
}


// RepositoryImport returns a RepositoryImport entity bound to this client.
// Idiomatic usage: client.RepositoryImport(nil).List(nil, nil) or
// client.RepositoryImport(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepositoryImport(data map[string]any) ComposalEntityBase {
	return NewRepositoryImportEntityFunc(sdk, data)
}


// RepositoryImportSession returns a RepositoryImportSession entity bound to this client.
// Idiomatic usage: client.RepositoryImportSession(nil).List(nil, nil) or
// client.RepositoryImportSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepositoryImportSession(data map[string]any) ComposalEntityBase {
	return NewRepositoryImportSessionEntityFunc(sdk, data)
}


// RepositoryImportSessionRepository returns a RepositoryImportSessionRepository entity bound to this client.
// Idiomatic usage: client.RepositoryImportSessionRepository(nil).List(nil, nil) or
// client.RepositoryImportSessionRepository(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepositoryImportSessionRepository(data map[string]any) ComposalEntityBase {
	return NewRepositoryImportSessionRepositoryEntityFunc(sdk, data)
}


// RepositoryImportSessionSelection returns a RepositoryImportSessionSelection entity bound to this client.
// Idiomatic usage: client.RepositoryImportSessionSelection(nil).List(nil, nil) or
// client.RepositoryImportSessionSelection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepositoryImportSessionSelection(data map[string]any) ComposalEntityBase {
	return NewRepositoryImportSessionSelectionEntityFunc(sdk, data)
}


// RepositorySandboxEnvironment returns a RepositorySandboxEnvironment entity bound to this client.
// Idiomatic usage: client.RepositorySandboxEnvironment(nil).List(nil, nil) or
// client.RepositorySandboxEnvironment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RepositorySandboxEnvironment(data map[string]any) ComposalEntityBase {
	return NewRepositorySandboxEnvironmentEntityFunc(sdk, data)
}


// RoderCodeRepair returns a RoderCodeRepair entity bound to this client.
// Idiomatic usage: client.RoderCodeRepair(nil).List(nil, nil) or
// client.RoderCodeRepair(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RoderCodeRepair(data map[string]any) ComposalEntityBase {
	return NewRoderCodeRepairEntityFunc(sdk, data)
}


// RoderCodeRepairSetting returns a RoderCodeRepairSetting entity bound to this client.
// Idiomatic usage: client.RoderCodeRepairSetting(nil).List(nil, nil) or
// client.RoderCodeRepairSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RoderCodeRepairSetting(data map[string]any) ComposalEntityBase {
	return NewRoderCodeRepairSettingEntityFunc(sdk, data)
}


// RoderMachine returns a RoderMachine entity bound to this client.
// Idiomatic usage: client.RoderMachine(nil).List(nil, nil) or
// client.RoderMachine(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RoderMachine(data map[string]any) ComposalEntityBase {
	return NewRoderMachineEntityFunc(sdk, data)
}


// RoderRun returns a RoderRun entity bound to this client.
// Idiomatic usage: client.RoderRun(nil).List(nil, nil) or
// client.RoderRun(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RoderRun(data map[string]any) ComposalEntityBase {
	return NewRoderRunEntityFunc(sdk, data)
}


// RoderWorkspaceCredential returns a RoderWorkspaceCredential entity bound to this client.
// Idiomatic usage: client.RoderWorkspaceCredential(nil).List(nil, nil) or
// client.RoderWorkspaceCredential(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RoderWorkspaceCredential(data map[string]any) ComposalEntityBase {
	return NewRoderWorkspaceCredentialEntityFunc(sdk, data)
}


// RunArtifact returns a RunArtifact entity bound to this client.
// Idiomatic usage: client.RunArtifact(nil).List(nil, nil) or
// client.RunArtifact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunArtifact(data map[string]any) ComposalEntityBase {
	return NewRunArtifactEntityFunc(sdk, data)
}


// RunJob returns a RunJob entity bound to this client.
// Idiomatic usage: client.RunJob(nil).List(nil, nil) or
// client.RunJob(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunJob(data map[string]any) ComposalEntityBase {
	return NewRunJobEntityFunc(sdk, data)
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


// RunWorkspaceCredential returns a RunWorkspaceCredential entity bound to this client.
// Idiomatic usage: client.RunWorkspaceCredential(nil).List(nil, nil) or
// client.RunWorkspaceCredential(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunWorkspaceCredential(data map[string]any) ComposalEntityBase {
	return NewRunWorkspaceCredentialEntityFunc(sdk, data)
}


// RunnerLease returns a RunnerLease entity bound to this client.
// Idiomatic usage: client.RunnerLease(nil).List(nil, nil) or
// client.RunnerLease(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunnerLease(data map[string]any) ComposalEntityBase {
	return NewRunnerLeaseEntityFunc(sdk, data)
}


// RunnerPoolNodeEnrollmentToken returns a RunnerPoolNodeEnrollmentToken entity bound to this client.
// Idiomatic usage: client.RunnerPoolNodeEnrollmentToken(nil).List(nil, nil) or
// client.RunnerPoolNodeEnrollmentToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunnerPoolNodeEnrollmentToken(data map[string]any) ComposalEntityBase {
	return NewRunnerPoolNodeEnrollmentTokenEntityFunc(sdk, data)
}


// RunnerPoolRunner returns a RunnerPoolRunner entity bound to this client.
// Idiomatic usage: client.RunnerPoolRunner(nil).List(nil, nil) or
// client.RunnerPoolRunner(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RunnerPoolRunner(data map[string]any) ComposalEntityBase {
	return NewRunnerPoolRunnerEntityFunc(sdk, data)
}


// RuntimeInstanceHealthSnapshot returns a RuntimeInstanceHealthSnapshot entity bound to this client.
// Idiomatic usage: client.RuntimeInstanceHealthSnapshot(nil).List(nil, nil) or
// client.RuntimeInstanceHealthSnapshot(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) RuntimeInstanceHealthSnapshot(data map[string]any) ComposalEntityBase {
	return NewRuntimeInstanceHealthSnapshotEntityFunc(sdk, data)
}


// SandboxIntegration returns a SandboxIntegration entity bound to this client.
// Idiomatic usage: client.SandboxIntegration(nil).List(nil, nil) or
// client.SandboxIntegration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SandboxIntegration(data map[string]any) ComposalEntityBase {
	return NewSandboxIntegrationEntityFunc(sdk, data)
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


// SecretGrant returns a SecretGrant entity bound to this client.
// Idiomatic usage: client.SecretGrant(nil).List(nil, nil) or
// client.SecretGrant(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SecretGrant(data map[string]any) ComposalEntityBase {
	return NewSecretGrantEntityFunc(sdk, data)
}


// SecretVersion returns a SecretVersion entity bound to this client.
// Idiomatic usage: client.SecretVersion(nil).List(nil, nil) or
// client.SecretVersion(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SecretVersion(data map[string]any) ComposalEntityBase {
	return NewSecretVersionEntityFunc(sdk, data)
}


// ServiceEndpoint returns a ServiceEndpoint entity bound to this client.
// Idiomatic usage: client.ServiceEndpoint(nil).List(nil, nil) or
// client.ServiceEndpoint(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ServiceEndpoint(data map[string]any) ComposalEntityBase {
	return NewServiceEndpointEntityFunc(sdk, data)
}


// Setting returns a Setting entity bound to this client.
// Idiomatic usage: client.Setting(nil).List(nil, nil) or
// client.Setting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Setting(data map[string]any) ComposalEntityBase {
	return NewSettingEntityFunc(sdk, data)
}


// SettingMutationLease returns a SettingMutationLease entity bound to this client.
// Idiomatic usage: client.SettingMutationLease(nil).List(nil, nil) or
// client.SettingMutationLease(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SettingMutationLease(data map[string]any) ComposalEntityBase {
	return NewSettingMutationLeaseEntityFunc(sdk, data)
}


// Signal returns a Signal entity bound to this client.
// Idiomatic usage: client.Signal(nil).List(nil, nil) or
// client.Signal(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Signal(data map[string]any) ComposalEntityBase {
	return NewSignalEntityFunc(sdk, data)
}


// SignalInbound returns a SignalInbound entity bound to this client.
// Idiomatic usage: client.SignalInbound(nil).List(nil, nil) or
// client.SignalInbound(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SignalInbound(data map[string]any) ComposalEntityBase {
	return NewSignalInboundEntityFunc(sdk, data)
}


// SignalIntegration returns a SignalIntegration entity bound to this client.
// Idiomatic usage: client.SignalIntegration(nil).List(nil, nil) or
// client.SignalIntegration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SignalIntegration(data map[string]any) ComposalEntityBase {
	return NewSignalIntegrationEntityFunc(sdk, data)
}


// SignalIntegrationDelivery returns a SignalIntegrationDelivery entity bound to this client.
// Idiomatic usage: client.SignalIntegrationDelivery(nil).List(nil, nil) or
// client.SignalIntegrationDelivery(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SignalIntegrationDelivery(data map[string]any) ComposalEntityBase {
	return NewSignalIntegrationDeliveryEntityFunc(sdk, data)
}


// SignalIntegrationTarget returns a SignalIntegrationTarget entity bound to this client.
// Idiomatic usage: client.SignalIntegrationTarget(nil).List(nil, nil) or
// client.SignalIntegrationTarget(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SignalIntegrationTarget(data map[string]any) ComposalEntityBase {
	return NewSignalIntegrationTargetEntityFunc(sdk, data)
}


// SignalSubscription returns a SignalSubscription entity bound to this client.
// Idiomatic usage: client.SignalSubscription(nil).List(nil, nil) or
// client.SignalSubscription(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SignalSubscription(data map[string]any) ComposalEntityBase {
	return NewSignalSubscriptionEntityFunc(sdk, data)
}


// Site returns a Site entity bound to this client.
// Idiomatic usage: client.Site(nil).List(nil, nil) or
// client.Site(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Site(data map[string]any) ComposalEntityBase {
	return NewSiteEntityFunc(sdk, data)
}


// SiteAccessKey returns a SiteAccessKey entity bound to this client.
// Idiomatic usage: client.SiteAccessKey(nil).List(nil, nil) or
// client.SiteAccessKey(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SiteAccessKey(data map[string]any) ComposalEntityBase {
	return NewSiteAccessKeyEntityFunc(sdk, data)
}


// SitePreview returns a SitePreview entity bound to this client.
// Idiomatic usage: client.SitePreview(nil).List(nil, nil) or
// client.SitePreview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SitePreview(data map[string]any) ComposalEntityBase {
	return NewSitePreviewEntityFunc(sdk, data)
}


// SiteSecret returns a SiteSecret entity bound to this client.
// Idiomatic usage: client.SiteSecret(nil).List(nil, nil) or
// client.SiteSecret(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SiteSecret(data map[string]any) ComposalEntityBase {
	return NewSiteSecretEntityFunc(sdk, data)
}


// SlackChannel returns a SlackChannel entity bound to this client.
// Idiomatic usage: client.SlackChannel(nil).List(nil, nil) or
// client.SlackChannel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SlackChannel(data map[string]any) ComposalEntityBase {
	return NewSlackChannelEntityFunc(sdk, data)
}


// SourceConnection returns a SourceConnection entity bound to this client.
// Idiomatic usage: client.SourceConnection(nil).List(nil, nil) or
// client.SourceConnection(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SourceConnection(data map[string]any) ComposalEntityBase {
	return NewSourceConnectionEntityFunc(sdk, data)
}


// SpaceAlertRule returns a SpaceAlertRule entity bound to this client.
// Idiomatic usage: client.SpaceAlertRule(nil).List(nil, nil) or
// client.SpaceAlertRule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceAlertRule(data map[string]any) ComposalEntityBase {
	return NewSpaceAlertRuleEntityFunc(sdk, data)
}


// SpaceAuditEvent returns a SpaceAuditEvent entity bound to this client.
// Idiomatic usage: client.SpaceAuditEvent(nil).List(nil, nil) or
// client.SpaceAuditEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceAuditEvent(data map[string]any) ComposalEntityBase {
	return NewSpaceAuditEventEntityFunc(sdk, data)
}


// SpaceDnsRecord returns a SpaceDnsRecord entity bound to this client.
// Idiomatic usage: client.SpaceDnsRecord(nil).List(nil, nil) or
// client.SpaceDnsRecord(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceDnsRecord(data map[string]any) ComposalEntityBase {
	return NewSpaceDnsRecordEntityFunc(sdk, data)
}


// SpaceEnrollmentToken returns a SpaceEnrollmentToken entity bound to this client.
// Idiomatic usage: client.SpaceEnrollmentToken(nil).List(nil, nil) or
// client.SpaceEnrollmentToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceEnrollmentToken(data map[string]any) ComposalEntityBase {
	return NewSpaceEnrollmentTokenEntityFunc(sdk, data)
}


// SpaceGateway returns a SpaceGateway entity bound to this client.
// Idiomatic usage: client.SpaceGateway(nil).List(nil, nil) or
// client.SpaceGateway(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceGateway(data map[string]any) ComposalEntityBase {
	return NewSpaceGatewayEntityFunc(sdk, data)
}


// SpaceGroup returns a SpaceGroup entity bound to this client.
// Idiomatic usage: client.SpaceGroup(nil).List(nil, nil) or
// client.SpaceGroup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceGroup(data map[string]any) ComposalEntityBase {
	return NewSpaceGroupEntityFunc(sdk, data)
}


// SpaceGroupMembership returns a SpaceGroupMembership entity bound to this client.
// Idiomatic usage: client.SpaceGroupMembership(nil).List(nil, nil) or
// client.SpaceGroupMembership(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceGroupMembership(data map[string]any) ComposalEntityBase {
	return NewSpaceGroupMembershipEntityFunc(sdk, data)
}


// SpaceLogStream returns a SpaceLogStream entity bound to this client.
// Idiomatic usage: client.SpaceLogStream(nil).List(nil, nil) or
// client.SpaceLogStream(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceLogStream(data map[string]any) ComposalEntityBase {
	return NewSpaceLogStreamEntityFunc(sdk, data)
}


// SpaceMetricSery returns a SpaceMetricSery entity bound to this client.
// Idiomatic usage: client.SpaceMetricSery(nil).List(nil, nil) or
// client.SpaceMetricSery(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceMetricSery(data map[string]any) ComposalEntityBase {
	return NewSpaceMetricSeryEntityFunc(sdk, data)
}


// SpaceOtelCollector returns a SpaceOtelCollector entity bound to this client.
// Idiomatic usage: client.SpaceOtelCollector(nil).List(nil, nil) or
// client.SpaceOtelCollector(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceOtelCollector(data map[string]any) ComposalEntityBase {
	return NewSpaceOtelCollectorEntityFunc(sdk, data)
}


// SpacePeer returns a SpacePeer entity bound to this client.
// Idiomatic usage: client.SpacePeer(nil).List(nil, nil) or
// client.SpacePeer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpacePeer(data map[string]any) ComposalEntityBase {
	return NewSpacePeerEntityFunc(sdk, data)
}


// SpacePeerAttachment returns a SpacePeerAttachment entity bound to this client.
// Idiomatic usage: client.SpacePeerAttachment(nil).List(nil, nil) or
// client.SpacePeerAttachment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpacePeerAttachment(data map[string]any) ComposalEntityBase {
	return NewSpacePeerAttachmentEntityFunc(sdk, data)
}


// SpacePolicy returns a SpacePolicy entity bound to this client.
// Idiomatic usage: client.SpacePolicy(nil).List(nil, nil) or
// client.SpacePolicy(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpacePolicy(data map[string]any) ComposalEntityBase {
	return NewSpacePolicyEntityFunc(sdk, data)
}


// SpaceSegment returns a SpaceSegment entity bound to this client.
// Idiomatic usage: client.SpaceSegment(nil).List(nil, nil) or
// client.SpaceSegment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceSegment(data map[string]any) ComposalEntityBase {
	return NewSpaceSegmentEntityFunc(sdk, data)
}


// SpaceTraceSpan returns a SpaceTraceSpan entity bound to this client.
// Idiomatic usage: client.SpaceTraceSpan(nil).List(nil, nil) or
// client.SpaceTraceSpan(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SpaceTraceSpan(data map[string]any) ComposalEntityBase {
	return NewSpaceTraceSpanEntityFunc(sdk, data)
}


// Spark returns a Spark entity bound to this client.
// Idiomatic usage: client.Spark(nil).List(nil, nil) or
// client.Spark(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Spark(data map[string]any) ComposalEntityBase {
	return NewSparkEntityFunc(sdk, data)
}


// SparkAgentIntegration returns a SparkAgentIntegration entity bound to this client.
// Idiomatic usage: client.SparkAgentIntegration(nil).List(nil, nil) or
// client.SparkAgentIntegration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkAgentIntegration(data map[string]any) ComposalEntityBase {
	return NewSparkAgentIntegrationEntityFunc(sdk, data)
}


// SparkAgentLocalThread returns a SparkAgentLocalThread entity bound to this client.
// Idiomatic usage: client.SparkAgentLocalThread(nil).List(nil, nil) or
// client.SparkAgentLocalThread(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkAgentLocalThread(data map[string]any) ComposalEntityBase {
	return NewSparkAgentLocalThreadEntityFunc(sdk, data)
}


// SparkAgentSite returns a SparkAgentSite entity bound to this client.
// Idiomatic usage: client.SparkAgentSite(nil).List(nil, nil) or
// client.SparkAgentSite(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkAgentSite(data map[string]any) ComposalEntityBase {
	return NewSparkAgentSiteEntityFunc(sdk, data)
}


// SparkAgentSkill returns a SparkAgentSkill entity bound to this client.
// Idiomatic usage: client.SparkAgentSkill(nil).List(nil, nil) or
// client.SparkAgentSkill(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkAgentSkill(data map[string]any) ComposalEntityBase {
	return NewSparkAgentSkillEntityFunc(sdk, data)
}


// SparkAgentThread returns a SparkAgentThread entity bound to this client.
// Idiomatic usage: client.SparkAgentThread(nil).List(nil, nil) or
// client.SparkAgentThread(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkAgentThread(data map[string]any) ComposalEntityBase {
	return NewSparkAgentThreadEntityFunc(sdk, data)
}


// SparkAutomation returns a SparkAutomation entity bound to this client.
// Idiomatic usage: client.SparkAutomation(nil).List(nil, nil) or
// client.SparkAutomation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkAutomation(data map[string]any) ComposalEntityBase {
	return NewSparkAutomationEntityFunc(sdk, data)
}


// SparkCredit returns a SparkCredit entity bound to this client.
// Idiomatic usage: client.SparkCredit(nil).List(nil, nil) or
// client.SparkCredit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkCredit(data map[string]any) ComposalEntityBase {
	return NewSparkCreditEntityFunc(sdk, data)
}


// SparkCreditAgentUsage returns a SparkCreditAgentUsage entity bound to this client.
// Idiomatic usage: client.SparkCreditAgentUsage(nil).List(nil, nil) or
// client.SparkCreditAgentUsage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkCreditAgentUsage(data map[string]any) ComposalEntityBase {
	return NewSparkCreditAgentUsageEntityFunc(sdk, data)
}


// SparkCreditUsageTotal returns a SparkCreditUsageTotal entity bound to this client.
// Idiomatic usage: client.SparkCreditUsageTotal(nil).List(nil, nil) or
// client.SparkCreditUsageTotal(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SparkCreditUsageTotal(data map[string]any) ComposalEntityBase {
	return NewSparkCreditUsageTotalEntityFunc(sdk, data)
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


// StatusChange returns a StatusChange entity bound to this client.
// Idiomatic usage: client.StatusChange(nil).List(nil, nil) or
// client.StatusChange(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) StatusChange(data map[string]any) ComposalEntityBase {
	return NewStatusChangeEntityFunc(sdk, data)
}


// StatusCommit returns a StatusCommit entity bound to this client.
// Idiomatic usage: client.StatusCommit(nil).List(nil, nil) or
// client.StatusCommit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) StatusCommit(data map[string]any) ComposalEntityBase {
	return NewStatusCommitEntityFunc(sdk, data)
}


// StatusPatchset returns a StatusPatchset entity bound to this client.
// Idiomatic usage: client.StatusPatchset(nil).List(nil, nil) or
// client.StatusPatchset(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) StatusPatchset(data map[string]any) ComposalEntityBase {
	return NewStatusPatchsetEntityFunc(sdk, data)
}


// StripeWebhook returns a StripeWebhook entity bound to this client.
// Idiomatic usage: client.StripeWebhook(nil).List(nil, nil) or
// client.StripeWebhook(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) StripeWebhook(data map[string]any) ComposalEntityBase {
	return NewStripeWebhookEntityFunc(sdk, data)
}


// SubmitTelemetry returns a SubmitTelemetry entity bound to this client.
// Idiomatic usage: client.SubmitTelemetry(nil).List(nil, nil) or
// client.SubmitTelemetry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SubmitTelemetry(data map[string]any) ComposalEntityBase {
	return NewSubmitTelemetryEntityFunc(sdk, data)
}


// SubscriptionModel returns a SubscriptionModel entity bound to this client.
// Idiomatic usage: client.SubscriptionModel(nil).List(nil, nil) or
// client.SubscriptionModel(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SubscriptionModel(data map[string]any) ComposalEntityBase {
	return NewSubscriptionModelEntityFunc(sdk, data)
}


// SwarmEvent returns a SwarmEvent entity bound to this client.
// Idiomatic usage: client.SwarmEvent(nil).List(nil, nil) or
// client.SwarmEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SwarmEvent(data map[string]any) ComposalEntityBase {
	return NewSwarmEventEntityFunc(sdk, data)
}


// SwarmLive returns a SwarmLive entity bound to this client.
// Idiomatic usage: client.SwarmLive(nil).List(nil, nil) or
// client.SwarmLive(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SwarmLive(data map[string]any) ComposalEntityBase {
	return NewSwarmLiveEntityFunc(sdk, data)
}


// SwarmNote returns a SwarmNote entity bound to this client.
// Idiomatic usage: client.SwarmNote(nil).List(nil, nil) or
// client.SwarmNote(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SwarmNote(data map[string]any) ComposalEntityBase {
	return NewSwarmNoteEntityFunc(sdk, data)
}


// SwarmTask returns a SwarmTask entity bound to this client.
// Idiomatic usage: client.SwarmTask(nil).List(nil, nil) or
// client.SwarmTask(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) SwarmTask(data map[string]any) ComposalEntityBase {
	return NewSwarmTaskEntityFunc(sdk, data)
}


// TaskLease returns a TaskLease entity bound to this client.
// Idiomatic usage: client.TaskLease(nil).List(nil, nil) or
// client.TaskLease(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) TaskLease(data map[string]any) ComposalEntityBase {
	return NewTaskLeaseEntityFunc(sdk, data)
}


// ThreadPreview returns a ThreadPreview entity bound to this client.
// Idiomatic usage: client.ThreadPreview(nil).List(nil, nil) or
// client.ThreadPreview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ThreadPreview(data map[string]any) ComposalEntityBase {
	return NewThreadPreviewEntityFunc(sdk, data)
}


// ThreadPreviewAccess returns a ThreadPreviewAccess entity bound to this client.
// Idiomatic usage: client.ThreadPreviewAccess(nil).List(nil, nil) or
// client.ThreadPreviewAccess(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ThreadPreviewAccess(data map[string]any) ComposalEntityBase {
	return NewThreadPreviewAccessEntityFunc(sdk, data)
}


// ToolFeedback returns a ToolFeedback entity bound to this client.
// Idiomatic usage: client.ToolFeedback(nil).List(nil, nil) or
// client.ToolFeedback(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) ToolFeedback(data map[string]any) ComposalEntityBase {
	return NewToolFeedbackEntityFunc(sdk, data)
}


// Transcript returns a Transcript entity bound to this client.
// Idiomatic usage: client.Transcript(nil).List(nil, nil) or
// client.Transcript(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) Transcript(data map[string]any) ComposalEntityBase {
	return NewTranscriptEntityFunc(sdk, data)
}


// V1Message returns a V1Message entity bound to this client.
// Idiomatic usage: client.V1Message(nil).List(nil, nil) or
// client.V1Message(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) V1Message(data map[string]any) ComposalEntityBase {
	return NewV1MessageEntityFunc(sdk, data)
}


// VcBranch returns a VcBranch entity bound to this client.
// Idiomatic usage: client.VcBranch(nil).List(nil, nil) or
// client.VcBranch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcBranch(data map[string]any) ComposalEntityBase {
	return NewVcBranchEntityFunc(sdk, data)
}


// VcBrowser returns a VcBrowser entity bound to this client.
// Idiomatic usage: client.VcBrowser(nil).List(nil, nil) or
// client.VcBrowser(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcBrowser(data map[string]any) ComposalEntityBase {
	return NewVcBrowserEntityFunc(sdk, data)
}


// VcChange returns a VcChange entity bound to this client.
// Idiomatic usage: client.VcChange(nil).List(nil, nil) or
// client.VcChange(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcChange(data map[string]any) ComposalEntityBase {
	return NewVcChangeEntityFunc(sdk, data)
}


// VcChangeGroup returns a VcChangeGroup entity bound to this client.
// Idiomatic usage: client.VcChangeGroup(nil).List(nil, nil) or
// client.VcChangeGroup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcChangeGroup(data map[string]any) ComposalEntityBase {
	return NewVcChangeGroupEntityFunc(sdk, data)
}


// VcFile returns a VcFile entity bound to this client.
// Idiomatic usage: client.VcFile(nil).List(nil, nil) or
// client.VcFile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcFile(data map[string]any) ComposalEntityBase {
	return NewVcFileEntityFunc(sdk, data)
}


// VcMergeQueue returns a VcMergeQueue entity bound to this client.
// Idiomatic usage: client.VcMergeQueue(nil).List(nil, nil) or
// client.VcMergeQueue(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcMergeQueue(data map[string]any) ComposalEntityBase {
	return NewVcMergeQueueEntityFunc(sdk, data)
}


// VcStack returns a VcStack entity bound to this client.
// Idiomatic usage: client.VcStack(nil).List(nil, nil) or
// client.VcStack(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcStack(data map[string]any) ComposalEntityBase {
	return NewVcStackEntityFunc(sdk, data)
}


// VcsNode returns a VcsNode entity bound to this client.
// Idiomatic usage: client.VcsNode(nil).List(nil, nil) or
// client.VcsNode(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcsNode(data map[string]any) ComposalEntityBase {
	return NewVcsNodeEntityFunc(sdk, data)
}


// VcsSetting returns a VcsSetting entity bound to this client.
// Idiomatic usage: client.VcsSetting(nil).List(nil, nil) or
// client.VcsSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VcsSetting(data map[string]any) ComposalEntityBase {
	return NewVcsSettingEntityFunc(sdk, data)
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


// VerifyEmailVerification returns a VerifyEmailVerification entity bound to this client.
// Idiomatic usage: client.VerifyEmailVerification(nil).List(nil, nil) or
// client.VerifyEmailVerification(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifyEmailVerification(data map[string]any) ComposalEntityBase {
	return NewVerifyEmailVerificationEntityFunc(sdk, data)
}


// VerifyEnvironment returns a VerifyEnvironment entity bound to this client.
// Idiomatic usage: client.VerifyEnvironment(nil).List(nil, nil) or
// client.VerifyEnvironment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifyEnvironment(data map[string]any) ComposalEntityBase {
	return NewVerifyEnvironmentEntityFunc(sdk, data)
}


// VerifyEvidence returns a VerifyEvidence entity bound to this client.
// Idiomatic usage: client.VerifyEvidence(nil).List(nil, nil) or
// client.VerifyEvidence(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifyEvidence(data map[string]any) ComposalEntityBase {
	return NewVerifyEvidenceEntityFunc(sdk, data)
}


// VerifyMergeRequest returns a VerifyMergeRequest entity bound to this client.
// Idiomatic usage: client.VerifyMergeRequest(nil).List(nil, nil) or
// client.VerifyMergeRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifyMergeRequest(data map[string]any) ComposalEntityBase {
	return NewVerifyMergeRequestEntityFunc(sdk, data)
}


// VerifyPullRequest returns a VerifyPullRequest entity bound to this client.
// Idiomatic usage: client.VerifyPullRequest(nil).List(nil, nil) or
// client.VerifyPullRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifyPullRequest(data map[string]any) ComposalEntityBase {
	return NewVerifyPullRequestEntityFunc(sdk, data)
}


// VerifySignalIntegration returns a VerifySignalIntegration entity bound to this client.
// Idiomatic usage: client.VerifySignalIntegration(nil).List(nil, nil) or
// client.VerifySignalIntegration(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) VerifySignalIntegration(data map[string]any) ComposalEntityBase {
	return NewVerifySignalIntegrationEntityFunc(sdk, data)
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


// WaitlistApplication returns a WaitlistApplication entity bound to this client.
// Idiomatic usage: client.WaitlistApplication(nil).List(nil, nil) or
// client.WaitlistApplication(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WaitlistApplication(data map[string]any) ComposalEntityBase {
	return NewWaitlistApplicationEntityFunc(sdk, data)
}


// WebBotAuth returns a WebBotAuth entity bound to this client.
// Idiomatic usage: client.WebBotAuth(nil).List(nil, nil) or
// client.WebBotAuth(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WebBotAuth(data map[string]any) ComposalEntityBase {
	return NewWebBotAuthEntityFunc(sdk, data)
}


// WebhookGitlab returns a WebhookGitlab entity bound to this client.
// Idiomatic usage: client.WebhookGitlab(nil).List(nil, nil) or
// client.WebhookGitlab(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WebhookGitlab(data map[string]any) ComposalEntityBase {
	return NewWebhookGitlabEntityFunc(sdk, data)
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


// WorkspaceActivity returns a WorkspaceActivity entity bound to this client.
// Idiomatic usage: client.WorkspaceActivity(nil).List(nil, nil) or
// client.WorkspaceActivity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WorkspaceActivity(data map[string]any) ComposalEntityBase {
	return NewWorkspaceActivityEntityFunc(sdk, data)
}


// WorkspaceActivityNotification returns a WorkspaceActivityNotification entity bound to this client.
// Idiomatic usage: client.WorkspaceActivityNotification(nil).List(nil, nil) or
// client.WorkspaceActivityNotification(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WorkspaceActivityNotification(data map[string]any) ComposalEntityBase {
	return NewWorkspaceActivityNotificationEntityFunc(sdk, data)
}


// WorkspaceSpace returns a WorkspaceSpace entity bound to this client.
// Idiomatic usage: client.WorkspaceSpace(nil).List(nil, nil) or
// client.WorkspaceSpace(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WorkspaceSpace(data map[string]any) ComposalEntityBase {
	return NewWorkspaceSpaceEntityFunc(sdk, data)
}


// WorkspaceSpacePreference returns a WorkspaceSpacePreference entity bound to this client.
// Idiomatic usage: client.WorkspaceSpacePreference(nil).List(nil, nil) or
// client.WorkspaceSpacePreference(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ComposalSDK) WorkspaceSpacePreference(data map[string]any) ComposalEntityBase {
	return NewWorkspaceSpacePreferenceEntityFunc(sdk, data)
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
