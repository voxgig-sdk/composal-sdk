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
(0, node_test_1.describe)('RunnerPoolRunnerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.RunnerPoolRunner();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RunnerPoolRunner().list({ "runner_pool_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'runner_pool_runner.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "runner_pool_runner", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "runner_pool_id", "or": "runner_pool_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat", "q": { "$action": "heartbeat", "exist": ["id", "runner_pool_id"] }, "r": { "param": { "id": "id", "runner_pool_id": "runner_pool_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "runner_pool_id" }, { "lit": "runners" }, { "var": "id" }, { "lit": "heartbeat" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/ci/runner_pools/{runner_pool_id}/runners", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "runner_pool_id", "or": "runner_pool_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/ci/runner_pools/{runner_pool_id}/runners", "q": { "exist": ["runner_pool_id"] }, "r": { "param": { "runner_pool_id": "runner_pool_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "runner_pool_id" }, { "lit": "runners" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/ci/runner_pools/{runner_pool_id}/runners", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "runner_pool_id", "or": "runner_pool_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/ci/runner_pools/{runner_pool_id}/runners", "q": { "exist": ["runner_pool_id"] }, "r": { "param": { "runner_pool_id": "runner_pool_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "runner_pool_id" }, { "lit": "runners" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "runner_pool_id", "or": "runner_pool_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}", "q": { "exist": ["id", "runner_pool_id"] }, "r": { "param": { "id": "id", "runner_pool_id": "runner_pool_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "runner_pool_id" }, { "lit": "runners" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "runner_pool_id", "or": "runner_pool_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}", "q": { "exist": ["id", "runner_pool_id"] }, "r": { "param": { "id": "id", "runner_pool_id": "runner_pool_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "runner_pool_id" }, { "lit": "runners" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "runner_pool_id", "or": "runner_pool_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}", "q": { "exist": ["id", "runner_pool_id"] }, "r": { "param": { "id": "id", "runner_pool_id": "runner_pool_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "runner_pool_id" }, { "lit": "runners" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "runner_pool_runner", "name__orig": "runner_pool_runner", "Name": "RunnerPoolRunner", "name_": "runner_pool_runner", "name-": "runner-pool-runner", "NAME": "RUNNER_POOL_RUNNER", "index$": 456 }, { "active": true, "entity": "runner_pool_runner", "key$": "BasicRunnerPoolRunnerFlow", "kind": "basic", "name": "BasicRunnerPoolRunnerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "runner_pool_runner_ref01" }, "m": { "runner_pool_id": "runner_pool01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "runner_pool_id": "runner_pool01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "runner_pool_runner_ref01" } }], "index$": 1 }, { "a": true, "d": { "runner_pool_id": "runner_pool01" }, "i": { "ref": "runner_pool_runner_ref01", "srcdatavar": "runner_pool_runner_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-runner_pool_runner_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "runner_pool_runner_ref01", "srcdatavar": "runner_pool_runner_ref01_data", "suffix": "_dt0" }, "m": { "id": "runner_pool_runner01", "runner_pool_id": "runner_pool01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-runner_pool_runner_ref01" } }], "index$": 3, "route": "GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}", "record": {} }] }, 'RunnerPoolRunner', { "POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "runner_pool_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/ci/runner_pools/{runner_pool_id}/runners": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "runner_pool_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/ci/runner_pools/{runner_pool_id}/runners": { "protocol": "http", "parameters": [{ "name": "runner_pool_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}": { "protocol": "http", "parameters": [{ "name": "runner_pool_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "runner_pool_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "runner_pool_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "runner_pool_runner.create.0": "GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat", "runner_pool_runner.update.2": "GET-only live run: needs PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const runner_pool_runner_ref01_ent = client.RunnerPoolRunner();
        let runner_pool_runner_ref01_data = setup.data.new.runner_pool_runner['runner_pool_runner_ref01'];
        runner_pool_runner_ref01_data['runner_pool_id'] = setup.idmap['runner_pool01'];
        runner_pool_runner_ref01_data = (await runner_pool_runner_ref01_ent.create(runner_pool_runner_ref01_data)).data();
        (0, node_assert_1.default)(null != runner_pool_runner_ref01_data.id);
        // LIST
        const runner_pool_runner_ref01_match = {};
        runner_pool_runner_ref01_match['runner_pool_id'] = setup.idmap['runner_pool01'];
        const runner_pool_runner_ref01_list = (await runner_pool_runner_ref01_ent.list(runner_pool_runner_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(runner_pool_runner_ref01_list, { id: runner_pool_runner_ref01_data.id })));
        // UPDATE
        const runner_pool_runner_ref01_data_up0 = {};
        runner_pool_runner_ref01_data_up0.id = runner_pool_runner_ref01_data.id;
        runner_pool_runner_ref01_data_up0['runner_pool_id'] = setup.idmap['runner_pool_id'] ?? setup.idmap['runner_pool01'];
        const runner_pool_runner_ref01_resdata_up0 = (await runner_pool_runner_ref01_ent.update(runner_pool_runner_ref01_data_up0)).data();
        (0, node_assert_1.default)(runner_pool_runner_ref01_resdata_up0.id === runner_pool_runner_ref01_data_up0.id);
        // LOAD
        const runner_pool_runner_ref01_match_dt0 = {};
        runner_pool_runner_ref01_match_dt0.id = runner_pool_runner_ref01_data.id;
        runner_pool_runner_ref01_match_dt0['runner_pool_id'] = setup.idmap['runner_pool_id'] ?? setup.idmap['runner_pool01'];
        const runner_pool_runner_ref01_data_dt0 = (await runner_pool_runner_ref01_ent.load(runner_pool_runner_ref01_match_dt0)).data();
        (0, node_assert_1.default)(runner_pool_runner_ref01_data_dt0.id === runner_pool_runner_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/runner_pool_runner/RunnerPoolRunnerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['runner_pool_runner01', 'runner_pool_runner02', 'runner_pool_runner03', 'runner_pool01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID'];
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
//# sourceMappingURL=RunnerPoolRunnerEntity.test.js.map