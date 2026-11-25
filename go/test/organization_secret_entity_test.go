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
const organization_secretEntityLiveStrict = true


func TestOrganizationSecretEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OrganizationSecret(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrganizationSecretEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.OrganizationSecret(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := organization_secretBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "organization_secret." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"organization_secret.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/disable\"}")
			t.Log("LIVE STEP {\"id\":\"organization_secret.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/secrets/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_secret.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/secrets/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_secret.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_secretEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ORGANIZATION_SECRET_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["organization_secret01"]
			}
			livePace()
			liveExisting(t, organization_secretEntityLiveStrict, setup.data, "organization_secret", "id", _liveId,
				func() (any, error) {
					return client.OrganizationSecret(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		organizationSecretRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.organization_secret")))
		var organizationSecretRef01Data map[string]any
		if len(organizationSecretRef01DataRaw) > 0 {
			organizationSecretRef01Data = core.ToMapAny(organizationSecretRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = organizationSecretRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		organizationSecretRef01Ent := client.OrganizationSecret(nil)
		organizationSecretRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationSecretRef01ListResult, err := organizationSecretRef01Ent.List(organizationSecretRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, organizationSecretRef01ListOk := organizationSecretRef01ListResult.([]any)
		if !organizationSecretRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationSecretRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		organizationSecretRef01MatchDt0 := map[string]any{
			"id": organizationSecretRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationSecretRef01MatchDt0["organization_id"] = v
		} else {
			organizationSecretRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		organizationSecretRef01DataDt0Loaded, err := organizationSecretRef01Ent.Load(organizationSecretRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		organizationSecretRef01DataDt0LoadResult := core.ToMapAny(entityData(organizationSecretRef01DataDt0Loaded))
		if organizationSecretRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(organizationSecretRef01DataDt0LoadResult["id"], organizationSecretRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_secretEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ORGANIZATION_SECRET_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		organizationSecretRef01Ent := client.OrganizationSecret(nil)
		organizationSecretRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "organization_secret"}), "organization_secret_ref01"))
		organizationSecretRef01Data["organization_id"] = setup.idmap["organization01"]

		organizationSecretRef01DataResult, err := organizationSecretRef01Ent.Create(organizationSecretRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		organizationSecretRef01Data = core.ToMapAny(entityData(organizationSecretRef01DataResult))
		if organizationSecretRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if organizationSecretRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationSecretRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationSecretRef01ListResult, err := organizationSecretRef01Ent.List(organizationSecretRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationSecretRef01List, organizationSecretRef01ListOk := organizationSecretRef01ListResult.([]any)
		if !organizationSecretRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationSecretRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(organizationSecretRef01List), map[string]any{"id": organizationSecretRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		organizationSecretRef01DataUp0Up := map[string]any{
			"id": organizationSecretRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		organizationSecretRef01MarkdefUp0Name := "app_environment_id"
		organizationSecretRef01MarkdefUp0Value := fmt.Sprintf("Mark01-organization_secret_ref01_%d", setup.now)
		organizationSecretRef01DataUp0Up[organizationSecretRef01MarkdefUp0Name] = organizationSecretRef01MarkdefUp0Value

		organizationSecretRef01ResdataUp0Result, err := organizationSecretRef01Ent.Update(organizationSecretRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		organizationSecretRef01ResdataUp0 := core.ToMapAny(entityData(organizationSecretRef01ResdataUp0Result))
		if organizationSecretRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(organizationSecretRef01ResdataUp0["id"], organizationSecretRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if organizationSecretRef01ResdataUp0[organizationSecretRef01MarkdefUp0Name] != organizationSecretRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", organizationSecretRef01MarkdefUp0Name, organizationSecretRef01ResdataUp0[organizationSecretRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		organizationSecretRef01MatchDt0 := map[string]any{
			"id": organizationSecretRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationSecretRef01MatchDt0["organization_id"] = v
		} else {
			organizationSecretRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		organizationSecretRef01DataDt0Loaded, err := organizationSecretRef01Ent.Load(organizationSecretRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		organizationSecretRef01DataDt0LoadResult := core.ToMapAny(entityData(organizationSecretRef01DataDt0Loaded))
		if organizationSecretRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(organizationSecretRef01DataDt0LoadResult["id"], organizationSecretRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		organizationSecretRef01MatchRm0 := map[string]any{
			"id": organizationSecretRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationSecretRef01MatchRm0["organization_id"] = v
		} else {
			organizationSecretRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = organizationSecretRef01Ent.Remove(organizationSecretRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationSecretRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationSecretRef01ListRt0Result, err := organizationSecretRef01Ent.List(organizationSecretRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationSecretRef01ListRt0, organizationSecretRef01ListRt0Ok := organizationSecretRef01ListRt0Result.([]any)
		if !organizationSecretRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", organizationSecretRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(organizationSecretRef01ListRt0), map[string]any{"id": organizationSecretRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func organization_secretBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "organization_secret", "OrganizationSecretTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read organization_secret test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse organization_secret test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"organization_secret01", "organization_secret02", "organization_secret03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ORGANIZATION_SECRET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ORGANIZATION_SECRET_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ORGANIZATION_SECRET_ENTID"])
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
