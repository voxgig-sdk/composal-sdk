-- SandboxIntegration entity test

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


describe("SandboxIntegrationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:SandboxIntegration(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:SandboxIntegration(nil):list({ ["organization_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = sandbox_integration_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "sandbox_integration." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"sandbox_integration.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/sandbox_integrations\"}")
      print("LIVE STEP {\"id\":\"sandbox_integration.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/sandbox_integrations/{id}\"}")
    if setup.live then
      for _, _live_key in ipairs({"organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local sandbox_integration_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.sandbox_integration")))
    local sandbox_integration_ref01_data = nil
    if #sandbox_integration_ref01_data_raw > 0 then
      sandbox_integration_ref01_data = helpers.to_map(sandbox_integration_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local sandbox_integration_ref01_ent = client:SandboxIntegration(nil)
    local sandbox_integration_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
    }

    local sandbox_integration_ref01_list_result, err = sandbox_integration_ref01_ent:list(sandbox_integration_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(sandbox_integration_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local sandbox_integration_ref01_ent = client:SandboxIntegration(nil)
    local sandbox_integration_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.sandbox_integration"), "sandbox_integration_ref01"))
    sandbox_integration_ref01_data["organization_id"] = setup.idmap["organization01"]

    local sandbox_integration_ref01_data_result, err = sandbox_integration_ref01_ent:create(sandbox_integration_ref01_data, nil)
    assert.is_nil(err)
    sandbox_integration_ref01_data = helpers.to_map(type(sandbox_integration_ref01_data_result) == 'table' and sandbox_integration_ref01_data_result.data_get and sandbox_integration_ref01_data_result:data_get() or sandbox_integration_ref01_data_result)
    assert.is_not_nil(sandbox_integration_ref01_data)
    assert.is_not_nil(sandbox_integration_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local sandbox_integration_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
    }

    local sandbox_integration_ref01_list_result, err = sandbox_integration_ref01_ent:list(sandbox_integration_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(sandbox_integration_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(sandbox_integration_ref01_list_result),
      { id = sandbox_integration_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local sandbox_integration_ref01_data_up0_up = {
      id = sandbox_integration_ref01_data["id"],
      ["organization_id"] = setup.idmap["organization_id"],
    }

    local sandbox_integration_ref01_markdef_up0_name = "name"
    local sandbox_integration_ref01_markdef_up0_value = "Mark01-sandbox_integration_ref01_" .. tostring(setup.now)
    sandbox_integration_ref01_data_up0_up[sandbox_integration_ref01_markdef_up0_name] = sandbox_integration_ref01_markdef_up0_value

    local sandbox_integration_ref01_resdata_up0_result, err = sandbox_integration_ref01_ent:update(sandbox_integration_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local sandbox_integration_ref01_resdata_up0 = helpers.to_map(type(sandbox_integration_ref01_resdata_up0_result) == 'table' and sandbox_integration_ref01_resdata_up0_result.data_get and sandbox_integration_ref01_resdata_up0_result:data_get() or sandbox_integration_ref01_resdata_up0_result)
    assert.is_not_nil(sandbox_integration_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(sandbox_integration_ref01_resdata_up0["id"], sandbox_integration_ref01_data_up0_up["id"]))
    assert.are.equal(sandbox_integration_ref01_resdata_up0[sandbox_integration_ref01_markdef_up0_name], sandbox_integration_ref01_markdef_up0_value)

  end)
end)

function sandbox_integration_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/sandbox_integration/SandboxIntegrationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read sandbox_integration test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "sandbox_integration01", "sandbox_integration02", "sandbox_integration03", "organization01", "organization02", "organization03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_SANDBOX_INTEGRATION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
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
