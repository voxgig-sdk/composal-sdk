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
(0, node_test_1.describe)('PreviewSharingApprovalEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.PreviewSharingApproval();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PreviewSharingApproval().list({ "app_id": 1, "preview_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'preview_sharing_approval.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "approved_build_keys": { "a": true, "h": "Approved Build Keys", "n": "approved_build_keys", "r": true, "t": "`$ARRAY`", "key$": "approved_build_keys", "index$": 0 }, "approved_build_secrets": { "a": true, "h": "Approved Build Secrets", "n": "approved_build_secrets", "r": true, "t": "`$ARRAY`", "key$": "approved_build_secrets", "index$": 1 }, "approved_default_configuration": { "a": true, "h": "Approved Default Configuration", "n": "approved_default_configuration", "r": true, "t": "`$ARRAY`", "key$": "approved_default_configuration", "index$": 2 }, "approved_default_secrets": { "a": true, "h": "Approved Default Secrets", "n": "approved_default_secrets", "r": true, "t": "`$ARRAY`", "key$": "approved_default_secrets", "index$": 3 }, "approved_source_keys": { "a": true, "h": "Approved Source Keys", "n": "approved_source_keys", "r": true, "t": "`$ARRAY`", "key$": "approved_source_keys", "index$": 4 }, "build_keys": { "a": true, "h": "Build Keys", "n": "build_keys", "r": false, "t": "`$ARRAY`", "key$": "build_keys", "index$": 5 }, "build_secrets": { "a": true, "h": "Build Secrets", "n": "build_secrets", "op": { "list": { "req": true, "type": "`$ARRAY`" } }, "r": false, "t": "`$ARRAY`", "key$": "build_secrets", "index$": 6 }, "default_configuration": { "a": true, "h": "Default Configuration", "n": "default_configuration", "op": { "list": { "req": true, "type": "`$ARRAY`" } }, "r": false, "t": "`$ARRAY`", "key$": "default_configuration", "index$": 7 }, "default_secrets": { "a": true, "h": "Default Secrets", "n": "default_secrets", "op": { "list": { "req": true, "type": "`$ARRAY`" } }, "r": false, "t": "`$ARRAY`", "key$": "default_secrets", "index$": 8 }, "services": { "a": true, "h": "Services", "n": "services", "r": true, "t": "`$ARRAY`", "key$": "services", "index$": 9 }, "snapshot_version": { "a": true, "h": "Snapshot Version", "n": "snapshot_version", "r": true, "t": "`$INTEGER`", "key$": "snapshot_version", "index$": 10 }, "source_keys": { "a": true, "h": "Source Keys", "n": "source_keys", "op": { "list": { "req": true, "type": "`$ARRAY`" } }, "r": false, "t": "`$ARRAY`", "key$": "source_keys", "index$": 11 } }, "name": "preview_sharing_approval", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["build_keys", "build_secrets", "default_configuration", "default_secrets", "snapshot_version", "source_keys"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "preview_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals", "q": { "exist": ["app_id", "preview_id"] }, "r": { "param": { "app_id": "app_id", "id": "preview_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "previews" }, { "var": "preview_id" }, { "lit": "sharing_approvals" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "preview_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals", "q": { "exist": ["app_id", "preview_id"] }, "r": { "param": { "app_id": "app_id", "id": "preview_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "previews" }, { "var": "preview_id" }, { "lit": "sharing_approvals" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "preview_sharing_approval", "name__orig": "preview_sharing_approval", "Name": "PreviewSharingApproval", "name_": "preview_sharing_approval", "name-": "preview-sharing-approval", "NAME": "PREVIEW_SHARING_APPROVAL", "index$": 154 }, { "active": true, "entity": "preview_sharing_approval", "key$": "BasicPreviewSharingApprovalFlow", "kind": "basic", "name": "BasicPreviewSharingApprovalFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "preview_sharing_approval_ref01" }, "m": { "app_id": "app01", "preview_id": "preview01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "app_id": "app01", "preview_id": "preview01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "preview_sharing_approval_ref01" } }], "index$": 1 }] }, 'PreviewSharingApproval', { "POST /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["snapshot_version"], "properties": { "snapshot_version": { "type": "integer", "key$": "snapshot_version" }, "source_keys": { "type": "array", "items": { "type": "string" }, "key$": "source_keys" }, "default_secrets": { "type": "array", "items": { "type": "string" }, "key$": "default_secrets" }, "default_configuration": { "type": "array", "items": { "type": "string" }, "key$": "default_configuration" }, "build_keys": { "type": "array", "items": { "type": "string" }, "key$": "build_keys" }, "build_secrets": { "type": "array", "items": { "type": "string" }, "key$": "build_secrets" } }, "additionalProperties": true, "x-ref": "#/components/schemas/PreviewSharingSelection" } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "preview_sharing_approval.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/previews/{id}/sharing_approvals" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const preview_sharing_approval_ref01_ent = client.PreviewSharingApproval();
        let preview_sharing_approval_ref01_data = setup.data.new.preview_sharing_approval['preview_sharing_approval_ref01'];
        preview_sharing_approval_ref01_data['app_id'] = setup.idmap['app01'];
        preview_sharing_approval_ref01_data['preview_id'] = setup.idmap['preview01'];
        preview_sharing_approval_ref01_data = (await preview_sharing_approval_ref01_ent.create(preview_sharing_approval_ref01_data)).data();
        (0, node_assert_1.default)(null != preview_sharing_approval_ref01_data);
        // LIST
        const preview_sharing_approval_ref01_match = {};
        preview_sharing_approval_ref01_match['app_id'] = setup.idmap['app01'];
        preview_sharing_approval_ref01_match['preview_id'] = setup.idmap['preview01'];
        const preview_sharing_approval_ref01_list = (await preview_sharing_approval_ref01_ent.list(preview_sharing_approval_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/preview_sharing_approval/PreviewSharingApprovalTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['preview_sharing_approval01', 'preview_sharing_approval02', 'preview_sharing_approval03', 'app01', 'app02', 'app03', 'preview01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PREVIEW_SHARING_APPROVAL_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PREVIEW_SHARING_APPROVAL_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PREVIEW_SHARING_APPROVAL_ENTID'];
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
//# sourceMappingURL=PreviewSharingApprovalEntity.test.js.map