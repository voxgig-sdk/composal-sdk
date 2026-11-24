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
const billing_prepaid_purchaseEntityLiveStrict = true


func TestBillingPrepaidPurchaseEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BillingPrepaidPurchase(nil)
		if ent == nil {
			t.Fatal("expected non-nil BillingPrepaidPurchaseEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BillingPrepaidPurchase(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := billing_prepaid_purchaseBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "billing_prepaid_purchase." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"billing_prepaid_purchase.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/billing/prepaid_purchases\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, billing_prepaid_purchaseEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BILLING_PREPAID_PURCHASE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["billing_prepaid_purchase01"]
			}
			livePace()
			liveExisting(t, billing_prepaid_purchaseEntityLiveStrict, setup.data, "billing_prepaid_purchase", "id", _liveId,
				func() (any, error) {
					return client.BillingPrepaidPurchase(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		billingPrepaidPurchaseRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.billing_prepaid_purchase")))
		var billingPrepaidPurchaseRef01Data map[string]any
		if len(billingPrepaidPurchaseRef01DataRaw) > 0 {
			billingPrepaidPurchaseRef01Data = core.ToMapAny(billingPrepaidPurchaseRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = billingPrepaidPurchaseRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		billingPrepaidPurchaseRef01Ent := client.BillingPrepaidPurchase(nil)
		billingPrepaidPurchaseRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		billingPrepaidPurchaseRef01ListResult, err := billingPrepaidPurchaseRef01Ent.List(billingPrepaidPurchaseRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, billingPrepaidPurchaseRef01ListOk := billingPrepaidPurchaseRef01ListResult.([]any)
		if !billingPrepaidPurchaseRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", billingPrepaidPurchaseRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		billingPrepaidPurchaseRef01MatchDt0 := map[string]any{
			"id": billingPrepaidPurchaseRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			billingPrepaidPurchaseRef01MatchDt0["organization_id"] = v
		} else {
			billingPrepaidPurchaseRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		billingPrepaidPurchaseRef01DataDt0Loaded, err := billingPrepaidPurchaseRef01Ent.Load(billingPrepaidPurchaseRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		billingPrepaidPurchaseRef01DataDt0LoadResult := core.ToMapAny(entityData(billingPrepaidPurchaseRef01DataDt0Loaded))
		if billingPrepaidPurchaseRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(billingPrepaidPurchaseRef01DataDt0LoadResult["id"], billingPrepaidPurchaseRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, billing_prepaid_purchaseEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BILLING_PREPAID_PURCHASE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		billingPrepaidPurchaseRef01Ent := client.BillingPrepaidPurchase(nil)
		billingPrepaidPurchaseRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "billing_prepaid_purchase"}), "billing_prepaid_purchase_ref01"))
		billingPrepaidPurchaseRef01Data["organization_id"] = setup.idmap["organization01"]

		billingPrepaidPurchaseRef01DataResult, err := billingPrepaidPurchaseRef01Ent.Create(billingPrepaidPurchaseRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		billingPrepaidPurchaseRef01Data = core.ToMapAny(entityData(billingPrepaidPurchaseRef01DataResult))
		if billingPrepaidPurchaseRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if billingPrepaidPurchaseRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		billingPrepaidPurchaseRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		billingPrepaidPurchaseRef01ListResult, err := billingPrepaidPurchaseRef01Ent.List(billingPrepaidPurchaseRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		billingPrepaidPurchaseRef01List, billingPrepaidPurchaseRef01ListOk := billingPrepaidPurchaseRef01ListResult.([]any)
		if !billingPrepaidPurchaseRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", billingPrepaidPurchaseRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(billingPrepaidPurchaseRef01List), map[string]any{"id": billingPrepaidPurchaseRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		billingPrepaidPurchaseRef01MatchDt0 := map[string]any{
			"id": billingPrepaidPurchaseRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			billingPrepaidPurchaseRef01MatchDt0["organization_id"] = v
		} else {
			billingPrepaidPurchaseRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		billingPrepaidPurchaseRef01DataDt0Loaded, err := billingPrepaidPurchaseRef01Ent.Load(billingPrepaidPurchaseRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		billingPrepaidPurchaseRef01DataDt0LoadResult := core.ToMapAny(entityData(billingPrepaidPurchaseRef01DataDt0Loaded))
		if billingPrepaidPurchaseRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(billingPrepaidPurchaseRef01DataDt0LoadResult["id"], billingPrepaidPurchaseRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func billing_prepaid_purchaseBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "billing_prepaid_purchase", "BillingPrepaidPurchaseTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read billing_prepaid_purchase test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse billing_prepaid_purchase test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"billing_prepaid_purchase01", "billing_prepaid_purchase02", "billing_prepaid_purchase03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_BILLING_PREPAID_PURCHASE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BILLING_PREPAID_PURCHASE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_BILLING_PREPAID_PURCHASE_ENTID"])
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
