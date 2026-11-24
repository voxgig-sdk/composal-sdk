-- AuthPasswordReset entity test

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


describe("AuthPasswordResetEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:AuthPasswordReset(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:AuthPasswordReset(nil):create({ ["email"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = auth_password_reset_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "auth_password_reset." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"auth_password_reset.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/auth/password_resets\"}")
      print("LIVE STEP {\"id\":\"auth_password_reset.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/auth/password_resets\"}")
      pending("Live coverage incomplete: auth_password_reset.create.0 excluded (GET-only live run: needs POST /api/v1/auth/password_resets); auth_password_reset.update.1 excluded (GET-only live run: needs PATCH /api/v1/auth/password_resets)")
      return
    end

    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local auth_password_reset_ref01_ent = client:AuthPasswordReset(nil)
    local auth_password_reset_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.auth_password_reset"), "auth_password_reset_ref01"))

    local auth_password_reset_ref01_data_result, err = auth_password_reset_ref01_ent:create(auth_password_reset_ref01_data, nil)
    assert.is_nil(err)
    auth_password_reset_ref01_data = helpers.to_map(type(auth_password_reset_ref01_data_result) == 'table' and auth_password_reset_ref01_data_result.data_get and auth_password_reset_ref01_data_result:data_get() or auth_password_reset_ref01_data_result)
    assert.is_not_nil(auth_password_reset_ref01_data)

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local auth_password_reset_ref01_data_up0_up = {
    }

    local auth_password_reset_ref01_markdef_up0_name = "email"
    local auth_password_reset_ref01_markdef_up0_value = "Mark01-auth_password_reset_ref01_" .. tostring(setup.now)
    auth_password_reset_ref01_data_up0_up[auth_password_reset_ref01_markdef_up0_name] = auth_password_reset_ref01_markdef_up0_value

    local auth_password_reset_ref01_resdata_up0_result, err = auth_password_reset_ref01_ent:update(auth_password_reset_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local auth_password_reset_ref01_resdata_up0 = helpers.to_map(type(auth_password_reset_ref01_resdata_up0_result) == 'table' and auth_password_reset_ref01_resdata_up0_result.data_get and auth_password_reset_ref01_resdata_up0_result:data_get() or auth_password_reset_ref01_resdata_up0_result)
    assert.is_not_nil(auth_password_reset_ref01_resdata_up0)
    assert.are.equal(auth_password_reset_ref01_resdata_up0[auth_password_reset_ref01_markdef_up0_name], auth_password_reset_ref01_markdef_up0_value)

  end)
end)

function auth_password_reset_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/auth_password_reset/AuthPasswordResetTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read auth_password_reset test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "auth_password_reset01", "auth_password_reset02", "auth_password_reset03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID"])
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
