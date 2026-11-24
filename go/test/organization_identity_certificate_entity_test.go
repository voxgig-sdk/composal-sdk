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
const organization_identity_certificateEntityLiveStrict = true


func TestOrganizationIdentityCertificateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OrganizationIdentityCertificate(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrganizationIdentityCertificateEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.OrganizationIdentityCertificate(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := organization_identity_certificateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "organization_identity_certificate." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"organization_identity_certificate.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}/expire\"}")
			t.Log("LIVE STEP {\"id\":\"organization_identity_certificate.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_identity_certificate.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/identity_certificates/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_identity_certificate.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_identity_certificateEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ORGANIZATION_IDENTITY_CERTIFICATE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["organization_identity_certificate01"]
			}
			livePace()
			liveExisting(t, organization_identity_certificateEntityLiveStrict, setup.data, "organization_identity_certificate", "id", _liveId,
				func() (any, error) {
					return client.OrganizationIdentityCertificate(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		organizationIdentityCertificateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.organization_identity_certificate")))
		var organizationIdentityCertificateRef01Data map[string]any
		if len(organizationIdentityCertificateRef01DataRaw) > 0 {
			organizationIdentityCertificateRef01Data = core.ToMapAny(organizationIdentityCertificateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = organizationIdentityCertificateRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		organizationIdentityCertificateRef01Ent := client.OrganizationIdentityCertificate(nil)
		organizationIdentityCertificateRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationIdentityCertificateRef01ListResult, err := organizationIdentityCertificateRef01Ent.List(organizationIdentityCertificateRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, organizationIdentityCertificateRef01ListOk := organizationIdentityCertificateRef01ListResult.([]any)
		if !organizationIdentityCertificateRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationIdentityCertificateRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		organizationIdentityCertificateRef01MatchDt0 := map[string]any{
			"id": organizationIdentityCertificateRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationIdentityCertificateRef01MatchDt0["organization_id"] = v
		} else {
			organizationIdentityCertificateRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		organizationIdentityCertificateRef01DataDt0Loaded, err := organizationIdentityCertificateRef01Ent.Load(organizationIdentityCertificateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		organizationIdentityCertificateRef01DataDt0LoadResult := core.ToMapAny(entityData(organizationIdentityCertificateRef01DataDt0Loaded))
		if organizationIdentityCertificateRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(organizationIdentityCertificateRef01DataDt0LoadResult["id"], organizationIdentityCertificateRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_identity_certificateEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ORGANIZATION_IDENTITY_CERTIFICATE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		organizationIdentityCertificateRef01Ent := client.OrganizationIdentityCertificate(nil)
		organizationIdentityCertificateRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "organization_identity_certificate"}), "organization_identity_certificate_ref01"))
		organizationIdentityCertificateRef01Data["organization_id"] = setup.idmap["organization01"]

		organizationIdentityCertificateRef01DataResult, err := organizationIdentityCertificateRef01Ent.Create(organizationIdentityCertificateRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		organizationIdentityCertificateRef01Data = core.ToMapAny(entityData(organizationIdentityCertificateRef01DataResult))
		if organizationIdentityCertificateRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if organizationIdentityCertificateRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationIdentityCertificateRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationIdentityCertificateRef01ListResult, err := organizationIdentityCertificateRef01Ent.List(organizationIdentityCertificateRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationIdentityCertificateRef01List, organizationIdentityCertificateRef01ListOk := organizationIdentityCertificateRef01ListResult.([]any)
		if !organizationIdentityCertificateRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationIdentityCertificateRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(organizationIdentityCertificateRef01List), map[string]any{"id": organizationIdentityCertificateRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		organizationIdentityCertificateRef01DataUp0Up := map[string]any{
			"id": organizationIdentityCertificateRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		organizationIdentityCertificateRef01ResdataUp0Result, err := organizationIdentityCertificateRef01Ent.Update(organizationIdentityCertificateRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		organizationIdentityCertificateRef01ResdataUp0 := core.ToMapAny(entityData(organizationIdentityCertificateRef01ResdataUp0Result))
		if organizationIdentityCertificateRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(organizationIdentityCertificateRef01ResdataUp0["id"], organizationIdentityCertificateRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		organizationIdentityCertificateRef01MatchDt0 := map[string]any{
			"id": organizationIdentityCertificateRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationIdentityCertificateRef01MatchDt0["organization_id"] = v
		} else {
			organizationIdentityCertificateRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		organizationIdentityCertificateRef01DataDt0Loaded, err := organizationIdentityCertificateRef01Ent.Load(organizationIdentityCertificateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		organizationIdentityCertificateRef01DataDt0LoadResult := core.ToMapAny(entityData(organizationIdentityCertificateRef01DataDt0Loaded))
		if organizationIdentityCertificateRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(organizationIdentityCertificateRef01DataDt0LoadResult["id"], organizationIdentityCertificateRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		organizationIdentityCertificateRef01MatchRm0 := map[string]any{
			"id": organizationIdentityCertificateRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationIdentityCertificateRef01MatchRm0["organization_id"] = v
		} else {
			organizationIdentityCertificateRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = organizationIdentityCertificateRef01Ent.Remove(organizationIdentityCertificateRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationIdentityCertificateRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationIdentityCertificateRef01ListRt0Result, err := organizationIdentityCertificateRef01Ent.List(organizationIdentityCertificateRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationIdentityCertificateRef01ListRt0, organizationIdentityCertificateRef01ListRt0Ok := organizationIdentityCertificateRef01ListRt0Result.([]any)
		if !organizationIdentityCertificateRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", organizationIdentityCertificateRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(organizationIdentityCertificateRef01ListRt0), map[string]any{"id": organizationIdentityCertificateRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func organization_identity_certificateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "organization_identity_certificate", "OrganizationIdentityCertificateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read organization_identity_certificate test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse organization_identity_certificate test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"organization_identity_certificate01", "organization_identity_certificate02", "organization_identity_certificate03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ORGANIZATION_IDENTITY_CERTIFICATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ORGANIZATION_IDENTITY_CERTIFICATE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ORGANIZATION_IDENTITY_CERTIFICATE_ENTID"])
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
