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
const app_cdnEntityLiveStrict = true


func TestAppCdnEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppCdn(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppCdnEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppCdn(nil).Load(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_cdnBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_cdn." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_cdn.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"app_cdn.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_cdn.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only app_cdn.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"app_cdn.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{id}\"}")
			t.Skip("Live coverage incomplete: app_cdn.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{id}/archive); app_cdn.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{id}); app_cdn.load.2 excluded (GET-only live run: reads a record only app_cdn.create.0 gives); app_cdn.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_cdnEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_CDN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appCdnRef01Ent := client.AppCdn(nil)
		appCdnRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_cdn"}), "app_cdn_ref01"))
		appCdnRef01Data["app_id"] = setup.idmap["app01"]

		appCdnRef01DataResult, err := appCdnRef01Ent.Create(appCdnRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appCdnRef01Data = core.ToMapAny(entityData(appCdnRef01DataResult))
		if appCdnRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appCdnRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appCdnRef01DataUp0Up := map[string]any{
			"id": appCdnRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appCdnRef01MarkdefUp0Name := "app_environment_id"
		appCdnRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_cdn_ref01_%d", setup.now)
		appCdnRef01DataUp0Up[appCdnRef01MarkdefUp0Name] = appCdnRef01MarkdefUp0Value

		appCdnRef01ResdataUp0Result, err := appCdnRef01Ent.Update(appCdnRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appCdnRef01ResdataUp0 := core.ToMapAny(entityData(appCdnRef01ResdataUp0Result))
		if appCdnRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(appCdnRef01ResdataUp0["id"], appCdnRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if appCdnRef01ResdataUp0[appCdnRef01MarkdefUp0Name] != appCdnRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appCdnRef01MarkdefUp0Name, appCdnRef01ResdataUp0[appCdnRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appCdnRef01MatchDt0 := map[string]any{
			"id": appCdnRef01Data["id"],
		}
		appCdnRef01DataDt0Loaded, err := appCdnRef01Ent.Load(appCdnRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appCdnRef01DataDt0LoadResult := core.ToMapAny(entityData(appCdnRef01DataDt0Loaded))
		if appCdnRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appCdnRef01DataDt0LoadResult["id"], appCdnRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appCdnRef01MatchRm0 := map[string]any{
			"id": appCdnRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appCdnRef01MatchRm0["app_id"] = v
		} else {
			appCdnRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appCdnRef01Ent.Remove(appCdnRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func app_cdnBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_cdn", "AppCdnTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_cdn test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_cdn test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_cdn01", "app_cdn02", "app_cdn03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_CDN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_CDN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_CDN_ENTID"])
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
