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
const space_log_streamEntityLiveStrict = true


func TestSpaceLogStreamEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpaceLogStream(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpaceLogStreamEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpaceLogStream(nil).List(map[string]any{"space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_log_streamBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_log_stream." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_log_stream.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/log_streams\"}")
		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_log_streamEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_LOG_STREAM_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		spaceLogStreamRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.space_log_stream")))
		var spaceLogStreamRef01Data map[string]any
		if len(spaceLogStreamRef01DataRaw) > 0 {
			spaceLogStreamRef01Data = core.ToMapAny(spaceLogStreamRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = spaceLogStreamRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		spaceLogStreamRef01Ent := client.SpaceLogStream(nil)
		spaceLogStreamRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceLogStreamRef01ListResult, err := spaceLogStreamRef01Ent.List(spaceLogStreamRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, spaceLogStreamRef01ListOk := spaceLogStreamRef01ListResult.([]any)
		if !spaceLogStreamRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceLogStreamRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_log_streamEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_LOG_STREAM_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spaceLogStreamRef01Ent := client.SpaceLogStream(nil)
		spaceLogStreamRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_log_stream"}), "space_log_stream_ref01"))
		spaceLogStreamRef01Data["space_id"] = setup.idmap["space01"]

		spaceLogStreamRef01DataResult, err := spaceLogStreamRef01Ent.Create(spaceLogStreamRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spaceLogStreamRef01Data = core.ToMapAny(entityData(spaceLogStreamRef01DataResult))
		if spaceLogStreamRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		spaceLogStreamRef01Match := map[string]any{
			"space_id": setup.idmap["space01"],
		}

		spaceLogStreamRef01ListResult, err := spaceLogStreamRef01Ent.List(spaceLogStreamRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, spaceLogStreamRef01ListOk := spaceLogStreamRef01ListResult.([]any)
		if !spaceLogStreamRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", spaceLogStreamRef01ListResult)
		}

	})
}

func space_log_streamBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_log_stream", "SpaceLogStreamTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_log_stream test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_log_stream test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_log_stream01", "space_log_stream02", "space_log_stream03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_LOG_STREAM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_LOG_STREAM_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_LOG_STREAM_ENTID"])
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
