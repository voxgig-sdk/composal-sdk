# ExecutionRelease entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class ExecutionReleaseEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.ExecutionRelease(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "execution_release" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = ComposalSDK.test(seed, nil).ExecutionRelease(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "execution_release" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ComposalSDK.test(seed, nil)
    seen = base.ExecutionRelease(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ComposalConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ComposalSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.ExecutionRelease(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < ComposalBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "execution_release hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      ComposalSDK.test(offline, nil).ExecutionRelease(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    ComposalSDK.test(offline, nil).ExecutionRelease(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = ComposalConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = ComposalSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.ExecutionRelease(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    ComposalSDK.test(nil, nil).ExecutionRelease(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = ComposalSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.ExecutionRelease(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.ExecutionRelease(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = ComposalSDK.test({ "entity" => { "execution_release" => { "v1" => {  } } } }, opts).ExecutionRelease(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ExecutionRelease(nil).list({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = execution_release_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "execution_release." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"execution_release.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/execution/releases/{id}/activate\"}"
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["execution_release01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "execution_release", "id", _live_id) do
        client.ExecutionRelease(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    execution_release_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.execution_release")))
    execution_release_ref01_data = nil
    if execution_release_ref01_data_raw.length > 0
      execution_release_ref01_data = Helpers.to_map(execution_release_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    execution_release_ref01_ent = client.ExecutionRelease(nil)
    execution_release_ref01_match = {}

    execution_release_ref01_list_result = execution_release_ref01_ent.list(execution_release_ref01_match, nil)
    assert execution_release_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    execution_release_ref01_match_dt0 = {
      "id" => execution_release_ref01_data["id"],
    }
    execution_release_ref01_data_dt0_loaded = execution_release_ref01_ent.load(execution_release_ref01_match_dt0, nil)
    execution_release_ref01_data_dt0_load_result = Helpers.to_map(execution_release_ref01_data_dt0_loaded.respond_to?(:data_get) ? execution_release_ref01_data_dt0_loaded.data_get : execution_release_ref01_data_dt0_loaded)
    assert !execution_release_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(execution_release_ref01_data_dt0_load_result["id"], execution_release_ref01_data["id"]) unless setup[:live]

      return
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    execution_release_ref01_ent = client.ExecutionRelease(nil)
    execution_release_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.execution_release"), "execution_release_ref01"))

    execution_release_ref01_data_result = execution_release_ref01_ent.create(execution_release_ref01_data, nil)
    execution_release_ref01_data = Helpers.to_map(execution_release_ref01_data_result.respond_to?(:data_get) ? execution_release_ref01_data_result.data_get : execution_release_ref01_data_result)
    assert !execution_release_ref01_data.nil?
    assert !execution_release_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    execution_release_ref01_match = {}

    execution_release_ref01_list_result = execution_release_ref01_ent.list(execution_release_ref01_match, nil)
    assert execution_release_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(execution_release_ref01_list_result),
      { "id" => execution_release_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    execution_release_ref01_match_dt0 = {
      "id" => execution_release_ref01_data["id"],
    }
    execution_release_ref01_data_dt0_loaded = execution_release_ref01_ent.load(execution_release_ref01_match_dt0, nil)
    execution_release_ref01_data_dt0_load_result = Helpers.to_map(execution_release_ref01_data_dt0_loaded.respond_to?(:data_get) ? execution_release_ref01_data_dt0_loaded.data_get : execution_release_ref01_data_dt0_loaded)
    assert !execution_release_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(execution_release_ref01_data_dt0_load_result["id"], execution_release_ref01_data["id"]) unless setup[:live]

  end
end

def execution_release_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "execution_release", "ExecutionReleaseTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["execution_release01", "execution_release02", "execution_release03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_EXECUTION_RELEASE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_EXECUTION_RELEASE_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_EXECUTION_RELEASE_ENTID"])
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
