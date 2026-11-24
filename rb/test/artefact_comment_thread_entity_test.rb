# ArtefactCommentThread entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class ArtefactCommentThreadEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.ArtefactCommentThread(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ArtefactCommentThread(nil).list({ "artefact_id" => 1, "organization_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = artefact_comment_thread_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "artefact_comment_thread." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"artefact_comment_thread.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads\"}"
      puts "LIVE STEP {\"id\":\"artefact_comment_thread.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}\"}"
    if setup[:live]
      ["artefact01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    artefact_comment_thread_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.artefact_comment_thread")))
    artefact_comment_thread_ref01_data = nil
    if artefact_comment_thread_ref01_data_raw.length > 0
      artefact_comment_thread_ref01_data = Helpers.to_map(artefact_comment_thread_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    artefact_comment_thread_ref01_ent = client.ArtefactCommentThread(nil)
    artefact_comment_thread_ref01_match = {
      "artefact_id" => setup[:idmap]["artefact01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    artefact_comment_thread_ref01_list_result = artefact_comment_thread_ref01_ent.list(artefact_comment_thread_ref01_match, nil)
    assert artefact_comment_thread_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["artefact01", "organization01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    artefact_comment_thread_ref01_ent = client.ArtefactCommentThread(nil)
    artefact_comment_thread_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.artefact_comment_thread"), "artefact_comment_thread_ref01"))
    artefact_comment_thread_ref01_data["artefact_id"] = setup[:idmap]["artefact01"]
    artefact_comment_thread_ref01_data["organization_id"] = setup[:idmap]["organization01"]

    artefact_comment_thread_ref01_data_result = artefact_comment_thread_ref01_ent.create(artefact_comment_thread_ref01_data, nil)
    artefact_comment_thread_ref01_data = Helpers.to_map(artefact_comment_thread_ref01_data_result.respond_to?(:data_get) ? artefact_comment_thread_ref01_data_result.data_get : artefact_comment_thread_ref01_data_result)
    assert !artefact_comment_thread_ref01_data.nil?
    assert !artefact_comment_thread_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    artefact_comment_thread_ref01_match = {
      "artefact_id" => setup[:idmap]["artefact01"],
      "organization_id" => setup[:idmap]["organization01"],
    }

    artefact_comment_thread_ref01_list_result = artefact_comment_thread_ref01_ent.list(artefact_comment_thread_ref01_match, nil)
    assert artefact_comment_thread_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(artefact_comment_thread_ref01_list_result),
      { "id" => artefact_comment_thread_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    artefact_comment_thread_ref01_data_up0_up = {
      "id" => artefact_comment_thread_ref01_data["id"],
      "artefact_id" => setup[:idmap]["artefact_id"],
      "organization_id" => setup[:idmap]["organization_id"],
    }

    artefact_comment_thread_ref01_markdef_up0_name = "anchor"
    artefact_comment_thread_ref01_markdef_up0_value = "Mark01-artefact_comment_thread_ref01_#{setup[:now]}"
    artefact_comment_thread_ref01_data_up0_up[artefact_comment_thread_ref01_markdef_up0_name] = artefact_comment_thread_ref01_markdef_up0_value

    artefact_comment_thread_ref01_resdata_up0_result = artefact_comment_thread_ref01_ent.update(artefact_comment_thread_ref01_data_up0_up, nil)
    artefact_comment_thread_ref01_resdata_up0 = Helpers.to_map(artefact_comment_thread_ref01_resdata_up0_result.respond_to?(:data_get) ? artefact_comment_thread_ref01_resdata_up0_result.data_get : artefact_comment_thread_ref01_resdata_up0_result)
    assert !artefact_comment_thread_ref01_resdata_up0.nil?
    assert Runner.live_same_id(artefact_comment_thread_ref01_resdata_up0["id"], artefact_comment_thread_ref01_data_up0_up["id"])
    assert_equal artefact_comment_thread_ref01_resdata_up0[artefact_comment_thread_ref01_markdef_up0_name], artefact_comment_thread_ref01_markdef_up0_value

  end
end

def artefact_comment_thread_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "artefact_comment_thread", "ArtefactCommentThreadTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["artefact_comment_thread01", "artefact_comment_thread02", "artefact_comment_thread03", "organization01", "organization02", "organization03", "artefact01", "artefact02", "artefact03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["artefact_id"].nil?
    idmap_resolved["artefact_id"] = idmap_resolved["artefact01"]
  end
  if idmap_resolved["organization_id"].nil?
    idmap_resolved["organization_id"] = idmap_resolved["organization01"]
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
