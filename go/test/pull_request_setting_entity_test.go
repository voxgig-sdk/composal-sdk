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
const pull_request_settingEntityLiveStrict = true


func TestPullRequestSettingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PullRequestSetting(nil)
		if ent == nil {
			t.Fatal("expected non-nil PullRequestSettingEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PullRequestSetting(nil).Load(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := pull_request_settingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "pull_request_setting." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"pull_request_setting.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/pull_request_settings\"}")
			t.Log("LIVE STEP {\"id\":\"pull_request_setting.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only pull_request_setting.create.0 gives\"}")
			t.Skip("Live coverage incomplete: pull_request_setting.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/pull_request_settings); pull_request_setting.load.1 excluded (GET-only live run: reads a record only pull_request_setting.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, pull_request_settingEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PULL_REQUEST_SETTING_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		pullRequestSettingRef01Ent := client.PullRequestSetting(nil)
		pullRequestSettingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "pull_request_setting"}), "pull_request_setting_ref01"))
		pullRequestSettingRef01Data["organization_id"] = setup.idmap["organization01"]

		pullRequestSettingRef01DataResult, err := pullRequestSettingRef01Ent.Create(pullRequestSettingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		pullRequestSettingRef01Data = core.ToMapAny(entityData(pullRequestSettingRef01DataResult))
		if pullRequestSettingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if pullRequestSettingRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		pullRequestSettingRef01MatchDt0 := map[string]any{
			"id": pullRequestSettingRef01Data["id"],
		}
		pullRequestSettingRef01DataDt0Loaded, err := pullRequestSettingRef01Ent.Load(pullRequestSettingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		pullRequestSettingRef01DataDt0LoadResult := core.ToMapAny(entityData(pullRequestSettingRef01DataDt0Loaded))
		if pullRequestSettingRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(pullRequestSettingRef01DataDt0LoadResult["id"], pullRequestSettingRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func pull_request_settingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "pull_request_setting", "PullRequestSettingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read pull_request_setting test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse pull_request_setting test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"pull_request_setting01", "pull_request_setting02", "pull_request_setting03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PULL_REQUEST_SETTING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PULL_REQUEST_SETTING_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PULL_REQUEST_SETTING_ENTID"])
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
