<?php
declare(strict_types=1);

// SpaceGroupMembership entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SpaceGroupMembershipEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->SpaceGroupMembership(null);
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
            $client->SpaceGroupMembership(null)->list(["space_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = space_group_membership_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "space_group_membership." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"space_group_membership.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/group_memberships"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"space_group_membership.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/group_memberships/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"space_group_membership.remove.3","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/group_memberships/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"space_group_membership.list.4","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        if (!empty($setup["live"])) {
            foreach (["space01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $space_group_membership_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.space_group_membership")));
        $space_group_membership_ref01_data = null;
        if (count($space_group_membership_ref01_data_raw) > 0) {
            $space_group_membership_ref01_data = Helpers::to_map($space_group_membership_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $space_group_membership_ref01_ent = $client->SpaceGroupMembership(null);
        $space_group_membership_ref01_match = [
            "space_id" => $setup["idmap"]["space01"],
        ];

        $space_group_membership_ref01_list_result = $space_group_membership_ref01_ent->list($space_group_membership_ref01_match, null);
        $this->assertIsArray($space_group_membership_ref01_list_result);

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["space01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $space_group_membership_ref01_ent = $client->SpaceGroupMembership(null);
        $space_group_membership_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.space_group_membership"), "space_group_membership_ref01"));
        $space_group_membership_ref01_data["space_id"] = $setup["idmap"]["space01"];

        $space_group_membership_ref01_data_result = $space_group_membership_ref01_ent->create($space_group_membership_ref01_data, null);
        $space_group_membership_ref01_data = Helpers::to_map(is_object($space_group_membership_ref01_data_result) && method_exists($space_group_membership_ref01_data_result, 'data_get') ? $space_group_membership_ref01_data_result->data_get() : $space_group_membership_ref01_data_result);
        $this->assertNotNull($space_group_membership_ref01_data);
        $this->assertNotNull($space_group_membership_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $space_group_membership_ref01_match = [
            "space_id" => $setup["idmap"]["space01"],
        ];

        $space_group_membership_ref01_list_result = $space_group_membership_ref01_ent->list($space_group_membership_ref01_match, null);
        $this->assertIsArray($space_group_membership_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($space_group_membership_ref01_list_result),
            ["id" => $space_group_membership_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $space_group_membership_ref01_data_up0_up = [
            "id" => $space_group_membership_ref01_data["id"],
            "space_id" => $setup["idmap"]["space_id"],
        ];

        $space_group_membership_ref01_resdata_up0_result = $space_group_membership_ref01_ent->update($space_group_membership_ref01_data_up0_up, null);
        $space_group_membership_ref01_resdata_up0 = Helpers::to_map(is_object($space_group_membership_ref01_resdata_up0_result) && method_exists($space_group_membership_ref01_resdata_up0_result, 'data_get') ? $space_group_membership_ref01_resdata_up0_result->data_get() : $space_group_membership_ref01_resdata_up0_result);
        $this->assertNotNull($space_group_membership_ref01_resdata_up0);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($space_group_membership_ref01_resdata_up0["id"] ?? null, $space_group_membership_ref01_data_up0_up["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $space_group_membership_ref01_match_rm0 = [
            "id" => $space_group_membership_ref01_data["id"],
        ];
        $space_group_membership_ref01_match_rm0["space_id"] = $setup["idmap"]["space_id"] ?? $setup["idmap"]["space01"] ?? null;
        $space_group_membership_ref01_ent->remove($space_group_membership_ref01_match_rm0, null);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $space_group_membership_ref01_match_rt0 = [
            "space_id" => $setup["idmap"]["space01"],
        ];

        $space_group_membership_ref01_list_rt0_result = $space_group_membership_ref01_ent->list($space_group_membership_ref01_match_rt0, null);
        $this->assertIsArray($space_group_membership_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($space_group_membership_ref01_list_rt0_result),
            ["id" => $space_group_membership_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function space_group_membership_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/space_group_membership/SpaceGroupMembershipTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["space_group_membership01", "space_group_membership02", "space_group_membership03", "space01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_SPACE_GROUP_MEMBERSHIP_ENTID"]);
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
