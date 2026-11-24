# Composal SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/secrets_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ComposalFeatures
  def self.make_feature(name)
    case name
    when "base"
      ComposalBaseFeature.new
    when "debug"
      ComposalDebugFeature.new
    when "idempotency"
      ComposalIdempotencyFeature.new
    when "metrics"
      ComposalMetricsFeature.new
    when "paging"
      ComposalPagingFeature.new
    when "ratelimit"
      ComposalRatelimitFeature.new
    when "retry"
      ComposalRetryFeature.new
    when "secrets"
      ComposalSecretsFeature.new
    when "test"
      ComposalTestFeature.new
    when "timeout"
      ComposalTimeoutFeature.new
    else
      ComposalBaseFeature.new
    end
  end
end
