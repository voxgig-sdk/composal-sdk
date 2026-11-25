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
(0, node_test_1.describe)('OrganizationOidcTrustEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.OrganizationOidcTrust();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.OrganizationOidcTrust().load({ "id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'organization_oidc_trust.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "organization_oidc_trust", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/activate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/activate", "q": { "$action": "activate", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }, { "var": "id" }, { "lit": "activate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/pause", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/pause", "q": { "$action": "pause", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }, { "var": "id" }, { "lit": "pause" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/revoke", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/revoke", "q": { "$action": "revoke", "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }, { "var": "id" }, { "lit": "revoke" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/identity/organizations/{organization_id}/oidc_trusts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts", "q": { "exist": ["organization_id"] }, "r": { "param": { "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/identity/organizations/{organization_id}/oidc_trusts", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts", "q": { "exist": ["organization_id"] }, "r": { "param": { "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id", "organization_id": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "identity" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "oidc_trusts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "organization_oidc_trust", "name__orig": "organization_oidc_trust", "Name": "OrganizationOidcTrust", "name_": "organization_oidc_trust", "name-": "organization-oidc-trust", "NAME": "ORGANIZATION_OIDC_TRUST", "index$": 342 }, { "active": true, "entity": "organization_oidc_trust", "key$": "BasicOrganizationOidcTrustFlow", "kind": "basic", "name": "BasicOrganizationOidcTrustFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "organization_oidc_trust_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "organization_id": "organization01" }, "i": { "ref": "organization_oidc_trust_ref01", "srcdatavar": "organization_oidc_trust_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_oidc_trust_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "organization_oidc_trust_ref01", "srcdatavar": "organization_oidc_trust_ref01_data", "suffix": "_dt0" }, "m": { "id": "organization_oidc_trust01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_oidc_trust_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "organization_oidc_trust_ref01", "suffix": "_rm0" }, "m": { "id": "organization_oidc_trust01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 3 }] }, 'OrganizationOidcTrust', { "POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/activate": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/pause": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/revoke": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/identity/organizations/{organization_id}/oidc_trusts": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/identity/organizations/{organization_id}/oidc_trusts": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "organization_oidc_trust.create.0": "GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}/activate", "organization_oidc_trust.update.1": "GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}", "organization_oidc_trust.load.2": "GET-only live run: reads a record only organization_oidc_trust.create.0 gives", "organization_oidc_trust.remove.3": "GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/oidc_trusts/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const organization_oidc_trust_ref01_ent = client.OrganizationOidcTrust();
        let organization_oidc_trust_ref01_data = setup.data.new.organization_oidc_trust['organization_oidc_trust_ref01'];
        organization_oidc_trust_ref01_data['organization_id'] = setup.idmap['organization01'];
        organization_oidc_trust_ref01_data = (await organization_oidc_trust_ref01_ent.create(organization_oidc_trust_ref01_data)).data();
        (0, node_assert_1.default)(null != organization_oidc_trust_ref01_data.id);
        // UPDATE
        const organization_oidc_trust_ref01_data_up0 = {};
        organization_oidc_trust_ref01_data_up0.id = organization_oidc_trust_ref01_data.id;
        organization_oidc_trust_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const organization_oidc_trust_ref01_resdata_up0 = (await organization_oidc_trust_ref01_ent.update(organization_oidc_trust_ref01_data_up0)).data();
        (0, node_assert_1.default)(organization_oidc_trust_ref01_resdata_up0.id === organization_oidc_trust_ref01_data_up0.id);
        // LOAD
        const organization_oidc_trust_ref01_match_dt0 = {};
        organization_oidc_trust_ref01_match_dt0.id = organization_oidc_trust_ref01_data.id;
        const organization_oidc_trust_ref01_data_dt0 = (await organization_oidc_trust_ref01_ent.load(organization_oidc_trust_ref01_match_dt0)).data();
        (0, node_assert_1.default)(organization_oidc_trust_ref01_data_dt0.id === organization_oidc_trust_ref01_data.id);
        // REMOVE
        const organization_oidc_trust_ref01_match_rm0 = { id: organization_oidc_trust_ref01_data.id };
        organization_oidc_trust_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await organization_oidc_trust_ref01_ent.remove(organization_oidc_trust_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/organization_oidc_trust/OrganizationOidcTrustTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['organization_oidc_trust01', 'organization_oidc_trust02', 'organization_oidc_trust03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ORGANIZATION_OIDC_TRUST_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ORGANIZATION_OIDC_TRUST_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ORGANIZATION_OIDC_TRUST_ENTID'];
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
//# sourceMappingURL=OrganizationOidcTrustEntity.test.js.map