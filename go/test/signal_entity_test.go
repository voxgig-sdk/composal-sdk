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
const signalEntityLiveStrict = true


func TestSignalEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Signal(nil)
		if ent == nil {
			t.Fatal("expected non-nil SignalEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Signal(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := signalBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "signal." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"signal.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/signals/{id}/ack\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, signalEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SIGNAL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["signal01"]
			}
			livePace()
			liveExisting(t, signalEntityLiveStrict, setup.data, "signal", "id", _liveId,
				func() (any, error) {
					return client.Signal(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		signalRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.signal")))
		var signalRef01Data map[string]any
		if len(signalRef01DataRaw) > 0 {
			signalRef01Data = core.ToMapAny(signalRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = signalRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		signalRef01Ent := client.Signal(nil)
		signalRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		signalRef01ListResult, err := signalRef01Ent.List(signalRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, signalRef01ListOk := signalRef01ListResult.([]any)
		if !signalRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", signalRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		signalRef01MatchDt0 := map[string]any{
			"id": signalRef01Data["id"],
		}
		switch v := signalRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			signalRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				signalRef01MatchDt0["organization_id"] = v
			} else {
				signalRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		signalRef01DataDt0Loaded, err := signalRef01Ent.Load(signalRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		signalRef01DataDt0LoadResult := core.ToMapAny(entityData(signalRef01DataDt0Loaded))
		if signalRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(signalRef01DataDt0LoadResult["id"], signalRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, signalEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SIGNAL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		signalRef01Ent := client.Signal(nil)
		signalRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "signal"}), "signal_ref01"))
		signalRef01Data["organization_id"] = setup.idmap["organization01"]

		signalRef01DataResult, err := signalRef01Ent.Create(signalRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		signalRef01Data = core.ToMapAny(entityData(signalRef01DataResult))
		if signalRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if signalRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		signalRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		signalRef01ListResult, err := signalRef01Ent.List(signalRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		signalRef01List, signalRef01ListOk := signalRef01ListResult.([]any)
		if !signalRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", signalRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(signalRef01List), map[string]any{"id": signalRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		signalRef01MatchDt0 := map[string]any{
			"id": signalRef01Data["id"],
		}
		switch v := signalRef01Data["organization_id"].(type) {
		case string, bool, float64, int, int64:
			signalRef01MatchDt0["organization_id"] = v
		default:
			if v := setup.idmap["organization_id"]; v != nil {
				signalRef01MatchDt0["organization_id"] = v
			} else {
				signalRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
			}
		}
		signalRef01DataDt0Loaded, err := signalRef01Ent.Load(signalRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		signalRef01DataDt0LoadResult := core.ToMapAny(entityData(signalRef01DataDt0Loaded))
		if signalRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(signalRef01DataDt0LoadResult["id"], signalRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func signalBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "signal", "SignalTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read signal test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse signal test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"signal01", "signal02", "signal03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SIGNAL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SIGNAL_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SIGNAL_ENTID"])
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
