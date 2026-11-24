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
const app_config_variableEntityLiveStrict = true


func TestAppConfigVariableEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppConfigVariable(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppConfigVariableEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppConfigVariable(nil).List(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_config_variableBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_config_variable." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_config_variable.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/config_variables/{id}/disable\"}")
			t.Log("LIVE STEP {\"id\":\"app_config_variable.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/config_variables/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_config_variable.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/config_variables/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_config_variable.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_config_variableEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_CONFIG_VARIABLE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["app_config_variable01"]
			}
			livePace()
			liveExisting(t, app_config_variableEntityLiveStrict, setup.data, "app_config_variable", "id", _liveId,
				func() (any, error) {
					return client.AppConfigVariable(nil).List(map[string]any{"app_id": setup.idmap["app01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		appConfigVariableRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app_config_variable")))
		var appConfigVariableRef01Data map[string]any
		if len(appConfigVariableRef01DataRaw) > 0 {
			appConfigVariableRef01Data = core.ToMapAny(appConfigVariableRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appConfigVariableRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		appConfigVariableRef01Ent := client.AppConfigVariable(nil)
		appConfigVariableRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appConfigVariableRef01ListResult, err := appConfigVariableRef01Ent.List(appConfigVariableRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, appConfigVariableRef01ListOk := appConfigVariableRef01ListResult.([]any)
		if !appConfigVariableRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appConfigVariableRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appConfigVariableRef01MatchDt0 := map[string]any{
			"id": appConfigVariableRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appConfigVariableRef01MatchDt0["app_id"] = v
		} else {
			appConfigVariableRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appConfigVariableRef01DataDt0Loaded, err := appConfigVariableRef01Ent.Load(appConfigVariableRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appConfigVariableRef01DataDt0LoadResult := core.ToMapAny(entityData(appConfigVariableRef01DataDt0Loaded))
		if appConfigVariableRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appConfigVariableRef01DataDt0LoadResult["id"], appConfigVariableRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_config_variableEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_CONFIG_VARIABLE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appConfigVariableRef01Ent := client.AppConfigVariable(nil)
		appConfigVariableRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_config_variable"}), "app_config_variable_ref01"))
		appConfigVariableRef01Data["app_id"] = setup.idmap["app01"]

		appConfigVariableRef01DataResult, err := appConfigVariableRef01Ent.Create(appConfigVariableRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appConfigVariableRef01Data = core.ToMapAny(entityData(appConfigVariableRef01DataResult))
		if appConfigVariableRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appConfigVariableRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		appConfigVariableRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appConfigVariableRef01ListResult, err := appConfigVariableRef01Ent.List(appConfigVariableRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appConfigVariableRef01List, appConfigVariableRef01ListOk := appConfigVariableRef01ListResult.([]any)
		if !appConfigVariableRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appConfigVariableRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(appConfigVariableRef01List), map[string]any{"id": appConfigVariableRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appConfigVariableRef01DataUp0Up := map[string]any{
			"id": appConfigVariableRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appConfigVariableRef01MarkdefUp0Name := "app_environment_id"
		appConfigVariableRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_config_variable_ref01_%d", setup.now)
		appConfigVariableRef01DataUp0Up[appConfigVariableRef01MarkdefUp0Name] = appConfigVariableRef01MarkdefUp0Value

		appConfigVariableRef01ResdataUp0Result, err := appConfigVariableRef01Ent.Update(appConfigVariableRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appConfigVariableRef01ResdataUp0 := core.ToMapAny(entityData(appConfigVariableRef01ResdataUp0Result))
		if appConfigVariableRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(appConfigVariableRef01ResdataUp0["id"], appConfigVariableRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if appConfigVariableRef01ResdataUp0[appConfigVariableRef01MarkdefUp0Name] != appConfigVariableRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appConfigVariableRef01MarkdefUp0Name, appConfigVariableRef01ResdataUp0[appConfigVariableRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appConfigVariableRef01MatchDt0 := map[string]any{
			"id": appConfigVariableRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appConfigVariableRef01MatchDt0["app_id"] = v
		} else {
			appConfigVariableRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appConfigVariableRef01DataDt0Loaded, err := appConfigVariableRef01Ent.Load(appConfigVariableRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appConfigVariableRef01DataDt0LoadResult := core.ToMapAny(entityData(appConfigVariableRef01DataDt0Loaded))
		if appConfigVariableRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appConfigVariableRef01DataDt0LoadResult["id"], appConfigVariableRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appConfigVariableRef01MatchRm0 := map[string]any{
			"id": appConfigVariableRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appConfigVariableRef01MatchRm0["app_id"] = v
		} else {
			appConfigVariableRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appConfigVariableRef01Ent.Remove(appConfigVariableRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		appConfigVariableRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appConfigVariableRef01ListRt0Result, err := appConfigVariableRef01Ent.List(appConfigVariableRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appConfigVariableRef01ListRt0, appConfigVariableRef01ListRt0Ok := appConfigVariableRef01ListRt0Result.([]any)
		if !appConfigVariableRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", appConfigVariableRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(appConfigVariableRef01ListRt0), map[string]any{"id": appConfigVariableRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func app_config_variableBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_config_variable", "AppConfigVariableTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_config_variable test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_config_variable test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_config_variable01", "app_config_variable02", "app_config_variable03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_CONFIG_VARIABLE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_CONFIG_VARIABLE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_CONFIG_VARIABLE_ENTID"])
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
