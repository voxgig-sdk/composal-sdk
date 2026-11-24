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
const cdn_space_objectEntityLiveStrict = true


func TestCdnSpaceObjectEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CdnSpaceObject(nil)
		if ent == nil {
			t.Fatal("expected non-nil CdnSpaceObjectEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CdnSpaceObject(nil).List(map[string]any{"cdn_space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := cdn_space_objectBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cdn_space_object." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"cdn_space_object.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/cdn_spaces/{cdn_space_id}/objects\"}")
		if setup.live {
			for _, _liveKey := range []string{"cdn_space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, cdn_space_objectEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["cdn_space_object01"]
			}
			livePace()
			liveExisting(t, cdn_space_objectEntityLiveStrict, setup.data, "cdn_space_object", "id", _liveId,
				func() (any, error) {
					return client.CdnSpaceObject(nil).List(map[string]any{"cdn_space_id": setup.idmap["cdn_space01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		cdnSpaceObjectRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.cdn_space_object")))
		var cdnSpaceObjectRef01Data map[string]any
		if len(cdnSpaceObjectRef01DataRaw) > 0 {
			cdnSpaceObjectRef01Data = core.ToMapAny(cdnSpaceObjectRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cdnSpaceObjectRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		cdnSpaceObjectRef01Ent := client.CdnSpaceObject(nil)
		cdnSpaceObjectRef01Match := map[string]any{
			"cdn_space_id": setup.idmap["cdn_space01"],
		}

		cdnSpaceObjectRef01ListResult, err := cdnSpaceObjectRef01Ent.List(cdnSpaceObjectRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, cdnSpaceObjectRef01ListOk := cdnSpaceObjectRef01ListResult.([]any)
		if !cdnSpaceObjectRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cdnSpaceObjectRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cdnSpaceObjectRef01MatchDt0 := map[string]any{
			"id": cdnSpaceObjectRef01Data["id"],
		}
		if v := setup.idmap["cdn_space_id"]; v != nil {
			cdnSpaceObjectRef01MatchDt0["cdn_space_id"] = v
		} else {
			cdnSpaceObjectRef01MatchDt0["cdn_space_id"] = setup.idmap["cdn_space01"]
		}
		cdnSpaceObjectRef01DataDt0Loaded, err := cdnSpaceObjectRef01Ent.Load(cdnSpaceObjectRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cdnSpaceObjectRef01DataDt0LoadResult := core.ToMapAny(entityData(cdnSpaceObjectRef01DataDt0Loaded))
		if cdnSpaceObjectRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(cdnSpaceObjectRef01DataDt0LoadResult["id"], cdnSpaceObjectRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"cdn_space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, cdn_space_objectEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["cdn_space_object01"]
			}
			livePace()
			liveExisting(t, cdn_space_objectEntityLiveStrict, setup.data, "cdn_space_object", "id", _liveId,
				func() (any, error) {
					return client.CdnSpaceObject(nil).List(map[string]any{"cdn_space_id": setup.idmap["cdn_space01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		cdnSpaceObjectRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.cdn_space_object")))
		var cdnSpaceObjectRef01Data map[string]any
		if len(cdnSpaceObjectRef01DataRaw) > 0 {
			cdnSpaceObjectRef01Data = core.ToMapAny(cdnSpaceObjectRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cdnSpaceObjectRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		cdnSpaceObjectRef01Ent := client.CdnSpaceObject(nil)
		cdnSpaceObjectRef01Match := map[string]any{
			"cdn_space_id": setup.idmap["cdn_space01"],
		}

		cdnSpaceObjectRef01ListResult, err := cdnSpaceObjectRef01Ent.List(cdnSpaceObjectRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, cdnSpaceObjectRef01ListOk := cdnSpaceObjectRef01ListResult.([]any)
		if !cdnSpaceObjectRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cdnSpaceObjectRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cdnSpaceObjectRef01MatchDt0 := map[string]any{
			"id": cdnSpaceObjectRef01Data["id"],
		}
		if v := setup.idmap["cdn_space_id"]; v != nil {
			cdnSpaceObjectRef01MatchDt0["cdn_space_id"] = v
		} else {
			cdnSpaceObjectRef01MatchDt0["cdn_space_id"] = setup.idmap["cdn_space01"]
		}
		cdnSpaceObjectRef01DataDt0Loaded, err := cdnSpaceObjectRef01Ent.Load(cdnSpaceObjectRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cdnSpaceObjectRef01DataDt0LoadResult := core.ToMapAny(entityData(cdnSpaceObjectRef01DataDt0Loaded))
		if cdnSpaceObjectRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(cdnSpaceObjectRef01DataDt0LoadResult["id"], cdnSpaceObjectRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func cdn_space_objectBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cdn_space_object", "CdnSpaceObjectTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cdn_space_object test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cdn_space_object test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"cdn_space_object01", "cdn_space_object02", "cdn_space_object03", "cdn_space01", "cdn_space02", "cdn_space03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID"])
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
