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
(0, node_test_1.describe)('LocalAgentResponseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.LocalAgentResponse();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LocalAgentResponse().create({ "organization_id": 1, "input": "x", "model": "x", "store": true, "stream": true }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'local_agent_response.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "input": { "a": true, "h": "Input", "n": "input", "r": true, "t": "`$ARRAY`", "key$": "input", "index$": 0 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "t": "`$STRING`", "key$": "model", "index$": 1 }, "service_tier": { "a": true, "h": "Service Tier", "n": "service_tier", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "service_tier", "index$": 2 }, "store": { "a": true, "h": "Store", "n": "store", "r": true, "t": "`$BOOLEAN`", "key$": "store", "index$": 3 }, "stream": { "a": true, "h": "Stream", "n": "stream", "r": true, "t": "`$BOOLEAN`", "key$": "stream", "index$": 4 }, "tools": { "a": true, "h": "Tools", "n": "tools", "r": false, "t": "`$ARRAY`", "key$": "tools", "index$": 5 } }, "name": "local_agent_response", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["input", "model", "service_tier", "store", "stream", "tools"], "co": { "id": "POST /api/v1/organizations/{organization_id}/local_agent/responses", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/local_agent/responses", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "alternatives": [{ "kind": "raw", "media": "text/event-stream" }], "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "local_agent" }, { "lit": "responses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "local_agent_response", "name__orig": "local_agent_response", "Name": "LocalAgentResponse", "name_": "local_agent_response", "name-": "local-agent-response", "NAME": "LOCAL_AGENT_RESPONSE", "index$": 302 }, { "active": true, "entity": "local_agent_response", "key$": "BasicLocalAgentResponseFlow", "kind": "basic", "name": "BasicLocalAgentResponseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "local_agent_response_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'LocalAgentResponse', { "POST /api/v1/organizations/{organization_id}/local_agent/responses": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "An OpenAI Responses request from the agent built into `com`, relayed with the platform's credentials. The model must be gpt-6-luna or gpt-5.6-luna; the request must stream and set store to false; stored-state fields and tools the provider runs (web search, file search, code interpreter, MCP) are refused. At most 24 MiB.", "required": ["model", "input", "stream", "store"], "additionalProperties": true, "properties": { "model": { "type": "string", "enum": ["gpt-6-luna", "gpt-5.6-luna"], "key$": "model" }, "input": { "type": "array", "items": { "type": "object", "additionalProperties": true }, "key$": "input" }, "stream": { "type": "boolean", "enum": [true], "key$": "stream" }, "store": { "type": "boolean", "enum": [false], "key$": "store" }, "service_tier": { "type": "string", "enum": ["auto", "default", "flex", "priority"], "nullable": true, "key$": "service_tier" }, "tools": { "type": "array", "items": { "type": "object", "additionalProperties": true }, "key$": "tools" } }, "x-ref": "#/components/schemas/LocalAgentResponsesRequest" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "local_agent_response.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/local_agent/responses" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const local_agent_response_ref01_ent = client.LocalAgentResponse();
        let local_agent_response_ref01_data = setup.data.new.local_agent_response['local_agent_response_ref01'];
        local_agent_response_ref01_data['organization_id'] = setup.idmap['organization01'];
        local_agent_response_ref01_data = (await local_agent_response_ref01_ent.create(local_agent_response_ref01_data)).data();
        (0, node_assert_1.default)(null != local_agent_response_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/local_agent_response/LocalAgentResponseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['local_agent_response01', 'local_agent_response02', 'local_agent_response03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_LOCAL_AGENT_RESPONSE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_LOCAL_AGENT_RESPONSE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_LOCAL_AGENT_RESPONSE_ENTID'];
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
//# sourceMappingURL=LocalAgentResponseEntity.test.js.map