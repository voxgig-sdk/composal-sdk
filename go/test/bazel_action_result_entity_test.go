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
const bazel_action_resultEntityLiveStrict = true


func TestBazelActionResultEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BazelActionResult(nil)
		if ent == nil {
			t.Fatal("expected non-nil BazelActionResultEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BazelActionResult(nil).Load(map[string]any{"action_result_id": 1, "id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := bazel_action_resultBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bazel_action_result." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"bazel_action_result.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/bazel/action_results/{hash}/{size_bytes}\"}")
		if setup.live {
			for _, _liveKey := range []string{"action_result01", "bazel_action_result01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, bazel_action_resultEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, bazel_action_resultEntityLiveStrict, setup.data, "bazel_action_result", "id", setup.idmap["bazel_action_result01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["bazel_action_result01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		bazelActionResultRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.bazel_action_result")))
		var bazelActionResultRef01Data map[string]any
		if len(bazelActionResultRef01DataRaw) > 0 {
			bazelActionResultRef01Data = core.ToMapAny(bazelActionResultRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bazelActionResultRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		bazelActionResultRef01Ent := client.BazelActionResult(nil)
		bazelActionResultRef01MatchDt0 := map[string]any{
			"id": bazelActionResultRef01Data["id"],
		}
		if v := setup.idmap["action_result_id"]; v != nil {
			bazelActionResultRef01MatchDt0["action_result_id"] = v
		} else {
			bazelActionResultRef01MatchDt0["action_result_id"] = setup.idmap["action_result01"]
		}
		bazelActionResultRef01DataDt0Loaded, err := bazelActionResultRef01Ent.Load(bazelActionResultRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bazelActionResultRef01DataDt0LoadResult := core.ToMapAny(entityData(bazelActionResultRef01DataDt0Loaded))
		if bazelActionResultRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(bazelActionResultRef01DataDt0LoadResult["id"], bazelActionResultRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"action_result01", "bazel_action_result01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, bazel_action_resultEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, bazel_action_resultEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a bazel_action_result record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		bazelActionResultRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.bazel_action_result")))
		var bazelActionResultRef01Data map[string]any
		if len(bazelActionResultRef01DataRaw) > 0 {
			bazelActionResultRef01Data = core.ToMapAny(bazelActionResultRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bazelActionResultRef01Data

		if setup.live {
			livePace()
		}
		// UPDATE
		bazelActionResultRef01Ent := client.BazelActionResult(nil)
		bazelActionResultRef01DataUp0Up := map[string]any{
			"id": bazelActionResultRef01Data["id"],
			"action_result_id": setup.idmap["action_result_id"],
		}

		bazelActionResultRef01ResdataUp0Result, err := bazelActionResultRef01Ent.Update(bazelActionResultRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		bazelActionResultRef01ResdataUp0 := core.ToMapAny(entityData(bazelActionResultRef01ResdataUp0Result))
		if bazelActionResultRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(bazelActionResultRef01ResdataUp0["id"], bazelActionResultRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		bazelActionResultRef01MatchDt0 := map[string]any{
			"id": bazelActionResultRef01Data["id"],
		}
		if v := setup.idmap["action_result_id"]; v != nil {
			bazelActionResultRef01MatchDt0["action_result_id"] = v
		} else {
			bazelActionResultRef01MatchDt0["action_result_id"] = setup.idmap["action_result01"]
		}
		bazelActionResultRef01DataDt0Loaded, err := bazelActionResultRef01Ent.Load(bazelActionResultRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bazelActionResultRef01DataDt0LoadResult := core.ToMapAny(entityData(bazelActionResultRef01DataDt0Loaded))
		if bazelActionResultRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(bazelActionResultRef01DataDt0LoadResult["id"], bazelActionResultRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func bazel_action_resultBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bazel_action_result", "BazelActionResultTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bazel_action_result test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bazel_action_result test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"bazel_action_result01", "bazel_action_result02", "bazel_action_result03", "action_result01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add action_result_id alias for update test.
	if idmapResolved["action_result_id"] == nil {
		idmapResolved["action_result_id"] = idmapResolved["action_result01"]
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
