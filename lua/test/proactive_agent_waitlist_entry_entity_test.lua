-- ProactiveAgentWaitlistEntry entity test

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


describe("ProactiveAgentWaitlistEntryEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ProactiveAgentWaitlistEntry(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:ProactiveAgentWaitlistEntry(nil):load({ ["id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = proactive_agent_waitlist_entry_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "proactive_agent_waitlist_entry." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"proactive_agent_waitlist_entry.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries\"}")
      print("LIVE STEP {\"id\":\"proactive_agent_waitlist_entry.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives\"}")
      pending("Live coverage incomplete: proactive_agent_waitlist_entry.create.0 excluded (GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries); proactive_agent_waitlist_entry.load.1 excluded (GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives)")
      return
    end

    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local proactive_agent_waitlist_entry_ref01_ent = client:ProactiveAgentWaitlistEntry(nil)
    local proactive_agent_waitlist_entry_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.proactive_agent_waitlist_entry"), "proactive_agent_waitlist_entry_ref01"))

    local proactive_agent_waitlist_entry_ref01_data_result, err = proactive_agent_waitlist_entry_ref01_ent:create(proactive_agent_waitlist_entry_ref01_data, nil)
    assert.is_nil(err)
    proactive_agent_waitlist_entry_ref01_data = helpers.to_map(type(proactive_agent_waitlist_entry_ref01_data_result) == 'table' and proactive_agent_waitlist_entry_ref01_data_result.data_get and proactive_agent_waitlist_entry_ref01_data_result:data_get() or proactive_agent_waitlist_entry_ref01_data_result)
    assert.is_not_nil(proactive_agent_waitlist_entry_ref01_data)
    assert.is_not_nil(proactive_agent_waitlist_entry_ref01_data["referral_code"])

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local proactive_agent_waitlist_entry_ref01_match_dt0 = {
      id = proactive_agent_waitlist_entry_ref01_data["referral_code"],
    }
    local proactive_agent_waitlist_entry_ref01_data_dt0_loaded, err = proactive_agent_waitlist_entry_ref01_ent:load(proactive_agent_waitlist_entry_ref01_match_dt0, nil)
    assert.is_nil(err)
    local proactive_agent_waitlist_entry_ref01_data_dt0_load_result = helpers.to_map(type(proactive_agent_waitlist_entry_ref01_data_dt0_loaded) == 'table' and proactive_agent_waitlist_entry_ref01_data_dt0_loaded.data_get and proactive_agent_waitlist_entry_ref01_data_dt0_loaded:data_get() or proactive_agent_waitlist_entry_ref01_data_dt0_loaded)
    assert.is_not_nil(proactive_agent_waitlist_entry_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(proactive_agent_waitlist_entry_ref01_data_dt0_load_result["referral_code"], proactive_agent_waitlist_entry_ref01_data["referral_code"]))

  end)
end)

function proactive_agent_waitlist_entry_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/proactive_agent_waitlist_entry/ProactiveAgentWaitlistEntryTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read proactive_agent_waitlist_entry test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  for _, rec in pairs(((entity_data["existing"] or {})["proactive_agent_waitlist_entry"]) or {}) do
    if type(rec) == "table" and rec["id"] ~= nil then
      rec["referral_code"] = rec["id"]
    end
  end

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "proactive_agent_waitlist_entry01", "proactive_agent_waitlist_entry02", "proactive_agent_waitlist_entry03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID"])
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
