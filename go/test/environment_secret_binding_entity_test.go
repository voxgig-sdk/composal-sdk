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
const environment_secret_bindingEntityLiveStrict = true


func TestEnvironmentSecretBindingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EnvironmentSecretBinding(nil)
		if ent == nil {
			t.Fatal("expected non-nil EnvironmentSecretBindingEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.EnvironmentSecretBinding(nil).List(map[string]any{"app_id": 1, "environment_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := environment_secret_bindingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "environment_secret_binding." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"environment_secret_binding.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings\"}")
			t.Log("LIVE STEP {\"id\":\"environment_secret_binding.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"environment_secret_binding.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01", "environment01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, environment_secret_bindingEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ENVIRONMENT_SECRET_BINDING_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		environmentSecretBindingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.environment_secret_binding")))
		var environmentSecretBindingRef01Data map[string]any
		if len(environmentSecretBindingRef01DataRaw) > 0 {
			environmentSecretBindingRef01Data = core.ToMapAny(environmentSecretBindingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = environmentSecretBindingRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		environmentSecretBindingRef01Ent := client.EnvironmentSecretBinding(nil)
		environmentSecretBindingRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
			"environment_id": setup.idmap["environment01"],
		}

		environmentSecretBindingRef01ListResult, err := environmentSecretBindingRef01Ent.List(environmentSecretBindingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, environmentSecretBindingRef01ListOk := environmentSecretBindingRef01ListResult.([]any)
		if !environmentSecretBindingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", environmentSecretBindingRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01", "environment01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, environment_secret_bindingEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_ENVIRONMENT_SECRET_BINDING_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		environmentSecretBindingRef01Ent := client.EnvironmentSecretBinding(nil)
		environmentSecretBindingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "environment_secret_binding"}), "environment_secret_binding_ref01"))
		environmentSecretBindingRef01Data["app_id"] = setup.idmap["app01"]
		environmentSecretBindingRef01Data["environment_id"] = setup.idmap["environment01"]

		environmentSecretBindingRef01DataResult, err := environmentSecretBindingRef01Ent.Create(environmentSecretBindingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		environmentSecretBindingRef01Data = core.ToMapAny(entityData(environmentSecretBindingRef01DataResult))
		if environmentSecretBindingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if environmentSecretBindingRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		environmentSecretBindingRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
			"environment_id": setup.idmap["environment01"],
		}

		environmentSecretBindingRef01ListResult, err := environmentSecretBindingRef01Ent.List(environmentSecretBindingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		environmentSecretBindingRef01List, environmentSecretBindingRef01ListOk := environmentSecretBindingRef01ListResult.([]any)
		if !environmentSecretBindingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", environmentSecretBindingRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(environmentSecretBindingRef01List), map[string]any{"id": environmentSecretBindingRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		environmentSecretBindingRef01MatchRm0 := map[string]any{
			"id": environmentSecretBindingRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			environmentSecretBindingRef01MatchRm0["app_id"] = v
		} else {
			environmentSecretBindingRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["environment_id"]; v != nil {
			environmentSecretBindingRef01MatchRm0["environment_id"] = v
		} else {
			environmentSecretBindingRef01MatchRm0["environment_id"] = setup.idmap["environment01"]
		}
		_, err = environmentSecretBindingRef01Ent.Remove(environmentSecretBindingRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		environmentSecretBindingRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
			"environment_id": setup.idmap["environment01"],
		}

		environmentSecretBindingRef01ListRt0Result, err := environmentSecretBindingRef01Ent.List(environmentSecretBindingRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		environmentSecretBindingRef01ListRt0, environmentSecretBindingRef01ListRt0Ok := environmentSecretBindingRef01ListRt0Result.([]any)
		if !environmentSecretBindingRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", environmentSecretBindingRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(environmentSecretBindingRef01ListRt0), map[string]any{"id": environmentSecretBindingRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func environment_secret_bindingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "environment_secret_binding", "EnvironmentSecretBindingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read environment_secret_binding test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse environment_secret_binding test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"environment_secret_binding01", "environment_secret_binding02", "environment_secret_binding03", "app01", "app02", "app03", "environment01", "environment02", "environment03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ENVIRONMENT_SECRET_BINDING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ENVIRONMENT_SECRET_BINDING_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ENVIRONMENT_SECRET_BINDING_ENTID"])
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
