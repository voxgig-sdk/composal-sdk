# VcMergeQueue entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class VcMergeQueueEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.VcMergeQueue(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.VcMergeQueue(nil).list({ "organization_id" => 1, "repo_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = vc_merge_queue_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "vc_merge_queue." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"vc_merge_queue.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause\"}"
      puts "LIVE STEP {\"id\":\"vc_merge_queue.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/concurrency\"}"
    if setup[:live]
      ["organization01", "repo01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["vc_merge_queue01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "vc_merge_queue", "id", _live_id) do
        client.VcMergeQueue(nil).list({"organization_id" => setup[:idmap]["organization01"], "repo_id" => setup[:idmap]["repo01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    vc_merge_queue_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.vc_merge_queue")))
    vc_merge_queue_ref01_data = nil
    if vc_merge_queue_ref01_data_raw.length > 0
      vc_merge_queue_ref01_data = Helpers.to_map(vc_merge_queue_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    vc_merge_queue_ref01_ent = client.VcMergeQueue(nil)
    vc_merge_queue_ref01_match = {
      "organization_id" => setup[:idmap]["organization01"],
      "repo_id" => setup[:idmap]["repo01"],
    }

    vc_merge_queue_ref01_list_result = vc_merge_queue_ref01_ent.list(vc_merge_queue_ref01_match, nil)
    assert vc_merge_queue_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    vc_merge_queue_ref01_match_dt0 = {
      "id" => vc_merge_queue_ref01_data["id"],
    }
    vc_merge_queue_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    vc_merge_queue_ref01_match_dt0["repo_id"] = setup[:idmap]["repo_id"] || setup[:idmap]["repo01"]
    vc_merge_queue_ref01_data_dt0_loaded = vc_merge_queue_ref01_ent.load(vc_merge_queue_ref01_match_dt0, nil)
    vc_merge_queue_ref01_data_dt0_load_result = Helpers.to_map(vc_merge_queue_ref01_data_dt0_loaded.respond_to?(:data_get) ? vc_merge_queue_ref01_data_dt0_loaded.data_get : vc_merge_queue_ref01_data_dt0_loaded)
    assert !vc_merge_queue_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(vc_merge_queue_ref01_data_dt0_load_result["id"], vc_merge_queue_ref01_data["id"]) unless setup[:live]

      return
    end

    if setup[:live]
      ["organization01", "repo01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["vc_merge_queue01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "vc_merge_queue", "id", _live_id) do
        client.VcMergeQueue(nil).list({"organization_id" => setup[:idmap]["organization01"], "repo_id" => setup[:idmap]["repo01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    vc_merge_queue_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.vc_merge_queue")))
    vc_merge_queue_ref01_data = nil
    if vc_merge_queue_ref01_data_raw.length > 0
      vc_merge_queue_ref01_data = Helpers.to_map(vc_merge_queue_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    vc_merge_queue_ref01_ent = client.VcMergeQueue(nil)
    vc_merge_queue_ref01_match = {
      "organization_id" => setup[:idmap]["organization01"],
      "repo_id" => setup[:idmap]["repo01"],
    }

    vc_merge_queue_ref01_list_result = vc_merge_queue_ref01_ent.list(vc_merge_queue_ref01_match, nil)
    assert vc_merge_queue_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    vc_merge_queue_ref01_match_dt0 = {
      "id" => vc_merge_queue_ref01_data["id"],
    }
    vc_merge_queue_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    vc_merge_queue_ref01_match_dt0["repo_id"] = setup[:idmap]["repo_id"] || setup[:idmap]["repo01"]
    vc_merge_queue_ref01_data_dt0_loaded = vc_merge_queue_ref01_ent.load(vc_merge_queue_ref01_match_dt0, nil)
    vc_merge_queue_ref01_data_dt0_load_result = Helpers.to_map(vc_merge_queue_ref01_data_dt0_loaded.respond_to?(:data_get) ? vc_merge_queue_ref01_data_dt0_loaded.data_get : vc_merge_queue_ref01_data_dt0_loaded)
    assert !vc_merge_queue_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(vc_merge_queue_ref01_data_dt0_load_result["id"], vc_merge_queue_ref01_data["id"]) unless setup[:live]

  end
end

def vc_merge_queue_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "vc_merge_queue", "VcMergeQueueTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["vc_merge_queue01", "vc_merge_queue02", "vc_merge_queue03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID"])
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
