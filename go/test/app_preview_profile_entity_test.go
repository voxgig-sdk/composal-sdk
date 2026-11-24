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
const app_preview_profileEntityLiveStrict = true


func TestAppPreviewProfileEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppPreviewProfile(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppPreviewProfileEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppPreviewProfile(nil).List(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_preview_profileBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_preview_profile." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_preview_profile.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/preview_profiles\"}")
			t.Log("LIVE STEP {\"id\":\"app_preview_profile.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/preview_profiles/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_preview_profile.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_preview_profile.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_preview_profileEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_PREVIEW_PROFILE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["app_preview_profile01"]
			}
			livePace()
			liveExisting(t, app_preview_profileEntityLiveStrict, setup.data, "app_preview_profile", "id", _liveId,
				func() (any, error) {
					return client.AppPreviewProfile(nil).List(map[string]any{"app_id": setup.idmap["app01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		appPreviewProfileRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app_preview_profile")))
		var appPreviewProfileRef01Data map[string]any
		if len(appPreviewProfileRef01DataRaw) > 0 {
			appPreviewProfileRef01Data = core.ToMapAny(appPreviewProfileRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appPreviewProfileRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		appPreviewProfileRef01Ent := client.AppPreviewProfile(nil)
		appPreviewProfileRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appPreviewProfileRef01ListResult, err := appPreviewProfileRef01Ent.List(appPreviewProfileRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, appPreviewProfileRef01ListOk := appPreviewProfileRef01ListResult.([]any)
		if !appPreviewProfileRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appPreviewProfileRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appPreviewProfileRef01MatchDt0 := map[string]any{
			"id": appPreviewProfileRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appPreviewProfileRef01MatchDt0["app_id"] = v
		} else {
			appPreviewProfileRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appPreviewProfileRef01DataDt0Loaded, err := appPreviewProfileRef01Ent.Load(appPreviewProfileRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appPreviewProfileRef01DataDt0LoadResult := core.ToMapAny(entityData(appPreviewProfileRef01DataDt0Loaded))
		if appPreviewProfileRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appPreviewProfileRef01DataDt0LoadResult["id"], appPreviewProfileRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_preview_profileEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_PREVIEW_PROFILE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appPreviewProfileRef01Ent := client.AppPreviewProfile(nil)
		appPreviewProfileRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_preview_profile"}), "app_preview_profile_ref01"))
		appPreviewProfileRef01Data["app_id"] = setup.idmap["app01"]

		appPreviewProfileRef01DataResult, err := appPreviewProfileRef01Ent.Create(appPreviewProfileRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appPreviewProfileRef01Data = core.ToMapAny(entityData(appPreviewProfileRef01DataResult))
		if appPreviewProfileRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appPreviewProfileRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		appPreviewProfileRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appPreviewProfileRef01ListResult, err := appPreviewProfileRef01Ent.List(appPreviewProfileRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appPreviewProfileRef01List, appPreviewProfileRef01ListOk := appPreviewProfileRef01ListResult.([]any)
		if !appPreviewProfileRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appPreviewProfileRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(appPreviewProfileRef01List), map[string]any{"id": appPreviewProfileRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appPreviewProfileRef01DataUp0Up := map[string]any{
			"id": appPreviewProfileRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appPreviewProfileRef01MarkdefUp0Name := "created_at"
		appPreviewProfileRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_preview_profile_ref01_%d", setup.now)
		appPreviewProfileRef01DataUp0Up[appPreviewProfileRef01MarkdefUp0Name] = appPreviewProfileRef01MarkdefUp0Value

		appPreviewProfileRef01ResdataUp0Result, err := appPreviewProfileRef01Ent.Update(appPreviewProfileRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appPreviewProfileRef01ResdataUp0 := core.ToMapAny(entityData(appPreviewProfileRef01ResdataUp0Result))
		if appPreviewProfileRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(appPreviewProfileRef01ResdataUp0["id"], appPreviewProfileRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if appPreviewProfileRef01ResdataUp0[appPreviewProfileRef01MarkdefUp0Name] != appPreviewProfileRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appPreviewProfileRef01MarkdefUp0Name, appPreviewProfileRef01ResdataUp0[appPreviewProfileRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appPreviewProfileRef01MatchDt0 := map[string]any{
			"id": appPreviewProfileRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appPreviewProfileRef01MatchDt0["app_id"] = v
		} else {
			appPreviewProfileRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		appPreviewProfileRef01DataDt0Loaded, err := appPreviewProfileRef01Ent.Load(appPreviewProfileRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appPreviewProfileRef01DataDt0LoadResult := core.ToMapAny(entityData(appPreviewProfileRef01DataDt0Loaded))
		if appPreviewProfileRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appPreviewProfileRef01DataDt0LoadResult["id"], appPreviewProfileRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appPreviewProfileRef01MatchRm0 := map[string]any{
			"id": appPreviewProfileRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appPreviewProfileRef01MatchRm0["app_id"] = v
		} else {
			appPreviewProfileRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appPreviewProfileRef01Ent.Remove(appPreviewProfileRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		appPreviewProfileRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appPreviewProfileRef01ListRt0Result, err := appPreviewProfileRef01Ent.List(appPreviewProfileRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appPreviewProfileRef01ListRt0, appPreviewProfileRef01ListRt0Ok := appPreviewProfileRef01ListRt0Result.([]any)
		if !appPreviewProfileRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", appPreviewProfileRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(appPreviewProfileRef01ListRt0), map[string]any{"id": appPreviewProfileRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func app_preview_profileBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_preview_profile", "AppPreviewProfileTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_preview_profile test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_preview_profile test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_preview_profile01", "app_preview_profile02", "app_preview_profile03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_PREVIEW_PROFILE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_PREVIEW_PROFILE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_PREVIEW_PROFILE_ENTID"])
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
