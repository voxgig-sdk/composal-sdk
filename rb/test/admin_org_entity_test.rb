# AdminOrg entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class AdminOrgEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.AdminOrg(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AdminOrg(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = admin_org_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "admin_org." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"admin_org.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/admin/organizations/{org_slug}/checkout_session\"}"
      puts "LIVE STEP {\"id\":\"admin_org.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/admin/organizations/{org_slug}/billing_agreement\"}"
      puts "LIVE STEP {\"id\":\"admin_org.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only admin_org.create.0 gives\"}"
      skip("Live coverage incomplete: admin_org.create.0 excluded (GET-only live run: needs POST /api/v1/admin/organizations/{org_slug}/checkout_session); admin_org.update.1 excluded (GET-only live run: needs PUT /api/v1/admin/organizations/{org_slug}/billing_agreement); admin_org.load.2 excluded (GET-only live run: reads a record only admin_org.create.0 gives)")
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    admin_org_ref01_ent = client.AdminOrg(nil)
    admin_org_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.admin_org"), "admin_org_ref01"))

    admin_org_ref01_data_result = admin_org_ref01_ent.create(admin_org_ref01_data, nil)
    admin_org_ref01_data = Helpers.to_map(admin_org_ref01_data_result.respond_to?(:data_get) ? admin_org_ref01_data_result.data_get : admin_org_ref01_data_result)
    assert !admin_org_ref01_data.nil?
    assert !admin_org_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LOAD
    admin_org_ref01_match_dt0 = {
      "id" => admin_org_ref01_data["id"],
    }
    admin_org_ref01_data_dt0_loaded = admin_org_ref01_ent.load(admin_org_ref01_match_dt0, nil)
    admin_org_ref01_data_dt0_load_result = Helpers.to_map(admin_org_ref01_data_dt0_loaded.respond_to?(:data_get) ? admin_org_ref01_data_dt0_loaded.data_get : admin_org_ref01_data_dt0_loaded)
    assert !admin_org_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(admin_org_ref01_data_dt0_load_result["id"], admin_org_ref01_data["id"])

  end
end

def admin_org_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "admin_org", "AdminOrgTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["admin_org01", "admin_org02", "admin_org03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_ADMIN_ORG_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_ADMIN_ORG_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_ADMIN_ORG_ENTID"])
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
