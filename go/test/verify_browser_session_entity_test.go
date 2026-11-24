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
const verify_browser_sessionEntityLiveStrict = true


func TestVerifyBrowserSessionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.VerifyBrowserSession(nil)
		if ent == nil {
			t.Fatal("expected non-nil VerifyBrowserSessionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.VerifyBrowserSession(nil).Load(map[string]any{"id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := verify_browser_sessionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "verify_browser_session." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"verify_browser_session.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/browser_sessions/{id}/save\"}")
			t.Log("LIVE STEP {\"id\":\"verify_browser_session.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only verify_browser_session.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"verify_browser_session.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/browser_sessions/{id}\"}")
			t.Skip("Live coverage incomplete: verify_browser_session.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/browser_sessions/{id}/save); verify_browser_session.load.1 excluded (GET-only live run: reads a record only verify_browser_session.create.0 gives); verify_browser_session.remove.2 excluded (GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/browser_sessions/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, verify_browser_sessionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VERIFY_BROWSER_SESSION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		verifyBrowserSessionRef01Ent := client.VerifyBrowserSession(nil)
		verifyBrowserSessionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "verify_browser_session"}), "verify_browser_session_ref01"))
		verifyBrowserSessionRef01Data["organization_id"] = setup.idmap["organization01"]

		verifyBrowserSessionRef01DataResult, err := verifyBrowserSessionRef01Ent.Create(verifyBrowserSessionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		verifyBrowserSessionRef01Data = core.ToMapAny(entityData(verifyBrowserSessionRef01DataResult))
		if verifyBrowserSessionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if verifyBrowserSessionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		verifyBrowserSessionRef01MatchDt0 := map[string]any{
			"id": verifyBrowserSessionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verifyBrowserSessionRef01MatchDt0["organization_id"] = v
		} else {
			verifyBrowserSessionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		verifyBrowserSessionRef01DataDt0Loaded, err := verifyBrowserSessionRef01Ent.Load(verifyBrowserSessionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		verifyBrowserSessionRef01DataDt0LoadResult := core.ToMapAny(entityData(verifyBrowserSessionRef01DataDt0Loaded))
		if verifyBrowserSessionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(verifyBrowserSessionRef01DataDt0LoadResult["id"], verifyBrowserSessionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		verifyBrowserSessionRef01MatchRm0 := map[string]any{
			"id": verifyBrowserSessionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			verifyBrowserSessionRef01MatchRm0["organization_id"] = v
		} else {
			verifyBrowserSessionRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = verifyBrowserSessionRef01Ent.Remove(verifyBrowserSessionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func verify_browser_sessionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "verify_browser_session", "VerifyBrowserSessionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read verify_browser_session test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse verify_browser_session test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"verify_browser_session01", "verify_browser_session02", "verify_browser_session03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_VERIFY_BROWSER_SESSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_VERIFY_BROWSER_SESSION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_VERIFY_BROWSER_SESSION_ENTID"])
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
