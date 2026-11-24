# Composal SDK exists test

import pytest
from composal_sdk import ComposalSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ComposalSDK.test(None, None)
        assert testsdk is not None
