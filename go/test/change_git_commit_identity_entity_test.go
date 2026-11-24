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
const change_git_commit_identityEntityLiveStrict = true


func TestChangeGitCommitIdentityEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ChangeGitCommitIdentity(nil)
		if ent == nil {
			t.Fatal("expected non-nil ChangeGitCommitIdentityEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ChangeGitCommitIdentity(nil).Load(map[string]any{"id": 1, "organization_id": "x", "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := change_git_commit_identityBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "change_git_commit_identity." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"change_git_commit_identity.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_commit_identities\"}")
			t.Log("LIVE STEP {\"id\":\"change_git_commit_identity.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only change_git_commit_identity.create.0 gives\"}")
			t.Skip("Live coverage incomplete: change_git_commit_identity.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_commit_identities); change_git_commit_identity.load.1 excluded (GET-only live run: reads a record only change_git_commit_identity.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, change_git_commit_identityEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CHANGE_GIT_COMMIT_IDENTITY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		changeGitCommitIdentityRef01Ent := client.ChangeGitCommitIdentity(nil)
		changeGitCommitIdentityRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "change_git_commit_identity"}), "change_git_commit_identity_ref01"))
		changeGitCommitIdentityRef01Data["organization_id"] = setup.idmap["organization01"]
		changeGitCommitIdentityRef01Data["repo_id"] = setup.idmap["repo01"]

		changeGitCommitIdentityRef01DataResult, err := changeGitCommitIdentityRef01Ent.Create(changeGitCommitIdentityRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		changeGitCommitIdentityRef01Data = core.ToMapAny(entityData(changeGitCommitIdentityRef01DataResult))
		if changeGitCommitIdentityRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if changeGitCommitIdentityRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		changeGitCommitIdentityRef01MatchDt0 := map[string]any{
			"id": changeGitCommitIdentityRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			changeGitCommitIdentityRef01MatchDt0["organization_id"] = v
		} else {
			changeGitCommitIdentityRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			changeGitCommitIdentityRef01MatchDt0["repo_id"] = v
		} else {
			changeGitCommitIdentityRef01MatchDt0["repo_id"] = setup.idmap["repo01"]
		}
		changeGitCommitIdentityRef01DataDt0Loaded, err := changeGitCommitIdentityRef01Ent.Load(changeGitCommitIdentityRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		changeGitCommitIdentityRef01DataDt0LoadResult := core.ToMapAny(entityData(changeGitCommitIdentityRef01DataDt0Loaded))
		if changeGitCommitIdentityRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(changeGitCommitIdentityRef01DataDt0LoadResult["id"], changeGitCommitIdentityRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func change_git_commit_identityBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "change_git_commit_identity", "ChangeGitCommitIdentityTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read change_git_commit_identity test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse change_git_commit_identity test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"change_git_commit_identity01", "change_git_commit_identity02", "change_git_commit_identity03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_CHANGE_GIT_COMMIT_IDENTITY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_CHANGE_GIT_COMMIT_IDENTITY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_CHANGE_GIT_COMMIT_IDENTITY_ENTID"])
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
