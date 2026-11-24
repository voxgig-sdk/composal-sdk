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
(0, node_test_1.describe)('AgentWorkflowProposalEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentWorkflowProposal();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentWorkflowProposal().load({ "agent_id": 1, "id": "x", "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_workflow_proposal.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_steps": { "a": true, "h": "Agent Steps", "n": "agent_steps", "r": true, "sh": "The model and reasoning the workflow's agent steps share.", "t": "`$OBJECT`", "key$": "agent_steps", "index$": 0 }, "base_digest": { "a": true, "h": "Base Digest", "n": "base_digest", "r": true, "sh": "The saved workflow this proposal changes; null for a new workflow.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "base_digest", "index$": 1 }, "can_manage": { "a": true, "h": "Can Manage", "n": "can_manage", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage", "index$": 2 }, "can_revise": { "a": true, "h": "Can Revise", "n": "can_revise", "r": true, "sh": "The viewer can choose the model and reasoning of the agent steps now, before saving.", "t": "`$BOOLEAN`", "key$": "can_revise", "index$": 3 }, "can_save": { "a": true, "h": "Can Save", "n": "can_save", "r": true, "sh": "The viewer can save this proposal now: they manage the agent, and it is unsaved, current and passes its checks.", "t": "`$BOOLEAN`", "key$": "can_save", "index$": 4 }, "can_set_trigger": { "a": true, "h": "Can Set Trigger", "n": "can_set_trigger", "r": true, "sh": "Saved as proposed with nothing starting it, so saving again sets its trigger.", "t": "`$BOOLEAN`", "key$": "can_set_trigger", "index$": 5 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 6 }, "definition": { "a": true, "h": "Definition", "n": "definition", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "definition", "index$": 7 }, "digest": { "a": true, "h": "Digest", "n": "digest", "r": true, "sh": "Names the reviewed version, its source and trigger; send it to save this version.", "t": "`$STRING`", "key$": "digest", "index$": 8 }, "error": { "a": true, "h": "Error", "n": "error", "r": true, "sh": "Why the proposal no longer passes its checks, such as a model this agent no longer has.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "error", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 10 }, "model_choices": { "a": true, "h": "Model Choices", "n": "model_choices", "r": false, "sh": "Models the viewer may choose for the agent steps before saving.", "t": "`$ARRAY`", "key$": "model_choices", "index$": 11 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 12 }, "native_rows": { "a": true, "h": "Native Rows", "n": "native_rows", "r": false, "t": "`$ARRAY`", "key$": "native_rows", "index$": 13 }, "path": { "a": true, "h": "Path", "n": "path", "r": true, "t": "`$STRING`", "key$": "path", "index$": 14 }, "pipeline_checkpoints": { "a": true, "h": "Pipeline Checkpoints", "n": "pipeline_checkpoints", "r": true, "t": "`$OBJECT`", "key$": "pipeline_checkpoints", "index$": 15 }, "pipeline_commands": { "a": true, "h": "Pipeline Commands", "n": "pipeline_commands", "r": true, "t": "`$OBJECT`", "key$": "pipeline_commands", "index$": 16 }, "reasoning_choices": { "a": true, "h": "Reasoning Choices", "n": "reasoning_choices", "r": false, "sh": "Reasoning levels the viewer may choose for the agent steps; none uses the agent's default.", "t": "`$ARRAY`", "key$": "reasoning_choices", "index$": 17 }, "runs_on_earlier_version": { "a": true, "h": "Runs On Earlier Version", "n": "runs_on_earlier_version", "r": true, "sh": "Runs already going when this save replaced the file, which finish on the version they started with; only in the reply to that save.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "runs_on_earlier_version", "index$": 18 }, "saved": { "a": true, "h": "Saved", "n": "saved", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "saved", "index$": 19 }, "stale": { "a": true, "h": "Stale", "n": "stale", "r": true, "sh": "The workflow changed since the proposal, so it cannot be saved.", "t": "`$BOOLEAN`", "key$": "stale", "index$": 20 }, "starts": { "a": true, "h": "Starts", "n": "starts", "r": true, "sh": "What starts the workflow without a chat turn; saving the proposal sets this trigger.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "starts", "index$": 21 }, "trigger_error": { "a": true, "h": "Trigger Error", "n": "trigger_error", "r": true, "sh": "Why the save could not set the trigger; only in the reply to that save.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "trigger_error", "index$": 22 } }, "id": { "field": "id", "name": "id" }, "name": "agent_workflow_proposal", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["digest", "model", "reasoning"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/revise", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "proposal", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/revise", "q": { "$action": "revise", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "proposal": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_proposals" }, { "var": "id" }, { "lit": "revise" }], "t": { "req": { "digest": "`reqdata.digest`", "model": "`reqdata.model`", "reasoning": "`reqdata.reasoning`" }, "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["digest"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/save", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "proposal", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/save", "q": { "$action": "save", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "proposal": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_proposals" }, { "var": "id" }, { "lit": "save" }], "t": { "req": { "digest": "`reqdata.digest`" }, "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "proposal", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}", "q": { "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "proposal": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_proposals" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "agent_workflow_proposal", "name__orig": "agent_workflow_proposal", "Name": "AgentWorkflowProposal", "name_": "agent_workflow_proposal", "name-": "agent-workflow-proposal", "NAME": "AGENT_WORKFLOW_PROPOSAL", "index$": 45 }, { "active": true, "entity": "agent_workflow_proposal", "key$": "BasicAgentWorkflowProposalFlow", "kind": "basic", "name": "BasicAgentWorkflowProposalFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "agent_workflow_proposal_ref01" }, "m": { "agent_id": "agent01", "organization_id": "organization01", "proposal": "proposal01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "agent_workflow_proposal_ref01", "srcdatavar": "agent_workflow_proposal_ref01_data", "suffix": "_dt0" }, "m": { "agent_id": "agent01", "id": "agent_workflow_proposal01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_workflow_proposal_ref01" } }], "index$": 0, "route": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}", "record": {} }] }, 'AgentWorkflowProposal', { "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/revise": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["digest", "model", "reasoning"], "properties": { "digest": { "type": "string", "pattern": "^[a-f0-9]{64}$" }, "model": { "type": "string" }, "reasoning": { "type": "string", "nullable": true } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "proposal", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/save": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["digest"], "properties": { "digest": { "type": "string", "pattern": "^[a-f0-9]{64}$" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "proposal", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "proposal", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_workflow_proposal.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_proposals/{proposal}/revise", "agent_workflow_proposal.load.1": "GET-only live run: reads a record only agent_workflow_proposal.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let agent_workflow_proposal_ref01_data = Object.values(setup.data.existing.agent_workflow_proposal)[0];
        // LOAD
        const agent_workflow_proposal_ref01_ent = client.AgentWorkflowProposal();
        const agent_workflow_proposal_ref01_match_dt0 = {};
        agent_workflow_proposal_ref01_match_dt0.id = agent_workflow_proposal_ref01_data.id;
        agent_workflow_proposal_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        agent_workflow_proposal_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const agent_workflow_proposal_ref01_data_dt0 = (await agent_workflow_proposal_ref01_ent.load(agent_workflow_proposal_ref01_match_dt0)).data();
        (0, node_assert_1.default)(agent_workflow_proposal_ref01_data_dt0.id === agent_workflow_proposal_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_workflow_proposal/AgentWorkflowProposalTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_workflow_proposal01', 'agent_workflow_proposal02', 'agent_workflow_proposal03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_WORKFLOW_PROPOSAL_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_WORKFLOW_PROPOSAL_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_WORKFLOW_PROPOSAL_ENTID'];
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
//# sourceMappingURL=AgentWorkflowProposalEntity.test.js.map