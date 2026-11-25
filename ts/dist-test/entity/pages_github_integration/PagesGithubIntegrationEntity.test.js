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
(0, node_test_1.describe)('PagesGithubIntegrationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.PagesGithubIntegration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PagesGithubIntegration().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pages_github_integration.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "account_avatar_url": { "a": true, "fo": "uri", "h": "Account Avatar Url", "n": "account_avatar_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "account_avatar_url", "index$": 0 }, "account_login": { "a": true, "h": "Account Login", "n": "account_login", "r": true, "t": "`$STRING`", "key$": "account_login", "index$": 1 }, "connection_status": { "a": true, "h": "Connection Status", "n": "connection_status", "r": true, "t": "`$STRING`", "key$": "connection_status", "index$": 2 }, "connection_status_label": { "a": true, "h": "Connection Status Label", "n": "connection_status_label", "r": true, "t": "`$STRING`", "key$": "connection_status_label", "index$": 3 }, "github_installation": { "a": true, "h": "Github Installation", "n": "github_installation", "r": true, "t": "`$ANY`", "key$": "github_installation", "index$": 4 }, "health": { "a": true, "h": "Health", "n": "health", "r": true, "t": "`$OBJECT`", "key$": "health", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "imported_repositories_count": { "a": true, "h": "Imported Repositories Count", "n": "imported_repositories_count", "r": true, "t": "`$INTEGER`", "key$": "imported_repositories_count", "index$": 7 }, "imported_repositories_count_label": { "a": true, "h": "Imported Repositories Count Label", "n": "imported_repositories_count_label", "r": true, "t": "`$STRING`", "key$": "imported_repositories_count_label", "index$": 8 }, "organization": { "a": true, "h": "Organization", "n": "organization", "r": true, "t": "`$OBJECT`", "key$": "organization", "index$": 9 }, "pagination": { "a": true, "h": "Pagination", "n": "pagination", "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 3 }, "key$": "pagination", "index$": 10 }, "repositories": { "a": true, "h": "Repositories", "n": "repositories", "r": true, "t": "`$ARRAY`", "key$": "repositories", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "pages_github_integration", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/pages/github_integrations", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/pages/github_integrations", "q": { "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "pages" }, { "lit": "github_integrations" }], "t": { "req": "`reqdata`", "res": "`body.github_installations`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/pages/github_integrations/{github_app_installation_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "github_app_installation_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/pages/github_integrations/{github_app_installation_id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "github_app_installation_id": "id", "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "pages" }, { "lit": "github_integrations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "pages_github_integration", "name__orig": "pages_github_integration", "Name": "PagesGithubIntegration", "name_": "pages_github_integration", "name-": "pages-github-integration", "NAME": "PAGES_GITHUB_INTEGRATION", "index$": 362 }, { "active": true, "entity": "pages_github_integration", "key$": "BasicPagesGithubIntegrationFlow", "kind": "basic", "name": "BasicPagesGithubIntegrationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "pages_github_integration_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "pages_github_integration_ref01", "srcdatavar": "pages_github_integration_ref01_data", "suffix": "_dt0" }, "m": { "id": "pages_github_integration01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-pages_github_integration_ref01" } }], "index$": 1, "route": "GET /api/v1/organizations/{org_slug}/pages/github_integrations/{github_app_installation_id}", "record": {} }] }, 'PagesGithubIntegration', { "GET /api/v1/organizations/{org_slug}/pages/github_integrations": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{org_slug}/pages/github_integrations/{github_app_installation_id}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "github_app_installation_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "page", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let pages_github_integration_ref01_data = Object.values(setup.data.existing.pages_github_integration)[0];
        // LIST
        const pages_github_integration_ref01_ent = client.PagesGithubIntegration();
        const pages_github_integration_ref01_match = {};
        pages_github_integration_ref01_match['organization_id'] = setup.idmap['organization01'];
        const pages_github_integration_ref01_list = (await pages_github_integration_ref01_ent.list(pages_github_integration_ref01_match)).map((e) => e.data());
        // LOAD
        const pages_github_integration_ref01_match_dt0 = {};
        pages_github_integration_ref01_match_dt0.id = pages_github_integration_ref01_data.id;
        pages_github_integration_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const pages_github_integration_ref01_data_dt0 = (await pages_github_integration_ref01_ent.load(pages_github_integration_ref01_match_dt0)).data();
        (0, node_assert_1.default)(pages_github_integration_ref01_data_dt0.id === pages_github_integration_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pages_github_integration/PagesGithubIntegrationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pages_github_integration01', 'pages_github_integration02', 'pages_github_integration03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PAGES_GITHUB_INTEGRATION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PAGES_GITHUB_INTEGRATION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PAGES_GITHUB_INTEGRATION_ENTID'];
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
//# sourceMappingURL=PagesGithubIntegrationEntity.test.js.map