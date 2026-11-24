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
const environment_revisionEntityLiveStrict = true


func TestEnvironmentRevisionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EnvironmentRevision(nil)
		if ent == nil {
			t.Fatal("expected non-nil EnvironmentRevisionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.EnvironmentRevision(nil).Load(map[string]any{"environment_id": 1, "id": "x", "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := environment_revisionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "environment_revision." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"environment_revision.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision\"}")
			t.Log("LIVE STEP {\"id\":\"environment_revision.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"environment_revision.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only environment_revision.create.0 gives\"}")
			t.Skip("Live coverage incomplete: environment_revision.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision); environment_revision.update.1 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}); environment_revision.load.2 excluded (GET-only live run: reads a record only environment_revision.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"environment01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, environment_revisionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		environmentRevisionRef01Ent := client.EnvironmentRevision(nil)
		environmentRevisionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "environment_revision"}), "environment_revision_ref01"))
		environmentRevisionRef01Data["environment_id"] = setup.idmap["environment01"]
		environmentRevisionRef01Data["organization_id"] = setup.idmap["organization01"]

		environmentRevisionRef01DataResult, err := environmentRevisionRef01Ent.Create(environmentRevisionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		environmentRevisionRef01Data = core.ToMapAny(entityData(environmentRevisionRef01DataResult))
		if environmentRevisionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if environmentRevisionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		environmentRevisionRef01DataUp0Up := map[string]any{
			"id": environmentRevisionRef01Data["id"],
			"environment_id": setup.idmap["environment_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		environmentRevisionRef01MarkdefUp0Name := "app_environment_id"
		environmentRevisionRef01MarkdefUp0Value := fmt.Sprintf("Mark01-environment_revision_ref01_%d", setup.now)
		environmentRevisionRef01DataUp0Up[environmentRevisionRef01MarkdefUp0Name] = environmentRevisionRef01MarkdefUp0Value

		environmentRevisionRef01ResdataUp0Result, err := environmentRevisionRef01Ent.Update(environmentRevisionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		environmentRevisionRef01ResdataUp0 := core.ToMapAny(entityData(environmentRevisionRef01ResdataUp0Result))
		if environmentRevisionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(environmentRevisionRef01ResdataUp0["id"], environmentRevisionRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if environmentRevisionRef01ResdataUp0[environmentRevisionRef01MarkdefUp0Name] != environmentRevisionRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", environmentRevisionRef01MarkdefUp0Name, environmentRevisionRef01ResdataUp0[environmentRevisionRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		environmentRevisionRef01MatchDt0 := map[string]any{
			"id": environmentRevisionRef01Data["id"],
		}
		if v := setup.idmap["environment_id"]; v != nil {
			environmentRevisionRef01MatchDt0["environment_id"] = v
		} else {
			environmentRevisionRef01MatchDt0["environment_id"] = setup.idmap["environment01"]
		}
		switch v := environmentRevisionRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			environmentRevisionRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				environmentRevisionRef01MatchDt0["organization_id"] = v
			} else {
				environmentRevisionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		environmentRevisionRef01DataDt0Loaded, err := environmentRevisionRef01Ent.Load(environmentRevisionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		environmentRevisionRef01DataDt0LoadResult := core.ToMapAny(entityData(environmentRevisionRef01DataDt0Loaded))
		if environmentRevisionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(environmentRevisionRef01DataDt0LoadResult["id"], environmentRevisionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func environment_revisionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "environment_revision", "EnvironmentRevisionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read environment_revision test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse environment_revision test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"environment_revision01", "environment_revision02", "environment_revision03", "organization01", "organization02", "organization03", "environment01", "environment02", "environment03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add environment_id alias for update test.
	if idmapResolved["environment_id"] == nil {
		idmapResolved["environment_id"] = idmapResolved["environment01"]
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
