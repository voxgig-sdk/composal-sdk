# SiteAccessKey entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class SiteAccessKeyEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.SiteAccessKey(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.SiteAccessKey(nil).list({ "organization_id" => 1, "site_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = site_access_key_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "site_access_key." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"site_access_key.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys\"}"
      puts "LIVE STEP {\"id\":\"site_access_key.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/access_keys/{key_id}\"}"
      puts "LIVE STEP {\"id\":\"site_access_key.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["organization01", "site01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    site_access_key_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.site_access_key")))
    site_access_key_ref01_data = nil
    if site_access_key_ref01_data_raw.length > 0
      site_access_key_ref01_data = Helpers.to_map(site_access_key_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    site_access_key_ref01_ent = client.SiteAccessKey(nil)
    site_access_key_ref01_match = {
      "organization_id" => setup[:idmap]["organization01"],
      "site_id" => setup[:idmap]["site01"],
    }

    site_access_key_ref01_list_result = site_access_key_ref01_ent.list(site_access_key_ref01_match, nil)
    assert site_access_key_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["organization01", "site01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    site_access_key_ref01_ent = client.SiteAccessKey(nil)
    site_access_key_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.site_access_key"), "site_access_key_ref01"))
    site_access_key_ref01_data["organization_id"] = setup[:idmap]["organization01"]
    site_access_key_ref01_data["site_id"] = setup[:idmap]["site01"]

    site_access_key_ref01_data_result = site_access_key_ref01_ent.create(site_access_key_ref01_data, nil)
    site_access_key_ref01_data = Helpers.to_map(site_access_key_ref01_data_result.respond_to?(:data_get) ? site_access_key_ref01_data_result.data_get : site_access_key_ref01_data_result)
    assert !site_access_key_ref01_data.nil?
    assert !site_access_key_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    site_access_key_ref01_match = {
      "organization_id" => setup[:idmap]["organization01"],
      "site_id" => setup[:idmap]["site01"],
    }

    site_access_key_ref01_list_result = site_access_key_ref01_ent.list(site_access_key_ref01_match, nil)
    assert site_access_key_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(site_access_key_ref01_list_result),
      { "id" => site_access_key_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # REMOVE
    site_access_key_ref01_match_rm0 = {
      "id" => site_access_key_ref01_data["id"],
    }
    site_access_key_ref01_match_rm0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    site_access_key_ref01_match_rm0["site_id"] = setup[:idmap]["site_id"] || setup[:idmap]["site01"]
    site_access_key_ref01_ent.remove(site_access_key_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    site_access_key_ref01_match_rt0 = {
      "organization_id" => setup[:idmap]["organization01"],
      "site_id" => setup[:idmap]["site01"],
    }

    site_access_key_ref01_list_rt0_result = site_access_key_ref01_ent.list(site_access_key_ref01_match_rt0, nil)
    assert site_access_key_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(site_access_key_ref01_list_rt0_result),
      { "id" => site_access_key_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def site_access_key_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "site_access_key", "SiteAccessKeyTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["site_access_key01", "site_access_key02", "site_access_key03", "organization01", "organization02", "organization03", "site01", "site02", "site03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_SITE_ACCESS_KEY_ENTID"])
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
