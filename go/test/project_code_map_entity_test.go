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
const project_code_mapEntityLiveStrict = true


func TestProjectCodeMapEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ProjectCodeMap(nil)
		if ent == nil {
			t.Fatal("expected non-nil ProjectCodeMapEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ProjectCodeMap(nil).List(map[string]any{"organization_id": 1, "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := project_code_mapBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "project_code_map." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"project_code_map.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/projects/{project_id}/code_maps\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_code_mapEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_CODE_MAP_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		projectCodeMapRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.project_code_map")))
		var projectCodeMapRef01Data map[string]any
		if len(projectCodeMapRef01DataRaw) > 0 {
			projectCodeMapRef01Data = core.ToMapAny(projectCodeMapRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = projectCodeMapRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		projectCodeMapRef01Ent := client.ProjectCodeMap(nil)
		projectCodeMapRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectCodeMapRef01ListResult, err := projectCodeMapRef01Ent.List(projectCodeMapRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, projectCodeMapRef01ListOk := projectCodeMapRef01ListResult.([]any)
		if !projectCodeMapRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectCodeMapRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_code_mapEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_CODE_MAP_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		projectCodeMapRef01Ent := client.ProjectCodeMap(nil)
		projectCodeMapRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "project_code_map"}), "project_code_map_ref01"))
		projectCodeMapRef01Data["organization_id"] = setup.idmap["organization01"]
		projectCodeMapRef01Data["project_id"] = setup.idmap["project01"]

		projectCodeMapRef01DataResult, err := projectCodeMapRef01Ent.Create(projectCodeMapRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		projectCodeMapRef01Data = core.ToMapAny(entityData(projectCodeMapRef01DataResult))
		if projectCodeMapRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if projectCodeMapRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		projectCodeMapRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectCodeMapRef01ListResult, err := projectCodeMapRef01Ent.List(projectCodeMapRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		projectCodeMapRef01List, projectCodeMapRef01ListOk := projectCodeMapRef01ListResult.([]any)
		if !projectCodeMapRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectCodeMapRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(projectCodeMapRef01List), map[string]any{"id": projectCodeMapRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func project_code_mapBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "project_code_map", "ProjectCodeMapTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read project_code_map test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse project_code_map test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"project_code_map01", "project_code_map02", "project_code_map03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PROJECT_CODE_MAP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PROJECT_CODE_MAP_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PROJECT_CODE_MAP_ENTID"])
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
