# PageCiPipelineRun entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class PageCiPipelineRunEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.PageCiPipelineRun(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.PageCiPipelineRun(nil).load({ "id" => 1, "pipeline_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = page_ci_pipeline_run_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "page_ci_pipeline_run." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["page_ci_pipeline_run01", "pipeline01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_PAGE_CI_PIPELINE_RUN_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "page_ci_pipeline_run", "id", setup[:idmap]["page_ci_pipeline_run01"]) do
        [{ "id" => setup[:idmap]["page_ci_pipeline_run01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    page_ci_pipeline_run_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.page_ci_pipeline_run")))
    page_ci_pipeline_run_ref01_data = nil
    if page_ci_pipeline_run_ref01_data_raw.length > 0
      page_ci_pipeline_run_ref01_data = Helpers.to_map(page_ci_pipeline_run_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    page_ci_pipeline_run_ref01_ent = client.PageCiPipelineRun(nil)
    page_ci_pipeline_run_ref01_match_dt0 = {
      "id" => page_ci_pipeline_run_ref01_data["id"],
    }
    page_ci_pipeline_run_ref01_match_dt0["pipeline_id"] = setup[:idmap]["pipeline_id"] || setup[:idmap]["pipeline01"]
    page_ci_pipeline_run_ref01_data_dt0_loaded = page_ci_pipeline_run_ref01_ent.load(page_ci_pipeline_run_ref01_match_dt0, nil)
    page_ci_pipeline_run_ref01_data_dt0_load_result = Helpers.to_map(page_ci_pipeline_run_ref01_data_dt0_loaded.respond_to?(:data_get) ? page_ci_pipeline_run_ref01_data_dt0_loaded.data_get : page_ci_pipeline_run_ref01_data_dt0_loaded)
    assert !page_ci_pipeline_run_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(page_ci_pipeline_run_ref01_data_dt0_load_result["id"], page_ci_pipeline_run_ref01_data["id"]) unless setup[:live]

  end
end

def page_ci_pipeline_run_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "page_ci_pipeline_run", "PageCiPipelineRunTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["page_ci_pipeline_run01", "page_ci_pipeline_run02", "page_ci_pipeline_run03", "pipeline01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_PAGE_CI_PIPELINE_RUN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_PAGE_CI_PIPELINE_RUN_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_PAGE_CI_PIPELINE_RUN_ENTID"])
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
