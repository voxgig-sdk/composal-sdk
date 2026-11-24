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
(0, node_test_1.describe)('GitlabEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Gitlab();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Gitlab().load({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'gitlab.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "configured": { "a": true, "h": "Configured", "n": "configured", "r": true, "t": "`$BOOLEAN`", "key$": "configured", "index$": 0 }, "connections": { "a": true, "h": "Connections", "n": "connections", "r": true, "t": "`$ARRAY`", "key$": "connections", "index$": 1 }, "integrations": { "a": true, "h": "Integrations", "n": "integrations", "r": true, "t": "`$ARRAY`", "key$": "integrations", "index$": 2 }, "inventory_error": { "a": true, "h": "Inventory Error", "n": "inventory_error", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "inventory_error", "index$": 3 }, "next_page": { "a": true, "h": "Next Page", "n": "next_page", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "next_page", "index$": 4 }, "organization": { "a": true, "h": "Organization", "n": "organization", "r": true, "t": "`$OBJECT`", "key$": "organization", "index$": 5 }, "projects": { "a": true, "h": "Projects", "n": "projects", "r": true, "t": "`$ARRAY`", "key$": "projects", "index$": 6 }, "redirect_uri": { "a": true, "h": "Redirect Uri", "n": "redirect_uri", "r": true, "sh": "The OAuth redirect URI a self-managed GitLab application must use; null when GitLab callbacks aren't configured.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "redirect_uri", "index$": 7 }, "selected_integration_id": { "a": true, "h": "Selected Integration Id", "n": "selected_integration_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "selected_integration_id", "index$": 8 } }, "name": "gitlab", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["client_id", "client_secret", "instance_url", "integration_id", "return_target", "webhook_authentication"], "co": { "id": "POST /api/v1/organizations/{org_slug}/gitlab/authorize", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/gitlab/authorize", "q": { "$action": "authorize", "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "gitlab" }, { "lit": "authorize" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/gitlab", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "connection_id", "or": "connection_ids", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "integration_id", "or": "integration_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "search", "or": "search", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "sort", "or": "sort", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/gitlab", "q": { "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "gitlab" }], "t": { "req": "`reqdata`", "res": "`body.connections`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "gitlab", "name__orig": "gitlab", "Name": "Gitlab", "name_": "gitlab", "name-": "gitlab", "NAME": "GITLAB", "index$": 272 }, { "active": true, "entity": "gitlab", "key$": "BasicGitlabFlow", "kind": "basic", "name": "BasicGitlabFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "gitlab_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "gitlab_ref01", "srcdatavar": "gitlab_ref01_data", "suffix": "_dt0" }, "m": { "id": "gitlab01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-gitlab_ref01" } }], "unreachable": true }] }, 'Gitlab', { "POST /api/v1/organizations/{org_slug}/gitlab/authorize": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "integration_id": { "type": "string" }, "instance_url": { "type": "string" }, "client_id": { "type": "string" }, "client_secret": { "type": "string" }, "webhook_authentication": { "type": "string" }, "return_target": { "type": "string", "description": "Return to this first-run wizard path (`<org>/verify/start/<app id>`) after GitLab sign-in." } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{org_slug}/gitlab": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page", "in": "query", "schema": { "type": "integer" }, "index$": 1 }, { "name": "search", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "integration_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "connection_ids", "in": "query", "schema": { "type": "string" }, "description": "Comma-separated import connection IDs to resume; scoped to this organization.", "index$": 4 }, { "name": "sort", "in": "query", "schema": { "type": "string", "enum": ["newest", "alphabetical"] }, "index$": 5 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "gitlab.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/gitlab/authorize" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let gitlab_ref01_data = Object.values(setup.data.existing.gitlab)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/gitlab/GitlabTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['gitlab01', 'gitlab02', 'gitlab03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_GITLAB_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_GITLAB_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_GITLAB_ENTID'];
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
//# sourceMappingURL=GitlabEntity.test.js.map