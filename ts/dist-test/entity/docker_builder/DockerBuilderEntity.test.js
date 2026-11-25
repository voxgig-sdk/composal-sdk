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
(0, node_test_1.describe)('DockerBuilderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.DockerBuilder();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DockerBuilder().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'docker_builder.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "backend": { "a": true, "h": "Backend", "n": "backend", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "backend", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at", "index$": 1 }, "gateway_url": { "a": true, "h": "Gateway Url", "n": "gateway_url", "r": false, "sh": "Organization-addressed public WSS gateway; null until configured", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "gateway_url", "index$": 2 }, "generation": { "a": true, "h": "Generation", "n": "generation", "r": true, "t": "`$INTEGER`", "key$": "generation", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 4 }, "last_activity_at": { "a": true, "fo": "date-time", "h": "Last Activity At", "n": "last_activity_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_activity_at", "index$": 5 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 6 }, "ready_at": { "a": true, "fo": "date-time", "h": "Ready At", "n": "ready_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ready_at", "index$": 7 }, "slept_at": { "a": true, "fo": "date-time", "h": "Slept At", "n": "slept_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "slept_at", "index$": 8 }, "slug": { "a": true, "h": "Slug", "n": "slug", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "slug", "index$": 9 }, "startup_attempt": { "a": true, "h": "Startup Attempt", "n": "startup_attempt", "r": true, "t": "`$INTEGER`", "key$": "startup_attempt", "index$": 10 }, "startup_failure": { "a": true, "h": "Startup Failure", "n": "startup_failure", "r": true, "sh": "Safe failure reason for the most recent startup attempt", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "startup_failure", "index$": 11 }, "startup_stage": { "a": true, "h": "Startup Stage", "n": "startup_stage", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "startup_stage", "index$": 12 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 13 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "docker_builder", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/docker_builders/{id}/recover", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/docker_builders/{id}/recover", "q": { "$action": "recover", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "docker_builders" }, { "var": "id" }, { "lit": "recover" }], "t": { "req": "`reqdata`", "res": "`body.docker_builder`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/docker_builders/{id}/sleep", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/docker_builders/{id}/sleep", "q": { "$action": "sleep", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "docker_builders" }, { "var": "id" }, { "lit": "sleep" }], "t": { "req": "`reqdata`", "res": "`body.docker_builder`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/docker_builders/{id}/wake", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/docker_builders/{id}/wake", "q": { "$action": "wake", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "docker_builders" }, { "var": "id" }, { "lit": "wake" }], "t": { "req": "`reqdata`", "res": "`body.docker_builder`" }, "index$": 2 }, { "a": true, "bf": ["backend", "slug"], "co": { "id": "POST /api/v1/organizations/{organization_id}/docker_builders", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/docker_builders", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "docker_builders" }], "t": { "req": "`reqdata`", "res": "`body.docker_builder`" }, "index$": 3 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/docker_builders", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "slug", "or": "slug", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/docker_builders", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "docker_builders" }], "t": { "req": "`reqdata`", "res": "`body.docker_builders`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/docker_builders/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/docker_builders/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "docker_builders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.docker_builder`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["slug"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/docker_builders/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/docker_builders/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "docker_builders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.docker_builder`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/organizations/{organization_id}/docker_builders/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/docker_builders/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "docker_builders" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "docker_builder", "name__orig": "docker_builder", "Name": "DockerBuilder", "name_": "docker_builder", "name-": "docker-builder", "NAME": "DOCKER_BUILDER", "index$": 222 }, { "active": true, "entity": "docker_builder", "key$": "BasicDockerBuilderFlow", "kind": "basic", "name": "BasicDockerBuilderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "docker_builder_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "docker_builder_ref01" } }], "index$": 1 }, { "a": true, "d": { "organization_id": "organization01" }, "i": { "ref": "docker_builder_ref01", "srcdatavar": "docker_builder_ref01_data", "suffix": "_up0", "textfield": "backend" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-docker_builder_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "docker_builder_ref01", "srcdatavar": "docker_builder_ref01_data", "suffix": "_dt0" }, "m": { "id": "docker_builder01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-docker_builder_ref01" } }], "index$": 3, "route": "GET /api/v1/organizations/{organization_id}/docker_builders/{id}", "record": { "organization_id": "organization_id" } }] }, 'DockerBuilder', { "POST /api/v1/organizations/{organization_id}/docker_builders/{id}/recover": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/organizations/{organization_id}/docker_builders/{id}/sleep": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/organizations/{organization_id}/docker_builders/{id}/wake": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/organizations/{organization_id}/docker_builders": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "backend": { "type": "string", "enum": ["classic", "gen2"], "default": "classic", "key$": "backend" }, "slug": { "type": "string", "minLength": 1, "maxLength": 100, "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$", "default": "main", "key$": "slug" } }, "x-ref": "#/components/schemas/DockerBuilderCreate" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/docker_builders": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "slug", "in": "query", "required": false, "description": "Exact builder slug, resolved within the authorized organization", "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/docker_builders/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PATCH /api/v1/organizations/{organization_id}/docker_builders/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "slug": { "type": "string", "minLength": 1, "maxLength": 100, "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$", "key$": "slug" } }, "required": ["slug"], "x-ref": "#/components/schemas/DockerBuilderRename" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/organizations/{organization_id}/docker_builders/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "docker_builder.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/docker_builders/{id}/recover", "docker_builder.update.2": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/docker_builders/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const docker_builder_ref01_ent = client.DockerBuilder();
        let docker_builder_ref01_data = setup.data.new.docker_builder['docker_builder_ref01'];
        docker_builder_ref01_data['organization_id'] = setup.idmap['organization01'];
        docker_builder_ref01_data = (await docker_builder_ref01_ent.create(docker_builder_ref01_data)).data();
        (0, node_assert_1.default)(null != docker_builder_ref01_data.id);
        // LIST
        const docker_builder_ref01_match = {};
        docker_builder_ref01_match['organization_id'] = setup.idmap['organization01'];
        const docker_builder_ref01_list = (await docker_builder_ref01_ent.list(docker_builder_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(docker_builder_ref01_list, { id: docker_builder_ref01_data.id })));
        // UPDATE
        const docker_builder_ref01_data_up0 = {};
        docker_builder_ref01_data_up0.id = docker_builder_ref01_data.id;
        docker_builder_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const docker_builder_ref01_markdef_up0 = { name: 'backend', value: 'Mark01-docker_builder_ref01_' + setup.now };
        docker_builder_ref01_data_up0[docker_builder_ref01_markdef_up0.name] = docker_builder_ref01_markdef_up0.value;
        const docker_builder_ref01_resdata_up0 = (await docker_builder_ref01_ent.update(docker_builder_ref01_data_up0)).data();
        (0, node_assert_1.default)(docker_builder_ref01_resdata_up0.id === docker_builder_ref01_data_up0.id);
        (0, node_assert_1.default)(docker_builder_ref01_resdata_up0[docker_builder_ref01_markdef_up0.name] === docker_builder_ref01_markdef_up0.value);
        // LOAD
        const docker_builder_ref01_match_dt0 = {};
        docker_builder_ref01_match_dt0.id = docker_builder_ref01_data.id;
        docker_builder_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof docker_builder_ref01_data['organization_id']) ?
            docker_builder_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const docker_builder_ref01_data_dt0 = (await docker_builder_ref01_ent.load(docker_builder_ref01_match_dt0)).data();
        (0, node_assert_1.default)(docker_builder_ref01_data_dt0.id === docker_builder_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/docker_builder/DockerBuilderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['docker_builder01', 'docker_builder02', 'docker_builder03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_DOCKER_BUILDER_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_DOCKER_BUILDER_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_DOCKER_BUILDER_ENTID'];
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
//# sourceMappingURL=DockerBuilderEntity.test.js.map