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
const pull_request_transcriptDirectLiveStrict = true

func TestPullRequestTranscriptDirect(t *testing.T) {
	t.Run("direct-list-pull_request_transcript", func(t *testing.T) {
		setup := pull_request_transcriptDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-pull_request_transcript", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" && setup.idmap["pull_request01"] == nil {
			t.Log("LIVE STEP {\"id\":\"direct-list-pull_request_transcript\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives\"}")
			t.Skip("Live coverage incomplete: direct-list-pull_request_transcript excluded (GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives)")
			return
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" && setup.idmap["pull_request01"] == nil {
			t.Log("LIVE STEP {\"id\":\"direct-list-pull_request_transcript\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives\"}")
			t.Skip("Live coverage incomplete: direct-list-pull_request_transcript excluded (GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives)")
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"organization01", "pull_request01", "pull_request01", "repo01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, pull_request_transcriptDirectLiveStrict, "Live test blocked: needs %s via COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID", _liveKey)
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
			params["organization_id"] = setup.idmap["organization01"]
		} else {
			params["organization_id"] = "direct01"
		}
		if setup.live {
			params["pull_request_id"] = setup.idmap["pull_request01"]
		} else {
			params["pull_request_id"] = "direct02"
		}
		if setup.live {
			params["pull_request_id"] = setup.idmap["pull_request01"]
		} else {
			params["pull_request_id"] = "direct03"
		}
		if setup.live {
			params["repo_id"] = setup.idmap["repo01"]
		} else {
			params["repo_id"] = "direct04"
		}

		result, err := client.Direct(map[string]any{
			"path":   "api/v1/organizations/{organization_id}/repos/{repo_id}/pages/pull_request/{pull_request_id}/transcripts",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, pull_request_transcriptDirectLiveStrict, "Live list failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, pull_request_transcriptDirectLiveStrict, "Live list failed: %s", liveDescribe(result))
			}
			if _, ok := liveList(result["data"]); !ok {
				liveMiss(t, pull_request_transcriptDirectLiveStrict, "Live list returned no list: %s", liveDescribe(result))
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
				if !strings.Contains(url, "direct03") {
					t.Fatalf("expected url to contain direct03, got %v", url)
				}
				if !strings.Contains(url, "direct04") {
					t.Fatalf("expected url to contain direct04, got %v", url)
				}
			}
		}
	})

}

type pull_request_transcriptDirectSetupResult struct {
	client *sdk.ComposalSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func pull_request_transcriptDirectSetup(mockres any) *pull_request_transcriptDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID": map[string]any{},
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
		if entidRaw, ok := env["COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &pull_request_transcriptDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
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

	return &pull_request_transcriptDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
