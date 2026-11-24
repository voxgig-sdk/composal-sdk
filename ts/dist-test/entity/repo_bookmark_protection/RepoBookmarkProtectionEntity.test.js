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
(0, node_test_1.describe)('RepoBookmarkProtectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.RepoBookmarkProtection();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RepoBookmarkProtection().list({ "organization_id": 1, "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'repo_bookmark_protection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "actor_policy": { "a": true, "h": "Actor Policy", "n": "actor_policy", "op": { "create": { "req": false, "type": "`$OBJECT`" }, "patch": { "req": false, "type": "`$OBJECT`" }, "update": { "req": false, "type": "`$OBJECT`" } }, "r": true, "t": "`$OBJECT`", "key$": "actor_policy", "index$": 0 }, "bypass_mode": { "a": true, "h": "Bypass Mode", "n": "bypass_mode", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "bypass_mode", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "created_by_user_id": { "a": true, "h": "Created By User Id", "n": "created_by_user_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_by_user_id", "index$": 3 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "op": { "create": { "req": false, "type": "`$BOOLEAN`" }, "patch": { "req": false, "type": "`$BOOLEAN`" }, "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "enabled", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 6 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 7 }, "priority": { "a": true, "h": "Priority", "n": "priority", "op": { "create": { "req": false, "type": "`$INTEGER`" }, "patch": { "req": false, "type": "`$INTEGER`" }, "update": { "req": false, "type": "`$INTEGER`" } }, "r": true, "t": "`$INTEGER`", "key$": "priority", "index$": 8 }, "repository_id": { "a": true, "h": "Repository Id", "n": "repository_id", "r": true, "t": "`$STRING`", "key$": "repository_id", "index$": 9 }, "requirements": { "a": true, "h": "Requirements", "n": "requirements", "op": { "create": { "req": false, "type": "`$OBJECT`" }, "patch": { "req": false, "type": "`$OBJECT`" }, "update": { "req": false, "type": "`$OBJECT`" } }, "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 5 }, "key$": "requirements", "index$": 10 }, "target_kind": { "a": true, "h": "Target Kind", "n": "target_kind", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "target_kind", "index$": 11 }, "target_pattern": { "a": true, "h": "Target Pattern", "n": "target_pattern", "op": { "create": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "update": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "target_pattern", "index$": 12 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 13 }, "updated_by_user_id": { "a": true, "h": "Updated By User Id", "n": "updated_by_user_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_by_user_id", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "repo_bookmark_protection", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["actor_policy", "bypass_mode", "enabled", "name", "priority", "requirements", "target_kind", "target_pattern"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "bookmark_protections" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["actor_kind", "bookmark", "change_id", "from", "intent", "to"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/simulate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/simulate", "q": { "$action": "simulate", "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "bookmark_protections" }, { "lit": "simulate" }], "t": { "req": "`reqdata`", "res": "`body.evaluation`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "bookmark_protections" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "bookmark_protections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["actor_policy", "bypass_mode", "enabled", "name", "priority", "requirements", "target_kind", "target_pattern"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "bookmark_protections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "bookmark_protections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["actor_policy", "bypass_mode", "enabled", "name", "priority", "requirements", "target_kind", "target_pattern"], "co": { "id": "PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "bookmark_protections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo"]] }, "key$": "repo_bookmark_protection", "name__orig": "repo_bookmark_protection", "Name": "RepoBookmarkProtection", "name_": "repo_bookmark_protection", "name-": "repo-bookmark-protection", "NAME": "REPO_BOOKMARK_PROTECTION", "index$": 428 }, { "active": true, "entity": "repo_bookmark_protection", "key$": "BasicRepoBookmarkProtectionFlow", "kind": "basic", "name": "BasicRepoBookmarkProtectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "repo_bookmark_protection_ref01" }, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "repo_bookmark_protection_ref01" } }], "index$": 1 }, { "a": true, "d": { "organization_id": "organization01", "repo_id": "repo01" }, "i": { "ref": "repo_bookmark_protection_ref01", "srcdatavar": "repo_bookmark_protection_ref01_data", "suffix": "_up0", "textfield": "bypass_mode" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-repo_bookmark_protection_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "repo_bookmark_protection_ref01", "srcdatavar": "repo_bookmark_protection_ref01_data", "suffix": "_dt0" }, "m": { "id": "repo_bookmark_protection01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-repo_bookmark_protection_ref01" } }], "index$": 3, "route": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "record": { "organization_id": "organization_id" } }, { "a": true, "d": {}, "i": { "ref": "repo_bookmark_protection_ref01", "suffix": "_rm0" }, "m": { "id": "repo_bookmark_protection01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "repo_bookmark_protection_ref01" } }], "index$": 5 }] }, 'RepoBookmarkProtection', { "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "name": { "type": "string", "key$": "name" }, "enabled": { "type": "boolean", "key$": "enabled" }, "priority": { "type": "integer", "key$": "priority" }, "target_kind": { "type": "string", "enum": ["exact", "pattern", "default_branch"], "key$": "target_kind" }, "target_pattern": { "type": "string", "nullable": true, "key$": "target_pattern" }, "bypass_mode": { "type": "string", "enum": ["admins", "none"], "key$": "bypass_mode" }, "requirements": { "type": "object", "additionalProperties": true, "properties": { "ci": { "type": "object", "required": ["mode", "require_all", "required_checks"], "properties": { "mode": {}, "require_all": {}, "required_checks": {} }, "x-ref": "#/components/schemas/BookmarkProtectionCiRequirements" } }, "key$": "requirements" }, "actor_policy": { "type": "object", "additionalProperties": true, "key$": "actor_policy" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/simulate": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["bookmark", "to"], "properties": { "bookmark": { "type": "string" }, "to": { "type": "string" }, "from": { "type": "string", "nullable": true }, "intent": { "type": "string", "nullable": true }, "actor_kind": { "type": "string", "nullable": true }, "change_id": { "type": "string", "nullable": true } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "name": { "type": "string", "key$": "name" }, "enabled": { "type": "boolean", "key$": "enabled" }, "priority": { "type": "integer", "key$": "priority" }, "target_kind": { "type": "string", "enum": ["exact", "pattern", "default_branch"], "key$": "target_kind" }, "target_pattern": { "type": "string", "nullable": true, "key$": "target_pattern" }, "bypass_mode": { "type": "string", "enum": ["admins", "none"], "key$": "bypass_mode" }, "requirements": { "type": "object", "additionalProperties": true, "properties": { "ci": { "type": "object", "required": ["mode", "require_all", "required_checks"], "properties": { "mode": {}, "require_all": {}, "required_checks": {} }, "x-ref": "#/components/schemas/BookmarkProtectionCiRequirements" } }, "key$": "requirements" }, "actor_policy": { "type": "object", "additionalProperties": true, "key$": "actor_policy" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "name": { "type": "string", "key$": "name" }, "enabled": { "type": "boolean", "key$": "enabled" }, "priority": { "type": "integer", "key$": "priority" }, "target_kind": { "type": "string", "enum": ["exact", "pattern", "default_branch"], "key$": "target_kind" }, "target_pattern": { "type": "string", "nullable": true, "key$": "target_pattern" }, "bypass_mode": { "type": "string", "enum": ["admins", "none"], "key$": "bypass_mode" }, "requirements": { "type": "object", "additionalProperties": true, "properties": { "ci": { "type": "object", "required": ["mode", "require_all", "required_checks"], "properties": { "mode": {}, "require_all": {}, "required_checks": {} }, "x-ref": "#/components/schemas/BookmarkProtectionCiRequirements" } }, "key$": "requirements" }, "actor_policy": { "type": "object", "additionalProperties": true, "key$": "actor_policy" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "repo_bookmark_protection.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections", "repo_bookmark_protection.update.2": "GET-only live run: needs PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "repo_bookmark_protection.remove.4": "GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/bookmark_protections/{id}", "repo_bookmark_protection.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const repo_bookmark_protection_ref01_ent = client.RepoBookmarkProtection();
        let repo_bookmark_protection_ref01_data = setup.data.new.repo_bookmark_protection['repo_bookmark_protection_ref01'];
        repo_bookmark_protection_ref01_data['organization_id'] = setup.idmap['organization01'];
        repo_bookmark_protection_ref01_data['repo_id'] = setup.idmap['repo01'];
        repo_bookmark_protection_ref01_data = (await repo_bookmark_protection_ref01_ent.create(repo_bookmark_protection_ref01_data)).data();
        (0, node_assert_1.default)(null != repo_bookmark_protection_ref01_data.id);
        // LIST
        const repo_bookmark_protection_ref01_match = {};
        repo_bookmark_protection_ref01_match['organization_id'] = setup.idmap['organization01'];
        repo_bookmark_protection_ref01_match['repo_id'] = setup.idmap['repo01'];
        const repo_bookmark_protection_ref01_list = (await repo_bookmark_protection_ref01_ent.list(repo_bookmark_protection_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(repo_bookmark_protection_ref01_list, { id: repo_bookmark_protection_ref01_data.id })));
        // UPDATE
        const repo_bookmark_protection_ref01_data_up0 = {};
        repo_bookmark_protection_ref01_data_up0.id = repo_bookmark_protection_ref01_data.id;
        repo_bookmark_protection_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        repo_bookmark_protection_ref01_data_up0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        const repo_bookmark_protection_ref01_markdef_up0 = { name: 'bypass_mode', value: 'Mark01-repo_bookmark_protection_ref01_' + setup.now };
        repo_bookmark_protection_ref01_data_up0[repo_bookmark_protection_ref01_markdef_up0.name] = repo_bookmark_protection_ref01_markdef_up0.value;
        const repo_bookmark_protection_ref01_resdata_up0 = (await repo_bookmark_protection_ref01_ent.update(repo_bookmark_protection_ref01_data_up0)).data();
        (0, node_assert_1.default)(repo_bookmark_protection_ref01_resdata_up0.id === repo_bookmark_protection_ref01_data_up0.id);
        (0, node_assert_1.default)(repo_bookmark_protection_ref01_resdata_up0[repo_bookmark_protection_ref01_markdef_up0.name] === repo_bookmark_protection_ref01_markdef_up0.value);
        // LOAD
        const repo_bookmark_protection_ref01_match_dt0 = {};
        repo_bookmark_protection_ref01_match_dt0.id = repo_bookmark_protection_ref01_data.id;
        repo_bookmark_protection_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof repo_bookmark_protection_ref01_data['organization_id']) ?
            repo_bookmark_protection_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        repo_bookmark_protection_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        const repo_bookmark_protection_ref01_data_dt0 = (await repo_bookmark_protection_ref01_ent.load(repo_bookmark_protection_ref01_match_dt0)).data();
        (0, node_assert_1.default)(repo_bookmark_protection_ref01_data_dt0.id === repo_bookmark_protection_ref01_data.id);
        // REMOVE
        const repo_bookmark_protection_ref01_match_rm0 = { id: repo_bookmark_protection_ref01_data.id };
        repo_bookmark_protection_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        repo_bookmark_protection_ref01_match_rm0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        await repo_bookmark_protection_ref01_ent.remove(repo_bookmark_protection_ref01_match_rm0);
        // LIST
        const repo_bookmark_protection_ref01_match_rt0 = {};
        repo_bookmark_protection_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        repo_bookmark_protection_ref01_match_rt0['repo_id'] = setup.idmap['repo01'];
        const repo_bookmark_protection_ref01_list_rt0 = (await repo_bookmark_protection_ref01_ent.list(repo_bookmark_protection_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(repo_bookmark_protection_ref01_list_rt0, { id: repo_bookmark_protection_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/repo_bookmark_protection/RepoBookmarkProtectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['repo_bookmark_protection01', 'repo_bookmark_protection02', 'repo_bookmark_protection03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_REPO_BOOKMARK_PROTECTION_ENTID'];
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
//# sourceMappingURL=RepoBookmarkProtectionEntity.test.js.map