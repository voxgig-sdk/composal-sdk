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
(0, node_test_1.describe)('ProjectEnvironmentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ProjectEnvironment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ProjectEnvironment().list({ "organization_id": 1, "project_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project_environment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "allowed_actions": { "a": true, "h": "Allowed Actions", "n": "allowed_actions", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "allowed_actions", "index$": 0 }, "allowed_origins": { "a": true, "h": "Allowed Origins", "n": "allowed_origins", "op": { "create": { "req": false, "type": "`$ARRAY`" }, "patch": { "req": false, "type": "`$ARRAY`" }, "update": { "req": false, "type": "`$ARRAY`" } }, "r": true, "t": "`$ARRAY`", "key$": "allowed_origins", "index$": 1 }, "archived_at": { "a": true, "fo": "date-time", "h": "Archived At", "n": "archived_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "archived_at", "index$": 2 }, "base_url": { "a": true, "fo": "uri", "h": "Base Url", "n": "base_url", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "update": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "base_url", "index$": 3 }, "base_url_changeable": { "a": true, "h": "Base Url Changeable", "n": "base_url_changeable", "r": true, "sh": "Whether an update may send a new base_url.", "t": "`$BOOLEAN`", "key$": "base_url_changeable", "index$": 4 }, "binary": { "a": true, "h": "Binary", "n": "binary", "r": false, "t": "`$STRING`", "key$": "binary", "index$": 5 }, "conversation_only_messaging": { "a": true, "h": "Conversation Only Messaging", "n": "conversation_only_messaging", "r": true, "t": "`$BOOLEAN`", "key$": "conversation_only_messaging", "index$": 6 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 7 }, "desktop": { "a": true, "h": "Desktop", "n": "desktop", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "union": { "branches": 2, "count": 2, "depth": 3 }, "key$": "desktop", "index$": 8 }, "execution_mode": { "a": true, "h": "Execution Mode", "n": "execution_mode", "r": true, "t": "`$STRING`", "key$": "execution_mode", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 10 }, "imessage_number": { "a": true, "h": "Imessage Number", "n": "imessage_number", "op": { "create": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "update": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "sh": "International destination number; blank or null clears it on an added environment.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "imessage_number", "index$": 11 }, "kind": { "a": true, "h": "Kind", "n": "kind", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "kind", "index$": 12 }, "lock_version": { "a": true, "h": "Lock Version", "n": "lock_version", "r": true, "t": "`$INTEGER`", "key$": "lock_version", "index$": 13 }, "messaging_conversation": { "a": true, "h": "Messaging Conversation", "n": "messaging_conversation", "r": true, "t": "`$ANY`", "key$": "messaging_conversation", "index$": 14 }, "messaging_problem": { "a": true, "h": "Messaging Problem", "n": "messaging_problem", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "messaging_problem", "index$": 15 }, "messaging_source": { "a": true, "h": "Messaging Source", "n": "messaging_source", "r": true, "t": "`$ANY`", "key$": "messaging_source", "index$": 16 }, "messaging_tester_number": { "a": true, "h": "Messaging Tester Number", "n": "messaging_tester_number", "op": { "create": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "update": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "sh": "One configured tester number.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "messaging_tester_number", "index$": 17 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 18 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": true, "t": "`$STRING`", "key$": "project_id", "index$": 19 }, "pull_request": { "a": true, "h": "Pull Request", "n": "pull_request", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "pull_request", "index$": 20 }, "source_branch": { "a": true, "h": "Source Branch", "n": "source_branch", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_branch", "index$": 21 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 22 }, "verify_network_connection_id": { "a": true, "h": "Verify Network Connection Id", "n": "verify_network_connection_id", "op": { "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "update": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "verify_network_connection_id", "index$": 23 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$INTEGER`", "key$": "version", "index$": 24 } }, "id": { "field": "id", "name": "id" }, "name": "project_environment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["version"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive", "q": { "$action": "archive", "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "environments" }, { "var": "id" }, { "lit": "archive" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["allowed_actions", "allowed_origins", "base_url", "binary", "desktop", "imessage_number", "kind", "messaging_tester_number", "name"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments", "q": { "exist": ["organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "environments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments", "q": { "exist": ["organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "environments" }], "t": { "req": "`reqdata`", "res": "`body.environments`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "environments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/directory", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "archived", "or": "archived", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "environments_page", "or": "environments_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "previews_page", "or": "previews_page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/directory", "q": { "$action": "directory", "exist": ["organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "environments" }, { "lit": "directory" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["allowed_actions", "allowed_origins", "base_url", "binary", "imessage_number", "kind", "messaging_tester_number", "name", "verify_network_connection_id", "version"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "environments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["allowed_actions", "allowed_origins", "base_url", "binary", "imessage_number", "kind", "messaging_tester_number", "name", "verify_network_connection_id", "version"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "environments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "project_environment", "name__orig": "project_environment", "Name": "ProjectEnvironment", "name_": "project_environment", "name-": "project-environment", "NAME": "PROJECT_ENVIRONMENT", "index$": 390 }, { "active": true, "entity": "project_environment", "key$": "BasicProjectEnvironmentFlow", "kind": "basic", "name": "BasicProjectEnvironmentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "project_environment_ref01" }, "m": { "organization_id": "organization01", "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "project_id": "project01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "project_environment_ref01" } }], "index$": 1 }, { "a": true, "d": { "organization_id": "organization01", "project_id": "project01" }, "i": { "ref": "project_environment_ref01", "srcdatavar": "project_environment_ref01_data", "suffix": "_up0", "textfield": "allowed_actions" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_environment_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "project_environment_ref01", "srcdatavar": "project_environment_ref01_data", "suffix": "_dt0" }, "m": { "id": "project_environment01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_environment_ref01" } }], "index$": 3, "route": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}", "record": { "project_id": "project_id" } }] }, 'ProjectEnvironment', { "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["version"], "properties": { "version": { "type": "integer", "minimum": 0 } }, "additionalProperties": true, "x-ref": "#/components/schemas/RecordVersion" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["name"], "properties": { "desktop": { "oneOf": [{ "type": "object", "additionalProperties": false, "not": { "required": [] }, "required": ["image", "description"], "oneOf": [{}, {}], "properties": { "platform": {}, "provider": {}, "image": {}, "description": {}, "setup_command": {}, "launch_command": {}, "artifact_paths": {}, "ios": {}, "android": {}, "managed_binary": {} }, "x-ref": "#/components/schemas/DesktopConfiguration" }, { "type": "object", "additionalProperties": false, "properties": { "description": {}, "setup_command": {}, "artifact_paths": {} }, "x-ref": "#/components/schemas/ManagedDesktopOptions" }, { "type": "object", "additionalProperties": false, "not": { "required": [] }, "required": ["image", "description"], "oneOf": [{}, {}], "properties": { "platform": {}, "provider": {}, "image": {}, "description": {}, "setup_command": {}, "launch_command": {}, "artifact_paths": {}, "ios": {}, "android": {}, "managed_binary": {} }, "x-ref": "#/components/schemas/DesktopConfiguration" }, { "type": "object", "additionalProperties": false, "properties": { "description": {}, "setup_command": {}, "artifact_paths": {} }, "x-ref": "#/components/schemas/ManagedDesktopOptions" }], "key$": "desktop" }, "name": { "type": "string", "maxLength": 160, "key$": "name" }, "kind": { "type": "string", "enum": ["production", "staging", "preview", "development", "custom"], "key$": "kind" }, "base_url": { "type": "string", "format": "uri", "key$": "base_url" }, "allowed_origins": { "type": "array", "items": { "type": "string", "format": "uri" }, "key$": "allowed_origins" }, "allowed_actions": { "type": "string", "enum": ["read_only", "writes"], "key$": "allowed_actions" }, "binary": { "type": "string", "key$": "binary" }, "imessage_number": { "type": "string", "nullable": true, "description": "International destination number; blank or null clears it on an added environment.", "key$": "imessage_number" }, "messaging_tester_number": { "type": "string", "nullable": true, "description": "One configured tester number. Copied to each preview; may be overridden locally before preparation.", "key$": "messaging_tester_number" } }, "additionalProperties": true, "x-ref": "#/components/schemas/EnvironmentCreate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/directory": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "query", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "name": "archived", "in": "query", "required": false, "schema": { "type": "boolean" }, "index$": 3 }, { "name": "environments_page", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 4 }, { "name": "previews_page", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 5 }] }, "PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["version"], "properties": { "name": { "type": "string", "maxLength": 160, "key$": "name" }, "kind": { "type": "string", "enum": ["production", "staging", "preview", "development", "custom"], "key$": "kind" }, "base_url": { "type": ["string", "null"], "format": "uri", "key$": "base_url" }, "allowed_origins": { "type": "array", "items": { "type": "string", "format": "uri" }, "key$": "allowed_origins" }, "allowed_actions": { "type": "string", "enum": ["read_only", "writes"], "key$": "allowed_actions" }, "verify_network_connection_id": { "type": "string", "nullable": true, "key$": "verify_network_connection_id" }, "version": { "type": "integer", "minimum": 0, "key$": "version" }, "binary": { "type": "string", "key$": "binary" }, "imessage_number": { "type": "string", "nullable": true, "description": "International destination number; blank or null clears it on an added environment.", "key$": "imessage_number" }, "messaging_tester_number": { "type": "string", "nullable": true, "description": "One configured tester number. Copied to each preview; may be overridden locally before preparation.", "key$": "messaging_tester_number" } }, "additionalProperties": true, "x-ref": "#/components/schemas/EnvironmentUpdate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["version"], "properties": { "name": { "type": "string", "maxLength": 160, "key$": "name" }, "kind": { "type": "string", "enum": ["production", "staging", "preview", "development", "custom"], "key$": "kind" }, "base_url": { "type": ["string", "null"], "format": "uri", "key$": "base_url" }, "allowed_origins": { "type": "array", "items": { "type": "string", "format": "uri" }, "key$": "allowed_origins" }, "allowed_actions": { "type": "string", "enum": ["read_only", "writes"], "key$": "allowed_actions" }, "verify_network_connection_id": { "type": "string", "nullable": true, "key$": "verify_network_connection_id" }, "version": { "type": "integer", "minimum": 0, "key$": "version" }, "binary": { "type": "string", "key$": "binary" }, "imessage_number": { "type": "string", "nullable": true, "description": "International destination number; blank or null clears it on an added environment.", "key$": "imessage_number" }, "messaging_tester_number": { "type": "string", "nullable": true, "description": "One configured tester number. Copied to each preview; may be overridden locally before preparation.", "key$": "messaging_tester_number" } }, "additionalProperties": true, "x-ref": "#/components/schemas/EnvironmentUpdate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "project_environment.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}/archive", "project_environment.update.2": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/environments/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const project_environment_ref01_ent = client.ProjectEnvironment();
        let project_environment_ref01_data = setup.data.new.project_environment['project_environment_ref01'];
        project_environment_ref01_data['organization_id'] = setup.idmap['organization01'];
        project_environment_ref01_data['project_id'] = setup.idmap['project01'];
        project_environment_ref01_data = (await project_environment_ref01_ent.create(project_environment_ref01_data)).data();
        (0, node_assert_1.default)(null != project_environment_ref01_data.id);
        // LIST
        const project_environment_ref01_match = {};
        project_environment_ref01_match['organization_id'] = setup.idmap['organization01'];
        project_environment_ref01_match['project_id'] = setup.idmap['project01'];
        const project_environment_ref01_list = (await project_environment_ref01_ent.list(project_environment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(project_environment_ref01_list, { id: project_environment_ref01_data.id })));
        // UPDATE
        const project_environment_ref01_data_up0 = {};
        project_environment_ref01_data_up0.id = project_environment_ref01_data.id;
        project_environment_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        project_environment_ref01_data_up0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01'];
        const project_environment_ref01_markdef_up0 = { name: 'allowed_actions', value: 'Mark01-project_environment_ref01_' + setup.now };
        project_environment_ref01_data_up0[project_environment_ref01_markdef_up0.name] = project_environment_ref01_markdef_up0.value;
        const project_environment_ref01_resdata_up0 = (await project_environment_ref01_ent.update(project_environment_ref01_data_up0)).data();
        (0, node_assert_1.default)(project_environment_ref01_resdata_up0.id === project_environment_ref01_data_up0.id);
        (0, node_assert_1.default)(project_environment_ref01_resdata_up0[project_environment_ref01_markdef_up0.name] === project_environment_ref01_markdef_up0.value);
        // LOAD
        const project_environment_ref01_match_dt0 = {};
        project_environment_ref01_match_dt0.id = project_environment_ref01_data.id;
        project_environment_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        project_environment_ref01_match_dt0['project_id'] = ['string', 'number', 'boolean'].includes(typeof project_environment_ref01_data['project_id']) ?
            project_environment_ref01_data['project_id'] : setup.idmap['project_id'];
        const project_environment_ref01_data_dt0 = (await project_environment_ref01_ent.load(project_environment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(project_environment_ref01_data_dt0.id === project_environment_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project_environment/ProjectEnvironmentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project_environment01', 'project_environment02', 'project_environment03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PROJECT_ENVIRONMENT_ENTID'];
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
//# sourceMappingURL=ProjectEnvironmentEntity.test.js.map