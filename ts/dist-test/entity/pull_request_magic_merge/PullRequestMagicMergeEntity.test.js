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
(0, node_test_1.describe)('PullRequestMagicMergeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.PullRequestMagicMerge();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pull_request_magic_merge.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "pull_request_magic_merge", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["expected_base_sha", "expected_head_sha"], "co": { "id": "POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/merge", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "number", "or": "number", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "pull_request_id", "or": "github_repository_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/merge", "q": { "$action": "merge", "exist": ["number", "organization_id", "pull_request_id"] }, "r": { "param": { "github_repository_id": "pull_request_id", "number": "number", "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github" }, { "lit": "pull_requests" }, { "var": "pull_request_id" }, { "var": "number" }, { "lit": "magic_merge" }, { "lit": "merge" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["idempotency_key"], "co": { "id": "POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/rebase", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "number", "or": "number", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "pull_request_id", "or": "github_repository_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/rebase", "q": { "$action": "rebase", "exist": ["number", "organization_id", "pull_request_id"] }, "r": { "param": { "github_repository_id": "pull_request_id", "number": "number", "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github" }, { "lit": "pull_requests" }, { "var": "pull_request_id" }, { "var": "number" }, { "lit": "magic_merge" }, { "lit": "rebase" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["expected_base_sha", "expected_head_sha", "mode", "resolutions"], "co": { "id": "POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/resolve", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "number", "or": "number", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "pull_request_id", "or": "github_repository_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/resolve", "q": { "$action": "resolve", "exist": ["number", "organization_id", "pull_request_id"] }, "r": { "param": { "github_repository_id": "pull_request_id", "number": "number", "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github" }, { "lit": "pull_requests" }, { "var": "pull_request_id" }, { "var": "number" }, { "lit": "magic_merge" }, { "lit": "resolve" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "pull_request_magic_merge", "name__orig": "pull_request_magic_merge", "Name": "PullRequestMagicMerge", "name_": "pull_request_magic_merge", "name-": "pull-request-magic-merge", "NAME": "PULL_REQUEST_MAGIC_MERGE", "index$": 408 }, { "active": true, "entity": "pull_request_magic_merge", "key$": "BasicPullRequestMagicMergeFlow", "kind": "basic", "name": "BasicPullRequestMagicMergeFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "pull_request_magic_merge_ref01" }, "m": { "number": "number01", "organization_id": "organization01", "pull_request_id": "pull_request01" }, "o": "create", "s": [], "v": [], "unreachable": true }] }, 'PullRequestMagicMerge', { "POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/merge": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_head_sha", "expected_base_sha"], "properties": { "expected_head_sha": { "type": "string" }, "expected_base_sha": { "type": "string" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "github_repository_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "number", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/rebase": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "idempotency_key": { "type": "string" } }, "required": ["idempotency_key"] } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "github_repository_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "number", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/resolve": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "expected_head_sha": { "type": "string" }, "expected_base_sha": { "type": "string" }, "mode": { "type": "string", "enum": ["merge", "rebase"] }, "resolutions": { "type": "array", "items": { "oneOf": [{ "type": "object", "properties": {}, "required": [] }, { "type": "object", "properties": {}, "required": [] }, { "type": "object", "properties": {}, "required": [] }] } } }, "required": ["expected_head_sha", "expected_base_sha", "mode", "resolutions"] } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "github_repository_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "number", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "pull_request_magic_merge.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/magic_merge/merge" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let pull_request_magic_merge_ref01_data = Object.values(setup.data.existing.pull_request_magic_merge)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pull_request_magic_merge/PullRequestMagicMergeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pull_request_magic_merge01', 'pull_request_magic_merge02', 'pull_request_magic_merge03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PULL_REQUEST_MAGIC_MERGE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PULL_REQUEST_MAGIC_MERGE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PULL_REQUEST_MAGIC_MERGE_ENTID'];
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
//# sourceMappingURL=PullRequestMagicMergeEntity.test.js.map