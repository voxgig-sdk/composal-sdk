<?php
declare(strict_types=1);

// BazelActionResult entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BazelActionResultEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->BazelActionResult(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = ComposalConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = ComposalSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->BazelActionResult(null)->load(["action_result_id" => 1, "id" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = bazel_action_result_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "bazel_action_result." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"bazel_action_result.update.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /api/v1/bazel/action_results/{hash}/{size_bytes}"}' . "\n");
        if (!empty($setup["live"])) {
            foreach (["action_result01", "bazel_action_result01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID");
                }
            }
        }
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            Runner::live_existing($setup, self::LIVE_STRICT, "bazel_action_result",
                fn() => [["id" => $setup["idmap"]["bazel_action_result01"] ?? null]], "id", $setup["idmap"]["bazel_action_result01"] ?? null);
        }

        // Bootstrap entity data from existing test data.
        $bazel_action_result_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.bazel_action_result")));
        $bazel_action_result_ref01_data = null;
        if (count($bazel_action_result_ref01_data_raw) > 0) {
            $bazel_action_result_ref01_data = Helpers::to_map($bazel_action_result_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $bazel_action_result_ref01_ent = $client->BazelActionResult(null);
        $bazel_action_result_ref01_match_dt0 = [
            "id" => $bazel_action_result_ref01_data["id"],
        ];
        $bazel_action_result_ref01_match_dt0["action_result_id"] = $setup["idmap"]["action_result_id"] ?? $setup["idmap"]["action_result01"] ?? null;
        $bazel_action_result_ref01_data_dt0_loaded = $bazel_action_result_ref01_ent->load($bazel_action_result_ref01_match_dt0, null);
        $bazel_action_result_ref01_data_dt0_load_result = Helpers::to_map(is_object($bazel_action_result_ref01_data_dt0_loaded) && method_exists($bazel_action_result_ref01_data_dt0_loaded, 'data_get') ? $bazel_action_result_ref01_data_dt0_loaded->data_get() : $bazel_action_result_ref01_data_dt0_loaded);
        $this->assertNotNull($bazel_action_result_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($bazel_action_result_ref01_data_dt0_load_result["id"] ?? null, $bazel_action_result_ref01_data["id"]));
        }

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["action_result01", "bazel_action_result01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID");
                }
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: " . "the flow updates a bazel_action_result record it did not create");
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $bazel_action_result_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.bazel_action_result")));
        $bazel_action_result_ref01_data = null;
        if (count($bazel_action_result_ref01_data_raw) > 0) {
            $bazel_action_result_ref01_data = Helpers::to_map($bazel_action_result_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $bazel_action_result_ref01_ent = $client->BazelActionResult(null);
        $bazel_action_result_ref01_data_up0_up = [
            "id" => $bazel_action_result_ref01_data["id"],
            "action_result_id" => $setup["idmap"]["action_result_id"],
        ];

        $bazel_action_result_ref01_resdata_up0_result = $bazel_action_result_ref01_ent->update($bazel_action_result_ref01_data_up0_up, null);
        $bazel_action_result_ref01_resdata_up0 = Helpers::to_map(is_object($bazel_action_result_ref01_resdata_up0_result) && method_exists($bazel_action_result_ref01_resdata_up0_result, 'data_get') ? $bazel_action_result_ref01_resdata_up0_result->data_get() : $bazel_action_result_ref01_resdata_up0_result);
        $this->assertNotNull($bazel_action_result_ref01_resdata_up0);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($bazel_action_result_ref01_resdata_up0["id"] ?? null, $bazel_action_result_ref01_data_up0_up["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $bazel_action_result_ref01_match_dt0 = [
            "id" => $bazel_action_result_ref01_data["id"],
        ];
        $bazel_action_result_ref01_match_dt0["action_result_id"] = $setup["idmap"]["action_result_id"] ?? $setup["idmap"]["action_result01"] ?? null;
        $bazel_action_result_ref01_data_dt0_loaded = $bazel_action_result_ref01_ent->load($bazel_action_result_ref01_match_dt0, null);
        $bazel_action_result_ref01_data_dt0_load_result = Helpers::to_map(is_object($bazel_action_result_ref01_data_dt0_loaded) && method_exists($bazel_action_result_ref01_data_dt0_loaded, 'data_get') ? $bazel_action_result_ref01_data_dt0_loaded->data_get() : $bazel_action_result_ref01_data_dt0_loaded);
        $this->assertNotNull($bazel_action_result_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($bazel_action_result_ref01_data_dt0_load_result["id"] ?? null, $bazel_action_result_ref01_data["id"]));
        }

    }
}

function bazel_action_result_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/bazel_action_result/BazelActionResultTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["bazel_action_result01", "bazel_action_result02", "bazel_action_result03", "action_result01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_BAZEL_ACTION_RESULT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["action_result_id"])) {
        $idmap_resolved["action_result_id"] = $idmap_resolved["action_result01"];
    }

    if ($env["COMPOSAL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["COMPOSAL_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new ComposalSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["COMPOSAL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["COMPOSAL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
