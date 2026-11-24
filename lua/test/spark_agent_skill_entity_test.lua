-- SparkAgentSkill entity test

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


describe("SparkAgentSkillEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:SparkAgentSkill(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:SparkAgentSkill(nil):list({ ["agent_id"] = 1, ["organization_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = spark_agent_skill_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "spark_agent_skill." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"spark_agent_skill.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/skills\"}")
    if setup.live then
      for _, _live_key in ipairs({"agent01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_SPARK_AGENT_SKILL_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local spark_agent_skill_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.spark_agent_skill")))
    local spark_agent_skill_ref01_data = nil
    if #spark_agent_skill_ref01_data_raw > 0 then
      spark_agent_skill_ref01_data = helpers.to_map(spark_agent_skill_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local spark_agent_skill_ref01_ent = client:SparkAgentSkill(nil)
    local spark_agent_skill_ref01_match = {
      ["agent_id"] = setup.idmap["agent01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local spark_agent_skill_ref01_list_result, err = spark_agent_skill_ref01_ent:list(spark_agent_skill_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(spark_agent_skill_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"agent01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_SPARK_AGENT_SKILL_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local spark_agent_skill_ref01_ent = client:SparkAgentSkill(nil)
    local spark_agent_skill_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.spark_agent_skill"), "spark_agent_skill_ref01"))
    spark_agent_skill_ref01_data["agent_id"] = setup.idmap["agent01"]
    spark_agent_skill_ref01_data["organization_id"] = setup.idmap["organization01"]

    local spark_agent_skill_ref01_data_result, err = spark_agent_skill_ref01_ent:create(spark_agent_skill_ref01_data, nil)
    assert.is_nil(err)
    spark_agent_skill_ref01_data = helpers.to_map(type(spark_agent_skill_ref01_data_result) == 'table' and spark_agent_skill_ref01_data_result.data_get and spark_agent_skill_ref01_data_result:data_get() or spark_agent_skill_ref01_data_result)
    assert.is_not_nil(spark_agent_skill_ref01_data)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local spark_agent_skill_ref01_match = {
      ["agent_id"] = setup.idmap["agent01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local spark_agent_skill_ref01_list_result, err = spark_agent_skill_ref01_ent:list(spark_agent_skill_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(spark_agent_skill_ref01_list_result)

  end)
end)

function spark_agent_skill_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/spark_agent_skill/SparkAgentSkillTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read spark_agent_skill test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "spark_agent_skill01", "spark_agent_skill02", "spark_agent_skill03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_SPARK_AGENT_SKILL_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_SPARK_AGENT_SKILL_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_SPARK_AGENT_SKILL_ENTID"])
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
