<?php
declare(strict_types=1);

// PullRequestTranscript direct test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;

class PullRequestTranscriptDirectTest extends TestCase
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

    public function test_direct_list_pull_request_transcript(): void
    {
        $setup = pull_request_transcript_direct_setup([
            ["id" => "direct01"],
            ["id" => "direct02"],
        ]);
        [$_shouldSkip, $_reason] = Runner::is_control_skipped("direct", "direct-list-pull_request_transcript", $setup["live"] ? "live" : "unit");
        if ($_shouldSkip) {
            $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
            return;
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE" && null === ($setup["idmap"]['pull_request01'] ?? null)) {
            fwrite(STDOUT, 'LIVE STEP {"id":"direct-list-pull_request_transcript","state":"excluded","attempted":false,"reason":"GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: direct-list-pull_request_transcript excluded (GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives)');
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE" && null === ($setup["idmap"]['pull_request01'] ?? null)) {
            fwrite(STDOUT, 'LIVE STEP {"id":"direct-list-pull_request_transcript","state":"excluded","attempted":false,"reason":"GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: direct-list-pull_request_transcript excluded (GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives)');
        }
        if ($setup["live"]) {
            foreach (["organization01", "pull_request01", "pull_request01", "repo01"] as $_liveKey) {
                if (null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID");
                }
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        $client = $setup["client"];

        $params = [];
        $query = [];
        $params["organization_id"] = $setup["live"] ? ($setup["idmap"]["organization01"] ?? null) : "direct01";
        $params["pull_request_id"] = $setup["live"] ? ($setup["idmap"]["pull_request01"] ?? null) : "direct02";
        $params["pull_request_id"] = $setup["live"] ? ($setup["idmap"]["pull_request01"] ?? null) : "direct03";
        $params["repo_id"] = $setup["live"] ? ($setup["idmap"]["repo01"] ?? null) : "direct04";

        $result = $client->direct([
            "path" => "api/v1/organizations/{organization_id}/repos/{repo_id}/pages/pull_request/{pull_request_id}/transcripts",
            "method" => "GET",
            "params" => $params,
            "query" => $query,
        ]);
        if ($setup["live"]) {
            if (!self::liveOk($result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live list failed: " . Runner::live_describe($result));
            }
            if (null === Runner::live_list($result["data"] ?? null)) {
                Runner::live_miss(self::LIVE_STRICT, "Live list returned no list: " . Runner::live_describe($result));
            }
            $this->assertIsArray(Runner::live_list($result["data"]));
        } else {
            $this->assertArrayNotHasKey("err", $result);
            $this->assertTrue($result["ok"]);
            $this->assertEquals(200, Helpers::to_int($result["status"]));
            $this->assertIsArray($result["data"]);
            $this->assertCount(2, $result["data"]);
            $this->assertCount(1, $setup["calls"]);
        }
    }

}


function pull_request_transcript_direct_setup($mockres)
{
    Runner::load_env_local();

    $calls = new \ArrayObject();

    $env = Runner::env_override([
        "COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID" => [],
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
        $idmap = $env["COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID"] ?? [];
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
