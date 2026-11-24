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
const app_data_resourceEntityLiveStrict = true


func TestAppDataResourceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppDataResource(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppDataResourceEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppDataResource(nil).List(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_data_resourceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_data_resource." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_data_resource.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"app_data_resource.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/data_resources/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_data_resource.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/data_resources/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_data_resource.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_data_resourceEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_DATA_RESOURCE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["app_data_resource01"]
			}
			livePace()
			liveExisting(t, app_data_resourceEntityLiveStrict, setup.data, "app_data_resource", "id", _liveId,
				func() (any, error) {
					return client.AppDataResource(nil).List(map[string]any{"app_id": setup.idmap["app01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		appDataResourceRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app_data_resource")))
		var appDataResourceRef01Data map[string]any
		if len(appDataResourceRef01DataRaw) > 0 {
			appDataResourceRef01Data = core.ToMapAny(appDataResourceRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appDataResourceRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		appDataResourceRef01Ent := client.AppDataResource(nil)
		appDataResourceRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appDataResourceRef01ListResult, err := appDataResourceRef01Ent.List(appDataResourceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, appDataResourceRef01ListOk := appDataResourceRef01ListResult.([]any)
		if !appDataResourceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appDataResourceRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appDataResourceRef01MatchDt0 := map[string]any{
			"id": appDataResourceRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appDataResourceRef01MatchDt0["app_id"] = v
		} else {
			appDataResourceRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appDataResourceRef01DataDt0Loaded, err := appDataResourceRef01Ent.Load(appDataResourceRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appDataResourceRef01DataDt0LoadResult := core.ToMapAny(entityData(appDataResourceRef01DataDt0Loaded))
		if appDataResourceRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appDataResourceRef01DataDt0LoadResult["id"], appDataResourceRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_data_resourceEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_DATA_RESOURCE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appDataResourceRef01Ent := client.AppDataResource(nil)
		appDataResourceRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_data_resource"}), "app_data_resource_ref01"))
		appDataResourceRef01Data["app_id"] = setup.idmap["app01"]

		appDataResourceRef01DataResult, err := appDataResourceRef01Ent.Create(appDataResourceRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appDataResourceRef01Data = core.ToMapAny(entityData(appDataResourceRef01DataResult))
		if appDataResourceRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appDataResourceRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		appDataResourceRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appDataResourceRef01ListResult, err := appDataResourceRef01Ent.List(appDataResourceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appDataResourceRef01List, appDataResourceRef01ListOk := appDataResourceRef01ListResult.([]any)
		if !appDataResourceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appDataResourceRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(appDataResourceRef01List), map[string]any{"id": appDataResourceRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appDataResourceRef01DataUp0Up := map[string]any{
			"id": appDataResourceRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appDataResourceRef01MarkdefUp0Name := "app_environment_id"
		appDataResourceRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_data_resource_ref01_%d", setup.now)
		appDataResourceRef01DataUp0Up[appDataResourceRef01MarkdefUp0Name] = appDataResourceRef01MarkdefUp0Value

		appDataResourceRef01ResdataUp0Result, err := appDataResourceRef01Ent.Update(appDataResourceRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appDataResourceRef01ResdataUp0 := core.ToMapAny(entityData(appDataResourceRef01ResdataUp0Result))
		if appDataResourceRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(appDataResourceRef01ResdataUp0["id"], appDataResourceRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if appDataResourceRef01ResdataUp0[appDataResourceRef01MarkdefUp0Name] != appDataResourceRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appDataResourceRef01MarkdefUp0Name, appDataResourceRef01ResdataUp0[appDataResourceRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appDataResourceRef01MatchDt0 := map[string]any{
			"id": appDataResourceRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appDataResourceRef01MatchDt0["app_id"] = v
		} else {
			appDataResourceRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appDataResourceRef01DataDt0Loaded, err := appDataResourceRef01Ent.Load(appDataResourceRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appDataResourceRef01DataDt0LoadResult := core.ToMapAny(entityData(appDataResourceRef01DataDt0Loaded))
		if appDataResourceRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appDataResourceRef01DataDt0LoadResult["id"], appDataResourceRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appDataResourceRef01MatchRm0 := map[string]any{
			"id": appDataResourceRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appDataResourceRef01MatchRm0["app_id"] = v
		} else {
			appDataResourceRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appDataResourceRef01Ent.Remove(appDataResourceRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		appDataResourceRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appDataResourceRef01ListRt0Result, err := appDataResourceRef01Ent.List(appDataResourceRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appDataResourceRef01ListRt0, appDataResourceRef01ListRt0Ok := appDataResourceRef01ListRt0Result.([]any)
		if !appDataResourceRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", appDataResourceRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(appDataResourceRef01ListRt0), map[string]any{"id": appDataResourceRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func app_data_resourceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_data_resource", "AppDataResourceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_data_resource test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_data_resource test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_data_resource01", "app_data_resource02", "app_data_resource03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_DATA_RESOURCE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_DATA_RESOURCE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_DATA_RESOURCE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add app_id alias for update test.
	if idmapResolved["app_id"] == nil {
		idmapResolved["app_id"] = idmapResolved["app01"]
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
