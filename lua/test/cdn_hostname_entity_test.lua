-- CdnHostname entity test

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


describe("CdnHostnameEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CdnHostname(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CdnHostname(nil):load({ ["app_id"] = 1, ["cdn_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = cdn_hostname_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "cdn_hostname." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"cdn_hostname.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames\"}")
      print("LIVE STEP {\"id\":\"cdn_hostname.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}\"}")
      print("LIVE STEP {\"id\":\"cdn_hostname.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only cdn_hostname.create.0 gives\"}")
      print("LIVE STEP {\"id\":\"cdn_hostname.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}\"}")
      pending("Live coverage incomplete: cdn_hostname.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames); cdn_hostname.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}); cdn_hostname.load.2 excluded (GET-only live run: reads a record only cdn_hostname.create.0 gives); cdn_hostname.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id})")
      return
    end

    if setup.live then
      for _, _live_key in ipairs({"app01", "cdn01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_CDN_HOSTNAME_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local cdn_hostname_ref01_ent = client:CdnHostname(nil)
    local cdn_hostname_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.cdn_hostname"), "cdn_hostname_ref01"))
    cdn_hostname_ref01_data["app_id"] = setup.idmap["app01"]
    cdn_hostname_ref01_data["cdn_id"] = setup.idmap["cdn01"]

    local cdn_hostname_ref01_data_result, err = cdn_hostname_ref01_ent:create(cdn_hostname_ref01_data, nil)
    assert.is_nil(err)
    cdn_hostname_ref01_data = helpers.to_map(type(cdn_hostname_ref01_data_result) == 'table' and cdn_hostname_ref01_data_result.data_get and cdn_hostname_ref01_data_result:data_get() or cdn_hostname_ref01_data_result)
    assert.is_not_nil(cdn_hostname_ref01_data)
    assert.is_not_nil(cdn_hostname_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local cdn_hostname_ref01_data_up0_up = {
      id = cdn_hostname_ref01_data["id"],
      ["app_id"] = setup.idmap["app_id"],
      ["cdn_id"] = setup.idmap["cdn_id"],
    }

    local cdn_hostname_ref01_markdef_up0_name = "app_cdn_distribution_id"
    local cdn_hostname_ref01_markdef_up0_value = "Mark01-cdn_hostname_ref01_" .. tostring(setup.now)
    cdn_hostname_ref01_data_up0_up[cdn_hostname_ref01_markdef_up0_name] = cdn_hostname_ref01_markdef_up0_value

    local cdn_hostname_ref01_resdata_up0_result, err = cdn_hostname_ref01_ent:update(cdn_hostname_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local cdn_hostname_ref01_resdata_up0 = helpers.to_map(type(cdn_hostname_ref01_resdata_up0_result) == 'table' and cdn_hostname_ref01_resdata_up0_result.data_get and cdn_hostname_ref01_resdata_up0_result:data_get() or cdn_hostname_ref01_resdata_up0_result)
    assert.is_not_nil(cdn_hostname_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(cdn_hostname_ref01_resdata_up0["id"], cdn_hostname_ref01_data_up0_up["id"]))
    assert.are.equal(cdn_hostname_ref01_resdata_up0[cdn_hostname_ref01_markdef_up0_name], cdn_hostname_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local cdn_hostname_ref01_match_dt0 = {
      id = cdn_hostname_ref01_data["id"],
    }
    cdn_hostname_ref01_match_dt0["app_id"] = setup.idmap["app_id"] or setup.idmap["app01"]
    local cdn_hostname_ref01_data_dt0_loaded, err = cdn_hostname_ref01_ent:load(cdn_hostname_ref01_match_dt0, nil)
    assert.is_nil(err)
    local cdn_hostname_ref01_data_dt0_load_result = helpers.to_map(type(cdn_hostname_ref01_data_dt0_loaded) == 'table' and cdn_hostname_ref01_data_dt0_loaded.data_get and cdn_hostname_ref01_data_dt0_loaded:data_get() or cdn_hostname_ref01_data_dt0_loaded)
    assert.is_not_nil(cdn_hostname_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(cdn_hostname_ref01_data_dt0_load_result["id"], cdn_hostname_ref01_data["id"]))

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local cdn_hostname_ref01_match_rm0 = {
      id = cdn_hostname_ref01_data["id"],
    }
    cdn_hostname_ref01_match_rm0["app_id"] = setup.idmap["app_id"] or setup.idmap["app01"]
    cdn_hostname_ref01_match_rm0["cdn_id"] = setup.idmap["cdn_id"] or setup.idmap["cdn01"]
    local _, err = cdn_hostname_ref01_ent:remove(cdn_hostname_ref01_match_rm0, nil)
    assert.is_nil(err)

  end)
end)

function cdn_hostname_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/cdn_hostname/CdnHostnameTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read cdn_hostname test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "cdn_hostname01", "cdn_hostname02", "cdn_hostname03", "app01", "app02", "app03", "cdn01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_CDN_HOSTNAME_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_CDN_HOSTNAME_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_CDN_HOSTNAME_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["app_id"] == nil then
    idmap_resolved["app_id"] = idmap_resolved["app01"]
  end
  if idmap_resolved["cdn_id"] == nil then
    idmap_resolved["cdn_id"] = idmap_resolved["cdn01"]
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
