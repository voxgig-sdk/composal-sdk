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
const image_repositoryEntityLiveStrict = true


func TestImageRepositoryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ImageRepository(nil)
		if ent == nil {
			t.Fatal("expected non-nil ImageRepositoryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ImageRepository(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := image_repositoryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "image_repository." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"image_repository.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/image_repositories\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, image_repositoryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		imageRepositoryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.image_repository")))
		var imageRepositoryRef01Data map[string]any
		if len(imageRepositoryRef01DataRaw) > 0 {
			imageRepositoryRef01Data = core.ToMapAny(imageRepositoryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = imageRepositoryRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		imageRepositoryRef01Ent := client.ImageRepository(nil)
		imageRepositoryRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		imageRepositoryRef01ListResult, err := imageRepositoryRef01Ent.List(imageRepositoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, imageRepositoryRef01ListOk := imageRepositoryRef01ListResult.([]any)
		if !imageRepositoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", imageRepositoryRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, image_repositoryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		imageRepositoryRef01Ent := client.ImageRepository(nil)
		imageRepositoryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "image_repository"}), "image_repository_ref01"))
		imageRepositoryRef01Data["organization_id"] = setup.idmap["organization01"]

		imageRepositoryRef01DataResult, err := imageRepositoryRef01Ent.Create(imageRepositoryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		imageRepositoryRef01Data = core.ToMapAny(entityData(imageRepositoryRef01DataResult))
		if imageRepositoryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if imageRepositoryRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		imageRepositoryRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		imageRepositoryRef01ListResult, err := imageRepositoryRef01Ent.List(imageRepositoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		imageRepositoryRef01List, imageRepositoryRef01ListOk := imageRepositoryRef01ListResult.([]any)
		if !imageRepositoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", imageRepositoryRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(imageRepositoryRef01List), map[string]any{"id": imageRepositoryRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func image_repositoryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "image_repository", "ImageRepositoryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read image_repository test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse image_repository test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"image_repository01", "image_repository02", "image_repository03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID"])
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
