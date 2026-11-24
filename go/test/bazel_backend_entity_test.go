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
const bazel_backendEntityLiveStrict = true


type bazel_backendFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *bazel_backendFailHook) PreSpec(ctx *sdk.Context) {
	panic("bazel_backend hook failed")
}

func (f *bazel_backendFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestBazelBackendEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BazelBackend(nil)
		if ent == nil {
			t.Fatal("expected non-nil BazelBackendEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"bazel_backend": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.BazelBackend(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				t.Fatalf("stream failed: %v", si.Err)
			}
			seen = append(seen, si.Item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for si := range streamSdk.BazelBackend(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					t.Fatalf("stream failed: %v", si.Err)
				}
				if sub, ok := si.Item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, si.Item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("stream-error", func(t *testing.T) {
		offline := map[string]any{"net": map[string]any{"offline": true}}
		var streamerr error
		for si := range sdk.TestSDK(offline, nil).BazelBackend(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).BazelBackend(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.BazelBackend(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					denyerr = si.Err
				}
			}
			if sdkerr, ok := denyerr.(*core.ComposalError); !ok || "rbac_denied" != sdkerr.Code {
				t.Fatalf("expected the rbac denial as a stream value, got %v", denyerr)
			}
		}
	})

	t.Run("stream-ctrl", func(t *testing.T) {
		explain := map[string]any{}
		ctrl := map[string]any{"explain": explain}
		for range sdk.TestSDK(nil, nil).BazelBackend(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &bazel_backendFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.BazelBackend(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.BazelBackend(nil).List(nil, map[string]any{"throw": false}); nil != err {
			t.Fatalf("throw false: expected no error, got %v", err)
		}
		if fired == hook.unexpected {
			t.Fatalf("throw false: PreUnexpected did not fire")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BazelBackend(nil).List(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := bazel_backendBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bazel_backend." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"bazel_backend.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/bazel/backends/{id}/issue_token\"}")
			t.Log("LIVE STEP {\"id\":\"bazel_backend.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/bazel/backends/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"bazel_backend.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/bazel/backends/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"bazel_backend.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["bazel_backend01"]
			}
			livePace()
			liveExisting(t, bazel_backendEntityLiveStrict, setup.data, "bazel_backend", "id", _liveId,
				func() (any, error) {
					return client.BazelBackend(nil).List(map[string]any{}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		bazelBackendRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.bazel_backend")))
		var bazelBackendRef01Data map[string]any
		if len(bazelBackendRef01DataRaw) > 0 {
			bazelBackendRef01Data = core.ToMapAny(bazelBackendRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bazelBackendRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		bazelBackendRef01Ent := client.BazelBackend(nil)
		bazelBackendRef01Match := map[string]any{}

		bazelBackendRef01ListResult, err := bazelBackendRef01Ent.List(bazelBackendRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, bazelBackendRef01ListOk := bazelBackendRef01ListResult.([]any)
		if !bazelBackendRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", bazelBackendRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		bazelBackendRef01MatchDt0 := map[string]any{
			"id": bazelBackendRef01Data["id"],
		}
		bazelBackendRef01DataDt0Loaded, err := bazelBackendRef01Ent.Load(bazelBackendRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bazelBackendRef01DataDt0LoadResult := core.ToMapAny(entityData(bazelBackendRef01DataDt0Loaded))
		if bazelBackendRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(bazelBackendRef01DataDt0LoadResult["id"], bazelBackendRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		bazelBackendRef01Ent := client.BazelBackend(nil)
		bazelBackendRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "bazel_backend"}), "bazel_backend_ref01"))

		bazelBackendRef01DataResult, err := bazelBackendRef01Ent.Create(bazelBackendRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		bazelBackendRef01Data = core.ToMapAny(entityData(bazelBackendRef01DataResult))
		if bazelBackendRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if bazelBackendRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		bazelBackendRef01Match := map[string]any{}

		bazelBackendRef01ListResult, err := bazelBackendRef01Ent.List(bazelBackendRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		bazelBackendRef01List, bazelBackendRef01ListOk := bazelBackendRef01ListResult.([]any)
		if !bazelBackendRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", bazelBackendRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(bazelBackendRef01List), map[string]any{"id": bazelBackendRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		bazelBackendRef01DataUp0Up := map[string]any{
			"id": bazelBackendRef01Data["id"],
		}

		bazelBackendRef01ResdataUp0Result, err := bazelBackendRef01Ent.Update(bazelBackendRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		bazelBackendRef01ResdataUp0 := core.ToMapAny(entityData(bazelBackendRef01ResdataUp0Result))
		if bazelBackendRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(bazelBackendRef01ResdataUp0["id"], bazelBackendRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		bazelBackendRef01MatchDt0 := map[string]any{
			"id": bazelBackendRef01Data["id"],
		}
		bazelBackendRef01DataDt0Loaded, err := bazelBackendRef01Ent.Load(bazelBackendRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bazelBackendRef01DataDt0LoadResult := core.ToMapAny(entityData(bazelBackendRef01DataDt0Loaded))
		if bazelBackendRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(bazelBackendRef01DataDt0LoadResult["id"], bazelBackendRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		bazelBackendRef01MatchRm0 := map[string]any{
			"id": bazelBackendRef01Data["id"],
		}
		_, err = bazelBackendRef01Ent.Remove(bazelBackendRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		bazelBackendRef01MatchRt0 := map[string]any{}

		bazelBackendRef01ListRt0Result, err := bazelBackendRef01Ent.List(bazelBackendRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		bazelBackendRef01ListRt0, bazelBackendRef01ListRt0Ok := bazelBackendRef01ListRt0Result.([]any)
		if !bazelBackendRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", bazelBackendRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(bazelBackendRef01ListRt0), map[string]any{"id": bazelBackendRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func bazel_backendBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bazel_backend", "BazelBackendTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bazel_backend test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bazel_backend test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"bazel_backend01", "bazel_backend02", "bazel_backend03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_BAZEL_BACKEND_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BAZEL_BACKEND_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_BAZEL_BACKEND_ENTID"])
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
