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
(0, node_test_1.describe)('CdnDeploymentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.CdnDeployment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CdnDeployment().list({ "app_id": 1, "cdn_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cdn_deployment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "cdn_deployment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "cdn_id", "or": "cdn_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments", "q": { "exist": ["app_id", "cdn_id"] }, "r": { "param": { "app_id": "app_id", "cdn_id": "cdn_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "cdns" }, { "var": "cdn_id" }, { "lit": "deployments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "cdn_id", "or": "cdn_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments", "q": { "exist": ["app_id", "cdn_id"] }, "r": { "param": { "app_id": "app_id", "cdn_id": "cdn_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "cdns" }, { "var": "cdn_id" }, { "lit": "deployments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "cdn_id", "or": "cdn_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}", "q": { "exist": ["app_id", "cdn_id", "id"] }, "r": { "param": { "app_id": "app_id", "cdn_id": "cdn_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "cdns" }, { "var": "cdn_id" }, { "lit": "deployments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "cdn_deployment", "name__orig": "cdn_deployment", "Name": "CdnDeployment", "name_": "cdn_deployment", "name-": "cdn-deployment", "NAME": "CDN_DEPLOYMENT", "index$": 148 }, { "active": true, "entity": "cdn_deployment", "key$": "BasicCdnDeploymentFlow", "kind": "basic", "name": "BasicCdnDeploymentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "cdn_deployment_ref01" }, "m": { "app_id": "app01", "cdn_id": "cdn01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "app_id": "app01", "cdn_id": "cdn01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "cdn_deployment_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "cdn_deployment_ref01", "srcdatavar": "cdn_deployment_ref01_data", "suffix": "_dt0" }, "m": { "app_id": "app01", "cdn_id": "cdn01", "id": "cdn_deployment01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-cdn_deployment_ref01" } }], "index$": 2, "route": "GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}", "record": {} }] }, 'CdnDeployment', { "POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cdn_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cdn_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cdn_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "cdn_deployment.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const cdn_deployment_ref01_ent = client.CdnDeployment();
        let cdn_deployment_ref01_data = setup.data.new.cdn_deployment['cdn_deployment_ref01'];
        cdn_deployment_ref01_data['app_id'] = setup.idmap['app01'];
        cdn_deployment_ref01_data['cdn_id'] = setup.idmap['cdn01'];
        cdn_deployment_ref01_data = (await cdn_deployment_ref01_ent.create(cdn_deployment_ref01_data)).data();
        (0, node_assert_1.default)(null != cdn_deployment_ref01_data.id);
        // LIST
        const cdn_deployment_ref01_match = {};
        cdn_deployment_ref01_match['app_id'] = setup.idmap['app01'];
        cdn_deployment_ref01_match['cdn_id'] = setup.idmap['cdn01'];
        const cdn_deployment_ref01_list = (await cdn_deployment_ref01_ent.list(cdn_deployment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(cdn_deployment_ref01_list, { id: cdn_deployment_ref01_data.id })));
        // LOAD
        const cdn_deployment_ref01_match_dt0 = {};
        cdn_deployment_ref01_match_dt0.id = cdn_deployment_ref01_data.id;
        cdn_deployment_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        cdn_deployment_ref01_match_dt0['cdn_id'] = setup.idmap['cdn_id'] ?? setup.idmap['cdn01'];
        const cdn_deployment_ref01_data_dt0 = (await cdn_deployment_ref01_ent.load(cdn_deployment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(cdn_deployment_ref01_data_dt0.id === cdn_deployment_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cdn_deployment/CdnDeploymentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cdn_deployment01', 'cdn_deployment02', 'cdn_deployment03', 'app01', 'app02', 'app03', 'cdn01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID'];
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
//# sourceMappingURL=CdnDeploymentEntity.test.js.map