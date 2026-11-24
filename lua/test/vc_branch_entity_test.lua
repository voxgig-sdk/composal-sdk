-- VcBranch entity test

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


describe("VcBranchEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:VcBranch(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:VcBranch(nil):list({ ["organization_id"] = 1, ["repo_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = vc_branch_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "vc_branch." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"vc_branch.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches\"}")
      print("LIVE STEP {\"id\":\"vc_branch.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches/{branch_name}\"}")
      print("LIVE STEP {\"id\":\"vc_branch.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"organization01", "repo01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_VC_BRANCH_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local vc_branch_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.vc_branch")))
    local vc_branch_ref01_data = nil
    if #vc_branch_ref01_data_raw > 0 then
      vc_branch_ref01_data = helpers.to_map(vc_branch_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local vc_branch_ref01_ent = client:VcBranch(nil)
    local vc_branch_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
      ["repo_id"] = setup.idmap["repo01"],
    }

    local vc_branch_ref01_list_result, err = vc_branch_ref01_ent:list(vc_branch_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(vc_branch_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"organization01", "repo01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_VC_BRANCH_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local vc_branch_ref01_ent = client:VcBranch(nil)
    local vc_branch_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.vc_branch"), "vc_branch_ref01"))
    vc_branch_ref01_data["organization_id"] = setup.idmap["organization01"]
    vc_branch_ref01_data["repo_id"] = setup.idmap["repo01"]

    local vc_branch_ref01_data_result, err = vc_branch_ref01_ent:create(vc_branch_ref01_data, nil)
    assert.is_nil(err)
    vc_branch_ref01_data = helpers.to_map(type(vc_branch_ref01_data_result) == 'table' and vc_branch_ref01_data_result.data_get and vc_branch_ref01_data_result:data_get() or vc_branch_ref01_data_result)
    assert.is_not_nil(vc_branch_ref01_data)
    assert.is_not_nil(vc_branch_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local vc_branch_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
      ["repo_id"] = setup.idmap["repo01"],
    }

    local vc_branch_ref01_list_result, err = vc_branch_ref01_ent:list(vc_branch_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(vc_branch_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(vc_branch_ref01_list_result),
      { id = vc_branch_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local vc_branch_ref01_match_rm0 = {
      id = vc_branch_ref01_data["id"],
    }
    vc_branch_ref01_match_rm0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    vc_branch_ref01_match_rm0["repo_id"] = setup.idmap["repo_id"] or setup.idmap["repo01"]
    local _, err = vc_branch_ref01_ent:remove(vc_branch_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local vc_branch_ref01_match_rt0 = {
      ["organization_id"] = setup.idmap["organization01"],
      ["repo_id"] = setup.idmap["repo01"],
    }

    local vc_branch_ref01_list_rt0_result, err = vc_branch_ref01_ent:list(vc_branch_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(vc_branch_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(vc_branch_ref01_list_rt0_result),
      { id = vc_branch_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function vc_branch_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/vc_branch/VcBranchTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read vc_branch test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "vc_branch01", "vc_branch02", "vc_branch03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_VC_BRANCH_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_VC_BRANCH_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_VC_BRANCH_ENTID"])
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
