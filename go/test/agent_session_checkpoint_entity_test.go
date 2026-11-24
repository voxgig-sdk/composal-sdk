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
const agent_session_checkpointEntityLiveStrict = true


func TestAgentSessionCheckpointEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentSessionCheckpoint(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentSessionCheckpointEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentSessionCheckpoint(nil).Load(map[string]any{"agent_session_id": 1, "organization_id": "x", "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_session_checkpointBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_session_checkpoint." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_session_checkpoint.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize\"}")
			t.Log("LIVE STEP {\"id\":\"agent_session_checkpoint.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only agent_session_checkpoint.create.0 gives\"}")
			t.Skip("Live coverage incomplete: agent_session_checkpoint.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize); agent_session_checkpoint.load.1 excluded (GET-only live run: reads a record only agent_session_checkpoint.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent_session01", "organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_session_checkpointEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_SESSION_CHECKPOINT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentSessionCheckpointRef01Ent := client.AgentSessionCheckpoint(nil)
		agentSessionCheckpointRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent_session_checkpoint"}), "agent_session_checkpoint_ref01"))
		agentSessionCheckpointRef01Data["agent_session_id"] = setup.idmap["agent_session01"]
		agentSessionCheckpointRef01Data["organization_id"] = setup.idmap["organization01"]
		agentSessionCheckpointRef01Data["repo_id"] = setup.idmap["repo01"]

		agentSessionCheckpointRef01DataResult, err := agentSessionCheckpointRef01Ent.Create(agentSessionCheckpointRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentSessionCheckpointRef01Data = core.ToMapAny(entityData(agentSessionCheckpointRef01DataResult))
		if agentSessionCheckpointRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if agentSessionCheckpointRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentSessionCheckpointRef01MatchDt0 := map[string]any{
			"id": agentSessionCheckpointRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentSessionCheckpointRef01MatchDt0["organization_id"] = v
		} else {
			agentSessionCheckpointRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			agentSessionCheckpointRef01MatchDt0["repo_id"] = v
		} else {
			agentSessionCheckpointRef01MatchDt0["repo_id"] = setup.idmap["repo01"]
		}
		agentSessionCheckpointRef01DataDt0Loaded, err := agentSessionCheckpointRef01Ent.Load(agentSessionCheckpointRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentSessionCheckpointRef01DataDt0LoadResult := core.ToMapAny(entityData(agentSessionCheckpointRef01DataDt0Loaded))
		if agentSessionCheckpointRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(agentSessionCheckpointRef01DataDt0LoadResult["id"], agentSessionCheckpointRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func agent_session_checkpointBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_session_checkpoint", "AgentSessionCheckpointTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_session_checkpoint test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_session_checkpoint test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_session_checkpoint01", "agent_session_checkpoint02", "agent_session_checkpoint03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03", "agent_session01", "agent_session02", "agent_session03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_SESSION_CHECKPOINT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_SESSION_CHECKPOINT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_SESSION_CHECKPOINT_ENTID"])
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
