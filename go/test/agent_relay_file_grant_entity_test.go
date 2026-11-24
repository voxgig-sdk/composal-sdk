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
const agent_relay_file_grantEntityLiveStrict = true


func TestAgentRelayFileGrantEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentRelayFileGrant(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentRelayFileGrantEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentRelayFileGrant(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_relay_file_grantBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_relay_file_grant." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_relay_file_grant.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_relay_file_grants\"}")
			t.Log("LIVE STEP {\"id\":\"agent_relay_file_grant.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"agent_relay_file_grant.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_relay_file_grantEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_RELAY_FILE_GRANT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["agent_relay_file_grant01"]
			}
			livePace()
			liveExisting(t, agent_relay_file_grantEntityLiveStrict, setup.data, "agent_relay_file_grant", "id", _liveId,
				func() (any, error) {
					return client.AgentRelayFileGrant(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		agentRelayFileGrantRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_relay_file_grant")))
		var agentRelayFileGrantRef01Data map[string]any
		if len(agentRelayFileGrantRef01DataRaw) > 0 {
			agentRelayFileGrantRef01Data = core.ToMapAny(agentRelayFileGrantRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentRelayFileGrantRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentRelayFileGrantRef01Ent := client.AgentRelayFileGrant(nil)
		agentRelayFileGrantRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentRelayFileGrantRef01ListResult, err := agentRelayFileGrantRef01Ent.List(agentRelayFileGrantRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentRelayFileGrantRef01ListOk := agentRelayFileGrantRef01ListResult.([]any)
		if !agentRelayFileGrantRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentRelayFileGrantRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentRelayFileGrantRef01MatchDt0 := map[string]any{
			"id": agentRelayFileGrantRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentRelayFileGrantRef01MatchDt0["organization_id"] = v
		} else {
			agentRelayFileGrantRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentRelayFileGrantRef01DataDt0Loaded, err := agentRelayFileGrantRef01Ent.Load(agentRelayFileGrantRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentRelayFileGrantRef01DataDt0LoadResult := core.ToMapAny(entityData(agentRelayFileGrantRef01DataDt0Loaded))
		if agentRelayFileGrantRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentRelayFileGrantRef01DataDt0LoadResult["id"], agentRelayFileGrantRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_relay_file_grantEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_RELAY_FILE_GRANT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentRelayFileGrantRef01Ent := client.AgentRelayFileGrant(nil)
		agentRelayFileGrantRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent_relay_file_grant"}), "agent_relay_file_grant_ref01"))
		agentRelayFileGrantRef01Data["organization_id"] = setup.idmap["organization01"]

		agentRelayFileGrantRef01DataResult, err := agentRelayFileGrantRef01Ent.Create(agentRelayFileGrantRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentRelayFileGrantRef01Data = core.ToMapAny(entityData(agentRelayFileGrantRef01DataResult))
		if agentRelayFileGrantRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if agentRelayFileGrantRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentRelayFileGrantRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentRelayFileGrantRef01ListResult, err := agentRelayFileGrantRef01Ent.List(agentRelayFileGrantRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		agentRelayFileGrantRef01List, agentRelayFileGrantRef01ListOk := agentRelayFileGrantRef01ListResult.([]any)
		if !agentRelayFileGrantRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentRelayFileGrantRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(agentRelayFileGrantRef01List), map[string]any{"id": agentRelayFileGrantRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentRelayFileGrantRef01MatchDt0 := map[string]any{
			"id": agentRelayFileGrantRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentRelayFileGrantRef01MatchDt0["organization_id"] = v
		} else {
			agentRelayFileGrantRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentRelayFileGrantRef01DataDt0Loaded, err := agentRelayFileGrantRef01Ent.Load(agentRelayFileGrantRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentRelayFileGrantRef01DataDt0LoadResult := core.ToMapAny(entityData(agentRelayFileGrantRef01DataDt0Loaded))
		if agentRelayFileGrantRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentRelayFileGrantRef01DataDt0LoadResult["id"], agentRelayFileGrantRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		agentRelayFileGrantRef01MatchRm0 := map[string]any{
			"id": agentRelayFileGrantRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentRelayFileGrantRef01MatchRm0["organization_id"] = v
		} else {
			agentRelayFileGrantRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = agentRelayFileGrantRef01Ent.Remove(agentRelayFileGrantRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentRelayFileGrantRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentRelayFileGrantRef01ListRt0Result, err := agentRelayFileGrantRef01Ent.List(agentRelayFileGrantRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		agentRelayFileGrantRef01ListRt0, agentRelayFileGrantRef01ListRt0Ok := agentRelayFileGrantRef01ListRt0Result.([]any)
		if !agentRelayFileGrantRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", agentRelayFileGrantRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(agentRelayFileGrantRef01ListRt0), map[string]any{"id": agentRelayFileGrantRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func agent_relay_file_grantBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_relay_file_grant", "AgentRelayFileGrantTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_relay_file_grant test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_relay_file_grant test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_relay_file_grant01", "agent_relay_file_grant02", "agent_relay_file_grant03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_RELAY_FILE_GRANT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_RELAY_FILE_GRANT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_RELAY_FILE_GRANT_ENTID"])
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
