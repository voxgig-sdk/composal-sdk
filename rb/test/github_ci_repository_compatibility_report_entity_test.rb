# GithubCiRepositoryCompatibilityReport entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class GithubCiRepositoryCompatibilityReportEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.GithubCiRepositoryCompatibilityReport(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.GithubCiRepositoryCompatibilityReport(nil).list({ "github_ci_repository_id" => 1, "organization_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = github_ci_repository_compatibility_report_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "github_ci_repository_compatibility_report." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["github_ci_repository01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_GITHUB_CI_REPOSITORY_COMPATIBILITY_REPORT_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["github_ci_repository_compatibility_report01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "github_ci_repository_compatibility_report", "id", _live_id) do
        client.GithubCiRepositoryCompatibilityReport(nil).list({"github_ci_repository_id" => setup[:idmap]["github_ci_repository01"], "organization_id" => setup[:idmap]["organization01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    github_ci_repository_compatibility_report_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.github_ci_repository_compatibility_report")))
    github_ci_repository_compatibility_report_ref01_data = nil
    if github_ci_repository_compatibility_report_ref01_data_raw.length > 0
      github_ci_repository_compatibility_report_ref01_data = Helpers.to_map(github_ci_repository_compatibility_report_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    github_ci_repository_compatibility_report_ref01_ent = client.GithubCiRepositoryCompatibilityReport(nil)
    github_ci_repository_compatibility_report_ref01_match = {
      "github_ci_repository_id" => setup[:idmap]["github_ci_repository01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    github_ci_repository_compatibility_report_ref01_list_result = github_ci_repository_compatibility_report_ref01_ent.list(github_ci_repository_compatibility_report_ref01_match, nil)
    assert github_ci_repository_compatibility_report_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    github_ci_repository_compatibility_report_ref01_match_dt0 = {
      "id" => github_ci_repository_compatibility_report_ref01_data["id"],
    }
    github_ci_repository_compatibility_report_ref01_match_dt0["github_ci_repository_id"] = [String, Numeric, TrueClass, FalseClass].any? { |c| github_ci_repository_compatibility_report_ref01_data["github_ci_repository_id"].is_a?(c) } ? github_ci_repository_compatibility_report_ref01_data["github_ci_repository_id"] : (setup[:idmap]["github_ci_repository_id"] || setup[:idmap]["github_ci_repository01"])
    github_ci_repository_compatibility_report_ref01_match_dt0["organization_id"] = [String, Numeric, TrueClass, FalseClass].any? { |c| github_ci_repository_compatibility_report_ref01_data["organization_id"].is_a?(c) } ? github_ci_repository_compatibility_report_ref01_data["organization_id"] : (setup[:idmap]["organization_id"] || setup[:idmap]["organization01"])
    github_ci_repository_compatibility_report_ref01_data_dt0_loaded = github_ci_repository_compatibility_report_ref01_ent.load(github_ci_repository_compatibility_report_ref01_match_dt0, nil)
    github_ci_repository_compatibility_report_ref01_data_dt0_load_result = Helpers.to_map(github_ci_repository_compatibility_report_ref01_data_dt0_loaded.respond_to?(:data_get) ? github_ci_repository_compatibility_report_ref01_data_dt0_loaded.data_get : github_ci_repository_compatibility_report_ref01_data_dt0_loaded)
    assert !github_ci_repository_compatibility_report_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(github_ci_repository_compatibility_report_ref01_data_dt0_load_result["id"], github_ci_repository_compatibility_report_ref01_data["id"])

  end
end

def github_ci_repository_compatibility_report_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "github_ci_repository_compatibility_report", "GithubCiRepositoryCompatibilityReportTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["github_ci_repository_compatibility_report01", "github_ci_repository_compatibility_report02", "github_ci_repository_compatibility_report03", "organization01", "organization02", "organization03", "github_ci_repository01", "github_ci_repository02", "github_ci_repository03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_GITHUB_CI_REPOSITORY_COMPATIBILITY_REPORT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_GITHUB_CI_REPOSITORY_COMPATIBILITY_REPORT_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_GITHUB_CI_REPOSITORY_COMPATIBILITY_REPORT_ENTID"])
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
