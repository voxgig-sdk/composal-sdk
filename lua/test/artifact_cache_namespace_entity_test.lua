-- ArtifactCacheNamespace entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("composal_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("ArtifactCacheNamespaceEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ArtifactCacheNamespace(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:ArtifactCacheNamespace(nil):load({ ["id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = artifact_cache_namespace_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "artifact_cache_namespace." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"artifact_cache_namespace.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{id}/archive\"}")
      print("LIVE STEP {\"id\":\"artifact_cache_namespace.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{id}\"}")
      print("LIVE STEP {\"id\":\"artifact_cache_namespace.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only artifact_cache_namespace.create.0 gives\"}")
      print("LIVE STEP {\"id\":\"artifact_cache_namespace.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{id}\"}")
      pending("Live coverage incomplete: artifact_cache_namespace.create.0 excluded (GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{id}/archive); artifact_cache_namespace.update.1 excluded (GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{id}); artifact_cache_namespace.load.2 excluded (GET-only live run: reads a record only artifact_cache_namespace.create.0 gives); artifact_cache_namespace.remove.3 excluded (GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{id})")
      return
    end

    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local artifact_cache_namespace_ref01_ent = client:ArtifactCacheNamespace(nil)
    local artifact_cache_namespace_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.artifact_cache_namespace"), "artifact_cache_namespace_ref01"))

    local artifact_cache_namespace_ref01_data_result, err = artifact_cache_namespace_ref01_ent:create(artifact_cache_namespace_ref01_data, nil)
    assert.is_nil(err)
    artifact_cache_namespace_ref01_data = helpers.to_map(type(artifact_cache_namespace_ref01_data_result) == 'table' and artifact_cache_namespace_ref01_data_result.data_get and artifact_cache_namespace_ref01_data_result:data_get() or artifact_cache_namespace_ref01_data_result)
    assert.is_not_nil(artifact_cache_namespace_ref01_data)
    assert.is_not_nil(artifact_cache_namespace_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local artifact_cache_namespace_ref01_data_up0_up = {
      id = artifact_cache_namespace_ref01_data["id"],
    }

    local artifact_cache_namespace_ref01_resdata_up0_result, err = artifact_cache_namespace_ref01_ent:update(artifact_cache_namespace_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local artifact_cache_namespace_ref01_resdata_up0 = helpers.to_map(type(artifact_cache_namespace_ref01_resdata_up0_result) == 'table' and artifact_cache_namespace_ref01_resdata_up0_result.data_get and artifact_cache_namespace_ref01_resdata_up0_result:data_get() or artifact_cache_namespace_ref01_resdata_up0_result)
    assert.is_not_nil(artifact_cache_namespace_ref01_resdata_up0)
    if not setup.live then
      assert.is_true(runner.live_same_id(artifact_cache_namespace_ref01_resdata_up0["id"], artifact_cache_namespace_ref01_data_up0_up["id"]))
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local artifact_cache_namespace_ref01_match_dt0 = {
      id = artifact_cache_namespace_ref01_data["id"],
    }
    local artifact_cache_namespace_ref01_data_dt0_loaded, err = artifact_cache_namespace_ref01_ent:load(artifact_cache_namespace_ref01_match_dt0, nil)
    assert.is_nil(err)
    local artifact_cache_namespace_ref01_data_dt0_load_result = helpers.to_map(type(artifact_cache_namespace_ref01_data_dt0_loaded) == 'table' and artifact_cache_namespace_ref01_data_dt0_loaded.data_get and artifact_cache_namespace_ref01_data_dt0_loaded:data_get() or artifact_cache_namespace_ref01_data_dt0_loaded)
    assert.is_not_nil(artifact_cache_namespace_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(artifact_cache_namespace_ref01_data_dt0_load_result["id"], artifact_cache_namespace_ref01_data["id"]))
    end

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local artifact_cache_namespace_ref01_match_rm0 = {
      id = artifact_cache_namespace_ref01_data["id"],
    }
    local _, err = artifact_cache_namespace_ref01_ent:remove(artifact_cache_namespace_ref01_match_rm0, nil)
    assert.is_nil(err)

  end)
end)

function artifact_cache_namespace_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/artifact_cache_namespace/ArtifactCacheNamespaceTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read artifact_cache_namespace test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "artifact_cache_namespace01", "artifact_cache_namespace02", "artifact_cache_namespace03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_ARTIFACT_CACHE_NAMESPACE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_ARTIFACT_CACHE_NAMESPACE_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_ARTIFACT_CACHE_NAMESPACE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["COMPOSAL_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["COMPOSAL_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["COMPOSAL_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["COMPOSAL_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
