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
const agent_workflowEntityLiveStrict = true


func TestAgentWorkflowEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentWorkflow(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentWorkflowEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentWorkflow(nil).List(map[string]any{"agent_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_workflowBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_workflow." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_workflow.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows\"}")
			t.Log("LIVE STEP {\"id\":\"agent_workflow.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_workflowEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_WORKFLOW_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		agentWorkflowRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_workflow")))
		var agentWorkflowRef01Data map[string]any
		if len(agentWorkflowRef01DataRaw) > 0 {
			agentWorkflowRef01Data = core.ToMapAny(agentWorkflowRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentWorkflowRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentWorkflowRef01Ent := client.AgentWorkflow(nil)
		agentWorkflowRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentWorkflowRef01ListResult, err := agentWorkflowRef01Ent.List(agentWorkflowRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentWorkflowRef01ListOk := agentWorkflowRef01ListResult.([]any)
		if !agentWorkflowRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentWorkflowRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_workflowEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_WORKFLOW_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentWorkflowRef01Ent := client.AgentWorkflow(nil)
		agentWorkflowRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent_workflow"}), "agent_workflow_ref01"))
		agentWorkflowRef01Data["agent_id"] = setup.idmap["agent01"]
		agentWorkflowRef01Data["organization_id"] = setup.idmap["organization01"]

		agentWorkflowRef01DataResult, err := agentWorkflowRef01Ent.Create(agentWorkflowRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentWorkflowRef01Data = core.ToMapAny(entityData(agentWorkflowRef01DataResult))
		if agentWorkflowRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		agentWorkflowRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		agentWorkflowRef01ListResult, err := agentWorkflowRef01Ent.List(agentWorkflowRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentWorkflowRef01ListOk := agentWorkflowRef01ListResult.([]any)
		if !agentWorkflowRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentWorkflowRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		agentWorkflowRef01DataUp0Up := map[string]any{
			"organization_id": setup.idmap["organization_id"],
		}

		agentWorkflowRef01MarkdefUp0Name := "expected_digest"
		agentWorkflowRef01MarkdefUp0Value := fmt.Sprintf("Mark01-agent_workflow_ref01_%d", setup.now)
		agentWorkflowRef01DataUp0Up[agentWorkflowRef01MarkdefUp0Name] = agentWorkflowRef01MarkdefUp0Value

		agentWorkflowRef01ResdataUp0Result, err := agentWorkflowRef01Ent.Update(agentWorkflowRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		agentWorkflowRef01ResdataUp0 := core.ToMapAny(entityData(agentWorkflowRef01ResdataUp0Result))
		if agentWorkflowRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if agentWorkflowRef01ResdataUp0[agentWorkflowRef01MarkdefUp0Name] != agentWorkflowRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", agentWorkflowRef01MarkdefUp0Name, agentWorkflowRef01ResdataUp0[agentWorkflowRef01MarkdefUp0Name])
		}

	})
}

func agent_workflowBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_workflow", "AgentWorkflowTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_workflow test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_workflow test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_workflow01", "agent_workflow02", "agent_workflow03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_WORKFLOW_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_WORKFLOW_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_WORKFLOW_ENTID"])
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
