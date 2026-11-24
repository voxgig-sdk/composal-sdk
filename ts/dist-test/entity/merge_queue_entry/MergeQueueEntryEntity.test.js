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
(0, node_test_1.describe)('MergeQueueEntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.MergeQueueEntry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.MergeQueueEntry().create({ "merge_queue_id": 1, "organization_id": "x", "repo_id": "x", "expected_version": 1, "idempotency_key": "x", "kind": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'merge_queue_entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "analytics": { "a": true, "h": "Analytics", "n": "analytics", "r": true, "sh": "Queue performance for the reporting window.", "t": "`$OBJECT`", "key$": "analytics", "index$": 0 }, "change_id": { "a": true, "h": "Change Id", "n": "change_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "change_id", "index$": 1 }, "expected_target_commit_id": { "a": true, "h": "Expected Target Commit Id", "n": "expected_target_commit_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "expected_target_commit_id", "index$": 2 }, "expected_target_version": { "a": true, "h": "Expected Target Version", "n": "expected_target_version", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "expected_target_version", "index$": 3 }, "expected_version": { "a": true, "h": "Expected Version", "n": "expected_version", "r": true, "t": "`$INTEGER`", "key$": "expected_version", "index$": 4 }, "github_pr_number": { "a": true, "h": "Github Pr Number", "n": "github_pr_number", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "github_pr_number", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "idempotency_key": { "a": true, "h": "Idempotency Key", "n": "idempotency_key", "r": true, "t": "`$STRING`", "key$": "idempotency_key", "index$": 7 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": "`$STRING`", "key$": "kind", "index$": 8 }, "policy": { "a": true, "h": "Policy", "n": "policy", "r": true, "t": "`$OBJECT`", "key$": "policy", "index$": 9 }, "priority": { "a": true, "h": "Priority", "n": "priority", "r": false, "t": "`$STRING`", "key$": "priority", "index$": 10 }, "queue": { "a": true, "h": "Queue", "n": "queue", "r": true, "t": "`$OBJECT`", "key$": "queue", "index$": 11 }, "target_branches": { "a": true, "h": "Target Branches", "n": "target_branches", "r": false, "sh": "Bookmark names for the target picker.", "t": "`$ARRAY`", "key$": "target_branches", "index$": 12 }, "when_ready": { "a": true, "h": "When Ready", "n": "when_ready", "r": false, "t": ["`$ONE`", ["`$BOOLEAN`", "`$NULL`"]], "key$": "when_ready", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "merge_queue_entry", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["expected_version"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "merge_queue_id", "or": "target", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge", "q": { "$action": "merge", "exist": ["id", "merge_queue_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id", "target": "merge_queue_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "merge_queue_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "merge" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["expected_version"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/promote", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "merge_queue_id", "or": "target", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/promote", "q": { "$action": "promote", "exist": ["id", "merge_queue_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id", "target": "merge_queue_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "merge_queue_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "promote" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["expected_version"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/retry", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "merge_queue_id", "or": "target", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/retry", "q": { "$action": "retry", "exist": ["id", "merge_queue_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id", "target": "merge_queue_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "merge_queue_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "retry" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["expected_version"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/skip_ci", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "merge_queue_id", "or": "target", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/skip_ci", "q": { "$action": "skip_ci", "exist": ["id", "merge_queue_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id", "target": "merge_queue_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "merge_queue_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "skip_ci" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": ["expected_version"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/validate_full", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "merge_queue_id", "or": "target", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/validate_full", "q": { "$action": "validate_full", "exist": ["id", "merge_queue_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id", "target": "merge_queue_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "merge_queue_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "validate_full" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "bf": ["change_id", "expected_target_commit_id", "expected_target_version", "expected_version", "github_pr_number", "idempotency_key", "kind", "priority", "when_ready"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "merge_queue_id", "or": "target", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries", "q": { "exist": ["merge_queue_id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "target": "merge_queue_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "merge_queue_id" }, { "lit": "entries" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "bf": ["expected_version"], "co": { "id": "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "merge_queue_id", "or": "target", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}", "q": { "exist": ["id", "merge_queue_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id", "target": "merge_queue_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "merge_queues" }, { "var": "merge_queue_id" }, { "lit": "entries" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo"]] }, "key$": "merge_queue_entry", "name__orig": "merge_queue_entry", "Name": "MergeQueueEntry", "name_": "merge_queue_entry", "name-": "merge-queue-entry", "NAME": "MERGE_QUEUE_ENTRY", "index$": 312 }, { "active": true, "entity": "merge_queue_entry", "key$": "BasicMergeQueueEntryFlow", "kind": "basic", "name": "BasicMergeQueueEntryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "merge_queue_entry_ref01" }, "m": { "merge_queue_id": "merge_queue01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "merge_queue_entry_ref01", "suffix": "_rm0" }, "m": { "id": "merge_queue_entry01", "merge_queue_id": "merge_queue01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "remove", "s": [], "v": [], "index$": 1 }] }, 'MergeQueueEntry', { "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/promote": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/retry": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/skip_ci": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/validate_full": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["kind", "idempotency_key", "expected_version"], "properties": { "kind": { "type": "string", "enum": ["change", "github_pr"], "key$": "kind" }, "change_id": { "type": "string", "nullable": true, "key$": "change_id" }, "github_pr_number": { "type": "integer", "minimum": 1, "nullable": true, "key$": "github_pr_number" }, "idempotency_key": { "type": "string", "key$": "idempotency_key" }, "expected_version": { "type": "integer", "minimum": 1, "key$": "expected_version" }, "expected_target_commit_id": { "type": "string", "nullable": true, "key$": "expected_target_commit_id" }, "expected_target_version": { "type": "integer", "nullable": true, "key$": "expected_target_version" }, "when_ready": { "type": "boolean", "nullable": true, "key$": "when_ready" }, "priority": { "type": "string", "enum": ["normal", "high"], "default": "normal", "key$": "priority" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "target", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "merge_queue_entry.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}/merge", "merge_queue_entry.remove.1": "GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/merge_queues/{target}/entries/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const merge_queue_entry_ref01_ent = client.MergeQueueEntry();
        let merge_queue_entry_ref01_data = setup.data.new.merge_queue_entry['merge_queue_entry_ref01'];
        merge_queue_entry_ref01_data['merge_queue_id'] = setup.idmap['merge_queue01'];
        merge_queue_entry_ref01_data['organization_id'] = setup.idmap['organization01'];
        merge_queue_entry_ref01_data['repo_id'] = setup.idmap['repo01'];
        merge_queue_entry_ref01_data = (await merge_queue_entry_ref01_ent.create(merge_queue_entry_ref01_data)).data();
        (0, node_assert_1.default)(null != merge_queue_entry_ref01_data.id);
        // REMOVE
        const merge_queue_entry_ref01_match_rm0 = { id: merge_queue_entry_ref01_data.id };
        merge_queue_entry_ref01_match_rm0['merge_queue_id'] = setup.idmap['merge_queue_id'] ?? setup.idmap['merge_queue01'];
        merge_queue_entry_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        merge_queue_entry_ref01_match_rm0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        await merge_queue_entry_ref01_ent.remove(merge_queue_entry_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/merge_queue_entry/MergeQueueEntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['merge_queue_entry01', 'merge_queue_entry02', 'merge_queue_entry03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03', 'merge_queue01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_MERGE_QUEUE_ENTRY_ENTID'];
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
//# sourceMappingURL=MergeQueueEntryEntity.test.js.map