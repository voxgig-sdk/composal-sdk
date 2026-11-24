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
const cache_namespace_entryEntityLiveStrict = true


func TestCacheNamespaceEntryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CacheNamespaceEntry(nil)
		if ent == nil {
			t.Fatal("expected non-nil CacheNamespaceEntryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CacheNamespaceEntry(nil).Load(map[string]any{"cache_namespace_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := cache_namespace_entryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cache_namespace_entry." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"cache_namespace_entry.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict\"}")
			t.Log("LIVE STEP {\"id\":\"cache_namespace_entry.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"cache_namespace_entry.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only cache_namespace_entry.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"cache_namespace_entry.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}\"}")
			t.Skip("Live coverage incomplete: cache_namespace_entry.create.0 excluded (GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict); cache_namespace_entry.update.1 excluded (GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}); cache_namespace_entry.load.2 excluded (GET-only live run: reads a record only cache_namespace_entry.create.0 gives); cache_namespace_entry.remove.3 excluded (GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"cache_namespace01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, cache_namespace_entryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		cacheNamespaceEntryRef01Ent := client.CacheNamespaceEntry(nil)
		cacheNamespaceEntryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "cache_namespace_entry"}), "cache_namespace_entry_ref01"))
		cacheNamespaceEntryRef01Data["cache_namespace_id"] = setup.idmap["cache_namespace01"]

		cacheNamespaceEntryRef01DataResult, err := cacheNamespaceEntryRef01Ent.Create(cacheNamespaceEntryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		cacheNamespaceEntryRef01Data = core.ToMapAny(entityData(cacheNamespaceEntryRef01DataResult))
		if cacheNamespaceEntryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if cacheNamespaceEntryRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		cacheNamespaceEntryRef01DataUp0Up := map[string]any{
			"id": cacheNamespaceEntryRef01Data["id"],
			"cache_namespace_id": setup.idmap["cache_namespace_id"],
		}

		cacheNamespaceEntryRef01ResdataUp0Result, err := cacheNamespaceEntryRef01Ent.Update(cacheNamespaceEntryRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		cacheNamespaceEntryRef01ResdataUp0 := core.ToMapAny(entityData(cacheNamespaceEntryRef01ResdataUp0Result))
		if cacheNamespaceEntryRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(cacheNamespaceEntryRef01ResdataUp0["id"], cacheNamespaceEntryRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cacheNamespaceEntryRef01MatchDt0 := map[string]any{
			"id": cacheNamespaceEntryRef01Data["id"],
		}
		cacheNamespaceEntryRef01DataDt0Loaded, err := cacheNamespaceEntryRef01Ent.Load(cacheNamespaceEntryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cacheNamespaceEntryRef01DataDt0LoadResult := core.ToMapAny(entityData(cacheNamespaceEntryRef01DataDt0Loaded))
		if cacheNamespaceEntryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(cacheNamespaceEntryRef01DataDt0LoadResult["id"], cacheNamespaceEntryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		cacheNamespaceEntryRef01MatchRm0 := map[string]any{
			"id": cacheNamespaceEntryRef01Data["id"],
		}
		if v := setup.idmap["cache_namespace_id"]; v != nil {
			cacheNamespaceEntryRef01MatchRm0["cache_namespace_id"] = v
		} else {
			cacheNamespaceEntryRef01MatchRm0["cache_namespace_id"] = setup.idmap["cache_namespace01"]
		}
		_, err = cacheNamespaceEntryRef01Ent.Remove(cacheNamespaceEntryRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func cache_namespace_entryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cache_namespace_entry", "CacheNamespaceEntryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cache_namespace_entry test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cache_namespace_entry test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"cache_namespace_entry01", "cache_namespace_entry02", "cache_namespace_entry03", "cache_namespace01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add cache_namespace_id alias for update test.
	if idmapResolved["cache_namespace_id"] == nil {
		idmapResolved["cache_namespace_id"] = idmapResolved["cache_namespace01"]
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
