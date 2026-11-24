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
(0, node_test_1.describe)('PreviewProfileSecretBindingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.PreviewProfileSecretBinding();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PreviewProfileSecretBinding().list({ "app_id": 1, "preview_profile_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'preview_profile_secret_binding.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "env_key": { "a": true, "h": "Env Key", "n": "env_key", "r": true, "t": "`$STRING`", "key$": "env_key", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 1 }, "mode": { "a": true, "h": "Mode", "n": "mode", "r": false, "t": "`$STRING`", "key$": "mode", "index$": 2 }, "secret_id": { "a": true, "h": "Secret Id", "n": "secret_id", "r": false, "t": "`$STRING`", "key$": "secret_id", "index$": 3 }, "secret_version_id": { "a": true, "h": "Secret Version Id", "n": "secret_version_id", "r": false, "t": "`$STRING`", "key$": "secret_version_id", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "preview_profile_secret_binding", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["env_key", "mode", "secret_id", "secret_version_id"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "preview_profile_id", "or": "preview_profile_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings", "q": { "exist": ["app_id", "preview_profile_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }, { "var": "preview_profile_id" }, { "lit": "secret_bindings" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "preview_profile_id", "or": "preview_profile_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings", "q": { "exist": ["app_id", "preview_profile_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }, { "var": "preview_profile_id" }, { "lit": "secret_bindings" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "preview_profile_id", "or": "preview_profile_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings/{id}", "q": { "exist": ["app_id", "id", "preview_profile_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }, { "var": "preview_profile_id" }, { "lit": "secret_bindings" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "preview_profile_secret_binding", "name__orig": "preview_profile_secret_binding", "Name": "PreviewProfileSecretBinding", "name_": "preview_profile_secret_binding", "name-": "preview-profile-secret-binding", "NAME": "PREVIEW_PROFILE_SECRET_BINDING", "index$": 152 }, { "active": true, "entity": "preview_profile_secret_binding", "key$": "BasicPreviewProfileSecretBindingFlow", "kind": "basic", "name": "BasicPreviewProfileSecretBindingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "preview_profile_secret_binding_ref01" }, "m": { "app_id": "app01", "preview_profile_id": "preview_profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "app_id": "app01", "preview_profile_id": "preview_profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "preview_profile_secret_binding_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "preview_profile_secret_binding_ref01", "suffix": "_rm0" }, "m": { "app_id": "app01", "id": "preview_profile_secret_binding01", "preview_profile_id": "preview_profile01" }, "o": "remove", "s": [], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "app_id": "app01", "preview_profile_id": "preview_profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "preview_profile_secret_binding_ref01" } }], "index$": 3 }] }, 'PreviewProfileSecretBinding', { "POST /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["env_key"], "properties": { "env_key": { "type": "string", "key$": "env_key" }, "mode": { "type": "string", "enum": ["linked", "masked"], "key$": "mode" }, "secret_id": { "type": "string", "key$": "secret_id" }, "secret_version_id": { "type": "string", "key$": "secret_version_id" } }, "additionalProperties": true, "x-ref": "#/components/schemas/PreviewBindingSelection" } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "preview_profile_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "preview_profile_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings/{id}": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "preview_profile_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "preview_profile_secret_binding.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings", "preview_profile_secret_binding.remove.2": "GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{preview_profile_id}/secret_bindings/{id}", "preview_profile_secret_binding.list.3": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const preview_profile_secret_binding_ref01_ent = client.PreviewProfileSecretBinding();
        let preview_profile_secret_binding_ref01_data = setup.data.new.preview_profile_secret_binding['preview_profile_secret_binding_ref01'];
        preview_profile_secret_binding_ref01_data['app_id'] = setup.idmap['app01'];
        preview_profile_secret_binding_ref01_data['preview_profile_id'] = setup.idmap['preview_profile01'];
        preview_profile_secret_binding_ref01_data = (await preview_profile_secret_binding_ref01_ent.create(preview_profile_secret_binding_ref01_data)).data();
        (0, node_assert_1.default)(null != preview_profile_secret_binding_ref01_data.id);
        // LIST
        const preview_profile_secret_binding_ref01_match = {};
        preview_profile_secret_binding_ref01_match['app_id'] = setup.idmap['app01'];
        preview_profile_secret_binding_ref01_match['preview_profile_id'] = setup.idmap['preview_profile01'];
        const preview_profile_secret_binding_ref01_list = (await preview_profile_secret_binding_ref01_ent.list(preview_profile_secret_binding_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(preview_profile_secret_binding_ref01_list, { id: preview_profile_secret_binding_ref01_data.id })));
        // REMOVE
        const preview_profile_secret_binding_ref01_match_rm0 = { id: preview_profile_secret_binding_ref01_data.id };
        preview_profile_secret_binding_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        preview_profile_secret_binding_ref01_match_rm0['preview_profile_id'] = setup.idmap['preview_profile_id'] ?? setup.idmap['preview_profile01'];
        await preview_profile_secret_binding_ref01_ent.remove(preview_profile_secret_binding_ref01_match_rm0);
        // LIST
        const preview_profile_secret_binding_ref01_match_rt0 = {};
        preview_profile_secret_binding_ref01_match_rt0['app_id'] = setup.idmap['app01'];
        preview_profile_secret_binding_ref01_match_rt0['preview_profile_id'] = setup.idmap['preview_profile01'];
        const preview_profile_secret_binding_ref01_list_rt0 = (await preview_profile_secret_binding_ref01_ent.list(preview_profile_secret_binding_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(preview_profile_secret_binding_ref01_list_rt0, { id: preview_profile_secret_binding_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/preview_profile_secret_binding/PreviewProfileSecretBindingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['preview_profile_secret_binding01', 'preview_profile_secret_binding02', 'preview_profile_secret_binding03', 'app01', 'app02', 'app03', 'preview_profile01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PREVIEW_PROFILE_SECRET_BINDING_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PREVIEW_PROFILE_SECRET_BINDING_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PREVIEW_PROFILE_SECRET_BINDING_ENTID'];
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
//# sourceMappingURL=PreviewProfileSecretBindingEntity.test.js.map