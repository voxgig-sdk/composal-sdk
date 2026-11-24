-- ScenarioRunLesson entity test

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


describe("ScenarioRunLessonEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ScenarioRunLesson(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:ScenarioRunLesson(nil):create({ ["organization_id"] = 1, ["project_id"] = "x", ["run_id"] = "x", ["scenario_run_id"] = "x", ["finding"] = "x", ["workaround"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = scenario_run_lesson_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "scenario_run_lesson." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"scenario_run_lesson.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons\"}")
      pending("Live coverage incomplete: scenario_run_lesson.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons)")
      return
    end

    if setup.live then
      for _, _live_key in ipairs({"organization01", "project01", "run01", "scenario_run01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_SCENARIO_RUN_LESSON_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local scenario_run_lesson_ref01_ent = client:ScenarioRunLesson(nil)
    local scenario_run_lesson_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.scenario_run_lesson"), "scenario_run_lesson_ref01"))
    scenario_run_lesson_ref01_data["organization_id"] = setup.idmap["organization01"]
    scenario_run_lesson_ref01_data["project_id"] = setup.idmap["project01"]
    scenario_run_lesson_ref01_data["run_id"] = setup.idmap["run01"]
    scenario_run_lesson_ref01_data["scenario_run_id"] = setup.idmap["scenario_run01"]

    local scenario_run_lesson_ref01_data_result, err = scenario_run_lesson_ref01_ent:create(scenario_run_lesson_ref01_data, nil)
    assert.is_nil(err)
    scenario_run_lesson_ref01_data = helpers.to_map(type(scenario_run_lesson_ref01_data_result) == 'table' and scenario_run_lesson_ref01_data_result.data_get and scenario_run_lesson_ref01_data_result:data_get() or scenario_run_lesson_ref01_data_result)
    assert.is_not_nil(scenario_run_lesson_ref01_data)

  end)
end)

function scenario_run_lesson_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/scenario_run_lesson/ScenarioRunLessonTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read scenario_run_lesson test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "scenario_run_lesson01", "scenario_run_lesson02", "scenario_run_lesson03", "organization01", "organization02", "organization03", "project01", "project02", "project03", "run01", "scenario_run01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_SCENARIO_RUN_LESSON_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_SCENARIO_RUN_LESSON_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_SCENARIO_RUN_LESSON_ENTID"])
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
