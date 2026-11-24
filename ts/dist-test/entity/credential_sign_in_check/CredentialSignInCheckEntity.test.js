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
(0, node_test_1.describe)('CredentialSignInCheckEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.CredentialSignInCheck();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CredentialSignInCheck().create({ "credential_id": 1, "organization_id": "x", "project_id": "x", "environment_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'credential_sign_in_check.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agent_filters": { "a": true, "h": "Agent Filters", "n": "agent_filters", "r": true, "sh": "Status counts and matching agent IDs for every filter in this live snapshot.", "t": "`$OBJECT`", "key$": "agent_filters", "index$": 0 }, "agents": { "a": true, "h": "Agents", "n": "agents", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 6 }, "key$": "agents", "index$": 1 }, "can_continue": { "a": true, "h": "Can Continue", "n": "can_continue", "r": false, "sh": "Whether a finished run can be resumed through the orchestrator.", "t": "`$BOOLEAN`", "key$": "can_continue", "index$": 2 }, "chat_messages": { "a": true, "h": "Chat Messages", "n": "chat_messages", "r": false, "t": "`$ARRAY`", "key$": "chat_messages", "index$": 3 }, "concurrency": { "a": true, "h": "Concurrency", "n": "concurrency", "r": true, "t": "`$INTEGER`", "key$": "concurrency", "index$": 4 }, "covered_areas": { "a": true, "h": "Covered Areas", "n": "covered_areas", "r": true, "sh": "Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.", "t": "`$ARRAY`", "key$": "covered_areas", "index$": 5 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 6 }, "deadline_at": { "a": true, "h": "Deadline At", "n": "deadline_at", "r": true, "t": "`$STRING`", "key$": "deadline_at", "index$": 7 }, "demo_project": { "a": true, "h": "Demo Project", "n": "demo_project", "r": true, "sh": "The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "demo_project", "index$": 8 }, "ended_early": { "a": true, "h": "Ended Early", "n": "ended_early", "r": true, "sh": "Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed.", "t": "`$BOOLEAN`", "key$": "ended_early", "index$": 9 }, "environment_id": { "a": true, "h": "Environment Id", "n": "environment_id", "r": true, "sh": "The project environment (app) to sign in to", "t": "`$STRING`", "key$": "environment_id", "index$": 10 }, "environment_name": { "a": true, "h": "Environment Name", "n": "environment_name", "r": true, "t": "`$STRING`", "key$": "environment_name", "index$": 11 }, "explorer_activity": { "a": true, "h": "Explorer Activity", "n": "explorer_activity", "r": true, "sh": "What the team is doing now.", "t": "`$OBJECT`", "key$": "explorer_activity", "index$": 12 }, "finding_count": { "a": true, "h": "Finding Count", "n": "finding_count", "r": true, "sh": "Findings at every priority, locked ones included.", "t": "`$INTEGER`", "key$": "finding_count", "index$": 13 }, "findings": { "a": true, "h": "Findings", "n": "findings", "r": true, "sh": "Every tester's findings, most severe first, with the checks each one cites.", "t": "`$ARRAY`", "key$": "findings", "index$": 14 }, "findings_fix_prompt": { "a": true, "h": "Findings Fix Prompt", "n": "findings_fix_prompt", "r": true, "sh": "One coding-agent prompt covering every finding, most severe first.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "findings_fix_prompt", "index$": 15 }, "finished_at": { "a": true, "h": "Finished At", "n": "finished_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "finished_at", "index$": 16 }, "goal": { "a": true, "h": "Goal", "n": "goal", "r": true, "t": "`$STRING`", "key$": "goal", "index$": 17 }, "huntable_flows": { "a": true, "de": true, "h": "Huntable Flows", "n": "huntable_flows", "r": true, "sh": "Deprecated alias of scannable_flows, kept for released CLIs.", "t": "`$ARRAY`", "key$": "huntable_flows", "index$": 18 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 19 }, "max_seconds": { "a": true, "h": "Max Seconds", "n": "max_seconds", "r": true, "t": "`$INTEGER`", "key$": "max_seconds", "index$": 20 }, "max_testers": { "a": true, "h": "Max Testers", "n": "max_testers", "r": true, "t": "`$INTEGER`", "key$": "max_testers", "index$": 21 }, "mode": { "a": true, "h": "Mode", "n": "mode", "r": false, "t": "`$STRING`", "key$": "mode", "index$": 22 }, "next_scan_improvements": { "a": true, "h": "Next Scan Improvements", "n": "next_scan_improvements", "r": true, "sh": "The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan.", "t": "`$ARRAY`", "key$": "next_scan_improvements", "index$": 23 }, "observed_at": { "a": true, "h": "Observed At", "n": "observed_at", "r": false, "sh": "Time this run snapshot was read; distinct from browser activity timestamps.", "t": "`$STRING`", "key$": "observed_at", "index$": 24 }, "onboarding": { "a": true, "h": "Onboarding", "n": "onboarding", "r": true, "sh": "Whether this is the workspace's free first discovery, started by setup.", "t": "`$BOOLEAN`", "key$": "onboarding", "index$": 25 }, "paywalled": { "a": true, "h": "Paywalled", "n": "paywalled", "r": true, "sh": "Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid.", "t": "`$BOOLEAN`", "key$": "paywalled", "index$": 26 }, "permissions": { "a": true, "h": "Permissions", "n": "permissions", "r": true, "t": "`$OBJECT`", "key$": "permissions", "index$": 27 }, "priority_counts": { "a": true, "h": "Priority Counts", "n": "priority_counts", "r": true, "t": "`$OBJECT`", "key$": "priority_counts", "index$": 28 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "sh": "Set when the exploration targets a project environment.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "project_id", "index$": 29 }, "related_explorations": { "a": true, "h": "Related Explorations", "n": "related_explorations", "r": true, "t": "`$ARRAY`", "key$": "related_explorations", "index$": 30 }, "report": { "a": true, "h": "Report", "n": "report", "r": true, "t": "`$OBJECT`", "key$": "report", "index$": 31 }, "reproduction_of": { "a": true, "h": "Reproduction Of", "n": "reproduction_of", "r": true, "sh": "The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "reproduction_of", "index$": 32 }, "reproductions": { "a": true, "h": "Reproductions", "n": "reproductions", "r": true, "sh": "Fresh-browser reruns of this scan's reported bugs.", "t": "`$ARRAY`", "key$": "reproductions", "index$": 33 }, "saves_scenarios": { "a": true, "h": "Saves Scenarios", "n": "saves_scenarios", "r": true, "sh": "Whether this exploration has started saving scenarios.", "t": "`$BOOLEAN`", "key$": "saves_scenarios", "index$": 34 }, "scannable_flows": { "a": true, "h": "Scannable Flows", "n": "scannable_flows", "r": true, "sh": "Flows a finished exploration recorded that deep scans can start from.", "t": "`$ARRAY`", "key$": "scannable_flows", "index$": 35 }, "scenario_generation": { "a": true, "h": "Scenario Generation", "n": "scenario_generation", "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 2, "depth": 6 }, "key$": "scenario_generation", "index$": 36 }, "sign_in_needs_answer": { "a": true, "h": "Sign In Needs Answer", "n": "sign_in_needs_answer", "r": true, "sh": "Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again.", "t": "`$BOOLEAN`", "key$": "sign_in_needs_answer", "index$": 37 }, "sign_in_outcome": { "a": true, "h": "Sign In Outcome", "n": "sign_in_outcome", "r": true, "sh": "A sign-in check's outcome; null for other runs.", "t": "`$STRING`", "key$": "sign_in_outcome", "index$": 38 }, "sign_in_question": { "a": true, "h": "Sign In Question", "n": "sign_in_question", "r": false, "sh": "What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "sign_in_question", "index$": 39 }, "startup_retryable": { "a": true, "h": "Startup Retryable", "n": "startup_retryable", "r": false, "sh": "Failed browser startup can be retried without extending the original deadline or tester budget.", "t": "`$BOOLEAN`", "key$": "startup_retryable", "index$": 40 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 41 }, "time_limit_reached": { "a": true, "h": "Time Limit Reached", "n": "time_limit_reached", "r": true, "sh": "Whether a partial run ended because it used its whole time budget, rather than stopping early.", "t": "`$BOOLEAN`", "key$": "time_limit_reached", "index$": 42 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`.", "t": "`$STRING`", "key$": "title", "index$": 43 }, "unlock": { "a": true, "h": "Unlock", "n": "unlock", "r": true, "sh": "Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page.", "t": "`$ANY`", "key$": "unlock", "index$": 44 }, "web_url": { "a": true, "h": "Web Url", "n": "web_url", "r": true, "sh": "The run's page in the Composal web app", "t": "`$STRING`", "key$": "web_url", "index$": 45 } }, "id": { "field": "id", "name": "id" }, "name": "credential_sign_in_check", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["environment_id"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "credential_id", "or": "credential_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks", "q": { "exist": ["credential_id", "idempotency_key", "organization_id", "project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "credentials" }, { "var": "credential_id" }, { "lit": "sign_in_checks" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["environment_id", "text"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks/try_again", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "credential_id", "or": "credential_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks/try_again", "q": { "$action": "try_again", "exist": ["credential_id", "idempotency_key", "organization_id", "project_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "credentials" }, { "var": "credential_id" }, { "lit": "sign_in_checks" }, { "lit": "try_again" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "credential_sign_in_check", "name__orig": "credential_sign_in_check", "Name": "CredentialSignInCheck", "name_": "credential_sign_in_check", "name-": "credential-sign-in-check", "NAME": "CREDENTIAL_SIGN_IN_CHECK", "index$": 92 }, { "active": true, "entity": "credential_sign_in_check", "key$": "BasicCredentialSignInCheckFlow", "kind": "basic", "name": "BasicCredentialSignInCheckFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "credential_sign_in_check_ref01" }, "m": { "credential_id": "credential01", "organization_id": "organization01", "project_id": "project01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'CredentialSignInCheck', { "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["environment_id"], "properties": { "environment_id": { "type": "string", "description": "The project environment (app) to sign in to", "key$": "environment_id" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "credential_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks/try_again": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["environment_id"], "properties": { "environment_id": { "type": "string", "description": "The project environment (app) to sign in to" }, "text": { "type": "string", "description": "The person's answer or note for the agent; a plain retry without it." } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "credential_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string", "format": "uuid" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "credential_sign_in_check.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{credential_id}/sign_in_checks" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const credential_sign_in_check_ref01_ent = client.CredentialSignInCheck();
        let credential_sign_in_check_ref01_data = setup.data.new.credential_sign_in_check['credential_sign_in_check_ref01'];
        credential_sign_in_check_ref01_data['credential_id'] = setup.idmap['credential01'];
        credential_sign_in_check_ref01_data['organization_id'] = setup.idmap['organization01'];
        credential_sign_in_check_ref01_data['project_id'] = setup.idmap['project01'];
        credential_sign_in_check_ref01_data = (await credential_sign_in_check_ref01_ent.create(credential_sign_in_check_ref01_data)).data();
        (0, node_assert_1.default)(null != credential_sign_in_check_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/credential_sign_in_check/CredentialSignInCheckTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['credential_sign_in_check01', 'credential_sign_in_check02', 'credential_sign_in_check03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03', 'credential01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CREDENTIAL_SIGN_IN_CHECK_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CREDENTIAL_SIGN_IN_CHECK_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CREDENTIAL_SIGN_IN_CHECK_ENTID'];
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
//# sourceMappingURL=CredentialSignInCheckEntity.test.js.map