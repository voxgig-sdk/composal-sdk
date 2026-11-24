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
(0, node_test_1.describe)('ExecutionRuntimeInstanceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ExecutionRuntimeInstance();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('execution_runtime_instance hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.ComposalSDK.test(offline).ExecutionRuntimeInstance().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.ComposalSDK.test(offline).ExecutionRuntimeInstance()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ExecutionRuntimeInstance().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.ComposalSDK.test().ExecutionRuntimeInstance().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.ComposalSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ExecutionRuntimeInstance().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ExecutionRuntimeInstance().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ExecutionRuntimeInstance().list({ "app_environment_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'execution_runtime_instance.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "adapter_kind": { "a": true, "h": "Adapter Kind", "n": "adapter_kind", "r": true, "t": "`$STRING`", "key$": "adapter_kind", "index$": 0 }, "app_environment_id": { "a": true, "h": "App Environment Id", "n": "app_environment_id", "r": true, "t": "`$STRING`", "key$": "app_environment_id", "index$": 1 }, "app_release_id": { "a": true, "h": "App Release Id", "n": "app_release_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "app_release_id", "index$": 2 }, "app_service_id": { "a": true, "h": "App Service Id", "n": "app_service_id", "r": true, "t": "`$STRING`", "key$": "app_service_id", "index$": 3 }, "booted_at": { "a": true, "fo": "date-time", "h": "Booted At", "n": "booted_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "booted_at", "index$": 4 }, "booted_at_label": { "a": true, "h": "Booted At Label", "n": "booted_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "booted_at_label", "index$": 5 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 6 }, "created_at_label": { "a": true, "h": "Created At Label", "n": "created_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at_label", "index$": 7 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "r": true, "t": "`$STRING`", "key$": "hosted_app_id", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 9 }, "instance_key": { "a": true, "h": "Instance Key", "n": "instance_key", "r": true, "t": "`$STRING`", "key$": "instance_key", "index$": 10 }, "last_reconciled_at": { "a": true, "fo": "date-time", "h": "Last Reconciled At", "n": "last_reconciled_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_reconciled_at", "index$": 11 }, "last_reconciled_at_label": { "a": true, "h": "Last Reconciled At Label", "n": "last_reconciled_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_reconciled_at_label", "index$": 12 }, "last_seen_at": { "a": true, "fo": "date-time", "h": "Last Seen At", "n": "last_seen_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_seen_at", "index$": 13 }, "last_seen_at_label": { "a": true, "h": "Last Seen At Label", "n": "last_seen_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_seen_at_label", "index$": 14 }, "location": { "a": true, "h": "Location", "n": "location", "r": true, "t": "`$ANY`", "key$": "location", "index$": 15 }, "location_id": { "a": true, "h": "Location Id", "n": "location_id", "r": true, "t": "`$STRING`", "key$": "location_id", "index$": 16 }, "network_peer_id": { "a": true, "h": "Network Peer Id", "n": "network_peer_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "network_peer_id", "index$": 17 }, "nomad_allocation_id": { "a": true, "h": "Nomad Allocation Id", "n": "nomad_allocation_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "nomad_allocation_id", "index$": 18 }, "nomad_task_name": { "a": true, "h": "Nomad Task Name", "n": "nomad_task_name", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "nomad_task_name", "index$": 19 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 20 }, "private_ipv4": { "a": true, "h": "Private Ipv4", "n": "private_ipv4", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "private_ipv4", "index$": 21 }, "private_ipv6": { "a": true, "h": "Private Ipv6", "n": "private_ipv6", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "private_ipv6", "index$": 22 }, "provider_instance_id": { "a": true, "h": "Provider Instance Id", "n": "provider_instance_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "provider_instance_id", "index$": 23 }, "public_endpoint": { "a": true, "h": "Public Endpoint", "n": "public_endpoint", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "public_endpoint", "index$": 24 }, "service_name": { "a": true, "h": "Service Name", "n": "service_name", "r": true, "sh": "Name of the Vex service this instance runs, in the same vocabulary as `vex deploy list`.", "t": "`$STRING`", "key$": "service_name", "index$": 25 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 26 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 27 }, "terminated_at": { "a": true, "fo": "date-time", "h": "Terminated At", "n": "terminated_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "terminated_at", "index$": 28 }, "terminated_at_label": { "a": true, "h": "Terminated At Label", "n": "terminated_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "terminated_at_label", "index$": 29 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 30 }, "updated_at_label": { "a": true, "h": "Updated At Label", "n": "updated_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at_label", "index$": 31 } }, "id": { "field": "id", "name": "id" }, "name": "execution_runtime_instance", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/execution/runtime_instances/{id}/refresh", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/execution/runtime_instances/{id}/refresh", "q": { "$action": "refresh", "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "execution" }, { "lit": "runtime_instances" }, { "var": "id" }, { "lit": "refresh" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/execution/runtime_instances/{id}/terminate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/execution/runtime_instances/{id}/terminate", "q": { "$action": "terminate", "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "execution" }, { "lit": "runtime_instances" }, { "var": "id" }, { "lit": "terminate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/execution/runtime_instances", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/execution/runtime_instances", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "execution" }, { "lit": "runtime_instances" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/execution/runtime_instances", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "explode": true, "k": "query", "n": "app_environment_id", "or": "app_environment_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "app_service_id", "or": "app_service_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "hosted_app_id", "or": "hosted_app_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/execution/runtime_instances", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "execution" }, { "lit": "runtime_instances" }], "t": { "page": { "next": "`body.pagination.next`", "total": "`body.pagination.count`" }, "req": "`reqdata`", "res": "`body.runtime_instances`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/execution/runtime_instances/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/execution/runtime_instances/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "execution" }, { "lit": "runtime_instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/execution/runtime_instances/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/execution/runtime_instances/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "execution" }, { "lit": "runtime_instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/execution/runtime_instances/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/execution/runtime_instances/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "execution" }, { "lit": "runtime_instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/execution/runtime_instances/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/execution/runtime_instances/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "execution" }, { "lit": "runtime_instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "execution_runtime_instance", "name__orig": "execution_runtime_instance", "Name": "ExecutionRuntimeInstance", "name_": "execution_runtime_instance", "name-": "execution-runtime-instance", "NAME": "EXECUTION_RUNTIME_INSTANCE", "index$": 241 }, { "active": true, "entity": "execution_runtime_instance", "key$": "BasicExecutionRuntimeInstanceFlow", "kind": "basic", "name": "BasicExecutionRuntimeInstanceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "execution_runtime_instance_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "execution_runtime_instance_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "execution_runtime_instance_ref01", "srcdatavar": "execution_runtime_instance_ref01_data", "suffix": "_up0", "textfield": "adapter_kind" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-execution_runtime_instance_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "execution_runtime_instance_ref01", "srcdatavar": "execution_runtime_instance_ref01_data", "suffix": "_dt0" }, "m": { "id": "execution_runtime_instance01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-execution_runtime_instance_ref01" } }], "index$": 3, "route": "GET /api/v1/execution/runtime_instances/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "execution_runtime_instance_ref01", "suffix": "_rm0" }, "m": { "id": "execution_runtime_instance01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "execution_runtime_instance_ref01" } }], "index$": 5 }] }, 'ExecutionRuntimeInstance', { "POST /api/v1/execution/runtime_instances/{id}/refresh": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/execution/runtime_instances/{id}/terminate": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/execution/runtime_instances": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [] }, "GET /api/v1/execution/runtime_instances": { "protocol": "http", "parameters": [{ "name": "hosted_app_id", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "app_environment_id", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "app_service_id", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "name": "page", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 3 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 4 }] }, "GET /api/v1/execution/runtime_instances/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/execution/runtime_instances/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /api/v1/execution/runtime_instances/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/execution/runtime_instances/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "execution_runtime_instance.create.0": "GET-only live run: needs POST /api/v1/execution/runtime_instances/{id}/refresh", "execution_runtime_instance.update.2": "GET-only live run: needs PUT /api/v1/execution/runtime_instances/{id}", "execution_runtime_instance.remove.4": "GET-only live run: needs DELETE /api/v1/execution/runtime_instances/{id}", "execution_runtime_instance.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const execution_runtime_instance_ref01_ent = client.ExecutionRuntimeInstance();
        let execution_runtime_instance_ref01_data = setup.data.new.execution_runtime_instance['execution_runtime_instance_ref01'];
        execution_runtime_instance_ref01_data = (await execution_runtime_instance_ref01_ent.create(execution_runtime_instance_ref01_data)).data();
        (0, node_assert_1.default)(null != execution_runtime_instance_ref01_data.id);
        // LIST
        const execution_runtime_instance_ref01_match = {};
        const execution_runtime_instance_ref01_list = (await execution_runtime_instance_ref01_ent.list(execution_runtime_instance_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(execution_runtime_instance_ref01_list, { id: execution_runtime_instance_ref01_data.id })));
        // UPDATE
        const execution_runtime_instance_ref01_data_up0 = {};
        execution_runtime_instance_ref01_data_up0.id = execution_runtime_instance_ref01_data.id;
        const execution_runtime_instance_ref01_markdef_up0 = { name: 'adapter_kind', value: 'Mark01-execution_runtime_instance_ref01_' + setup.now };
        execution_runtime_instance_ref01_data_up0[execution_runtime_instance_ref01_markdef_up0.name] = execution_runtime_instance_ref01_markdef_up0.value;
        const execution_runtime_instance_ref01_resdata_up0 = (await execution_runtime_instance_ref01_ent.update(execution_runtime_instance_ref01_data_up0)).data();
        (0, node_assert_1.default)(execution_runtime_instance_ref01_resdata_up0.id === execution_runtime_instance_ref01_data_up0.id);
        (0, node_assert_1.default)(execution_runtime_instance_ref01_resdata_up0[execution_runtime_instance_ref01_markdef_up0.name] === execution_runtime_instance_ref01_markdef_up0.value);
        // LOAD
        const execution_runtime_instance_ref01_match_dt0 = {};
        execution_runtime_instance_ref01_match_dt0.id = execution_runtime_instance_ref01_data.id;
        const execution_runtime_instance_ref01_data_dt0 = (await execution_runtime_instance_ref01_ent.load(execution_runtime_instance_ref01_match_dt0)).data();
        (0, node_assert_1.default)(execution_runtime_instance_ref01_data_dt0.id === execution_runtime_instance_ref01_data.id);
        // REMOVE
        const execution_runtime_instance_ref01_match_rm0 = { id: execution_runtime_instance_ref01_data.id };
        await execution_runtime_instance_ref01_ent.remove(execution_runtime_instance_ref01_match_rm0);
        // LIST
        const execution_runtime_instance_ref01_match_rt0 = {};
        const execution_runtime_instance_ref01_list_rt0 = (await execution_runtime_instance_ref01_ent.list(execution_runtime_instance_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(execution_runtime_instance_ref01_list_rt0, { id: execution_runtime_instance_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/execution_runtime_instance/ExecutionRuntimeInstanceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['execution_runtime_instance01', 'execution_runtime_instance02', 'execution_runtime_instance03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_EXECUTION_RUNTIME_INSTANCE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_EXECUTION_RUNTIME_INSTANCE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_EXECUTION_RUNTIME_INSTANCE_ENTID'];
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
//# sourceMappingURL=ExecutionRuntimeInstanceEntity.test.js.map