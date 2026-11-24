# JobWorkspace entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class JobWorkspaceEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.JobWorkspace(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.JobWorkspace(nil).list({ "job_id" => 1, "pipeline_id" => "x", "run_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = job_workspace_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "job_workspace." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"job_workspace.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces\"}"
      puts "LIVE STEP {\"id\":\"job_workspace.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/workspaces/{id}\"}"
    if setup[:live]
      ["job01", "pipeline01", "run01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_JOB_WORKSPACE_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    job_workspace_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.job_workspace")))
    job_workspace_ref01_data = nil
    if job_workspace_ref01_data_raw.length > 0
      job_workspace_ref01_data = Helpers.to_map(job_workspace_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    job_workspace_ref01_ent = client.JobWorkspace(nil)
    job_workspace_ref01_match = {
      "job_id" => setup[:idmap]["job01"],
      "pipeline_id" => setup[:idmap]["pipeline01"],
      "run_id" => setup[:idmap]["run01"],
    }

    job_workspace_ref01_list_result = job_workspace_ref01_ent.list(job_workspace_ref01_match, nil)
    assert job_workspace_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["job01", "pipeline01", "run01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_JOB_WORKSPACE_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    job_workspace_ref01_ent = client.JobWorkspace(nil)
    job_workspace_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.job_workspace"), "job_workspace_ref01"))
    job_workspace_ref01_data["job_id"] = setup[:idmap]["job01"]
    job_workspace_ref01_data["pipeline_id"] = setup[:idmap]["pipeline01"]
    job_workspace_ref01_data["run_id"] = setup[:idmap]["run01"]

    job_workspace_ref01_data_result = job_workspace_ref01_ent.create(job_workspace_ref01_data, nil)
    job_workspace_ref01_data = Helpers.to_map(job_workspace_ref01_data_result.respond_to?(:data_get) ? job_workspace_ref01_data_result.data_get : job_workspace_ref01_data_result)
    assert !job_workspace_ref01_data.nil?
    assert !job_workspace_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    job_workspace_ref01_match = {
      "job_id" => setup[:idmap]["job01"],
      "pipeline_id" => setup[:idmap]["pipeline01"],
      "run_id" => setup[:idmap]["run01"],
    }

    job_workspace_ref01_list_result = job_workspace_ref01_ent.list(job_workspace_ref01_match, nil)
    assert job_workspace_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(job_workspace_ref01_list_result),
      { "id" => job_workspace_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    job_workspace_ref01_data_up0_up = {
      "id" => job_workspace_ref01_data["id"],
      "job_id" => setup[:idmap]["job_id"],
      "pipeline_id" => setup[:idmap]["pipeline_id"],
      "run_id" => setup[:idmap]["run_id"],
    }

    job_workspace_ref01_resdata_up0_result = job_workspace_ref01_ent.update(job_workspace_ref01_data_up0_up, nil)
    job_workspace_ref01_resdata_up0 = Helpers.to_map(job_workspace_ref01_resdata_up0_result.respond_to?(:data_get) ? job_workspace_ref01_resdata_up0_result.data_get : job_workspace_ref01_resdata_up0_result)
    assert !job_workspace_ref01_resdata_up0.nil?
    assert Runner.live_same_id(job_workspace_ref01_resdata_up0["id"], job_workspace_ref01_data_up0_up["id"]) unless setup[:live]

  end
end

def job_workspace_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "job_workspace", "JobWorkspaceTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["job_workspace01", "job_workspace02", "job_workspace03", "job01", "pipeline01", "run01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_JOB_WORKSPACE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_JOB_WORKSPACE_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_JOB_WORKSPACE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["job_id"].nil?
    idmap_resolved["job_id"] = idmap_resolved["job01"]
  end
  if idmap_resolved["pipeline_id"].nil?
    idmap_resolved["pipeline_id"] = idmap_resolved["pipeline01"]
  end
  if idmap_resolved["run_id"].nil?
    idmap_resolved["run_id"] = idmap_resolved["run01"]
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
