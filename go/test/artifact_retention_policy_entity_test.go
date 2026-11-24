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
const artifact_retention_policyEntityLiveStrict = true


func TestArtifactRetentionPolicyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ArtifactRetentionPolicy(nil)
		if ent == nil {
			t.Fatal("expected non-nil ArtifactRetentionPolicyEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ArtifactRetentionPolicy(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := artifact_retention_policyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "artifact_retention_policy." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"artifact_retention_policy.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/artifacts/retention_policies\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_retention_policy.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/artifacts/retention_policies/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_retention_policy.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only artifact_retention_policy.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_retention_policy.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/artifacts/retention_policies/{id}\"}")
			t.Skip("Live coverage incomplete: artifact_retention_policy.create.0 excluded (GET-only live run: needs POST /api/v1/artifacts/retention_policies); artifact_retention_policy.update.1 excluded (GET-only live run: needs PUT /api/v1/artifacts/retention_policies/{id}); artifact_retention_policy.load.2 excluded (GET-only live run: reads a record only artifact_retention_policy.create.0 gives); artifact_retention_policy.remove.3 excluded (GET-only live run: needs DELETE /api/v1/artifacts/retention_policies/{id})")
			return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		artifactRetentionPolicyRef01Ent := client.ArtifactRetentionPolicy(nil)
		artifactRetentionPolicyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "artifact_retention_policy"}), "artifact_retention_policy_ref01"))

		artifactRetentionPolicyRef01DataResult, err := artifactRetentionPolicyRef01Ent.Create(artifactRetentionPolicyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		artifactRetentionPolicyRef01Data = core.ToMapAny(entityData(artifactRetentionPolicyRef01DataResult))
		if artifactRetentionPolicyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if artifactRetentionPolicyRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		artifactRetentionPolicyRef01DataUp0Up := map[string]any{
			"id": artifactRetentionPolicyRef01Data["id"],
		}

		artifactRetentionPolicyRef01ResdataUp0Result, err := artifactRetentionPolicyRef01Ent.Update(artifactRetentionPolicyRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		artifactRetentionPolicyRef01ResdataUp0 := core.ToMapAny(entityData(artifactRetentionPolicyRef01ResdataUp0Result))
		if artifactRetentionPolicyRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(artifactRetentionPolicyRef01ResdataUp0["id"], artifactRetentionPolicyRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		artifactRetentionPolicyRef01MatchDt0 := map[string]any{
			"id": artifactRetentionPolicyRef01Data["id"],
		}
		artifactRetentionPolicyRef01DataDt0Loaded, err := artifactRetentionPolicyRef01Ent.Load(artifactRetentionPolicyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		artifactRetentionPolicyRef01DataDt0LoadResult := core.ToMapAny(entityData(artifactRetentionPolicyRef01DataDt0Loaded))
		if artifactRetentionPolicyRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(artifactRetentionPolicyRef01DataDt0LoadResult["id"], artifactRetentionPolicyRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		artifactRetentionPolicyRef01MatchRm0 := map[string]any{
			"id": artifactRetentionPolicyRef01Data["id"],
		}
		_, err = artifactRetentionPolicyRef01Ent.Remove(artifactRetentionPolicyRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func artifact_retention_policyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "artifact_retention_policy", "ArtifactRetentionPolicyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read artifact_retention_policy test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse artifact_retention_policy test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"artifact_retention_policy01", "artifact_retention_policy02", "artifact_retention_policy03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ARTIFACT_RETENTION_POLICY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ARTIFACT_RETENTION_POLICY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ARTIFACT_RETENTION_POLICY_ENTID"])
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
