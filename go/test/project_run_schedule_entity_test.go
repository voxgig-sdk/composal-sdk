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
const project_run_scheduleEntityLiveStrict = true


func TestProjectRunScheduleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ProjectRunSchedule(nil)
		if ent == nil {
			t.Fatal("expected non-nil ProjectRunScheduleEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ProjectRunSchedule(nil).List(map[string]any{"organization_id": 1, "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := project_run_scheduleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "project_run_schedule." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"project_run_schedule.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules\"}")
			t.Log("LIVE STEP {\"id\":\"project_run_schedule.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_run_scheduleEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_RUN_SCHEDULE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["project_run_schedule01"]
			}
			livePace()
			liveExisting(t, project_run_scheduleEntityLiveStrict, setup.data, "project_run_schedule", "id", _liveId,
				func() (any, error) {
					return client.ProjectRunSchedule(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "project_id": setup.idmap["project01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		projectRunScheduleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.project_run_schedule")))
		var projectRunScheduleRef01Data map[string]any
		if len(projectRunScheduleRef01DataRaw) > 0 {
			projectRunScheduleRef01Data = core.ToMapAny(projectRunScheduleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = projectRunScheduleRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		projectRunScheduleRef01Ent := client.ProjectRunSchedule(nil)
		projectRunScheduleRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectRunScheduleRef01ListResult, err := projectRunScheduleRef01Ent.List(projectRunScheduleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, projectRunScheduleRef01ListOk := projectRunScheduleRef01ListResult.([]any)
		if !projectRunScheduleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectRunScheduleRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectRunScheduleRef01MatchDt0 := map[string]any{
			"id": projectRunScheduleRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectRunScheduleRef01MatchDt0["organization_id"] = v
		} else {
			projectRunScheduleRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			projectRunScheduleRef01MatchDt0["project_id"] = v
		} else {
			projectRunScheduleRef01MatchDt0["project_id"] = setup.idmap["project01"]
		}
		projectRunScheduleRef01DataDt0Loaded, err := projectRunScheduleRef01Ent.Load(projectRunScheduleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectRunScheduleRef01DataDt0LoadResult := core.ToMapAny(entityData(projectRunScheduleRef01DataDt0Loaded))
		if projectRunScheduleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(projectRunScheduleRef01DataDt0LoadResult["id"], projectRunScheduleRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_run_scheduleEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_RUN_SCHEDULE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		projectRunScheduleRef01Ent := client.ProjectRunSchedule(nil)
		projectRunScheduleRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "project_run_schedule"}), "project_run_schedule_ref01"))
		projectRunScheduleRef01Data["organization_id"] = setup.idmap["organization01"]
		projectRunScheduleRef01Data["project_id"] = setup.idmap["project01"]

		projectRunScheduleRef01DataResult, err := projectRunScheduleRef01Ent.Create(projectRunScheduleRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		projectRunScheduleRef01Data = core.ToMapAny(entityData(projectRunScheduleRef01DataResult))
		if projectRunScheduleRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if projectRunScheduleRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		projectRunScheduleRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectRunScheduleRef01ListResult, err := projectRunScheduleRef01Ent.List(projectRunScheduleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		projectRunScheduleRef01List, projectRunScheduleRef01ListOk := projectRunScheduleRef01ListResult.([]any)
		if !projectRunScheduleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectRunScheduleRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(projectRunScheduleRef01List), map[string]any{"id": projectRunScheduleRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		projectRunScheduleRef01DataUp0Up := map[string]any{
			"id": projectRunScheduleRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"project_id": setup.idmap["project_id"],
		}

		projectRunScheduleRef01MarkdefUp0Name := "cron_expression"
		projectRunScheduleRef01MarkdefUp0Value := fmt.Sprintf("Mark01-project_run_schedule_ref01_%d", setup.now)
		projectRunScheduleRef01DataUp0Up[projectRunScheduleRef01MarkdefUp0Name] = projectRunScheduleRef01MarkdefUp0Value

		projectRunScheduleRef01ResdataUp0Result, err := projectRunScheduleRef01Ent.Update(projectRunScheduleRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		projectRunScheduleRef01ResdataUp0 := core.ToMapAny(entityData(projectRunScheduleRef01ResdataUp0Result))
		if projectRunScheduleRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(projectRunScheduleRef01ResdataUp0["id"], projectRunScheduleRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if projectRunScheduleRef01ResdataUp0[projectRunScheduleRef01MarkdefUp0Name] != projectRunScheduleRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", projectRunScheduleRef01MarkdefUp0Name, projectRunScheduleRef01ResdataUp0[projectRunScheduleRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectRunScheduleRef01MatchDt0 := map[string]any{
			"id": projectRunScheduleRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectRunScheduleRef01MatchDt0["organization_id"] = v
		} else {
			projectRunScheduleRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			projectRunScheduleRef01MatchDt0["project_id"] = v
		} else {
			projectRunScheduleRef01MatchDt0["project_id"] = setup.idmap["project01"]
		}
		projectRunScheduleRef01DataDt0Loaded, err := projectRunScheduleRef01Ent.Load(projectRunScheduleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectRunScheduleRef01DataDt0LoadResult := core.ToMapAny(entityData(projectRunScheduleRef01DataDt0Loaded))
		if projectRunScheduleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(projectRunScheduleRef01DataDt0LoadResult["id"], projectRunScheduleRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func project_run_scheduleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "project_run_schedule", "ProjectRunScheduleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read project_run_schedule test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse project_run_schedule test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"project_run_schedule01", "project_run_schedule02", "project_run_schedule03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PROJECT_RUN_SCHEDULE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PROJECT_RUN_SCHEDULE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PROJECT_RUN_SCHEDULE_ENTID"])
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
