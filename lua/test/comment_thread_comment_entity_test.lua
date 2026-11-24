-- CommentThreadComment entity test

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


describe("CommentThreadCommentEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CommentThreadComment(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CommentThreadComment(nil):create({ ["artefact_id"] = 1, ["comment_thread_id"] = "x", ["organization_id"] = "x", ["body"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = comment_thread_comment_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "comment_thread_comment." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"comment_thread_comment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}/comments\"}")
      pending("Live coverage incomplete: comment_thread_comment.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}/comments)")
      return
    end

    if setup.live then
      for _, _live_key in ipairs({"artefact01", "comment_thread01", "organization01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via COMPOSAL_TEST_COMMENT_THREAD_COMMENT_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local comment_thread_comment_ref01_ent = client:CommentThreadComment(nil)
    local comment_thread_comment_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.comment_thread_comment"), "comment_thread_comment_ref01"))
    comment_thread_comment_ref01_data["artefact_id"] = setup.idmap["artefact01"]
    comment_thread_comment_ref01_data["comment_thread_id"] = setup.idmap["comment_thread01"]
    comment_thread_comment_ref01_data["organization_id"] = setup.idmap["organization01"]

    local comment_thread_comment_ref01_data_result, err = comment_thread_comment_ref01_ent:create(comment_thread_comment_ref01_data, nil)
    assert.is_nil(err)
    comment_thread_comment_ref01_data = helpers.to_map(type(comment_thread_comment_ref01_data_result) == 'table' and comment_thread_comment_ref01_data_result.data_get and comment_thread_comment_ref01_data_result:data_get() or comment_thread_comment_ref01_data_result)
    assert.is_not_nil(comment_thread_comment_ref01_data)

  end)
end)

function comment_thread_comment_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/comment_thread_comment/CommentThreadCommentTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read comment_thread_comment test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "comment_thread_comment01", "comment_thread_comment02", "comment_thread_comment03", "organization01", "organization02", "organization03", "artefact01", "artefact02", "artefact03", "comment_thread01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COMPOSAL_TEST_COMMENT_THREAD_COMMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COMPOSAL_TEST_COMMENT_THREAD_COMMENT_ENTID"] = idmap,
    ["COMPOSAL_TEST_LIVE"] = "FALSE",
    ["COMPOSAL_TEST_EXPLAIN"] = "FALSE",
    ["COMPOSAL_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["COMPOSAL_TEST_COMMENT_THREAD_COMMENT_ENTID"])
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
