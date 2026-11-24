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
const job_workspaceEntityLiveStrict = true


func TestJobWorkspaceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.JobWorkspace(nil)
		if ent == nil {
			t.Fatal("expected non-nil JobWorkspaceEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.JobWorkspace(nil).List(map[string]any{"job_id": 1, "pipeline_id": "x", "run_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := job_workspaceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "job_workspace." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"job_workspace.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces\"}")
			t.Log("LIVE STEP {\"id\":\"job_workspace.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"job01", "pipeline01", "run01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, job_workspaceEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_JOB_WORKSPACE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		jobWorkspaceRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.job_workspace")))
		var jobWorkspaceRef01Data map[string]any
		if len(jobWorkspaceRef01DataRaw) > 0 {
			jobWorkspaceRef01Data = core.ToMapAny(jobWorkspaceRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = jobWorkspaceRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		jobWorkspaceRef01Ent := client.JobWorkspace(nil)
		jobWorkspaceRef01Match := map[string]any{
			"job_id": setup.idmap["job01"],
			"pipeline_id": setup.idmap["pipeline01"],
			"run_id": setup.idmap["run01"],
		}

		jobWorkspaceRef01ListResult, err := jobWorkspaceRef01Ent.List(jobWorkspaceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, jobWorkspaceRef01ListOk := jobWorkspaceRef01ListResult.([]any)
		if !jobWorkspaceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", jobWorkspaceRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"job01", "pipeline01", "run01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, job_workspaceEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_JOB_WORKSPACE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		jobWorkspaceRef01Ent := client.JobWorkspace(nil)
		jobWorkspaceRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "job_workspace"}), "job_workspace_ref01"))
		jobWorkspaceRef01Data["job_id"] = setup.idmap["job01"]
		jobWorkspaceRef01Data["pipeline_id"] = setup.idmap["pipeline01"]
		jobWorkspaceRef01Data["run_id"] = setup.idmap["run01"]

		jobWorkspaceRef01DataResult, err := jobWorkspaceRef01Ent.Create(jobWorkspaceRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		jobWorkspaceRef01Data = core.ToMapAny(entityData(jobWorkspaceRef01DataResult))
		if jobWorkspaceRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if jobWorkspaceRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		jobWorkspaceRef01Match := map[string]any{
			"job_id": setup.idmap["job01"],
			"pipeline_id": setup.idmap["pipeline01"],
			"run_id": setup.idmap["run01"],
		}

		jobWorkspaceRef01ListResult, err := jobWorkspaceRef01Ent.List(jobWorkspaceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		jobWorkspaceRef01List, jobWorkspaceRef01ListOk := jobWorkspaceRef01ListResult.([]any)
		if !jobWorkspaceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", jobWorkspaceRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(jobWorkspaceRef01List), map[string]any{"id": jobWorkspaceRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		jobWorkspaceRef01DataUp0Up := map[string]any{
			"id": jobWorkspaceRef01Data["id"],
			"job_id": setup.idmap["job_id"],
			"pipeline_id": setup.idmap["pipeline_id"],
			"run_id": setup.idmap["run_id"],
		}

		jobWorkspaceRef01ResdataUp0Result, err := jobWorkspaceRef01Ent.Update(jobWorkspaceRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		jobWorkspaceRef01ResdataUp0 := core.ToMapAny(entityData(jobWorkspaceRef01ResdataUp0Result))
		if jobWorkspaceRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(jobWorkspaceRef01ResdataUp0["id"], jobWorkspaceRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

	})
}

func job_workspaceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "job_workspace", "JobWorkspaceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read job_workspace test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse job_workspace test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"job_workspace01", "job_workspace02", "job_workspace03", "job01", "pipeline01", "run01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_JOB_WORKSPACE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_JOB_WORKSPACE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_JOB_WORKSPACE_ENTID"])
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
