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
const backend_runner_poolEntityLiveStrict = true


func TestBackendRunnerPoolEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BackendRunnerPool(nil)
		if ent == nil {
			t.Fatal("expected non-nil BackendRunnerPoolEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BackendRunnerPool(nil).List(map[string]any{"backend_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := backend_runner_poolBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "backend_runner_pool." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"backend_runner_pool.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/bazel/backends/{backend_id}/runner_pools\"}")
			t.Log("LIVE STEP {\"id\":\"backend_runner_pool.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/bazel/backends/{backend_id}/runner_pools/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"backend_runner_pool.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"backend01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, backend_runner_poolEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BACKEND_RUNNER_POOL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		backendRunnerPoolRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.backend_runner_pool")))
		var backendRunnerPoolRef01Data map[string]any
		if len(backendRunnerPoolRef01DataRaw) > 0 {
			backendRunnerPoolRef01Data = core.ToMapAny(backendRunnerPoolRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = backendRunnerPoolRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		backendRunnerPoolRef01Ent := client.BackendRunnerPool(nil)
		backendRunnerPoolRef01Match := map[string]any{
			"backend_id": setup.idmap["backend01"],
		}

		backendRunnerPoolRef01ListResult, err := backendRunnerPoolRef01Ent.List(backendRunnerPoolRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, backendRunnerPoolRef01ListOk := backendRunnerPoolRef01ListResult.([]any)
		if !backendRunnerPoolRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", backendRunnerPoolRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"backend01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, backend_runner_poolEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BACKEND_RUNNER_POOL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		backendRunnerPoolRef01Ent := client.BackendRunnerPool(nil)
		backendRunnerPoolRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "backend_runner_pool"}), "backend_runner_pool_ref01"))
		backendRunnerPoolRef01Data["backend_id"] = setup.idmap["backend01"]

		backendRunnerPoolRef01DataResult, err := backendRunnerPoolRef01Ent.Create(backendRunnerPoolRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		backendRunnerPoolRef01Data = core.ToMapAny(entityData(backendRunnerPoolRef01DataResult))
		if backendRunnerPoolRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if backendRunnerPoolRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		backendRunnerPoolRef01Match := map[string]any{
			"backend_id": setup.idmap["backend01"],
		}

		backendRunnerPoolRef01ListResult, err := backendRunnerPoolRef01Ent.List(backendRunnerPoolRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		backendRunnerPoolRef01List, backendRunnerPoolRef01ListOk := backendRunnerPoolRef01ListResult.([]any)
		if !backendRunnerPoolRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", backendRunnerPoolRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(backendRunnerPoolRef01List), map[string]any{"id": backendRunnerPoolRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		backendRunnerPoolRef01MatchRm0 := map[string]any{
			"id": backendRunnerPoolRef01Data["id"],
		}
		if v := setup.idmap["backend_id"]; v != nil {
			backendRunnerPoolRef01MatchRm0["backend_id"] = v
		} else {
			backendRunnerPoolRef01MatchRm0["backend_id"] = setup.idmap["backend01"]
		}
		_, err = backendRunnerPoolRef01Ent.Remove(backendRunnerPoolRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		backendRunnerPoolRef01MatchRt0 := map[string]any{
			"backend_id": setup.idmap["backend01"],
		}

		backendRunnerPoolRef01ListRt0Result, err := backendRunnerPoolRef01Ent.List(backendRunnerPoolRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		backendRunnerPoolRef01ListRt0, backendRunnerPoolRef01ListRt0Ok := backendRunnerPoolRef01ListRt0Result.([]any)
		if !backendRunnerPoolRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", backendRunnerPoolRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(backendRunnerPoolRef01ListRt0), map[string]any{"id": backendRunnerPoolRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func backend_runner_poolBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "backend_runner_pool", "BackendRunnerPoolTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read backend_runner_pool test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse backend_runner_pool test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"backend_runner_pool01", "backend_runner_pool02", "backend_runner_pool03", "backend01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_BACKEND_RUNNER_POOL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BACKEND_RUNNER_POOL_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_BACKEND_RUNNER_POOL_ENTID"])
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
