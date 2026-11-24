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
(0, node_test_1.describe)('ChangeLabelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ChangeLabel();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ChangeLabel().update({ "change_id": 1, "organization_id": "x", "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'change_label.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accepted": { "a": true, "h": "Accepted", "n": "accepted", "r": false, "t": "`$BOOLEAN`", "key$": "accepted", "index$": 0 }, "add": { "a": true, "h": "Add", "n": "add", "r": false, "t": "`$ARRAY`", "key$": "add", "index$": 1 }, "approval": { "a": true, "h": "Approval", "n": "approval", "r": true, "t": "`$OBJECT`", "key$": "approval", "index$": 2 }, "assets": { "a": true, "h": "Assets", "n": "assets", "r": false, "sh": "Proof assets referenced from the description as `vex-asset:<id>`.", "t": "`$ARRAY`", "key$": "assets", "index$": 3 }, "author": { "a": true, "h": "Author", "n": "author", "r": false, "sh": "Human user summary or organization automation identity.", "t": "`$ANY`", "key$": "author", "index$": 4 }, "capabilities": { "a": true, "h": "Capabilities", "n": "capabilities", "r": true, "t": "`$OBJECT`", "key$": "capabilities", "index$": 5 }, "change_key": { "a": true, "h": "Change Key", "n": "change_key", "r": false, "t": "`$STRING`", "key$": "change_key", "index$": 6 }, "checks": { "a": true, "h": "Checks", "n": "checks", "r": false, "t": "`$ARRAY`", "key$": "checks", "index$": 7 }, "checks_status": { "a": true, "h": "Checks Status", "n": "checks_status", "r": false, "t": "`$STRING`", "key$": "checks_status", "index$": 8 }, "comments": { "a": true, "h": "Comments", "n": "comments", "r": false, "t": "`$ARRAY`", "key$": "comments", "index$": 9 }, "comments_count": { "a": true, "h": "Comments Count", "n": "comments_count", "r": false, "t": "`$INTEGER`", "key$": "comments_count", "index$": 10 }, "comments_count_label": { "a": true, "h": "Comments Count Label", "n": "comments_count_label", "r": false, "t": "`$STRING`", "key$": "comments_count_label", "index$": 11 }, "commit_message": { "a": true, "h": "Commit Message", "n": "commit_message", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "commit_message", "index$": 12 }, "current_patchset": { "a": true, "h": "Current Patchset", "n": "current_patchset", "r": true, "t": "`$OBJECT`", "key$": "current_patchset", "index$": 13 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "description", "index$": 14 }, "draft": { "a": true, "h": "Draft", "n": "draft", "r": false, "t": "`$BOOLEAN`", "key$": "draft", "index$": 15 }, "folded_into_number": { "a": true, "h": "Folded Into Number", "n": "folded_into_number", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "folded_into_number", "index$": 16 }, "github_projection_status": { "a": true, "h": "Github Projection Status", "n": "github_projection_status", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "github_projection_status", "index$": 17 }, "github_pull_request": { "a": true, "h": "Github Pull Request", "n": "github_pull_request", "r": true, "t": "`$OBJECT`", "key$": "github_pull_request", "index$": 18 }, "github_pull_requests": { "a": true, "h": "Github Pull Requests", "n": "github_pull_requests", "r": false, "t": "`$ARRAY`", "key$": "github_pull_requests", "index$": 19 }, "group": { "a": true, "h": "Group", "n": "group", "r": false, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "group", "index$": 20 }, "has_description": { "a": true, "h": "Has Description", "n": "has_description", "r": false, "sh": "True when the change has Vex-owned review description content, distinct from the JJ commit message.", "t": "`$BOOLEAN`", "key$": "has_description", "index$": 21 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 22 }, "jj_change_id": { "a": true, "h": "Jj Change Id", "n": "jj_change_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "jj_change_id", "index$": 23 }, "labels": { "a": true, "h": "Labels", "n": "labels", "r": false, "t": "`$ARRAY`", "key$": "labels", "index$": 24 }, "landable": { "a": true, "h": "Landable", "n": "landable", "r": false, "t": "`$BOOLEAN`", "key$": "landable", "index$": 25 }, "landed_by": { "a": true, "h": "Landed By", "n": "landed_by", "r": true, "t": "`$OBJECT`", "key$": "landed_by", "index$": 26 }, "number": { "a": true, "h": "Number", "n": "number", "r": true, "t": "`$INTEGER`", "key$": "number", "index$": 27 }, "orphaned": { "a": true, "h": "Orphaned", "n": "orphaned", "r": false, "t": "`$BOOLEAN`", "key$": "orphaned", "index$": 28 }, "orphaned_at": { "a": true, "fo": "date-time", "h": "Orphaned At", "n": "orphaned_at", "r": false, "t": "`$STRING`", "key$": "orphaned_at", "index$": 29 }, "orphaned_at_label": { "a": true, "h": "Orphaned At Label", "n": "orphaned_at_label", "r": false, "t": "`$STRING`", "key$": "orphaned_at_label", "index$": 30 }, "orphaned_reason": { "a": true, "h": "Orphaned Reason", "n": "orphaned_reason", "r": false, "t": "`$STRING`", "key$": "orphaned_reason", "index$": 31 }, "parent_change_id": { "a": true, "h": "Parent Change Id", "n": "parent_change_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "parent_change_id", "index$": 32 }, "parent_change_number": { "a": true, "h": "Parent Change Number", "n": "parent_change_number", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "parent_change_number", "index$": 33 }, "patchset_number": { "a": true, "h": "Patchset Number", "n": "patchset_number", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "patchset_number", "index$": 34 }, "patchsets": { "a": true, "h": "Patchsets", "n": "patchsets", "r": false, "t": "`$ARRAY`", "key$": "patchsets", "index$": 35 }, "primary_status": { "a": true, "h": "Primary Status", "n": "primary_status", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "primary_status", "index$": 36 }, "public_id": { "a": true, "h": "Public Id", "n": "public_id", "r": false, "t": "`$STRING`", "key$": "public_id", "index$": 37 }, "relation_chain": { "a": true, "h": "Relation Chain", "n": "relation_chain", "r": false, "t": "`$ARRAY`", "key$": "relation_chain", "index$": 38 }, "remove": { "a": true, "h": "Remove", "n": "remove", "r": false, "t": "`$ARRAY`", "key$": "remove", "index$": 39 }, "requested_changes": { "a": true, "h": "Requested Changes", "n": "requested_changes", "r": false, "t": "`$BOOLEAN`", "key$": "requested_changes", "index$": 40 }, "restack_state": { "a": true, "h": "Restack State", "n": "restack_state", "r": false, "t": "`$STRING`", "key$": "restack_state", "index$": 41 }, "reviewer_candidates": { "a": true, "h": "Reviewer Candidates", "n": "reviewer_candidates", "r": false, "sh": "Organization members available to the reviewer picker on this page.", "t": "`$ARRAY`", "key$": "reviewer_candidates", "index$": 42 }, "reviewers": { "a": true, "h": "Reviewers", "n": "reviewers", "r": false, "t": "`$ARRAY`", "key$": "reviewers", "index$": 43 }, "stable_change_id": { "a": true, "h": "Stable Change Id", "n": "stable_change_id", "r": false, "t": "`$STRING`", "key$": "stable_change_id", "index$": 44 }, "stack": { "a": true, "h": "Stack", "n": "stack", "r": false, "t": "`$ANY`", "key$": "stack", "index$": 45 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 46 }, "target_branch": { "a": true, "h": "Target Branch", "n": "target_branch", "r": true, "t": "`$STRING`", "key$": "target_branch", "index$": 47 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 48 }, "unresolved_comments_count_label": { "a": true, "h": "Unresolved Comments Count Label", "n": "unresolved_comments_count_label", "r": false, "t": "`$STRING`", "key$": "unresolved_comments_count_label", "index$": 49 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 50 }, "votes": { "a": true, "h": "Votes", "n": "votes", "r": false, "t": "`$ARRAY`", "key$": "votes", "index$": 51 } }, "id": { "field": "id", "name": "id" }, "name": "change_label", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["add", "labels", "remove"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/labels", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "change_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/labels", "q": { "exist": ["change_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "change_id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "var": "change_id" }, { "lit": "labels" }], "t": { "req": "`reqdata`", "res": "`body.change`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo", "$.main.kit.entity.change"]] }, "key$": "change_label", "name__orig": "change_label", "Name": "ChangeLabel", "name_": "change_label", "name-": "change-label", "NAME": "CHANGE_LABEL", "index$": 164 }, { "active": true, "entity": "change_label", "key$": "BasicChangeLabelFlow", "kind": "basic", "name": "BasicChangeLabelFlow", "param": {}, "step": [{ "a": false, "d": { "organization_id": "organization01", "repo_id": "repo01" }, "i": { "ref": "change_label_ref01", "srcdatavar": "change_label_ref01_data", "suffix": "_up0", "textfield": "change_key" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-change_label_ref01" } }], "v": [], "unreachable": true }] }, 'ChangeLabel', { "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/labels": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "labels": { "type": "array", "items": { "type": "string" }, "key$": "labels" }, "add": { "type": "array", "items": { "type": "string" }, "key$": "add" }, "remove": { "type": "array", "items": { "type": "string" }, "key$": "remove" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "change_label.update.0": "GET-only live run: needs PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/labels" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let change_label_ref01_data = Object.values(setup.data.existing.change_label)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/change_label/ChangeLabelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['change_label01', 'change_label02', 'change_label03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03', 'change01', 'change02', 'change03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CHANGE_LABEL_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CHANGE_LABEL_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CHANGE_LABEL_ENTID'];
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
//# sourceMappingURL=ChangeLabelEntity.test.js.map