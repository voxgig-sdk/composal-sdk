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
(0, node_test_1.describe)('AppPreviewProfileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AppPreviewProfile();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppPreviewProfile().list({ "app_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_preview_profile.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "automatic": { "a": true, "h": "Automatic", "n": "automatic", "r": false, "t": "`$BOOLEAN`", "key$": "automatic", "index$": 0 }, "configuration": { "a": true, "h": "Configuration", "n": "configuration", "r": false, "t": "`$OBJECT`", "key$": "configuration", "index$": 1 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "r": true, "t": "`$STRING`", "key$": "hosted_app_id", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 5 }, "slug": { "a": true, "h": "Slug", "n": "slug", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "slug", "index$": 6 }, "source_environment_id": { "a": true, "h": "Source Environment Id", "n": "source_environment_id", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "source_environment_id", "index$": 7 }, "ttl_days": { "a": true, "h": "Ttl Days", "n": "ttl_days", "r": false, "t": "`$INTEGER`", "key$": "ttl_days", "index$": 8 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "t": "`$STRING`", "key$": "updated_at", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "app_preview_profile", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["automatic", "configuration", "name", "slug", "source_environment_id", "ttl_days"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/preview_profiles", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles", "q": { "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }], "t": { "req": "`reqdata`", "res": "`body.profile`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/preview_profiles", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles", "q": { "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["automatic", "configuration", "name", "slug", "source_environment_id", "ttl_days"], "co": { "id": "PATCH /api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.profile`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "preview_profiles" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "app_preview_profile", "name__orig": "app_preview_profile", "Name": "AppPreviewProfile", "name_": "app_preview_profile", "name-": "app-preview-profile", "NAME": "APP_PREVIEW_PROFILE", "index$": 90 }, { "active": true, "entity": "app_preview_profile", "key$": "BasicAppPreviewProfileFlow", "kind": "basic", "name": "BasicAppPreviewProfileFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_preview_profile_ref01" }, "m": { "app_id": "app01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "app_id": "app01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "app_preview_profile_ref01" } }], "index$": 1 }, { "a": true, "d": { "app_id": "app01" }, "i": { "ref": "app_preview_profile_ref01", "srcdatavar": "app_preview_profile_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_preview_profile_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "app_preview_profile_ref01", "srcdatavar": "app_preview_profile_ref01_data", "suffix": "_dt0" }, "m": { "app_id": "app01", "id": "app_preview_profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_preview_profile_ref01" } }], "index$": 3, "route": "GET /api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "app_preview_profile_ref01", "suffix": "_rm0" }, "m": { "app_id": "app01", "id": "app_preview_profile01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "app_id": "app01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "app_preview_profile_ref01" } }], "index$": 5 }] }, 'AppPreviewProfile', { "POST /api/v1/hosting/apps/{app_id}/preview_profiles": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["name", "slug", "source_environment_id"], "properties": { "name": { "type": "string", "key$": "name" }, "slug": { "type": "string", "key$": "slug" }, "source_environment_id": { "type": "string", "key$": "source_environment_id" }, "ttl_days": { "type": "integer", "key$": "ttl_days" }, "automatic": { "type": "boolean", "key$": "automatic" }, "configuration": { "type": "object", "properties": { "variables": { "type": "object", "additionalProperties": { "type": "string" } }, "build_variables": { "type": "object", "additionalProperties": { "type": "string" } }, "required_keys": { "type": "array", "items": { "type": "string" } }, "service_resources": { "type": "object", "description": "Service public IDs mapped to resource overrides. Omitted fields inherit; an empty map removes all local overrides. Null reservations select platform defaults.", "additionalProperties": { "type": "object", "additionalProperties": false, "properties": {}, "x-ref": "#/components/schemas/PreviewResourceSettings" }, "x-ref": "#/components/schemas/PreviewResourceOverrides" } }, "x-ref": "#/components/schemas/PreviewDefaultsConfiguration", "key$": "configuration" } } } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/hosting/apps/{app_id}/preview_profiles": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/hosting/apps/{app_id}/preview_profiles/{id}": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/hosting/apps/{app_id}/preview_profiles/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "name": { "type": "string", "key$": "name" }, "slug": { "type": "string", "key$": "slug" }, "source_environment_id": { "type": "string", "key$": "source_environment_id" }, "ttl_days": { "type": "integer", "key$": "ttl_days" }, "automatic": { "type": "boolean", "key$": "automatic" }, "configuration": { "type": "object", "properties": { "variables": { "type": "object", "additionalProperties": { "type": "string" } }, "build_variables": { "type": "object", "additionalProperties": { "type": "string" } }, "required_keys": { "type": "array", "items": { "type": "string" } }, "service_resources": { "type": "object", "description": "Service public IDs mapped to resource overrides. Omitted fields inherit; an empty map removes all local overrides. Null reservations select platform defaults.", "additionalProperties": { "type": "object", "additionalProperties": false, "properties": {}, "x-ref": "#/components/schemas/PreviewResourceSettings" }, "x-ref": "#/components/schemas/PreviewResourceOverrides" } }, "x-ref": "#/components/schemas/PreviewDefaultsConfiguration", "key$": "configuration" } } } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{id}": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/hosting/apps/{app_id}/preview_profiles/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "app_preview_profile.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/preview_profiles", "app_preview_profile.update.2": "GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "app_preview_profile.remove.4": "GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/preview_profiles/{id}", "app_preview_profile.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const app_preview_profile_ref01_ent = client.AppPreviewProfile();
        let app_preview_profile_ref01_data = setup.data.new.app_preview_profile['app_preview_profile_ref01'];
        app_preview_profile_ref01_data['app_id'] = setup.idmap['app01'];
        app_preview_profile_ref01_data = (await app_preview_profile_ref01_ent.create(app_preview_profile_ref01_data)).data();
        (0, node_assert_1.default)(null != app_preview_profile_ref01_data.id);
        // LIST
        const app_preview_profile_ref01_match = {};
        app_preview_profile_ref01_match['app_id'] = setup.idmap['app01'];
        const app_preview_profile_ref01_list = (await app_preview_profile_ref01_ent.list(app_preview_profile_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(app_preview_profile_ref01_list, { id: app_preview_profile_ref01_data.id })));
        // UPDATE
        const app_preview_profile_ref01_data_up0 = {};
        app_preview_profile_ref01_data_up0.id = app_preview_profile_ref01_data.id;
        app_preview_profile_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        const app_preview_profile_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-app_preview_profile_ref01_' + setup.now };
        app_preview_profile_ref01_data_up0[app_preview_profile_ref01_markdef_up0.name] = app_preview_profile_ref01_markdef_up0.value;
        const app_preview_profile_ref01_resdata_up0 = (await app_preview_profile_ref01_ent.update(app_preview_profile_ref01_data_up0)).data();
        (0, node_assert_1.default)(app_preview_profile_ref01_resdata_up0.id === app_preview_profile_ref01_data_up0.id);
        (0, node_assert_1.default)(app_preview_profile_ref01_resdata_up0[app_preview_profile_ref01_markdef_up0.name] === app_preview_profile_ref01_markdef_up0.value);
        // LOAD
        const app_preview_profile_ref01_match_dt0 = {};
        app_preview_profile_ref01_match_dt0.id = app_preview_profile_ref01_data.id;
        app_preview_profile_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        const app_preview_profile_ref01_data_dt0 = (await app_preview_profile_ref01_ent.load(app_preview_profile_ref01_match_dt0)).data();
        (0, node_assert_1.default)(app_preview_profile_ref01_data_dt0.id === app_preview_profile_ref01_data.id);
        // REMOVE
        const app_preview_profile_ref01_match_rm0 = { id: app_preview_profile_ref01_data.id };
        app_preview_profile_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        await app_preview_profile_ref01_ent.remove(app_preview_profile_ref01_match_rm0);
        // LIST
        const app_preview_profile_ref01_match_rt0 = {};
        app_preview_profile_ref01_match_rt0['app_id'] = setup.idmap['app01'];
        const app_preview_profile_ref01_list_rt0 = (await app_preview_profile_ref01_ent.list(app_preview_profile_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(app_preview_profile_ref01_list_rt0, { id: app_preview_profile_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_preview_profile/AppPreviewProfileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_preview_profile01', 'app_preview_profile02', 'app_preview_profile03', 'app01', 'app02', 'app03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_APP_PREVIEW_PROFILE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_APP_PREVIEW_PROFILE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_APP_PREVIEW_PROFILE_ENTID'];
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
//# sourceMappingURL=AppPreviewProfileEntity.test.js.map