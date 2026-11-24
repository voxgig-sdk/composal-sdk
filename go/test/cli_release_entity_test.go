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
const cli_releaseEntityLiveStrict = true


func TestCliReleaseEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CliRelease(nil)
		if ent == nil {
			t.Fatal("expected non-nil CliReleaseEntity")
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := cli_releaseBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cli_release." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"cli_release.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/cli_releases\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		cliReleaseRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.cli_release")))
		var cliReleaseRef01Data map[string]any
		if len(cliReleaseRef01DataRaw) > 0 {
			cliReleaseRef01Data = core.ToMapAny(cliReleaseRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cliReleaseRef01Data

		if setup.live {
			livePace()
		}
		// LOAD
		cliReleaseRef01Ent := client.CliRelease(nil)
		cliReleaseRef01MatchDt0 := map[string]any{}
		cliReleaseRef01DataDt0Loaded, err := cliReleaseRef01Ent.Load(cliReleaseRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if cliReleaseRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		cliReleaseRef01Ent := client.CliRelease(nil)
		cliReleaseRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "cli_release"}), "cli_release_ref01"))

		cliReleaseRef01DataResult, err := cliReleaseRef01Ent.Create(cliReleaseRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		cliReleaseRef01Data = core.ToMapAny(entityData(cliReleaseRef01DataResult))
		if cliReleaseRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cliReleaseRef01MatchDt0 := map[string]any{}
		cliReleaseRef01DataDt0Loaded, err := cliReleaseRef01Ent.Load(cliReleaseRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if cliReleaseRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func cli_releaseBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cli_release", "CliReleaseTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cli_release test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cli_release test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"cli_release01", "cli_release02", "cli_release03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_CLI_RELEASE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_CLI_RELEASE_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_CLI_RELEASE_ENTID"])
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
