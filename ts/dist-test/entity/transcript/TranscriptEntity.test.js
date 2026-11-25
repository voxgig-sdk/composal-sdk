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
(0, node_test_1.describe)('TranscriptEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Transcript();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('transcript hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.ComposalSDK.test(offline).Transcript().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.ComposalSDK.test(offline).Transcript()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Transcript().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.ComposalSDK.test().Transcript().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.ComposalSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Transcript().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Transcript().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Transcript().list({ "change": 1, "repo": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'transcript.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent": { "a": true, "h": "Agent", "n": "agent", "r": true, "t": "`$STRING`", "key$": "agent", "index$": 0 }, "author": { "a": true, "h": "Author", "n": "author", "r": true, "t": "`$OBJECT`", "key$": "author", "index$": 1 }, "checkpoint_pagination": { "a": true, "h": "Checkpoint Pagination", "n": "checkpoint_pagination", "r": true, "t": "`$OBJECT`", "key$": "checkpoint_pagination", "index$": 2 }, "checkpoints": { "a": true, "h": "Checkpoints", "n": "checkpoints", "r": true, "t": "`$ARRAY`", "key$": "checkpoints", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 4 }, "last_checkpoint_at": { "a": true, "h": "Last Checkpoint At", "n": "last_checkpoint_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_checkpoint_at", "index$": 5 }, "selected_checkpoint": { "a": true, "h": "Selected Checkpoint", "n": "selected_checkpoint", "r": true, "t": "`$ANY`", "key$": "selected_checkpoint", "index$": 6 }, "source_url": { "a": true, "h": "Source Url", "n": "source_url", "r": true, "t": "`$STRING`", "key$": "source_url", "index$": 7 }, "started_at": { "a": true, "h": "Started At", "n": "started_at", "r": true, "t": "`$STRING`", "key$": "started_at", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 9 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "title", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "transcript", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["adapter", "cursor", "from", "limit", "max_bytes", "mode", "query", "repo", "status", "to", "user"], "co": { "id": "POST /api/v1/organizations/{org_slug}/transcripts/search", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/transcripts/search", "q": { "$action": "search", "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "transcripts" }, { "lit": "search" }], "t": { "page": { "cursor": "`body.pagination.next_cursor`" }, "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/transcripts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "change", "or": "change", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "checkpoint_cursor", "or": "checkpoint_cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "commit", "or": "commit", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 20, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "patchset", "or": "patchset", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "pr", "or": "pr", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "repo", "or": "repo", "r": true, "style": "form", "t": "`$STRING`", "index$": 7 }, { "a": true, "explode": true, "k": "query", "n": "session", "or": "session", "r": false, "style": "form", "t": "`$STRING`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/api/v1/transcripts", "q": { "exist": ["repo"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "transcripts" }], "t": { "page": { "cursor": "`body.pagination.next_cursor`", "more": "`body.pagination.has_more`" }, "req": "`reqdata`", "res": "`body.sessions`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/transcripts/read", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "around_event", "or": "around_event", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "event_digest", "or": "event_digest", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": false, "explode": true, "k": "query", "n": "include_tool", "or": "include_tools", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 3 }, { "a": true, "ex": 50, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "ex": 32768, "explode": true, "k": "query", "n": "max_byte", "or": "max_bytes", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "source_ref", "or": "source_ref", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/api/v1/transcripts/read", "q": { "$action": "read" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "transcripts" }, { "lit": "read" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "transcript", "name__orig": "transcript", "Name": "Transcript", "name_": "transcript", "name-": "transcript", "NAME": "TRANSCRIPT", "index$": 523 }, { "active": true, "entity": "transcript", "key$": "BasicTranscriptFlow", "kind": "basic", "name": "BasicTranscriptFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "transcript_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "transcript_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "transcript_ref01", "srcdatavar": "transcript_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-transcript_ref01" } }], "unreachable": true }] }, 'Transcript', { "POST /api/v1/organizations/{org_slug}/transcripts/search": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["query"], "properties": { "query": { "type": "string", "minLength": 1, "maxLength": 4000 }, "mode": { "type": "string", "enum": ["hybrid", "keyword", "semantic"], "default": "hybrid" }, "repo": { "type": "string" }, "user": { "type": "string" }, "adapter": { "type": "string" }, "status": { "type": "string" }, "from": { "type": "string" }, "to": { "type": "string" }, "cursor": { "type": "string" }, "limit": { "type": "integer", "minimum": 1, "maximum": 50, "default": 20 }, "max_bytes": { "type": "integer", "minimum": 8192, "maximum": 131072, "default": 32768 } }, "x-ref": "#/components/schemas/TranscriptSearchRequest" } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/transcripts": { "protocol": "http", "parameters": [{ "in": "query", "name": "repo", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "in": "query", "name": "change", "schema": { "type": "string" }, "index$": 1 }, { "in": "query", "name": "pr", "schema": { "type": "string" }, "description": "GitHub PR number or URL.", "index$": 2 }, { "in": "query", "name": "commit", "schema": { "type": "string" }, "description": "Complete 40-character Git commit SHA.", "index$": 3 }, { "in": "query", "name": "patchset", "schema": { "type": "integer", "minimum": 1 }, "index$": 4 }, { "in": "query", "name": "limit", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 20 }, "index$": 5 }, { "in": "query", "name": "cursor", "schema": { "type": "string" }, "index$": 6 }, { "in": "query", "name": "session", "schema": { "type": "string" }, "description": "Select a linked session when paging its matching checkpoints.", "index$": 7 }, { "in": "query", "name": "checkpoint_cursor", "schema": { "type": "string" }, "index$": 8 }] }, "GET /api/v1/transcripts/read": { "protocol": "http", "parameters": [{ "in": "query", "name": "source_ref", "description": "Opaque source reference returned by discovery, required on the source route unless continuing with a cursor.", "schema": { "type": "string" }, "x-ref": "#/components/parameters/TranscriptReadSource", "index$": 0 }, { "in": "query", "name": "cursor", "schema": { "type": "string" }, "x-ref": "#/components/parameters/TranscriptReadCursor", "index$": 1 }, { "in": "query", "name": "limit", "schema": { "type": "integer", "minimum": 1, "maximum": 200, "default": 50 }, "x-ref": "#/components/parameters/TranscriptReadLimit", "index$": 2 }, { "in": "query", "name": "max_bytes", "schema": { "type": "integer", "minimum": 8192, "maximum": 131072, "default": 32768 }, "x-ref": "#/components/parameters/TranscriptReadBytes", "index$": 3 }, { "in": "query", "name": "include_tools", "schema": { "type": "boolean", "default": false }, "x-ref": "#/components/parameters/TranscriptReadTools", "index$": 4 }, { "in": "query", "name": "around_event", "schema": { "type": "integer", "minimum": 0 }, "description": "Cited event index, paired with event_digest and without cursor.", "x-ref": "#/components/parameters/TranscriptReadAround", "index$": 5 }, { "in": "query", "name": "event_digest", "schema": { "type": "string", "pattern": "^[0-9a-f]{64}$" }, "x-ref": "#/components/parameters/TranscriptReadDigest", "index$": 6 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "transcript.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/transcripts/search" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let transcript_ref01_data = Object.values(setup.data.existing.transcript)[0];
        // LIST
        const transcript_ref01_ent = client.Transcript();
        const transcript_ref01_match = {};
        const transcript_ref01_list = (await transcript_ref01_ent.list(transcript_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/transcript/TranscriptTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['transcript01', 'transcript02', 'transcript03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_TRANSCRIPT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_TRANSCRIPT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_TRANSCRIPT_ENTID'];
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
//# sourceMappingURL=TranscriptEntity.test.js.map