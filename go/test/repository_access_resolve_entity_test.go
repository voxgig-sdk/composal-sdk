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
const repository_access_resolveEntityLiveStrict = true


func TestRepositoryAccessResolveEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.RepositoryAccessResolve(nil)
		if ent == nil {
			t.Fatal("expected non-nil RepositoryAccessResolveEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.RepositoryAccessResolve(nil).Load(map[string]any{"id": 1, "resolve_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := repository_access_resolveBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "repository_access_resolve." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"repository_access_resolve01", "resolve01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, repository_access_resolveEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_REPOSITORY_ACCESS_RESOLVE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, repository_access_resolveEntityLiveStrict, setup.data, "repository_access_resolve", "id", setup.idmap["repository_access_resolve01"],
				func() (any, error) {
					return []any{map[string]any{"id": setup.idmap["repository_access_resolve01"]}}, nil
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		repositoryAccessResolveRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.repository_access_resolve")))
		var repositoryAccessResolveRef01Data map[string]any
		if len(repositoryAccessResolveRef01DataRaw) > 0 {
			repositoryAccessResolveRef01Data = core.ToMapAny(repositoryAccessResolveRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = repositoryAccessResolveRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		repositoryAccessResolveRef01Ent := client.RepositoryAccessResolve(nil)
		repositoryAccessResolveRef01MatchDt0 := map[string]any{
			"id": repositoryAccessResolveRef01Data["id"],
		}
		if v := setup.idmap["resolve_id"]; v != nil {
			repositoryAccessResolveRef01MatchDt0["resolve_id"] = v
		} else {
			repositoryAccessResolveRef01MatchDt0["resolve_id"] = setup.idmap["resolve01"]
		}
		repositoryAccessResolveRef01DataDt0Loaded, err := repositoryAccessResolveRef01Ent.Load(repositoryAccessResolveRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		repositoryAccessResolveRef01DataDt0LoadResult := core.ToMapAny(entityData(repositoryAccessResolveRef01DataDt0Loaded))
		if repositoryAccessResolveRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(repositoryAccessResolveRef01DataDt0LoadResult["id"], repositoryAccessResolveRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func repository_access_resolveBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "repository_access_resolve", "RepositoryAccessResolveTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read repository_access_resolve test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse repository_access_resolve test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"repository_access_resolve01", "repository_access_resolve02", "repository_access_resolve03", "resolve01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_REPOSITORY_ACCESS_RESOLVE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_REPOSITORY_ACCESS_RESOLVE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_REPOSITORY_ACCESS_RESOLVE_ENTID"])
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
