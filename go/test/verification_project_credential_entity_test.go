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
const verification_project_credentialEntityLiveStrict = true


func TestVerificationProjectCredentialEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.VerificationProjectCredential(nil)
		if ent == nil {
			t.Fatal("expected non-nil VerificationProjectCredentialEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.VerificationProjectCredential(nil).List(map[string]any{"organization_id": 1, "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := verification_project_credentialBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "verification_project_credential." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"verification_project_credential.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable\"}")
			t.Log("LIVE STEP {\"id\":\"verification_project_credential.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"verification_project_credential.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"verification_project_credential.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, verification_project_credentialEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VERIFICATION_PROJECT_CREDENTIAL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["verification_project_credential01"]
			}
			livePace()
			liveExisting(t, verification_project_credentialEntityLiveStrict, setup.data, "verification_project_credential", "id", _liveId,
				func() (any, error) {
					return client.VerificationProjectCredential(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "project_id": setup.idmap["project01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		verificationProjectCredentialRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.verification_project_credential")))
		var verificationProjectCredentialRef01Data map[string]any
		if len(verificationProjectCredentialRef01DataRaw) > 0 {
			verificationProjectCredentialRef01Data = core.ToMapAny(verificationProjectCredentialRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = verificationProjectCredentialRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		verificationProjectCredentialRef01Ent := client.VerificationProjectCredential(nil)
		verificationProjectCredentialRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		verificationProjectCredentialRef01ListResult, err := verificationProjectCredentialRef01Ent.List(verificationProjectCredentialRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, verificationProjectCredentialRef01ListOk := verificationProjectCredentialRef01ListResult.([]any)
		if !verificationProjectCredentialRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", verificationProjectCredentialRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		verificationProjectCredentialRef01MatchDt0 := map[string]any{
			"id": verificationProjectCredentialRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verificationProjectCredentialRef01MatchDt0["organization_id"] = v
		} else {
			verificationProjectCredentialRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		switch v := verificationProjectCredentialRef01Data["project_id"].(type) {
		case string, bool, float64, int, int64:
			verificationProjectCredentialRef01MatchDt0["project_id"] = v
		default:
			if v := setup.idmap["project_id"]; v != nil {
				verificationProjectCredentialRef01MatchDt0["project_id"] = v
			} else {
				verificationProjectCredentialRef01MatchDt0["project_id"] = setup.idmap["project01"]
			}
		}
		verificationProjectCredentialRef01DataDt0Loaded, err := verificationProjectCredentialRef01Ent.Load(verificationProjectCredentialRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		verificationProjectCredentialRef01DataDt0LoadResult := core.ToMapAny(entityData(verificationProjectCredentialRef01DataDt0Loaded))
		if verificationProjectCredentialRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(verificationProjectCredentialRef01DataDt0LoadResult["id"], verificationProjectCredentialRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "project01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, verification_project_credentialEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VERIFICATION_PROJECT_CREDENTIAL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		verificationProjectCredentialRef01Ent := client.VerificationProjectCredential(nil)
		verificationProjectCredentialRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "verification_project_credential"}), "verification_project_credential_ref01"))
		verificationProjectCredentialRef01Data["organization_id"] = setup.idmap["organization01"]
		verificationProjectCredentialRef01Data["project_id"] = setup.idmap["project01"]

		verificationProjectCredentialRef01DataResult, err := verificationProjectCredentialRef01Ent.Create(verificationProjectCredentialRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		verificationProjectCredentialRef01Data = core.ToMapAny(entityData(verificationProjectCredentialRef01DataResult))
		if verificationProjectCredentialRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if verificationProjectCredentialRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		verificationProjectCredentialRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		verificationProjectCredentialRef01ListResult, err := verificationProjectCredentialRef01Ent.List(verificationProjectCredentialRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		verificationProjectCredentialRef01List, verificationProjectCredentialRef01ListOk := verificationProjectCredentialRef01ListResult.([]any)
		if !verificationProjectCredentialRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", verificationProjectCredentialRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(verificationProjectCredentialRef01List), map[string]any{"id": verificationProjectCredentialRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		verificationProjectCredentialRef01DataUp0Up := map[string]any{
			"id": verificationProjectCredentialRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"project_id": setup.idmap["project_id"],
		}

		verificationProjectCredentialRef01MarkdefUp0Name := "browser_session"
		verificationProjectCredentialRef01MarkdefUp0Value := fmt.Sprintf("Mark01-verification_project_credential_ref01_%d", setup.now)
		verificationProjectCredentialRef01DataUp0Up[verificationProjectCredentialRef01MarkdefUp0Name] = verificationProjectCredentialRef01MarkdefUp0Value

		verificationProjectCredentialRef01ResdataUp0Result, err := verificationProjectCredentialRef01Ent.Update(verificationProjectCredentialRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		verificationProjectCredentialRef01ResdataUp0 := core.ToMapAny(entityData(verificationProjectCredentialRef01ResdataUp0Result))
		if verificationProjectCredentialRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(verificationProjectCredentialRef01ResdataUp0["id"], verificationProjectCredentialRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if verificationProjectCredentialRef01ResdataUp0[verificationProjectCredentialRef01MarkdefUp0Name] != verificationProjectCredentialRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", verificationProjectCredentialRef01MarkdefUp0Name, verificationProjectCredentialRef01ResdataUp0[verificationProjectCredentialRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		verificationProjectCredentialRef01MatchDt0 := map[string]any{
			"id": verificationProjectCredentialRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verificationProjectCredentialRef01MatchDt0["organization_id"] = v
		} else {
			verificationProjectCredentialRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		switch v := verificationProjectCredentialRef01Data["project_id"].(type) {
		case string, bool, float64, int, int64:
			verificationProjectCredentialRef01MatchDt0["project_id"] = v
		default:
			if v := setup.idmap["project_id"]; v != nil {
				verificationProjectCredentialRef01MatchDt0["project_id"] = v
			} else {
				verificationProjectCredentialRef01MatchDt0["project_id"] = setup.idmap["project01"]
			}
		}
		verificationProjectCredentialRef01DataDt0Loaded, err := verificationProjectCredentialRef01Ent.Load(verificationProjectCredentialRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		verificationProjectCredentialRef01DataDt0LoadResult := core.ToMapAny(entityData(verificationProjectCredentialRef01DataDt0Loaded))
		if verificationProjectCredentialRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(verificationProjectCredentialRef01DataDt0LoadResult["id"], verificationProjectCredentialRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		verificationProjectCredentialRef01MatchRm0 := map[string]any{
			"id": verificationProjectCredentialRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verificationProjectCredentialRef01MatchRm0["organization_id"] = v
		} else {
			verificationProjectCredentialRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["project_id"]; v != nil {
			verificationProjectCredentialRef01MatchRm0["project_id"] = v
		} else {
			verificationProjectCredentialRef01MatchRm0["project_id"] = setup.idmap["project01"]
		}
		_, err = verificationProjectCredentialRef01Ent.Remove(verificationProjectCredentialRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		verificationProjectCredentialRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"project_id": setup.idmap["project01"],
		}

		verificationProjectCredentialRef01ListRt0Result, err := verificationProjectCredentialRef01Ent.List(verificationProjectCredentialRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		verificationProjectCredentialRef01ListRt0, verificationProjectCredentialRef01ListRt0Ok := verificationProjectCredentialRef01ListRt0Result.([]any)
		if !verificationProjectCredentialRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", verificationProjectCredentialRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(verificationProjectCredentialRef01ListRt0), map[string]any{"id": verificationProjectCredentialRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func verification_project_credentialBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "verification_project_credential", "VerificationProjectCredentialTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read verification_project_credential test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse verification_project_credential test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"verification_project_credential01", "verification_project_credential02", "verification_project_credential03", "organization01", "organization02", "organization03", "project01", "project02", "project03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_VERIFICATION_PROJECT_CREDENTIAL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_VERIFICATION_PROJECT_CREDENTIAL_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_VERIFICATION_PROJECT_CREDENTIAL_ENTID"])
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
