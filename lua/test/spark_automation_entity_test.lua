-- SparkAutomation entity test

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


describe("SparkAutomationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:SparkAutomation(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:SparkAutomation(nil):list({ ["agent_id"] = 1, ["organization_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = spark_automation_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "spark_automation." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"spark_automation.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}\"}")
    if setup.live then
      for _, _live_key in ipairs({"agent01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_SPARK_AUTOMATION_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["spark_automation01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "spark_automation", function()
        return client:SparkAutomation(nil):list({["agent_id"] = setup.idmap["agent01"], ["organization_id"] = setup.idmap["organization01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local spark_automation_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.spark_automation")))
    local spark_automation_ref01_data = nil
    if #spark_automation_ref01_data_raw > 0 then
      spark_automation_ref01_data = helpers.to_map(spark_automation_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local spark_automation_ref01_ent = client:SparkAutomation(nil)
    local spark_automation_ref01_match = {
      ["agent_id"] = setup.idmap["agent01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local spark_automation_ref01_list_result, err = spark_automation_ref01_ent:list(spark_automation_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(spark_automation_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local spark_automation_ref01_match_dt0 = {
      id = spark_automation_ref01_data["id"],
    }
    spark_automation_ref01_match_dt0["agent_id"] = setup.idmap["agent_id"] or setup.idmap["agent01"]
    spark_automation_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local spark_automation_ref01_data_dt0_loaded, err = spark_automation_ref01_ent:load(spark_automation_ref01_match_dt0, nil)
    assert.is_nil(err)
    local spark_automation_ref01_data_dt0_load_result = helpers.to_map(type(spark_automation_ref01_data_dt0_loaded) == 'table' and spark_automation_ref01_data_dt0_loaded.data_get and spark_automation_ref01_data_dt0_loaded:data_get() or spark_automation_ref01_data_dt0_loaded)
    assert.is_not_nil(spark_automation_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(spark_automation_ref01_data_dt0_load_result["id"], spark_automation_ref01_data["id"]))

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"agent01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_SPARK_AUTOMATION_ENTID")
        end
      end
    end
    if setup.live then
      runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: " .. "the flow updates a spark_automation record it did not create")
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local spark_automation_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.spark_automation")))
    local spark_automation_ref01_data = nil
    if #spark_automation_ref01_data_raw > 0 then
      spark_automation_ref01_data = helpers.to_map(spark_automation_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local spark_automation_ref01_ent = client:SparkAutomation(nil)
    local spark_automation_ref01_match = {
      ["agent_id"] = setup.idmap["agent01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local spark_automation_ref01_list_result, err = spark_automation_ref01_ent:list(spark_automation_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(spark_automation_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local spark_automation_ref01_data_up0_up = {
      id = spark_automation_ref01_data["id"],
      ["agent_id"] = setup.idmap["agent_id"],
      ["organization_id"] = setup.idmap["organization_id"],
    }

    local spark_automation_ref01_markdef_up0_name = "key"
    local spark_automation_ref01_markdef_up0_value = "Mark01-spark_automation_ref01_" .. tostring(setup.now)
    spark_automation_ref01_data_up0_up[spark_automation_ref01_markdef_up0_name] = spark_automation_ref01_markdef_up0_value

    local spark_automation_ref01_resdata_up0_result, err = spark_automation_ref01_ent:update(spark_automation_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local spark_automation_ref01_resdata_up0 = helpers.to_map(type(spark_automation_ref01_resdata_up0_result) == 'table' and spark_automation_ref01_resdata_up0_result.data_get and spark_automation_ref01_resdata_up0_result:data_get() or spark_automation_ref01_resdata_up0_result)
    assert.is_not_nil(spark_automation_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(spark_automation_ref01_resdata_up0["id"], spark_automation_ref01_data_up0_up["id"]))
    assert.are.equal(spark_automation_ref01_resdata_up0[spark_automation_ref01_markdef_up0_name], spark_automation_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local spark_automation_ref01_match_dt0 = {
      id = spark_automation_ref01_data["id"],
    }
    spark_automation_ref01_match_dt0["agent_id"] = setup.idmap["agent_id"] or setup.idmap["agent01"]
    spark_automation_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local spark_automation_ref01_data_dt0_loaded, err = spark_automation_ref01_ent:load(spark_automation_ref01_match_dt0, nil)
    assert.is_nil(err)
    local spark_automation_ref01_data_dt0_load_result = helpers.to_map(type(spark_automation_ref01_data_dt0_loaded) == 'table' and spark_automation_ref01_data_dt0_loaded.data_get and spark_automation_ref01_data_dt0_loaded:data_get() or spark_automation_ref01_data_dt0_loaded)
    assert.is_not_nil(spark_automation_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(spark_automation_ref01_data_dt0_load_result["id"], spark_automation_ref01_data["id"]))

  end)
end)

function spark_automation_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/spark_automation/SparkAutomationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read spark_automation test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "spark_automation01", "spark_automation02", "spark_automation03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_SPARK_AUTOMATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_SPARK_AUTOMATION_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_SPARK_AUTOMATION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["agent_id"] == nil then
    idmap_resolved["agent_id"] = idmap_resolved["agent01"]
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
