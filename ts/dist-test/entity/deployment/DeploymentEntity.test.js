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
(0, node_test_1.describe)('DeploymentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Deployment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Deployment().load({ "id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'deployment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app": { "a": true, "h": "App", "n": "app", "r": true, "t": "`$OBJECT`", "key$": "app", "index$": 0 }, "artifact_locator": { "a": true, "h": "Artifact Locator", "n": "artifact_locator", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "artifact_locator", "index$": 1 }, "build_duration_seconds": { "a": true, "h": "Build Duration Seconds", "n": "build_duration_seconds", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "build_duration_seconds", "index$": 2 }, "build_source": { "a": true, "h": "Build Source", "n": "build_source", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "build_source", "index$": 3 }, "build_status": { "a": true, "h": "Build Status", "n": "build_status", "r": true, "t": "`$STRING`", "key$": "build_status", "index$": 4 }, "children": { "a": true, "h": "Children", "n": "children", "r": true, "t": "`$ARRAY`", "key$": "children", "index$": 5 }, "ci_pipeline_id": { "a": true, "h": "Ci Pipeline Id", "n": "ci_pipeline_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ci_pipeline_id", "index$": 6 }, "ci_pipeline_run_id": { "a": true, "h": "Ci Pipeline Run Id", "n": "ci_pipeline_run_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ci_pipeline_run_id", "index$": 7 }, "commit_sha": { "a": true, "h": "Commit Sha", "n": "commit_sha", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "commit_sha", "index$": 8 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 9 }, "creator": { "a": true, "h": "Creator", "n": "creator", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "creator", "index$": 10 }, "deployed_url": { "a": true, "fo": "uri", "h": "Deployed Url", "n": "deployed_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "deployed_url", "index$": 11 }, "duration_seconds": { "a": true, "h": "Duration Seconds", "n": "duration_seconds", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "duration_seconds", "index$": 12 }, "environment": { "a": true, "h": "Environment", "n": "environment", "r": true, "t": "`$OBJECT`", "key$": "environment", "index$": 13 }, "history_kind": { "a": true, "h": "History Kind", "n": "history_kind", "r": true, "t": "`$STRING`", "key$": "history_kind", "index$": 14 }, "history_reason": { "a": true, "h": "History Reason", "n": "history_reason", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "history_reason", "index$": 15 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 16 }, "is_live": { "a": true, "h": "Is Live", "n": "is_live", "r": true, "t": "`$BOOLEAN`", "key$": "is_live", "index$": 17 }, "is_rollback": { "a": true, "h": "Is Rollback", "n": "is_rollback", "r": true, "t": "`$BOOLEAN`", "key$": "is_rollback", "index$": 18 }, "live_region_count": { "a": true, "h": "Live Region Count", "n": "live_region_count", "r": true, "t": "`$INTEGER`", "key$": "live_region_count", "index$": 19 }, "number": { "a": true, "h": "Number", "n": "number", "r": true, "t": "`$INTEGER`", "key$": "number", "index$": 20 }, "placement": { "a": true, "h": "Placement", "n": "placement", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "placement", "index$": 21 }, "region_count": { "a": true, "h": "Region Count", "n": "region_count", "r": true, "t": "`$INTEGER`", "key$": "region_count", "index$": 22 }, "replicas_per_region": { "a": true, "h": "Replicas Per Region", "n": "replicas_per_region", "r": true, "t": "`$INTEGER`", "key$": "replicas_per_region", "index$": 23 }, "rollback_reason": { "a": true, "h": "Rollback Reason", "n": "rollback_reason", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "rollback_reason", "index$": 24 }, "rollback_source_release_id": { "a": true, "h": "Rollback Source Release Id", "n": "rollback_source_release_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "rollback_source_release_id", "index$": 25 }, "rollback_target_release_id": { "a": true, "h": "Rollback Target Release Id", "n": "rollback_target_release_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "rollback_target_release_id", "index$": 26 }, "rollout_predecessor_id": { "a": true, "h": "Rollout Predecessor Id", "n": "rollout_predecessor_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "rollout_predecessor_id", "index$": 27 }, "rollout_status": { "a": true, "h": "Rollout Status", "n": "rollout_status", "r": true, "t": "`$STRING`", "key$": "rollout_status", "index$": 28 }, "rollout_strategy": { "a": true, "h": "Rollout Strategy", "n": "rollout_strategy", "r": true, "t": "`$STRING`", "key$": "rollout_strategy", "index$": 29 }, "service": { "a": true, "h": "Service", "n": "service", "r": true, "t": "`$OBJECT`", "key$": "service", "index$": 30 }, "source_ref": { "a": true, "h": "Source Ref", "n": "source_ref", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_ref", "index$": 31 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 32 }, "total_replicas": { "a": true, "h": "Total Replicas", "n": "total_replicas", "r": true, "t": "`$INTEGER`", "key$": "total_replicas", "index$": 33 }, "trigger_kind": { "a": true, "h": "Trigger Kind", "n": "trigger_kind", "r": true, "t": "`$STRING`", "key$": "trigger_kind", "index$": 34 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 35 } }, "id": { "field": "id", "name": "id" }, "name": "deployment", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/pages/deployments/{deployment_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "deployment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/pages/deployments/{deployment_id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "deployment_id": "id", "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "pages" }, { "lit": "deployments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.operation`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/pages/deployments/architecture", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "app", "or": "app", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "environment", "or": "environment", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "service", "or": "service", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/pages/deployments/architecture", "q": { "$action": "architecture", "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "pages" }, { "lit": "deployments" }, { "lit": "architecture" }], "t": { "req": "`reqdata`", "res": "`body.connections`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/pages/deployments/feed", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "app", "or": "app", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "environment", "or": "environment", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "page", "or": "page", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "service", "or": "service", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/pages/deployments/feed", "q": { "$action": "feed", "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "pages" }, { "lit": "deployments" }, { "lit": "feed" }], "t": { "page": { "next": "`body.pagination.next`", "total": "`body.pagination.count`" }, "req": "`reqdata`", "res": "`body.deploy_targets`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "deployment", "name__orig": "deployment", "Name": "Deployment", "name_": "deployment", "name-": "deployment", "NAME": "DEPLOYMENT", "index$": 200 }, { "active": true, "entity": "deployment", "key$": "BasicDeploymentFlow", "kind": "basic", "name": "BasicDeploymentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "deployment_ref01", "srcdatavar": "deployment_ref01_data", "suffix": "_dt0" }, "m": { "id": "deployment01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-deployment_ref01" } }], "index$": 0, "route": "GET /api/v1/organizations/{org_slug}/pages/deployments/{deployment_id}", "record": {} }] }, 'Deployment', { "GET /api/v1/organizations/{org_slug}/pages/deployments/{deployment_id}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "deployment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{org_slug}/pages/deployments/architecture": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "in": "query", "name": "app", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "in": "query", "name": "service", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "in": "query", "name": "environment", "required": false, "schema": { "type": "string" }, "index$": 3 }] }, "GET /api/v1/organizations/{org_slug}/pages/deployments/feed": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "in": "query", "name": "app", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "in": "query", "name": "service", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "in": "query", "name": "environment", "required": false, "schema": { "type": "string" }, "index$": 3 }, { "in": "query", "name": "page", "required": false, "schema": { "type": "integer", "minimum": 1 }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let deployment_ref01_data = Object.values(setup.data.existing.deployment)[0];
        // LOAD
        const deployment_ref01_ent = client.Deployment();
        const deployment_ref01_match_dt0 = {};
        deployment_ref01_match_dt0.id = deployment_ref01_data.id;
        deployment_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const deployment_ref01_data_dt0 = (await deployment_ref01_ent.load(deployment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(deployment_ref01_data_dt0.id === deployment_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/deployment/DeploymentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['deployment01', 'deployment02', 'deployment03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_DEPLOYMENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_DEPLOYMENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_DEPLOYMENT_ENTID'];
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
//# sourceMappingURL=DeploymentEntity.test.js.map