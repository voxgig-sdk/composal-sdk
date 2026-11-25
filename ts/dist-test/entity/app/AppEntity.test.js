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
(0, node_test_1.describe)('AppEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.App();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('app hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.ComposalSDK.test(offline).App().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.ComposalSDK.test(offline).App()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.App().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.ComposalSDK.test().App().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.ComposalSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.App().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.App().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.App().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "created_at_label": { "a": true, "h": "Created At Label", "n": "created_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at_label", "index$": 1 }, "description": { "a": true, "h": "Description", "n": "description", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "description", "index$": 2 }, "framework": { "a": true, "h": "Framework", "n": "framework", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "framework", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 5 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "op": { "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 6 }, "repository_id": { "a": true, "h": "Repository Id", "n": "repository_id", "op": { "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "repository_id", "index$": 7 }, "repository_kind": { "a": true, "h": "Repository Kind", "n": "repository_kind", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "repository_kind", "index$": 8 }, "root_path": { "a": true, "h": "Root Path", "n": "root_path", "op": { "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "root_path", "index$": 9 }, "root_path_display": { "a": true, "h": "Root Path Display", "n": "root_path_display", "r": true, "t": "`$STRING`", "key$": "root_path_display", "index$": 10 }, "slug": { "a": true, "h": "Slug", "n": "slug", "op": { "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "slug", "index$": 11 }, "status": { "a": true, "h": "Status", "n": "status", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "status", "index$": 12 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 13 }, "updated_at_label": { "a": true, "h": "Updated At Label", "n": "updated_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at_label", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "app", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/hosting/apps/{id}/activate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{id}/activate", "q": { "$action": "activate", "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "id" }, { "lit": "activate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/hosting/apps/{id}/archive", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{id}/archive", "q": { "$action": "archive", "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "id" }, { "lit": "archive" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["description", "framework", "name", "organization_id", "repository_id", "root_path", "slug", "status"], "co": { "id": "POST /api/v1/hosting/apps", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }], "t": { "req": "`reqdata`", "res": "`body.app`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "organization_id", "or": "organization_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }], "t": { "req": "`reqdata`", "res": "`body.apps`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/catalog", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/catalog", "q": { "$action": "catalog", "exist": ["id"] }, "r": { "param": { "app_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "id" }, { "lit": "catalog" }], "t": { "req": "`reqdata`", "res": "`body.app`" }, "index$": 1 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["description", "framework", "name", "organization_id", "repository_id", "root_path", "slug", "status"], "co": { "id": "PATCH /api/v1/hosting/apps/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/hosting/apps/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.app`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/hosting/apps/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/hosting/apps/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["description", "framework", "name", "organization_id", "repository_id", "root_path", "slug", "status"], "co": { "id": "PUT /api/v1/hosting/apps/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/hosting/apps/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.app`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "fact": { "desc": { "cell": "An app hosted by Composal: list, create, read, change, activate, archive or delete one.", "code": "`An app hosted by Composal: list, create, read, change, activate, archive or delete one.`", "codecell": "`An app hosted by Composal: list, create, read, change, activate, archive or delete one.`", "flat": "An app hosted by Composal: list, create, read, change, activate, archive or delete one.", "inline": "An app hosted by Composal: list, create, read, change, activate, archive or delete one.", "label": "An app hosted by Composal: list, create, read, change, activate, archive or delete one.", "link": "An%20app%20hosted%20by%20Composal:%20list,%20create,%20read,%20change,%20activate,%20archive%20or%20delete%20one.", "raw": "An app hosted by Composal: list, create, read, change, activate, archive or delete one.", "text": "An app hosted by Composal: list, create, read, change, activate, archive or delete one.", "vendor": false } }, "key$": "app", "name__orig": "app", "Name": "App", "name_": "app", "name-": "app", "NAME": "APP", "index$": 75 }, { "active": true, "entity": "app", "key$": "BasicAppFlow", "kind": "basic", "name": "BasicAppFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "app_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "app_ref01", "srcdatavar": "app_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "app_ref01", "srcdatavar": "app_ref01_data", "suffix": "_dt0" }, "m": { "id": "app01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_ref01" } }], "index$": 3, "route": "GET /api/v1/hosting/apps/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "app_ref01", "suffix": "_rm0" }, "m": { "id": "app01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "app_ref01" } }], "index$": 5 }] }, 'App', { "POST /api/v1/hosting/apps/{id}/activate": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/hosting/apps/{id}/archive": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/hosting/apps": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["organization_id", "repository_id", "slug", "name", "root_path"], "properties": { "organization_id": { "type": "string", "key$": "organization_id" }, "repository_id": { "type": "string", "key$": "repository_id" }, "slug": { "type": "string", "key$": "slug" }, "name": { "type": "string", "key$": "name" }, "description": { "type": "string", "key$": "description" }, "root_path": { "type": "string", "key$": "root_path" }, "framework": { "type": "string", "key$": "framework" }, "status": { "type": "string", "enum": ["draft", "active", "archived"], "key$": "status" } }, "additionalProperties": true, "x-ref": "#/components/schemas/HostedAppCreatePayload" } } } }, "parameters": [] }, "GET /api/v1/hosting/apps": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/hosting/apps/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/hosting/apps/{app_id}/catalog": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/hosting/apps/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "organization_id": { "type": "string", "key$": "organization_id" }, "repository_id": { "type": "string", "key$": "repository_id" }, "slug": { "type": "string", "key$": "slug" }, "name": { "type": "string", "key$": "name" }, "description": { "type": "string", "key$": "description" }, "root_path": { "type": "string", "key$": "root_path" }, "framework": { "type": "string", "key$": "framework" }, "status": { "type": "string", "enum": ["draft", "active", "archived"], "key$": "status" } }, "additionalProperties": true, "x-ref": "#/components/schemas/HostedAppUpdatePayload" } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /api/v1/hosting/apps/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/hosting/apps/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "organization_id": { "type": "string", "key$": "organization_id" }, "repository_id": { "type": "string", "key$": "repository_id" }, "slug": { "type": "string", "key$": "slug" }, "name": { "type": "string", "key$": "name" }, "description": { "type": "string", "key$": "description" }, "root_path": { "type": "string", "key$": "root_path" }, "framework": { "type": "string", "key$": "framework" }, "status": { "type": "string", "enum": ["draft", "active", "archived"], "key$": "status" } }, "additionalProperties": true, "x-ref": "#/components/schemas/HostedAppUpdatePayload" } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "app.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{id}/activate", "app.update.2": "GET-only live run: needs PUT /api/v1/hosting/apps/{id}", "app.remove.4": "GET-only live run: needs DELETE /api/v1/hosting/apps/{id}", "app.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const app_ref01_ent = client.App();
        let app_ref01_data = setup.data.new.app['app_ref01'];
        app_ref01_data = (await app_ref01_ent.create(app_ref01_data)).data();
        (0, node_assert_1.default)(null != app_ref01_data.id);
        // LIST
        const app_ref01_match = {};
        const app_ref01_list = (await app_ref01_ent.list(app_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(app_ref01_list, { id: app_ref01_data.id })));
        // UPDATE
        const app_ref01_data_up0 = {};
        app_ref01_data_up0.id = app_ref01_data.id;
        const app_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-app_ref01_' + setup.now };
        app_ref01_data_up0[app_ref01_markdef_up0.name] = app_ref01_markdef_up0.value;
        const app_ref01_resdata_up0 = (await app_ref01_ent.update(app_ref01_data_up0)).data();
        (0, node_assert_1.default)(app_ref01_resdata_up0.id === app_ref01_data_up0.id);
        (0, node_assert_1.default)(app_ref01_resdata_up0[app_ref01_markdef_up0.name] === app_ref01_markdef_up0.value);
        // LOAD
        const app_ref01_match_dt0 = {};
        app_ref01_match_dt0.id = app_ref01_data.id;
        const app_ref01_data_dt0 = (await app_ref01_ent.load(app_ref01_match_dt0)).data();
        (0, node_assert_1.default)(app_ref01_data_dt0.id === app_ref01_data.id);
        // REMOVE
        const app_ref01_match_rm0 = { id: app_ref01_data.id };
        await app_ref01_ent.remove(app_ref01_match_rm0);
        // LIST
        const app_ref01_match_rt0 = {};
        const app_ref01_list_rt0 = (await app_ref01_ent.list(app_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(app_ref01_list_rt0, { id: app_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app/AppTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app01', 'app02', 'app03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_APP_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_APP_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_APP_ENTID'];
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
//# sourceMappingURL=AppEntity.test.js.map