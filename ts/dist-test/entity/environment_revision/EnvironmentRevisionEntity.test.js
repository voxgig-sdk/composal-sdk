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
(0, node_test_1.describe)('EnvironmentRevisionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.EnvironmentRevision();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.EnvironmentRevision().load({ "environment_id": 1, "id": "x", "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'environment_revision.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "allowed_origins": { "a": true, "h": "Allowed Origins", "n": "allowed_origins", "r": true, "sh": "Origins browser testers may visit, subdomains included.", "t": "`$ARRAY`", "key$": "allowed_origins", "index$": 0 }, "app_environment_id": { "a": true, "h": "App Environment Id", "n": "app_environment_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "app_environment_id", "index$": 1 }, "app_release_id": { "a": true, "h": "App Release Id", "n": "app_release_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "app_release_id", "index$": 2 }, "blueprint": { "a": true, "h": "Blueprint", "n": "blueprint", "r": true, "t": "`$OBJECT`", "key$": "blueprint", "index$": 3 }, "blueprint_json": { "a": true, "h": "Blueprint Json", "n": "blueprint_json", "r": true, "t": "`$OBJECT`", "key$": "blueprint_json", "index$": 4 }, "cleanup_state": { "a": true, "h": "Cleanup State", "n": "cleanup_state", "r": true, "t": "`$STRING`", "key$": "cleanup_state", "index$": 5 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 6 }, "digest": { "a": true, "h": "Digest", "n": "digest", "r": true, "t": "`$STRING`", "key$": "digest", "index$": 7 }, "dry_run": { "a": true, "h": "Dry Run", "n": "dry_run", "r": false, "t": "`$BOOLEAN`", "key$": "dry_run", "index$": 8 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "expires_at", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 10 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 11 }, "ready_at": { "a": true, "fo": "date-time", "h": "Ready At", "n": "ready_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ready_at", "index$": 12 }, "resolved_manifest_json": { "a": true, "h": "Resolved Manifest Json", "n": "resolved_manifest_json", "r": true, "t": "`$OBJECT`", "key$": "resolved_manifest_json", "index$": 13 }, "retention_policy_json": { "a": true, "h": "Retention Policy Json", "n": "retention_policy_json", "r": true, "t": "`$OBJECT`", "key$": "retention_policy_json", "index$": 14 }, "revision": { "a": true, "h": "Revision", "n": "revision", "r": true, "t": "`$INTEGER`", "key$": "revision", "index$": 15 }, "revoked_at": { "a": true, "fo": "date-time", "h": "Revoked At", "n": "revoked_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "revoked_at", "index$": 16 }, "runner_environment_revision_id": { "a": true, "h": "Runner Environment Revision Id", "n": "runner_environment_revision_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "runner_environment_revision_id", "index$": 17 }, "safety_policy_json": { "a": true, "h": "Safety Policy Json", "n": "safety_policy_json", "r": true, "t": "`$OBJECT`", "key$": "safety_policy_json", "index$": 18 }, "schema_version": { "a": true, "h": "Schema Version", "n": "schema_version", "r": true, "t": "`$INTEGER`", "key$": "schema_version", "index$": 19 }, "source_metadata": { "a": true, "h": "Source Metadata", "n": "source_metadata", "r": false, "t": "`$OBJECT`", "key$": "source_metadata", "index$": 20 }, "source_metadata_json": { "a": true, "h": "Source Metadata Json", "n": "source_metadata_json", "r": true, "t": "`$OBJECT`", "key$": "source_metadata_json", "index$": 21 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 22 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 23 }, "validation_json": { "a": true, "h": "Validation Json", "n": "validation_json", "r": true, "t": "`$OBJECT`", "key$": "validation_json", "index$": 24 }, "verify_environment_id": { "a": true, "h": "Verify Environment Id", "n": "verify_environment_id", "r": true, "t": "`$STRING`", "key$": "verify_environment_id", "index$": 25 } }, "id": { "field": "id", "name": "id" }, "name": "environment_revision", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "environment_id", "or": "verify_environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision", "q": { "$action": "provision", "exist": ["environment_id", "id", "idempotency_key", "organization_id"] }, "r": { "param": { "id": "id", "verify_environment_id": "environment_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "environment_id" }, { "lit": "revisions" }, { "var": "id" }, { "lit": "provision" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/revoke", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "environment_id", "or": "verify_environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/revoke", "q": { "$action": "revoke", "exist": ["environment_id", "id", "idempotency_key", "organization_id"] }, "r": { "param": { "id": "id", "verify_environment_id": "environment_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "environment_id" }, { "lit": "revisions" }, { "var": "id" }, { "lit": "revoke" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/validate", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "environment_id", "or": "verify_environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/validate", "q": { "$action": "validate", "exist": ["environment_id", "id", "idempotency_key", "organization_id"] }, "r": { "param": { "id": "id", "verify_environment_id": "environment_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "environment_id" }, { "lit": "revisions" }, { "var": "id" }, { "lit": "validate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["blueprint", "dry_run", "source_metadata"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "environment_id", "or": "verify_environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions", "q": { "exist": ["environment_id", "organization_id"] }, "r": { "param": { "verify_environment_id": "environment_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "environment_id" }, { "lit": "revisions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "environment_id", "or": "verify_environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}", "q": { "exist": ["environment_id", "id", "organization_id"] }, "r": { "param": { "id": "id", "verify_environment_id": "environment_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "environment_id" }, { "lit": "revisions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "environment_id", "or": "verify_environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}", "q": { "exist": ["environment_id", "id", "idempotency_key", "organization_id"] }, "r": { "param": { "id": "id", "verify_environment_id": "environment_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "environment_id" }, { "lit": "revisions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "environment_revision", "name__orig": "environment_revision", "Name": "EnvironmentRevision", "name_": "environment_revision", "name-": "environment-revision", "NAME": "ENVIRONMENT_REVISION", "index$": 233 }, { "active": true, "entity": "environment_revision", "key$": "BasicEnvironmentRevisionFlow", "kind": "basic", "name": "BasicEnvironmentRevisionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "environment_revision_ref01" }, "m": { "environment_id": "environment01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "environment_id": "environment01", "organization_id": "organization01" }, "i": { "ref": "environment_revision_ref01", "srcdatavar": "environment_revision_ref01_data", "suffix": "_up0", "textfield": "app_environment_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-environment_revision_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "environment_revision_ref01", "srcdatavar": "environment_revision_ref01_data", "suffix": "_dt0" }, "m": { "environment_id": "environment01", "id": "environment_revision01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-environment_revision_ref01" } }], "index$": 2, "route": "GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}", "record": { "organization_id": "organization_id" } }] }, 'EnvironmentRevision', { "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "verify_environment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/revoke": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "verify_environment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/validate": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "verify_environment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["blueprint"], "properties": { "blueprint": { "type": "object", "additionalProperties": true, "key$": "blueprint" }, "source_metadata": { "type": "object", "additionalProperties": true, "key$": "source_metadata" }, "dry_run": { "type": "boolean", "key$": "dry_run" } }, "x-ref": "#/components/schemas/VerifyEnvironmentRevisionImportInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "verify_environment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "Idempotency-Key", "in": "header", "required": false, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "verify_environment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "verify_environment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "environment_revision.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}/provision", "environment_revision.update.1": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/revisions/{id}", "environment_revision.load.2": "GET-only live run: reads a record only environment_revision.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const environment_revision_ref01_ent = client.EnvironmentRevision();
        let environment_revision_ref01_data = setup.data.new.environment_revision['environment_revision_ref01'];
        environment_revision_ref01_data['environment_id'] = setup.idmap['environment01'];
        environment_revision_ref01_data['organization_id'] = setup.idmap['organization01'];
        environment_revision_ref01_data = (await environment_revision_ref01_ent.create(environment_revision_ref01_data)).data();
        (0, node_assert_1.default)(null != environment_revision_ref01_data.id);
        // UPDATE
        const environment_revision_ref01_data_up0 = {};
        environment_revision_ref01_data_up0.id = environment_revision_ref01_data.id;
        environment_revision_ref01_data_up0['environment_id'] = setup.idmap['environment_id'] ?? setup.idmap['environment01'];
        environment_revision_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const environment_revision_ref01_markdef_up0 = { name: 'app_environment_id', value: 'Mark01-environment_revision_ref01_' + setup.now };
        environment_revision_ref01_data_up0[environment_revision_ref01_markdef_up0.name] = environment_revision_ref01_markdef_up0.value;
        const environment_revision_ref01_resdata_up0 = (await environment_revision_ref01_ent.update(environment_revision_ref01_data_up0)).data();
        (0, node_assert_1.default)(environment_revision_ref01_resdata_up0.id === environment_revision_ref01_data_up0.id);
        (0, node_assert_1.default)(environment_revision_ref01_resdata_up0[environment_revision_ref01_markdef_up0.name] === environment_revision_ref01_markdef_up0.value);
        // LOAD
        const environment_revision_ref01_match_dt0 = {};
        environment_revision_ref01_match_dt0.id = environment_revision_ref01_data.id;
        environment_revision_ref01_match_dt0['environment_id'] = setup.idmap['environment_id'] ?? setup.idmap['environment01'];
        environment_revision_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof environment_revision_ref01_data['organization_id']) ?
            environment_revision_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const environment_revision_ref01_data_dt0 = (await environment_revision_ref01_ent.load(environment_revision_ref01_match_dt0)).data();
        (0, node_assert_1.default)(environment_revision_ref01_data_dt0.id === environment_revision_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/environment_revision/EnvironmentRevisionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['environment_revision01', 'environment_revision02', 'environment_revision03', 'organization01', 'organization02', 'organization03', 'environment01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ENVIRONMENT_REVISION_ENTID'];
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
//# sourceMappingURL=EnvironmentRevisionEntity.test.js.map