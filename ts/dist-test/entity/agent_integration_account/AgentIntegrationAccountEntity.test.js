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
(0, node_test_1.describe)('AgentIntegrationAccountEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentIntegrationAccount();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentIntegrationAccount().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_integration_account.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "can_cancel_sign_in": { "a": true, "h": "Can Cancel Sign In", "n": "can_cancel_sign_in", "r": false, "sh": "The viewer can cancel the unfinished authorization attempt.", "t": "`$BOOLEAN`", "key$": "can_cancel_sign_in", "index$": 0 }, "can_delete": { "a": true, "h": "Can Delete", "n": "can_delete", "r": true, "t": "`$BOOLEAN`", "key$": "can_delete", "index$": 1 }, "can_disconnect": { "a": true, "h": "Can Disconnect", "n": "can_disconnect", "r": true, "t": "`$BOOLEAN`", "key$": "can_disconnect", "index$": 2 }, "can_enable": { "a": true, "h": "Can Enable", "n": "can_enable", "r": true, "t": "`$BOOLEAN`", "key$": "can_enable", "index$": 3 }, "can_manage_sharing": { "a": true, "h": "Can Manage Sharing", "n": "can_manage_sharing", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_sharing", "index$": 4 }, "can_reconnect": { "a": true, "h": "Can Reconnect", "n": "can_reconnect", "r": true, "t": "`$BOOLEAN`", "key$": "can_reconnect", "index$": 5 }, "can_sync": { "a": true, "h": "Can Sync", "n": "can_sync", "r": true, "sh": "The viewer's own sign-in is waiting; their app may ask Rails whether the browser finished.", "t": "`$BOOLEAN`", "key$": "can_sync", "index$": 6 }, "connected_by": { "a": true, "h": "Connected By", "n": "connected_by", "r": true, "sh": "Name of the person whose sign-in this account is.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "connected_by", "index$": 7 }, "connected_by_you": { "a": true, "h": "Connected By You", "n": "connected_by_you", "r": true, "sh": "True when the viewer is the person whose sign-in this account is.", "t": "`$BOOLEAN`", "key$": "connected_by_you", "index$": 8 }, "creation_key_digest": { "a": true, "h": "Creation Key Digest", "n": "creation_key_digest", "r": false, "sh": "SHA-256 of the unfinished setup key for its original creator.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "creation_key_digest", "index$": 9 }, "generation": { "a": true, "h": "Generation", "n": "generation", "r": true, "t": "`$INTEGER`", "key$": "generation", "index$": 10 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 11 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 12 }, "provider_disabled_reason": { "a": true, "h": "Provider Disabled Reason", "n": "provider_disabled_reason", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "provider_disabled_reason", "index$": 13 }, "provider_identity": { "a": true, "h": "Provider Identity", "n": "provider_identity", "r": true, "t": "`$OBJECT`", "key$": "provider_identity", "index$": 14 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": true, "sh": "Pins this account's current authorization, as agent_connection_ID:GENERATION.", "t": "`$STRING`", "key$": "reference", "index$": 15 }, "sharing_status": { "a": true, "h": "Sharing Status", "n": "sharing_status", "r": false, "sh": "Agent account audience, including legacy personal and paused access.", "t": "`$STRING`", "key$": "sharing_status", "index$": 16 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 17 }, "team_sharing_enabled": { "a": true, "h": "Team Sharing Enabled", "n": "team_sharing_enabled", "r": true, "t": "`$BOOLEAN`", "key$": "team_sharing_enabled", "index$": 18 }, "team_sharing_version": { "a": true, "h": "Team Sharing Version", "n": "team_sharing_version", "r": true, "t": "`$INTEGER`", "key$": "team_sharing_version", "index$": 19 }, "toolkit": { "a": true, "h": "Toolkit", "n": "toolkit", "r": true, "t": "`$STRING`", "key$": "toolkit", "index$": 20 } }, "id": { "field": "id", "name": "id" }, "name": "agent_integration_account", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agent_integrations/accounts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "enableable", "or": "enableable", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "q", "or": "q", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "toolkit", "or": "toolkit", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agent_integrations/accounts", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_integrations" }, { "lit": "accounts" }], "t": { "page": { "next": "`body.pagination.next`" }, "req": "`reqdata`", "res": "`body.connections`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "agent_integration_account", "name__orig": "agent_integration_account", "Name": "AgentIntegrationAccount", "name_": "agent_integration_account", "name-": "agent-integration-account", "NAME": "AGENT_INTEGRATION_ACCOUNT", "index$": 23 }, { "active": true, "entity": "agent_integration_account", "key$": "BasicAgentIntegrationAccountFlow", "kind": "basic", "name": "BasicAgentIntegrationAccountFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "agent_integration_account_ref01" } }], "index$": 0 }] }, 'AgentIntegrationAccount', { "GET /api/v1/organizations/{organization_id}/agent_integrations/accounts": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "q", "in": "query", "schema": { "type": "string", "maxLength": 200 }, "index$": 1 }, { "name": "toolkit", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 4 }, { "name": "enableable", "in": "query", "description": "When true, only connected accounts an agent can be given now.", "schema": { "type": "boolean" }, "index$": 5 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let agent_integration_account_ref01_data = Object.values(setup.data.existing.agent_integration_account)[0];
        // LIST
        const agent_integration_account_ref01_ent = client.AgentIntegrationAccount();
        const agent_integration_account_ref01_match = {};
        agent_integration_account_ref01_match['organization_id'] = setup.idmap['organization01'];
        const agent_integration_account_ref01_list = (await agent_integration_account_ref01_ent.list(agent_integration_account_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_integration_account/AgentIntegrationAccountTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_integration_account01', 'agent_integration_account02', 'agent_integration_account03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_INTEGRATION_ACCOUNT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_INTEGRATION_ACCOUNT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_INTEGRATION_ACCOUNT_ENTID'];
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
//# sourceMappingURL=AgentIntegrationAccountEntity.test.js.map