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
const verification_project_personaEntityLiveStrict = true


func TestVerificationProjectPersonaEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.VerificationProjectPersona(nil)
		if ent == nil {
			t.Fatal("expected non-nil VerificationProjectPersonaEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.VerificationProjectPersona(nil).List(map[string]any{"organization_id": 1, "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := verification_project_personaBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "verification_project_persona." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"verification_project_persona.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"verification_project_persona.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"verification_project_persona.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"verification_project_persona.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, verification_project_personaEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["verification_project_persona01"]
			}
			livePace()
			liveExisting(t, verification_project_personaEntityLiveStrict, setup.data, "verification_project_persona", "id", _liveId,
				func() (any, error) {
					return client.VerificationProjectPersona(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "project_id": setup.idmap["project01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		verificationProjectPersonaRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.verification_project_persona")))
		var verificationProjectPersonaRef01Data map[string]any
		if len(verificationProjectPersonaRef01DataRaw) > 0 {
			verificationProjectPersonaRef01Data = core.ToMapAny(verificationProjectPersonaRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = verificationProjectPersonaRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		verificationProjectPersonaRef01Ent := client.VerificationProjectPersona(nil)
		verificationProjectPersonaRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		verificationProjectPersonaRef01ListResult, err := verificationProjectPersonaRef01Ent.List(verificationProjectPersonaRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, verificationProjectPersonaRef01ListOk := verificationProjectPersonaRef01ListResult.([]any)
		if !verificationProjectPersonaRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", verificationProjectPersonaRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		verificationProjectPersonaRef01MatchDt0 := map[string]any{
			"id": verificationProjectPersonaRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verificationProjectPersonaRef01MatchDt0["organization_id"] = v
		} else {
			verificationProjectPersonaRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		switch v := verificationProjectPersonaRef01Data["project_id"].(type) {
		case string, bool, float64, int, int64:
			verificationProjectPersonaRef01MatchDt0["project_id"] = v
		default:
			if v := setup.idmap["project_id"]; v != nil {
				verificationProjectPersonaRef01MatchDt0["project_id"] = v
			} else {
				verificationProjectPersonaRef01MatchDt0["project_id"] = setup.idmap["project01"]
			}
		}
		verificationProjectPersonaRef01DataDt0Loaded, err := verificationProjectPersonaRef01Ent.Load(verificationProjectPersonaRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		verificationProjectPersonaRef01DataDt0LoadResult := core.ToMapAny(entityData(verificationProjectPersonaRef01DataDt0Loaded))
		if verificationProjectPersonaRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(verificationProjectPersonaRef01DataDt0LoadResult["id"], verificationProjectPersonaRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, verification_project_personaEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		verificationProjectPersonaRef01Ent := client.VerificationProjectPersona(nil)
		verificationProjectPersonaRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "verification_project_persona"}), "verification_project_persona_ref01"))
		verificationProjectPersonaRef01Data["organization_id"] = setup.idmap["organization01"]
		verificationProjectPersonaRef01Data["project_id"] = setup.idmap["project01"]

		verificationProjectPersonaRef01DataResult, err := verificationProjectPersonaRef01Ent.Create(verificationProjectPersonaRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		verificationProjectPersonaRef01Data = core.ToMapAny(entityData(verificationProjectPersonaRef01DataResult))
		if verificationProjectPersonaRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if verificationProjectPersonaRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		verificationProjectPersonaRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		verificationProjectPersonaRef01ListResult, err := verificationProjectPersonaRef01Ent.List(verificationProjectPersonaRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		verificationProjectPersonaRef01List, verificationProjectPersonaRef01ListOk := verificationProjectPersonaRef01ListResult.([]any)
		if !verificationProjectPersonaRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", verificationProjectPersonaRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(verificationProjectPersonaRef01List), map[string]any{"id": verificationProjectPersonaRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		verificationProjectPersonaRef01DataUp0Up := map[string]any{
			"id": verificationProjectPersonaRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"project_id": setup.idmap["project_id"],
		}

		verificationProjectPersonaRef01MarkdefUp0Name := "access_mode"
		verificationProjectPersonaRef01MarkdefUp0Value := fmt.Sprintf("Mark01-verification_project_persona_ref01_%d", setup.now)
		verificationProjectPersonaRef01DataUp0Up[verificationProjectPersonaRef01MarkdefUp0Name] = verificationProjectPersonaRef01MarkdefUp0Value

		verificationProjectPersonaRef01ResdataUp0Result, err := verificationProjectPersonaRef01Ent.Update(verificationProjectPersonaRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		verificationProjectPersonaRef01ResdataUp0 := core.ToMapAny(entityData(verificationProjectPersonaRef01ResdataUp0Result))
		if verificationProjectPersonaRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(verificationProjectPersonaRef01ResdataUp0["id"], verificationProjectPersonaRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if verificationProjectPersonaRef01ResdataUp0[verificationProjectPersonaRef01MarkdefUp0Name] != verificationProjectPersonaRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", verificationProjectPersonaRef01MarkdefUp0Name, verificationProjectPersonaRef01ResdataUp0[verificationProjectPersonaRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		verificationProjectPersonaRef01MatchDt0 := map[string]any{
			"id": verificationProjectPersonaRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verificationProjectPersonaRef01MatchDt0["organization_id"] = v
		} else {
			verificationProjectPersonaRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		switch v := verificationProjectPersonaRef01Data["project_id"].(type) {
		case string, bool, float64, int, int64:
			verificationProjectPersonaRef01MatchDt0["project_id"] = v
		default:
			if v := setup.idmap["project_id"]; v != nil {
				verificationProjectPersonaRef01MatchDt0["project_id"] = v
			} else {
				verificationProjectPersonaRef01MatchDt0["project_id"] = setup.idmap["project01"]
			}
		}
		verificationProjectPersonaRef01DataDt0Loaded, err := verificationProjectPersonaRef01Ent.Load(verificationProjectPersonaRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		verificationProjectPersonaRef01DataDt0LoadResult := core.ToMapAny(entityData(verificationProjectPersonaRef01DataDt0Loaded))
		if verificationProjectPersonaRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(verificationProjectPersonaRef01DataDt0LoadResult["id"], verificationProjectPersonaRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		verificationProjectPersonaRef01MatchRm0 := map[string]any{
			"id": verificationProjectPersonaRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verificationProjectPersonaRef01MatchRm0["organization_id"] = v
		} else {
			verificationProjectPersonaRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			verificationProjectPersonaRef01MatchRm0["project_id"] = v
		} else {
			verificationProjectPersonaRef01MatchRm0["project_id"] = setup.idmap["project01"]
		}
		_, err = verificationProjectPersonaRef01Ent.Remove(verificationProjectPersonaRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		verificationProjectPersonaRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		verificationProjectPersonaRef01ListRt0Result, err := verificationProjectPersonaRef01Ent.List(verificationProjectPersonaRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		verificationProjectPersonaRef01ListRt0, verificationProjectPersonaRef01ListRt0Ok := verificationProjectPersonaRef01ListRt0Result.([]any)
		if !verificationProjectPersonaRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", verificationProjectPersonaRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(verificationProjectPersonaRef01ListRt0), map[string]any{"id": verificationProjectPersonaRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func verification_project_personaBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "verification_project_persona", "VerificationProjectPersonaTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read verification_project_persona test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse verification_project_persona test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"verification_project_persona01", "verification_project_persona02", "verification_project_persona03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID"])
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
