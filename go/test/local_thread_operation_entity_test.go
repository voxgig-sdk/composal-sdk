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
const local_thread_operationEntityLiveStrict = true


func TestLocalThreadOperationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LocalThreadOperation(nil)
		if ent == nil {
			t.Fatal("expected non-nil LocalThreadOperationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LocalThreadOperation(nil).Load(map[string]any{"agent_id": 1, "id": "x", "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := local_thread_operationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "local_thread_operation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"local_thread_operation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/operations\"}")
			t.Log("LIVE STEP {\"id\":\"local_thread_operation.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only local_thread_operation.create.0 gives\"}")
			t.Skip("Live coverage incomplete: local_thread_operation.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/operations); local_thread_operation.load.1 excluded (GET-only live run: reads a record only local_thread_operation.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "local_thread01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, local_thread_operationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_LOCAL_THREAD_OPERATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		localThreadOperationRef01Ent := client.LocalThreadOperation(nil)
		localThreadOperationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "local_thread_operation"}), "local_thread_operation_ref01"))
		localThreadOperationRef01Data["agent_id"] = setup.idmap["agent01"]
		localThreadOperationRef01Data["local_thread_id"] = setup.idmap["local_thread01"]
		localThreadOperationRef01Data["organization_id"] = setup.idmap["organization01"]

		localThreadOperationRef01DataResult, err := localThreadOperationRef01Ent.Create(localThreadOperationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		localThreadOperationRef01Data = core.ToMapAny(entityData(localThreadOperationRef01DataResult))
		if localThreadOperationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if localThreadOperationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		localThreadOperationRef01MatchDt0 := map[string]any{
			"id": localThreadOperationRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			localThreadOperationRef01MatchDt0["agent_id"] = v
		} else {
			localThreadOperationRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			localThreadOperationRef01MatchDt0["organization_id"] = v
		} else {
			localThreadOperationRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		localThreadOperationRef01DataDt0Loaded, err := localThreadOperationRef01Ent.Load(localThreadOperationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		localThreadOperationRef01DataDt0LoadResult := core.ToMapAny(entityData(localThreadOperationRef01DataDt0Loaded))
		if localThreadOperationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(localThreadOperationRef01DataDt0LoadResult["id"], localThreadOperationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func local_thread_operationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "local_thread_operation", "LocalThreadOperationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read local_thread_operation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse local_thread_operation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"local_thread_operation01", "local_thread_operation02", "local_thread_operation03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03", "local_thread01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_LOCAL_THREAD_OPERATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_LOCAL_THREAD_OPERATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_LOCAL_THREAD_OPERATION_ENTID"])
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
