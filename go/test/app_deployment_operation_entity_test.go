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
const app_deployment_operationEntityLiveStrict = true


func TestAppDeploymentOperationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppDeploymentOperation(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppDeploymentOperationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppDeploymentOperation(nil).List(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_deployment_operationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_deployment_operation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_deployment_operation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_deployment_operationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_DEPLOYMENT_OPERATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["app_deployment_operation01"]
			}
			livePace()
			liveExisting(t, app_deployment_operationEntityLiveStrict, setup.data, "app_deployment_operation", "id", _liveId,
				func() (any, error) {
					return client.AppDeploymentOperation(nil).List(map[string]any{"app_id": setup.idmap["app01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		appDeploymentOperationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app_deployment_operation")))
		var appDeploymentOperationRef01Data map[string]any
		if len(appDeploymentOperationRef01DataRaw) > 0 {
			appDeploymentOperationRef01Data = core.ToMapAny(appDeploymentOperationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appDeploymentOperationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		appDeploymentOperationRef01Ent := client.AppDeploymentOperation(nil)
		appDeploymentOperationRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appDeploymentOperationRef01ListResult, err := appDeploymentOperationRef01Ent.List(appDeploymentOperationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, appDeploymentOperationRef01ListOk := appDeploymentOperationRef01ListResult.([]any)
		if !appDeploymentOperationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appDeploymentOperationRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appDeploymentOperationRef01MatchDt0 := map[string]any{
			"id": appDeploymentOperationRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appDeploymentOperationRef01MatchDt0["app_id"] = v
		} else {
			appDeploymentOperationRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appDeploymentOperationRef01DataDt0Loaded, err := appDeploymentOperationRef01Ent.Load(appDeploymentOperationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appDeploymentOperationRef01DataDt0LoadResult := core.ToMapAny(entityData(appDeploymentOperationRef01DataDt0Loaded))
		if appDeploymentOperationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appDeploymentOperationRef01DataDt0LoadResult["id"], appDeploymentOperationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_deployment_operationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_DEPLOYMENT_OPERATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appDeploymentOperationRef01Ent := client.AppDeploymentOperation(nil)
		appDeploymentOperationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_deployment_operation"}), "app_deployment_operation_ref01"))
		appDeploymentOperationRef01Data["app_id"] = setup.idmap["app01"]

		appDeploymentOperationRef01DataResult, err := appDeploymentOperationRef01Ent.Create(appDeploymentOperationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appDeploymentOperationRef01Data = core.ToMapAny(entityData(appDeploymentOperationRef01DataResult))
		if appDeploymentOperationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appDeploymentOperationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		appDeploymentOperationRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appDeploymentOperationRef01ListResult, err := appDeploymentOperationRef01Ent.List(appDeploymentOperationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appDeploymentOperationRef01List, appDeploymentOperationRef01ListOk := appDeploymentOperationRef01ListResult.([]any)
		if !appDeploymentOperationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appDeploymentOperationRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(appDeploymentOperationRef01List), map[string]any{"id": appDeploymentOperationRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appDeploymentOperationRef01MatchDt0 := map[string]any{
			"id": appDeploymentOperationRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appDeploymentOperationRef01MatchDt0["app_id"] = v
		} else {
			appDeploymentOperationRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appDeploymentOperationRef01DataDt0Loaded, err := appDeploymentOperationRef01Ent.Load(appDeploymentOperationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appDeploymentOperationRef01DataDt0LoadResult := core.ToMapAny(entityData(appDeploymentOperationRef01DataDt0Loaded))
		if appDeploymentOperationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appDeploymentOperationRef01DataDt0LoadResult["id"], appDeploymentOperationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func app_deployment_operationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_deployment_operation", "AppDeploymentOperationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_deployment_operation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_deployment_operation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_deployment_operation01", "app_deployment_operation02", "app_deployment_operation03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_DEPLOYMENT_OPERATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_DEPLOYMENT_OPERATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_DEPLOYMENT_OPERATION_ENTID"])
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
