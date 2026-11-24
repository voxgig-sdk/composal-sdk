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
const project_run_planEntityLiveStrict = true


func TestProjectRunPlanEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ProjectRunPlan(nil)
		if ent == nil {
			t.Fatal("expected non-nil ProjectRunPlanEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ProjectRunPlan(nil).List(map[string]any{"organization_id": 1, "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := project_run_planBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "project_run_plan." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"project_run_plan.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"project_run_plan.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_run_planEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_RUN_PLAN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["project_run_plan01"]
			}
			livePace()
			liveExisting(t, project_run_planEntityLiveStrict, setup.data, "project_run_plan", "id", _liveId,
				func() (any, error) {
					return client.ProjectRunPlan(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "project_id": setup.idmap["project01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		projectRunPlanRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.project_run_plan")))
		var projectRunPlanRef01Data map[string]any
		if len(projectRunPlanRef01DataRaw) > 0 {
			projectRunPlanRef01Data = core.ToMapAny(projectRunPlanRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = projectRunPlanRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		projectRunPlanRef01Ent := client.ProjectRunPlan(nil)
		projectRunPlanRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectRunPlanRef01ListResult, err := projectRunPlanRef01Ent.List(projectRunPlanRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, projectRunPlanRef01ListOk := projectRunPlanRef01ListResult.([]any)
		if !projectRunPlanRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectRunPlanRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectRunPlanRef01MatchDt0 := map[string]any{
			"id": projectRunPlanRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectRunPlanRef01MatchDt0["organization_id"] = v
		} else {
			projectRunPlanRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		switch v := projectRunPlanRef01Data["project_id"].(type) {
		case string, bool, float64, int, int64:
			projectRunPlanRef01MatchDt0["project_id"] = v
		default:
			if v := setup.idmap["project_id"]; v != nil {
				projectRunPlanRef01MatchDt0["project_id"] = v
			} else {
				projectRunPlanRef01MatchDt0["project_id"] = setup.idmap["project01"]
			}
		}
		projectRunPlanRef01DataDt0Loaded, err := projectRunPlanRef01Ent.Load(projectRunPlanRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectRunPlanRef01DataDt0LoadResult := core.ToMapAny(entityData(projectRunPlanRef01DataDt0Loaded))
		if projectRunPlanRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(projectRunPlanRef01DataDt0LoadResult["id"], projectRunPlanRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_run_planEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_RUN_PLAN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		projectRunPlanRef01Ent := client.ProjectRunPlan(nil)
		projectRunPlanRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "project_run_plan"}), "project_run_plan_ref01"))
		projectRunPlanRef01Data["organization_id"] = setup.idmap["organization01"]
		projectRunPlanRef01Data["project_id"] = setup.idmap["project01"]

		projectRunPlanRef01DataResult, err := projectRunPlanRef01Ent.Create(projectRunPlanRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		projectRunPlanRef01Data = core.ToMapAny(entityData(projectRunPlanRef01DataResult))
		if projectRunPlanRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if projectRunPlanRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		projectRunPlanRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectRunPlanRef01ListResult, err := projectRunPlanRef01Ent.List(projectRunPlanRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		projectRunPlanRef01List, projectRunPlanRef01ListOk := projectRunPlanRef01ListResult.([]any)
		if !projectRunPlanRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectRunPlanRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(projectRunPlanRef01List), map[string]any{"id": projectRunPlanRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		projectRunPlanRef01DataUp0Up := map[string]any{
			"id": projectRunPlanRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"project_id": setup.idmap["project_id"],
		}

		projectRunPlanRef01MarkdefUp0Name := "archived_at"
		projectRunPlanRef01MarkdefUp0Value := fmt.Sprintf("Mark01-project_run_plan_ref01_%d", setup.now)
		projectRunPlanRef01DataUp0Up[projectRunPlanRef01MarkdefUp0Name] = projectRunPlanRef01MarkdefUp0Value

		projectRunPlanRef01ResdataUp0Result, err := projectRunPlanRef01Ent.Update(projectRunPlanRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		projectRunPlanRef01ResdataUp0 := core.ToMapAny(entityData(projectRunPlanRef01ResdataUp0Result))
		if projectRunPlanRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(projectRunPlanRef01ResdataUp0["id"], projectRunPlanRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if projectRunPlanRef01ResdataUp0[projectRunPlanRef01MarkdefUp0Name] != projectRunPlanRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", projectRunPlanRef01MarkdefUp0Name, projectRunPlanRef01ResdataUp0[projectRunPlanRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectRunPlanRef01MatchDt0 := map[string]any{
			"id": projectRunPlanRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectRunPlanRef01MatchDt0["organization_id"] = v
		} else {
			projectRunPlanRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		switch v := projectRunPlanRef01Data["project_id"].(type) {
		case string, bool, float64, int, int64:
			projectRunPlanRef01MatchDt0["project_id"] = v
		default:
			if v := setup.idmap["project_id"]; v != nil {
				projectRunPlanRef01MatchDt0["project_id"] = v
			} else {
				projectRunPlanRef01MatchDt0["project_id"] = setup.idmap["project01"]
			}
		}
		projectRunPlanRef01DataDt0Loaded, err := projectRunPlanRef01Ent.Load(projectRunPlanRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectRunPlanRef01DataDt0LoadResult := core.ToMapAny(entityData(projectRunPlanRef01DataDt0Loaded))
		if projectRunPlanRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(projectRunPlanRef01DataDt0LoadResult["id"], projectRunPlanRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func project_run_planBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "project_run_plan", "ProjectRunPlanTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read project_run_plan test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse project_run_plan test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"project_run_plan01", "project_run_plan02", "project_run_plan03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PROJECT_RUN_PLAN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PROJECT_RUN_PLAN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PROJECT_RUN_PLAN_ENTID"])
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
