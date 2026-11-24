# CdnDeployment entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class CdnDeploymentEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.CdnDeployment(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CdnDeployment(nil).list({ "app_id" => 1, "cdn_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = cdn_deployment_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "cdn_deployment." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"cdn_deployment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments\"}"
    if setup[:live]
      ["app01", "cdn01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["cdn_deployment01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "cdn_deployment", "id", _live_id) do
        client.CdnDeployment(nil).list({"app_id" => setup[:idmap]["app01"], "cdn_id" => setup[:idmap]["cdn01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    cdn_deployment_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.cdn_deployment")))
    cdn_deployment_ref01_data = nil
    if cdn_deployment_ref01_data_raw.length > 0
      cdn_deployment_ref01_data = Helpers.to_map(cdn_deployment_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    cdn_deployment_ref01_ent = client.CdnDeployment(nil)
    cdn_deployment_ref01_match = {
      "app_id" => setup[:idmap]["app01"],
      "cdn_id" => setup[:idmap]["cdn01"],
    }

    cdn_deployment_ref01_list_result = cdn_deployment_ref01_ent.list(cdn_deployment_ref01_match, nil)
    assert cdn_deployment_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    cdn_deployment_ref01_match_dt0 = {
      "id" => cdn_deployment_ref01_data["id"],
    }
    cdn_deployment_ref01_match_dt0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    cdn_deployment_ref01_match_dt0["cdn_id"] = setup[:idmap]["cdn_id"] || setup[:idmap]["cdn01"]
    cdn_deployment_ref01_data_dt0_loaded = cdn_deployment_ref01_ent.load(cdn_deployment_ref01_match_dt0, nil)
    cdn_deployment_ref01_data_dt0_load_result = Helpers.to_map(cdn_deployment_ref01_data_dt0_loaded.respond_to?(:data_get) ? cdn_deployment_ref01_data_dt0_loaded.data_get : cdn_deployment_ref01_data_dt0_loaded)
    assert !cdn_deployment_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(cdn_deployment_ref01_data_dt0_load_result["id"], cdn_deployment_ref01_data["id"]) unless setup[:live]

      return
    end

    if setup[:live]
      ["app01", "cdn01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    cdn_deployment_ref01_ent = client.CdnDeployment(nil)
    cdn_deployment_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.cdn_deployment"), "cdn_deployment_ref01"))
    cdn_deployment_ref01_data["app_id"] = setup[:idmap]["app01"]
    cdn_deployment_ref01_data["cdn_id"] = setup[:idmap]["cdn01"]

    cdn_deployment_ref01_data_result = cdn_deployment_ref01_ent.create(cdn_deployment_ref01_data, nil)
    cdn_deployment_ref01_data = Helpers.to_map(cdn_deployment_ref01_data_result.respond_to?(:data_get) ? cdn_deployment_ref01_data_result.data_get : cdn_deployment_ref01_data_result)
    assert !cdn_deployment_ref01_data.nil?
    assert !cdn_deployment_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    cdn_deployment_ref01_match = {
      "app_id" => setup[:idmap]["app01"],
      "cdn_id" => setup[:idmap]["cdn01"],
    }

    cdn_deployment_ref01_list_result = cdn_deployment_ref01_ent.list(cdn_deployment_ref01_match, nil)
    assert cdn_deployment_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(cdn_deployment_ref01_list_result),
      { "id" => cdn_deployment_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    cdn_deployment_ref01_match_dt0 = {
      "id" => cdn_deployment_ref01_data["id"],
    }
    cdn_deployment_ref01_match_dt0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    cdn_deployment_ref01_match_dt0["cdn_id"] = setup[:idmap]["cdn_id"] || setup[:idmap]["cdn01"]
    cdn_deployment_ref01_data_dt0_loaded = cdn_deployment_ref01_ent.load(cdn_deployment_ref01_match_dt0, nil)
    cdn_deployment_ref01_data_dt0_load_result = Helpers.to_map(cdn_deployment_ref01_data_dt0_loaded.respond_to?(:data_get) ? cdn_deployment_ref01_data_dt0_loaded.data_get : cdn_deployment_ref01_data_dt0_loaded)
    assert !cdn_deployment_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(cdn_deployment_ref01_data_dt0_load_result["id"], cdn_deployment_ref01_data["id"]) unless setup[:live]

  end
end

def cdn_deployment_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "cdn_deployment", "CdnDeploymentTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["cdn_deployment01", "cdn_deployment02", "cdn_deployment03", "app01", "app02", "app03", "cdn01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID"])
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
