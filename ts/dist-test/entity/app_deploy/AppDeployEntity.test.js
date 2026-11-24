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
(0, node_test_1.describe)('AppDeployEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AppDeploy();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppDeploy().create({ "app_id": 1, "image": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_deploy.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app_environment_id": { "a": true, "h": "App Environment Id", "n": "app_environment_id", "r": false, "t": "`$STRING`", "key$": "app_environment_id", "index$": 0 }, "app_service_id": { "a": true, "h": "App Service Id", "n": "app_service_id", "r": false, "t": "`$STRING`", "key$": "app_service_id", "index$": 1 }, "channel": { "a": true, "h": "Channel", "n": "channel", "r": false, "t": "`$STRING`", "key$": "channel", "index$": 2 }, "command": { "a": true, "h": "Command", "n": "command", "r": false, "t": "`$STRING`", "key$": "command", "index$": 3 }, "commit_sha": { "a": true, "h": "Commit Sha", "n": "commit_sha", "r": false, "t": "`$STRING`", "key$": "commit_sha", "index$": 4 }, "desired_instances": { "a": true, "h": "Desired Instances", "n": "desired_instances", "r": false, "t": "`$INTEGER`", "key$": "desired_instances", "index$": 5 }, "environment": { "a": true, "h": "Environment", "n": "environment", "r": false, "sh": "Environment slug or public ID, all, or existing.", "t": "`$STRING`", "key$": "environment", "index$": 6 }, "image": { "a": true, "h": "Image", "n": "image", "r": true, "t": "`$STRING`", "key$": "image", "index$": 7 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "t": "`$STRING`", "key$": "region", "index$": 8 }, "rollout_predecessor": { "a": true, "h": "Rollout Predecessor", "n": "rollout_predecessor", "r": false, "sh": "Public deployment operation ID from the same app that must succeed before this rollout starts.", "t": "`$STRING`", "key$": "rollout_predecessor", "index$": 9 }, "service": { "a": true, "h": "Service", "n": "service", "r": false, "sh": "Service slug or public ID; required unless app_service_id is supplied.", "t": "`$STRING`", "key$": "service", "index$": 10 }, "source_ref": { "a": true, "h": "Source Ref", "n": "source_ref", "r": false, "t": "`$STRING`", "key$": "source_ref", "index$": 11 } }, "name": "app_deploy", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["app_environment_id", "app_service_id", "channel", "command", "commit_sha", "desired_instances", "environment", "image", "region", "rollout_predecessor", "service", "source_ref"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/deploys", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/deploys", "q": { "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "deploys" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "app_deploy", "name__orig": "app_deploy", "Name": "AppDeploy", "name_": "app_deploy", "name-": "app-deploy", "NAME": "APP_DEPLOY", "index$": 55 }, { "active": true, "entity": "app_deploy", "key$": "BasicAppDeployFlow", "kind": "basic", "name": "BasicAppDeployFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_deploy_ref01" }, "m": { "app_id": "app01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'AppDeploy', { "POST /api/v1/hosting/apps/{app_id}/deploys": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["image"], "properties": { "image": { "type": "string", "key$": "image" }, "service": { "type": "string", "description": "Service slug or public ID; required unless app_service_id is supplied.", "key$": "service" }, "app_service_id": { "type": "string", "key$": "app_service_id" }, "environment": { "type": "string", "description": "Environment slug or public ID, all, or existing.", "key$": "environment" }, "app_environment_id": { "type": "string", "key$": "app_environment_id" }, "region": { "type": "string", "key$": "region" }, "desired_instances": { "type": "integer", "minimum": 0, "key$": "desired_instances" }, "command": { "type": "string", "key$": "command" }, "channel": { "type": "string", "key$": "channel" }, "source_ref": { "type": "string", "key$": "source_ref" }, "commit_sha": { "type": "string", "key$": "commit_sha" }, "rollout_predecessor": { "type": "string", "description": "Public deployment operation ID from the same app that must succeed before this rollout starts.", "key$": "rollout_predecessor" } } } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "app_deploy.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/deploys" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const app_deploy_ref01_ent = client.AppDeploy();
        let app_deploy_ref01_data = setup.data.new.app_deploy['app_deploy_ref01'];
        app_deploy_ref01_data['app_id'] = setup.idmap['app01'];
        app_deploy_ref01_data = (await app_deploy_ref01_ent.create(app_deploy_ref01_data)).data();
        (0, node_assert_1.default)(null != app_deploy_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_deploy/AppDeployTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_deploy01', 'app_deploy02', 'app_deploy03', 'app01', 'app02', 'app03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_APP_DEPLOY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_APP_DEPLOY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_APP_DEPLOY_ENTID'];
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
//# sourceMappingURL=AppDeployEntity.test.js.map