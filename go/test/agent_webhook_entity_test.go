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
const agent_webhookEntityLiveStrict = true


func TestAgentWebhookEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentWebhook(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentWebhookEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentWebhook(nil).Load(map[string]any{"agent_id": 1, "id": "x", "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_webhookBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_webhook." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_webhook.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks\"}")
			t.Log("LIVE STEP {\"id\":\"agent_webhook.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks/{endpoint_id}\"}")
			t.Log("LIVE STEP {\"id\":\"agent_webhook.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only agent_webhook.create.0 gives\"}")
			t.Skip("Live coverage incomplete: agent_webhook.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks); agent_webhook.update.1 excluded (GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/webhooks/{endpoint_id}); agent_webhook.load.2 excluded (GET-only live run: reads a record only agent_webhook.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_webhookEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_WEBHOOK_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentWebhookRef01Ent := client.AgentWebhook(nil)
		agentWebhookRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent_webhook"}), "agent_webhook_ref01"))
		agentWebhookRef01Data["agent_id"] = setup.idmap["agent01"]
		agentWebhookRef01Data["organization_id"] = setup.idmap["organization01"]

		agentWebhookRef01DataResult, err := agentWebhookRef01Ent.Create(agentWebhookRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentWebhookRef01Data = core.ToMapAny(entityData(agentWebhookRef01DataResult))
		if agentWebhookRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if agentWebhookRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		agentWebhookRef01DataUp0Up := map[string]any{
			"id": agentWebhookRef01Data["id"],
			"agent_id": setup.idmap["agent_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		agentWebhookRef01MarkdefUp0Name := "action"
		agentWebhookRef01MarkdefUp0Value := fmt.Sprintf("Mark01-agent_webhook_ref01_%d", setup.now)
		agentWebhookRef01DataUp0Up[agentWebhookRef01MarkdefUp0Name] = agentWebhookRef01MarkdefUp0Value

		agentWebhookRef01ResdataUp0Result, err := agentWebhookRef01Ent.Update(agentWebhookRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		agentWebhookRef01ResdataUp0 := core.ToMapAny(entityData(agentWebhookRef01ResdataUp0Result))
		if agentWebhookRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(agentWebhookRef01ResdataUp0["id"], agentWebhookRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if agentWebhookRef01ResdataUp0[agentWebhookRef01MarkdefUp0Name] != agentWebhookRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", agentWebhookRef01MarkdefUp0Name, agentWebhookRef01ResdataUp0[agentWebhookRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentWebhookRef01MatchDt0 := map[string]any{
			"id": agentWebhookRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			agentWebhookRef01MatchDt0["agent_id"] = v
		} else {
			agentWebhookRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentWebhookRef01MatchDt0["organization_id"] = v
		} else {
			agentWebhookRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentWebhookRef01DataDt0Loaded, err := agentWebhookRef01Ent.Load(agentWebhookRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentWebhookRef01DataDt0LoadResult := core.ToMapAny(entityData(agentWebhookRef01DataDt0Loaded))
		if agentWebhookRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(agentWebhookRef01DataDt0LoadResult["id"], agentWebhookRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func agent_webhookBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_webhook", "AgentWebhookTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_webhook test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_webhook test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_webhook01", "agent_webhook02", "agent_webhook03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_WEBHOOK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_WEBHOOK_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_WEBHOOK_ENTID"])
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
