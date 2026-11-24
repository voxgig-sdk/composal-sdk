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
const app_locationEntityLiveStrict = true


func TestAppLocationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppLocation(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppLocationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppLocation(nil).List(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_locationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_location." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_location.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/locations\"}")
			t.Log("LIVE STEP {\"id\":\"app_location.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/locations/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_location.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_locationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_LOCATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		appLocationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app_location")))
		var appLocationRef01Data map[string]any
		if len(appLocationRef01DataRaw) > 0 {
			appLocationRef01Data = core.ToMapAny(appLocationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appLocationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		appLocationRef01Ent := client.AppLocation(nil)
		appLocationRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appLocationRef01ListResult, err := appLocationRef01Ent.List(appLocationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, appLocationRef01ListOk := appLocationRef01ListResult.([]any)
		if !appLocationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appLocationRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_locationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_LOCATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appLocationRef01Ent := client.AppLocation(nil)
		appLocationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_location"}), "app_location_ref01"))
		appLocationRef01Data["app_id"] = setup.idmap["app01"]

		appLocationRef01DataResult, err := appLocationRef01Ent.Create(appLocationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appLocationRef01Data = core.ToMapAny(entityData(appLocationRef01DataResult))
		if appLocationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appLocationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		appLocationRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appLocationRef01ListResult, err := appLocationRef01Ent.List(appLocationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appLocationRef01List, appLocationRef01ListOk := appLocationRef01ListResult.([]any)
		if !appLocationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appLocationRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(appLocationRef01List), map[string]any{"id": appLocationRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appLocationRef01MatchRm0 := map[string]any{
			"id": appLocationRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appLocationRef01MatchRm0["app_id"] = v
		} else {
			appLocationRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appLocationRef01Ent.Remove(appLocationRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		appLocationRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appLocationRef01ListRt0Result, err := appLocationRef01Ent.List(appLocationRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appLocationRef01ListRt0, appLocationRef01ListRt0Ok := appLocationRef01ListRt0Result.([]any)
		if !appLocationRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", appLocationRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(appLocationRef01ListRt0), map[string]any{"id": appLocationRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func app_locationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_location", "AppLocationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_location test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_location test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_location01", "app_location02", "app_location03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_LOCATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_LOCATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_LOCATION_ENTID"])
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
