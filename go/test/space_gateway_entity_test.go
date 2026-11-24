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
const space_gatewayEntityLiveStrict = true


func TestSpaceGatewayEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpaceGateway(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpaceGatewayEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpaceGateway(nil).List(map[string]any{"space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_gatewayBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_gateway." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_gateway.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/gateways/{id}/heartbeat\"}")
			t.Log("LIVE STEP {\"id\":\"space_gateway.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/gateways/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_gateway.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/gateways/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_gateway.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_gatewayEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_GATEWAY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["space_gateway01"]
			}
			livePace()
			liveExisting(t, space_gatewayEntityLiveStrict, setup.data, "space_gateway", "id", _liveId,
				func() (any, error) {
					return client.SpaceGateway(nil).List(map[string]any{"space_id": setup.idmap["space01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		spaceGatewayRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.space_gateway")))
		var spaceGatewayRef01Data map[string]any
		if len(spaceGatewayRef01DataRaw) > 0 {
			spaceGatewayRef01Data = core.ToMapAny(spaceGatewayRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = spaceGatewayRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		spaceGatewayRef01Ent := client.SpaceGateway(nil)
		spaceGatewayRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceGatewayRef01ListResult, err := spaceGatewayRef01Ent.List(spaceGatewayRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, spaceGatewayRef01ListOk := spaceGatewayRef01ListResult.([]any)
		if !spaceGatewayRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceGatewayRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceGatewayRef01MatchDt0 := map[string]any{
			"id": spaceGatewayRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceGatewayRef01MatchDt0["space_id"] = v
		} else {
			spaceGatewayRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spaceGatewayRef01DataDt0Loaded, err := spaceGatewayRef01Ent.Load(spaceGatewayRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceGatewayRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceGatewayRef01DataDt0Loaded))
		if spaceGatewayRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceGatewayRef01DataDt0LoadResult["id"], spaceGatewayRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_gatewayEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_GATEWAY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spaceGatewayRef01Ent := client.SpaceGateway(nil)
		spaceGatewayRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_gateway"}), "space_gateway_ref01"))
		spaceGatewayRef01Data["space_id"] = setup.idmap["space01"]

		spaceGatewayRef01DataResult, err := spaceGatewayRef01Ent.Create(spaceGatewayRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spaceGatewayRef01Data = core.ToMapAny(entityData(spaceGatewayRef01DataResult))
		if spaceGatewayRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if spaceGatewayRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceGatewayRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceGatewayRef01ListResult, err := spaceGatewayRef01Ent.List(spaceGatewayRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spaceGatewayRef01List, spaceGatewayRef01ListOk := spaceGatewayRef01ListResult.([]any)
		if !spaceGatewayRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceGatewayRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(spaceGatewayRef01List), map[string]any{"id": spaceGatewayRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		spaceGatewayRef01DataUp0Up := map[string]any{
			"id": spaceGatewayRef01Data["id"],
			"space_id": setup.idmap["space_id"],
		}

		spaceGatewayRef01ResdataUp0Result, err := spaceGatewayRef01Ent.Update(spaceGatewayRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		spaceGatewayRef01ResdataUp0 := core.ToMapAny(entityData(spaceGatewayRef01ResdataUp0Result))
		if spaceGatewayRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(spaceGatewayRef01ResdataUp0["id"], spaceGatewayRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceGatewayRef01MatchDt0 := map[string]any{
			"id": spaceGatewayRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceGatewayRef01MatchDt0["space_id"] = v
		} else {
			spaceGatewayRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spaceGatewayRef01DataDt0Loaded, err := spaceGatewayRef01Ent.Load(spaceGatewayRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceGatewayRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceGatewayRef01DataDt0Loaded))
		if spaceGatewayRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceGatewayRef01DataDt0LoadResult["id"], spaceGatewayRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		spaceGatewayRef01MatchRm0 := map[string]any{
			"id": spaceGatewayRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceGatewayRef01MatchRm0["space_id"] = v
		} else {
			spaceGatewayRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = spaceGatewayRef01Ent.Remove(spaceGatewayRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceGatewayRef01MatchRt0 := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceGatewayRef01ListRt0Result, err := spaceGatewayRef01Ent.List(spaceGatewayRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spaceGatewayRef01ListRt0, spaceGatewayRef01ListRt0Ok := spaceGatewayRef01ListRt0Result.([]any)
		if !spaceGatewayRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", spaceGatewayRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(spaceGatewayRef01ListRt0), map[string]any{"id": spaceGatewayRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func space_gatewayBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_gateway", "SpaceGatewayTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_gateway test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_gateway test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_gateway01", "space_gateway02", "space_gateway03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_GATEWAY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_GATEWAY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_GATEWAY_ENTID"])
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
