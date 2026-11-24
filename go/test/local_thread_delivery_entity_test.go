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
const local_thread_deliveryEntityLiveStrict = true


func TestLocalThreadDeliveryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LocalThreadDelivery(nil)
		if ent == nil {
			t.Fatal("expected non-nil LocalThreadDeliveryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LocalThreadDelivery(nil).Load(map[string]any{"agent_id": 1, "id": "x", "local_thread_id": "x", "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := local_thread_deliveryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "local_thread_delivery." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"local_thread_delivery.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"agent01", "local_thread_delivery01", "local_thread01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, local_thread_deliveryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, local_thread_deliveryEntityLiveStrict, setup.data, "local_thread_delivery", "id", setup.idmap["local_thread_delivery01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["local_thread_delivery01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		localThreadDeliveryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.local_thread_delivery")))
		var localThreadDeliveryRef01Data map[string]any
		if len(localThreadDeliveryRef01DataRaw) > 0 {
			localThreadDeliveryRef01Data = core.ToMapAny(localThreadDeliveryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = localThreadDeliveryRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		localThreadDeliveryRef01Ent := client.LocalThreadDelivery(nil)
		localThreadDeliveryRef01MatchDt0 := map[string]any{
			"id": localThreadDeliveryRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			localThreadDeliveryRef01MatchDt0["agent_id"] = v
		} else {
			localThreadDeliveryRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["local_thread_id"]; v != nil {
			localThreadDeliveryRef01MatchDt0["local_thread_id"] = v
		} else {
			localThreadDeliveryRef01MatchDt0["local_thread_id"] = setup.idmap["local_thread01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			localThreadDeliveryRef01MatchDt0["organization_id"] = v
		} else {
			localThreadDeliveryRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		localThreadDeliveryRef01DataDt0Loaded, err := localThreadDeliveryRef01Ent.Load(localThreadDeliveryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		localThreadDeliveryRef01DataDt0LoadResult := core.ToMapAny(entityData(localThreadDeliveryRef01DataDt0Loaded))
		if localThreadDeliveryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(localThreadDeliveryRef01DataDt0LoadResult["id"], localThreadDeliveryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"agent01", "local_thread01", "organization01", "local_thread_delivery01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, local_thread_deliveryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, local_thread_deliveryEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a local_thread_delivery record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		localThreadDeliveryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.local_thread_delivery")))
		var localThreadDeliveryRef01Data map[string]any
		if len(localThreadDeliveryRef01DataRaw) > 0 {
			localThreadDeliveryRef01Data = core.ToMapAny(localThreadDeliveryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = localThreadDeliveryRef01Data

		if setup.live {
			livePace()
		}
		// UPDATE
		localThreadDeliveryRef01Ent := client.LocalThreadDelivery(nil)
		localThreadDeliveryRef01DataUp0Up := map[string]any{
			"id": localThreadDeliveryRef01Data["id"],
			"agent_id": setup.idmap["agent_id"],
			"local_thread_id": setup.idmap["local_thread_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		localThreadDeliveryRef01MarkdefUp0Name := "decision"
		localThreadDeliveryRef01MarkdefUp0Value := fmt.Sprintf("Mark01-local_thread_delivery_ref01_%d", setup.now)
		localThreadDeliveryRef01DataUp0Up[localThreadDeliveryRef01MarkdefUp0Name] = localThreadDeliveryRef01MarkdefUp0Value

		localThreadDeliveryRef01ResdataUp0Result, err := localThreadDeliveryRef01Ent.Update(localThreadDeliveryRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		localThreadDeliveryRef01ResdataUp0 := core.ToMapAny(entityData(localThreadDeliveryRef01ResdataUp0Result))
		if localThreadDeliveryRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(localThreadDeliveryRef01ResdataUp0["id"], localThreadDeliveryRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if localThreadDeliveryRef01ResdataUp0[localThreadDeliveryRef01MarkdefUp0Name] != localThreadDeliveryRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", localThreadDeliveryRef01MarkdefUp0Name, localThreadDeliveryRef01ResdataUp0[localThreadDeliveryRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		localThreadDeliveryRef01MatchDt0 := map[string]any{
			"id": localThreadDeliveryRef01Data["id"],
		}
		if v := setup.idmap["agent_id"]; v != nil {
			localThreadDeliveryRef01MatchDt0["agent_id"] = v
		} else {
			localThreadDeliveryRef01MatchDt0["agent_id"] = setup.idmap["agent01"]
		}
		if v := setup.idmap["local_thread_id"]; v != nil {
			localThreadDeliveryRef01MatchDt0["local_thread_id"] = v
		} else {
			localThreadDeliveryRef01MatchDt0["local_thread_id"] = setup.idmap["local_thread01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			localThreadDeliveryRef01MatchDt0["organization_id"] = v
		} else {
			localThreadDeliveryRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		localThreadDeliveryRef01DataDt0Loaded, err := localThreadDeliveryRef01Ent.Load(localThreadDeliveryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		localThreadDeliveryRef01DataDt0LoadResult := core.ToMapAny(entityData(localThreadDeliveryRef01DataDt0Loaded))
		if localThreadDeliveryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(localThreadDeliveryRef01DataDt0LoadResult["id"], localThreadDeliveryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func local_thread_deliveryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "local_thread_delivery", "LocalThreadDeliveryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read local_thread_delivery test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse local_thread_delivery test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"local_thread_delivery01", "local_thread_delivery02", "local_thread_delivery03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03", "local_thread01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add agent_id alias for update test.
	if idmapResolved["agent_id"] == nil {
		idmapResolved["agent_id"] = idmapResolved["agent01"]
	}
	// Add local_thread_id alias for update test.
	if idmapResolved["local_thread_id"] == nil {
		idmapResolved["local_thread_id"] = idmapResolved["local_thread01"]
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
