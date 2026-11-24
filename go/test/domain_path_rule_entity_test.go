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
const domain_path_ruleEntityLiveStrict = true


func TestDomainPathRuleEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DomainPathRule(nil)
		if ent == nil {
			t.Fatal("expected non-nil DomainPathRuleEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.DomainPathRule(nil).List(map[string]any{"app_id": 1, "domain_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := domain_path_ruleBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "domain_path_rule." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"domain_path_rule.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules\"}")
			t.Log("LIVE STEP {\"id\":\"domain_path_rule.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"domain_path_rule.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/domains/{domain_id}/path_rules/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"domain_path_rule.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01", "domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_path_ruleEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_DOMAIN_PATH_RULE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["domain_path_rule01"]
			}
			livePace()
			liveExisting(t, domain_path_ruleEntityLiveStrict, setup.data, "domain_path_rule", "id", _liveId,
				func() (any, error) {
					return client.DomainPathRule(nil).List(map[string]any{"app_id": setup.idmap["app01"], "domain_id": setup.idmap["domain01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		domainPathRuleRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.domain_path_rule")))
		var domainPathRuleRef01Data map[string]any
		if len(domainPathRuleRef01DataRaw) > 0 {
			domainPathRuleRef01Data = core.ToMapAny(domainPathRuleRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = domainPathRuleRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		domainPathRuleRef01Ent := client.DomainPathRule(nil)
		domainPathRuleRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
			"domain_id": setup.idmap["domain01"],
		}

		domainPathRuleRef01ListResult, err := domainPathRuleRef01Ent.List(domainPathRuleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, domainPathRuleRef01ListOk := domainPathRuleRef01ListResult.([]any)
		if !domainPathRuleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", domainPathRuleRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		domainPathRuleRef01MatchDt0 := map[string]any{
			"id": domainPathRuleRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			domainPathRuleRef01MatchDt0["app_id"] = v
		} else {
			domainPathRuleRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["domain_id"]; v != nil {
			domainPathRuleRef01MatchDt0["domain_id"] = v
		} else {
			domainPathRuleRef01MatchDt0["domain_id"] = setup.idmap["domain01"]
		}
		domainPathRuleRef01DataDt0Loaded, err := domainPathRuleRef01Ent.Load(domainPathRuleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		domainPathRuleRef01DataDt0LoadResult := core.ToMapAny(entityData(domainPathRuleRef01DataDt0Loaded))
		if domainPathRuleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(domainPathRuleRef01DataDt0LoadResult["id"], domainPathRuleRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01", "domain01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, domain_path_ruleEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_DOMAIN_PATH_RULE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		domainPathRuleRef01Ent := client.DomainPathRule(nil)
		domainPathRuleRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "domain_path_rule"}), "domain_path_rule_ref01"))
		domainPathRuleRef01Data["app_id"] = setup.idmap["app01"]
		domainPathRuleRef01Data["domain_id"] = setup.idmap["domain01"]

		domainPathRuleRef01DataResult, err := domainPathRuleRef01Ent.Create(domainPathRuleRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		domainPathRuleRef01Data = core.ToMapAny(entityData(domainPathRuleRef01DataResult))
		if domainPathRuleRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if domainPathRuleRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		domainPathRuleRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
			"domain_id": setup.idmap["domain01"],
		}

		domainPathRuleRef01ListResult, err := domainPathRuleRef01Ent.List(domainPathRuleRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		domainPathRuleRef01List, domainPathRuleRef01ListOk := domainPathRuleRef01ListResult.([]any)
		if !domainPathRuleRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", domainPathRuleRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(domainPathRuleRef01List), map[string]any{"id": domainPathRuleRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		domainPathRuleRef01DataUp0Up := map[string]any{
			"id": domainPathRuleRef01Data["id"],
			"app_id": setup.idmap["app_id"],
			"domain_id": setup.idmap["domain_id"],
		}

		domainPathRuleRef01MarkdefUp0Name := "action_kind"
		domainPathRuleRef01MarkdefUp0Value := fmt.Sprintf("Mark01-domain_path_rule_ref01_%d", setup.now)
		domainPathRuleRef01DataUp0Up[domainPathRuleRef01MarkdefUp0Name] = domainPathRuleRef01MarkdefUp0Value

		domainPathRuleRef01ResdataUp0Result, err := domainPathRuleRef01Ent.Update(domainPathRuleRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		domainPathRuleRef01ResdataUp0 := core.ToMapAny(entityData(domainPathRuleRef01ResdataUp0Result))
		if domainPathRuleRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(domainPathRuleRef01ResdataUp0["id"], domainPathRuleRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if domainPathRuleRef01ResdataUp0[domainPathRuleRef01MarkdefUp0Name] != domainPathRuleRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", domainPathRuleRef01MarkdefUp0Name, domainPathRuleRef01ResdataUp0[domainPathRuleRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		domainPathRuleRef01MatchDt0 := map[string]any{
			"id": domainPathRuleRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			domainPathRuleRef01MatchDt0["app_id"] = v
		} else {
			domainPathRuleRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["domain_id"]; v != nil {
			domainPathRuleRef01MatchDt0["domain_id"] = v
		} else {
			domainPathRuleRef01MatchDt0["domain_id"] = setup.idmap["domain01"]
		}
		domainPathRuleRef01DataDt0Loaded, err := domainPathRuleRef01Ent.Load(domainPathRuleRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		domainPathRuleRef01DataDt0LoadResult := core.ToMapAny(entityData(domainPathRuleRef01DataDt0Loaded))
		if domainPathRuleRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(domainPathRuleRef01DataDt0LoadResult["id"], domainPathRuleRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		domainPathRuleRef01MatchRm0 := map[string]any{
			"id": domainPathRuleRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			domainPathRuleRef01MatchRm0["app_id"] = v
		} else {
			domainPathRuleRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["domain_id"]; v != nil {
			domainPathRuleRef01MatchRm0["domain_id"] = v
		} else {
			domainPathRuleRef01MatchRm0["domain_id"] = setup.idmap["domain01"]
		}
		_, err = domainPathRuleRef01Ent.Remove(domainPathRuleRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		domainPathRuleRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
			"domain_id": setup.idmap["domain01"],
		}

		domainPathRuleRef01ListRt0Result, err := domainPathRuleRef01Ent.List(domainPathRuleRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		domainPathRuleRef01ListRt0, domainPathRuleRef01ListRt0Ok := domainPathRuleRef01ListRt0Result.([]any)
		if !domainPathRuleRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", domainPathRuleRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(domainPathRuleRef01ListRt0), map[string]any{"id": domainPathRuleRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func domain_path_ruleBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "domain_path_rule", "DomainPathRuleTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read domain_path_rule test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse domain_path_rule test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"domain_path_rule01", "domain_path_rule02", "domain_path_rule03", "app01", "app02", "app03", "domain01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_DOMAIN_PATH_RULE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_DOMAIN_PATH_RULE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_DOMAIN_PATH_RULE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add app_id alias for update test.
	if idmapResolved["app_id"] == nil {
		idmapResolved["app_id"] = idmapResolved["app01"]
	}
	// Add domain_id alias for update test.
	if idmapResolved["domain_id"] == nil {
		idmapResolved["domain_id"] = idmapResolved["domain01"]
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
