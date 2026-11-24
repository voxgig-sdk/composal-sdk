# ToolFeedback direct test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class ToolFeedbackDirectTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def live_ok(result)
    status = Helpers.to_int(result["status"])
    result["err"].nil? && result["ok"] && status >= 200 && status < 300
  end

  def test_direct_load_tool_feedback
    setup = tool_feedback_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-tool_feedback", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE" && setup[:idmap]["tool_feedback01"].nil?
      puts "LIVE STEP {\"id\":\"direct-load-tool_feedback\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs tool_feedback01, which only POST /api/v1/organizations/{organization_id}/tool_feedbacks gives\"}"
      skip("Live coverage incomplete: direct-load-tool_feedback excluded (GET-only live run: needs tool_feedback01, which only POST /api/v1/organizations/{organization_id}/tool_feedbacks gives)")
    end
    if setup[:live]
      ["tool_feedback01", "organization01"].each do |_live_key|
        if setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live test blocked: needs #{_live_key} via COMPOSAL_TEST_TOOL_FEEDBACK_ENTID")
        end
      end
    end
    Runner.live_pace if setup[:live]
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      params["id"] = setup[:idmap]["tool_feedback01"]
      params["organization_id"] = setup[:idmap]["organization01"]
    else
      params["id"] = "direct01"
      params["organization_id"] = "direct02"
    end

    result = client.direct({
      "path" => "api/v1/organizations/{organization_id}/tool_feedbacks/{id}",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      unless live_ok(result)
        Runner.live_miss(LIVE_STRICT, "Live load failed: " + Runner.live_describe(result))
      end
      if result["data"].nil?
        Runner.live_miss(LIVE_STRICT, "Live load returned no data: " + Runner.live_describe(result))
      end
      assert !result["data"].nil?
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert !result["data"].nil?
      if result["data"].is_a?(Hash)
        assert_equal "direct01", result["data"]["id"]
      end
      assert_equal 1, setup[:calls].length
    end
  end

end


def tool_feedback_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "COMPOSAL_TEST_TOOL_FEEDBACK_ENTID" => {},
    "COMPOSAL_TEST_LIVE" => "FALSE",
    "COMPOSAL_APIKEY" => "",
  })

  live = env["COMPOSAL_TEST_LIVE"] == "TRUE"

  if live
    # Merged so the generated fields win: sdk-test-control.json's
    # test.client.options adds to the live client, it does not redirect it.
    merged_opts = Runner.live_client_options.merge({
      "apikey" => env["COMPOSAL_APIKEY"],
    })
    client = ComposalSDK.new(merged_opts)
    idmap = env["COMPOSAL_TEST_TOOL_FEEDBACK_ENTID"]
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: idmap.is_a?(Hash) ? idmap : {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = ComposalSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
