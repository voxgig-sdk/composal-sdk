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
const lease_workspaceEntityLiveStrict = true


func TestLeaseWorkspaceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.LeaseWorkspace(nil)
		if ent == nil {
			t.Fatal("expected non-nil LeaseWorkspaceEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.LeaseWorkspace(nil).Update(map[string]any{"id": 1, "lease_id": "x", "node_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := lease_workspaceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "lease_workspace." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"lease_workspace.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ci/nodes/{id}/leases/{lease_id}/workspaces/{ci_workspace_id}\"}")
			t.Skip("Live coverage incomplete: lease_workspace.update.0 excluded (GET-only live run: needs PATCH /api/v1/ci/nodes/{id}/leases/{lease_id}/workspaces/{ci_workspace_id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"lease01", "node01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, lease_workspaceEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_LEASE_WORKSPACE_ENTID", _liveKey)
				}
			}
		}
		if setup.live {
			liveMiss(t, lease_workspaceEntityLiveStrict, "Live entity test blocked: %s", "the flow updates a lease_workspace record it did not create")
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		leaseWorkspaceRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.lease_workspace")))
		var leaseWorkspaceRef01Data map[string]any
		if len(leaseWorkspaceRef01DataRaw) > 0 {
			leaseWorkspaceRef01Data = core.ToMapAny(leaseWorkspaceRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = leaseWorkspaceRef01Data

		if setup.live {
			livePace()
		}
		// UPDATE
		leaseWorkspaceRef01Ent := client.LeaseWorkspace(nil)
		leaseWorkspaceRef01DataUp0Up := map[string]any{
			"id": leaseWorkspaceRef01Data["id"],
			"lease_id": setup.idmap["lease_id"],
			"node_id": setup.idmap["node_id"],
		}

		leaseWorkspaceRef01ResdataUp0Result, err := leaseWorkspaceRef01Ent.Update(leaseWorkspaceRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		leaseWorkspaceRef01ResdataUp0 := core.ToMapAny(entityData(leaseWorkspaceRef01ResdataUp0Result))
		if leaseWorkspaceRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(leaseWorkspaceRef01ResdataUp0["id"], leaseWorkspaceRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

	})
}

func lease_workspaceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "lease_workspace", "LeaseWorkspaceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read lease_workspace test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse lease_workspace test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"lease_workspace01", "lease_workspace02", "lease_workspace03", "node01", "node02", "node03", "lease01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_LEASE_WORKSPACE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_LEASE_WORKSPACE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_LEASE_WORKSPACE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add lease_id alias for update test.
	if idmapResolved["lease_id"] == nil {
		idmapResolved["lease_id"] = idmapResolved["lease01"]
	}
	// Add node_id alias for update test.
	if idmapResolved["node_id"] == nil {
		idmapResolved["node_id"] = idmapResolved["node01"]
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
