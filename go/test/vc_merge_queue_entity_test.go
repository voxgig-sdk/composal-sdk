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
const vc_merge_queueEntityLiveStrict = true


func TestVcMergeQueueEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.VcMergeQueue(nil)
		if ent == nil {
			t.Fatal("expected non-nil VcMergeQueueEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.VcMergeQueue(nil).List(map[string]any{"organization_id": 1, "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := vc_merge_queueBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "vc_merge_queue." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"vc_merge_queue.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause\"}")
			t.Log("LIVE STEP {\"id\":\"vc_merge_queue.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/concurrency\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, vc_merge_queueEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["vc_merge_queue01"]
			}
			livePace()
			liveExisting(t, vc_merge_queueEntityLiveStrict, setup.data, "vc_merge_queue", "id", _liveId,
				func() (any, error) {
					return client.VcMergeQueue(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "repo_id": setup.idmap["repo01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		vcMergeQueueRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.vc_merge_queue")))
		var vcMergeQueueRef01Data map[string]any
		if len(vcMergeQueueRef01DataRaw) > 0 {
			vcMergeQueueRef01Data = core.ToMapAny(vcMergeQueueRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = vcMergeQueueRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		vcMergeQueueRef01Ent := client.VcMergeQueue(nil)
		vcMergeQueueRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		vcMergeQueueRef01ListResult, err := vcMergeQueueRef01Ent.List(vcMergeQueueRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, vcMergeQueueRef01ListOk := vcMergeQueueRef01ListResult.([]any)
		if !vcMergeQueueRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", vcMergeQueueRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		vcMergeQueueRef01MatchDt0 := map[string]any{
			"id": vcMergeQueueRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			vcMergeQueueRef01MatchDt0["organization_id"] = v
		} else {
			vcMergeQueueRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			vcMergeQueueRef01MatchDt0["repo_id"] = v
		} else {
			vcMergeQueueRef01MatchDt0["repo_id"] = setup.idmap["repo01"]
		}
		vcMergeQueueRef01DataDt0Loaded, err := vcMergeQueueRef01Ent.Load(vcMergeQueueRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		vcMergeQueueRef01DataDt0LoadResult := core.ToMapAny(entityData(vcMergeQueueRef01DataDt0Loaded))
		if vcMergeQueueRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(vcMergeQueueRef01DataDt0LoadResult["id"], vcMergeQueueRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, vc_merge_queueEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["vc_merge_queue01"]
			}
			livePace()
			liveExisting(t, vc_merge_queueEntityLiveStrict, setup.data, "vc_merge_queue", "id", _liveId,
				func() (any, error) {
					return client.VcMergeQueue(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "repo_id": setup.idmap["repo01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		vcMergeQueueRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.vc_merge_queue")))
		var vcMergeQueueRef01Data map[string]any
		if len(vcMergeQueueRef01DataRaw) > 0 {
			vcMergeQueueRef01Data = core.ToMapAny(vcMergeQueueRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = vcMergeQueueRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		vcMergeQueueRef01Ent := client.VcMergeQueue(nil)
		vcMergeQueueRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		vcMergeQueueRef01ListResult, err := vcMergeQueueRef01Ent.List(vcMergeQueueRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, vcMergeQueueRef01ListOk := vcMergeQueueRef01ListResult.([]any)
		if !vcMergeQueueRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", vcMergeQueueRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		vcMergeQueueRef01MatchDt0 := map[string]any{
			"id": vcMergeQueueRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			vcMergeQueueRef01MatchDt0["organization_id"] = v
		} else {
			vcMergeQueueRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			vcMergeQueueRef01MatchDt0["repo_id"] = v
		} else {
			vcMergeQueueRef01MatchDt0["repo_id"] = setup.idmap["repo01"]
		}
		vcMergeQueueRef01DataDt0Loaded, err := vcMergeQueueRef01Ent.Load(vcMergeQueueRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		vcMergeQueueRef01DataDt0LoadResult := core.ToMapAny(entityData(vcMergeQueueRef01DataDt0Loaded))
		if vcMergeQueueRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(vcMergeQueueRef01DataDt0LoadResult["id"], vcMergeQueueRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func vc_merge_queueBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "vc_merge_queue", "VcMergeQueueTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read vc_merge_queue test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse vc_merge_queue test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"vc_merge_queue01", "vc_merge_queue02", "vc_merge_queue03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID"])
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
