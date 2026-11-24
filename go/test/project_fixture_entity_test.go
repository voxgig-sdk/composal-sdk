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
const project_fixtureEntityLiveStrict = true


func TestProjectFixtureEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ProjectFixture(nil)
		if ent == nil {
			t.Fatal("expected non-nil ProjectFixtureEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ProjectFixture(nil).List(map[string]any{"organization_id": 1, "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := project_fixtureBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "project_fixture." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"project_fixture.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures\"}")
			t.Log("LIVE STEP {\"id\":\"project_fixture.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"project_fixture.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"project_fixture.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_fixtureEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_FIXTURE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["project_fixture01"]
			}
			livePace()
			liveExisting(t, project_fixtureEntityLiveStrict, setup.data, "project_fixture", "id", _liveId,
				func() (any, error) {
					return client.ProjectFixture(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "project_id": setup.idmap["project01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		projectFixtureRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.project_fixture")))
		var projectFixtureRef01Data map[string]any
		if len(projectFixtureRef01DataRaw) > 0 {
			projectFixtureRef01Data = core.ToMapAny(projectFixtureRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = projectFixtureRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		projectFixtureRef01Ent := client.ProjectFixture(nil)
		projectFixtureRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectFixtureRef01ListResult, err := projectFixtureRef01Ent.List(projectFixtureRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, projectFixtureRef01ListOk := projectFixtureRef01ListResult.([]any)
		if !projectFixtureRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectFixtureRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectFixtureRef01MatchDt0 := map[string]any{
			"id": projectFixtureRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectFixtureRef01MatchDt0["organization_id"] = v
		} else {
			projectFixtureRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			projectFixtureRef01MatchDt0["project_id"] = v
		} else {
			projectFixtureRef01MatchDt0["project_id"] = setup.idmap["project01"]
		}
		projectFixtureRef01DataDt0Loaded, err := projectFixtureRef01Ent.Load(projectFixtureRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectFixtureRef01DataDt0LoadResult := core.ToMapAny(entityData(projectFixtureRef01DataDt0Loaded))
		if projectFixtureRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(projectFixtureRef01DataDt0LoadResult["id"], projectFixtureRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, project_fixtureEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PROJECT_FIXTURE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		projectFixtureRef01Ent := client.ProjectFixture(nil)
		projectFixtureRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "project_fixture"}), "project_fixture_ref01"))
		projectFixtureRef01Data["organization_id"] = setup.idmap["organization01"]
		projectFixtureRef01Data["project_id"] = setup.idmap["project01"]

		projectFixtureRef01DataResult, err := projectFixtureRef01Ent.Create(projectFixtureRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		projectFixtureRef01Data = core.ToMapAny(entityData(projectFixtureRef01DataResult))
		if projectFixtureRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if projectFixtureRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		projectFixtureRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectFixtureRef01ListResult, err := projectFixtureRef01Ent.List(projectFixtureRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		projectFixtureRef01List, projectFixtureRef01ListOk := projectFixtureRef01ListResult.([]any)
		if !projectFixtureRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", projectFixtureRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(projectFixtureRef01List), map[string]any{"id": projectFixtureRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		projectFixtureRef01DataUp0Up := map[string]any{
			"id": projectFixtureRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"project_id": setup.idmap["project_id"],
		}

		projectFixtureRef01MarkdefUp0Name := "content_type"
		projectFixtureRef01MarkdefUp0Value := fmt.Sprintf("Mark01-project_fixture_ref01_%d", setup.now)
		projectFixtureRef01DataUp0Up[projectFixtureRef01MarkdefUp0Name] = projectFixtureRef01MarkdefUp0Value

		projectFixtureRef01ResdataUp0Result, err := projectFixtureRef01Ent.Update(projectFixtureRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		projectFixtureRef01ResdataUp0 := core.ToMapAny(entityData(projectFixtureRef01ResdataUp0Result))
		if projectFixtureRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(projectFixtureRef01ResdataUp0["id"], projectFixtureRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if projectFixtureRef01ResdataUp0[projectFixtureRef01MarkdefUp0Name] != projectFixtureRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", projectFixtureRef01MarkdefUp0Name, projectFixtureRef01ResdataUp0[projectFixtureRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		projectFixtureRef01MatchDt0 := map[string]any{
			"id": projectFixtureRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectFixtureRef01MatchDt0["organization_id"] = v
		} else {
			projectFixtureRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			projectFixtureRef01MatchDt0["project_id"] = v
		} else {
			projectFixtureRef01MatchDt0["project_id"] = setup.idmap["project01"]
		}
		projectFixtureRef01DataDt0Loaded, err := projectFixtureRef01Ent.Load(projectFixtureRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		projectFixtureRef01DataDt0LoadResult := core.ToMapAny(entityData(projectFixtureRef01DataDt0Loaded))
		if projectFixtureRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(projectFixtureRef01DataDt0LoadResult["id"], projectFixtureRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		projectFixtureRef01MatchRm0 := map[string]any{
			"id": projectFixtureRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			projectFixtureRef01MatchRm0["organization_id"] = v
		} else {
			projectFixtureRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			projectFixtureRef01MatchRm0["project_id"] = v
		} else {
			projectFixtureRef01MatchRm0["project_id"] = setup.idmap["project01"]
		}
		_, err = projectFixtureRef01Ent.Remove(projectFixtureRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		projectFixtureRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		projectFixtureRef01ListRt0Result, err := projectFixtureRef01Ent.List(projectFixtureRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		projectFixtureRef01ListRt0, projectFixtureRef01ListRt0Ok := projectFixtureRef01ListRt0Result.([]any)
		if !projectFixtureRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", projectFixtureRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(projectFixtureRef01ListRt0), map[string]any{"id": projectFixtureRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func project_fixtureBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "project_fixture", "ProjectFixtureTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read project_fixture test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse project_fixture test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"project_fixture01", "project_fixture02", "project_fixture03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PROJECT_FIXTURE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PROJECT_FIXTURE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PROJECT_FIXTURE_ENTID"])
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
