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
		_, err := client.SandboxIntegration(nil).List(map[string]any{"organization_id": 1}, nil)
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
		for _, _op := range []string{"create", "list", "update"} {
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
			t.Log("LIVE STEP {\"id\":\"sandbox_integration.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/sandbox_integrations/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, sandbox_integrationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		sandboxIntegrationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.sandbox_integration")))
		var sandboxIntegrationRef01Data map[string]any
		if len(sandboxIntegrationRef01DataRaw) > 0 {
			sandboxIntegrationRef01Data = core.ToMapAny(sandboxIntegrationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = sandboxIntegrationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		sandboxIntegrationRef01Ent := client.SandboxIntegration(nil)
		sandboxIntegrationRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		sandboxIntegrationRef01ListResult, err := sandboxIntegrationRef01Ent.List(sandboxIntegrationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, sandboxIntegrationRef01ListOk := sandboxIntegrationRef01ListResult.([]any)
		if !sandboxIntegrationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", sandboxIntegrationRef01ListResult)
		}

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
		// LIST
		sandboxIntegrationRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		sandboxIntegrationRef01ListResult, err := sandboxIntegrationRef01Ent.List(sandboxIntegrationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		sandboxIntegrationRef01List, sandboxIntegrationRef01ListOk := sandboxIntegrationRef01ListResult.([]any)
		if !sandboxIntegrationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", sandboxIntegrationRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(sandboxIntegrationRef01List), map[string]any{"id": sandboxIntegrationRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
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
