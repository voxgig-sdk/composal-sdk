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
const environmentEntityLiveStrict = true


func TestEnvironmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Environment(nil)
		if ent == nil {
			t.Fatal("expected non-nil EnvironmentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Environment(nil).Load(map[string]any{"id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := environmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "environment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"environment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments\"}")
			t.Log("LIVE STEP {\"id\":\"environment.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/environments/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"environment.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only environment.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"environment.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/environments/{id}\"}")
			t.Skip("Live coverage incomplete: environment.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments); environment.update.1 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/environments/{id}); environment.load.2 excluded (GET-only live run: reads a record only environment.create.0 gives); environment.remove.3 excluded (GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/environments/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, environmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ENVIRONMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		environmentRef01Ent := client.Environment(nil)
		environmentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "environment"}), "environment_ref01"))
		environmentRef01Data["organization_id"] = setup.idmap["organization01"]

		environmentRef01DataResult, err := environmentRef01Ent.Create(environmentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		environmentRef01Data = core.ToMapAny(entityData(environmentRef01DataResult))
		if environmentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if environmentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		environmentRef01DataUp0Up := map[string]any{
			"id": environmentRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		environmentRef01MarkdefUp0Name := "active_revision_id"
		environmentRef01MarkdefUp0Value := fmt.Sprintf("Mark01-environment_ref01_%d", setup.now)
		environmentRef01DataUp0Up[environmentRef01MarkdefUp0Name] = environmentRef01MarkdefUp0Value

		environmentRef01ResdataUp0Result, err := environmentRef01Ent.Update(environmentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		environmentRef01ResdataUp0 := core.ToMapAny(entityData(environmentRef01ResdataUp0Result))
		if environmentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(environmentRef01ResdataUp0["id"], environmentRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if environmentRef01ResdataUp0[environmentRef01MarkdefUp0Name] != environmentRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", environmentRef01MarkdefUp0Name, environmentRef01ResdataUp0[environmentRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		environmentRef01MatchDt0 := map[string]any{
			"id": environmentRef01Data["id"],
		}
		switch v := environmentRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			environmentRef01MatchDt0["organization_id"] = v
		default:
			environmentRef01MatchDt0["organization_id"] = setup.idmap["organization_id"]
		}
		environmentRef01DataDt0Loaded, err := environmentRef01Ent.Load(environmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		environmentRef01DataDt0LoadResult := core.ToMapAny(entityData(environmentRef01DataDt0Loaded))
		if environmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(environmentRef01DataDt0LoadResult["id"], environmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		environmentRef01MatchRm0 := map[string]any{
			"id": environmentRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			environmentRef01MatchRm0["organization_id"] = v
		} else {
			environmentRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = environmentRef01Ent.Remove(environmentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func environmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "environment", "EnvironmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read environment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse environment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"environment01", "environment02", "environment03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ENVIRONMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ENVIRONMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ENVIRONMENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
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
