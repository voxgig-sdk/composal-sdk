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
const runner_leaseEntityLiveStrict = true


func TestRunnerLeaseEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RunnerLease(nil)
		if ent == nil {
			t.Fatal("expected non-nil RunnerLeaseEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RunnerLease(nil).Load(map[string]any{"runner_id": 1, "runner_pool_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := runner_leaseBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "runner_lease." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"runner_lease.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim\"}")
			t.Log("LIVE STEP {\"id\":\"runner_lease.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only runner_lease.create.0 gives\"}")
			t.Skip("Live coverage incomplete: runner_lease.create.0 excluded (GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim); runner_lease.load.1 excluded (GET-only live run: reads a record only runner_lease.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"runner01", "runner_pool01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, runner_leaseEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RUNNER_LEASE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		runnerLeaseRef01Ent := client.RunnerLease(nil)
		runnerLeaseRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "runner_lease"}), "runner_lease_ref01"))
		runnerLeaseRef01Data["runner_id"] = setup.idmap["runner01"]
		runnerLeaseRef01Data["runner_pool_id"] = setup.idmap["runner_pool01"]

		runnerLeaseRef01DataResult, err := runnerLeaseRef01Ent.Create(runnerLeaseRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		runnerLeaseRef01Data = core.ToMapAny(entityData(runnerLeaseRef01DataResult))
		if runnerLeaseRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if runnerLeaseRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		runnerLeaseRef01MatchDt0 := map[string]any{
			"id": runnerLeaseRef01Data["id"],
		}
		if v := setup.idmap["runner_pool_id"]; v != nil {
			runnerLeaseRef01MatchDt0["runner_pool_id"] = v
		} else {
			runnerLeaseRef01MatchDt0["runner_pool_id"] = setup.idmap["runner_pool01"]
		}
		runnerLeaseRef01DataDt0Loaded, err := runnerLeaseRef01Ent.Load(runnerLeaseRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		runnerLeaseRef01DataDt0LoadResult := core.ToMapAny(entityData(runnerLeaseRef01DataDt0Loaded))
		if runnerLeaseRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(runnerLeaseRef01DataDt0LoadResult["id"], runnerLeaseRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func runner_leaseBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "runner_lease", "RunnerLeaseTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read runner_lease test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse runner_lease test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"runner_lease01", "runner_lease02", "runner_lease03", "runner01", "runner_pool01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_RUNNER_LEASE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_RUNNER_LEASE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_RUNNER_LEASE_ENTID"])
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
