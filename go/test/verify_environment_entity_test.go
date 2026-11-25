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
const verify_environmentEntityLiveStrict = true


func TestVerifyEnvironmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.VerifyEnvironment(nil)
		if ent == nil {
			t.Fatal("expected non-nil VerifyEnvironmentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.VerifyEnvironment(nil).Load(map[string]any{"id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := verify_environmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "verify_environment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"verify_environment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments\"}")
			t.Log("LIVE STEP {\"id\":\"verify_environment.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/environments/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"verify_environment.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only verify_environment.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"verify_environment.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/environments/{id}\"}")
			t.Skip("Live coverage incomplete: verify_environment.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments); verify_environment.update.1 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/environments/{id}); verify_environment.load.2 excluded (GET-only live run: reads a record only verify_environment.create.0 gives); verify_environment.remove.3 excluded (GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/environments/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, verify_environmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VERIFY_ENVIRONMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		verifyEnvironmentRef01Ent := client.VerifyEnvironment(nil)
		verifyEnvironmentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "verify_environment"}), "verify_environment_ref01"))
		verifyEnvironmentRef01Data["organization_id"] = setup.idmap["organization01"]

		verifyEnvironmentRef01DataResult, err := verifyEnvironmentRef01Ent.Create(verifyEnvironmentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		verifyEnvironmentRef01Data = core.ToMapAny(entityData(verifyEnvironmentRef01DataResult))
		if verifyEnvironmentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if verifyEnvironmentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		verifyEnvironmentRef01DataUp0Up := map[string]any{
			"id": verifyEnvironmentRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		verifyEnvironmentRef01MarkdefUp0Name := "active_revision_id"
		verifyEnvironmentRef01MarkdefUp0Value := fmt.Sprintf("Mark01-verify_environment_ref01_%d", setup.now)
		verifyEnvironmentRef01DataUp0Up[verifyEnvironmentRef01MarkdefUp0Name] = verifyEnvironmentRef01MarkdefUp0Value

		verifyEnvironmentRef01ResdataUp0Result, err := verifyEnvironmentRef01Ent.Update(verifyEnvironmentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		verifyEnvironmentRef01ResdataUp0 := core.ToMapAny(entityData(verifyEnvironmentRef01ResdataUp0Result))
		if verifyEnvironmentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(verifyEnvironmentRef01ResdataUp0["id"], verifyEnvironmentRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if verifyEnvironmentRef01ResdataUp0[verifyEnvironmentRef01MarkdefUp0Name] != verifyEnvironmentRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", verifyEnvironmentRef01MarkdefUp0Name, verifyEnvironmentRef01ResdataUp0[verifyEnvironmentRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		verifyEnvironmentRef01MatchDt0 := map[string]any{
			"id": verifyEnvironmentRef01Data["id"],
		}
		switch v := verifyEnvironmentRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			verifyEnvironmentRef01MatchDt0["organization_id"] = v
		default:
			verifyEnvironmentRef01MatchDt0["organization_id"] = setup.idmap["organization_id"]
		}
		verifyEnvironmentRef01DataDt0Loaded, err := verifyEnvironmentRef01Ent.Load(verifyEnvironmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		verifyEnvironmentRef01DataDt0LoadResult := core.ToMapAny(entityData(verifyEnvironmentRef01DataDt0Loaded))
		if verifyEnvironmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(verifyEnvironmentRef01DataDt0LoadResult["id"], verifyEnvironmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		verifyEnvironmentRef01MatchRm0 := map[string]any{
			"id": verifyEnvironmentRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verifyEnvironmentRef01MatchRm0["organization_id"] = v
		} else {
			verifyEnvironmentRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = verifyEnvironmentRef01Ent.Remove(verifyEnvironmentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func verify_environmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "verify_environment", "VerifyEnvironmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read verify_environment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse verify_environment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"verify_environment01", "verify_environment02", "verify_environment03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_VERIFY_ENVIRONMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_VERIFY_ENVIRONMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_VERIFY_ENVIRONMENT_ENTID"])
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
