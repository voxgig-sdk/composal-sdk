# SpaceGroupMembership entity test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class SpaceGroupMembershipEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ComposalSDK.test(nil, nil)
    ent = testsdk.SpaceGroupMembership(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ComposalConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ComposalSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.SpaceGroupMembership(nil).list({ "space_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = space_group_membership_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "space_group_membership." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"space_group_membership.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/group_memberships\"}"
      puts "LIVE STEP {\"id\":\"space_group_membership.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/group_memberships/{id}\"}"
      puts "LIVE STEP {\"id\":\"space_group_membership.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/group_memberships/{id}\"}"
      puts "LIVE STEP {\"id\":\"space_group_membership.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["space01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    space_group_membership_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.space_group_membership")))
    space_group_membership_ref01_data = nil
    if space_group_membership_ref01_data_raw.length > 0
      space_group_membership_ref01_data = Helpers.to_map(space_group_membership_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    space_group_membership_ref01_ent = client.SpaceGroupMembership(nil)
    space_group_membership_ref01_match = {
      "space_id" => setup[:idmap]["space01"],
    }

    space_group_membership_ref01_list_result = space_group_membership_ref01_ent.list(space_group_membership_ref01_match, nil)
    assert space_group_membership_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["space01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    space_group_membership_ref01_ent = client.SpaceGroupMembership(nil)
    space_group_membership_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.space_group_membership"), "space_group_membership_ref01"))
    space_group_membership_ref01_data["space_id"] = setup[:idmap]["space01"]

    space_group_membership_ref01_data_result = space_group_membership_ref01_ent.create(space_group_membership_ref01_data, nil)
    space_group_membership_ref01_data = Helpers.to_map(space_group_membership_ref01_data_result.respond_to?(:data_get) ? space_group_membership_ref01_data_result.data_get : space_group_membership_ref01_data_result)
    assert !space_group_membership_ref01_data.nil?
    assert !space_group_membership_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    space_group_membership_ref01_match = {
      "space_id" => setup[:idmap]["space01"],
    }

    space_group_membership_ref01_list_result = space_group_membership_ref01_ent.list(space_group_membership_ref01_match, nil)
    assert space_group_membership_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(space_group_membership_ref01_list_result),
      { "id" => space_group_membership_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    space_group_membership_ref01_data_up0_up = {
      "id" => space_group_membership_ref01_data["id"],
      "space_id" => setup[:idmap]["space_id"],
    }

    space_group_membership_ref01_resdata_up0_result = space_group_membership_ref01_ent.update(space_group_membership_ref01_data_up0_up, nil)
    space_group_membership_ref01_resdata_up0 = Helpers.to_map(space_group_membership_ref01_resdata_up0_result.respond_to?(:data_get) ? space_group_membership_ref01_resdata_up0_result.data_get : space_group_membership_ref01_resdata_up0_result)
    assert !space_group_membership_ref01_resdata_up0.nil?
    assert Runner.live_same_id(space_group_membership_ref01_resdata_up0["id"], space_group_membership_ref01_data_up0_up["id"]) unless setup[:live]

    Runner.live_pace if setup[:live]
    # REMOVE
    space_group_membership_ref01_match_rm0 = {
      "id" => space_group_membership_ref01_data["id"],
    }
    space_group_membership_ref01_match_rm0["space_id"] = setup[:idmap]["space_id"] || setup[:idmap]["space01"]
    space_group_membership_ref01_ent.remove(space_group_membership_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    space_group_membership_ref01_match_rt0 = {
      "space_id" => setup[:idmap]["space01"],
    }

    space_group_membership_ref01_list_rt0_result = space_group_membership_ref01_ent.list(space_group_membership_ref01_match_rt0, nil)
    assert space_group_membership_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(space_group_membership_ref01_list_rt0_result),
      { "id" => space_group_membership_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def space_group_membership_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "space_group_membership", "SpaceGroupMembershipTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ComposalSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["space_group_membership01", "space_group_membership02", "space_group_membership03", "space01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID" => idmap,
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_TEST_EXPLAIN" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["space_id"].nil?
    idmap_resolved["space_id"] = idmap_resolved["space01"]
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
