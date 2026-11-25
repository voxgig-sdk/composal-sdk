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
(0, node_test_1.describe)('GithubAppInstallationAuthorizationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.GithubAppInstallationAuthorization();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.GithubAppInstallationAuthorization().create({ "organization_slug": 1, "return_target": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'github_app_installation_authorization.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "installation_url": { "a": true, "fo": "uri", "h": "Installation Url", "n": "installation_url", "r": true, "t": "`$STRING`", "key$": "installation_url", "index$": 0 }, "organization_slug": { "a": true, "h": "Organization Slug", "n": "organization_slug", "r": true, "sh": "Vex organization slug whose installation will be linked.", "t": "`$STRING`", "key$": "organization_slug", "index$": 1 }, "return_target": { "a": true, "h": "Return Target", "n": "return_target", "r": true, "sh": "Server-validated Vex application target used after verification.", "t": "`$STRING`", "key$": "return_target", "index$": 2 } }, "name": "github_app_installation_authorization", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["organization_slug", "return_target"], "co": { "id": "POST /api/v1/github_app/installation_authorizations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/github_app/installation_authorizations", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "github_app" }, { "lit": "installation_authorizations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["code", "error", "state"], "co": { "id": "POST /api/v1/github_app/installation_authorizations/complete", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/github_app/installation_authorizations/complete", "q": { "$action": "complete" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "github_app" }, { "lit": "installation_authorizations" }, { "lit": "complete" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["installation_id", "setup_action", "state"], "co": { "id": "POST /api/v1/github_app/installation_authorizations/setup", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/github_app/installation_authorizations/setup", "q": { "$action": "setup" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "github_app" }, { "lit": "installation_authorizations" }, { "lit": "setup" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" } }, "relations": { "ancestors": [] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "github_app_installation_authorization", "name__orig": "github_app_installation_authorization", "Name": "GithubAppInstallationAuthorization", "name_": "github_app_installation_authorization", "name-": "github-app-installation-authorization", "NAME": "GITHUB_APP_INSTALLATION_AUTHORIZATION", "index$": 251 }, { "active": true, "entity": "github_app_installation_authorization", "key$": "BasicGithubAppInstallationAuthorizationFlow", "kind": "basic", "name": "BasicGithubAppInstallationAuthorizationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "github_app_installation_authorization_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'GithubAppInstallationAuthorization', { "POST /api/v1/github_app/installation_authorizations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["organization_slug", "return_target"], "properties": { "organization_slug": { "type": "string", "description": "Vex organization slug whose installation will be linked.", "key$": "organization_slug" }, "return_target": { "type": "string", "description": "Server-validated Vex application target used after verification.", "key$": "return_target" } } } } } }, "parameters": [] }, "POST /api/v1/github_app/installation_authorizations/complete": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["state"], "properties": { "code": { "type": "string", "description": "GitHub App user authorization code when authorization succeeds." }, "error": { "type": "string", "description": "GitHub OAuth error when the user denies or cannot grant authorization." }, "state": { "type": "string", "description": "Opaque one-time verification state returned by GitHub OAuth." } } } } } }, "parameters": [] }, "POST /api/v1/github_app/installation_authorizations/setup": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["installation_id", "setup_action", "state"], "properties": { "installation_id": { "type": "string" }, "setup_action": { "type": "string", "enum": ["install", "update"] }, "state": { "type": "string", "description": "Opaque one-time state returned in the GitHub Setup URL callback." } } } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "github_app_installation_authorization.create.0": "GET-only live run: needs POST /api/v1/github_app/installation_authorizations" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const github_app_installation_authorization_ref01_ent = client.GithubAppInstallationAuthorization();
        let github_app_installation_authorization_ref01_data = setup.data.new.github_app_installation_authorization['github_app_installation_authorization_ref01'];
        github_app_installation_authorization_ref01_data = (await github_app_installation_authorization_ref01_ent.create(github_app_installation_authorization_ref01_data)).data();
        (0, node_assert_1.default)(null != github_app_installation_authorization_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/github_app_installation_authorization/GithubAppInstallationAuthorizationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['github_app_installation_authorization01', 'github_app_installation_authorization02', 'github_app_installation_authorization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_GITHUB_APP_INSTALLATION_AUTHORIZATION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_GITHUB_APP_INSTALLATION_AUTHORIZATION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_GITHUB_APP_INSTALLATION_AUTHORIZATION_ENTID'];
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
//# sourceMappingURL=GithubAppInstallationAuthorizationEntity.test.js.map