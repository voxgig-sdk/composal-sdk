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
(0, node_test_1.describe)('SparkAgentIntegrationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.SparkAgentIntegration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SparkAgentIntegration().list({ "agent_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'spark_agent_integration.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "account_counts": { "a": true, "h": "Account Counts", "n": "account_counts", "r": true, "sh": "Accounts the viewer can see per toolkit, across all account pages.", "t": "`$OBJECT`", "key$": "account_counts", "index$": 0 }, "accounts_path": { "a": true, "h": "Accounts Path", "n": "accounts_path", "r": true, "sh": "Web path of the organization's Integrations page, where people reconnect and remove the accounts this agent lists.", "t": "`$STRING`", "key$": "accounts_path", "index$": 1 }, "added_toolkits": { "a": true, "h": "Added Toolkits", "n": "added_toolkits", "r": true, "sh": "Apps with a connected or connecting account the viewer can see.", "t": "`$ARRAY`", "key$": "added_toolkits", "index$": 2 }, "can_manage": { "a": true, "h": "Can Manage", "n": "can_manage", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage", "index$": 3 }, "can_manage_organization": { "a": true, "h": "Can Manage Organization", "n": "can_manage_organization", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_organization", "index$": 4 }, "catalog": { "a": true, "h": "Catalog", "n": "catalog", "r": true, "t": "`$ARRAY`", "key$": "catalog", "index$": 5 }, "connect_as": { "a": true, "h": "Connect As", "n": "connect_as", "r": true, "sh": "The account Connect creates and switches on for this agent: the owner's own (personal) or, for an admin connecting someone else's agent, the team's (organization).", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "connect_as", "index$": 6 }, "connect_as_by_toolkit": { "a": true, "h": "Connect As By Toolkit", "n": "connect_as_by_toolkit", "r": true, "sh": "Apps whose Connect differs from connect_as because their sign-in only makes team accounts.", "t": "`$OBJECT`", "key$": "connect_as_by_toolkit", "index$": 7 }, "connected_counts": { "a": true, "h": "Connected Counts", "n": "connected_counts", "r": true, "sh": "Signed-in accounts per toolkit, across all account pages.", "t": "`$OBJECT`", "key$": "connected_counts", "index$": 8 }, "connection_id": { "a": true, "h": "Connection Id", "n": "connection_id", "r": true, "t": "`$STRING`", "key$": "connection_id", "index$": 9 }, "connections": { "a": true, "h": "Connections", "n": "connections", "r": true, "t": "`$ARRAY`", "key$": "connections", "index$": 10 }, "email": { "a": true, "h": "Email", "n": "email", "r": true, "sh": "A native agent's own email address.", "t": "`$OBJECT`", "key$": "email", "index$": 11 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "r": true, "t": "`$BOOLEAN`", "key$": "enabled", "index$": 12 }, "enabled_toolkits": { "a": true, "h": "Enabled Toolkits", "n": "enabled_toolkits", "r": true, "sh": "Apps with a signed-in account this agent uses now, across all account pages, sorted.", "t": "`$ARRAY`", "key$": "enabled_toolkits", "index$": 13 }, "generation": { "a": true, "h": "Generation", "n": "generation", "r": true, "t": "`$INTEGER`", "key$": "generation", "index$": 14 }, "pagination": { "a": true, "h": "Pagination", "n": "pagination", "r": true, "t": "`$OBJECT`", "key$": "pagination", "index$": 15 }, "pending_counts": { "a": true, "h": "Pending Counts", "n": "pending_counts", "r": true, "sh": "Accounts per toolkit whose sign-in was started but not finished, across all account pages.", "t": "`$OBJECT`", "key$": "pending_counts", "index$": 16 }, "personal_creation_key_supported": { "a": true, "h": "Personal Creation Key Supported", "n": "personal_creation_key_supported", "r": false, "sh": "The personal account creation endpoint honors a creation key.", "t": "`$BOOLEAN`", "key$": "personal_creation_key_supported", "index$": 17 }, "private_agent": { "a": true, "h": "Private Agent", "n": "private_agent", "r": true, "sh": "Only the agent's owner can chat with it.", "t": "`$BOOLEAN`", "key$": "private_agent", "index$": 18 }, "shared_agent_personal_accounts_enabled": { "a": true, "h": "Shared Agent Personal Accounts Enabled", "n": "shared_agent_personal_accounts_enabled", "r": true, "sh": "Whether the organization lets a shared agent use one person's account for everyone who chats with it.", "t": "`$BOOLEAN`", "key$": "shared_agent_personal_accounts_enabled", "index$": 19 }, "slack": { "a": true, "h": "Slack", "n": "slack", "r": true, "t": "`$OBJECT`", "key$": "slack", "index$": 20 }, "webhook_connections": { "a": true, "h": "Webhook Connections", "n": "webhook_connections", "r": true, "t": "`$ARRAY`", "key$": "webhook_connections", "index$": 21 }, "webhooks_available": { "a": true, "h": "Webhooks Available", "n": "webhooks_available", "r": true, "t": "`$BOOLEAN`", "key$": "webhooks_available", "index$": 22 } }, "name": "spark_agent_integration", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["connection_id", "enabled", "generation"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "q", "or": "q", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "toolkit", "or": "toolkit", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/integrations", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "integrations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "catalog_q", "or": "catalog_q", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "limit", "or": "limit", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "q", "or": "q", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "toolkit", "or": "toolkit", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/integrations", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "integrations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "spark_agent_integration", "name__orig": "spark_agent_integration", "Name": "SparkAgentIntegration", "name_": "spark_agent_integration", "name-": "spark-agent-integration", "NAME": "SPARK_AGENT_INTEGRATION", "index$": 499 }, { "active": true, "entity": "spark_agent_integration", "key$": "BasicSparkAgentIntegrationFlow", "kind": "basic", "name": "BasicSparkAgentIntegrationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "spark_agent_integration_ref01" }, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "spark_agent_integration_ref01" } }], "index$": 1 }] }, 'SparkAgentIntegration', { "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "connection_id": { "type": "string", "key$": "connection_id" }, "generation": { "type": "integer", "key$": "generation" }, "enabled": { "type": "boolean", "key$": "enabled" } }, "required": ["connection_id", "generation", "enabled"], "additionalProperties": true, "x-ref": "#/components/schemas/ClawderAgentIntegrationSelection" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "q", "in": "query", "schema": { "type": "string", "maxLength": 200 }, "index$": 2 }, { "name": "toolkit", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 5 }] }, "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "catalog_q", "in": "query", "description": "Search addable providers across the agent's authorized catalog, independently of account filters and pages. An empty string lists all addable providers.", "schema": { "type": "string", "maxLength": 200 }, "index$": 2 }, { "name": "q", "in": "query", "schema": { "type": "string", "maxLength": 200 }, "index$": 3 }, { "name": "toolkit", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "index$": 6 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "spark_agent_integration.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/integrations" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const spark_agent_integration_ref01_ent = client.SparkAgentIntegration();
        let spark_agent_integration_ref01_data = setup.data.new.spark_agent_integration['spark_agent_integration_ref01'];
        spark_agent_integration_ref01_data['agent_id'] = setup.idmap['agent01'];
        spark_agent_integration_ref01_data['organization_id'] = setup.idmap['organization01'];
        spark_agent_integration_ref01_data = (await spark_agent_integration_ref01_ent.create(spark_agent_integration_ref01_data)).data();
        (0, node_assert_1.default)(null != spark_agent_integration_ref01_data);
        // LIST
        const spark_agent_integration_ref01_match = {};
        spark_agent_integration_ref01_match['agent_id'] = setup.idmap['agent01'];
        spark_agent_integration_ref01_match['organization_id'] = setup.idmap['organization01'];
        const spark_agent_integration_ref01_list = (await spark_agent_integration_ref01_ent.list(spark_agent_integration_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/spark_agent_integration/SparkAgentIntegrationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['spark_agent_integration01', 'spark_agent_integration02', 'spark_agent_integration03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_SPARK_AGENT_INTEGRATION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_SPARK_AGENT_INTEGRATION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_SPARK_AGENT_INTEGRATION_ENTID'];
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
//# sourceMappingURL=SparkAgentIntegrationEntity.test.js.map