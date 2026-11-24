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
(0, node_test_1.describe)('AgentRepositoryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentRepository();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentRepository().list({ "agent_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_repository.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "can_manage": { "a": true, "h": "Can Manage", "n": "can_manage", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage", "index$": 0 }, "environments": { "a": true, "h": "Environments", "n": "environments", "r": true, "sh": "Sandbox environment per granted repository ID, shared by every bot granted that repository.", "t": "`$OBJECT`", "key$": "environments", "index$": 1 }, "expected_version": { "a": true, "h": "Expected Version", "n": "expected_version", "r": true, "t": "`$INTEGER`", "key$": "expected_version", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "repository_choices": { "a": true, "h": "Repository Choices", "n": "repository_choices", "r": true, "t": "`$ARRAY`", "key$": "repository_choices", "index$": 4 }, "repository_choices_error": { "a": true, "h": "Repository Choices Error", "n": "repository_choices_error", "r": false, "sh": "GitHub discovery warning.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "repository_choices_error", "index$": 5 }, "repository_choices_truncated": { "a": true, "h": "Repository Choices Truncated", "n": "repository_choices_truncated", "r": true, "t": "`$BOOLEAN`", "key$": "repository_choices_truncated", "index$": 6 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$INTEGER`", "key$": "version", "index$": 7 }, "work_repositories": { "a": true, "h": "Work Repositories", "n": "work_repositories", "r": true, "t": "`$ARRAY`", "key$": "work_repositories", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "agent_repository", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "q", "or": "q", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "repositories" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["branch"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "repository", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "id", "or": "repository", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment", "q": { "$action": "environment", "exist": ["agent_id", "id", "organization_id"] }, "r": { "param": { "id": "agent_id", "repository": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "repositories" }, { "var": "id" }, { "lit": "environment" }], "t": { "req": { "branch": "`reqdata.branch`" }, "res": "`body.environment`" }, "index$": 0 }, { "a": true, "bf": ["expected_version", "work_repositories"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories", "q": { "exist": ["agent_id", "organization_id"] }, "r": { "param": { "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "repositories" }], "t": { "req": { "expected_version": "`reqdata.expected_version`", "work_repositories": "`reqdata.work_repository`" }, "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "key$": "agent_repository", "name__orig": "agent_repository", "Name": "AgentRepository", "name_": "agent_repository", "name-": "agent-repository", "NAME": "AGENT_REPOSITORY", "index$": 39 }, { "active": true, "entity": "agent_repository", "key$": "BasicAgentRepositoryFlow", "kind": "basic", "name": "BasicAgentRepositoryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "agent_id": "agent01", "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "agent_repository_ref01" } }], "index$": 0 }, { "a": false, "d": { "organization_id": "organization01" }, "i": { "ref": "agent_repository_ref01", "srcdatavar": "agent_repository_ref01_data", "suffix": "_up0", "textfield": "repository_choices_error" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_repository_ref01" } }], "v": [], "unreachable": true }] }, 'AgentRepository', { "GET /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "in": "query", "name": "q", "schema": { "type": "string", "maxLength": 200 }, "index$": 2 }] }, "POST /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "branch": { "type": "string", "maxLength": 255, "description": "A branch other than the default one. The bot builds the recipe on it and checks the image on a fresh machine, on a thread it reports in. Nothing is promoted, so thread sandboxes keep their current environment." } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "repository", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "in": "path", "name": "repository", "required": true, "schema": { "type": "string" }, "index$": 3 }] }, "PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["work_repositories", "expected_version"], "properties": { "work_repositories": { "type": "array", "maxItems": 20, "items": { "type": "object", "properties": { "repository_id": { "type": "string" }, "permission": { "description": "Defaults to write when omitted.", "type": "string", "enum": [] }, "write_branches": { "description": "Exact branches allowed for writes. Empty or omitted allows all branches, subject to exclude_default_branch and normal repository protections.", "type": "array", "items": {}, "maxItems": 32 }, "exclude_default_branch": { "type": "boolean", "description": "With write permission, exclude the current default branch. Defaults to false." } }, "required": ["repository_id"], "additionalProperties": false, "x-ref": "#/components/schemas/PersistentAgentWorkRepository" }, "key$": "work_repositories" }, "expected_version": { "type": "integer", "minimum": 0, "key$": "expected_version" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_repository.update.1": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let agent_repository_ref01_data = Object.values(setup.data.existing.agent_repository)[0];
        // LIST
        const agent_repository_ref01_ent = client.AgentRepository();
        const agent_repository_ref01_match = {};
        agent_repository_ref01_match['agent_id'] = setup.idmap['agent01'];
        agent_repository_ref01_match['organization_id'] = setup.idmap['organization01'];
        const agent_repository_ref01_list = (await agent_repository_ref01_ent.list(agent_repository_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_repository/AgentRepositoryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_repository01', 'agent_repository02', 'agent_repository03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_REPOSITORY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_REPOSITORY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_REPOSITORY_ENTID'];
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
//# sourceMappingURL=AgentRepositoryEntity.test.js.map