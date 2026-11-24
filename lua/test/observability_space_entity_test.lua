-- ObservabilitySpace entity test

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


describe("ObservabilitySpaceEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ObservabilitySpace(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:ObservabilitySpace(nil):load({ ["id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = observability_space_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "observability_space." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"observability_space.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/observability/spaces/{id}/activate\"}")
      print("LIVE STEP {\"id\":\"observability_space.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/observability/spaces/{id}\"}")
      print("LIVE STEP {\"id\":\"observability_space.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only observability_space.create.0 gives\"}")
      print("LIVE STEP {\"id\":\"observability_space.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/observability/spaces/{id}\"}")
      pending("Live coverage incomplete: observability_space.create.0 excluded (GET-only live run: needs POST /api/v1/observability/spaces/{id}/activate); observability_space.update.1 excluded (GET-only live run: needs PUT /api/v1/observability/spaces/{id}); observability_space.load.2 excluded (GET-only live run: reads a record only observability_space.create.0 gives); observability_space.remove.3 excluded (GET-only live run: needs DELETE /api/v1/observability/spaces/{id})")
      return
    end

    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local observability_space_ref01_ent = client:ObservabilitySpace(nil)
    local observability_space_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.observability_space"), "observability_space_ref01"))

    local observability_space_ref01_data_result, err = observability_space_ref01_ent:create(observability_space_ref01_data, nil)
    assert.is_nil(err)
    observability_space_ref01_data = helpers.to_map(type(observability_space_ref01_data_result) == 'table' and observability_space_ref01_data_result.data_get and observability_space_ref01_data_result:data_get() or observability_space_ref01_data_result)
    assert.is_not_nil(observability_space_ref01_data)
    assert.is_not_nil(observability_space_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local observability_space_ref01_data_up0_up = {
      id = observability_space_ref01_data["id"],
    }

    local observability_space_ref01_resdata_up0_result, err = observability_space_ref01_ent:update(observability_space_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local observability_space_ref01_resdata_up0 = helpers.to_map(type(observability_space_ref01_resdata_up0_result) == 'table' and observability_space_ref01_resdata_up0_result.data_get and observability_space_ref01_resdata_up0_result:data_get() or observability_space_ref01_resdata_up0_result)
    assert.is_not_nil(observability_space_ref01_resdata_up0)
    if not setup.live then
      assert.is_true(runner.live_same_id(observability_space_ref01_resdata_up0["id"], observability_space_ref01_data_up0_up["id"]))
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local observability_space_ref01_match_dt0 = {
      id = observability_space_ref01_data["id"],
    }
    local observability_space_ref01_data_dt0_loaded, err = observability_space_ref01_ent:load(observability_space_ref01_match_dt0, nil)
    assert.is_nil(err)
    local observability_space_ref01_data_dt0_load_result = helpers.to_map(type(observability_space_ref01_data_dt0_loaded) == 'table' and observability_space_ref01_data_dt0_loaded.data_get and observability_space_ref01_data_dt0_loaded:data_get() or observability_space_ref01_data_dt0_loaded)
    assert.is_not_nil(observability_space_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(observability_space_ref01_data_dt0_load_result["id"], observability_space_ref01_data["id"]))
    end

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local observability_space_ref01_match_rm0 = {
      id = observability_space_ref01_data["id"],
    }
    local _, err = observability_space_ref01_ent:remove(observability_space_ref01_match_rm0, nil)
    assert.is_nil(err)

  end)
end)

function observability_space_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/observability_space/ObservabilitySpaceTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read observability_space test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "observability_space01", "observability_space02", "observability_space03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_OBSERVABILITY_SPACE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_OBSERVABILITY_SPACE_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_OBSERVABILITY_SPACE_ENTID"])
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
