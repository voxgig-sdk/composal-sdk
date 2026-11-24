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
(0, node_test_1.describe)('ProjectOverviewPullRequestEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ProjectOverviewPullRequest();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ProjectOverviewPullRequest().list({ "organization_id": 1, "project_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project_overview_pull_request.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "base_sha": { "a": true, "h": "Base Sha", "n": "base_sha", "r": true, "t": "`$STRING`", "key$": "base_sha", "index$": 0 }, "can_verify": { "a": true, "h": "Can Verify", "n": "can_verify", "r": true, "t": "`$BOOLEAN`", "key$": "can_verify", "index$": 1 }, "comment_url": { "a": true, "h": "Comment Url", "n": "comment_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "comment_url", "index$": 2 }, "draft": { "a": true, "h": "Draft", "n": "draft", "r": true, "t": "`$BOOLEAN`", "key$": "draft", "index$": 3 }, "github_repository": { "a": true, "h": "Github Repository", "n": "github_repository", "r": true, "sh": "GitHub owner/repository associated with this pull request.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "github_repository", "index$": 4 }, "github_url": { "a": true, "h": "Github Url", "n": "github_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "github_url", "index$": 5 }, "head_sha": { "a": true, "h": "Head Sha", "n": "head_sha", "r": true, "t": "`$STRING`", "key$": "head_sha", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 7 }, "latest_created_at": { "a": true, "fo": "date-time", "h": "Latest Created At", "n": "latest_created_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "latest_created_at", "index$": 8 }, "latest_current": { "a": true, "h": "Latest Current", "n": "latest_current", "r": true, "t": "`$BOOLEAN`", "key$": "latest_current", "index$": 9 }, "latest_head_sha": { "a": true, "h": "Latest Head Sha", "n": "latest_head_sha", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "latest_head_sha", "index$": 10 }, "latest_reason": { "a": true, "h": "Latest Reason", "n": "latest_reason", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "latest_reason", "index$": 11 }, "latest_run_id": { "a": true, "h": "Latest Run Id", "n": "latest_run_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "latest_run_id", "index$": 12 }, "latest_state": { "a": true, "h": "Latest State", "n": "latest_state", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "latest_state", "index$": 13 }, "number": { "a": true, "h": "Number", "n": "number", "r": true, "t": "`$INTEGER`", "key$": "number", "index$": 14 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "project_id", "index$": 15 }, "project_slug": { "a": true, "h": "Project Slug", "n": "project_slug", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "project_slug", "index$": 16 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": true, "t": "`$STRING`", "key$": "provider", "index$": 17 }, "repository_id": { "a": true, "h": "Repository Id", "n": "repository_id", "r": true, "t": "`$STRING`", "key$": "repository_id", "index$": 18 }, "request_label": { "a": true, "h": "Request Label", "n": "request_label", "r": true, "t": "`$STRING`", "key$": "request_label", "index$": 19 }, "source_branch": { "a": true, "h": "Source Branch", "n": "source_branch", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_branch", "index$": 20 }, "source_repository": { "a": true, "h": "Source Repository", "n": "source_repository", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_repository", "index$": 21 }, "source_url": { "a": true, "h": "Source Url", "n": "source_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_url", "index$": 22 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "t": "`$STRING`", "key$": "state", "index$": 23 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 24 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 25 }, "web_path": { "a": true, "h": "Web Path", "n": "web_path", "r": true, "t": "`$STRING`", "key$": "web_path", "index$": 26 } }, "id": { "field": "id", "name": "id" }, "name": "project_overview_pull_request", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_pull_requests", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_pull_requests", "q": { "exist": ["organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "pages" }, { "lit": "overview_pull_requests" }], "t": { "req": "`reqdata`", "res": "`body.pull_requests`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "project_overview_pull_request", "name__orig": "project_overview_pull_request", "Name": "ProjectOverviewPullRequest", "name_": "project_overview_pull_request", "name-": "project-overview-pull-request", "NAME": "PROJECT_OVERVIEW_PULL_REQUEST", "index$": 400 }, { "active": true, "entity": "project_overview_pull_request", "key$": "BasicProjectOverviewPullRequestFlow", "kind": "basic", "name": "BasicProjectOverviewPullRequestFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "project_id": "project01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "project_overview_pull_request_ref01" } }], "index$": 0 }] }, 'ProjectOverviewPullRequest', { "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/overview_pull_requests": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let project_overview_pull_request_ref01_data = Object.values(setup.data.existing.project_overview_pull_request)[0];
        // LIST
        const project_overview_pull_request_ref01_ent = client.ProjectOverviewPullRequest();
        const project_overview_pull_request_ref01_match = {};
        project_overview_pull_request_ref01_match['organization_id'] = setup.idmap['organization01'];
        project_overview_pull_request_ref01_match['project_id'] = setup.idmap['project01'];
        const project_overview_pull_request_ref01_list = (await project_overview_pull_request_ref01_ent.list(project_overview_pull_request_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project_overview_pull_request/ProjectOverviewPullRequestTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project_overview_pull_request01', 'project_overview_pull_request02', 'project_overview_pull_request03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PROJECT_OVERVIEW_PULL_REQUEST_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PROJECT_OVERVIEW_PULL_REQUEST_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PROJECT_OVERVIEW_PULL_REQUEST_ENTID'];
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
//# sourceMappingURL=ProjectOverviewPullRequestEntity.test.js.map