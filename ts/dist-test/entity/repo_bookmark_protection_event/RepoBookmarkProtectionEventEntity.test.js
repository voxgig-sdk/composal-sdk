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
(0, node_test_1.describe)('RepoBookmarkProtectionEventEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.RepoBookmarkProtectionEvent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RepoBookmarkProtectionEvent().list({ "organization_id": 1, "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'repo_bookmark_protection_event.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "r": true, "t": "`$STRING`", "key$": "action", "index$": 0 }, "actor_kind": { "a": true, "h": "Actor Kind", "n": "actor_kind", "r": true, "t": "`$STRING`", "key$": "actor_kind", "index$": 1 }, "actor_label": { "a": true, "h": "Actor Label", "n": "actor_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "actor_label", "index$": 2 }, "actor_user_id": { "a": true, "h": "Actor User Id", "n": "actor_user_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "actor_user_id", "index$": 3 }, "bookmark_name": { "a": true, "h": "Bookmark Name", "n": "bookmark_name", "r": true, "t": "`$STRING`", "key$": "bookmark_name", "index$": 4 }, "bookmark_protection_rule_id": { "a": true, "h": "Bookmark Protection Rule Id", "n": "bookmark_protection_rule_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "bookmark_protection_rule_id", "index$": 5 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 6 }, "created_at_label": { "a": true, "h": "Created At Label", "n": "created_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at_label", "index$": 7 }, "decision": { "a": true, "h": "Decision", "n": "decision", "r": true, "t": "`$STRING`", "key$": "decision", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 9 }, "intent": { "a": true, "h": "Intent", "n": "intent", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "intent", "index$": 10 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": true, "t": "`$OBJECT`", "key$": "metadata", "index$": 11 }, "new_target": { "a": true, "h": "New Target", "n": "new_target", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "new_target", "index$": 12 }, "old_target": { "a": true, "h": "Old Target", "n": "old_target", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "old_target", "index$": 13 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 14 }, "reason_codes": { "a": true, "h": "Reason Codes", "n": "reason_codes", "r": true, "t": "`$ARRAY`", "key$": "reason_codes", "index$": 15 }, "repository_id": { "a": true, "h": "Repository Id", "n": "repository_id", "r": true, "t": "`$STRING`", "key$": "repository_id", "index$": 16 }, "source_request_id": { "a": true, "h": "Source Request Id", "n": "source_request_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_request_id", "index$": 17 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 18 }, "updated_at_label": { "a": true, "h": "Updated At Label", "n": "updated_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at_label", "index$": 19 } }, "id": { "field": "id", "name": "id" }, "name": "repo_bookmark_protection_event", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protection_events", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "bookmark", "or": "bookmark", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 50, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protection_events", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "bookmark_protection_events" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo"]] }, "key$": "repo_bookmark_protection_event", "name__orig": "repo_bookmark_protection_event", "Name": "RepoBookmarkProtectionEvent", "name_": "repo_bookmark_protection_event", "name-": "repo-bookmark-protection-event", "NAME": "REPO_BOOKMARK_PROTECTION_EVENT", "index$": 425 }, { "active": true, "entity": "repo_bookmark_protection_event", "key$": "BasicRepoBookmarkProtectionEventFlow", "kind": "basic", "name": "BasicRepoBookmarkProtectionEventFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "repo_bookmark_protection_event_ref01" } }], "index$": 0 }] }, 'RepoBookmarkProtectionEvent', { "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protection_events": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "bookmark", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 200, "default": 50 }, "index$": 3 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let repo_bookmark_protection_event_ref01_data = Object.values(setup.data.existing.repo_bookmark_protection_event)[0];
        // LIST
        const repo_bookmark_protection_event_ref01_ent = client.RepoBookmarkProtectionEvent();
        const repo_bookmark_protection_event_ref01_match = {};
        repo_bookmark_protection_event_ref01_match['organization_id'] = setup.idmap['organization01'];
        repo_bookmark_protection_event_ref01_match['repo_id'] = setup.idmap['repo01'];
        const repo_bookmark_protection_event_ref01_list = (await repo_bookmark_protection_event_ref01_ent.list(repo_bookmark_protection_event_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/repo_bookmark_protection_event/RepoBookmarkProtectionEventTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['repo_bookmark_protection_event01', 'repo_bookmark_protection_event02', 'repo_bookmark_protection_event03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_EVENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_EVENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_EVENT_ENTID'];
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
//# sourceMappingURL=RepoBookmarkProtectionEventEntity.test.js.map