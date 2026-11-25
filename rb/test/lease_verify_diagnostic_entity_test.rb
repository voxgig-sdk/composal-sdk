# LeaseVerifyDiagnostic entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class LeaseVerifyDiagnosticEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.LeaseVerifyDiagnostic(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.LeaseVerifyDiagnostic(nil).create({ "lease_id" => 1, "swarm_id" => "x", "task_id" => "x", "browser_events" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = lease_verify_diagnostic_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "lease_verify_diagnostic." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"lease_verify_diagnostic.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics\"}"
      skip("Live coverage incomplete: lease_verify_diagnostic.create.0 excluded (GET-only live run: needs POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics)")
    end

    if setup[:live]
      ["lease01", "swarm01", "task01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    lease_verify_diagnostic_ref01_ent = client.LeaseVerifyDiagnostic(nil)
    lease_verify_diagnostic_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.lease_verify_diagnostic"), "lease_verify_diagnostic_ref01"))
    lease_verify_diagnostic_ref01_data["lease_id"] = setup[:idmap]["lease01"]
    lease_verify_diagnostic_ref01_data["swarm_id"] = setup[:idmap]["swarm01"]
    lease_verify_diagnostic_ref01_data["task_id"] = setup[:idmap]["task01"]

    lease_verify_diagnostic_ref01_data_result = lease_verify_diagnostic_ref01_ent.create(lease_verify_diagnostic_ref01_data, nil)
    lease_verify_diagnostic_ref01_data = Helpers.to_map(lease_verify_diagnostic_ref01_data_result.respond_to?(:data_get) ? lease_verify_diagnostic_ref01_data_result.data_get : lease_verify_diagnostic_ref01_data_result)
    assert !lease_verify_diagnostic_ref01_data.nil?

  end
end

def lease_verify_diagnostic_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "lease_verify_diagnostic", "LeaseVerifyDiagnosticTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["lease_verify_diagnostic01", "lease_verify_diagnostic02", "lease_verify_diagnostic03", "lease01", "swarm01", "task01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID"])
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
