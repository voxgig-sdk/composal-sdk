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
const cloud_workspace_backup_objectEntityLiveStrict = true


func TestCloudWorkspaceBackupObjectEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CloudWorkspaceBackupObject(nil)
		if ent == nil {
			t.Fatal("expected non-nil CloudWorkspaceBackupObjectEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CloudWorkspaceBackupObject(nil).Load(map[string]any{"cloud_workspace_backup_id": 1, "id": "x", "organization_id": "x", "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := cloud_workspace_backup_objectBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cloud_workspace_backup_object." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"cloud_workspace_backup01", "cloud_workspace_backup_object01", "organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, cloud_workspace_backup_objectEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CLOUD_WORKSPACE_BACKUP_OBJECT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, cloud_workspace_backup_objectEntityLiveStrict, setup.data, "cloud_workspace_backup_object", "id", setup.idmap["cloud_workspace_backup_object01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["cloud_workspace_backup_object01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		cloudWorkspaceBackupObjectRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.cloud_workspace_backup_object")))
		var cloudWorkspaceBackupObjectRef01Data map[string]any
		if len(cloudWorkspaceBackupObjectRef01DataRaw) > 0 {
			cloudWorkspaceBackupObjectRef01Data = core.ToMapAny(cloudWorkspaceBackupObjectRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cloudWorkspaceBackupObjectRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		cloudWorkspaceBackupObjectRef01Ent := client.CloudWorkspaceBackupObject(nil)
		cloudWorkspaceBackupObjectRef01MatchDt0 := map[string]any{
			"id": cloudWorkspaceBackupObjectRef01Data["id"],
		}
		if v := setup.idmap["cloud_workspace_backup_id"]; v != nil {
			cloudWorkspaceBackupObjectRef01MatchDt0["cloud_workspace_backup_id"] = v
		} else {
			cloudWorkspaceBackupObjectRef01MatchDt0["cloud_workspace_backup_id"] = setup.idmap["cloud_workspace_backup01"]
		}
		if v := setup.idmap["organization_id"]; v != nil {
			cloudWorkspaceBackupObjectRef01MatchDt0["organization_id"] = v
		} else {
			cloudWorkspaceBackupObjectRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			cloudWorkspaceBackupObjectRef01MatchDt0["repo_id"] = v
		} else {
			cloudWorkspaceBackupObjectRef01MatchDt0["repo_id"] = setup.idmap["repo01"]
		}
		cloudWorkspaceBackupObjectRef01DataDt0Loaded, err := cloudWorkspaceBackupObjectRef01Ent.Load(cloudWorkspaceBackupObjectRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cloudWorkspaceBackupObjectRef01DataDt0LoadResult := core.ToMapAny(entityData(cloudWorkspaceBackupObjectRef01DataDt0Loaded))
		if cloudWorkspaceBackupObjectRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(cloudWorkspaceBackupObjectRef01DataDt0LoadResult["id"], cloudWorkspaceBackupObjectRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func cloud_workspace_backup_objectBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cloud_workspace_backup_object", "CloudWorkspaceBackupObjectTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cloud_workspace_backup_object test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cloud_workspace_backup_object test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"cloud_workspace_backup_object01", "cloud_workspace_backup_object02", "cloud_workspace_backup_object03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03", "cloud_workspace_backup01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_CLOUD_WORKSPACE_BACKUP_OBJECT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_CLOUD_WORKSPACE_BACKUP_OBJECT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_CLOUD_WORKSPACE_BACKUP_OBJECT_ENTID"])
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
