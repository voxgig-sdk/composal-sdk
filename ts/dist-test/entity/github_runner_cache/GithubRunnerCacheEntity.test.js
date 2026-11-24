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
(0, node_test_1.describe)('GithubRunnerCacheEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.GithubRunnerCache();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.GithubRunnerCache().create({ "entry_id": 1, "operation": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'github_runner_cache.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "entry_id": { "a": true, "h": "Entry Id", "n": "entry_id", "r": false, "t": "`$STRING`", "key$": "entry_id", "index$": 0 }, "key": { "a": true, "h": "Key", "n": "key", "r": false, "t": "`$STRING`", "key$": "key", "index$": 1 }, "matched_key": { "a": true, "h": "Matched Key", "n": "matched_key", "r": false, "t": "`$STRING`", "key$": "matched_key", "index$": 2 }, "ok": { "a": true, "h": "Ok", "n": "ok", "r": true, "t": "`$BOOLEAN`", "key$": "ok", "index$": 3 }, "operation": { "a": true, "h": "Operation", "n": "operation", "r": true, "t": "`$STRING`", "key$": "operation", "index$": 4 }, "restore_keys": { "a": true, "h": "Restore Keys", "n": "restore_keys", "r": false, "t": "`$ARRAY`", "key$": "restore_keys", "index$": 5 }, "signed_download_url": { "a": true, "h": "Signed Download Url", "n": "signed_download_url", "r": false, "t": "`$STRING`", "key$": "signed_download_url", "index$": 6 }, "size_bytes": { "a": true, "h": "Size Bytes", "n": "size_bytes", "r": false, "t": "`$STRING`", "key$": "size_bytes", "index$": 7 }, "upload_path": { "a": true, "h": "Upload Path", "n": "upload_path", "r": false, "t": "`$STRING`", "key$": "upload_path", "index$": 8 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "t": "`$STRING`", "key$": "version", "index$": 9 } }, "name": "github_runner_cache", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["entry_id", "key", "operation", "restore_keys", "size_bytes", "version"], "co": { "id": "POST /api/v1/github_runner_cache", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/github_runner_cache", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "github_runner_cache" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "github_runner_cache", "name__orig": "github_runner_cache", "Name": "GithubRunnerCache", "name_": "github_runner_cache", "name-": "github-runner-cache", "NAME": "GITHUB_RUNNER_CACHE", "index$": 262 }, { "active": true, "entity": "github_runner_cache", "key$": "BasicGithubRunnerCacheFlow", "kind": "basic", "name": "BasicGithubRunnerCacheFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "github_runner_cache_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'GithubRunnerCache', { "POST /api/v1/github_runner_cache": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["operation"], "properties": { "operation": { "type": "string", "enum": ["GetCacheEntryDownloadURL", "CreateCacheEntry", "ReserveUpload", "FinalizeCacheEntryUpload"], "key$": "operation" }, "key": { "type": "string", "maxLength": 512, "key$": "key" }, "version": { "type": "string", "maxLength": 512, "key$": "version" }, "restore_keys": { "type": "array", "maxItems": 32, "items": { "type": "string", "maxLength": 512 }, "key$": "restore_keys" }, "entry_id": { "type": "string", "key$": "entry_id" }, "size_bytes": { "type": "string", "key$": "size_bytes" } } } } } }, "parameters": [] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "github_runner_cache.create.0": "GET-only live run: needs POST /api/v1/github_runner_cache" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const github_runner_cache_ref01_ent = client.GithubRunnerCache();
        let github_runner_cache_ref01_data = setup.data.new.github_runner_cache['github_runner_cache_ref01'];
        github_runner_cache_ref01_data = (await github_runner_cache_ref01_ent.create(github_runner_cache_ref01_data)).data();
        (0, node_assert_1.default)(null != github_runner_cache_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/github_runner_cache/GithubRunnerCacheTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['github_runner_cache01', 'github_runner_cache02', 'github_runner_cache03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_GITHUB_RUNNER_CACHE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_GITHUB_RUNNER_CACHE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_GITHUB_RUNNER_CACHE_ENTID'];
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
//# sourceMappingURL=GithubRunnerCacheEntity.test.js.map