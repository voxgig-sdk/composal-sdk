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
const agent_connection_trigger_subscriptionEntityLiveStrict = true


func TestAgentConnectionTriggerSubscriptionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentConnectionTriggerSubscription(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentConnectionTriggerSubscriptionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentConnectionTriggerSubscription(nil).List(map[string]any{"agent_connection_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_connection_trigger_subscriptionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_connection_trigger_subscription." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_connection_trigger_subscription.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover\"}")
			t.Log("LIVE STEP {\"id\":\"agent_connection_trigger_subscription.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"agent_connection_trigger_subscription.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"agent_connection_trigger_subscription.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent_connection01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_connection_trigger_subscriptionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		agentConnectionTriggerSubscriptionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_connection_trigger_subscription")))
		var agentConnectionTriggerSubscriptionRef01Data map[string]any
		if len(agentConnectionTriggerSubscriptionRef01DataRaw) > 0 {
			agentConnectionTriggerSubscriptionRef01Data = core.ToMapAny(agentConnectionTriggerSubscriptionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentConnectionTriggerSubscriptionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentConnectionTriggerSubscriptionRef01Ent := client.AgentConnectionTriggerSubscription(nil)
		agentConnectionTriggerSubscriptionRef01Match := map[string]any{
			"agent_connection_id": setup.idmap["agent_connection01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentConnectionTriggerSubscriptionRef01ListResult, err := agentConnectionTriggerSubscriptionRef01Ent.List(agentConnectionTriggerSubscriptionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentConnectionTriggerSubscriptionRef01ListOk := agentConnectionTriggerSubscriptionRef01ListResult.([]any)
		if !agentConnectionTriggerSubscriptionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentConnectionTriggerSubscriptionRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent_connection01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_connection_trigger_subscriptionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentConnectionTriggerSubscriptionRef01Ent := client.AgentConnectionTriggerSubscription(nil)
		agentConnectionTriggerSubscriptionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent_connection_trigger_subscription"}), "agent_connection_trigger_subscription_ref01"))
		agentConnectionTriggerSubscriptionRef01Data["agent_connection_id"] = setup.idmap["agent_connection01"]
		agentConnectionTriggerSubscriptionRef01Data["organization_id"] = setup.idmap["organization01"]

		agentConnectionTriggerSubscriptionRef01DataResult, err := agentConnectionTriggerSubscriptionRef01Ent.Create(agentConnectionTriggerSubscriptionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentConnectionTriggerSubscriptionRef01Data = core.ToMapAny(entityData(agentConnectionTriggerSubscriptionRef01DataResult))
		if agentConnectionTriggerSubscriptionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if agentConnectionTriggerSubscriptionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentConnectionTriggerSubscriptionRef01Match := map[string]any{
			"agent_connection_id": setup.idmap["agent_connection01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentConnectionTriggerSubscriptionRef01ListResult, err := agentConnectionTriggerSubscriptionRef01Ent.List(agentConnectionTriggerSubscriptionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		agentConnectionTriggerSubscriptionRef01List, agentConnectionTriggerSubscriptionRef01ListOk := agentConnectionTriggerSubscriptionRef01ListResult.([]any)
		if !agentConnectionTriggerSubscriptionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentConnectionTriggerSubscriptionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(agentConnectionTriggerSubscriptionRef01List), map[string]any{"id": agentConnectionTriggerSubscriptionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		agentConnectionTriggerSubscriptionRef01DataUp0Up := map[string]any{
			"id": agentConnectionTriggerSubscriptionRef01Data["id"],
			"agent_connection_id": setup.idmap["agent_connection_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		agentConnectionTriggerSubscriptionRef01MarkdefUp0Name := "created_at"
		agentConnectionTriggerSubscriptionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-agent_connection_trigger_subscription_ref01_%d", setup.now)
		agentConnectionTriggerSubscriptionRef01DataUp0Up[agentConnectionTriggerSubscriptionRef01MarkdefUp0Name] = agentConnectionTriggerSubscriptionRef01MarkdefUp0Value

		agentConnectionTriggerSubscriptionRef01ResdataUp0Result, err := agentConnectionTriggerSubscriptionRef01Ent.Update(agentConnectionTriggerSubscriptionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		agentConnectionTriggerSubscriptionRef01ResdataUp0 := core.ToMapAny(entityData(agentConnectionTriggerSubscriptionRef01ResdataUp0Result))
		if agentConnectionTriggerSubscriptionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(agentConnectionTriggerSubscriptionRef01ResdataUp0["id"], agentConnectionTriggerSubscriptionRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if agentConnectionTriggerSubscriptionRef01ResdataUp0[agentConnectionTriggerSubscriptionRef01MarkdefUp0Name] != agentConnectionTriggerSubscriptionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", agentConnectionTriggerSubscriptionRef01MarkdefUp0Name, agentConnectionTriggerSubscriptionRef01ResdataUp0[agentConnectionTriggerSubscriptionRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		agentConnectionTriggerSubscriptionRef01MatchRm0 := map[string]any{
			"id": agentConnectionTriggerSubscriptionRef01Data["id"],
		}
		if v := setup.idmap["agent_connection_id"]; v != nil {
			agentConnectionTriggerSubscriptionRef01MatchRm0["agent_connection_id"] = v
		} else {
			agentConnectionTriggerSubscriptionRef01MatchRm0["agent_connection_id"] = setup.idmap["agent_connection01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentConnectionTriggerSubscriptionRef01MatchRm0["organization_id"] = v
		} else {
			agentConnectionTriggerSubscriptionRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = agentConnectionTriggerSubscriptionRef01Ent.Remove(agentConnectionTriggerSubscriptionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentConnectionTriggerSubscriptionRef01MatchRt0 := map[string]any{
			"agent_connection_id": setup.idmap["agent_connection01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentConnectionTriggerSubscriptionRef01ListRt0Result, err := agentConnectionTriggerSubscriptionRef01Ent.List(agentConnectionTriggerSubscriptionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		agentConnectionTriggerSubscriptionRef01ListRt0, agentConnectionTriggerSubscriptionRef01ListRt0Ok := agentConnectionTriggerSubscriptionRef01ListRt0Result.([]any)
		if !agentConnectionTriggerSubscriptionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", agentConnectionTriggerSubscriptionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(agentConnectionTriggerSubscriptionRef01ListRt0), map[string]any{"id": agentConnectionTriggerSubscriptionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func agent_connection_trigger_subscriptionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_connection_trigger_subscription", "AgentConnectionTriggerSubscriptionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_connection_trigger_subscription test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_connection_trigger_subscription test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_connection_trigger_subscription01", "agent_connection_trigger_subscription02", "agent_connection_trigger_subscription03", "organization01", "organization02", "organization03", "agent_connection01", "agent_connection02", "agent_connection03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add agent_connection_id alias for update test.
	if idmapResolved["agent_connection_id"] == nil {
		idmapResolved["agent_connection_id"] = idmapResolved["agent_connection01"]
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
