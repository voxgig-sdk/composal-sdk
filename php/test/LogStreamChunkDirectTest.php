<?php
declare(strict_types=1);

// LogStreamChunk direct test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;

class LogStreamChunkDirectTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    private static function liveOk(array $result): bool
    {
        $status = Helpers::to_int($result["status"] ?? 0);
        return empty($result["err"]) && !empty($result["ok"]) && $status >= 200 && $status < 300;
    }

    public function test_direct_load_log_stream_chunk(): void
    {
        $setup = log_stream_chunk_direct_setup(["id" => "direct01"]);
        [$_shouldSkip, $_reason] = Runner::is_control_skipped("direct", "direct-load-log_stream_chunk", $setup["live"] ? "live" : "unit");
        if ($_shouldSkip) {
            $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
            return;
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE" && null === ($setup["idmap"]['log_stream_chunk01'] ?? null)) {
            fwrite(STDOUT, 'LIVE STEP {"id":"direct-load-log_stream_chunk","state":"excluded","attempted":false,"reason":"GET-only live run: needs log_stream_chunk01, which only POST /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks gives"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: direct-load-log_stream_chunk excluded (GET-only live run: needs log_stream_chunk01, which only POST /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks gives)');
        }
        if ($setup["live"]) {
            foreach (["log_stream_chunk01", "log_stream01", "space01"] as $_liveKey) {
                if (null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID");
                }
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        $client = $setup["client"];

        $params = [];
        $query = [];
        if ($setup["live"]) {
            $params["id"] = $setup["idmap"]["log_stream_chunk01"] ?? null;
            $params["log_stream_id"] = $setup["idmap"]["log_stream01"] ?? null;
            $params["space_id"] = $setup["idmap"]["space01"] ?? null;
        } else {
            $params["id"] = "direct01";
            $params["log_stream_id"] = "direct02";
            $params["space_id"] = "direct03";
        }

        $result = $client->direct([
            "path" => "api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks/{id}",
            "method" => "GET",
            "params" => $params,
            "query" => $query,
        ]);
        if ($setup["live"]) {
            if (!self::liveOk($result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live load failed: " . Runner::live_describe($result));
            }
            if (null === ($result["data"] ?? null)) {
                Runner::live_miss(self::LIVE_STRICT, "Live load returned no data: " . Runner::live_describe($result));
            }
            $this->assertNotNull($result["data"]);
        } else {
            $this->assertArrayNotHasKey("err", $result);
            $this->assertTrue($result["ok"]);
            $this->assertEquals(200, Helpers::to_int($result["status"]));
            $this->assertNotNull($result["data"]);
            if (is_array($result["data"]) && isset($result["data"]["id"])) {
                $this->assertEquals("direct01", $result["data"]["id"]);
            }
            $this->assertCount(1, $setup["calls"]);
        }
    }

}


function log_stream_chunk_direct_setup($mockres)
{
    Runner::load_env_local();

    $calls = new \ArrayObject();

    $env = Runner::env_override([
        "COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID" => [],
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $live = $env["COMPOSAL_TEST_LIVE"] === "TRUE";

    if ($live) {
        // Merged so the generated fields win: sdk-test-control.json's
        // test.client.options adds to the live client, it does not redirect it.
        $merged_opts = array_merge(Runner::live_client_options(), [
            "apikey" => $env["COMPOSAL_APIKEY"],
        ]);
        $client = new ComposalSDK($merged_opts);
        $idmap = $env["COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID"] ?? [];
        return [
            "client" => $client,
            "calls" => $calls,
            "live" => true,
            "idmap" => is_array($idmap) ? $idmap : [],
        ];
    }

    $mock_fetch = function ($url, $init) use ($calls, $mockres) {
        $calls[] = ["url" => $url, "init" => $init];
        return [
            [
                "status" => 200,
                "statusText" => "OK",
                "headers" => [],
                "json" => function () use ($mockres) {
                    if ($mockres !== null) {
                        return $mockres;
                    }
                    return ["id" => "direct01"];
                },
                "body" => "mock",
            ],
            null,
        ];
    };

    $client = new ComposalSDK([
        "base" => "http://localhost:8080",
        "system" => [
            "fetch" => $mock_fetch,
        ],
    ]);

    return [
        "client" => $client,
        "calls" => $calls,
        "live" => false,
        "idmap" => [],
    ];
}
