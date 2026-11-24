<?php
declare(strict_types=1);

// SpaceOtelCollector entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SpaceOtelCollectorEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->SpaceOtelCollector(null);
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
            $client->SpaceOtelCollector(null)->load(["id" => 1, "space_id" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = space_otel_collector_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "space_otel_collector." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"space_otel_collector.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/activate"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"space_otel_collector.update.1","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /api/v1/observability/spaces/{space_id}/otel_collectors/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"space_otel_collector.load.2","state":"excluded","attempted":false,"reason":"GET-only live run: reads a record only space_otel_collector.create.0 gives"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"space_otel_collector.remove.3","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /api/v1/observability/spaces/{space_id}/otel_collectors/{id}"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: space_otel_collector.create.0 excluded (GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/otel_collectors/{id}/activate); space_otel_collector.update.1 excluded (GET-only live run: needs PUT /api/v1/observability/spaces/{space_id}/otel_collectors/{id}); space_otel_collector.load.2 excluded (GET-only live run: reads a record only space_otel_collector.create.0 gives); space_otel_collector.remove.3 excluded (GET-only live run: needs DELETE /api/v1/observability/spaces/{space_id}/otel_collectors/{id})');
        }

        if (!empty($setup["live"])) {
            foreach (["space01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $space_otel_collector_ref01_ent = $client->SpaceOtelCollector(null);
        $space_otel_collector_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.space_otel_collector"), "space_otel_collector_ref01"));
        $space_otel_collector_ref01_data["space_id"] = $setup["idmap"]["space01"];

        $space_otel_collector_ref01_data_result = $space_otel_collector_ref01_ent->create($space_otel_collector_ref01_data, null);
        $space_otel_collector_ref01_data = Helpers::to_map(is_object($space_otel_collector_ref01_data_result) && method_exists($space_otel_collector_ref01_data_result, 'data_get') ? $space_otel_collector_ref01_data_result->data_get() : $space_otel_collector_ref01_data_result);
        $this->assertNotNull($space_otel_collector_ref01_data);
        $this->assertNotNull($space_otel_collector_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $space_otel_collector_ref01_data_up0_up = [
            "id" => $space_otel_collector_ref01_data["id"],
            "space_id" => $setup["idmap"]["space_id"],
        ];

        $space_otel_collector_ref01_resdata_up0_result = $space_otel_collector_ref01_ent->update($space_otel_collector_ref01_data_up0_up, null);
        $space_otel_collector_ref01_resdata_up0 = Helpers::to_map(is_object($space_otel_collector_ref01_resdata_up0_result) && method_exists($space_otel_collector_ref01_resdata_up0_result, 'data_get') ? $space_otel_collector_ref01_resdata_up0_result->data_get() : $space_otel_collector_ref01_resdata_up0_result);
        $this->assertNotNull($space_otel_collector_ref01_resdata_up0);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($space_otel_collector_ref01_resdata_up0["id"] ?? null, $space_otel_collector_ref01_data_up0_up["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $space_otel_collector_ref01_match_dt0 = [
            "id" => $space_otel_collector_ref01_data["id"],
        ];
        $space_otel_collector_ref01_data_dt0_loaded = $space_otel_collector_ref01_ent->load($space_otel_collector_ref01_match_dt0, null);
        $space_otel_collector_ref01_data_dt0_load_result = Helpers::to_map(is_object($space_otel_collector_ref01_data_dt0_loaded) && method_exists($space_otel_collector_ref01_data_dt0_loaded, 'data_get') ? $space_otel_collector_ref01_data_dt0_loaded->data_get() : $space_otel_collector_ref01_data_dt0_loaded);
        $this->assertNotNull($space_otel_collector_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($space_otel_collector_ref01_data_dt0_load_result["id"] ?? null, $space_otel_collector_ref01_data["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $space_otel_collector_ref01_match_rm0 = [
            "id" => $space_otel_collector_ref01_data["id"],
        ];
        $space_otel_collector_ref01_match_rm0["space_id"] = $setup["idmap"]["space_id"] ?? $setup["idmap"]["space01"] ?? null;
        $space_otel_collector_ref01_ent->remove($space_otel_collector_ref01_match_rm0, null);

    }
}

function space_otel_collector_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/space_otel_collector/SpaceOtelCollectorTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["space_otel_collector01", "space_otel_collector02", "space_otel_collector03", "space01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_SPACE_OTEL_COLLECTOR_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["space_id"])) {
        $idmap_resolved["space_id"] = $idmap_resolved["space01"];
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
