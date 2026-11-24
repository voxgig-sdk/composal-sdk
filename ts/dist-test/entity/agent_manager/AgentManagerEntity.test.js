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
(0, node_test_1.describe)('AgentManagerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentManager();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentManager().create({ "agent_id": 1, "organization_id": "x", "user_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_manager.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "attention": { "a": true, "h": "Attention", "n": "attention", "r": true, "sh": "Whether this agent waits on its viewer, decided from its provisioning, decisions awaiting an answer, the outcome of its last reported run and the model's verdict on its last reply (question when reply_triage is needs_you).", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "attention", "index$": 0 }, "avatar": { "a": true, "h": "Avatar", "n": "avatar", "r": false, "sh": "Emoji or up to two visible grapheme clusters, at most 64 UTF-8 bytes, without control or bidi override characters.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "avatar", "index$": 1 }, "can_delete": { "a": true, "h": "Can Delete", "n": "can_delete", "r": false, "sh": "Whether this viewer may delete this v2 agent.", "t": "`$BOOLEAN`", "key$": "can_delete", "index$": 2 }, "can_edit_configuration": { "a": true, "h": "Can Edit Configuration", "n": "can_edit_configuration", "r": true, "t": "`$BOOLEAN`", "key$": "can_edit_configuration", "index$": 3 }, "can_manage": { "a": true, "h": "Can Manage", "n": "can_manage", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage", "index$": 4 }, "can_manage_sharing": { "a": true, "h": "Can Manage Sharing", "n": "can_manage_sharing", "r": false, "t": "`$BOOLEAN`", "key$": "can_manage_sharing", "index$": 5 }, "can_name_managers": { "a": true, "h": "Can Name Managers", "n": "can_name_managers", "r": false, "sh": "Whether the viewer may name managers now.", "t": "`$BOOLEAN`", "key$": "can_name_managers", "index$": 6 }, "can_queue_input": { "a": true, "h": "Can Queue Input", "n": "can_queue_input", "r": false, "sh": "Current V2 authority to admit a durable input independently of native readiness.", "t": "`$BOOLEAN`", "key$": "can_queue_input", "index$": 7 }, "can_reconcile_save": { "a": true, "h": "Can Reconcile Save", "n": "can_reconcile_save", "r": true, "sh": "May reconcile an identical previously accepted save; this does not authorize new configuration edits.", "t": "`$BOOLEAN`", "key$": "can_reconcile_save", "index$": 8 }, "configuration": { "a": true, "h": "Configuration", "n": "configuration", "r": true, "t": "`$ANY`", "union": { "branches": 5, "count": 3, "depth": 9 }, "key$": "configuration", "index$": 9 }, "configuration_revision": { "a": true, "h": "Configuration Revision", "n": "configuration_revision", "r": true, "t": "`$INTEGER`", "key$": "configuration_revision", "index$": 10 }, "configuration_version": { "a": true, "h": "Configuration Version", "n": "configuration_version", "r": true, "sh": "Opaque version token.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "configuration_version", "index$": 11 }, "control_connections_available": { "a": true, "h": "Control Connections Available", "n": "control_connections_available", "r": false, "sh": "Whether this viewer may manage their own external Control connections, including cleanup while the agent is paused.", "t": "`$BOOLEAN`", "key$": "control_connections_available", "index$": 12 }, "controlling_user_id": { "a": true, "h": "Controlling User Id", "n": "controlling_user_id", "r": true, "t": "`$STRING`", "key$": "controlling_user_id", "index$": 13 }, "coordination_available": { "a": true, "h": "Coordination Available", "n": "coordination_available", "r": false, "sh": "Durable task controls remain available even when native conversation history is unavailable.", "t": "`$BOOLEAN`", "key$": "coordination_available", "index$": 14 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 15 }, "direct_chat_available": { "a": true, "h": "Direct Chat Available", "n": "direct_chat_available", "r": false, "sh": "Advisory availability of direct V1 chat.", "t": "`$BOOLEAN`", "key$": "direct_chat_available", "index$": 16 }, "has_unread_updates": { "a": true, "h": "Has Unread Updates", "n": "has_unread_updates", "r": true, "t": "`$BOOLEAN`", "key$": "has_unread_updates", "index$": 17 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 18 }, "last_reply_at": { "a": true, "fo": "date-time", "h": "Last Reply At", "n": "last_reply_at", "r": true, "sh": "When the agent's latest projected reply arrived, for grouping recent replies.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_reply_at", "index$": 19 }, "lifecycle_actions": { "a": true, "h": "Lifecycle Actions", "n": "lifecycle_actions", "r": true, "sh": "Currently authorized lifecycle actions for the saved revision and observed state.", "t": "`$ARRAY`", "key$": "lifecycle_actions", "index$": 20 }, "lifecycle_version": { "a": true, "h": "Lifecycle Version", "n": "lifecycle_version", "r": true, "sh": "Opaque version token.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "lifecycle_version", "index$": 21 }, "local_agent_control_available": { "a": true, "h": "Local Agent Control Available", "n": "local_agent_control_available", "r": false, "sh": "Whether this organization exposes paired local coding-agent control.", "t": "`$BOOLEAN`", "key$": "local_agent_control_available", "index$": 22 }, "managers": { "a": true, "h": "Managers", "n": "managers", "r": false, "sh": "Teammates named as managers beside the owner.", "t": "`$ARRAY`", "key$": "managers", "index$": 23 }, "model_change_action": { "a": true, "h": "Model Change Action", "n": "model_change_action", "r": false, "sh": "Advisory composer action.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "model_change_action", "index$": 24 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 25 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 26 }, "persona": { "a": true, "h": "Persona", "n": "persona", "r": false, "t": "`$ANY`", "key$": "persona", "index$": 27 }, "preview": { "a": true, "h": "Preview", "n": "preview", "r": false, "t": "`$ANY`", "key$": "preview", "index$": 28 }, "preview_received_at": { "a": true, "fo": "date-time", "h": "Preview Received At", "n": "preview_received_at", "r": false, "sh": "When a newer canonical conversation preview was first projected.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "preview_received_at", "index$": 29 }, "provisioning": { "a": true, "h": "Provisioning", "n": "provisioning", "r": false, "t": "`$ANY`", "key$": "provisioning", "index$": 30 }, "reply_triage": { "a": true, "h": "Reply Triage", "n": "reply_triage", "r": true, "sh": "A model's verdict on the agent's latest reply, judged once when it arrived.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "reply_triage", "index$": 31 }, "runtime_version": { "a": true, "h": "Runtime Version", "n": "runtime_version", "r": false, "sh": "Immutable execution runtime selected at creation.", "t": "`$STRING`", "key$": "runtime_version", "index$": 32 }, "setup_pending": { "a": true, "h": "Setup Pending", "n": "setup_pending", "r": true, "t": "`$BOOLEAN`", "key$": "setup_pending", "index$": 33 }, "sharing_fixed": { "a": true, "h": "Sharing Fixed", "n": "sharing_fixed", "r": false, "sh": "Project agents have a fixed audience and cannot change visibility.", "t": "`$BOOLEAN`", "key$": "sharing_fixed", "index$": 34 }, "sharing_version": { "a": true, "h": "Sharing Version", "n": "sharing_version", "r": false, "t": "`$INTEGER`", "key$": "sharing_version", "index$": 35 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 36 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 37 }, "team_role": { "a": true, "h": "Team Role", "n": "team_role", "r": false, "sh": "What teammates may do once the agent is shared with the team.", "t": "`$STRING`", "key$": "team_role", "index$": 38 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 39 }, "url_slug": { "a": true, "h": "Url Slug", "n": "url_slug", "r": false, "sh": "Stable organization-scoped browser name for /ORG/agent/NAME.", "t": "`$STRING`", "key$": "url_slug", "index$": 40 }, "user_id": { "a": true, "h": "User Id", "n": "user_id", "r": true, "t": "`$STRING`", "key$": "user_id", "index$": 41 }, "visibility": { "a": true, "h": "Visibility", "n": "visibility", "r": false, "t": "`$STRING`", "key$": "visibility", "index$": 42 } }, "id": { "field": "id", "name": "id" }, "name": "agent_manager", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["user_id"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/managers", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/managers", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "managers" }], "t": { "req": { "user_id": "`reqdata.user_id`" }, "res": "`body.agent`" }, "index$": 0 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/agents/{id}/managers/{user_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/agents/{id}/managers/{user_id}", "q": { "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "user_id": "id" } }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "managers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "agent_manager", "name__orig": "agent_manager", "Name": "AgentManager", "name_": "agent_manager", "name-": "agent-manager", "NAME": "AGENT_MANAGER", "index$": 15 }, { "active": true, "entity": "agent_manager", "key$": "BasicAgentManagerFlow", "kind": "basic", "name": "BasicAgentManagerFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "agent_manager_ref01" }, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "agent_manager_ref01", "suffix": "_rm0" }, "m": { "agent_id": "agent01", "id": "agent_manager01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 1 }] }, 'AgentManager', { "POST /api/v1/organizations/{organization_id}/agents/{id}/managers": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "user_id": { "type": "string", "key$": "user_id" } }, "required": ["user_id"] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/organizations/{organization_id}/agents/{id}/managers/{user_id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "user_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_manager.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/managers", "agent_manager.remove.1": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agents/{id}/managers/{user_id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const agent_manager_ref01_ent = client.AgentManager();
        let agent_manager_ref01_data = setup.data.new.agent_manager['agent_manager_ref01'];
        agent_manager_ref01_data['agent_id'] = setup.idmap['agent01'];
        agent_manager_ref01_data['organization_id'] = setup.idmap['organization01'];
        agent_manager_ref01_data = (await agent_manager_ref01_ent.create(agent_manager_ref01_data)).data();
        (0, node_assert_1.default)(null != agent_manager_ref01_data.id);
        // REMOVE
        const agent_manager_ref01_match_rm0 = { id: agent_manager_ref01_data.id };
        agent_manager_ref01_match_rm0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        agent_manager_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await agent_manager_ref01_ent.remove(agent_manager_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_manager/AgentManagerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_manager01', 'agent_manager02', 'agent_manager03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_MANAGER_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_MANAGER_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_MANAGER_ENTID'];
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
//# sourceMappingURL=AgentManagerEntity.test.js.map