# CheckpointPrepareChunk entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class CheckpointPrepareChunkEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.CheckpointPrepareChunk(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CheckpointPrepareChunk(nil).create({ "agent_session_id" => 1, "organization_id" => "x", "repo_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = checkpoint_prepare_chunk_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "checkpoint_prepare_chunk." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"checkpoint_prepare_chunk.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/prepare_chunks\"}"
      skip("Live coverage incomplete: checkpoint_prepare_chunk.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/prepare_chunks)")
    end

    if setup[:live]
      ["agent_session01", "organization01", "repo01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_CHECKPOINT_PREPARE_CHUNK_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    checkpoint_prepare_chunk_ref01_ent = client.CheckpointPrepareChunk(nil)
    checkpoint_prepare_chunk_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.checkpoint_prepare_chunk"), "checkpoint_prepare_chunk_ref01"))
    checkpoint_prepare_chunk_ref01_data["agent_session_id"] = setup[:idmap]["agent_session01"]
    checkpoint_prepare_chunk_ref01_data["organization_id"] = setup[:idmap]["organization01"]
    checkpoint_prepare_chunk_ref01_data["repo_id"] = setup[:idmap]["repo01"]

    checkpoint_prepare_chunk_ref01_data_result = checkpoint_prepare_chunk_ref01_ent.create(checkpoint_prepare_chunk_ref01_data, nil)
    checkpoint_prepare_chunk_ref01_data = Helpers.to_map(checkpoint_prepare_chunk_ref01_data_result.respond_to?(:data_get) ? checkpoint_prepare_chunk_ref01_data_result.data_get : checkpoint_prepare_chunk_ref01_data_result)
    assert !checkpoint_prepare_chunk_ref01_data.nil?

  end
end

def checkpoint_prepare_chunk_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "checkpoint_prepare_chunk", "CheckpointPrepareChunkTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["checkpoint_prepare_chunk01", "checkpoint_prepare_chunk02", "checkpoint_prepare_chunk03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03", "agent_session01", "agent_session02", "agent_session03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_CHECKPOINT_PREPARE_CHUNK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_CHECKPOINT_PREPARE_CHUNK_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_CHECKPOINT_PREPARE_CHUNK_ENTID"])
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
