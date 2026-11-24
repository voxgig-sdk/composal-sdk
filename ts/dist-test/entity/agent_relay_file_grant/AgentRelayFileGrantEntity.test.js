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
(0, node_test_1.describe)('AgentRelayFileGrantEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentRelayFileGrant();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentRelayFileGrant().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_relay_file_grant.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access_mode": { "a": true, "h": "Access Mode", "n": "access_mode", "r": true, "t": "`$STRING`", "key$": "access_mode", "index$": 0 }, "connection_generation": { "a": true, "h": "Connection Generation", "n": "connection_generation", "r": true, "t": "`$INTEGER`", "key$": "connection_generation", "index$": 1 }, "connection_id": { "a": true, "h": "Connection Id", "n": "connection_id", "r": true, "t": "`$STRING`", "key$": "connection_id", "index$": 2 }, "connection_name": { "a": true, "h": "Connection Name", "n": "connection_name", "r": true, "sh": "Current display name of the selected account.", "t": "`$STRING`", "key$": "connection_name", "index$": 3 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 4 }, "expected_generation": { "a": true, "h": "Expected Generation", "n": "expected_generation", "r": true, "t": "`$INTEGER`", "key$": "expected_generation", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "key": { "a": true, "h": "Key", "n": "key", "r": true, "t": "`$STRING`", "key$": "key", "index$": 7 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": true, "t": "`$STRING`", "key$": "provider", "index$": 8 }, "resource_id": { "a": true, "h": "Resource Id", "n": "resource_id", "r": true, "t": "`$STRING`", "key$": "resource_id", "index$": 9 }, "resource_kind": { "a": true, "h": "Resource Kind", "n": "resource_kind", "r": true, "t": "`$STRING`", "key$": "resource_kind", "index$": 10 }, "revoked": { "a": true, "h": "Revoked", "n": "revoked", "r": true, "t": "`$BOOLEAN`", "key$": "revoked", "index$": 11 }, "revoked_at": { "a": true, "fo": "date-time", "h": "Revoked At", "n": "revoked_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "revoked_at", "index$": 12 }, "snapshot_supported": { "a": true, "h": "Snapshot Supported", "n": "snapshot_supported", "r": false, "sh": "Whether this selected permission supports snapshot controls.", "t": "`$BOOLEAN`", "key$": "snapshot_supported", "index$": 13 }, "source_operation_id": { "a": true, "h": "Source Operation Id", "n": "source_operation_id", "r": true, "t": "`$STRING`", "key$": "source_operation_id", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "agent_relay_file_grant", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["access_mode", "connection_id", "expected_generation", "key", "resource_id", "resource_kind", "source_operation_id"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agent_relay_file_grants", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agent_relay_file_grants", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_relay_file_grants" }], "t": { "req": "`reqdata`", "res": "`body.grant`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agent_relay_file_grants", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "request_key", "or": "request_key", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "source_operation_id", "or": "source_operation_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agent_relay_file_grants", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_relay_file_grants" }], "t": { "page": { "next": "`body.pagination.next`" }, "req": "`reqdata`", "res": "`body.grants`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_relay_file_grants" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.grant`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_relay_file_grants" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.grant`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "agent_relay_file_grant", "name__orig": "agent_relay_file_grant", "Name": "AgentRelayFileGrant", "name_": "agent_relay_file_grant", "name-": "agent-relay-file-grant", "NAME": "AGENT_RELAY_FILE_GRANT", "index$": 37 }, { "active": true, "entity": "agent_relay_file_grant", "key$": "BasicAgentRelayFileGrantFlow", "kind": "basic", "name": "BasicAgentRelayFileGrantFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "agent_relay_file_grant_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "agent_relay_file_grant_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "agent_relay_file_grant_ref01", "srcdatavar": "agent_relay_file_grant_ref01_data", "suffix": "_dt0" }, "m": { "id": "agent_relay_file_grant01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_relay_file_grant_ref01" } }], "index$": 2, "route": "GET /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "agent_relay_file_grant_ref01", "suffix": "_rm0" }, "m": { "id": "agent_relay_file_grant01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "agent_relay_file_grant_ref01" } }], "index$": 4 }] }, 'AgentRelayFileGrant', { "POST /api/v1/organizations/{organization_id}/agent_relay_file_grants": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["source_operation_id", "connection_id", "resource_kind", "resource_id", "access_mode", "key", "expected_generation"], "properties": { "source_operation_id": { "type": "string", "key$": "source_operation_id" }, "connection_id": { "type": "string", "key$": "connection_id" }, "resource_kind": { "type": "string", "enum": ["notion_page", "slack_channel"], "key$": "resource_kind" }, "resource_id": { "type": "string", "minLength": 1, "maxLength": 200, "key$": "resource_id" }, "access_mode": { "type": "string", "enum": ["read", "read_write"], "key$": "access_mode" }, "key": { "type": "string", "minLength": 1, "maxLength": 200, "key$": "key" }, "expected_generation": { "type": "integer", "minimum": 0, "key$": "expected_generation" } }, "x-ref": "#/components/schemas/AgentRelayFileGrantRequest" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/agent_relay_file_grants": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "source_operation_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 2 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "request_key", "in": "query", "description": "Read the original permission request for the selected source without reissuing consent.", "schema": { "type": "string", "maxLength": 200 }, "index$": 4 }] }, "GET /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_relay_file_grant.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_relay_file_grants", "agent_relay_file_grant.remove.3": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_relay_file_grants/{id}", "agent_relay_file_grant.list.4": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const agent_relay_file_grant_ref01_ent = client.AgentRelayFileGrant();
        let agent_relay_file_grant_ref01_data = setup.data.new.agent_relay_file_grant['agent_relay_file_grant_ref01'];
        agent_relay_file_grant_ref01_data['organization_id'] = setup.idmap['organization01'];
        agent_relay_file_grant_ref01_data = (await agent_relay_file_grant_ref01_ent.create(agent_relay_file_grant_ref01_data)).data();
        (0, node_assert_1.default)(null != agent_relay_file_grant_ref01_data.id);
        // LIST
        const agent_relay_file_grant_ref01_match = {};
        agent_relay_file_grant_ref01_match['organization_id'] = setup.idmap['organization01'];
        const agent_relay_file_grant_ref01_list = (await agent_relay_file_grant_ref01_ent.list(agent_relay_file_grant_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(agent_relay_file_grant_ref01_list, { id: agent_relay_file_grant_ref01_data.id })));
        // LOAD
        const agent_relay_file_grant_ref01_match_dt0 = {};
        agent_relay_file_grant_ref01_match_dt0.id = agent_relay_file_grant_ref01_data.id;
        agent_relay_file_grant_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const agent_relay_file_grant_ref01_data_dt0 = (await agent_relay_file_grant_ref01_ent.load(agent_relay_file_grant_ref01_match_dt0)).data();
        (0, node_assert_1.default)(agent_relay_file_grant_ref01_data_dt0.id === agent_relay_file_grant_ref01_data.id);
        // REMOVE
        const agent_relay_file_grant_ref01_match_rm0 = { id: agent_relay_file_grant_ref01_data.id };
        agent_relay_file_grant_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await agent_relay_file_grant_ref01_ent.remove(agent_relay_file_grant_ref01_match_rm0);
        // LIST
        const agent_relay_file_grant_ref01_match_rt0 = {};
        agent_relay_file_grant_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        const agent_relay_file_grant_ref01_list_rt0 = (await agent_relay_file_grant_ref01_ent.list(agent_relay_file_grant_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(agent_relay_file_grant_ref01_list_rt0, { id: agent_relay_file_grant_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_relay_file_grant/AgentRelayFileGrantTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_relay_file_grant01', 'agent_relay_file_grant02', 'agent_relay_file_grant03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_RELAY_FILE_GRANT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_RELAY_FILE_GRANT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_RELAY_FILE_GRANT_ENTID'];
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
//# sourceMappingURL=AgentRelayFileGrantEntity.test.js.map