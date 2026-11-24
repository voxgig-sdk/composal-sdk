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
const github_runner_poolEntityLiveStrict = true


func TestGithubRunnerPoolEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GithubRunnerPool(nil)
		if ent == nil {
			t.Fatal("expected non-nil GithubRunnerPoolEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.GithubRunnerPool(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := github_runner_poolBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "github_runner_pool." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"github_runner_pool.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/github_runner_pools\"}")
			t.Log("LIVE STEP {\"id\":\"github_runner_pool.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/github_runner_pools/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, github_runner_poolEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_GITHUB_RUNNER_POOL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		githubRunnerPoolRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.github_runner_pool")))
		var githubRunnerPoolRef01Data map[string]any
		if len(githubRunnerPoolRef01DataRaw) > 0 {
			githubRunnerPoolRef01Data = core.ToMapAny(githubRunnerPoolRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = githubRunnerPoolRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		githubRunnerPoolRef01Ent := client.GithubRunnerPool(nil)
		githubRunnerPoolRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		githubRunnerPoolRef01ListResult, err := githubRunnerPoolRef01Ent.List(githubRunnerPoolRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, githubRunnerPoolRef01ListOk := githubRunnerPoolRef01ListResult.([]any)
		if !githubRunnerPoolRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", githubRunnerPoolRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, github_runner_poolEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_GITHUB_RUNNER_POOL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		githubRunnerPoolRef01Ent := client.GithubRunnerPool(nil)
		githubRunnerPoolRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "github_runner_pool"}), "github_runner_pool_ref01"))
		githubRunnerPoolRef01Data["organization_id"] = setup.idmap["organization01"]

		githubRunnerPoolRef01DataResult, err := githubRunnerPoolRef01Ent.Create(githubRunnerPoolRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		githubRunnerPoolRef01Data = core.ToMapAny(entityData(githubRunnerPoolRef01DataResult))
		if githubRunnerPoolRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if githubRunnerPoolRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		githubRunnerPoolRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		githubRunnerPoolRef01ListResult, err := githubRunnerPoolRef01Ent.List(githubRunnerPoolRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		githubRunnerPoolRef01List, githubRunnerPoolRef01ListOk := githubRunnerPoolRef01ListResult.([]any)
		if !githubRunnerPoolRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", githubRunnerPoolRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(githubRunnerPoolRef01List), map[string]any{"id": githubRunnerPoolRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		githubRunnerPoolRef01DataUp0Up := map[string]any{
			"id": githubRunnerPoolRef01Data["id"],
		}

		githubRunnerPoolRef01MarkdefUp0Name := "github_app_installation_id"
		githubRunnerPoolRef01MarkdefUp0Value := fmt.Sprintf("Mark01-github_runner_pool_ref01_%d", setup.now)
		githubRunnerPoolRef01DataUp0Up[githubRunnerPoolRef01MarkdefUp0Name] = githubRunnerPoolRef01MarkdefUp0Value

		githubRunnerPoolRef01ResdataUp0Result, err := githubRunnerPoolRef01Ent.Update(githubRunnerPoolRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		githubRunnerPoolRef01ResdataUp0 := core.ToMapAny(entityData(githubRunnerPoolRef01ResdataUp0Result))
		if githubRunnerPoolRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(githubRunnerPoolRef01ResdataUp0["id"], githubRunnerPoolRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if githubRunnerPoolRef01ResdataUp0[githubRunnerPoolRef01MarkdefUp0Name] != githubRunnerPoolRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", githubRunnerPoolRef01MarkdefUp0Name, githubRunnerPoolRef01ResdataUp0[githubRunnerPoolRef01MarkdefUp0Name])
		}

	})
}

func github_runner_poolBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "github_runner_pool", "GithubRunnerPoolTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read github_runner_pool test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse github_runner_pool test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"github_runner_pool01", "github_runner_pool02", "github_runner_pool03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_GITHUB_RUNNER_POOL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_GITHUB_RUNNER_POOL_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_GITHUB_RUNNER_POOL_ENTID"])
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
