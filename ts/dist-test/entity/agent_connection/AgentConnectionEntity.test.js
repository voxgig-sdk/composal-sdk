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
(0, node_test_1.describe)('AgentConnectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentConnection();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentConnection().list({ "agent_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_connection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_card_url": { "a": true, "fo": "uri", "h": "Agent Card Url", "n": "agent_card_url", "r": true, "t": "`$STRING`", "key$": "agent_card_url", "index$": 0 }, "auth_scheme": { "a": true, "h": "Auth Scheme", "n": "auth_scheme", "r": true, "t": "`$STRING`", "key$": "auth_scheme", "index$": 1 }, "can_configure": { "a": true, "h": "Can Configure", "n": "can_configure", "r": true, "t": "`$BOOLEAN`", "key$": "can_configure", "index$": 2 }, "can_disconnect": { "a": true, "h": "Can Disconnect", "n": "can_disconnect", "r": true, "t": "`$BOOLEAN`", "key$": "can_disconnect", "index$": 3 }, "can_setup": { "a": true, "h": "Can Setup", "n": "can_setup", "r": true, "t": "`$BOOLEAN`", "key$": "can_setup", "index$": 4 }, "connection": { "a": true, "h": "Connection", "n": "connection", "r": true, "t": "`$OBJECT`", "key$": "connection", "index$": 5 }, "credential": { "a": true, "h": "Credential", "n": "credential", "r": false, "sh": "Write-only outbound key.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "wo": true, "key$": "credential", "index$": 6 }, "error_code": { "a": true, "h": "Error Code", "n": "error_code", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "error_code", "index$": 7 }, "expected_generation": { "a": true, "fo": "int64", "h": "Expected Generation", "n": "expected_generation", "r": true, "t": "`$INTEGER`", "key$": "expected_generation", "index$": 8 }, "generation": { "a": true, "fo": "int64", "h": "Generation", "n": "generation", "r": true, "t": "`$INTEGER`", "key$": "generation", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 11 }, "remote_agent": { "a": true, "h": "Remote Agent", "n": "remote_agent", "op": { "create": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "update": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "remote_agent", "index$": 12 }, "requester_id": { "a": true, "h": "Requester Id", "n": "requester_id", "r": true, "t": "`$STRING`", "key$": "requester_id", "index$": 13 }, "retired_at": { "a": true, "fo": "date-time", "h": "Retired At", "n": "retired_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "retired_at", "index$": 14 }, "revoked_at": { "a": true, "fo": "date-time", "h": "Revoked At", "n": "revoked_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "revoked_at", "index$": 15 }, "scope_key": { "a": true, "h": "Scope Key", "n": "scope_key", "r": true, "t": "`$STRING`", "key$": "scope_key", "index$": 16 }, "source_operation_id": { "a": true, "h": "Source Operation Id", "n": "source_operation_id", "op": { "create": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_operation_id", "index$": 17 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "t": "`$STRING`", "key$": "state", "index$": 18 } }, "id": { "field": "id", "name": "id" }, "name": "agent_connection", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["expected_generation"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "x_composal_relay_scope", "or": "X-Composal-Relay-Scope", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": false, "k": "header", "n": "x_composal_requester_id", "or": "X-Composal-Requester-Id", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "connection_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup", "q": { "$action": "setup", "exist": ["agent_id", "id", "organization_id", "x_composal_relay_scope", "x_composal_requester_id"] }, "r": { "param": { "connection_id": "id", "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "relay" }, { "lit": "connections" }, { "var": "id" }, { "lit": "setup" }], "t": { "req": "`reqdata`", "res": "`body.connection`" }, "index$": 0 }, { "a": true, "bf": ["agent_card_url", "auth_scheme", "credential", "name", "remote_agent", "source_operation_id"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": false, "k": "header", "n": "x_composal_relay_scope", "or": "X-Composal-Relay-Scope", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": false, "k": "header", "n": "x_composal_requester_id", "or": "X-Composal-Requester-Id", "r": true, "style": "simple", "t": "`$STRING`", "index$": 2 }], "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections", "q": { "exist": ["agent_id", "idempotency_key", "organization_id", "x_composal_relay_scope", "x_composal_requester_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "relay" }, { "lit": "connections" }], "t": { "req": "`reqdata`", "res": "`body.connection`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 30, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "selected_connection_id", "or": "selected_connection_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "relay" }, { "lit": "connections" }], "t": { "page": { "next": "`body.pagination.next`" }, "req": "`reqdata`", "res": "`body.connections`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/change", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "x_composal_relay_scope", "or": "X-Composal-Relay-Scope", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": false, "k": "header", "n": "x_composal_requester_id", "or": "X-Composal-Requester-Id", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "connection_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "id", "or": "connection_id", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 3 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "change", "or": "change", "r": true, "style": "form", "t": "`$STRING`", "index$": 0, "ex": "configure" }, { "a": true, "explode": true, "k": "query", "n": "expected_generation", "or": "expected_generation", "r": true, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/change", "q": { "$action": "change", "exist": ["agent_id", "change", "expected_generation", "id", "organization_id", "x_composal_relay_scope", "x_composal_requester_id"] }, "r": { "param": { "connection_id": "id", "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "relay" }, { "lit": "connections" }, { "var": "id" }, { "lit": "change" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "connection_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "q": { "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "connection_id": "id", "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "relay" }, { "lit": "connections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "bf": ["expected_generation"], "co": { "id": "DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "x_composal_relay_scope", "or": "X-Composal-Relay-Scope", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": false, "k": "header", "n": "x_composal_requester_id", "or": "X-Composal-Requester-Id", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "connection_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "q": { "exist": ["agent_id", "id", "organization_id", "x_composal_relay_scope", "x_composal_requester_id"] }, "r": { "param": { "connection_id": "id", "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "relay" }, { "lit": "connections" }, { "var": "id" }], "t": { "req": { "expected_generation": "`reqdata.expected_generation`" }, "res": "`body.connection`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["auth_scheme", "credential", "expected_generation", "name", "remote_agent"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "x_composal_relay_scope", "or": "X-Composal-Relay-Scope", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": false, "k": "header", "n": "x_composal_requester_id", "or": "X-Composal-Requester-Id", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "connection_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "q": { "exist": ["agent_id", "id", "organization_id", "x_composal_relay_scope", "x_composal_requester_id"] }, "r": { "param": { "connection_id": "id", "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "relay" }, { "lit": "connections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.connection`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "agent_connection", "name__orig": "agent_connection", "Name": "AgentConnection", "name_": "agent_connection", "name-": "agent-connection", "NAME": "AGENT_CONNECTION", "index$": 6 }, { "active": true, "entity": "agent_connection", "key$": "BasicAgentConnectionFlow", "kind": "basic", "name": "BasicAgentConnectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "agent_connection_ref01" }, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "agent_connection_ref01" } }], "index$": 1 }, { "a": true, "d": { "agent_id": "agent01", "organization_id": "organization01" }, "i": { "ref": "agent_connection_ref01", "srcdatavar": "agent_connection_ref01_data", "suffix": "_up0", "textfield": "agent_card_url" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_connection_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "agent_connection_ref01", "srcdatavar": "agent_connection_ref01_data", "suffix": "_dt0" }, "m": { "agent_id": "agent01", "id": "agent_connection01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_connection_ref01" } }], "index$": 3, "route": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "agent_connection_ref01", "suffix": "_rm0" }, "m": { "agent_id": "agent01", "id": "agent_connection01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "agent_connection_ref01" } }], "index$": 5 }] }, 'AgentConnection', { "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["expected_generation"], "properties": { "expected_generation": { "type": "integer", "format": "int64", "minimum": 1 } }, "x-ref": "#/components/schemas/RelayOwnerConnectionVersion" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "X-Composal-Requester-Id", "in": "header", "required": true, "schema": { "type": "string", "minLength": 1, "maxLength": 200 }, "description": "Retain the signed-in requester ID from list/detail with this exact intended write.", "index$": 3 }, { "name": "X-Composal-Relay-Scope", "in": "header", "required": true, "schema": { "type": "string", "pattern": "^[a-f0-9]{64}$" }, "description": "Retain the scope_key from list/detail with the original requester and intended write. A new membership cannot inherit that intent.", "index$": 4 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["name", "agent_card_url", "auth_scheme"], "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 100, "key$": "name" }, "auth_scheme": { "type": "string", "enum": ["bearer", "api_key", "none"], "key$": "auth_scheme" }, "credential": { "type": ["string", "null"], "minLength": 1, "maxLength": 4096, "writeOnly": true, "description": "Write-only outbound key. Required for bearer/api_key; null for none. It is never returned in owner metadata or model results.", "key$": "credential" }, "remote_agent": { "type": ["string", "null"], "minLength": 1, "maxLength": 200, "key$": "remote_agent" }, "agent_card_url": { "type": "string", "format": "uri", "maxLength": 2048, "pattern": "^https://", "key$": "agent_card_url" }, "source_operation_id": { "type": ["string", "null"], "pattern": "^device_control_operation_[A-Za-z0-9_-]+$", "key$": "source_operation_id" } }, "x-ref": "#/components/schemas/RelayOwnerConnectionCreate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "X-Composal-Requester-Id", "in": "header", "required": true, "schema": { "type": "string", "minLength": 1, "maxLength": 200 }, "description": "Retain the signed-in requester ID from list/detail with this exact intended write.", "index$": 2 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string", "minLength": 1, "maxLength": 160, "pattern": "^[A-Za-z0-9_-]+$" }, "description": "Stable key for this exact creation intent. Retain it after uncertain delivery.", "index$": 3 }, { "name": "X-Composal-Relay-Scope", "in": "header", "required": true, "schema": { "type": "string", "pattern": "^[a-f0-9]{64}$" }, "description": "Retain the scope_key from list/detail with the original requester and intended write. A new membership cannot inherit that intent.", "index$": 4 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "cursor", "in": "query", "schema": { "type": "string", "maxLength": 4096 }, "index$": 2 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 30 }, "index$": 3 }, { "name": "selected_connection_id", "in": "query", "schema": { "type": "string", "pattern": "^agent_relay_a2a_connection_[A-Za-z0-9_-]+$", "maxLength": 200 }, "description": "Include the selected current-owner connection even if it falls outside this page.", "index$": 4 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/change": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "X-Composal-Requester-Id", "in": "header", "required": true, "schema": { "type": "string", "minLength": 1, "maxLength": 200 }, "description": "Retain the signed-in requester ID from list/detail with this exact intended write.", "index$": 3 }, { "name": "X-Composal-Relay-Scope", "in": "header", "required": true, "schema": { "type": "string", "pattern": "^[a-f0-9]{64}$" }, "description": "Retain the scope_key from list/detail with the original requester and intended write. A new membership cannot inherit that intent.", "index$": 4 }, { "name": "connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 5 }, { "name": "change", "in": "query", "required": true, "schema": { "type": "string", "enum": ["configure", "disconnect"] }, "index$": 6 }, { "name": "expected_generation", "in": "query", "required": true, "schema": { "type": "integer", "minimum": 1, "format": "int64" }, "index$": 7 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["expected_generation"], "properties": { "expected_generation": { "type": "integer", "format": "int64", "minimum": 1 } }, "x-ref": "#/components/schemas/RelayOwnerConnectionVersion" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "X-Composal-Requester-Id", "in": "header", "required": true, "schema": { "type": "string", "minLength": 1, "maxLength": 200 }, "description": "Retain the signed-in requester ID from list/detail with this exact intended write.", "index$": 3 }, { "name": "X-Composal-Relay-Scope", "in": "header", "required": true, "schema": { "type": "string", "pattern": "^[a-f0-9]{64}$" }, "description": "Retain the scope_key from list/detail with the original requester and intended write. A new membership cannot inherit that intent.", "index$": 4 }] }, "PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["name", "auth_scheme", "expected_generation"], "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 100, "key$": "name" }, "auth_scheme": { "type": "string", "enum": ["bearer", "api_key", "none"], "key$": "auth_scheme" }, "credential": { "type": ["string", "null"], "minLength": 1, "maxLength": 4096, "writeOnly": true, "description": "Write-only outbound key. Required for bearer/api_key; null for none. It is never returned in owner metadata or model results.", "key$": "credential" }, "remote_agent": { "type": ["string", "null"], "minLength": 1, "maxLength": 200, "key$": "remote_agent" }, "expected_generation": { "type": "integer", "format": "int64", "minimum": 1, "key$": "expected_generation" } }, "x-ref": "#/components/schemas/RelayOwnerConnectionUpdate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "X-Composal-Requester-Id", "in": "header", "required": true, "schema": { "type": "string", "minLength": 1, "maxLength": 200 }, "description": "Retain the signed-in requester ID from list/detail with this exact intended write.", "index$": 3 }, { "name": "X-Composal-Relay-Scope", "in": "header", "required": true, "schema": { "type": "string", "pattern": "^[a-f0-9]{64}$" }, "description": "Retain the scope_key from list/detail with the original requester and intended write. A new membership cannot inherit that intent.", "index$": 4 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_connection.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}/setup", "agent_connection.update.2": "GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "agent_connection.remove.4": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/{connection_id}", "agent_connection.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const agent_connection_ref01_ent = client.AgentConnection();
        let agent_connection_ref01_data = setup.data.new.agent_connection['agent_connection_ref01'];
        agent_connection_ref01_data['agent_id'] = setup.idmap['agent01'];
        agent_connection_ref01_data['organization_id'] = setup.idmap['organization01'];
        agent_connection_ref01_data = (await agent_connection_ref01_ent.create(agent_connection_ref01_data)).data();
        (0, node_assert_1.default)(null != agent_connection_ref01_data.id);
        // LIST
        const agent_connection_ref01_match = {};
        agent_connection_ref01_match['agent_id'] = setup.idmap['agent01'];
        agent_connection_ref01_match['organization_id'] = setup.idmap['organization01'];
        const agent_connection_ref01_list = (await agent_connection_ref01_ent.list(agent_connection_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(agent_connection_ref01_list, { id: agent_connection_ref01_data.id })));
        // UPDATE
        const agent_connection_ref01_data_up0 = {};
        agent_connection_ref01_data_up0.id = agent_connection_ref01_data.id;
        agent_connection_ref01_data_up0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        agent_connection_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const agent_connection_ref01_markdef_up0 = { name: 'agent_card_url', value: 'Mark01-agent_connection_ref01_' + setup.now };
        agent_connection_ref01_data_up0[agent_connection_ref01_markdef_up0.name] = agent_connection_ref01_markdef_up0.value;
        const agent_connection_ref01_resdata_up0 = (await agent_connection_ref01_ent.update(agent_connection_ref01_data_up0)).data();
        (0, node_assert_1.default)(agent_connection_ref01_resdata_up0.id === agent_connection_ref01_data_up0.id);
        (0, node_assert_1.default)(agent_connection_ref01_resdata_up0[agent_connection_ref01_markdef_up0.name] === agent_connection_ref01_markdef_up0.value);
        // LOAD
        const agent_connection_ref01_match_dt0 = {};
        agent_connection_ref01_match_dt0.id = agent_connection_ref01_data.id;
        agent_connection_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        agent_connection_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const agent_connection_ref01_data_dt0 = (await agent_connection_ref01_ent.load(agent_connection_ref01_match_dt0)).data();
        (0, node_assert_1.default)(agent_connection_ref01_data_dt0.id === agent_connection_ref01_data.id);
        // REMOVE
        const agent_connection_ref01_match_rm0 = { id: agent_connection_ref01_data.id };
        agent_connection_ref01_match_rm0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        agent_connection_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await agent_connection_ref01_ent.remove(agent_connection_ref01_match_rm0);
        // LIST
        const agent_connection_ref01_match_rt0 = {};
        agent_connection_ref01_match_rt0['agent_id'] = setup.idmap['agent01'];
        agent_connection_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        const agent_connection_ref01_list_rt0 = (await agent_connection_ref01_ent.list(agent_connection_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(agent_connection_ref01_list_rt0, { id: agent_connection_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_connection/AgentConnectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_connection01', 'agent_connection02', 'agent_connection03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_CONNECTION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_CONNECTION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_CONNECTION_ENTID'];
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
//# sourceMappingURL=AgentConnectionEntity.test.js.map