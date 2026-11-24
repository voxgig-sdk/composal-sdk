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
(0, node_test_1.describe)('SparkAgentLocalThreadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.SparkAgentLocalThread();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SparkAgentLocalThread().load({ "agent_id": 1, "id": "x", "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'spark_agent_local_thread.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "r": true, "t": "`$STRING`", "key$": "action", "index$": 0 }, "archived": { "a": true, "h": "Archived", "n": "archived", "r": true, "sh": "Archived on its computer: hidden from the active list and shown with the archived threads.", "t": "`$BOOLEAN`", "key$": "archived", "index$": 1 }, "can_archive": { "a": true, "h": "Can Archive", "n": "can_archive", "r": true, "sh": "This requester can archive or restore it, and the computer's Desktop supports archiving.", "t": "`$BOOLEAN`", "key$": "can_archive", "index$": 2 }, "can_disconnect_relay": { "a": true, "h": "Can Disconnect Relay", "n": "can_disconnect_relay", "r": false, "t": "`$BOOLEAN`", "key$": "can_disconnect_relay", "index$": 3 }, "can_end": { "a": true, "h": "Can End", "n": "can_end", "r": true, "t": "`$BOOLEAN`", "key$": "can_end", "index$": 4 }, "can_interrupt": { "a": true, "h": "Can Interrupt", "n": "can_interrupt", "r": true, "t": "`$BOOLEAN`", "key$": "can_interrupt", "index$": 5 }, "can_send": { "a": true, "h": "Can Send", "n": "can_send", "r": true, "t": "`$BOOLEAN`", "key$": "can_send", "index$": 6 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 7 }, "delivery": { "a": true, "h": "Delivery", "n": "delivery", "r": true, "sh": "Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did.", "t": "`$OBJECT`", "key$": "delivery", "index$": 8 }, "device_id": { "a": true, "h": "Device Id", "n": "device_id", "r": true, "t": "`$STRING`", "key$": "device_id", "index$": 9 }, "device_name": { "a": true, "h": "Device Name", "n": "device_name", "r": true, "t": "`$STRING`", "key$": "device_name", "index$": 10 }, "diagnostic_code": { "a": true, "h": "Diagnostic Code", "n": "diagnostic_code", "r": false, "sh": "Approved product error code retained after copied diagnostics expire.", "t": "`$STRING`", "key$": "diagnostic_code", "index$": 11 }, "end": { "a": true, "h": "End", "n": "end", "r": true, "t": "`$ANY`", "key$": "end", "index$": 12 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": true, "t": "`$STRING`", "key$": "expires_at", "index$": 13 }, "full_title": { "a": true, "h": "Full Title", "n": "full_title", "r": true, "sh": "The native name or first prompt in full, for a tooltip.", "t": "`$STRING`", "key$": "full_title", "index$": 14 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 15 }, "key": { "a": true, "h": "Key", "n": "key", "r": true, "t": "`$STRING`", "key$": "key", "index$": 16 }, "last_activity_at": { "a": true, "fo": "date-time", "h": "Last Activity At", "n": "last_activity_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_activity_at", "index$": 17 }, "native_thread_id": { "a": true, "h": "Native Thread Id", "n": "native_thread_id", "r": true, "t": "`$STRING`", "key$": "native_thread_id", "index$": 18 }, "parent_conversation_id": { "a": true, "h": "Parent Conversation Id", "n": "parent_conversation_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "parent_conversation_id", "index$": 19 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": true, "t": "`$STRING`", "key$": "provider", "index$": 20 }, "references": { "a": true, "h": "References", "n": "references", "r": true, "t": "`$OBJECT`", "key$": "references", "index$": 21 }, "relay_disconnected_at": { "a": true, "fo": "date-time", "h": "Relay Disconnected At", "n": "relay_disconnected_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "relay_disconnected_at", "index$": 22 }, "relay_participant": { "a": true, "h": "Relay Participant", "n": "relay_participant", "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 3 }, "key$": "relay_participant", "index$": 23 }, "result": { "a": true, "h": "Result", "n": "result", "r": true, "t": "`$ANY`", "union": { "branches": 10, "count": 1, "depth": 2 }, "key$": "result", "index$": 24 }, "result_expired": { "a": true, "h": "Result Expired", "n": "result_expired", "r": true, "sh": "Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences.", "t": "`$BOOLEAN`", "key$": "result_expired", "index$": 25 }, "result_schema": { "a": true, "h": "Result Schema", "n": "result_schema", "r": false, "t": ["`$ONE`", ["`$OBJECT`", "`$BOOLEAN`"]], "key$": "result_schema", "index$": 26 }, "section": { "a": true, "h": "Section", "n": "section", "r": true, "sh": "Server-assigned section in the ordered computer thread directory.", "t": "`$STRING`", "key$": "section", "index$": 27 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "t": "`$STRING`", "key$": "state", "index$": 28 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "What the native thread is doing.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "status", "index$": 29 }, "task_configured": { "a": true, "h": "Task Configured", "n": "task_configured", "r": true, "t": "`$BOOLEAN`", "key$": "task_configured", "index$": 30 }, "thread_id": { "a": true, "h": "Thread Id", "n": "thread_id", "r": true, "t": "`$STRING`", "key$": "thread_id", "index$": 31 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "sh": "Short title: the native name, or the first prompt's first line without the agent's task preamble.", "t": "`$STRING`", "key$": "title", "index$": 32 } }, "id": { "field": "id", "name": "id" }, "name": "spark_agent_local_thread", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["device_id", "key", "provider", "result_schema", "thread_id"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "local_threads" }], "t": { "req": "`reqdata`", "res": "`body.operation`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "local_thread_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}", "q": { "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "local_thread_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "local_threads" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.thread`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "local_thread_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy", "q": { "$action": "delivery_policy", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "local_thread_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "local_threads" }, { "var": "id" }, { "lit": "delivery_policy" }], "t": { "req": "`reqdata`", "res": "`body.policy`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/task", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "local_thread_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/task", "q": { "$action": "task", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "local_thread_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "local_threads" }, { "var": "id" }, { "lit": "task" }], "t": { "req": "`reqdata`", "res": "`body.task`" }, "index$": 2 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["allowed_senders", "ask_first", "expected_version", "reply_with_final_answer", "restricted"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "local_thread_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy", "q": { "$action": "delivery_policy", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "local_thread_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "local_threads" }, { "var": "id" }, { "lit": "delivery_policy" }], "t": { "req": "`reqdata`", "res": "`body.policy`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "spark_agent_local_thread", "name__orig": "spark_agent_local_thread", "Name": "SparkAgentLocalThread", "name_": "spark_agent_local_thread", "name-": "spark-agent-local-thread", "NAME": "SPARK_AGENT_LOCAL_THREAD", "index$": 198 }, { "active": true, "entity": "spark_agent_local_thread", "key$": "BasicSparkAgentLocalThreadFlow", "kind": "basic", "name": "BasicSparkAgentLocalThreadFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "spark_agent_local_thread_ref01" }, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": false, "d": { "agent_id": "agent01", "organization_id": "organization01" }, "i": { "ref": "spark_agent_local_thread_ref01", "srcdatavar": "spark_agent_local_thread_ref01_data", "suffix": "_up0", "textfield": "action" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-spark_agent_local_thread_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "spark_agent_local_thread_ref01", "srcdatavar": "spark_agent_local_thread_ref01_data", "suffix": "_dt0" }, "m": { "agent_id": "agent01", "id": "spark_agent_local_thread01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-spark_agent_local_thread_ref01" } }], "index$": 1, "route": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}", "record": {} }] }, 'SparkAgentLocalThread', { "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["key", "device_id", "provider", "thread_id"], "properties": { "key": { "type": "string", "minLength": 1, "maxLength": 512, "key$": "key" }, "device_id": { "type": "string", "minLength": 1, "maxLength": 200, "key$": "device_id" }, "provider": { "type": "string", "enum": ["codex", "claude"], "key$": "provider" }, "thread_id": { "type": "string", "minLength": 1, "maxLength": 200, "key$": "thread_id" }, "result_schema": { "type": ["object", "boolean"], "additionalProperties": true, "key$": "result_schema" } }, "x-ref": "#/components/schemas/ClawderLocalThreadAdoptionInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "local_thread_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "local_thread_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "in": "query", "name": "cursor", "required": false, "schema": { "type": "string" }, "index$": 3 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/task": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "local_thread_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "cursor", "in": "query", "schema": { "type": "string", "maxLength": 200 }, "index$": 3 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 20 }, "index$": 4 }] }, "PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "expected_version": { "type": "integer", "minimum": 1 }, "restricted": { "type": "boolean" }, "ask_first": { "type": "boolean" }, "allowed_senders": { "type": "array", "items": { "type": "string" }, "uniqueItems": true, "maxItems": 1000 }, "reply_with_final_answer": { "type": ["boolean", "null"], "description": "True always forwards a final answer; false disables it. Null uses native replies and the original parent-reporting default for agent-created threads." } }, "required": ["expected_version", "restricted", "ask_first", "allowed_senders"], "x-ref": "#/components/schemas/AgentRelayDeliveryPolicyInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "local_thread_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "spark_agent_local_thread.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads", "spark_agent_local_thread.update.1": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/delivery_policy", "spark_agent_local_thread.load.2": "GET-only live run: reads a record only spark_agent_local_thread.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const spark_agent_local_thread_ref01_ent = client.SparkAgentLocalThread();
        let spark_agent_local_thread_ref01_data = setup.data.new.spark_agent_local_thread['spark_agent_local_thread_ref01'];
        spark_agent_local_thread_ref01_data['agent_id'] = setup.idmap['agent01'];
        spark_agent_local_thread_ref01_data['organization_id'] = setup.idmap['organization01'];
        spark_agent_local_thread_ref01_data = (await spark_agent_local_thread_ref01_ent.create(spark_agent_local_thread_ref01_data)).data();
        (0, node_assert_1.default)(null != spark_agent_local_thread_ref01_data.id);
        // LOAD
        const spark_agent_local_thread_ref01_match_dt0 = {};
        spark_agent_local_thread_ref01_match_dt0.id = spark_agent_local_thread_ref01_data.id;
        spark_agent_local_thread_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        spark_agent_local_thread_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const spark_agent_local_thread_ref01_data_dt0 = (await spark_agent_local_thread_ref01_ent.load(spark_agent_local_thread_ref01_match_dt0)).data();
        (0, node_assert_1.default)(spark_agent_local_thread_ref01_data_dt0.id === spark_agent_local_thread_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/spark_agent_local_thread/SparkAgentLocalThreadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['spark_agent_local_thread01', 'spark_agent_local_thread02', 'spark_agent_local_thread03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_SPARK_AGENT_LOCAL_THREAD_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_SPARK_AGENT_LOCAL_THREAD_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_SPARK_AGENT_LOCAL_THREAD_ENTID'];
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
//# sourceMappingURL=SparkAgentLocalThreadEntity.test.js.map