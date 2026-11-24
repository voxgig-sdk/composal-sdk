# SignalIntegration entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class SignalIntegrationEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.SignalIntegration(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.SignalIntegration(nil).list({ "organization_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = signal_integration_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "signal_integration." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"signal_integration.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token\"}"
      puts "LIVE STEP {\"id\":\"signal_integration.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/signal_integrations/{id}\"}"
      puts "LIVE STEP {\"id\":\"signal_integration.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/signal_integrations/{id}\"}"
      puts "LIVE STEP {\"id\":\"signal_integration.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["signal_integration01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "signal_integration", "id", _live_id) do
        client.SignalIntegration(nil).list({"organization_id" => setup[:idmap]["organization01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    signal_integration_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.signal_integration")))
    signal_integration_ref01_data = nil
    if signal_integration_ref01_data_raw.length > 0
      signal_integration_ref01_data = Helpers.to_map(signal_integration_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    signal_integration_ref01_ent = client.SignalIntegration(nil)
    signal_integration_ref01_match = {
      "organization_id" => setup[:idmap]["organization01"],
    }

    signal_integration_ref01_list_result = signal_integration_ref01_ent.list(signal_integration_ref01_match, nil)
    assert signal_integration_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    signal_integration_ref01_match_dt0 = {
      "id" => signal_integration_ref01_data["id"],
    }
    signal_integration_ref01_match_dt0["organization_id"] = [String, Numeric, TrueClass, FalseClass].any? { |c| signal_integration_ref01_data["organization_id"].is_a?(c) } ? signal_integration_ref01_data["organization_id"] : (setup[:idmap]["organization_id"] || setup[:idmap]["organization01"])
    signal_integration_ref01_data_dt0_loaded = signal_integration_ref01_ent.load(signal_integration_ref01_match_dt0, nil)
    signal_integration_ref01_data_dt0_load_result = Helpers.to_map(signal_integration_ref01_data_dt0_loaded.respond_to?(:data_get) ? signal_integration_ref01_data_dt0_loaded.data_get : signal_integration_ref01_data_dt0_loaded)
    assert !signal_integration_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(signal_integration_ref01_data_dt0_load_result["id"], signal_integration_ref01_data["id"])

      return
    end

    if setup[:live]
      ["organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    signal_integration_ref01_ent = client.SignalIntegration(nil)
    signal_integration_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.signal_integration"), "signal_integration_ref01"))
    signal_integration_ref01_data["organization_id"] = setup[:idmap]["organization01"]

    signal_integration_ref01_data_result = signal_integration_ref01_ent.create(signal_integration_ref01_data, nil)
    signal_integration_ref01_data = Helpers.to_map(signal_integration_ref01_data_result.respond_to?(:data_get) ? signal_integration_ref01_data_result.data_get : signal_integration_ref01_data_result)
    assert !signal_integration_ref01_data.nil?
    assert !signal_integration_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    signal_integration_ref01_match = {
      "organization_id" => setup[:idmap]["organization01"],
    }

    signal_integration_ref01_list_result = signal_integration_ref01_ent.list(signal_integration_ref01_match, nil)
    assert signal_integration_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(signal_integration_ref01_list_result),
      { "id" => signal_integration_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    signal_integration_ref01_data_up0_up = {
      "id" => signal_integration_ref01_data["id"],
      "organization_id" => setup[:idmap]["organization_id"],
    }

    signal_integration_ref01_markdef_up0_name = "api_token"
    signal_integration_ref01_markdef_up0_value = "Mark01-signal_integration_ref01_#{setup[:now]}"
    signal_integration_ref01_data_up0_up[signal_integration_ref01_markdef_up0_name] = signal_integration_ref01_markdef_up0_value

    signal_integration_ref01_resdata_up0_result = signal_integration_ref01_ent.update(signal_integration_ref01_data_up0_up, nil)
    signal_integration_ref01_resdata_up0 = Helpers.to_map(signal_integration_ref01_resdata_up0_result.respond_to?(:data_get) ? signal_integration_ref01_resdata_up0_result.data_get : signal_integration_ref01_resdata_up0_result)
    assert !signal_integration_ref01_resdata_up0.nil?
    assert Runner.live_same_id(signal_integration_ref01_resdata_up0["id"], signal_integration_ref01_data_up0_up["id"])
    assert_equal signal_integration_ref01_resdata_up0[signal_integration_ref01_markdef_up0_name], signal_integration_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    signal_integration_ref01_match_dt0 = {
      "id" => signal_integration_ref01_data["id"],
    }
    signal_integration_ref01_match_dt0["organization_id"] = [String, Numeric, TrueClass, FalseClass].any? { |c| signal_integration_ref01_data["organization_id"].is_a?(c) } ? signal_integration_ref01_data["organization_id"] : (setup[:idmap]["organization_id"] || setup[:idmap]["organization01"])
    signal_integration_ref01_data_dt0_loaded = signal_integration_ref01_ent.load(signal_integration_ref01_match_dt0, nil)
    signal_integration_ref01_data_dt0_load_result = Helpers.to_map(signal_integration_ref01_data_dt0_loaded.respond_to?(:data_get) ? signal_integration_ref01_data_dt0_loaded.data_get : signal_integration_ref01_data_dt0_loaded)
    assert !signal_integration_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(signal_integration_ref01_data_dt0_load_result["id"], signal_integration_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    signal_integration_ref01_match_rm0 = {
      "id" => signal_integration_ref01_data["id"],
    }
    signal_integration_ref01_match_rm0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    signal_integration_ref01_ent.remove(signal_integration_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    signal_integration_ref01_match_rt0 = {
      "organization_id" => setup[:idmap]["organization01"],
    }

    signal_integration_ref01_list_rt0_result = signal_integration_ref01_ent.list(signal_integration_ref01_match_rt0, nil)
    assert signal_integration_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(signal_integration_ref01_list_rt0_result),
      { "id" => signal_integration_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def signal_integration_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "signal_integration", "SignalIntegrationTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["signal_integration01", "signal_integration02", "signal_integration03", "organization01", "organization02", "organization03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
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
