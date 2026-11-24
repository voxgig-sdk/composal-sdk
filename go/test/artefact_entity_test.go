package sdktest

import (
	"encoding/json"
	"fmt"
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
const artefactEntityLiveStrict = true


func TestArtefactEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Artefact(nil)
		if ent == nil {
			t.Fatal("expected non-nil ArtefactEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Artefact(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := artefactBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "artefact." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"artefact.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts\"}")
			t.Log("LIVE STEP {\"id\":\"artefact.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}\"}")
			t.Log("LIVE STEP {\"id\":\"artefact.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}\"}")
			t.Log("LIVE STEP {\"id\":\"artefact.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, artefactEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ARTEFACT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["artefact01"]
			}
			livePace()
			liveExisting(t, artefactEntityLiveStrict, setup.data, "artefact", "id", _liveId,
				func() (any, error) {
					return client.Artefact(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		artefactRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.artefact")))
		var artefactRef01Data map[string]any
		if len(artefactRef01DataRaw) > 0 {
			artefactRef01Data = core.ToMapAny(artefactRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = artefactRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		artefactRef01Ent := client.Artefact(nil)
		artefactRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		artefactRef01ListResult, err := artefactRef01Ent.List(artefactRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, artefactRef01ListOk := artefactRef01ListResult.([]any)
		if !artefactRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", artefactRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		artefactRef01MatchDt0 := map[string]any{
			"id": artefactRef01Data["id"],
		}
		switch v := artefactRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			artefactRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				artefactRef01MatchDt0["organization_id"] = v
			} else {
				artefactRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		artefactRef01DataDt0Loaded, err := artefactRef01Ent.Load(artefactRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		artefactRef01DataDt0LoadResult := core.ToMapAny(entityData(artefactRef01DataDt0Loaded))
		if artefactRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(artefactRef01DataDt0LoadResult["id"], artefactRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, artefactEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ARTEFACT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		artefactRef01Ent := client.Artefact(nil)
		artefactRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "artefact"}), "artefact_ref01"))
		artefactRef01Data["organization_id"] = setup.idmap["organization01"]

		artefactRef01DataResult, err := artefactRef01Ent.Create(artefactRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		artefactRef01Data = core.ToMapAny(entityData(artefactRef01DataResult))
		if artefactRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if artefactRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		artefactRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		artefactRef01ListResult, err := artefactRef01Ent.List(artefactRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		artefactRef01List, artefactRef01ListOk := artefactRef01ListResult.([]any)
		if !artefactRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", artefactRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(artefactRef01List), map[string]any{"id": artefactRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		artefactRef01DataUp0Up := map[string]any{
			"id": artefactRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
		}

		artefactRef01MarkdefUp0Name := "automation_invocation_id"
		artefactRef01MarkdefUp0Value := fmt.Sprintf("Mark01-artefact_ref01_%d", setup.now)
		artefactRef01DataUp0Up[artefactRef01MarkdefUp0Name] = artefactRef01MarkdefUp0Value

		artefactRef01ResdataUp0Result, err := artefactRef01Ent.Update(artefactRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		artefactRef01ResdataUp0 := core.ToMapAny(entityData(artefactRef01ResdataUp0Result))
		if artefactRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(artefactRef01ResdataUp0["id"], artefactRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if artefactRef01ResdataUp0[artefactRef01MarkdefUp0Name] != artefactRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", artefactRef01MarkdefUp0Name, artefactRef01ResdataUp0[artefactRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		artefactRef01MatchDt0 := map[string]any{
			"id": artefactRef01Data["id"],
		}
		switch v := artefactRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			artefactRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				artefactRef01MatchDt0["organization_id"] = v
			} else {
				artefactRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		artefactRef01DataDt0Loaded, err := artefactRef01Ent.Load(artefactRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		artefactRef01DataDt0LoadResult := core.ToMapAny(entityData(artefactRef01DataDt0Loaded))
		if artefactRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(artefactRef01DataDt0LoadResult["id"], artefactRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		artefactRef01MatchRm0 := map[string]any{
			"id": artefactRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			artefactRef01MatchRm0["organization_id"] = v
		} else {
			artefactRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		_, err = artefactRef01Ent.Remove(artefactRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		artefactRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		artefactRef01ListRt0Result, err := artefactRef01Ent.List(artefactRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		artefactRef01ListRt0, artefactRef01ListRt0Ok := artefactRef01ListRt0Result.([]any)
		if !artefactRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", artefactRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(artefactRef01ListRt0), map[string]any{"id": artefactRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func artefactBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "artefact", "ArtefactTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read artefact test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse artefact test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"artefact01", "artefact02", "artefact03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ARTEFACT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ARTEFACT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ARTEFACT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add organization_id alias for update test.
	if idmapResolved["organization_id"] == nil {
		idmapResolved["organization_id"] = idmapResolved["organization01"]
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
