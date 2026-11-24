-- ImageRepository entity test

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


describe("ImageRepositoryEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ImageRepository(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:ImageRepository(nil):list({ ["organization_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = image_repository_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "image_repository." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"image_repository.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/image_repositories\"}")
    if setup.live then
      for _, _live_key in ipairs({"organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local image_repository_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.image_repository")))
    local image_repository_ref01_data = nil
    if #image_repository_ref01_data_raw > 0 then
      image_repository_ref01_data = helpers.to_map(image_repository_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local image_repository_ref01_ent = client:ImageRepository(nil)
    local image_repository_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
    }

    local image_repository_ref01_list_result, err = image_repository_ref01_ent:list(image_repository_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(image_repository_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local image_repository_ref01_ent = client:ImageRepository(nil)
    local image_repository_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.image_repository"), "image_repository_ref01"))
    image_repository_ref01_data["organization_id"] = setup.idmap["organization01"]

    local image_repository_ref01_data_result, err = image_repository_ref01_ent:create(image_repository_ref01_data, nil)
    assert.is_nil(err)
    image_repository_ref01_data = helpers.to_map(type(image_repository_ref01_data_result) == 'table' and image_repository_ref01_data_result.data_get and image_repository_ref01_data_result:data_get() or image_repository_ref01_data_result)
    assert.is_not_nil(image_repository_ref01_data)
    assert.is_not_nil(image_repository_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local image_repository_ref01_match = {
      ["organization_id"] = setup.idmap["organization01"],
    }

    local image_repository_ref01_list_result, err = image_repository_ref01_ent:list(image_repository_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(image_repository_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(image_repository_ref01_list_result),
      { id = image_repository_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

  end)
end)

function image_repository_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/image_repository/ImageRepositoryTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read image_repository test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "image_repository01", "image_repository02", "image_repository03", "organization01", "organization02", "organization03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID"])
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
