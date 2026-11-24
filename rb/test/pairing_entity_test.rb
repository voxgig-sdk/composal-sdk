# Pairing entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class PairingEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.Pairing(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Pairing(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = pairing_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "pairing." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"pairing.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/relay/pairings\"}"
      puts "LIVE STEP {\"id\":\"pairing.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only pairing.create.0 gives\"}"
      skip("Live coverage incomplete: pairing.create.0 excluded (GET-only live run: needs POST /api/v1/relay/pairings); pairing.load.1 excluded (GET-only live run: reads a record only pairing.create.0 gives)")
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    pairing_ref01_ent = client.Pairing(nil)
    pairing_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.pairing"), "pairing_ref01"))

    pairing_ref01_data_result = pairing_ref01_ent.create(pairing_ref01_data, nil)
    pairing_ref01_data = Helpers.to_map(pairing_ref01_data_result.respond_to?(:data_get) ? pairing_ref01_data_result.data_get : pairing_ref01_data_result)
    assert !pairing_ref01_data.nil?
    assert !pairing_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LOAD
    pairing_ref01_match_dt0 = {
      "id" => pairing_ref01_data["id"],
    }
    pairing_ref01_data_dt0_loaded = pairing_ref01_ent.load(pairing_ref01_match_dt0, nil)
    pairing_ref01_data_dt0_load_result = Helpers.to_map(pairing_ref01_data_dt0_loaded.respond_to?(:data_get) ? pairing_ref01_data_dt0_loaded.data_get : pairing_ref01_data_dt0_loaded)
    assert !pairing_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(pairing_ref01_data_dt0_load_result["id"], pairing_ref01_data["id"]) unless setup[:live]

  end
end

def pairing_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "pairing", "PairingTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["pairing01", "pairing02", "pairing03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_PAIRING_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_PAIRING_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_PAIRING_ENTID"])
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
