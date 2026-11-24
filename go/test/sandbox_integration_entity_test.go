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
const sandbox_integrationEntityLiveStrict = true


func TestSandboxIntegrationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SandboxIntegration(nil)
		if ent == nil {
			t.Fatal("expected non-nil SandboxIntegrationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SandboxIntegration(nil).Load(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := sandbox_integrationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "sandbox_integration." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"sandbox_integration.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/sandbox_integrations\"}")
			t.Log("LIVE STEP {\"id\":\"sandbox_integration.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/sandbox_integrations/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"sandbox_integration.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only sandbox_integration.create.0 gives\"}")
			t.Skip("Live coverage incomplete: sandbox_integration.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/sandbox_integrations); sandbox_integration.update.1 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/sandbox_integrations/{id}); sandbox_integration.load.2 excluded (GET-only live run: reads a record only sandbox_integration.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, sandbox_integrationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		sandboxIntegrationRef01Ent := client.SandboxIntegration(nil)
		sandboxIntegrationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "sandbox_integration"}), "sandbox_integration_ref01"))
		sandboxIntegrationRef01Data["organization_id"] = setup.idmap["organization01"]

		sandboxIntegrationRef01DataResult, err := sandboxIntegrationRef01Ent.Create(sandboxIntegrationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		sandboxIntegrationRef01Data = core.ToMapAny(entityData(sandboxIntegrationRef01DataResult))
		if sandboxIntegrationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if sandboxIntegrationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		sandboxIntegrationRef01DataUp0Up := map[string]any{
			"id": sandboxIntegrationRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		sandboxIntegrationRef01MarkdefUp0Name := "name"
		sandboxIntegrationRef01MarkdefUp0Value := fmt.Sprintf("Mark01-sandbox_integration_ref01_%d", setup.now)
		sandboxIntegrationRef01DataUp0Up[sandboxIntegrationRef01MarkdefUp0Name] = sandboxIntegrationRef01MarkdefUp0Value

		sandboxIntegrationRef01ResdataUp0Result, err := sandboxIntegrationRef01Ent.Update(sandboxIntegrationRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		sandboxIntegrationRef01ResdataUp0 := core.ToMapAny(entityData(sandboxIntegrationRef01ResdataUp0Result))
		if sandboxIntegrationRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(sandboxIntegrationRef01ResdataUp0["id"], sandboxIntegrationRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if sandboxIntegrationRef01ResdataUp0[sandboxIntegrationRef01MarkdefUp0Name] != sandboxIntegrationRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", sandboxIntegrationRef01MarkdefUp0Name, sandboxIntegrationRef01ResdataUp0[sandboxIntegrationRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		sandboxIntegrationRef01MatchDt0 := map[string]any{
			"id": sandboxIntegrationRef01Data["id"],
		}
		sandboxIntegrationRef01DataDt0Loaded, err := sandboxIntegrationRef01Ent.Load(sandboxIntegrationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		sandboxIntegrationRef01DataDt0LoadResult := core.ToMapAny(entityData(sandboxIntegrationRef01DataDt0Loaded))
		if sandboxIntegrationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(sandboxIntegrationRef01DataDt0LoadResult["id"], sandboxIntegrationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func sandbox_integrationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "sandbox_integration", "SandboxIntegrationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read sandbox_integration test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse sandbox_integration test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"sandbox_integration01", "sandbox_integration02", "sandbox_integration03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID"])
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
