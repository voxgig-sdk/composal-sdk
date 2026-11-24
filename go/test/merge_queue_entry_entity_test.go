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
const merge_queue_entryEntityLiveStrict = true


func TestMergeQueueEntryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.MergeQueueEntry(nil)
		if ent == nil {
			t.Fatal("expected non-nil MergeQueueEntryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.MergeQueueEntry(nil).Create(map[string]any{"merge_queue_id": 1, "organization_id": "x", "repo_id": "x", "expected_version": 1, "idempotency_key": "x", "kind": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := merge_queue_entryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "merge_queue_entry." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"merge_queue_entry.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge\"}")
			t.Log("LIVE STEP {\"id\":\"merge_queue_entry.remove.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}\"}")
			t.Skip("Live coverage incomplete: merge_queue_entry.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge); merge_queue_entry.remove.1 excluded (GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"merge_queue01", "organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, merge_queue_entryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		mergeQueueEntryRef01Ent := client.MergeQueueEntry(nil)
		mergeQueueEntryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "merge_queue_entry"}), "merge_queue_entry_ref01"))
		mergeQueueEntryRef01Data["merge_queue_id"] = setup.idmap["merge_queue01"]
		mergeQueueEntryRef01Data["organization_id"] = setup.idmap["organization01"]
		mergeQueueEntryRef01Data["repo_id"] = setup.idmap["repo01"]

		mergeQueueEntryRef01DataResult, err := mergeQueueEntryRef01Ent.Create(mergeQueueEntryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		mergeQueueEntryRef01Data = core.ToMapAny(entityData(mergeQueueEntryRef01DataResult))
		if mergeQueueEntryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if mergeQueueEntryRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		mergeQueueEntryRef01MatchRm0 := map[string]any{
			"id": mergeQueueEntryRef01Data["id"],
		}
		if v := setup.idmap["merge_queue_id"]; v != nil {
			mergeQueueEntryRef01MatchRm0["merge_queue_id"] = v
		} else {
			mergeQueueEntryRef01MatchRm0["merge_queue_id"] = setup.idmap["merge_queue01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			mergeQueueEntryRef01MatchRm0["organization_id"] = v
		} else {
			mergeQueueEntryRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			mergeQueueEntryRef01MatchRm0["repo_id"] = v
		} else {
			mergeQueueEntryRef01MatchRm0["repo_id"] = setup.idmap["repo01"]
		}
		_, err = mergeQueueEntryRef01Ent.Remove(mergeQueueEntryRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func merge_queue_entryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "merge_queue_entry", "MergeQueueEntryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read merge_queue_entry test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse merge_queue_entry test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"merge_queue_entry01", "merge_queue_entry02", "merge_queue_entry03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03", "merge_queue01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID"])
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
