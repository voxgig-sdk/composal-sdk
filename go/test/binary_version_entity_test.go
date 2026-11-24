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
const binary_versionEntityLiveStrict = true


func TestBinaryVersionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BinaryVersion(nil)
		if ent == nil {
			t.Fatal("expected non-nil BinaryVersionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BinaryVersion(nil).List(map[string]any{"binary_id": 1, "organization_id": "x", "project_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := binary_versionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "binary_version." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"binary_version.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel\"}")
			t.Log("LIVE STEP {\"id\":\"binary_version.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"binary_version.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"binary01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, binary_versionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BINARY_VERSION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["binary_version01"]
			}
			livePace()
			liveExisting(t, binary_versionEntityLiveStrict, setup.data, "binary_version", "id", _liveId,
				func() (any, error) {
					return client.BinaryVersion(nil).List(map[string]any{"binary_id": setup.idmap["binary01"], "organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		binaryVersionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.binary_version")))
		var binaryVersionRef01Data map[string]any
		if len(binaryVersionRef01DataRaw) > 0 {
			binaryVersionRef01Data = core.ToMapAny(binaryVersionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = binaryVersionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		binaryVersionRef01Ent := client.BinaryVersion(nil)
		binaryVersionRef01Match := map[string]any{
			"binary_id": setup.idmap["binary01"],
			"organization_id": setup.idmap["organization01"],
		}

		binaryVersionRef01ListResult, err := binaryVersionRef01Ent.List(binaryVersionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, binaryVersionRef01ListOk := binaryVersionRef01ListResult.([]any)
		if !binaryVersionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", binaryVersionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		binaryVersionRef01MatchDt0 := map[string]any{
			"id": binaryVersionRef01Data["id"],
		}
		if v := setup.idmap["binary_id"]; v != nil {
			binaryVersionRef01MatchDt0["binary_id"] = v
		} else {
			binaryVersionRef01MatchDt0["binary_id"] = setup.idmap["binary01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			binaryVersionRef01MatchDt0["organization_id"] = v
		} else {
			binaryVersionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		binaryVersionRef01DataDt0Loaded, err := binaryVersionRef01Ent.Load(binaryVersionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		binaryVersionRef01DataDt0LoadResult := core.ToMapAny(entityData(binaryVersionRef01DataDt0Loaded))
		if binaryVersionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(binaryVersionRef01DataDt0LoadResult["id"], binaryVersionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"binary01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, binary_versionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_BINARY_VERSION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		binaryVersionRef01Ent := client.BinaryVersion(nil)
		binaryVersionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "binary_version"}), "binary_version_ref01"))
		binaryVersionRef01Data["binary_id"] = setup.idmap["binary01"]
		binaryVersionRef01Data["organization_id"] = setup.idmap["organization01"]

		binaryVersionRef01DataResult, err := binaryVersionRef01Ent.Create(binaryVersionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		binaryVersionRef01Data = core.ToMapAny(entityData(binaryVersionRef01DataResult))
		if binaryVersionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if binaryVersionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		binaryVersionRef01Match := map[string]any{
			"binary_id": setup.idmap["binary01"],
			"organization_id": setup.idmap["organization01"],
		}

		binaryVersionRef01ListResult, err := binaryVersionRef01Ent.List(binaryVersionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		binaryVersionRef01List, binaryVersionRef01ListOk := binaryVersionRef01ListResult.([]any)
		if !binaryVersionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", binaryVersionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(binaryVersionRef01List), map[string]any{"id": binaryVersionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		binaryVersionRef01MatchDt0 := map[string]any{
			"id": binaryVersionRef01Data["id"],
		}
		if v := setup.idmap["binary_id"]; v != nil {
			binaryVersionRef01MatchDt0["binary_id"] = v
		} else {
			binaryVersionRef01MatchDt0["binary_id"] = setup.idmap["binary01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			binaryVersionRef01MatchDt0["organization_id"] = v
		} else {
			binaryVersionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		binaryVersionRef01DataDt0Loaded, err := binaryVersionRef01Ent.Load(binaryVersionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		binaryVersionRef01DataDt0LoadResult := core.ToMapAny(entityData(binaryVersionRef01DataDt0Loaded))
		if binaryVersionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(binaryVersionRef01DataDt0LoadResult["id"], binaryVersionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		binaryVersionRef01MatchRm0 := map[string]any{
			"id": binaryVersionRef01Data["id"],
		}
		if v := setup.idmap["binary_id"]; v != nil {
			binaryVersionRef01MatchRm0["binary_id"] = v
		} else {
			binaryVersionRef01MatchRm0["binary_id"] = setup.idmap["binary01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			binaryVersionRef01MatchRm0["organization_id"] = v
		} else {
			binaryVersionRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = binaryVersionRef01Ent.Remove(binaryVersionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		binaryVersionRef01MatchRt0 := map[string]any{
			"binary_id": setup.idmap["binary01"],
			"organization_id": setup.idmap["organization01"],
		}

		binaryVersionRef01ListRt0Result, err := binaryVersionRef01Ent.List(binaryVersionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		binaryVersionRef01ListRt0, binaryVersionRef01ListRt0Ok := binaryVersionRef01ListRt0Result.([]any)
		if !binaryVersionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", binaryVersionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(binaryVersionRef01ListRt0), map[string]any{"id": binaryVersionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func binary_versionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "binary_version", "BinaryVersionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read binary_version test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse binary_version test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"binary_version01", "binary_version02", "binary_version03", "organization01", "organization02", "organization03", "binary01", "binary02", "binary03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_BINARY_VERSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BINARY_VERSION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_BINARY_VERSION_ENTID"])
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
