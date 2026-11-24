# SiteSecret entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class SiteSecretEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.SiteSecret(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.SiteSecret(nil).update({ "id" => 1, "organization_id" => "x", "site_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = site_secret_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "site_secret." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"site_secret.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}\"}"
      skip("Live coverage incomplete: site_secret.update.0 excluded (GET-only live run: needs PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name})")
    end

    if setup[:live]
      ["organization01", "site01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SITE_SECRET_ENTID")
        end
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a site_secret record it did not create")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    site_secret_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.site_secret")))
    site_secret_ref01_data = nil
    if site_secret_ref01_data_raw.length > 0
      site_secret_ref01_data = Helpers.to_map(site_secret_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # UPDATE
    site_secret_ref01_ent = client.SiteSecret(nil)
    site_secret_ref01_data_up0_up = {
      "id" => site_secret_ref01_data["id"],
      "organization_id" => setup[:idmap]["organization_id"],
      "site_id" => setup[:idmap]["site_id"],
    }

    site_secret_ref01_markdef_up0_name = "native_agent_id"
    site_secret_ref01_markdef_up0_value = "Mark01-site_secret_ref01_#{setup[:now]}"
    site_secret_ref01_data_up0_up[site_secret_ref01_markdef_up0_name] = site_secret_ref01_markdef_up0_value

    site_secret_ref01_resdata_up0_result = site_secret_ref01_ent.update(site_secret_ref01_data_up0_up, nil)
    site_secret_ref01_resdata_up0 = Helpers.to_map(site_secret_ref01_resdata_up0_result.respond_to?(:data_get) ? site_secret_ref01_resdata_up0_result.data_get : site_secret_ref01_resdata_up0_result)
    assert !site_secret_ref01_resdata_up0.nil?
    assert Runner.live_same_id(site_secret_ref01_resdata_up0["id"], site_secret_ref01_data_up0_up["id"]) unless setup[:live]
    assert_equal site_secret_ref01_resdata_up0[site_secret_ref01_markdef_up0_name], site_secret_ref01_markdef_up0_value

  end
end

def site_secret_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "site_secret", "SiteSecretTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["site_secret01", "site_secret02", "site_secret03", "organization01", "organization02", "organization03", "site01", "site02", "site03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_SITE_SECRET_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_SITE_SECRET_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_SITE_SECRET_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["organization_id"].nil?
    idmap_resolved["organization_id"] = idmap_resolved["organization01"]
  end
  if idmap_resolved["site_id"].nil?
    idmap_resolved["site_id"] = idmap_resolved["site01"]
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
