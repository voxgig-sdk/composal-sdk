# StaticSiteDeployment entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class StaticSiteDeploymentEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.StaticSiteDeployment(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.StaticSiteDeployment(nil).list({ "static_site_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = static_site_deployment_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "static_site_deployment." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"static_site_deployment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/static_sites/{static_site_id}/deployments/{id}/activate\"}"
    if setup[:live]
      ["static_site01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["static_site_deployment01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "static_site_deployment", "id", _live_id) do
        client.StaticSiteDeployment(nil).list({"static_site_id" => setup[:idmap]["static_site01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    static_site_deployment_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.static_site_deployment")))
    static_site_deployment_ref01_data = nil
    if static_site_deployment_ref01_data_raw.length > 0
      static_site_deployment_ref01_data = Helpers.to_map(static_site_deployment_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    static_site_deployment_ref01_ent = client.StaticSiteDeployment(nil)
    static_site_deployment_ref01_match = {
      "static_site_id" => setup[:idmap]["static_site01"],
    }

    static_site_deployment_ref01_list_result = static_site_deployment_ref01_ent.list(static_site_deployment_ref01_match, nil)
    assert static_site_deployment_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    static_site_deployment_ref01_match_dt0 = {
      "id" => static_site_deployment_ref01_data["id"],
    }
    static_site_deployment_ref01_match_dt0["static_site_id"] = [String, Numeric, TrueClass, FalseClass].any? { |c| static_site_deployment_ref01_data["static_site_id"].is_a?(c) } ? static_site_deployment_ref01_data["static_site_id"] : (setup[:idmap]["static_site_id"] || setup[:idmap]["static_site01"])
    static_site_deployment_ref01_data_dt0_loaded = static_site_deployment_ref01_ent.load(static_site_deployment_ref01_match_dt0, nil)
    static_site_deployment_ref01_data_dt0_load_result = Helpers.to_map(static_site_deployment_ref01_data_dt0_loaded.respond_to?(:data_get) ? static_site_deployment_ref01_data_dt0_loaded.data_get : static_site_deployment_ref01_data_dt0_loaded)
    assert !static_site_deployment_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(static_site_deployment_ref01_data_dt0_load_result["id"], static_site_deployment_ref01_data["id"])

      return
    end

    if setup[:live]
      ["static_site01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    static_site_deployment_ref01_ent = client.StaticSiteDeployment(nil)
    static_site_deployment_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.static_site_deployment"), "static_site_deployment_ref01"))
    static_site_deployment_ref01_data["static_site_id"] = setup[:idmap]["static_site01"]

    static_site_deployment_ref01_data_result = static_site_deployment_ref01_ent.create(static_site_deployment_ref01_data, nil)
    static_site_deployment_ref01_data = Helpers.to_map(static_site_deployment_ref01_data_result.respond_to?(:data_get) ? static_site_deployment_ref01_data_result.data_get : static_site_deployment_ref01_data_result)
    assert !static_site_deployment_ref01_data.nil?
    assert !static_site_deployment_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    static_site_deployment_ref01_match = {
      "static_site_id" => setup[:idmap]["static_site01"],
    }

    static_site_deployment_ref01_list_result = static_site_deployment_ref01_ent.list(static_site_deployment_ref01_match, nil)
    assert static_site_deployment_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(static_site_deployment_ref01_list_result),
      { "id" => static_site_deployment_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    static_site_deployment_ref01_match_dt0 = {
      "id" => static_site_deployment_ref01_data["id"],
    }
    static_site_deployment_ref01_match_dt0["static_site_id"] = [String, Numeric, TrueClass, FalseClass].any? { |c| static_site_deployment_ref01_data["static_site_id"].is_a?(c) } ? static_site_deployment_ref01_data["static_site_id"] : (setup[:idmap]["static_site_id"] || setup[:idmap]["static_site01"])
    static_site_deployment_ref01_data_dt0_loaded = static_site_deployment_ref01_ent.load(static_site_deployment_ref01_match_dt0, nil)
    static_site_deployment_ref01_data_dt0_load_result = Helpers.to_map(static_site_deployment_ref01_data_dt0_loaded.respond_to?(:data_get) ? static_site_deployment_ref01_data_dt0_loaded.data_get : static_site_deployment_ref01_data_dt0_loaded)
    assert !static_site_deployment_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(static_site_deployment_ref01_data_dt0_load_result["id"], static_site_deployment_ref01_data["id"])

  end
end

def static_site_deployment_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "static_site_deployment", "StaticSiteDeploymentTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["static_site_deployment01", "static_site_deployment02", "static_site_deployment03", "static_site01", "static_site02", "static_site03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
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
