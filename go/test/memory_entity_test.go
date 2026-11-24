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
const memoryEntityLiveStrict = true


func TestMemoryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Memory(nil)
		if ent == nil {
			t.Fatal("expected non-nil MemoryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Memory(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := memoryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "memory." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"memory.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/memories\"}")
			t.Log("LIVE STEP {\"id\":\"memory.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/memories/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"memory.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, memoryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_MEMORY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["memory01"]
			}
			livePace()
			liveExisting(t, memoryEntityLiveStrict, setup.data, "memory", "id", _liveId,
				func() (any, error) {
					return client.Memory(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		memoryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.memory")))
		var memoryRef01Data map[string]any
		if len(memoryRef01DataRaw) > 0 {
			memoryRef01Data = core.ToMapAny(memoryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = memoryRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		memoryRef01Ent := client.Memory(nil)
		memoryRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		memoryRef01ListResult, err := memoryRef01Ent.List(memoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, memoryRef01ListOk := memoryRef01ListResult.([]any)
		if !memoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", memoryRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		memoryRef01MatchDt0 := map[string]any{
			"id": memoryRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			memoryRef01MatchDt0["organization_id"] = v
		} else {
			memoryRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		memoryRef01DataDt0Loaded, err := memoryRef01Ent.Load(memoryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		memoryRef01DataDt0LoadResult := core.ToMapAny(entityData(memoryRef01DataDt0Loaded))
		if memoryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(memoryRef01DataDt0LoadResult["id"], memoryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, memoryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_MEMORY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		memoryRef01Ent := client.Memory(nil)
		memoryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "memory"}), "memory_ref01"))
		memoryRef01Data["organization_id"] = setup.idmap["organization01"]

		memoryRef01DataResult, err := memoryRef01Ent.Create(memoryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		memoryRef01Data = core.ToMapAny(entityData(memoryRef01DataResult))
		if memoryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if memoryRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		memoryRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		memoryRef01ListResult, err := memoryRef01Ent.List(memoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		memoryRef01List, memoryRef01ListOk := memoryRef01ListResult.([]any)
		if !memoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", memoryRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(memoryRef01List), map[string]any{"id": memoryRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		memoryRef01MatchDt0 := map[string]any{
			"id": memoryRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			memoryRef01MatchDt0["organization_id"] = v
		} else {
			memoryRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		memoryRef01DataDt0Loaded, err := memoryRef01Ent.Load(memoryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		memoryRef01DataDt0LoadResult := core.ToMapAny(entityData(memoryRef01DataDt0Loaded))
		if memoryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(memoryRef01DataDt0LoadResult["id"], memoryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		memoryRef01MatchRm0 := map[string]any{
			"id": memoryRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			memoryRef01MatchRm0["organization_id"] = v
		} else {
			memoryRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = memoryRef01Ent.Remove(memoryRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		memoryRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		memoryRef01ListRt0Result, err := memoryRef01Ent.List(memoryRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		memoryRef01ListRt0, memoryRef01ListRt0Ok := memoryRef01ListRt0Result.([]any)
		if !memoryRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", memoryRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(memoryRef01ListRt0), map[string]any{"id": memoryRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func memoryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "memory", "MemoryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read memory test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse memory test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"memory01", "memory02", "memory03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_MEMORY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_MEMORY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_MEMORY_ENTID"])
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
