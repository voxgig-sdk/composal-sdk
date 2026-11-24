# AgentConnection entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class AgentConnectionEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.AgentConnection(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AgentConnection(nil).list({ "agent_id" => 1, "organization_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = agent_connection_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "agent_connection." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"agent_connection.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup\"}"
      puts "LIVE STEP {\"id\":\"agent_connection.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}\"}"
      puts "LIVE STEP {\"id\":\"agent_connection.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}\"}"
      puts "LIVE STEP {\"id\":\"agent_connection.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["agent01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_AGENT_CONNECTION_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["agent_connection01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "agent_connection", "id", _live_id) do
        client.AgentConnection(nil).list({"agent_id" => setup[:idmap]["agent01"], "organization_id" => setup[:idmap]["organization01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    agent_connection_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.agent_connection")))
    agent_connection_ref01_data = nil
    if agent_connection_ref01_data_raw.length > 0
      agent_connection_ref01_data = Helpers.to_map(agent_connection_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    agent_connection_ref01_ent = client.AgentConnection(nil)
    agent_connection_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    agent_connection_ref01_list_result = agent_connection_ref01_ent.list(agent_connection_ref01_match, nil)
    assert agent_connection_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    agent_connection_ref01_match_dt0 = {
      "id" => agent_connection_ref01_data["id"],
    }
    agent_connection_ref01_match_dt0["agent_id"] = setup[:idmap]["agent_id"] || setup[:idmap]["agent01"]
    agent_connection_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    agent_connection_ref01_data_dt0_loaded = agent_connection_ref01_ent.load(agent_connection_ref01_match_dt0, nil)
    agent_connection_ref01_data_dt0_load_result = Helpers.to_map(agent_connection_ref01_data_dt0_loaded.respond_to?(:data_get) ? agent_connection_ref01_data_dt0_loaded.data_get : agent_connection_ref01_data_dt0_loaded)
    assert !agent_connection_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(agent_connection_ref01_data_dt0_load_result["id"], agent_connection_ref01_data["id"])

      return
    end

    if setup[:live]
      ["agent01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_AGENT_CONNECTION_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    agent_connection_ref01_ent = client.AgentConnection(nil)
    agent_connection_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.agent_connection"), "agent_connection_ref01"))
    agent_connection_ref01_data["agent_id"] = setup[:idmap]["agent01"]
    agent_connection_ref01_data["organization_id"] = setup[:idmap]["organization01"]

    agent_connection_ref01_data_result = agent_connection_ref01_ent.create(agent_connection_ref01_data, nil)
    agent_connection_ref01_data = Helpers.to_map(agent_connection_ref01_data_result.respond_to?(:data_get) ? agent_connection_ref01_data_result.data_get : agent_connection_ref01_data_result)
    assert !agent_connection_ref01_data.nil?
    assert !agent_connection_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    agent_connection_ref01_match = {
      "agent_id" => setup[:idmap]["agent01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    agent_connection_ref01_list_result = agent_connection_ref01_ent.list(agent_connection_ref01_match, nil)
    assert agent_connection_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(agent_connection_ref01_list_result),
      { "id" => agent_connection_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    agent_connection_ref01_data_up0_up = {
      "id" => agent_connection_ref01_data["id"],
      "agent_id" => setup[:idmap]["agent_id"],
      "organization_id" => setup[:idmap]["organization_id"],
    }

    agent_connection_ref01_markdef_up0_name = "agent_card_url"
    agent_connection_ref01_markdef_up0_value = "Mark01-agent_connection_ref01_#{setup[:now]}"
    agent_connection_ref01_data_up0_up[agent_connection_ref01_markdef_up0_name] = agent_connection_ref01_markdef_up0_value

    agent_connection_ref01_resdata_up0_result = agent_connection_ref01_ent.update(agent_connection_ref01_data_up0_up, nil)
    agent_connection_ref01_resdata_up0 = Helpers.to_map(agent_connection_ref01_resdata_up0_result.respond_to?(:data_get) ? agent_connection_ref01_resdata_up0_result.data_get : agent_connection_ref01_resdata_up0_result)
    assert !agent_connection_ref01_resdata_up0.nil?
    assert Runner.live_same_id(agent_connection_ref01_resdata_up0["id"], agent_connection_ref01_data_up0_up["id"])
    assert_equal agent_connection_ref01_resdata_up0[agent_connection_ref01_markdef_up0_name], agent_connection_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    agent_connection_ref01_match_dt0 = {
      "id" => agent_connection_ref01_data["id"],
    }
    agent_connection_ref01_match_dt0["agent_id"] = setup[:idmap]["agent_id"] || setup[:idmap]["agent01"]
    agent_connection_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    agent_connection_ref01_data_dt0_loaded = agent_connection_ref01_ent.load(agent_connection_ref01_match_dt0, nil)
    agent_connection_ref01_data_dt0_load_result = Helpers.to_map(agent_connection_ref01_data_dt0_loaded.respond_to?(:data_get) ? agent_connection_ref01_data_dt0_loaded.data_get : agent_connection_ref01_data_dt0_loaded)
    assert !agent_connection_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(agent_connection_ref01_data_dt0_load_result["id"], agent_connection_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    agent_connection_ref01_match_rm0 = {
      "id" => agent_connection_ref01_data["id"],
    }
    agent_connection_ref01_match_rm0["agent_id"] = setup[:idmap]["agent_id"] || setup[:idmap]["agent01"]
    agent_connection_ref01_match_rm0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    agent_connection_ref01_ent.remove(agent_connection_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    agent_connection_ref01_match_rt0 = {
      "agent_id" => setup[:idmap]["agent01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    agent_connection_ref01_list_rt0_result = agent_connection_ref01_ent.list(agent_connection_ref01_match_rt0, nil)
    assert agent_connection_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(agent_connection_ref01_list_rt0_result),
      { "id" => agent_connection_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def agent_connection_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "agent_connection", "AgentConnectionTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["agent_connection01", "agent_connection02", "agent_connection03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_AGENT_CONNECTION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_AGENT_CONNECTION_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_AGENT_CONNECTION_ENTID"])
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
