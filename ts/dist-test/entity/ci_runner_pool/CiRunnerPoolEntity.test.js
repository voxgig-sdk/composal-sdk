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
(0, node_test_1.describe)('CiRunnerPoolEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.CiRunnerPool();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('ci_runner_pool hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.ComposalSDK.test(offline).CiRunnerPool().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.ComposalSDK.test(offline).CiRunnerPool()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.CiRunnerPool().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.ComposalSDK.test().CiRunnerPool().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.ComposalSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.CiRunnerPool().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.CiRunnerPool().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CiRunnerPool().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ci_runner_pool.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "bazel_enabled": { "a": true, "h": "Bazel Enabled", "n": "bazel_enabled", "r": true, "t": "`$BOOLEAN`", "key$": "bazel_enabled", "index$": 0 }, "bazel_properties_json": { "a": true, "h": "Bazel Properties Json", "n": "bazel_properties_json", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "bazel_properties_json", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "op": { "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "description", "index$": 3 }, "elastic_config_json": { "a": true, "h": "Elastic Config Json", "n": "elastic_config_json", "op": { "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "elastic_config_json", "index$": 4 }, "elastic_provider_kind": { "a": true, "h": "Elastic Provider Kind", "n": "elastic_provider_kind", "op": { "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "elastic_provider_kind", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "isolation_mode": { "a": true, "h": "Isolation Mode", "n": "isolation_mode", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "isolation_mode", "index$": 7 }, "labels_csv": { "a": true, "h": "Labels Csv", "n": "labels_csv", "op": { "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "labels_csv", "index$": 8 }, "max_concurrency": { "a": true, "h": "Max Concurrency", "n": "max_concurrency", "op": { "patch": { "req": false, "type": "`$INTEGER`" } }, "r": true, "t": "`$INTEGER`", "key$": "max_concurrency", "index$": 9 }, "modal_capacity": { "a": true, "h": "Modal Capacity", "n": "modal_capacity", "r": true, "t": "`$OBJECT`", "key$": "modal_capacity", "index$": 10 }, "modal_runner_invocations": { "a": true, "h": "Modal Runner Invocations", "n": "modal_runner_invocations", "r": true, "t": "`$ARRAY`", "key$": "modal_runner_invocations", "index$": 11 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 12 }, "network_space_id": { "a": true, "h": "Network Space Id", "n": "network_space_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "network_space_id", "index$": 13 }, "node_capabilities_csv": { "a": true, "h": "Node Capabilities Csv", "n": "node_capabilities_csv", "op": { "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "node_capabilities_csv", "index$": 14 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 15 }, "runner_count_label": { "a": true, "h": "Runner Count Label", "n": "runner_count_label", "r": true, "t": "`$STRING`", "key$": "runner_count_label", "index$": 16 }, "runner_kind": { "a": true, "h": "Runner Kind", "n": "runner_kind", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "runner_kind", "index$": 17 }, "runners": { "a": true, "h": "Runners", "n": "runners", "r": true, "t": "`$ARRAY`", "key$": "runners", "index$": 18 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 19 }, "status": { "a": true, "h": "Status", "n": "status", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "status", "index$": 20 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 21 } }, "id": { "field": "id", "name": "id" }, "name": "ci_runner_pool", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["expected_image_version", "image_version"], "co": { "id": "POST /api/v1/ci/runner_pools/{id}/promote_reconciliation_runtime", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/ci/runner_pools/{id}/promote_reconciliation_runtime", "q": { "$action": "promote_reconciliation_runtime", "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "id" }, { "lit": "promote_reconciliation_runtime" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/ci/runner_pools", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/ci/runner_pools", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/ci/runner_pools", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "organization_id", "or": "organization_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/ci/runner_pools", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }], "t": { "req": "`reqdata`", "res": "`body.runner_pools`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/ci/runner_pools/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/ci/runner_pools/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.runner_pool`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["description", "elastic_config_json", "elastic_provider_kind", "isolation_mode", "labels_csv", "max_concurrency", "node_capabilities_csv", "runner_kind", "status"], "co": { "id": "PATCH /api/v1/ci/runner_pools/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/ci/runner_pools/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.runner_pool`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/ci/runner_pools/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/ci/runner_pools/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "runner_pools" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "ci_runner_pool", "name__orig": "ci_runner_pool", "Name": "CiRunnerPool", "name_": "ci_runner_pool", "name-": "ci-runner-pool", "NAME": "CI_RUNNER_POOL", "index$": 175 }, { "active": true, "entity": "ci_runner_pool", "key$": "BasicCiRunnerPoolFlow", "kind": "basic", "name": "BasicCiRunnerPoolFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "ci_runner_pool_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "ci_runner_pool_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "ci_runner_pool_ref01", "srcdatavar": "ci_runner_pool_ref01_data", "suffix": "_up0", "textfield": "bazel_properties_json" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ci_runner_pool_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "ci_runner_pool_ref01", "srcdatavar": "ci_runner_pool_ref01_data", "suffix": "_dt0" }, "m": { "id": "ci_runner_pool01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ci_runner_pool_ref01" } }], "index$": 3, "route": "GET /api/v1/ci/runner_pools/{id}", "record": {} }] }, 'CiRunnerPool', { "POST /api/v1/ci/runner_pools/{id}/promote_reconciliation_runtime": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_image_version", "image_version"], "properties": { "expected_image_version": { "type": "string" }, "image_version": { "type": "string" } } } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/ci/runner_pools": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [] }, "GET /api/v1/ci/runner_pools": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/ci/runner_pools/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/ci/runner_pools/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "status": { "type": "string", "key$": "status" }, "runner_kind": { "type": "string", "key$": "runner_kind" }, "isolation_mode": { "type": "string", "key$": "isolation_mode" }, "description": { "type": "string", "nullable": true, "key$": "description" }, "max_concurrency": { "type": "integer", "key$": "max_concurrency" }, "labels_csv": { "type": "string", "nullable": true, "key$": "labels_csv" }, "node_capabilities_csv": { "type": "string", "nullable": true, "key$": "node_capabilities_csv" }, "elastic_provider_kind": { "type": "string", "nullable": true, "key$": "elastic_provider_kind" }, "elastic_config_json": { "type": "string", "nullable": true, "key$": "elastic_config_json" } } } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/ci/runner_pools/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "ci_runner_pool.create.0": "GET-only live run: needs POST /api/v1/ci/runner_pools/{id}/promote_reconciliation_runtime", "ci_runner_pool.update.2": "GET-only live run: needs PUT /api/v1/ci/runner_pools/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ci_runner_pool_ref01_ent = client.CiRunnerPool();
        let ci_runner_pool_ref01_data = setup.data.new.ci_runner_pool['ci_runner_pool_ref01'];
        ci_runner_pool_ref01_data = (await ci_runner_pool_ref01_ent.create(ci_runner_pool_ref01_data)).data();
        (0, node_assert_1.default)(null != ci_runner_pool_ref01_data.id);
        // LIST
        const ci_runner_pool_ref01_match = {};
        const ci_runner_pool_ref01_list = (await ci_runner_pool_ref01_ent.list(ci_runner_pool_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(ci_runner_pool_ref01_list, { id: ci_runner_pool_ref01_data.id })));
        // UPDATE
        const ci_runner_pool_ref01_data_up0 = {};
        ci_runner_pool_ref01_data_up0.id = ci_runner_pool_ref01_data.id;
        const ci_runner_pool_ref01_markdef_up0 = { name: 'bazel_properties_json', value: 'Mark01-ci_runner_pool_ref01_' + setup.now };
        ci_runner_pool_ref01_data_up0[ci_runner_pool_ref01_markdef_up0.name] = ci_runner_pool_ref01_markdef_up0.value;
        const ci_runner_pool_ref01_resdata_up0 = (await ci_runner_pool_ref01_ent.update(ci_runner_pool_ref01_data_up0)).data();
        (0, node_assert_1.default)(ci_runner_pool_ref01_resdata_up0.id === ci_runner_pool_ref01_data_up0.id);
        (0, node_assert_1.default)(ci_runner_pool_ref01_resdata_up0[ci_runner_pool_ref01_markdef_up0.name] === ci_runner_pool_ref01_markdef_up0.value);
        // LOAD
        const ci_runner_pool_ref01_match_dt0 = {};
        ci_runner_pool_ref01_match_dt0.id = ci_runner_pool_ref01_data.id;
        const ci_runner_pool_ref01_data_dt0 = (await ci_runner_pool_ref01_ent.load(ci_runner_pool_ref01_match_dt0)).data();
        (0, node_assert_1.default)(ci_runner_pool_ref01_data_dt0.id === ci_runner_pool_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ci_runner_pool/CiRunnerPoolTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ci_runner_pool01', 'ci_runner_pool02', 'ci_runner_pool03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CI_RUNNER_POOL_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CI_RUNNER_POOL_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CI_RUNNER_POOL_ENTID'];
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
//# sourceMappingURL=CiRunnerPoolEntity.test.js.map