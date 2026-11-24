-- RoderCodeRepairSetting entity test

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


describe("RoderCodeRepairSettingEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:RoderCodeRepairSetting(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:RoderCodeRepairSetting(nil):load({ ["organization_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = roder_code_repair_setting_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "roder_code_repair_setting." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"roder_code_repair_setting.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/agent/roder/code_repair_settings\"}")
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local roder_code_repair_setting_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.roder_code_repair_setting")))
    local roder_code_repair_setting_ref01_data = nil
    if #roder_code_repair_setting_ref01_data_raw > 0 then
      roder_code_repair_setting_ref01_data = helpers.to_map(roder_code_repair_setting_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local roder_code_repair_setting_ref01_ent = client:RoderCodeRepairSetting(nil)
    local roder_code_repair_setting_ref01_match_dt0 = {}
    local roder_code_repair_setting_ref01_data_dt0_loaded, err = roder_code_repair_setting_ref01_ent:load(roder_code_repair_setting_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(roder_code_repair_setting_ref01_data_dt0_loaded)

      return
    end

    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local roder_code_repair_setting_ref01_ent = client:RoderCodeRepairSetting(nil)
    local roder_code_repair_setting_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.roder_code_repair_setting"), "roder_code_repair_setting_ref01"))

    local roder_code_repair_setting_ref01_data_result, err = roder_code_repair_setting_ref01_ent:create(roder_code_repair_setting_ref01_data, nil)
    assert.is_nil(err)
    roder_code_repair_setting_ref01_data = helpers.to_map(type(roder_code_repair_setting_ref01_data_result) == 'table' and roder_code_repair_setting_ref01_data_result.data_get and roder_code_repair_setting_ref01_data_result:data_get() or roder_code_repair_setting_ref01_data_result)
    assert.is_not_nil(roder_code_repair_setting_ref01_data)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local roder_code_repair_setting_ref01_match_dt0 = {}
    local roder_code_repair_setting_ref01_data_dt0_loaded, err = roder_code_repair_setting_ref01_ent:load(roder_code_repair_setting_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(roder_code_repair_setting_ref01_data_dt0_loaded)

  end)
end)

function roder_code_repair_setting_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/roder_code_repair_setting/RoderCodeRepairSettingTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read roder_code_repair_setting test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "roder_code_repair_setting01", "roder_code_repair_setting02", "roder_code_repair_setting03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_RODER_CODE_REPAIR_SETTING_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_RODER_CODE_REPAIR_SETTING_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_RODER_CODE_REPAIR_SETTING_ENTID"])
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
