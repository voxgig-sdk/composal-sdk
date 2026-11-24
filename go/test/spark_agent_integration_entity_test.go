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
const spark_agent_integrationEntityLiveStrict = true


func TestSparkAgentIntegrationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SparkAgentIntegration(nil)
		if ent == nil {
			t.Fatal("expected non-nil SparkAgentIntegrationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SparkAgentIntegration(nil).List(map[string]any{"agent_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := spark_agent_integrationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "spark_agent_integration." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"spark_agent_integration.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, spark_agent_integrationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPARK_AGENT_INTEGRATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		sparkAgentIntegrationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.spark_agent_integration")))
		var sparkAgentIntegrationRef01Data map[string]any
		if len(sparkAgentIntegrationRef01DataRaw) > 0 {
			sparkAgentIntegrationRef01Data = core.ToMapAny(sparkAgentIntegrationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = sparkAgentIntegrationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		sparkAgentIntegrationRef01Ent := client.SparkAgentIntegration(nil)
		sparkAgentIntegrationRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		sparkAgentIntegrationRef01ListResult, err := sparkAgentIntegrationRef01Ent.List(sparkAgentIntegrationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, sparkAgentIntegrationRef01ListOk := sparkAgentIntegrationRef01ListResult.([]any)
		if !sparkAgentIntegrationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", sparkAgentIntegrationRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, spark_agent_integrationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPARK_AGENT_INTEGRATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		sparkAgentIntegrationRef01Ent := client.SparkAgentIntegration(nil)
		sparkAgentIntegrationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "spark_agent_integration"}), "spark_agent_integration_ref01"))
		sparkAgentIntegrationRef01Data["agent_id"] = setup.idmap["agent01"]
		sparkAgentIntegrationRef01Data["organization_id"] = setup.idmap["organization01"]

		sparkAgentIntegrationRef01DataResult, err := sparkAgentIntegrationRef01Ent.Create(sparkAgentIntegrationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		sparkAgentIntegrationRef01Data = core.ToMapAny(entityData(sparkAgentIntegrationRef01DataResult))
		if sparkAgentIntegrationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		sparkAgentIntegrationRef01Match := map[string]any{
			"agent_id": setup.idmap["agent01"],
			"organization_id": setup.idmap["organization01"],
		}

		sparkAgentIntegrationRef01ListResult, err := sparkAgentIntegrationRef01Ent.List(sparkAgentIntegrationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, sparkAgentIntegrationRef01ListOk := sparkAgentIntegrationRef01ListResult.([]any)
		if !sparkAgentIntegrationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", sparkAgentIntegrationRef01ListResult)
		}

	})
}

func spark_agent_integrationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "spark_agent_integration", "SparkAgentIntegrationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read spark_agent_integration test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse spark_agent_integration test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"spark_agent_integration01", "spark_agent_integration02", "spark_agent_integration03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPARK_AGENT_INTEGRATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPARK_AGENT_INTEGRATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPARK_AGENT_INTEGRATION_ENTID"])
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
