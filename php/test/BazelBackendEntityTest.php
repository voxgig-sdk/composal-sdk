<?php
declare(strict_types=1);

// BazelBackend entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BazelBackendEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->BazelBackend(null);
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
            $client->BazelBackend(null)->load(["id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = bazel_backend_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "bazel_backend." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"bazel_backend.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/bazel/backends/{id}/issue_token"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"bazel_backend.update.1","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /api/v1/bazel/backends/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"bazel_backend.load.2","state":"excluded","attempted":false,"reason":"GET-only live run: reads a record only bazel_backend.create.0 gives"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"bazel_backend.remove.3","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /api/v1/bazel/backends/{id}"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: bazel_backend.create.0 excluded (GET-only live run: needs POST /api/v1/bazel/backends/{id}/issue_token); bazel_backend.update.1 excluded (GET-only live run: needs PUT /api/v1/bazel/backends/{id}); bazel_backend.load.2 excluded (GET-only live run: reads a record only bazel_backend.create.0 gives); bazel_backend.remove.3 excluded (GET-only live run: needs DELETE /api/v1/bazel/backends/{id})');
        }

        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $bazel_backend_ref01_ent = $client->BazelBackend(null);
        $bazel_backend_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.bazel_backend"), "bazel_backend_ref01"));

        $bazel_backend_ref01_data_result = $bazel_backend_ref01_ent->create($bazel_backend_ref01_data, null);
        $bazel_backend_ref01_data = Helpers::to_map(is_object($bazel_backend_ref01_data_result) && method_exists($bazel_backend_ref01_data_result, 'data_get') ? $bazel_backend_ref01_data_result->data_get() : $bazel_backend_ref01_data_result);
        $this->assertNotNull($bazel_backend_ref01_data);
        $this->assertNotNull($bazel_backend_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $bazel_backend_ref01_data_up0_up = [
            "id" => $bazel_backend_ref01_data["id"],
        ];

        $bazel_backend_ref01_resdata_up0_result = $bazel_backend_ref01_ent->update($bazel_backend_ref01_data_up0_up, null);
        $bazel_backend_ref01_resdata_up0 = Helpers::to_map(is_object($bazel_backend_ref01_resdata_up0_result) && method_exists($bazel_backend_ref01_resdata_up0_result, 'data_get') ? $bazel_backend_ref01_resdata_up0_result->data_get() : $bazel_backend_ref01_resdata_up0_result);
        $this->assertNotNull($bazel_backend_ref01_resdata_up0);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($bazel_backend_ref01_resdata_up0["id"] ?? null, $bazel_backend_ref01_data_up0_up["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $bazel_backend_ref01_match_dt0 = [
            "id" => $bazel_backend_ref01_data["id"],
        ];
        $bazel_backend_ref01_data_dt0_loaded = $bazel_backend_ref01_ent->load($bazel_backend_ref01_match_dt0, null);
        $bazel_backend_ref01_data_dt0_load_result = Helpers::to_map(is_object($bazel_backend_ref01_data_dt0_loaded) && method_exists($bazel_backend_ref01_data_dt0_loaded, 'data_get') ? $bazel_backend_ref01_data_dt0_loaded->data_get() : $bazel_backend_ref01_data_dt0_loaded);
        $this->assertNotNull($bazel_backend_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($bazel_backend_ref01_data_dt0_load_result["id"] ?? null, $bazel_backend_ref01_data["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $bazel_backend_ref01_match_rm0 = [
            "id" => $bazel_backend_ref01_data["id"],
        ];
        $bazel_backend_ref01_ent->remove($bazel_backend_ref01_match_rm0, null);

    }
}

function bazel_backend_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/bazel_backend/BazelBackendTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["bazel_backend01", "bazel_backend02", "bazel_backend03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_BAZEL_BACKEND_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_BAZEL_BACKEND_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_BAZEL_BACKEND_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
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
