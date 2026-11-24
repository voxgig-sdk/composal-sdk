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
const artifact_image_repositoryEntityLiveStrict = true


type artifact_image_repositoryFailHook struct {
	sdk.BaseFeature
	unexpected int
}

func (f *artifact_image_repositoryFailHook) PreSpec(ctx *sdk.Context) {
	panic("artifact_image_repository hook failed")
}

func (f *artifact_image_repositoryFailHook) PreUnexpected(ctx *sdk.Context) {
	f.unexpected++
}

func TestArtifactImageRepositoryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ArtifactImageRepository(nil)
		if ent == nil {
			t.Fatal("expected non-nil ArtifactImageRepositoryEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"artifact_image_repository": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for si := range base.ArtifactImageRepository(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				t.Fatalf("stream failed: %v", si.Err)
			}
			seen = append(seen, si.Item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for si := range streamSdk.ArtifactImageRepository(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					t.Fatalf("stream failed: %v", si.Err)
				}
				if sub, ok := si.Item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, si.Item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("stream-error", func(t *testing.T) {
		offline := map[string]any{"net": map[string]any{"offline": true}}
		var streamerr error
		for si := range sdk.TestSDK(offline, nil).ArtifactImageRepository(nil).Stream("list", nil, nil) {
			if si.Err != nil {
				streamerr = si.Err
			}
		}
		if nil == streamerr || !strings.Contains(streamerr.Error(), "offline") {
			t.Fatalf("expected the transport failure as a stream value, got %v", streamerr)
		}

		quiet := map[string]any{"ctrl": map[string]any{"throw": false}}
		for si := range sdk.TestSDK(offline, nil).ArtifactImageRepository(nil).Stream("list", nil, quiet) {
			if si.Err != nil {
				t.Fatalf("throw false: expected no error value, got %v", si.Err)
			}
		}

		if fhHasFeature("rbac") {
			denied := sdk.TestSDK(nil, map[string]any{
				"feature": map[string]any{"rbac": map[string]any{"active": true, "deny": true}},
			})
			var denyerr error
			for si := range denied.ArtifactImageRepository(nil).Stream("list", nil, nil) {
				if si.Err != nil {
					denyerr = si.Err
				}
			}
			if sdkerr, ok := denyerr.(*core.ComposalError); !ok || "rbac_denied" != sdkerr.Code {
				t.Fatalf("expected the rbac denial as a stream value, got %v", denyerr)
			}
		}
	})

	t.Run("stream-ctrl", func(t *testing.T) {
		explain := map[string]any{}
		ctrl := map[string]any{"explain": explain}
		for range sdk.TestSDK(nil, nil).ArtifactImageRepository(nil).Stream("list", nil, map[string]any{"ctrl": ctrl}) {
		}
		if _, has := ctrl["stream"]; has || 1 != len(ctrl) {
			t.Fatalf("the stream changed the caller's ctrl")
		}
		if 0 == len(explain) {
			t.Fatalf("the caller's explain record was not filled")
		}
	})

	t.Run("unexpected", func(t *testing.T) {
		hook := &artifact_image_repositoryFailHook{
			BaseFeature: sdk.BaseFeature{Version: "0.0.1", Name: "failhook", Active: true}}
		client := sdk.TestSDK(nil, map[string]any{"extend": []any{hook}})

		_, err := client.ArtifactImageRepository(nil).List(nil, nil)
		if nil == err || !strings.Contains(err.Error(), "hook failed") {
			t.Fatalf("expected the hook's failure, got %v", err)
		}
		if 0 == hook.unexpected {
			t.Fatalf("PreUnexpected did not fire")
		}

		fired := hook.unexpected
		if _, err := client.ArtifactImageRepository(nil).List(nil, map[string]any{"throw": false}); nil != err {
			t.Fatalf("throw false: expected no error, got %v", err)
		}
		if fired == hook.unexpected {
			t.Fatalf("throw false: PreUnexpected did not fire")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.ArtifactImageRepository(nil).List(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.ComposalError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := artifact_image_repositoryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "artifact_image_repository." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"artifact_image_repository.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/artifacts/image_repositories/{id}/archive\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_image_repository.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/artifacts/image_repositories/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_image_repository.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/artifacts/image_repositories/{id}\"}")
			t.Log("LIVE STEP {\"id\":\"artifact_image_repository.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["artifact_image_repository01"]
			}
			livePace()
			liveExisting(t, artifact_image_repositoryEntityLiveStrict, setup.data, "artifact_image_repository", "id", _liveId,
				func() (any, error) {
					return client.ArtifactImageRepository(nil).List(map[string]any{}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		artifactImageRepositoryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.artifact_image_repository")))
		var artifactImageRepositoryRef01Data map[string]any
		if len(artifactImageRepositoryRef01DataRaw) > 0 {
			artifactImageRepositoryRef01Data = core.ToMapAny(artifactImageRepositoryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = artifactImageRepositoryRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		artifactImageRepositoryRef01Ent := client.ArtifactImageRepository(nil)
		artifactImageRepositoryRef01Match := map[string]any{}

		artifactImageRepositoryRef01ListResult, err := artifactImageRepositoryRef01Ent.List(artifactImageRepositoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, artifactImageRepositoryRef01ListOk := artifactImageRepositoryRef01ListResult.([]any)
		if !artifactImageRepositoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", artifactImageRepositoryRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		artifactImageRepositoryRef01MatchDt0 := map[string]any{
			"id": artifactImageRepositoryRef01Data["id"],
		}
		artifactImageRepositoryRef01DataDt0Loaded, err := artifactImageRepositoryRef01Ent.Load(artifactImageRepositoryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		artifactImageRepositoryRef01DataDt0LoadResult := core.ToMapAny(entityData(artifactImageRepositoryRef01DataDt0Loaded))
		if artifactImageRepositoryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(artifactImageRepositoryRef01DataDt0LoadResult["id"], artifactImageRepositoryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		artifactImageRepositoryRef01Ent := client.ArtifactImageRepository(nil)
		artifactImageRepositoryRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "artifact_image_repository"}), "artifact_image_repository_ref01"))

		artifactImageRepositoryRef01DataResult, err := artifactImageRepositoryRef01Ent.Create(artifactImageRepositoryRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		artifactImageRepositoryRef01Data = core.ToMapAny(entityData(artifactImageRepositoryRef01DataResult))
		if artifactImageRepositoryRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if artifactImageRepositoryRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		artifactImageRepositoryRef01Match := map[string]any{}

		artifactImageRepositoryRef01ListResult, err := artifactImageRepositoryRef01Ent.List(artifactImageRepositoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		artifactImageRepositoryRef01List, artifactImageRepositoryRef01ListOk := artifactImageRepositoryRef01ListResult.([]any)
		if !artifactImageRepositoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", artifactImageRepositoryRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(artifactImageRepositoryRef01List), map[string]any{"id": artifactImageRepositoryRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		artifactImageRepositoryRef01DataUp0Up := map[string]any{
			"id": artifactImageRepositoryRef01Data["id"],
		}

		artifactImageRepositoryRef01ResdataUp0Result, err := artifactImageRepositoryRef01Ent.Update(artifactImageRepositoryRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		artifactImageRepositoryRef01ResdataUp0 := core.ToMapAny(entityData(artifactImageRepositoryRef01ResdataUp0Result))
		if artifactImageRepositoryRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !setup.live && !liveSameId(artifactImageRepositoryRef01ResdataUp0["id"], artifactImageRepositoryRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		artifactImageRepositoryRef01MatchDt0 := map[string]any{
			"id": artifactImageRepositoryRef01Data["id"],
		}
		artifactImageRepositoryRef01DataDt0Loaded, err := artifactImageRepositoryRef01Ent.Load(artifactImageRepositoryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		artifactImageRepositoryRef01DataDt0LoadResult := core.ToMapAny(entityData(artifactImageRepositoryRef01DataDt0Loaded))
		if artifactImageRepositoryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(artifactImageRepositoryRef01DataDt0LoadResult["id"], artifactImageRepositoryRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		artifactImageRepositoryRef01MatchRm0 := map[string]any{
			"id": artifactImageRepositoryRef01Data["id"],
		}
		_, err = artifactImageRepositoryRef01Ent.Remove(artifactImageRepositoryRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		artifactImageRepositoryRef01MatchRt0 := map[string]any{}

		artifactImageRepositoryRef01ListRt0Result, err := artifactImageRepositoryRef01Ent.List(artifactImageRepositoryRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		artifactImageRepositoryRef01ListRt0, artifactImageRepositoryRef01ListRt0Ok := artifactImageRepositoryRef01ListRt0Result.([]any)
		if !artifactImageRepositoryRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", artifactImageRepositoryRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(artifactImageRepositoryRef01ListRt0), map[string]any{"id": artifactImageRepositoryRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func artifact_image_repositoryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "artifact_image_repository", "ArtifactImageRepositoryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read artifact_image_repository test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse artifact_image_repository test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"artifact_image_repository01", "artifact_image_repository02", "artifact_image_repository03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("COMPOSAL_TEST_ARTIFACT_IMAGE_REPOSITORY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"COMPOSAL_TEST_ARTIFACT_IMAGE_REPOSITORY_ENTID": idmap,
		"COMPOSAL_TEST_LIVE":      "FALSE",
		"COMPOSAL_TEST_EXPLAIN":   "FALSE",
		"COMPOSAL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["COMPOSAL_TEST_ARTIFACT_IMAGE_REPOSITORY_ENTID"])
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
