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
const page_repo_vc_commitEntityLiveStrict = true


func TestPageRepoVcCommitEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PageRepoVcCommit(nil)
		if ent == nil {
			t.Fatal("expected non-nil PageRepoVcCommitEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PageRepoVcCommit(nil).Load(map[string]any{"id": 1, "organization_id": "x", "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := page_repo_vc_commitBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "page_repo_vc_commit." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"page_repo_vc_commit01", "organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, page_repo_vc_commitEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PAGE_REPO_VC_COMMIT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, page_repo_vc_commitEntityLiveStrict, setup.data, "page_repo_vc_commit", "id", setup.idmap["page_repo_vc_commit01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["page_repo_vc_commit01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		pageRepoVcCommitRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.page_repo_vc_commit")))
		var pageRepoVcCommitRef01Data map[string]any
		if len(pageRepoVcCommitRef01DataRaw) > 0 {
			pageRepoVcCommitRef01Data = core.ToMapAny(pageRepoVcCommitRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = pageRepoVcCommitRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		pageRepoVcCommitRef01Ent := client.PageRepoVcCommit(nil)
		pageRepoVcCommitRef01MatchDt0 := map[string]any{
			"id": pageRepoVcCommitRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			pageRepoVcCommitRef01MatchDt0["organization_id"] = v
		} else {
			pageRepoVcCommitRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			pageRepoVcCommitRef01MatchDt0["repo_id"] = v
		} else {
			pageRepoVcCommitRef01MatchDt0["repo_id"] = setup.idmap["repo01"]
		}
		pageRepoVcCommitRef01DataDt0Loaded, err := pageRepoVcCommitRef01Ent.Load(pageRepoVcCommitRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		pageRepoVcCommitRef01DataDt0LoadResult := core.ToMapAny(entityData(pageRepoVcCommitRef01DataDt0Loaded))
		if pageRepoVcCommitRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(pageRepoVcCommitRef01DataDt0LoadResult["id"], pageRepoVcCommitRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func page_repo_vc_commitBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "page_repo_vc_commit", "PageRepoVcCommitTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read page_repo_vc_commit test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse page_repo_vc_commit test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"page_repo_vc_commit01", "page_repo_vc_commit02", "page_repo_vc_commit03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PAGE_REPO_VC_COMMIT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PAGE_REPO_VC_COMMIT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PAGE_REPO_VC_COMMIT_ENTID"])
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
