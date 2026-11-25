# GithubPullRequest entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class GithubPullRequestEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.GithubPullRequest(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.GithubPullRequest(nil).load({ "id" => 1, "organization_id" => "x", "pull_request_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = github_pull_request_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "github_pull_request." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"github_pull_request.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/github/pull_requests/refresh\"}"
      puts "LIVE STEP {\"id\":\"github_pull_request.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only github_pull_request.create.0 gives\"}"
      skip("Live coverage incomplete: github_pull_request.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{org_slug}/github/pull_requests/refresh); github_pull_request.load.1 excluded (GET-only live run: reads a record only github_pull_request.create.0 gives)")
    end

    if setup[:live]
      ["github_pull_request01", "organization01", "pull_request01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_GITHUB_PULL_REQUEST_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "github_pull_request", "id", setup[:idmap]["github_pull_request01"]) do
        [{ "id" => setup[:idmap]["github_pull_request01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    github_pull_request_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.github_pull_request")))
    github_pull_request_ref01_data = nil
    if github_pull_request_ref01_data_raw.length > 0
      github_pull_request_ref01_data = Helpers.to_map(github_pull_request_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    github_pull_request_ref01_ent = client.GithubPullRequest(nil)
    github_pull_request_ref01_match_dt0 = {
      "id" => github_pull_request_ref01_data["id"],
    }
    github_pull_request_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    github_pull_request_ref01_match_dt0["pull_request_id"] = setup[:idmap]["pull_request_id"] || setup[:idmap]["pull_request01"]
    github_pull_request_ref01_data_dt0_loaded = github_pull_request_ref01_ent.load(github_pull_request_ref01_match_dt0, nil)
    github_pull_request_ref01_data_dt0_load_result = Helpers.to_map(github_pull_request_ref01_data_dt0_loaded.respond_to?(:data_get) ? github_pull_request_ref01_data_dt0_loaded.data_get : github_pull_request_ref01_data_dt0_loaded)
    assert !github_pull_request_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(github_pull_request_ref01_data_dt0_load_result["id"], github_pull_request_ref01_data["id"]) unless setup[:live]

  end
end

def github_pull_request_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "github_pull_request", "GithubPullRequestTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["github_pull_request01", "github_pull_request02", "github_pull_request03", "organization01", "organization02", "organization03", "pull_request01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_GITHUB_PULL_REQUEST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_GITHUB_PULL_REQUEST_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_GITHUB_PULL_REQUEST_ENTID"])
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
