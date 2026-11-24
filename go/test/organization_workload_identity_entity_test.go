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
const organization_workload_identityEntityLiveStrict = true


func TestOrganizationWorkloadIdentityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OrganizationWorkloadIdentity(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrganizationWorkloadIdentityEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.OrganizationWorkloadIdentity(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := organization_workload_identityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "organization_workload_identity." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"organization_workload_identity.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/activate\"}")
			t.Log("LIVE STEP {\"id\":\"organization_workload_identity.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/workload_identities/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_workload_identity.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/workload_identities/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_workload_identity.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_workload_identityEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ORGANIZATION_WORKLOAD_IDENTITY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["organization_workload_identity01"]
			}
			livePace()
			liveExisting(t, organization_workload_identityEntityLiveStrict, setup.data, "organization_workload_identity", "id", _liveId,
				func() (any, error) {
					return client.OrganizationWorkloadIdentity(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		organizationWorkloadIdentityRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.organization_workload_identity")))
		var organizationWorkloadIdentityRef01Data map[string]any
		if len(organizationWorkloadIdentityRef01DataRaw) > 0 {
			organizationWorkloadIdentityRef01Data = core.ToMapAny(organizationWorkloadIdentityRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = organizationWorkloadIdentityRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		organizationWorkloadIdentityRef01Ent := client.OrganizationWorkloadIdentity(nil)
		organizationWorkloadIdentityRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationWorkloadIdentityRef01ListResult, err := organizationWorkloadIdentityRef01Ent.List(organizationWorkloadIdentityRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, organizationWorkloadIdentityRef01ListOk := organizationWorkloadIdentityRef01ListResult.([]any)
		if !organizationWorkloadIdentityRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationWorkloadIdentityRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		organizationWorkloadIdentityRef01MatchDt0 := map[string]any{
			"id": organizationWorkloadIdentityRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationWorkloadIdentityRef01MatchDt0["organization_id"] = v
		} else {
			organizationWorkloadIdentityRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		organizationWorkloadIdentityRef01DataDt0Loaded, err := organizationWorkloadIdentityRef01Ent.Load(organizationWorkloadIdentityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		organizationWorkloadIdentityRef01DataDt0LoadResult := core.ToMapAny(entityData(organizationWorkloadIdentityRef01DataDt0Loaded))
		if organizationWorkloadIdentityRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(organizationWorkloadIdentityRef01DataDt0LoadResult["id"], organizationWorkloadIdentityRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_workload_identityEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ORGANIZATION_WORKLOAD_IDENTITY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		organizationWorkloadIdentityRef01Ent := client.OrganizationWorkloadIdentity(nil)
		organizationWorkloadIdentityRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "organization_workload_identity"}), "organization_workload_identity_ref01"))
		organizationWorkloadIdentityRef01Data["organization_id"] = setup.idmap["organization01"]

		organizationWorkloadIdentityRef01DataResult, err := organizationWorkloadIdentityRef01Ent.Create(organizationWorkloadIdentityRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		organizationWorkloadIdentityRef01Data = core.ToMapAny(entityData(organizationWorkloadIdentityRef01DataResult))
		if organizationWorkloadIdentityRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if organizationWorkloadIdentityRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationWorkloadIdentityRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationWorkloadIdentityRef01ListResult, err := organizationWorkloadIdentityRef01Ent.List(organizationWorkloadIdentityRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationWorkloadIdentityRef01List, organizationWorkloadIdentityRef01ListOk := organizationWorkloadIdentityRef01ListResult.([]any)
		if !organizationWorkloadIdentityRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationWorkloadIdentityRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(organizationWorkloadIdentityRef01List), map[string]any{"id": organizationWorkloadIdentityRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		organizationWorkloadIdentityRef01DataUp0Up := map[string]any{
			"id": organizationWorkloadIdentityRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		organizationWorkloadIdentityRef01ResdataUp0Result, err := organizationWorkloadIdentityRef01Ent.Update(organizationWorkloadIdentityRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		organizationWorkloadIdentityRef01ResdataUp0 := core.ToMapAny(entityData(organizationWorkloadIdentityRef01ResdataUp0Result))
		if organizationWorkloadIdentityRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(organizationWorkloadIdentityRef01ResdataUp0["id"], organizationWorkloadIdentityRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		organizationWorkloadIdentityRef01MatchDt0 := map[string]any{
			"id": organizationWorkloadIdentityRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationWorkloadIdentityRef01MatchDt0["organization_id"] = v
		} else {
			organizationWorkloadIdentityRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		organizationWorkloadIdentityRef01DataDt0Loaded, err := organizationWorkloadIdentityRef01Ent.Load(organizationWorkloadIdentityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		organizationWorkloadIdentityRef01DataDt0LoadResult := core.ToMapAny(entityData(organizationWorkloadIdentityRef01DataDt0Loaded))
		if organizationWorkloadIdentityRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(organizationWorkloadIdentityRef01DataDt0LoadResult["id"], organizationWorkloadIdentityRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		organizationWorkloadIdentityRef01MatchRm0 := map[string]any{
			"id": organizationWorkloadIdentityRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationWorkloadIdentityRef01MatchRm0["organization_id"] = v
		} else {
			organizationWorkloadIdentityRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = organizationWorkloadIdentityRef01Ent.Remove(organizationWorkloadIdentityRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationWorkloadIdentityRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationWorkloadIdentityRef01ListRt0Result, err := organizationWorkloadIdentityRef01Ent.List(organizationWorkloadIdentityRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationWorkloadIdentityRef01ListRt0, organizationWorkloadIdentityRef01ListRt0Ok := organizationWorkloadIdentityRef01ListRt0Result.([]any)
		if !organizationWorkloadIdentityRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", organizationWorkloadIdentityRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(organizationWorkloadIdentityRef01ListRt0), map[string]any{"id": organizationWorkloadIdentityRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func organization_workload_identityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "organization_workload_identity", "OrganizationWorkloadIdentityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read organization_workload_identity test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse organization_workload_identity test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"organization_workload_identity01", "organization_workload_identity02", "organization_workload_identity03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ORGANIZATION_WORKLOAD_IDENTITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ORGANIZATION_WORKLOAD_IDENTITY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ORGANIZATION_WORKLOAD_IDENTITY_ENTID"])
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
