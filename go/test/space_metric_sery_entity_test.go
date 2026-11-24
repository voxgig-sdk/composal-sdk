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
const space_metric_seryEntityLiveStrict = true


func TestSpaceMetricSeryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SpaceMetricSery(nil)
		if ent == nil {
			t.Fatal("expected non-nil SpaceMetricSeryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SpaceMetricSery(nil).Load(map[string]any{"space_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := space_metric_seryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "space_metric_sery." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"space_metric_sery.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/metric_series\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		spaceMetricSeryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.space_metric_sery")))
		var spaceMetricSeryRef01Data map[string]any
		if len(spaceMetricSeryRef01DataRaw) > 0 {
			spaceMetricSeryRef01Data = core.ToMapAny(spaceMetricSeryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = spaceMetricSeryRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		spaceMetricSeryRef01Ent := client.SpaceMetricSery(nil)
		spaceMetricSeryRef01MatchDt0 := map[string]any{}
		spaceMetricSeryRef01DataDt0Loaded, err := spaceMetricSeryRef01Ent.Load(spaceMetricSeryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if spaceMetricSeryRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"space01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, space_metric_seryEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SPACE_METRIC_SERY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		spaceMetricSeryRef01Ent := client.SpaceMetricSery(nil)
		spaceMetricSeryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "space_metric_sery"}), "space_metric_sery_ref01"))
		spaceMetricSeryRef01Data["space_id"] = setup.idmap["space01"]

		spaceMetricSeryRef01DataResult, err := spaceMetricSeryRef01Ent.Create(spaceMetricSeryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		spaceMetricSeryRef01Data = core.ToMapAny(entityData(spaceMetricSeryRef01DataResult))
		if spaceMetricSeryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		spaceMetricSeryRef01MatchDt0 := map[string]any{}
		spaceMetricSeryRef01DataDt0Loaded, err := spaceMetricSeryRef01Ent.Load(spaceMetricSeryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if spaceMetricSeryRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func space_metric_seryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "space_metric_sery", "SpaceMetricSeryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read space_metric_sery test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse space_metric_sery test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"space_metric_sery01", "space_metric_sery02", "space_metric_sery03", "space01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SPACE_METRIC_SERY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SPACE_METRIC_SERY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SPACE_METRIC_SERY_ENTID"])
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
