-- CdnSpaceObject entity test

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


describe("CdnSpaceObjectEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CdnSpaceObject(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CdnSpaceObject(nil):list({ ["cdn_space_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = cdn_space_object_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "cdn_space_object." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"cdn_space_object.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/cdn_spaces/{cdn_space_id}/objects\"}")
    if setup.live then
      for _, _live_key in ipairs({"cdn_space01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["cdn_space_object01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "cdn_space_object", function()
        return client:CdnSpaceObject(nil):list({["cdn_space_id"] = setup.idmap["cdn_space01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local cdn_space_object_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.cdn_space_object")))
    local cdn_space_object_ref01_data = nil
    if #cdn_space_object_ref01_data_raw > 0 then
      cdn_space_object_ref01_data = helpers.to_map(cdn_space_object_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local cdn_space_object_ref01_ent = client:CdnSpaceObject(nil)
    local cdn_space_object_ref01_match = {
      ["cdn_space_id"] = setup.idmap["cdn_space01"],
    }

    local cdn_space_object_ref01_list_result, err = cdn_space_object_ref01_ent:list(cdn_space_object_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(cdn_space_object_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local cdn_space_object_ref01_match_dt0 = {
      id = cdn_space_object_ref01_data["id"],
    }
    cdn_space_object_ref01_match_dt0["cdn_space_id"] = setup.idmap["cdn_space_id"] or setup.idmap["cdn_space01"]
    local cdn_space_object_ref01_data_dt0_loaded, err = cdn_space_object_ref01_ent:load(cdn_space_object_ref01_match_dt0, nil)
    assert.is_nil(err)
    local cdn_space_object_ref01_data_dt0_load_result = helpers.to_map(type(cdn_space_object_ref01_data_dt0_loaded) == 'table' and cdn_space_object_ref01_data_dt0_loaded.data_get and cdn_space_object_ref01_data_dt0_loaded:data_get() or cdn_space_object_ref01_data_dt0_loaded)
    assert.is_not_nil(cdn_space_object_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(cdn_space_object_ref01_data_dt0_load_result["id"], cdn_space_object_ref01_data["id"]))
    end

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"cdn_space01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["cdn_space_object01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "cdn_space_object", function()
        return client:CdnSpaceObject(nil):list({["cdn_space_id"] = setup.idmap["cdn_space01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local cdn_space_object_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.cdn_space_object")))
    local cdn_space_object_ref01_data = nil
    if #cdn_space_object_ref01_data_raw > 0 then
      cdn_space_object_ref01_data = helpers.to_map(cdn_space_object_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local cdn_space_object_ref01_ent = client:CdnSpaceObject(nil)
    local cdn_space_object_ref01_match = {
      ["cdn_space_id"] = setup.idmap["cdn_space01"],
    }

    local cdn_space_object_ref01_list_result, err = cdn_space_object_ref01_ent:list(cdn_space_object_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(cdn_space_object_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local cdn_space_object_ref01_match_dt0 = {
      id = cdn_space_object_ref01_data["id"],
    }
    cdn_space_object_ref01_match_dt0["cdn_space_id"] = setup.idmap["cdn_space_id"] or setup.idmap["cdn_space01"]
    local cdn_space_object_ref01_data_dt0_loaded, err = cdn_space_object_ref01_ent:load(cdn_space_object_ref01_match_dt0, nil)
    assert.is_nil(err)
    local cdn_space_object_ref01_data_dt0_load_result = helpers.to_map(type(cdn_space_object_ref01_data_dt0_loaded) == 'table' and cdn_space_object_ref01_data_dt0_loaded.data_get and cdn_space_object_ref01_data_dt0_loaded:data_get() or cdn_space_object_ref01_data_dt0_loaded)
    assert.is_not_nil(cdn_space_object_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(cdn_space_object_ref01_data_dt0_load_result["id"], cdn_space_object_ref01_data["id"]))
    end

  end)
end)

function cdn_space_object_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/cdn_space_object/CdnSpaceObjectTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read cdn_space_object test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "cdn_space_object01", "cdn_space_object02", "cdn_space_object03", "cdn_space01", "cdn_space02", "cdn_space03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_CDN_SPACE_OBJECT_ENTID"])
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
