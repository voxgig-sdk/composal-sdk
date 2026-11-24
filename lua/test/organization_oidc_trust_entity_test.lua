-- OrganizationOidcTrust entity test

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


describe("OrganizationOidcTrustEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:OrganizationOidcTrust(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:OrganizationOidcTrust(nil):list({ ["organization_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = organization_oidc_trust_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "organization_oidc_trust." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"organization_oidc_trust.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/activate\"}")
      print("LIVE STEP {\"id\":\"organization_oidc_trust.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}\"}")
      print("LIVE STEP {\"id\":\"organization_oidc_trust.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}\"}")
      print("LIVE STEP {\"id\":\"organization_oidc_trust.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_ORGANIZATION_OIDC_TRUST_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["organization_oidc_trust01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "organization_oidc_trust", function()
        return client:OrganizationOidcTrust(nil):list({["organization_id"] = setup.idmap["organization01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local organization_oidc_trust_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.organization_oidc_trust")))
    local organization_oidc_trust_ref01_data = nil
    if #organization_oidc_trust_ref01_data_raw > 0 then
      organization_oidc_trust_ref01_data = helpers.to_map(organization_oidc_trust_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local organization_oidc_trust_ref01_ent = client:OrganizationOidcTrust(nil)
    local organization_oidc_trust_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
    }

    local organization_oidc_trust_ref01_list_result, err = organization_oidc_trust_ref01_ent:list(organization_oidc_trust_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(organization_oidc_trust_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local organization_oidc_trust_ref01_match_dt0 = {
      id = organization_oidc_trust_ref01_data["id"],
    }
    organization_oidc_trust_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local organization_oidc_trust_ref01_data_dt0_loaded, err = organization_oidc_trust_ref01_ent:load(organization_oidc_trust_ref01_match_dt0, nil)
    assert.is_nil(err)
    local organization_oidc_trust_ref01_data_dt0_load_result = helpers.to_map(type(organization_oidc_trust_ref01_data_dt0_loaded) == 'table' and organization_oidc_trust_ref01_data_dt0_loaded.data_get and organization_oidc_trust_ref01_data_dt0_loaded:data_get() or organization_oidc_trust_ref01_data_dt0_loaded)
    assert.is_not_nil(organization_oidc_trust_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(organization_oidc_trust_ref01_data_dt0_load_result["id"], organization_oidc_trust_ref01_data["id"]))
    end

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_ORGANIZATION_OIDC_TRUST_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local organization_oidc_trust_ref01_ent = client:OrganizationOidcTrust(nil)
    local organization_oidc_trust_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.organization_oidc_trust"), "organization_oidc_trust_ref01"))
    organization_oidc_trust_ref01_data["organization_id"] = setup.idmap["organization01"]

    local organization_oidc_trust_ref01_data_result, err = organization_oidc_trust_ref01_ent:create(organization_oidc_trust_ref01_data, nil)
    assert.is_nil(err)
    organization_oidc_trust_ref01_data = helpers.to_map(type(organization_oidc_trust_ref01_data_result) == 'table' and organization_oidc_trust_ref01_data_result.data_get and organization_oidc_trust_ref01_data_result:data_get() or organization_oidc_trust_ref01_data_result)
    assert.is_not_nil(organization_oidc_trust_ref01_data)
    assert.is_not_nil(organization_oidc_trust_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local organization_oidc_trust_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
    }

    local organization_oidc_trust_ref01_list_result, err = organization_oidc_trust_ref01_ent:list(organization_oidc_trust_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(organization_oidc_trust_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(organization_oidc_trust_ref01_list_result),
      { id = organization_oidc_trust_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local organization_oidc_trust_ref01_data_up0_up = {
      id = organization_oidc_trust_ref01_data["id"],
      ["organization_id"] = setup.idmap["organization_id"],
    }

    local organization_oidc_trust_ref01_resdata_up0_result, err = organization_oidc_trust_ref01_ent:update(organization_oidc_trust_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local organization_oidc_trust_ref01_resdata_up0 = helpers.to_map(type(organization_oidc_trust_ref01_resdata_up0_result) == 'table' and organization_oidc_trust_ref01_resdata_up0_result.data_get and organization_oidc_trust_ref01_resdata_up0_result:data_get() or organization_oidc_trust_ref01_resdata_up0_result)
    assert.is_not_nil(organization_oidc_trust_ref01_resdata_up0)
    if not setup.live then
      assert.is_true(runner.live_same_id(organization_oidc_trust_ref01_resdata_up0["id"], organization_oidc_trust_ref01_data_up0_up["id"]))
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local organization_oidc_trust_ref01_match_dt0 = {
      id = organization_oidc_trust_ref01_data["id"],
    }
    organization_oidc_trust_ref01_match_dt0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local organization_oidc_trust_ref01_data_dt0_loaded, err = organization_oidc_trust_ref01_ent:load(organization_oidc_trust_ref01_match_dt0, nil)
    assert.is_nil(err)
    local organization_oidc_trust_ref01_data_dt0_load_result = helpers.to_map(type(organization_oidc_trust_ref01_data_dt0_loaded) == 'table' and organization_oidc_trust_ref01_data_dt0_loaded.data_get and organization_oidc_trust_ref01_data_dt0_loaded:data_get() or organization_oidc_trust_ref01_data_dt0_loaded)
    assert.is_not_nil(organization_oidc_trust_ref01_data_dt0_load_result)
    if not setup.live then
      assert.is_true(runner.live_same_id(organization_oidc_trust_ref01_data_dt0_load_result["id"], organization_oidc_trust_ref01_data["id"]))
    end

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local organization_oidc_trust_ref01_match_rm0 = {
      id = organization_oidc_trust_ref01_data["id"],
    }
    organization_oidc_trust_ref01_match_rm0["organization_id"] = setup.idmap["organization_id"] or setup.idmap["organization01"]
    local _, err = organization_oidc_trust_ref01_ent:remove(organization_oidc_trust_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local organization_oidc_trust_ref01_match_rt0 = {
      ["organization_id"] = setup.idmap["organization01"],
    }

    local organization_oidc_trust_ref01_list_rt0_result, err = organization_oidc_trust_ref01_ent:list(organization_oidc_trust_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(organization_oidc_trust_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(organization_oidc_trust_ref01_list_rt0_result),
      { id = organization_oidc_trust_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function organization_oidc_trust_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/organization_oidc_trust/OrganizationOidcTrustTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read organization_oidc_trust test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "organization_oidc_trust01", "organization_oidc_trust02", "organization_oidc_trust03", "organization01", "organization02", "organization03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_ORGANIZATION_OIDC_TRUST_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_ORGANIZATION_OIDC_TRUST_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_ORGANIZATION_OIDC_TRUST_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
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
