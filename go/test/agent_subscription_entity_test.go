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
const agent_subscriptionEntityLiveStrict = true


func TestAgentSubscriptionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentSubscription(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentSubscriptionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentSubscription(nil).Load(map[string]any{"agent_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_subscriptionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_subscription." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_subscription.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		agentSubscriptionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_subscription")))
		var agentSubscriptionRef01Data map[string]any
		if len(agentSubscriptionRef01DataRaw) > 0 {
			agentSubscriptionRef01Data = core.ToMapAny(agentSubscriptionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentSubscriptionRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		agentSubscriptionRef01Ent := client.AgentSubscription(nil)
		agentSubscriptionRef01MatchDt0 := map[string]any{}
		if v := setup.idmap["organization_id"]; v != nil {
			agentSubscriptionRef01MatchDt0["organization_id"] = v
		} else {
			agentSubscriptionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentSubscriptionRef01DataDt0Loaded, err := agentSubscriptionRef01Ent.Load(agentSubscriptionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if agentSubscriptionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_subscriptionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_SUBSCRIPTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentSubscriptionRef01Ent := client.AgentSubscription(nil)
		agentSubscriptionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent_subscription"}), "agent_subscription_ref01"))
		agentSubscriptionRef01Data["agent_id"] = setup.idmap["agent01"]
		agentSubscriptionRef01Data["organization_id"] = setup.idmap["organization01"]

		agentSubscriptionRef01DataResult, err := agentSubscriptionRef01Ent.Create(agentSubscriptionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentSubscriptionRef01Data = core.ToMapAny(entityData(agentSubscriptionRef01DataResult))
		if agentSubscriptionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentSubscriptionRef01MatchDt0 := map[string]any{}
		if v := setup.idmap["organization_id"]; v != nil {
			agentSubscriptionRef01MatchDt0["organization_id"] = v
		} else {
			agentSubscriptionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentSubscriptionRef01DataDt0Loaded, err := agentSubscriptionRef01Ent.Load(agentSubscriptionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if agentSubscriptionRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func agent_subscriptionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_subscription", "AgentSubscriptionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_subscription test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_subscription test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_subscription01", "agent_subscription02", "agent_subscription03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_SUBSCRIPTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_SUBSCRIPTION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_SUBSCRIPTION_ENTID"])
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
