package sdktest

import (
	"encoding/json"
	"fmt"
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
const agent_connectionEntityLiveStrict = true


func TestAgentConnectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentConnection(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentConnectionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentConnection(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_connectionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_connection." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_connection.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_connections/{id}/adopt_custody\"}")
			t.Log("LIVE STEP {\"id\":\"agent_connection.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_connections/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"agent_connection.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_connections/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"agent_connection.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_connectionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_CONNECTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["agent_connection01"]
			}
			livePace()
			liveExisting(t, agent_connectionEntityLiveStrict, setup.data, "agent_connection", "id", _liveId,
				func() (any, error) {
					return client.AgentConnection(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		agentConnectionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_connection")))
		var agentConnectionRef01Data map[string]any
		if len(agentConnectionRef01DataRaw) > 0 {
			agentConnectionRef01Data = core.ToMapAny(agentConnectionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentConnectionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentConnectionRef01Ent := client.AgentConnection(nil)
		agentConnectionRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentConnectionRef01ListResult, err := agentConnectionRef01Ent.List(agentConnectionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentConnectionRef01ListOk := agentConnectionRef01ListResult.([]any)
		if !agentConnectionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentConnectionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentConnectionRef01MatchDt0 := map[string]any{
			"id": agentConnectionRef01Data["id"],
		}
		switch v := agentConnectionRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			agentConnectionRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				agentConnectionRef01MatchDt0["organization_id"] = v
			} else {
				agentConnectionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		agentConnectionRef01DataDt0Loaded, err := agentConnectionRef01Ent.Load(agentConnectionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentConnectionRef01DataDt0LoadResult := core.ToMapAny(entityData(agentConnectionRef01DataDt0Loaded))
		if agentConnectionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentConnectionRef01DataDt0LoadResult["id"], agentConnectionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_connectionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_CONNECTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentConnectionRef01Ent := client.AgentConnection(nil)
		agentConnectionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent_connection"}), "agent_connection_ref01"))
		agentConnectionRef01Data["organization_id"] = setup.idmap["organization01"]

		agentConnectionRef01DataResult, err := agentConnectionRef01Ent.Create(agentConnectionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentConnectionRef01Data = core.ToMapAny(entityData(agentConnectionRef01DataResult))
		if agentConnectionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if agentConnectionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentConnectionRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentConnectionRef01ListResult, err := agentConnectionRef01Ent.List(agentConnectionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		agentConnectionRef01List, agentConnectionRef01ListOk := agentConnectionRef01ListResult.([]any)
		if !agentConnectionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentConnectionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(agentConnectionRef01List), map[string]any{"id": agentConnectionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		agentConnectionRef01DataUp0Up := map[string]any{
			"id": agentConnectionRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		agentConnectionRef01MarkdefUp0Name := "admin_disabled_at"
		agentConnectionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-agent_connection_ref01_%d", setup.now)
		agentConnectionRef01DataUp0Up[agentConnectionRef01MarkdefUp0Name] = agentConnectionRef01MarkdefUp0Value

		agentConnectionRef01ResdataUp0Result, err := agentConnectionRef01Ent.Update(agentConnectionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		agentConnectionRef01ResdataUp0 := core.ToMapAny(entityData(agentConnectionRef01ResdataUp0Result))
		if agentConnectionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(agentConnectionRef01ResdataUp0["id"], agentConnectionRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if agentConnectionRef01ResdataUp0[agentConnectionRef01MarkdefUp0Name] != agentConnectionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", agentConnectionRef01MarkdefUp0Name, agentConnectionRef01ResdataUp0[agentConnectionRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentConnectionRef01MatchDt0 := map[string]any{
			"id": agentConnectionRef01Data["id"],
		}
		switch v := agentConnectionRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			agentConnectionRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				agentConnectionRef01MatchDt0["organization_id"] = v
			} else {
				agentConnectionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		agentConnectionRef01DataDt0Loaded, err := agentConnectionRef01Ent.Load(agentConnectionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentConnectionRef01DataDt0LoadResult := core.ToMapAny(entityData(agentConnectionRef01DataDt0Loaded))
		if agentConnectionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentConnectionRef01DataDt0LoadResult["id"], agentConnectionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		agentConnectionRef01MatchRm0 := map[string]any{
			"id": agentConnectionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentConnectionRef01MatchRm0["organization_id"] = v
		} else {
			agentConnectionRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = agentConnectionRef01Ent.Remove(agentConnectionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentConnectionRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentConnectionRef01ListRt0Result, err := agentConnectionRef01Ent.List(agentConnectionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		agentConnectionRef01ListRt0, agentConnectionRef01ListRt0Ok := agentConnectionRef01ListRt0Result.([]any)
		if !agentConnectionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", agentConnectionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(agentConnectionRef01ListRt0), map[string]any{"id": agentConnectionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func agent_connectionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_connection", "AgentConnectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_connection test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_connection test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_connection01", "agent_connection02", "agent_connection03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_CONNECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_CONNECTION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_CONNECTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add organization_id alias for update test.
	if idmapResolved["organization_id"] == nil {
		idmapResolved["organization_id"] = idmapResolved["organization01"]
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
