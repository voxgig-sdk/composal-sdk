# HostingAppDomain entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class HostingAppDomainEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.HostingAppDomain(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.HostingAppDomain(nil).load({ "app_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = hosting_app_domain_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "hosting_app_domain." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"hosting_app_domain.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/domains/{id}/disable\"}"
      puts "LIVE STEP {\"id\":\"hosting_app_domain.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/domains/{id}\"}"
      puts "LIVE STEP {\"id\":\"hosting_app_domain.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only hosting_app_domain.create.0 gives\"}"
      puts "LIVE STEP {\"id\":\"hosting_app_domain.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/domains/{id}\"}"
      skip("Live coverage incomplete: hosting_app_domain.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/domains/{id}/disable); hosting_app_domain.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/domains/{id}); hosting_app_domain.load.2 excluded (GET-only live run: reads a record only hosting_app_domain.create.0 gives); hosting_app_domain.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/domains/{id})")
    end

    if setup[:live]
      ["app01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_HOSTING_APP_DOMAIN_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    hosting_app_domain_ref01_ent = client.HostingAppDomain(nil)
    hosting_app_domain_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.hosting_app_domain"), "hosting_app_domain_ref01"))
    hosting_app_domain_ref01_data["app_id"] = setup[:idmap]["app01"]

    hosting_app_domain_ref01_data_result = hosting_app_domain_ref01_ent.create(hosting_app_domain_ref01_data, nil)
    hosting_app_domain_ref01_data = Helpers.to_map(hosting_app_domain_ref01_data_result.respond_to?(:data_get) ? hosting_app_domain_ref01_data_result.data_get : hosting_app_domain_ref01_data_result)
    assert !hosting_app_domain_ref01_data.nil?
    assert !hosting_app_domain_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # UPDATE
    hosting_app_domain_ref01_data_up0_up = {
      "id" => hosting_app_domain_ref01_data["id"],
      "app_id" => setup[:idmap]["app_id"],
    }

    hosting_app_domain_ref01_markdef_up0_name = "app_environment_id"
    hosting_app_domain_ref01_markdef_up0_value = "Mark01-hosting_app_domain_ref01_#{setup[:now]}"
    hosting_app_domain_ref01_data_up0_up[hosting_app_domain_ref01_markdef_up0_name] = hosting_app_domain_ref01_markdef_up0_value

    hosting_app_domain_ref01_resdata_up0_result = hosting_app_domain_ref01_ent.update(hosting_app_domain_ref01_data_up0_up, nil)
    hosting_app_domain_ref01_resdata_up0 = Helpers.to_map(hosting_app_domain_ref01_resdata_up0_result.respond_to?(:data_get) ? hosting_app_domain_ref01_resdata_up0_result.data_get : hosting_app_domain_ref01_resdata_up0_result)
    assert !hosting_app_domain_ref01_resdata_up0.nil?
    assert Runner.live_same_id(hosting_app_domain_ref01_resdata_up0["id"], hosting_app_domain_ref01_data_up0_up["id"])
    assert_equal hosting_app_domain_ref01_resdata_up0[hosting_app_domain_ref01_markdef_up0_name], hosting_app_domain_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    hosting_app_domain_ref01_match_dt0 = {
      "id" => hosting_app_domain_ref01_data["id"],
    }
    hosting_app_domain_ref01_data_dt0_loaded = hosting_app_domain_ref01_ent.load(hosting_app_domain_ref01_match_dt0, nil)
    hosting_app_domain_ref01_data_dt0_load_result = Helpers.to_map(hosting_app_domain_ref01_data_dt0_loaded.respond_to?(:data_get) ? hosting_app_domain_ref01_data_dt0_loaded.data_get : hosting_app_domain_ref01_data_dt0_loaded)
    assert !hosting_app_domain_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(hosting_app_domain_ref01_data_dt0_load_result["id"], hosting_app_domain_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    hosting_app_domain_ref01_match_rm0 = {
      "id" => hosting_app_domain_ref01_data["id"],
    }
    hosting_app_domain_ref01_match_rm0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    hosting_app_domain_ref01_ent.remove(hosting_app_domain_ref01_match_rm0, nil)

  end
end

def hosting_app_domain_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "hosting_app_domain", "HostingAppDomainTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["hosting_app_domain01", "hosting_app_domain02", "hosting_app_domain03", "app01", "app02", "app03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_HOSTING_APP_DOMAIN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_HOSTING_APP_DOMAIN_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_HOSTING_APP_DOMAIN_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["app_id"].nil?
    idmap_resolved["app_id"] = idmap_resolved["app01"]
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
