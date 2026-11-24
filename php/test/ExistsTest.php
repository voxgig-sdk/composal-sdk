<?php
declare(strict_types=1);

// Composal SDK exists test

require_once __DIR__ . '/../composal_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
