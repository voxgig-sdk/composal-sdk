<?php
declare(strict_types=1);

// ArtifactCacheNamespace entity test

require_once __DIR__ . '/../composal_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ArtifactCacheNamespaceEntityTestFailHook extends ComposalBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(ComposalContext $ctx, array $options): void
    {
    }

    public function PreSpec(ComposalContext $ctx): void
    {
        throw new \RuntimeException('artifact_cache_namespace hook failed');
    }

    public function PreUnexpected(ComposalContext $ctx): void
    {
        $this->unexpected++;
    }
}

class ArtifactCacheNamespaceEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = ComposalSDK::test(null, null);
        $ent = $testsdk->ArtifactCacheNamespace(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "artifact_cache_namespace" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = ComposalSDK::test($seed, null);
        $seen = iterator_to_array($base->ArtifactCacheNamespace(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = ComposalConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = ComposalSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->ArtifactCacheNamespace(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(ComposalSDK::test($offline, null)->ArtifactCacheNamespace(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(ComposalSDK::test($offline, null)->ArtifactCacheNamespace(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = ComposalConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = ComposalSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->ArtifactCacheNamespace(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(ComposalSDK::test(null, null)->ArtifactCacheNamespace(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new ArtifactCacheNamespaceEntityTestFailHook();
        $client = new ComposalSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->ArtifactCacheNamespace(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->ArtifactCacheNamespace(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = ComposalConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new ComposalSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('artifact_cache_namespace transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->ArtifactCacheNamespace(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(ComposalError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->ArtifactCacheNamespace(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate_list_response(): void
    {
        $cfg = ComposalConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $opts = ["feature" => ["validate" => ["active" => true, "request" => false, "response" => true]]];
        $listed = ComposalSDK::test(['entity' => ['artifact_cache_namespace' => ['v1' => []]]], $opts)->ArtifactCacheNamespace(null)->list(null, null);
        $this->assertSame(['v1'], array_map(fn($ent) => $ent->data_get()['id'] ?? null, $listed));
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
            $client->ArtifactCacheNamespace(null)->list(["id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = artifact_cache_namespace_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "artifact_cache_namespace." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"artifact_cache_namespace.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{id}/archive"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"artifact_cache_namespace.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"artifact_cache_namespace.remove.4","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"artifact_cache_namespace.list.5","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            $_liveId = empty($setup["synthetic_only"]) ? ($setup["idmap"]["artifact_cache_namespace01"] ?? null) : null;
            Runner::live_pace();
            Runner::live_existing($setup, self::LIVE_STRICT, "artifact_cache_namespace",
                fn() => $client->ArtifactCacheNamespace(null)->list([], null), "id", $_liveId);
        }

        // Bootstrap entity data from existing test data.
        $artifact_cache_namespace_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.artifact_cache_namespace")));
        $artifact_cache_namespace_ref01_data = null;
        if (count($artifact_cache_namespace_ref01_data_raw) > 0) {
            $artifact_cache_namespace_ref01_data = Helpers::to_map($artifact_cache_namespace_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $artifact_cache_namespace_ref01_ent = $client->ArtifactCacheNamespace(null);
        $artifact_cache_namespace_ref01_match = [];

        $artifact_cache_namespace_ref01_list_result = $artifact_cache_namespace_ref01_ent->list($artifact_cache_namespace_ref01_match, null);
        $this->assertIsArray($artifact_cache_namespace_ref01_list_result);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $artifact_cache_namespace_ref01_match_dt0 = [
            "id" => $artifact_cache_namespace_ref01_data["id"],
        ];
        $artifact_cache_namespace_ref01_data_dt0_loaded = $artifact_cache_namespace_ref01_ent->load($artifact_cache_namespace_ref01_match_dt0, null);
        $artifact_cache_namespace_ref01_data_dt0_load_result = Helpers::to_map(is_object($artifact_cache_namespace_ref01_data_dt0_loaded) && method_exists($artifact_cache_namespace_ref01_data_dt0_loaded, 'data_get') ? $artifact_cache_namespace_ref01_data_dt0_loaded->data_get() : $artifact_cache_namespace_ref01_data_dt0_loaded);
        $this->assertNotNull($artifact_cache_namespace_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($artifact_cache_namespace_ref01_data_dt0_load_result["id"] ?? null, $artifact_cache_namespace_ref01_data["id"]));
        }

            return;
        }

        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $artifact_cache_namespace_ref01_ent = $client->ArtifactCacheNamespace(null);
        $artifact_cache_namespace_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.artifact_cache_namespace"), "artifact_cache_namespace_ref01"));

        $artifact_cache_namespace_ref01_data_result = $artifact_cache_namespace_ref01_ent->create($artifact_cache_namespace_ref01_data, null);
        $artifact_cache_namespace_ref01_data = Helpers::to_map(is_object($artifact_cache_namespace_ref01_data_result) && method_exists($artifact_cache_namespace_ref01_data_result, 'data_get') ? $artifact_cache_namespace_ref01_data_result->data_get() : $artifact_cache_namespace_ref01_data_result);
        $this->assertNotNull($artifact_cache_namespace_ref01_data);
        $this->assertNotNull($artifact_cache_namespace_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $artifact_cache_namespace_ref01_match = [];

        $artifact_cache_namespace_ref01_list_result = $artifact_cache_namespace_ref01_ent->list($artifact_cache_namespace_ref01_match, null);
        $this->assertIsArray($artifact_cache_namespace_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($artifact_cache_namespace_ref01_list_result),
            ["id" => $artifact_cache_namespace_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $artifact_cache_namespace_ref01_data_up0_up = [
            "id" => $artifact_cache_namespace_ref01_data["id"],
        ];

        $artifact_cache_namespace_ref01_resdata_up0_result = $artifact_cache_namespace_ref01_ent->update($artifact_cache_namespace_ref01_data_up0_up, null);
        $artifact_cache_namespace_ref01_resdata_up0 = Helpers::to_map(is_object($artifact_cache_namespace_ref01_resdata_up0_result) && method_exists($artifact_cache_namespace_ref01_resdata_up0_result, 'data_get') ? $artifact_cache_namespace_ref01_resdata_up0_result->data_get() : $artifact_cache_namespace_ref01_resdata_up0_result);
        $this->assertNotNull($artifact_cache_namespace_ref01_resdata_up0);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($artifact_cache_namespace_ref01_resdata_up0["id"] ?? null, $artifact_cache_namespace_ref01_data_up0_up["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $artifact_cache_namespace_ref01_match_dt0 = [
            "id" => $artifact_cache_namespace_ref01_data["id"],
        ];
        $artifact_cache_namespace_ref01_data_dt0_loaded = $artifact_cache_namespace_ref01_ent->load($artifact_cache_namespace_ref01_match_dt0, null);
        $artifact_cache_namespace_ref01_data_dt0_load_result = Helpers::to_map(is_object($artifact_cache_namespace_ref01_data_dt0_loaded) && method_exists($artifact_cache_namespace_ref01_data_dt0_loaded, 'data_get') ? $artifact_cache_namespace_ref01_data_dt0_loaded->data_get() : $artifact_cache_namespace_ref01_data_dt0_loaded);
        $this->assertNotNull($artifact_cache_namespace_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($artifact_cache_namespace_ref01_data_dt0_load_result["id"] ?? null, $artifact_cache_namespace_ref01_data["id"]));
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $artifact_cache_namespace_ref01_match_rm0 = [
            "id" => $artifact_cache_namespace_ref01_data["id"],
        ];
        $artifact_cache_namespace_ref01_ent->remove($artifact_cache_namespace_ref01_match_rm0, null);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $artifact_cache_namespace_ref01_match_rt0 = [];

        $artifact_cache_namespace_ref01_list_rt0_result = $artifact_cache_namespace_ref01_ent->list($artifact_cache_namespace_ref01_match_rt0, null);
        $this->assertIsArray($artifact_cache_namespace_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($artifact_cache_namespace_ref01_list_rt0_result),
            ["id" => $artifact_cache_namespace_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function artifact_cache_namespace_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/artifact_cache_namespace/ArtifactCacheNamespaceTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ComposalSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["artifact_cache_namespace01", "artifact_cache_namespace02", "artifact_cache_namespace03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("COMPOSAL_TEST_ARTIFACT_CACHE_NAMESPACE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "COMPOSAL_TEST_ARTIFACT_CACHE_NAMESPACE_ENTID" => $idmap,
        "COMPOSAL_TEST_LIVE" => "FALSE",
        "COMPOSAL_TEST_EXPLAIN" => "FALSE",
        "COMPOSAL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["COMPOSAL_TEST_ARTIFACT_CACHE_NAMESPACE_ENTID"]);
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
