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
(0, node_test_1.describe)('BrowserSessionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.BrowserSession();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.BrowserSession().load({ "id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'browser_session.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_task_id": { "a": true, "h": "Active Task Id", "n": "active_task_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "active_task_id", "index$": 0 }, "authentication_status": { "a": true, "h": "Authentication Status", "n": "authentication_status", "r": true, "sh": "Session readiness alone does not confirm application sign-in.", "t": "`$STRING`", "key$": "authentication_status", "index$": 1 }, "authentication_task_id": { "a": true, "h": "Authentication Task Id", "n": "authentication_task_id", "r": false, "sh": "Automatic sign-in task; read its status and result separately from browser readiness.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "authentication_task_id", "index$": 2 }, "cdp_url": { "a": true, "h": "Cdp Url", "n": "cdp_url", "r": false, "sh": "Admin-only full browser CDP bearer capability for the current external control generation.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "cdp_url", "index$": 3 }, "closed_at": { "a": true, "fo": "date-time", "h": "Closed At", "n": "closed_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "closed_at", "index$": 4 }, "closure_basis": { "a": true, "h": "Closure Basis", "n": "closure_basis", "r": false, "sh": "Provider deletion is a conservative closure bound when the worker cannot report its stop time.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "closure_basis", "index$": 5 }, "control_generation": { "a": true, "h": "Control Generation", "n": "control_generation", "r": true, "t": "`$INTEGER`", "key$": "control_generation", "index$": 6 }, "controller": { "a": true, "h": "Controller", "n": "controller", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "controller", "index$": 7 }, "credential_id": { "a": true, "h": "Credential Id", "n": "credential_id", "r": false, "sh": "Optional configured credential public ID within the selected project.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "credential_id", "index$": 8 }, "environment_id": { "a": true, "h": "Environment Id", "n": "environment_id", "r": false, "sh": "Optional ready website environment slug or public ID within the selected project.", "t": "`$STRING`", "key$": "environment_id", "index$": 9 }, "environment_revision_id": { "a": true, "h": "Environment Revision Id", "n": "environment_revision_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "environment_revision_id", "index$": 10 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": true, "t": "`$STRING`", "key$": "expires_at", "index$": 11 }, "failure_code": { "a": true, "h": "Failure Code", "n": "failure_code", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_code", "index$": 12 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 13 }, "idempotency_key": { "a": true, "h": "Idempotency Key", "n": "idempotency_key", "r": false, "t": "`$STRING`", "key$": "idempotency_key", "index$": 14 }, "initial_url": { "a": true, "h": "Initial Url", "n": "initial_url", "r": true, "t": "`$STRING`", "key$": "initial_url", "index$": 15 }, "max_seconds": { "a": true, "h": "Max Seconds", "n": "max_seconds", "r": false, "t": "`$INTEGER`", "key$": "max_seconds", "index$": 16 }, "pending_control_id": { "a": true, "h": "Pending Control Id", "n": "pending_control_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "pending_control_id", "index$": 17 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "sh": "Optional project slug or public ID.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "project_id", "index$": 18 }, "reconciled_at": { "a": true, "fo": "date-time", "h": "Reconciled At", "n": "reconciled_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "reconciled_at", "index$": 19 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "started_at", "index$": 20 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 21 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page.", "t": "`$STRING`", "key$": "url", "index$": 22 }, "viewer": { "a": true, "h": "Viewer", "n": "viewer", "r": false, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "viewer", "index$": 23 } }, "id": { "field": "id", "name": "id" }, "name": "browser_session", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["controller", "generation", "idempotency_key"], "co": { "id": "POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "browser_session_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control", "q": { "$action": "control", "exist": ["id", "organization_id"] }, "r": { "param": { "browser_session_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "browser_sessions" }, { "var": "id" }, { "lit": "control" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["controller", "credential_id", "environment_id", "idempotency_key", "max_seconds", "project_id", "url"], "co": { "id": "POST /api/v1/organizations/{organization_id}/browser_sessions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/browser_sessions", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "browser_sessions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "browser_session_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media", "q": { "$action": "media", "exist": ["id", "organization_id"] }, "r": { "param": { "browser_session_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "browser_sessions" }, { "var": "id" }, { "lit": "media" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/browser_sessions/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/browser_sessions/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "browser_sessions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/browser_sessions/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/browser_sessions/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "browser_sessions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "browser_session", "name__orig": "browser_session", "Name": "BrowserSession", "name_": "browser_session", "name-": "browser-session", "NAME": "BROWSER_SESSION", "index$": 142 }, { "active": true, "entity": "browser_session", "key$": "BasicBrowserSessionFlow", "kind": "basic", "name": "BasicBrowserSessionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "browser_session_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "browser_session_ref01", "srcdatavar": "browser_session_ref01_data", "suffix": "_dt0" }, "m": { "id": "browser_session01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-browser_session_ref01" } }], "index$": 1, "route": "GET /api/v1/organizations/{organization_id}/browser_sessions/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "browser_session_ref01", "suffix": "_rm0" }, "m": { "id": "browser_session01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 2 }] }, 'BrowserSession', { "POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["controller", "generation"], "properties": { "controller": { "type": "string", "enum": ["idle", "agent", "external"] }, "generation": { "type": "integer", "minimum": 0 }, "idempotency_key": { "type": "string", "minLength": 1, "maxLength": 255 } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "browser_session_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "Idempotency-Key", "in": "header", "required": false, "schema": { "type": "string", "minLength": 1, "maxLength": 255 }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/browser_sessions": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "idempotency_key": { "type": "string", "minLength": 1, "maxLength": 255, "key$": "idempotency_key" }, "project_id": { "type": "string", "description": "Optional project slug or public ID.", "key$": "project_id" }, "environment_id": { "type": "string", "description": "Optional ready website environment slug or public ID within the selected project.", "key$": "environment_id" }, "credential_id": { "type": "string", "description": "Optional configured credential public ID within the selected project.", "key$": "credential_id" }, "url": { "type": "string", "description": "Initial HTTP or HTTPS URL; defaults to the selected environment or project URL, otherwise a blank page.", "key$": "url" }, "max_seconds": { "type": "integer", "minimum": 60, "maximum": 43200, "default": 900, "key$": "max_seconds" }, "controller": { "type": "string", "enum": ["idle", "agent", "external"], "default": "external", "key$": "controller" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "Idempotency-Key", "in": "header", "required": false, "schema": { "type": "string", "minLength": 1, "maxLength": 255 }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "browser_session_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/browser_sessions/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/organizations/{organization_id}/browser_sessions/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "browser_session.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/control", "browser_session.load.1": "GET-only live run: reads a record only browser_session.create.0 gives", "browser_session.remove.2": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/browser_sessions/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const browser_session_ref01_ent = client.BrowserSession();
        let browser_session_ref01_data = setup.data.new.browser_session['browser_session_ref01'];
        browser_session_ref01_data['organization_id'] = setup.idmap['organization01'];
        browser_session_ref01_data = (await browser_session_ref01_ent.create(browser_session_ref01_data)).data();
        (0, node_assert_1.default)(null != browser_session_ref01_data.id);
        // LOAD
        const browser_session_ref01_match_dt0 = {};
        browser_session_ref01_match_dt0.id = browser_session_ref01_data.id;
        browser_session_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const browser_session_ref01_data_dt0 = (await browser_session_ref01_ent.load(browser_session_ref01_match_dt0)).data();
        (0, node_assert_1.default)(browser_session_ref01_data_dt0.id === browser_session_ref01_data.id);
        // REMOVE
        const browser_session_ref01_match_rm0 = { id: browser_session_ref01_data.id };
        browser_session_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await browser_session_ref01_ent.remove(browser_session_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/browser_session/BrowserSessionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['browser_session01', 'browser_session02', 'browser_session03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_BROWSER_SESSION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_BROWSER_SESSION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_BROWSER_SESSION_ENTID'];
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
//# sourceMappingURL=BrowserSessionEntity.test.js.map