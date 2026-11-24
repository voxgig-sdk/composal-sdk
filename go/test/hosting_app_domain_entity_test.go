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
const hosting_app_domainEntityLiveStrict = true


func TestHostingAppDomainEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.HostingAppDomain(nil)
		if ent == nil {
			t.Fatal("expected non-nil HostingAppDomainEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.HostingAppDomain(nil).Load(map[string]any{"app_id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := hosting_app_domainBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "hosting_app_domain." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"hosting_app_domain.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/domains/{id}/disable\"}")
			t.Log("LIVE STEP {\"id\":\"hosting_app_domain.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/domains/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"hosting_app_domain.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only hosting_app_domain.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"hosting_app_domain.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/domains/{id}\"}")
			t.Skip("Live coverage incomplete: hosting_app_domain.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/domains/{id}/disable); hosting_app_domain.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/domains/{id}); hosting_app_domain.load.2 excluded (GET-only live run: reads a record only hosting_app_domain.create.0 gives); hosting_app_domain.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/domains/{id})")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"app01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, hosting_app_domainEntityLiveStrict, "Live entity test blocked: needs %s via COMPOSAL_TEST_HOSTING_APP_DOMAIN_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		hostingAppDomainRef01Ent := client.HostingAppDomain(nil)
		hostingAppDomainRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "hosting_app_domain"}), "hosting_app_domain_ref01"))
		hostingAppDomainRef01Data["app_id"] = setup.idmap["app01"]

		hostingAppDomainRef01DataResult, err := hostingAppDomainRef01Ent.Create(hostingAppDomainRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		hostingAppDomainRef01Data = core.ToMapAny(entityData(hostingAppDomainRef01DataResult))
		if hostingAppDomainRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if hostingAppDomainRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		hostingAppDomainRef01DataUp0Up := map[string]any{
			"id": hostingAppDomainRef01Data["id"],
			"app_id": setup.idmap["app_id"],
		}

		hostingAppDomainRef01MarkdefUp0Name := "app_environment_id"
		hostingAppDomainRef01MarkdefUp0Value := fmt.Sprintf("Mark01-hosting_app_domain_ref01_%d", setup.now)
		hostingAppDomainRef01DataUp0Up[hostingAppDomainRef01MarkdefUp0Name] = hostingAppDomainRef01MarkdefUp0Value

		hostingAppDomainRef01ResdataUp0Result, err := hostingAppDomainRef01Ent.Update(hostingAppDomainRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		hostingAppDomainRef01ResdataUp0 := core.ToMapAny(entityData(hostingAppDomainRef01ResdataUp0Result))
		if hostingAppDomainRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(hostingAppDomainRef01ResdataUp0["id"], hostingAppDomainRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if hostingAppDomainRef01ResdataUp0[hostingAppDomainRef01MarkdefUp0Name] != hostingAppDomainRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", hostingAppDomainRef01MarkdefUp0Name, hostingAppDomainRef01ResdataUp0[hostingAppDomainRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		hostingAppDomainRef01MatchDt0 := map[string]any{
			"id": hostingAppDomainRef01Data["id"],
		}
		hostingAppDomainRef01DataDt0Loaded, err := hostingAppDomainRef01Ent.Load(hostingAppDomainRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		hostingAppDomainRef01DataDt0LoadResult := core.ToMapAny(entityData(hostingAppDomainRef01DataDt0Loaded))
		if hostingAppDomainRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(hostingAppDomainRef01DataDt0LoadResult["id"], hostingAppDomainRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		hostingAppDomainRef01MatchRm0 := map[string]any{
			"id": hostingAppDomainRef01Data["id"],
		}
		if v := setup.idmap["app_id"]; v != nil {
			hostingAppDomainRef01MatchRm0["app_id"] = v
		} else {
			hostingAppDomainRef01MatchRm0["app_id"] = setup.idmap["app01"]
		}
		_, err = hostingAppDomainRef01Ent.Remove(hostingAppDomainRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func hosting_app_domainBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "hosting_app_domain", "HostingAppDomainTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read hosting_app_domain test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse hosting_app_domain test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"hosting_app_domain01", "hosting_app_domain02", "hosting_app_domain03", "app01", "app02", "app03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_HOSTING_APP_DOMAIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_HOSTING_APP_DOMAIN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_HOSTING_APP_DOMAIN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add app_id alias for update test.
	if idmapResolved["app_id"] == nil {
		idmapResolved["app_id"] = idmapResolved["app01"]
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
