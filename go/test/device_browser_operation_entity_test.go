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
const device_browser_operationEntityLiveStrict = true


func TestDeviceBrowserOperationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DeviceBrowserOperation(nil)
		if ent == nil {
			t.Fatal("expected non-nil DeviceBrowserOperationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.DeviceBrowserOperation(nil).List(map[string]any{"device_id": 1, "organization_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := device_browser_operationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "device_browser_operation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"device_browser_operation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/browser_operations/{id}/claim\"}")
		if setup.live {
			for _, _liveKey := range []string{"device01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, device_browser_operationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_DEVICE_BROWSER_OPERATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		deviceBrowserOperationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.device_browser_operation")))
		var deviceBrowserOperationRef01Data map[string]any
		if len(deviceBrowserOperationRef01DataRaw) > 0 {
			deviceBrowserOperationRef01Data = core.ToMapAny(deviceBrowserOperationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = deviceBrowserOperationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		deviceBrowserOperationRef01Ent := client.DeviceBrowserOperation(nil)
		deviceBrowserOperationRef01Match := map[string]any{
			"device_id": setup.idmap["device01"],
			"organization_id": setup.idmap["organization01"],
		}

		deviceBrowserOperationRef01ListResult, err := deviceBrowserOperationRef01Ent.List(deviceBrowserOperationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, deviceBrowserOperationRef01ListOk := deviceBrowserOperationRef01ListResult.([]any)
		if !deviceBrowserOperationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", deviceBrowserOperationRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"device01", "organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, device_browser_operationEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_DEVICE_BROWSER_OPERATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		deviceBrowserOperationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.device_browser_operation")))
		var deviceBrowserOperationRef01Data map[string]any
		if len(deviceBrowserOperationRef01DataRaw) > 0 {
			deviceBrowserOperationRef01Data = core.ToMapAny(deviceBrowserOperationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = deviceBrowserOperationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		deviceBrowserOperationRef01Ent := client.DeviceBrowserOperation(nil)
		deviceBrowserOperationRef01Match := map[string]any{
			"device_id": setup.idmap["device01"],
			"organization_id": setup.idmap["organization01"],
		}

		deviceBrowserOperationRef01ListResult, err := deviceBrowserOperationRef01Ent.List(deviceBrowserOperationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, deviceBrowserOperationRef01ListOk := deviceBrowserOperationRef01ListResult.([]any)
		if !deviceBrowserOperationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", deviceBrowserOperationRef01ListResult)
		}

	})
}

func device_browser_operationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "device_browser_operation", "DeviceBrowserOperationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read device_browser_operation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse device_browser_operation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"device_browser_operation01", "device_browser_operation02", "device_browser_operation03", "organization01", "organization02", "organization03", "device01", "device02", "device03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_DEVICE_BROWSER_OPERATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_DEVICE_BROWSER_OPERATION_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_DEVICE_BROWSER_OPERATION_ENTID"])
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
