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
const github_integrationEntityLiveStrict = true


func TestGithubIntegrationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GithubIntegration(nil)
		if ent == nil {
			t.Fatal("expected non-nil GithubIntegrationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.GithubIntegration(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := github_integrationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "github_integration." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, github_integrationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_GITHUB_INTEGRATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["github_integration01"]
			}
			livePace()
			liveExisting(t, github_integrationEntityLiveStrict, setup.data, "github_integration", "id", _liveId,
				func() (any, error) {
					return client.GithubIntegration(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		githubIntegrationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.github_integration")))
		var githubIntegrationRef01Data map[string]any
		if len(githubIntegrationRef01DataRaw) > 0 {
			githubIntegrationRef01Data = core.ToMapAny(githubIntegrationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = githubIntegrationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		githubIntegrationRef01Ent := client.GithubIntegration(nil)
		githubIntegrationRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		githubIntegrationRef01ListResult, err := githubIntegrationRef01Ent.List(githubIntegrationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, githubIntegrationRef01ListOk := githubIntegrationRef01ListResult.([]any)
		if !githubIntegrationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", githubIntegrationRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		githubIntegrationRef01MatchDt0 := map[string]any{
			"id": githubIntegrationRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			githubIntegrationRef01MatchDt0["organization_id"] = v
		} else {
			githubIntegrationRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		githubIntegrationRef01DataDt0Loaded, err := githubIntegrationRef01Ent.Load(githubIntegrationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		githubIntegrationRef01DataDt0LoadResult := core.ToMapAny(entityData(githubIntegrationRef01DataDt0Loaded))
		if githubIntegrationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(githubIntegrationRef01DataDt0LoadResult["id"], githubIntegrationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func github_integrationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "github_integration", "GithubIntegrationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read github_integration test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse github_integration test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"github_integration01", "github_integration02", "github_integration03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_GITHUB_INTEGRATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_GITHUB_INTEGRATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_GITHUB_INTEGRATION_ENTID"])
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
