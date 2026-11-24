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
(0, node_test_1.describe)('ProjectMessagingConversationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ProjectMessagingConversation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ProjectMessagingConversation().load({ "id": 1, "organization_id": "x", "project_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project_messaging_conversation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "assistant_number": { "a": true, "h": "Assistant Number", "n": "assistant_number", "r": true, "t": "`$STRING`", "key$": "assistant_number", "index$": 0 }, "attachment_limit": { "a": true, "h": "Attachment Limit", "n": "attachment_limit", "r": true, "t": "`$INTEGER`", "key$": "attachment_limit", "index$": 1 }, "attachment_max_bytes": { "a": true, "h": "Attachment Max Bytes", "n": "attachment_max_bytes", "r": true, "t": "`$INTEGER`", "key$": "attachment_max_bytes", "index$": 2 }, "environment_name": { "a": true, "h": "Environment Name", "n": "environment_name", "r": true, "t": "`$STRING`", "key$": "environment_name", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 4 }, "leased": { "a": true, "h": "Leased", "n": "leased", "r": true, "t": "`$BOOLEAN`", "key$": "leased", "index$": 5 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": true, "t": "`$ARRAY`", "key$": "messages", "index$": 6 }, "reconciled_at": { "a": true, "fo": "date-time", "h": "Reconciled At", "n": "reconciled_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "reconciled_at", "index$": 7 }, "retirable": { "a": true, "h": "Retirable", "n": "retirable", "r": true, "t": "`$BOOLEAN`", "key$": "retirable", "index$": 8 }, "seeded": { "a": true, "h": "Seeded", "n": "seeded", "r": true, "t": "`$BOOLEAN`", "key$": "seeded", "index$": 9 }, "send_blocked_reason": { "a": true, "h": "Send Blocked Reason", "n": "send_blocked_reason", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "send_blocked_reason", "index$": 10 }, "send_disposition": { "a": true, "h": "Send Disposition", "n": "send_disposition", "r": false, "t": "`$STRING`", "key$": "send_disposition", "index$": 11 }, "send_error": { "a": true, "h": "Send Error", "n": "send_error", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "send_error", "index$": 12 }, "tester_number": { "a": true, "h": "Tester Number", "n": "tester_number", "r": true, "t": "`$STRING`", "key$": "tester_number", "index$": 13 }, "unknown_send": { "a": true, "h": "Unknown Send", "n": "unknown_send", "r": true, "t": "`$BOOLEAN`", "key$": "unknown_send", "index$": 14 }, "verify_environment_id": { "a": true, "h": "Verify Environment Id", "n": "verify_environment_id", "r": true, "t": "`$STRING`", "key$": "verify_environment_id", "index$": 15 } }, "id": { "field": "id", "name": "id" }, "name": "project_messaging_conversation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read", "q": { "$action": "mark_read", "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "messaging_conversations" }, { "var": "id" }, { "lit": "mark_read" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/retire", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/retire", "q": { "$action": "retire", "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "messaging_conversations" }, { "var": "id" }, { "lit": "retire" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["typing"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/typing", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/typing", "q": { "$action": "typing", "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "messaging_conversations" }, { "var": "id" }, { "lit": "typing" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["assistant_number", "tester_number", "verify_environment_id"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations", "q": { "exist": ["organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "messaging_conversations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "messaging_conversations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["assistant_number", "tester_number"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "messaging_conversations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["assistant_number", "tester_number"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "messaging_conversations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "project_messaging_conversation", "name__orig": "project_messaging_conversation", "Name": "ProjectMessagingConversation", "name_": "project_messaging_conversation", "name-": "project-messaging-conversation", "NAME": "PROJECT_MESSAGING_CONVERSATION", "index$": 398 }, { "active": true, "entity": "project_messaging_conversation", "key$": "BasicProjectMessagingConversationFlow", "kind": "basic", "name": "BasicProjectMessagingConversationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "project_messaging_conversation_ref01" }, "m": { "organization_id": "organization01", "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "organization_id": "organization01", "project_id": "project01" }, "i": { "ref": "project_messaging_conversation_ref01", "srcdatavar": "project_messaging_conversation_ref01_data", "suffix": "_up0", "textfield": "assistant_number" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_messaging_conversation_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "project_messaging_conversation_ref01", "srcdatavar": "project_messaging_conversation_ref01_data", "suffix": "_dt0" }, "m": { "id": "project_messaging_conversation01", "organization_id": "organization01", "project_id": "project01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_messaging_conversation_ref01" } }], "index$": 2, "route": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}", "record": {} }] }, 'ProjectMessagingConversation', { "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/retire": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/typing": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["typing"], "properties": { "typing": { "type": "boolean" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "required": ["tester_number", "assistant_number"], "properties": { "tester_number": { "type": "string", "key$": "tester_number" }, "assistant_number": { "type": "string", "key$": "assistant_number" } }, "x-ref": "#/components/schemas/VerifyMessagingNumbers" }, { "type": "object", "required": ["verify_environment_id"], "properties": { "verify_environment_id": { "type": "string", "key$": "verify_environment_id" } } }], "type": "object", "additionalProperties": true, "x-ref": "#/components/schemas/VerifyMessagingNumbersCreate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["tester_number", "assistant_number"], "properties": { "tester_number": { "type": "string", "key$": "tester_number" }, "assistant_number": { "type": "string", "key$": "assistant_number" } }, "additionalProperties": true, "x-ref": "#/components/schemas/VerifyMessagingNumbers" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["tester_number", "assistant_number"], "properties": { "tester_number": { "type": "string", "key$": "tester_number" }, "assistant_number": { "type": "string", "key$": "assistant_number" } }, "additionalProperties": true, "x-ref": "#/components/schemas/VerifyMessagingNumbers" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "project_messaging_conversation.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/mark_read", "project_messaging_conversation.update.1": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}", "project_messaging_conversation.load.2": "GET-only live run: reads a record only project_messaging_conversation.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const project_messaging_conversation_ref01_ent = client.ProjectMessagingConversation();
        let project_messaging_conversation_ref01_data = setup.data.new.project_messaging_conversation['project_messaging_conversation_ref01'];
        project_messaging_conversation_ref01_data['organization_id'] = setup.idmap['organization01'];
        project_messaging_conversation_ref01_data['project_id'] = setup.idmap['project01'];
        project_messaging_conversation_ref01_data = (await project_messaging_conversation_ref01_ent.create(project_messaging_conversation_ref01_data)).data();
        (0, node_assert_1.default)(null != project_messaging_conversation_ref01_data.id);
        // UPDATE
        const project_messaging_conversation_ref01_data_up0 = {};
        project_messaging_conversation_ref01_data_up0.id = project_messaging_conversation_ref01_data.id;
        project_messaging_conversation_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        project_messaging_conversation_ref01_data_up0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01'];
        const project_messaging_conversation_ref01_markdef_up0 = { name: 'assistant_number', value: 'Mark01-project_messaging_conversation_ref01_' + setup.now };
        project_messaging_conversation_ref01_data_up0[project_messaging_conversation_ref01_markdef_up0.name] = project_messaging_conversation_ref01_markdef_up0.value;
        const project_messaging_conversation_ref01_resdata_up0 = (await project_messaging_conversation_ref01_ent.update(project_messaging_conversation_ref01_data_up0)).data();
        (0, node_assert_1.default)(project_messaging_conversation_ref01_resdata_up0.id === project_messaging_conversation_ref01_data_up0.id);
        (0, node_assert_1.default)(project_messaging_conversation_ref01_resdata_up0[project_messaging_conversation_ref01_markdef_up0.name] === project_messaging_conversation_ref01_markdef_up0.value);
        // LOAD
        const project_messaging_conversation_ref01_match_dt0 = {};
        project_messaging_conversation_ref01_match_dt0.id = project_messaging_conversation_ref01_data.id;
        project_messaging_conversation_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        project_messaging_conversation_ref01_match_dt0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01'];
        const project_messaging_conversation_ref01_data_dt0 = (await project_messaging_conversation_ref01_ent.load(project_messaging_conversation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(project_messaging_conversation_ref01_data_dt0.id === project_messaging_conversation_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project_messaging_conversation/ProjectMessagingConversationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project_messaging_conversation01', 'project_messaging_conversation02', 'project_messaging_conversation03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PROJECT_MESSAGING_CONVERSATION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PROJECT_MESSAGING_CONVERSATION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PROJECT_MESSAGING_CONVERSATION_ENTID'];
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
//# sourceMappingURL=ProjectMessagingConversationEntity.test.js.map