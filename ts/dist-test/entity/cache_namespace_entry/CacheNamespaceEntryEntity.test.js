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
(0, node_test_1.describe)('CacheNamespaceEntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.CacheNamespaceEntry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CacheNamespaceEntry().load({ "cache_namespace_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cache_namespace_entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "cache_namespace_entry", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict", "q": { "$action": "evict", "exist": ["cache_namespace_id", "id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "evict" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/issue_contract", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/issue_contract", "q": { "$action": "issue_contract", "exist": ["cache_namespace_id", "id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "issue_contract" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/record_hit", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/record_hit", "q": { "$action": "record_hit", "exist": ["cache_namespace_id", "id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "record_hit" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/record_miss", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/record_miss", "q": { "$action": "record_miss", "exist": ["cache_namespace_id", "id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }, { "var": "id" }, { "lit": "record_miss" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries", "q": { "exist": ["cache_namespace_id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "q": { "exist": ["cache_namespace_id", "id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries", "q": { "exist": ["cache_namespace_id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "q": { "exist": ["cache_namespace_id", "id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "q": { "exist": ["cache_namespace_id", "id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "cache_namespace_id", "or": "cache_namespace_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "q": { "exist": ["cache_namespace_id", "id"] }, "r": { "param": { "cache_namespace_id": "cache_namespace_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "artifacts" }, { "lit": "cache_namespaces" }, { "var": "cache_namespace_id" }, { "lit": "entries" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "cache_namespace_entry", "name__orig": "cache_namespace_entry", "Name": "CacheNamespaceEntry", "name_": "cache_namespace_entry", "name-": "cache-namespace-entry", "NAME": "CACHE_NAMESPACE_ENTRY", "index$": 150 }, { "active": true, "entity": "cache_namespace_entry", "key$": "BasicCacheNamespaceEntryFlow", "kind": "basic", "name": "BasicCacheNamespaceEntryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "cache_namespace_entry_ref01" }, "m": { "cache_namespace_id": "cache_namespace01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "cache_namespace_id": "cache_namespace01" }, "i": { "ref": "cache_namespace_entry_ref01", "srcdatavar": "cache_namespace_entry_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-cache_namespace_entry_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "cache_namespace_entry_ref01", "srcdatavar": "cache_namespace_entry_ref01_data", "suffix": "_dt0" }, "m": { "id": "cache_namespace_entry01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-cache_namespace_entry_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "cache_namespace_entry_ref01", "suffix": "_rm0" }, "m": { "cache_namespace_id": "cache_namespace01", "id": "cache_namespace_entry01" }, "o": "remove", "s": [], "v": [], "index$": 3 }] }, 'CacheNamespaceEntry', { "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/issue_contract": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/record_hit": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/record_miss": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}": { "protocol": "http", "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries": { "protocol": "http", "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}": { "protocol": "http", "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "cache_namespace_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "cache_namespace_entry.create.0": "GET-only live run: needs POST /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}/evict", "cache_namespace_entry.update.1": "GET-only live run: needs PUT /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}", "cache_namespace_entry.load.2": "GET-only live run: reads a record only cache_namespace_entry.create.0 gives", "cache_namespace_entry.remove.3": "GET-only live run: needs DELETE /api/v1/artifacts/cache_namespaces/{cache_namespace_id}/entries/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const cache_namespace_entry_ref01_ent = client.CacheNamespaceEntry();
        let cache_namespace_entry_ref01_data = setup.data.new.cache_namespace_entry['cache_namespace_entry_ref01'];
        cache_namespace_entry_ref01_data['cache_namespace_id'] = setup.idmap['cache_namespace01'];
        cache_namespace_entry_ref01_data = (await cache_namespace_entry_ref01_ent.create(cache_namespace_entry_ref01_data)).data();
        (0, node_assert_1.default)(null != cache_namespace_entry_ref01_data.id);
        // UPDATE
        const cache_namespace_entry_ref01_data_up0 = {};
        cache_namespace_entry_ref01_data_up0.id = cache_namespace_entry_ref01_data.id;
        cache_namespace_entry_ref01_data_up0['cache_namespace_id'] = setup.idmap['cache_namespace_id'] ?? setup.idmap['cache_namespace01'];
        const cache_namespace_entry_ref01_resdata_up0 = (await cache_namespace_entry_ref01_ent.update(cache_namespace_entry_ref01_data_up0)).data();
        (0, node_assert_1.default)(cache_namespace_entry_ref01_resdata_up0.id === cache_namespace_entry_ref01_data_up0.id);
        // LOAD
        const cache_namespace_entry_ref01_match_dt0 = {};
        cache_namespace_entry_ref01_match_dt0.id = cache_namespace_entry_ref01_data.id;
        const cache_namespace_entry_ref01_data_dt0 = (await cache_namespace_entry_ref01_ent.load(cache_namespace_entry_ref01_match_dt0)).data();
        (0, node_assert_1.default)(cache_namespace_entry_ref01_data_dt0.id === cache_namespace_entry_ref01_data.id);
        // REMOVE
        const cache_namespace_entry_ref01_match_rm0 = { id: cache_namespace_entry_ref01_data.id };
        cache_namespace_entry_ref01_match_rm0['cache_namespace_id'] = setup.idmap['cache_namespace_id'] ?? setup.idmap['cache_namespace01'];
        await cache_namespace_entry_ref01_ent.remove(cache_namespace_entry_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cache_namespace_entry/CacheNamespaceEntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cache_namespace_entry01', 'cache_namespace_entry02', 'cache_namespace_entry03', 'cache_namespace01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CACHE_NAMESPACE_ENTRY_ENTID'];
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
//# sourceMappingURL=CacheNamespaceEntryEntity.test.js.map