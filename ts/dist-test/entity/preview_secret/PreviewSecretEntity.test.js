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
(0, node_test_1.describe)('PreviewSecretEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.PreviewSecret();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PreviewSecret().create({ "app_id": 1, "preview_id": "x", "env_key": "x", "name": "x", "slug": "x", "value": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'preview_secret.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "env_key": { "a": true, "h": "Env Key", "n": "env_key", "r": true, "t": "`$STRING`", "key$": "env_key", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 2 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 3 }, "value": { "a": true, "h": "Value", "n": "value", "r": true, "t": "`$STRING`", "wo": true, "key$": "value", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "preview_secret", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["value"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "preview_id", "or": "preview_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate", "q": { "$action": "rotate", "exist": ["app_id", "id", "preview_id"] }, "r": { "param": { "app_id": "app_id", "id": "id", "preview_id": "preview_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "previews" }, { "var": "preview_id" }, { "lit": "secrets" }, { "var": "id" }, { "lit": "rotate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["env_key", "name", "slug", "value"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "preview_id", "or": "preview_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets", "q": { "exist": ["app_id", "preview_id"] }, "r": { "param": { "app_id": "app_id", "preview_id": "preview_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "previews" }, { "var": "preview_id" }, { "lit": "secrets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "preview_id", "or": "preview_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}", "q": { "exist": ["app_id", "id", "preview_id"] }, "r": { "param": { "app_id": "app_id", "id": "id", "preview_id": "preview_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "previews" }, { "var": "preview_id" }, { "lit": "secrets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "preview_secret", "name__orig": "preview_secret", "Name": "PreviewSecret", "name_": "preview_secret", "name-": "preview-secret", "NAME": "PREVIEW_SECRET", "index$": 153 }, { "active": true, "entity": "preview_secret", "key$": "BasicPreviewSecretFlow", "kind": "basic", "name": "BasicPreviewSecretFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "preview_secret_ref01" }, "m": { "app_id": "app01", "preview_id": "preview01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "preview_secret_ref01", "suffix": "_rm0" }, "m": { "app_id": "app01", "id": "preview_secret01", "preview_id": "preview01" }, "o": "remove", "s": [], "v": [], "index$": 1 }] }, 'PreviewSecret', { "POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["value"], "properties": { "value": { "type": "string", "writeOnly": true } } } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "preview_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["name", "slug", "env_key", "value"], "properties": { "name": { "type": "string", "key$": "name" }, "slug": { "type": "string", "key$": "slug" }, "env_key": { "type": "string", "key$": "env_key" }, "value": { "type": "string", "writeOnly": true, "key$": "value" } } } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "preview_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "preview_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "preview_secret.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate", "preview_secret.remove.1": "GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const preview_secret_ref01_ent = client.PreviewSecret();
        let preview_secret_ref01_data = setup.data.new.preview_secret['preview_secret_ref01'];
        preview_secret_ref01_data['app_id'] = setup.idmap['app01'];
        preview_secret_ref01_data['preview_id'] = setup.idmap['preview01'];
        preview_secret_ref01_data = (await preview_secret_ref01_ent.create(preview_secret_ref01_data)).data();
        (0, node_assert_1.default)(null != preview_secret_ref01_data.id);
        // REMOVE
        const preview_secret_ref01_match_rm0 = { id: preview_secret_ref01_data.id };
        preview_secret_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        preview_secret_ref01_match_rm0['preview_id'] = setup.idmap['preview_id'] ?? setup.idmap['preview01'];
        await preview_secret_ref01_ent.remove(preview_secret_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/preview_secret/PreviewSecretTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['preview_secret01', 'preview_secret02', 'preview_secret03', 'app01', 'app02', 'app03', 'preview01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PREVIEW_SECRET_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PREVIEW_SECRET_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PREVIEW_SECRET_ENTID'];
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
//# sourceMappingURL=PreviewSecretEntity.test.js.map