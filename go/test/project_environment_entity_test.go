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
const project_environmentEntityLiveStrict = true


func TestProjectEnvironmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ProjectEnvironment(nil)
		if ent == nil {
			t.Fatal("expected non-nil ProjectEnvironmentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ProjectEnvironment(nil).List(map[string]any{"organization_id": 1, "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := project_environmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "project_environment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"project_environment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"project_environment.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_environmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["project_environment01"]
			}
			livePace()
			liveExisting(t, project_environmentEntityLiveStrict, setup.data, "project_environment", "id", _liveId,
				func() (any, error) {
					return client.ProjectEnvironment(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "project_id": setup.idmap["project01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		projectEnvironmentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.project_environment")))
		var projectEnvironmentRef01Data map[string]any
		if len(projectEnvironmentRef01DataRaw) > 0 {
			projectEnvironmentRef01Data = core.ToMapAny(projectEnvironmentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = projectEnvironmentRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		projectEnvironmentRef01Ent := client.ProjectEnvironment(nil)
		projectEnvironmentRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectEnvironmentRef01ListResult, err := projectEnvironmentRef01Ent.List(projectEnvironmentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, projectEnvironmentRef01ListOk := projectEnvironmentRef01ListResult.([]any)
		if !projectEnvironmentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectEnvironmentRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectEnvironmentRef01MatchDt0 := map[string]any{
			"id": projectEnvironmentRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectEnvironmentRef01MatchDt0["organization_id"] = v
		} else {
			projectEnvironmentRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		switch v := projectEnvironmentRef01Data["project_id"].(type) {
		case string, bool, float64, int, int64:
			projectEnvironmentRef01MatchDt0["project_id"] = v
		default:
			if v := setup.idmap["project_id"]; v != nil {
				projectEnvironmentRef01MatchDt0["project_id"] = v
			} else {
				projectEnvironmentRef01MatchDt0["project_id"] = setup.idmap["project01"]
			}
		}
		projectEnvironmentRef01DataDt0Loaded, err := projectEnvironmentRef01Ent.Load(projectEnvironmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectEnvironmentRef01DataDt0LoadResult := core.ToMapAny(entityData(projectEnvironmentRef01DataDt0Loaded))
		if projectEnvironmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(projectEnvironmentRef01DataDt0LoadResult["id"], projectEnvironmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_environmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		projectEnvironmentRef01Ent := client.ProjectEnvironment(nil)
		projectEnvironmentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "project_environment"}), "project_environment_ref01"))
		projectEnvironmentRef01Data["organization_id"] = setup.idmap["organization01"]
		projectEnvironmentRef01Data["project_id"] = setup.idmap["project01"]

		projectEnvironmentRef01DataResult, err := projectEnvironmentRef01Ent.Create(projectEnvironmentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		projectEnvironmentRef01Data = core.ToMapAny(entityData(projectEnvironmentRef01DataResult))
		if projectEnvironmentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if projectEnvironmentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		projectEnvironmentRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectEnvironmentRef01ListResult, err := projectEnvironmentRef01Ent.List(projectEnvironmentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		projectEnvironmentRef01List, projectEnvironmentRef01ListOk := projectEnvironmentRef01ListResult.([]any)
		if !projectEnvironmentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectEnvironmentRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(projectEnvironmentRef01List), map[string]any{"id": projectEnvironmentRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		projectEnvironmentRef01DataUp0Up := map[string]any{
			"id": projectEnvironmentRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"project_id": setup.idmap["project_id"],
		}

		projectEnvironmentRef01MarkdefUp0Name := "allowed_actions"
		projectEnvironmentRef01MarkdefUp0Value := fmt.Sprintf("Mark01-project_environment_ref01_%d", setup.now)
		projectEnvironmentRef01DataUp0Up[projectEnvironmentRef01MarkdefUp0Name] = projectEnvironmentRef01MarkdefUp0Value

		projectEnvironmentRef01ResdataUp0Result, err := projectEnvironmentRef01Ent.Update(projectEnvironmentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		projectEnvironmentRef01ResdataUp0 := core.ToMapAny(entityData(projectEnvironmentRef01ResdataUp0Result))
		if projectEnvironmentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(projectEnvironmentRef01ResdataUp0["id"], projectEnvironmentRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if projectEnvironmentRef01ResdataUp0[projectEnvironmentRef01MarkdefUp0Name] != projectEnvironmentRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", projectEnvironmentRef01MarkdefUp0Name, projectEnvironmentRef01ResdataUp0[projectEnvironmentRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectEnvironmentRef01MatchDt0 := map[string]any{
			"id": projectEnvironmentRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectEnvironmentRef01MatchDt0["organization_id"] = v
		} else {
			projectEnvironmentRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		switch v := projectEnvironmentRef01Data["project_id"].(type) {
		case string, bool, float64, int, int64:
			projectEnvironmentRef01MatchDt0["project_id"] = v
		default:
			if v := setup.idmap["project_id"]; v != nil {
				projectEnvironmentRef01MatchDt0["project_id"] = v
			} else {
				projectEnvironmentRef01MatchDt0["project_id"] = setup.idmap["project01"]
			}
		}
		projectEnvironmentRef01DataDt0Loaded, err := projectEnvironmentRef01Ent.Load(projectEnvironmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectEnvironmentRef01DataDt0LoadResult := core.ToMapAny(entityData(projectEnvironmentRef01DataDt0Loaded))
		if projectEnvironmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(projectEnvironmentRef01DataDt0LoadResult["id"], projectEnvironmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func project_environmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "project_environment", "ProjectEnvironmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read project_environment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse project_environment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"project_environment01", "project_environment02", "project_environment03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID"])
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
