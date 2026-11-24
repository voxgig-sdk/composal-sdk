-- ProjectEnvironment entity test

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


describe("ProjectEnvironmentEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ProjectEnvironment(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:ProjectEnvironment(nil):list({ ["organization_id"] = 1, ["project_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = project_environment_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "project_environment." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"project_environment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive\"}")
      print("LIVE STEP {\"id\":\"project_environment.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}\"}")
    if setup.live then
      for _, _live_key in ipairs({"organization01", "project01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["project_environment01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "project_environment", function()
        return client:ProjectEnvironment(nil):list({["organization_id"] = setup.idmap["organization01"], ["project_id"] = setup.idmap["project01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local project_environment_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.project_environment")))
    local project_environment_ref01_data = nil
    if #project_environment_ref01_data_raw > 0 then
      project_environment_ref01_data = helpers.to_map(project_environment_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local project_environment_ref01_ent = client:ProjectEnvironment(nil)
    local project_environment_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
      ["project_id"] = setup.idmap["project01"],
    }

    local project_environment_ref01_list_result, err = project_environment_ref01_ent:list(project_environment_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(project_environment_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local project_environment_ref01_match_dt0 = {
      id = project_environment_ref01_data["id"],
    }
    project_environment_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    do
      local own = project_environment_ref01_data["project_id"]
      if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
        project_environment_ref01_match_dt0["project_id"] = own
      else
        project_environment_ref01_match_dt0["project_id"] = setup.idmap["project_id"]
      end
    end
    local project_environment_ref01_data_dt0_loaded, err = project_environment_ref01_ent:load(project_environment_ref01_match_dt0, nil)
    assert.is_nil(err)
    local project_environment_ref01_data_dt0_load_result = helpers.to_map(type(project_environment_ref01_data_dt0_loaded) == 'table' and project_environment_ref01_data_dt0_loaded.data_get and project_environment_ref01_data_dt0_loaded:data_get() or project_environment_ref01_data_dt0_loaded)
    assert.is_not_nil(project_environment_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(project_environment_ref01_data_dt0_load_result["id"], project_environment_ref01_data["id"]))

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"organization01", "project01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local project_environment_ref01_ent = client:ProjectEnvironment(nil)
    local project_environment_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.project_environment"), "project_environment_ref01"))
    project_environment_ref01_data["organization_id"] = setup.idmap["organization01"]
    project_environment_ref01_data["project_id"] = setup.idmap["project01"]

    local project_environment_ref01_data_result, err = project_environment_ref01_ent:create(project_environment_ref01_data, nil)
    assert.is_nil(err)
    project_environment_ref01_data = helpers.to_map(type(project_environment_ref01_data_result) == 'table' and project_environment_ref01_data_result.data_get and project_environment_ref01_data_result:data_get() or project_environment_ref01_data_result)
    assert.is_not_nil(project_environment_ref01_data)
    assert.is_not_nil(project_environment_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local project_environment_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
      ["project_id"] = setup.idmap["project01"],
    }

    local project_environment_ref01_list_result, err = project_environment_ref01_ent:list(project_environment_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(project_environment_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(project_environment_ref01_list_result),
      { id = project_environment_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local project_environment_ref01_data_up0_up = {
      id = project_environment_ref01_data["id"],
      ["organization_id"] = setup.idmap["organization_id"],
      ["project_id"] = setup.idmap["project_id"],
    }

    local project_environment_ref01_markdef_up0_name = "allowed_actions"
    local project_environment_ref01_markdef_up0_value = "Mark01-project_environment_ref01_" .. tostring(setup.now)
    project_environment_ref01_data_up0_up[project_environment_ref01_markdef_up0_name] = project_environment_ref01_markdef_up0_value

    local project_environment_ref01_resdata_up0_result, err = project_environment_ref01_ent:update(project_environment_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local project_environment_ref01_resdata_up0 = helpers.to_map(type(project_environment_ref01_resdata_up0_result) == 'table' and project_environment_ref01_resdata_up0_result.data_get and project_environment_ref01_resdata_up0_result:data_get() or project_environment_ref01_resdata_up0_result)
    assert.is_not_nil(project_environment_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(project_environment_ref01_resdata_up0["id"], project_environment_ref01_data_up0_up["id"]))
    assert.are.equal(project_environment_ref01_resdata_up0[project_environment_ref01_markdef_up0_name], project_environment_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local project_environment_ref01_match_dt0 = {
      id = project_environment_ref01_data["id"],
    }
    project_environment_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    do
      local own = project_environment_ref01_data["project_id"]
      if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
        project_environment_ref01_match_dt0["project_id"] = own
      else
        project_environment_ref01_match_dt0["project_id"] = setup.idmap["project_id"]
      end
    end
    local project_environment_ref01_data_dt0_loaded, err = project_environment_ref01_ent:load(project_environment_ref01_match_dt0, nil)
    assert.is_nil(err)
    local project_environment_ref01_data_dt0_load_result = helpers.to_map(type(project_environment_ref01_data_dt0_loaded) == 'table' and project_environment_ref01_data_dt0_loaded.data_get and project_environment_ref01_data_dt0_loaded:data_get() or project_environment_ref01_data_dt0_loaded)
    assert.is_not_nil(project_environment_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(project_environment_ref01_data_dt0_load_result["id"], project_environment_ref01_data["id"]))

  end)
end)

function project_environment_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/project_environment/ProjectEnvironmentTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read project_environment test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "project_environment01", "project_environment02", "project_environment03", "organization01", "organization02", "organization03", "project01", "project02", "project03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["organization_id"] == nil then
    idmap_resolved["organization_id"] = idmap_resolved["organization01"]
  end
  if idmap_resolved["project_id"] == nil then
    idmap_resolved["project_id"] = idmap_resolved["project01"]
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
