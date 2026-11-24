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
(0, node_test_1.describe)('SparkAgentThreadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.SparkAgentThread();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SparkAgentThread().list({ "agent_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'spark_agent_thread.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "archive_deletes_sandbox": { "a": true, "h": "Archive Deletes Sandbox", "n": "archive_deletes_sandbox", "r": false, "t": "`$BOOLEAN`", "key$": "archive_deletes_sandbox", "index$": 0 }, "archived": { "a": true, "h": "Archived", "n": "archived", "r": true, "t": "`$BOOLEAN`", "key$": "archived", "index$": 1 }, "attention": { "a": true, "h": "Attention", "n": "attention", "r": true, "sh": "Why the person should open this thread: a pending question, the agent asking for attention, or a run that did not finish.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "attention", "index$": 2 }, "can_archive": { "a": true, "h": "Can Archive", "n": "can_archive", "r": true, "t": "`$BOOLEAN`", "key$": "can_archive", "index$": 3 }, "can_compact": { "a": true, "h": "Can Compact", "n": "can_compact", "r": true, "t": "`$BOOLEAN`", "key$": "can_compact", "index$": 4 }, "can_snooze": { "a": true, "h": "Can Snooze", "n": "can_snooze", "r": true, "t": "`$BOOLEAN`", "key$": "can_snooze", "index$": 5 }, "coordination_status": { "a": true, "h": "Coordination Status", "n": "coordination_status", "r": false, "sh": "Durable work not represented by a native run: a queued input or an outstanding thread report.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "coordination_status", "index$": 6 }, "execution": { "a": true, "h": "Execution", "n": "execution", "op": { "list": { "req": true, "type": "`$OBJECT`" } }, "r": false, "sh": "device_folder threads also report state and path; sandbox threads run on their own machine with the coding agent in harness.", "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "execution", "index$": 7 }, "first_input": { "a": true, "h": "First Input", "n": "first_input", "r": false, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "first_input", "index$": 8 }, "first_input_key": { "a": true, "h": "First Input Key", "n": "first_input_key", "r": false, "sh": "Idempotency-Key that finds the first message through input_delivery.", "t": "`$STRING`", "key$": "first_input_key", "index$": 9 }, "first_input_requester_membership_id": { "a": true, "h": "First Input Requester Membership Id", "n": "first_input_requester_membership_id", "r": false, "sh": "Membership the first message was sent as, for input_delivery.", "t": "`$STRING`", "key$": "first_input_requester_membership_id", "index$": 10 }, "group": { "a": true, "h": "Group", "n": "group", "r": true, "sh": "Rails-owned list group, in precedence order: attention, active run, coordination custody, then done.", "t": "`$STRING`", "key$": "group", "index$": 11 }, "has_active_run": { "a": true, "h": "Has Active Run", "n": "has_active_run", "r": true, "t": "`$BOOLEAN`", "key$": "has_active_run", "index$": 12 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 13 }, "inherit_context": { "a": true, "h": "Inherit Context", "n": "inherit_context", "r": false, "sh": "Include the source conversation through its last completed reply.", "t": "`$BOOLEAN`", "key$": "inherit_context", "index$": 14 }, "is_main": { "a": true, "h": "Is Main", "n": "is_main", "r": true, "t": "`$BOOLEAN`", "key$": "is_main", "index$": 15 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": "`$STRING`", "key$": "kind", "index$": 16 }, "message": { "a": true, "h": "Message", "n": "message", "r": false, "sh": "The thread's first message.", "t": "`$STRING`", "key$": "message", "index$": 17 }, "older": { "a": true, "h": "Older", "n": "older", "r": true, "sh": "Nothing needs the person here, it is not working, and it has not changed for a day; the list folds it under Older.", "t": "`$BOOLEAN`", "key$": "older", "index$": 18 }, "parent_conversation_id": { "a": true, "h": "Parent Conversation Id", "n": "parent_conversation_id", "r": false, "sh": "Optional source conversation belonging to this agent.", "t": "`$STRING`", "key$": "parent_conversation_id", "index$": 19 }, "parent_conversation_title": { "a": true, "h": "Parent Conversation Title", "n": "parent_conversation_title", "r": false, "sh": "Source conversation title, resolved independently of this page.", "t": "`$STRING`", "key$": "parent_conversation_title", "index$": 20 }, "requester_membership_id": { "a": true, "h": "Requester Membership Id", "n": "requester_membership_id", "r": false, "t": "`$STRING`", "key$": "requester_membership_id", "index$": 21 }, "snoozed_until": { "a": true, "fo": "date-time", "h": "Snoozed Until", "n": "snoozed_until", "r": true, "sh": "When a snoozed thread returns to its usual group; null when it is not snoozed.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "snoozed_until", "index$": 22 }, "thread": { "a": true, "h": "Thread", "n": "thread", "r": true, "t": "`$OBJECT`", "key$": "thread", "index$": 23 }, "title": { "a": true, "h": "Title", "n": "title", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "title", "index$": 24 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at", "index$": 25 } }, "id": { "field": "id", "name": "id" }, "name": "spark_agent_thread", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["archived"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "thread_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive", "q": { "$action": "archive", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "thread_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "threads" }, { "var": "id" }, { "lit": "archive" }], "t": { "req": { "archived": "`reqdata.archived`" }, "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/compact", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "thread_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/compact", "q": { "$action": "compact", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "thread_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "threads" }, { "var": "id" }, { "lit": "compact" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["snoozed_until"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/snooze", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "thread_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/snooze", "q": { "$action": "snooze", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "thread_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "threads" }, { "var": "id" }, { "lit": "snooze" }], "t": { "req": { "snoozed_until": "`reqdata.snoozed_until`" }, "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["execution", "inherit_context", "message", "parent_conversation_id", "requester_membership_id", "title"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/threads", "q": { "exist": ["agent_id", "idempotency_key", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "threads" }], "t": { "req": { "execution": "`reqdata.execution`", "inherit_context": "`reqdata.inherit_context`", "message": "`reqdata.message`", "parent_conversation_id": "`reqdata.parent_conversation_id`", "requester_membership_id": "`reqdata.requester_membership_id`", "title": "`reqdata.title`" }, "res": "`body`" }, "index$": 3 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/threads", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": "exclude", "explode": true, "k": "query", "n": "archived", "or": "archived", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "conversation_id", "or": "conversation_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "local_cursor", "or": "local_cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/threads", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "threads" }], "t": { "req": "`reqdata`", "res": "`body.threads`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "spark_agent_thread", "name__orig": "spark_agent_thread", "Name": "SparkAgentThread", "name_": "spark_agent_thread", "name-": "spark-agent-thread", "NAME": "SPARK_AGENT_THREAD", "index$": 503 }, { "active": true, "entity": "spark_agent_thread", "key$": "BasicSparkAgentThreadFlow", "kind": "basic", "name": "BasicSparkAgentThreadFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "spark_agent_thread_ref01" }, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "spark_agent_thread_ref01" } }], "index$": 1 }] }, 'SparkAgentThread', { "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["archived"], "properties": { "archived": { "type": "boolean" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "thread_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/compact": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": {}, "required": [] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "thread_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/snooze": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["snoozed_until"], "properties": { "snoozed_until": { "type": ["string", "null"], "format": "date-time", "description": "A future time when the thread returns to its usual group, or null to wake it now." } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "thread_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "title": { "type": "string", "maxLength": 200, "key$": "title" }, "message": { "type": "string", "minLength": 1, "maxLength": 32768, "description": "The thread's first message. Without a title, Rails names the thread from it; the message is then sent as the thread's first turn under a key derived from Idempotency-Key, so a retried creation does not send it twice.", "key$": "message" }, "requester_membership_id": { "type": "string", "minLength": 1, "maxLength": 200, "key$": "requester_membership_id" }, "execution": { "oneOf": [{ "type": "object", "additionalProperties": false, "required": ["kind", "device_id", "path"], "properties": { "kind": {}, "device_id": {}, "path": {} } }, { "type": "object", "additionalProperties": false, "required": ["kind"], "properties": { "kind": {}, "repository_id": {}, "harness": {} } }], "key$": "execution" }, "parent_conversation_id": { "type": "string", "minLength": 1, "maxLength": 519, "description": "Optional source conversation belonging to this agent. Omit to start a standalone conversation with no inherited history.", "key$": "parent_conversation_id" }, "inherit_context": { "type": "boolean", "description": "Include the source conversation through its last completed reply. Defaults to true when a source is supplied. Without a source, the conversation starts with no inherited history regardless of this value.", "key$": "inherit_context" } }, "required": [], "if": { "required": ["execution"], "properties": { "execution": { "properties": { "kind": { "const": "device_folder" } } } } }, "then": { "required": ["requester_membership_id"] } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string", "minLength": 1, "maxLength": 128 }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/threads": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "archived", "in": "query", "schema": { "type": "string", "enum": ["exclude", "only"], "default": "exclude" }, "index$": 2 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "conversation_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "local_cursor", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 5 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "spark_agent_thread.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/threads/{thread_id}/archive" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const spark_agent_thread_ref01_ent = client.SparkAgentThread();
        let spark_agent_thread_ref01_data = setup.data.new.spark_agent_thread['spark_agent_thread_ref01'];
        spark_agent_thread_ref01_data['agent_id'] = setup.idmap['agent01'];
        spark_agent_thread_ref01_data['organization_id'] = setup.idmap['organization01'];
        spark_agent_thread_ref01_data = (await spark_agent_thread_ref01_ent.create(spark_agent_thread_ref01_data)).data();
        (0, node_assert_1.default)(null != spark_agent_thread_ref01_data.id);
        // LIST
        const spark_agent_thread_ref01_match = {};
        spark_agent_thread_ref01_match['agent_id'] = setup.idmap['agent01'];
        spark_agent_thread_ref01_match['organization_id'] = setup.idmap['organization01'];
        const spark_agent_thread_ref01_list = (await spark_agent_thread_ref01_ent.list(spark_agent_thread_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(spark_agent_thread_ref01_list, { id: spark_agent_thread_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/spark_agent_thread/SparkAgentThreadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['spark_agent_thread01', 'spark_agent_thread02', 'spark_agent_thread03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_SPARK_AGENT_THREAD_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_SPARK_AGENT_THREAD_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_SPARK_AGENT_THREAD_ENTID'];
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
//# sourceMappingURL=SparkAgentThreadEntity.test.js.map