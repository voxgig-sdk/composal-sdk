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
(0, node_test_1.describe)('PullRequestEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.PullRequest();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PullRequest().load({ "id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pull_request.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "available_tests": { "a": true, "h": "Available Tests", "n": "available_tests", "r": true, "sh": "All active saved scenarios in the configured project, including scenarios outside the automatic selection.", "t": "`$ARRAY`", "key$": "available_tests", "index$": 0 }, "branch": { "a": true, "h": "Branch", "n": "branch", "r": false, "sh": "Exact deployed source branch; refused if it differs from the canonical request branch.", "t": "`$STRING`", "key$": "branch", "index$": 1 }, "cleanup_only": { "a": true, "h": "Cleanup Only", "n": "cleanup_only", "r": false, "sh": "Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing.", "t": "`$BOOLEAN`", "key$": "cleanup_only", "index$": 2 }, "current_run": { "a": true, "h": "Current Run", "n": "current_run", "r": false, "sh": "Latest verification request if it matches the current head and base, independent of history pagination.", "t": "`$ANY`", "key$": "current_run", "index$": 3 }, "findings": { "a": true, "h": "Findings", "n": "findings", "r": true, "t": "`$ARRAY`", "key$": "findings", "index$": 4 }, "head_sha": { "a": true, "h": "Head Sha", "n": "head_sha", "r": false, "sh": "If supplied, refuse to create a run unless this is the current PR head.", "t": "`$STRING`", "key$": "head_sha", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "idempotency_key": { "a": true, "h": "Idempotency Key", "n": "idempotency_key", "r": true, "t": "`$STRING`", "key$": "idempotency_key", "index$": 7 }, "imessage_number": { "a": true, "h": "Imessage Number", "n": "imessage_number", "r": false, "sh": "International destination of this exact deployed commit.", "t": "`$STRING`", "key$": "imessage_number", "index$": 8 }, "number": { "a": true, "h": "Number", "n": "number", "r": false, "t": "`$INTEGER`", "key$": "number", "index$": 9 }, "pagination": { "a": true, "h": "Pagination", "n": "pagination", "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 3 }, "key$": "pagination", "index$": 10 }, "permissions": { "a": true, "h": "Permissions", "n": "permissions", "r": true, "t": "`$OBJECT`", "key$": "permissions", "index$": 11 }, "preview_cleanup_ready": { "a": true, "h": "Preview Cleanup Ready", "n": "preview_cleanup_ready", "r": true, "sh": "The source is closed or merged and unfinished Scenario execution and Discovery have stopped.", "t": "`$BOOLEAN`", "key$": "preview_cleanup_ready", "index$": 12 }, "preview_url": { "a": true, "fo": "uri", "h": "Preview Url", "n": "preview_url", "r": false, "sh": "Most recently supplied preview URL for the current head commit, retained across verification attempts.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "preview_url", "index$": 13 }, "project": { "a": true, "h": "Project", "n": "project", "r": false, "t": "`$ANY`", "key$": "project", "index$": 14 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "sh": "Composal project slug or public ID for PR preview environments.", "t": "`$STRING`", "key$": "project_id", "index$": 15 }, "pull_request": { "a": true, "h": "Pull Request", "n": "pull_request", "r": true, "t": "`$OBJECT`", "key$": "pull_request", "index$": 16 }, "repository_id": { "a": true, "h": "Repository Id", "n": "repository_id", "r": false, "t": "`$STRING`", "key$": "repository_id", "index$": 17 }, "runs": { "a": true, "h": "Runs", "n": "runs", "r": true, "t": "`$ARRAY`", "key$": "runs", "index$": 18 } }, "id": { "field": "id", "name": "id" }, "name": "pull_request", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share", "q": { "$action": "demo_share", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "pull_requests" }, { "var": "id" }, { "lit": "demo_share" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["head_sha", "idempotency_key", "scenario_ids"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/rerun", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/pull_requests/{id}/rerun", "q": { "$action": "rerun", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "pull_requests" }, { "var": "id" }, { "lit": "rerun" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["branch", "cleanup_only", "head_sha", "idempotency_key", "imessage_number", "number", "preview_url", "project_id", "repository_id"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/pull_requests", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/pull_requests", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "pull_requests" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["branch", "environment", "head_sha", "imessage_number", "no_preview", "number", "preview_url", "project_id", "repository_id"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/pull_requests/preview", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/pull_requests/preview", "q": { "$action": "preview", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "pull_requests" }, { "lit": "preview" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/pull_requests/lookup", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "number", "or": "number", "r": true, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "source_repository", "or": "source_repository", "r": true, "style": "form", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/pull_requests/lookup", "q": { "$action": "lookup", "exist": ["number", "organization_id", "project_id", "source_repository"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "pull_requests" }, { "lit": "lookup" }], "t": { "page": { "next": "`body.pagination.next`", "total": "`body.pagination.count`" }, "req": "`reqdata`", "res": "`body.available_tests`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/pull_requests/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/pull_requests/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "pull_requests" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share", "q": { "$action": "demo_share", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "pull_requests" }, { "var": "id" }, { "lit": "demo_share" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "pull_request", "name__orig": "pull_request", "Name": "PullRequest", "name_": "pull_request", "name-": "pull-request", "NAME": "PULL_REQUEST", "index$": 404 }, { "active": true, "entity": "pull_request", "key$": "BasicPullRequestFlow", "kind": "basic", "name": "BasicPullRequestFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "pull_request_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "pull_request_ref01", "srcdatavar": "pull_request_ref01_data", "suffix": "_dt0" }, "m": { "id": "pull_request01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-pull_request_ref01" } }], "index$": 1, "route": "GET /api/v1/organizations/{organization_id}/verify/pull_requests/{id}", "record": {} }, { "a": false, "d": {}, "i": { "ref": "pull_request_ref01", "suffix": "_rm0" }, "m": { "id": "pull_request01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "unreachable": true }] }, 'PullRequest', { "POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/rerun": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["idempotency_key"], "properties": { "idempotency_key": { "type": "string" }, "head_sha": { "type": "string", "description": "If supplied, refuse to create a run unless this is the current PR head." }, "scenario_ids": { "type": "array", "minItems": 1, "items": { "type": "string" }, "description": "Manually run these available project scenarios instead of automatic relevance selection." } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/organizations/{organization_id}/verify/pull_requests": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["idempotency_key"], "properties": { "repository_id": { "type": "string", "key$": "repository_id" }, "number": { "type": "integer", "key$": "number" }, "idempotency_key": { "type": "string", "key$": "idempotency_key" }, "head_sha": { "type": "string", "description": "If supplied, refuse to create a run unless this is the current PR head.", "key$": "head_sha" }, "project_id": { "type": "string", "description": "Composal project slug or public ID for PR preview environments. Defaults to the configured template project. Cannot reassign a tracked PR.", "key$": "project_id" }, "branch": { "type": "string", "description": "Exact deployed source branch; refused if it differs from the canonical request branch.", "key$": "branch" }, "preview_url": { "type": "string", "format": "uri", "description": "Required for a branch preview when no open PR exists.", "key$": "preview_url" }, "cleanup_only": { "type": "boolean", "description": "Refresh canonical PR state and cancel closed-preview work without preparing a new verification request, including when its PR record is missing.", "key$": "cleanup_only" }, "imessage_number": { "type": "string", "description": "International destination of this exact deployed commit. May accompany preview_url.", "key$": "imessage_number" } }, "anyOf": [{ "required": ["number"] }, { "required": ["branch"] }], "allOf": [{ "anyOf": [{ "required": ["project_id"] }, { "required": ["repository_id"] }] }] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/organizations/{organization_id}/verify/pull_requests/preview": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["number", "head_sha"], "properties": { "repository_id": { "type": "string" }, "number": { "type": "integer" }, "head_sha": { "type": "string" }, "environment": { "type": "string" }, "preview_url": { "type": "string", "format": "uri", "description": "Deployed URL for this exact PR head. Requires an external Verify template. Mutually exclusive with environment." }, "project_id": { "type": "string", "description": "Composal project slug or public ID for PR preview environments. Defaults to the configured template project. Cannot reassign a tracked PR." }, "branch": { "type": "string", "description": "Exact deployed source branch; refused if it differs from the canonical request branch." }, "no_preview": { "type": "boolean", "enum": [true], "description": "CI built no preview because this commit changes nothing a preview serves. The commit's waiting run is skipped instead of timing out as blocked." }, "imessage_number": { "type": "string", "description": "International destination of this exact deployed commit. May accompany preview_url." } }, "oneOf": [{ "required": ["environment"] }, { "anyOf": [{ "required": ["preview_url"] }, { "required": ["imessage_number"] }] }, { "required": ["no_preview"] }], "anyOf": [{ "required": ["project_id"] }, { "required": ["repository_id"] }] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/verify/pull_requests/lookup": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "page", "in": "query", "schema": { "type": "integer" }, "index$": 1 }, { "in": "query", "name": "project_id", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "in": "query", "name": "source_repository", "required": true, "schema": { "type": "string" }, "index$": 3 }, { "in": "query", "name": "number", "required": true, "schema": { "type": "integer", "minimum": 1 }, "index$": 4 }] }, "GET /api/v1/organizations/{organization_id}/verify/pull_requests/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "page", "in": "query", "schema": { "type": "integer" }, "index$": 2 }] }, "DELETE /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "pull_request.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share", "pull_request.load.1": "GET-only live run: reads a record only pull_request.create.0 gives", "pull_request.remove.2": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const pull_request_ref01_ent = client.PullRequest();
        let pull_request_ref01_data = setup.data.new.pull_request['pull_request_ref01'];
        pull_request_ref01_data['organization_id'] = setup.idmap['organization01'];
        pull_request_ref01_data = (await pull_request_ref01_ent.create(pull_request_ref01_data)).data();
        (0, node_assert_1.default)(null != pull_request_ref01_data.id);
        // LOAD
        const pull_request_ref01_match_dt0 = {};
        pull_request_ref01_match_dt0.id = pull_request_ref01_data.id;
        pull_request_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const pull_request_ref01_data_dt0 = (await pull_request_ref01_ent.load(pull_request_ref01_match_dt0)).data();
        (0, node_assert_1.default)(pull_request_ref01_data_dt0.id === pull_request_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pull_request/PullRequestTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pull_request01', 'pull_request02', 'pull_request03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PULL_REQUEST_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PULL_REQUEST_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PULL_REQUEST_ENTID'];
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
//# sourceMappingURL=PullRequestEntity.test.js.map