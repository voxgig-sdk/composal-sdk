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
const project_messaging_conversationEntityLiveStrict = true


func TestProjectMessagingConversationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ProjectMessagingConversation(nil)
		if ent == nil {
			t.Fatal("expected non-nil ProjectMessagingConversationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ProjectMessagingConversation(nil).Load(map[string]any{"id": 1, "organization_id": "x", "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := project_messaging_conversationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "project_messaging_conversation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"project_messaging_conversation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read\"}")
			t.Log("LIVE STEP {\"id\":\"project_messaging_conversation.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"project_messaging_conversation.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only project_messaging_conversation.create.0 gives\"}")
			t.Skip("Live coverage incomplete: project_messaging_conversation.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read); project_messaging_conversation.update.1 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}); project_messaging_conversation.load.2 excluded (GET-only live run: reads a record only project_messaging_conversation.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_messaging_conversationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_MESSAGING_CONVERSATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		projectMessagingConversationRef01Ent := client.ProjectMessagingConversation(nil)
		projectMessagingConversationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "project_messaging_conversation"}), "project_messaging_conversation_ref01"))
		projectMessagingConversationRef01Data["organization_id"] = setup.idmap["organization01"]
		projectMessagingConversationRef01Data["project_id"] = setup.idmap["project01"]

		projectMessagingConversationRef01DataResult, err := projectMessagingConversationRef01Ent.Create(projectMessagingConversationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		projectMessagingConversationRef01Data = core.ToMapAny(entityData(projectMessagingConversationRef01DataResult))
		if projectMessagingConversationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if projectMessagingConversationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		projectMessagingConversationRef01DataUp0Up := map[string]any{
			"id": projectMessagingConversationRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"project_id": setup.idmap["project_id"],
		}

		projectMessagingConversationRef01MarkdefUp0Name := "assistant_number"
		projectMessagingConversationRef01MarkdefUp0Value := fmt.Sprintf("Mark01-project_messaging_conversation_ref01_%d", setup.now)
		projectMessagingConversationRef01DataUp0Up[projectMessagingConversationRef01MarkdefUp0Name] = projectMessagingConversationRef01MarkdefUp0Value

		projectMessagingConversationRef01ResdataUp0Result, err := projectMessagingConversationRef01Ent.Update(projectMessagingConversationRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		projectMessagingConversationRef01ResdataUp0 := core.ToMapAny(entityData(projectMessagingConversationRef01ResdataUp0Result))
		if projectMessagingConversationRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(projectMessagingConversationRef01ResdataUp0["id"], projectMessagingConversationRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if projectMessagingConversationRef01ResdataUp0[projectMessagingConversationRef01MarkdefUp0Name] != projectMessagingConversationRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", projectMessagingConversationRef01MarkdefUp0Name, projectMessagingConversationRef01ResdataUp0[projectMessagingConversationRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectMessagingConversationRef01MatchDt0 := map[string]any{
			"id": projectMessagingConversationRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectMessagingConversationRef01MatchDt0["organization_id"] = v
		} else {
			projectMessagingConversationRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			projectMessagingConversationRef01MatchDt0["project_id"] = v
		} else {
			projectMessagingConversationRef01MatchDt0["project_id"] = setup.idmap["project01"]
		}
		projectMessagingConversationRef01DataDt0Loaded, err := projectMessagingConversationRef01Ent.Load(projectMessagingConversationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectMessagingConversationRef01DataDt0LoadResult := core.ToMapAny(entityData(projectMessagingConversationRef01DataDt0Loaded))
		if projectMessagingConversationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(projectMessagingConversationRef01DataDt0LoadResult["id"], projectMessagingConversationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func project_messaging_conversationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "project_messaging_conversation", "ProjectMessagingConversationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read project_messaging_conversation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse project_messaging_conversation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"project_messaging_conversation01", "project_messaging_conversation02", "project_messaging_conversation03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PROJECT_MESSAGING_CONVERSATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PROJECT_MESSAGING_CONVERSATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PROJECT_MESSAGING_CONVERSATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add organization_id alias for update test.
	if idmapResolved["organization_id"] == nil {
		idmapResolved["organization_id"] = idmapResolved["organization01"]
	}
	// Add project_id alias for update test.
	if idmapResolved["project_id"] == nil {
		idmapResolved["project_id"] = idmapResolved["project01"]
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
