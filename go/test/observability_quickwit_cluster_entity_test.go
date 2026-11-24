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
const observability_quickwit_clusterEntityLiveStrict = true


type observability_quickwit_clusterFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *observability_quickwit_clusterFailHook) PreSpec(ctx *sdk.Context) {
	panic("observability_quickwit_cluster hook failed")
}

func (f *observability_quickwit_clusterFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestObservabilityQuickwitClusterEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ObservabilityQuickwitCluster(nil)
		if ent == nil {
			t.Fatal("expected non-nil ObservabilityQuickwitClusterEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"observability_quickwit_cluster": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.ObservabilityQuickwitCluster(nil).Stream("list", nil, nil) {
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
			for si := range streamSdk.ObservabilityQuickwitCluster(nil).Stream("list", nil, nil) {
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
		for si := range sdk.TestSDK(offline, nil).ObservabilityQuickwitCluster(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).ObservabilityQuickwitCluster(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.ObservabilityQuickwitCluster(nil).Stream("list", nil, nil) {
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
		for range sdk.TestSDK(nil, nil).ObservabilityQuickwitCluster(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &observability_quickwit_clusterFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.ObservabilityQuickwitCluster(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.ObservabilityQuickwitCluster(nil).List(nil, map[string]any{"throw": false}); nil != err {
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
		_, err := client.ObservabilityQuickwitCluster(nil).List(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := observability_quickwit_clusterBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "observability_quickwit_cluster." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"observability_quickwit_cluster.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/quickwit_clusters/{id}/activate\"}")
			t.Log("LIVE STEP {\"id\":\"observability_quickwit_cluster.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/observability/quickwit_clusters/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"observability_quickwit_cluster.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/observability/quickwit_clusters/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"observability_quickwit_cluster.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["observability_quickwit_cluster01"]
			}
			livePace()
			liveExisting(t, observability_quickwit_clusterEntityLiveStrict, setup.data, "observability_quickwit_cluster", "id", _liveId,
				func() (any, error) {
					return client.ObservabilityQuickwitCluster(nil).List(map[string]any{}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		observabilityQuickwitClusterRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.observability_quickwit_cluster")))
		var observabilityQuickwitClusterRef01Data map[string]any
		if len(observabilityQuickwitClusterRef01DataRaw) > 0 {
			observabilityQuickwitClusterRef01Data = core.ToMapAny(observabilityQuickwitClusterRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = observabilityQuickwitClusterRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		observabilityQuickwitClusterRef01Ent := client.ObservabilityQuickwitCluster(nil)
		observabilityQuickwitClusterRef01Match := map[string]any{}

		observabilityQuickwitClusterRef01ListResult, err := observabilityQuickwitClusterRef01Ent.List(observabilityQuickwitClusterRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, observabilityQuickwitClusterRef01ListOk := observabilityQuickwitClusterRef01ListResult.([]any)
		if !observabilityQuickwitClusterRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", observabilityQuickwitClusterRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		observabilityQuickwitClusterRef01MatchDt0 := map[string]any{
			"id": observabilityQuickwitClusterRef01Data["id"],
		}
		observabilityQuickwitClusterRef01DataDt0Loaded, err := observabilityQuickwitClusterRef01Ent.Load(observabilityQuickwitClusterRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		observabilityQuickwitClusterRef01DataDt0LoadResult := core.ToMapAny(entityData(observabilityQuickwitClusterRef01DataDt0Loaded))
		if observabilityQuickwitClusterRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(observabilityQuickwitClusterRef01DataDt0LoadResult["id"], observabilityQuickwitClusterRef01Data["id"]) {
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
		observabilityQuickwitClusterRef01Ent := client.ObservabilityQuickwitCluster(nil)
		observabilityQuickwitClusterRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "observability_quickwit_cluster"}), "observability_quickwit_cluster_ref01"))

		observabilityQuickwitClusterRef01DataResult, err := observabilityQuickwitClusterRef01Ent.Create(observabilityQuickwitClusterRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		observabilityQuickwitClusterRef01Data = core.ToMapAny(entityData(observabilityQuickwitClusterRef01DataResult))
		if observabilityQuickwitClusterRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if observabilityQuickwitClusterRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		observabilityQuickwitClusterRef01Match := map[string]any{}

		observabilityQuickwitClusterRef01ListResult, err := observabilityQuickwitClusterRef01Ent.List(observabilityQuickwitClusterRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		observabilityQuickwitClusterRef01List, observabilityQuickwitClusterRef01ListOk := observabilityQuickwitClusterRef01ListResult.([]any)
		if !observabilityQuickwitClusterRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", observabilityQuickwitClusterRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(observabilityQuickwitClusterRef01List), map[string]any{"id": observabilityQuickwitClusterRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		observabilityQuickwitClusterRef01DataUp0Up := map[string]any{
			"id": observabilityQuickwitClusterRef01Data["id"],
		}

		observabilityQuickwitClusterRef01ResdataUp0Result, err := observabilityQuickwitClusterRef01Ent.Update(observabilityQuickwitClusterRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		observabilityQuickwitClusterRef01ResdataUp0 := core.ToMapAny(entityData(observabilityQuickwitClusterRef01ResdataUp0Result))
		if observabilityQuickwitClusterRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(observabilityQuickwitClusterRef01ResdataUp0["id"], observabilityQuickwitClusterRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		observabilityQuickwitClusterRef01MatchDt0 := map[string]any{
			"id": observabilityQuickwitClusterRef01Data["id"],
		}
		observabilityQuickwitClusterRef01DataDt0Loaded, err := observabilityQuickwitClusterRef01Ent.Load(observabilityQuickwitClusterRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		observabilityQuickwitClusterRef01DataDt0LoadResult := core.ToMapAny(entityData(observabilityQuickwitClusterRef01DataDt0Loaded))
		if observabilityQuickwitClusterRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(observabilityQuickwitClusterRef01DataDt0LoadResult["id"], observabilityQuickwitClusterRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		observabilityQuickwitClusterRef01MatchRm0 := map[string]any{
			"id": observabilityQuickwitClusterRef01Data["id"],
		}
		_, err = observabilityQuickwitClusterRef01Ent.Remove(observabilityQuickwitClusterRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		observabilityQuickwitClusterRef01MatchRt0 := map[string]any{}

		observabilityQuickwitClusterRef01ListRt0Result, err := observabilityQuickwitClusterRef01Ent.List(observabilityQuickwitClusterRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		observabilityQuickwitClusterRef01ListRt0, observabilityQuickwitClusterRef01ListRt0Ok := observabilityQuickwitClusterRef01ListRt0Result.([]any)
		if !observabilityQuickwitClusterRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", observabilityQuickwitClusterRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(observabilityQuickwitClusterRef01ListRt0), map[string]any{"id": observabilityQuickwitClusterRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func observability_quickwit_clusterBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "observability_quickwit_cluster", "ObservabilityQuickwitClusterTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read observability_quickwit_cluster test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse observability_quickwit_cluster test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"observability_quickwit_cluster01", "observability_quickwit_cluster02", "observability_quickwit_cluster03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_OBSERVABILITY_QUICKWIT_CLUSTER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_OBSERVABILITY_QUICKWIT_CLUSTER_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_OBSERVABILITY_QUICKWIT_CLUSTER_ENTID"])
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
