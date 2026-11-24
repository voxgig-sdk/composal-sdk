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
const agent_appEntityLiveStrict = true


func TestAgentAppEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgentApp(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgentAppEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AgentApp(nil).List(map[string]any{"organization_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := agent_appBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "agent_app." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"agent_app.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_apps/{id}/opened\"}")
		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_appEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_APP_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["agent_app01"]
			}
			livePace()
			liveExisting(t, agent_appEntityLiveStrict, setup.data, "agent_app", "id", _liveId,
				func() (any, error) {
					return client.AgentApp(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		agentAppRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_app")))
		var agentAppRef01Data map[string]any
		if len(agentAppRef01DataRaw) > 0 {
			agentAppRef01Data = core.ToMapAny(agentAppRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentAppRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentAppRef01Ent := client.AgentApp(nil)
		agentAppRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentAppRef01ListResult, err := agentAppRef01Ent.List(agentAppRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentAppRef01ListOk := agentAppRef01ListResult.([]any)
		if !agentAppRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentAppRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentAppRef01MatchDt0 := map[string]any{
			"id": agentAppRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentAppRef01MatchDt0["organization_id"] = v
		} else {
			agentAppRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentAppRef01DataDt0Loaded, err := agentAppRef01Ent.Load(agentAppRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentAppRef01DataDt0LoadResult := core.ToMapAny(entityData(agentAppRef01DataDt0Loaded))
		if agentAppRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentAppRef01DataDt0LoadResult["id"], agentAppRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"organization01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, agent_appEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_AGENT_APP_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["agent_app01"]
			}
			livePace()
			liveExisting(t, agent_appEntityLiveStrict, setup.data, "agent_app", "id", _liveId,
				func() (any, error) {
					return client.AgentApp(nil).List(map[string]any{"organization_id": setup.idmap["organization01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		agentAppRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.agent_app")))
		var agentAppRef01Data map[string]any
		if len(agentAppRef01DataRaw) > 0 {
			agentAppRef01Data = core.ToMapAny(agentAppRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agentAppRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		agentAppRef01Ent := client.AgentApp(nil)
		agentAppRef01Match := map[string]any{
			"organization_id": setup.idmap["organization01"],
		}

		agentAppRef01ListResult, err := agentAppRef01Ent.List(agentAppRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agentAppRef01ListOk := agentAppRef01ListResult.([]any)
		if !agentAppRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agentAppRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		agentAppRef01MatchDt0 := map[string]any{
			"id": agentAppRef01Data["id"],
		}
		if v := setup.idmap["organization_id"]; v != nil {
			agentAppRef01MatchDt0["organization_id"] = v
		} else {
			agentAppRef01MatchDt0["organization_id"] = setup.idmap["organization01"]
		}
		agentAppRef01DataDt0Loaded, err := agentAppRef01Ent.Load(agentAppRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		agentAppRef01DataDt0LoadResult := core.ToMapAny(entityData(agentAppRef01DataDt0Loaded))
		if agentAppRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(agentAppRef01DataDt0LoadResult["id"], agentAppRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func agent_appBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "agent_app", "AgentAppTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read agent_app test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse agent_app test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"agent_app01", "agent_app02", "agent_app03", "organization01", "organization02", "organization03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AGENT_APP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AGENT_APP_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AGENT_APP_ENTID"])
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
