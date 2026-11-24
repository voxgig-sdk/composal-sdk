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
const spark_creditEntityLiveStrict = true


func TestSparkCreditEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SparkCredit(nil)
		if ent == nil {
			t.Fatal("expected non-nil SparkCreditEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SparkCredit(nil).Load(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := spark_creditBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "spark_credit." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"spark_credit.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/spark_credits\"}")
			t.Log("LIVE STEP {\"id\":\"spark_credit.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{org_slug}/spark_credits\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		sparkCreditRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.spark_credit")))
		var sparkCreditRef01Data map[string]any
		if len(sparkCreditRef01DataRaw) > 0 {
			sparkCreditRef01Data = core.ToMapAny(sparkCreditRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = sparkCreditRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		sparkCreditRef01Ent := client.SparkCredit(nil)
		sparkCreditRef01MatchDt0 := map[string]any{}
		sparkCreditRef01DataDt0Loaded, err := sparkCreditRef01Ent.Load(sparkCreditRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if sparkCreditRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, spark_creditEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPARK_CREDIT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		sparkCreditRef01Ent := client.SparkCredit(nil)
		sparkCreditRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "spark_credit"}), "spark_credit_ref01"))
		sparkCreditRef01Data["organization_id"] = setup.idmap["organization01"]

		sparkCreditRef01DataResult, err := sparkCreditRef01Ent.Create(sparkCreditRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		sparkCreditRef01Data = core.ToMapAny(entityData(sparkCreditRef01DataResult))
		if sparkCreditRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		sparkCreditRef01DataUp0Up := map[string]any{
		}

		sparkCreditRef01MarkdefUp0Name := "available_usd"
		sparkCreditRef01MarkdefUp0Value := fmt.Sprintf("Mark01-spark_credit_ref01_%d", setup.now)
		sparkCreditRef01DataUp0Up[sparkCreditRef01MarkdefUp0Name] = sparkCreditRef01MarkdefUp0Value

		sparkCreditRef01ResdataUp0Result, err := sparkCreditRef01Ent.Update(sparkCreditRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		sparkCreditRef01ResdataUp0 := core.ToMapAny(entityData(sparkCreditRef01ResdataUp0Result))
		if sparkCreditRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if sparkCreditRef01ResdataUp0[sparkCreditRef01MarkdefUp0Name] != sparkCreditRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", sparkCreditRef01MarkdefUp0Name, sparkCreditRef01ResdataUp0[sparkCreditRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		sparkCreditRef01MatchDt0 := map[string]any{}
		sparkCreditRef01DataDt0Loaded, err := sparkCreditRef01Ent.Load(sparkCreditRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if sparkCreditRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func spark_creditBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "spark_credit", "SparkCreditTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read spark_credit test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse spark_credit test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"spark_credit01", "spark_credit02", "spark_credit03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPARK_CREDIT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPARK_CREDIT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPARK_CREDIT_ENTID"])
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
