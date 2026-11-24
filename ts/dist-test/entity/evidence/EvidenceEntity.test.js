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
(0, node_test_1.describe)('EvidenceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Evidence();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Evidence().load({ "id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'evidence.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "evidence", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/evidence/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/evidence/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "evidence" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/evidence/archive", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "scenario_run_id", "or": "scenario_run_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/evidence/archive", "q": { "$action": "archive", "exist": ["organization_id", "scenario_run_id"] }, "r": {}, "rs": { "alternatives": [{ "binary": true, "kind": "raw", "media": "application/zip" }], "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "evidence" }, { "lit": "archive" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/evidence/{id}/download", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "range", "or": "Range", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "inline", "or": "inline", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/evidence/{id}/download", "q": { "$action": "download", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "binary": true, "kind": "raw", "media": "application/octet-stream" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "evidence" }, { "var": "id" }, { "lit": "download" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/evidence", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "agent_id", "or": "agent_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "exploration_id", "or": "exploration_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "kind", "or": "kind", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "repository_id", "or": "repository_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "scenario_run_id", "or": "scenario_run_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/evidence", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "evidence" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "evidence", "name__orig": "evidence", "Name": "Evidence", "name_": "evidence", "name-": "evidence", "NAME": "EVIDENCE", "index$": 112 }, { "active": true, "entity": "evidence", "key$": "BasicEvidenceFlow", "kind": "basic", "name": "BasicEvidenceFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "evidence_ref01", "srcdatavar": "evidence_ref01_data", "suffix": "_dt0" }, "m": { "id": "evidence01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-evidence_ref01" } }], "unreachable": true }] }, 'Evidence', { "GET /api/v1/organizations/{organization_id}/verify/evidence/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verify/evidence/archive": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "scenario_run_id", "in": "query", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verify/evidence/{id}/download": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "inline", "in": "query", "schema": { "type": "boolean" }, "index$": 2 }, { "name": "Range", "in": "header", "schema": { "type": "string" }, "index$": 3 }] }, "GET /api/v1/organizations/{organization_id}/verify/evidence": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "scenario_run_id", "in": "query", "description": "Only evidence from this scenario run", "schema": { "type": "string" }, "index$": 1 }, { "name": "repository_id", "in": "query", "description": "Only evidence from scenario runs of projects linked to this repository", "schema": { "type": "string" }, "index$": 2 }, { "name": "exploration_id", "in": "query", "description": "Only evidence captured by agents of this exploration", "schema": { "type": "string" }, "index$": 3 }, { "name": "agent_id", "in": "query", "description": "Only evidence captured by this exploration agent", "schema": { "type": "string" }, "index$": 4 }, { "name": "kind", "in": "query", "description": "Only evidence of this kind", "schema": { "type": "string", "enum": ["screenshot", "video_segment", "dom_snapshot", "accessibility_snapshot", "console_log", "network_summary", "trace_reference", "metric_snapshot", "agent_event", "report"] }, "index$": 5 }, { "name": "cursor", "in": "query", "description": "next_cursor from the previous page", "schema": { "type": "string" }, "index$": 6 }, { "name": "limit", "in": "query", "description": "Items per page, 1 to 100 (default 50)", "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 7 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let evidence_ref01_data = Object.values(setup.data.existing.evidence)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/evidence/EvidenceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['evidence01', 'evidence02', 'evidence03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_EVIDENCE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_EVIDENCE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_EVIDENCE_ENTID'];
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
//# sourceMappingURL=EvidenceEntity.test.js.map