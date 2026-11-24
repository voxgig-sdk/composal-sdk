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
const runtime_instance_health_snapshotEntityLiveStrict = true


func TestRuntimeInstanceHealthSnapshotEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RuntimeInstanceHealthSnapshot(nil)
		if ent == nil {
			t.Fatal("expected non-nil RuntimeInstanceHealthSnapshotEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RuntimeInstanceHealthSnapshot(nil).Load(map[string]any{"runtime_instance_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := runtime_instance_health_snapshotBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "runtime_instance_health_snapshot." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"runtime_instance_health_snapshot.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		runtimeInstanceHealthSnapshotRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.runtime_instance_health_snapshot")))
		var runtimeInstanceHealthSnapshotRef01Data map[string]any
		if len(runtimeInstanceHealthSnapshotRef01DataRaw) > 0 {
			runtimeInstanceHealthSnapshotRef01Data = core.ToMapAny(runtimeInstanceHealthSnapshotRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = runtimeInstanceHealthSnapshotRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		runtimeInstanceHealthSnapshotRef01Ent := client.RuntimeInstanceHealthSnapshot(nil)
		runtimeInstanceHealthSnapshotRef01MatchDt0 := map[string]any{}
		runtimeInstanceHealthSnapshotRef01DataDt0Loaded, err := runtimeInstanceHealthSnapshotRef01Ent.Load(runtimeInstanceHealthSnapshotRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if runtimeInstanceHealthSnapshotRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"runtime_instance01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, runtime_instance_health_snapshotEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RUNTIME_INSTANCE_HEALTH_SNAPSHOT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		runtimeInstanceHealthSnapshotRef01Ent := client.RuntimeInstanceHealthSnapshot(nil)
		runtimeInstanceHealthSnapshotRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "runtime_instance_health_snapshot"}), "runtime_instance_health_snapshot_ref01"))
		runtimeInstanceHealthSnapshotRef01Data["runtime_instance_id"] = setup.idmap["runtime_instance01"]

		runtimeInstanceHealthSnapshotRef01DataResult, err := runtimeInstanceHealthSnapshotRef01Ent.Create(runtimeInstanceHealthSnapshotRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		runtimeInstanceHealthSnapshotRef01Data = core.ToMapAny(entityData(runtimeInstanceHealthSnapshotRef01DataResult))
		if runtimeInstanceHealthSnapshotRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		runtimeInstanceHealthSnapshotRef01MatchDt0 := map[string]any{}
		runtimeInstanceHealthSnapshotRef01DataDt0Loaded, err := runtimeInstanceHealthSnapshotRef01Ent.Load(runtimeInstanceHealthSnapshotRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if runtimeInstanceHealthSnapshotRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func runtime_instance_health_snapshotBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "runtime_instance_health_snapshot", "RuntimeInstanceHealthSnapshotTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read runtime_instance_health_snapshot test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse runtime_instance_health_snapshot test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"runtime_instance_health_snapshot01", "runtime_instance_health_snapshot02", "runtime_instance_health_snapshot03", "runtime_instance01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_RUNTIME_INSTANCE_HEALTH_SNAPSHOT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_RUNTIME_INSTANCE_HEALTH_SNAPSHOT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_RUNTIME_INSTANCE_HEALTH_SNAPSHOT_ENTID"])
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
