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
(0, node_test_1.describe)('VcMergeQueueEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.VcMergeQueue();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VcMergeQueue().list({ "organization_id": 1, "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vc_merge_queue.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "analytics": { "a": true, "h": "Analytics", "n": "analytics", "r": true, "sh": "Queue performance for the reporting window.", "t": "`$OBJECT`", "key$": "analytics", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 1 }, "policy": { "a": true, "h": "Policy", "n": "policy", "r": true, "t": "`$OBJECT`", "key$": "policy", "index$": 2 }, "queue": { "a": true, "h": "Queue", "n": "queue", "r": true, "t": "`$OBJECT`", "key$": "queue", "index$": 3 }, "target_branches": { "a": true, "h": "Target Branches", "n": "target_branches", "r": false, "sh": "Bookmark names for the target picker.", "t": "`$ARRAY`", "key$": "target_branches", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "vc_merge_queue", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["expected_version"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "target", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause", "q": { "$action": "pause", "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "target": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "id" }, { "lit": "pause" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["expected_version"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/resume", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "target", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/resume", "q": { "$action": "resume", "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "target": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "id" }, { "lit": "resume" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "change", "or": "change", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "entry_id", "or": "entry_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "target", "or": "target", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 14, "explode": true, "k": "query", "n": "window_day", "or": "window_days", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "target", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "change", "or": "change", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "entry_id", "or": "entry_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 14, "explode": true, "k": "query", "n": "window_day", "or": "window_days", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "target": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["concurrency", "expected_version"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/concurrency", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "target", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/concurrency", "q": { "$action": "concurrency", "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "target": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "id" }, { "lit": "concurrency" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["enabled", "expected_version"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/skip_ci", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "target", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/skip_ci", "q": { "$action": "skip_ci", "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "target": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "id" }, { "lit": "skip_ci" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo"]] }, "key$": "vc_merge_queue", "name__orig": "vc_merge_queue", "Name": "VcMergeQueue", "name_": "vc_merge_queue", "name-": "vc-merge-queue", "NAME": "VC_MERGE_QUEUE", "index$": 531 }, { "active": true, "entity": "vc_merge_queue", "key$": "BasicVcMergeQueueFlow", "kind": "basic", "name": "BasicVcMergeQueueFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "vc_merge_queue_ref01" }, "m": { "organization_id": "organization01", "repo_id": "repo01", "target": "target01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vc_merge_queue_ref01" } }], "index$": 0 }, { "a": false, "d": { "organization_id": "organization01", "repo_id": "repo01" }, "i": { "ref": "vc_merge_queue_ref01", "srcdatavar": "vc_merge_queue_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vc_merge_queue_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "vc_merge_queue_ref01", "srcdatavar": "vc_merge_queue_ref01_data", "suffix": "_dt0" }, "m": { "id": "vc_merge_queue01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vc_merge_queue_ref01" } }], "index$": 1, "route": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}", "record": {} }] }, 'VcMergeQueue', { "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/resume": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "query", "required": false, "description": "Target branch. Omitted", "the repository trunk is resolved server-side.": null, "schema": { "type": "string" }, "index$": 2 }, { "name": "page", "in": "query", "required": false, "description": "One-based page of terminal queue outcomes. Active entries are always included.", "schema": { "type": "integer", "minimum": 1 }, "index$": 3 }, { "name": "window_days", "in": "query", "required": false, "description": "Queue analytics window. Unsupported values use the 14-day default.", "schema": { "type": "integer", "enum": [7, 14, 30], "default": 14 }, "index$": 4 }, { "name": "entry_id", "in": "query", "required": false, "description": "Entry public id to resolve directly. Repeat or comma-separate for several.", "schema": { "type": "string" }, "index$": 5 }, { "name": "change", "in": "query", "required": false, "description": "Change number (`42` / `#42`) or public id whose entries should be resolved directly. Repeat or comma-separate for several.", "schema": { "type": "string" }, "index$": 6 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "page", "in": "query", "required": false, "description": "One-based page of terminal queue outcomes. Active entries are always included.", "schema": { "type": "integer", "minimum": 1 }, "index$": 3 }, { "name": "window_days", "in": "query", "required": false, "description": "Queue analytics window. Unsupported values use the 14-day default.", "schema": { "type": "integer", "enum": [7, 14, 30], "default": 14 }, "index$": 4 }, { "name": "entry_id", "in": "query", "required": false, "description": "Entry public id to resolve directly. Repeat or comma-separate for several.", "schema": { "type": "string" }, "index$": 5 }, { "name": "change", "in": "query", "required": false, "description": "Change number (`42` / `#42`) or public id whose entries should be resolved directly. Repeat or comma-separate for several.", "schema": { "type": "string" }, "index$": 6 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/concurrency": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version", "concurrency"], "properties": { "expected_version": { "type": "integer" }, "concurrency": { "type": "integer", "minimum": 1, "maximum": 20 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/skip_ci": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version", "enabled"], "properties": { "expected_version": { "type": "integer", "minimum": 1 }, "enabled": { "type": "boolean" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "vc_merge_queue.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/pause", "vc_merge_queue.update.2": "GET-only live run: needs PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/concurrency" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vc_merge_queue_ref01_data = Object.values(setup.data.existing.vc_merge_queue)[0];
        // LIST
        const vc_merge_queue_ref01_ent = client.VcMergeQueue();
        const vc_merge_queue_ref01_match = {};
        vc_merge_queue_ref01_match['organization_id'] = setup.idmap['organization01'];
        vc_merge_queue_ref01_match['repo_id'] = setup.idmap['repo01'];
        const vc_merge_queue_ref01_list = (await vc_merge_queue_ref01_ent.list(vc_merge_queue_ref01_match)).map((e) => e.data());
        // LOAD
        const vc_merge_queue_ref01_match_dt0 = {};
        vc_merge_queue_ref01_match_dt0.id = vc_merge_queue_ref01_data.id;
        vc_merge_queue_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        vc_merge_queue_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        const vc_merge_queue_ref01_data_dt0 = (await vc_merge_queue_ref01_ent.load(vc_merge_queue_ref01_match_dt0)).data();
        (0, node_assert_1.default)(vc_merge_queue_ref01_data_dt0.id === vc_merge_queue_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vc_merge_queue/VcMergeQueueTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vc_merge_queue01', 'vc_merge_queue02', 'vc_merge_queue03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_VC_MERGE_QUEUE_ENTID'];
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
//# sourceMappingURL=VcMergeQueueEntity.test.js.map