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
const findingEntityLiveStrict = true


func TestFindingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Finding(nil)
		if ent == nil {
			t.Fatal("expected non-nil FindingEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Finding(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := findingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "finding." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"finding.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/findings/{id}\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, findingEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_FINDING_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["finding01"]
			}
			livePace()
			liveExisting(t, findingEntityLiveStrict, setup.data, "finding", "id", _liveId,
				func() (any, error) {
					return client.Finding(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		findingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.finding")))
		var findingRef01Data map[string]any
		if len(findingRef01DataRaw) > 0 {
			findingRef01Data = core.ToMapAny(findingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = findingRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		findingRef01Ent := client.Finding(nil)
		findingRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		findingRef01ListResult, err := findingRef01Ent.List(findingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, findingRef01ListOk := findingRef01ListResult.([]any)
		if !findingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", findingRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		findingRef01MatchDt0 := map[string]any{
			"id": findingRef01Data["id"],
		}
		switch v := findingRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			findingRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				findingRef01MatchDt0["organization_id"] = v
			} else {
				findingRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		findingRef01DataDt0Loaded, err := findingRef01Ent.Load(findingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		findingRef01DataDt0LoadResult := core.ToMapAny(entityData(findingRef01DataDt0Loaded))
		if findingRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(findingRef01DataDt0LoadResult["id"], findingRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, findingEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_FINDING_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, findingEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a finding record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		findingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.finding")))
		var findingRef01Data map[string]any
		if len(findingRef01DataRaw) > 0 {
			findingRef01Data = core.ToMapAny(findingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = findingRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		findingRef01Ent := client.Finding(nil)
		findingRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		findingRef01ListResult, err := findingRef01Ent.List(findingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, findingRef01ListOk := findingRef01ListResult.([]any)
		if !findingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", findingRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		findingRef01DataUp0Up := map[string]any{
			"id": findingRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		findingRef01MarkdefUp0Name := "confidence"
		findingRef01MarkdefUp0Value := fmt.Sprintf("Mark01-finding_ref01_%d", setup.now)
		findingRef01DataUp0Up[findingRef01MarkdefUp0Name] = findingRef01MarkdefUp0Value

		findingRef01ResdataUp0Result, err := findingRef01Ent.Update(findingRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		findingRef01ResdataUp0 := core.ToMapAny(entityData(findingRef01ResdataUp0Result))
		if findingRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(findingRef01ResdataUp0["id"], findingRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if findingRef01ResdataUp0[findingRef01MarkdefUp0Name] != findingRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", findingRef01MarkdefUp0Name, findingRef01ResdataUp0[findingRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		findingRef01MatchDt0 := map[string]any{
			"id": findingRef01Data["id"],
		}
		switch v := findingRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			findingRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				findingRef01MatchDt0["organization_id"] = v
			} else {
				findingRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		findingRef01DataDt0Loaded, err := findingRef01Ent.Load(findingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		findingRef01DataDt0LoadResult := core.ToMapAny(entityData(findingRef01DataDt0Loaded))
		if findingRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(findingRef01DataDt0LoadResult["id"], findingRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func findingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "finding", "FindingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read finding test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse finding test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"finding01", "finding02", "finding03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_FINDING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_FINDING_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_FINDING_ENTID"])
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
