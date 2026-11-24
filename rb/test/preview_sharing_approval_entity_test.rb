# PreviewSharingApproval entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class PreviewSharingApprovalEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.PreviewSharingApproval(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.PreviewSharingApproval(nil).list({ "app_id" => 1, "preview_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = preview_sharing_approval_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "preview_sharing_approval." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"preview_sharing_approval.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals\"}"
    if setup[:live]
      ["app01", "preview01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_PREVIEW_SHARING_APPROVAL_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    preview_sharing_approval_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.preview_sharing_approval")))
    preview_sharing_approval_ref01_data = nil
    if preview_sharing_approval_ref01_data_raw.length > 0
      preview_sharing_approval_ref01_data = Helpers.to_map(preview_sharing_approval_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    preview_sharing_approval_ref01_ent = client.PreviewSharingApproval(nil)
    preview_sharing_approval_ref01_match = {
      "app_id" => setup[:idmap]["app01"],
      "preview_id" => setup[:idmap]["preview01"],
    }

    preview_sharing_approval_ref01_list_result = preview_sharing_approval_ref01_ent.list(preview_sharing_approval_ref01_match, nil)
    assert preview_sharing_approval_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["app01", "preview01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_PREVIEW_SHARING_APPROVAL_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    preview_sharing_approval_ref01_ent = client.PreviewSharingApproval(nil)
    preview_sharing_approval_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.preview_sharing_approval"), "preview_sharing_approval_ref01"))
    preview_sharing_approval_ref01_data["app_id"] = setup[:idmap]["app01"]
    preview_sharing_approval_ref01_data["preview_id"] = setup[:idmap]["preview01"]

    preview_sharing_approval_ref01_data_result = preview_sharing_approval_ref01_ent.create(preview_sharing_approval_ref01_data, nil)
    preview_sharing_approval_ref01_data = Helpers.to_map(preview_sharing_approval_ref01_data_result.respond_to?(:data_get) ? preview_sharing_approval_ref01_data_result.data_get : preview_sharing_approval_ref01_data_result)
    assert !preview_sharing_approval_ref01_data.nil?

    Runner.live_pace if setup[:live]
    # LIST
    preview_sharing_approval_ref01_match = {
      "app_id" => setup[:idmap]["app01"],
      "preview_id" => setup[:idmap]["preview01"],
    }

    preview_sharing_approval_ref01_list_result = preview_sharing_approval_ref01_ent.list(preview_sharing_approval_ref01_match, nil)
    assert preview_sharing_approval_ref01_list_result.is_a?(Array)

  end
end

def preview_sharing_approval_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "preview_sharing_approval", "PreviewSharingApprovalTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["preview_sharing_approval01", "preview_sharing_approval02", "preview_sharing_approval03", "app01", "app02", "app03", "preview01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_PREVIEW_SHARING_APPROVAL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_PREVIEW_SHARING_APPROVAL_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_PREVIEW_SHARING_APPROVAL_ENTID"])
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
