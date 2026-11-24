"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('JourneyVariantReplayEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.JourneyVariantReplay();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.JourneyVariantReplay().create({ "journey_variant_id": 1, "organization_id": "x", "project_id": "x", "idempotency_key": "x", "review_reason": "x", "scenario_file": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'journey_variant_replay.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "actor_id": { "a": true, "h": "Actor Id", "n": "actor_id", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "actor_id", "index$": 0 }, "can_request_qualification": { "a": true, "h": "Can Request Qualification", "n": "can_request_qualification", "r": true, "t": "`$BOOLEAN`", "key$": "can_request_qualification", "index$": 1 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "failure_code": { "a": true, "h": "Failure Code", "n": "failure_code", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_code", "index$": 3 }, "failure_message": { "a": true, "h": "Failure Message", "n": "failure_message", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_message", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "idempotency_key": { "a": true, "h": "Idempotency Key", "n": "idempotency_key", "r": true, "t": "`$STRING`", "key$": "idempotency_key", "index$": 6 }, "max_seconds": { "a": true, "h": "Max Seconds", "n": "max_seconds", "r": false, "t": "`$INTEGER`", "key$": "max_seconds", "index$": 7 }, "preparation_receipt": { "a": true, "h": "Preparation Receipt", "n": "preparation_receipt", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "preparation_receipt", "index$": 8 }, "qualification": { "a": true, "h": "Qualification", "n": "qualification", "r": true, "t": "`$ANY`", "key$": "qualification", "index$": 9 }, "qualification_status": { "a": true, "h": "Qualification Status", "n": "qualification_status", "r": true, "t": "`$STRING`", "key$": "qualification_status", "index$": 10 }, "replay_required": { "a": true, "h": "Replay Required", "n": "replay_required", "r": true, "t": "`$BOOLEAN`", "key$": "replay_required", "index$": 11 }, "review_reason": { "a": true, "h": "Review Reason", "n": "review_reason", "r": true, "t": "`$STRING`", "key$": "review_reason", "index$": 12 }, "run_id": { "a": true, "h": "Run Id", "n": "run_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "run_id", "index$": 13 }, "scenario_file": { "a": true, "h": "Scenario File", "n": "scenario_file", "r": true, "t": "`$OBJECT`", "key$": "scenario_file", "index$": 14 }, "scenario_run_id": { "a": true, "h": "Scenario Run Id", "n": "scenario_run_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "scenario_run_id", "index$": 15 }, "source_digest": { "a": true, "h": "Source Digest", "n": "source_digest", "r": true, "t": "`$STRING`", "key$": "source_digest", "index$": 16 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 17 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 18 }, "variant_id": { "a": true, "h": "Variant Id", "n": "variant_id", "r": true, "t": "`$STRING`", "key$": "variant_id", "index$": 19 } }, "id": { "field": "id", "name": "id" }, "name": "journey_variant_replay", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["actor_id", "idempotency_key", "max_seconds", "review_reason", "scenario_file"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_variants/{variant_id}/replays", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "journey_variant_id", "or": "variant_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_variants/{variant_id}/replays", "q": { "exist": ["journey_variant_id", "organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id", "variant_id": "journey_variant_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "journey_variants" }, { "var": "journey_variant_id" }, { "lit": "replays" }], "t": { "req": { "actor_id": "`reqdata.actor_id`", "idempotency_key": "`reqdata.idempotency_key`", "max_seconds": "`reqdata.max_second`", "review_reason": "`reqdata.review_reason`", "scenario_file": "`reqdata.scenario_file`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "journey_variant_replay", "name__orig": "journey_variant_replay", "Name": "JourneyVariantReplay", "name_": "journey_variant_replay", "name-": "journey-variant-replay", "NAME": "JOURNEY_VARIANT_REPLAY", "index$": 289 }, { "active": true, "entity": "journey_variant_replay", "key$": "BasicJourneyVariantReplayFlow", "kind": "basic", "name": "BasicJourneyVariantReplayFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "journey_variant_replay_ref01" }, "m": { "journey_variant_id": "journey_variant01", "organization_id": "organization01", "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'JourneyVariantReplay', { "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_variants/{variant_id}/replays": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["scenario_file", "review_reason", "idempotency_key"], "properties": { "scenario_file": { "type": "object", "additionalProperties": true, "key$": "scenario_file" }, "review_reason": { "type": "string", "minLength": 1, "maxLength": 1000, "key$": "review_reason" }, "idempotency_key": { "type": "string", "minLength": 1, "maxLength": 128, "key$": "idempotency_key" }, "actor_id": { "type": "string", "pattern": "^[a-z][a-z0-9_]{0,39}$", "key$": "actor_id" }, "max_seconds": { "type": "integer", "minimum": 60, "maximum": 7200, "default": 600, "key$": "max_seconds" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "variant_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "journey_variant_replay.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_variants/{variant_id}/replays" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const journey_variant_replay_ref01_ent = client.JourneyVariantReplay();
        let journey_variant_replay_ref01_data = setup.data.new.journey_variant_replay['journey_variant_replay_ref01'];
        journey_variant_replay_ref01_data['journey_variant_id'] = setup.idmap['journey_variant01'];
        journey_variant_replay_ref01_data['organization_id'] = setup.idmap['organization01'];
        journey_variant_replay_ref01_data['project_id'] = setup.idmap['project01'];
        journey_variant_replay_ref01_data = (await journey_variant_replay_ref01_ent.create(journey_variant_replay_ref01_data)).data();
        (0, node_assert_1.default)(null != journey_variant_replay_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/journey_variant_replay/JourneyVariantReplayTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['journey_variant_replay01', 'journey_variant_replay02', 'journey_variant_replay03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03', 'journey_variant01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_JOURNEY_VARIANT_REPLAY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_JOURNEY_VARIANT_REPLAY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_JOURNEY_VARIANT_REPLAY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ComposalSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.COMPOSAL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.COMPOSAL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=JourneyVariantReplayEntity.test.js.map