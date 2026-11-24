package sdktest

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/composal-sdk/go"
	"github.com/voxgig-sdk/composal-sdk/go/core"

	vs "github.com/voxgig-sdk/composal-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const model_subscription_accountEntityLiveStrict = true


type model_subscription_accountFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *model_subscription_accountFailHook) PreSpec(ctx *sdk.Context) {
	panic("model_subscription_account hook failed")
}

func (f *model_subscription_accountFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestModelSubscriptionAccountEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ModelSubscriptionAccount(nil)
		if ent == nil {
			t.Fatal("expected non-nil ModelSubscriptionAccountEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"model_subscription_account": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.ModelSubscriptionAccount(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				t.Fatalf("stream failed: %v", si.Err)
			}
			seen = append(seen, si.Item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for si := range streamSdk.ModelSubscriptionAccount(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					t.Fatalf("stream failed: %v", si.Err)
				}
				if sub, ok := si.Item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, si.Item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("stream-error", func(t *testing.T) {
		offline := map[string]any{"net": map[string]any{"offline": true}}
		var streamerr error
		for si := range sdk.TestSDK(offline, nil).ModelSubscriptionAccount(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).ModelSubscriptionAccount(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.ModelSubscriptionAccount(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					denyerr = si.Err
				}
			}
			if sdkerr, ok := denyerr.(*core.ComposalError); !ok || "rbac_denied" != sdkerr.Code {
				t.Fatalf("expected the rbac denial as a stream value, got %v", denyerr)
			}
		}
	})

	t.Run("stream-ctrl", func(t *testing.T) {
		explain := map[string]any{}
		ctrl := map[string]any{"explain": explain}
		for range sdk.TestSDK(nil, nil).ModelSubscriptionAccount(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &model_subscription_accountFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.ModelSubscriptionAccount(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.ModelSubscriptionAccount(nil).List(nil, map[string]any{"throw": false}); nil != err {
			t.Fatalf("throw false: expected no error, got %v", err)
		}
		if fired == hook.unexpected {
			t.Fatalf("throw false: PreUnexpected did not fire")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ModelSubscriptionAccount(nil).List(map[string]any{"can_disconnect": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := model_subscription_accountBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "model_subscription_account." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"model_subscription_account.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/model_subscription_accounts\"}")
			t.Log("LIVE STEP {\"id\":\"model_subscription_account.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/model_subscription_accounts/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"model_subscription_account.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/model_subscription_accounts/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"model_subscription_account.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		modelSubscriptionAccountRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.model_subscription_account")))
		var modelSubscriptionAccountRef01Data map[string]any
		if len(modelSubscriptionAccountRef01DataRaw) > 0 {
			modelSubscriptionAccountRef01Data = core.ToMapAny(modelSubscriptionAccountRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = modelSubscriptionAccountRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		modelSubscriptionAccountRef01Ent := client.ModelSubscriptionAccount(nil)
		modelSubscriptionAccountRef01Match := map[string]any{}

		modelSubscriptionAccountRef01ListResult, err := modelSubscriptionAccountRef01Ent.List(modelSubscriptionAccountRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, modelSubscriptionAccountRef01ListOk := modelSubscriptionAccountRef01ListResult.([]any)
		if !modelSubscriptionAccountRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", modelSubscriptionAccountRef01ListResult)
		}

		return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		modelSubscriptionAccountRef01Ent := client.ModelSubscriptionAccount(nil)
		modelSubscriptionAccountRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "model_subscription_account"}), "model_subscription_account_ref01"))

		modelSubscriptionAccountRef01DataResult, err := modelSubscriptionAccountRef01Ent.Create(modelSubscriptionAccountRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		modelSubscriptionAccountRef01Data = core.ToMapAny(entityData(modelSubscriptionAccountRef01DataResult))
		if modelSubscriptionAccountRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if modelSubscriptionAccountRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		modelSubscriptionAccountRef01Match := map[string]any{}

		modelSubscriptionAccountRef01ListResult, err := modelSubscriptionAccountRef01Ent.List(modelSubscriptionAccountRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		modelSubscriptionAccountRef01List, modelSubscriptionAccountRef01ListOk := modelSubscriptionAccountRef01ListResult.([]any)
		if !modelSubscriptionAccountRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", modelSubscriptionAccountRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(modelSubscriptionAccountRef01List), map[string]any{"id": modelSubscriptionAccountRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		modelSubscriptionAccountRef01DataUp0Up := map[string]any{
			"id": modelSubscriptionAccountRef01Data["id"],
		}

		modelSubscriptionAccountRef01MarkdefUp0Name := "email"
		modelSubscriptionAccountRef01MarkdefUp0Value := fmt.Sprintf("Mark01-model_subscription_account_ref01_%d", setup.now)
		modelSubscriptionAccountRef01DataUp0Up[modelSubscriptionAccountRef01MarkdefUp0Name] = modelSubscriptionAccountRef01MarkdefUp0Value

		modelSubscriptionAccountRef01ResdataUp0Result, err := modelSubscriptionAccountRef01Ent.Update(modelSubscriptionAccountRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		modelSubscriptionAccountRef01ResdataUp0 := core.ToMapAny(entityData(modelSubscriptionAccountRef01ResdataUp0Result))
		if modelSubscriptionAccountRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(modelSubscriptionAccountRef01ResdataUp0["id"], modelSubscriptionAccountRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if modelSubscriptionAccountRef01ResdataUp0[modelSubscriptionAccountRef01MarkdefUp0Name] != modelSubscriptionAccountRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", modelSubscriptionAccountRef01MarkdefUp0Name, modelSubscriptionAccountRef01ResdataUp0[modelSubscriptionAccountRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		modelSubscriptionAccountRef01MatchRm0 := map[string]any{
			"id": modelSubscriptionAccountRef01Data["id"],
		}
		_, err = modelSubscriptionAccountRef01Ent.Remove(modelSubscriptionAccountRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		modelSubscriptionAccountRef01MatchRt0 := map[string]any{}

		modelSubscriptionAccountRef01ListRt0Result, err := modelSubscriptionAccountRef01Ent.List(modelSubscriptionAccountRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		modelSubscriptionAccountRef01ListRt0, modelSubscriptionAccountRef01ListRt0Ok := modelSubscriptionAccountRef01ListRt0Result.([]any)
		if !modelSubscriptionAccountRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", modelSubscriptionAccountRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(modelSubscriptionAccountRef01ListRt0), map[string]any{"id": modelSubscriptionAccountRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func model_subscription_accountBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "model_subscription_account", "ModelSubscriptionAccountTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read model_subscription_account test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse model_subscription_account test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"model_subscription_account01", "model_subscription_account02", "model_subscription_account03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_MODEL_SUBSCRIPTION_ACCOUNT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_MODEL_SUBSCRIPTION_ACCOUNT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_MODEL_SUBSCRIPTION_ACCOUNT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["COMPOSAL_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["COMPOSAL_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewComposalSDK(core.ToMapAny(mergedOpts))
	}

	live := env["COMPOSAL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["COMPOSAL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
