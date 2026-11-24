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
(0, node_test_1.describe)('OrganizationWorkloadIdentityEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.OrganizationWorkloadIdentity();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.OrganizationWorkloadIdentity().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'organization_workload_identity.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "organization_workload_identity", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/activate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}/activate", "q": { "$action": "activate", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }, { "lit": "activate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/issue_exchange_token", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}/issue_exchange_token", "q": { "$action": "issue_exchange_token", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }, { "lit": "issue_exchange_token" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/materialize", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}/materialize", "q": { "$action": "materialize", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }, { "lit": "materialize" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/revoke", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}/revoke", "q": { "$action": "revoke", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }, { "lit": "revoke" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/suspend", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}/suspend", "q": { "$action": "suspend", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }, { "lit": "suspend" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/workload_identities", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities", "q": { "exist": ["organization_id"] }, "r": { "param": { "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/workload_identities/token_exchange", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/token_exchange", "q": { "$action": "token_exchange", "exist": ["organization_id"] }, "r": { "param": { "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "lit": "token_exchange" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 6 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/identity/organizations/{organization_id}/workload_identities", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities", "q": { "exist": ["organization_id"] }, "r": { "param": { "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "workload_identities" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "organization_workload_identity", "name__orig": "organization_workload_identity", "Name": "OrganizationWorkloadIdentity", "name_": "organization_workload_identity", "name-": "organization-workload-identity", "NAME": "ORGANIZATION_WORKLOAD_IDENTITY", "index$": 357 }, { "active": true, "entity": "organization_workload_identity", "key$": "BasicOrganizationWorkloadIdentityFlow", "kind": "basic", "name": "BasicOrganizationWorkloadIdentityFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "organization_workload_identity_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "organization_workload_identity_ref01" } }], "index$": 1 }, { "a": true, "d": { "organization_id": "organization01" }, "i": { "ref": "organization_workload_identity_ref01", "srcdatavar": "organization_workload_identity_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_workload_identity_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "organization_workload_identity_ref01", "srcdatavar": "organization_workload_identity_ref01_data", "suffix": "_dt0" }, "m": { "id": "organization_workload_identity01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_workload_identity_ref01" } }], "index$": 3, "route": "GET /api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "organization_workload_identity_ref01", "suffix": "_rm0" }, "m": { "id": "organization_workload_identity01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "organization_workload_identity_ref01" } }], "index$": 5 }] }, 'OrganizationWorkloadIdentity', { "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/activate": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/issue_exchange_token": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/materialize": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/revoke": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/suspend": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/identity/organizations/{organization_id}/workload_identities": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/identity/organizations/{organization_id}/workload_identities/token_exchange": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/identity/organizations/{organization_id}/workload_identities": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/identity/organizations/{organization_id}/workload_identities/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/identity/organizations/{organization_id}/workload_identities/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/identity/organizations/{organization_id}/workload_identities/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/identity/organizations/{organization_id}/workload_identities/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "organization_workload_identity.create.0": "GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/workload_identities/{id}/activate", "organization_workload_identity.update.2": "GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "organization_workload_identity.remove.4": "GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/workload_identities/{id}", "organization_workload_identity.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const organization_workload_identity_ref01_ent = client.OrganizationWorkloadIdentity();
        let organization_workload_identity_ref01_data = setup.data.new.organization_workload_identity['organization_workload_identity_ref01'];
        organization_workload_identity_ref01_data['organization_id'] = setup.idmap['organization01'];
        organization_workload_identity_ref01_data = (await organization_workload_identity_ref01_ent.create(organization_workload_identity_ref01_data)).data();
        (0, node_assert_1.default)(null != organization_workload_identity_ref01_data.id);
        // LIST
        const organization_workload_identity_ref01_match = {};
        organization_workload_identity_ref01_match['organization_id'] = setup.idmap['organization01'];
        const organization_workload_identity_ref01_list = (await organization_workload_identity_ref01_ent.list(organization_workload_identity_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(organization_workload_identity_ref01_list, { id: organization_workload_identity_ref01_data.id })));
        // UPDATE
        const organization_workload_identity_ref01_data_up0 = {};
        organization_workload_identity_ref01_data_up0.id = organization_workload_identity_ref01_data.id;
        organization_workload_identity_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const organization_workload_identity_ref01_resdata_up0 = (await organization_workload_identity_ref01_ent.update(organization_workload_identity_ref01_data_up0)).data();
        (0, node_assert_1.default)(organization_workload_identity_ref01_resdata_up0.id === organization_workload_identity_ref01_data_up0.id);
        // LOAD
        const organization_workload_identity_ref01_match_dt0 = {};
        organization_workload_identity_ref01_match_dt0.id = organization_workload_identity_ref01_data.id;
        organization_workload_identity_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const organization_workload_identity_ref01_data_dt0 = (await organization_workload_identity_ref01_ent.load(organization_workload_identity_ref01_match_dt0)).data();
        (0, node_assert_1.default)(organization_workload_identity_ref01_data_dt0.id === organization_workload_identity_ref01_data.id);
        // REMOVE
        const organization_workload_identity_ref01_match_rm0 = { id: organization_workload_identity_ref01_data.id };
        organization_workload_identity_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await organization_workload_identity_ref01_ent.remove(organization_workload_identity_ref01_match_rm0);
        // LIST
        const organization_workload_identity_ref01_match_rt0 = {};
        organization_workload_identity_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        const organization_workload_identity_ref01_list_rt0 = (await organization_workload_identity_ref01_ent.list(organization_workload_identity_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(organization_workload_identity_ref01_list_rt0, { id: organization_workload_identity_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/organization_workload_identity/OrganizationWorkloadIdentityTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['organization_workload_identity01', 'organization_workload_identity02', 'organization_workload_identity03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ORGANIZATION_WORKLOAD_IDENTITY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ORGANIZATION_WORKLOAD_IDENTITY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ORGANIZATION_WORKLOAD_IDENTITY_ENTID'];
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
//# sourceMappingURL=OrganizationWorkloadIdentityEntity.test.js.map