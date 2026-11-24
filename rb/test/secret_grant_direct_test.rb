# SecretGrant direct test

require "minitest/autorun"
require "json"
require_relative "../Composal_sdk"
require_relative "runner"

class SecretGrantDirectTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def live_ok(result)
    status = Helpers.to_int(result["status"])
    result["err"].nil? && result["ok"] && status >= 200 && status < 300
  end

  def test_direct_load_secret_grant
    setup = secret_grant_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-secret_grant", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE" && setup[:idmap]["secret_grant01"].nil?
      puts "LIVE STEP {\"id\":\"direct-load-secret_grant\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs secret_grant01, which only POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/restore gives\"}"
      skip("Live coverage incomplete: direct-load-secret_grant excluded (GET-only live run: needs secret_grant01, which only POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}/restore gives)")
    end
    if setup[:live]
      ["secret_grant01", "organization01", "secret01"].each do |_live_key|
        if setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live test blocked: needs #{_live_key} via COMPOSAL_TEST_SECRET_GRANT_ENTID")
        end
      end
    end
    Runner.live_pace if setup[:live]
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      params["id"] = setup[:idmap]["secret_grant01"]
      params["organization_id"] = setup[:idmap]["organization01"]
      params["secret_id"] = setup[:idmap]["secret01"]
    else
      params["id"] = "direct01"
      params["organization_id"] = "direct02"
      params["secret_id"] = "direct03"
    end

    result = client.direct({
      "path" => "api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/grants/{id}",
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


def secret_grant_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "COMPOSAL_TEST_SECRET_GRANT_ENTID" => {},
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
    idmap = env["COMPOSAL_TEST_SECRET_GRANT_ENTID"]
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
