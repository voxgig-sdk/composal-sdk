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
(0, node_test_1.describe)('ProductMapObservationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ProductMapObservation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ProductMapObservation().load({ "id": 1, "organization_id": "x", "project_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'product_map_observation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "capture": { "a": true, "h": "Capture", "n": "capture", "r": true, "t": "`$OBJECT`", "key$": "capture", "index$": 0 }, "events": { "a": true, "h": "Events", "n": "events", "r": true, "t": "`$ARRAY`", "key$": "events", "index$": 1 }, "evidence_id": { "a": true, "h": "Evidence Id", "n": "evidence_id", "r": true, "t": "`$STRING`", "key$": "evidence_id", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "observation_id": { "a": true, "h": "Observation Id", "n": "observation_id", "r": true, "t": "`$STRING`", "key$": "observation_id", "index$": 4 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": true, "t": "`$OBJECT`", "key$": "scope", "index$": 5 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 6 }, "key$": "state", "index$": 6 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "product_map_observation", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "observation_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "observation_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 3 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "account_id", "or": "account_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "area", "or": "area", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "before", "or": "before", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "persona_id", "or": "persona_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "revision_id", "or": "revision_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "since", "or": "since", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}", "q": { "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "observation_id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "observations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}/identity_history", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "observation_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "observation_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "project_id", "or": "project_id", "r": true, "t": "`$STRING`", "index$": 3 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "account_id", "or": "account_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "area", "or": "area", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "before", "or": "before", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "decisions_before", "or": "decisions_before", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "interpretations_before", "or": "interpretations_before", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "persona_id", "or": "persona_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "query", "or": "query", "r": false, "style": "form", "t": "`$STRING`", "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "revision_id", "or": "revision_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 7 }, { "a": true, "explode": true, "k": "query", "n": "since", "or": "since", "r": false, "style": "form", "t": "`$STRING`", "index$": 8 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}/identity_history", "q": { "$action": "identity_history", "exist": ["id", "organization_id", "project_id"] }, "r": { "param": { "observation_id": "id", "project_id": "project_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verification" }, { "lit": "projects" }, { "var": "project_id" }, { "lit": "product_map" }, { "lit": "observations" }, { "var": "id" }, { "lit": "identity_history" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.project"]] }, "key$": "product_map_observation", "name__orig": "product_map_observation", "Name": "ProductMapObservation", "name_": "product_map_observation", "name-": "product-map-observation", "NAME": "PRODUCT_MAP_OBSERVATION", "index$": 388 }, { "active": true, "entity": "product_map_observation", "key$": "BasicProductMapObservationFlow", "kind": "basic", "name": "BasicProductMapObservationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "product_map_observation_ref01", "srcdatavar": "product_map_observation_ref01_data", "suffix": "_dt0" }, "m": { "id": "product_map_observation01", "organization_id": "organization01", "project_id": "project01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-product_map_observation_ref01" } }], "index$": 0, "route": "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}", "record": {} }] }, 'ProductMapObservation', { "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "observation_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "revision_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "persona_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "account_id", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "query", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "area", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "since", "in": "query", "schema": { "type": "string" }, "index$": 8 }, { "name": "before", "in": "query", "schema": { "type": "string" }, "index$": 9 }, { "name": "observation_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 10 }] }, "GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/observations/{observation_id}/identity_history": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "observation_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "revision_id", "in": "query", "schema": { "type": "string" }, "index$": 3 }, { "name": "persona_id", "in": "query", "schema": { "type": "string" }, "index$": 4 }, { "name": "account_id", "in": "query", "schema": { "type": "string" }, "index$": 5 }, { "name": "query", "in": "query", "schema": { "type": "string" }, "index$": 6 }, { "name": "area", "in": "query", "schema": { "type": "string" }, "index$": 7 }, { "name": "since", "in": "query", "schema": { "type": "string" }, "index$": 8 }, { "name": "before", "in": "query", "schema": { "type": "string" }, "index$": 9 }, { "name": "observation_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 10 }, { "name": "interpretations_before", "in": "query", "schema": { "type": "string" }, "index$": 11 }, { "name": "decisions_before", "in": "query", "schema": { "type": "string" }, "index$": 12 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let product_map_observation_ref01_data = Object.values(setup.data.existing.product_map_observation)[0];
        // LOAD
        const product_map_observation_ref01_ent = client.ProductMapObservation();
        const product_map_observation_ref01_match_dt0 = {};
        product_map_observation_ref01_match_dt0.id = product_map_observation_ref01_data.id;
        product_map_observation_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        product_map_observation_ref01_match_dt0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01'];
        const product_map_observation_ref01_data_dt0 = (await product_map_observation_ref01_ent.load(product_map_observation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(product_map_observation_ref01_data_dt0.id === product_map_observation_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/product_map_observation/ProductMapObservationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['product_map_observation01', 'product_map_observation02', 'product_map_observation03', 'organization01', 'organization02', 'organization03', 'project01', 'project02', 'project03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PRODUCT_MAP_OBSERVATION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PRODUCT_MAP_OBSERVATION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PRODUCT_MAP_OBSERVATION_ENTID'];
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
//# sourceMappingURL=ProductMapObservationEntity.test.js.map