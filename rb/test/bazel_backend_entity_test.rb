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

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.BazelBackend(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = bazel_backend_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "bazel_backend." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"bazel_backend.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/bazel/backends/{id}/issue_token\"}"
      puts "LIVE STEP {\"id\":\"bazel_backend.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/bazel/backends/{id}\"}"
      puts "LIVE STEP {\"id\":\"bazel_backend.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only bazel_backend.create.0 gives\"}"
      puts "LIVE STEP {\"id\":\"bazel_backend.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/bazel/backends/{id}\"}"
      skip("Live coverage incomplete: bazel_backend.create.0 excluded (GET-only live run: needs POST /api/v1/bazel/backends/{id}/issue_token); bazel_backend.update.1 excluded (GET-only live run: needs PUT /api/v1/bazel/backends/{id}); bazel_backend.load.2 excluded (GET-only live run: reads a record only bazel_backend.create.0 gives); bazel_backend.remove.3 excluded (GET-only live run: needs DELETE /api/v1/bazel/backends/{id})")
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
