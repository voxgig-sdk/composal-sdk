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
const vc_branchEntityLiveStrict = true


func TestVcBranchEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.VcBranch(nil)
		if ent == nil {
			t.Fatal("expected non-nil VcBranchEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.VcBranch(nil).List(map[string]any{"organization_id": 1, "repo_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := vc_branchBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "vc_branch." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"vc_branch.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches\"}")
			t.Log("LIVE STEP {\"id\":\"vc_branch.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches/{branch_name}\"}")
			t.Log("LIVE STEP {\"id\":\"vc_branch.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, vc_branchEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VC_BRANCH_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		vcBranchRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.vc_branch")))
		var vcBranchRef01Data map[string]any
		if len(vcBranchRef01DataRaw) > 0 {
			vcBranchRef01Data = core.ToMapAny(vcBranchRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = vcBranchRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		vcBranchRef01Ent := client.VcBranch(nil)
		vcBranchRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		vcBranchRef01ListResult, err := vcBranchRef01Ent.List(vcBranchRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, vcBranchRef01ListOk := vcBranchRef01ListResult.([]any)
		if !vcBranchRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", vcBranchRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, vc_branchEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_VC_BRANCH_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		vcBranchRef01Ent := client.VcBranch(nil)
		vcBranchRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "vc_branch"}), "vc_branch_ref01"))
		vcBranchRef01Data["organization_id"] = setup.idmap["organization01"]
		vcBranchRef01Data["repo_id"] = setup.idmap["repo01"]

		vcBranchRef01DataResult, err := vcBranchRef01Ent.Create(vcBranchRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		vcBranchRef01Data = core.ToMapAny(entityData(vcBranchRef01DataResult))
		if vcBranchRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if vcBranchRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		vcBranchRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		vcBranchRef01ListResult, err := vcBranchRef01Ent.List(vcBranchRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		vcBranchRef01List, vcBranchRef01ListOk := vcBranchRef01ListResult.([]any)
		if !vcBranchRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", vcBranchRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(vcBranchRef01List), map[string]any{"id": vcBranchRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		vcBranchRef01MatchRm0 := map[string]any{
			"id": vcBranchRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			vcBranchRef01MatchRm0["organization_id"] = v
		} else {
			vcBranchRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["repo_id"]; v != nil {
			vcBranchRef01MatchRm0["repo_id"] = v
		} else {
			vcBranchRef01MatchRm0["repo_id"] = setup.idmap["repo01"]
		}
		_, err = vcBranchRef01Ent.Remove(vcBranchRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		vcBranchRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"repo_id": setup.idmap["repo01"],
		}

		vcBranchRef01ListRt0Result, err := vcBranchRef01Ent.List(vcBranchRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		vcBranchRef01ListRt0, vcBranchRef01ListRt0Ok := vcBranchRef01ListRt0Result.([]any)
		if !vcBranchRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", vcBranchRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(vcBranchRef01ListRt0), map[string]any{"id": vcBranchRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func vc_branchBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "vc_branch", "VcBranchTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read vc_branch test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse vc_branch test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"vc_branch01", "vc_branch02", "vc_branch03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_VC_BRANCH_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_VC_BRANCH_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_VC_BRANCH_ENTID"])
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
