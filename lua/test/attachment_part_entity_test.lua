-- AttachmentPart entity test

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


describe("AttachmentPartEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:AttachmentPart(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:AttachmentPart(nil):update({ ["agent_id"] = 1, ["attachment_id"] = "x", ["id"] = "x", ["organization_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = attachment_part_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "attachment_part." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"attachment_part.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index}\"}")
      pending("Live coverage incomplete: attachment_part.update.0 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index})")
      return
    end

    if setup.live then
      for _, _live_key in ipairs({"agent01", "attachment01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_ATTACHMENT_PART_ENTID")
        end
      end
    end
    if setup.live then
      runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: " .. "the flow updates a attachment_part record it did not create")
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local attachment_part_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.attachment_part")))
    local attachment_part_ref01_data = nil
    if #attachment_part_ref01_data_raw > 0 then
      attachment_part_ref01_data = helpers.to_map(attachment_part_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local attachment_part_ref01_ent = client:AttachmentPart(nil)
    local attachment_part_ref01_data_up0_up = {
      id = attachment_part_ref01_data["id"],
      ["agent_id"] = setup.idmap["agent_id"],
      ["attachment_id"] = setup.idmap["attachment_id"],
      ["organization_id"] = setup.idmap["organization_id"],
    }

    local attachment_part_ref01_resdata_up0_result, err = attachment_part_ref01_ent:update(attachment_part_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local attachment_part_ref01_resdata_up0 = helpers.to_map(type(attachment_part_ref01_resdata_up0_result) == 'table' and attachment_part_ref01_resdata_up0_result.data_get and attachment_part_ref01_resdata_up0_result:data_get() or attachment_part_ref01_resdata_up0_result)
    assert.is_not_nil(attachment_part_ref01_resdata_up0)
    if not setup.live then
      assert.is_true(runner.live_same_id(attachment_part_ref01_resdata_up0["id"], attachment_part_ref01_data_up0_up["id"]))
    end

  end)
end)

function attachment_part_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/attachment_part/AttachmentPartTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read attachment_part test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "attachment_part01", "attachment_part02", "attachment_part03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03", "attachment01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_ATTACHMENT_PART_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_ATTACHMENT_PART_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_ATTACHMENT_PART_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["agent_id"] == nil then
    idmap_resolved["agent_id"] = idmap_resolved["agent01"]
  end
  if idmap_resolved["attachment_id"] == nil then
    idmap_resolved["attachment_id"] = idmap_resolved["attachment01"]
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
