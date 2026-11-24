<?php
declare(strict_types=1);

// ProactiveAgentWaitlistEntry entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ProactiveAgentWaitlistEntryEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->ProactiveAgentWaitlistEntry(null);
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
            $client->ProactiveAgentWaitlistEntry(null)->load(["id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = proactive_agent_waitlist_entry_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "proactive_agent_waitlist_entry." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"proactive_agent_waitlist_entry.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"proactive_agent_waitlist_entry.load.1","state":"excluded","attempted":false,"reason":"GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: proactive_agent_waitlist_entry.create.0 excluded (GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries); proactive_agent_waitlist_entry.load.1 excluded (GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives)');
        }

        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $proactive_agent_waitlist_entry_ref01_ent = $client->ProactiveAgentWaitlistEntry(null);
        $proactive_agent_waitlist_entry_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.proactive_agent_waitlist_entry"), "proactive_agent_waitlist_entry_ref01"));

        $proactive_agent_waitlist_entry_ref01_data_result = $proactive_agent_waitlist_entry_ref01_ent->create($proactive_agent_waitlist_entry_ref01_data, null);
        $proactive_agent_waitlist_entry_ref01_data = Helpers::to_map(is_object($proactive_agent_waitlist_entry_ref01_data_result) && method_exists($proactive_agent_waitlist_entry_ref01_data_result, 'data_get') ? $proactive_agent_waitlist_entry_ref01_data_result->data_get() : $proactive_agent_waitlist_entry_ref01_data_result);
        $this->assertNotNull($proactive_agent_waitlist_entry_ref01_data);
        $this->assertNotNull($proactive_agent_waitlist_entry_ref01_data["referral_code"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $proactive_agent_waitlist_entry_ref01_match_dt0 = [
            "id" => $proactive_agent_waitlist_entry_ref01_data["referral_code"],
        ];
        $proactive_agent_waitlist_entry_ref01_data_dt0_loaded = $proactive_agent_waitlist_entry_ref01_ent->load($proactive_agent_waitlist_entry_ref01_match_dt0, null);
        $proactive_agent_waitlist_entry_ref01_data_dt0_load_result = Helpers::to_map(is_object($proactive_agent_waitlist_entry_ref01_data_dt0_loaded) && method_exists($proactive_agent_waitlist_entry_ref01_data_dt0_loaded, 'data_get') ? $proactive_agent_waitlist_entry_ref01_data_dt0_loaded->data_get() : $proactive_agent_waitlist_entry_ref01_data_dt0_loaded);
        $this->assertNotNull($proactive_agent_waitlist_entry_ref01_data_dt0_load_result);
        $this->assertTrue(Runner::live_same_id($proactive_agent_waitlist_entry_ref01_data_dt0_load_result["referral_code"] ?? null, $proactive_agent_waitlist_entry_ref01_data["referral_code"]));

    }
}

function proactive_agent_waitlist_entry_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/proactive_agent_waitlist_entry/ProactiveAgentWaitlistEntryTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    foreach (($entity_data["existing"]["proactive_agent_waitlist_entry"] ?? []) as $rec_key => $rec) {
        if (is_array($rec) && isset($rec["id"])) {
            $entity_data["existing"]["proactive_agent_waitlist_entry"][$rec_key]["referral_code"] = $rec["id"];
        }
    }

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["proactive_agent_waitlist_entry01", "proactive_agent_waitlist_entry02", "proactive_agent_waitlist_entry03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID"]);
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
