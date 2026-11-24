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
(0, node_test_1.describe)('AgentWorkflowEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentWorkflow();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentWorkflow().load({ "agent_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_workflow.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "can_manage": { "a": true, "h": "Can Manage", "n": "can_manage", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage", "index$": 0 }, "expected_digest": { "a": true, "h": "Expected Digest", "n": "expected_digest", "r": true, "t": "`$STRING`", "key$": "expected_digest", "index$": 1 }, "path": { "a": true, "h": "Path", "n": "path", "r": true, "t": "`$STRING`", "key$": "path", "index$": 2 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "sh": "At most 262144 UTF-8 bytes", "t": "`$STRING`", "key$": "source", "index$": 3 }, "template": { "a": true, "h": "Template", "n": "template", "r": true, "sh": "A template id from the catalog's templates", "t": "`$STRING`", "key$": "template", "index$": 4 }, "templates": { "a": true, "h": "Templates", "n": "templates", "r": true, "t": "`$ARRAY`", "key$": "templates", "index$": 5 }, "truncated": { "a": true, "h": "Truncated", "n": "truncated", "r": true, "t": "`$BOOLEAN`", "key$": "truncated", "index$": 6 }, "workflows": { "a": true, "h": "Workflows", "n": "workflows", "r": true, "t": "`$ARRAY`", "key$": "workflows", "index$": 7 } }, "name": "agent_workflow", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["path", "template"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflows", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflows" }], "t": { "req": { "path": "`reqdata.path`", "template": "`reqdata.template`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "view", "or": "view", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "workflow_path", "or": "workflow_path", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflows", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflows" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["expected_digest", "path", "source"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflows", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflows" }], "t": { "req": { "expected_digest": "`reqdata.expected_digest`", "path": "`reqdata.path`", "source": "`reqdata.source`" }, "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "agent_workflow", "name__orig": "agent_workflow", "Name": "AgentWorkflow", "name_": "agent_workflow", "name-": "agent-workflow", "NAME": "AGENT_WORKFLOW", "index$": 66 }, { "active": true, "entity": "agent_workflow", "key$": "BasicAgentWorkflowFlow", "kind": "basic", "name": "BasicAgentWorkflowFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "agent_workflow_ref01" }, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "organization_id": "organization01" }, "i": { "ref": "agent_workflow_ref01", "srcdatavar": "agent_workflow_ref01_data", "suffix": "_up0", "textfield": "expected_digest" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_workflow_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "agent_workflow_ref01", "srcdatavar": "agent_workflow_ref01_data", "suffix": "_dt0" }, "m": { "id": "agent_workflow01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_workflow_ref01" } }], "index$": 2 }] }, 'AgentWorkflow', { "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["path", "template"], "properties": { "path": { "type": "string", "pattern": "^workflows/[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}\\.lobster$", "key$": "path" }, "template": { "type": "string", "pattern": "^[a-z0-9][a-z0-9-]{0,63}$", "description": "A template id from the catalog's templates", "key$": "template" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "view", "in": "query", "schema": { "type": "string", "enum": ["summary"] }, "description": "List workflow names and descriptions.", "index$": 2 }, { "name": "workflow_path", "in": "query", "schema": { "type": "string" }, "description": "Read the full definition for one workflow. Cannot be used with view.", "index$": 3 }] }, "PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["path", "source", "expected_digest"], "properties": { "path": { "type": "string", "pattern": "^workflows/[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}\\.lobster$", "key$": "path" }, "source": { "type": "string", "description": "At most 262144 UTF-8 bytes", "key$": "source" }, "expected_digest": { "type": "string", "pattern": "^[a-f0-9]{64}$", "key$": "expected_digest" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_workflow.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows", "agent_workflow.update.1": "GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflows" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const agent_workflow_ref01_ent = client.AgentWorkflow();
        let agent_workflow_ref01_data = setup.data.new.agent_workflow['agent_workflow_ref01'];
        agent_workflow_ref01_data['agent_id'] = setup.idmap['agent01'];
        agent_workflow_ref01_data['organization_id'] = setup.idmap['organization01'];
        agent_workflow_ref01_data = (await agent_workflow_ref01_ent.create(agent_workflow_ref01_data)).data();
        (0, node_assert_1.default)(null != agent_workflow_ref01_data);
        // UPDATE
        const agent_workflow_ref01_data_up0 = {};
        agent_workflow_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const agent_workflow_ref01_markdef_up0 = { name: 'expected_digest', value: 'Mark01-agent_workflow_ref01_' + setup.now };
        agent_workflow_ref01_data_up0[agent_workflow_ref01_markdef_up0.name] = agent_workflow_ref01_markdef_up0.value;
        const agent_workflow_ref01_resdata_up0 = (await agent_workflow_ref01_ent.update(agent_workflow_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != agent_workflow_ref01_resdata_up0);
        (0, node_assert_1.default)(agent_workflow_ref01_resdata_up0[agent_workflow_ref01_markdef_up0.name] === agent_workflow_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_workflow/AgentWorkflowTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_workflow01', 'agent_workflow02', 'agent_workflow03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_WORKFLOW_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_WORKFLOW_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_WORKFLOW_ENTID'];
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
//# sourceMappingURL=AgentWorkflowEntity.test.js.map