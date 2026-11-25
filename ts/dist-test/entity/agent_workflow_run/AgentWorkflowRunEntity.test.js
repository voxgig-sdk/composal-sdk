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
(0, node_test_1.describe)('AgentWorkflowRunEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentWorkflowRun();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentWorkflowRun().list({ "agent_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_workflow_run.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "r": true, "t": "`$STRING`", "key$": "action", "index$": 0 }, "automation": { "a": true, "h": "Automation", "n": "automation", "r": false, "sh": "Saved native automation identity.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "automation", "index$": 1 }, "budget_seconds": { "a": true, "h": "Budget Seconds", "n": "budget_seconds", "r": true, "sh": "The run stops once it has been running this long", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "budget_seconds", "index$": 2 }, "budget_usd": { "a": true, "h": "Budget Usd", "n": "budget_usd", "r": true, "sh": "The run stops before a step once it has spent this much", "t": ["`$ONE`", ["`$NUMBER`", "`$NULL`"]], "key$": "budget_usd", "index$": 3 }, "can_answer": { "a": true, "h": "Can Answer", "n": "can_answer", "r": true, "sh": "Whether this viewer can answer the step that stopped the run; the answer runs that step again", "t": "`$BOOLEAN`", "key$": "can_answer", "index$": 4 }, "can_approve": { "a": true, "h": "Can Approve", "n": "can_approve", "r": true, "sh": "Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one", "t": "`$BOOLEAN`", "key$": "can_approve", "index$": 5 }, "can_dismiss": { "a": true, "h": "Can Dismiss", "n": "can_dismiss", "r": true, "sh": "Whether this viewer can dismiss the run waiting for them, which ends it unanswered", "t": "`$BOOLEAN`", "key$": "can_dismiss", "index$": 6 }, "checkpoint": { "a": true, "h": "Checkpoint", "n": "checkpoint", "r": true, "sh": "The question a run waiting at a checkpoint is asking", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "checkpoint", "index$": 7 }, "conversation_id": { "a": true, "h": "Conversation Id", "n": "conversation_id", "r": true, "sh": "The thread the run works in, which the person opens to follow it", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "conversation_id", "index$": 8 }, "decision_history": { "a": true, "h": "Decision History", "n": "decision_history", "r": false, "t": "`$OBJECT`", "key$": "decision_history", "index$": 9 }, "error": { "a": true, "h": "Error", "n": "error", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "error", "index$": 10 }, "finished_at": { "a": true, "h": "Finished At", "n": "finished_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "finished_at", "index$": 11 }, "flow_steps": { "a": true, "h": "Flow Steps", "n": "flow_steps", "r": true, "sh": "How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file", "t": ["`$ONE`", ["`$ARRAY`", "`$NULL`"]], "key$": "flow_steps", "index$": 12 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Public run ID.", "t": "`$STRING`", "key$": "id", "index$": 13 }, "needs_you": { "a": true, "h": "Needs You", "n": "needs_you", "r": true, "sh": "Whether a step stopped the run for the person, who can answer it", "t": "`$BOOLEAN`", "key$": "needs_you", "index$": 14 }, "note": { "a": true, "h": "Note", "n": "note", "r": true, "sh": "One sentence a workflow step left for the person, which the run's card leads with", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "note", "index$": 15 }, "nothing_to_do_reason": { "a": true, "h": "Nothing To Do Reason", "n": "nothing_to_do_reason", "r": true, "sh": "Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "nothing_to_do_reason", "index$": 16 }, "resume_count": { "a": true, "h": "Resume Count", "n": "resume_count", "r": true, "sh": "How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint", "t": "`$INTEGER`", "key$": "resume_count", "index$": 17 }, "retry_step_id": { "a": true, "h": "Retry Step Id", "n": "retry_step_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "retry_step_id", "index$": 18 }, "running_seconds": { "a": true, "h": "Running Seconds", "n": "running_seconds", "r": true, "sh": "How long the run has been running, not counting time waiting at a checkpoint or for a retry", "t": "`$INTEGER`", "key$": "running_seconds", "index$": 19 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "t": "`$STRING`", "key$": "source", "index$": 20 }, "spent_tokens": { "a": true, "h": "Spent Tokens", "n": "spent_tokens", "r": true, "sh": "The tokens the run's agent steps have used so far", "t": "`$INTEGER`", "key$": "spent_tokens", "index$": 21 }, "spent_usd": { "a": true, "h": "Spent Usd", "n": "spent_usd", "r": true, "sh": "What the run's agent steps have cost so far, as the agent reported it", "t": "`$NUMBER`", "key$": "spent_usd", "index$": 22 }, "stalled": { "a": true, "h": "Stalled", "n": "stalled", "r": true, "sh": "Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back", "t": "`$BOOLEAN`", "key$": "stalled", "index$": 23 }, "started_at": { "a": true, "h": "Started At", "n": "started_at", "r": true, "t": "`$STRING`", "key$": "started_at", "index$": 24 }, "started_by": { "a": true, "h": "Started By", "n": "started_by", "r": true, "sh": "The event that started the run", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "started_by", "index$": 25 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 26 }, "step_count": { "a": true, "h": "Step Count", "n": "step_count", "r": true, "t": "`$INTEGER`", "key$": "step_count", "index$": 27 }, "steps": { "a": true, "h": "Steps", "n": "steps", "r": true, "t": "`$ARRAY`", "key$": "steps", "index$": 28 }, "trigger_id": { "a": true, "h": "Trigger Id", "n": "trigger_id", "r": true, "sh": "The run settings that started it, for a run an event or schedule started", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "trigger_id", "index$": 29 }, "wake_at": { "a": true, "h": "Wake At", "n": "wake_at", "r": true, "sh": "When a sleeping run's step looks again", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "wake_at", "index$": 30 }, "workflow_digest": { "a": true, "h": "Workflow Digest", "n": "workflow_digest", "r": true, "sh": "SHA-256 of the immutable definition this run uses", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "workflow_digest", "index$": 31 }, "workflow_path": { "a": true, "h": "Workflow Path", "n": "workflow_path", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "workflow_path", "index$": 32 } }, "id": { "field": "id", "name": "id" }, "name": "agent_workflow_run", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["answer", "question_at"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/answer", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "run_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/answer", "q": { "$action": "answer", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "run_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_runs" }, { "var": "id" }, { "lit": "answer" }], "t": { "req": { "answer": "`reqdata.answer`", "question_at": "`reqdata.question_at`" }, "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["approved", "checkpoint", "resume_count"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/approve", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "run_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/approve", "q": { "$action": "approve", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "run_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_runs" }, { "var": "id" }, { "lit": "approve" }], "t": { "req": { "approved": "`reqdata.approved`", "checkpoint": "`reqdata.checkpoint`", "resume_count": "`reqdata.resume_count`" }, "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["question_at"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/dismiss", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "run_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/dismiss", "q": { "$action": "dismiss", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "run_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_runs" }, { "var": "id" }, { "lit": "dismiss" }], "t": { "req": { "question_at": "`reqdata.question_at`" }, "res": "`body`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/retry", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "run_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/retry", "q": { "$action": "retry", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "run_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_runs" }, { "var": "id" }, { "lit": "retry" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "automation_key", "or": "automation_key", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "view", "or": "view", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "workflow_path", "or": "workflow_path", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_runs" }], "t": { "page": { "next": "`body.pagination.next`" }, "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "run_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "decision_cursor", "or": "decision_cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}", "q": { "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "run_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_runs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/summary", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/summary", "q": { "$action": "summary", "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "workflow_runs" }, { "lit": "summary" }], "t": { "req": "`reqdata`", "res": "`body.workflows`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "agent_workflow_run", "name__orig": "agent_workflow_run", "Name": "AgentWorkflowRun", "name_": "agent_workflow_run", "name-": "agent-workflow-run", "NAME": "AGENT_WORKFLOW_RUN", "index$": 67 }, { "active": true, "entity": "agent_workflow_run", "key$": "BasicAgentWorkflowRunFlow", "kind": "basic", "name": "BasicAgentWorkflowRunFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "agent_workflow_run_ref01" }, "m": { "agent_id": "agent01", "organization_id": "organization01", "run_id": "run01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "agent_workflow_run_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "agent_workflow_run_ref01", "srcdatavar": "agent_workflow_run_ref01_data", "suffix": "_dt0" }, "m": { "agent_id": "agent01", "id": "agent_workflow_run01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_workflow_run_ref01" } }], "index$": 1, "route": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}", "record": {} }] }, 'AgentWorkflowRun', { "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/answer": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "answer": { "type": "string", "maxLength": 4000, "description": "The person's answer to the question the step stopped on" }, "question_at": { "type": "string", "format": "date-time", "description": "The run's finished_at when it stopped on the question being answered; a run since stopped on another question refuses the answer" } }, "required": ["answer", "question_at"] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/approve": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "approved": { "type": "boolean", "description": "True to approve the checkpoint and go on, false to decline it and end the run" }, "checkpoint": { "type": "object", "description": "The run's checkpoint as the person read it; a run since stopped at another checkpoint refuses the decision", "properties": { "kind": { "type": "string", "enum": ["approval", "input"] }, "prompt": { "type": "string" }, "step_id": { "type": "string", "description": "The id of the workflow file's step the run waits at, when the worker could tell" }, "preview": { "type": "string", "description": "The checkpoint evidence shown to the person, bounded to 16 KiB." } }, "required": ["kind", "prompt"], "additionalProperties": false }, "resume_count": { "type": "integer", "description": "The run's resume_count as the person read it; it names the pause the decision is for, so a later pause at the same checkpoint refuses it" } }, "required": ["approved", "checkpoint", "resume_count"] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/dismiss": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "question_at": { "type": "string", "format": "date-time", "description": "The run's finished_at when it stopped on the question being dismissed; a run since stopped on another question refuses the dismissal" } }, "required": ["question_at"] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/retry": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 3 }, { "name": "view", "in": "query", "description": "Activity places running, sleeping, blocked, and waiting runs above recent history. Activity does not accept a cursor.", "schema": { "type": "string", "enum": ["activity"] }, "index$": 4 }, { "name": "workflow_path", "in": "query", "description": "Only runs of this workflow file", "schema": { "type": "string", "maxLength": 160 }, "index$": 5 }, { "name": "automation_key", "in": "query", "description": "Runs across all versions of this saved native automation; cannot be combined with workflow_path.", "schema": { "type": "string", "pattern": "^[a-z][a-z0-9_-]{0,63}$" }, "index$": 6 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "decision_cursor", "in": "query", "description": "Cursor for older decision attempts returned by decision_history.pagination.next.", "schema": { "type": "string" }, "index$": 3 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/summary": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_workflow_run.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_runs/{run_id}/answer" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let agent_workflow_run_ref01_data = Object.values(setup.data.existing.agent_workflow_run)[0];
        // LIST
        const agent_workflow_run_ref01_ent = client.AgentWorkflowRun();
        const agent_workflow_run_ref01_match = {};
        agent_workflow_run_ref01_match['agent_id'] = setup.idmap['agent01'];
        agent_workflow_run_ref01_match['organization_id'] = setup.idmap['organization01'];
        const agent_workflow_run_ref01_list = (await agent_workflow_run_ref01_ent.list(agent_workflow_run_ref01_match)).map((e) => e.data());
        // LOAD
        const agent_workflow_run_ref01_match_dt0 = {};
        agent_workflow_run_ref01_match_dt0.id = agent_workflow_run_ref01_data.id;
        agent_workflow_run_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        agent_workflow_run_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const agent_workflow_run_ref01_data_dt0 = (await agent_workflow_run_ref01_ent.load(agent_workflow_run_ref01_match_dt0)).data();
        (0, node_assert_1.default)(agent_workflow_run_ref01_data_dt0.id === agent_workflow_run_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_workflow_run/AgentWorkflowRunTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_workflow_run01', 'agent_workflow_run02', 'agent_workflow_run03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_WORKFLOW_RUN_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_WORKFLOW_RUN_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_WORKFLOW_RUN_ENTID'];
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
//# sourceMappingURL=AgentWorkflowRunEntity.test.js.map