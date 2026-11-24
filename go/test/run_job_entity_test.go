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
const run_jobEntityLiveStrict = true


func TestRunJobEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RunJob(nil)
		if ent == nil {
			t.Fatal("expected non-nil RunJobEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RunJob(nil).List(map[string]any{"pipeline_id": 1, "run_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := run_jobBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "run_job." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"run_job.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs\"}")
		if setup.live {
			for _, _liveKey := range []string{"pipeline01", "run01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, run_jobEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RUN_JOB_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["run_job01"]
			}
			livePace()
			liveExisting(t, run_jobEntityLiveStrict, setup.data, "run_job", "id", _liveId,
				func() (any, error) {
					return client.RunJob(nil).List(map[string]any{"pipeline_id": setup.idmap["pipeline01"], "run_id": setup.idmap["run01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		runJobRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.run_job")))
		var runJobRef01Data map[string]any
		if len(runJobRef01DataRaw) > 0 {
			runJobRef01Data = core.ToMapAny(runJobRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = runJobRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		runJobRef01Ent := client.RunJob(nil)
		runJobRef01Match := map[string]any{
			"pipeline_id": setup.idmap["pipeline01"],
			"run_id": setup.idmap["run01"],
		}

		runJobRef01ListResult, err := runJobRef01Ent.List(runJobRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, runJobRef01ListOk := runJobRef01ListResult.([]any)
		if !runJobRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", runJobRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		runJobRef01MatchDt0 := map[string]any{
			"id": runJobRef01Data["id"],
		}
		if v := setup.idmap["pipeline_id"]; v != nil {
			runJobRef01MatchDt0["pipeline_id"] = v
		} else {
			runJobRef01MatchDt0["pipeline_id"] = setup.idmap["pipeline01"]
		}
		if v := setup.idmap["run_id"]; v != nil {
			runJobRef01MatchDt0["run_id"] = v
		} else {
			runJobRef01MatchDt0["run_id"] = setup.idmap["run01"]
		}
		runJobRef01DataDt0Loaded, err := runJobRef01Ent.Load(runJobRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		runJobRef01DataDt0LoadResult := core.ToMapAny(entityData(runJobRef01DataDt0Loaded))
		if runJobRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(runJobRef01DataDt0LoadResult["id"], runJobRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"pipeline01", "run01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, run_jobEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RUN_JOB_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		runJobRef01Ent := client.RunJob(nil)
		runJobRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "run_job"}), "run_job_ref01"))
		runJobRef01Data["pipeline_id"] = setup.idmap["pipeline01"]
		runJobRef01Data["run_id"] = setup.idmap["run01"]

		runJobRef01DataResult, err := runJobRef01Ent.Create(runJobRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		runJobRef01Data = core.ToMapAny(entityData(runJobRef01DataResult))
		if runJobRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if runJobRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		runJobRef01Match := map[string]any{
			"pipeline_id": setup.idmap["pipeline01"],
			"run_id": setup.idmap["run01"],
		}

		runJobRef01ListResult, err := runJobRef01Ent.List(runJobRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		runJobRef01List, runJobRef01ListOk := runJobRef01ListResult.([]any)
		if !runJobRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", runJobRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(runJobRef01List), map[string]any{"id": runJobRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		runJobRef01MatchDt0 := map[string]any{
			"id": runJobRef01Data["id"],
		}
		if v := setup.idmap["pipeline_id"]; v != nil {
			runJobRef01MatchDt0["pipeline_id"] = v
		} else {
			runJobRef01MatchDt0["pipeline_id"] = setup.idmap["pipeline01"]
		}
		if v := setup.idmap["run_id"]; v != nil {
			runJobRef01MatchDt0["run_id"] = v
		} else {
			runJobRef01MatchDt0["run_id"] = setup.idmap["run01"]
		}
		runJobRef01DataDt0Loaded, err := runJobRef01Ent.Load(runJobRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		runJobRef01DataDt0LoadResult := core.ToMapAny(entityData(runJobRef01DataDt0Loaded))
		if runJobRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(runJobRef01DataDt0LoadResult["id"], runJobRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func run_jobBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "run_job", "RunJobTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read run_job test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse run_job test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"run_job01", "run_job02", "run_job03", "pipeline01", "run01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_RUN_JOB_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_RUN_JOB_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_RUN_JOB_ENTID"])
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
