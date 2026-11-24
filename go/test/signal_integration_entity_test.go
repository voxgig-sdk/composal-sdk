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
const signal_integrationEntityLiveStrict = true


func TestSignalIntegrationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SignalIntegration(nil)
		if ent == nil {
			t.Fatal("expected non-nil SignalIntegrationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SignalIntegration(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := signal_integrationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "signal_integration." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"signal_integration.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token\"}")
			t.Log("LIVE STEP {\"id\":\"signal_integration.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/signal_integrations/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"signal_integration.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/signal_integrations/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"signal_integration.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, signal_integrationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["signal_integration01"]
			}
			livePace()
			liveExisting(t, signal_integrationEntityLiveStrict, setup.data, "signal_integration", "id", _liveId,
				func() (any, error) {
					return client.SignalIntegration(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		signalIntegrationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.signal_integration")))
		var signalIntegrationRef01Data map[string]any
		if len(signalIntegrationRef01DataRaw) > 0 {
			signalIntegrationRef01Data = core.ToMapAny(signalIntegrationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = signalIntegrationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		signalIntegrationRef01Ent := client.SignalIntegration(nil)
		signalIntegrationRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		signalIntegrationRef01ListResult, err := signalIntegrationRef01Ent.List(signalIntegrationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, signalIntegrationRef01ListOk := signalIntegrationRef01ListResult.([]any)
		if !signalIntegrationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", signalIntegrationRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		signalIntegrationRef01MatchDt0 := map[string]any{
			"id": signalIntegrationRef01Data["id"],
		}
		switch v := signalIntegrationRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			signalIntegrationRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				signalIntegrationRef01MatchDt0["organization_id"] = v
			} else {
				signalIntegrationRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		signalIntegrationRef01DataDt0Loaded, err := signalIntegrationRef01Ent.Load(signalIntegrationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		signalIntegrationRef01DataDt0LoadResult := core.ToMapAny(entityData(signalIntegrationRef01DataDt0Loaded))
		if signalIntegrationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(signalIntegrationRef01DataDt0LoadResult["id"], signalIntegrationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, signal_integrationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		signalIntegrationRef01Ent := client.SignalIntegration(nil)
		signalIntegrationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "signal_integration"}), "signal_integration_ref01"))
		signalIntegrationRef01Data["organization_id"] = setup.idmap["organization01"]

		signalIntegrationRef01DataResult, err := signalIntegrationRef01Ent.Create(signalIntegrationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		signalIntegrationRef01Data = core.ToMapAny(entityData(signalIntegrationRef01DataResult))
		if signalIntegrationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if signalIntegrationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		signalIntegrationRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		signalIntegrationRef01ListResult, err := signalIntegrationRef01Ent.List(signalIntegrationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		signalIntegrationRef01List, signalIntegrationRef01ListOk := signalIntegrationRef01ListResult.([]any)
		if !signalIntegrationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", signalIntegrationRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(signalIntegrationRef01List), map[string]any{"id": signalIntegrationRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		signalIntegrationRef01DataUp0Up := map[string]any{
			"id": signalIntegrationRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		signalIntegrationRef01MarkdefUp0Name := "api_token"
		signalIntegrationRef01MarkdefUp0Value := fmt.Sprintf("Mark01-signal_integration_ref01_%d", setup.now)
		signalIntegrationRef01DataUp0Up[signalIntegrationRef01MarkdefUp0Name] = signalIntegrationRef01MarkdefUp0Value

		signalIntegrationRef01ResdataUp0Result, err := signalIntegrationRef01Ent.Update(signalIntegrationRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		signalIntegrationRef01ResdataUp0 := core.ToMapAny(entityData(signalIntegrationRef01ResdataUp0Result))
		if signalIntegrationRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(signalIntegrationRef01ResdataUp0["id"], signalIntegrationRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if signalIntegrationRef01ResdataUp0[signalIntegrationRef01MarkdefUp0Name] != signalIntegrationRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", signalIntegrationRef01MarkdefUp0Name, signalIntegrationRef01ResdataUp0[signalIntegrationRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		signalIntegrationRef01MatchDt0 := map[string]any{
			"id": signalIntegrationRef01Data["id"],
		}
		switch v := signalIntegrationRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			signalIntegrationRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				signalIntegrationRef01MatchDt0["organization_id"] = v
			} else {
				signalIntegrationRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		signalIntegrationRef01DataDt0Loaded, err := signalIntegrationRef01Ent.Load(signalIntegrationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		signalIntegrationRef01DataDt0LoadResult := core.ToMapAny(entityData(signalIntegrationRef01DataDt0Loaded))
		if signalIntegrationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(signalIntegrationRef01DataDt0LoadResult["id"], signalIntegrationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		signalIntegrationRef01MatchRm0 := map[string]any{
			"id": signalIntegrationRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			signalIntegrationRef01MatchRm0["organization_id"] = v
		} else {
			signalIntegrationRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = signalIntegrationRef01Ent.Remove(signalIntegrationRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		signalIntegrationRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		signalIntegrationRef01ListRt0Result, err := signalIntegrationRef01Ent.List(signalIntegrationRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		signalIntegrationRef01ListRt0, signalIntegrationRef01ListRt0Ok := signalIntegrationRef01ListRt0Result.([]any)
		if !signalIntegrationRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", signalIntegrationRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(signalIntegrationRef01ListRt0), map[string]any{"id": signalIntegrationRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func signal_integrationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "signal_integration", "SignalIntegrationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read signal_integration test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse signal_integration test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"signal_integration01", "signal_integration02", "signal_integration03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID"])
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
