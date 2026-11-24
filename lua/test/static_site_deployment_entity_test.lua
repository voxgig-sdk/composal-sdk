-- StaticSiteDeployment entity test

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


describe("StaticSiteDeploymentEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:StaticSiteDeployment(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:StaticSiteDeployment(nil):list({ ["static_site_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = static_site_deployment_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "static_site_deployment." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"static_site_deployment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/static_sites/{static_site_id}/deployments/{id}/activate\"}")
    if setup.live then
      for _, _live_key in ipairs({"static_site01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["static_site_deployment01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "static_site_deployment", function()
        return client:StaticSiteDeployment(nil):list({["static_site_id"] = setup.idmap["static_site01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local static_site_deployment_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.static_site_deployment")))
    local static_site_deployment_ref01_data = nil
    if #static_site_deployment_ref01_data_raw > 0 then
      static_site_deployment_ref01_data = helpers.to_map(static_site_deployment_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local static_site_deployment_ref01_ent = client:StaticSiteDeployment(nil)
    local static_site_deployment_ref01_match = {
      ["static_site_id"] = setup.idmap["static_site01"],
    }

    local static_site_deployment_ref01_list_result, err = static_site_deployment_ref01_ent:list(static_site_deployment_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(static_site_deployment_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local static_site_deployment_ref01_match_dt0 = {
      id = static_site_deployment_ref01_data["id"],
    }
    do
      local own = static_site_deployment_ref01_data["static_site_id"]
      if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
        static_site_deployment_ref01_match_dt0["static_site_id"] = own
      else
        static_site_deployment_ref01_match_dt0["static_site_id"] = setup.idmap["static_site_id"] or setup.idmap["static_site01"]
      end
    end
    local static_site_deployment_ref01_data_dt0_loaded, err = static_site_deployment_ref01_ent:load(static_site_deployment_ref01_match_dt0, nil)
    assert.is_nil(err)
    local static_site_deployment_ref01_data_dt0_load_result = helpers.to_map(type(static_site_deployment_ref01_data_dt0_loaded) == 'table' and static_site_deployment_ref01_data_dt0_loaded.data_get and static_site_deployment_ref01_data_dt0_loaded:data_get() or static_site_deployment_ref01_data_dt0_loaded)
    assert.is_not_nil(static_site_deployment_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(static_site_deployment_ref01_data_dt0_load_result["id"], static_site_deployment_ref01_data["id"]))

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"static_site01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local static_site_deployment_ref01_ent = client:StaticSiteDeployment(nil)
    local static_site_deployment_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.static_site_deployment"), "static_site_deployment_ref01"))
    static_site_deployment_ref01_data["static_site_id"] = setup.idmap["static_site01"]

    local static_site_deployment_ref01_data_result, err = static_site_deployment_ref01_ent:create(static_site_deployment_ref01_data, nil)
    assert.is_nil(err)
    static_site_deployment_ref01_data = helpers.to_map(type(static_site_deployment_ref01_data_result) == 'table' and static_site_deployment_ref01_data_result.data_get and static_site_deployment_ref01_data_result:data_get() or static_site_deployment_ref01_data_result)
    assert.is_not_nil(static_site_deployment_ref01_data)
    assert.is_not_nil(static_site_deployment_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local static_site_deployment_ref01_match = {
      ["static_site_id"] = setup.idmap["static_site01"],
    }

    local static_site_deployment_ref01_list_result, err = static_site_deployment_ref01_ent:list(static_site_deployment_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(static_site_deployment_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(static_site_deployment_ref01_list_result),
      { id = static_site_deployment_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local static_site_deployment_ref01_match_dt0 = {
      id = static_site_deployment_ref01_data["id"],
    }
    do
      local own = static_site_deployment_ref01_data["static_site_id"]
      if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
        static_site_deployment_ref01_match_dt0["static_site_id"] = own
      else
        static_site_deployment_ref01_match_dt0["static_site_id"] = setup.idmap["static_site_id"] or setup.idmap["static_site01"]
      end
    end
    local static_site_deployment_ref01_data_dt0_loaded, err = static_site_deployment_ref01_ent:load(static_site_deployment_ref01_match_dt0, nil)
    assert.is_nil(err)
    local static_site_deployment_ref01_data_dt0_load_result = helpers.to_map(type(static_site_deployment_ref01_data_dt0_loaded) == 'table' and static_site_deployment_ref01_data_dt0_loaded.data_get and static_site_deployment_ref01_data_dt0_loaded:data_get() or static_site_deployment_ref01_data_dt0_loaded)
    assert.is_not_nil(static_site_deployment_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(static_site_deployment_ref01_data_dt0_load_result["id"], static_site_deployment_ref01_data["id"]))

  end)
end)

function static_site_deployment_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/static_site_deployment/StaticSiteDeploymentTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read static_site_deployment test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "static_site_deployment01", "static_site_deployment02", "static_site_deployment03", "static_site01", "static_site02", "static_site03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID"])
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
