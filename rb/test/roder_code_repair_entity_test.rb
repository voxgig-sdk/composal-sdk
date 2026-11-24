# RoderCodeRepair entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class RoderCodeRepairEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.RoderCodeRepair(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "roder_code_repair" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = ComposalSDK.test(seed, nil).RoderCodeRepair(nil).list(nil, nil)
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
        "roder_code_repair" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ComposalSDK.test(seed, nil)
    seen = base.RoderCodeRepair(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ComposalConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ComposalSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.RoderCodeRepair(nil).stream("list", nil, nil).each do |item|
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
      raise "roder_code_repair hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      ComposalSDK.test(offline, nil).RoderCodeRepair(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    ComposalSDK.test(offline, nil).RoderCodeRepair(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = ComposalConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = ComposalSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.RoderCodeRepair(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    ComposalSDK.test(nil, nil).RoderCodeRepair(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = ComposalSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.RoderCodeRepair(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.RoderCodeRepair(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.RoderCodeRepair(nil).list({ "scenario_run_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = roder_code_repair_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "roder_code_repair." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"roder_code_repair.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/agent/roder/code_repairs/{id}/cancel\"}"
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["roder_code_repair01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "roder_code_repair", "id", _live_id) do
        client.RoderCodeRepair(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    roder_code_repair_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.roder_code_repair")))
    roder_code_repair_ref01_data = nil
    if roder_code_repair_ref01_data_raw.length > 0
      roder_code_repair_ref01_data = Helpers.to_map(roder_code_repair_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    roder_code_repair_ref01_ent = client.RoderCodeRepair(nil)
    roder_code_repair_ref01_match = {}

    roder_code_repair_ref01_list_result = roder_code_repair_ref01_ent.list(roder_code_repair_ref01_match, nil)
    assert roder_code_repair_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    roder_code_repair_ref01_match_dt0 = {
      "id" => roder_code_repair_ref01_data["id"],
    }
    roder_code_repair_ref01_data_dt0_loaded = roder_code_repair_ref01_ent.load(roder_code_repair_ref01_match_dt0, nil)
    roder_code_repair_ref01_data_dt0_load_result = Helpers.to_map(roder_code_repair_ref01_data_dt0_loaded.respond_to?(:data_get) ? roder_code_repair_ref01_data_dt0_loaded.data_get : roder_code_repair_ref01_data_dt0_loaded)
    assert !roder_code_repair_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(roder_code_repair_ref01_data_dt0_load_result["id"], roder_code_repair_ref01_data["id"])

      return
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    roder_code_repair_ref01_ent = client.RoderCodeRepair(nil)
    roder_code_repair_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.roder_code_repair"), "roder_code_repair_ref01"))

    roder_code_repair_ref01_data_result = roder_code_repair_ref01_ent.create(roder_code_repair_ref01_data, nil)
    roder_code_repair_ref01_data = Helpers.to_map(roder_code_repair_ref01_data_result.respond_to?(:data_get) ? roder_code_repair_ref01_data_result.data_get : roder_code_repair_ref01_data_result)
    assert !roder_code_repair_ref01_data.nil?
    assert !roder_code_repair_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    roder_code_repair_ref01_match = {}

    roder_code_repair_ref01_list_result = roder_code_repair_ref01_ent.list(roder_code_repair_ref01_match, nil)
    assert roder_code_repair_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(roder_code_repair_ref01_list_result),
      { "id" => roder_code_repair_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    roder_code_repair_ref01_match_dt0 = {
      "id" => roder_code_repair_ref01_data["id"],
    }
    roder_code_repair_ref01_data_dt0_loaded = roder_code_repair_ref01_ent.load(roder_code_repair_ref01_match_dt0, nil)
    roder_code_repair_ref01_data_dt0_load_result = Helpers.to_map(roder_code_repair_ref01_data_dt0_loaded.respond_to?(:data_get) ? roder_code_repair_ref01_data_dt0_loaded.data_get : roder_code_repair_ref01_data_dt0_loaded)
    assert !roder_code_repair_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(roder_code_repair_ref01_data_dt0_load_result["id"], roder_code_repair_ref01_data["id"])

  end
end

def roder_code_repair_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "roder_code_repair", "RoderCodeRepairTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["roder_code_repair01", "roder_code_repair02", "roder_code_repair03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID"])
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
