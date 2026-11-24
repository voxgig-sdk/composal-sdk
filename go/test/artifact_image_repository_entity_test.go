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
const artifact_image_repositoryEntityLiveStrict = true


func TestArtifactImageRepositoryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ArtifactImageRepository(nil)
		if ent == nil {
			t.Fatal("expected non-nil ArtifactImageRepositoryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ArtifactImageRepository(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := artifact_image_repositoryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "artifact_image_repository." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"artifact_image_repository.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/artifacts/image_repositories/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_image_repository.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/artifacts/image_repositories/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_image_repository.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only artifact_image_repository.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_image_repository.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/artifacts/image_repositories/{id}\"}")
			t.Skip("Live coverage incomplete: artifact_image_repository.create.0 excluded (GET-only live run: needs POST /api/v1/artifacts/image_repositories/{id}/archive); artifact_image_repository.update.1 excluded (GET-only live run: needs PUT /api/v1/artifacts/image_repositories/{id}); artifact_image_repository.load.2 excluded (GET-only live run: reads a record only artifact_image_repository.create.0 gives); artifact_image_repository.remove.3 excluded (GET-only live run: needs DELETE /api/v1/artifacts/image_repositories/{id})")
			return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		artifactImageRepositoryRef01Ent := client.ArtifactImageRepository(nil)
		artifactImageRepositoryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "artifact_image_repository"}), "artifact_image_repository_ref01"))

		artifactImageRepositoryRef01DataResult, err := artifactImageRepositoryRef01Ent.Create(artifactImageRepositoryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		artifactImageRepositoryRef01Data = core.ToMapAny(entityData(artifactImageRepositoryRef01DataResult))
		if artifactImageRepositoryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if artifactImageRepositoryRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		artifactImageRepositoryRef01DataUp0Up := map[string]any{
			"id": artifactImageRepositoryRef01Data["id"],
		}

		artifactImageRepositoryRef01ResdataUp0Result, err := artifactImageRepositoryRef01Ent.Update(artifactImageRepositoryRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		artifactImageRepositoryRef01ResdataUp0 := core.ToMapAny(entityData(artifactImageRepositoryRef01ResdataUp0Result))
		if artifactImageRepositoryRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(artifactImageRepositoryRef01ResdataUp0["id"], artifactImageRepositoryRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		artifactImageRepositoryRef01MatchDt0 := map[string]any{
			"id": artifactImageRepositoryRef01Data["id"],
		}
		artifactImageRepositoryRef01DataDt0Loaded, err := artifactImageRepositoryRef01Ent.Load(artifactImageRepositoryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		artifactImageRepositoryRef01DataDt0LoadResult := core.ToMapAny(entityData(artifactImageRepositoryRef01DataDt0Loaded))
		if artifactImageRepositoryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(artifactImageRepositoryRef01DataDt0LoadResult["id"], artifactImageRepositoryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		artifactImageRepositoryRef01MatchRm0 := map[string]any{
			"id": artifactImageRepositoryRef01Data["id"],
		}
		_, err = artifactImageRepositoryRef01Ent.Remove(artifactImageRepositoryRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func artifact_image_repositoryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "artifact_image_repository", "ArtifactImageRepositoryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read artifact_image_repository test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse artifact_image_repository test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"artifact_image_repository01", "artifact_image_repository02", "artifact_image_repository03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ARTIFACT_IMAGE_REPOSITORY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ARTIFACT_IMAGE_REPOSITORY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ARTIFACT_IMAGE_REPOSITORY_ENTID"])
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
