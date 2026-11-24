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
(0, node_test_1.describe)('MemoryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Memory();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Memory().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'memory.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "confidence": { "a": true, "h": "Confidence", "n": "confidence", "r": true, "t": "`$STRING`", "key$": "confidence", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "environment_id": { "a": true, "h": "Environment Id", "n": "environment_id", "r": false, "t": "`$STRING`", "key$": "environment_id", "index$": 2 }, "finding": { "a": true, "h": "Finding", "n": "finding", "r": true, "t": "`$STRING`", "key$": "finding", "index$": 3 }, "history": { "a": true, "h": "History", "n": "history", "r": true, "t": "`$ARRAY`", "key$": "history", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "indexed_at": { "a": true, "fo": "date-time", "h": "Indexed At", "n": "indexed_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "indexed_at", "index$": 6 }, "memory": { "a": true, "h": "Memory", "n": "memory", "r": true, "t": "`$OBJECT`", "key$": "memory", "index$": 7 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": false, "t": "`$STRING`", "key$": "project_id", "index$": 8 }, "response": { "a": true, "h": "Response", "n": "response", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "response", "index$": 9 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": true, "t": "`$OBJECT`", "key$": "scope", "index$": 10 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "t": "`$OBJECT`", "key$": "source", "index$": 11 }, "tags": { "a": true, "h": "Tags", "n": "tags", "op": { "list": { "req": true, "type": "`$ARRAY`" } }, "r": false, "t": "`$ARRAY`", "key$": "tags", "index$": 12 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 13 }, "workaround": { "a": true, "h": "Workaround", "n": "workaround", "op": { "list": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "workaround", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "memory", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["environment_id", "finding", "project_id", "response", "tags", "title", "workaround"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/memories", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/memories", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "memories" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/memories", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "environment_id", "or": "environment_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "include_environment", "or": "include_environments", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "q", "or": "q", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "tag", "or": "tag", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/memories", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "memories" }], "t": { "req": "`reqdata`", "res": "`body.memories`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/memories/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "environment_id", "or": "environment_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/memories/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "memories" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/verify/memories/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/verify/memories/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "memories" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "memory", "name__orig": "memory", "Name": "Memory", "name_": "memory", "name-": "memory", "NAME": "MEMORY", "index$": 315 }, { "active": true, "entity": "memory", "key$": "BasicMemoryFlow", "kind": "basic", "name": "BasicMemoryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "memory_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "memory_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "memory_ref01", "srcdatavar": "memory_ref01_data", "suffix": "_dt0" }, "m": { "id": "memory01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-memory_ref01" } }], "index$": 2, "route": "GET /api/v1/organizations/{organization_id}/verify/memories/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "memory_ref01", "suffix": "_rm0" }, "m": { "id": "memory01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "memory_ref01" } }], "index$": 4 }] }, 'Memory', { "POST /api/v1/organizations/{organization_id}/verify/memories": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["title", "finding"], "additionalProperties": true, "oneOf": [{ "required": ["environment_id"], "not": { "required": ["project_id"] } }, { "required": ["project_id"], "not": { "required": ["environment_id"] } }], "properties": { "environment_id": { "type": "string", "key$": "environment_id" }, "project_id": { "type": "string", "key$": "project_id" }, "title": { "type": "string", "minLength": 1, "maxLength": 160, "key$": "title" }, "finding": { "type": "string", "minLength": 1, "maxLength": 1000, "key$": "finding" }, "response": { "type": "string", "maxLength": 1000, "key$": "response" }, "workaround": { "type": "string", "maxLength": 1000, "key$": "workaround" }, "tags": { "type": "array", "maxItems": 8, "items": { "type": "string", "pattern": "^[a-z0-9][a-z0-9-]{0,39}$" }, "key$": "tags" } }, "x-ref": "#/components/schemas/VerifyMemoryNoteInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/verify/memories": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "include_environments", "in": "query", "description": "Also browse memories from this project's environments", "schema": { "type": "boolean" }, "index$": 1 }, { "name": "q", "in": "query", "schema": { "type": "string", "maxLength": 500 }, "index$": 2 }, { "name": "tag", "in": "query", "schema": { "type": "string", "maxLength": 40 }, "index$": 3 }, { "name": "environment_id", "in": "query", "description": "Include exact environment and explicitly scoped project notes", "schema": { "type": "string" }, "index$": 4 }, { "name": "project_id", "in": "query", "description": "Include only notes explicitly scoped to this project", "schema": { "type": "string" }, "index$": 5 }] }, "GET /api/v1/organizations/{organization_id}/verify/memories/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "project_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }, { "name": "environment_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }] }, "DELETE /api/v1/organizations/{organization_id}/verify/memories/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "project_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "memory.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/memories", "memory.remove.3": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/memories/{id}", "memory.list.4": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const memory_ref01_ent = client.Memory();
        let memory_ref01_data = setup.data.new.memory['memory_ref01'];
        memory_ref01_data['organization_id'] = setup.idmap['organization01'];
        memory_ref01_data = (await memory_ref01_ent.create(memory_ref01_data)).data();
        (0, node_assert_1.default)(null != memory_ref01_data.id);
        // LIST
        const memory_ref01_match = {};
        memory_ref01_match['organization_id'] = setup.idmap['organization01'];
        const memory_ref01_list = (await memory_ref01_ent.list(memory_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(memory_ref01_list, { id: memory_ref01_data.id })));
        // LOAD
        const memory_ref01_match_dt0 = {};
        memory_ref01_match_dt0.id = memory_ref01_data.id;
        memory_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const memory_ref01_data_dt0 = (await memory_ref01_ent.load(memory_ref01_match_dt0)).data();
        (0, node_assert_1.default)(memory_ref01_data_dt0.id === memory_ref01_data.id);
        // REMOVE
        const memory_ref01_match_rm0 = { id: memory_ref01_data.id };
        memory_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await memory_ref01_ent.remove(memory_ref01_match_rm0);
        // LIST
        const memory_ref01_match_rt0 = {};
        memory_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        const memory_ref01_list_rt0 = (await memory_ref01_ent.list(memory_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(memory_ref01_list_rt0, { id: memory_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/memory/MemoryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['memory01', 'memory02', 'memory03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_MEMORY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_MEMORY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_MEMORY_ENTID'];
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
//# sourceMappingURL=MemoryEntity.test.js.map