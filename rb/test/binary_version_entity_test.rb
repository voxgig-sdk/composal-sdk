# BinaryVersion entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class BinaryVersionEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.BinaryVersion(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.BinaryVersion(nil).list({ "binary_id" => 1, "organization_id" => "x", "project_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = binary_version_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "binary_version." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"binary_version.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel\"}"
      puts "LIVE STEP {\"id\":\"binary_version.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}\"}"
      puts "LIVE STEP {\"id\":\"binary_version.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["binary01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_BINARY_VERSION_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["binary_version01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "binary_version", "id", _live_id) do
        client.BinaryVersion(nil).list({"binary_id" => setup[:idmap]["binary01"], "organization_id" => setup[:idmap]["organization01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    binary_version_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.binary_version")))
    binary_version_ref01_data = nil
    if binary_version_ref01_data_raw.length > 0
      binary_version_ref01_data = Helpers.to_map(binary_version_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    binary_version_ref01_ent = client.BinaryVersion(nil)
    binary_version_ref01_match = {
      "binary_id" => setup[:idmap]["binary01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    binary_version_ref01_list_result = binary_version_ref01_ent.list(binary_version_ref01_match, nil)
    assert binary_version_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    binary_version_ref01_match_dt0 = {
      "id" => binary_version_ref01_data["id"],
    }
    binary_version_ref01_match_dt0["binary_id"] = setup[:idmap]["binary_id"] || setup[:idmap]["binary01"]
    binary_version_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    binary_version_ref01_data_dt0_loaded = binary_version_ref01_ent.load(binary_version_ref01_match_dt0, nil)
    binary_version_ref01_data_dt0_load_result = Helpers.to_map(binary_version_ref01_data_dt0_loaded.respond_to?(:data_get) ? binary_version_ref01_data_dt0_loaded.data_get : binary_version_ref01_data_dt0_loaded)
    assert !binary_version_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(binary_version_ref01_data_dt0_load_result["id"], binary_version_ref01_data["id"])

      return
    end

    if setup[:live]
      ["binary01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_BINARY_VERSION_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    binary_version_ref01_ent = client.BinaryVersion(nil)
    binary_version_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.binary_version"), "binary_version_ref01"))
    binary_version_ref01_data["binary_id"] = setup[:idmap]["binary01"]
    binary_version_ref01_data["organization_id"] = setup[:idmap]["organization01"]

    binary_version_ref01_data_result = binary_version_ref01_ent.create(binary_version_ref01_data, nil)
    binary_version_ref01_data = Helpers.to_map(binary_version_ref01_data_result.respond_to?(:data_get) ? binary_version_ref01_data_result.data_get : binary_version_ref01_data_result)
    assert !binary_version_ref01_data.nil?
    assert !binary_version_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    binary_version_ref01_match = {
      "binary_id" => setup[:idmap]["binary01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    binary_version_ref01_list_result = binary_version_ref01_ent.list(binary_version_ref01_match, nil)
    assert binary_version_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(binary_version_ref01_list_result),
      { "id" => binary_version_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    binary_version_ref01_match_dt0 = {
      "id" => binary_version_ref01_data["id"],
    }
    binary_version_ref01_match_dt0["binary_id"] = setup[:idmap]["binary_id"] || setup[:idmap]["binary01"]
    binary_version_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    binary_version_ref01_data_dt0_loaded = binary_version_ref01_ent.load(binary_version_ref01_match_dt0, nil)
    binary_version_ref01_data_dt0_load_result = Helpers.to_map(binary_version_ref01_data_dt0_loaded.respond_to?(:data_get) ? binary_version_ref01_data_dt0_loaded.data_get : binary_version_ref01_data_dt0_loaded)
    assert !binary_version_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(binary_version_ref01_data_dt0_load_result["id"], binary_version_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    binary_version_ref01_match_rm0 = {
      "id" => binary_version_ref01_data["id"],
    }
    binary_version_ref01_match_rm0["binary_id"] = setup[:idmap]["binary_id"] || setup[:idmap]["binary01"]
    binary_version_ref01_match_rm0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    binary_version_ref01_ent.remove(binary_version_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    binary_version_ref01_match_rt0 = {
      "binary_id" => setup[:idmap]["binary01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    binary_version_ref01_list_rt0_result = binary_version_ref01_ent.list(binary_version_ref01_match_rt0, nil)
    assert binary_version_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(binary_version_ref01_list_rt0_result),
      { "id" => binary_version_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def binary_version_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "binary_version", "BinaryVersionTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["binary_version01", "binary_version02", "binary_version03", "organization01", "organization02", "organization03", "binary01", "binary02", "binary03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_BINARY_VERSION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_BINARY_VERSION_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_BINARY_VERSION_ENTID"])
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
