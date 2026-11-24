# CiRunnerPool entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class CiRunnerPoolEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.CiRunnerPool(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "ci_runner_pool" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = ComposalSDK.test(seed, nil).CiRunnerPool(nil).list(nil, nil)
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
        "ci_runner_pool" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ComposalSDK.test(seed, nil)
    seen = base.CiRunnerPool(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ComposalConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ComposalSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.CiRunnerPool(nil).stream("list", nil, nil).each do |item|
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
      raise "ci_runner_pool hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      ComposalSDK.test(offline, nil).CiRunnerPool(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    ComposalSDK.test(offline, nil).CiRunnerPool(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = ComposalConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = ComposalSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.CiRunnerPool(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    ComposalSDK.test(nil, nil).CiRunnerPool(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = ComposalSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.CiRunnerPool(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.CiRunnerPool(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CiRunnerPool(nil).list({ "organization_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = ci_runner_pool_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ci_runner_pool." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"ci_runner_pool.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ci/runner_pools/{id}/promote_reconciliation_runtime\"}"
      puts "LIVE STEP {\"id\":\"ci_runner_pool.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/ci/runner_pools/{id}\"}"
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["ci_runner_pool01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "ci_runner_pool", "id", _live_id) do
        client.CiRunnerPool(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    ci_runner_pool_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.ci_runner_pool")))
    ci_runner_pool_ref01_data = nil
    if ci_runner_pool_ref01_data_raw.length > 0
      ci_runner_pool_ref01_data = Helpers.to_map(ci_runner_pool_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    ci_runner_pool_ref01_ent = client.CiRunnerPool(nil)
    ci_runner_pool_ref01_match = {}

    ci_runner_pool_ref01_list_result = ci_runner_pool_ref01_ent.list(ci_runner_pool_ref01_match, nil)
    assert ci_runner_pool_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    ci_runner_pool_ref01_match_dt0 = {
      "id" => ci_runner_pool_ref01_data["id"],
    }
    ci_runner_pool_ref01_data_dt0_loaded = ci_runner_pool_ref01_ent.load(ci_runner_pool_ref01_match_dt0, nil)
    ci_runner_pool_ref01_data_dt0_load_result = Helpers.to_map(ci_runner_pool_ref01_data_dt0_loaded.respond_to?(:data_get) ? ci_runner_pool_ref01_data_dt0_loaded.data_get : ci_runner_pool_ref01_data_dt0_loaded)
    assert !ci_runner_pool_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(ci_runner_pool_ref01_data_dt0_load_result["id"], ci_runner_pool_ref01_data["id"])

      return
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    ci_runner_pool_ref01_ent = client.CiRunnerPool(nil)
    ci_runner_pool_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.ci_runner_pool"), "ci_runner_pool_ref01"))

    ci_runner_pool_ref01_data_result = ci_runner_pool_ref01_ent.create(ci_runner_pool_ref01_data, nil)
    ci_runner_pool_ref01_data = Helpers.to_map(ci_runner_pool_ref01_data_result.respond_to?(:data_get) ? ci_runner_pool_ref01_data_result.data_get : ci_runner_pool_ref01_data_result)
    assert !ci_runner_pool_ref01_data.nil?
    assert !ci_runner_pool_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    ci_runner_pool_ref01_match = {}

    ci_runner_pool_ref01_list_result = ci_runner_pool_ref01_ent.list(ci_runner_pool_ref01_match, nil)
    assert ci_runner_pool_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(ci_runner_pool_ref01_list_result),
      { "id" => ci_runner_pool_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    ci_runner_pool_ref01_data_up0_up = {
      "id" => ci_runner_pool_ref01_data["id"],
    }

    ci_runner_pool_ref01_markdef_up0_name = "bazel_properties_json"
    ci_runner_pool_ref01_markdef_up0_value = "Mark01-ci_runner_pool_ref01_#{setup[:now]}"
    ci_runner_pool_ref01_data_up0_up[ci_runner_pool_ref01_markdef_up0_name] = ci_runner_pool_ref01_markdef_up0_value

    ci_runner_pool_ref01_resdata_up0_result = ci_runner_pool_ref01_ent.update(ci_runner_pool_ref01_data_up0_up, nil)
    ci_runner_pool_ref01_resdata_up0 = Helpers.to_map(ci_runner_pool_ref01_resdata_up0_result.respond_to?(:data_get) ? ci_runner_pool_ref01_resdata_up0_result.data_get : ci_runner_pool_ref01_resdata_up0_result)
    assert !ci_runner_pool_ref01_resdata_up0.nil?
    assert Runner.live_same_id(ci_runner_pool_ref01_resdata_up0["id"], ci_runner_pool_ref01_data_up0_up["id"])
    assert_equal ci_runner_pool_ref01_resdata_up0[ci_runner_pool_ref01_markdef_up0_name], ci_runner_pool_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    ci_runner_pool_ref01_match_dt0 = {
      "id" => ci_runner_pool_ref01_data["id"],
    }
    ci_runner_pool_ref01_data_dt0_loaded = ci_runner_pool_ref01_ent.load(ci_runner_pool_ref01_match_dt0, nil)
    ci_runner_pool_ref01_data_dt0_load_result = Helpers.to_map(ci_runner_pool_ref01_data_dt0_loaded.respond_to?(:data_get) ? ci_runner_pool_ref01_data_dt0_loaded.data_get : ci_runner_pool_ref01_data_dt0_loaded)
    assert !ci_runner_pool_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(ci_runner_pool_ref01_data_dt0_load_result["id"], ci_runner_pool_ref01_data["id"])

  end
end

def ci_runner_pool_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ci_runner_pool", "CiRunnerPoolTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ci_runner_pool01", "ci_runner_pool02", "ci_runner_pool03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_CI_RUNNER_POOL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_CI_RUNNER_POOL_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_CI_RUNNER_POOL_ENTID"])
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
