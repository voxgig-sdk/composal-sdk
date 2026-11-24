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
const runner_pool_node_enrollment_tokenEntityLiveStrict = true


func TestRunnerPoolNodeEnrollmentTokenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RunnerPoolNodeEnrollmentToken(nil)
		if ent == nil {
			t.Fatal("expected non-nil RunnerPoolNodeEnrollmentTokenEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RunnerPoolNodeEnrollmentToken(nil).List(map[string]any{"runner_pool_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := runner_pool_node_enrollment_tokenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "runner_pool_node_enrollment_token." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"runner_pool_node_enrollment_token.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/node_enrollment_tokens/{id}/revoke\"}")
		if setup.live {
			for _, _liveKey := range []string{"runner_pool01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, runner_pool_node_enrollment_tokenEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RUNNER_POOL_NODE_ENROLLMENT_TOKEN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		runnerPoolNodeEnrollmentTokenRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.runner_pool_node_enrollment_token")))
		var runnerPoolNodeEnrollmentTokenRef01Data map[string]any
		if len(runnerPoolNodeEnrollmentTokenRef01DataRaw) > 0 {
			runnerPoolNodeEnrollmentTokenRef01Data = core.ToMapAny(runnerPoolNodeEnrollmentTokenRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = runnerPoolNodeEnrollmentTokenRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		runnerPoolNodeEnrollmentTokenRef01Ent := client.RunnerPoolNodeEnrollmentToken(nil)
		runnerPoolNodeEnrollmentTokenRef01Match := map[string]any{
			"runner_pool_id": setup.idmap["runner_pool01"],
		}

		runnerPoolNodeEnrollmentTokenRef01ListResult, err := runnerPoolNodeEnrollmentTokenRef01Ent.List(runnerPoolNodeEnrollmentTokenRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, runnerPoolNodeEnrollmentTokenRef01ListOk := runnerPoolNodeEnrollmentTokenRef01ListResult.([]any)
		if !runnerPoolNodeEnrollmentTokenRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", runnerPoolNodeEnrollmentTokenRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"runner_pool01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, runner_pool_node_enrollment_tokenEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RUNNER_POOL_NODE_ENROLLMENT_TOKEN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		runnerPoolNodeEnrollmentTokenRef01Ent := client.RunnerPoolNodeEnrollmentToken(nil)
		runnerPoolNodeEnrollmentTokenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "runner_pool_node_enrollment_token"}), "runner_pool_node_enrollment_token_ref01"))
		runnerPoolNodeEnrollmentTokenRef01Data["runner_pool_id"] = setup.idmap["runner_pool01"]

		runnerPoolNodeEnrollmentTokenRef01DataResult, err := runnerPoolNodeEnrollmentTokenRef01Ent.Create(runnerPoolNodeEnrollmentTokenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		runnerPoolNodeEnrollmentTokenRef01Data = core.ToMapAny(entityData(runnerPoolNodeEnrollmentTokenRef01DataResult))
		if runnerPoolNodeEnrollmentTokenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if runnerPoolNodeEnrollmentTokenRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		runnerPoolNodeEnrollmentTokenRef01Match := map[string]any{
			"runner_pool_id": setup.idmap["runner_pool01"],
		}

		runnerPoolNodeEnrollmentTokenRef01ListResult, err := runnerPoolNodeEnrollmentTokenRef01Ent.List(runnerPoolNodeEnrollmentTokenRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		runnerPoolNodeEnrollmentTokenRef01List, runnerPoolNodeEnrollmentTokenRef01ListOk := runnerPoolNodeEnrollmentTokenRef01ListResult.([]any)
		if !runnerPoolNodeEnrollmentTokenRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", runnerPoolNodeEnrollmentTokenRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(runnerPoolNodeEnrollmentTokenRef01List), map[string]any{"id": runnerPoolNodeEnrollmentTokenRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func runner_pool_node_enrollment_tokenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "runner_pool_node_enrollment_token", "RunnerPoolNodeEnrollmentTokenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read runner_pool_node_enrollment_token test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse runner_pool_node_enrollment_token test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"runner_pool_node_enrollment_token01", "runner_pool_node_enrollment_token02", "runner_pool_node_enrollment_token03", "runner_pool01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_RUNNER_POOL_NODE_ENROLLMENT_TOKEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_RUNNER_POOL_NODE_ENROLLMENT_TOKEN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_RUNNER_POOL_NODE_ENROLLMENT_TOKEN_ENTID"])
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
