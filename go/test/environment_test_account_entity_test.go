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
const environment_test_accountEntityLiveStrict = true


func TestEnvironmentTestAccountEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EnvironmentTestAccount(nil)
		if ent == nil {
			t.Fatal("expected non-nil EnvironmentTestAccountEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.EnvironmentTestAccount(nil).List(map[string]any{"environment_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := environment_test_accountBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "environment_test_account." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"environment_test_account.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}\"}")
		if setup.live {
			for _, _liveKey := range []string{"environment01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, environment_test_accountEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		environmentTestAccountRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.environment_test_account")))
		var environmentTestAccountRef01Data map[string]any
		if len(environmentTestAccountRef01DataRaw) > 0 {
			environmentTestAccountRef01Data = core.ToMapAny(environmentTestAccountRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = environmentTestAccountRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		environmentTestAccountRef01Ent := client.EnvironmentTestAccount(nil)
		environmentTestAccountRef01Match := map[string]any{
			"environment_id": setup.idmap["environment01"],
			"organization_id": setup.idmap["organization01"],
		}

		environmentTestAccountRef01ListResult, err := environmentTestAccountRef01Ent.List(environmentTestAccountRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, environmentTestAccountRef01ListOk := environmentTestAccountRef01ListResult.([]any)
		if !environmentTestAccountRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", environmentTestAccountRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"environment01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, environment_test_accountEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, environment_test_accountEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a environment_test_account record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		environmentTestAccountRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.environment_test_account")))
		var environmentTestAccountRef01Data map[string]any
		if len(environmentTestAccountRef01DataRaw) > 0 {
			environmentTestAccountRef01Data = core.ToMapAny(environmentTestAccountRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = environmentTestAccountRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		environmentTestAccountRef01Ent := client.EnvironmentTestAccount(nil)
		environmentTestAccountRef01Match := map[string]any{
			"environment_id": setup.idmap["environment01"],
			"organization_id": setup.idmap["organization01"],
		}

		environmentTestAccountRef01ListResult, err := environmentTestAccountRef01Ent.List(environmentTestAccountRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, environmentTestAccountRef01ListOk := environmentTestAccountRef01ListResult.([]any)
		if !environmentTestAccountRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", environmentTestAccountRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		environmentTestAccountRef01DataUp0Up := map[string]any{
			"id": environmentTestAccountRef01Data["id"],
			"environment_id": setup.idmap["environment_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		environmentTestAccountRef01MarkdefUp0Name := "persona"
		environmentTestAccountRef01MarkdefUp0Value := fmt.Sprintf("Mark01-environment_test_account_ref01_%d", setup.now)
		environmentTestAccountRef01DataUp0Up[environmentTestAccountRef01MarkdefUp0Name] = environmentTestAccountRef01MarkdefUp0Value

		environmentTestAccountRef01ResdataUp0Result, err := environmentTestAccountRef01Ent.Update(environmentTestAccountRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		environmentTestAccountRef01ResdataUp0 := core.ToMapAny(entityData(environmentTestAccountRef01ResdataUp0Result))
		if environmentTestAccountRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(environmentTestAccountRef01ResdataUp0["id"], environmentTestAccountRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if environmentTestAccountRef01ResdataUp0[environmentTestAccountRef01MarkdefUp0Name] != environmentTestAccountRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", environmentTestAccountRef01MarkdefUp0Name, environmentTestAccountRef01ResdataUp0[environmentTestAccountRef01MarkdefUp0Name])
		}

	})
}

func environment_test_accountBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "environment_test_account", "EnvironmentTestAccountTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read environment_test_account test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse environment_test_account test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"environment_test_account01", "environment_test_account02", "environment_test_account03", "organization01", "organization02", "organization03", "environment01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add environment_id alias for update test.
	if idmapResolved["environment_id"] == nil {
		idmapResolved["environment_id"] = idmapResolved["environment01"]
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
