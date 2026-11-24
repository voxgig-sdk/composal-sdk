# Composal SDK feature factory

from composal_sdk.feature.base_feature import ComposalBaseFeature
from composal_sdk.feature.debug_feature import ComposalDebugFeature
from composal_sdk.feature.idempotency_feature import ComposalIdempotencyFeature
from composal_sdk.feature.metrics_feature import ComposalMetricsFeature
from composal_sdk.feature.paging_feature import ComposalPagingFeature
from composal_sdk.feature.ratelimit_feature import ComposalRatelimitFeature
from composal_sdk.feature.retry_feature import ComposalRetryFeature
from composal_sdk.feature.secrets_feature import ComposalSecretsFeature
from composal_sdk.feature.test_feature import ComposalTestFeature
from composal_sdk.feature.timeout_feature import ComposalTimeoutFeature


_FEATURES = {
    "base": lambda: ComposalBaseFeature(),
    "debug": lambda: ComposalDebugFeature(),
    "idempotency": lambda: ComposalIdempotencyFeature(),
    "metrics": lambda: ComposalMetricsFeature(),
    "paging": lambda: ComposalPagingFeature(),
    "ratelimit": lambda: ComposalRatelimitFeature(),
    "retry": lambda: ComposalRetryFeature(),
    "secrets": lambda: ComposalSecretsFeature(),
    "test": lambda: ComposalTestFeature(),
    "timeout": lambda: ComposalTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
