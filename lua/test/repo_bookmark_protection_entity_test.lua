-- RepoBookmarkProtection entity test

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


describe("RepoBookmarkProtectionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:RepoBookmarkProtection(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:RepoBookmarkProtection(nil):list({ ["organization_id"] = 1, ["repo_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = repo_bookmark_protection_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "repo_bookmark_protection." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"repo_bookmark_protection.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections\"}")
      print("LIVE STEP {\"id\":\"repo_bookmark_protection.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}\"}")
      print("LIVE STEP {\"id\":\"repo_bookmark_protection.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}\"}")
      print("LIVE STEP {\"id\":\"repo_bookmark_protection.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"organization01", "repo01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["repo_bookmark_protection01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "repo_bookmark_protection", function()
        return client:RepoBookmarkProtection(nil):list({["organization_id"] = setup.idmap["organization01"], ["repo_id"] = setup.idmap["repo01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local repo_bookmark_protection_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.repo_bookmark_protection")))
    local repo_bookmark_protection_ref01_data = nil
    if #repo_bookmark_protection_ref01_data_raw > 0 then
      repo_bookmark_protection_ref01_data = helpers.to_map(repo_bookmark_protection_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local repo_bookmark_protection_ref01_ent = client:RepoBookmarkProtection(nil)
    local repo_bookmark_protection_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
      ["repo_id"] = setup.idmap["repo01"],
    }

    local repo_bookmark_protection_ref01_list_result, err = repo_bookmark_protection_ref01_ent:list(repo_bookmark_protection_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(repo_bookmark_protection_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local repo_bookmark_protection_ref01_match_dt0 = {
      id = repo_bookmark_protection_ref01_data["id"],
    }
    do
      local own = repo_bookmark_protection_ref01_data["organization_id"]
      if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
        repo_bookmark_protection_ref01_match_dt0["organization_id"] = own
      else
        repo_bookmark_protection_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
      end
    end
    repo_bookmark_protection_ref01_match_dt0["repo_id"] = setup.idmap["repo_id"] or setup.idmap["repo01"]
    local repo_bookmark_protection_ref01_data_dt0_loaded, err = repo_bookmark_protection_ref01_ent:load(repo_bookmark_protection_ref01_match_dt0, nil)
    assert.is_nil(err)
    local repo_bookmark_protection_ref01_data_dt0_load_result = helpers.to_map(type(repo_bookmark_protection_ref01_data_dt0_loaded) == 'table' and repo_bookmark_protection_ref01_data_dt0_loaded.data_get and repo_bookmark_protection_ref01_data_dt0_loaded:data_get() or repo_bookmark_protection_ref01_data_dt0_loaded)
    assert.is_not_nil(repo_bookmark_protection_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(repo_bookmark_protection_ref01_data_dt0_load_result["id"], repo_bookmark_protection_ref01_data["id"]))

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"organization01", "repo01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local repo_bookmark_protection_ref01_ent = client:RepoBookmarkProtection(nil)
    local repo_bookmark_protection_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.repo_bookmark_protection"), "repo_bookmark_protection_ref01"))
    repo_bookmark_protection_ref01_data["organization_id"] = setup.idmap["organization01"]
    repo_bookmark_protection_ref01_data["repo_id"] = setup.idmap["repo01"]

    local repo_bookmark_protection_ref01_data_result, err = repo_bookmark_protection_ref01_ent:create(repo_bookmark_protection_ref01_data, nil)
    assert.is_nil(err)
    repo_bookmark_protection_ref01_data = helpers.to_map(type(repo_bookmark_protection_ref01_data_result) == 'table' and repo_bookmark_protection_ref01_data_result.data_get and repo_bookmark_protection_ref01_data_result:data_get() or repo_bookmark_protection_ref01_data_result)
    assert.is_not_nil(repo_bookmark_protection_ref01_data)
    assert.is_not_nil(repo_bookmark_protection_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local repo_bookmark_protection_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
      ["repo_id"] = setup.idmap["repo01"],
    }

    local repo_bookmark_protection_ref01_list_result, err = repo_bookmark_protection_ref01_ent:list(repo_bookmark_protection_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(repo_bookmark_protection_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(repo_bookmark_protection_ref01_list_result),
      { id = repo_bookmark_protection_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local repo_bookmark_protection_ref01_data_up0_up = {
      id = repo_bookmark_protection_ref01_data["id"],
      ["organization_id"] = setup.idmap["organization_id"],
      ["repo_id"] = setup.idmap["repo_id"],
    }

    local repo_bookmark_protection_ref01_markdef_up0_name = "bypass_mode"
    local repo_bookmark_protection_ref01_markdef_up0_value = "Mark01-repo_bookmark_protection_ref01_" .. tostring(setup.now)
    repo_bookmark_protection_ref01_data_up0_up[repo_bookmark_protection_ref01_markdef_up0_name] = repo_bookmark_protection_ref01_markdef_up0_value

    local repo_bookmark_protection_ref01_resdata_up0_result, err = repo_bookmark_protection_ref01_ent:update(repo_bookmark_protection_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local repo_bookmark_protection_ref01_resdata_up0 = helpers.to_map(type(repo_bookmark_protection_ref01_resdata_up0_result) == 'table' and repo_bookmark_protection_ref01_resdata_up0_result.data_get and repo_bookmark_protection_ref01_resdata_up0_result:data_get() or repo_bookmark_protection_ref01_resdata_up0_result)
    assert.is_not_nil(repo_bookmark_protection_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(repo_bookmark_protection_ref01_resdata_up0["id"], repo_bookmark_protection_ref01_data_up0_up["id"]))
    assert.are.equal(repo_bookmark_protection_ref01_resdata_up0[repo_bookmark_protection_ref01_markdef_up0_name], repo_bookmark_protection_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local repo_bookmark_protection_ref01_match_dt0 = {
      id = repo_bookmark_protection_ref01_data["id"],
    }
    do
      local own = repo_bookmark_protection_ref01_data["organization_id"]
      if type(own) == "string" or type(own) == "number" or type(own) == "boolean" then
        repo_bookmark_protection_ref01_match_dt0["organization_id"] = own
      else
        repo_bookmark_protection_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
      end
    end
    repo_bookmark_protection_ref01_match_dt0["repo_id"] = setup.idmap["repo_id"] or setup.idmap["repo01"]
    local repo_bookmark_protection_ref01_data_dt0_loaded, err = repo_bookmark_protection_ref01_ent:load(repo_bookmark_protection_ref01_match_dt0, nil)
    assert.is_nil(err)
    local repo_bookmark_protection_ref01_data_dt0_load_result = helpers.to_map(type(repo_bookmark_protection_ref01_data_dt0_loaded) == 'table' and repo_bookmark_protection_ref01_data_dt0_loaded.data_get and repo_bookmark_protection_ref01_data_dt0_loaded:data_get() or repo_bookmark_protection_ref01_data_dt0_loaded)
    assert.is_not_nil(repo_bookmark_protection_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(repo_bookmark_protection_ref01_data_dt0_load_result["id"], repo_bookmark_protection_ref01_data["id"]))

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local repo_bookmark_protection_ref01_match_rm0 = {
      id = repo_bookmark_protection_ref01_data["id"],
    }
    repo_bookmark_protection_ref01_match_rm0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    repo_bookmark_protection_ref01_match_rm0["repo_id"] = setup.idmap["repo_id"] or setup.idmap["repo01"]
    local _, err = repo_bookmark_protection_ref01_ent:remove(repo_bookmark_protection_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local repo_bookmark_protection_ref01_match_rt0 = {
      ["organization_id"] = setup.idmap["organization01"],
      ["repo_id"] = setup.idmap["repo01"],
    }

    local repo_bookmark_protection_ref01_list_rt0_result, err = repo_bookmark_protection_ref01_ent:list(repo_bookmark_protection_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(repo_bookmark_protection_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(repo_bookmark_protection_ref01_list_rt0_result),
      { id = repo_bookmark_protection_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function repo_bookmark_protection_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/repo_bookmark_protection/RepoBookmarkProtectionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read repo_bookmark_protection test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "repo_bookmark_protection01", "repo_bookmark_protection02", "repo_bookmark_protection03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["organization_id"] == nil then
    idmap_resolved["organization_id"] = idmap_resolved["organization01"]
  end
  if idmap_resolved["repo_id"] == nil then
    idmap_resolved["repo_id"] = idmap_resolved["repo01"]
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
