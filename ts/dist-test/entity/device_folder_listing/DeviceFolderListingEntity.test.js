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
(0, node_test_1.describe)('DeviceFolderListingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.DeviceFolderListing();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DeviceFolderListing().load({ "device_id": 1, "id": "x", "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'device_folder_listing.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "code": { "a": true, "h": "Code", "n": "code", "r": false, "t": "`$STRING`", "key$": "code", "index$": 0 }, "error": { "a": true, "h": "Error", "n": "error", "r": false, "t": "`$STRING`", "key$": "error", "index$": 1 }, "folders": { "a": true, "h": "Folders", "n": "folders", "r": false, "t": "`$ARRAY`", "key$": "folders", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "key": { "a": true, "h": "Key", "n": "key", "r": true, "sh": "Stable idempotency key for this listing.", "t": "`$STRING`", "key$": "key", "index$": 4 }, "parent": { "a": true, "h": "Parent", "n": "parent", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "parent", "index$": 5 }, "path": { "a": true, "h": "Path", "n": "path", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The resolved folder.", "t": "`$STRING`", "key$": "path", "index$": 6 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "t": "`$STRING`", "key$": "state", "index$": 7 }, "truncated": { "a": true, "h": "Truncated", "n": "truncated", "r": false, "t": "`$BOOLEAN`", "key$": "truncated", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "device_folder_listing", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["key", "path"], "co": { "id": "POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "device_id", "or": "device_registration_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings", "q": { "exist": ["device_id", "organization_id"] }, "r": { "param": { "device_registration_id": "device_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "devices" }, { "var": "device_id" }, { "lit": "folder_listings" }], "t": { "req": "`reqdata`", "res": "`body.listing`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "device_id", "or": "device_registration_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings/{id}", "q": { "exist": ["device_id", "id", "organization_id"] }, "r": { "param": { "device_registration_id": "device_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "devices" }, { "var": "device_id" }, { "lit": "folder_listings" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.listing`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.device"]] }, "key$": "device_folder_listing", "name__orig": "device_folder_listing", "Name": "DeviceFolderListing", "name_": "device_folder_listing", "name-": "device-folder-listing", "NAME": "DEVICE_FOLDER_LISTING", "index$": 211 }, { "active": true, "entity": "device_folder_listing", "key$": "BasicDeviceFolderListingFlow", "kind": "basic", "name": "BasicDeviceFolderListingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "device_folder_listing_ref01" }, "m": { "device_id": "device01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "device_folder_listing_ref01", "srcdatavar": "device_folder_listing_ref01_data", "suffix": "_dt0" }, "m": { "device_id": "device01", "id": "device_folder_listing01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-device_folder_listing_ref01" } }], "index$": 1, "route": "GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings/{id}", "record": {} }] }, 'DeviceFolderListing', { "POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["key", "path"], "properties": { "key": { "type": "string", "minLength": 1, "maxLength": 512, "description": "Stable idempotency key for this listing.", "key$": "key" }, "path": { "type": "string", "minLength": 1, "maxLength": 4096, "description": "A folder starting with ~ or /.", "key$": "path" } }, "x-ref": "#/components/schemas/DeviceFolderListingInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "device_registration_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "device_registration_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "device_folder_listing.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/folder_listings", "device_folder_listing.load.1": "GET-only live run: reads a record only device_folder_listing.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const device_folder_listing_ref01_ent = client.DeviceFolderListing();
        let device_folder_listing_ref01_data = setup.data.new.device_folder_listing['device_folder_listing_ref01'];
        device_folder_listing_ref01_data['device_id'] = setup.idmap['device01'];
        device_folder_listing_ref01_data['organization_id'] = setup.idmap['organization01'];
        device_folder_listing_ref01_data = (await device_folder_listing_ref01_ent.create(device_folder_listing_ref01_data)).data();
        (0, node_assert_1.default)(null != device_folder_listing_ref01_data.id);
        // LOAD
        const device_folder_listing_ref01_match_dt0 = {};
        device_folder_listing_ref01_match_dt0.id = device_folder_listing_ref01_data.id;
        device_folder_listing_ref01_match_dt0['device_id'] = setup.idmap['device_id'] ?? setup.idmap['device01'];
        device_folder_listing_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const device_folder_listing_ref01_data_dt0 = (await device_folder_listing_ref01_ent.load(device_folder_listing_ref01_match_dt0)).data();
        (0, node_assert_1.default)(device_folder_listing_ref01_data_dt0.id === device_folder_listing_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/device_folder_listing/DeviceFolderListingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['device_folder_listing01', 'device_folder_listing02', 'device_folder_listing03', 'organization01', 'organization02', 'organization03', 'device01', 'device02', 'device03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_DEVICE_FOLDER_LISTING_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_DEVICE_FOLDER_LISTING_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_DEVICE_FOLDER_LISTING_ENTID'];
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
//# sourceMappingURL=DeviceFolderListingEntity.test.js.map