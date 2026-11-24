# CacheNamespaceEntry entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class CacheNamespaceEntryEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.CacheNamespaceEntry(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CacheNamespaceEntry(nil).list({ "cache_namespace_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = cache_namespace_entry_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "cache_namespace_entry." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"cache_namespace_entry.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict\"}"
      puts "LIVE STEP {\"id\":\"cache_namespace_entry.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}\"}"
      puts "LIVE STEP {\"id\":\"cache_namespace_entry.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}\"}"
      puts "LIVE STEP {\"id\":\"cache_namespace_entry.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["cache_namespace01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["cache_namespace_entry01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "cache_namespace_entry", "id", _live_id) do
        client.CacheNamespaceEntry(nil).list({"cache_namespace_id" => setup[:idmap]["cache_namespace01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    cache_namespace_entry_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.cache_namespace_entry")))
    cache_namespace_entry_ref01_data = nil
    if cache_namespace_entry_ref01_data_raw.length > 0
      cache_namespace_entry_ref01_data = Helpers.to_map(cache_namespace_entry_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    cache_namespace_entry_ref01_ent = client.CacheNamespaceEntry(nil)
    cache_namespace_entry_ref01_match = {
      "cache_namespace_id" => setup[:idmap]["cache_namespace01"],
    }

    cache_namespace_entry_ref01_list_result = cache_namespace_entry_ref01_ent.list(cache_namespace_entry_ref01_match, nil)
    assert cache_namespace_entry_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    cache_namespace_entry_ref01_match_dt0 = {
      "id" => cache_namespace_entry_ref01_data["id"],
    }
    cache_namespace_entry_ref01_match_dt0["cache_namespace_id"] = setup[:idmap]["cache_namespace_id"] || setup[:idmap]["cache_namespace01"]
    cache_namespace_entry_ref01_data_dt0_loaded = cache_namespace_entry_ref01_ent.load(cache_namespace_entry_ref01_match_dt0, nil)
    cache_namespace_entry_ref01_data_dt0_load_result = Helpers.to_map(cache_namespace_entry_ref01_data_dt0_loaded.respond_to?(:data_get) ? cache_namespace_entry_ref01_data_dt0_loaded.data_get : cache_namespace_entry_ref01_data_dt0_loaded)
    assert !cache_namespace_entry_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(cache_namespace_entry_ref01_data_dt0_load_result["id"], cache_namespace_entry_ref01_data["id"]) unless setup[:live]

      return
    end

    if setup[:live]
      ["cache_namespace01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    cache_namespace_entry_ref01_ent = client.CacheNamespaceEntry(nil)
    cache_namespace_entry_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.cache_namespace_entry"), "cache_namespace_entry_ref01"))
    cache_namespace_entry_ref01_data["cache_namespace_id"] = setup[:idmap]["cache_namespace01"]

    cache_namespace_entry_ref01_data_result = cache_namespace_entry_ref01_ent.create(cache_namespace_entry_ref01_data, nil)
    cache_namespace_entry_ref01_data = Helpers.to_map(cache_namespace_entry_ref01_data_result.respond_to?(:data_get) ? cache_namespace_entry_ref01_data_result.data_get : cache_namespace_entry_ref01_data_result)
    assert !cache_namespace_entry_ref01_data.nil?
    assert !cache_namespace_entry_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    cache_namespace_entry_ref01_match = {
      "cache_namespace_id" => setup[:idmap]["cache_namespace01"],
    }

    cache_namespace_entry_ref01_list_result = cache_namespace_entry_ref01_ent.list(cache_namespace_entry_ref01_match, nil)
    assert cache_namespace_entry_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(cache_namespace_entry_ref01_list_result),
      { "id" => cache_namespace_entry_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    cache_namespace_entry_ref01_data_up0_up = {
      "id" => cache_namespace_entry_ref01_data["id"],
      "cache_namespace_id" => setup[:idmap]["cache_namespace_id"],
    }

    cache_namespace_entry_ref01_resdata_up0_result = cache_namespace_entry_ref01_ent.update(cache_namespace_entry_ref01_data_up0_up, nil)
    cache_namespace_entry_ref01_resdata_up0 = Helpers.to_map(cache_namespace_entry_ref01_resdata_up0_result.respond_to?(:data_get) ? cache_namespace_entry_ref01_resdata_up0_result.data_get : cache_namespace_entry_ref01_resdata_up0_result)
    assert !cache_namespace_entry_ref01_resdata_up0.nil?
    assert Runner.live_same_id(cache_namespace_entry_ref01_resdata_up0["id"], cache_namespace_entry_ref01_data_up0_up["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # LOAD
    cache_namespace_entry_ref01_match_dt0 = {
      "id" => cache_namespace_entry_ref01_data["id"],
    }
    cache_namespace_entry_ref01_match_dt0["cache_namespace_id"] = setup[:idmap]["cache_namespace_id"] || setup[:idmap]["cache_namespace01"]
    cache_namespace_entry_ref01_data_dt0_loaded = cache_namespace_entry_ref01_ent.load(cache_namespace_entry_ref01_match_dt0, nil)
    cache_namespace_entry_ref01_data_dt0_load_result = Helpers.to_map(cache_namespace_entry_ref01_data_dt0_loaded.respond_to?(:data_get) ? cache_namespace_entry_ref01_data_dt0_loaded.data_get : cache_namespace_entry_ref01_data_dt0_loaded)
    assert !cache_namespace_entry_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(cache_namespace_entry_ref01_data_dt0_load_result["id"], cache_namespace_entry_ref01_data["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # REMOVE
    cache_namespace_entry_ref01_match_rm0 = {
      "id" => cache_namespace_entry_ref01_data["id"],
    }
    cache_namespace_entry_ref01_match_rm0["cache_namespace_id"] = setup[:idmap]["cache_namespace_id"] || setup[:idmap]["cache_namespace01"]
    cache_namespace_entry_ref01_ent.remove(cache_namespace_entry_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    cache_namespace_entry_ref01_match_rt0 = {
      "cache_namespace_id" => setup[:idmap]["cache_namespace01"],
    }

    cache_namespace_entry_ref01_list_rt0_result = cache_namespace_entry_ref01_ent.list(cache_namespace_entry_ref01_match_rt0, nil)
    assert cache_namespace_entry_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(cache_namespace_entry_ref01_list_rt0_result),
      { "id" => cache_namespace_entry_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def cache_namespace_entry_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "cache_namespace_entry", "CacheNamespaceEntryTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["cache_namespace_entry01", "cache_namespace_entry02", "cache_namespace_entry03", "cache_namespace01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["cache_namespace_id"].nil?
    idmap_resolved["cache_namespace_id"] = idmap_resolved["cache_namespace01"]
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
