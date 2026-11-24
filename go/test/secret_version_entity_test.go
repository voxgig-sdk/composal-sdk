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
const secret_versionEntityLiveStrict = true


func TestSecretVersionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SecretVersion(nil)
		if ent == nil {
			t.Fatal("expected non-nil SecretVersionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SecretVersion(nil).Load(map[string]any{"id": 1, "organization_id": "x", "secret_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := secret_versionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "secret_version." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"secret_version.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact\"}")
			t.Log("LIVE STEP {\"id\":\"secret_version.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"secret_version.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only secret_version.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"secret_version.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}\"}")
			t.Skip("Live coverage incomplete: secret_version.create.0 excluded (GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact); secret_version.update.1 excluded (GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}); secret_version.load.2 excluded (GET-only live run: reads a record only secret_version.create.0 gives); secret_version.remove.3 excluded (GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "secret01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, secret_versionEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SECRET_VERSION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		secretVersionRef01Ent := client.SecretVersion(nil)
		secretVersionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "secret_version"}), "secret_version_ref01"))
		secretVersionRef01Data["organization_id"] = setup.idmap["organization01"]
		secretVersionRef01Data["secret_id"] = setup.idmap["secret01"]

		secretVersionRef01DataResult, err := secretVersionRef01Ent.Create(secretVersionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		secretVersionRef01Data = core.ToMapAny(entityData(secretVersionRef01DataResult))
		if secretVersionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if secretVersionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		secretVersionRef01DataUp0Up := map[string]any{
			"id": secretVersionRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"secret_id": setup.idmap["secret_id"],
		}

		secretVersionRef01ResdataUp0Result, err := secretVersionRef01Ent.Update(secretVersionRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		secretVersionRef01ResdataUp0 := core.ToMapAny(entityData(secretVersionRef01ResdataUp0Result))
		if secretVersionRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(secretVersionRef01ResdataUp0["id"], secretVersionRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		secretVersionRef01MatchDt0 := map[string]any{
			"id": secretVersionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			secretVersionRef01MatchDt0["organization_id"] = v
		} else {
			secretVersionRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		secretVersionRef01DataDt0Loaded, err := secretVersionRef01Ent.Load(secretVersionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		secretVersionRef01DataDt0LoadResult := core.ToMapAny(entityData(secretVersionRef01DataDt0Loaded))
		if secretVersionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(secretVersionRef01DataDt0LoadResult["id"], secretVersionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		secretVersionRef01MatchRm0 := map[string]any{
			"id": secretVersionRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			secretVersionRef01MatchRm0["organization_id"] = v
		} else {
			secretVersionRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["secret_id"]; v != nil {
			secretVersionRef01MatchRm0["secret_id"] = v
		} else {
			secretVersionRef01MatchRm0["secret_id"] = setup.idmap["secret01"]
		}
		_, err = secretVersionRef01Ent.Remove(secretVersionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func secret_versionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "secret_version", "SecretVersionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read secret_version test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse secret_version test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"secret_version01", "secret_version02", "secret_version03", "organization01", "organization02", "organization03", "secret01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SECRET_VERSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SECRET_VERSION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SECRET_VERSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add organization_id alias for update test.
	if idmapResolved["organization_id"] == nil {
		idmapResolved["organization_id"] = idmapResolved["organization01"]
	}
	// Add secret_id alias for update test.
	if idmapResolved["secret_id"] == nil {
		idmapResolved["secret_id"] = idmapResolved["secret01"]
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
