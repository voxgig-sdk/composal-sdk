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
const space_policyEntityLiveStrict = true


func TestSpacePolicyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpacePolicy(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpacePolicyEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpacePolicy(nil).List(map[string]any{"space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_policyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_policy." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_policy.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/policies/{id}/activate\"}")
			t.Log("LIVE STEP {\"id\":\"space_policy.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/policies/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_policy.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/policies/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_policy.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_policyEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_POLICY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["space_policy01"]
			}
			livePace()
			liveExisting(t, space_policyEntityLiveStrict, setup.data, "space_policy", "id", _liveId,
				func() (any, error) {
					return client.SpacePolicy(nil).List(map[string]any{"space_id": setup.idmap["space01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		spacePolicyRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.space_policy")))
		var spacePolicyRef01Data map[string]any
		if len(spacePolicyRef01DataRaw) > 0 {
			spacePolicyRef01Data = core.ToMapAny(spacePolicyRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = spacePolicyRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		spacePolicyRef01Ent := client.SpacePolicy(nil)
		spacePolicyRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spacePolicyRef01ListResult, err := spacePolicyRef01Ent.List(spacePolicyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, spacePolicyRef01ListOk := spacePolicyRef01ListResult.([]any)
		if !spacePolicyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spacePolicyRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spacePolicyRef01MatchDt0 := map[string]any{
			"id": spacePolicyRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spacePolicyRef01MatchDt0["space_id"] = v
		} else {
			spacePolicyRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spacePolicyRef01DataDt0Loaded, err := spacePolicyRef01Ent.Load(spacePolicyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spacePolicyRef01DataDt0LoadResult := core.ToMapAny(entityData(spacePolicyRef01DataDt0Loaded))
		if spacePolicyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spacePolicyRef01DataDt0LoadResult["id"], spacePolicyRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_policyEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_POLICY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spacePolicyRef01Ent := client.SpacePolicy(nil)
		spacePolicyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_policy"}), "space_policy_ref01"))
		spacePolicyRef01Data["space_id"] = setup.idmap["space01"]

		spacePolicyRef01DataResult, err := spacePolicyRef01Ent.Create(spacePolicyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spacePolicyRef01Data = core.ToMapAny(entityData(spacePolicyRef01DataResult))
		if spacePolicyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if spacePolicyRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		spacePolicyRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spacePolicyRef01ListResult, err := spacePolicyRef01Ent.List(spacePolicyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spacePolicyRef01List, spacePolicyRef01ListOk := spacePolicyRef01ListResult.([]any)
		if !spacePolicyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spacePolicyRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(spacePolicyRef01List), map[string]any{"id": spacePolicyRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		spacePolicyRef01DataUp0Up := map[string]any{
			"id": spacePolicyRef01Data["id"],
			"space_id": setup.idmap["space_id"],
		}

		spacePolicyRef01ResdataUp0Result, err := spacePolicyRef01Ent.Update(spacePolicyRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		spacePolicyRef01ResdataUp0 := core.ToMapAny(entityData(spacePolicyRef01ResdataUp0Result))
		if spacePolicyRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(spacePolicyRef01ResdataUp0["id"], spacePolicyRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spacePolicyRef01MatchDt0 := map[string]any{
			"id": spacePolicyRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spacePolicyRef01MatchDt0["space_id"] = v
		} else {
			spacePolicyRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spacePolicyRef01DataDt0Loaded, err := spacePolicyRef01Ent.Load(spacePolicyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spacePolicyRef01DataDt0LoadResult := core.ToMapAny(entityData(spacePolicyRef01DataDt0Loaded))
		if spacePolicyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spacePolicyRef01DataDt0LoadResult["id"], spacePolicyRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		spacePolicyRef01MatchRm0 := map[string]any{
			"id": spacePolicyRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spacePolicyRef01MatchRm0["space_id"] = v
		} else {
			spacePolicyRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = spacePolicyRef01Ent.Remove(spacePolicyRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		spacePolicyRef01MatchRt0 := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spacePolicyRef01ListRt0Result, err := spacePolicyRef01Ent.List(spacePolicyRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spacePolicyRef01ListRt0, spacePolicyRef01ListRt0Ok := spacePolicyRef01ListRt0Result.([]any)
		if !spacePolicyRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", spacePolicyRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(spacePolicyRef01ListRt0), map[string]any{"id": spacePolicyRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func space_policyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_policy", "SpacePolicyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_policy test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_policy test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_policy01", "space_policy02", "space_policy03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_POLICY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_POLICY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_POLICY_ENTID"])
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
