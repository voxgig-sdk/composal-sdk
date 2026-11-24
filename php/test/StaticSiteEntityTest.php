<?php
declare(strict_types=1);

// StaticSite entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class StaticSiteEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->StaticSite(null);
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
            $client->StaticSite(null)->list(["organization_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = static_site_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "static_site." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"static_site.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/static_sites/{id}/provision"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"static_site.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /api/v1/static_sites/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"static_site.remove.4","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /api/v1/static_sites/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"static_site.list.5","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        if (!empty($setup["live"])) {
            foreach (["organization01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_STATIC_SITE_ENTID");
                }
            }
        }
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            $_liveId = empty($setup["synthetic_only"]) ? ($setup["idmap"]["static_site01"] ?? null) : null;
            Runner::live_pace();
            Runner::live_existing($setup, self::LIVE_STRICT, "static_site",
                fn() => $client->StaticSite(null)->list(["organization_id" => $setup["idmap"]["organization01"] ?? null], null), "id", $_liveId);
        }

        // Bootstrap entity data from existing test data.
        $static_site_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.static_site")));
        $static_site_ref01_data = null;
        if (count($static_site_ref01_data_raw) > 0) {
            $static_site_ref01_data = Helpers::to_map($static_site_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $static_site_ref01_ent = $client->StaticSite(null);
        $static_site_ref01_match = [
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $static_site_ref01_list_result = $static_site_ref01_ent->list($static_site_ref01_match, null);
        $this->assertIsArray($static_site_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $static_site_ref01_match_dt0 = [
            "id" => $static_site_ref01_data["id"],
        ];
        $static_site_ref01_data_dt0_loaded = $static_site_ref01_ent->load($static_site_ref01_match_dt0, null);
        $static_site_ref01_data_dt0_load_result = Helpers::to_map(is_object($static_site_ref01_data_dt0_loaded) && method_exists($static_site_ref01_data_dt0_loaded, 'data_get') ? $static_site_ref01_data_dt0_loaded->data_get() : $static_site_ref01_data_dt0_loaded);
        $this->assertNotNull($static_site_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($static_site_ref01_data_dt0_load_result["id"] ?? null, $static_site_ref01_data["id"]));

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["organization01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_STATIC_SITE_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $static_site_ref01_ent = $client->StaticSite(null);
        $static_site_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.static_site"), "static_site_ref01"));
        $static_site_ref01_data["organization_id"] = $setup["idmap"]["organization01"];

        $static_site_ref01_data_result = $static_site_ref01_ent->create($static_site_ref01_data, null);
        $static_site_ref01_data = Helpers::to_map(is_object($static_site_ref01_data_result) && method_exists($static_site_ref01_data_result, 'data_get') ? $static_site_ref01_data_result->data_get() : $static_site_ref01_data_result);
        $this->assertNotNull($static_site_ref01_data);
        $this->assertNotNull($static_site_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $static_site_ref01_match = [
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $static_site_ref01_list_result = $static_site_ref01_ent->list($static_site_ref01_match, null);
        $this->assertIsArray($static_site_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($static_site_ref01_list_result),
            ["id" => $static_site_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $static_site_ref01_data_up0_up = [
            "id" => $static_site_ref01_data["id"],
        ];

        $static_site_ref01_markdef_up0_name = "active_deployment_id";
        $static_site_ref01_markdef_up0_value = "Mark01-static_site_ref01_" . $setup["now"];
        $static_site_ref01_data_up0_up[$static_site_ref01_markdef_up0_name] = $static_site_ref01_markdef_up0_value;

        $static_site_ref01_resdata_up0_result = $static_site_ref01_ent->update($static_site_ref01_data_up0_up, null);
        $static_site_ref01_resdata_up0 = Helpers::to_map(is_object($static_site_ref01_resdata_up0_result) && method_exists($static_site_ref01_resdata_up0_result, 'data_get') ? $static_site_ref01_resdata_up0_result->data_get() : $static_site_ref01_resdata_up0_result);
        $this->assertNotNull($static_site_ref01_resdata_up0);
        $this->assertTrue(Runner::live_same_id($static_site_ref01_resdata_up0["id"] ?? null, $static_site_ref01_data_up0_up["id"]));
        $this->assertEquals($static_site_ref01_resdata_up0[$static_site_ref01_markdef_up0_name], $static_site_ref01_markdef_up0_value);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $static_site_ref01_match_dt0 = [
            "id" => $static_site_ref01_data["id"],
        ];
        $static_site_ref01_data_dt0_loaded = $static_site_ref01_ent->load($static_site_ref01_match_dt0, null);
        $static_site_ref01_data_dt0_load_result = Helpers::to_map(is_object($static_site_ref01_data_dt0_loaded) && method_exists($static_site_ref01_data_dt0_loaded, 'data_get') ? $static_site_ref01_data_dt0_loaded->data_get() : $static_site_ref01_data_dt0_loaded);
        $this->assertNotNull($static_site_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($static_site_ref01_data_dt0_load_result["id"] ?? null, $static_site_ref01_data["id"]));

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $static_site_ref01_match_rm0 = [
            "id" => $static_site_ref01_data["id"],
        ];
        $static_site_ref01_ent->remove($static_site_ref01_match_rm0, null);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $static_site_ref01_match_rt0 = [
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $static_site_ref01_list_rt0_result = $static_site_ref01_ent->list($static_site_ref01_match_rt0, null);
        $this->assertIsArray($static_site_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($static_site_ref01_list_rt0_result),
            ["id" => $static_site_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function static_site_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/static_site/StaticSiteTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["static_site01", "static_site02", "static_site03", "organization01", "organization02", "organization03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_STATIC_SITE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_STATIC_SITE_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_STATIC_SITE_ENTID"]);
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
