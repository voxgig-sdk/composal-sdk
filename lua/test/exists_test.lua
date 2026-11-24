-- Composal SDK exists test

local sdk = require("composal_sdk")

describe("ComposalSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
