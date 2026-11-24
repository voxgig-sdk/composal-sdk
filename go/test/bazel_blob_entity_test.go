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
const bazel_blobEntityLiveStrict = true


func TestBazelBlobEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BazelBlob(nil)
		if ent == nil {
			t.Fatal("expected non-nil BazelBlobEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BazelBlob(nil).Load(map[string]any{"blob_id": 1, "hash": "x", "id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := bazel_blobBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bazel_blob." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"bazel_blob.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}\"}")
		if setup.live {
			for _, _liveKey := range []string{"blob01", "hash01", "bazel_blob01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, bazel_blobEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BAZEL_BLOB_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, bazel_blobEntityLiveStrict, setup.data, "bazel_blob", "id", setup.idmap["bazel_blob01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["bazel_blob01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		bazelBlobRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.bazel_blob")))
		var bazelBlobRef01Data map[string]any
		if len(bazelBlobRef01DataRaw) > 0 {
			bazelBlobRef01Data = core.ToMapAny(bazelBlobRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bazelBlobRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		bazelBlobRef01Ent := client.BazelBlob(nil)
		bazelBlobRef01MatchDt0 := map[string]any{
			"id": bazelBlobRef01Data["id"],
		}
		if v := setup.idmap["blob_id"]; v != nil {
			bazelBlobRef01MatchDt0["blob_id"] = v
		} else {
			bazelBlobRef01MatchDt0["blob_id"] = setup.idmap["blob01"]
		}
		if v := setup.idmap["hash"]; v != nil {
			bazelBlobRef01MatchDt0["hash"] = v
		} else {
			bazelBlobRef01MatchDt0["hash"] = setup.idmap["hash01"]
		}
		bazelBlobRef01DataDt0Loaded, err := bazelBlobRef01Ent.Load(bazelBlobRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bazelBlobRef01DataDt0LoadResult := core.ToMapAny(entityData(bazelBlobRef01DataDt0Loaded))
		if bazelBlobRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(bazelBlobRef01DataDt0LoadResult["id"], bazelBlobRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"blob01", "hash01", "bazel_blob01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, bazel_blobEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BAZEL_BLOB_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, bazel_blobEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a bazel_blob record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		bazelBlobRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.bazel_blob")))
		var bazelBlobRef01Data map[string]any
		if len(bazelBlobRef01DataRaw) > 0 {
			bazelBlobRef01Data = core.ToMapAny(bazelBlobRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bazelBlobRef01Data

		if setup.live {
			livePace()
		}
		// UPDATE
		bazelBlobRef01Ent := client.BazelBlob(nil)
		bazelBlobRef01DataUp0Up := map[string]any{
			"id": bazelBlobRef01Data["id"],
			"blob_id": setup.idmap["blob_id"],
			"hash": setup.idmap["hash"],
		}

		bazelBlobRef01ResdataUp0Result, err := bazelBlobRef01Ent.Update(bazelBlobRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		bazelBlobRef01ResdataUp0 := core.ToMapAny(entityData(bazelBlobRef01ResdataUp0Result))
		if bazelBlobRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(bazelBlobRef01ResdataUp0["id"], bazelBlobRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		bazelBlobRef01MatchDt0 := map[string]any{
			"id": bazelBlobRef01Data["id"],
		}
		if v := setup.idmap["blob_id"]; v != nil {
			bazelBlobRef01MatchDt0["blob_id"] = v
		} else {
			bazelBlobRef01MatchDt0["blob_id"] = setup.idmap["blob01"]
		}
		if v := setup.idmap["hash"]; v != nil {
			bazelBlobRef01MatchDt0["hash"] = v
		} else {
			bazelBlobRef01MatchDt0["hash"] = setup.idmap["hash01"]
		}
		bazelBlobRef01DataDt0Loaded, err := bazelBlobRef01Ent.Load(bazelBlobRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		bazelBlobRef01DataDt0LoadResult := core.ToMapAny(entityData(bazelBlobRef01DataDt0Loaded))
		if bazelBlobRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(bazelBlobRef01DataDt0LoadResult["id"], bazelBlobRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func bazel_blobBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bazel_blob", "BazelBlobTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bazel_blob test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bazel_blob test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"bazel_blob01", "bazel_blob02", "bazel_blob03", "blob01", "hash01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_BAZEL_BLOB_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BAZEL_BLOB_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_BAZEL_BLOB_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add blob_id alias for update test.
	if idmapResolved["blob_id"] == nil {
		idmapResolved["blob_id"] = idmapResolved["blob01"]
	}
	// Add hash alias for update test.
	if idmapResolved["hash"] == nil {
		idmapResolved["hash"] = idmapResolved["hash01"]
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
