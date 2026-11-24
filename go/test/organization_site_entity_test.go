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
const organization_siteEntityLiveStrict = true


func TestOrganizationSiteEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OrganizationSite(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrganizationSiteEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.OrganizationSite(nil).List(map[string]any{"organization_id": 1, "native_agent_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := organization_siteBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "organization_site." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"organization_site.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/spark/organizations/{organization_id}/sites/{name}/token\"}")
			t.Log("LIVE STEP {\"id\":\"organization_site.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/spark/organizations/{organization_id}/sites/{name}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_site.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}\"}")
			t.Log("LIVE STEP {\"id\":\"organization_site.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_siteEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ORGANIZATION_SITE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		organizationSiteRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.organization_site")))
		var organizationSiteRef01Data map[string]any
		if len(organizationSiteRef01DataRaw) > 0 {
			organizationSiteRef01Data = core.ToMapAny(organizationSiteRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = organizationSiteRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		organizationSiteRef01Ent := client.OrganizationSite(nil)
		organizationSiteRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationSiteRef01ListResult, err := organizationSiteRef01Ent.List(organizationSiteRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, organizationSiteRef01ListOk := organizationSiteRef01ListResult.([]any)
		if !organizationSiteRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationSiteRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, organization_siteEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ORGANIZATION_SITE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		organizationSiteRef01Ent := client.OrganizationSite(nil)
		organizationSiteRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "organization_site"}), "organization_site_ref01"))
		organizationSiteRef01Data["organization_id"] = setup.idmap["organization01"]

		organizationSiteRef01DataResult, err := organizationSiteRef01Ent.Create(organizationSiteRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		organizationSiteRef01Data = core.ToMapAny(entityData(organizationSiteRef01DataResult))
		if organizationSiteRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if organizationSiteRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationSiteRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationSiteRef01ListResult, err := organizationSiteRef01Ent.List(organizationSiteRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationSiteRef01List, organizationSiteRef01ListOk := organizationSiteRef01ListResult.([]any)
		if !organizationSiteRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", organizationSiteRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(organizationSiteRef01List), map[string]any{"id": organizationSiteRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		organizationSiteRef01DataUp0Up := map[string]any{
			"id": organizationSiteRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		organizationSiteRef01ResdataUp0Result, err := organizationSiteRef01Ent.Update(organizationSiteRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		organizationSiteRef01ResdataUp0 := core.ToMapAny(entityData(organizationSiteRef01ResdataUp0Result))
		if organizationSiteRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(organizationSiteRef01ResdataUp0["id"], organizationSiteRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		organizationSiteRef01MatchRm0 := map[string]any{
			"id": organizationSiteRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			organizationSiteRef01MatchRm0["organization_id"] = v
		} else {
			organizationSiteRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = organizationSiteRef01Ent.Remove(organizationSiteRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		organizationSiteRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		organizationSiteRef01ListRt0Result, err := organizationSiteRef01Ent.List(organizationSiteRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		organizationSiteRef01ListRt0, organizationSiteRef01ListRt0Ok := organizationSiteRef01ListRt0Result.([]any)
		if !organizationSiteRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", organizationSiteRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(organizationSiteRef01ListRt0), map[string]any{"id": organizationSiteRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func organization_siteBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "organization_site", "OrganizationSiteTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read organization_site test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse organization_site test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"organization_site01", "organization_site02", "organization_site03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ORGANIZATION_SITE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ORGANIZATION_SITE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ORGANIZATION_SITE_ENTID"])
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
