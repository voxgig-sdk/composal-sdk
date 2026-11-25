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
(0, node_test_1.describe)('ChangeAssetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ChangeAsset();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ChangeAsset().create({ "organization_id": 1, "repo_id": "x", "alias": "x", "byte_size": 1, "checksum_md5": "x", "checksum_sha256": "x", "content_type": "x", "filename": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'change_asset.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "alias": { "a": true, "h": "Alias", "n": "alias", "r": true, "t": "`$STRING`", "key$": "alias", "index$": 0 }, "byte_size": { "a": true, "h": "Byte Size", "n": "byte_size", "r": true, "t": "`$INTEGER`", "key$": "byte_size", "index$": 1 }, "checksum_md5": { "a": true, "h": "Checksum Md5", "n": "checksum_md5", "r": true, "t": "`$STRING`", "key$": "checksum_md5", "index$": 2 }, "checksum_sha256": { "a": true, "h": "Checksum Sha256", "n": "checksum_sha256", "r": true, "t": "`$STRING`", "key$": "checksum_sha256", "index$": 3 }, "content_type": { "a": true, "h": "Content Type", "n": "content_type", "r": true, "t": "`$STRING`", "key$": "content_type", "index$": 4 }, "filename": { "a": true, "h": "Filename", "n": "filename", "r": true, "t": "`$STRING`", "key$": "filename", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "change_asset", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["blob_signed_id"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets/{id}/finalize", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets/{id}/finalize", "q": { "$action": "finalize", "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "id": "id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "lit": "assets" }, { "var": "id" }, { "lit": "finalize" }], "t": { "req": "`reqdata`", "res": "`body.asset`" }, "index$": 0 }, { "a": true, "bf": ["alias", "byte_size", "checksum_md5", "checksum_sha256", "content_type", "filename"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "lit": "assets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "change_asset", "name__orig": "change_asset", "Name": "ChangeAsset", "name_": "change_asset", "name-": "change-asset", "NAME": "CHANGE_ASSET", "index$": 157 }, { "active": true, "entity": "change_asset", "key$": "BasicChangeAssetFlow", "kind": "basic", "name": "BasicChangeAssetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "change_asset_ref01" }, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'ChangeAsset', { "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets/{id}/finalize": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["blob_signed_id"], "properties": { "blob_signed_id": { "type": "string" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["alias", "filename", "content_type", "byte_size", "checksum_sha256", "checksum_md5"], "properties": { "alias": { "type": "string", "key$": "alias" }, "filename": { "type": "string", "key$": "filename" }, "content_type": { "type": "string", "key$": "content_type" }, "byte_size": { "type": "integer", "minimum": 0, "key$": "byte_size" }, "checksum_sha256": { "type": "string", "key$": "checksum_sha256" }, "checksum_md5": { "type": "string", "key$": "checksum_md5" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "change_asset.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/assets/{id}/finalize" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const change_asset_ref01_ent = client.ChangeAsset();
        let change_asset_ref01_data = setup.data.new.change_asset['change_asset_ref01'];
        change_asset_ref01_data['organization_id'] = setup.idmap['organization01'];
        change_asset_ref01_data['repo_id'] = setup.idmap['repo01'];
        change_asset_ref01_data = (await change_asset_ref01_ent.create(change_asset_ref01_data)).data();
        (0, node_assert_1.default)(null != change_asset_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/change_asset/ChangeAssetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['change_asset01', 'change_asset02', 'change_asset03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CHANGE_ASSET_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CHANGE_ASSET_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CHANGE_ASSET_ENTID'];
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
//# sourceMappingURL=ChangeAssetEntity.test.js.map