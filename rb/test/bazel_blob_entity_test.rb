# BazelBlob entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class BazelBlobEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.BazelBlob(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.BazelBlob(nil).load({ "blob_id" => 1, "hash" => "x", "id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = bazel_blob_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "bazel_blob." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"bazel_blob.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}\"}"
    if setup[:live]
      ["blob01", "hash01", "bazel_blob01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_BAZEL_BLOB_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "bazel_blob", "id", setup[:idmap]["bazel_blob01"]) do
        [{ "id" => setup[:idmap]["bazel_blob01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    bazel_blob_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.bazel_blob")))
    bazel_blob_ref01_data = nil
    if bazel_blob_ref01_data_raw.length > 0
      bazel_blob_ref01_data = Helpers.to_map(bazel_blob_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    bazel_blob_ref01_ent = client.BazelBlob(nil)
    bazel_blob_ref01_match_dt0 = {
      "id" => bazel_blob_ref01_data["id"],
    }
    bazel_blob_ref01_match_dt0["blob_id"] = setup[:idmap]["blob_id"] || setup[:idmap]["blob01"]
    bazel_blob_ref01_match_dt0["hash"] = setup[:idmap]["hash"] || setup[:idmap]["hash01"]
    bazel_blob_ref01_data_dt0_loaded = bazel_blob_ref01_ent.load(bazel_blob_ref01_match_dt0, nil)
    bazel_blob_ref01_data_dt0_load_result = Helpers.to_map(bazel_blob_ref01_data_dt0_loaded.respond_to?(:data_get) ? bazel_blob_ref01_data_dt0_loaded.data_get : bazel_blob_ref01_data_dt0_loaded)
    assert !bazel_blob_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(bazel_blob_ref01_data_dt0_load_result["id"], bazel_blob_ref01_data["id"]) unless setup[:live]

      return
    end

    if setup[:live]
      ["blob01", "hash01", "bazel_blob01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_BAZEL_BLOB_ENTID")
        end
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow updates a bazel_blob record it did not create")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    bazel_blob_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.bazel_blob")))
    bazel_blob_ref01_data = nil
    if bazel_blob_ref01_data_raw.length > 0
      bazel_blob_ref01_data = Helpers.to_map(bazel_blob_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # UPDATE
    bazel_blob_ref01_ent = client.BazelBlob(nil)
    bazel_blob_ref01_data_up0_up = {
      "id" => bazel_blob_ref01_data["id"],
      "blob_id" => setup[:idmap]["blob_id"],
      "hash" => setup[:idmap]["hash"],
    }

    bazel_blob_ref01_resdata_up0_result = bazel_blob_ref01_ent.update(bazel_blob_ref01_data_up0_up, nil)
    bazel_blob_ref01_resdata_up0 = Helpers.to_map(bazel_blob_ref01_resdata_up0_result.respond_to?(:data_get) ? bazel_blob_ref01_resdata_up0_result.data_get : bazel_blob_ref01_resdata_up0_result)
    assert !bazel_blob_ref01_resdata_up0.nil?
    assert Runner.live_same_id(bazel_blob_ref01_resdata_up0["id"], bazel_blob_ref01_data_up0_up["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # LOAD
    bazel_blob_ref01_match_dt0 = {
      "id" => bazel_blob_ref01_data["id"],
    }
    bazel_blob_ref01_match_dt0["blob_id"] = setup[:idmap]["blob_id"] || setup[:idmap]["blob01"]
    bazel_blob_ref01_match_dt0["hash"] = setup[:idmap]["hash"] || setup[:idmap]["hash01"]
    bazel_blob_ref01_data_dt0_loaded = bazel_blob_ref01_ent.load(bazel_blob_ref01_match_dt0, nil)
    bazel_blob_ref01_data_dt0_load_result = Helpers.to_map(bazel_blob_ref01_data_dt0_loaded.respond_to?(:data_get) ? bazel_blob_ref01_data_dt0_loaded.data_get : bazel_blob_ref01_data_dt0_loaded)
    assert !bazel_blob_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(bazel_blob_ref01_data_dt0_load_result["id"], bazel_blob_ref01_data["id"]) unless setup[:live]

  end
end

def bazel_blob_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "bazel_blob", "BazelBlobTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["bazel_blob01", "bazel_blob02", "bazel_blob03", "blob01", "hash01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_BAZEL_BLOB_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_BAZEL_BLOB_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_BAZEL_BLOB_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["blob_id"].nil?
    idmap_resolved["blob_id"] = idmap_resolved["blob01"]
  end
  if idmap_resolved["hash"].nil?
    idmap_resolved["hash"] = idmap_resolved["hash01"]
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
