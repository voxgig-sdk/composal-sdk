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
(0, node_test_1.describe)('AgentRoutineEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentRoutine();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentRoutine().list({ "agent_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_routine.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "can_manage": { "a": true, "h": "Can Manage", "n": "can_manage", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage", "index$": 0 }, "consecutive_errors": { "a": true, "h": "Consecutive Errors", "n": "consecutive_errors", "r": true, "t": "`$INTEGER`", "key$": "consecutive_errors", "index$": 1 }, "credit_wait": { "a": true, "h": "Credit Wait", "n": "credit_wait", "r": true, "sh": "The wallet funding an enabled routine that is waiting for inference credit.", "t": "`$OBJECT`", "key$": "credit_wait", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "description", "index$": 3 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "r": true, "t": "`$BOOLEAN`", "key$": "enabled", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": "`$STRING`", "key$": "kind", "index$": 6 }, "last_error": { "a": true, "h": "Last Error", "n": "last_error", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_error", "index$": 7 }, "last_run_at": { "a": true, "h": "Last Run At", "n": "last_run_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_run_at", "index$": 8 }, "last_status": { "a": true, "h": "Last Status", "n": "last_status", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_status", "index$": 9 }, "managed": { "a": true, "h": "Managed", "n": "managed", "r": true, "t": "`$BOOLEAN`", "key$": "managed", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 11 }, "next_run_at": { "a": true, "h": "Next Run At", "n": "next_run_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "next_run_at", "index$": 12 }, "routine": { "a": true, "h": "Routine", "n": "routine", "r": true, "t": "`$OBJECT`", "key$": "routine", "index$": 13 }, "schedule": { "a": true, "h": "Schedule", "n": "schedule", "r": true, "t": "`$OBJECT`", "key$": "schedule", "index$": 14 }, "schedule_label": { "a": true, "h": "Schedule Label", "n": "schedule_label", "r": true, "t": "`$STRING`", "key$": "schedule_label", "index$": 15 }, "utility_model": { "a": true, "h": "Utility Model", "n": "utility_model", "r": true, "t": "`$OBJECT`", "key$": "utility_model", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "agent_routine", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/routines", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/routines", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "routines" }], "t": { "page": { "cursor": "`body.next_cursor`" }, "req": "`reqdata`", "res": "`body.routines`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["enabled", "utility_model"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/routines/{routine_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "routine_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/routines/{routine_id}", "q": { "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "routine_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "routines" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "agent_routine", "name__orig": "agent_routine", "Name": "AgentRoutine", "name_": "agent_routine", "name-": "agent-routine", "NAME": "AGENT_ROUTINE", "index$": 26 }, { "active": true, "entity": "agent_routine", "key$": "BasicAgentRoutineFlow", "kind": "basic", "name": "BasicAgentRoutineFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "agent_routine_ref01" } }], "index$": 0 }, { "a": true, "d": { "agent_id": "agent01", "organization_id": "organization01" }, "i": { "ref": "agent_routine_ref01", "srcdatavar": "agent_routine_ref01_data", "suffix": "_up0", "textfield": "description" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_routine_ref01" } }], "v": [], "index$": 1 }] }, 'AgentRoutine', { "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/routines": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/routines/{routine_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "oneOf": [{ "type": "object", "properties": { "enabled": { "type": "boolean" } }, "required": ["enabled"], "additionalProperties": false }, { "type": "object", "properties": { "utility_model": { "type": ["string", "null"] } }, "required": ["utility_model"], "additionalProperties": false }] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "routine_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_routine.update.1": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/routines/{routine_id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let agent_routine_ref01_data = Object.values(setup.data.existing.agent_routine)[0];
        // LIST
        const agent_routine_ref01_ent = client.AgentRoutine();
        const agent_routine_ref01_match = {};
        agent_routine_ref01_match['agent_id'] = setup.idmap['agent01'];
        agent_routine_ref01_match['organization_id'] = setup.idmap['organization01'];
        const agent_routine_ref01_list = (await agent_routine_ref01_ent.list(agent_routine_ref01_match)).map((e) => e.data());
        // UPDATE
        const agent_routine_ref01_data_up0 = {};
        agent_routine_ref01_data_up0.id = agent_routine_ref01_data.id;
        agent_routine_ref01_data_up0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01'];
        agent_routine_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const agent_routine_ref01_markdef_up0 = { name: 'description', value: 'Mark01-agent_routine_ref01_' + setup.now };
        agent_routine_ref01_data_up0[agent_routine_ref01_markdef_up0.name] = agent_routine_ref01_markdef_up0.value;
        const agent_routine_ref01_resdata_up0 = (await agent_routine_ref01_ent.update(agent_routine_ref01_data_up0)).data();
        (0, node_assert_1.default)(agent_routine_ref01_resdata_up0.id === agent_routine_ref01_data_up0.id);
        (0, node_assert_1.default)(agent_routine_ref01_resdata_up0[agent_routine_ref01_markdef_up0.name] === agent_routine_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_routine/AgentRoutineTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_routine01', 'agent_routine02', 'agent_routine03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_ROUTINE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_ROUTINE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_ROUTINE_ENTID'];
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
//# sourceMappingURL=AgentRoutineEntity.test.js.map