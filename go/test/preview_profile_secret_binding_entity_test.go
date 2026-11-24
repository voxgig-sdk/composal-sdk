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
const preview_profile_secret_bindingEntityLiveStrict = true


func TestPreviewProfileSecretBindingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PreviewProfileSecretBinding(nil)
		if ent == nil {
			t.Fatal("expected non-nil PreviewProfileSecretBindingEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PreviewProfileSecretBinding(nil).List(map[string]any{"app_id": 1, "preview_profile_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := preview_profile_secret_bindingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "preview_profile_secret_binding." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"preview_profile_secret_binding.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings\"}")
			t.Log("LIVE STEP {\"id\":\"preview_profile_secret_binding.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"preview_profile_secret_binding.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01", "preview_profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, preview_profile_secret_bindingEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PREVIEW_PROFILE_SECRET_BINDING_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		previewProfileSecretBindingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.preview_profile_secret_binding")))
		var previewProfileSecretBindingRef01Data map[string]any
		if len(previewProfileSecretBindingRef01DataRaw) > 0 {
			previewProfileSecretBindingRef01Data = core.ToMapAny(previewProfileSecretBindingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = previewProfileSecretBindingRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		previewProfileSecretBindingRef01Ent := client.PreviewProfileSecretBinding(nil)
		previewProfileSecretBindingRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
			"preview_profile_id": setup.idmap["preview_profile01"],
		}

		previewProfileSecretBindingRef01ListResult, err := previewProfileSecretBindingRef01Ent.List(previewProfileSecretBindingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, previewProfileSecretBindingRef01ListOk := previewProfileSecretBindingRef01ListResult.([]any)
		if !previewProfileSecretBindingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", previewProfileSecretBindingRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01", "preview_profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, preview_profile_secret_bindingEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_PREVIEW_PROFILE_SECRET_BINDING_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		previewProfileSecretBindingRef01Ent := client.PreviewProfileSecretBinding(nil)
		previewProfileSecretBindingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "preview_profile_secret_binding"}), "preview_profile_secret_binding_ref01"))
		previewProfileSecretBindingRef01Data["app_id"] = setup.idmap["app01"]
		previewProfileSecretBindingRef01Data["preview_profile_id"] = setup.idmap["preview_profile01"]

		previewProfileSecretBindingRef01DataResult, err := previewProfileSecretBindingRef01Ent.Create(previewProfileSecretBindingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		previewProfileSecretBindingRef01Data = core.ToMapAny(entityData(previewProfileSecretBindingRef01DataResult))
		if previewProfileSecretBindingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if previewProfileSecretBindingRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		previewProfileSecretBindingRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
			"preview_profile_id": setup.idmap["preview_profile01"],
		}

		previewProfileSecretBindingRef01ListResult, err := previewProfileSecretBindingRef01Ent.List(previewProfileSecretBindingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		previewProfileSecretBindingRef01List, previewProfileSecretBindingRef01ListOk := previewProfileSecretBindingRef01ListResult.([]any)
		if !previewProfileSecretBindingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", previewProfileSecretBindingRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(previewProfileSecretBindingRef01List), map[string]any{"id": previewProfileSecretBindingRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		previewProfileSecretBindingRef01MatchRm0 := map[string]any{
			"id": previewProfileSecretBindingRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			previewProfileSecretBindingRef01MatchRm0["app_id"] = v
		} else {
			previewProfileSecretBindingRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["preview_profile_id"]; v != nil {
			previewProfileSecretBindingRef01MatchRm0["preview_profile_id"] = v
		} else {
			previewProfileSecretBindingRef01MatchRm0["preview_profile_id"] = setup.idmap["preview_profile01"]
		}
		_, err = previewProfileSecretBindingRef01Ent.Remove(previewProfileSecretBindingRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		previewProfileSecretBindingRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
			"preview_profile_id": setup.idmap["preview_profile01"],
		}

		previewProfileSecretBindingRef01ListRt0Result, err := previewProfileSecretBindingRef01Ent.List(previewProfileSecretBindingRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		previewProfileSecretBindingRef01ListRt0, previewProfileSecretBindingRef01ListRt0Ok := previewProfileSecretBindingRef01ListRt0Result.([]any)
		if !previewProfileSecretBindingRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", previewProfileSecretBindingRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(previewProfileSecretBindingRef01ListRt0), map[string]any{"id": previewProfileSecretBindingRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func preview_profile_secret_bindingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "preview_profile_secret_binding", "PreviewProfileSecretBindingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read preview_profile_secret_binding test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse preview_profile_secret_binding test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"preview_profile_secret_binding01", "preview_profile_secret_binding02", "preview_profile_secret_binding03", "app01", "app02", "app03", "preview_profile01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PREVIEW_PROFILE_SECRET_BINDING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PREVIEW_PROFILE_SECRET_BINDING_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PREVIEW_PROFILE_SECRET_BINDING_ENTID"])
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
