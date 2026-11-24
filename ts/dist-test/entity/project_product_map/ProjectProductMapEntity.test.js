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
(0, node_test_1.describe)('ProjectProductMapEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ProjectProductMap();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'project_product_map.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "project_product_map", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview", "q": { "$action": "overview", "exist": ["organization_id", "project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "overview" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/path", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "account_id", "or": "account_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "area", "or": "area", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "before", "or": "before", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "persona_id", "or": "persona_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "revision_id", "or": "revision_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "since", "or": "since", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "source", "or": "source", "r": true, "style": "form", "t": "`$STRING`", "index$": 7 }, { "a": true, "explode": true, "k": "query", "n": "target", "or": "target", "r": true, "style": "form", "t": "`$STRING`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/path", "q": { "$action": "path", "exist": ["organization_id", "project_id", "source", "target"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "path" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/compare", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "account_id", "or": "account_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "area", "or": "area", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "before", "or": "before", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "compare_revision_id", "or": "compare_revision_id", "r": true, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "persona_id", "or": "persona_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "revision_id", "or": "revision_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "since", "or": "since", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/compare", "q": { "$action": "compare", "exist": ["compare_revision_id", "organization_id", "project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "compare" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/brief", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "account_id", "or": "account_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "area", "or": "area", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "before", "or": "before", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "persona_id", "or": "persona_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "revision_id", "or": "revision_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "since", "or": "since", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/brief", "q": { "$action": "brief", "exist": ["organization_id", "project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "brief" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/frontier", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "account_id", "or": "account_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "after", "or": "after", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "area", "or": "area", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "before", "or": "before", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "persona_id", "or": "persona_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "revision_id", "or": "revision_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "since", "or": "since", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/frontier", "q": { "$action": "frontier", "exist": ["organization_id", "project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "frontier" }], "t": { "page": { "cursor": "`body.next_cursor`" }, "req": "`reqdata`", "res": "`body.items`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "account_id", "or": "account_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "area", "or": "area", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "before", "or": "before", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "persona_id", "or": "persona_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "revision_id", "or": "revision_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "since", "or": "since", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "view_id", "or": "view_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview", "q": { "$action": "overview", "exist": ["organization_id", "project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "overview" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/version", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/version", "q": { "$action": "version", "exist": ["organization_id", "project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "version" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "project_product_map", "name__orig": "project_product_map", "Name": "ProjectProductMap", "name_": "project_product_map", "name-": "project-product-map", "NAME": "PROJECT_PRODUCT_MAP", "index$": 171 }, { "active": true, "entity": "project_product_map", "key$": "BasicProjectProductMapFlow", "kind": "basic", "name": "BasicProjectProductMapFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "project_product_map_ref01" }, "m": { "organization_id": "organization01", "project_id": "project01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "project_product_map_ref01", "srcdatavar": "project_product_map_ref01_data", "suffix": "_dt0" }, "m": { "id": "project_product_map01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-project_product_map_ref01" } }], "unreachable": true }] }, 'ProjectProductMap', { "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/path": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "revision_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "persona_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "account_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "query", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "area", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "since", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "before", "in": "query", "schema": { "type": "string" }, "index$": 8 }, { "name": "source", "in": "query", "schema": { "type": "string" }, "required": true, "index$": 9 }, { "name": "target", "in": "query", "schema": { "type": "string" }, "required": true, "index$": 10 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/compare": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "revision_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "persona_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "account_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "query", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "area", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "since", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "before", "in": "query", "schema": { "type": "string" }, "index$": 8 }, { "name": "compare_revision_id", "in": "query", "schema": { "type": "string" }, "required": true, "index$": 9 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/brief": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "revision_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "persona_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "account_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "query", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "area", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "since", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "before", "in": "query", "schema": { "type": "string" }, "index$": 8 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/frontier": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "revision_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "persona_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "account_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "query", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "area", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "since", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "before", "in": "query", "schema": { "type": "string" }, "index$": 8 }, { "name": "after", "in": "query", "schema": { "type": "string" }, "required": false, "index$": 9 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "view_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "revision_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "account_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "persona_id", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "query", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "area", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "since", "in": "query", "schema": { "type": "string" }, "index$": 8 }, { "name": "before", "in": "query", "schema": { "type": "string" }, "index$": 9 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/version": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "project_product_map.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/overview" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let project_product_map_ref01_data = Object.values(setup.data.existing.project_product_map)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/project_product_map/ProjectProductMapTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['project_product_map01', 'project_product_map02', 'project_product_map03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PROJECT_PRODUCT_MAP_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PROJECT_PRODUCT_MAP_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PROJECT_PRODUCT_MAP_ENTID'];
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
//# sourceMappingURL=ProjectProductMapEntity.test.js.map