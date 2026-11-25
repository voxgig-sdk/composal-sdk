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
(0, node_test_1.describe)('AgentSkillEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AgentSkill();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentSkill().load({ "id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_skill.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agents": { "a": true, "h": "Agents", "n": "agents", "r": true, "sh": "Active V2 agents the viewer can see whose owner is still a member", "t": "`$ARRAY`", "key$": "agents", "index$": 0 }, "audience": { "a": true, "h": "Audience", "n": "audience", "r": true, "t": "`$OBJECT`", "key$": "audience", "index$": 1 }, "can_manage_library": { "a": true, "h": "Can Manage Library", "n": "can_manage_library", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_library", "index$": 2 }, "content": { "a": true, "h": "Content", "n": "content", "r": true, "sh": "The skill's SKILL.md", "t": "`$STRING`", "key$": "content", "index$": 3 }, "files": { "a": true, "h": "Files", "n": "files", "r": true, "t": "`$ARRAY`", "key$": "files", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "marketplace": { "a": true, "h": "Marketplace", "n": "marketplace", "r": false, "t": "`$STRING`", "key$": "marketplace", "index$": 6 }, "pending": { "a": true, "h": "Pending", "n": "pending", "r": true, "sh": "Some agent is still applying a change; check again shortly", "t": "`$BOOLEAN`", "key$": "pending", "index$": 7 }, "plugin": { "a": true, "h": "Plugin", "n": "plugin", "r": false, "sh": "The marketplace entry id", "t": "`$STRING`", "key$": "plugin", "index$": 8 }, "revision": { "a": true, "h": "Revision", "n": "revision", "r": true, "sh": "The commit SHA returned by preview", "t": "`$STRING`", "key$": "revision", "index$": 9 }, "skill": { "a": true, "h": "Skill", "n": "skill", "r": true, "t": "`$OBJECT`", "key$": "skill", "index$": 10 }, "skills": { "a": true, "h": "Skills", "n": "skills", "r": true, "t": "`$ARRAY`", "key$": "skills", "index$": 11 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "sh": "owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...]", "t": "`$STRING`", "key$": "source", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "agent_skill", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["audience", "marketplace", "plugin", "revision", "skills", "source"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agent_skills", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agent_skills", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_skills" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["marketplace", "plugin", "source"], "co": { "id": "POST /api/v1/organizations/{organization_id}/agent_skills/preview", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/agent_skills/preview", "q": { "$action": "preview", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_skills" }, { "lit": "preview" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agent_skills/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agent_skills/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_skills" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agent_skills/marketplace", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "q", "or": "q", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "source", "or": "source", "r": true, "style": "form", "t": "`$STRING`", "index$": 1, "ex": "skills_sh" }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agent_skills/marketplace", "q": { "$action": "marketplace", "exist": ["organization_id", "source"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_skills" }, { "lit": "marketplace" }], "t": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/agent_skills", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/agent_skills", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_skills" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/agent_skills/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/agent_skills/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_skills" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["agent_ids", "mode", "new_agents"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/agent_skills/{id}/audience", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/agent_skills/{id}/audience", "q": { "$action": "audience", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agent_skills" }, { "var": "id" }, { "lit": "audience" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "agent_skill", "name__orig": "agent_skill", "Name": "AgentSkill", "name_": "agent_skill", "name-": "agent-skill", "NAME": "AGENT_SKILL", "index$": 50 }, { "active": true, "entity": "agent_skill", "key$": "BasicAgentSkillFlow", "kind": "basic", "name": "BasicAgentSkillFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "agent_skill_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": false, "d": { "organization_id": "organization01" }, "i": { "ref": "agent_skill_ref01", "srcdatavar": "agent_skill_ref01_data", "suffix": "_up0", "textfield": "content" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_skill_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "agent_skill_ref01", "srcdatavar": "agent_skill_ref01_data", "suffix": "_dt0" }, "m": { "id": "agent_skill01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_skill_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "agent_skill_ref01", "suffix": "_rm0" }, "m": { "id": "agent_skill01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 2 }] }, 'AgentSkill', { "POST /api/v1/organizations/{organization_id}/agent_skills": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "allOf": [{ "type": "object", "description": "Either a pasted source or a marketplace plugin", "properties": { "source": { "type": "string", "description": "owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...]", "key$": "source" }, "marketplace": { "type": "string", "enum": ["skills_sh", "claude", "cursor", "codex"], "key$": "marketplace" }, "plugin": { "type": "string", "description": "The marketplace entry id", "key$": "plugin" } }, "x-ref": "#/components/schemas/AgentSkillSourceInput" }, { "type": "object", "required": ["revision", "skills", "audience"], "properties": { "revision": { "type": "string", "description": "The commit SHA returned by preview", "key$": "revision" }, "skills": { "type": "array", "items": { "type": "string" }, "minItems": 1, "maxItems": 50, "key$": "skills" }, "audience": { "type": "object", "required": ["mode"], "additionalProperties": false, "properties": { "mode": {}, "agent_ids": {}, "new_agents": {} }, "x-ref": "#/components/schemas/AgentSkillAudienceInput", "key$": "audience" } } }] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/organizations/{organization_id}/agent_skills/preview": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Either a pasted source or a marketplace plugin", "properties": { "source": { "type": "string", "description": "owner/repo, a GitHub or skills.sh link, or npx skills add owner/repo [--skill NAME ...]", "key$": "source" }, "marketplace": { "type": "string", "enum": ["skills_sh", "claude", "cursor", "codex"], "key$": "marketplace" }, "plugin": { "type": "string", "description": "The marketplace entry id", "key$": "plugin" } }, "additionalProperties": true, "x-ref": "#/components/schemas/AgentSkillSourceInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/agent_skills/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/agent_skills/marketplace": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "source", "in": "query", "required": true, "schema": { "type": "string", "enum": ["skills_sh", "claude", "cursor", "codex"] }, "index$": 1 }, { "name": "q", "in": "query", "schema": { "type": "string" }, "description": "Search text for skills.sh, at least two characters; catalogs return every plugin", "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/agent_skills": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /api/v1/organizations/{organization_id}/agent_skills/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/organizations/{organization_id}/agent_skills/{id}/audience": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["mode"], "additionalProperties": true, "properties": { "mode": { "type": "string", "enum": ["all", "selected"], "description": "all: every agent now and later. selected: exactly agent_ids among agents the viewer manages" }, "agent_ids": { "type": "array", "items": { "type": "string" }, "description": "With selected, the agents to have the skill" }, "new_agents": { "type": "boolean", "description": "With selected, whether agents created from now on get it; agents that already exist are unaffected" } }, "x-ref": "#/components/schemas/AgentSkillAudienceInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "agent_skill.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_skills", "agent_skill.update.1": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_skills/{id}/audience", "agent_skill.load.2": "GET-only live run: reads a record only agent_skill.create.0 gives", "agent_skill.remove.3": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_skills/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const agent_skill_ref01_ent = client.AgentSkill();
        let agent_skill_ref01_data = setup.data.new.agent_skill['agent_skill_ref01'];
        agent_skill_ref01_data['organization_id'] = setup.idmap['organization01'];
        agent_skill_ref01_data = (await agent_skill_ref01_ent.create(agent_skill_ref01_data)).data();
        (0, node_assert_1.default)(null != agent_skill_ref01_data.id);
        // LOAD
        const agent_skill_ref01_match_dt0 = {};
        agent_skill_ref01_match_dt0.id = agent_skill_ref01_data.id;
        const agent_skill_ref01_data_dt0 = (await agent_skill_ref01_ent.load(agent_skill_ref01_match_dt0)).data();
        (0, node_assert_1.default)(agent_skill_ref01_data_dt0.id === agent_skill_ref01_data.id);
        // REMOVE
        const agent_skill_ref01_match_rm0 = { id: agent_skill_ref01_data.id };
        agent_skill_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await agent_skill_ref01_ent.remove(agent_skill_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_skill/AgentSkillTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_skill01', 'agent_skill02', 'agent_skill03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AGENT_SKILL_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AGENT_SKILL_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AGENT_SKILL_ENTID'];
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
//# sourceMappingURL=AgentSkillEntity.test.js.map