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
(0, node_test_1.describe)('DataResourceRotateCredentialEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.DataResourceRotateCredential();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DataResourceRotateCredential().create({ "app_id": 1, "data_resource_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'data_resource_rotate_credential.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app_environment_id": { "a": true, "h": "App Environment Id", "n": "app_environment_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "app_environment_id", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "engine": { "a": true, "h": "Engine", "n": "engine", "r": true, "t": "`$STRING`", "key$": "engine", "index$": 2 }, "failure_message": { "a": true, "h": "Failure Message", "n": "failure_message", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_message", "index$": 3 }, "high_availability": { "a": true, "h": "High Availability", "n": "high_availability", "r": true, "t": "`$BOOLEAN`", "key$": "high_availability", "index$": 4 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "r": true, "t": "`$STRING`", "key$": "hosted_app_id", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": "`$STRING`", "key$": "kind", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 8 }, "plan": { "a": true, "h": "Plan", "n": "plan", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "plan", "index$": 9 }, "provider_metadata": { "a": true, "h": "Provider Metadata", "n": "provider_metadata", "r": true, "t": "`$OBJECT`", "key$": "provider_metadata", "index$": 10 }, "region": { "a": true, "h": "Region", "n": "region", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "region", "index$": 11 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 12 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 13 }, "storage_gb": { "a": true, "h": "Storage Gb", "n": "storage_gb", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "storage_gb", "index$": 14 }, "storage_label": { "a": true, "h": "Storage Label", "n": "storage_label", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "storage_label", "index$": 15 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 16 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "version", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "data_resource_rotate_credential", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/rotate_credentials", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "data_resource_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/data_resources/{id}/rotate_credentials", "q": { "exist": ["app_id", "data_resource_id"] }, "r": { "param": { "app_id": "app_id", "id": "data_resource_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "data_resources" }, { "var": "data_resource_id" }, { "lit": "rotate_credentials" }], "t": { "req": "`reqdata`", "res": "`body.data_resource`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "data_resource_rotate_credential", "name__orig": "data_resource_rotate_credential", "Name": "DataResourceRotateCredential", "name_": "data_resource_rotate_credential", "name-": "data-resource-rotate-credential", "NAME": "DATA_RESOURCE_ROTATE_CREDENTIAL", "index$": 192 }, { "active": true, "entity": "data_resource_rotate_credential", "key$": "BasicDataResourceRotateCredentialFlow", "kind": "basic", "name": "BasicDataResourceRotateCredentialFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "data_resource_rotate_credential_ref01" }, "m": { "app_id": "app01", "data_resource_id": "data_resource01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'DataResourceRotateCredential', { "POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/rotate_credentials": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "data_resource_rotate_credential.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/data_resources/{id}/rotate_credentials" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const data_resource_rotate_credential_ref01_ent = client.DataResourceRotateCredential();
        let data_resource_rotate_credential_ref01_data = setup.data.new.data_resource_rotate_credential['data_resource_rotate_credential_ref01'];
        data_resource_rotate_credential_ref01_data['app_id'] = setup.idmap['app01'];
        data_resource_rotate_credential_ref01_data['data_resource_id'] = setup.idmap['data_resource01'];
        data_resource_rotate_credential_ref01_data = (await data_resource_rotate_credential_ref01_ent.create(data_resource_rotate_credential_ref01_data)).data();
        (0, node_assert_1.default)(null != data_resource_rotate_credential_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/data_resource_rotate_credential/DataResourceRotateCredentialTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['data_resource_rotate_credential01', 'data_resource_rotate_credential02', 'data_resource_rotate_credential03', 'app01', 'app02', 'app03', 'data_resource01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_DATA_RESOURCE_ROTATE_CREDENTIAL_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_DATA_RESOURCE_ROTATE_CREDENTIAL_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_DATA_RESOURCE_ROTATE_CREDENTIAL_ENTID'];
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
//# sourceMappingURL=DataResourceRotateCredentialEntity.test.js.map