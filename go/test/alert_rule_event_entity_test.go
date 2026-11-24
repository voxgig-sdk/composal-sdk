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
const alert_rule_eventEntityLiveStrict = true


func TestAlertRuleEventEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AlertRuleEvent(nil)
		if ent == nil {
			t.Fatal("expected non-nil AlertRuleEventEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AlertRuleEvent(nil).Load(map[string]any{"alert_rule_id": 1, "space_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := alert_rule_eventBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "alert_rule_event." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"alert_rule_event.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge\"}")
			t.Log("LIVE STEP {\"id\":\"alert_rule_event.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only alert_rule_event.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"alert_rule_event.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}\"}")
			t.Skip("Live coverage incomplete: alert_rule_event.create.0 excluded (GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge); alert_rule_event.load.1 excluded (GET-only live run: reads a record only alert_rule_event.create.0 gives); alert_rule_event.remove.2 excluded (GET-only live run: needs DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"alert_rule01", "space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, alert_rule_eventEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		alertRuleEventRef01Ent := client.AlertRuleEvent(nil)
		alertRuleEventRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "alert_rule_event"}), "alert_rule_event_ref01"))
		alertRuleEventRef01Data["alert_rule_id"] = setup.idmap["alert_rule01"]
		alertRuleEventRef01Data["space_id"] = setup.idmap["space01"]

		alertRuleEventRef01DataResult, err := alertRuleEventRef01Ent.Create(alertRuleEventRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		alertRuleEventRef01Data = core.ToMapAny(entityData(alertRuleEventRef01DataResult))
		if alertRuleEventRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if alertRuleEventRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		alertRuleEventRef01MatchDt0 := map[string]any{
			"id": alertRuleEventRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			alertRuleEventRef01MatchDt0["space_id"] = v
		} else {
			alertRuleEventRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		alertRuleEventRef01DataDt0Loaded, err := alertRuleEventRef01Ent.Load(alertRuleEventRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		alertRuleEventRef01DataDt0LoadResult := core.ToMapAny(entityData(alertRuleEventRef01DataDt0Loaded))
		if alertRuleEventRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(alertRuleEventRef01DataDt0LoadResult["id"], alertRuleEventRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		alertRuleEventRef01MatchRm0 := map[string]any{
			"id": alertRuleEventRef01Data["id"],
		}
		if v := setup.idmap["alert_rule_id"]; v != nil {
			alertRuleEventRef01MatchRm0["alert_rule_id"] = v
		} else {
			alertRuleEventRef01MatchRm0["alert_rule_id"] = setup.idmap["alert_rule01"]
		}
		if v := setup.idmap["space_id"]; v != nil {
			alertRuleEventRef01MatchRm0["space_id"] = v
		} else {
			alertRuleEventRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = alertRuleEventRef01Ent.Remove(alertRuleEventRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func alert_rule_eventBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "alert_rule_event", "AlertRuleEventTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read alert_rule_event test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse alert_rule_event test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"alert_rule_event01", "alert_rule_event02", "alert_rule_event03", "alert_rule01", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID"])
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
