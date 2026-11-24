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
(0, node_test_1.describe)('RepoSettingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.RepoSetting();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RepoSetting().list({ "organization_id": 1, "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'repo_setting.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active": { "a": true, "h": "Active", "n": "active", "r": true, "t": "`$BOOLEAN`", "key$": "active", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "created_at_label": { "a": true, "h": "Created At Label", "n": "created_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at_label", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "op": { "update": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "description", "index$": 3 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "expires_at", "index$": 4 }, "expires_at_label": { "a": true, "h": "Expires At Label", "n": "expires_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "expires_at_label", "index$": 5 }, "icon_name": { "a": true, "h": "Icon Name", "n": "icon_name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "icon_name", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 7 }, "last_used_at": { "a": true, "fo": "date-time", "h": "Last Used At", "n": "last_used_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_used_at", "index$": 8 }, "last_used_at_label": { "a": true, "h": "Last Used At Label", "n": "last_used_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_used_at_label", "index$": 9 }, "merge_authority": { "a": true, "h": "Merge Authority", "n": "merge_authority", "r": true, "t": "`$STRING`", "key$": "merge_authority", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 11 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 12 }, "permission_level": { "a": true, "h": "Permission Level", "n": "permission_level", "r": true, "t": "`$STRING`", "key$": "permission_level", "index$": 13 }, "revoked_at": { "a": true, "fo": "date-time", "h": "Revoked At", "n": "revoked_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "revoked_at", "index$": 14 }, "revoked_at_label": { "a": true, "h": "Revoked At Label", "n": "revoked_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "revoked_at_label", "index$": 15 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 16 }, "status": { "a": true, "h": "Status", "n": "status", "op": { "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "status", "index$": 17 }, "token_preview": { "a": true, "h": "Token Preview", "n": "token_preview", "r": true, "t": "`$STRING`", "key$": "token_preview", "index$": 18 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 19 }, "updated_at_label": { "a": true, "h": "Updated At Label", "n": "updated_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at_label", "index$": 20 } }, "id": { "field": "id", "name": "id" }, "name": "repo_setting", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "settings" }], "t": { "req": "`reqdata`", "res": "`body.access_tokens`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["description", "icon_name", "name", "status"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "settings" }], "t": { "req": "`reqdata`", "res": "`body.repository`" }, "index$": 0 }, { "a": true, "bf": ["default_change_land_method"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/land_method", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/land_method", "q": { "$action": "land_method", "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "settings" }, { "lit": "land_method" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["application_mode"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/magic_merge", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/magic_merge", "q": { "$action": "magic_merge", "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "settings" }, { "lit": "magic_merge" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["default_branch"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/trunk", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/trunk", "q": { "$action": "trunk", "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "settings" }, { "lit": "trunk" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo"]] }, "key$": "repo_setting", "name__orig": "repo_setting", "Name": "RepoSetting", "name_": "repo_setting", "name-": "repo-setting", "NAME": "REPO_SETTING", "index$": 428 }, { "active": true, "entity": "repo_setting", "key$": "BasicRepoSettingFlow", "kind": "basic", "name": "BasicRepoSettingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "repo_setting_ref01" } }], "index$": 0 }, { "a": false, "d": { "organization_id": "organization01" }, "i": { "ref": "repo_setting_ref01", "srcdatavar": "repo_setting_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-repo_setting_ref01" } }], "v": [], "unreachable": true }] }, 'RepoSetting', { "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "name": { "type": "string", "minLength": 1, "key$": "name" }, "description": { "type": "string", "nullable": true, "key$": "description" }, "icon_name": { "type": "string", "key$": "icon_name" }, "status": { "type": "string", "enum": ["active", "archived"], "key$": "status" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/land_method": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["default_change_land_method"], "properties": { "default_change_land_method": { "type": "string", "enum": ["squash", "rebase"] } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/magic_merge": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["application_mode"], "properties": { "application_mode": { "type": "string", "enum": ["off", "automatic", "review", "command"] } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings/trunk": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["default_branch"], "properties": { "default_branch": { "type": "string", "minLength": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "repo_setting.update.1": "GET-only live run: needs PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/settings" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let repo_setting_ref01_data = Object.values(setup.data.existing.repo_setting)[0];
        // LIST
        const repo_setting_ref01_ent = client.RepoSetting();
        const repo_setting_ref01_match = {};
        repo_setting_ref01_match['organization_id'] = setup.idmap['organization01'];
        repo_setting_ref01_match['repo_id'] = setup.idmap['repo01'];
        const repo_setting_ref01_list = (await repo_setting_ref01_ent.list(repo_setting_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/repo_setting/RepoSettingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['repo_setting01', 'repo_setting02', 'repo_setting03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_REPO_SETTING_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_REPO_SETTING_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_REPO_SETTING_ENTID'];
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
//# sourceMappingURL=RepoSettingEntity.test.js.map