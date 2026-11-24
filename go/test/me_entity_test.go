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
const meEntityLiveStrict = true


func TestMeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Me(nil)
		if ent == nil {
			t.Fatal("expected non-nil MeEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Me(nil).Load(map[string]any{"analytics_distinct_id": 1, "id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := meBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "me." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"me.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/me/account_deletion\"}")
			t.Log("LIVE STEP {\"id\":\"me.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/me\"}")
			t.Log("LIVE STEP {\"id\":\"me.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only me.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"me.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/me/profile_image\"}")
			t.Skip("Live coverage incomplete: me.create.0 excluded (GET-only live run: needs POST /api/v1/me/account_deletion); me.update.1 excluded (GET-only live run: needs PATCH /api/v1/me); me.load.2 excluded (GET-only live run: reads a record only me.create.0 gives); me.remove.3 excluded (GET-only live run: needs DELETE /api/v1/me/profile_image)")
			return
		}

		if setup.live {
			liveMiss(t, meEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a me record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		meRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.me")))
		var meRef01Data map[string]any
		if len(meRef01DataRaw) > 0 {
			meRef01Data = core.ToMapAny(meRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = meRef01Data

		if setup.live {
			livePace()
		}
		// UPDATE
		meRef01Ent := client.Me(nil)
		meRef01DataUp0Up := map[string]any{
			"id": meRef01Data["id"],
		}

		meRef01MarkdefUp0Name := "analytics_distinct_id"
		meRef01MarkdefUp0Value := fmt.Sprintf("Mark01-me_ref01_%d", setup.now)
		meRef01DataUp0Up[meRef01MarkdefUp0Name] = meRef01MarkdefUp0Value

		meRef01ResdataUp0Result, err := meRef01Ent.Update(meRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		meRef01ResdataUp0 := core.ToMapAny(entityData(meRef01ResdataUp0Result))
		if meRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(meRef01ResdataUp0["id"], meRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if meRef01ResdataUp0[meRef01MarkdefUp0Name] != meRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", meRef01MarkdefUp0Name, meRef01ResdataUp0[meRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		meRef01MatchDt0 := map[string]any{
			"id": meRef01Data["id"],
		}
		meRef01DataDt0Loaded, err := meRef01Ent.Load(meRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		meRef01DataDt0LoadResult := core.ToMapAny(entityData(meRef01DataDt0Loaded))
		if meRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(meRef01DataDt0LoadResult["id"], meRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func meBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "me", "MeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read me test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse me test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"me01", "me02", "me03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ME_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ME_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ME_ENTID"])
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
