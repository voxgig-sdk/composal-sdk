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
(0, node_test_1.describe)('InteractionResponseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.InteractionResponse();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.InteractionResponse().create({ "agent_id": 1, "interaction_id": "x", "organization_id": "x", "answer": "x", "conversation_id": "x", "expected_revision": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'interaction_response.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "answer": { "a": true, "h": "Answer", "n": "answer", "r": true, "t": "`$OBJECT`", "union": { "branches": 5, "count": 1, "depth": 3 }, "key$": "answer", "index$": 0 }, "conversation_id": { "a": true, "h": "Conversation Id", "n": "conversation_id", "r": true, "sh": "Explicit conversation identity, including an agent-scoped native session alias.", "t": "`$STRING`", "key$": "conversation_id", "index$": 1 }, "expected_revision": { "a": true, "h": "Expected Revision", "n": "expected_revision", "r": true, "t": "`$INTEGER`", "key$": "expected_revision", "index$": 2 } }, "name": "interaction_response", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["answer", "conversation_id", "expected_revision"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/responses", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "interaction_id", "or": "request_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/responses", "q": { "exist": ["agent_id", "idempotency_key", "interaction_id", "organization_id"] }, "r": { "param": { "id": "agent_id", "request_id": "interaction_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "interactions" }, { "var": "interaction_id" }, { "lit": "responses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "interaction_response", "name__orig": "interaction_response", "Name": "InteractionResponse", "name_": "interaction_response", "name-": "interaction-response", "NAME": "INTERACTION_RESPONSE", "index$": 283 }, { "active": true, "entity": "interaction_response", "key$": "BasicInteractionResponseFlow", "kind": "basic", "name": "BasicInteractionResponseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "interaction_response_ref01" }, "m": { "agent_id": "agent01", "interaction_id": "interaction01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'InteractionResponse', { "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/responses": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Exact JSON body, at most 4 KiB serialized UTF-8 (8 KiB for skill_install). A confirmation grants nothing. Confirming agent_create creates a V2 agent owned by the signed-in approver with the reviewed settings and team app installs. Confirming connection_enable grants full available tools for the shown connection generation. Confirming repository_access saves the exact shown repository grant only if settings and authority remain current. Confirming agent_archive archives the named teammate only if the signed-in user still has management access and its version is unchanged; audit records are retained. Confirming slack_connect requires the signed-in user to have linked their Slack account and reports the workspace to the agent; it grants nothing. Skill_install requires management access and selected_skills; approval durably saves the exact subset before asynchronous import and does not claim installation succeeded.", "additionalProperties": true, "required": ["conversation_id", "expected_revision", "answer"], "properties": { "conversation_id": { "type": "string", "minLength": 1, "description": "Explicit conversation identity, including an agent-scoped native session alias.", "x-ref": "#/components/schemas/PersistentAgentClawderInteractionFields/properties/conversation_id", "key$": "conversation_id" }, "expected_revision": { "type": "integer", "minimum": 1, "maximum": 9223372036854776000, "key$": "expected_revision" }, "answer": { "type": "object", "additionalProperties": false, "required": ["confirmed"], "properties": { "confirmed": { "type": "boolean" }, "selected_skills": { "type": "array", "description": "Required only for skill_install; unique subset of reviewed names, nonempty when confirmed and empty when declined. Forbidden for other kinds.", "maxItems": 20, "uniqueItems": true, "items": { "type": "string", "minLength": 1, "maxLength": 64, "pattern": "^[a-z0-9]+(?:-[a-z0-9]+)*$" } }, "action": { "type": "string", "description": "Required only for a confirmed records, changes or form answer; the id of the action pressed. Forbidden otherwise.", "pattern": "^[A-Za-z0-9_.-]{1,64}$" }, "always_allow": { "type": "boolean", "enum": [true], "description": "Only for a confirmed changes answer from a viewer with can_always_allow. Also lets the agent make its writes with this tool, as this account, without a preview from now on, until someone who manages it removes the permission. Deletes and payments, and changes that cannot be undone, are flagged, run SQL or start left out, are still previewed; email sends, sharing and member changes are not. Forbidden otherwise." }, "choices": { "type": "array", "description": "Required for choice, records, changes and form. For choice, the picked option values in option order; one value for a single choice, one or more for a multiple choice. For records, the ticked record ids in card order, which the action decides. For changes, the ids of the included items in card order, at least one. For a form batch, the ids of the kept drafts in card order, at least one; empty for a single draft. Empty when skipped with confirmed false. Forbidden for other kinds.", "maxItems": 100, "uniqueItems": true, "items": { "type": "string", "minLength": 1, "maxLength": 200 } }, "values": { "type": "object", "description": "Required only for a confirmed answer to a single form draft. Every field as the person approved it, which may differ from the draft. Forbidden otherwise.", "additionalProperties": { "description": "What a form field holds, for the field's type. Text, longtext, markdown, choice, date and datetime are strings; a datetime without an offset is wall-clock time in the viewer's zone. Number is a number, boolean true or false, multichoice and labels lists of strings, and person {person, id?}. Null when empty.", "anyOf": [], "x-ref": "#/components/schemas/SparkFormValue" }, "x-ref": "#/components/schemas/SparkFormValues" }, "items": { "type": "array", "description": "Required only for a confirmed answer to a form batch. Each kept draft with every field as the person approved it, in the order of choices. Forbidden otherwise.", "maxItems": 20, "items": { "type": "object", "additionalProperties": false, "required": [], "properties": {} } } }, "x-ref": "#/components/schemas/PersistentAgentClawderConfirmationAnswer", "key$": "answer" } }, "x-ref": "#/components/schemas/PersistentAgentClawderInteractionResponseInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "request_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "Idempotency-Key", "in": "header", "required": true, "description": "Stable unique operation key; reuse only for the identical request, including expected versions.", "schema": { "type": "string", "pattern": "^[a-zA-Z0-9_-]{1,128}$" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "interaction_response.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/responses" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const interaction_response_ref01_ent = client.InteractionResponse();
        let interaction_response_ref01_data = setup.data.new.interaction_response['interaction_response_ref01'];
        interaction_response_ref01_data['agent_id'] = setup.idmap['agent01'];
        interaction_response_ref01_data['interaction_id'] = setup.idmap['interaction01'];
        interaction_response_ref01_data['organization_id'] = setup.idmap['organization01'];
        interaction_response_ref01_data = (await interaction_response_ref01_ent.create(interaction_response_ref01_data)).data();
        (0, node_assert_1.default)(null != interaction_response_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/interaction_response/InteractionResponseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['interaction_response01', 'interaction_response02', 'interaction_response03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03', 'interaction01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_INTERACTION_RESPONSE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_INTERACTION_RESPONSE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_INTERACTION_RESPONSE_ENTID'];
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
//# sourceMappingURL=InteractionResponseEntity.test.js.map