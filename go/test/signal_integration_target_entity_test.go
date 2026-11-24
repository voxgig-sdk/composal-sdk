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
const signal_integration_targetEntityLiveStrict = true


func TestSignalIntegrationTargetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SignalIntegrationTarget(nil)
		if ent == nil {
			t.Fatal("expected non-nil SignalIntegrationTargetEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.SignalIntegrationTarget(nil).List(map[string]any{"organization_id": 1, "signal_integration_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := signal_integration_targetBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "signal_integration_target." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"signal_integration_target.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01", "signal_integration01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, signal_integration_targetEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SIGNAL_INTEGRATION_TARGET_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		signalIntegrationTargetRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.signal_integration_target")))
		var signalIntegrationTargetRef01Data map[string]any
		if len(signalIntegrationTargetRef01DataRaw) > 0 {
			signalIntegrationTargetRef01Data = core.ToMapAny(signalIntegrationTargetRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = signalIntegrationTargetRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		signalIntegrationTargetRef01Ent := client.SignalIntegrationTarget(nil)
		signalIntegrationTargetRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"signal_integration_id": setup.idmap["signal_integration01"],
		}

		signalIntegrationTargetRef01ListResult, err := signalIntegrationTargetRef01Ent.List(signalIntegrationTargetRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, signalIntegrationTargetRef01ListOk := signalIntegrationTargetRef01ListResult.([]any)
		if !signalIntegrationTargetRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", signalIntegrationTargetRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01", "signal_integration01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, signal_integration_targetEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_SIGNAL_INTEGRATION_TARGET_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		signalIntegrationTargetRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.signal_integration_target")))
		var signalIntegrationTargetRef01Data map[string]any
		if len(signalIntegrationTargetRef01DataRaw) > 0 {
			signalIntegrationTargetRef01Data = core.ToMapAny(signalIntegrationTargetRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = signalIntegrationTargetRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		signalIntegrationTargetRef01Ent := client.SignalIntegrationTarget(nil)
		signalIntegrationTargetRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
			"signal_integration_id": setup.idmap["signal_integration01"],
		}

		signalIntegrationTargetRef01ListResult, err := signalIntegrationTargetRef01Ent.List(signalIntegrationTargetRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, signalIntegrationTargetRef01ListOk := signalIntegrationTargetRef01ListResult.([]any)
		if !signalIntegrationTargetRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", signalIntegrationTargetRef01ListResult)
		}

	})
}

func signal_integration_targetBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "signal_integration_target", "SignalIntegrationTargetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read signal_integration_target test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse signal_integration_target test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"signal_integration_target01", "signal_integration_target02", "signal_integration_target03", "organization01", "organization02", "organization03", "signal_integration01", "signal_integration02", "signal_integration03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_SIGNAL_INTEGRATION_TARGET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_SIGNAL_INTEGRATION_TARGET_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_SIGNAL_INTEGRATION_TARGET_ENTID"])
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
