# Composal SDK exists test

require "minitest/autorun"
require_relative "../Composal_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ComposalSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
