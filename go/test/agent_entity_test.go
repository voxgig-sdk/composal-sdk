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
const agentEntityLiveStrict = true


func TestAgentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Agent(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Agent(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/browser_opened\"}")
			t.Log("LIVE STEP {\"id\":\"agent.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/environment\"}")
			t.Log("LIVE STEP {\"id\":\"agent.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agents/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"agent.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["agent01"]
			}
			livePace()
			liveExisting(t, agentEntityLiveStrict, setup.data, "agent", "id", _liveId,
				func() (any, error) {
					return client.Agent(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		agentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent")))
		var agentRef01Data map[string]any
		if len(agentRef01DataRaw) > 0 {
			agentRef01Data = core.ToMapAny(agentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentRef01Ent := client.Agent(nil)
		agentRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentRef01ListResult, err := agentRef01Ent.List(agentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentRef01ListOk := agentRef01ListResult.([]any)
		if !agentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentRef01MatchDt0 := map[string]any{
			"id": agentRef01Data["id"],
		}
		switch v := agentRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			agentRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				agentRef01MatchDt0["organization_id"] = v
			} else {
				agentRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		agentRef01DataDt0Loaded, err := agentRef01Ent.Load(agentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentRef01DataDt0LoadResult := core.ToMapAny(entityData(agentRef01DataDt0Loaded))
		if agentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentRef01DataDt0LoadResult["id"], agentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentRef01Ent := client.Agent(nil)
		agentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent"}), "agent_ref01"))
		agentRef01Data["organization_id"] = setup.idmap["organization01"]

		agentRef01DataResult, err := agentRef01Ent.Create(agentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentRef01Data = core.ToMapAny(entityData(agentRef01DataResult))
		if agentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if agentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentRef01ListResult, err := agentRef01Ent.List(agentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		agentRef01List, agentRef01ListOk := agentRef01ListResult.([]any)
		if !agentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(agentRef01List), map[string]any{"id": agentRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentRef01MatchDt0 := map[string]any{
			"id": agentRef01Data["id"],
		}
		switch v := agentRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			agentRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				agentRef01MatchDt0["organization_id"] = v
			} else {
				agentRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		agentRef01DataDt0Loaded, err := agentRef01Ent.Load(agentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentRef01DataDt0LoadResult := core.ToMapAny(entityData(agentRef01DataDt0Loaded))
		if agentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentRef01DataDt0LoadResult["id"], agentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		agentRef01MatchRm0 := map[string]any{
			"id": agentRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentRef01MatchRm0["organization_id"] = v
		} else {
			agentRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = agentRef01Ent.Remove(agentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentRef01ListRt0Result, err := agentRef01Ent.List(agentRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		agentRef01ListRt0, agentRef01ListRt0Ok := agentRef01ListRt0Result.([]any)
		if !agentRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", agentRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(agentRef01ListRt0), map[string]any{"id": agentRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func agentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent", "AgentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent01", "agent02", "agent03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_ENTID"])
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
