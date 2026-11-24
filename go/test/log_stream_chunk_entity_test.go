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
const log_stream_chunkEntityLiveStrict = true


func TestLogStreamChunkEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LogStreamChunk(nil)
		if ent == nil {
			t.Fatal("expected non-nil LogStreamChunkEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LogStreamChunk(nil).List(map[string]any{"log_stream_id": 1, "space_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := log_stream_chunkBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "log_stream_chunk." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"log_stream_chunk.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks\"}")
		if setup.live {
			for _, _liveKey := range []string{"log_stream01", "space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, log_stream_chunkEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["log_stream_chunk01"]
			}
			livePace()
			liveExisting(t, log_stream_chunkEntityLiveStrict, setup.data, "log_stream_chunk", "id", _liveId,
				func() (any, error) {
					return client.LogStreamChunk(nil).List(map[string]any{"log_stream_id": setup.idmap["log_stream01"], "space_id": setup.idmap["space01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		logStreamChunkRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.log_stream_chunk")))
		var logStreamChunkRef01Data map[string]any
		if len(logStreamChunkRef01DataRaw) > 0 {
			logStreamChunkRef01Data = core.ToMapAny(logStreamChunkRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = logStreamChunkRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		logStreamChunkRef01Ent := client.LogStreamChunk(nil)
		logStreamChunkRef01Match := map[string]any{
			"log_stream_id": setup.idmap["log_stream01"],
			"space_id": setup.idmap["space01"],
		}

		logStreamChunkRef01ListResult, err := logStreamChunkRef01Ent.List(logStreamChunkRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, logStreamChunkRef01ListOk := logStreamChunkRef01ListResult.([]any)
		if !logStreamChunkRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", logStreamChunkRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		logStreamChunkRef01MatchDt0 := map[string]any{
			"id": logStreamChunkRef01Data["id"],
		}
		if v := setup.idmap["log_stream_id"]; v != nil {
			logStreamChunkRef01MatchDt0["log_stream_id"] = v
		} else {
			logStreamChunkRef01MatchDt0["log_stream_id"] = setup.idmap["log_stream01"]
		}
		if v := setup.idmap["space_id"]; v != nil {
			logStreamChunkRef01MatchDt0["space_id"] = v
		} else {
			logStreamChunkRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		logStreamChunkRef01DataDt0Loaded, err := logStreamChunkRef01Ent.Load(logStreamChunkRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		logStreamChunkRef01DataDt0LoadResult := core.ToMapAny(entityData(logStreamChunkRef01DataDt0Loaded))
		if logStreamChunkRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(logStreamChunkRef01DataDt0LoadResult["id"], logStreamChunkRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"log_stream01", "space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, log_stream_chunkEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		logStreamChunkRef01Ent := client.LogStreamChunk(nil)
		logStreamChunkRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "log_stream_chunk"}), "log_stream_chunk_ref01"))
		logStreamChunkRef01Data["log_stream_id"] = setup.idmap["log_stream01"]
		logStreamChunkRef01Data["space_id"] = setup.idmap["space01"]

		logStreamChunkRef01DataResult, err := logStreamChunkRef01Ent.Create(logStreamChunkRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		logStreamChunkRef01Data = core.ToMapAny(entityData(logStreamChunkRef01DataResult))
		if logStreamChunkRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if logStreamChunkRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		logStreamChunkRef01Match := map[string]any{
			"log_stream_id": setup.idmap["log_stream01"],
			"space_id": setup.idmap["space01"],
		}

		logStreamChunkRef01ListResult, err := logStreamChunkRef01Ent.List(logStreamChunkRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		logStreamChunkRef01List, logStreamChunkRef01ListOk := logStreamChunkRef01ListResult.([]any)
		if !logStreamChunkRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", logStreamChunkRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(logStreamChunkRef01List), map[string]any{"id": logStreamChunkRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		logStreamChunkRef01MatchDt0 := map[string]any{
			"id": logStreamChunkRef01Data["id"],
		}
		if v := setup.idmap["log_stream_id"]; v != nil {
			logStreamChunkRef01MatchDt0["log_stream_id"] = v
		} else {
			logStreamChunkRef01MatchDt0["log_stream_id"] = setup.idmap["log_stream01"]
		}
		if v := setup.idmap["space_id"]; v != nil {
			logStreamChunkRef01MatchDt0["space_id"] = v
		} else {
			logStreamChunkRef01MatchDt0["space_id"] = setup.idmap["space01"]
		}
		logStreamChunkRef01DataDt0Loaded, err := logStreamChunkRef01Ent.Load(logStreamChunkRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		logStreamChunkRef01DataDt0LoadResult := core.ToMapAny(entityData(logStreamChunkRef01DataDt0Loaded))
		if logStreamChunkRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(logStreamChunkRef01DataDt0LoadResult["id"], logStreamChunkRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func log_stream_chunkBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "log_stream_chunk", "LogStreamChunkTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read log_stream_chunk test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse log_stream_chunk test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"log_stream_chunk01", "log_stream_chunk02", "log_stream_chunk03", "log_stream01", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID"])
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
