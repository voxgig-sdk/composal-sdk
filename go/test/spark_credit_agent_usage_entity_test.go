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
const spark_credit_agent_usageEntityLiveStrict = true


func TestSparkCreditAgentUsageEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SparkCreditAgentUsage(nil)
		if ent == nil {
			t.Fatal("expected non-nil SparkCreditAgentUsageEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SparkCreditAgentUsage(nil).Load(map[string]any{"id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := spark_credit_agent_usageBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "spark_credit_agent_usage." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"spark_credit_agent_usage01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, spark_credit_agent_usageEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPARK_CREDIT_AGENT_USAGE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, spark_credit_agent_usageEntityLiveStrict, setup.data, "spark_credit_agent_usage", "id", setup.idmap["spark_credit_agent_usage01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["spark_credit_agent_usage01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		sparkCreditAgentUsageRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.spark_credit_agent_usage")))
		var sparkCreditAgentUsageRef01Data map[string]any
		if len(sparkCreditAgentUsageRef01DataRaw) > 0 {
			sparkCreditAgentUsageRef01Data = core.ToMapAny(sparkCreditAgentUsageRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = sparkCreditAgentUsageRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		sparkCreditAgentUsageRef01Ent := client.SparkCreditAgentUsage(nil)
		sparkCreditAgentUsageRef01MatchDt0 := map[string]any{
			"id": sparkCreditAgentUsageRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			sparkCreditAgentUsageRef01MatchDt0["organization_id"] = v
		} else {
			sparkCreditAgentUsageRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		sparkCreditAgentUsageRef01DataDt0Loaded, err := sparkCreditAgentUsageRef01Ent.Load(sparkCreditAgentUsageRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		sparkCreditAgentUsageRef01DataDt0LoadResult := core.ToMapAny(entityData(sparkCreditAgentUsageRef01DataDt0Loaded))
		if sparkCreditAgentUsageRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(sparkCreditAgentUsageRef01DataDt0LoadResult["id"], sparkCreditAgentUsageRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func spark_credit_agent_usageBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "spark_credit_agent_usage", "SparkCreditAgentUsageTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read spark_credit_agent_usage test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse spark_credit_agent_usage test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"spark_credit_agent_usage01", "spark_credit_agent_usage02", "spark_credit_agent_usage03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPARK_CREDIT_AGENT_USAGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPARK_CREDIT_AGENT_USAGE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPARK_CREDIT_AGENT_USAGE_ENTID"])
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
