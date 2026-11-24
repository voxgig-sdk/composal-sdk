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
(0, node_test_1.describe)('ChangeCommentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ChangeComment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ChangeComment().list({ "change_id": 1, "organization_id": "x", "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'change_comment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "body": { "a": true, "h": "Body", "n": "body", "r": true, "t": "`$STRING`", "key$": "body", "index$": 0 }, "capabilities": { "a": true, "h": "Capabilities", "n": "capabilities", "r": true, "t": "`$OBJECT`", "key$": "capabilities", "index$": 1 }, "change_id": { "a": true, "h": "Change Id", "n": "change_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "change_id", "index$": 2 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at", "index$": 3 }, "created_at_label": { "a": true, "h": "Created At Label", "n": "created_at_label", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at_label", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "kind", "index$": 6 }, "line": { "a": true, "h": "Line", "n": "line", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "line", "index$": 7 }, "outdated": { "a": true, "h": "Outdated", "n": "outdated", "r": true, "t": "`$BOOLEAN`", "key$": "outdated", "index$": 8 }, "parent_comment_id": { "a": true, "h": "Parent Comment Id", "n": "parent_comment_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "parent_comment_id", "index$": 9 }, "patchset_id": { "a": true, "h": "Patchset Id", "n": "patchset_id", "op": { "list": { "req": true, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "patchset_id", "index$": 10 }, "patchset_number": { "a": true, "h": "Patchset Number", "n": "patchset_number", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "patchset_number", "index$": 11 }, "path": { "a": true, "h": "Path", "n": "path", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "path", "index$": 12 }, "replies": { "a": true, "h": "Replies", "n": "replies", "r": false, "t": "`$ARRAY`", "key$": "replies", "index$": 13 }, "resolved": { "a": true, "h": "Resolved", "n": "resolved", "r": true, "t": "`$BOOLEAN`", "key$": "resolved", "index$": 14 }, "resolved_at": { "a": true, "fo": "date-time", "h": "Resolved At", "n": "resolved_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "resolved_at", "index$": 15 }, "resolved_at_label": { "a": true, "h": "Resolved At Label", "n": "resolved_at_label", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "resolved_at_label", "index$": 16 }, "resolved_by": { "a": true, "h": "Resolved By", "n": "resolved_by", "r": true, "t": "`$OBJECT`", "key$": "resolved_by", "index$": 17 }, "side": { "a": true, "h": "Side", "n": "side", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "side", "index$": 18 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at", "index$": 19 }, "updated_at_label": { "a": true, "h": "Updated At Label", "n": "updated_at_label", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at_label", "index$": 20 }, "user": { "a": true, "h": "User", "n": "user", "r": true, "t": "`$OBJECT`", "key$": "user", "index$": 21 } }, "id": { "field": "id", "name": "id" }, "name": "change_comment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "change_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "comment_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve", "q": { "$action": "resolve", "exist": ["change_id", "id", "organization_id", "repo_id"] }, "r": { "param": { "comment_id": "id", "id": "change_id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "var": "change_id" }, { "lit": "comments" }, { "var": "id" }, { "lit": "resolve" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/unresolve", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "change_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "comment_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/unresolve", "q": { "$action": "unresolve", "exist": ["change_id", "id", "organization_id", "repo_id"] }, "r": { "param": { "comment_id": "id", "id": "change_id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "var": "change_id" }, { "lit": "comments" }, { "var": "id" }, { "lit": "unresolve" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["body", "kind", "line", "parent_comment_id", "patchset_id", "path", "side"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "change_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments", "q": { "exist": ["change_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "change_id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "var": "change_id" }, { "lit": "comments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "change_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "path", "or": "path", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "resolved", "or": "resolved", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments", "q": { "exist": ["change_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "change_id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "var": "change_id" }, { "lit": "comments" }], "t": { "req": "`reqdata`", "res": "`body.comments`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo", "$.main.kit.entity.change"]] }, "key$": "change_comment", "name__orig": "change_comment", "Name": "ChangeComment", "name_": "change_comment", "name-": "change-comment", "NAME": "CHANGE_COMMENT", "index$": 154 }, { "active": true, "entity": "change_comment", "key$": "BasicChangeCommentFlow", "kind": "basic", "name": "BasicChangeCommentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "change_comment_ref01" }, "m": { "change_id": "change01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "change_id": "change01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "change_comment_ref01" } }], "index$": 1 }] }, 'ChangeComment', { "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "comment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/unresolve": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "comment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["body"], "properties": { "body": { "type": "string", "key$": "body" }, "patchset_id": { "type": "string", "nullable": true, "key$": "patchset_id" }, "path": { "type": "string", "nullable": true, "key$": "path" }, "side": { "type": "string", "enum": ["additions", "deletions"], "nullable": true, "key$": "side" }, "line": { "type": "integer", "nullable": true, "key$": "line" }, "parent_comment_id": { "type": "string", "nullable": true, "key$": "parent_comment_id" }, "kind": { "type": "string", "nullable": true, "key$": "kind" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "path", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 3 }, { "name": "resolved", "in": "query", "required": false, "schema": { "type": "boolean" }, "index$": 4 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "change_comment.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const change_comment_ref01_ent = client.ChangeComment();
        let change_comment_ref01_data = setup.data.new.change_comment['change_comment_ref01'];
        change_comment_ref01_data['change_id'] = setup.idmap['change01'];
        change_comment_ref01_data['organization_id'] = setup.idmap['organization01'];
        change_comment_ref01_data['repo_id'] = setup.idmap['repo01'];
        change_comment_ref01_data = (await change_comment_ref01_ent.create(change_comment_ref01_data)).data();
        (0, node_assert_1.default)(null != change_comment_ref01_data.id);
        // LIST
        const change_comment_ref01_match = {};
        change_comment_ref01_match['change_id'] = setup.idmap['change01'];
        change_comment_ref01_match['organization_id'] = setup.idmap['organization01'];
        change_comment_ref01_match['repo_id'] = setup.idmap['repo01'];
        const change_comment_ref01_list = (await change_comment_ref01_ent.list(change_comment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(change_comment_ref01_list, { id: change_comment_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/change_comment/ChangeCommentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['change_comment01', 'change_comment02', 'change_comment03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03', 'change01', 'change02', 'change03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CHANGE_COMMENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CHANGE_COMMENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CHANGE_COMMENT_ENTID'];
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
//# sourceMappingURL=ChangeCommentEntity.test.js.map