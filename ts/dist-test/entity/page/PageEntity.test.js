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
(0, node_test_1.describe)('PageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Page();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Page().load({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'page.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_runs": { "a": true, "h": "Active Runs", "n": "active_runs", "r": true, "t": "`$ARRAY`", "key$": "active_runs", "index$": 0 }, "checkout_required": { "a": true, "h": "Checkout Required", "n": "checkout_required", "r": true, "t": "`$BOOLEAN`", "key$": "checkout_required", "index$": 1 }, "cli_signed_in_at": { "a": true, "fo": "date-time", "h": "Cli Signed In At", "n": "cli_signed_in_at", "r": true, "sh": "When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "cli_signed_in_at", "index$": 2 }, "counts": { "a": true, "h": "Counts", "n": "counts", "r": true, "t": "`$OBJECT`", "key$": "counts", "index$": 3 }, "demo_project": { "a": true, "h": "Demo Project", "n": "demo_project", "r": true, "sh": "The workspace's copy of the demo project, which setup offers as example data.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "demo_project", "index$": 4 }, "environments": { "a": true, "h": "Environments", "n": "environments", "r": true, "t": "`$ARRAY`", "key$": "environments", "index$": 5 }, "included_deep_scan": { "a": true, "h": "Included Deep Scan", "n": "included_deep_scan", "r": true, "sh": "Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app.", "t": "`$BOOLEAN`", "key$": "included_deep_scan", "index$": 6 }, "onboarding_discovery": { "a": true, "h": "Onboarding Discovery", "n": "onboarding_discovery", "r": false, "t": "`$ANY`", "key$": "onboarding_discovery", "index$": 7 }, "organization": { "a": true, "h": "Organization", "n": "organization", "r": true, "t": "`$OBJECT`", "key$": "organization", "index$": 8 }, "permissions": { "a": true, "h": "Permissions", "n": "permissions", "r": true, "t": "`$OBJECT`", "key$": "permissions", "index$": 9 }, "project": { "a": true, "h": "Project", "n": "project", "r": true, "sh": "The project the page is limited to, or null for the whole organization.", "t": "`$ANY`", "key$": "project", "index$": 10 }, "pull_request_launch_options": { "a": true, "h": "Pull Request Launch Options", "n": "pull_request_launch_options", "r": false, "t": "`$ARRAY`", "key$": "pull_request_launch_options", "index$": 11 }, "pull_requests": { "a": true, "h": "Pull Requests", "n": "pull_requests", "r": false, "t": "`$ARRAY`", "key$": "pull_requests", "index$": 12 }, "repositories": { "a": true, "h": "Repositories", "n": "repositories", "r": true, "t": "`$ARRAY`", "key$": "repositories", "index$": 13 }, "runs": { "a": true, "h": "Runs", "n": "runs", "r": true, "t": "`$ARRAY`", "key$": "runs", "index$": 14 }, "runs_pagination": { "a": true, "h": "Runs Pagination", "n": "runs_pagination", "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 3 }, "key$": "runs_pagination", "index$": 15 }, "suggested_app_url": { "a": true, "h": "Suggested App Url", "n": "suggested_app_url", "r": true, "sh": "The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "suggested_app_url", "index$": 16 }, "url_first_start": { "a": true, "h": "Url First Start", "n": "url_first_start", "r": true, "sh": "Whether setup opens on the URL-first screen, which saves the app and asks for test access next.", "t": "`$BOOLEAN`", "key$": "url_first_start", "index$": 17 } }, "name": "page", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/page", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "section", "or": "section", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "status", "or": "status", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "verify_environment_id", "or": "verify_environment_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/page", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "page" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "page", "name__orig": "page", "Name": "Page", "name_": "page", "name-": "page", "NAME": "PAGE", "index$": 359 }, { "active": true, "entity": "page", "key$": "BasicPageFlow", "kind": "basic", "name": "BasicPageFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "page_ref01", "srcdatavar": "page_ref01_data", "suffix": "_dt0" }, "m": { "id": "page01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-page_ref01" } }], "unreachable": true }] }, 'Page', { "GET /api/v1/organizations/{organization_id}/verify/page": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page", "in": "query", "schema": { "type": "integer", "minimum": 1 }, "index$": 1 }, { "name": "section", "in": "query", "schema": { "type": "string", "enum": ["runs", "environments"] }, "index$": 2 }, { "name": "verify_environment_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "project_id", "in": "query", "description": "Limits the page to one project, by slug or public ID.", "schema": { "type": "string" }, "index$": 4 }, { "name": "query", "in": "query", "schema": { "type": "string", "maxLength": 200 }, "index$": 5 }, { "name": "status", "in": "query", "schema": { "type": "string", "enum": ["all", "active", "passed", "failed", "cancelled", "timed_out", "blocked", "skipped", "cleanup_blocked"] }, "index$": 6 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let page_ref01_data = Object.values(setup.data.existing.page)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/page/PageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['page01', 'page02', 'page03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PAGE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PAGE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PAGE_ENTID'];
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
//# sourceMappingURL=PageEntity.test.js.map