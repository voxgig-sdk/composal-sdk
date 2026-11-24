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
const site_secretEntityLiveStrict = true


func TestSiteSecretEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SiteSecret(nil)
		if ent == nil {
			t.Fatal("expected non-nil SiteSecretEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SiteSecret(nil).Update(map[string]any{"id": 1, "organization_id": "x", "site_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := site_secretBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "site_secret." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"site_secret.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}\"}")
			t.Skip("Live coverage incomplete: site_secret.update.0 excluded (GET-only live run: needs PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "site01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, site_secretEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SITE_SECRET_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, site_secretEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a site_secret record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		siteSecretRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.site_secret")))
		var siteSecretRef01Data map[string]any
		if len(siteSecretRef01DataRaw) > 0 {
			siteSecretRef01Data = core.ToMapAny(siteSecretRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = siteSecretRef01Data

		if setup.live {
			livePace()
		}
		// UPDATE
		siteSecretRef01Ent := client.SiteSecret(nil)
		siteSecretRef01DataUp0Up := map[string]any{
			"id": siteSecretRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"site_id": setup.idmap["site_id"],
		}

		siteSecretRef01MarkdefUp0Name := "native_agent_id"
		siteSecretRef01MarkdefUp0Value := fmt.Sprintf("Mark01-site_secret_ref01_%d", setup.now)
		siteSecretRef01DataUp0Up[siteSecretRef01MarkdefUp0Name] = siteSecretRef01MarkdefUp0Value

		siteSecretRef01ResdataUp0Result, err := siteSecretRef01Ent.Update(siteSecretRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		siteSecretRef01ResdataUp0 := core.ToMapAny(entityData(siteSecretRef01ResdataUp0Result))
		if siteSecretRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(siteSecretRef01ResdataUp0["id"], siteSecretRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if siteSecretRef01ResdataUp0[siteSecretRef01MarkdefUp0Name] != siteSecretRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", siteSecretRef01MarkdefUp0Name, siteSecretRef01ResdataUp0[siteSecretRef01MarkdefUp0Name])
		}

	})
}

func site_secretBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "site_secret", "SiteSecretTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read site_secret test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse site_secret test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"site_secret01", "site_secret02", "site_secret03", "organization01", "organization02", "organization03", "site01", "site02", "site03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SITE_SECRET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SITE_SECRET_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SITE_SECRET_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add organization_id alias for update test.
	if idmapResolved["organization_id"] == nil {
		idmapResolved["organization_id"] = idmapResolved["organization01"]
	}
	// Add site_id alias for update test.
	if idmapResolved["site_id"] == nil {
		idmapResolved["site_id"] = idmapResolved["site01"]
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
