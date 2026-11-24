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
(0, node_test_1.describe)('ScenarioRunScenarioEditEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ScenarioRunScenarioEdit();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'scenario_run_scenario_edit.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "scenario_run_scenario_edit", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["idempotency_key", "version", "viewer_time_zone"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "run_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "scenario_run_id", "or": "scenario_run_id", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run", "q": { "$action": "run", "exist": ["organization_id", "project_id", "run_id", "scenario_run_id"] }, "r": { "param": { "id": "run_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "runs" }, { "var": "run_id" }, { "lit": "scenario_runs" }, { "var": "scenario_run_id" }, { "lit": "scenario_edit" }, { "lit": "run" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["outcomes", "prompt", "steps", "version"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "run_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "scenario_run_id", "or": "scenario_run_id", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest", "q": { "$action": "suggest", "exist": ["organization_id", "project_id", "run_id", "scenario_run_id"] }, "r": { "param": { "id": "run_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "runs" }, { "var": "run_id" }, { "lit": "scenario_runs" }, { "var": "scenario_run_id" }, { "lit": "scenario_edit" }, { "lit": "suggest" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["outcomes", "steps", "version"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "run_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "scenario_run_id", "or": "scenario_run_id", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate", "q": { "$action": "validate", "exist": ["organization_id", "project_id", "run_id", "scenario_run_id"] }, "r": { "param": { "id": "run_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "runs" }, { "var": "run_id" }, { "lit": "scenario_runs" }, { "var": "scenario_run_id" }, { "lit": "scenario_edit" }, { "lit": "validate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "scenario_run_scenario_edit", "name__orig": "scenario_run_scenario_edit", "Name": "ScenarioRunScenarioEdit", "name_": "scenario_run_scenario_edit", "name-": "scenario-run-scenario-edit", "NAME": "SCENARIO_RUN_SCENARIO_EDIT", "index$": 194 }, { "active": true, "entity": "scenario_run_scenario_edit", "key$": "BasicScenarioRunScenarioEditFlow", "kind": "basic", "name": "BasicScenarioRunScenarioEditFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "scenario_run_scenario_edit_ref01" }, "m": { "organization_id": "organization01", "project_id": "project01", "run_id": "run01", "scenario_run_id": "scenario_run01" }, "o": "create", "s": [], "v": [], "unreachable": true }] }, 'ScenarioRunScenarioEdit', { "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["version", "idempotency_key"], "properties": { "version": { "type": "integer" }, "idempotency_key": { "type": "string" }, "viewer_time_zone": { "type": "string" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "scenario_run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "allOf": [{ "type": "object", "required": ["steps", "outcomes"], "properties": { "steps": {}, "outcomes": {} }, "x-ref": "#/components/schemas/ScenarioEditContent" }, { "type": "object", "required": ["version"], "properties": { "version": {} } }], "x-ref": "#/components/schemas/ScenarioRunEditSave" }, { "type": "object", "required": ["prompt"], "properties": { "prompt": { "type": "string", "minLength": 1, "maxLength": 4000 } } }], "type": "object", "additionalProperties": true, "x-ref": "#/components/schemas/ScenarioEditSuggestionRequest" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "scenario_run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "allOf": [{ "type": "object", "required": ["steps", "outcomes"], "properties": { "steps": { "type": "array", "minItems": 1, "maxItems": 1000, "items": { "oneOf": [] } }, "outcomes": { "type": "array", "minItems": 1, "maxItems": 100, "items": { "oneOf": [] } } }, "x-ref": "#/components/schemas/ScenarioEditContent" }, { "type": "object", "required": ["version"], "properties": { "version": { "type": "integer" } } }], "type": "object", "additionalProperties": true, "x-ref": "#/components/schemas/ScenarioRunEditSave" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "scenario_run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "scenario_run_scenario_edit.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let scenario_run_scenario_edit_ref01_data = Object.values(setup.data.existing.scenario_run_scenario_edit)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/scenario_run_scenario_edit/ScenarioRunScenarioEditTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['scenario_run_scenario_edit01', 'scenario_run_scenario_edit02', 'scenario_run_scenario_edit03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_SCENARIO_RUN_SCENARIO_EDIT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_SCENARIO_RUN_SCENARIO_EDIT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_SCENARIO_RUN_SCENARIO_EDIT_ENTID'];
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
//# sourceMappingURL=ScenarioRunScenarioEditEntity.test.js.map