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
		_, err := client.SecretVersion(nil).List(map[string]any{"organization_id": 1, "secret_id": "x"}, nil)
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
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
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
			t.Log("LIVE STEP {\"id\":\"secret_version.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"secret_version.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"secret_version.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
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
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["secret_version01"]
			}
			livePace()
			liveExisting(t, secret_versionEntityLiveStrict, setup.data, "secret_version", "id", _liveId,
				func() (any, error) {
					return client.SecretVersion(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "secret_id": setup.idmap["secret01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		secretVersionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.secret_version")))
		var secretVersionRef01Data map[string]any
		if len(secretVersionRef01DataRaw) > 0 {
			secretVersionRef01Data = core.ToMapAny(secretVersionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = secretVersionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		secretVersionRef01Ent := client.SecretVersion(nil)
		secretVersionRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"secret_id": setup.idmap["secret01"],
		}

		secretVersionRef01ListResult, err := secretVersionRef01Ent.List(secretVersionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, secretVersionRef01ListOk := secretVersionRef01ListResult.([]any)
		if !secretVersionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", secretVersionRef01ListResult)
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
		if v := setup.idmap["secret_id"]; v != nil {
			secretVersionRef01MatchDt0["secret_id"] = v
		} else {
			secretVersionRef01MatchDt0["secret_id"] = setup.idmap["secret01"]
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
		// LIST
		secretVersionRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"secret_id": setup.idmap["secret01"],
		}

		secretVersionRef01ListResult, err := secretVersionRef01Ent.List(secretVersionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		secretVersionRef01List, secretVersionRef01ListOk := secretVersionRef01ListResult.([]any)
		if !secretVersionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", secretVersionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(secretVersionRef01List), map[string]any{"id": secretVersionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
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
		if v := setup.idmap["secret_id"]; v != nil {
			secretVersionRef01MatchDt0["secret_id"] = v
		} else {
			secretVersionRef01MatchDt0["secret_id"] = setup.idmap["secret01"]
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

		if setup.live {
			livePace()
		}
		// LIST
		secretVersionRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"secret_id": setup.idmap["secret01"],
		}

		secretVersionRef01ListRt0Result, err := secretVersionRef01Ent.List(secretVersionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		secretVersionRef01ListRt0, secretVersionRef01ListRt0Ok := secretVersionRef01ListRt0Result.([]any)
		if !secretVersionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", secretVersionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(secretVersionRef01ListRt0), map[string]any{"id": secretVersionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
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
