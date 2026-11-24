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
const agent_automationEntityLiveStrict = true


func TestAgentAutomationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentAutomation(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentAutomationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentAutomation(nil).List(map[string]any{"agent_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_automationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_automation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_automation.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_automationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_AUTOMATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["agent_automation01"]
			}
			livePace()
			liveExisting(t, agent_automationEntityLiveStrict, setup.data, "agent_automation", "id", _liveId,
				func() (any, error) {
					return client.AgentAutomation(nil).List(map[string]any{"agent_id": setup.idmap["agent01"], "organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		agentAutomationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_automation")))
		var agentAutomationRef01Data map[string]any
		if len(agentAutomationRef01DataRaw) > 0 {
			agentAutomationRef01Data = core.ToMapAny(agentAutomationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentAutomationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentAutomationRef01Ent := client.AgentAutomation(nil)
		agentAutomationRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentAutomationRef01ListResult, err := agentAutomationRef01Ent.List(agentAutomationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentAutomationRef01ListOk := agentAutomationRef01ListResult.([]any)
		if !agentAutomationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentAutomationRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentAutomationRef01MatchDt0 := map[string]any{
			"id": agentAutomationRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			agentAutomationRef01MatchDt0["agent_id"] = v
		} else {
			agentAutomationRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentAutomationRef01MatchDt0["organization_id"] = v
		} else {
			agentAutomationRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentAutomationRef01DataDt0Loaded, err := agentAutomationRef01Ent.Load(agentAutomationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentAutomationRef01DataDt0LoadResult := core.ToMapAny(entityData(agentAutomationRef01DataDt0Loaded))
		if agentAutomationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentAutomationRef01DataDt0LoadResult["id"], agentAutomationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_automationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_AUTOMATION_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, agent_automationEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a agent_automation record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		agentAutomationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_automation")))
		var agentAutomationRef01Data map[string]any
		if len(agentAutomationRef01DataRaw) > 0 {
			agentAutomationRef01Data = core.ToMapAny(agentAutomationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentAutomationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentAutomationRef01Ent := client.AgentAutomation(nil)
		agentAutomationRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentAutomationRef01ListResult, err := agentAutomationRef01Ent.List(agentAutomationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentAutomationRef01ListOk := agentAutomationRef01ListResult.([]any)
		if !agentAutomationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentAutomationRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		agentAutomationRef01DataUp0Up := map[string]any{
			"id": agentAutomationRef01Data["id"],
			"agent_id": setup.idmap["agent_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		agentAutomationRef01MarkdefUp0Name := "key"
		agentAutomationRef01MarkdefUp0Value := fmt.Sprintf("Mark01-agent_automation_ref01_%d", setup.now)
		agentAutomationRef01DataUp0Up[agentAutomationRef01MarkdefUp0Name] = agentAutomationRef01MarkdefUp0Value

		agentAutomationRef01ResdataUp0Result, err := agentAutomationRef01Ent.Update(agentAutomationRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		agentAutomationRef01ResdataUp0 := core.ToMapAny(entityData(agentAutomationRef01ResdataUp0Result))
		if agentAutomationRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(agentAutomationRef01ResdataUp0["id"], agentAutomationRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if agentAutomationRef01ResdataUp0[agentAutomationRef01MarkdefUp0Name] != agentAutomationRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", agentAutomationRef01MarkdefUp0Name, agentAutomationRef01ResdataUp0[agentAutomationRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentAutomationRef01MatchDt0 := map[string]any{
			"id": agentAutomationRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			agentAutomationRef01MatchDt0["agent_id"] = v
		} else {
			agentAutomationRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentAutomationRef01MatchDt0["organization_id"] = v
		} else {
			agentAutomationRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentAutomationRef01DataDt0Loaded, err := agentAutomationRef01Ent.Load(agentAutomationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentAutomationRef01DataDt0LoadResult := core.ToMapAny(entityData(agentAutomationRef01DataDt0Loaded))
		if agentAutomationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentAutomationRef01DataDt0LoadResult["id"], agentAutomationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func agent_automationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_automation", "AgentAutomationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_automation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_automation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_automation01", "agent_automation02", "agent_automation03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_AUTOMATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_AUTOMATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_AUTOMATION_ENTID"])
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
