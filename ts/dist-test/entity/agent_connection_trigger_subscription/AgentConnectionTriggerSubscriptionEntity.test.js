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
(0, node_test_1.describe)('AgentConnectionTriggerSubscriptionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentConnectionTriggerSubscription();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentConnectionTriggerSubscription().list({ "agent_connection_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_connection_trigger_subscription.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_connection_id": { "a": true, "h": "Agent Connection Id", "n": "agent_connection_id", "r": true, "t": "`$STRING`", "key$": "agent_connection_id", "index$": 0 }, "configuration": { "a": true, "h": "Configuration", "n": "configuration", "r": true, "t": "`$OBJECT`", "key$": "configuration", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "defaults": { "a": true, "h": "Defaults", "n": "defaults", "r": true, "t": "`$OBJECT`", "key$": "defaults", "index$": 3 }, "delivery": { "a": true, "h": "Delivery", "n": "delivery", "r": true, "t": "`$STRING`", "key$": "delivery", "index$": 4 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "r": true, "t": "`$BOOLEAN`", "key$": "enabled", "index$": 5 }, "failure_code": { "a": true, "h": "Failure Code", "n": "failure_code", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_code", "index$": 6 }, "failure_request_id": { "a": true, "h": "Failure Request Id", "n": "failure_request_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_request_id", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 8 }, "latency": { "a": true, "h": "Latency", "n": "latency", "r": true, "t": "`$STRING`", "key$": "latency", "index$": 9 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 10 }, "reconcile_at": { "a": true, "fo": "date-time", "h": "Reconcile At", "n": "reconcile_at", "r": true, "t": "`$STRING`", "key$": "reconcile_at", "index$": 11 }, "reconciliation_uncertain": { "a": true, "h": "Reconciliation Uncertain", "n": "reconciliation_uncertain", "r": true, "t": "`$BOOLEAN`", "key$": "reconciliation_uncertain", "index$": 12 }, "remote_enabled": { "a": true, "h": "Remote Enabled", "n": "remote_enabled", "r": true, "t": ["`$ONE`", ["`$BOOLEAN`", "`$NULL`"]], "key$": "remote_enabled", "index$": 13 }, "replacement_id": { "a": true, "h": "Replacement Id", "n": "replacement_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "replacement_id", "index$": 14 }, "retired_at": { "a": true, "fo": "date-time", "h": "Retired At", "n": "retired_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "retired_at", "index$": 15 }, "retirement_completed_at": { "a": true, "fo": "date-time", "h": "Retirement Completed At", "n": "retirement_completed_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "retirement_completed_at", "index$": 16 }, "schema": { "a": true, "h": "Schema", "n": "schema", "r": true, "t": "`$OBJECT`", "key$": "schema", "index$": 17 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 18 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 19 }, "toolkit": { "a": true, "h": "Toolkit", "n": "toolkit", "r": true, "t": "`$STRING`", "key$": "toolkit", "index$": 20 }, "toolkit_version": { "a": true, "h": "Toolkit Version", "n": "toolkit_version", "r": true, "t": "`$STRING`", "key$": "toolkit_version", "index$": 21 }, "trigger_slug": { "a": true, "h": "Trigger Slug", "n": "trigger_slug", "r": true, "t": "`$STRING`", "key$": "trigger_slug", "index$": 22 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 23 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$STRING`", "key$": "version", "index$": 24 }, "waiting_for_retirement": { "a": true, "h": "Waiting For Retirement", "n": "waiting_for_retirement", "r": true, "t": "`$BOOLEAN`", "key$": "waiting_for_retirement", "index$": 25 } }, "id": { "field": "id", "name": "id" }, "name": "agent_connection_trigger_subscription", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_connection_id", "or": "agent_connection_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover", "q": { "$action": "discover", "exist": ["agent_connection_id", "id", "organization_id"] }, "r": { "param": { "agent_connection_id": "agent_connection_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_connections" }, { "var": "agent_connection_id" }, { "lit": "trigger_subscriptions" }, { "var": "id" }, { "lit": "discover" }], "t": { "req": "`reqdata`", "res": "`body.subscription`" }, "index$": 0 }, { "a": true, "bf": ["configuration", "enabled", "trigger_slug"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/replace", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_connection_id", "or": "agent_connection_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/replace", "q": { "$action": "replace", "exist": ["agent_connection_id", "id", "organization_id"] }, "r": { "param": { "agent_connection_id": "agent_connection_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_connections" }, { "var": "agent_connection_id" }, { "lit": "trigger_subscriptions" }, { "var": "id" }, { "lit": "replace" }], "t": { "req": { "configuration": "`reqdata.configuration`", "enabled": "`reqdata.enabled`", "trigger_slug": "`reqdata.trigger_slug`" }, "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["configuration", "trigger_slug"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_connection_id", "or": "agent_connection_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions", "q": { "exist": ["agent_connection_id", "organization_id"] }, "r": { "param": { "agent_connection_id": "agent_connection_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_connections" }, { "var": "agent_connection_id" }, { "lit": "trigger_subscriptions" }], "t": { "req": { "configuration": "`reqdata.configuration`", "trigger_slug": "`reqdata.trigger_slug`" }, "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_connection_id", "or": "agent_connection_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions", "q": { "exist": ["agent_connection_id", "organization_id"] }, "r": { "param": { "agent_connection_id": "agent_connection_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_connections" }, { "var": "agent_connection_id" }, { "lit": "trigger_subscriptions" }], "t": { "page": { "next": "`body.pagination.next`" }, "req": "`reqdata`", "res": "`body.catalog`" }, "index$": 0 }], "key$": "list" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["enabled"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_connection_id", "or": "agent_connection_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}", "q": { "exist": ["agent_connection_id", "id", "organization_id"] }, "r": { "param": { "agent_connection_id": "agent_connection_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_connections" }, { "var": "agent_connection_id" }, { "lit": "trigger_subscriptions" }, { "var": "id" }], "t": { "req": { "enabled": "`reqdata.enabled`" }, "res": "`body.subscription`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_connection_id", "or": "agent_connection_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}", "q": { "exist": ["agent_connection_id", "id", "organization_id"] }, "r": { "param": { "agent_connection_id": "agent_connection_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_connections" }, { "var": "agent_connection_id" }, { "lit": "trigger_subscriptions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.subscription`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["enabled"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_connection_id", "or": "agent_connection_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}", "q": { "exist": ["agent_connection_id", "id", "organization_id"] }, "r": { "param": { "agent_connection_id": "agent_connection_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_connections" }, { "var": "agent_connection_id" }, { "lit": "trigger_subscriptions" }, { "var": "id" }], "t": { "req": { "enabled": "`reqdata.enabled`" }, "res": "`body.subscription`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent_connection"]] }, "key$": "agent_connection_trigger_subscription", "name__orig": "agent_connection_trigger_subscription", "Name": "AgentConnectionTriggerSubscription", "name_": "agent_connection_trigger_subscription", "name-": "agent-connection-trigger-subscription", "NAME": "AGENT_CONNECTION_TRIGGER_SUBSCRIPTION", "index$": 15 }, { "active": true, "entity": "agent_connection_trigger_subscription", "key$": "BasicAgentConnectionTriggerSubscriptionFlow", "kind": "basic", "name": "BasicAgentConnectionTriggerSubscriptionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "agent_connection_trigger_subscription_ref01" }, "m": { "agent_connection_id": "agent_connection01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "agent_connection_id": "agent_connection01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "agent_connection_trigger_subscription_ref01" } }], "index$": 1 }, { "a": true, "d": { "agent_connection_id": "agent_connection01", "organization_id": "organization01" }, "i": { "ref": "agent_connection_trigger_subscription_ref01", "srcdatavar": "agent_connection_trigger_subscription_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_connection_trigger_subscription_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "agent_connection_trigger_subscription_ref01", "suffix": "_rm0" }, "m": { "agent_connection_id": "agent_connection01", "id": "agent_connection_trigger_subscription01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "agent_connection_id": "agent_connection01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "agent_connection_trigger_subscription_ref01" } }], "index$": 4 }] }, 'AgentConnectionTriggerSubscription', { "POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "agent_connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/replace": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "trigger_slug": { "type": "string" }, "configuration": { "type": "object", "additionalProperties": true }, "enabled": { "type": "boolean" } }, "required": ["trigger_slug", "configuration", "enabled"] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "agent_connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "trigger_slug": { "type": "string", "key$": "trigger_slug" }, "configuration": { "type": "object", "additionalProperties": true, "key$": "configuration" } }, "required": ["trigger_slug", "configuration"] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "agent_connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "agent_connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 3 }] }, "PATCH /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "enabled": { "type": "boolean", "key$": "enabled" } }, "required": ["enabled"] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "agent_connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "DELETE /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "agent_connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PUT /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "enabled": { "type": "boolean", "key$": "enabled" } }, "required": ["enabled"] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "agent_connection_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_connection_trigger_subscription.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}/discover", "agent_connection_trigger_subscription.update.2": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}", "agent_connection_trigger_subscription.remove.3": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_connections/{agent_connection_id}/trigger_subscriptions/{id}", "agent_connection_trigger_subscription.list.4": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const agent_connection_trigger_subscription_ref01_ent = client.AgentConnectionTriggerSubscription();
        let agent_connection_trigger_subscription_ref01_data = setup.data.new.agent_connection_trigger_subscription['agent_connection_trigger_subscription_ref01'];
        agent_connection_trigger_subscription_ref01_data['agent_connection_id'] = setup.idmap['agent_connection01'];
        agent_connection_trigger_subscription_ref01_data['organization_id'] = setup.idmap['organization01'];
        agent_connection_trigger_subscription_ref01_data = (await agent_connection_trigger_subscription_ref01_ent.create(agent_connection_trigger_subscription_ref01_data)).data();
        (0, node_assert_1.default)(null != agent_connection_trigger_subscription_ref01_data.id);
        // LIST
        const agent_connection_trigger_subscription_ref01_match = {};
        agent_connection_trigger_subscription_ref01_match['agent_connection_id'] = setup.idmap['agent_connection01'];
        agent_connection_trigger_subscription_ref01_match['organization_id'] = setup.idmap['organization01'];
        const agent_connection_trigger_subscription_ref01_list = (await agent_connection_trigger_subscription_ref01_ent.list(agent_connection_trigger_subscription_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(agent_connection_trigger_subscription_ref01_list, { id: agent_connection_trigger_subscription_ref01_data.id })));
        // UPDATE
        const agent_connection_trigger_subscription_ref01_data_up0 = {};
        agent_connection_trigger_subscription_ref01_data_up0.id = agent_connection_trigger_subscription_ref01_data.id;
        agent_connection_trigger_subscription_ref01_data_up0['agent_connection_id'] = setup.idmap['agent_connection_id'] ?? setup.idmap['agent_connection01'];
        agent_connection_trigger_subscription_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const agent_connection_trigger_subscription_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-agent_connection_trigger_subscription_ref01_' + setup.now };
        agent_connection_trigger_subscription_ref01_data_up0[agent_connection_trigger_subscription_ref01_markdef_up0.name] = agent_connection_trigger_subscription_ref01_markdef_up0.value;
        const agent_connection_trigger_subscription_ref01_resdata_up0 = (await agent_connection_trigger_subscription_ref01_ent.update(agent_connection_trigger_subscription_ref01_data_up0)).data();
        (0, node_assert_1.default)(agent_connection_trigger_subscription_ref01_resdata_up0.id === agent_connection_trigger_subscription_ref01_data_up0.id);
        (0, node_assert_1.default)(agent_connection_trigger_subscription_ref01_resdata_up0[agent_connection_trigger_subscription_ref01_markdef_up0.name] === agent_connection_trigger_subscription_ref01_markdef_up0.value);
        // REMOVE
        const agent_connection_trigger_subscription_ref01_match_rm0 = { id: agent_connection_trigger_subscription_ref01_data.id };
        agent_connection_trigger_subscription_ref01_match_rm0['agent_connection_id'] = setup.idmap['agent_connection_id'] ?? setup.idmap['agent_connection01'];
        agent_connection_trigger_subscription_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await agent_connection_trigger_subscription_ref01_ent.remove(agent_connection_trigger_subscription_ref01_match_rm0);
        // LIST
        const agent_connection_trigger_subscription_ref01_match_rt0 = {};
        agent_connection_trigger_subscription_ref01_match_rt0['agent_connection_id'] = setup.idmap['agent_connection01'];
        agent_connection_trigger_subscription_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        const agent_connection_trigger_subscription_ref01_list_rt0 = (await agent_connection_trigger_subscription_ref01_ent.list(agent_connection_trigger_subscription_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(agent_connection_trigger_subscription_ref01_list_rt0, { id: agent_connection_trigger_subscription_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_connection_trigger_subscription/AgentConnectionTriggerSubscriptionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_connection_trigger_subscription01', 'agent_connection_trigger_subscription02', 'agent_connection_trigger_subscription03', 'organization01', 'organization02', 'organization03', 'agent_connection01', 'agent_connection02', 'agent_connection03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_CONNECTION_TRIGGER_SUBSCRIPTION_ENTID'];
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
//# sourceMappingURL=AgentConnectionTriggerSubscriptionEntity.test.js.map