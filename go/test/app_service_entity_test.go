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
const app_serviceEntityLiveStrict = true


func TestAppServiceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppService(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppServiceEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppService(nil).Load(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_serviceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_service." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_service.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/services/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"app_service.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/services/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_service.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only app_service.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"app_service.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/services/{id}\"}")
			t.Skip("Live coverage incomplete: app_service.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/services/{id}/archive); app_service.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/services/{id}); app_service.load.2 excluded (GET-only live run: reads a record only app_service.create.0 gives); app_service.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/services/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_serviceEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_SERVICE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appServiceRef01Ent := client.AppService(nil)
		appServiceRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_service"}), "app_service_ref01"))
		appServiceRef01Data["app_id"] = setup.idmap["app01"]

		appServiceRef01DataResult, err := appServiceRef01Ent.Create(appServiceRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appServiceRef01Data = core.ToMapAny(entityData(appServiceRef01DataResult))
		if appServiceRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appServiceRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appServiceRef01DataUp0Up := map[string]any{
			"id": appServiceRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appServiceRef01MarkdefUp0Name := "build_command"
		appServiceRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_service_ref01_%d", setup.now)
		appServiceRef01DataUp0Up[appServiceRef01MarkdefUp0Name] = appServiceRef01MarkdefUp0Value

		appServiceRef01ResdataUp0Result, err := appServiceRef01Ent.Update(appServiceRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appServiceRef01ResdataUp0 := core.ToMapAny(entityData(appServiceRef01ResdataUp0Result))
		if appServiceRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(appServiceRef01ResdataUp0["id"], appServiceRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if appServiceRef01ResdataUp0[appServiceRef01MarkdefUp0Name] != appServiceRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appServiceRef01MarkdefUp0Name, appServiceRef01ResdataUp0[appServiceRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appServiceRef01MatchDt0 := map[string]any{
			"id": appServiceRef01Data["id"],
		}
		appServiceRef01DataDt0Loaded, err := appServiceRef01Ent.Load(appServiceRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appServiceRef01DataDt0LoadResult := core.ToMapAny(entityData(appServiceRef01DataDt0Loaded))
		if appServiceRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appServiceRef01DataDt0LoadResult["id"], appServiceRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appServiceRef01MatchRm0 := map[string]any{
			"id": appServiceRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appServiceRef01MatchRm0["app_id"] = v
		} else {
			appServiceRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appServiceRef01Ent.Remove(appServiceRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func app_serviceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_service", "AppServiceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_service test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_service test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_service01", "app_service02", "app_service03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_SERVICE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_SERVICE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_SERVICE_ENTID"])
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
