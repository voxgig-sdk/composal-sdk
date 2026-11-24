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
const repo_access_tokenEntityLiveStrict = true


func TestRepoAccessTokenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RepoAccessToken(nil)
		if ent == nil {
			t.Fatal("expected non-nil RepoAccessTokenEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RepoAccessToken(nil).List(map[string]any{"organization_id": 1, "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := repo_access_tokenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "repo_access_token." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"repo_access_token.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens\"}")
			t.Log("LIVE STEP {\"id\":\"repo_access_token.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"repo_access_token.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, repo_access_tokenEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_REPO_ACCESS_TOKEN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		repoAccessTokenRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.repo_access_token")))
		var repoAccessTokenRef01Data map[string]any
		if len(repoAccessTokenRef01DataRaw) > 0 {
			repoAccessTokenRef01Data = core.ToMapAny(repoAccessTokenRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = repoAccessTokenRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		repoAccessTokenRef01Ent := client.RepoAccessToken(nil)
		repoAccessTokenRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		repoAccessTokenRef01ListResult, err := repoAccessTokenRef01Ent.List(repoAccessTokenRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, repoAccessTokenRef01ListOk := repoAccessTokenRef01ListResult.([]any)
		if !repoAccessTokenRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", repoAccessTokenRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, repo_access_tokenEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_REPO_ACCESS_TOKEN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		repoAccessTokenRef01Ent := client.RepoAccessToken(nil)
		repoAccessTokenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "repo_access_token"}), "repo_access_token_ref01"))
		repoAccessTokenRef01Data["organization_id"] = setup.idmap["organization01"]
		repoAccessTokenRef01Data["repo_id"] = setup.idmap["repo01"]

		repoAccessTokenRef01DataResult, err := repoAccessTokenRef01Ent.Create(repoAccessTokenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		repoAccessTokenRef01Data = core.ToMapAny(entityData(repoAccessTokenRef01DataResult))
		if repoAccessTokenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if repoAccessTokenRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		repoAccessTokenRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		repoAccessTokenRef01ListResult, err := repoAccessTokenRef01Ent.List(repoAccessTokenRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		repoAccessTokenRef01List, repoAccessTokenRef01ListOk := repoAccessTokenRef01ListResult.([]any)
		if !repoAccessTokenRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", repoAccessTokenRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(repoAccessTokenRef01List), map[string]any{"id": repoAccessTokenRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		repoAccessTokenRef01MatchRm0 := map[string]any{
			"id": repoAccessTokenRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			repoAccessTokenRef01MatchRm0["organization_id"] = v
		} else {
			repoAccessTokenRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			repoAccessTokenRef01MatchRm0["repo_id"] = v
		} else {
			repoAccessTokenRef01MatchRm0["repo_id"] = setup.idmap["repo01"]
		}
		_, err = repoAccessTokenRef01Ent.Remove(repoAccessTokenRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		repoAccessTokenRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		repoAccessTokenRef01ListRt0Result, err := repoAccessTokenRef01Ent.List(repoAccessTokenRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		repoAccessTokenRef01ListRt0, repoAccessTokenRef01ListRt0Ok := repoAccessTokenRef01ListRt0Result.([]any)
		if !repoAccessTokenRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", repoAccessTokenRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(repoAccessTokenRef01ListRt0), map[string]any{"id": repoAccessTokenRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func repo_access_tokenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "repo_access_token", "RepoAccessTokenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read repo_access_token test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse repo_access_token test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"repo_access_token01", "repo_access_token02", "repo_access_token03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_REPO_ACCESS_TOKEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_REPO_ACCESS_TOKEN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_REPO_ACCESS_TOKEN_ENTID"])
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
