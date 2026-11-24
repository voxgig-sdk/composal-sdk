-- CacheNamespaceEntry entity test

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


describe("CacheNamespaceEntryEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CacheNamespaceEntry(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CacheNamespaceEntry(nil):list({ ["cache_namespace_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = cache_namespace_entry_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "cache_namespace_entry." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"cache_namespace_entry.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict\"}")
      print("LIVE STEP {\"id\":\"cache_namespace_entry.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}\"}")
      print("LIVE STEP {\"id\":\"cache_namespace_entry.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}\"}")
      print("LIVE STEP {\"id\":\"cache_namespace_entry.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"cache_namespace01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["cache_namespace_entry01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "cache_namespace_entry", function()
        return client:CacheNamespaceEntry(nil):list({["cache_namespace_id"] = setup.idmap["cache_namespace01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local cache_namespace_entry_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.cache_namespace_entry")))
    local cache_namespace_entry_ref01_data = nil
    if #cache_namespace_entry_ref01_data_raw > 0 then
      cache_namespace_entry_ref01_data = helpers.to_map(cache_namespace_entry_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local cache_namespace_entry_ref01_ent = client:CacheNamespaceEntry(nil)
    local cache_namespace_entry_ref01_match = {
      ["cache_namespace_id"] = setup.idmap["cache_namespace01"],
    }

    local cache_namespace_entry_ref01_list_result, err = cache_namespace_entry_ref01_ent:list(cache_namespace_entry_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(cache_namespace_entry_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local cache_namespace_entry_ref01_match_dt0 = {
      id = cache_namespace_entry_ref01_data["id"],
    }
    cache_namespace_entry_ref01_match_dt0["cache_namespace_id"] = setup.idmap["cache_namespace_id"] or setup.idmap["cache_namespace01"]
    local cache_namespace_entry_ref01_data_dt0_loaded, err = cache_namespace_entry_ref01_ent:load(cache_namespace_entry_ref01_match_dt0, nil)
    assert.is_nil(err)
    local cache_namespace_entry_ref01_data_dt0_load_result = helpers.to_map(type(cache_namespace_entry_ref01_data_dt0_loaded) == 'table' and cache_namespace_entry_ref01_data_dt0_loaded.data_get and cache_namespace_entry_ref01_data_dt0_loaded:data_get() or cache_namespace_entry_ref01_data_dt0_loaded)
    assert.is_not_nil(cache_namespace_entry_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(cache_namespace_entry_ref01_data_dt0_load_result["id"], cache_namespace_entry_ref01_data["id"]))
    end

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"cache_namespace01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local cache_namespace_entry_ref01_ent = client:CacheNamespaceEntry(nil)
    local cache_namespace_entry_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.cache_namespace_entry"), "cache_namespace_entry_ref01"))
    cache_namespace_entry_ref01_data["cache_namespace_id"] = setup.idmap["cache_namespace01"]

    local cache_namespace_entry_ref01_data_result, err = cache_namespace_entry_ref01_ent:create(cache_namespace_entry_ref01_data, nil)
    assert.is_nil(err)
    cache_namespace_entry_ref01_data = helpers.to_map(type(cache_namespace_entry_ref01_data_result) == 'table' and cache_namespace_entry_ref01_data_result.data_get and cache_namespace_entry_ref01_data_result:data_get() or cache_namespace_entry_ref01_data_result)
    assert.is_not_nil(cache_namespace_entry_ref01_data)
    assert.is_not_nil(cache_namespace_entry_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local cache_namespace_entry_ref01_match = {
      ["cache_namespace_id"] = setup.idmap["cache_namespace01"],
    }

    local cache_namespace_entry_ref01_list_result, err = cache_namespace_entry_ref01_ent:list(cache_namespace_entry_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(cache_namespace_entry_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(cache_namespace_entry_ref01_list_result),
      { id = cache_namespace_entry_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local cache_namespace_entry_ref01_data_up0_up = {
      id = cache_namespace_entry_ref01_data["id"],
      ["cache_namespace_id"] = setup.idmap["cache_namespace_id"],
    }

    local cache_namespace_entry_ref01_resdata_up0_result, err = cache_namespace_entry_ref01_ent:update(cache_namespace_entry_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local cache_namespace_entry_ref01_resdata_up0 = helpers.to_map(type(cache_namespace_entry_ref01_resdata_up0_result) == 'table' and cache_namespace_entry_ref01_resdata_up0_result.data_get and cache_namespace_entry_ref01_resdata_up0_result:data_get() or cache_namespace_entry_ref01_resdata_up0_result)
    assert.is_not_nil(cache_namespace_entry_ref01_resdata_up0)
    if not setup.live then
      assert.is_true(runner.live_same_id(cache_namespace_entry_ref01_resdata_up0["id"], cache_namespace_entry_ref01_data_up0_up["id"]))
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local cache_namespace_entry_ref01_match_dt0 = {
      id = cache_namespace_entry_ref01_data["id"],
    }
    cache_namespace_entry_ref01_match_dt0["cache_namespace_id"] = setup.idmap["cache_namespace_id"] or setup.idmap["cache_namespace01"]
    local cache_namespace_entry_ref01_data_dt0_loaded, err = cache_namespace_entry_ref01_ent:load(cache_namespace_entry_ref01_match_dt0, nil)
    assert.is_nil(err)
    local cache_namespace_entry_ref01_data_dt0_load_result = helpers.to_map(type(cache_namespace_entry_ref01_data_dt0_loaded) == 'table' and cache_namespace_entry_ref01_data_dt0_loaded.data_get and cache_namespace_entry_ref01_data_dt0_loaded:data_get() or cache_namespace_entry_ref01_data_dt0_loaded)
    assert.is_not_nil(cache_namespace_entry_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(cache_namespace_entry_ref01_data_dt0_load_result["id"], cache_namespace_entry_ref01_data["id"]))
    end

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local cache_namespace_entry_ref01_match_rm0 = {
      id = cache_namespace_entry_ref01_data["id"],
    }
    cache_namespace_entry_ref01_match_rm0["cache_namespace_id"] = setup.idmap["cache_namespace_id"] or setup.idmap["cache_namespace01"]
    local _, err = cache_namespace_entry_ref01_ent:remove(cache_namespace_entry_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local cache_namespace_entry_ref01_match_rt0 = {
      ["cache_namespace_id"] = setup.idmap["cache_namespace01"],
    }

    local cache_namespace_entry_ref01_list_rt0_result, err = cache_namespace_entry_ref01_ent:list(cache_namespace_entry_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(cache_namespace_entry_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(cache_namespace_entry_ref01_list_rt0_result),
      { id = cache_namespace_entry_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function cache_namespace_entry_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/cache_namespace_entry/CacheNamespaceEntryTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read cache_namespace_entry test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "cache_namespace_entry01", "cache_namespace_entry02", "cache_namespace_entry03", "cache_namespace01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["cache_namespace_id"] == nil then
    idmap_resolved["cache_namespace_id"] = idmap_resolved["cache_namespace01"]
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
