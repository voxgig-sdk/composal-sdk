-- EnvironmentTestAccount entity test

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


describe("EnvironmentTestAccountEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:EnvironmentTestAccount(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:EnvironmentTestAccount(nil):list({ ["environment_id"] = 1, ["organization_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = environment_test_account_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "environment_test_account." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"environment_test_account.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}\"}")
    if setup.live then
      for _, _live_key in ipairs({"environment01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local environment_test_account_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.environment_test_account")))
    local environment_test_account_ref01_data = nil
    if #environment_test_account_ref01_data_raw > 0 then
      environment_test_account_ref01_data = helpers.to_map(environment_test_account_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local environment_test_account_ref01_ent = client:EnvironmentTestAccount(nil)
    local environment_test_account_ref01_match = {
      ["environment_id"] = setup.idmap["environment01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local environment_test_account_ref01_list_result, err = environment_test_account_ref01_ent:list(environment_test_account_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(environment_test_account_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"environment01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID")
        end
      end
    end
    if setup.live then
      runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: " .. "the flow updates a environment_test_account record it did not create")
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local environment_test_account_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.environment_test_account")))
    local environment_test_account_ref01_data = nil
    if #environment_test_account_ref01_data_raw > 0 then
      environment_test_account_ref01_data = helpers.to_map(environment_test_account_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local environment_test_account_ref01_ent = client:EnvironmentTestAccount(nil)
    local environment_test_account_ref01_match = {
      ["environment_id"] = setup.idmap["environment01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local environment_test_account_ref01_list_result, err = environment_test_account_ref01_ent:list(environment_test_account_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(environment_test_account_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local environment_test_account_ref01_data_up0_up = {
      id = environment_test_account_ref01_data["id"],
      ["environment_id"] = setup.idmap["environment_id"],
      ["organization_id"] = setup.idmap["organization_id"],
    }

    local environment_test_account_ref01_markdef_up0_name = "persona"
    local environment_test_account_ref01_markdef_up0_value = "Mark01-environment_test_account_ref01_" .. tostring(setup.now)
    environment_test_account_ref01_data_up0_up[environment_test_account_ref01_markdef_up0_name] = environment_test_account_ref01_markdef_up0_value

    local environment_test_account_ref01_resdata_up0_result, err = environment_test_account_ref01_ent:update(environment_test_account_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local environment_test_account_ref01_resdata_up0 = helpers.to_map(type(environment_test_account_ref01_resdata_up0_result) == 'table' and environment_test_account_ref01_resdata_up0_result.data_get and environment_test_account_ref01_resdata_up0_result:data_get() or environment_test_account_ref01_resdata_up0_result)
    assert.is_not_nil(environment_test_account_ref01_resdata_up0)
    if not setup.live then
      assert.is_true(runner.live_same_id(environment_test_account_ref01_resdata_up0["id"], environment_test_account_ref01_data_up0_up["id"]))
    end
    assert.are.equal(environment_test_account_ref01_resdata_up0[environment_test_account_ref01_markdef_up0_name], environment_test_account_ref01_markdef_up0_value)

  end)
end)

function environment_test_account_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/environment_test_account/EnvironmentTestAccountTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read environment_test_account test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "environment_test_account01", "environment_test_account02", "environment_test_account03", "organization01", "organization02", "organization03", "environment01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["environment_id"] == nil then
    idmap_resolved["environment_id"] = idmap_resolved["environment01"]
  end
  if idmap_resolved["organization_id"] == nil then
    idmap_resolved["organization_id"] = idmap_resolved["organization01"]
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
