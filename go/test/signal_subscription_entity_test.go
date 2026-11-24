package sdktest

import (
	"encoding/json"
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
const signal_subscriptionEntityLiveStrict = true


func TestSignalSubscriptionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SignalSubscription(nil)
		if ent == nil {
			t.Fatal("expected non-nil SignalSubscriptionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SignalSubscription(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := signal_subscriptionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "signal_subscription." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"signal_subscription.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/signal_subscriptions\"}")
			t.Log("LIVE STEP {\"id\":\"signal_subscription.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/signal_subscriptions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"signal_subscription.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/signal_subscriptions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"signal_subscription.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, signal_subscriptionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["signal_subscription01"]
			}
			livePace()
			liveExisting(t, signal_subscriptionEntityLiveStrict, setup.data, "signal_subscription", "id", _liveId,
				func() (any, error) {
					return client.SignalSubscription(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		signalSubscriptionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.signal_subscription")))
		var signalSubscriptionRef01Data map[string]any
		if len(signalSubscriptionRef01DataRaw) > 0 {
			signalSubscriptionRef01Data = core.ToMapAny(signalSubscriptionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = signalSubscriptionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		signalSubscriptionRef01Ent := client.SignalSubscription(nil)
		signalSubscriptionRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		signalSubscriptionRef01ListResult, err := signalSubscriptionRef01Ent.List(signalSubscriptionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, signalSubscriptionRef01ListOk := signalSubscriptionRef01ListResult.([]any)
		if !signalSubscriptionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", signalSubscriptionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		signalSubscriptionRef01MatchDt0 := map[string]any{
			"id": signalSubscriptionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			signalSubscriptionRef01MatchDt0["organization_id"] = v
		} else {
			signalSubscriptionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		signalSubscriptionRef01DataDt0Loaded, err := signalSubscriptionRef01Ent.Load(signalSubscriptionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		signalSubscriptionRef01DataDt0LoadResult := core.ToMapAny(entityData(signalSubscriptionRef01DataDt0Loaded))
		if signalSubscriptionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(signalSubscriptionRef01DataDt0LoadResult["id"], signalSubscriptionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, signal_subscriptionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		signalSubscriptionRef01Ent := client.SignalSubscription(nil)
		signalSubscriptionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "signal_subscription"}), "signal_subscription_ref01"))
		signalSubscriptionRef01Data["organization_id"] = setup.idmap["organization01"]

		signalSubscriptionRef01DataResult, err := signalSubscriptionRef01Ent.Create(signalSubscriptionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		signalSubscriptionRef01Data = core.ToMapAny(entityData(signalSubscriptionRef01DataResult))
		if signalSubscriptionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if signalSubscriptionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		signalSubscriptionRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		signalSubscriptionRef01ListResult, err := signalSubscriptionRef01Ent.List(signalSubscriptionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		signalSubscriptionRef01List, signalSubscriptionRef01ListOk := signalSubscriptionRef01ListResult.([]any)
		if !signalSubscriptionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", signalSubscriptionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(signalSubscriptionRef01List), map[string]any{"id": signalSubscriptionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		signalSubscriptionRef01DataUp0Up := map[string]any{
			"id": signalSubscriptionRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		signalSubscriptionRef01ResdataUp0Result, err := signalSubscriptionRef01Ent.Update(signalSubscriptionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		signalSubscriptionRef01ResdataUp0 := core.ToMapAny(entityData(signalSubscriptionRef01ResdataUp0Result))
		if signalSubscriptionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(signalSubscriptionRef01ResdataUp0["id"], signalSubscriptionRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		signalSubscriptionRef01MatchDt0 := map[string]any{
			"id": signalSubscriptionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			signalSubscriptionRef01MatchDt0["organization_id"] = v
		} else {
			signalSubscriptionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		signalSubscriptionRef01DataDt0Loaded, err := signalSubscriptionRef01Ent.Load(signalSubscriptionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		signalSubscriptionRef01DataDt0LoadResult := core.ToMapAny(entityData(signalSubscriptionRef01DataDt0Loaded))
		if signalSubscriptionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(signalSubscriptionRef01DataDt0LoadResult["id"], signalSubscriptionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		signalSubscriptionRef01MatchRm0 := map[string]any{
			"id": signalSubscriptionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			signalSubscriptionRef01MatchRm0["organization_id"] = v
		} else {
			signalSubscriptionRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = signalSubscriptionRef01Ent.Remove(signalSubscriptionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		signalSubscriptionRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		signalSubscriptionRef01ListRt0Result, err := signalSubscriptionRef01Ent.List(signalSubscriptionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		signalSubscriptionRef01ListRt0, signalSubscriptionRef01ListRt0Ok := signalSubscriptionRef01ListRt0Result.([]any)
		if !signalSubscriptionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", signalSubscriptionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(signalSubscriptionRef01ListRt0), map[string]any{"id": signalSubscriptionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func signal_subscriptionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "signal_subscription", "SignalSubscriptionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read signal_subscription test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse signal_subscription test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"signal_subscription01", "signal_subscription02", "signal_subscription03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add organization_id alias for update test.
	if idmapResolved["organization_id"] == nil {
		idmapResolved["organization_id"] = idmapResolved["organization01"]
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
