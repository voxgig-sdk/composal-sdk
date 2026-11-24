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
const agent_skillEntityLiveStrict = true


func TestAgentSkillEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentSkill(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentSkillEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentSkill(nil).Load(map[string]any{"id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_skillBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_skill." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_skill.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_skills\"}")
			t.Log("LIVE STEP {\"id\":\"agent_skill.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_skills/{id}/audience\"}")
			t.Log("LIVE STEP {\"id\":\"agent_skill.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only agent_skill.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"agent_skill.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_skills/{id}\"}")
			t.Skip("Live coverage incomplete: agent_skill.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_skills); agent_skill.update.1 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_skills/{id}/audience); agent_skill.load.2 excluded (GET-only live run: reads a record only agent_skill.create.0 gives); agent_skill.remove.3 excluded (GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_skills/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_skillEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_SKILL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		agentSkillRef01Ent := client.AgentSkill(nil)
		agentSkillRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "agent_skill"}), "agent_skill_ref01"))
		agentSkillRef01Data["organization_id"] = setup.idmap["organization01"]

		agentSkillRef01DataResult, err := agentSkillRef01Ent.Create(agentSkillRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		agentSkillRef01Data = core.ToMapAny(entityData(agentSkillRef01DataResult))
		if agentSkillRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if agentSkillRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentSkillRef01MatchDt0 := map[string]any{
			"id": agentSkillRef01Data["id"],
		}
		agentSkillRef01DataDt0Loaded, err := agentSkillRef01Ent.Load(agentSkillRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentSkillRef01DataDt0LoadResult := core.ToMapAny(entityData(agentSkillRef01DataDt0Loaded))
		if agentSkillRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(agentSkillRef01DataDt0LoadResult["id"], agentSkillRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		agentSkillRef01MatchRm0 := map[string]any{
			"id": agentSkillRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentSkillRef01MatchRm0["organization_id"] = v
		} else {
			agentSkillRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = agentSkillRef01Ent.Remove(agentSkillRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func agent_skillBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_skill", "AgentSkillTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_skill test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_skill test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_skill01", "agent_skill02", "agent_skill03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_SKILL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_SKILL_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_SKILL_ENTID"])
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
