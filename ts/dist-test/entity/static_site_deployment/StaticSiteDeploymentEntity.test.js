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
(0, node_test_1.describe)('StaticSiteDeploymentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.StaticSiteDeployment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.StaticSiteDeployment().list({ "static_site_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'static_site_deployment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "activated_at": { "a": true, "fo": "date-time", "h": "Activated At", "n": "activated_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "activated_at", "index$": 0 }, "activated_at_label": { "a": true, "h": "Activated At Label", "n": "activated_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "activated_at_label", "index$": 1 }, "commit_sha": { "a": true, "h": "Commit Sha", "n": "commit_sha", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "commit_sha", "index$": 2 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 3 }, "created_at_label": { "a": true, "h": "Created At Label", "n": "created_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at_label", "index$": 4 }, "creator_user_id": { "a": true, "h": "Creator User Id", "n": "creator_user_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "creator_user_id", "index$": 5 }, "deploy_slug": { "a": true, "h": "Deploy Slug", "n": "deploy_slug", "r": true, "t": "`$STRING`", "key$": "deploy_slug", "index$": 6 }, "failure_message": { "a": true, "h": "Failure Message", "n": "failure_message", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_message", "index$": 7 }, "file_count": { "a": true, "h": "File Count", "n": "file_count", "r": true, "t": "`$INTEGER`", "key$": "file_count", "index$": 8 }, "file_count_label": { "a": true, "h": "File Count Label", "n": "file_count_label", "r": true, "t": "`$STRING`", "key$": "file_count_label", "index$": 9 }, "finished_at": { "a": true, "fo": "date-time", "h": "Finished At", "n": "finished_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "finished_at", "index$": 10 }, "finished_at_label": { "a": true, "h": "Finished At Label", "n": "finished_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "finished_at_label", "index$": 11 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 12 }, "is_active": { "a": true, "h": "Is Active", "n": "is_active", "r": true, "t": "`$BOOLEAN`", "key$": "is_active", "index$": 13 }, "source_ref": { "a": true, "h": "Source Ref", "n": "source_ref", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_ref", "index$": 14 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "started_at", "index$": 15 }, "started_at_label": { "a": true, "h": "Started At Label", "n": "started_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "started_at_label", "index$": 16 }, "static_site_id": { "a": true, "h": "Static Site Id", "n": "static_site_id", "r": true, "t": "`$STRING`", "key$": "static_site_id", "index$": 17 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 18 }, "total_bytes": { "a": true, "h": "Total Bytes", "n": "total_bytes", "r": true, "t": "`$INTEGER`", "key$": "total_bytes", "index$": 19 }, "total_bytes_label": { "a": true, "h": "Total Bytes Label", "n": "total_bytes_label", "r": true, "t": "`$STRING`", "key$": "total_bytes_label", "index$": 20 }, "trigger_kind": { "a": true, "h": "Trigger Kind", "n": "trigger_kind", "r": true, "t": "`$STRING`", "key$": "trigger_kind", "index$": 21 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 22 }, "updated_at_label": { "a": true, "h": "Updated At Label", "n": "updated_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at_label", "index$": 23 }, "uploaded_at": { "a": true, "fo": "date-time", "h": "Uploaded At", "n": "uploaded_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "uploaded_at", "index$": 24 }, "uploaded_at_label": { "a": true, "h": "Uploaded At Label", "n": "uploaded_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "uploaded_at_label", "index$": 25 } }, "id": { "field": "id", "name": "id" }, "name": "static_site_deployment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/static_sites/{static_site_id}/deployments/{id}/activate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "static_site_id", "or": "static_site_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/static_sites/{static_site_id}/deployments/{id}/activate", "q": { "$action": "activate", "exist": ["id", "static_site_id"] }, "r": { "param": { "id": "id", "static_site_id": "static_site_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "static_site_id" }, { "lit": "deployments" }, { "var": "id" }, { "lit": "activate" }], "t": { "req": "`reqdata`", "res": "`body.deployment`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/static_sites/{static_site_id}/deployments/{id}/cancel", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "static_site_id", "or": "static_site_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/static_sites/{static_site_id}/deployments/{id}/cancel", "q": { "$action": "cancel", "exist": ["id", "static_site_id"] }, "r": { "param": { "id": "id", "static_site_id": "static_site_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "static_site_id" }, { "lit": "deployments" }, { "var": "id" }, { "lit": "cancel" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/static_sites/{static_site_id}/deployments/{id}/finalize", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "static_site_id", "or": "static_site_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/static_sites/{static_site_id}/deployments/{id}/finalize", "q": { "$action": "finalize", "exist": ["id", "static_site_id"] }, "r": { "param": { "id": "id", "static_site_id": "static_site_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "static_site_id" }, { "lit": "deployments" }, { "var": "id" }, { "lit": "finalize" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/static_sites/{static_site_id}/deployments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "static_site_id", "or": "static_site_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/static_sites/{static_site_id}/deployments", "q": { "exist": ["static_site_id"] }, "r": { "param": { "static_site_id": "static_site_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "static_site_id" }, { "lit": "deployments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/static_sites/{static_site_id}/deployments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "static_site_id", "or": "static_site_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/static_sites/{static_site_id}/deployments", "q": { "exist": ["static_site_id"] }, "r": { "param": { "static_site_id": "static_site_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "static_site_id" }, { "lit": "deployments" }], "t": { "req": "`reqdata`", "res": "`body.deployments`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/static_sites/{static_site_id}/deployments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "static_site_id", "or": "static_site_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/static_sites/{static_site_id}/deployments/{id}", "q": { "exist": ["id", "static_site_id"] }, "r": { "param": { "id": "id", "static_site_id": "static_site_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "static_site_id" }, { "lit": "deployments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.static_site"]] }, "key$": "static_site_deployment", "name__orig": "static_site_deployment", "Name": "StaticSiteDeployment", "name_": "static_site_deployment", "name-": "static-site-deployment", "NAME": "STATIC_SITE_DEPLOYMENT", "index$": 508 }, { "active": true, "entity": "static_site_deployment", "key$": "BasicStaticSiteDeploymentFlow", "kind": "basic", "name": "BasicStaticSiteDeploymentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "static_site_deployment_ref01" }, "m": { "static_site_id": "static_site01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "static_site_id": "static_site01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "static_site_deployment_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "static_site_deployment_ref01", "srcdatavar": "static_site_deployment_ref01_data", "suffix": "_dt0" }, "m": { "id": "static_site_deployment01", "static_site_id": "static_site01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-static_site_deployment_ref01" } }], "index$": 2, "route": "GET /api/v1/static_sites/{static_site_id}/deployments/{id}", "record": { "static_site_id": "static_site_id" } }] }, 'StaticSiteDeployment', { "POST /api/v1/static_sites/{static_site_id}/deployments/{id}/activate": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "static_site_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/static_sites/{static_site_id}/deployments/{id}/cancel": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "static_site_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/static_sites/{static_site_id}/deployments/{id}/finalize": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "static_site_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/static_sites/{static_site_id}/deployments": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "static_site_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/static_sites/{static_site_id}/deployments": { "protocol": "http", "parameters": [{ "name": "static_site_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/static_sites/{static_site_id}/deployments/{id}": { "protocol": "http", "parameters": [{ "name": "static_site_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "static_site_deployment.create.0": "GET-only live run: needs POST /api/v1/static_sites/{static_site_id}/deployments/{id}/activate" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const static_site_deployment_ref01_ent = client.StaticSiteDeployment();
        let static_site_deployment_ref01_data = setup.data.new.static_site_deployment['static_site_deployment_ref01'];
        static_site_deployment_ref01_data['static_site_id'] = setup.idmap['static_site01'];
        static_site_deployment_ref01_data = (await static_site_deployment_ref01_ent.create(static_site_deployment_ref01_data)).data();
        (0, node_assert_1.default)(null != static_site_deployment_ref01_data.id);
        // LIST
        const static_site_deployment_ref01_match = {};
        static_site_deployment_ref01_match['static_site_id'] = setup.idmap['static_site01'];
        const static_site_deployment_ref01_list = (await static_site_deployment_ref01_ent.list(static_site_deployment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(static_site_deployment_ref01_list, { id: static_site_deployment_ref01_data.id })));
        // LOAD
        const static_site_deployment_ref01_match_dt0 = {};
        static_site_deployment_ref01_match_dt0.id = static_site_deployment_ref01_data.id;
        static_site_deployment_ref01_match_dt0['static_site_id'] = ['string', 'number', 'boolean'].includes(typeof static_site_deployment_ref01_data['static_site_id']) ?
            static_site_deployment_ref01_data['static_site_id'] : setup.idmap['static_site_id'] ?? setup.idmap['static_site01'];
        const static_site_deployment_ref01_data_dt0 = (await static_site_deployment_ref01_ent.load(static_site_deployment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(static_site_deployment_ref01_data_dt0.id === static_site_deployment_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/static_site_deployment/StaticSiteDeploymentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['static_site_deployment01', 'static_site_deployment02', 'static_site_deployment03', 'static_site01', 'static_site02', 'static_site03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_STATIC_SITE_DEPLOYMENT_ENTID'];
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
//# sourceMappingURL=StaticSiteDeploymentEntity.test.js.map