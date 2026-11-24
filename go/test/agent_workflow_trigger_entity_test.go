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
const agent_workflow_triggerEntityLiveStrict = true


func TestAgentWorkflowTriggerEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentWorkflowTrigger(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentWorkflowTriggerEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentWorkflowTrigger(nil).List(map[string]any{"agent_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_workflow_triggerBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_workflow_trigger." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_workflow_trigger.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_workflow_triggerEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["agent_workflow_trigger01"]
			}
			livePace()
			liveExisting(t, agent_workflow_triggerEntityLiveStrict, setup.data, "agent_workflow_trigger", "id", _liveId,
				func() (any, error) {
					return client.AgentWorkflowTrigger(nil).List(map[string]any{"agent_id": setup.idmap["agent01"], "organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		agentWorkflowTriggerRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_workflow_trigger")))
		var agentWorkflowTriggerRef01Data map[string]any
		if len(agentWorkflowTriggerRef01DataRaw) > 0 {
			agentWorkflowTriggerRef01Data = core.ToMapAny(agentWorkflowTriggerRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentWorkflowTriggerRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentWorkflowTriggerRef01Ent := client.AgentWorkflowTrigger(nil)
		agentWorkflowTriggerRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentWorkflowTriggerRef01ListResult, err := agentWorkflowTriggerRef01Ent.List(agentWorkflowTriggerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentWorkflowTriggerRef01ListOk := agentWorkflowTriggerRef01ListResult.([]any)
		if !agentWorkflowTriggerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentWorkflowTriggerRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentWorkflowTriggerRef01MatchDt0 := map[string]any{
			"id": agentWorkflowTriggerRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			agentWorkflowTriggerRef01MatchDt0["agent_id"] = v
		} else {
			agentWorkflowTriggerRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentWorkflowTriggerRef01MatchDt0["organization_id"] = v
		} else {
			agentWorkflowTriggerRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentWorkflowTriggerRef01DataDt0Loaded, err := agentWorkflowTriggerRef01Ent.Load(agentWorkflowTriggerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentWorkflowTriggerRef01DataDt0LoadResult := core.ToMapAny(entityData(agentWorkflowTriggerRef01DataDt0Loaded))
		if agentWorkflowTriggerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentWorkflowTriggerRef01DataDt0LoadResult["id"], agentWorkflowTriggerRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_workflow_triggerEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, agent_workflow_triggerEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a agent_workflow_trigger record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		agentWorkflowTriggerRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_workflow_trigger")))
		var agentWorkflowTriggerRef01Data map[string]any
		if len(agentWorkflowTriggerRef01DataRaw) > 0 {
			agentWorkflowTriggerRef01Data = core.ToMapAny(agentWorkflowTriggerRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentWorkflowTriggerRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentWorkflowTriggerRef01Ent := client.AgentWorkflowTrigger(nil)
		agentWorkflowTriggerRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentWorkflowTriggerRef01ListResult, err := agentWorkflowTriggerRef01Ent.List(agentWorkflowTriggerRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentWorkflowTriggerRef01ListOk := agentWorkflowTriggerRef01ListResult.([]any)
		if !agentWorkflowTriggerRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentWorkflowTriggerRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		agentWorkflowTriggerRef01DataUp0Up := map[string]any{
			"id": agentWorkflowTriggerRef01Data["id"],
			"agent_id": setup.idmap["agent_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		agentWorkflowTriggerRef01MarkdefUp0Name := "day_resets_at"
		agentWorkflowTriggerRef01MarkdefUp0Value := fmt.Sprintf("Mark01-agent_workflow_trigger_ref01_%d", setup.now)
		agentWorkflowTriggerRef01DataUp0Up[agentWorkflowTriggerRef01MarkdefUp0Name] = agentWorkflowTriggerRef01MarkdefUp0Value

		agentWorkflowTriggerRef01ResdataUp0Result, err := agentWorkflowTriggerRef01Ent.Update(agentWorkflowTriggerRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		agentWorkflowTriggerRef01ResdataUp0 := core.ToMapAny(entityData(agentWorkflowTriggerRef01ResdataUp0Result))
		if agentWorkflowTriggerRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(agentWorkflowTriggerRef01ResdataUp0["id"], agentWorkflowTriggerRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if agentWorkflowTriggerRef01ResdataUp0[agentWorkflowTriggerRef01MarkdefUp0Name] != agentWorkflowTriggerRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", agentWorkflowTriggerRef01MarkdefUp0Name, agentWorkflowTriggerRef01ResdataUp0[agentWorkflowTriggerRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentWorkflowTriggerRef01MatchDt0 := map[string]any{
			"id": agentWorkflowTriggerRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			agentWorkflowTriggerRef01MatchDt0["agent_id"] = v
		} else {
			agentWorkflowTriggerRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentWorkflowTriggerRef01MatchDt0["organization_id"] = v
		} else {
			agentWorkflowTriggerRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentWorkflowTriggerRef01DataDt0Loaded, err := agentWorkflowTriggerRef01Ent.Load(agentWorkflowTriggerRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentWorkflowTriggerRef01DataDt0LoadResult := core.ToMapAny(entityData(agentWorkflowTriggerRef01DataDt0Loaded))
		if agentWorkflowTriggerRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentWorkflowTriggerRef01DataDt0LoadResult["id"], agentWorkflowTriggerRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func agent_workflow_triggerBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_workflow_trigger", "AgentWorkflowTriggerTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_workflow_trigger test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_workflow_trigger test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_workflow_trigger01", "agent_workflow_trigger02", "agent_workflow_trigger03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID"])
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
