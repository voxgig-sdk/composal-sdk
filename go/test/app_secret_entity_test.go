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
const app_secretEntityLiveStrict = true


func TestAppSecretEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AppSecret(nil)
		if ent == nil {
			t.Fatal("expected non-nil AppSecretEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AppSecret(nil).List(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := app_secretBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "app_secret." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"app_secret.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/secrets/{id}/set_value\"}")
			t.Log("LIVE STEP {\"id\":\"app_secret.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/secrets/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_secret.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/secrets/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"app_secret.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_secretEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_SECRET_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["app_secret01"]
			}
			livePace()
			liveExisting(t, app_secretEntityLiveStrict, setup.data, "app_secret", "id", _liveId,
				func() (any, error) {
					return client.AppSecret(nil).List(map[string]any{"app_id": setup.idmap["app01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		appSecretRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.app_secret")))
		var appSecretRef01Data map[string]any
		if len(appSecretRef01DataRaw) > 0 {
			appSecretRef01Data = core.ToMapAny(appSecretRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = appSecretRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		appSecretRef01Ent := client.AppSecret(nil)
		appSecretRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appSecretRef01ListResult, err := appSecretRef01Ent.List(appSecretRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, appSecretRef01ListOk := appSecretRef01ListResult.([]any)
		if !appSecretRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appSecretRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appSecretRef01MatchDt0 := map[string]any{
			"id": appSecretRef01Data["id"],
		}
		appSecretRef01DataDt0Loaded, err := appSecretRef01Ent.Load(appSecretRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appSecretRef01DataDt0LoadResult := core.ToMapAny(entityData(appSecretRef01DataDt0Loaded))
		if appSecretRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appSecretRef01DataDt0LoadResult["id"], appSecretRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, app_secretEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_APP_SECRET_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		appSecretRef01Ent := client.AppSecret(nil)
		appSecretRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "app_secret"}), "app_secret_ref01"))
		appSecretRef01Data["app_id"] = setup.idmap["app01"]

		appSecretRef01DataResult, err := appSecretRef01Ent.Create(appSecretRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		appSecretRef01Data = core.ToMapAny(entityData(appSecretRef01DataResult))
		if appSecretRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if appSecretRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		appSecretRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appSecretRef01ListResult, err := appSecretRef01Ent.List(appSecretRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appSecretRef01List, appSecretRef01ListOk := appSecretRef01ListResult.([]any)
		if !appSecretRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", appSecretRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(appSecretRef01List), map[string]any{"id": appSecretRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		appSecretRef01DataUp0Up := map[string]any{
			"id": appSecretRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		appSecretRef01MarkdefUp0Name := "created_at"
		appSecretRef01MarkdefUp0Value := fmt.Sprintf("Mark01-app_secret_ref01_%d", setup.now)
		appSecretRef01DataUp0Up[appSecretRef01MarkdefUp0Name] = appSecretRef01MarkdefUp0Value

		appSecretRef01ResdataUp0Result, err := appSecretRef01Ent.Update(appSecretRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		appSecretRef01ResdataUp0 := core.ToMapAny(entityData(appSecretRef01ResdataUp0Result))
		if appSecretRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(appSecretRef01ResdataUp0["id"], appSecretRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if appSecretRef01ResdataUp0[appSecretRef01MarkdefUp0Name] != appSecretRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", appSecretRef01MarkdefUp0Name, appSecretRef01ResdataUp0[appSecretRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		appSecretRef01MatchDt0 := map[string]any{
			"id": appSecretRef01Data["id"],
		}
		appSecretRef01DataDt0Loaded, err := appSecretRef01Ent.Load(appSecretRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		appSecretRef01DataDt0LoadResult := core.ToMapAny(entityData(appSecretRef01DataDt0Loaded))
		if appSecretRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(appSecretRef01DataDt0LoadResult["id"], appSecretRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		appSecretRef01MatchRm0 := map[string]any{
			"id": appSecretRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			appSecretRef01MatchRm0["app_id"] = v
		} else {
			appSecretRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = appSecretRef01Ent.Remove(appSecretRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		appSecretRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
		}

		appSecretRef01ListRt0Result, err := appSecretRef01Ent.List(appSecretRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		appSecretRef01ListRt0, appSecretRef01ListRt0Ok := appSecretRef01ListRt0Result.([]any)
		if !appSecretRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", appSecretRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(appSecretRef01ListRt0), map[string]any{"id": appSecretRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func app_secretBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "app_secret", "AppSecretTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read app_secret test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse app_secret test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"app_secret01", "app_secret02", "app_secret03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_APP_SECRET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_APP_SECRET_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_APP_SECRET_ENTID"])
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
