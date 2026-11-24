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
const job_stepEntityLiveStrict = true


func TestJobStepEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.JobStep(nil)
		if ent == nil {
			t.Fatal("expected non-nil JobStepEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.JobStep(nil).Load(map[string]any{"job_id": 1, "pipeline_id": "x", "run_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := job_stepBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "job_step." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"job_step.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps\"}")
			t.Log("LIVE STEP {\"id\":\"job_step.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"job_step.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only job_step.create.0 gives\"}")
			t.Skip("Live coverage incomplete: job_step.create.0 excluded (GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps); job_step.update.1 excluded (GET-only live run: needs PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}); job_step.load.2 excluded (GET-only live run: reads a record only job_step.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"job01", "pipeline01", "run01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, job_stepEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_JOB_STEP_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		jobStepRef01Ent := client.JobStep(nil)
		jobStepRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "job_step"}), "job_step_ref01"))
		jobStepRef01Data["job_id"] = setup.idmap["job01"]
		jobStepRef01Data["pipeline_id"] = setup.idmap["pipeline01"]
		jobStepRef01Data["run_id"] = setup.idmap["run01"]

		jobStepRef01DataResult, err := jobStepRef01Ent.Create(jobStepRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		jobStepRef01Data = core.ToMapAny(entityData(jobStepRef01DataResult))
		if jobStepRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if jobStepRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		jobStepRef01DataUp0Up := map[string]any{
			"id": jobStepRef01Data["id"],
			"job_id": setup.idmap["job_id"],
			"pipeline_id": setup.idmap["pipeline_id"],
			"run_id": setup.idmap["run_id"],
		}

		jobStepRef01ResdataUp0Result, err := jobStepRef01Ent.Update(jobStepRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		jobStepRef01ResdataUp0 := core.ToMapAny(entityData(jobStepRef01ResdataUp0Result))
		if jobStepRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(jobStepRef01ResdataUp0["id"], jobStepRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		jobStepRef01MatchDt0 := map[string]any{
			"id": jobStepRef01Data["id"],
		}
		if v := setup.idmap["pipeline_id"]; v != nil {
			jobStepRef01MatchDt0["pipeline_id"] = v
		} else {
			jobStepRef01MatchDt0["pipeline_id"] = setup.idmap["pipeline01"]
		}
		if v := setup.idmap["run_id"]; v != nil {
			jobStepRef01MatchDt0["run_id"] = v
		} else {
			jobStepRef01MatchDt0["run_id"] = setup.idmap["run01"]
		}
		jobStepRef01DataDt0Loaded, err := jobStepRef01Ent.Load(jobStepRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		jobStepRef01DataDt0LoadResult := core.ToMapAny(entityData(jobStepRef01DataDt0Loaded))
		if jobStepRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(jobStepRef01DataDt0LoadResult["id"], jobStepRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func job_stepBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "job_step", "JobStepTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read job_step test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse job_step test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"job_step01", "job_step02", "job_step03", "job01", "pipeline01", "run01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_JOB_STEP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_JOB_STEP_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_JOB_STEP_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add job_id alias for update test.
	if idmapResolved["job_id"] == nil {
		idmapResolved["job_id"] = idmapResolved["job01"]
	}
	// Add pipeline_id alias for update test.
	if idmapResolved["pipeline_id"] == nil {
		idmapResolved["pipeline_id"] = idmapResolved["pipeline01"]
	}
	// Add run_id alias for update test.
	if idmapResolved["run_id"] == nil {
		idmapResolved["run_id"] = idmapResolved["run01"]
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
