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
(0, node_test_1.describe)('AppDeploymentRollbackEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AppDeploymentRollback();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppDeploymentRollback().create({ "app_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_deployment_rollback.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app_environment_id": { "a": true, "h": "App Environment Id", "n": "app_environment_id", "r": false, "t": "`$STRING`", "key$": "app_environment_id", "index$": 0 }, "app_id": { "a": true, "h": "App Id", "n": "app_id", "r": true, "t": "`$STRING`", "key$": "app_id", "index$": 1 }, "app_service_id": { "a": true, "h": "App Service Id", "n": "app_service_id", "r": false, "t": "`$STRING`", "key$": "app_service_id", "index$": 2 }, "blockers": { "a": true, "h": "Blockers", "n": "blockers", "r": true, "t": "`$ARRAY`", "key$": "blockers", "index$": 3 }, "candidate_releases": { "a": true, "h": "Candidate Releases", "n": "candidate_releases", "r": true, "t": "`$ARRAY`", "key$": "candidate_releases", "index$": 4 }, "confirmation_text": { "a": true, "h": "Confirmation Text", "n": "confirmation_text", "r": true, "t": "`$STRING`", "key$": "confirmation_text", "index$": 5 }, "current_deployment": { "a": true, "h": "Current Deployment", "n": "current_deployment", "r": true, "t": "`$ANY`", "key$": "current_deployment", "index$": 6 }, "current_release": { "a": true, "h": "Current Release", "n": "current_release", "r": true, "t": "`$ANY`", "key$": "current_release", "index$": 7 }, "deployment": { "a": true, "h": "Deployment", "n": "deployment", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$ANY`", "key$": "deployment", "index$": 8 }, "desired_state": { "a": true, "h": "Desired State", "n": "desired_state", "r": true, "t": "`$ANY`", "key$": "desired_state", "index$": 9 }, "environment": { "a": true, "h": "Environment", "n": "environment", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$ANY`", "key$": "environment", "index$": 10 }, "execution_allowed": { "a": true, "h": "Execution Allowed", "n": "execution_allowed", "r": true, "t": "`$BOOLEAN`", "key$": "execution_allowed", "index$": 11 }, "force": { "a": true, "h": "Force", "n": "force", "op": { "create": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "force", "index$": 12 }, "idempotency_key": { "a": true, "h": "Idempotency Key", "n": "idempotency_key", "r": false, "t": "`$STRING`", "key$": "idempotency_key", "index$": 13 }, "idempotent_reuse": { "a": true, "h": "Idempotent Reuse", "n": "idempotent_reuse", "r": true, "t": "`$BOOLEAN`", "key$": "idempotent_reuse", "index$": 14 }, "location": { "a": true, "h": "Location", "n": "location", "r": true, "t": "`$ANY`", "key$": "location", "index$": 15 }, "operation": { "a": true, "h": "Operation", "n": "operation", "r": true, "t": "`$ANY`", "key$": "operation", "index$": 16 }, "reason": { "a": true, "h": "Reason", "n": "reason", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "reason", "index$": 17 }, "rollback_release": { "a": true, "h": "Rollback Release", "n": "rollback_release", "r": true, "t": "`$ANY`", "key$": "rollback_release", "index$": 18 }, "rollout": { "a": true, "h": "Rollout", "n": "rollout", "r": true, "t": "`$ANY`", "key$": "rollout", "index$": 19 }, "service": { "a": true, "h": "Service", "n": "service", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$ANY`", "key$": "service", "index$": 20 }, "target_artifact_locator": { "a": true, "h": "Target Artifact Locator", "n": "target_artifact_locator", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "target_artifact_locator", "index$": 21 }, "target_release": { "a": true, "h": "Target Release", "n": "target_release", "r": true, "t": "`$ANY`", "key$": "target_release", "index$": 22 }, "to": { "a": true, "h": "To", "n": "to", "r": false, "t": "`$STRING`", "key$": "to", "index$": 23 }, "warnings": { "a": true, "h": "Warnings", "n": "warnings", "r": true, "t": "`$ARRAY`", "key$": "warnings", "index$": 24 } }, "name": "app_deployment_rollback", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["app_environment_id", "app_service_id", "deployment", "environment", "force", "idempotency_key", "reason", "service", "to"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/deployment_rollbacks", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/deployment_rollbacks", "q": { "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "deployment_rollbacks" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["app_environment_id", "app_service_id", "deployment", "environment", "force", "idempotency_key", "reason", "service", "to"], "co": { "id": "POST /api/v1/hosting/apps/{app_id}/deployment_rollbacks/plan", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/hosting/apps/{app_id}/deployment_rollbacks/plan", "q": { "$action": "plan", "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "deployment_rollbacks" }, { "lit": "plan" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "key$": "app_deployment_rollback", "name__orig": "app_deployment_rollback", "Name": "AppDeploymentRollback", "name_": "app_deployment_rollback", "name-": "app-deployment-rollback", "NAME": "APP_DEPLOYMENT_ROLLBACK", "index$": 85 }, { "active": true, "entity": "app_deployment_rollback", "key$": "BasicAppDeploymentRollbackFlow", "kind": "basic", "name": "BasicAppDeploymentRollbackFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_deployment_rollback_ref01" }, "m": { "app_id": "app01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'AppDeploymentRollback', { "POST /api/v1/hosting/apps/{app_id}/deployment_rollbacks": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "app_service_id": { "type": "string", "key$": "app_service_id" }, "service": { "type": "string", "key$": "service" }, "app_environment_id": { "type": "string", "key$": "app_environment_id" }, "environment": { "type": "string", "key$": "environment" }, "to": { "type": "string", "key$": "to" }, "deployment": { "type": "string", "key$": "deployment" }, "reason": { "type": "string", "key$": "reason" }, "force": { "type": "boolean", "key$": "force" }, "idempotency_key": { "type": "string", "key$": "idempotency_key" } }, "additionalProperties": true, "x-ref": "#/components/schemas/DeploymentRollbackPayload" } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/hosting/apps/{app_id}/deployment_rollbacks/plan": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "app_service_id": { "type": "string", "key$": "app_service_id" }, "service": { "type": "string", "key$": "service" }, "app_environment_id": { "type": "string", "key$": "app_environment_id" }, "environment": { "type": "string", "key$": "environment" }, "to": { "type": "string", "key$": "to" }, "deployment": { "type": "string", "key$": "deployment" }, "reason": { "type": "string", "key$": "reason" }, "force": { "type": "boolean", "key$": "force" }, "idempotency_key": { "type": "string", "key$": "idempotency_key" } }, "additionalProperties": true, "x-ref": "#/components/schemas/DeploymentRollbackPayload" } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "app_deployment_rollback.create.0": "GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/deployment_rollbacks" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const app_deployment_rollback_ref01_ent = client.AppDeploymentRollback();
        let app_deployment_rollback_ref01_data = setup.data.new.app_deployment_rollback['app_deployment_rollback_ref01'];
        app_deployment_rollback_ref01_data['app_id'] = setup.idmap['app01'];
        app_deployment_rollback_ref01_data = (await app_deployment_rollback_ref01_ent.create(app_deployment_rollback_ref01_data)).data();
        (0, node_assert_1.default)(null != app_deployment_rollback_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_deployment_rollback/AppDeploymentRollbackTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_deployment_rollback01', 'app_deployment_rollback02', 'app_deployment_rollback03', 'app01', 'app02', 'app03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_APP_DEPLOYMENT_ROLLBACK_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_APP_DEPLOYMENT_ROLLBACK_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_APP_DEPLOYMENT_ROLLBACK_ENTID'];
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
//# sourceMappingURL=AppDeploymentRollbackEntity.test.js.map