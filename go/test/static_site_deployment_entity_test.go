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
const static_site_deploymentEntityLiveStrict = true


func TestStaticSiteDeploymentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.StaticSiteDeployment(nil)
		if ent == nil {
			t.Fatal("expected non-nil StaticSiteDeploymentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.StaticSiteDeployment(nil).List(map[string]any{"static_site_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := static_site_deploymentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "static_site_deployment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"static_site_deployment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/static_sites/{static_site_id}/deployments/{id}/activate\"}")
		if setup.live {
			for _, _liveKey := range []string{"static_site01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, static_site_deploymentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["static_site_deployment01"]
			}
			livePace()
			liveExisting(t, static_site_deploymentEntityLiveStrict, setup.data, "static_site_deployment", "id", _liveId,
				func() (any, error) {
					return client.StaticSiteDeployment(nil).List(map[string]any{"static_site_id": setup.idmap["static_site01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		staticSiteDeploymentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.static_site_deployment")))
		var staticSiteDeploymentRef01Data map[string]any
		if len(staticSiteDeploymentRef01DataRaw) > 0 {
			staticSiteDeploymentRef01Data = core.ToMapAny(staticSiteDeploymentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = staticSiteDeploymentRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		staticSiteDeploymentRef01Ent := client.StaticSiteDeployment(nil)
		staticSiteDeploymentRef01Match := map[string]any{
			"static_site_id": setup.idmap["static_site01"],
		}

		staticSiteDeploymentRef01ListResult, err := staticSiteDeploymentRef01Ent.List(staticSiteDeploymentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, staticSiteDeploymentRef01ListOk := staticSiteDeploymentRef01ListResult.([]any)
		if !staticSiteDeploymentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", staticSiteDeploymentRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		staticSiteDeploymentRef01MatchDt0 := map[string]any{
			"id": staticSiteDeploymentRef01Data["id"],
		}
		switch v := staticSiteDeploymentRef01Data["static_site_id"].(type) {
		case string, bool, float64, int, int64:
			staticSiteDeploymentRef01MatchDt0["static_site_id"] = v
		default:
			if v := setup.idmap["static_site_id"]; v != nil {
				staticSiteDeploymentRef01MatchDt0["static_site_id"] = v
			} else {
				staticSiteDeploymentRef01MatchDt0["static_site_id"] = setup.idmap["static_site01"]
			}
		}
		staticSiteDeploymentRef01DataDt0Loaded, err := staticSiteDeploymentRef01Ent.Load(staticSiteDeploymentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		staticSiteDeploymentRef01DataDt0LoadResult := core.ToMapAny(entityData(staticSiteDeploymentRef01DataDt0Loaded))
		if staticSiteDeploymentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(staticSiteDeploymentRef01DataDt0LoadResult["id"], staticSiteDeploymentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"static_site01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, static_site_deploymentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		staticSiteDeploymentRef01Ent := client.StaticSiteDeployment(nil)
		staticSiteDeploymentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "static_site_deployment"}), "static_site_deployment_ref01"))
		staticSiteDeploymentRef01Data["static_site_id"] = setup.idmap["static_site01"]

		staticSiteDeploymentRef01DataResult, err := staticSiteDeploymentRef01Ent.Create(staticSiteDeploymentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		staticSiteDeploymentRef01Data = core.ToMapAny(entityData(staticSiteDeploymentRef01DataResult))
		if staticSiteDeploymentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if staticSiteDeploymentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		staticSiteDeploymentRef01Match := map[string]any{
			"static_site_id": setup.idmap["static_site01"],
		}

		staticSiteDeploymentRef01ListResult, err := staticSiteDeploymentRef01Ent.List(staticSiteDeploymentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		staticSiteDeploymentRef01List, staticSiteDeploymentRef01ListOk := staticSiteDeploymentRef01ListResult.([]any)
		if !staticSiteDeploymentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", staticSiteDeploymentRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(staticSiteDeploymentRef01List), map[string]any{"id": staticSiteDeploymentRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		staticSiteDeploymentRef01MatchDt0 := map[string]any{
			"id": staticSiteDeploymentRef01Data["id"],
		}
		switch v := staticSiteDeploymentRef01Data["static_site_id"].(type) {
		case string, bool, float64, int, int64:
			staticSiteDeploymentRef01MatchDt0["static_site_id"] = v
		default:
			if v := setup.idmap["static_site_id"]; v != nil {
				staticSiteDeploymentRef01MatchDt0["static_site_id"] = v
			} else {
				staticSiteDeploymentRef01MatchDt0["static_site_id"] = setup.idmap["static_site01"]
			}
		}
		staticSiteDeploymentRef01DataDt0Loaded, err := staticSiteDeploymentRef01Ent.Load(staticSiteDeploymentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		staticSiteDeploymentRef01DataDt0LoadResult := core.ToMapAny(entityData(staticSiteDeploymentRef01DataDt0Loaded))
		if staticSiteDeploymentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(staticSiteDeploymentRef01DataDt0LoadResult["id"], staticSiteDeploymentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func static_site_deploymentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "static_site_deployment", "StaticSiteDeploymentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read static_site_deployment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse static_site_deployment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"static_site_deployment01", "static_site_deployment02", "static_site_deployment03", "static_site01", "static_site02", "static_site03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID"])
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
