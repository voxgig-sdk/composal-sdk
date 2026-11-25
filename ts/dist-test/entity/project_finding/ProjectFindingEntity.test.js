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
(0, node_test_1.describe)('ProjectFindingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ProjectFinding();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ProjectFinding().list({ "organization_id": 1, "project_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project_finding.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "deferred_until": { "a": true, "fo": "date-time", "h": "Deferred Until", "n": "deferred_until", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "deferred_until", "index$": 0 }, "environment_name": { "a": true, "h": "Environment Name", "n": "environment_name", "r": true, "t": "`$STRING`", "key$": "environment_name", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 2 }, "last_seen_at": { "a": true, "fo": "date-time", "h": "Last Seen At", "n": "last_seen_at", "r": true, "t": "`$STRING`", "key$": "last_seen_at", "index$": 3 }, "locked": { "a": true, "h": "Locked", "n": "locked", "r": true, "sh": "True for a locked finding of the workspace's included scan before it pays.", "t": "`$BOOLEAN`", "key$": "locked", "index$": 4 }, "severity": { "a": true, "h": "Severity", "n": "severity", "r": true, "t": "`$STRING`", "key$": "severity", "index$": 5 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "sh": "The workflow that produced the finding", "t": "`$STRING`", "key$": "source", "index$": 6 }, "source_title": { "a": true, "h": "Source Title", "n": "source_title", "r": true, "sh": "The scenario, Discovery or Deep Scan that produced the finding", "t": "`$STRING`", "key$": "source_title", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 8 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 9 }, "verification": { "a": true, "h": "Verification", "n": "verification", "r": true, "sh": "Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it.", "t": "`$ANY`", "key$": "verification", "index$": 10 }, "web_path": { "a": true, "h": "Web Path", "n": "web_path", "r": true, "sh": "Where the finding is reviewed within its source", "t": "`$STRING`", "key$": "web_path", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "project_finding", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/findings", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "priority", "or": "priority", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "run_id", "or": "run_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "source", "or": "source", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "state", "or": "state", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/findings", "q": { "exist": ["organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "pages" }, { "lit": "findings" }], "t": { "page": { "next": "`body.pagination.next`", "total": "`body.pagination.count`" }, "req": "`reqdata`", "res": "`body.findings`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "project_finding", "name__orig": "project_finding", "Name": "ProjectFinding", "name_": "project_finding", "name-": "project-finding", "NAME": "PROJECT_FINDING", "index$": 392 }, { "active": true, "entity": "project_finding", "key$": "BasicProjectFindingFlow", "kind": "basic", "name": "BasicProjectFindingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "project_id": "project01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "project_finding_ref01" } }], "index$": 0 }] }, 'ProjectFinding', { "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/findings": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "state", "in": "query", "description": "Active by default; deferred lists postponed issues; closed lists resolved and ignored ones", "schema": { "type": "string", "enum": ["active", "closed", "deferred"] }, "index$": 2 }, { "name": "query", "in": "query", "description": "Search finding titles and summaries; counts reflect the search across all pages", "schema": { "type": "string", "maxLength": 200 }, "index$": 3 }, { "name": "source", "in": "query", "description": "Workflow that reported the finding, including earlier sightings", "schema": { "type": "string", "enum": ["all", "scenario_run", "exploration", "deep_scan"] }, "index$": 4 }, { "name": "run_id", "in": "query", "description": "Discovery, Deep Scan or scenario execution public ID", "schema": { "type": "string" }, "index$": 5 }, { "name": "priority", "in": "query", "schema": { "type": "string", "enum": ["all", "P0", "P1", "P2", "P3", "P4"] }, "index$": 6 }, { "name": "page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 7 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let project_finding_ref01_data = Object.values(setup.data.existing.project_finding)[0];
        // LIST
        const project_finding_ref01_ent = client.ProjectFinding();
        const project_finding_ref01_match = {};
        project_finding_ref01_match['organization_id'] = setup.idmap['organization01'];
        project_finding_ref01_match['project_id'] = setup.idmap['project01'];
        const project_finding_ref01_list = (await project_finding_ref01_ent.list(project_finding_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project_finding/ProjectFindingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project_finding01', 'project_finding02', 'project_finding03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PROJECT_FINDING_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PROJECT_FINDING_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PROJECT_FINDING_ENTID'];
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
//# sourceMappingURL=ProjectFindingEntity.test.js.map