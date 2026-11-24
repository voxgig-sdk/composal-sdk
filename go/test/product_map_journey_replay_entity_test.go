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
const product_map_journey_replayEntityLiveStrict = true


func TestProductMapJourneyReplayEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ProductMapJourneyReplay(nil)
		if ent == nil {
			t.Fatal("expected non-nil ProductMapJourneyReplayEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ProductMapJourneyReplay(nil).Load(map[string]any{"id": 1, "organization_id": "x", "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := product_map_journey_replayBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "product_map_journey_replay." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"product_map_journey_replay.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification\"}")
			t.Log("LIVE STEP {\"id\":\"product_map_journey_replay.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only product_map_journey_replay.create.0 gives\"}")
			t.Skip("Live coverage incomplete: product_map_journey_replay.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification); product_map_journey_replay.load.1 excluded (GET-only live run: reads a record only product_map_journey_replay.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"product_map_journey_replay01", "organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, product_map_journey_replayEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_REPLAY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, product_map_journey_replayEntityLiveStrict, setup.data, "product_map_journey_replay", "id", setup.idmap["product_map_journey_replay01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["product_map_journey_replay01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		productMapJourneyReplayRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.product_map_journey_replay")))
		var productMapJourneyReplayRef01Data map[string]any
		if len(productMapJourneyReplayRef01DataRaw) > 0 {
			productMapJourneyReplayRef01Data = core.ToMapAny(productMapJourneyReplayRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = productMapJourneyReplayRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		productMapJourneyReplayRef01Ent := client.ProductMapJourneyReplay(nil)
		productMapJourneyReplayRef01MatchDt0 := map[string]any{
			"id": productMapJourneyReplayRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			productMapJourneyReplayRef01MatchDt0["organization_id"] = v
		} else {
			productMapJourneyReplayRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			productMapJourneyReplayRef01MatchDt0["project_id"] = v
		} else {
			productMapJourneyReplayRef01MatchDt0["project_id"] = setup.idmap["project01"]
		}
		productMapJourneyReplayRef01DataDt0Loaded, err := productMapJourneyReplayRef01Ent.Load(productMapJourneyReplayRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		productMapJourneyReplayRef01DataDt0LoadResult := core.ToMapAny(entityData(productMapJourneyReplayRef01DataDt0Loaded))
		if productMapJourneyReplayRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(productMapJourneyReplayRef01DataDt0LoadResult["id"], productMapJourneyReplayRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func product_map_journey_replayBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "product_map_journey_replay", "ProductMapJourneyReplayTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read product_map_journey_replay test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse product_map_journey_replay test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"product_map_journey_replay01", "product_map_journey_replay02", "product_map_journey_replay03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_REPLAY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_REPLAY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_REPLAY_ENTID"])
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
