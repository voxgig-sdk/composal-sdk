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
const github_runner_imageEntityLiveStrict = true


func TestGithubRunnerImageEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GithubRunnerImage(nil)
		if ent == nil {
			t.Fatal("expected non-nil GithubRunnerImageEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.GithubRunnerImage(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := github_runner_imageBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "github_runner_image." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"github_runner_image.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/github_runner_images/{id}/prepare\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, github_runner_imageEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_GITHUB_RUNNER_IMAGE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["github_runner_image01"]
			}
			livePace()
			liveExisting(t, github_runner_imageEntityLiveStrict, setup.data, "github_runner_image", "id", _liveId,
				func() (any, error) {
					return client.GithubRunnerImage(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		githubRunnerImageRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.github_runner_image")))
		var githubRunnerImageRef01Data map[string]any
		if len(githubRunnerImageRef01DataRaw) > 0 {
			githubRunnerImageRef01Data = core.ToMapAny(githubRunnerImageRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = githubRunnerImageRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		githubRunnerImageRef01Ent := client.GithubRunnerImage(nil)
		githubRunnerImageRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		githubRunnerImageRef01ListResult, err := githubRunnerImageRef01Ent.List(githubRunnerImageRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, githubRunnerImageRef01ListOk := githubRunnerImageRef01ListResult.([]any)
		if !githubRunnerImageRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", githubRunnerImageRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		githubRunnerImageRef01MatchDt0 := map[string]any{
			"id": githubRunnerImageRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			githubRunnerImageRef01MatchDt0["organization_id"] = v
		} else {
			githubRunnerImageRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		githubRunnerImageRef01DataDt0Loaded, err := githubRunnerImageRef01Ent.Load(githubRunnerImageRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		githubRunnerImageRef01DataDt0LoadResult := core.ToMapAny(entityData(githubRunnerImageRef01DataDt0Loaded))
		if githubRunnerImageRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(githubRunnerImageRef01DataDt0LoadResult["id"], githubRunnerImageRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, github_runner_imageEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_GITHUB_RUNNER_IMAGE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		githubRunnerImageRef01Ent := client.GithubRunnerImage(nil)
		githubRunnerImageRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "github_runner_image"}), "github_runner_image_ref01"))
		githubRunnerImageRef01Data["organization_id"] = setup.idmap["organization01"]

		githubRunnerImageRef01DataResult, err := githubRunnerImageRef01Ent.Create(githubRunnerImageRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		githubRunnerImageRef01Data = core.ToMapAny(entityData(githubRunnerImageRef01DataResult))
		if githubRunnerImageRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if githubRunnerImageRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		githubRunnerImageRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		githubRunnerImageRef01ListResult, err := githubRunnerImageRef01Ent.List(githubRunnerImageRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		githubRunnerImageRef01List, githubRunnerImageRef01ListOk := githubRunnerImageRef01ListResult.([]any)
		if !githubRunnerImageRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", githubRunnerImageRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(githubRunnerImageRef01List), map[string]any{"id": githubRunnerImageRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		githubRunnerImageRef01MatchDt0 := map[string]any{
			"id": githubRunnerImageRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			githubRunnerImageRef01MatchDt0["organization_id"] = v
		} else {
			githubRunnerImageRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		githubRunnerImageRef01DataDt0Loaded, err := githubRunnerImageRef01Ent.Load(githubRunnerImageRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		githubRunnerImageRef01DataDt0LoadResult := core.ToMapAny(entityData(githubRunnerImageRef01DataDt0Loaded))
		if githubRunnerImageRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(githubRunnerImageRef01DataDt0LoadResult["id"], githubRunnerImageRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func github_runner_imageBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "github_runner_image", "GithubRunnerImageTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read github_runner_image test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse github_runner_image test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"github_runner_image01", "github_runner_image02", "github_runner_image03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_GITHUB_RUNNER_IMAGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_GITHUB_RUNNER_IMAGE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_GITHUB_RUNNER_IMAGE_ENTID"])
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
