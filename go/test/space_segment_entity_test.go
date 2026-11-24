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
const space_segmentEntityLiveStrict = true


func TestSpaceSegmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpaceSegment(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpaceSegmentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpaceSegment(nil).List(map[string]any{"space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_segmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_segment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_segment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/segments\"}")
			t.Log("LIVE STEP {\"id\":\"space_segment.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/segments/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_segment.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/segments/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_segment.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_segmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_SEGMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["space_segment01"]
			}
			livePace()
			liveExisting(t, space_segmentEntityLiveStrict, setup.data, "space_segment", "id", _liveId,
				func() (any, error) {
					return client.SpaceSegment(nil).List(map[string]any{"space_id": setup.idmap["space01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		spaceSegmentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.space_segment")))
		var spaceSegmentRef01Data map[string]any
		if len(spaceSegmentRef01DataRaw) > 0 {
			spaceSegmentRef01Data = core.ToMapAny(spaceSegmentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = spaceSegmentRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		spaceSegmentRef01Ent := client.SpaceSegment(nil)
		spaceSegmentRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceSegmentRef01ListResult, err := spaceSegmentRef01Ent.List(spaceSegmentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, spaceSegmentRef01ListOk := spaceSegmentRef01ListResult.([]any)
		if !spaceSegmentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceSegmentRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceSegmentRef01MatchDt0 := map[string]any{
			"id": spaceSegmentRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceSegmentRef01MatchDt0["space_id"] = v
		} else {
			spaceSegmentRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spaceSegmentRef01DataDt0Loaded, err := spaceSegmentRef01Ent.Load(spaceSegmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceSegmentRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceSegmentRef01DataDt0Loaded))
		if spaceSegmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceSegmentRef01DataDt0LoadResult["id"], spaceSegmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_segmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_SEGMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spaceSegmentRef01Ent := client.SpaceSegment(nil)
		spaceSegmentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_segment"}), "space_segment_ref01"))
		spaceSegmentRef01Data["space_id"] = setup.idmap["space01"]

		spaceSegmentRef01DataResult, err := spaceSegmentRef01Ent.Create(spaceSegmentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spaceSegmentRef01Data = core.ToMapAny(entityData(spaceSegmentRef01DataResult))
		if spaceSegmentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if spaceSegmentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceSegmentRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceSegmentRef01ListResult, err := spaceSegmentRef01Ent.List(spaceSegmentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spaceSegmentRef01List, spaceSegmentRef01ListOk := spaceSegmentRef01ListResult.([]any)
		if !spaceSegmentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceSegmentRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(spaceSegmentRef01List), map[string]any{"id": spaceSegmentRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		spaceSegmentRef01DataUp0Up := map[string]any{
			"id": spaceSegmentRef01Data["id"],
			"space_id": setup.idmap["space_id"],
		}

		spaceSegmentRef01ResdataUp0Result, err := spaceSegmentRef01Ent.Update(spaceSegmentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		spaceSegmentRef01ResdataUp0 := core.ToMapAny(entityData(spaceSegmentRef01ResdataUp0Result))
		if spaceSegmentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(spaceSegmentRef01ResdataUp0["id"], spaceSegmentRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceSegmentRef01MatchDt0 := map[string]any{
			"id": spaceSegmentRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceSegmentRef01MatchDt0["space_id"] = v
		} else {
			spaceSegmentRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spaceSegmentRef01DataDt0Loaded, err := spaceSegmentRef01Ent.Load(spaceSegmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceSegmentRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceSegmentRef01DataDt0Loaded))
		if spaceSegmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceSegmentRef01DataDt0LoadResult["id"], spaceSegmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		spaceSegmentRef01MatchRm0 := map[string]any{
			"id": spaceSegmentRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceSegmentRef01MatchRm0["space_id"] = v
		} else {
			spaceSegmentRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = spaceSegmentRef01Ent.Remove(spaceSegmentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceSegmentRef01MatchRt0 := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceSegmentRef01ListRt0Result, err := spaceSegmentRef01Ent.List(spaceSegmentRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spaceSegmentRef01ListRt0, spaceSegmentRef01ListRt0Ok := spaceSegmentRef01ListRt0Result.([]any)
		if !spaceSegmentRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", spaceSegmentRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(spaceSegmentRef01ListRt0), map[string]any{"id": spaceSegmentRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func space_segmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_segment", "SpaceSegmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_segment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_segment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_segment01", "space_segment02", "space_segment03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_SEGMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_SEGMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_SEGMENT_ENTID"])
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
