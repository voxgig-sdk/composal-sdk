-- AgentConnectionTriggerSubscription entity test

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


describe("AgentConnectionTriggerSubscriptionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:AgentConnectionTriggerSubscription(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:AgentConnectionTriggerSubscription(nil):list({ ["agent_connection_id"] = 1, ["organization_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = agent_connection_trigger_subscription_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "agent_connection_trigger_subscription." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"agent_connection_trigger_subscription.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover\"}")
      print("LIVE STEP {\"id\":\"agent_connection_trigger_subscription.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}\"}")
      print("LIVE STEP {\"id\":\"agent_connection_trigger_subscription.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}\"}")
      print("LIVE STEP {\"id\":\"agent_connection_trigger_subscription.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"agent_connection01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local agent_connection_trigger_subscription_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.agent_connection_trigger_subscription")))
    local agent_connection_trigger_subscription_ref01_data = nil
    if #agent_connection_trigger_subscription_ref01_data_raw > 0 then
      agent_connection_trigger_subscription_ref01_data = helpers.to_map(agent_connection_trigger_subscription_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local agent_connection_trigger_subscription_ref01_ent = client:AgentConnectionTriggerSubscription(nil)
    local agent_connection_trigger_subscription_ref01_match = {
      ["agent_connection_id"] = setup.idmap["agent_connection01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local agent_connection_trigger_subscription_ref01_list_result, err = agent_connection_trigger_subscription_ref01_ent:list(agent_connection_trigger_subscription_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(agent_connection_trigger_subscription_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"agent_connection01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local agent_connection_trigger_subscription_ref01_ent = client:AgentConnectionTriggerSubscription(nil)
    local agent_connection_trigger_subscription_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.agent_connection_trigger_subscription"), "agent_connection_trigger_subscription_ref01"))
    agent_connection_trigger_subscription_ref01_data["agent_connection_id"] = setup.idmap["agent_connection01"]
    agent_connection_trigger_subscription_ref01_data["organization_id"] = setup.idmap["organization01"]

    local agent_connection_trigger_subscription_ref01_data_result, err = agent_connection_trigger_subscription_ref01_ent:create(agent_connection_trigger_subscription_ref01_data, nil)
    assert.is_nil(err)
    agent_connection_trigger_subscription_ref01_data = helpers.to_map(type(agent_connection_trigger_subscription_ref01_data_result) == 'table' and agent_connection_trigger_subscription_ref01_data_result.data_get and agent_connection_trigger_subscription_ref01_data_result:data_get() or agent_connection_trigger_subscription_ref01_data_result)
    assert.is_not_nil(agent_connection_trigger_subscription_ref01_data)
    assert.is_not_nil(agent_connection_trigger_subscription_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local agent_connection_trigger_subscription_ref01_match = {
      ["agent_connection_id"] = setup.idmap["agent_connection01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local agent_connection_trigger_subscription_ref01_list_result, err = agent_connection_trigger_subscription_ref01_ent:list(agent_connection_trigger_subscription_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(agent_connection_trigger_subscription_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(agent_connection_trigger_subscription_ref01_list_result),
      { id = agent_connection_trigger_subscription_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local agent_connection_trigger_subscription_ref01_data_up0_up = {
      id = agent_connection_trigger_subscription_ref01_data["id"],
      ["agent_connection_id"] = setup.idmap["agent_connection_id"],
      ["organization_id"] = setup.idmap["organization_id"],
    }

    local agent_connection_trigger_subscription_ref01_markdef_up0_name = "created_at"
    local agent_connection_trigger_subscription_ref01_markdef_up0_value = "Mark01-agent_connection_trigger_subscription_ref01_" .. tostring(setup.now)
    agent_connection_trigger_subscription_ref01_data_up0_up[agent_connection_trigger_subscription_ref01_markdef_up0_name] = agent_connection_trigger_subscription_ref01_markdef_up0_value

    local agent_connection_trigger_subscription_ref01_resdata_up0_result, err = agent_connection_trigger_subscription_ref01_ent:update(agent_connection_trigger_subscription_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local agent_connection_trigger_subscription_ref01_resdata_up0 = helpers.to_map(type(agent_connection_trigger_subscription_ref01_resdata_up0_result) == 'table' and agent_connection_trigger_subscription_ref01_resdata_up0_result.data_get and agent_connection_trigger_subscription_ref01_resdata_up0_result:data_get() or agent_connection_trigger_subscription_ref01_resdata_up0_result)
    assert.is_not_nil(agent_connection_trigger_subscription_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(agent_connection_trigger_subscription_ref01_resdata_up0["id"], agent_connection_trigger_subscription_ref01_data_up0_up["id"]))
    assert.are.equal(agent_connection_trigger_subscription_ref01_resdata_up0[agent_connection_trigger_subscription_ref01_markdef_up0_name], agent_connection_trigger_subscription_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local agent_connection_trigger_subscription_ref01_match_rm0 = {
      id = agent_connection_trigger_subscription_ref01_data["id"],
    }
    agent_connection_trigger_subscription_ref01_match_rm0["agent_connection_id"] = setup.idmap["agent_connection_id"] or setup.idmap["agent_connection01"]
    agent_connection_trigger_subscription_ref01_match_rm0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local _, err = agent_connection_trigger_subscription_ref01_ent:remove(agent_connection_trigger_subscription_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local agent_connection_trigger_subscription_ref01_match_rt0 = {
      ["agent_connection_id"] = setup.idmap["agent_connection01"],
      ["organization_id"] = setup.idmap["organization01"],
    }

    local agent_connection_trigger_subscription_ref01_list_rt0_result, err = agent_connection_trigger_subscription_ref01_ent:list(agent_connection_trigger_subscription_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(agent_connection_trigger_subscription_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(agent_connection_trigger_subscription_ref01_list_rt0_result),
      { id = agent_connection_trigger_subscription_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function agent_connection_trigger_subscription_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/agent_connection_trigger_subscription/AgentConnectionTriggerSubscriptionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read agent_connection_trigger_subscription test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "agent_connection_trigger_subscription01", "agent_connection_trigger_subscription02", "agent_connection_trigger_subscription03", "organization01", "organization02", "organization03", "agent_connection01", "agent_connection02", "agent_connection03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["agent_connection_id"] == nil then
    idmap_resolved["agent_connection_id"] = idmap_resolved["agent_connection01"]
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
