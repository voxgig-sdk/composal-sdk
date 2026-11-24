<?php
declare(strict_types=1);

// MergeQueueEntry entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MergeQueueEntryEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->MergeQueueEntry(null);
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
            $client->MergeQueueEntry(null)->create(["merge_queue_id" => 1, "organization_id" => 'x', "repo_id" => 'x', "expected_version" => 1, "idempotency_key" => 'x', "kind" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = merge_queue_entry_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "merge_queue_entry." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"merge_queue_entry.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"merge_queue_entry.remove.1","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: merge_queue_entry.create.0 excluded (GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge); merge_queue_entry.remove.1 excluded (GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id})');
        }

        if (!empty($setup["live"])) {
            foreach (["merge_queue01", "organization01", "repo01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $merge_queue_entry_ref01_ent = $client->MergeQueueEntry(null);
        $merge_queue_entry_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.merge_queue_entry"), "merge_queue_entry_ref01"));
        $merge_queue_entry_ref01_data["merge_queue_id"] = $setup["idmap"]["merge_queue01"];
        $merge_queue_entry_ref01_data["organization_id"] = $setup["idmap"]["organization01"];
        $merge_queue_entry_ref01_data["repo_id"] = $setup["idmap"]["repo01"];

        $merge_queue_entry_ref01_data_result = $merge_queue_entry_ref01_ent->create($merge_queue_entry_ref01_data, null);
        $merge_queue_entry_ref01_data = Helpers::to_map(is_object($merge_queue_entry_ref01_data_result) && method_exists($merge_queue_entry_ref01_data_result, 'data_get') ? $merge_queue_entry_ref01_data_result->data_get() : $merge_queue_entry_ref01_data_result);
        $this->assertNotNull($merge_queue_entry_ref01_data);
        $this->assertNotNull($merge_queue_entry_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $merge_queue_entry_ref01_match_rm0 = [
            "id" => $merge_queue_entry_ref01_data["id"],
        ];
        $merge_queue_entry_ref01_match_rm0["merge_queue_id"] = $setup["idmap"]["merge_queue_id"] ?? $setup["idmap"]["merge_queue01"] ?? null;
        $merge_queue_entry_ref01_match_rm0["organization_id"] = $setup["idmap"]["organization_id"] ?? $setup["idmap"]["organization01"] ?? null;
        $merge_queue_entry_ref01_match_rm0["repo_id"] = $setup["idmap"]["repo_id"] ?? $setup["idmap"]["repo01"] ?? null;
        $merge_queue_entry_ref01_ent->remove($merge_queue_entry_ref01_match_rm0, null);

    }
}

function merge_queue_entry_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/merge_queue_entry/MergeQueueEntryTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["merge_queue_entry01", "merge_queue_entry02", "merge_queue_entry03", "organization01", "organization02", "organization03", "repo01", "repo02", "repo03", "merge_queue01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID"]);
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
