# CdnHostname entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class CdnHostnameEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.CdnHostname(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CdnHostname(nil).load({ "app_id" => 1, "cdn_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = cdn_hostname_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "cdn_hostname." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"cdn_hostname.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames\"}"
      puts "LIVE STEP {\"id\":\"cdn_hostname.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}\"}"
      puts "LIVE STEP {\"id\":\"cdn_hostname.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only cdn_hostname.create.0 gives\"}"
      puts "LIVE STEP {\"id\":\"cdn_hostname.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}\"}"
      skip("Live coverage incomplete: cdn_hostname.create.0 excluded (GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames); cdn_hostname.update.1 excluded (GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}); cdn_hostname.load.2 excluded (GET-only live run: reads a record only cdn_hostname.create.0 gives); cdn_hostname.remove.3 excluded (GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id})")
    end

    if setup[:live]
      ["app01", "cdn01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_CDN_HOSTNAME_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    cdn_hostname_ref01_ent = client.CdnHostname(nil)
    cdn_hostname_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.cdn_hostname"), "cdn_hostname_ref01"))
    cdn_hostname_ref01_data["app_id"] = setup[:idmap]["app01"]
    cdn_hostname_ref01_data["cdn_id"] = setup[:idmap]["cdn01"]

    cdn_hostname_ref01_data_result = cdn_hostname_ref01_ent.create(cdn_hostname_ref01_data, nil)
    cdn_hostname_ref01_data = Helpers.to_map(cdn_hostname_ref01_data_result.respond_to?(:data_get) ? cdn_hostname_ref01_data_result.data_get : cdn_hostname_ref01_data_result)
    assert !cdn_hostname_ref01_data.nil?
    assert !cdn_hostname_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # UPDATE
    cdn_hostname_ref01_data_up0_up = {
      "id" => cdn_hostname_ref01_data["id"],
      "app_id" => setup[:idmap]["app_id"],
      "cdn_id" => setup[:idmap]["cdn_id"],
    }

    cdn_hostname_ref01_markdef_up0_name = "app_cdn_distribution_id"
    cdn_hostname_ref01_markdef_up0_value = "Mark01-cdn_hostname_ref01_#{setup[:now]}"
    cdn_hostname_ref01_data_up0_up[cdn_hostname_ref01_markdef_up0_name] = cdn_hostname_ref01_markdef_up0_value

    cdn_hostname_ref01_resdata_up0_result = cdn_hostname_ref01_ent.update(cdn_hostname_ref01_data_up0_up, nil)
    cdn_hostname_ref01_resdata_up0 = Helpers.to_map(cdn_hostname_ref01_resdata_up0_result.respond_to?(:data_get) ? cdn_hostname_ref01_resdata_up0_result.data_get : cdn_hostname_ref01_resdata_up0_result)
    assert !cdn_hostname_ref01_resdata_up0.nil?
    assert Runner.live_same_id(cdn_hostname_ref01_resdata_up0["id"], cdn_hostname_ref01_data_up0_up["id"])
    assert_equal cdn_hostname_ref01_resdata_up0[cdn_hostname_ref01_markdef_up0_name], cdn_hostname_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    cdn_hostname_ref01_match_dt0 = {
      "id" => cdn_hostname_ref01_data["id"],
    }
    cdn_hostname_ref01_match_dt0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    cdn_hostname_ref01_data_dt0_loaded = cdn_hostname_ref01_ent.load(cdn_hostname_ref01_match_dt0, nil)
    cdn_hostname_ref01_data_dt0_load_result = Helpers.to_map(cdn_hostname_ref01_data_dt0_loaded.respond_to?(:data_get) ? cdn_hostname_ref01_data_dt0_loaded.data_get : cdn_hostname_ref01_data_dt0_loaded)
    assert !cdn_hostname_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(cdn_hostname_ref01_data_dt0_load_result["id"], cdn_hostname_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    cdn_hostname_ref01_match_rm0 = {
      "id" => cdn_hostname_ref01_data["id"],
    }
    cdn_hostname_ref01_match_rm0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    cdn_hostname_ref01_match_rm0["cdn_id"] = setup[:idmap]["cdn_id"] || setup[:idmap]["cdn01"]
    cdn_hostname_ref01_ent.remove(cdn_hostname_ref01_match_rm0, nil)

  end
end

def cdn_hostname_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "cdn_hostname", "CdnHostnameTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["cdn_hostname01", "cdn_hostname02", "cdn_hostname03", "app01", "app02", "app03", "cdn01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_CDN_HOSTNAME_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_CDN_HOSTNAME_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_CDN_HOSTNAME_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["app_id"].nil?
    idmap_resolved["app_id"] = idmap_resolved["app01"]
  end
  if idmap_resolved["cdn_id"].nil?
    idmap_resolved["cdn_id"] = idmap_resolved["cdn01"]
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
