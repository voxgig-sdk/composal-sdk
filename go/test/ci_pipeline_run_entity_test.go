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
const ci_pipeline_runEntityLiveStrict = true


func TestCiPipelineRunEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CiPipelineRun(nil)
		if ent == nil {
			t.Fatal("expected non-nil CiPipelineRunEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CiPipelineRun(nil).Load(map[string]any{"id": 1, "pipeline_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := ci_pipeline_runBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ci_pipeline_run." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"ci_pipeline_run.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry\"}")
			t.Log("LIVE STEP {\"id\":\"ci_pipeline_run.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only ci_pipeline_run.create.0 gives\"}")
			t.Skip("Live coverage incomplete: ci_pipeline_run.create.0 excluded (GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry); ci_pipeline_run.load.1 excluded (GET-only live run: reads a record only ci_pipeline_run.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"pipeline01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, ci_pipeline_runEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		ciPipelineRunRef01Ent := client.CiPipelineRun(nil)
		ciPipelineRunRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "ci_pipeline_run"}), "ci_pipeline_run_ref01"))
		ciPipelineRunRef01Data["pipeline_id"] = setup.idmap["pipeline01"]

		ciPipelineRunRef01DataResult, err := ciPipelineRunRef01Ent.Create(ciPipelineRunRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		ciPipelineRunRef01Data = core.ToMapAny(entityData(ciPipelineRunRef01DataResult))
		if ciPipelineRunRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if ciPipelineRunRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		ciPipelineRunRef01MatchDt0 := map[string]any{
			"id": ciPipelineRunRef01Data["id"],
		}
		ciPipelineRunRef01DataDt0Loaded, err := ciPipelineRunRef01Ent.Load(ciPipelineRunRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		ciPipelineRunRef01DataDt0LoadResult := core.ToMapAny(entityData(ciPipelineRunRef01DataDt0Loaded))
		if ciPipelineRunRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(ciPipelineRunRef01DataDt0LoadResult["id"], ciPipelineRunRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func ci_pipeline_runBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ci_pipeline_run", "CiPipelineRunTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ci_pipeline_run test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ci_pipeline_run test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"ci_pipeline_run01", "ci_pipeline_run02", "ci_pipeline_run03", "pipeline01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID"])
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
