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
const static_siteEntityLiveStrict = true


func TestStaticSiteEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.StaticSite(nil)
		if ent == nil {
			t.Fatal("expected non-nil StaticSiteEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.StaticSite(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := static_siteBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "static_site." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"static_site.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/static_sites/{id}/provision\"}")
			t.Log("LIVE STEP {\"id\":\"static_site.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/static_sites/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"static_site.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/static_sites/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"static_site.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, static_siteEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_STATIC_SITE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["static_site01"]
			}
			livePace()
			liveExisting(t, static_siteEntityLiveStrict, setup.data, "static_site", "id", _liveId,
				func() (any, error) {
					return client.StaticSite(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		staticSiteRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.static_site")))
		var staticSiteRef01Data map[string]any
		if len(staticSiteRef01DataRaw) > 0 {
			staticSiteRef01Data = core.ToMapAny(staticSiteRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = staticSiteRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		staticSiteRef01Ent := client.StaticSite(nil)
		staticSiteRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		staticSiteRef01ListResult, err := staticSiteRef01Ent.List(staticSiteRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, staticSiteRef01ListOk := staticSiteRef01ListResult.([]any)
		if !staticSiteRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", staticSiteRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		staticSiteRef01MatchDt0 := map[string]any{
			"id": staticSiteRef01Data["id"],
		}
		staticSiteRef01DataDt0Loaded, err := staticSiteRef01Ent.Load(staticSiteRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		staticSiteRef01DataDt0LoadResult := core.ToMapAny(entityData(staticSiteRef01DataDt0Loaded))
		if staticSiteRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(staticSiteRef01DataDt0LoadResult["id"], staticSiteRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, static_siteEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_STATIC_SITE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		staticSiteRef01Ent := client.StaticSite(nil)
		staticSiteRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "static_site"}), "static_site_ref01"))
		staticSiteRef01Data["organization_id"] = setup.idmap["organization01"]

		staticSiteRef01DataResult, err := staticSiteRef01Ent.Create(staticSiteRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		staticSiteRef01Data = core.ToMapAny(entityData(staticSiteRef01DataResult))
		if staticSiteRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if staticSiteRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		staticSiteRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		staticSiteRef01ListResult, err := staticSiteRef01Ent.List(staticSiteRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		staticSiteRef01List, staticSiteRef01ListOk := staticSiteRef01ListResult.([]any)
		if !staticSiteRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", staticSiteRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(staticSiteRef01List), map[string]any{"id": staticSiteRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		staticSiteRef01DataUp0Up := map[string]any{
			"id": staticSiteRef01Data["id"],
		}

		staticSiteRef01MarkdefUp0Name := "active_deployment_id"
		staticSiteRef01MarkdefUp0Value := fmt.Sprintf("Mark01-static_site_ref01_%d", setup.now)
		staticSiteRef01DataUp0Up[staticSiteRef01MarkdefUp0Name] = staticSiteRef01MarkdefUp0Value

		staticSiteRef01ResdataUp0Result, err := staticSiteRef01Ent.Update(staticSiteRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		staticSiteRef01ResdataUp0 := core.ToMapAny(entityData(staticSiteRef01ResdataUp0Result))
		if staticSiteRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(staticSiteRef01ResdataUp0["id"], staticSiteRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if staticSiteRef01ResdataUp0[staticSiteRef01MarkdefUp0Name] != staticSiteRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", staticSiteRef01MarkdefUp0Name, staticSiteRef01ResdataUp0[staticSiteRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		staticSiteRef01MatchDt0 := map[string]any{
			"id": staticSiteRef01Data["id"],
		}
		staticSiteRef01DataDt0Loaded, err := staticSiteRef01Ent.Load(staticSiteRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		staticSiteRef01DataDt0LoadResult := core.ToMapAny(entityData(staticSiteRef01DataDt0Loaded))
		if staticSiteRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(staticSiteRef01DataDt0LoadResult["id"], staticSiteRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		staticSiteRef01MatchRm0 := map[string]any{
			"id": staticSiteRef01Data["id"],
		}
		_, err = staticSiteRef01Ent.Remove(staticSiteRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		staticSiteRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		staticSiteRef01ListRt0Result, err := staticSiteRef01Ent.List(staticSiteRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		staticSiteRef01ListRt0, staticSiteRef01ListRt0Ok := staticSiteRef01ListRt0Result.([]any)
		if !staticSiteRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", staticSiteRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(staticSiteRef01ListRt0), map[string]any{"id": staticSiteRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func static_siteBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "static_site", "StaticSiteTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read static_site test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse static_site test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"static_site01", "static_site02", "static_site03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_STATIC_SITE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_STATIC_SITE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_STATIC_SITE_ENTID"])
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
