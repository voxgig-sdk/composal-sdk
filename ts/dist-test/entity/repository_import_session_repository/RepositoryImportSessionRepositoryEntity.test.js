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
(0, node_test_1.describe)('RepositoryImportSessionRepositoryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.RepositoryImportSessionRepository();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RepositoryImportSessionRepository().list({ "repository_import_session_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'repository_import_session_repository.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "default_branch": { "a": true, "h": "Default Branch", "n": "default_branch", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "default_branch", "index$": 0 }, "full_name": { "a": true, "h": "Full Name", "n": "full_name", "r": true, "t": "`$STRING`", "key$": "full_name", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 2 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": true, "t": "`$STRING`", "key$": "owner", "index$": 3 }, "private": { "a": true, "h": "Private", "n": "private", "r": true, "t": "`$BOOLEAN`", "key$": "private", "index$": 4 }, "reason": { "a": true, "h": "Reason", "n": "reason", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "reason", "index$": 5 }, "selectable": { "a": true, "h": "Selectable", "n": "selectable", "r": true, "t": "`$BOOLEAN`", "key$": "selectable", "index$": 6 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 7 }, "visibility": { "a": true, "h": "Visibility", "n": "visibility", "r": true, "t": "`$STRING`", "key$": "visibility", "index$": 8 } }, "name": "repository_import_session_repository", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/repository_import_sessions/{id}/repositories", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "repository_import_session_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "q", "or": "q", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/repository_import_sessions/{id}/repositories", "q": { "exist": ["repository_import_session_id"] }, "r": { "param": { "id": "repository_import_session_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "repository_import_sessions" }, { "var": "repository_import_session_id" }, { "lit": "repositories" }], "t": { "req": "`reqdata`", "res": "`body.repositories`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.repository_import_session"]] }, "key$": "repository_import_session_repository", "name__orig": "repository_import_session_repository", "Name": "RepositoryImportSessionRepository", "name_": "repository_import_session_repository", "name-": "repository-import-session-repository", "NAME": "REPOSITORY_IMPORT_SESSION_REPOSITORY", "index$": 439 }, { "active": true, "entity": "repository_import_session_repository", "key$": "BasicRepositoryImportSessionRepositoryFlow", "kind": "basic", "name": "BasicRepositoryImportSessionRepositoryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "repository_import_session_id": "repository_import_session01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "repository_import_session_repository_ref01" } }], "index$": 0 }] }, 'RepositoryImportSessionRepository', { "GET /api/v1/repository_import_sessions/{id}/repositories": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "q", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let repository_import_session_repository_ref01_data = Object.values(setup.data.existing.repository_import_session_repository)[0];
        // LIST
        const repository_import_session_repository_ref01_ent = client.RepositoryImportSessionRepository();
        const repository_import_session_repository_ref01_match = {};
        repository_import_session_repository_ref01_match['repository_import_session_id'] = setup.idmap['repository_import_session01'];
        const repository_import_session_repository_ref01_list = (await repository_import_session_repository_ref01_ent.list(repository_import_session_repository_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/repository_import_session_repository/RepositoryImportSessionRepositoryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['repository_import_session_repository01', 'repository_import_session_repository02', 'repository_import_session_repository03', 'repository_import_session01', 'repository_import_session02', 'repository_import_session03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_REPOSITORY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_REPOSITORY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_REPOSITORY_ENTID'];
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
//# sourceMappingURL=RepositoryImportSessionRepositoryEntity.test.js.map