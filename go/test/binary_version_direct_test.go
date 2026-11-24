package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/composal-sdk/go"
	"github.com/voxgig-sdk/composal-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const binary_versionDirectLiveStrict = true

func TestBinaryVersionDirect(t *testing.T) {
	t.Run("direct-list-binary_version", func(t *testing.T) {
		setup := binary_versionDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-binary_version", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"binary01", "organization01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, binary_versionDirectLiveStrict, "Live test blocked: needs %s via COMPOSAL_TEST_BINARY_VERSION_ENTID", _liveKey)
					return
				}
			}
		}
		if setup.live {
			livePace()
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			params["binary_id"] = setup.idmap["binary01"]
		} else {
			params["binary_id"] = "direct01"
		}
		if setup.live {
			params["organization_id"] = setup.idmap["organization01"]
		} else {
			params["organization_id"] = "direct02"
		}

		result, err := client.Direct(map[string]any{
			"path":   "api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, binary_versionDirectLiveStrict, "Live list failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, binary_versionDirectLiveStrict, "Live list failed: %s", liveDescribe(result))
			}
			if _, ok := liveList(result["data"]); !ok {
				liveMiss(t, binary_versionDirectLiveStrict, "Live list returned no list: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
			}
		}
	})

	t.Run("direct-load-binary_version", func(t *testing.T) {
		setup := binary_versionDirectSetup(map[string]any{"id": "direct01"})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-load-binary_version", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"binary01", "organization01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, binary_versionDirectLiveStrict, "Live test blocked: needs %s via COMPOSAL_TEST_BINARY_VERSION_ENTID", _liveKey)
					return
				}
			}
		}
		if setup.live {
			livePace()
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			listParams := map[string]any{}
			listParams["binary_id"] = setup.idmap["binary01"]
			listParams["organization_id"] = setup.idmap["organization01"]
			listResult, listErr := client.Direct(map[string]any{
				"path":   "api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions",
				"method": "GET",
				"params": listParams,
			})
			if listErr != nil {
				liveMiss(t, binary_versionDirectLiveStrict, "Live list discovery failed: %v", listErr)
			}
			if listResult["ok"] != true {
				liveMiss(t, binary_versionDirectLiveStrict, "Live list discovery failed: %s", liveDescribe(listResult))
			}
			listData, listOk := liveList(listResult["data"])
			if !listOk {
				liveMiss(t, binary_versionDirectLiveStrict, "Live list discovery returned no list: %s", liveDescribe(listResult))
			}
			if len(listData) == 0 {
				liveEmpty(t, "The account has no binary_version record to load")
			}
			firstEnt := core.ToMapAny(listData[0])
			if firstEnt["id"] == nil {
				liveMiss(t, binary_versionDirectLiveStrict, "Live load blocked: discovery returned no usable identity")
			}
			params["id"] = firstEnt["id"]
			params["binary_id"] = setup.idmap["binary01"]
			params["organization_id"] = setup.idmap["organization01"]
		} else {
			params["binary_id"] = "direct01"
			params["id"] = "direct02"
			params["organization_id"] = "direct03"
		}

		result, err := client.Direct(map[string]any{
			"path":   "api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, binary_versionDirectLiveStrict, "Live load failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, binary_versionDirectLiveStrict, "Live load failed: %s", liveDescribe(result))
			}
			if result["data"] == nil {
				liveMiss(t, binary_versionDirectLiveStrict, "Live load returned no data: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
			if result["data"] == nil {
				t.Fatal("expected data to be non-nil")
			}
		}

		if !setup.live {
			if dataMap, ok := result["data"].(map[string]any); ok {
				if dataMap["id"] != "direct01" {
					t.Fatalf("expected data.id to be direct01, got %v", dataMap["id"])
				}
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
				if !strings.Contains(url, "direct03") {
					t.Fatalf("expected url to contain direct03, got %v", url)
				}
			}
		}
	})

}

type binary_versionDirectSetupResult struct {
	client *sdk.ComposalSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func binary_versionDirectSetup(mockres any) *binary_versionDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_BINARY_VERSION_ENTID": map[string]any{},
		"COMPOSAL_TEST_LIVE":    "FALSE",
		"COMPOSAL_APIKEY":       "",
	})

	live := env["COMPOSAL_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
			"apikey": env["COMPOSAL_APIKEY"],
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewComposalSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["COMPOSAL_TEST_BINARY_VERSION_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &binary_versionDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewComposalSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &binary_versionDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
