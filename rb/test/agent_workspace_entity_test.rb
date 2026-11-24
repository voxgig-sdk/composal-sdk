# AgentWorkspace entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class AgentWorkspaceEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.AgentWorkspace(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AgentWorkspace(nil).list({ "agent_id" => 1, "organization_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = agent_workspace_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "agent_workspace." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"agent_workspace.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workspaces/{workspace_id}\"}"
    if setup[:live]
      ["agent01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_AGENT_WORKSPACE_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    agent_workspace_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.agent_workspace")))
    agent_workspace_ref01_data = nil
    if agent_workspace_ref01_data_raw.length > 0
      agent_workspace_ref01_data = Helpers.to_map(agent_workspace_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    agent_workspace_ref01_ent = client.AgentWorkspace(nil)
    agent_workspace_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    agent_workspace_ref01_list_result = agent_workspace_ref01_ent.list(agent_workspace_ref01_match, nil)
    assert agent_workspace_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["agent01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_AGENT_WORKSPACE_ENTID")
        end
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a agent_workspace record it did not create")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    agent_workspace_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.agent_workspace")))
    agent_workspace_ref01_data = nil
    if agent_workspace_ref01_data_raw.length > 0
      agent_workspace_ref01_data = Helpers.to_map(agent_workspace_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    agent_workspace_ref01_ent = client.AgentWorkspace(nil)
    agent_workspace_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    agent_workspace_ref01_list_result = agent_workspace_ref01_ent.list(agent_workspace_ref01_match, nil)
    assert agent_workspace_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # UPDATE
    agent_workspace_ref01_data_up0_up = {
      "id" => agent_workspace_ref01_data["id"],
      "agent_id" => setup[:idmap]["agent_id"],
      "organization_id" => setup[:idmap]["organization_id"],
    }

    agent_workspace_ref01_markdef_up0_name = "action"
    agent_workspace_ref01_markdef_up0_value = "Mark01-agent_workspace_ref01_#{setup[:now]}"
    agent_workspace_ref01_data_up0_up[agent_workspace_ref01_markdef_up0_name] = agent_workspace_ref01_markdef_up0_value

    agent_workspace_ref01_resdata_up0_result = agent_workspace_ref01_ent.update(agent_workspace_ref01_data_up0_up, nil)
    agent_workspace_ref01_resdata_up0 = Helpers.to_map(agent_workspace_ref01_resdata_up0_result.respond_to?(:data_get) ? agent_workspace_ref01_resdata_up0_result.data_get : agent_workspace_ref01_resdata_up0_result)
    assert !agent_workspace_ref01_resdata_up0.nil?
    assert Runner.live_same_id(agent_workspace_ref01_resdata_up0["id"], agent_workspace_ref01_data_up0_up["id"])
    assert_equal agent_workspace_ref01_resdata_up0[agent_workspace_ref01_markdef_up0_name], agent_workspace_ref01_markdef_up0_value

  end
end

def agent_workspace_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "agent_workspace", "AgentWorkspaceTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["agent_workspace01", "agent_workspace02", "agent_workspace03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_AGENT_WORKSPACE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_AGENT_WORKSPACE_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_AGENT_WORKSPACE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["agent_id"].nil?
    idmap_resolved["agent_id"] = idmap_resolved["agent01"]
  end
  if idmap_resolved["organization_id"].nil?
    idmap_resolved["organization_id"] = idmap_resolved["organization01"]
  end

  if env["COMPOSAL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["COMPOSAL_APIKEY"],
      },
      extra || {},
    ])
    client = ComposalSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["COMPOSAL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["COMPOSAL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
