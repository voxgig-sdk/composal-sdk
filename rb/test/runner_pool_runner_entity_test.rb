# RunnerPoolRunner entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class RunnerPoolRunnerEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.RunnerPoolRunner(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.RunnerPoolRunner(nil).load({ "id" => 1, "runner_pool_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = runner_pool_runner_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "runner_pool_runner." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"runner_pool_runner.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat\"}"
      puts "LIVE STEP {\"id\":\"runner_pool_runner.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}\"}"
      puts "LIVE STEP {\"id\":\"runner_pool_runner.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only runner_pool_runner.create.0 gives\"}"
      skip("Live coverage incomplete: runner_pool_runner.create.0 excluded (GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat); runner_pool_runner.update.1 excluded (GET-only live run: needs PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}); runner_pool_runner.load.2 excluded (GET-only live run: reads a record only runner_pool_runner.create.0 gives)")
    end

    if setup[:live]
      ["runner_pool01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    runner_pool_runner_ref01_ent = client.RunnerPoolRunner(nil)
    runner_pool_runner_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.runner_pool_runner"), "runner_pool_runner_ref01"))
    runner_pool_runner_ref01_data["runner_pool_id"] = setup[:idmap]["runner_pool01"]

    runner_pool_runner_ref01_data_result = runner_pool_runner_ref01_ent.create(runner_pool_runner_ref01_data, nil)
    runner_pool_runner_ref01_data = Helpers.to_map(runner_pool_runner_ref01_data_result.respond_to?(:data_get) ? runner_pool_runner_ref01_data_result.data_get : runner_pool_runner_ref01_data_result)
    assert !runner_pool_runner_ref01_data.nil?
    assert !runner_pool_runner_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # UPDATE
    runner_pool_runner_ref01_data_up0_up = {
      "id" => runner_pool_runner_ref01_data["id"],
      "runner_pool_id" => setup[:idmap]["runner_pool_id"],
    }

    runner_pool_runner_ref01_resdata_up0_result = runner_pool_runner_ref01_ent.update(runner_pool_runner_ref01_data_up0_up, nil)
    runner_pool_runner_ref01_resdata_up0 = Helpers.to_map(runner_pool_runner_ref01_resdata_up0_result.respond_to?(:data_get) ? runner_pool_runner_ref01_resdata_up0_result.data_get : runner_pool_runner_ref01_resdata_up0_result)
    assert !runner_pool_runner_ref01_resdata_up0.nil?
    assert Runner.live_same_id(runner_pool_runner_ref01_resdata_up0["id"], runner_pool_runner_ref01_data_up0_up["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # LOAD
    runner_pool_runner_ref01_match_dt0 = {
      "id" => runner_pool_runner_ref01_data["id"],
    }
    runner_pool_runner_ref01_data_dt0_loaded = runner_pool_runner_ref01_ent.load(runner_pool_runner_ref01_match_dt0, nil)
    runner_pool_runner_ref01_data_dt0_load_result = Helpers.to_map(runner_pool_runner_ref01_data_dt0_loaded.respond_to?(:data_get) ? runner_pool_runner_ref01_data_dt0_loaded.data_get : runner_pool_runner_ref01_data_dt0_loaded)
    assert !runner_pool_runner_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(runner_pool_runner_ref01_data_dt0_load_result["id"], runner_pool_runner_ref01_data["id"]) unless setup[:live]

  end
end

def runner_pool_runner_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "runner_pool_runner", "RunnerPoolRunnerTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["runner_pool_runner01", "runner_pool_runner02", "runner_pool_runner03", "runner_pool01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["runner_pool_id"].nil?
    idmap_resolved["runner_pool_id"] = idmap_resolved["runner_pool01"]
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
