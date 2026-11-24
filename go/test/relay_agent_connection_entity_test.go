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
const relay_agent_connectionEntityLiveStrict = true


func TestRelayAgentConnectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RelayAgentConnection(nil)
		if ent == nil {
			t.Fatal("expected non-nil RelayAgentConnectionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RelayAgentConnection(nil).List(map[string]any{"agent_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := relay_agent_connectionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "relay_agent_connection." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"relay_agent_connection.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup\"}")
			t.Log("LIVE STEP {\"id\":\"relay_agent_connection.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}\"}")
			t.Log("LIVE STEP {\"id\":\"relay_agent_connection.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}\"}")
			t.Log("LIVE STEP {\"id\":\"relay_agent_connection.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, relay_agent_connectionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RELAY_AGENT_CONNECTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["relay_agent_connection01"]
			}
			livePace()
			liveExisting(t, relay_agent_connectionEntityLiveStrict, setup.data, "relay_agent_connection", "id", _liveId,
				func() (any, error) {
					return client.RelayAgentConnection(nil).List(map[string]any{"agent_id": setup.idmap["agent01"], "organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		relayAgentConnectionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.relay_agent_connection")))
		var relayAgentConnectionRef01Data map[string]any
		if len(relayAgentConnectionRef01DataRaw) > 0 {
			relayAgentConnectionRef01Data = core.ToMapAny(relayAgentConnectionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = relayAgentConnectionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		relayAgentConnectionRef01Ent := client.RelayAgentConnection(nil)
		relayAgentConnectionRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		relayAgentConnectionRef01ListResult, err := relayAgentConnectionRef01Ent.List(relayAgentConnectionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, relayAgentConnectionRef01ListOk := relayAgentConnectionRef01ListResult.([]any)
		if !relayAgentConnectionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", relayAgentConnectionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		relayAgentConnectionRef01MatchDt0 := map[string]any{
			"id": relayAgentConnectionRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			relayAgentConnectionRef01MatchDt0["agent_id"] = v
		} else {
			relayAgentConnectionRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			relayAgentConnectionRef01MatchDt0["organization_id"] = v
		} else {
			relayAgentConnectionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		relayAgentConnectionRef01DataDt0Loaded, err := relayAgentConnectionRef01Ent.Load(relayAgentConnectionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		relayAgentConnectionRef01DataDt0LoadResult := core.ToMapAny(entityData(relayAgentConnectionRef01DataDt0Loaded))
		if relayAgentConnectionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(relayAgentConnectionRef01DataDt0LoadResult["id"], relayAgentConnectionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, relay_agent_connectionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_RELAY_AGENT_CONNECTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		relayAgentConnectionRef01Ent := client.RelayAgentConnection(nil)
		relayAgentConnectionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "relay_agent_connection"}), "relay_agent_connection_ref01"))
		relayAgentConnectionRef01Data["agent_id"] = setup.idmap["agent01"]
		relayAgentConnectionRef01Data["organization_id"] = setup.idmap["organization01"]

		relayAgentConnectionRef01DataResult, err := relayAgentConnectionRef01Ent.Create(relayAgentConnectionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		relayAgentConnectionRef01Data = core.ToMapAny(entityData(relayAgentConnectionRef01DataResult))
		if relayAgentConnectionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if relayAgentConnectionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		relayAgentConnectionRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		relayAgentConnectionRef01ListResult, err := relayAgentConnectionRef01Ent.List(relayAgentConnectionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		relayAgentConnectionRef01List, relayAgentConnectionRef01ListOk := relayAgentConnectionRef01ListResult.([]any)
		if !relayAgentConnectionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", relayAgentConnectionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(relayAgentConnectionRef01List), map[string]any{"id": relayAgentConnectionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		relayAgentConnectionRef01DataUp0Up := map[string]any{
			"id": relayAgentConnectionRef01Data["id"],
			"agent_id": setup.idmap["agent_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		relayAgentConnectionRef01MarkdefUp0Name := "agent_card_url"
		relayAgentConnectionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-relay_agent_connection_ref01_%d", setup.now)
		relayAgentConnectionRef01DataUp0Up[relayAgentConnectionRef01MarkdefUp0Name] = relayAgentConnectionRef01MarkdefUp0Value

		relayAgentConnectionRef01ResdataUp0Result, err := relayAgentConnectionRef01Ent.Update(relayAgentConnectionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		relayAgentConnectionRef01ResdataUp0 := core.ToMapAny(entityData(relayAgentConnectionRef01ResdataUp0Result))
		if relayAgentConnectionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(relayAgentConnectionRef01ResdataUp0["id"], relayAgentConnectionRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if relayAgentConnectionRef01ResdataUp0[relayAgentConnectionRef01MarkdefUp0Name] != relayAgentConnectionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", relayAgentConnectionRef01MarkdefUp0Name, relayAgentConnectionRef01ResdataUp0[relayAgentConnectionRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		relayAgentConnectionRef01MatchDt0 := map[string]any{
			"id": relayAgentConnectionRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			relayAgentConnectionRef01MatchDt0["agent_id"] = v
		} else {
			relayAgentConnectionRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			relayAgentConnectionRef01MatchDt0["organization_id"] = v
		} else {
			relayAgentConnectionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		relayAgentConnectionRef01DataDt0Loaded, err := relayAgentConnectionRef01Ent.Load(relayAgentConnectionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		relayAgentConnectionRef01DataDt0LoadResult := core.ToMapAny(entityData(relayAgentConnectionRef01DataDt0Loaded))
		if relayAgentConnectionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(relayAgentConnectionRef01DataDt0LoadResult["id"], relayAgentConnectionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		relayAgentConnectionRef01MatchRm0 := map[string]any{
			"id": relayAgentConnectionRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			relayAgentConnectionRef01MatchRm0["agent_id"] = v
		} else {
			relayAgentConnectionRef01MatchRm0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			relayAgentConnectionRef01MatchRm0["organization_id"] = v
		} else {
			relayAgentConnectionRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = relayAgentConnectionRef01Ent.Remove(relayAgentConnectionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		relayAgentConnectionRef01MatchRt0 := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		relayAgentConnectionRef01ListRt0Result, err := relayAgentConnectionRef01Ent.List(relayAgentConnectionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		relayAgentConnectionRef01ListRt0, relayAgentConnectionRef01ListRt0Ok := relayAgentConnectionRef01ListRt0Result.([]any)
		if !relayAgentConnectionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", relayAgentConnectionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(relayAgentConnectionRef01ListRt0), map[string]any{"id": relayAgentConnectionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func relay_agent_connectionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "relay_agent_connection", "RelayAgentConnectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read relay_agent_connection test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse relay_agent_connection test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"relay_agent_connection01", "relay_agent_connection02", "relay_agent_connection03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_RELAY_AGENT_CONNECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_RELAY_AGENT_CONNECTION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_RELAY_AGENT_CONNECTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add agent_id alias for update test.
	if idmapResolved["agent_id"] == nil {
		idmapResolved["agent_id"] = idmapResolved["agent01"]
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
