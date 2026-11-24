<?php
declare(strict_types=1);

// AttachmentPart entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AttachmentPartEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->AttachmentPart(null);
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
            $client->AttachmentPart(null)->update(["agent_id" => 1, "attachment_id" => 'x', "id" => 'x', "organization_id" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = attachment_part_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "attachment_part." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"attachment_part.update.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index}"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: attachment_part.update.0 excluded (GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/parts/{index})');
        }

        if (!empty($setup["live"])) {
            foreach (["agent01", "attachment01", "organization01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via COMPOSAL_TEST_ATTACHMENT_PART_ENTID");
                }
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: " . "the flow updates a attachment_part record it did not create");
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $attachment_part_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.attachment_part")));
        $attachment_part_ref01_data = null;
        if (count($attachment_part_ref01_data_raw) > 0) {
            $attachment_part_ref01_data = Helpers::to_map($attachment_part_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $attachment_part_ref01_ent = $client->AttachmentPart(null);
        $attachment_part_ref01_data_up0_up = [
            "id" => $attachment_part_ref01_data["id"],
            "agent_id" => $setup["idmap"]["agent_id"],
            "attachment_id" => $setup["idmap"]["attachment_id"],
            "organization_id" => $setup["idmap"]["organization_id"],
        ];

        $attachment_part_ref01_resdata_up0_result = $attachment_part_ref01_ent->update($attachment_part_ref01_data_up0_up, null);
        $attachment_part_ref01_resdata_up0 = Helpers::to_map(is_object($attachment_part_ref01_resdata_up0_result) && method_exists($attachment_part_ref01_resdata_up0_result, 'data_get') ? $attachment_part_ref01_resdata_up0_result->data_get() : $attachment_part_ref01_resdata_up0_result);
        $this->assertNotNull($attachment_part_ref01_resdata_up0);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($attachment_part_ref01_resdata_up0["id"] ?? null, $attachment_part_ref01_data_up0_up["id"]));
        }

    }
}

function attachment_part_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/attachment_part/AttachmentPartTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["attachment_part01", "attachment_part02", "attachment_part03", "organization01", "organization02", "organization03", "agent01", "agent02", "agent03", "attachment01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_ATTACHMENT_PART_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_ATTACHMENT_PART_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_ATTACHMENT_PART_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }
    if (!isset($idmap_resolved["agent_id"])) {
        $idmap_resolved["agent_id"] = $idmap_resolved["agent01"];
    }
    if (!isset($idmap_resolved["attachment_id"])) {
        $idmap_resolved["attachment_id"] = $idmap_resolved["attachment01"];
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
