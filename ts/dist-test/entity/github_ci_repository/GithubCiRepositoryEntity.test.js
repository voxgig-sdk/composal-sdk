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
(0, node_test_1.describe)('GithubCiRepositoryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.GithubCiRepository();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.GithubCiRepository().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'github_ci_repository.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "adoption_mode": { "a": true, "h": "Adoption Mode", "n": "adoption_mode", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "adoption_mode", "index$": 0 }, "check_name_prefix": { "a": true, "h": "Check Name Prefix", "n": "check_name_prefix", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "check_name_prefix", "index$": 1 }, "ci_runner_pool_id": { "a": true, "h": "Ci Runner Pool Id", "n": "ci_runner_pool_id", "op": { "create": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "update": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ci_runner_pool_id", "index$": 2 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 3 }, "created_at_label": { "a": true, "h": "Created At Label", "n": "created_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at_label", "index$": 4 }, "default_branch": { "a": true, "h": "Default Branch", "n": "default_branch", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "default_branch", "index$": 5 }, "github_app_installation_id": { "a": true, "h": "Github App Installation Id", "n": "github_app_installation_id", "r": true, "t": "`$STRING`", "key$": "github_app_installation_id", "index$": 6 }, "github_repository_id": { "a": true, "h": "Github Repository Id", "n": "github_repository_id", "r": true, "t": "`$STRING`", "key$": "github_repository_id", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 8 }, "last_compatibility_status": { "a": true, "h": "Last Compatibility Status", "n": "last_compatibility_status", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_compatibility_status", "index$": 9 }, "last_error_message": { "a": true, "h": "Last Error Message", "n": "last_error_message", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_error_message", "index$": 10 }, "last_head_sha": { "a": true, "h": "Last Head Sha", "n": "last_head_sha", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_head_sha", "index$": 11 }, "last_pull_request_number": { "a": true, "h": "Last Pull Request Number", "n": "last_pull_request_number", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "last_pull_request_number", "index$": 12 }, "last_ref": { "a": true, "h": "Last Ref", "n": "last_ref", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_ref", "index$": 13 }, "last_webhook_action": { "a": true, "h": "Last Webhook Action", "n": "last_webhook_action", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_webhook_action", "index$": 14 }, "last_webhook_at": { "a": true, "fo": "date-time", "h": "Last Webhook At", "n": "last_webhook_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_webhook_at", "index$": 15 }, "last_webhook_at_label": { "a": true, "h": "Last Webhook At Label", "n": "last_webhook_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_webhook_at_label", "index$": 16 }, "last_webhook_delivery_id": { "a": true, "h": "Last Webhook Delivery Id", "n": "last_webhook_delivery_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_webhook_delivery_id", "index$": 17 }, "last_webhook_event": { "a": true, "h": "Last Webhook Event", "n": "last_webhook_event", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_webhook_event", "index$": 18 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": true, "t": "`$OBJECT`", "key$": "metadata", "index$": 19 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 20 }, "permission_status": { "a": true, "h": "Permission Status", "n": "permission_status", "op": { "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "permission_status", "index$": 21 }, "repository_full_name": { "a": true, "h": "Repository Full Name", "n": "repository_full_name", "r": true, "t": "`$STRING`", "key$": "repository_full_name", "index$": 22 }, "repository_name": { "a": true, "h": "Repository Name", "n": "repository_name", "r": true, "t": "`$STRING`", "key$": "repository_name", "index$": 23 }, "repository_owner": { "a": true, "h": "Repository Owner", "n": "repository_owner", "r": true, "t": "`$STRING`", "key$": "repository_owner", "index$": 24 }, "status": { "a": true, "h": "Status", "n": "status", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "status", "index$": 25 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 26 }, "updated_at_label": { "a": true, "h": "Updated At Label", "n": "updated_at_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at_label", "index$": 27 }, "webhook_delivery_count": { "a": true, "h": "Webhook Delivery Count", "n": "webhook_delivery_count", "r": true, "t": "`$INTEGER`", "key$": "webhook_delivery_count", "index$": 28 } }, "id": { "field": "id", "name": "id" }, "name": "github_ci_repository", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["adoption_mode", "check_name_prefix", "ci_runner_pool_id", "default_branch", "github_app_installation_id", "github_repository_id", "repository_name", "repository_owner", "status"], "co": { "id": "POST /api/v1/organizations/{organization_id}/github_ci_repositories", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/github_ci_repositories", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_ci_repositories" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/github_ci_repositories", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "adoption_mode", "or": "adoption_mode", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "status", "or": "status", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/github_ci_repositories", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_ci_repositories" }], "t": { "req": "`reqdata`", "res": "`body.github_ci_repositories`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/github_ci_repositories/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/github_ci_repositories/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_ci_repositories" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["adoption_mode", "check_name_prefix", "ci_runner_pool_id", "default_branch", "permission_status", "status"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/github_ci_repositories/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/github_ci_repositories/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_ci_repositories" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["adoption_mode", "check_name_prefix", "ci_runner_pool_id", "default_branch", "permission_status", "status"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/github_ci_repositories/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/github_ci_repositories/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_ci_repositories" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "github_ci_repository", "name__orig": "github_ci_repository", "Name": "GithubCiRepository", "name_": "github_ci_repository", "name-": "github-ci-repository", "NAME": "GITHUB_CI_REPOSITORY", "index$": 253 }, { "active": true, "entity": "github_ci_repository", "key$": "BasicGithubCiRepositoryFlow", "kind": "basic", "name": "BasicGithubCiRepositoryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "github_ci_repository_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "github_ci_repository_ref01" } }], "index$": 1 }, { "a": true, "d": { "organization_id": "organization01" }, "i": { "ref": "github_ci_repository_ref01", "srcdatavar": "github_ci_repository_ref01_data", "suffix": "_up0", "textfield": "adoption_mode" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-github_ci_repository_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "github_ci_repository_ref01", "srcdatavar": "github_ci_repository_ref01_data", "suffix": "_dt0" }, "m": { "id": "github_ci_repository01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-github_ci_repository_ref01" } }], "index$": 3, "route": "GET /api/v1/organizations/{organization_id}/github_ci_repositories/{id}", "record": { "organization_id": "organization_id" } }] }, 'GithubCiRepository', { "POST /api/v1/organizations/{organization_id}/github_ci_repositories": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["github_app_installation_id", "github_repository_id", "repository_owner", "repository_name"], "properties": { "github_app_installation_id": { "type": "string", "key$": "github_app_installation_id" }, "ci_runner_pool_id": { "type": "string", "nullable": true, "key$": "ci_runner_pool_id" }, "github_repository_id": { "type": "string", "key$": "github_repository_id" }, "repository_owner": { "type": "string", "key$": "repository_owner" }, "repository_name": { "type": "string", "key$": "repository_name" }, "default_branch": { "type": "string", "key$": "default_branch" }, "status": { "type": "string", "enum": ["active", "paused", "archived"], "key$": "status" }, "adoption_mode": { "type": "string", "enum": ["shadow", "reporting", "required"], "key$": "adoption_mode" }, "check_name_prefix": { "type": "string", "key$": "check_name_prefix" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/github_ci_repositories": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "status", "in": "query", "required": false, "schema": { "type": "string", "enum": ["active", "paused", "archived"] }, "index$": 1 }, { "name": "adoption_mode", "in": "query", "required": false, "schema": { "type": "string", "enum": ["shadow", "reporting", "required"] }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/github_ci_repositories/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/organizations/{organization_id}/github_ci_repositories/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "ci_runner_pool_id": { "type": "string", "nullable": true, "key$": "ci_runner_pool_id" }, "default_branch": { "type": "string", "key$": "default_branch" }, "status": { "type": "string", "enum": ["active", "paused", "archived"], "key$": "status" }, "adoption_mode": { "type": "string", "enum": ["shadow", "reporting", "required"], "key$": "adoption_mode" }, "check_name_prefix": { "type": "string", "key$": "check_name_prefix" }, "permission_status": { "type": "string", "enum": ["unchecked", "ok", "missing"], "key$": "permission_status" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/organizations/{organization_id}/github_ci_repositories/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "ci_runner_pool_id": { "type": "string", "nullable": true, "key$": "ci_runner_pool_id" }, "default_branch": { "type": "string", "key$": "default_branch" }, "status": { "type": "string", "enum": ["active", "paused", "archived"], "key$": "status" }, "adoption_mode": { "type": "string", "enum": ["shadow", "reporting", "required"], "key$": "adoption_mode" }, "check_name_prefix": { "type": "string", "key$": "check_name_prefix" }, "permission_status": { "type": "string", "enum": ["unchecked", "ok", "missing"], "key$": "permission_status" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "github_ci_repository.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/github_ci_repositories", "github_ci_repository.update.2": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/github_ci_repositories/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const github_ci_repository_ref01_ent = client.GithubCiRepository();
        let github_ci_repository_ref01_data = setup.data.new.github_ci_repository['github_ci_repository_ref01'];
        github_ci_repository_ref01_data['organization_id'] = setup.idmap['organization01'];
        github_ci_repository_ref01_data = (await github_ci_repository_ref01_ent.create(github_ci_repository_ref01_data)).data();
        (0, node_assert_1.default)(null != github_ci_repository_ref01_data.id);
        // LIST
        const github_ci_repository_ref01_match = {};
        github_ci_repository_ref01_match['organization_id'] = setup.idmap['organization01'];
        const github_ci_repository_ref01_list = (await github_ci_repository_ref01_ent.list(github_ci_repository_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(github_ci_repository_ref01_list, { id: github_ci_repository_ref01_data.id })));
        // UPDATE
        const github_ci_repository_ref01_data_up0 = {};
        github_ci_repository_ref01_data_up0.id = github_ci_repository_ref01_data.id;
        github_ci_repository_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const github_ci_repository_ref01_markdef_up0 = { name: 'adoption_mode', value: 'Mark01-github_ci_repository_ref01_' + setup.now };
        github_ci_repository_ref01_data_up0[github_ci_repository_ref01_markdef_up0.name] = github_ci_repository_ref01_markdef_up0.value;
        const github_ci_repository_ref01_resdata_up0 = (await github_ci_repository_ref01_ent.update(github_ci_repository_ref01_data_up0)).data();
        (0, node_assert_1.default)(github_ci_repository_ref01_resdata_up0.id === github_ci_repository_ref01_data_up0.id);
        (0, node_assert_1.default)(github_ci_repository_ref01_resdata_up0[github_ci_repository_ref01_markdef_up0.name] === github_ci_repository_ref01_markdef_up0.value);
        // LOAD
        const github_ci_repository_ref01_match_dt0 = {};
        github_ci_repository_ref01_match_dt0.id = github_ci_repository_ref01_data.id;
        github_ci_repository_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof github_ci_repository_ref01_data['organization_id']) ?
            github_ci_repository_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const github_ci_repository_ref01_data_dt0 = (await github_ci_repository_ref01_ent.load(github_ci_repository_ref01_match_dt0)).data();
        (0, node_assert_1.default)(github_ci_repository_ref01_data_dt0.id === github_ci_repository_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/github_ci_repository/GithubCiRepositoryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['github_ci_repository01', 'github_ci_repository02', 'github_ci_repository03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_GITHUB_CI_REPOSITORY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_GITHUB_CI_REPOSITORY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_GITHUB_CI_REPOSITORY_ENTID'];
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
//# sourceMappingURL=GithubCiRepositoryEntity.test.js.map