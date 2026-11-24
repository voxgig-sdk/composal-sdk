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
(0, node_test_1.describe)('PullRequestSettingAddRepositoryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.PullRequestSettingAddRepository();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PullRequestSettingAddRepository().create({ "organization_id": 1, "project_id": "x", "repositories": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pull_request_setting_add_repository.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "project_id": { "a": true, "h": "Project Id", "n": "project_id", "r": true, "t": "`$STRING`", "key$": "project_id", "index$": 0 }, "replace": { "a": true, "h": "Replace", "n": "replace", "r": false, "sh": "Make these the project's only repositories.", "t": "`$BOOLEAN`", "key$": "replace", "index$": 1 }, "repositories": { "a": true, "h": "Repositories", "n": "repositories", "r": true, "t": "`$ARRAY`", "key$": "repositories", "index$": 2 } }, "name": "pull_request_setting_add_repository", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["project_id", "replace", "repositories"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/add_repositories", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/pull_request_settings/add_repositories", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "pull_request_settings" }, { "lit": "add_repositories" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "pull_request_setting_add_repository", "name__orig": "pull_request_setting_add_repository", "Name": "PullRequestSettingAddRepository", "name_": "pull_request_setting_add_repository", "name-": "pull-request-setting-add-repository", "NAME": "PULL_REQUEST_SETTING_ADD_REPOSITORY", "index$": 180 }, { "active": true, "entity": "pull_request_setting_add_repository", "key$": "BasicPullRequestSettingAddRepositoryFlow", "kind": "basic", "name": "BasicPullRequestSettingAddRepositoryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "pull_request_setting_add_repository_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'PullRequestSettingAddRepository', { "POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/add_repositories": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["project_id", "repositories"], "properties": { "project_id": { "type": "string", "key$": "project_id" }, "repositories": { "type": "array", "minItems": 1, "maxItems": 50, "items": { "type": "string" }, "key$": "repositories" }, "replace": { "type": "boolean", "description": "Make these the project's only repositories. Refused when another of its repositories has PR testing set up.", "key$": "replace" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "pull_request_setting_add_repository.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/add_repositories" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const pull_request_setting_add_repository_ref01_ent = client.PullRequestSettingAddRepository();
        let pull_request_setting_add_repository_ref01_data = setup.data.new.pull_request_setting_add_repository['pull_request_setting_add_repository_ref01'];
        pull_request_setting_add_repository_ref01_data['organization_id'] = setup.idmap['organization01'];
        pull_request_setting_add_repository_ref01_data = (await pull_request_setting_add_repository_ref01_ent.create(pull_request_setting_add_repository_ref01_data)).data();
        (0, node_assert_1.default)(null != pull_request_setting_add_repository_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pull_request_setting_add_repository/PullRequestSettingAddRepositoryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pull_request_setting_add_repository01', 'pull_request_setting_add_repository02', 'pull_request_setting_add_repository03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PULL_REQUEST_SETTING_ADD_REPOSITORY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PULL_REQUEST_SETTING_ADD_REPOSITORY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PULL_REQUEST_SETTING_ADD_REPOSITORY_ENTID'];
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
//# sourceMappingURL=PullRequestSettingAddRepositoryEntity.test.js.map