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
const space_otel_collectorEntityLiveStrict = true


func TestSpaceOtelCollectorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpaceOtelCollector(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpaceOtelCollectorEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpaceOtelCollector(nil).List(map[string]any{"space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_otel_collectorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_otel_collector." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_otel_collector.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/activate\"}")
			t.Log("LIVE STEP {\"id\":\"space_otel_collector.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/observability/spaces/{space_id}/otel_collectors/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_otel_collector.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/observability/spaces/{space_id}/otel_collectors/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_otel_collector.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_otel_collectorEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["space_otel_collector01"]
			}
			livePace()
			liveExisting(t, space_otel_collectorEntityLiveStrict, setup.data, "space_otel_collector", "id", _liveId,
				func() (any, error) {
					return client.SpaceOtelCollector(nil).List(map[string]any{"space_id": setup.idmap["space01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		spaceOtelCollectorRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.space_otel_collector")))
		var spaceOtelCollectorRef01Data map[string]any
		if len(spaceOtelCollectorRef01DataRaw) > 0 {
			spaceOtelCollectorRef01Data = core.ToMapAny(spaceOtelCollectorRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = spaceOtelCollectorRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		spaceOtelCollectorRef01Ent := client.SpaceOtelCollector(nil)
		spaceOtelCollectorRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceOtelCollectorRef01ListResult, err := spaceOtelCollectorRef01Ent.List(spaceOtelCollectorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, spaceOtelCollectorRef01ListOk := spaceOtelCollectorRef01ListResult.([]any)
		if !spaceOtelCollectorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceOtelCollectorRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceOtelCollectorRef01MatchDt0 := map[string]any{
			"id": spaceOtelCollectorRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceOtelCollectorRef01MatchDt0["space_id"] = v
		} else {
			spaceOtelCollectorRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spaceOtelCollectorRef01DataDt0Loaded, err := spaceOtelCollectorRef01Ent.Load(spaceOtelCollectorRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceOtelCollectorRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceOtelCollectorRef01DataDt0Loaded))
		if spaceOtelCollectorRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceOtelCollectorRef01DataDt0LoadResult["id"], spaceOtelCollectorRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_otel_collectorEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spaceOtelCollectorRef01Ent := client.SpaceOtelCollector(nil)
		spaceOtelCollectorRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_otel_collector"}), "space_otel_collector_ref01"))
		spaceOtelCollectorRef01Data["space_id"] = setup.idmap["space01"]

		spaceOtelCollectorRef01DataResult, err := spaceOtelCollectorRef01Ent.Create(spaceOtelCollectorRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spaceOtelCollectorRef01Data = core.ToMapAny(entityData(spaceOtelCollectorRef01DataResult))
		if spaceOtelCollectorRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if spaceOtelCollectorRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceOtelCollectorRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceOtelCollectorRef01ListResult, err := spaceOtelCollectorRef01Ent.List(spaceOtelCollectorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spaceOtelCollectorRef01List, spaceOtelCollectorRef01ListOk := spaceOtelCollectorRef01ListResult.([]any)
		if !spaceOtelCollectorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceOtelCollectorRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(spaceOtelCollectorRef01List), map[string]any{"id": spaceOtelCollectorRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		spaceOtelCollectorRef01DataUp0Up := map[string]any{
			"id": spaceOtelCollectorRef01Data["id"],
			"space_id": setup.idmap["space_id"],
		}

		spaceOtelCollectorRef01ResdataUp0Result, err := spaceOtelCollectorRef01Ent.Update(spaceOtelCollectorRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		spaceOtelCollectorRef01ResdataUp0 := core.ToMapAny(entityData(spaceOtelCollectorRef01ResdataUp0Result))
		if spaceOtelCollectorRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(spaceOtelCollectorRef01ResdataUp0["id"], spaceOtelCollectorRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceOtelCollectorRef01MatchDt0 := map[string]any{
			"id": spaceOtelCollectorRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceOtelCollectorRef01MatchDt0["space_id"] = v
		} else {
			spaceOtelCollectorRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spaceOtelCollectorRef01DataDt0Loaded, err := spaceOtelCollectorRef01Ent.Load(spaceOtelCollectorRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceOtelCollectorRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceOtelCollectorRef01DataDt0Loaded))
		if spaceOtelCollectorRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceOtelCollectorRef01DataDt0LoadResult["id"], spaceOtelCollectorRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		spaceOtelCollectorRef01MatchRm0 := map[string]any{
			"id": spaceOtelCollectorRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceOtelCollectorRef01MatchRm0["space_id"] = v
		} else {
			spaceOtelCollectorRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = spaceOtelCollectorRef01Ent.Remove(spaceOtelCollectorRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceOtelCollectorRef01MatchRt0 := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceOtelCollectorRef01ListRt0Result, err := spaceOtelCollectorRef01Ent.List(spaceOtelCollectorRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spaceOtelCollectorRef01ListRt0, spaceOtelCollectorRef01ListRt0Ok := spaceOtelCollectorRef01ListRt0Result.([]any)
		if !spaceOtelCollectorRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", spaceOtelCollectorRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(spaceOtelCollectorRef01ListRt0), map[string]any{"id": spaceOtelCollectorRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func space_otel_collectorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_otel_collector", "SpaceOtelCollectorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_otel_collector test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_otel_collector test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_otel_collector01", "space_otel_collector02", "space_otel_collector03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add space_id alias for update test.
	if idmapResolved["space_id"] == nil {
		idmapResolved["space_id"] = idmapResolved["space01"]
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
