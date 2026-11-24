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
const artefact_comment_threadEntityLiveStrict = true


func TestArtefactCommentThreadEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ArtefactCommentThread(nil)
		if ent == nil {
			t.Fatal("expected non-nil ArtefactCommentThreadEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ArtefactCommentThread(nil).List(map[string]any{"artefact_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := artefact_comment_threadBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "artefact_comment_thread." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"artefact_comment_thread.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads\"}")
			t.Log("LIVE STEP {\"id\":\"artefact_comment_thread.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}\"}")
		if setup.live {
			for _, _liveKey := range []string{"artefact01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, artefact_comment_threadEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		artefactCommentThreadRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.artefact_comment_thread")))
		var artefactCommentThreadRef01Data map[string]any
		if len(artefactCommentThreadRef01DataRaw) > 0 {
			artefactCommentThreadRef01Data = core.ToMapAny(artefactCommentThreadRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = artefactCommentThreadRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		artefactCommentThreadRef01Ent := client.ArtefactCommentThread(nil)
		artefactCommentThreadRef01Match := map[string]any{
			"artefact_id": setup.idmap["artefact01"],
			"organization_id": setup.idmap["organization01"],
		}

		artefactCommentThreadRef01ListResult, err := artefactCommentThreadRef01Ent.List(artefactCommentThreadRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, artefactCommentThreadRef01ListOk := artefactCommentThreadRef01ListResult.([]any)
		if !artefactCommentThreadRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", artefactCommentThreadRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"artefact01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, artefact_comment_threadEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		artefactCommentThreadRef01Ent := client.ArtefactCommentThread(nil)
		artefactCommentThreadRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "artefact_comment_thread"}), "artefact_comment_thread_ref01"))
		artefactCommentThreadRef01Data["artefact_id"] = setup.idmap["artefact01"]
		artefactCommentThreadRef01Data["organization_id"] = setup.idmap["organization01"]

		artefactCommentThreadRef01DataResult, err := artefactCommentThreadRef01Ent.Create(artefactCommentThreadRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		artefactCommentThreadRef01Data = core.ToMapAny(entityData(artefactCommentThreadRef01DataResult))
		if artefactCommentThreadRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if artefactCommentThreadRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		artefactCommentThreadRef01Match := map[string]any{
			"artefact_id": setup.idmap["artefact01"],
			"organization_id": setup.idmap["organization01"],
		}

		artefactCommentThreadRef01ListResult, err := artefactCommentThreadRef01Ent.List(artefactCommentThreadRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		artefactCommentThreadRef01List, artefactCommentThreadRef01ListOk := artefactCommentThreadRef01ListResult.([]any)
		if !artefactCommentThreadRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", artefactCommentThreadRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(artefactCommentThreadRef01List), map[string]any{"id": artefactCommentThreadRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		artefactCommentThreadRef01DataUp0Up := map[string]any{
			"id": artefactCommentThreadRef01Data["id"],
			"artefact_id": setup.idmap["artefact_id"],
			"organization_id": setup.idmap["organization_id"],
		}

		artefactCommentThreadRef01MarkdefUp0Name := "anchor"
		artefactCommentThreadRef01MarkdefUp0Value := fmt.Sprintf("Mark01-artefact_comment_thread_ref01_%d", setup.now)
		artefactCommentThreadRef01DataUp0Up[artefactCommentThreadRef01MarkdefUp0Name] = artefactCommentThreadRef01MarkdefUp0Value

		artefactCommentThreadRef01ResdataUp0Result, err := artefactCommentThreadRef01Ent.Update(artefactCommentThreadRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		artefactCommentThreadRef01ResdataUp0 := core.ToMapAny(entityData(artefactCommentThreadRef01ResdataUp0Result))
		if artefactCommentThreadRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(artefactCommentThreadRef01ResdataUp0["id"], artefactCommentThreadRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if artefactCommentThreadRef01ResdataUp0[artefactCommentThreadRef01MarkdefUp0Name] != artefactCommentThreadRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", artefactCommentThreadRef01MarkdefUp0Name, artefactCommentThreadRef01ResdataUp0[artefactCommentThreadRef01MarkdefUp0Name])
		}

	})
}

func artefact_comment_threadBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "artefact_comment_thread", "ArtefactCommentThreadTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read artefact_comment_thread test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse artefact_comment_thread test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"artefact_comment_thread01", "artefact_comment_thread02", "artefact_comment_thread03", "organization01", "organization02", "organization03", "artefact01", "artefact02", "artefact03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add artefact_id alias for update test.
	if idmapResolved["artefact_id"] == nil {
		idmapResolved["artefact_id"] = idmapResolved["artefact01"]
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
