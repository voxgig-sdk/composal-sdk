-- DeviceOperation entity test

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


describe("DeviceOperationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:DeviceOperation(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:DeviceOperation(nil):load({ ["device_id"] = 1, ["id"] = "x", ["organization_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = device_operation_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "device_operation." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"device_operation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_operations\"}")
      print("LIVE STEP {\"id\":\"device_operation.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only device_operation.create.0 gives\"}")
      pending("Live coverage incomplete: device_operation.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_operations); device_operation.load.1 excluded (GET-only live run: reads a record only device_operation.create.0 gives)")
      return
    end

    if setup.live then
      for _, _live_key in ipairs({"device01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_DEVICE_OPERATION_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local device_operation_ref01_ent = client:DeviceOperation(nil)
    local device_operation_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.device_operation"), "device_operation_ref01"))
    device_operation_ref01_data["device_id"] = setup.idmap["device01"]
    device_operation_ref01_data["organization_id"] = setup.idmap["organization01"]

    local device_operation_ref01_data_result, err = device_operation_ref01_ent:create(device_operation_ref01_data, nil)
    assert.is_nil(err)
    device_operation_ref01_data = helpers.to_map(type(device_operation_ref01_data_result) == 'table' and device_operation_ref01_data_result.data_get and device_operation_ref01_data_result:data_get() or device_operation_ref01_data_result)
    assert.is_not_nil(device_operation_ref01_data)
    assert.is_not_nil(device_operation_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local device_operation_ref01_match_dt0 = {
      id = device_operation_ref01_data["id"],
    }
    do
      local own = device_operation_ref01_data["device_id"]
      if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
        device_operation_ref01_match_dt0["device_id"] = own
      else
        device_operation_ref01_match_dt0["device_id"] = setup.idmap["device_id"] or setup.idmap["device01"]
      end
    end
    device_operation_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local device_operation_ref01_data_dt0_loaded, err = device_operation_ref01_ent:load(device_operation_ref01_match_dt0, nil)
    assert.is_nil(err)
    local device_operation_ref01_data_dt0_load_result = helpers.to_map(type(device_operation_ref01_data_dt0_loaded) == 'table' and device_operation_ref01_data_dt0_loaded.data_get and device_operation_ref01_data_dt0_loaded:data_get() or device_operation_ref01_data_dt0_loaded)
    assert.is_not_nil(device_operation_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(device_operation_ref01_data_dt0_load_result["id"], device_operation_ref01_data["id"]))

  end)
end)

function device_operation_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/device_operation/DeviceOperationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read device_operation test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "device_operation01", "device_operation02", "device_operation03", "organization01", "organization02", "organization03", "device01", "device02", "device03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_DEVICE_OPERATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_DEVICE_OPERATION_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_DEVICE_OPERATION_ENTID"])
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
