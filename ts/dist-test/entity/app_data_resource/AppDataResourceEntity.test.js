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
(0, node_test_1.describe)('AppDataResourceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AppDataResource();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppDataResource().list({ "app_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_data_resource.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app_environment_id": { "a": true, "h": "App Environment Id", "n": "app_environment_id", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "app_environment_id", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "engine": { "a": true, "h": "Engine", "n": "engine", "r": true, "t": "`$STRING`", "key$": "engine", "index$": 2 }, "failure_message": { "a": true, "h": "Failure Message", "n": "failure_message", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_message", "index$": 3 }, "high_availability": { "a": true, "h": "High Availability", "n": "high_availability", "op": { "create": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "high_availability", "index$": 4 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "r": true, "t": "`$STRING`", "key$": "hosted_app_id", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": "`$STRING`", "key$": "kind", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 8 }, "plan": { "a": true, "h": "Plan", "n": "plan", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "plan", "index$": 9 }, "provider_metadata": { "a": true, "h": "Provider Metadata", "n": "provider_metadata", "r": true, "t": "`$OBJECT`", "key$": "provider_metadata", "index$": 10 }, "region": { "a": true, "h": "Region", "n": "region", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "region", "index$": 11 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 12 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 13 }, "storage_gb": { "a": true, "h": "Storage Gb", "n": "storage_gb", "op": { "create": { "req": false, "type": "`$INTEGER`" } }, "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "storage_gb", "index$": 14 }, "storage_label": { "a": true, "h": "Storage Label", "n": "storage_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "storage_label", "index$": 15 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 16 }, "version": { "a": true, "h": "Version", "n": "version", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "version", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "app_data_resource", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/archive", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}/archive", "q": { "$action": "archive", "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }, { "lit": "archive" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/refresh", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}/refresh", "q": { "$action": "refresh", "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }, { "lit": "refresh" }], "t": { "req": "`reqdata`", "res": "`body.data_resource`" }, "index$": 1 }, { "a": true, "bf": ["app_environment_id", "backup_id", "branch_name", "high_availability", "name", "plan", "region", "restore_point", "slug", "storage_gb"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/restore", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}/restore", "q": { "$action": "restore", "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }, { "lit": "restore" }], "t": { "req": "`reqdata`", "res": "`body.data_resource`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/resume", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}/resume", "q": { "$action": "resume", "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }, { "lit": "resume" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/suspend", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}/suspend", "q": { "$action": "suspend", "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }, { "lit": "suspend" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "bf": ["app_environment_id", "engine", "high_availability", "kind", "name", "plan", "region", "slug", "storage_gb", "version"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/data_resources", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/data_resources", "q": { "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }], "t": { "req": "`reqdata`", "res": "`body.data_resource`" }, "index$": 5 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/data_resources", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/data_resources", "q": { "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/data_resources/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/hosting/apps/{app_id}/data_resources/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/hosting/apps/{app_id}/data_resources/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/hosting/apps/{app_id}/data_resources/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "app_data_resource", "name__orig": "app_data_resource", "Name": "AppDataResource", "name_": "app_data_resource", "name-": "app-data-resource", "NAME": "APP_DATA_RESOURCE", "index$": 54 }, { "active": true, "entity": "app_data_resource", "key$": "BasicAppDataResourceFlow", "kind": "basic", "name": "BasicAppDataResourceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_data_resource_ref01" }, "m": { "app_id": "app01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "app_id": "app01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "app_data_resource_ref01" } }], "index$": 1 }, { "a": true, "d": { "app_id": "app01" }, "i": { "ref": "app_data_resource_ref01", "srcdatavar": "app_data_resource_ref01_data", "suffix": "_up0", "textfield": "app_environment_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_data_resource_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "app_data_resource_ref01", "srcdatavar": "app_data_resource_ref01_data", "suffix": "_dt0" }, "m": { "app_id": "app01", "id": "app_data_resource01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_data_resource_ref01" } }], "index$": 3, "route": "GET /api/v1/hosting/apps/{app_id}/data_resources/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "app_data_resource_ref01", "suffix": "_rm0" }, "m": { "app_id": "app01", "id": "app_data_resource01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "app_id": "app01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "app_data_resource_ref01" } }], "index$": 5 }] }, 'AppDataResource', { "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/archive": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/refresh": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/restore": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "app_environment_id": { "type": "string" }, "slug": { "type": "string" }, "name": { "type": "string" }, "branch_name": { "type": "string" }, "backup_id": { "type": "string" }, "restore_point": { "type": "string" }, "plan": { "type": "string" }, "region": { "type": "string" }, "storage_gb": { "type": "integer", "minimum": 0 }, "high_availability": { "type": "boolean" } }, "additionalProperties": true, "x-ref": "#/components/schemas/AppDataResourceRestorePayload" } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/resume": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/suspend": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/hosting/apps/{app_id}/data_resources": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["slug", "name", "kind", "engine"], "properties": { "app_environment_id": { "type": "string", "key$": "app_environment_id" }, "slug": { "type": "string", "key$": "slug" }, "name": { "type": "string", "key$": "name" }, "kind": { "type": "string", "enum": ["database", "cache", "queue", "search", "vector"], "key$": "kind" }, "engine": { "type": "string", "enum": ["postgres", "mysql", "valkey"], "key$": "engine" }, "version": { "type": "string", "key$": "version" }, "plan": { "type": "string", "key$": "plan" }, "region": { "type": "string", "key$": "region" }, "storage_gb": { "type": "integer", "minimum": 0, "key$": "storage_gb" }, "high_availability": { "type": "boolean", "key$": "high_availability" } }, "additionalProperties": true, "x-ref": "#/components/schemas/AppDataResourceCreatePayload" } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/hosting/apps/{app_id}/data_resources": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/hosting/apps/{app_id}/data_resources/{id}": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/hosting/apps/{app_id}/data_resources/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/hosting/apps/{app_id}/data_resources/{id}": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/hosting/apps/{app_id}/data_resources/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "app_data_resource.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/archive", "app_data_resource.update.2": "GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/data_resources/{id}", "app_data_resource.remove.4": "GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/data_resources/{id}", "app_data_resource.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const app_data_resource_ref01_ent = client.AppDataResource();
        let app_data_resource_ref01_data = setup.data.new.app_data_resource['app_data_resource_ref01'];
        app_data_resource_ref01_data['app_id'] = setup.idmap['app01'];
        app_data_resource_ref01_data = (await app_data_resource_ref01_ent.create(app_data_resource_ref01_data)).data();
        (0, node_assert_1.default)(null != app_data_resource_ref01_data.id);
        // LIST
        const app_data_resource_ref01_match = {};
        app_data_resource_ref01_match['app_id'] = setup.idmap['app01'];
        const app_data_resource_ref01_list = (await app_data_resource_ref01_ent.list(app_data_resource_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(app_data_resource_ref01_list, { id: app_data_resource_ref01_data.id })));
        // UPDATE
        const app_data_resource_ref01_data_up0 = {};
        app_data_resource_ref01_data_up0.id = app_data_resource_ref01_data.id;
        app_data_resource_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        const app_data_resource_ref01_markdef_up0 = { name: 'app_environment_id', value: 'Mark01-app_data_resource_ref01_' + setup.now };
        app_data_resource_ref01_data_up0[app_data_resource_ref01_markdef_up0.name] = app_data_resource_ref01_markdef_up0.value;
        const app_data_resource_ref01_resdata_up0 = (await app_data_resource_ref01_ent.update(app_data_resource_ref01_data_up0)).data();
        (0, node_assert_1.default)(app_data_resource_ref01_resdata_up0.id === app_data_resource_ref01_data_up0.id);
        (0, node_assert_1.default)(app_data_resource_ref01_resdata_up0[app_data_resource_ref01_markdef_up0.name] === app_data_resource_ref01_markdef_up0.value);
        // LOAD
        const app_data_resource_ref01_match_dt0 = {};
        app_data_resource_ref01_match_dt0.id = app_data_resource_ref01_data.id;
        app_data_resource_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        const app_data_resource_ref01_data_dt0 = (await app_data_resource_ref01_ent.load(app_data_resource_ref01_match_dt0)).data();
        (0, node_assert_1.default)(app_data_resource_ref01_data_dt0.id === app_data_resource_ref01_data.id);
        // REMOVE
        const app_data_resource_ref01_match_rm0 = { id: app_data_resource_ref01_data.id };
        app_data_resource_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        await app_data_resource_ref01_ent.remove(app_data_resource_ref01_match_rm0);
        // LIST
        const app_data_resource_ref01_match_rt0 = {};
        app_data_resource_ref01_match_rt0['app_id'] = setup.idmap['app01'];
        const app_data_resource_ref01_list_rt0 = (await app_data_resource_ref01_ent.list(app_data_resource_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(app_data_resource_ref01_list_rt0, { id: app_data_resource_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_data_resource/AppDataResourceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_data_resource01', 'app_data_resource02', 'app_data_resource03', 'app01', 'app02', 'app03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_APP_DATA_RESOURCE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_APP_DATA_RESOURCE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_APP_DATA_RESOURCE_ENTID'];
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
//# sourceMappingURL=AppDataResourceEntity.test.js.map