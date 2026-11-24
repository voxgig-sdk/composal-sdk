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
(0, node_test_1.describe)('NetworkConnectionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.NetworkConnection();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.NetworkConnection().create({ "organization_id": 1, "name": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'network_connection.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "aws_client_vpn_profile": { "a": true, "h": "Aws Client Vpn Profile", "n": "aws_client_vpn_profile", "r": false, "t": "`$STRING`", "wo": true, "key$": "aws_client_vpn_profile", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "device_tag": { "a": true, "h": "Device Tag", "n": "device_tag", "r": false, "t": "`$STRING`", "key$": "device_tag", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "name", "index$": 4 }, "oauth_client_id": { "a": true, "h": "Oauth Client Id", "n": "oauth_client_id", "r": false, "t": "`$STRING`", "key$": "oauth_client_id", "index$": 5 }, "oauth_client_secret": { "a": true, "h": "Oauth Client Secret", "n": "oauth_client_secret", "r": false, "t": "`$STRING`", "wo": true, "key$": "oauth_client_secret", "index$": 6 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": false, "t": "`$STRING`", "key$": "provider", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 8 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "network_connection", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["aws_client_vpn_profile", "device_tag", "name", "oauth_client_id", "oauth_client_secret", "provider", "status"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/network_connections", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/network_connections", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "network_connections" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["aws_client_vpn_profile", "device_tag", "name", "oauth_client_id", "oauth_client_secret", "provider", "status"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/verify/network_connections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/verify/network_connections/{id}", "q": { "exist": ["id", "organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "network_connections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/organizations/{organization_id}/verify/network_connections/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/verify/network_connections/{id}", "q": { "exist": ["id", "organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "network_connections" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "network_connection", "name__orig": "network_connection", "Name": "NetworkConnection", "name_": "network_connection", "name-": "network-connection", "NAME": "NETWORK_CONNECTION", "index$": 139 }, { "active": true, "entity": "network_connection", "key$": "BasicNetworkConnectionFlow", "kind": "basic", "name": "BasicNetworkConnectionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "network_connection_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "organization_id": "organization01" }, "i": { "ref": "network_connection_ref01", "srcdatavar": "network_connection_ref01_data", "suffix": "_up0", "textfield": "aws_client_vpn_profile" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-network_connection_ref01" } }], "v": [], "index$": 1 }] }, 'NetworkConnection', { "POST /api/v1/organizations/{organization_id}/verify/network_connections": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "allOf": [{ "type": "object", "additionalProperties": false, "properties": { "name": { "type": "string", "key$": "name" }, "provider": { "type": "string", "enum": ["tailscale", "aws_client_vpn"], "key$": "provider" }, "oauth_client_id": { "type": "string", "key$": "oauth_client_id" }, "oauth_client_secret": { "type": "string", "writeOnly": true, "key$": "oauth_client_secret" }, "aws_client_vpn_profile": { "type": "string", "writeOnly": true, "maxLength": 65536, "key$": "aws_client_vpn_profile" }, "device_tag": { "type": "string", "key$": "device_tag" }, "status": { "type": "string", "enum": ["active", "disabled"], "key$": "status" } }, "x-ref": "#/components/schemas/VerifyNetworkConnectionInput" }, { "required": ["name"] }] } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/organizations/{organization_id}/verify/network_connections/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "name": { "type": "string", "key$": "name" }, "provider": { "type": "string", "enum": ["tailscale", "aws_client_vpn"], "key$": "provider" }, "oauth_client_id": { "type": "string", "key$": "oauth_client_id" }, "oauth_client_secret": { "type": "string", "writeOnly": true, "key$": "oauth_client_secret" }, "aws_client_vpn_profile": { "type": "string", "writeOnly": true, "maxLength": 65536, "key$": "aws_client_vpn_profile" }, "device_tag": { "type": "string", "key$": "device_tag" }, "status": { "type": "string", "enum": ["active", "disabled"], "key$": "status" } }, "x-ref": "#/components/schemas/VerifyNetworkConnectionInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/organizations/{organization_id}/verify/network_connections/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "network_connection.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/network_connections", "network_connection.update.1": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/network_connections/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const network_connection_ref01_ent = client.NetworkConnection();
        let network_connection_ref01_data = setup.data.new.network_connection['network_connection_ref01'];
        network_connection_ref01_data['organization_id'] = setup.idmap['organization01'];
        network_connection_ref01_data = (await network_connection_ref01_ent.create(network_connection_ref01_data)).data();
        (0, node_assert_1.default)(null != network_connection_ref01_data.id);
        // UPDATE
        const network_connection_ref01_data_up0 = {};
        network_connection_ref01_data_up0.id = network_connection_ref01_data.id;
        network_connection_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const network_connection_ref01_markdef_up0 = { name: 'aws_client_vpn_profile', value: 'Mark01-network_connection_ref01_' + setup.now };
        network_connection_ref01_data_up0[network_connection_ref01_markdef_up0.name] = network_connection_ref01_markdef_up0.value;
        const network_connection_ref01_resdata_up0 = (await network_connection_ref01_ent.update(network_connection_ref01_data_up0)).data();
        (0, node_assert_1.default)(network_connection_ref01_resdata_up0.id === network_connection_ref01_data_up0.id);
        (0, node_assert_1.default)(network_connection_ref01_resdata_up0[network_connection_ref01_markdef_up0.name] === network_connection_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/network_connection/NetworkConnectionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['network_connection01', 'network_connection02', 'network_connection03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_NETWORK_CONNECTION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_NETWORK_CONNECTION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_NETWORK_CONNECTION_ENTID'];
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
//# sourceMappingURL=NetworkConnectionEntity.test.js.map