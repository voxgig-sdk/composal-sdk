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
(0, node_test_1.describe)('AppDeploymentDashboardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AppDeploymentDashboard();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppDeploymentDashboard().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_deployment_dashboard.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "activity": { "a": true, "h": "Activity", "n": "activity", "r": true, "t": "`$ARRAY`", "key$": "activity", "index$": 0 }, "app": { "a": true, "h": "App", "n": "app", "r": true, "t": "`$OBJECT`", "key$": "app", "index$": 1 }, "audit_events": { "a": true, "h": "Audit Events", "n": "audit_events", "r": true, "t": "`$ARRAY`", "key$": "audit_events", "index$": 2 }, "capacity": { "a": true, "h": "Capacity", "n": "capacity", "r": true, "t": "`$OBJECT`", "key$": "capacity", "index$": 3 }, "connections": { "a": true, "h": "Connections", "n": "connections", "r": true, "t": "`$ARRAY`", "key$": "connections", "index$": 4 }, "data_resources": { "a": true, "h": "Data Resources", "n": "data_resources", "r": true, "t": "`$ARRAY`", "key$": "data_resources", "index$": 5 }, "deployments": { "a": true, "h": "Deployments", "n": "deployments", "r": true, "t": "`$ARRAY`", "key$": "deployments", "index$": 6 }, "desired_states": { "a": true, "h": "Desired States", "n": "desired_states", "r": true, "t": "`$ARRAY`", "key$": "desired_states", "index$": 7 }, "environments": { "a": true, "h": "Environments", "n": "environments", "r": true, "t": "`$ARRAY`", "key$": "environments", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 9 }, "locations": { "a": true, "h": "Locations", "n": "locations", "r": true, "t": "`$ARRAY`", "key$": "locations", "index$": 10 }, "managed_database_catalog": { "a": true, "h": "Managed Database Catalog", "n": "managed_database_catalog", "r": true, "t": "`$OBJECT`", "union": { "branches": 2, "count": 4, "depth": 8 }, "key$": "managed_database_catalog", "index$": 11 }, "observability": { "a": true, "h": "Observability", "n": "observability", "r": true, "t": "`$OBJECT`", "key$": "observability", "index$": 12 }, "operations": { "a": true, "h": "Operations", "n": "operations", "r": true, "t": "`$ARRAY`", "key$": "operations", "index$": 13 }, "placements": { "a": true, "h": "Placements", "n": "placements", "r": true, "t": "`$ARRAY`", "key$": "placements", "index$": 14 }, "reconciler_ticks": { "a": true, "h": "Reconciler Ticks", "n": "reconciler_ticks", "r": true, "t": "`$ARRAY`", "key$": "reconciler_ticks", "index$": 15 }, "releases": { "a": true, "h": "Releases", "n": "releases", "r": true, "t": "`$ARRAY`", "key$": "releases", "index$": 16 }, "rollback_deployments": { "a": true, "h": "Rollback Deployments", "n": "rollback_deployments", "r": true, "t": "`$ARRAY`", "key$": "rollback_deployments", "index$": 17 }, "rollouts": { "a": true, "h": "Rollouts", "n": "rollouts", "r": true, "t": "`$ARRAY`", "key$": "rollouts", "index$": 18 }, "runtime_instances": { "a": true, "h": "Runtime Instances", "n": "runtime_instances", "r": true, "t": "`$ARRAY`", "key$": "runtime_instances", "index$": 19 }, "service_bindings": { "a": true, "h": "Service Bindings", "n": "service_bindings", "r": true, "t": "`$ARRAY`", "key$": "service_bindings", "index$": 20 }, "service_views": { "a": true, "h": "Service Views", "n": "service_views", "r": true, "t": "`$ARRAY`", "key$": "service_views", "index$": 21 }, "services": { "a": true, "h": "Services", "n": "services", "r": true, "t": "`$ARRAY`", "key$": "services", "index$": 22 }, "storage_resources": { "a": true, "h": "Storage Resources", "n": "storage_resources", "r": true, "t": "`$ARRAY`", "key$": "storage_resources", "index$": 23 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": true, "t": "`$OBJECT`", "key$": "summary", "index$": 24 } }, "id": { "field": "id", "name": "id" }, "name": "app_deployment_dashboard", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/deployment_dashboard", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "metrics_range", "or": "metrics_range", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/deployment_dashboard", "q": { "exist": ["id"] }, "r": { "param": { "app_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "id" }, { "lit": "deployment_dashboard" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "app_deployment_dashboard", "name__orig": "app_deployment_dashboard", "Name": "AppDeploymentDashboard", "name_": "app_deployment_dashboard", "name-": "app-deployment-dashboard", "NAME": "APP_DEPLOYMENT_DASHBOARD", "index$": 83 }, { "active": true, "entity": "app_deployment_dashboard", "key$": "BasicAppDeploymentDashboardFlow", "kind": "basic", "name": "BasicAppDeploymentDashboardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "app_deployment_dashboard_ref01", "srcdatavar": "app_deployment_dashboard_ref01_data", "suffix": "_dt0" }, "m": { "id": "app_deployment_dashboard01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_deployment_dashboard_ref01" } }], "index$": 0, "route": "GET /api/v1/hosting/apps/{app_id}/deployment_dashboard", "record": {} }] }, 'AppDeploymentDashboard', { "GET /api/v1/hosting/apps/{app_id}/deployment_dashboard": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "metrics_range", "in": "query", "required": false, "schema": { "type": "string", "enum": ["1h", "6h", "24h", "7d"] }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let app_deployment_dashboard_ref01_data = Object.values(setup.data.existing.app_deployment_dashboard)[0];
        // LOAD
        const app_deployment_dashboard_ref01_ent = client.AppDeploymentDashboard();
        const app_deployment_dashboard_ref01_match_dt0 = {};
        app_deployment_dashboard_ref01_match_dt0.id = app_deployment_dashboard_ref01_data.id;
        const app_deployment_dashboard_ref01_data_dt0 = (await app_deployment_dashboard_ref01_ent.load(app_deployment_dashboard_ref01_match_dt0)).data();
        (0, node_assert_1.default)(app_deployment_dashboard_ref01_data_dt0.id === app_deployment_dashboard_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_deployment_dashboard/AppDeploymentDashboardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_deployment_dashboard01', 'app_deployment_dashboard02', 'app_deployment_dashboard03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_APP_DEPLOYMENT_DASHBOARD_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_APP_DEPLOYMENT_DASHBOARD_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_APP_DEPLOYMENT_DASHBOARD_ENTID'];
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
//# sourceMappingURL=AppDeploymentDashboardEntity.test.js.map