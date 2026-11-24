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
(0, node_test_1.describe)('RoderCodeRepairEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.RoderCodeRepair();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('roder_code_repair hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.ComposalSDK.test(offline).RoderCodeRepair().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.ComposalSDK.test(offline).RoderCodeRepair()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.RoderCodeRepair().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.ComposalSDK.test().RoderCodeRepair().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.ComposalSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.RoderCodeRepair().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.RoderCodeRepair().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RoderCodeRepair().list({ "scenario_run_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'roder_code_repair.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "base_sha": { "a": true, "h": "Base Sha", "n": "base_sha", "r": true, "t": "`$STRING`", "key$": "base_sha", "index$": 0 }, "cancel_requested": { "a": true, "h": "Cancel Requested", "n": "cancel_requested", "r": true, "t": "`$BOOLEAN`", "key$": "cancel_requested", "index$": 1 }, "failure_code": { "a": true, "h": "Failure Code", "n": "failure_code", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_code", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "launch_state": { "a": true, "h": "Launch State", "n": "launch_state", "r": true, "t": "`$STRING`", "key$": "launch_state", "index$": 4 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 5 }, "repository_slug": { "a": true, "h": "Repository Slug", "n": "repository_slug", "r": true, "t": "`$STRING`", "key$": "repository_slug", "index$": 6 }, "roder_thread_id": { "a": true, "h": "Roder Thread Id", "n": "roder_thread_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "roder_thread_id", "index$": 7 }, "roder_turn_id": { "a": true, "h": "Roder Turn Id", "n": "roder_turn_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "roder_turn_id", "index$": 8 }, "scenario_run_id": { "a": true, "h": "Scenario Run Id", "n": "scenario_run_id", "r": true, "t": "`$STRING`", "key$": "scenario_run_id", "index$": 9 }, "task": { "a": true, "h": "Task", "n": "task", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "task", "index$": 10 }, "trigger_kind": { "a": true, "h": "Trigger Kind", "n": "trigger_kind", "r": true, "t": "`$STRING`", "key$": "trigger_kind", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "roder_code_repair", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/agent/roder/code_repairs/{id}/cancel", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/agent/roder/code_repairs/{id}/cancel", "q": { "$action": "cancel", "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "agent" }, { "lit": "roder" }, { "lit": "code_repairs" }, { "var": "id" }, { "lit": "cancel" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["base_sha", "organization_id", "repository_slug", "scenario_run_id"], "co": { "id": "POST /api/v1/agent/roder/code_repairs", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/agent/roder/code_repairs", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "agent" }, { "lit": "roder" }, { "lit": "code_repairs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/agent/roder/code_repairs", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "scenario_run_id", "or": "scenario_run_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/agent/roder/code_repairs", "q": { "exist": ["scenario_run_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "agent" }, { "lit": "roder" }, { "lit": "code_repairs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/agent/roder/code_repairs/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/agent/roder/code_repairs/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "agent" }, { "lit": "roder" }, { "lit": "code_repairs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "roder_code_repair", "name__orig": "roder_code_repair", "Name": "RoderCodeRepair", "name_": "roder_code_repair", "name-": "roder-code-repair", "NAME": "RODER_CODE_REPAIR", "index$": 442 }, { "active": true, "entity": "roder_code_repair", "key$": "BasicRoderCodeRepairFlow", "kind": "basic", "name": "BasicRoderCodeRepairFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "roder_code_repair_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "roder_code_repair_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "roder_code_repair_ref01", "srcdatavar": "roder_code_repair_ref01_data", "suffix": "_dt0" }, "m": { "id": "roder_code_repair01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-roder_code_repair_ref01" } }], "index$": 2, "route": "GET /api/v1/agent/roder/code_repairs/{id}", "record": {} }] }, 'RoderCodeRepair', { "POST /api/v1/agent/roder/code_repairs/{id}/cancel": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/agent/roder/code_repairs": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["organization_id", "scenario_run_id", "repository_slug", "base_sha"], "properties": { "organization_id": { "type": "string", "key$": "organization_id" }, "scenario_run_id": { "type": "string", "key$": "scenario_run_id" }, "repository_slug": { "type": "string", "key$": "repository_slug" }, "base_sha": { "type": "string", "pattern": "^[0-9a-f]{40}$", "key$": "base_sha" } } } } } }, "parameters": [] }, "GET /api/v1/agent/roder/code_repairs": { "protocol": "http", "parameters": [{ "in": "query", "name": "scenario_run_id", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/agent/roder/code_repairs/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "roder_code_repair.create.0": "GET-only live run: needs POST /api/v1/agent/roder/code_repairs/{id}/cancel" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const roder_code_repair_ref01_ent = client.RoderCodeRepair();
        let roder_code_repair_ref01_data = setup.data.new.roder_code_repair['roder_code_repair_ref01'];
        roder_code_repair_ref01_data = (await roder_code_repair_ref01_ent.create(roder_code_repair_ref01_data)).data();
        (0, node_assert_1.default)(null != roder_code_repair_ref01_data.id);
        // LIST
        const roder_code_repair_ref01_match = {};
        const roder_code_repair_ref01_list = (await roder_code_repair_ref01_ent.list(roder_code_repair_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(roder_code_repair_ref01_list, { id: roder_code_repair_ref01_data.id })));
        // LOAD
        const roder_code_repair_ref01_match_dt0 = {};
        roder_code_repair_ref01_match_dt0.id = roder_code_repair_ref01_data.id;
        const roder_code_repair_ref01_data_dt0 = (await roder_code_repair_ref01_ent.load(roder_code_repair_ref01_match_dt0)).data();
        (0, node_assert_1.default)(roder_code_repair_ref01_data_dt0.id === roder_code_repair_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/roder_code_repair/RoderCodeRepairTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['roder_code_repair01', 'roder_code_repair02', 'roder_code_repair03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID'];
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
//# sourceMappingURL=RoderCodeRepairEntity.test.js.map