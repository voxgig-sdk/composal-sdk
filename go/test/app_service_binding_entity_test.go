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
const app_service_bindingEntityLiveStrict = true


func TestAppServiceBindingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppServiceBinding(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppServiceBindingEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppServiceBinding(nil).Load(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_service_bindingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_service_binding." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_service_binding.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable\"}")
			t.Log("LIVE STEP {\"id\":\"app_service_binding.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/service_bindings/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_service_binding.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only app_service_binding.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"app_service_binding.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/service_bindings/{id}\"}")
			t.Skip("Live coverage incomplete: app_service_binding.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable); app_service_binding.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/service_bindings/{id}); app_service_binding.load.2 excluded (GET-only live run: reads a record only app_service_binding.create.0 gives); app_service_binding.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/service_bindings/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_service_bindingEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_SERVICE_BINDING_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appServiceBindingRef01Ent := client.AppServiceBinding(nil)
		appServiceBindingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_service_binding"}), "app_service_binding_ref01"))
		appServiceBindingRef01Data["app_id"] = setup.idmap["app01"]

		appServiceBindingRef01DataResult, err := appServiceBindingRef01Ent.Create(appServiceBindingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appServiceBindingRef01Data = core.ToMapAny(entityData(appServiceBindingRef01DataResult))
		if appServiceBindingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appServiceBindingRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appServiceBindingRef01DataUp0Up := map[string]any{
			"id": appServiceBindingRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appServiceBindingRef01ResdataUp0Result, err := appServiceBindingRef01Ent.Update(appServiceBindingRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appServiceBindingRef01ResdataUp0 := core.ToMapAny(entityData(appServiceBindingRef01ResdataUp0Result))
		if appServiceBindingRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(appServiceBindingRef01ResdataUp0["id"], appServiceBindingRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appServiceBindingRef01MatchDt0 := map[string]any{
			"id": appServiceBindingRef01Data["id"],
		}
		appServiceBindingRef01DataDt0Loaded, err := appServiceBindingRef01Ent.Load(appServiceBindingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appServiceBindingRef01DataDt0LoadResult := core.ToMapAny(entityData(appServiceBindingRef01DataDt0Loaded))
		if appServiceBindingRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(appServiceBindingRef01DataDt0LoadResult["id"], appServiceBindingRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appServiceBindingRef01MatchRm0 := map[string]any{
			"id": appServiceBindingRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appServiceBindingRef01MatchRm0["app_id"] = v
		} else {
			appServiceBindingRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appServiceBindingRef01Ent.Remove(appServiceBindingRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func app_service_bindingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_service_binding", "AppServiceBindingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_service_binding test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_service_binding test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_service_binding01", "app_service_binding02", "app_service_binding03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_SERVICE_BINDING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_SERVICE_BINDING_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_SERVICE_BINDING_ENTID"])
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
