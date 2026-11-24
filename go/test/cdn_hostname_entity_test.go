package sdktest

import (
	"encoding/json"
	"fmt"
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
const cdn_hostnameEntityLiveStrict = true


func TestCdnHostnameEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CdnHostname(nil)
		if ent == nil {
			t.Fatal("expected non-nil CdnHostnameEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CdnHostname(nil).List(map[string]any{"app_id": 1, "cdn_id": "x"}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := cdn_hostnameBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cdn_hostname." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"cdn_hostname.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames\"}")
			t.Log("LIVE STEP {\"id\":\"cdn_hostname.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"cdn_hostname.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"cdn_hostname.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"app01", "cdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, cdn_hostnameEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CDN_HOSTNAME_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["cdn_hostname01"]
			}
			livePace()
			liveExisting(t, cdn_hostnameEntityLiveStrict, setup.data, "cdn_hostname", "id", _liveId,
				func() (any, error) {
					return client.CdnHostname(nil).List(map[string]any{"app_id": setup.idmap["app01"], "cdn_id": setup.idmap["cdn01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		cdnHostnameRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.cdn_hostname")))
		var cdnHostnameRef01Data map[string]any
		if len(cdnHostnameRef01DataRaw) > 0 {
			cdnHostnameRef01Data = core.ToMapAny(cdnHostnameRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cdnHostnameRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		cdnHostnameRef01Ent := client.CdnHostname(nil)
		cdnHostnameRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
			"cdn_id": setup.idmap["cdn01"],
		}

		cdnHostnameRef01ListResult, err := cdnHostnameRef01Ent.List(cdnHostnameRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, cdnHostnameRef01ListOk := cdnHostnameRef01ListResult.([]any)
		if !cdnHostnameRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cdnHostnameRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cdnHostnameRef01MatchDt0 := map[string]any{
			"id": cdnHostnameRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			cdnHostnameRef01MatchDt0["app_id"] = v
		} else {
			cdnHostnameRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["cdn_id"]; v != nil {
			cdnHostnameRef01MatchDt0["cdn_id"] = v
		} else {
			cdnHostnameRef01MatchDt0["cdn_id"] = setup.idmap["cdn01"]
		}
		cdnHostnameRef01DataDt0Loaded, err := cdnHostnameRef01Ent.Load(cdnHostnameRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cdnHostnameRef01DataDt0LoadResult := core.ToMapAny(entityData(cdnHostnameRef01DataDt0Loaded))
		if cdnHostnameRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(cdnHostnameRef01DataDt0LoadResult["id"], cdnHostnameRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01", "cdn01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, cdn_hostnameEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_CDN_HOSTNAME_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		cdnHostnameRef01Ent := client.CdnHostname(nil)
		cdnHostnameRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "cdn_hostname"}), "cdn_hostname_ref01"))
		cdnHostnameRef01Data["app_id"] = setup.idmap["app01"]
		cdnHostnameRef01Data["cdn_id"] = setup.idmap["cdn01"]

		cdnHostnameRef01DataResult, err := cdnHostnameRef01Ent.Create(cdnHostnameRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		cdnHostnameRef01Data = core.ToMapAny(entityData(cdnHostnameRef01DataResult))
		if cdnHostnameRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if cdnHostnameRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		cdnHostnameRef01Match := map[string]any{
			"app_id": setup.idmap["app01"],
			"cdn_id": setup.idmap["cdn01"],
		}

		cdnHostnameRef01ListResult, err := cdnHostnameRef01Ent.List(cdnHostnameRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		cdnHostnameRef01List, cdnHostnameRef01ListOk := cdnHostnameRef01ListResult.([]any)
		if !cdnHostnameRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cdnHostnameRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(cdnHostnameRef01List), map[string]any{"id": cdnHostnameRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		cdnHostnameRef01DataUp0Up := map[string]any{
			"id": cdnHostnameRef01Data["id"],
			"app_id": setup.idmap["app_id"],
			"cdn_id": setup.idmap["cdn_id"],
		}

		cdnHostnameRef01MarkdefUp0Name := "app_cdn_distribution_id"
		cdnHostnameRef01MarkdefUp0Value := fmt.Sprintf("Mark01-cdn_hostname_ref01_%d", setup.now)
		cdnHostnameRef01DataUp0Up[cdnHostnameRef01MarkdefUp0Name] = cdnHostnameRef01MarkdefUp0Value

		cdnHostnameRef01ResdataUp0Result, err := cdnHostnameRef01Ent.Update(cdnHostnameRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		cdnHostnameRef01ResdataUp0 := core.ToMapAny(entityData(cdnHostnameRef01ResdataUp0Result))
		if cdnHostnameRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(cdnHostnameRef01ResdataUp0["id"], cdnHostnameRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if cdnHostnameRef01ResdataUp0[cdnHostnameRef01MarkdefUp0Name] != cdnHostnameRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", cdnHostnameRef01MarkdefUp0Name, cdnHostnameRef01ResdataUp0[cdnHostnameRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cdnHostnameRef01MatchDt0 := map[string]any{
			"id": cdnHostnameRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			cdnHostnameRef01MatchDt0["app_id"] = v
		} else {
			cdnHostnameRef01MatchDt0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["cdn_id"]; v != nil {
			cdnHostnameRef01MatchDt0["cdn_id"] = v
		} else {
			cdnHostnameRef01MatchDt0["cdn_id"] = setup.idmap["cdn01"]
		}
		cdnHostnameRef01DataDt0Loaded, err := cdnHostnameRef01Ent.Load(cdnHostnameRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cdnHostnameRef01DataDt0LoadResult := core.ToMapAny(entityData(cdnHostnameRef01DataDt0Loaded))
		if cdnHostnameRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(cdnHostnameRef01DataDt0LoadResult["id"], cdnHostnameRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		cdnHostnameRef01MatchRm0 := map[string]any{
			"id": cdnHostnameRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			cdnHostnameRef01MatchRm0["app_id"] = v
		} else {
			cdnHostnameRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		if v := setup.idmap["cdn_id"]; v != nil {
			cdnHostnameRef01MatchRm0["cdn_id"] = v
		} else {
			cdnHostnameRef01MatchRm0["cdn_id"] = setup.idmap["cdn01"]
		}
		_, err = cdnHostnameRef01Ent.Remove(cdnHostnameRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		cdnHostnameRef01MatchRt0 := map[string]any{
			"app_id": setup.idmap["app01"],
			"cdn_id": setup.idmap["cdn01"],
		}

		cdnHostnameRef01ListRt0Result, err := cdnHostnameRef01Ent.List(cdnHostnameRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		cdnHostnameRef01ListRt0, cdnHostnameRef01ListRt0Ok := cdnHostnameRef01ListRt0Result.([]any)
		if !cdnHostnameRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", cdnHostnameRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(cdnHostnameRef01ListRt0), map[string]any{"id": cdnHostnameRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func cdn_hostnameBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cdn_hostname", "CdnHostnameTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cdn_hostname test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cdn_hostname test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"cdn_hostname01", "cdn_hostname02", "cdn_hostname03", "app01", "app02", "app03", "cdn01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_CDN_HOSTNAME_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_CDN_HOSTNAME_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_CDN_HOSTNAME_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add app_id alias for update test.
	if idmapResolved["app_id"] == nil {
		idmapResolved["app_id"] = idmapResolved["app01"]
	}
	// Add cdn_id alias for update test.
	if idmapResolved["cdn_id"] == nil {
		idmapResolved["cdn_id"] = idmapResolved["cdn01"]
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
