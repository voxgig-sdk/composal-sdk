# MessagingConversationUpload entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class MessagingConversationUploadEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.MessagingConversationUpload(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.MessagingConversationUpload(nil).create({ "messaging_conversation_id" => 1, "organization_id" => "x", "project_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = messaging_conversation_upload_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "messaging_conversation_upload." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"messaging_conversation_upload.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads\"}"
      skip("Live coverage incomplete: messaging_conversation_upload.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads)")
    end

    if setup[:live]
      ["messaging_conversation01", "organization01", "project01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_MESSAGING_CONVERSATION_UPLOAD_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    messaging_conversation_upload_ref01_ent = client.MessagingConversationUpload(nil)
    messaging_conversation_upload_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.messaging_conversation_upload"), "messaging_conversation_upload_ref01"))
    messaging_conversation_upload_ref01_data["messaging_conversation_id"] = setup[:idmap]["messaging_conversation01"]
    messaging_conversation_upload_ref01_data["organization_id"] = setup[:idmap]["organization01"]
    messaging_conversation_upload_ref01_data["project_id"] = setup[:idmap]["project01"]

    messaging_conversation_upload_ref01_data_result = messaging_conversation_upload_ref01_ent.create(messaging_conversation_upload_ref01_data, nil)
    messaging_conversation_upload_ref01_data = Helpers.to_map(messaging_conversation_upload_ref01_data_result.respond_to?(:data_get) ? messaging_conversation_upload_ref01_data_result.data_get : messaging_conversation_upload_ref01_data_result)
    assert !messaging_conversation_upload_ref01_data.nil?

  end
end

def messaging_conversation_upload_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "messaging_conversation_upload", "MessagingConversationUploadTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["messaging_conversation_upload01", "messaging_conversation_upload02", "messaging_conversation_upload03", "organization01", "organization02", "organization03", "project01", "project02", "project03", "messaging_conversation01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_MESSAGING_CONVERSATION_UPLOAD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_MESSAGING_CONVERSATION_UPLOAD_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_MESSAGING_CONVERSATION_UPLOAD_ENTID"])
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
