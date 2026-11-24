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
const runner_pool_runnerEntityLiveStrict = true


func TestRunnerPoolRunnerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RunnerPoolRunner(nil)
		if ent == nil {
			t.Fatal("expected non-nil RunnerPoolRunnerEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RunnerPoolRunner(nil).List(map[string]any{"runner_pool_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := runner_pool_runnerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "runner_pool_runner." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"runner_pool_runner.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat\"}")
			t.Log("LIVE STEP {\"id\":\"runner_pool_runner.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"runner_pool01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, runner_pool_runnerEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["runner_pool_runner01"]
			}
			livePace()
			liveExisting(t, runner_pool_runnerEntityLiveStrict, setup.data, "runner_pool_runner", "id", _liveId,
				func() (any, error) {
					return client.RunnerPoolRunner(nil).List(map[string]any{"runner_pool_id": setup.idmap["runner_pool01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		runnerPoolRunnerRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.runner_pool_runner")))
		var runnerPoolRunnerRef01Data map[string]any
		if len(runnerPoolRunnerRef01DataRaw) > 0 {
			runnerPoolRunnerRef01Data = core.ToMapAny(runnerPoolRunnerRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = runnerPoolRunnerRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		runnerPoolRunnerRef01Ent := client.RunnerPoolRunner(nil)
		runnerPoolRunnerRef01Match := map[string]any{
			"runner_pool_id": setup.idmap["runner_pool01"],
		}

		runnerPoolRunnerRef01ListResult, err := runnerPoolRunnerRef01Ent.List(runnerPoolRunnerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, runnerPoolRunnerRef01ListOk := runnerPoolRunnerRef01ListResult.([]any)
		if !runnerPoolRunnerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", runnerPoolRunnerRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		runnerPoolRunnerRef01MatchDt0 := map[string]any{
			"id": runnerPoolRunnerRef01Data["id"],
		}
		if v := setup.idmap["runner_pool_id"]; v != nil {
			runnerPoolRunnerRef01MatchDt0["runner_pool_id"] = v
		} else {
			runnerPoolRunnerRef01MatchDt0["runner_pool_id"] = setup.idmap["runner_pool01"]
		}
		runnerPoolRunnerRef01DataDt0Loaded, err := runnerPoolRunnerRef01Ent.Load(runnerPoolRunnerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		runnerPoolRunnerRef01DataDt0LoadResult := core.ToMapAny(entityData(runnerPoolRunnerRef01DataDt0Loaded))
		if runnerPoolRunnerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(runnerPoolRunnerRef01DataDt0LoadResult["id"], runnerPoolRunnerRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"runner_pool01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, runner_pool_runnerEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		runnerPoolRunnerRef01Ent := client.RunnerPoolRunner(nil)
		runnerPoolRunnerRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "runner_pool_runner"}), "runner_pool_runner_ref01"))
		runnerPoolRunnerRef01Data["runner_pool_id"] = setup.idmap["runner_pool01"]

		runnerPoolRunnerRef01DataResult, err := runnerPoolRunnerRef01Ent.Create(runnerPoolRunnerRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		runnerPoolRunnerRef01Data = core.ToMapAny(entityData(runnerPoolRunnerRef01DataResult))
		if runnerPoolRunnerRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if runnerPoolRunnerRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		runnerPoolRunnerRef01Match := map[string]any{
			"runner_pool_id": setup.idmap["runner_pool01"],
		}

		runnerPoolRunnerRef01ListResult, err := runnerPoolRunnerRef01Ent.List(runnerPoolRunnerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		runnerPoolRunnerRef01List, runnerPoolRunnerRef01ListOk := runnerPoolRunnerRef01ListResult.([]any)
		if !runnerPoolRunnerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", runnerPoolRunnerRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(runnerPoolRunnerRef01List), map[string]any{"id": runnerPoolRunnerRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		runnerPoolRunnerRef01DataUp0Up := map[string]any{
			"id": runnerPoolRunnerRef01Data["id"],
			"runner_pool_id": setup.idmap["runner_pool_id"],
		}

		runnerPoolRunnerRef01ResdataUp0Result, err := runnerPoolRunnerRef01Ent.Update(runnerPoolRunnerRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		runnerPoolRunnerRef01ResdataUp0 := core.ToMapAny(entityData(runnerPoolRunnerRef01ResdataUp0Result))
		if runnerPoolRunnerRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(runnerPoolRunnerRef01ResdataUp0["id"], runnerPoolRunnerRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		runnerPoolRunnerRef01MatchDt0 := map[string]any{
			"id": runnerPoolRunnerRef01Data["id"],
		}
		if v := setup.idmap["runner_pool_id"]; v != nil {
			runnerPoolRunnerRef01MatchDt0["runner_pool_id"] = v
		} else {
			runnerPoolRunnerRef01MatchDt0["runner_pool_id"] = setup.idmap["runner_pool01"]
		}
		runnerPoolRunnerRef01DataDt0Loaded, err := runnerPoolRunnerRef01Ent.Load(runnerPoolRunnerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		runnerPoolRunnerRef01DataDt0LoadResult := core.ToMapAny(entityData(runnerPoolRunnerRef01DataDt0Loaded))
		if runnerPoolRunnerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(runnerPoolRunnerRef01DataDt0LoadResult["id"], runnerPoolRunnerRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func runner_pool_runnerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "runner_pool_runner", "RunnerPoolRunnerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read runner_pool_runner test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse runner_pool_runner test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"runner_pool_runner01", "runner_pool_runner02", "runner_pool_runner03", "runner_pool01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add runner_pool_id alias for update test.
	if idmapResolved["runner_pool_id"] == nil {
		idmapResolved["runner_pool_id"] = idmapResolved["runner_pool01"]
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
