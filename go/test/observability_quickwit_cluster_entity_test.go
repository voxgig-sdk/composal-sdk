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
const observability_quickwit_clusterEntityLiveStrict = true


func TestObservabilityQuickwitClusterEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ObservabilityQuickwitCluster(nil)
		if ent == nil {
			t.Fatal("expected non-nil ObservabilityQuickwitClusterEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ObservabilityQuickwitCluster(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := observability_quickwit_clusterBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "observability_quickwit_cluster." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"observability_quickwit_cluster.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/quickwit_clusters/{id}/activate\"}")
			t.Log("LIVE STEP {\"id\":\"observability_quickwit_cluster.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/observability/quickwit_clusters/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"observability_quickwit_cluster.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only observability_quickwit_cluster.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"observability_quickwit_cluster.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/observability/quickwit_clusters/{id}\"}")
			t.Skip("Live coverage incomplete: observability_quickwit_cluster.create.0 excluded (GET-only live run: needs POST /api/v1/observability/quickwit_clusters/{id}/activate); observability_quickwit_cluster.update.1 excluded (GET-only live run: needs PUT /api/v1/observability/quickwit_clusters/{id}); observability_quickwit_cluster.load.2 excluded (GET-only live run: reads a record only observability_quickwit_cluster.create.0 gives); observability_quickwit_cluster.remove.3 excluded (GET-only live run: needs DELETE /api/v1/observability/quickwit_clusters/{id})")
			return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		observabilityQuickwitClusterRef01Ent := client.ObservabilityQuickwitCluster(nil)
		observabilityQuickwitClusterRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "observability_quickwit_cluster"}), "observability_quickwit_cluster_ref01"))

		observabilityQuickwitClusterRef01DataResult, err := observabilityQuickwitClusterRef01Ent.Create(observabilityQuickwitClusterRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		observabilityQuickwitClusterRef01Data = core.ToMapAny(entityData(observabilityQuickwitClusterRef01DataResult))
		if observabilityQuickwitClusterRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if observabilityQuickwitClusterRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		observabilityQuickwitClusterRef01DataUp0Up := map[string]any{
			"id": observabilityQuickwitClusterRef01Data["id"],
		}

		observabilityQuickwitClusterRef01ResdataUp0Result, err := observabilityQuickwitClusterRef01Ent.Update(observabilityQuickwitClusterRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		observabilityQuickwitClusterRef01ResdataUp0 := core.ToMapAny(entityData(observabilityQuickwitClusterRef01ResdataUp0Result))
		if observabilityQuickwitClusterRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(observabilityQuickwitClusterRef01ResdataUp0["id"], observabilityQuickwitClusterRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		observabilityQuickwitClusterRef01MatchDt0 := map[string]any{
			"id": observabilityQuickwitClusterRef01Data["id"],
		}
		observabilityQuickwitClusterRef01DataDt0Loaded, err := observabilityQuickwitClusterRef01Ent.Load(observabilityQuickwitClusterRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		observabilityQuickwitClusterRef01DataDt0LoadResult := core.ToMapAny(entityData(observabilityQuickwitClusterRef01DataDt0Loaded))
		if observabilityQuickwitClusterRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(observabilityQuickwitClusterRef01DataDt0LoadResult["id"], observabilityQuickwitClusterRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		observabilityQuickwitClusterRef01MatchRm0 := map[string]any{
			"id": observabilityQuickwitClusterRef01Data["id"],
		}
		_, err = observabilityQuickwitClusterRef01Ent.Remove(observabilityQuickwitClusterRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func observability_quickwit_clusterBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "observability_quickwit_cluster", "ObservabilityQuickwitClusterTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read observability_quickwit_cluster test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse observability_quickwit_cluster test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"observability_quickwit_cluster01", "observability_quickwit_cluster02", "observability_quickwit_cluster03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_OBSERVABILITY_QUICKWIT_CLUSTER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_OBSERVABILITY_QUICKWIT_CLUSTER_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_OBSERVABILITY_QUICKWIT_CLUSTER_ENTID"])
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
