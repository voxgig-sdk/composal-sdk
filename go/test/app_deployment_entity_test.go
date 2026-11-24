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
const app_deploymentEntityLiveStrict = true


func TestAppDeploymentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppDeployment(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppDeploymentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppDeployment(nil).Load(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_deploymentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_deployment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_deployment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/deployments/{id}/cancel\"}")
			t.Log("LIVE STEP {\"id\":\"app_deployment.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/deployments/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_deployment.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only app_deployment.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"app_deployment.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/deployments/{id}\"}")
			t.Skip("Live coverage incomplete: app_deployment.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/deployments/{id}/cancel); app_deployment.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/deployments/{id}); app_deployment.load.2 excluded (GET-only live run: reads a record only app_deployment.create.0 gives); app_deployment.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/deployments/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_deploymentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_DEPLOYMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appDeploymentRef01Ent := client.AppDeployment(nil)
		appDeploymentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_deployment"}), "app_deployment_ref01"))
		appDeploymentRef01Data["app_id"] = setup.idmap["app01"]

		appDeploymentRef01DataResult, err := appDeploymentRef01Ent.Create(appDeploymentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appDeploymentRef01Data = core.ToMapAny(entityData(appDeploymentRef01DataResult))
		if appDeploymentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appDeploymentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appDeploymentRef01DataUp0Up := map[string]any{
			"id": appDeploymentRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appDeploymentRef01MarkdefUp0Name := "app_environment_id"
		appDeploymentRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_deployment_ref01_%d", setup.now)
		appDeploymentRef01DataUp0Up[appDeploymentRef01MarkdefUp0Name] = appDeploymentRef01MarkdefUp0Value

		appDeploymentRef01ResdataUp0Result, err := appDeploymentRef01Ent.Update(appDeploymentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appDeploymentRef01ResdataUp0 := core.ToMapAny(entityData(appDeploymentRef01ResdataUp0Result))
		if appDeploymentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(appDeploymentRef01ResdataUp0["id"], appDeploymentRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if appDeploymentRef01ResdataUp0[appDeploymentRef01MarkdefUp0Name] != appDeploymentRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appDeploymentRef01MarkdefUp0Name, appDeploymentRef01ResdataUp0[appDeploymentRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appDeploymentRef01MatchDt0 := map[string]any{
			"id": appDeploymentRef01Data["id"],
		}
		appDeploymentRef01DataDt0Loaded, err := appDeploymentRef01Ent.Load(appDeploymentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appDeploymentRef01DataDt0LoadResult := core.ToMapAny(entityData(appDeploymentRef01DataDt0Loaded))
		if appDeploymentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appDeploymentRef01DataDt0LoadResult["id"], appDeploymentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appDeploymentRef01MatchRm0 := map[string]any{
			"id": appDeploymentRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appDeploymentRef01MatchRm0["app_id"] = v
		} else {
			appDeploymentRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appDeploymentRef01Ent.Remove(appDeploymentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func app_deploymentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_deployment", "AppDeploymentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_deployment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_deployment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_deployment01", "app_deployment02", "app_deployment03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_DEPLOYMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_DEPLOYMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_DEPLOYMENT_ENTID"])
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
