<?php
declare(strict_types=1);

// SignalSubscription entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SignalSubscriptionEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->SignalSubscription(null);
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
            $client->SignalSubscription(null)->list(["organization_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = signal_subscription_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "signal_subscription." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"signal_subscription.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/signal_subscriptions"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"signal_subscription.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/signal_subscriptions/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"signal_subscription.remove.4","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/signal_subscriptions/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"signal_subscription.list.5","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        if (!empty($setup["live"])) {
            foreach (["organization01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID");
                }
            }
        }
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            $_liveId = empty($setup["synthetic_only"]) ? ($setup["idmap"]["signal_subscription01"] ?? null) : null;
            Runner::live_pace();
            Runner::live_existing($setup, self::LIVE_STRICT, "signal_subscription",
                fn() => $client->SignalSubscription(null)->list(["organization_id" => $setup["idmap"]["organization01"] ?? null], null), "id", $_liveId);
        }

        // Bootstrap entity data from existing test data.
        $signal_subscription_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.signal_subscription")));
        $signal_subscription_ref01_data = null;
        if (count($signal_subscription_ref01_data_raw) > 0) {
            $signal_subscription_ref01_data = Helpers::to_map($signal_subscription_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $signal_subscription_ref01_ent = $client->SignalSubscription(null);
        $signal_subscription_ref01_match = [
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $signal_subscription_ref01_list_result = $signal_subscription_ref01_ent->list($signal_subscription_ref01_match, null);
        $this->assertIsArray($signal_subscription_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $signal_subscription_ref01_match_dt0 = [
            "id" => $signal_subscription_ref01_data["id"],
        ];
        $signal_subscription_ref01_match_dt0["organization_id"] = $setup["idmap"]["organization_id"] ?? $setup["idmap"]["organization01"] ?? null;
        $signal_subscription_ref01_data_dt0_loaded = $signal_subscription_ref01_ent->load($signal_subscription_ref01_match_dt0, null);
        $signal_subscription_ref01_data_dt0_load_result = Helpers::to_map(is_object($signal_subscription_ref01_data_dt0_loaded) && method_exists($signal_subscription_ref01_data_dt0_loaded, 'data_get') ? $signal_subscription_ref01_data_dt0_loaded->data_get() : $signal_subscription_ref01_data_dt0_loaded);
        $this->assertNotNull($signal_subscription_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($signal_subscription_ref01_data_dt0_load_result["id"] ?? null, $signal_subscription_ref01_data["id"]));
        }

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["organization01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $signal_subscription_ref01_ent = $client->SignalSubscription(null);
        $signal_subscription_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.signal_subscription"), "signal_subscription_ref01"));
        $signal_subscription_ref01_data["organization_id"] = $setup["idmap"]["organization01"];

        $signal_subscription_ref01_data_result = $signal_subscription_ref01_ent->create($signal_subscription_ref01_data, null);
        $signal_subscription_ref01_data = Helpers::to_map(is_object($signal_subscription_ref01_data_result) && method_exists($signal_subscription_ref01_data_result, 'data_get') ? $signal_subscription_ref01_data_result->data_get() : $signal_subscription_ref01_data_result);
        $this->assertNotNull($signal_subscription_ref01_data);
        $this->assertNotNull($signal_subscription_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $signal_subscription_ref01_match = [
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $signal_subscription_ref01_list_result = $signal_subscription_ref01_ent->list($signal_subscription_ref01_match, null);
        $this->assertIsArray($signal_subscription_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($signal_subscription_ref01_list_result),
            ["id" => $signal_subscription_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $signal_subscription_ref01_data_up0_up = [
            "id" => $signal_subscription_ref01_data["id"],
            "organization_id" => $setup["idmap"]["organization_id"],
        ];

        $signal_subscription_ref01_resdata_up0_result = $signal_subscription_ref01_ent->update($signal_subscription_ref01_data_up0_up, null);
        $signal_subscription_ref01_resdata_up0 = Helpers::to_map(is_object($signal_subscription_ref01_resdata_up0_result) && method_exists($signal_subscription_ref01_resdata_up0_result, 'data_get') ? $signal_subscription_ref01_resdata_up0_result->data_get() : $signal_subscription_ref01_resdata_up0_result);
        $this->assertNotNull($signal_subscription_ref01_resdata_up0);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($signal_subscription_ref01_resdata_up0["id"] ?? null, $signal_subscription_ref01_data_up0_up["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $signal_subscription_ref01_match_dt0 = [
            "id" => $signal_subscription_ref01_data["id"],
        ];
        $signal_subscription_ref01_match_dt0["organization_id"] = $setup["idmap"]["organization_id"] ?? $setup["idmap"]["organization01"] ?? null;
        $signal_subscription_ref01_data_dt0_loaded = $signal_subscription_ref01_ent->load($signal_subscription_ref01_match_dt0, null);
        $signal_subscription_ref01_data_dt0_load_result = Helpers::to_map(is_object($signal_subscription_ref01_data_dt0_loaded) && method_exists($signal_subscription_ref01_data_dt0_loaded, 'data_get') ? $signal_subscription_ref01_data_dt0_loaded->data_get() : $signal_subscription_ref01_data_dt0_loaded);
        $this->assertNotNull($signal_subscription_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($signal_subscription_ref01_data_dt0_load_result["id"] ?? null, $signal_subscription_ref01_data["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $signal_subscription_ref01_match_rm0 = [
            "id" => $signal_subscription_ref01_data["id"],
        ];
        $signal_subscription_ref01_match_rm0["organization_id"] = $setup["idmap"]["organization_id"] ?? $setup["idmap"]["organization01"] ?? null;
        $signal_subscription_ref01_ent->remove($signal_subscription_ref01_match_rm0, null);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $signal_subscription_ref01_match_rt0 = [
            "organization_id" => $setup["idmap"]["organization01"],
        ];

        $signal_subscription_ref01_list_rt0_result = $signal_subscription_ref01_ent->list($signal_subscription_ref01_match_rt0, null);
        $this->assertIsArray($signal_subscription_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($signal_subscription_ref01_list_rt0_result),
            ["id" => $signal_subscription_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function signal_subscription_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/signal_subscription/SignalSubscriptionTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["signal_subscription01", "signal_subscription02", "signal_subscription03", "organization01", "organization02", "organization03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_SIGNAL_SUBSCRIPTION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["organization_id"])) {
        $idmap_resolved["organization_id"] = $idmap_resolved["organization01"];
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
