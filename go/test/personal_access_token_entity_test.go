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
const personal_access_tokenEntityLiveStrict = true


func TestPersonalAccessTokenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PersonalAccessToken(nil)
		if ent == nil {
			t.Fatal("expected non-nil PersonalAccessTokenEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PersonalAccessToken(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := personal_access_tokenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "personal_access_token." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"personal_access_token.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/personal_access_tokens\"}")
			t.Log("LIVE STEP {\"id\":\"personal_access_token.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only personal_access_token.create.0 gives\"}")
			t.Log("LIVE STEP {\"id\":\"personal_access_token.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/personal_access_tokens/{id}\"}")
			t.Skip("Live coverage incomplete: personal_access_token.create.0 excluded (GET-only live run: needs POST /api/v1/personal_access_tokens); personal_access_token.load.1 excluded (GET-only live run: reads a record only personal_access_token.create.0 gives); personal_access_token.remove.2 excluded (GET-only live run: needs DELETE /api/v1/personal_access_tokens/{id})")
			return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		personalAccessTokenRef01Ent := client.PersonalAccessToken(nil)
		personalAccessTokenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "personal_access_token"}), "personal_access_token_ref01"))

		personalAccessTokenRef01DataResult, err := personalAccessTokenRef01Ent.Create(personalAccessTokenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		personalAccessTokenRef01Data = core.ToMapAny(entityData(personalAccessTokenRef01DataResult))
		if personalAccessTokenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if personalAccessTokenRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		personalAccessTokenRef01MatchDt0 := map[string]any{
			"id": personalAccessTokenRef01Data["id"],
		}
		personalAccessTokenRef01DataDt0Loaded, err := personalAccessTokenRef01Ent.Load(personalAccessTokenRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		personalAccessTokenRef01DataDt0LoadResult := core.ToMapAny(entityData(personalAccessTokenRef01DataDt0Loaded))
		if personalAccessTokenRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(personalAccessTokenRef01DataDt0LoadResult["id"], personalAccessTokenRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		personalAccessTokenRef01MatchRm0 := map[string]any{
			"id": personalAccessTokenRef01Data["id"],
		}
		_, err = personalAccessTokenRef01Ent.Remove(personalAccessTokenRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func personal_access_tokenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "personal_access_token", "PersonalAccessTokenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read personal_access_token test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse personal_access_token test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"personal_access_token01", "personal_access_token02", "personal_access_token03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_PERSONAL_ACCESS_TOKEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_PERSONAL_ACCESS_TOKEN_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_PERSONAL_ACCESS_TOKEN_ENTID"])
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
