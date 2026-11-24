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
const browser_session_mediaEntityLiveStrict = true


func TestBrowserSessionMediaEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BrowserSessionMedia(nil)
		if ent == nil {
			t.Fatal("expected non-nil BrowserSessionMediaEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BrowserSessionMedia(nil).Load(map[string]any{"browser_session_id": 1, "id": "x", "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := browser_session_mediaBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "browser_session_media." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"browser_session01", "browser_session_media01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, browser_session_mediaEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BROWSER_SESSION_MEDIA_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, browser_session_mediaEntityLiveStrict, setup.data, "browser_session_media", "id", setup.idmap["browser_session_media01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["browser_session_media01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		browserSessionMediaRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.browser_session_media")))
		var browserSessionMediaRef01Data map[string]any
		if len(browserSessionMediaRef01DataRaw) > 0 {
			browserSessionMediaRef01Data = core.ToMapAny(browserSessionMediaRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = browserSessionMediaRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		browserSessionMediaRef01Ent := client.BrowserSessionMedia(nil)
		browserSessionMediaRef01MatchDt0 := map[string]any{
			"id": browserSessionMediaRef01Data["id"],
		}
		switch v := browserSessionMediaRef01Data["browser_session_id"].(type) {
		case string, bool, float64, int, int64:
			browserSessionMediaRef01MatchDt0["browser_session_id"] = v
		default:
			if v := setup.idmap["browser_session_id"]; v != nil {
				browserSessionMediaRef01MatchDt0["browser_session_id"] = v
			} else {
				browserSessionMediaRef01MatchDt0["browser_session_id"] = setup.idmap["browser_session01"]
			}
		}
		if v := setup.idmap["organization_id"]; v != nil {
			browserSessionMediaRef01MatchDt0["organization_id"] = v
		} else {
			browserSessionMediaRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		browserSessionMediaRef01DataDt0Loaded, err := browserSessionMediaRef01Ent.Load(browserSessionMediaRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		browserSessionMediaRef01DataDt0LoadResult := core.ToMapAny(entityData(browserSessionMediaRef01DataDt0Loaded))
		if browserSessionMediaRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(browserSessionMediaRef01DataDt0LoadResult["id"], browserSessionMediaRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func browser_session_mediaBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "browser_session_media", "BrowserSessionMediaTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read browser_session_media test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse browser_session_media test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"browser_session_media01", "browser_session_media02", "browser_session_media03", "organization01", "organization02", "organization03", "browser_session01", "browser_session02", "browser_session03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_BROWSER_SESSION_MEDIA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BROWSER_SESSION_MEDIA_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_BROWSER_SESSION_MEDIA_ENTID"])
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
