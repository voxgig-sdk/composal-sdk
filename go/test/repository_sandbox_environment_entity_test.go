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
const repository_sandbox_environmentEntityLiveStrict = true


func TestRepositorySandboxEnvironmentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RepositorySandboxEnvironment(nil)
		if ent == nil {
			t.Fatal("expected non-nil RepositorySandboxEnvironmentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RepositorySandboxEnvironment(nil).Load(map[string]any{"id": 1, "repository_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := repository_sandbox_environmentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "repository_sandbox_environment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"repository_sandbox_environment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/repositories/{repository}/sandbox_environments/validate\"}")
			t.Log("LIVE STEP {\"id\":\"repository_sandbox_environment.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only repository_sandbox_environment.create.0 gives\"}")
			t.Skip("Live coverage incomplete: repository_sandbox_environment.create.0 excluded (GET-only live run: needs POST /api/v1/repositories/{repository}/sandbox_environments/validate); repository_sandbox_environment.load.1 excluded (GET-only live run: reads a record only repository_sandbox_environment.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"repository_sandbox_environment01", "repository01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, repository_sandbox_environmentEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_REPOSITORY_SANDBOX_ENVIRONMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, repository_sandbox_environmentEntityLiveStrict, setup.data, "repository_sandbox_environment", "id", setup.idmap["repository_sandbox_environment01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["repository_sandbox_environment01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		repositorySandboxEnvironmentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.repository_sandbox_environment")))
		var repositorySandboxEnvironmentRef01Data map[string]any
		if len(repositorySandboxEnvironmentRef01DataRaw) > 0 {
			repositorySandboxEnvironmentRef01Data = core.ToMapAny(repositorySandboxEnvironmentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = repositorySandboxEnvironmentRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		repositorySandboxEnvironmentRef01Ent := client.RepositorySandboxEnvironment(nil)
		repositorySandboxEnvironmentRef01MatchDt0 := map[string]any{
			"id": repositorySandboxEnvironmentRef01Data["id"],
		}
		if v := setup.idmap["repository_id"]; v != nil {
			repositorySandboxEnvironmentRef01MatchDt0["repository_id"] = v
		} else {
			repositorySandboxEnvironmentRef01MatchDt0["repository_id"] = setup.idmap["repository01"]
		}
		repositorySandboxEnvironmentRef01DataDt0Loaded, err := repositorySandboxEnvironmentRef01Ent.Load(repositorySandboxEnvironmentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		repositorySandboxEnvironmentRef01DataDt0LoadResult := core.ToMapAny(entityData(repositorySandboxEnvironmentRef01DataDt0Loaded))
		if repositorySandboxEnvironmentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(repositorySandboxEnvironmentRef01DataDt0LoadResult["id"], repositorySandboxEnvironmentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func repository_sandbox_environmentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "repository_sandbox_environment", "RepositorySandboxEnvironmentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read repository_sandbox_environment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse repository_sandbox_environment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"repository_sandbox_environment01", "repository_sandbox_environment02", "repository_sandbox_environment03", "repository01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_REPOSITORY_SANDBOX_ENVIRONMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_REPOSITORY_SANDBOX_ENVIRONMENT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_REPOSITORY_SANDBOX_ENVIRONMENT_ENTID"])
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
