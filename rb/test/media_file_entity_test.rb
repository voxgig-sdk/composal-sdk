# MediaFile entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class MediaFileEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.MediaFile(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.MediaFile(nil).load({ "browser_session_id" => 1, "id" => "x", "media_id" => "x", "organization_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = media_file_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "media_file." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["browser_session01", "media_file01", "media01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_MEDIA_FILE_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "media_file", "id", setup[:idmap]["media_file01"]) do
        [{ "id" => setup[:idmap]["media_file01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    media_file_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.media_file")))
    media_file_ref01_data = nil
    if media_file_ref01_data_raw.length > 0
      media_file_ref01_data = Helpers.to_map(media_file_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    media_file_ref01_ent = client.MediaFile(nil)
    media_file_ref01_match_dt0 = {
      "id" => media_file_ref01_data["id"],
    }
    media_file_ref01_match_dt0["browser_session_id"] = setup[:idmap]["browser_session_id"] || setup[:idmap]["browser_session01"]
    media_file_ref01_match_dt0["media_id"] = setup[:idmap]["media_id"] || setup[:idmap]["media01"]
    media_file_ref01_match_dt0["organization_id"] = setup[:idmap]["organization_id"] || setup[:idmap]["organization01"]
    media_file_ref01_data_dt0_loaded = media_file_ref01_ent.load(media_file_ref01_match_dt0, nil)
    media_file_ref01_data_dt0_load_result = Helpers.to_map(media_file_ref01_data_dt0_loaded.respond_to?(:data_get) ? media_file_ref01_data_dt0_loaded.data_get : media_file_ref01_data_dt0_loaded)
    assert !media_file_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(media_file_ref01_data_dt0_load_result["id"], media_file_ref01_data["id"]) unless setup[:live]

  end
end

def media_file_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "media_file", "MediaFileTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["media_file01", "media_file02", "media_file03", "organization01", "organization02", "organization03", "browser_session01", "browser_session02", "browser_session03", "media01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_MEDIA_FILE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_MEDIA_FILE_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_MEDIA_FILE_ENTID"])
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
