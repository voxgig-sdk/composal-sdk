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
(0, node_test_1.describe)('PagesSessionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.PagesSession();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PagesSession().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pages_session.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "adapter": { "a": true, "h": "Adapter", "n": "adapter", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "adapter", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at", "index$": 1 }, "cursor": { "a": true, "h": "Cursor", "n": "cursor", "r": false, "t": "`$STRING`", "key$": "cursor", "index$": 2 }, "ended_at": { "a": true, "h": "Ended At", "n": "ended_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ended_at", "index$": 3 }, "external_session_id": { "a": true, "h": "External Session Id", "n": "external_session_id", "r": true, "t": "`$STRING`", "key$": "external_session_id", "index$": 4 }, "facets": { "a": true, "h": "Facets", "n": "facets", "r": true, "t": "`$OBJECT`", "key$": "facets", "index$": 5 }, "from": { "a": true, "h": "From", "n": "from", "r": false, "t": "`$STRING`", "key$": "from", "index$": 6 }, "github_access_warnings": { "a": true, "h": "Github Access Warnings", "n": "github_access_warnings", "r": false, "t": "`$ARRAY`", "key$": "github_access_warnings", "index$": 7 }, "harness": { "a": true, "h": "Harness", "n": "harness", "r": true, "sh": "Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness.", "t": "`$STRING`", "key$": "harness", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 9 }, "last_activity_at": { "a": true, "h": "Last Activity At", "n": "last_activity_at", "r": true, "sh": "When the session last did anything: the newest checkpoint capture, else the session end, else its start.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_activity_at", "index$": 10 }, "last_checkpoint_at": { "a": true, "h": "Last Checkpoint At", "n": "last_checkpoint_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_checkpoint_at", "index$": 11 }, "limit": { "a": true, "h": "Limit", "n": "limit", "r": false, "t": "`$INTEGER`", "key$": "limit", "index$": 12 }, "markers": { "a": true, "h": "Markers", "n": "markers", "r": true, "t": "`$ARRAY`", "key$": "markers", "index$": 13 }, "max_bytes": { "a": true, "h": "Max Bytes", "n": "max_bytes", "r": false, "t": "`$INTEGER`", "key$": "max_bytes", "index$": 14 }, "mode": { "a": true, "h": "Mode", "n": "mode", "r": false, "t": "`$STRING`", "key$": "mode", "index$": 15 }, "offset": { "a": true, "h": "Offset", "n": "offset", "r": false, "t": "`$INTEGER`", "key$": "offset", "index$": 16 }, "pagination": { "a": true, "h": "Pagination", "n": "pagination", "r": true, "t": "`$OBJECT`", "key$": "pagination", "index$": 17 }, "query": { "a": true, "h": "Query", "n": "query", "r": false, "t": "`$STRING`", "key$": "query", "index$": 18 }, "repo": { "a": true, "h": "Repo", "n": "repo", "r": false, "t": "`$STRING`", "key$": "repo", "index$": 19 }, "repository": { "a": true, "h": "Repository", "n": "repository", "r": true, "t": "`$ANY`", "key$": "repository", "index$": 20 }, "search": { "a": true, "h": "Search", "n": "search", "r": false, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "search", "index$": 21 }, "search_enabled": { "a": true, "h": "Search Enabled", "n": "search_enabled", "r": false, "t": "`$BOOLEAN`", "key$": "search_enabled", "index$": 22 }, "session": { "a": true, "h": "Session", "n": "session", "r": true, "sh": "Identical serialization to the org sessions page's expanded session, so the web reuses one session-detail builder.", "t": "`$ANY`", "key$": "session", "index$": 23 }, "sessions": { "a": true, "h": "Sessions", "n": "sessions", "r": true, "t": "`$ARRAY`", "key$": "sessions", "index$": 24 }, "started_at": { "a": true, "h": "Started At", "n": "started_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "started_at", "index$": 25 }, "stats": { "a": true, "h": "Stats", "n": "stats", "r": true, "t": "`$OBJECT`", "key$": "stats", "index$": 26 }, "status": { "a": true, "h": "Status", "n": "status", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "status", "index$": 27 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "title", "index$": 28 }, "to": { "a": true, "h": "To", "n": "to", "r": false, "t": "`$STRING`", "key$": "to", "index$": 29 }, "token_stats": { "a": true, "h": "Token Stats", "n": "token_stats", "r": true, "t": "`$ANY`", "key$": "token_stats", "index$": 30 }, "transcript_index": { "a": true, "h": "Transcript Index", "n": "transcript_index", "r": true, "t": "`$ANY`", "key$": "transcript_index", "index$": 31 }, "transcript_stats": { "a": true, "h": "Transcript Stats", "n": "transcript_stats", "r": true, "t": "`$ANY`", "key$": "transcript_stats", "index$": 32 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at", "index$": 33 }, "user": { "a": true, "h": "User", "n": "user", "r": true, "t": "`$ANY`", "key$": "user", "index$": 34 }, "user_id": { "a": true, "h": "User Id", "n": "user_id", "r": false, "t": "`$STRING`", "key$": "user_id", "index$": 35 } }, "id": { "field": "id", "name": "id" }, "name": "pages_session", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["adapter", "cursor", "from", "limit", "max_bytes", "mode", "offset", "query", "repo", "status", "to", "user_id"], "co": { "id": "POST /api/v1/organizations/{org_slug}/pages/sessions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/pages/sessions", "q": { "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "pages" }, { "lit": "sessions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/pages/sessions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "adapter", "or": "adapter", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "from", "or": "from", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "offset", "or": "offset", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "repo", "or": "repo", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "session", "or": "session", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "status", "or": "status", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "to", "or": "to", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }, { "a": true, "explode": true, "k": "query", "n": "user_id", "or": "user_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/pages/sessions", "q": { "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "pages" }, { "lit": "sessions" }], "t": { "page": { "more": "`body.pagination.has_more`" }, "req": "`reqdata`", "res": "`body.sessions`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/pages/session/{session_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "session_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "session_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "around_event", "or": "around_event", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "checkpoint", "or": "checkpoint", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "event_digest", "or": "event_digest", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/pages/session/{session_id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "org_slug": "organization_id", "session_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "pages" }, { "lit": "session" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "pages_session", "name__orig": "pages_session", "Name": "PagesSession", "name_": "pages_session", "name-": "pages-session", "NAME": "PAGES_SESSION", "index$": 369 }, { "active": true, "entity": "pages_session", "key$": "BasicPagesSessionFlow", "kind": "basic", "name": "BasicPagesSessionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "pages_session_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "pages_session_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "pages_session_ref01", "srcdatavar": "pages_session_ref01_data", "suffix": "_dt0" }, "m": { "id": "pages_session01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-pages_session_ref01" } }], "index$": 2, "route": "GET /api/v1/organizations/{org_slug}/pages/session/{session_id}", "record": {} }] }, 'PagesSession', { "POST /api/v1/organizations/{org_slug}/pages/sessions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "query": { "type": "string", "minLength": 1, "maxLength": 4000, "key$": "query" }, "mode": { "type": "string", "enum": ["hybrid", "keyword", "semantic"], "default": "hybrid", "key$": "mode" }, "repo": { "type": "string", "key$": "repo" }, "adapter": { "type": "string", "key$": "adapter" }, "status": { "type": "string", "key$": "status" }, "from": { "type": "string", "key$": "from" }, "to": { "type": "string", "key$": "to" }, "cursor": { "type": "string", "key$": "cursor" }, "limit": { "type": "integer", "minimum": 1, "maximum": 50, "default": 20, "key$": "limit" }, "max_bytes": { "type": "integer", "minimum": 8192, "maximum": 131072, "default": 32768, "key$": "max_bytes" }, "user_id": { "type": "string", "key$": "user_id" }, "offset": { "type": "integer", "key$": "offset" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "in": "path", "name": "org_slug", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{org_slug}/pages/sessions": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "in": "query", "name": "repo", "required": false, "description": "Repository slug filter.", "schema": { "type": "string" }, "index$": 1 }, { "in": "query", "name": "adapter", "required": false, "description": "Agent adapter/harness filter (codex, claude, cursor, roder, grok).", "schema": { "type": "string" }, "index$": 2 }, { "in": "query", "name": "user_id", "required": false, "description": "Public id of the session owner to filter by.", "schema": { "type": "string" }, "index$": 3 }, { "in": "query", "name": "status", "required": false, "description": "Session status filter (active, completed, abandoned).", "schema": { "type": "string" }, "index$": 4 }, { "in": "query", "name": "from", "required": false, "description": "ISO8601 lower bound (inclusive) on session started_at.", "schema": { "type": "string" }, "index$": 5 }, { "in": "query", "name": "to", "required": false, "description": "ISO8601 upper bound (inclusive) on session started_at.", "schema": { "type": "string" }, "index$": 6 }, { "in": "query", "name": "offset", "required": false, "schema": { "type": "integer", "minimum": 0 }, "index$": 7 }, { "in": "query", "name": "limit", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 8 }, { "in": "query", "name": "session", "required": false, "description": "Public id of a session to expand with its checkpoint timeline.", "schema": { "type": "string" }, "index$": 9 }] }, "GET /api/v1/organizations/{org_slug}/pages/session/{session_id}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "session_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "in": "path", "name": "session_id", "required": true, "description": "Public id of the session to show.", "schema": { "type": "string" }, "index$": 2 }, { "in": "query", "name": "checkpoint", "required": false, "description": "Public id of a specific uploaded checkpoint to resolve the transcript against. Defaults to the session's latest uploaded checkpoint.", "schema": { "type": "string" }, "index$": 3 }, { "in": "query", "name": "around_event", "schema": { "type": "integer", "minimum": 0 }, "description": "Search citation event index; requires checkpoint and event_digest.", "index$": 4 }, { "in": "query", "name": "event_digest", "schema": { "type": "string", "pattern": "^[0-9a-f]{64}$" }, "description": "Verifies that the cited event still matches before opening the page.", "index$": 5 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "pages_session.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/pages/sessions" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const pages_session_ref01_ent = client.PagesSession();
        let pages_session_ref01_data = setup.data.new.pages_session['pages_session_ref01'];
        pages_session_ref01_data['organization_id'] = setup.idmap['organization01'];
        pages_session_ref01_data = (await pages_session_ref01_ent.create(pages_session_ref01_data)).data();
        (0, node_assert_1.default)(null != pages_session_ref01_data.id);
        // LIST
        const pages_session_ref01_match = {};
        pages_session_ref01_match['organization_id'] = setup.idmap['organization01'];
        const pages_session_ref01_list = (await pages_session_ref01_ent.list(pages_session_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(pages_session_ref01_list, { id: pages_session_ref01_data.id })));
        // LOAD
        const pages_session_ref01_match_dt0 = {};
        pages_session_ref01_match_dt0.id = pages_session_ref01_data.id;
        pages_session_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const pages_session_ref01_data_dt0 = (await pages_session_ref01_ent.load(pages_session_ref01_match_dt0)).data();
        (0, node_assert_1.default)(pages_session_ref01_data_dt0.id === pages_session_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pages_session/PagesSessionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pages_session01', 'pages_session02', 'pages_session03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PAGES_SESSION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PAGES_SESSION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PAGES_SESSION_ENTID'];
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
//# sourceMappingURL=PagesSessionEntity.test.js.map