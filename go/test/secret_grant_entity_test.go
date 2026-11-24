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
const secret_grantEntityLiveStrict = true


func TestSecretGrantEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SecretGrant(nil)
		if ent == nil {
			t.Fatal("expected non-nil SecretGrantEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SecretGrant(nil).List(map[string]any{"organization_id": 1, "secret_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := secret_grantBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "secret_grant." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"secret_grant.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/restore\"}")
			t.Log("LIVE STEP {\"id\":\"secret_grant.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"secret_grant.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"secret_grant.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "secret01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, secret_grantEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SECRET_GRANT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["secret_grant01"]
			}
			livePace()
			liveExisting(t, secret_grantEntityLiveStrict, setup.data, "secret_grant", "id", _liveId,
				func() (any, error) {
					return client.SecretGrant(nil).List(map[string]any{"organization_id": setup.idmap["organization01"], "secret_id": setup.idmap["secret01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		secretGrantRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.secret_grant")))
		var secretGrantRef01Data map[string]any
		if len(secretGrantRef01DataRaw) > 0 {
			secretGrantRef01Data = core.ToMapAny(secretGrantRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = secretGrantRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		secretGrantRef01Ent := client.SecretGrant(nil)
		secretGrantRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"secret_id": setup.idmap["secret01"],
		}

		secretGrantRef01ListResult, err := secretGrantRef01Ent.List(secretGrantRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, secretGrantRef01ListOk := secretGrantRef01ListResult.([]any)
		if !secretGrantRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", secretGrantRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		secretGrantRef01MatchDt0 := map[string]any{
			"id": secretGrantRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			secretGrantRef01MatchDt0["organization_id"] = v
		} else {
			secretGrantRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["secret_id"]; v != nil {
			secretGrantRef01MatchDt0["secret_id"] = v
		} else {
			secretGrantRef01MatchDt0["secret_id"] = setup.idmap["secret01"]
		}
		secretGrantRef01DataDt0Loaded, err := secretGrantRef01Ent.Load(secretGrantRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		secretGrantRef01DataDt0LoadResult := core.ToMapAny(entityData(secretGrantRef01DataDt0Loaded))
		if secretGrantRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(secretGrantRef01DataDt0LoadResult["id"], secretGrantRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "secret01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, secret_grantEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SECRET_GRANT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		secretGrantRef01Ent := client.SecretGrant(nil)
		secretGrantRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "secret_grant"}), "secret_grant_ref01"))
		secretGrantRef01Data["organization_id"] = setup.idmap["organization01"]
		secretGrantRef01Data["secret_id"] = setup.idmap["secret01"]

		secretGrantRef01DataResult, err := secretGrantRef01Ent.Create(secretGrantRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		secretGrantRef01Data = core.ToMapAny(entityData(secretGrantRef01DataResult))
		if secretGrantRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if secretGrantRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		secretGrantRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"secret_id": setup.idmap["secret01"],
		}

		secretGrantRef01ListResult, err := secretGrantRef01Ent.List(secretGrantRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		secretGrantRef01List, secretGrantRef01ListOk := secretGrantRef01ListResult.([]any)
		if !secretGrantRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", secretGrantRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(secretGrantRef01List), map[string]any{"id": secretGrantRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		secretGrantRef01DataUp0Up := map[string]any{
			"id": secretGrantRef01Data["id"],
			"organization_id": setup.idmap["organization_id"],
			"secret_id": setup.idmap["secret_id"],
		}

		secretGrantRef01ResdataUp0Result, err := secretGrantRef01Ent.Update(secretGrantRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		secretGrantRef01ResdataUp0 := core.ToMapAny(entityData(secretGrantRef01ResdataUp0Result))
		if secretGrantRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(secretGrantRef01ResdataUp0["id"], secretGrantRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		secretGrantRef01MatchDt0 := map[string]any{
			"id": secretGrantRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			secretGrantRef01MatchDt0["organization_id"] = v
		} else {
			secretGrantRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["secret_id"]; v != nil {
			secretGrantRef01MatchDt0["secret_id"] = v
		} else {
			secretGrantRef01MatchDt0["secret_id"] = setup.idmap["secret01"]
		}
		secretGrantRef01DataDt0Loaded, err := secretGrantRef01Ent.Load(secretGrantRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		secretGrantRef01DataDt0LoadResult := core.ToMapAny(entityData(secretGrantRef01DataDt0Loaded))
		if secretGrantRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(secretGrantRef01DataDt0LoadResult["id"], secretGrantRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		secretGrantRef01MatchRm0 := map[string]any{
			"id": secretGrantRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			secretGrantRef01MatchRm0["organization_id"] = v
		} else {
			secretGrantRef01MatchRm0["organization_id"] = setup.idmap["organization01"]
		}
		if v := setup.idmap["secret_id"]; v != nil {
			secretGrantRef01MatchRm0["secret_id"] = v
		} else {
			secretGrantRef01MatchRm0["secret_id"] = setup.idmap["secret01"]
		}
		_, err = secretGrantRef01Ent.Remove(secretGrantRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		secretGrantRef01MatchRt0 := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"secret_id": setup.idmap["secret01"],
		}

		secretGrantRef01ListRt0Result, err := secretGrantRef01Ent.List(secretGrantRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		secretGrantRef01ListRt0, secretGrantRef01ListRt0Ok := secretGrantRef01ListRt0Result.([]any)
		if !secretGrantRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", secretGrantRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(secretGrantRef01ListRt0), map[string]any{"id": secretGrantRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func secret_grantBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "secret_grant", "SecretGrantTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read secret_grant test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse secret_grant test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"secret_grant01", "secret_grant02", "secret_grant03", "organization01", "organization02", "organization03", "secret01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SECRET_GRANT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SECRET_GRANT_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SECRET_GRANT_ENTID"])
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
