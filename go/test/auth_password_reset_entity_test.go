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
const auth_password_resetEntityLiveStrict = true


func TestAuthPasswordResetEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AuthPasswordReset(nil)
		if ent == nil {
			t.Fatal("expected non-nil AuthPasswordResetEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AuthPasswordReset(nil).Create(map[string]any{"email": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := auth_password_resetBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "auth_password_reset." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"auth_password_reset.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/auth/password_resets\"}")
			t.Log("LIVE STEP {\"id\":\"auth_password_reset.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/auth/password_resets\"}")
			t.Skip("Live coverage incomplete: auth_password_reset.create.0 excluded (GET-only live run: needs POST /api/v1/auth/password_resets); auth_password_reset.update.1 excluded (GET-only live run: needs PATCH /api/v1/auth/password_resets)")
			return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		authPasswordResetRef01Ent := client.AuthPasswordReset(nil)
		authPasswordResetRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "auth_password_reset"}), "auth_password_reset_ref01"))

		authPasswordResetRef01DataResult, err := authPasswordResetRef01Ent.Create(authPasswordResetRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		authPasswordResetRef01Data = core.ToMapAny(entityData(authPasswordResetRef01DataResult))
		if authPasswordResetRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		authPasswordResetRef01DataUp0Up := map[string]any{
		}

		authPasswordResetRef01MarkdefUp0Name := "email"
		authPasswordResetRef01MarkdefUp0Value := fmt.Sprintf("Mark01-auth_password_reset_ref01_%d", setup.now)
		authPasswordResetRef01DataUp0Up[authPasswordResetRef01MarkdefUp0Name] = authPasswordResetRef01MarkdefUp0Value

		authPasswordResetRef01ResdataUp0Result, err := authPasswordResetRef01Ent.Update(authPasswordResetRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		authPasswordResetRef01ResdataUp0 := core.ToMapAny(entityData(authPasswordResetRef01ResdataUp0Result))
		if authPasswordResetRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if authPasswordResetRef01ResdataUp0[authPasswordResetRef01MarkdefUp0Name] != authPasswordResetRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", authPasswordResetRef01MarkdefUp0Name, authPasswordResetRef01ResdataUp0[authPasswordResetRef01MarkdefUp0Name])
		}

	})
}

func auth_password_resetBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "auth_password_reset", "AuthPasswordResetTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read auth_password_reset test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse auth_password_reset test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"auth_password_reset01", "auth_password_reset02", "auth_password_reset03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID"])
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
