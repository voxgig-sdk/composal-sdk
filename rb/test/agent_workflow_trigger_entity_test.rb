# AgentWorkflowTrigger entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class AgentWorkflowTriggerEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.AgentWorkflowTrigger(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AgentWorkflowTrigger(nil).list({ "agent_id" => 1, "organization_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = agent_workflow_trigger_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "agent_workflow_trigger." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"agent_workflow_trigger.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}\"}"
    if setup[:live]
      ["agent01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["agent_workflow_trigger01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "agent_workflow_trigger", "id", _live_id) do
        client.AgentWorkflowTrigger(nil).list({"agent_id" => setup[:idmap]["agent01"], "organization_id" => setup[:idmap]["organization01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    agent_workflow_trigger_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.agent_workflow_trigger")))
    agent_workflow_trigger_ref01_data = nil
    if agent_workflow_trigger_ref01_data_raw.length > 0
      agent_workflow_trigger_ref01_data = Helpers.to_map(agent_workflow_trigger_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    agent_workflow_trigger_ref01_ent = client.AgentWorkflowTrigger(nil)
    agent_workflow_trigger_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    agent_workflow_trigger_ref01_list_result = agent_workflow_trigger_ref01_ent.list(agent_workflow_trigger_ref01_match, nil)
    assert agent_workflow_trigger_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    agent_workflow_trigger_ref01_match_dt0 = {
      "id" => agent_workflow_trigger_ref01_data["id"],
    }
    agent_workflow_trigger_ref01_match_dt0["agent_id"] = setup[:idmap]["agent_id"] || setup[:idmap]["agent01"]
    agent_workflow_trigger_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    agent_workflow_trigger_ref01_data_dt0_loaded = agent_workflow_trigger_ref01_ent.load(agent_workflow_trigger_ref01_match_dt0, nil)
    agent_workflow_trigger_ref01_data_dt0_load_result = Helpers.to_map(agent_workflow_trigger_ref01_data_dt0_loaded.respond_to?(:data_get) ? agent_workflow_trigger_ref01_data_dt0_loaded.data_get : agent_workflow_trigger_ref01_data_dt0_loaded)
    assert !agent_workflow_trigger_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(agent_workflow_trigger_ref01_data_dt0_load_result["id"], agent_workflow_trigger_ref01_data["id"])

      return
    end

    if setup[:live]
      ["agent01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID")
        end
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a agent_workflow_trigger record it did not create")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    agent_workflow_trigger_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.agent_workflow_trigger")))
    agent_workflow_trigger_ref01_data = nil
    if agent_workflow_trigger_ref01_data_raw.length > 0
      agent_workflow_trigger_ref01_data = Helpers.to_map(agent_workflow_trigger_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    agent_workflow_trigger_ref01_ent = client.AgentWorkflowTrigger(nil)
    agent_workflow_trigger_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    agent_workflow_trigger_ref01_list_result = agent_workflow_trigger_ref01_ent.list(agent_workflow_trigger_ref01_match, nil)
    assert agent_workflow_trigger_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # UPDATE
    agent_workflow_trigger_ref01_data_up0_up = {
      "id" => agent_workflow_trigger_ref01_data["id"],
      "agent_id" => setup[:idmap]["agent_id"],
      "organization_id" => setup[:idmap]["organization_id"],
    }

    agent_workflow_trigger_ref01_markdef_up0_name = "day_resets_at"
    agent_workflow_trigger_ref01_markdef_up0_value = "Mark01-agent_workflow_trigger_ref01_#{setup[:now]}"
    agent_workflow_trigger_ref01_data_up0_up[agent_workflow_trigger_ref01_markdef_up0_name] = agent_workflow_trigger_ref01_markdef_up0_value

    agent_workflow_trigger_ref01_resdata_up0_result = agent_workflow_trigger_ref01_ent.update(agent_workflow_trigger_ref01_data_up0_up, nil)
    agent_workflow_trigger_ref01_resdata_up0 = Helpers.to_map(agent_workflow_trigger_ref01_resdata_up0_result.respond_to?(:data_get) ? agent_workflow_trigger_ref01_resdata_up0_result.data_get : agent_workflow_trigger_ref01_resdata_up0_result)
    assert !agent_workflow_trigger_ref01_resdata_up0.nil?
    assert Runner.live_same_id(agent_workflow_trigger_ref01_resdata_up0["id"], agent_workflow_trigger_ref01_data_up0_up["id"])
    assert_equal agent_workflow_trigger_ref01_resdata_up0[agent_workflow_trigger_ref01_markdef_up0_name], agent_workflow_trigger_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    agent_workflow_trigger_ref01_match_dt0 = {
      "id" => agent_workflow_trigger_ref01_data["id"],
    }
    agent_workflow_trigger_ref01_match_dt0["agent_id"] = setup[:idmap]["agent_id"] || setup[:idmap]["agent01"]
    agent_workflow_trigger_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    agent_workflow_trigger_ref01_data_dt0_loaded = agent_workflow_trigger_ref01_ent.load(agent_workflow_trigger_ref01_match_dt0, nil)
    agent_workflow_trigger_ref01_data_dt0_load_result = Helpers.to_map(agent_workflow_trigger_ref01_data_dt0_loaded.respond_to?(:data_get) ? agent_workflow_trigger_ref01_data_dt0_loaded.data_get : agent_workflow_trigger_ref01_data_dt0_loaded)
    assert !agent_workflow_trigger_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(agent_workflow_trigger_ref01_data_dt0_load_result["id"], agent_workflow_trigger_ref01_data["id"])

  end
end

def agent_workflow_trigger_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "agent_workflow_trigger", "AgentWorkflowTriggerTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["agent_workflow_trigger01", "agent_workflow_trigger02", "agent_workflow_trigger03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID"])
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
