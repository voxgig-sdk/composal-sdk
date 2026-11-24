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
const static_site_domainEntityLiveStrict = true


func TestStaticSiteDomainEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.StaticSiteDomain(nil)
		if ent == nil {
			t.Fatal("expected non-nil StaticSiteDomainEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.StaticSiteDomain(nil).List(map[string]any{"static_site_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := static_site_domainBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "static_site_domain." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"static_site_domain.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/static_sites/{static_site_id}/domains/{id}/provision\"}")
			t.Log("LIVE STEP {\"id\":\"static_site_domain.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/static_sites/{static_site_id}/domains/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"static_site_domain.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/static_sites/{static_site_id}/domains/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"static_site_domain.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"static_site01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, static_site_domainEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_STATIC_SITE_DOMAIN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["static_site_domain01"]
			}
			livePace()
			liveExisting(t, static_site_domainEntityLiveStrict, setup.data, "static_site_domain", "id", _liveId,
				func() (any, error) {
					return client.StaticSiteDomain(nil).List(map[string]any{"static_site_id": setup.idmap["static_site01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		staticSiteDomainRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.static_site_domain")))
		var staticSiteDomainRef01Data map[string]any
		if len(staticSiteDomainRef01DataRaw) > 0 {
			staticSiteDomainRef01Data = core.ToMapAny(staticSiteDomainRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = staticSiteDomainRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		staticSiteDomainRef01Ent := client.StaticSiteDomain(nil)
		staticSiteDomainRef01Match := map[string]any{
			"static_site_id": setup.idmap["static_site01"],
		}

		staticSiteDomainRef01ListResult, err := staticSiteDomainRef01Ent.List(staticSiteDomainRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, staticSiteDomainRef01ListOk := staticSiteDomainRef01ListResult.([]any)
		if !staticSiteDomainRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", staticSiteDomainRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		staticSiteDomainRef01MatchDt0 := map[string]any{
			"id": staticSiteDomainRef01Data["id"],
		}
		if v := setup.idmap["static_site_id"]; v != nil {
			staticSiteDomainRef01MatchDt0["static_site_id"] = v
		} else {
			staticSiteDomainRef01MatchDt0["static_site_id"] = setup.idmap["static_site01"]
		}
		staticSiteDomainRef01DataDt0Loaded, err := staticSiteDomainRef01Ent.Load(staticSiteDomainRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		staticSiteDomainRef01DataDt0LoadResult := core.ToMapAny(entityData(staticSiteDomainRef01DataDt0Loaded))
		if staticSiteDomainRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(staticSiteDomainRef01DataDt0LoadResult["id"], staticSiteDomainRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"static_site01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, static_site_domainEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_STATIC_SITE_DOMAIN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		staticSiteDomainRef01Ent := client.StaticSiteDomain(nil)
		staticSiteDomainRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "static_site_domain"}), "static_site_domain_ref01"))
		staticSiteDomainRef01Data["static_site_id"] = setup.idmap["static_site01"]

		staticSiteDomainRef01DataResult, err := staticSiteDomainRef01Ent.Create(staticSiteDomainRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		staticSiteDomainRef01Data = core.ToMapAny(entityData(staticSiteDomainRef01DataResult))
		if staticSiteDomainRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if staticSiteDomainRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		staticSiteDomainRef01Match := map[string]any{
			"static_site_id": setup.idmap["static_site01"],
		}

		staticSiteDomainRef01ListResult, err := staticSiteDomainRef01Ent.List(staticSiteDomainRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		staticSiteDomainRef01List, staticSiteDomainRef01ListOk := staticSiteDomainRef01ListResult.([]any)
		if !staticSiteDomainRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", staticSiteDomainRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(staticSiteDomainRef01List), map[string]any{"id": staticSiteDomainRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		staticSiteDomainRef01DataUp0Up := map[string]any{
			"id": staticSiteDomainRef01Data["id"],
			"static_site_id": setup.idmap["static_site_id"],
		}

		staticSiteDomainRef01MarkdefUp0Name := "app_environment_id"
		staticSiteDomainRef01MarkdefUp0Value := fmt.Sprintf("Mark01-static_site_domain_ref01_%d", setup.now)
		staticSiteDomainRef01DataUp0Up[staticSiteDomainRef01MarkdefUp0Name] = staticSiteDomainRef01MarkdefUp0Value

		staticSiteDomainRef01ResdataUp0Result, err := staticSiteDomainRef01Ent.Update(staticSiteDomainRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		staticSiteDomainRef01ResdataUp0 := core.ToMapAny(entityData(staticSiteDomainRef01ResdataUp0Result))
		if staticSiteDomainRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(staticSiteDomainRef01ResdataUp0["id"], staticSiteDomainRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if staticSiteDomainRef01ResdataUp0[staticSiteDomainRef01MarkdefUp0Name] != staticSiteDomainRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", staticSiteDomainRef01MarkdefUp0Name, staticSiteDomainRef01ResdataUp0[staticSiteDomainRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		staticSiteDomainRef01MatchDt0 := map[string]any{
			"id": staticSiteDomainRef01Data["id"],
		}
		if v := setup.idmap["static_site_id"]; v != nil {
			staticSiteDomainRef01MatchDt0["static_site_id"] = v
		} else {
			staticSiteDomainRef01MatchDt0["static_site_id"] = setup.idmap["static_site01"]
		}
		staticSiteDomainRef01DataDt0Loaded, err := staticSiteDomainRef01Ent.Load(staticSiteDomainRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		staticSiteDomainRef01DataDt0LoadResult := core.ToMapAny(entityData(staticSiteDomainRef01DataDt0Loaded))
		if staticSiteDomainRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(staticSiteDomainRef01DataDt0LoadResult["id"], staticSiteDomainRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		staticSiteDomainRef01MatchRm0 := map[string]any{
			"id": staticSiteDomainRef01Data["id"],
		}
		if v := setup.idmap["static_site_id"]; v != nil {
			staticSiteDomainRef01MatchRm0["static_site_id"] = v
		} else {
			staticSiteDomainRef01MatchRm0["static_site_id"] = setup.idmap["static_site01"]
		}
		_, err = staticSiteDomainRef01Ent.Remove(staticSiteDomainRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		staticSiteDomainRef01MatchRt0 := map[string]any{
			"static_site_id": setup.idmap["static_site01"],
		}

		staticSiteDomainRef01ListRt0Result, err := staticSiteDomainRef01Ent.List(staticSiteDomainRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		staticSiteDomainRef01ListRt0, staticSiteDomainRef01ListRt0Ok := staticSiteDomainRef01ListRt0Result.([]any)
		if !staticSiteDomainRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", staticSiteDomainRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(staticSiteDomainRef01ListRt0), map[string]any{"id": staticSiteDomainRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func static_site_domainBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "static_site_domain", "StaticSiteDomainTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read static_site_domain test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse static_site_domain test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"static_site_domain01", "static_site_domain02", "static_site_domain03", "static_site01", "static_site02", "static_site03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_STATIC_SITE_DOMAIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_STATIC_SITE_DOMAIN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_STATIC_SITE_DOMAIN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add static_site_id alias for update test.
	if idmapResolved["static_site_id"] == nil {
		idmapResolved["static_site_id"] = idmapResolved["static_site01"]
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
