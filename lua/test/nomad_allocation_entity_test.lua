-- NomadAllocation entity test

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


describe("NomadAllocationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:NomadAllocation(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:NomadAllocation(nil):load({ ["app_id"] = 1, ["id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = nomad_allocation_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "nomad_allocation." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _, _live_key in ipairs({"app01", "nomad_allocation01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_NOMAD_ALLOCATION_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      runner.live_existing(pending, setup, LIVE_STRICT, "nomad_allocation", function()
        return { { id = setup.idmap["nomad_allocation01"] } }
      end, "id", setup.idmap["nomad_allocation01"])
    end

    -- Bootstrap entity data from existing test data.
    local nomad_allocation_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.nomad_allocation")))
    local nomad_allocation_ref01_data = nil
    if #nomad_allocation_ref01_data_raw > 0 then
      nomad_allocation_ref01_data = helpers.to_map(nomad_allocation_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local nomad_allocation_ref01_ent = client:NomadAllocation(nil)
    local nomad_allocation_ref01_match_dt0 = {
      id = nomad_allocation_ref01_data["id"],
    }
    nomad_allocation_ref01_match_dt0["app_id"] = setup.idmap["app_id"] or setup.idmap["app01"]
    local nomad_allocation_ref01_data_dt0_loaded, err = nomad_allocation_ref01_ent:load(nomad_allocation_ref01_match_dt0, nil)
    assert.is_nil(err)
    local nomad_allocation_ref01_data_dt0_load_result = helpers.to_map(type(nomad_allocation_ref01_data_dt0_loaded) == 'table' and nomad_allocation_ref01_data_dt0_loaded.data_get and nomad_allocation_ref01_data_dt0_loaded:data_get() or nomad_allocation_ref01_data_dt0_loaded)
    assert.is_not_nil(nomad_allocation_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(nomad_allocation_ref01_data_dt0_load_result["id"], nomad_allocation_ref01_data["id"]))
    end

  end)
end)

function nomad_allocation_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/nomad_allocation/NomadAllocationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read nomad_allocation test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "nomad_allocation01", "nomad_allocation02", "nomad_allocation03", "app01", "app02", "app03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_NOMAD_ALLOCATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_NOMAD_ALLOCATION_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_NOMAD_ALLOCATION_ENTID"])
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
