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
const github_ci_repositoryEntityLiveStrict = true


func TestGithubCiRepositoryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GithubCiRepository(nil)
		if ent == nil {
			t.Fatal("expected non-nil GithubCiRepositoryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.GithubCiRepository(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := github_ci_repositoryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "github_ci_repository." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"github_ci_repository.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/github_ci_repositories\"}")
			t.Log("LIVE STEP {\"id\":\"github_ci_repository.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/github_ci_repositories/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, github_ci_repositoryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_GITHUB_CI_REPOSITORY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["github_ci_repository01"]
			}
			livePace()
			liveExisting(t, github_ci_repositoryEntityLiveStrict, setup.data, "github_ci_repository", "id", _liveId,
				func() (any, error) {
					return client.GithubCiRepository(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		githubCiRepositoryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.github_ci_repository")))
		var githubCiRepositoryRef01Data map[string]any
		if len(githubCiRepositoryRef01DataRaw) > 0 {
			githubCiRepositoryRef01Data = core.ToMapAny(githubCiRepositoryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = githubCiRepositoryRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		githubCiRepositoryRef01Ent := client.GithubCiRepository(nil)
		githubCiRepositoryRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		githubCiRepositoryRef01ListResult, err := githubCiRepositoryRef01Ent.List(githubCiRepositoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, githubCiRepositoryRef01ListOk := githubCiRepositoryRef01ListResult.([]any)
		if !githubCiRepositoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", githubCiRepositoryRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		githubCiRepositoryRef01MatchDt0 := map[string]any{
			"id": githubCiRepositoryRef01Data["id"],
		}
		switch v := githubCiRepositoryRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			githubCiRepositoryRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				githubCiRepositoryRef01MatchDt0["organization_id"] = v
			} else {
				githubCiRepositoryRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		githubCiRepositoryRef01DataDt0Loaded, err := githubCiRepositoryRef01Ent.Load(githubCiRepositoryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		githubCiRepositoryRef01DataDt0LoadResult := core.ToMapAny(entityData(githubCiRepositoryRef01DataDt0Loaded))
		if githubCiRepositoryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(githubCiRepositoryRef01DataDt0LoadResult["id"], githubCiRepositoryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, github_ci_repositoryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_GITHUB_CI_REPOSITORY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		githubCiRepositoryRef01Ent := client.GithubCiRepository(nil)
		githubCiRepositoryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "github_ci_repository"}), "github_ci_repository_ref01"))
		githubCiRepositoryRef01Data["organization_id"] = setup.idmap["organization01"]

		githubCiRepositoryRef01DataResult, err := githubCiRepositoryRef01Ent.Create(githubCiRepositoryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		githubCiRepositoryRef01Data = core.ToMapAny(entityData(githubCiRepositoryRef01DataResult))
		if githubCiRepositoryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if githubCiRepositoryRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		githubCiRepositoryRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		githubCiRepositoryRef01ListResult, err := githubCiRepositoryRef01Ent.List(githubCiRepositoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		githubCiRepositoryRef01List, githubCiRepositoryRef01ListOk := githubCiRepositoryRef01ListResult.([]any)
		if !githubCiRepositoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", githubCiRepositoryRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(githubCiRepositoryRef01List), map[string]any{"id": githubCiRepositoryRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		githubCiRepositoryRef01DataUp0Up := map[string]any{
			"id": githubCiRepositoryRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		githubCiRepositoryRef01MarkdefUp0Name := "adoption_mode"
		githubCiRepositoryRef01MarkdefUp0Value := fmt.Sprintf("Mark01-github_ci_repository_ref01_%d", setup.now)
		githubCiRepositoryRef01DataUp0Up[githubCiRepositoryRef01MarkdefUp0Name] = githubCiRepositoryRef01MarkdefUp0Value

		githubCiRepositoryRef01ResdataUp0Result, err := githubCiRepositoryRef01Ent.Update(githubCiRepositoryRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		githubCiRepositoryRef01ResdataUp0 := core.ToMapAny(entityData(githubCiRepositoryRef01ResdataUp0Result))
		if githubCiRepositoryRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(githubCiRepositoryRef01ResdataUp0["id"], githubCiRepositoryRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if githubCiRepositoryRef01ResdataUp0[githubCiRepositoryRef01MarkdefUp0Name] != githubCiRepositoryRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", githubCiRepositoryRef01MarkdefUp0Name, githubCiRepositoryRef01ResdataUp0[githubCiRepositoryRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		githubCiRepositoryRef01MatchDt0 := map[string]any{
			"id": githubCiRepositoryRef01Data["id"],
		}
		switch v := githubCiRepositoryRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			githubCiRepositoryRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				githubCiRepositoryRef01MatchDt0["organization_id"] = v
			} else {
				githubCiRepositoryRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		githubCiRepositoryRef01DataDt0Loaded, err := githubCiRepositoryRef01Ent.Load(githubCiRepositoryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		githubCiRepositoryRef01DataDt0LoadResult := core.ToMapAny(entityData(githubCiRepositoryRef01DataDt0Loaded))
		if githubCiRepositoryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(githubCiRepositoryRef01DataDt0LoadResult["id"], githubCiRepositoryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func github_ci_repositoryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "github_ci_repository", "GithubCiRepositoryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read github_ci_repository test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse github_ci_repository test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"github_ci_repository01", "github_ci_repository02", "github_ci_repository03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_GITHUB_CI_REPOSITORY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_GITHUB_CI_REPOSITORY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_GITHUB_CI_REPOSITORY_ENTID"])
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
