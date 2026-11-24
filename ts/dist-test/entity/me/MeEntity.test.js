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
(0, node_test_1.describe)('MeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Me();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Me().load({ "analytics_distinct_id": 1, "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'me.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_organization": { "a": true, "h": "Active Organization", "n": "active_organization", "r": true, "t": "`$ANY`", "key$": "active_organization", "index$": 0 }, "analytics_distinct_id": { "a": true, "h": "Analytics Distinct Id", "n": "analytics_distinct_id", "r": false, "t": "`$STRING`", "key$": "analytics_distinct_id", "index$": 1 }, "analytics_internal": { "a": true, "h": "Analytics Internal", "n": "analytics_internal", "r": true, "sh": "Staff, team or test account; its product analytics are marked internal.", "t": "`$BOOLEAN`", "key$": "analytics_internal", "index$": 2 }, "api_base_url": { "a": true, "fo": "uri", "h": "Api Base Url", "n": "api_base_url", "r": false, "t": "`$STRING`", "key$": "api_base_url", "index$": 3 }, "api_token": { "a": true, "h": "Api Token", "n": "api_token", "r": false, "t": "`$STRING`", "key$": "api_token", "index$": 4 }, "app_promotion": { "a": true, "h": "App Promotion", "n": "app_promotion", "r": true, "t": "`$OBJECT`", "key$": "app_promotion", "index$": 5 }, "commit_author_email": { "a": true, "fo": "email", "h": "Commit Author Email", "n": "commit_author_email", "r": true, "t": "`$STRING`", "key$": "commit_author_email", "index$": 6 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": true, "t": "`$STRING`", "key$": "email", "index$": 7 }, "enabled_features": { "a": true, "h": "Enabled Features", "n": "enabled_features", "r": true, "t": "`$ARRAY`", "key$": "enabled_features", "index$": 8 }, "github_pr_user_authorization_connected": { "a": true, "h": "Github Pr User Authorization Connected", "n": "github_pr_user_authorization_connected", "r": true, "t": "`$BOOLEAN`", "key$": "github_pr_user_authorization_connected", "index$": 9 }, "github_pr_user_authorization_login": { "a": true, "h": "Github Pr User Authorization Login", "n": "github_pr_user_authorization_login", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "github_pr_user_authorization_login", "index$": 10 }, "github_prs_authored_by_change_author": { "a": true, "h": "Github Prs Authored By Change Author", "n": "github_prs_authored_by_change_author", "r": true, "t": "`$BOOLEAN`", "key$": "github_prs_authored_by_change_author", "index$": 11 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 12 }, "impersonation": { "a": true, "h": "Impersonation", "n": "impersonation", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "impersonation", "index$": 13 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "name", "index$": 14 }, "next_path": { "a": true, "h": "Next Path", "n": "next_path", "r": false, "sh": "Present on a sign-in that created the person's first workspace; its setup page, where they go next.", "t": "`$STRING`", "key$": "next_path", "index$": 15 }, "onboarding": { "a": true, "h": "Onboarding", "n": "onboarding", "r": true, "sh": "V2 agent onboarding progress.", "t": "`$OBJECT`", "key$": "onboarding", "index$": 16 }, "openai_sign_in_connected": { "a": true, "h": "Openai Sign In Connected", "n": "openai_sign_in_connected", "r": false, "t": "`$BOOLEAN`", "key$": "openai_sign_in_connected", "index$": 17 }, "openai_sign_in_enabled": { "a": true, "h": "Openai Sign In Enabled", "n": "openai_sign_in_enabled", "r": false, "t": "`$BOOLEAN`", "key$": "openai_sign_in_enabled", "index$": 18 }, "organizations": { "a": true, "h": "Organizations", "n": "organizations", "r": true, "t": "`$ARRAY`", "key$": "organizations", "index$": 19 }, "pending_organization_invitation_count": { "a": true, "h": "Pending Organization Invitation Count", "n": "pending_organization_invitation_count", "r": true, "t": "`$INTEGER`", "key$": "pending_organization_invitation_count", "index$": 20 }, "pending_organization_invitation_count_label": { "a": true, "h": "Pending Organization Invitation Count Label", "n": "pending_organization_invitation_count_label", "r": true, "t": "`$STRING`", "key$": "pending_organization_invitation_count_label", "index$": 21 }, "picture_url": { "a": true, "h": "Picture Url", "n": "picture_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "picture_url", "index$": 22 }, "superadmin": { "a": true, "h": "Superadmin", "n": "superadmin", "r": false, "sh": "Present and true only for Composal staff superadmins, not while impersonating.", "t": "`$BOOLEAN`", "key$": "superadmin", "index$": 23 }, "time_zone": { "a": true, "h": "Time Zone", "n": "time_zone", "r": false, "sh": "The IANA zone the person chose for their agents' replies; null follows their app.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "time_zone", "index$": 24 } }, "id": { "field": "id", "name": "id" }, "name": "me", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["confirmation"], "co": { "id": "POST /api/v1/me/account_deletion", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/me/account_deletion", "q": { "$action": "account_deletion" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }, { "lit": "account_deletion" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["action_name"], "co": { "id": "POST /api/v1/me/app_promotion", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/me/app_promotion", "q": { "$action": "app_promotion" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }, { "lit": "app_promotion" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/me", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/me", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/me/account_deletion", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/me/account_deletion", "q": { "$action": "account_deletion" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }, { "lit": "account_deletion" }], "t": { "req": "`reqdata`", "res": "`body.request`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/v1/me/landing", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "organization_slug", "or": "organization_slug", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/me/landing", "q": { "$action": "landing" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }, { "lit": "landing" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /api/v1/me/workspace_suggestion", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/me/workspace_suggestion", "q": { "$action": "workspace_suggestion" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }, { "lit": "workspace_suggestion" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/me/profile_image", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "DELETE", "o": "/api/v1/me/profile_image", "q": { "$action": "profile_image" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }, { "lit": "profile_image" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/me", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PATCH", "o": "/api/v1/me", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["organization_id"], "co": { "id": "PUT /api/v1/me/active_organization", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PUT", "o": "/api/v1/me/active_organization", "q": { "$action": "active_organization" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }, { "lit": "active_organization" }], "t": { "req": "`reqdata`", "res": "`body.active_organization`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "PUT /api/v1/me/profile_image", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "PUT", "o": "/api/v1/me/profile_image", "q": { "$action": "profile_image" }, "r": {}, "rb": { "alternatives": [{ "fields": [{ "binary": true, "name": "image" }], "kind": "multipart", "media": "multipart/form-data" }], "kind": "json", "media": "application/json" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "me" }, { "lit": "profile_image" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "me", "name__orig": "me", "Name": "Me", "name_": "me", "name-": "me", "NAME": "ME", "index$": 310 }, { "active": true, "entity": "me", "key$": "BasicMeFlow", "kind": "basic", "name": "BasicMeFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "me_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "me_ref01", "srcdatavar": "me_ref01_data", "suffix": "_up0", "textfield": "analytics_distinct_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-me_ref01" } }], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "me_ref01", "srcdatavar": "me_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-me_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "me_ref01", "suffix": "_rm0" }, "m": {}, "o": "remove", "s": [], "v": [], "unreachable": true }] }, 'Me', { "POST /api/v1/me/account_deletion": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["confirmation"], "properties": { "confirmation": { "type": "string", "const": "DELETE MY ACCOUNT" } } } } } }, "parameters": [] }, "POST /api/v1/me/app_promotion": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["action_name"], "properties": { "action_name": { "type": "string", "enum": ["desktop_installed", "mobile_installed", "request_ios_testing", "request_android_testing"] } } } } } }, "parameters": [] }, "GET /api/v1/me": { "protocol": "http", "parameters": [] }, "GET /api/v1/me/account_deletion": { "protocol": "http", "parameters": [] }, "GET /api/v1/me/landing": { "protocol": "http", "parameters": [{ "name": "organization_slug", "in": "query", "description": "Resolve a workspace without changing the active organization. Defaults to the active workspace.", "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/me/workspace_suggestion": { "protocol": "http", "parameters": [] }, "DELETE /api/v1/me/profile_image": { "protocol": "http", "parameters": [] }, "PATCH /api/v1/me": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [] }, "PUT /api/v1/me/active_organization": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["organization_id"], "properties": { "organization_id": { "type": "string" } }, "additionalProperties": true, "x-ref": "#/components/schemas/ActiveOrganizationPayload" } } } }, "parameters": [] }, "PUT /api/v1/me/profile_image": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } }, "multipart/form-data": { "schema": { "type": "object", "required": ["image"], "properties": { "image": { "type": "string", "format": "binary" } }, "x-ref": "#/components/schemas/ImageUploadPayload" } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "me.create.0": "GET-only live run: needs POST /api/v1/me/account_deletion", "me.update.1": "GET-only live run: needs PATCH /api/v1/me", "me.load.2": "GET-only live run: reads a record only me.create.0 gives", "me.remove.3": "GET-only live run: needs DELETE /api/v1/me/profile_image" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let me_ref01_data = Object.values(setup.data.existing.me)[0];
        // UPDATE
        const me_ref01_ent = client.Me();
        const me_ref01_data_up0 = {};
        me_ref01_data_up0.id = me_ref01_data.id;
        const me_ref01_markdef_up0 = { name: 'analytics_distinct_id', value: 'Mark01-me_ref01_' + setup.now };
        me_ref01_data_up0[me_ref01_markdef_up0.name] = me_ref01_markdef_up0.value;
        const me_ref01_resdata_up0 = (await me_ref01_ent.update(me_ref01_data_up0)).data();
        (0, node_assert_1.default)(me_ref01_resdata_up0.id === me_ref01_data_up0.id);
        (0, node_assert_1.default)(me_ref01_resdata_up0[me_ref01_markdef_up0.name] === me_ref01_markdef_up0.value);
        // LOAD
        const me_ref01_match_dt0 = {};
        me_ref01_match_dt0.id = me_ref01_data.id;
        const me_ref01_data_dt0 = (await me_ref01_ent.load(me_ref01_match_dt0)).data();
        (0, node_assert_1.default)(me_ref01_data_dt0.id === me_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/me/MeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['me01', 'me02', 'me03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ME_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ME_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ME_ENTID'];
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
//# sourceMappingURL=MeEntity.test.js.map