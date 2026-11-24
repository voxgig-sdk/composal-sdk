# ServiceEndpoint entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class ServiceEndpointEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.ServiceEndpoint(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ServiceEndpoint(nil).list({ "app_id" => 1, "service_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = service_endpoint_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "service_endpoint." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"service_endpoint.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints\"}"
      puts "LIVE STEP {\"id\":\"service_endpoint.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}\"}"
      puts "LIVE STEP {\"id\":\"service_endpoint.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/services/{service_id}/endpoints/{id}\"}"
      puts "LIVE STEP {\"id\":\"service_endpoint.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["app01", "service01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["service_endpoint01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "service_endpoint", "id", _live_id) do
        client.ServiceEndpoint(nil).list({"app_id" => setup[:idmap]["app01"], "service_id" => setup[:idmap]["service01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    service_endpoint_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.service_endpoint")))
    service_endpoint_ref01_data = nil
    if service_endpoint_ref01_data_raw.length > 0
      service_endpoint_ref01_data = Helpers.to_map(service_endpoint_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    service_endpoint_ref01_ent = client.ServiceEndpoint(nil)
    service_endpoint_ref01_match = {
      "app_id" => setup[:idmap]["app01"],
      "service_id" => setup[:idmap]["service01"],
    }

    service_endpoint_ref01_list_result = service_endpoint_ref01_ent.list(service_endpoint_ref01_match, nil)
    assert service_endpoint_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    service_endpoint_ref01_match_dt0 = {
      "id" => service_endpoint_ref01_data["id"],
    }
    service_endpoint_ref01_match_dt0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    service_endpoint_ref01_match_dt0["service_id"] = setup[:idmap]["service_id"] || setup[:idmap]["service01"]
    service_endpoint_ref01_data_dt0_loaded = service_endpoint_ref01_ent.load(service_endpoint_ref01_match_dt0, nil)
    service_endpoint_ref01_data_dt0_load_result = Helpers.to_map(service_endpoint_ref01_data_dt0_loaded.respond_to?(:data_get) ? service_endpoint_ref01_data_dt0_loaded.data_get : service_endpoint_ref01_data_dt0_loaded)
    assert !service_endpoint_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(service_endpoint_ref01_data_dt0_load_result["id"], service_endpoint_ref01_data["id"]) unless setup[:live]

      return
    end

    if setup[:live]
      ["app01", "service01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    service_endpoint_ref01_ent = client.ServiceEndpoint(nil)
    service_endpoint_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.service_endpoint"), "service_endpoint_ref01"))
    service_endpoint_ref01_data["app_id"] = setup[:idmap]["app01"]
    service_endpoint_ref01_data["service_id"] = setup[:idmap]["service01"]

    service_endpoint_ref01_data_result = service_endpoint_ref01_ent.create(service_endpoint_ref01_data, nil)
    service_endpoint_ref01_data = Helpers.to_map(service_endpoint_ref01_data_result.respond_to?(:data_get) ? service_endpoint_ref01_data_result.data_get : service_endpoint_ref01_data_result)
    assert !service_endpoint_ref01_data.nil?
    assert !service_endpoint_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    service_endpoint_ref01_match = {
      "app_id" => setup[:idmap]["app01"],
      "service_id" => setup[:idmap]["service01"],
    }

    service_endpoint_ref01_list_result = service_endpoint_ref01_ent.list(service_endpoint_ref01_match, nil)
    assert service_endpoint_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(service_endpoint_ref01_list_result),
      { "id" => service_endpoint_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    service_endpoint_ref01_data_up0_up = {
      "id" => service_endpoint_ref01_data["id"],
      "app_id" => setup[:idmap]["app_id"],
      "service_id" => setup[:idmap]["service_id"],
    }

    service_endpoint_ref01_resdata_up0_result = service_endpoint_ref01_ent.update(service_endpoint_ref01_data_up0_up, nil)
    service_endpoint_ref01_resdata_up0 = Helpers.to_map(service_endpoint_ref01_resdata_up0_result.respond_to?(:data_get) ? service_endpoint_ref01_resdata_up0_result.data_get : service_endpoint_ref01_resdata_up0_result)
    assert !service_endpoint_ref01_resdata_up0.nil?
    assert Runner.live_same_id(service_endpoint_ref01_resdata_up0["id"], service_endpoint_ref01_data_up0_up["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # LOAD
    service_endpoint_ref01_match_dt0 = {
      "id" => service_endpoint_ref01_data["id"],
    }
    service_endpoint_ref01_match_dt0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    service_endpoint_ref01_match_dt0["service_id"] = setup[:idmap]["service_id"] || setup[:idmap]["service01"]
    service_endpoint_ref01_data_dt0_loaded = service_endpoint_ref01_ent.load(service_endpoint_ref01_match_dt0, nil)
    service_endpoint_ref01_data_dt0_load_result = Helpers.to_map(service_endpoint_ref01_data_dt0_loaded.respond_to?(:data_get) ? service_endpoint_ref01_data_dt0_loaded.data_get : service_endpoint_ref01_data_dt0_loaded)
    assert !service_endpoint_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(service_endpoint_ref01_data_dt0_load_result["id"], service_endpoint_ref01_data["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # REMOVE
    service_endpoint_ref01_match_rm0 = {
      "id" => service_endpoint_ref01_data["id"],
    }
    service_endpoint_ref01_match_rm0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    service_endpoint_ref01_match_rm0["service_id"] = setup[:idmap]["service_id"] || setup[:idmap]["service01"]
    service_endpoint_ref01_ent.remove(service_endpoint_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    service_endpoint_ref01_match_rt0 = {
      "app_id" => setup[:idmap]["app01"],
      "service_id" => setup[:idmap]["service01"],
    }

    service_endpoint_ref01_list_rt0_result = service_endpoint_ref01_ent.list(service_endpoint_ref01_match_rt0, nil)
    assert service_endpoint_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(service_endpoint_ref01_list_rt0_result),
      { "id" => service_endpoint_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def service_endpoint_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "service_endpoint", "ServiceEndpointTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["service_endpoint01", "service_endpoint02", "service_endpoint03", "app01", "app02", "app03", "service01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_SERVICE_ENDPOINT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["app_id"].nil?
    idmap_resolved["app_id"] = idmap_resolved["app01"]
  end
  if idmap_resolved["service_id"].nil?
    idmap_resolved["service_id"] = idmap_resolved["service01"]
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
