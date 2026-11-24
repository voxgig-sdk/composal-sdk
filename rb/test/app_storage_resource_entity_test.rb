# AppStorageResource entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class AppStorageResourceEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.AppStorageResource(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AppStorageResource(nil).list({ "app_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = app_storage_resource_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "app_storage_resource." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"app_storage_resource.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive\"}"
      puts "LIVE STEP {\"id\":\"app_storage_resource.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/storage_resources/{id}\"}"
      puts "LIVE STEP {\"id\":\"app_storage_resource.remove.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/storage_resources/{id}\"}"
      puts "LIVE STEP {\"id\":\"app_storage_resource.list.5\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["app01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_APP_STORAGE_RESOURCE_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["app_storage_resource01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "app_storage_resource", "id", _live_id) do
        client.AppStorageResource(nil).list({"app_id" => setup[:idmap]["app01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    app_storage_resource_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.app_storage_resource")))
    app_storage_resource_ref01_data = nil
    if app_storage_resource_ref01_data_raw.length > 0
      app_storage_resource_ref01_data = Helpers.to_map(app_storage_resource_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    app_storage_resource_ref01_ent = client.AppStorageResource(nil)
    app_storage_resource_ref01_match = {
      "app_id" => setup[:idmap]["app01"],
    }

    app_storage_resource_ref01_list_result = app_storage_resource_ref01_ent.list(app_storage_resource_ref01_match, nil)
    assert app_storage_resource_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    app_storage_resource_ref01_match_dt0 = {
      "id" => app_storage_resource_ref01_data["id"],
    }
    app_storage_resource_ref01_match_dt0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    app_storage_resource_ref01_data_dt0_loaded = app_storage_resource_ref01_ent.load(app_storage_resource_ref01_match_dt0, nil)
    app_storage_resource_ref01_data_dt0_load_result = Helpers.to_map(app_storage_resource_ref01_data_dt0_loaded.respond_to?(:data_get) ? app_storage_resource_ref01_data_dt0_loaded.data_get : app_storage_resource_ref01_data_dt0_loaded)
    assert !app_storage_resource_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(app_storage_resource_ref01_data_dt0_load_result["id"], app_storage_resource_ref01_data["id"])

      return
    end

    if setup[:live]
      ["app01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_APP_STORAGE_RESOURCE_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    app_storage_resource_ref01_ent = client.AppStorageResource(nil)
    app_storage_resource_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.app_storage_resource"), "app_storage_resource_ref01"))
    app_storage_resource_ref01_data["app_id"] = setup[:idmap]["app01"]

    app_storage_resource_ref01_data_result = app_storage_resource_ref01_ent.create(app_storage_resource_ref01_data, nil)
    app_storage_resource_ref01_data = Helpers.to_map(app_storage_resource_ref01_data_result.respond_to?(:data_get) ? app_storage_resource_ref01_data_result.data_get : app_storage_resource_ref01_data_result)
    assert !app_storage_resource_ref01_data.nil?
    assert !app_storage_resource_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    app_storage_resource_ref01_match = {
      "app_id" => setup[:idmap]["app01"],
    }

    app_storage_resource_ref01_list_result = app_storage_resource_ref01_ent.list(app_storage_resource_ref01_match, nil)
    assert app_storage_resource_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(app_storage_resource_ref01_list_result),
      { "id" => app_storage_resource_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    app_storage_resource_ref01_data_up0_up = {
      "id" => app_storage_resource_ref01_data["id"],
      "app_id" => setup[:idmap]["app_id"],
    }

    app_storage_resource_ref01_markdef_up0_name = "access_mode"
    app_storage_resource_ref01_markdef_up0_value = "Mark01-app_storage_resource_ref01_#{setup[:now]}"
    app_storage_resource_ref01_data_up0_up[app_storage_resource_ref01_markdef_up0_name] = app_storage_resource_ref01_markdef_up0_value

    app_storage_resource_ref01_resdata_up0_result = app_storage_resource_ref01_ent.update(app_storage_resource_ref01_data_up0_up, nil)
    app_storage_resource_ref01_resdata_up0 = Helpers.to_map(app_storage_resource_ref01_resdata_up0_result.respond_to?(:data_get) ? app_storage_resource_ref01_resdata_up0_result.data_get : app_storage_resource_ref01_resdata_up0_result)
    assert !app_storage_resource_ref01_resdata_up0.nil?
    assert Runner.live_same_id(app_storage_resource_ref01_resdata_up0["id"], app_storage_resource_ref01_data_up0_up["id"])
    assert_equal app_storage_resource_ref01_resdata_up0[app_storage_resource_ref01_markdef_up0_name], app_storage_resource_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    app_storage_resource_ref01_match_dt0 = {
      "id" => app_storage_resource_ref01_data["id"],
    }
    app_storage_resource_ref01_match_dt0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    app_storage_resource_ref01_data_dt0_loaded = app_storage_resource_ref01_ent.load(app_storage_resource_ref01_match_dt0, nil)
    app_storage_resource_ref01_data_dt0_load_result = Helpers.to_map(app_storage_resource_ref01_data_dt0_loaded.respond_to?(:data_get) ? app_storage_resource_ref01_data_dt0_loaded.data_get : app_storage_resource_ref01_data_dt0_loaded)
    assert !app_storage_resource_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(app_storage_resource_ref01_data_dt0_load_result["id"], app_storage_resource_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    app_storage_resource_ref01_match_rm0 = {
      "id" => app_storage_resource_ref01_data["id"],
    }
    app_storage_resource_ref01_match_rm0["app_id"] = setup[:idmap]["app_id"] || setup[:idmap]["app01"]
    app_storage_resource_ref01_ent.remove(app_storage_resource_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    app_storage_resource_ref01_match_rt0 = {
      "app_id" => setup[:idmap]["app01"],
    }

    app_storage_resource_ref01_list_rt0_result = app_storage_resource_ref01_ent.list(app_storage_resource_ref01_match_rt0, nil)
    assert app_storage_resource_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(app_storage_resource_ref01_list_rt0_result),
      { "id" => app_storage_resource_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def app_storage_resource_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "app_storage_resource", "AppStorageResourceTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["app_storage_resource01", "app_storage_resource02", "app_storage_resource03", "app01", "app02", "app03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_APP_STORAGE_RESOURCE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_APP_STORAGE_RESOURCE_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_APP_STORAGE_RESOURCE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["app_id"].nil?
    idmap_resolved["app_id"] = idmap_resolved["app01"]
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
