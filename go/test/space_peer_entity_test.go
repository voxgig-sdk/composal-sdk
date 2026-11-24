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
const space_peerEntityLiveStrict = true


func TestSpacePeerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpacePeer(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpacePeerEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpacePeer(nil).Load(map[string]any{"id": 1, "space_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_peerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_peer." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_peer.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/peers/{id}/approve\"}")
			t.Log("LIVE STEP {\"id\":\"space_peer.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/peers/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_peer.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only space_peer.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"space_peer.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/peers/{id}\"}")
			t.Skip("Live coverage incomplete: space_peer.create.0 excluded (GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/peers/{id}/approve); space_peer.update.1 excluded (GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/peers/{id}); space_peer.load.2 excluded (GET-only live run: reads a record only space_peer.create.0 gives); space_peer.remove.3 excluded (GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/peers/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_peerEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_PEER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spacePeerRef01Ent := client.SpacePeer(nil)
		spacePeerRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_peer"}), "space_peer_ref01"))
		spacePeerRef01Data["space_id"] = setup.idmap["space01"]

		spacePeerRef01DataResult, err := spacePeerRef01Ent.Create(spacePeerRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spacePeerRef01Data = core.ToMapAny(entityData(spacePeerRef01DataResult))
		if spacePeerRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if spacePeerRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		spacePeerRef01DataUp0Up := map[string]any{
			"id": spacePeerRef01Data["id"],
			"space_id": setup.idmap["space_id"],
		}

		spacePeerRef01ResdataUp0Result, err := spacePeerRef01Ent.Update(spacePeerRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		spacePeerRef01ResdataUp0 := core.ToMapAny(entityData(spacePeerRef01ResdataUp0Result))
		if spacePeerRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(spacePeerRef01ResdataUp0["id"], spacePeerRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spacePeerRef01MatchDt0 := map[string]any{
			"id": spacePeerRef01Data["id"],
		}
		spacePeerRef01DataDt0Loaded, err := spacePeerRef01Ent.Load(spacePeerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spacePeerRef01DataDt0LoadResult := core.ToMapAny(entityData(spacePeerRef01DataDt0Loaded))
		if spacePeerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spacePeerRef01DataDt0LoadResult["id"], spacePeerRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		spacePeerRef01MatchRm0 := map[string]any{
			"id": spacePeerRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spacePeerRef01MatchRm0["space_id"] = v
		} else {
			spacePeerRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = spacePeerRef01Ent.Remove(spacePeerRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func space_peerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_peer", "SpacePeerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_peer test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_peer test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_peer01", "space_peer02", "space_peer03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_PEER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_PEER_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_PEER_ENTID"])
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
