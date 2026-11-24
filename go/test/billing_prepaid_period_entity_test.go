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
const billing_prepaid_periodEntityLiveStrict = true


func TestBillingPrepaidPeriodEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BillingPrepaidPeriod(nil)
		if ent == nil {
			t.Fatal("expected non-nil BillingPrepaidPeriodEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BillingPrepaidPeriod(nil).Load(map[string]any{"id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := billing_prepaid_periodBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "billing_prepaid_period." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"billing_prepaid_period01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, billing_prepaid_periodEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BILLING_PREPAID_PERIOD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, billing_prepaid_periodEntityLiveStrict, setup.data, "billing_prepaid_period", "id", setup.idmap["billing_prepaid_period01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["billing_prepaid_period01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		billingPrepaidPeriodRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.billing_prepaid_period")))
		var billingPrepaidPeriodRef01Data map[string]any
		if len(billingPrepaidPeriodRef01DataRaw) > 0 {
			billingPrepaidPeriodRef01Data = core.ToMapAny(billingPrepaidPeriodRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = billingPrepaidPeriodRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		billingPrepaidPeriodRef01Ent := client.BillingPrepaidPeriod(nil)
		billingPrepaidPeriodRef01MatchDt0 := map[string]any{
			"id": billingPrepaidPeriodRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			billingPrepaidPeriodRef01MatchDt0["organization_id"] = v
		} else {
			billingPrepaidPeriodRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		billingPrepaidPeriodRef01DataDt0Loaded, err := billingPrepaidPeriodRef01Ent.Load(billingPrepaidPeriodRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		billingPrepaidPeriodRef01DataDt0LoadResult := core.ToMapAny(entityData(billingPrepaidPeriodRef01DataDt0Loaded))
		if billingPrepaidPeriodRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(billingPrepaidPeriodRef01DataDt0LoadResult["id"], billingPrepaidPeriodRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func billing_prepaid_periodBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "billing_prepaid_period", "BillingPrepaidPeriodTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read billing_prepaid_period test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse billing_prepaid_period test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"billing_prepaid_period01", "billing_prepaid_period02", "billing_prepaid_period03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_BILLING_PREPAID_PERIOD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BILLING_PREPAID_PERIOD_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_BILLING_PREPAID_PERIOD_ENTID"])
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
