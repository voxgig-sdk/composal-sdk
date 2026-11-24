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
const app_service_placementEntityLiveStrict = true


func TestAppServicePlacementEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppServicePlacement(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppServicePlacementEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppServicePlacement(nil).List(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_service_placementBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_service_placement." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_service_placement.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/service_placements/configure\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_service_placementEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_SERVICE_PLACEMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["app_service_placement01"]
			}
			livePace()
			liveExisting(t, app_service_placementEntityLiveStrict, setup.data, "app_service_placement", "id", _liveId,
				func() (any, error) {
					return client.AppServicePlacement(nil).List(map[string]any{"app_id": setup.idmap["app01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		appServicePlacementRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app_service_placement")))
		var appServicePlacementRef01Data map[string]any
		if len(appServicePlacementRef01DataRaw) > 0 {
			appServicePlacementRef01Data = core.ToMapAny(appServicePlacementRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appServicePlacementRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		appServicePlacementRef01Ent := client.AppServicePlacement(nil)
		appServicePlacementRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appServicePlacementRef01ListResult, err := appServicePlacementRef01Ent.List(appServicePlacementRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, appServicePlacementRef01ListOk := appServicePlacementRef01ListResult.([]any)
		if !appServicePlacementRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appServicePlacementRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appServicePlacementRef01MatchDt0 := map[string]any{
			"id": appServicePlacementRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appServicePlacementRef01MatchDt0["app_id"] = v
		} else {
			appServicePlacementRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appServicePlacementRef01DataDt0Loaded, err := appServicePlacementRef01Ent.Load(appServicePlacementRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appServicePlacementRef01DataDt0LoadResult := core.ToMapAny(entityData(appServicePlacementRef01DataDt0Loaded))
		if appServicePlacementRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appServicePlacementRef01DataDt0LoadResult["id"], appServicePlacementRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_service_placementEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_SERVICE_PLACEMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["app_service_placement01"]
			}
			livePace()
			liveExisting(t, app_service_placementEntityLiveStrict, setup.data, "app_service_placement", "id", _liveId,
				func() (any, error) {
					return client.AppServicePlacement(nil).List(map[string]any{"app_id": setup.idmap["app01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		appServicePlacementRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app_service_placement")))
		var appServicePlacementRef01Data map[string]any
		if len(appServicePlacementRef01DataRaw) > 0 {
			appServicePlacementRef01Data = core.ToMapAny(appServicePlacementRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appServicePlacementRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		appServicePlacementRef01Ent := client.AppServicePlacement(nil)
		appServicePlacementRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appServicePlacementRef01ListResult, err := appServicePlacementRef01Ent.List(appServicePlacementRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, appServicePlacementRef01ListOk := appServicePlacementRef01ListResult.([]any)
		if !appServicePlacementRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appServicePlacementRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appServicePlacementRef01MatchDt0 := map[string]any{
			"id": appServicePlacementRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appServicePlacementRef01MatchDt0["app_id"] = v
		} else {
			appServicePlacementRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appServicePlacementRef01DataDt0Loaded, err := appServicePlacementRef01Ent.Load(appServicePlacementRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appServicePlacementRef01DataDt0LoadResult := core.ToMapAny(entityData(appServicePlacementRef01DataDt0Loaded))
		if appServicePlacementRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appServicePlacementRef01DataDt0LoadResult["id"], appServicePlacementRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func app_service_placementBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_service_placement", "AppServicePlacementTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_service_placement test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_service_placement test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_service_placement01", "app_service_placement02", "app_service_placement03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_SERVICE_PLACEMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_SERVICE_PLACEMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_SERVICE_PLACEMENT_ENTID"])
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
