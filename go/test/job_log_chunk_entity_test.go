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
const job_log_chunkEntityLiveStrict = true


func TestJobLogChunkEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.JobLogChunk(nil)
		if ent == nil {
			t.Fatal("expected non-nil JobLogChunkEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.JobLogChunk(nil).List(map[string]any{"job_id": 1, "pipeline_id": "x", "run_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := job_log_chunkBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "job_log_chunk." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"job_log_chunk.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks\"}")
		if setup.live {
			for _, _liveKey := range []string{"job01", "pipeline01", "run01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, job_log_chunkEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_JOB_LOG_CHUNK_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		jobLogChunkRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.job_log_chunk")))
		var jobLogChunkRef01Data map[string]any
		if len(jobLogChunkRef01DataRaw) > 0 {
			jobLogChunkRef01Data = core.ToMapAny(jobLogChunkRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = jobLogChunkRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		jobLogChunkRef01Ent := client.JobLogChunk(nil)
		jobLogChunkRef01Match := map[string]any{
			"job_id": setup.idmap["job01"],
			"pipeline_id": setup.idmap["pipeline01"],
			"run_id": setup.idmap["run01"],
		}

		jobLogChunkRef01ListResult, err := jobLogChunkRef01Ent.List(jobLogChunkRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, jobLogChunkRef01ListOk := jobLogChunkRef01ListResult.([]any)
		if !jobLogChunkRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", jobLogChunkRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"job01", "pipeline01", "run01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, job_log_chunkEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_JOB_LOG_CHUNK_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		jobLogChunkRef01Ent := client.JobLogChunk(nil)
		jobLogChunkRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "job_log_chunk"}), "job_log_chunk_ref01"))
		jobLogChunkRef01Data["job_id"] = setup.idmap["job01"]
		jobLogChunkRef01Data["pipeline_id"] = setup.idmap["pipeline01"]
		jobLogChunkRef01Data["run_id"] = setup.idmap["run01"]

		jobLogChunkRef01DataResult, err := jobLogChunkRef01Ent.Create(jobLogChunkRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		jobLogChunkRef01Data = core.ToMapAny(entityData(jobLogChunkRef01DataResult))
		if jobLogChunkRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if jobLogChunkRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		jobLogChunkRef01Match := map[string]any{
			"job_id": setup.idmap["job01"],
			"pipeline_id": setup.idmap["pipeline01"],
			"run_id": setup.idmap["run01"],
		}

		jobLogChunkRef01ListResult, err := jobLogChunkRef01Ent.List(jobLogChunkRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		jobLogChunkRef01List, jobLogChunkRef01ListOk := jobLogChunkRef01ListResult.([]any)
		if !jobLogChunkRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", jobLogChunkRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(jobLogChunkRef01List), map[string]any{"id": jobLogChunkRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func job_log_chunkBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "job_log_chunk", "JobLogChunkTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read job_log_chunk test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse job_log_chunk test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"job_log_chunk01", "job_log_chunk02", "job_log_chunk03", "job01", "pipeline01", "run01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_JOB_LOG_CHUNK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_JOB_LOG_CHUNK_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_JOB_LOG_CHUNK_ENTID"])
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
