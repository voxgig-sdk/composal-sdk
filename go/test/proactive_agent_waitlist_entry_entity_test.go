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
const proactive_agent_waitlist_entryEntityLiveStrict = true


func TestProactiveAgentWaitlistEntryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ProactiveAgentWaitlistEntry(nil)
		if ent == nil {
			t.Fatal("expected non-nil ProactiveAgentWaitlistEntryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ProactiveAgentWaitlistEntry(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := proactive_agent_waitlist_entryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "proactive_agent_waitlist_entry." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"proactive_agent_waitlist_entry.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries\"}")
			t.Log("LIVE STEP {\"id\":\"proactive_agent_waitlist_entry.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives\"}")
			t.Skip("Live coverage incomplete: proactive_agent_waitlist_entry.create.0 excluded (GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries); proactive_agent_waitlist_entry.load.1 excluded (GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives)")
			return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		proactiveAgentWaitlistEntryRef01Ent := client.ProactiveAgentWaitlistEntry(nil)
		proactiveAgentWaitlistEntryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "proactive_agent_waitlist_entry"}), "proactive_agent_waitlist_entry_ref01"))

		proactiveAgentWaitlistEntryRef01DataResult, err := proactiveAgentWaitlistEntryRef01Ent.Create(proactiveAgentWaitlistEntryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		proactiveAgentWaitlistEntryRef01Data = core.ToMapAny(entityData(proactiveAgentWaitlistEntryRef01DataResult))
		if proactiveAgentWaitlistEntryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if proactiveAgentWaitlistEntryRef01Data["referral_code"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		proactiveAgentWaitlistEntryRef01MatchDt0 := map[string]any{
			"id": proactiveAgentWaitlistEntryRef01Data["referral_code"],
		}
		proactiveAgentWaitlistEntryRef01DataDt0Loaded, err := proactiveAgentWaitlistEntryRef01Ent.Load(proactiveAgentWaitlistEntryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		proactiveAgentWaitlistEntryRef01DataDt0LoadResult := core.ToMapAny(entityData(proactiveAgentWaitlistEntryRef01DataDt0Loaded))
		if proactiveAgentWaitlistEntryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(proactiveAgentWaitlistEntryRef01DataDt0LoadResult["referral_code"], proactiveAgentWaitlistEntryRef01Data["referral_code"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func proactive_agent_waitlist_entryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "proactive_agent_waitlist_entry", "ProactiveAgentWaitlistEntryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read proactive_agent_waitlist_entry test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse proactive_agent_waitlist_entry test data: " + err.Error())
	}

	for _, rec := range core.ToMapAny(vs.GetPath(entityData, "existing.proactive_agent_waitlist_entry")) {
		if recMap := core.ToMapAny(rec); recMap != nil && recMap["id"] != nil {
			recMap["referral_code"] = recMap["id"]
		}
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"proactive_agent_waitlist_entry01", "proactive_agent_waitlist_entry02", "proactive_agent_waitlist_entry03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID"])
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
