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
(0, node_test_1.describe)('RepoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Repo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Repo().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'repo.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "can_retry_import": { "a": true, "h": "Can Retry Import", "n": "can_retry_import", "r": true, "sh": "True when a failed client import can be requeued for CLI resume.", "t": "`$BOOLEAN`", "key$": "can_retry_import", "index$": 0 }, "can_retry_sync": { "a": true, "h": "Can Retry Sync", "n": "can_retry_sync", "r": true, "sh": "True when the latest sync run failed and can be retried.", "t": "`$BOOLEAN`", "key$": "can_retry_sync", "index$": 1 }, "disclaimer": { "a": true, "h": "Disclaimer", "n": "disclaimer", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "disclaimer", "index$": 2 }, "federated_in_home": { "a": true, "h": "Federated In Home", "n": "federated_in_home", "r": true, "sh": "True when this Space is a folder virtual repository inside the organization Home monorepo.", "t": "`$BOOLEAN`", "key$": "federated_in_home", "index$": 3 }, "github_repository": { "a": true, "h": "Github Repository", "n": "github_repository", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "github_repository", "index$": 4 }, "icon_name": { "a": true, "h": "Icon Name", "n": "icon_name", "r": true, "t": "`$STRING`", "key$": "icon_name", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Virtual repository public ID for non-Home rows; Home uses the physical repository public ID.", "t": "`$STRING`", "key$": "id", "index$": 6 }, "import_item_id": { "a": true, "h": "Import Item Id", "n": "import_item_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "import_item_id", "index$": 7 }, "is_home": { "a": true, "h": "Is Home", "n": "is_home", "r": true, "t": "`$BOOLEAN`", "key$": "is_home", "index$": 8 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 9 }, "remote_repository": { "a": true, "h": "Remote Repository", "n": "remote_repository", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "remote_repository", "index$": 10 }, "root_path": { "a": true, "h": "Root Path", "n": "root_path", "r": true, "sh": "Home-relative folder path when federated_in_home is true; null otherwise.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "root_path", "index$": 11 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 12 }, "sync_error_message": { "a": true, "h": "Sync Error Message", "n": "sync_error_message", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "sync_error_message", "index$": 13 }, "sync_provider": { "a": true, "h": "Sync Provider", "n": "sync_provider", "r": false, "t": "`$STRING`", "key$": "sync_provider", "index$": 14 }, "sync_status": { "a": true, "h": "Sync Status", "n": "sync_status", "r": true, "t": "`$STRING`", "key$": "sync_status", "index$": 15 } }, "id": { "field": "id", "name": "id" }, "name": "repo", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "asc", "explode": true, "k": "query", "n": "direction", "or": "direction", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "q", "or": "q", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "name", "explode": true, "k": "query", "n": "sort", "or": "sort", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos", "q": { "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }], "t": { "page": { "next": "`body.pagination.next`", "total": "`body.pagination.count`" }, "req": "`reqdata`", "res": "`body.repos`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/access", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/access", "q": { "$action": "access", "exist": ["id", "organization_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "id" }, { "lit": "pages" }, { "lit": "access" }], "t": { "req": "`reqdata`", "res": "`body.catalog`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/sync", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/sync", "q": { "$action": "sync", "exist": ["id", "organization_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "id" }, { "lit": "pages" }, { "lit": "sync" }], "t": { "req": "`reqdata`", "res": "`body.sync_targets`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "repo", "name__orig": "repo", "Name": "Repo", "name_": "repo", "name-": "repo", "NAME": "REPO", "index$": 419 }, { "active": true, "entity": "repo", "key$": "BasicRepoFlow", "kind": "basic", "name": "BasicRepoFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "repo_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "repo_ref01", "srcdatavar": "repo_ref01_data", "suffix": "_dt0" }, "m": { "id": "repo01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-repo_ref01" } }], "unreachable": true }] }, 'Repo', { "GET /api/v1/organizations/{org_slug}/repos": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "q", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "sort", "in": "query", "required": false, "schema": { "type": "string", "enum": ["name", "github"], "default": "name" }, "index$": 2 }, { "name": "direction", "in": "query", "required": false, "schema": { "type": "string", "enum": ["asc", "desc"], "default": "asc" }, "index$": 3 }, { "name": "page", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 4 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/access": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "in": "path", "name": "org_slug", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "in": "path", "name": "repo_slug", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/sync": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let repo_ref01_data = Object.values(setup.data.existing.repo)[0];
        // LIST
        const repo_ref01_ent = client.Repo();
        const repo_ref01_match = {};
        repo_ref01_match['organization_id'] = setup.idmap['organization01'];
        const repo_ref01_list = (await repo_ref01_ent.list(repo_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/repo/RepoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['repo01', 'repo02', 'repo03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_REPO_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_REPO_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_REPO_ENTID'];
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
//# sourceMappingURL=RepoEntity.test.js.map