# BazelBackend entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class BazelBackendEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.BazelBackend(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "bazel_backend" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = ComposalSDK.test(seed, nil).BazelBackend(nil).list(nil, nil)
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
        "bazel_backend" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ComposalSDK.test(seed, nil)
    seen = base.BazelBackend(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ComposalConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ComposalSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.BazelBackend(nil).stream("list", nil, nil).each do |item|
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
      raise "bazel_backend hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      ComposalSDK.test(offline, nil).BazelBackend(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    ComposalSDK.test(offline, nil).BazelBackend(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = ComposalConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = ComposalSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.BazelBackend(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    ComposalSDK.test(nil, nil).BazelBackend(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = ComposalSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.BazelBackend(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.BazelBackend(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate_list_response
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    opts = { "feature" => { "validate" => { "active" => true, "request" => false, "response" => true } } }
    listed = ComposalSDK.test({ "entity" => { "bazel_backend" => { "v1" => {  } } } }, opts).BazelBackend(nil).list(nil, nil)
    assert_equal ["v1"], listed.map { |ent| ent.data_get["id"] }
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.BazelBackend(nil).list({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = bazel_backend_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "bazel_backend." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"bazel_backend.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/bazel/backends/{id}/issue_token\"}"
      puts "LIVE STEP {\"id\":\"bazel_backend.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/bazel/backends/{id}\"}"
      puts "LIVE STEP {\"id\":\"bazel_backend.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/bazel/backends/{id}\"}"
      puts "LIVE STEP {\"id\":\"bazel_backend.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["bazel_backend01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "bazel_backend", "id", _live_id) do
        client.BazelBackend(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    bazel_backend_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.bazel_backend")))
    bazel_backend_ref01_data = nil
    if bazel_backend_ref01_data_raw.length > 0
      bazel_backend_ref01_data = Helpers.to_map(bazel_backend_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    bazel_backend_ref01_ent = client.BazelBackend(nil)
    bazel_backend_ref01_match = {}

    bazel_backend_ref01_list_result = bazel_backend_ref01_ent.list(bazel_backend_ref01_match, nil)
    assert bazel_backend_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    bazel_backend_ref01_match_dt0 = {
      "id" => bazel_backend_ref01_data["id"],
    }
    bazel_backend_ref01_data_dt0_loaded = bazel_backend_ref01_ent.load(bazel_backend_ref01_match_dt0, nil)
    bazel_backend_ref01_data_dt0_load_result = Helpers.to_map(bazel_backend_ref01_data_dt0_loaded.respond_to?(:data_get) ? bazel_backend_ref01_data_dt0_loaded.data_get : bazel_backend_ref01_data_dt0_loaded)
    assert !bazel_backend_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(bazel_backend_ref01_data_dt0_load_result["id"], bazel_backend_ref01_data["id"]) unless setup[:live]

      return
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    bazel_backend_ref01_ent = client.BazelBackend(nil)
    bazel_backend_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.bazel_backend"), "bazel_backend_ref01"))

    bazel_backend_ref01_data_result = bazel_backend_ref01_ent.create(bazel_backend_ref01_data, nil)
    bazel_backend_ref01_data = Helpers.to_map(bazel_backend_ref01_data_result.respond_to?(:data_get) ? bazel_backend_ref01_data_result.data_get : bazel_backend_ref01_data_result)
    assert !bazel_backend_ref01_data.nil?
    assert !bazel_backend_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    bazel_backend_ref01_match = {}

    bazel_backend_ref01_list_result = bazel_backend_ref01_ent.list(bazel_backend_ref01_match, nil)
    assert bazel_backend_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(bazel_backend_ref01_list_result),
      { "id" => bazel_backend_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    bazel_backend_ref01_data_up0_up = {
      "id" => bazel_backend_ref01_data["id"],
    }

    bazel_backend_ref01_resdata_up0_result = bazel_backend_ref01_ent.update(bazel_backend_ref01_data_up0_up, nil)
    bazel_backend_ref01_resdata_up0 = Helpers.to_map(bazel_backend_ref01_resdata_up0_result.respond_to?(:data_get) ? bazel_backend_ref01_resdata_up0_result.data_get : bazel_backend_ref01_resdata_up0_result)
    assert !bazel_backend_ref01_resdata_up0.nil?
    assert Runner.live_same_id(bazel_backend_ref01_resdata_up0["id"], bazel_backend_ref01_data_up0_up["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # LOAD
    bazel_backend_ref01_match_dt0 = {
      "id" => bazel_backend_ref01_data["id"],
    }
    bazel_backend_ref01_data_dt0_loaded = bazel_backend_ref01_ent.load(bazel_backend_ref01_match_dt0, nil)
    bazel_backend_ref01_data_dt0_load_result = Helpers.to_map(bazel_backend_ref01_data_dt0_loaded.respond_to?(:data_get) ? bazel_backend_ref01_data_dt0_loaded.data_get : bazel_backend_ref01_data_dt0_loaded)
    assert !bazel_backend_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(bazel_backend_ref01_data_dt0_load_result["id"], bazel_backend_ref01_data["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # REMOVE
    bazel_backend_ref01_match_rm0 = {
      "id" => bazel_backend_ref01_data["id"],
    }
    bazel_backend_ref01_ent.remove(bazel_backend_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    bazel_backend_ref01_match_rt0 = {}

    bazel_backend_ref01_list_rt0_result = bazel_backend_ref01_ent.list(bazel_backend_ref01_match_rt0, nil)
    assert bazel_backend_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(bazel_backend_ref01_list_rt0_result),
      { "id" => bazel_backend_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def bazel_backend_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "bazel_backend", "BazelBackendTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["bazel_backend01", "bazel_backend02", "bazel_backend03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_BAZEL_BACKEND_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_BAZEL_BACKEND_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_BAZEL_BACKEND_ENTID"])
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
