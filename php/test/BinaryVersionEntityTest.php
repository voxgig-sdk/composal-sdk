<?php
declare(strict_types=1);

// BinaryVersion entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BinaryVersionEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->BinaryVersion(null);
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
            $client->BinaryVersion(null)->list(["binary_id" => 1, "organization_id" => 'x', "project_id" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = binary_version_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "binary_version." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"binary_version.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"binary_version.remove.3","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"binary_version.list.4","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        if (!empty($setup["live"])) {
            foreach (["binary01", "organization01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_BINARY_VERSION_ENTID");
                }
            }
        }
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            $_liveId = empty($setup["synthetic_only"]) ? ($setup["idmap"]["binary_version01"] ?? null) : null;
            Runner::live_pace();
            Runner::live_existing($setup, self::LIVE_STRICT, "binary_version",
                fn() => $client->BinaryVersion(null)->list(["binary_id" => $setup["idmap"]["binary01"] ?? null, "organization_id" => $setup["idmap"]["organization01"] ?? null], null), "id", $_liveId);
        }

        // Bootstrap entity data from existing test data.
        $binary_version_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.binary_version")));
        $binary_version_ref01_data = null;
        if (count($binary_version_ref01_data_raw) > 0) {
            $binary_version_ref01_data = Helpers::to_map($binary_version_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $binary_version_ref01_ent = $client->BinaryVersion(null);
        $binary_version_ref01_match = [
            "binary_id" => $setup["idmap"]["binary01"],
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $binary_version_ref01_list_result = $binary_version_ref01_ent->list($binary_version_ref01_match, null);
        $this->assertIsArray($binary_version_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $binary_version_ref01_match_dt0 = [
            "id" => $binary_version_ref01_data["id"],
        ];
        $binary_version_ref01_match_dt0["binary_id"] = $setup["idmap"]["binary_id"] ?? $setup["idmap"]["binary01"] ?? null;
        $binary_version_ref01_match_dt0["organization_id"] = $setup["idmap"]["organization_id"] ?? $setup["idmap"]["organization01"] ?? null;
        $binary_version_ref01_data_dt0_loaded = $binary_version_ref01_ent->load($binary_version_ref01_match_dt0, null);
        $binary_version_ref01_data_dt0_load_result = Helpers::to_map(is_object($binary_version_ref01_data_dt0_loaded) && method_exists($binary_version_ref01_data_dt0_loaded, 'data_get') ? $binary_version_ref01_data_dt0_loaded->data_get() : $binary_version_ref01_data_dt0_loaded);
        $this->assertNotNull($binary_version_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($binary_version_ref01_data_dt0_load_result["id"] ?? null, $binary_version_ref01_data["id"]));

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["binary01", "organization01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_BINARY_VERSION_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $binary_version_ref01_ent = $client->BinaryVersion(null);
        $binary_version_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.binary_version"), "binary_version_ref01"));
        $binary_version_ref01_data["binary_id"] = $setup["idmap"]["binary01"];
        $binary_version_ref01_data["organization_id"] = $setup["idmap"]["organization01"];

        $binary_version_ref01_data_result = $binary_version_ref01_ent->create($binary_version_ref01_data, null);
        $binary_version_ref01_data = Helpers::to_map(is_object($binary_version_ref01_data_result) && method_exists($binary_version_ref01_data_result, 'data_get') ? $binary_version_ref01_data_result->data_get() : $binary_version_ref01_data_result);
        $this->assertNotNull($binary_version_ref01_data);
        $this->assertNotNull($binary_version_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $binary_version_ref01_match = [
            "binary_id" => $setup["idmap"]["binary01"],
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $binary_version_ref01_list_result = $binary_version_ref01_ent->list($binary_version_ref01_match, null);
        $this->assertIsArray($binary_version_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($binary_version_ref01_list_result),
            ["id" => $binary_version_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $binary_version_ref01_match_dt0 = [
            "id" => $binary_version_ref01_data["id"],
        ];
        $binary_version_ref01_match_dt0["binary_id"] = $setup["idmap"]["binary_id"] ?? $setup["idmap"]["binary01"] ?? null;
        $binary_version_ref01_match_dt0["organization_id"] = $setup["idmap"]["organization_id"] ?? $setup["idmap"]["organization01"] ?? null;
        $binary_version_ref01_data_dt0_loaded = $binary_version_ref01_ent->load($binary_version_ref01_match_dt0, null);
        $binary_version_ref01_data_dt0_load_result = Helpers::to_map(is_object($binary_version_ref01_data_dt0_loaded) && method_exists($binary_version_ref01_data_dt0_loaded, 'data_get') ? $binary_version_ref01_data_dt0_loaded->data_get() : $binary_version_ref01_data_dt0_loaded);
        $this->assertNotNull($binary_version_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($binary_version_ref01_data_dt0_load_result["id"] ?? null, $binary_version_ref01_data["id"]));

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $binary_version_ref01_match_rm0 = [
            "id" => $binary_version_ref01_data["id"],
        ];
        $binary_version_ref01_match_rm0["binary_id"] = $setup["idmap"]["binary_id"] ?? $setup["idmap"]["binary01"] ?? null;
        $binary_version_ref01_match_rm0["organization_id"] = $setup["idmap"]["organization_id"] ?? $setup["idmap"]["organization01"] ?? null;
        $binary_version_ref01_ent->remove($binary_version_ref01_match_rm0, null);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $binary_version_ref01_match_rt0 = [
            "binary_id" => $setup["idmap"]["binary01"],
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $binary_version_ref01_list_rt0_result = $binary_version_ref01_ent->list($binary_version_ref01_match_rt0, null);
        $this->assertIsArray($binary_version_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($binary_version_ref01_list_rt0_result),
            ["id" => $binary_version_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function binary_version_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/binary_version/BinaryVersionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["binary_version01", "binary_version02", "binary_version03", "organization01", "organization02", "organization03", "binary01", "binary02", "binary03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_BINARY_VERSION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_BINARY_VERSION_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_BINARY_VERSION_ENTID"]);
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
