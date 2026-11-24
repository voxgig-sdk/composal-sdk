-- LocalThreadDelivery entity test

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


describe("LocalThreadDeliveryEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:LocalThreadDelivery(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:LocalThreadDelivery(nil):load({ ["agent_id"] = 1, ["id"] = "x", ["local_thread_id"] = "x", ["organization_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = local_thread_delivery_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "local_thread_delivery." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"local_thread_delivery.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}\"}")
    if setup.live then
      for _, _live_key in ipairs({"agent01", "local_thread_delivery01", "local_thread01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      runner.live_existing(pending, setup, LIVE_STRICT, "local_thread_delivery", function()
        return { { id = setup.idmap["local_thread_delivery01"] } }
      end, "id", setup.idmap["local_thread_delivery01"])
    end

    -- Bootstrap entity data from existing test data.
    local local_thread_delivery_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.local_thread_delivery")))
    local local_thread_delivery_ref01_data = nil
    if #local_thread_delivery_ref01_data_raw > 0 then
      local_thread_delivery_ref01_data = helpers.to_map(local_thread_delivery_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local local_thread_delivery_ref01_ent = client:LocalThreadDelivery(nil)
    local local_thread_delivery_ref01_match_dt0 = {
      id = local_thread_delivery_ref01_data["id"],
    }
    local_thread_delivery_ref01_match_dt0["agent_id"] = setup.idmap["agent_id"] or setup.idmap["agent01"]
    local_thread_delivery_ref01_match_dt0["local_thread_id"] = setup.idmap["local_thread_id"] or setup.idmap["local_thread01"]
    local_thread_delivery_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local local_thread_delivery_ref01_data_dt0_loaded, err = local_thread_delivery_ref01_ent:load(local_thread_delivery_ref01_match_dt0, nil)
    assert.is_nil(err)
    local local_thread_delivery_ref01_data_dt0_load_result = helpers.to_map(type(local_thread_delivery_ref01_data_dt0_loaded) == 'table' and local_thread_delivery_ref01_data_dt0_loaded.data_get and local_thread_delivery_ref01_data_dt0_loaded:data_get() or local_thread_delivery_ref01_data_dt0_loaded)
    assert.is_not_nil(local_thread_delivery_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(local_thread_delivery_ref01_data_dt0_load_result["id"], local_thread_delivery_ref01_data["id"]))
    end

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"agent01", "local_thread01", "organization01", "local_thread_delivery01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID")
        end
      end
    end
    if setup.live then
      runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: " .. "the flow updates a local_thread_delivery record it did not create")
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local local_thread_delivery_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.local_thread_delivery")))
    local local_thread_delivery_ref01_data = nil
    if #local_thread_delivery_ref01_data_raw > 0 then
      local_thread_delivery_ref01_data = helpers.to_map(local_thread_delivery_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local local_thread_delivery_ref01_ent = client:LocalThreadDelivery(nil)
    local local_thread_delivery_ref01_data_up0_up = {
      id = local_thread_delivery_ref01_data["id"],
      ["agent_id"] = setup.idmap["agent_id"],
      ["local_thread_id"] = setup.idmap["local_thread_id"],
      ["organization_id"] = setup.idmap["organization_id"],
    }

    local local_thread_delivery_ref01_markdef_up0_name = "decision"
    local local_thread_delivery_ref01_markdef_up0_value = "Mark01-local_thread_delivery_ref01_" .. tostring(setup.now)
    local_thread_delivery_ref01_data_up0_up[local_thread_delivery_ref01_markdef_up0_name] = local_thread_delivery_ref01_markdef_up0_value

    local local_thread_delivery_ref01_resdata_up0_result, err = local_thread_delivery_ref01_ent:update(local_thread_delivery_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local local_thread_delivery_ref01_resdata_up0 = helpers.to_map(type(local_thread_delivery_ref01_resdata_up0_result) == 'table' and local_thread_delivery_ref01_resdata_up0_result.data_get and local_thread_delivery_ref01_resdata_up0_result:data_get() or local_thread_delivery_ref01_resdata_up0_result)
    assert.is_not_nil(local_thread_delivery_ref01_resdata_up0)
    if not setup.live then
      assert.is_true(runner.live_same_id(local_thread_delivery_ref01_resdata_up0["id"], local_thread_delivery_ref01_data_up0_up["id"]))
    end
    assert.are.equal(local_thread_delivery_ref01_resdata_up0[local_thread_delivery_ref01_markdef_up0_name], local_thread_delivery_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local local_thread_delivery_ref01_match_dt0 = {
      id = local_thread_delivery_ref01_data["id"],
    }
    local_thread_delivery_ref01_match_dt0["agent_id"] = setup.idmap["agent_id"] or setup.idmap["agent01"]
    local_thread_delivery_ref01_match_dt0["local_thread_id"] = setup.idmap["local_thread_id"] or setup.idmap["local_thread01"]
    local_thread_delivery_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local local_thread_delivery_ref01_data_dt0_loaded, err = local_thread_delivery_ref01_ent:load(local_thread_delivery_ref01_match_dt0, nil)
    assert.is_nil(err)
    local local_thread_delivery_ref01_data_dt0_load_result = helpers.to_map(type(local_thread_delivery_ref01_data_dt0_loaded) == 'table' and local_thread_delivery_ref01_data_dt0_loaded.data_get and local_thread_delivery_ref01_data_dt0_loaded:data_get() or local_thread_delivery_ref01_data_dt0_loaded)
    assert.is_not_nil(local_thread_delivery_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(local_thread_delivery_ref01_data_dt0_load_result["id"], local_thread_delivery_ref01_data["id"]))
    end

  end)
end)

function local_thread_delivery_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/local_thread_delivery/LocalThreadDeliveryTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read local_thread_delivery test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "local_thread_delivery01", "local_thread_delivery02", "local_thread_delivery03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03", "local_thread01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["agent_id"] == nil then
    idmap_resolved["agent_id"] = idmap_resolved["agent01"]
  end
  if idmap_resolved["local_thread_id"] == nil then
    idmap_resolved["local_thread_id"] = idmap_resolved["local_thread01"]
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
