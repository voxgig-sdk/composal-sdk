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
const site_access_keyEntityLiveStrict = true


func TestSiteAccessKeyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SiteAccessKey(nil)
		if ent == nil {
			t.Fatal("expected non-nil SiteAccessKeyEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SiteAccessKey(nil).Load(map[string]any{"organization_id": 1, "site_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := site_access_keyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "site_access_key." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"site_access_key.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys\"}")
			t.Log("LIVE STEP {\"id\":\"site_access_key.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only site_access_key.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"site_access_key.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys/{key_id}\"}")
			t.Skip("Live coverage incomplete: site_access_key.create.0 excluded (GET-only live run: needs POST /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys); site_access_key.load.1 excluded (GET-only live run: reads a record only site_access_key.create.0 gives); site_access_key.remove.2 excluded (GET-only live run: needs DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys/{key_id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "site01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, site_access_keyEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		siteAccessKeyRef01Ent := client.SiteAccessKey(nil)
		siteAccessKeyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "site_access_key"}), "site_access_key_ref01"))
		siteAccessKeyRef01Data["organization_id"] = setup.idmap["organization01"]
		siteAccessKeyRef01Data["site_id"] = setup.idmap["site01"]

		siteAccessKeyRef01DataResult, err := siteAccessKeyRef01Ent.Create(siteAccessKeyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		siteAccessKeyRef01Data = core.ToMapAny(entityData(siteAccessKeyRef01DataResult))
		if siteAccessKeyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if siteAccessKeyRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		siteAccessKeyRef01MatchDt0 := map[string]any{
			"id": siteAccessKeyRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			siteAccessKeyRef01MatchDt0["organization_id"] = v
		} else {
			siteAccessKeyRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		siteAccessKeyRef01DataDt0Loaded, err := siteAccessKeyRef01Ent.Load(siteAccessKeyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		siteAccessKeyRef01DataDt0LoadResult := core.ToMapAny(entityData(siteAccessKeyRef01DataDt0Loaded))
		if siteAccessKeyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(siteAccessKeyRef01DataDt0LoadResult["id"], siteAccessKeyRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		siteAccessKeyRef01MatchRm0 := map[string]any{
			"id": siteAccessKeyRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			siteAccessKeyRef01MatchRm0["organization_id"] = v
		} else {
			siteAccessKeyRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["site_id"]; v != nil {
			siteAccessKeyRef01MatchRm0["site_id"] = v
		} else {
			siteAccessKeyRef01MatchRm0["site_id"] = setup.idmap["site01"]
		}
		_, err = siteAccessKeyRef01Ent.Remove(siteAccessKeyRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func site_access_keyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "site_access_key", "SiteAccessKeyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read site_access_key test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse site_access_key test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"site_access_key01", "site_access_key02", "site_access_key03", "organization01", "organization02", "organization03", "site01", "site02", "site03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
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
