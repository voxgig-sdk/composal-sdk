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
(0, node_test_1.describe)('DeepScanFindingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.DeepScanFinding();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DeepScanFinding().list({ "deep_scan_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'deep_scan_finding.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "actual": { "a": true, "h": "Actual", "n": "actual", "r": true, "t": "`$STRING`", "key$": "actual", "index$": 0 }, "agent_id": { "a": true, "h": "Agent Id", "n": "agent_id", "r": true, "t": "`$STRING`", "key$": "agent_id", "index$": 1 }, "agent_title": { "a": true, "h": "Agent Title", "n": "agent_title", "r": true, "t": "`$STRING`", "key$": "agent_title", "index$": 2 }, "area": { "a": true, "h": "Area", "n": "area", "r": false, "sh": "On a locked finding, the first segment of the page it was seen on, such as Billing.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "area", "index$": 3 }, "checks": { "a": true, "h": "Checks", "n": "checks", "r": true, "sh": "Checks in the same tester report that this finding cites.", "t": "`$ARRAY`", "key$": "checks", "index$": 4 }, "confidence": { "a": true, "h": "Confidence", "n": "confidence", "r": true, "t": "`$STRING`", "key$": "confidence", "index$": 5 }, "confirmed": { "a": true, "h": "Confirmed", "n": "confirmed", "r": false, "sh": "On a locked finding, whether the automatic review confirmed it.", "t": "`$BOOLEAN`", "key$": "confirmed", "index$": 6 }, "evidence_step_ids": { "a": true, "h": "Evidence Step Ids", "n": "evidence_step_ids", "r": false, "t": "`$ARRAY`", "key$": "evidence_step_ids", "index$": 7 }, "evidence_timestamp_ms": { "a": true, "h": "Evidence Timestamp Ms", "n": "evidence_timestamp_ms", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "evidence_timestamp_ms", "index$": 8 }, "expected": { "a": true, "h": "Expected", "n": "expected", "r": true, "t": "`$STRING`", "key$": "expected", "index$": 9 }, "fix_prompt": { "a": true, "h": "Fix Prompt", "n": "fix_prompt", "r": true, "sh": "A coding-agent prompt for this finding alone", "t": "`$STRING`", "key$": "fix_prompt", "index$": 10 }, "has_recording": { "a": true, "h": "Has Recording", "n": "has_recording", "r": false, "sh": "On a locked finding, whether the tester recorded evidence for it.", "t": "`$BOOLEAN`", "key$": "has_recording", "index$": 11 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 12 }, "locked": { "a": true, "h": "Locked", "n": "locked", "r": true, "sh": "True for a locked finding of the workspace's included scan before it pays.", "t": "`$BOOLEAN`", "key$": "locked", "index$": 13 }, "reproduction_steps": { "a": true, "h": "Reproduction Steps", "n": "reproduction_steps", "r": true, "t": "`$ARRAY`", "key$": "reproduction_steps", "index$": 14 }, "severity": { "a": true, "h": "Severity", "n": "severity", "r": true, "t": "`$STRING`", "key$": "severity", "index$": 15 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 16 }, "tracked": { "a": true, "h": "Tracked", "n": "tracked", "r": true, "sh": "The finding record to resolve or ignore; null until the tester finishes.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "tracked", "index$": 17 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "t": "`$STRING`", "key$": "url", "index$": 18 } }, "id": { "field": "id", "name": "id" }, "name": "deep_scan_finding", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "deep_scan_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "priority", "or": "priority", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings", "q": { "exist": ["deep_scan_id", "organization_id"] }, "r": { "param": { "id": "deep_scan_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "deep_scans" }, { "var": "deep_scan_id" }, { "lit": "findings" }], "t": { "req": "`reqdata`", "res": "`body.findings`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.deep_scan"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "deep_scan_finding", "name__orig": "deep_scan_finding", "Name": "DeepScanFinding", "name_": "deep_scan_finding", "name-": "deep-scan-finding", "NAME": "DEEP_SCAN_FINDING", "index$": 194 }, { "active": true, "entity": "deep_scan_finding", "key$": "BasicDeepScanFindingFlow", "kind": "basic", "name": "BasicDeepScanFindingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "deep_scan_id": "deep_scan01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "deep_scan_finding_ref01" } }], "index$": 0 }] }, 'DeepScanFinding', { "GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "project_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "priority", "in": "query", "description": "List only findings at this priority. Ignored when the scan has none at it.", "schema": { "type": "string", "enum": ["high", "medium", "low"] }, "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let deep_scan_finding_ref01_data = Object.values(setup.data.existing.deep_scan_finding)[0];
        // LIST
        const deep_scan_finding_ref01_ent = client.DeepScanFinding();
        const deep_scan_finding_ref01_match = {};
        deep_scan_finding_ref01_match['deep_scan_id'] = setup.idmap['deep_scan01'];
        deep_scan_finding_ref01_match['organization_id'] = setup.idmap['organization01'];
        const deep_scan_finding_ref01_list = (await deep_scan_finding_ref01_ent.list(deep_scan_finding_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/deep_scan_finding/DeepScanFindingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['deep_scan_finding01', 'deep_scan_finding02', 'deep_scan_finding03', 'organization01', 'organization02', 'organization03', 'deep_scan01', 'deep_scan02', 'deep_scan03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_DEEP_SCAN_FINDING_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_DEEP_SCAN_FINDING_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_DEEP_SCAN_FINDING_ENTID'];
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
//# sourceMappingURL=DeepScanFindingEntity.test.js.map