# CiPipelineRun entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class CiPipelineRunEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.CiPipelineRun(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CiPipelineRun(nil).list({ "pipeline_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = ci_pipeline_run_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ci_pipeline_run." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"ci_pipeline_run.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry\"}"
    if setup[:live]
      ["pipeline01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["ci_pipeline_run01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "ci_pipeline_run", "id", _live_id) do
        client.CiPipelineRun(nil).list({"pipeline_id" => setup[:idmap]["pipeline01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    ci_pipeline_run_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.ci_pipeline_run")))
    ci_pipeline_run_ref01_data = nil
    if ci_pipeline_run_ref01_data_raw.length > 0
      ci_pipeline_run_ref01_data = Helpers.to_map(ci_pipeline_run_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    ci_pipeline_run_ref01_ent = client.CiPipelineRun(nil)
    ci_pipeline_run_ref01_match = {
      "pipeline_id" => setup[:idmap]["pipeline01"],
    }

    ci_pipeline_run_ref01_list_result = ci_pipeline_run_ref01_ent.list(ci_pipeline_run_ref01_match, nil)
    assert ci_pipeline_run_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    ci_pipeline_run_ref01_match_dt0 = {
      "id" => ci_pipeline_run_ref01_data["id"],
    }
    ci_pipeline_run_ref01_match_dt0["pipeline_id"] = setup[:idmap]["pipeline_id"] || setup[:idmap]["pipeline01"]
    ci_pipeline_run_ref01_data_dt0_loaded = ci_pipeline_run_ref01_ent.load(ci_pipeline_run_ref01_match_dt0, nil)
    ci_pipeline_run_ref01_data_dt0_load_result = Helpers.to_map(ci_pipeline_run_ref01_data_dt0_loaded.respond_to?(:data_get) ? ci_pipeline_run_ref01_data_dt0_loaded.data_get : ci_pipeline_run_ref01_data_dt0_loaded)
    assert !ci_pipeline_run_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(ci_pipeline_run_ref01_data_dt0_load_result["id"], ci_pipeline_run_ref01_data["id"])

      return
    end

    if setup[:live]
      ["pipeline01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    ci_pipeline_run_ref01_ent = client.CiPipelineRun(nil)
    ci_pipeline_run_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.ci_pipeline_run"), "ci_pipeline_run_ref01"))
    ci_pipeline_run_ref01_data["pipeline_id"] = setup[:idmap]["pipeline01"]

    ci_pipeline_run_ref01_data_result = ci_pipeline_run_ref01_ent.create(ci_pipeline_run_ref01_data, nil)
    ci_pipeline_run_ref01_data = Helpers.to_map(ci_pipeline_run_ref01_data_result.respond_to?(:data_get) ? ci_pipeline_run_ref01_data_result.data_get : ci_pipeline_run_ref01_data_result)
    assert !ci_pipeline_run_ref01_data.nil?
    assert !ci_pipeline_run_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    ci_pipeline_run_ref01_match = {
      "pipeline_id" => setup[:idmap]["pipeline01"],
    }

    ci_pipeline_run_ref01_list_result = ci_pipeline_run_ref01_ent.list(ci_pipeline_run_ref01_match, nil)
    assert ci_pipeline_run_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(ci_pipeline_run_ref01_list_result),
      { "id" => ci_pipeline_run_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    ci_pipeline_run_ref01_match_dt0 = {
      "id" => ci_pipeline_run_ref01_data["id"],
    }
    ci_pipeline_run_ref01_match_dt0["pipeline_id"] = setup[:idmap]["pipeline_id"] || setup[:idmap]["pipeline01"]
    ci_pipeline_run_ref01_data_dt0_loaded = ci_pipeline_run_ref01_ent.load(ci_pipeline_run_ref01_match_dt0, nil)
    ci_pipeline_run_ref01_data_dt0_load_result = Helpers.to_map(ci_pipeline_run_ref01_data_dt0_loaded.respond_to?(:data_get) ? ci_pipeline_run_ref01_data_dt0_loaded.data_get : ci_pipeline_run_ref01_data_dt0_loaded)
    assert !ci_pipeline_run_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(ci_pipeline_run_ref01_data_dt0_load_result["id"], ci_pipeline_run_ref01_data["id"])

  end
end

def ci_pipeline_run_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ci_pipeline_run", "CiPipelineRunTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ci_pipeline_run01", "ci_pipeline_run02", "ci_pipeline_run03", "pipeline01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID"])
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
