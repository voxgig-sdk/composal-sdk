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
const repo_agent_sessionEntityLiveStrict = true


func TestRepoAgentSessionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RepoAgentSession(nil)
		if ent == nil {
			t.Fatal("expected non-nil RepoAgentSessionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RepoAgentSession(nil).List(map[string]any{"organization_id": 1, "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := repo_agent_sessionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "repo_agent_session." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"repo_agent_session.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/complete\"}")
			t.Log("LIVE STEP {\"id\":\"repo_agent_session.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, repo_agent_sessionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_REPO_AGENT_SESSION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["repo_agent_session01"]
			}
			livePace()
			liveExisting(t, repo_agent_sessionEntityLiveStrict, setup.data, "repo_agent_session", "id", _liveId,
				func() (any, error) {
					return client.RepoAgentSession(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "repo_id": setup.idmap["repo01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		repoAgentSessionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.repo_agent_session")))
		var repoAgentSessionRef01Data map[string]any
		if len(repoAgentSessionRef01DataRaw) > 0 {
			repoAgentSessionRef01Data = core.ToMapAny(repoAgentSessionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = repoAgentSessionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		repoAgentSessionRef01Ent := client.RepoAgentSession(nil)
		repoAgentSessionRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		repoAgentSessionRef01ListResult, err := repoAgentSessionRef01Ent.List(repoAgentSessionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, repoAgentSessionRef01ListOk := repoAgentSessionRef01ListResult.([]any)
		if !repoAgentSessionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", repoAgentSessionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		repoAgentSessionRef01MatchDt0 := map[string]any{
			"id": repoAgentSessionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			repoAgentSessionRef01MatchDt0["organization_id"] = v
		} else {
			repoAgentSessionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			repoAgentSessionRef01MatchDt0["repo_id"] = v
		} else {
			repoAgentSessionRef01MatchDt0["repo_id"] = setup.idmap["repo01"]
		}
		repoAgentSessionRef01DataDt0Loaded, err := repoAgentSessionRef01Ent.Load(repoAgentSessionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		repoAgentSessionRef01DataDt0LoadResult := core.ToMapAny(entityData(repoAgentSessionRef01DataDt0Loaded))
		if repoAgentSessionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(repoAgentSessionRef01DataDt0LoadResult["id"], repoAgentSessionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, repo_agent_sessionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_REPO_AGENT_SESSION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		repoAgentSessionRef01Ent := client.RepoAgentSession(nil)
		repoAgentSessionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "repo_agent_session"}), "repo_agent_session_ref01"))
		repoAgentSessionRef01Data["organization_id"] = setup.idmap["organization01"]
		repoAgentSessionRef01Data["repo_id"] = setup.idmap["repo01"]

		repoAgentSessionRef01DataResult, err := repoAgentSessionRef01Ent.Create(repoAgentSessionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		repoAgentSessionRef01Data = core.ToMapAny(entityData(repoAgentSessionRef01DataResult))
		if repoAgentSessionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if repoAgentSessionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		repoAgentSessionRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		repoAgentSessionRef01ListResult, err := repoAgentSessionRef01Ent.List(repoAgentSessionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		repoAgentSessionRef01List, repoAgentSessionRef01ListOk := repoAgentSessionRef01ListResult.([]any)
		if !repoAgentSessionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", repoAgentSessionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(repoAgentSessionRef01List), map[string]any{"id": repoAgentSessionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		repoAgentSessionRef01DataUp0Up := map[string]any{
			"id": repoAgentSessionRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"repo_id": setup.idmap["repo_id"],
		}

		repoAgentSessionRef01MarkdefUp0Name := "adapter"
		repoAgentSessionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-repo_agent_session_ref01_%d", setup.now)
		repoAgentSessionRef01DataUp0Up[repoAgentSessionRef01MarkdefUp0Name] = repoAgentSessionRef01MarkdefUp0Value

		repoAgentSessionRef01ResdataUp0Result, err := repoAgentSessionRef01Ent.Update(repoAgentSessionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		repoAgentSessionRef01ResdataUp0 := core.ToMapAny(entityData(repoAgentSessionRef01ResdataUp0Result))
		if repoAgentSessionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(repoAgentSessionRef01ResdataUp0["id"], repoAgentSessionRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if repoAgentSessionRef01ResdataUp0[repoAgentSessionRef01MarkdefUp0Name] != repoAgentSessionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", repoAgentSessionRef01MarkdefUp0Name, repoAgentSessionRef01ResdataUp0[repoAgentSessionRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		repoAgentSessionRef01MatchDt0 := map[string]any{
			"id": repoAgentSessionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			repoAgentSessionRef01MatchDt0["organization_id"] = v
		} else {
			repoAgentSessionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			repoAgentSessionRef01MatchDt0["repo_id"] = v
		} else {
			repoAgentSessionRef01MatchDt0["repo_id"] = setup.idmap["repo01"]
		}
		repoAgentSessionRef01DataDt0Loaded, err := repoAgentSessionRef01Ent.Load(repoAgentSessionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		repoAgentSessionRef01DataDt0LoadResult := core.ToMapAny(entityData(repoAgentSessionRef01DataDt0Loaded))
		if repoAgentSessionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(repoAgentSessionRef01DataDt0LoadResult["id"], repoAgentSessionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func repo_agent_sessionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "repo_agent_session", "RepoAgentSessionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read repo_agent_session test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse repo_agent_session test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"repo_agent_session01", "repo_agent_session02", "repo_agent_session03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_REPO_AGENT_SESSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_REPO_AGENT_SESSION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_REPO_AGENT_SESSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add organization_id alias for update test.
	if idmapResolved["organization_id"] == nil {
		idmapResolved["organization_id"] = idmapResolved["organization01"]
	}
	// Add repo_id alias for update test.
	if idmapResolved["repo_id"] == nil {
		idmapResolved["repo_id"] = idmapResolved["repo01"]
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
