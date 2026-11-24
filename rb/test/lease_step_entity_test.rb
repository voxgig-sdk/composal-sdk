# LeaseStep entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class LeaseStepEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.LeaseStep(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.LeaseStep(nil).update({ "id" => 1, "lease_id" => "x", "node_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = lease_step_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "lease_step." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"lease_step.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ci/nodes/{id}/leases/{lease_id}/steps/{ci_step_id}\"}"
      skip("Live coverage incomplete: lease_step.update.0 excluded (GET-only live run: needs PATCH /api/v1/ci/nodes/{id}/leases/{lease_id}/steps/{ci_step_id})")
    end

    if setup[:live]
      ["lease01", "node01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_LEASE_STEP_ENTID")
        end
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a lease_step record it did not create")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    lease_step_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.lease_step")))
    lease_step_ref01_data = nil
    if lease_step_ref01_data_raw.length > 0
      lease_step_ref01_data = Helpers.to_map(lease_step_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # UPDATE
    lease_step_ref01_ent = client.LeaseStep(nil)
    lease_step_ref01_data_up0_up = {
      "id" => lease_step_ref01_data["id"],
      "lease_id" => setup[:idmap]["lease_id"],
      "node_id" => setup[:idmap]["node_id"],
    }

    lease_step_ref01_resdata_up0_result = lease_step_ref01_ent.update(lease_step_ref01_data_up0_up, nil)
    lease_step_ref01_resdata_up0 = Helpers.to_map(lease_step_ref01_resdata_up0_result.respond_to?(:data_get) ? lease_step_ref01_resdata_up0_result.data_get : lease_step_ref01_resdata_up0_result)
    assert !lease_step_ref01_resdata_up0.nil?
    assert Runner.live_same_id(lease_step_ref01_resdata_up0["id"], lease_step_ref01_data_up0_up["id"]) unless setup[:live]

  end
end

def lease_step_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "lease_step", "LeaseStepTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["lease_step01", "lease_step02", "lease_step03", "node01", "node02", "node03", "lease01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_LEASE_STEP_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_LEASE_STEP_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_LEASE_STEP_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["lease_id"].nil?
    idmap_resolved["lease_id"] = idmap_resolved["lease01"]
  end
  if idmap_resolved["node_id"].nil?
    idmap_resolved["node_id"] = idmap_resolved["node01"]
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
