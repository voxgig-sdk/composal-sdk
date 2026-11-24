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
const service_endpointEntityLiveStrict = true


func TestServiceEndpointEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ServiceEndpoint(nil)
		if ent == nil {
			t.Fatal("expected non-nil ServiceEndpointEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ServiceEndpoint(nil).Load(map[string]any{"app_id": 1, "service_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := service_endpointBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "service_endpoint." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"service_endpoint.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints\"}")
			t.Log("LIVE STEP {\"id\":\"service_endpoint.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"service_endpoint.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only service_endpoint.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"service_endpoint.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}\"}")
			t.Skip("Live coverage incomplete: service_endpoint.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints); service_endpoint.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}); service_endpoint.load.2 excluded (GET-only live run: reads a record only service_endpoint.create.0 gives); service_endpoint.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01", "service01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, service_endpointEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		serviceEndpointRef01Ent := client.ServiceEndpoint(nil)
		serviceEndpointRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "service_endpoint"}), "service_endpoint_ref01"))
		serviceEndpointRef01Data["app_id"] = setup.idmap["app01"]
		serviceEndpointRef01Data["service_id"] = setup.idmap["service01"]

		serviceEndpointRef01DataResult, err := serviceEndpointRef01Ent.Create(serviceEndpointRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		serviceEndpointRef01Data = core.ToMapAny(entityData(serviceEndpointRef01DataResult))
		if serviceEndpointRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if serviceEndpointRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		serviceEndpointRef01DataUp0Up := map[string]any{
			"id": serviceEndpointRef01Data["id"],
			"app_id": setup.idmap["app_id"],
			"service_id": setup.idmap["service_id"],
		}

		serviceEndpointRef01ResdataUp0Result, err := serviceEndpointRef01Ent.Update(serviceEndpointRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		serviceEndpointRef01ResdataUp0 := core.ToMapAny(entityData(serviceEndpointRef01ResdataUp0Result))
		if serviceEndpointRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(serviceEndpointRef01ResdataUp0["id"], serviceEndpointRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		serviceEndpointRef01MatchDt0 := map[string]any{
			"id": serviceEndpointRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			serviceEndpointRef01MatchDt0["app_id"] = v
		} else {
			serviceEndpointRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		serviceEndpointRef01DataDt0Loaded, err := serviceEndpointRef01Ent.Load(serviceEndpointRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		serviceEndpointRef01DataDt0LoadResult := core.ToMapAny(entityData(serviceEndpointRef01DataDt0Loaded))
		if serviceEndpointRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(serviceEndpointRef01DataDt0LoadResult["id"], serviceEndpointRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		serviceEndpointRef01MatchRm0 := map[string]any{
			"id": serviceEndpointRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			serviceEndpointRef01MatchRm0["app_id"] = v
		} else {
			serviceEndpointRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["service_id"]; v != nil {
			serviceEndpointRef01MatchRm0["service_id"] = v
		} else {
			serviceEndpointRef01MatchRm0["service_id"] = setup.idmap["service01"]
		}
		_, err = serviceEndpointRef01Ent.Remove(serviceEndpointRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func service_endpointBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "service_endpoint", "ServiceEndpointTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read service_endpoint test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse service_endpoint test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"service_endpoint01", "service_endpoint02", "service_endpoint03", "app01", "app02", "app03", "service01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add app_id alias for update test.
	if idmapResolved["app_id"] == nil {
		idmapResolved["app_id"] = idmapResolved["app01"]
	}
	// Add service_id alias for update test.
	if idmapResolved["service_id"] == nil {
		idmapResolved["service_id"] = idmapResolved["service01"]
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
