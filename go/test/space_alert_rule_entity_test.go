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
const space_alert_ruleEntityLiveStrict = true


func TestSpaceAlertRuleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpaceAlertRule(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpaceAlertRuleEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpaceAlertRule(nil).List(map[string]any{"space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_alert_ruleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_alert_rule." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_alert_rule.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/alert_rules/{id}/activate\"}")
			t.Log("LIVE STEP {\"id\":\"space_alert_rule.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/observability/spaces/{space_id}/alert_rules/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_alert_rule.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_alert_rule.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_alert_ruleEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_ALERT_RULE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["space_alert_rule01"]
			}
			livePace()
			liveExisting(t, space_alert_ruleEntityLiveStrict, setup.data, "space_alert_rule", "id", _liveId,
				func() (any, error) {
					return client.SpaceAlertRule(nil).List(map[string]any{"space_id": setup.idmap["space01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		spaceAlertRuleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.space_alert_rule")))
		var spaceAlertRuleRef01Data map[string]any
		if len(spaceAlertRuleRef01DataRaw) > 0 {
			spaceAlertRuleRef01Data = core.ToMapAny(spaceAlertRuleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = spaceAlertRuleRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		spaceAlertRuleRef01Ent := client.SpaceAlertRule(nil)
		spaceAlertRuleRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceAlertRuleRef01ListResult, err := spaceAlertRuleRef01Ent.List(spaceAlertRuleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, spaceAlertRuleRef01ListOk := spaceAlertRuleRef01ListResult.([]any)
		if !spaceAlertRuleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceAlertRuleRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceAlertRuleRef01MatchDt0 := map[string]any{
			"id": spaceAlertRuleRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceAlertRuleRef01MatchDt0["space_id"] = v
		} else {
			spaceAlertRuleRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spaceAlertRuleRef01DataDt0Loaded, err := spaceAlertRuleRef01Ent.Load(spaceAlertRuleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceAlertRuleRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceAlertRuleRef01DataDt0Loaded))
		if spaceAlertRuleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceAlertRuleRef01DataDt0LoadResult["id"], spaceAlertRuleRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_alert_ruleEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_ALERT_RULE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spaceAlertRuleRef01Ent := client.SpaceAlertRule(nil)
		spaceAlertRuleRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_alert_rule"}), "space_alert_rule_ref01"))
		spaceAlertRuleRef01Data["space_id"] = setup.idmap["space01"]

		spaceAlertRuleRef01DataResult, err := spaceAlertRuleRef01Ent.Create(spaceAlertRuleRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spaceAlertRuleRef01Data = core.ToMapAny(entityData(spaceAlertRuleRef01DataResult))
		if spaceAlertRuleRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if spaceAlertRuleRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceAlertRuleRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceAlertRuleRef01ListResult, err := spaceAlertRuleRef01Ent.List(spaceAlertRuleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spaceAlertRuleRef01List, spaceAlertRuleRef01ListOk := spaceAlertRuleRef01ListResult.([]any)
		if !spaceAlertRuleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceAlertRuleRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(spaceAlertRuleRef01List), map[string]any{"id": spaceAlertRuleRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		spaceAlertRuleRef01DataUp0Up := map[string]any{
			"id": spaceAlertRuleRef01Data["id"],
			"space_id": setup.idmap["space_id"],
		}

		spaceAlertRuleRef01ResdataUp0Result, err := spaceAlertRuleRef01Ent.Update(spaceAlertRuleRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		spaceAlertRuleRef01ResdataUp0 := core.ToMapAny(entityData(spaceAlertRuleRef01ResdataUp0Result))
		if spaceAlertRuleRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(spaceAlertRuleRef01ResdataUp0["id"], spaceAlertRuleRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceAlertRuleRef01MatchDt0 := map[string]any{
			"id": spaceAlertRuleRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceAlertRuleRef01MatchDt0["space_id"] = v
		} else {
			spaceAlertRuleRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		spaceAlertRuleRef01DataDt0Loaded, err := spaceAlertRuleRef01Ent.Load(spaceAlertRuleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spaceAlertRuleRef01DataDt0LoadResult := core.ToMapAny(entityData(spaceAlertRuleRef01DataDt0Loaded))
		if spaceAlertRuleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spaceAlertRuleRef01DataDt0LoadResult["id"], spaceAlertRuleRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		spaceAlertRuleRef01MatchRm0 := map[string]any{
			"id": spaceAlertRuleRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spaceAlertRuleRef01MatchRm0["space_id"] = v
		} else {
			spaceAlertRuleRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = spaceAlertRuleRef01Ent.Remove(spaceAlertRuleRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceAlertRuleRef01MatchRt0 := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceAlertRuleRef01ListRt0Result, err := spaceAlertRuleRef01Ent.List(spaceAlertRuleRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		spaceAlertRuleRef01ListRt0, spaceAlertRuleRef01ListRt0Ok := spaceAlertRuleRef01ListRt0Result.([]any)
		if !spaceAlertRuleRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", spaceAlertRuleRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(spaceAlertRuleRef01ListRt0), map[string]any{"id": spaceAlertRuleRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func space_alert_ruleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_alert_rule", "SpaceAlertRuleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_alert_rule test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_alert_rule test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_alert_rule01", "space_alert_rule02", "space_alert_rule03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_ALERT_RULE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_ALERT_RULE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_ALERT_RULE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add space_id alias for update test.
	if idmapResolved["space_id"] == nil {
		idmapResolved["space_id"] = idmapResolved["space01"]
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
