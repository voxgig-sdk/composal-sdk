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
const space_peer_attachmentEntityLiveStrict = true


func TestSpacePeerAttachmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpacePeerAttachment(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpacePeerAttachmentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpacePeerAttachment(nil).Load(map[string]any{"space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_peer_attachmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_peer_attachment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_peer_attachment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/peer_attachments\"}")
			t.Log("LIVE STEP {\"id\":\"space_peer_attachment.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/peer_attachments/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"space_peer_attachment.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only space_peer_attachment.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"space_peer_attachment.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/peer_attachments/{id}\"}")
			t.Skip("Live coverage incomplete: space_peer_attachment.create.0 excluded (GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/peer_attachments); space_peer_attachment.update.1 excluded (GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/peer_attachments/{id}); space_peer_attachment.load.2 excluded (GET-only live run: reads a record only space_peer_attachment.create.0 gives); space_peer_attachment.remove.3 excluded (GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/peer_attachments/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_peer_attachmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_PEER_ATTACHMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spacePeerAttachmentRef01Ent := client.SpacePeerAttachment(nil)
		spacePeerAttachmentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_peer_attachment"}), "space_peer_attachment_ref01"))
		spacePeerAttachmentRef01Data["space_id"] = setup.idmap["space01"]

		spacePeerAttachmentRef01DataResult, err := spacePeerAttachmentRef01Ent.Create(spacePeerAttachmentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spacePeerAttachmentRef01Data = core.ToMapAny(entityData(spacePeerAttachmentRef01DataResult))
		if spacePeerAttachmentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if spacePeerAttachmentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		spacePeerAttachmentRef01DataUp0Up := map[string]any{
			"id": spacePeerAttachmentRef01Data["id"],
			"space_id": setup.idmap["space_id"],
		}

		spacePeerAttachmentRef01ResdataUp0Result, err := spacePeerAttachmentRef01Ent.Update(spacePeerAttachmentRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		spacePeerAttachmentRef01ResdataUp0 := core.ToMapAny(entityData(spacePeerAttachmentRef01ResdataUp0Result))
		if spacePeerAttachmentRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(spacePeerAttachmentRef01ResdataUp0["id"], spacePeerAttachmentRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spacePeerAttachmentRef01MatchDt0 := map[string]any{
			"id": spacePeerAttachmentRef01Data["id"],
		}
		spacePeerAttachmentRef01DataDt0Loaded, err := spacePeerAttachmentRef01Ent.Load(spacePeerAttachmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		spacePeerAttachmentRef01DataDt0LoadResult := core.ToMapAny(entityData(spacePeerAttachmentRef01DataDt0Loaded))
		if spacePeerAttachmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(spacePeerAttachmentRef01DataDt0LoadResult["id"], spacePeerAttachmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		spacePeerAttachmentRef01MatchRm0 := map[string]any{
			"id": spacePeerAttachmentRef01Data["id"],
		}
		if v := setup.idmap["space_id"]; v != nil {
			spacePeerAttachmentRef01MatchRm0["space_id"] = v
		} else {
			spacePeerAttachmentRef01MatchRm0["space_id"] = setup.idmap["space01"]
		}
		_, err = spacePeerAttachmentRef01Ent.Remove(spacePeerAttachmentRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func space_peer_attachmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_peer_attachment", "SpacePeerAttachmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_peer_attachment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_peer_attachment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_peer_attachment01", "space_peer_attachment02", "space_peer_attachment03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_PEER_ATTACHMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_PEER_ATTACHMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_PEER_ATTACHMENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add space_id alias for update test.
	if idmapResolved["space_id"] == nil {
		idmapResolved["space_id"] = idmapResolved["space01"]
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
