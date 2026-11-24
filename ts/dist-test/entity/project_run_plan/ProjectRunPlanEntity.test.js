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
(0, node_test_1.describe)('ProjectRunPlanEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ProjectRunPlan();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ProjectRunPlan().list({ "organization_id": 1, "project_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project_run_plan.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "archived_at": { "a": true, "h": "Archived At", "n": "archived_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "archived_at", "index$": 0 }, "base_url": { "a": true, "h": "Base Url", "n": "base_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "base_url", "index$": 1 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "dependencies": { "a": true, "h": "Dependencies", "n": "dependencies", "r": true, "t": "`$ARRAY`", "key$": "dependencies", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 4 }, "identity_probe": { "a": true, "h": "Identity Probe", "n": "identity_probe", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "identity_probe", "index$": 5 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "kind", "index$": 6 }, "lock_version": { "a": true, "h": "Lock Version", "n": "lock_version", "r": true, "t": "`$INTEGER`", "key$": "lock_version", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 8 }, "nodes": { "a": true, "h": "Nodes", "n": "nodes", "r": true, "t": "`$ARRAY`", "key$": "nodes", "index$": 9 }, "preview": { "a": true, "h": "Preview", "n": "preview", "r": true, "t": "`$ANY`", "key$": "preview", "index$": 10 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": true, "t": "`$STRING`", "key$": "project_id", "index$": 11 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 12 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$INTEGER`", "key$": "version", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "project_run_plan", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["version"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive", "q": { "$action": "archive", "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "run_plans" }, { "var": "id" }, { "lit": "archive" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["dependencies", "identity_probe", "name", "nodes"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans", "q": { "exist": ["organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "run_plans" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans", "q": { "exist": ["organization_id", "project_id"] }, "r": { "param": { "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "run_plans" }], "t": { "page": { "next": "`body.pagination.next`", "total": "`body.pagination.count`" }, "req": "`reqdata`", "res": "`body.environments`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "run_plans" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["dependencies", "identity_probe", "name", "nodes", "version"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "run_plans" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["dependencies", "identity_probe", "name", "nodes", "version"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "run_plans" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "project_run_plan", "name__orig": "project_run_plan", "Name": "ProjectRunPlan", "name_": "project_run_plan", "name-": "project-run-plan", "NAME": "PROJECT_RUN_PLAN", "index$": 399 }, { "active": true, "entity": "project_run_plan", "key$": "BasicProjectRunPlanFlow", "kind": "basic", "name": "BasicProjectRunPlanFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "project_run_plan_ref01" }, "m": { "organization_id": "organization01", "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "project_id": "project01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "project_run_plan_ref01" } }], "index$": 1 }, { "a": true, "d": { "organization_id": "organization01", "project_id": "project01" }, "i": { "ref": "project_run_plan_ref01", "srcdatavar": "project_run_plan_ref01_data", "suffix": "_up0", "textfield": "archived_at" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_run_plan_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "project_run_plan_ref01", "srcdatavar": "project_run_plan_ref01_data", "suffix": "_dt0" }, "m": { "id": "project_run_plan01", "organization_id": "organization01", "project_id": "project01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_run_plan_ref01" } }], "index$": 3, "route": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}", "record": { "project_id": "project_id" } }] }, 'ProjectRunPlan', { "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["version"], "properties": { "version": { "type": "integer" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["name", "nodes", "dependencies"], "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 160, "key$": "name" }, "nodes": { "type": "array", "minItems": 1, "maxItems": 20, "items": { "type": "object", "additionalProperties": false, "required": ["key", "scenario_id"], "properties": { "key": { "type": "string", "pattern": "^[a-z][a-z0-9_]{0,39}$" }, "scenario_id": { "type": "string" } }, "x-ref": "#/components/schemas/RunPlanNode" }, "key$": "nodes" }, "dependencies": { "type": "array", "maxItems": 100, "items": { "type": "object", "additionalProperties": false, "required": ["from", "after_step", "to", "before_step"], "properties": { "from": { "type": "string" }, "after_step": { "type": "integer", "minimum": 1 }, "to": { "type": "string" }, "before_step": { "type": "integer", "minimum": 1 }, "name": { "type": "string", "maxLength": 80 } }, "x-ref": "#/components/schemas/RunPlanDependency" }, "key$": "dependencies" }, "identity_probe": { "type": "object", "nullable": true, "required": ["path", "subject_pointer", "email_pointer"], "properties": { "path": { "type": "string" }, "subject_pointer": { "type": "string" }, "email_pointer": { "type": "string" } }, "key$": "identity_probe" } }, "additionalProperties": true, "x-ref": "#/components/schemas/RunPlanInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "in": "query", "name": "page", "schema": { "type": "integer", "minimum": 1 }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "required": ["name", "nodes", "dependencies"], "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 160, "key$": "name" }, "nodes": { "type": "array", "minItems": 1, "maxItems": 20, "items": { "type": "object", "additionalProperties": false, "required": [], "properties": {}, "x-ref": "#/components/schemas/RunPlanNode" }, "key$": "nodes" }, "dependencies": { "type": "array", "maxItems": 100, "items": { "type": "object", "additionalProperties": false, "required": [], "properties": {}, "x-ref": "#/components/schemas/RunPlanDependency" }, "key$": "dependencies" }, "identity_probe": { "type": "object", "nullable": true, "required": ["path", "subject_pointer", "email_pointer"], "properties": { "path": {}, "subject_pointer": {}, "email_pointer": {} }, "key$": "identity_probe" } }, "x-ref": "#/components/schemas/RunPlanInput" }, { "type": "object", "required": ["version"], "properties": { "version": { "type": "integer", "key$": "version" } } }], "type": "object", "additionalProperties": true, "x-ref": "#/components/schemas/RunPlanUpdate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "required": ["name", "nodes", "dependencies"], "properties": { "name": { "type": "string", "minLength": 1, "maxLength": 160, "key$": "name" }, "nodes": { "type": "array", "minItems": 1, "maxItems": 20, "items": { "type": "object", "additionalProperties": false, "required": [], "properties": {}, "x-ref": "#/components/schemas/RunPlanNode" }, "key$": "nodes" }, "dependencies": { "type": "array", "maxItems": 100, "items": { "type": "object", "additionalProperties": false, "required": [], "properties": {}, "x-ref": "#/components/schemas/RunPlanDependency" }, "key$": "dependencies" }, "identity_probe": { "type": "object", "nullable": true, "required": ["path", "subject_pointer", "email_pointer"], "properties": { "path": {}, "subject_pointer": {}, "email_pointer": {} }, "key$": "identity_probe" } }, "x-ref": "#/components/schemas/RunPlanInput" }, { "type": "object", "required": ["version"], "properties": { "version": { "type": "integer", "key$": "version" } } }], "type": "object", "additionalProperties": true, "x-ref": "#/components/schemas/RunPlanUpdate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "project_run_plan.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}/archive", "project_run_plan.update.2": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_plans/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const project_run_plan_ref01_ent = client.ProjectRunPlan();
        let project_run_plan_ref01_data = setup.data.new.project_run_plan['project_run_plan_ref01'];
        project_run_plan_ref01_data['organization_id'] = setup.idmap['organization01'];
        project_run_plan_ref01_data['project_id'] = setup.idmap['project01'];
        project_run_plan_ref01_data = (await project_run_plan_ref01_ent.create(project_run_plan_ref01_data)).data();
        (0, node_assert_1.default)(null != project_run_plan_ref01_data.id);
        // LIST
        const project_run_plan_ref01_match = {};
        project_run_plan_ref01_match['organization_id'] = setup.idmap['organization01'];
        project_run_plan_ref01_match['project_id'] = setup.idmap['project01'];
        const project_run_plan_ref01_list = (await project_run_plan_ref01_ent.list(project_run_plan_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(project_run_plan_ref01_list, { id: project_run_plan_ref01_data.id })));
        // UPDATE
        const project_run_plan_ref01_data_up0 = {};
        project_run_plan_ref01_data_up0.id = project_run_plan_ref01_data.id;
        project_run_plan_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        project_run_plan_ref01_data_up0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01'];
        const project_run_plan_ref01_markdef_up0 = { name: 'archived_at', value: 'Mark01-project_run_plan_ref01_' + setup.now };
        project_run_plan_ref01_data_up0[project_run_plan_ref01_markdef_up0.name] = project_run_plan_ref01_markdef_up0.value;
        const project_run_plan_ref01_resdata_up0 = (await project_run_plan_ref01_ent.update(project_run_plan_ref01_data_up0)).data();
        (0, node_assert_1.default)(project_run_plan_ref01_resdata_up0.id === project_run_plan_ref01_data_up0.id);
        (0, node_assert_1.default)(project_run_plan_ref01_resdata_up0[project_run_plan_ref01_markdef_up0.name] === project_run_plan_ref01_markdef_up0.value);
        // LOAD
        const project_run_plan_ref01_match_dt0 = {};
        project_run_plan_ref01_match_dt0.id = project_run_plan_ref01_data.id;
        project_run_plan_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        project_run_plan_ref01_match_dt0['project_id'] = ['string', 'number', 'boolean'].includes(typeof project_run_plan_ref01_data['project_id']) ?
            project_run_plan_ref01_data['project_id'] : setup.idmap['project_id'] ?? setup.idmap['project01'];
        const project_run_plan_ref01_data_dt0 = (await project_run_plan_ref01_ent.load(project_run_plan_ref01_match_dt0)).data();
        (0, node_assert_1.default)(project_run_plan_ref01_data_dt0.id === project_run_plan_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project_run_plan/ProjectRunPlanTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project_run_plan01', 'project_run_plan02', 'project_run_plan03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PROJECT_RUN_PLAN_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PROJECT_RUN_PLAN_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PROJECT_RUN_PLAN_ENTID'];
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
//# sourceMappingURL=ProjectRunPlanEntity.test.js.map