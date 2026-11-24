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
const change_commentEntityLiveStrict = true


func TestChangeCommentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ChangeComment(nil)
		if ent == nil {
			t.Fatal("expected non-nil ChangeCommentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ChangeComment(nil).List(map[string]any{"change_id": 1, "organization_id": "x", "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := change_commentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "change_comment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"change_comment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve\"}")
		if setup.live {
			for _, _liveKey := range []string{"change01", "organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, change_commentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CHANGE_COMMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		changeCommentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.change_comment")))
		var changeCommentRef01Data map[string]any
		if len(changeCommentRef01DataRaw) > 0 {
			changeCommentRef01Data = core.ToMapAny(changeCommentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = changeCommentRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		changeCommentRef01Ent := client.ChangeComment(nil)
		changeCommentRef01Match := map[string]any{
			"change_id": setup.idmap["change01"],
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		changeCommentRef01ListResult, err := changeCommentRef01Ent.List(changeCommentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, changeCommentRef01ListOk := changeCommentRef01ListResult.([]any)
		if !changeCommentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", changeCommentRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"change01", "organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, change_commentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CHANGE_COMMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		changeCommentRef01Ent := client.ChangeComment(nil)
		changeCommentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "change_comment"}), "change_comment_ref01"))
		changeCommentRef01Data["change_id"] = setup.idmap["change01"]
		changeCommentRef01Data["organization_id"] = setup.idmap["organization01"]
		changeCommentRef01Data["repo_id"] = setup.idmap["repo01"]

		changeCommentRef01DataResult, err := changeCommentRef01Ent.Create(changeCommentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		changeCommentRef01Data = core.ToMapAny(entityData(changeCommentRef01DataResult))
		if changeCommentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if changeCommentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		changeCommentRef01Match := map[string]any{
			"change_id": setup.idmap["change01"],
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		changeCommentRef01ListResult, err := changeCommentRef01Ent.List(changeCommentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		changeCommentRef01List, changeCommentRef01ListOk := changeCommentRef01ListResult.([]any)
		if !changeCommentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", changeCommentRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(changeCommentRef01List), map[string]any{"id": changeCommentRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func change_commentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "change_comment", "ChangeCommentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read change_comment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse change_comment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"change_comment01", "change_comment02", "change_comment03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03", "change01", "change02", "change03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_CHANGE_COMMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_CHANGE_COMMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_CHANGE_COMMENT_ENTID"])
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
