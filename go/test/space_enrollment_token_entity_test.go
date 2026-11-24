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
const space_enrollment_tokenEntityLiveStrict = true


func TestSpaceEnrollmentTokenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpaceEnrollmentToken(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpaceEnrollmentTokenEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpaceEnrollmentToken(nil).Load(map[string]any{"id": 1, "space_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_enrollment_tokenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_enrollment_token." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_enrollment_token.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}/revoke\"}")
			t.Log("LIVE STEP {\"id\":\"space_enrollment_token.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_enrollment_token.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only space_enrollment_token.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"space_enrollment_token.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}\"}")
			t.Skip("Live coverage incomplete: space_enrollment_token.create.0 excluded (GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}/revoke); space_enrollment_token.update.1 excluded (GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id}); space_enrollment_token.load.2 excluded (GET-only live run: reads a record only space_enrollment_token.create.0 gives); space_enrollment_token.remove.3 excluded (GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/enrollment_tokens/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_enrollment_tokenEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_ENROLLMENT_TOKEN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spaceEnrollmentTokenRef01Ent := client.SpaceEnrollmentToken(nil)
		spaceEnrollmentTokenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_enrollment_token"}), "space_enrollment_token_ref01"))
		spaceEnrollmentTokenRef01Data["space_id"] = setup.idmap["space01"]

		spaceEnrollmentTokenRef01DataResult, err := spaceEnrollmentTokenRef01Ent.Create(spaceEnrollmentTokenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spaceEnrollmentTokenRef01Data = core.ToMapAny(entityData(spaceEnrollmentTokenRef01DataResult))
		if spaceEnrollmentTokenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if spaceEnrollmentTokenRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		spaceEnrollmentTokenRef01DataUp0Up := map[string]any{
			"id": spaceEnrollmentTokenRef01Data["id"],
			"space_id": setup.idmap["space_id"],
		}

		spaceEnrollmentTokenRef01ResdataUp0Result, err := spaceEnrollmentTokenRef01Ent.Update(spaceEnrollmentTokenRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		spaceEnrollmentTokenRef01ResdataUp0 := core.ToMapAny(entityData(spaceEnrollmentTokenRef01ResdataUp0Result))
		if spaceEnrollmentTokenRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(spaceEnrollmentTokenRef01ResdataUp0["id"], spaceEnrollmentTokenRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceEnrollmentTokenRef01MatchDt0 := map[string]any{
			"id": spaceEnrollmentTokenRef01Data["id"],
		}
		spaceEnrollmentTokenRef01DataDt0Loaded, err := spaceEnrollmentTokenRef01Ent.Load(spaceEnrollmentTokenRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceEnrollmentTokenRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceEnrollmentTokenRef01DataDt0Loaded))
		if spaceEnrollmentTokenRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceEnrollmentTokenRef01DataDt0LoadResult["id"], spaceEnrollmentTokenRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		spaceEnrollmentTokenRef01MatchRm0 := map[string]any{
			"id": spaceEnrollmentTokenRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceEnrollmentTokenRef01MatchRm0["space_id"] = v
		} else {
			spaceEnrollmentTokenRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = spaceEnrollmentTokenRef01Ent.Remove(spaceEnrollmentTokenRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func space_enrollment_tokenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_enrollment_token", "SpaceEnrollmentTokenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_enrollment_token test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_enrollment_token test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_enrollment_token01", "space_enrollment_token02", "space_enrollment_token03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_ENROLLMENT_TOKEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_ENROLLMENT_TOKEN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_ENROLLMENT_TOKEN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add space_id alias for update test.
	if idmapResolved["space_id"] == nil {
		idmapResolved["space_id"] = idmapResolved["space01"]
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
