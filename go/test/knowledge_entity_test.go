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
const knowledgeEntityLiveStrict = true


func TestKnowledgeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Knowledge(nil)
		if ent == nil {
			t.Fatal("expected non-nil KnowledgeEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Knowledge(nil).Load(map[string]any{"id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := knowledgeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "knowledge." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"knowledge.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/knowledge\"}")
			t.Log("LIVE STEP {\"id\":\"knowledge.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/knowledge/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"knowledge.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only knowledge.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"knowledge.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/knowledge/{id}\"}")
			t.Skip("Live coverage incomplete: knowledge.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/knowledge); knowledge.update.1 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/knowledge/{id}); knowledge.load.2 excluded (GET-only live run: reads a record only knowledge.create.0 gives); knowledge.remove.3 excluded (GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/knowledge/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, knowledgeEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_KNOWLEDGE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		knowledgeRef01Ent := client.Knowledge(nil)
		knowledgeRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "knowledge"}), "knowledge_ref01"))
		knowledgeRef01Data["organization_id"] = setup.idmap["organization01"]

		knowledgeRef01DataResult, err := knowledgeRef01Ent.Create(knowledgeRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		knowledgeRef01Data = core.ToMapAny(entityData(knowledgeRef01DataResult))
		if knowledgeRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if knowledgeRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		knowledgeRef01DataUp0Up := map[string]any{
			"id": knowledgeRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		knowledgeRef01MarkdefUp0Name := "content_digest"
		knowledgeRef01MarkdefUp0Value := fmt.Sprintf("Mark01-knowledge_ref01_%d", setup.now)
		knowledgeRef01DataUp0Up[knowledgeRef01MarkdefUp0Name] = knowledgeRef01MarkdefUp0Value

		knowledgeRef01ResdataUp0Result, err := knowledgeRef01Ent.Update(knowledgeRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		knowledgeRef01ResdataUp0 := core.ToMapAny(entityData(knowledgeRef01ResdataUp0Result))
		if knowledgeRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(knowledgeRef01ResdataUp0["id"], knowledgeRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if knowledgeRef01ResdataUp0[knowledgeRef01MarkdefUp0Name] != knowledgeRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", knowledgeRef01MarkdefUp0Name, knowledgeRef01ResdataUp0[knowledgeRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		knowledgeRef01MatchDt0 := map[string]any{
			"id": knowledgeRef01Data["id"],
		}
		knowledgeRef01DataDt0Loaded, err := knowledgeRef01Ent.Load(knowledgeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		knowledgeRef01DataDt0LoadResult := core.ToMapAny(entityData(knowledgeRef01DataDt0Loaded))
		if knowledgeRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(knowledgeRef01DataDt0LoadResult["id"], knowledgeRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		knowledgeRef01MatchRm0 := map[string]any{
			"id": knowledgeRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			knowledgeRef01MatchRm0["organization_id"] = v
		} else {
			knowledgeRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = knowledgeRef01Ent.Remove(knowledgeRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func knowledgeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "knowledge", "KnowledgeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read knowledge test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse knowledge test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"knowledge01", "knowledge02", "knowledge03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_KNOWLEDGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_KNOWLEDGE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_KNOWLEDGE_ENTID"])
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
