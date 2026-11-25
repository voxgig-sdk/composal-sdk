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
(0, node_test_1.describe)('RepoCodeRuleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.RepoCodeRule();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RepoCodeRule().list({ "organization_id": 1, "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'repo_code_rule.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_revision_number": { "a": true, "h": "Active Revision Number", "n": "active_revision_number", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "active_revision_number", "index$": 0 }, "capabilities": { "a": true, "h": "Capabilities", "n": "capabilities", "r": true, "t": "`$OBJECT`", "key$": "capabilities", "index$": 1 }, "code_rule": { "a": true, "h": "Code Rule", "n": "code_rule", "r": true, "t": "`$ANY`", "key$": "code_rule", "index$": 2 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 3 }, "definition": { "a": true, "h": "Definition", "n": "definition", "r": true, "t": "`$OBJECT`", "key$": "definition", "index$": 4 }, "draft_pending": { "a": true, "h": "Draft Pending", "n": "draft_pending", "r": true, "sh": "The latest revision is not the active one", "t": "`$BOOLEAN`", "key$": "draft_pending", "index$": 5 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "r": true, "t": "`$BOOLEAN`", "key$": "enabled", "index$": 6 }, "expected_version": { "a": true, "h": "Expected Version", "n": "expected_version", "r": true, "t": "`$INTEGER`", "key$": "expected_version", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 8 }, "latest_revision_number": { "a": true, "h": "Latest Revision Number", "n": "latest_revision_number", "r": true, "t": "`$INTEGER`", "key$": "latest_revision_number", "index$": 9 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Name of the latest revision", "t": "`$STRING`", "key$": "name", "index$": 10 }, "repository": { "a": true, "h": "Repository", "n": "repository", "r": true, "t": "`$OBJECT`", "key$": "repository", "index$": 11 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": true, "t": "`$ARRAY`", "key$": "scope", "index$": 12 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 13 }, "state_version": { "a": true, "h": "State Version", "n": "state_version", "r": true, "sh": "Send back as expected_version on every mutation", "t": "`$INTEGER`", "key$": "state_version", "index$": 14 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 15 }, "web_url": { "a": true, "h": "Web Url", "n": "web_url", "r": true, "t": "`$STRING`", "key$": "web_url", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "repo_code_rule", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["definition"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "code_rules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "rule", "or": "rule", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "code_rules" }], "t": { "req": "`reqdata`", "res": "`body.code_rules`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "rule", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "rule": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "code_rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.code_rule`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["definition", "expected_version"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "rule", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "rule": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "code_rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.code_rule`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "bf": ["expected_version"], "co": { "id": "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "rule", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "rule": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "code_rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["expected_version"], "co": { "id": "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}/activation", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "rule", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}/activation", "q": { "$action": "activation", "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "rule": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "code_rules" }, { "var": "id" }, { "lit": "activation" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["definition", "expected_version"], "co": { "id": "PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "rule", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "rule": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "code_rules" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.code_rule`" }, "index$": 0 }, { "a": true, "bf": ["expected_version", "revision"], "co": { "id": "PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}/activation", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "rule", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}/activation", "q": { "$action": "activation", "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id", "rule": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "code_rules" }, { "var": "id" }, { "lit": "activation" }], "t": { "req": "`reqdata`", "res": "`body.code_rule`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "repo_code_rule", "name__orig": "repo_code_rule", "Name": "RepoCodeRule", "name_": "repo_code_rule", "name-": "repo-code-rule", "NAME": "REPO_CODE_RULE", "index$": 429 }, { "active": true, "entity": "repo_code_rule", "key$": "BasicRepoCodeRuleFlow", "kind": "basic", "name": "BasicRepoCodeRuleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "repo_code_rule_ref01" }, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "repo_code_rule_ref01" } }], "index$": 1 }, { "a": true, "d": { "organization_id": "organization01", "repo_id": "repo01" }, "i": { "ref": "repo_code_rule_ref01", "srcdatavar": "repo_code_rule_ref01_data", "suffix": "_up0", "textfield": "created_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-repo_code_rule_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "repo_code_rule_ref01", "srcdatavar": "repo_code_rule_ref01_data", "suffix": "_dt0" }, "m": { "id": "repo_code_rule01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-repo_code_rule_ref01" } }], "index$": 3, "route": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "repo_code_rule_ref01", "suffix": "_rm0" }, "m": { "id": "repo_code_rule01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "repo_code_rule_ref01" } }], "index$": 5 }] }, 'RepoCodeRule', { "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["definition"], "properties": { "definition": { "type": "object", "required": ["slug", "name", "scope", "question"], "properties": { "schema_version": { "type": "integer", "enum": [1] }, "slug": { "type": "string" }, "name": { "type": "string" }, "description": { "type": "string" }, "scope": { "type": "array", "items": { "type": "string" } }, "source": { "type": "string" }, "question": { "type": "string" } }, "x-ref": "#/components/schemas/CodeRuleDefinitionInput", "key$": "definition" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "rule", "in": "query", "required": false, "description": "Slug or code_rule ID of one rule to expand inline as selected_rule", "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "rule", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["definition", "expected_version"], "properties": { "definition": { "type": "object", "required": ["slug", "name", "scope", "question"], "properties": { "schema_version": { "type": "integer", "enum": [1] }, "slug": { "type": "string" }, "name": { "type": "string" }, "description": { "type": "string" }, "scope": { "type": "array", "items": { "type": "string" } }, "source": { "type": "string" }, "question": { "type": "string" } }, "x-ref": "#/components/schemas/CodeRuleDefinitionInput", "key$": "definition" }, "expected_version": { "type": "integer", "key$": "expected_version" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "rule", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["expected_version"], "properties": { "expected_version": { "type": "integer" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "rule", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}/activation": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["expected_version"], "properties": { "expected_version": { "type": "integer" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "rule", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["definition", "expected_version"], "properties": { "definition": { "type": "object", "required": ["slug", "name", "scope", "question"], "properties": { "schema_version": { "type": "integer", "enum": [1] }, "slug": { "type": "string" }, "name": { "type": "string" }, "description": { "type": "string" }, "scope": { "type": "array", "items": { "type": "string" } }, "source": { "type": "string" }, "question": { "type": "string" } }, "x-ref": "#/components/schemas/CodeRuleDefinitionInput", "key$": "definition" }, "expected_version": { "type": "integer", "key$": "expected_version" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "rule", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}/activation": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["revision", "expected_version"], "properties": { "revision": { "type": "integer" }, "expected_version": { "type": "integer" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "rule", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "repo_code_rule.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules", "repo_code_rule.update.2": "GET-only live run: needs PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "repo_code_rule.remove.4": "GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/code_rules/{rule}", "repo_code_rule.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const repo_code_rule_ref01_ent = client.RepoCodeRule();
        let repo_code_rule_ref01_data = setup.data.new.repo_code_rule['repo_code_rule_ref01'];
        repo_code_rule_ref01_data['organization_id'] = setup.idmap['organization01'];
        repo_code_rule_ref01_data['repo_id'] = setup.idmap['repo01'];
        repo_code_rule_ref01_data = (await repo_code_rule_ref01_ent.create(repo_code_rule_ref01_data)).data();
        (0, node_assert_1.default)(null != repo_code_rule_ref01_data.id);
        // LIST
        const repo_code_rule_ref01_match = {};
        repo_code_rule_ref01_match['organization_id'] = setup.idmap['organization01'];
        repo_code_rule_ref01_match['repo_id'] = setup.idmap['repo01'];
        const repo_code_rule_ref01_list = (await repo_code_rule_ref01_ent.list(repo_code_rule_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(repo_code_rule_ref01_list, { id: repo_code_rule_ref01_data.id })));
        // UPDATE
        const repo_code_rule_ref01_data_up0 = {};
        repo_code_rule_ref01_data_up0.id = repo_code_rule_ref01_data.id;
        repo_code_rule_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        repo_code_rule_ref01_data_up0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        const repo_code_rule_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-repo_code_rule_ref01_' + setup.now };
        repo_code_rule_ref01_data_up0[repo_code_rule_ref01_markdef_up0.name] = repo_code_rule_ref01_markdef_up0.value;
        const repo_code_rule_ref01_resdata_up0 = (await repo_code_rule_ref01_ent.update(repo_code_rule_ref01_data_up0)).data();
        (0, node_assert_1.default)(repo_code_rule_ref01_resdata_up0.id === repo_code_rule_ref01_data_up0.id);
        (0, node_assert_1.default)(repo_code_rule_ref01_resdata_up0[repo_code_rule_ref01_markdef_up0.name] === repo_code_rule_ref01_markdef_up0.value);
        // LOAD
        const repo_code_rule_ref01_match_dt0 = {};
        repo_code_rule_ref01_match_dt0.id = repo_code_rule_ref01_data.id;
        repo_code_rule_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        repo_code_rule_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        const repo_code_rule_ref01_data_dt0 = (await repo_code_rule_ref01_ent.load(repo_code_rule_ref01_match_dt0)).data();
        (0, node_assert_1.default)(repo_code_rule_ref01_data_dt0.id === repo_code_rule_ref01_data.id);
        // REMOVE
        const repo_code_rule_ref01_match_rm0 = { id: repo_code_rule_ref01_data.id };
        repo_code_rule_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        repo_code_rule_ref01_match_rm0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        await repo_code_rule_ref01_ent.remove(repo_code_rule_ref01_match_rm0);
        // LIST
        const repo_code_rule_ref01_match_rt0 = {};
        repo_code_rule_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        repo_code_rule_ref01_match_rt0['repo_id'] = setup.idmap['repo01'];
        const repo_code_rule_ref01_list_rt0 = (await repo_code_rule_ref01_ent.list(repo_code_rule_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(repo_code_rule_ref01_list_rt0, { id: repo_code_rule_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/repo_code_rule/RepoCodeRuleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['repo_code_rule01', 'repo_code_rule02', 'repo_code_rule03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_REPO_CODE_RULE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_REPO_CODE_RULE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_REPO_CODE_RULE_ENTID'];
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
//# sourceMappingURL=RepoCodeRuleEntity.test.js.map