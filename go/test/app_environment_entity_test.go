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
const app_environmentEntityLiveStrict = true


func TestAppEnvironmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppEnvironment(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppEnvironmentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppEnvironment(nil).Load(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_environmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_environment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_environment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/environments/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"app_environment.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/environments/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_environment.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only app_environment.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"app_environment.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/environments/{id}\"}")
			t.Skip("Live coverage incomplete: app_environment.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/environments/{id}/archive); app_environment.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/environments/{id}); app_environment.load.2 excluded (GET-only live run: reads a record only app_environment.create.0 gives); app_environment.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/environments/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_environmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_ENVIRONMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appEnvironmentRef01Ent := client.AppEnvironment(nil)
		appEnvironmentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_environment"}), "app_environment_ref01"))
		appEnvironmentRef01Data["app_id"] = setup.idmap["app01"]

		appEnvironmentRef01DataResult, err := appEnvironmentRef01Ent.Create(appEnvironmentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appEnvironmentRef01Data = core.ToMapAny(entityData(appEnvironmentRef01DataResult))
		if appEnvironmentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appEnvironmentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appEnvironmentRef01DataUp0Up := map[string]any{
			"id": appEnvironmentRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appEnvironmentRef01MarkdefUp0Name := "base_domain"
		appEnvironmentRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_environment_ref01_%d", setup.now)
		appEnvironmentRef01DataUp0Up[appEnvironmentRef01MarkdefUp0Name] = appEnvironmentRef01MarkdefUp0Value

		appEnvironmentRef01ResdataUp0Result, err := appEnvironmentRef01Ent.Update(appEnvironmentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appEnvironmentRef01ResdataUp0 := core.ToMapAny(entityData(appEnvironmentRef01ResdataUp0Result))
		if appEnvironmentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(appEnvironmentRef01ResdataUp0["id"], appEnvironmentRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if appEnvironmentRef01ResdataUp0[appEnvironmentRef01MarkdefUp0Name] != appEnvironmentRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appEnvironmentRef01MarkdefUp0Name, appEnvironmentRef01ResdataUp0[appEnvironmentRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appEnvironmentRef01MatchDt0 := map[string]any{
			"id": appEnvironmentRef01Data["id"],
		}
		appEnvironmentRef01DataDt0Loaded, err := appEnvironmentRef01Ent.Load(appEnvironmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appEnvironmentRef01DataDt0LoadResult := core.ToMapAny(entityData(appEnvironmentRef01DataDt0Loaded))
		if appEnvironmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appEnvironmentRef01DataDt0LoadResult["id"], appEnvironmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appEnvironmentRef01MatchRm0 := map[string]any{
			"id": appEnvironmentRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appEnvironmentRef01MatchRm0["app_id"] = v
		} else {
			appEnvironmentRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appEnvironmentRef01Ent.Remove(appEnvironmentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func app_environmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_environment", "AppEnvironmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_environment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_environment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_environment01", "app_environment02", "app_environment03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_ENVIRONMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_ENVIRONMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_ENVIRONMENT_ENTID"])
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
