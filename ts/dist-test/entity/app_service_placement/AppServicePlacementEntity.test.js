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
(0, node_test_1.describe)('AppServicePlacementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AppServicePlacement();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AppServicePlacement().list({ "app_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'app_service_placement.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app_environment_id": { "a": true, "h": "App Environment Id", "n": "app_environment_id", "r": true, "t": "`$STRING`", "key$": "app_environment_id", "index$": 0 }, "app_service_id": { "a": true, "h": "App Service Id", "n": "app_service_id", "r": true, "t": "`$STRING`", "key$": "app_service_id", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "deployment_channel": { "a": true, "h": "Deployment Channel", "n": "deployment_channel", "r": true, "sh": "Preview-only override; null inherits the captured source channel.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "deployment_channel", "index$": 3 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "r": true, "t": "`$STRING`", "key$": "hosted_app_id", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "mode": { "a": true, "h": "Mode", "n": "mode", "r": true, "t": "`$STRING`", "key$": "mode", "index$": 6 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 7 }, "region_count": { "a": true, "h": "Region Count", "n": "region_count", "r": true, "t": "`$INTEGER`", "key$": "region_count", "index$": 8 }, "replicas_per_region": { "a": true, "h": "Replicas Per Region", "n": "replicas_per_region", "r": true, "t": "`$INTEGER`", "key$": "replicas_per_region", "index$": 9 }, "rollout_strategy": { "a": true, "h": "Rollout Strategy", "n": "rollout_strategy", "r": true, "t": "`$STRING`", "key$": "rollout_strategy", "index$": 10 }, "targets": { "a": true, "h": "Targets", "n": "targets", "r": true, "t": "`$ARRAY`", "key$": "targets", "index$": 11 }, "total_replicas": { "a": true, "h": "Total Replicas", "n": "total_replicas", "r": true, "t": "`$INTEGER`", "key$": "total_replicas", "index$": 12 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "app_service_placement", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/service_placements", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "existing", "or": "existing", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "service", "or": "service", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/service_placements", "q": { "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "service_placements" }], "t": { "req": "`reqdata`", "res": "`body.placements`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/hosting/apps/{app_id}/service_placements/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/hosting/apps/{app_id}/service_placements/{id}", "q": { "exist": ["app_id", "id"] }, "r": { "param": { "app_id": "app_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "service_placements" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.placement`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["app_environment_id", "app_service_id", "deployment_channel", "expected_generation", "mode", "replicas_per_region", "rollout_strategy", "targets"], "co": { "id": "PUT /api/v1/hosting/apps/{app_id}/service_placements/configure", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "app_id", "or": "app_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/hosting/apps/{app_id}/service_placements/configure", "q": { "$action": "configure", "exist": ["app_id"] }, "r": { "param": { "app_id": "app_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "hosting" }, { "lit": "apps" }, { "var": "app_id" }, { "lit": "service_placements" }, { "lit": "configure" }], "t": { "req": "`reqdata`", "res": "`body.placement`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.app"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "app_service_placement", "name__orig": "app_service_placement", "Name": "AppServicePlacement", "name_": "app_service_placement", "name-": "app-service-placement", "NAME": "APP_SERVICE_PLACEMENT", "index$": 95 }, { "active": true, "entity": "app_service_placement", "key$": "BasicAppServicePlacementFlow", "kind": "basic", "name": "BasicAppServicePlacementFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "app_id": "app01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "app_service_placement_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "app_service_placement_ref01", "srcdatavar": "app_service_placement_ref01_data", "suffix": "_up0", "textfield": "app_environment_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_service_placement_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "app_service_placement_ref01", "srcdatavar": "app_service_placement_ref01_data", "suffix": "_dt0" }, "m": { "app_id": "app01", "id": "app_service_placement01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-app_service_placement_ref01" } }], "index$": 1, "route": "GET /api/v1/hosting/apps/{app_id}/service_placements/{id}", "record": {} }] }, 'AppServicePlacement', { "GET /api/v1/hosting/apps/{app_id}/service_placements": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "service", "in": "query", "description": "Filter by a service slug belonging to this app.", "schema": { "type": "string" }, "index$": 1 }, { "name": "existing", "in": "query", "description": "Return positive-replica placements with enabled targets in active, undeleted services and environments.", "schema": { "type": "boolean" }, "index$": 2 }] }, "GET /api/v1/hosting/apps/{app_id}/service_placements/{id}": { "protocol": "http", "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/hosting/apps/{app_id}/service_placements/configure": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["app_service_id", "app_environment_id", "mode", "rollout_strategy", "replicas_per_region", "targets"], "properties": { "app_service_id": { "type": "string" }, "app_environment_id": { "type": "string" }, "expected_generation": { "type": "integer", "description": "Required for preview environments. Stale generations or unfinished cleanup return 409." }, "mode": { "type": "string", "enum": ["single_region", "multi_region"] }, "rollout_strategy": { "type": "string", "enum": ["health_gated", "burst"] }, "deployment_channel": { "type": "string", "enum": ["stable", "blue_green"], "nullable": true, "description": "Preview-only override; null inherits the captured source channel." }, "replicas_per_region": { "type": "integer", "minimum": 0 }, "targets": { "type": "array", "items": { "type": "object", "required": ["location_id"], "properties": { "location_id": { "type": "string" }, "enabled": { "type": "boolean" } } } } }, "additionalProperties": true, "x-ref": "#/components/schemas/AppServicePlacementPayload" } } } }, "parameters": [{ "name": "app_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "app_service_placement.update.1": "GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/service_placements/configure" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let app_service_placement_ref01_data = Object.values(setup.data.existing.app_service_placement)[0];
        // LIST
        const app_service_placement_ref01_ent = client.AppServicePlacement();
        const app_service_placement_ref01_match = {};
        app_service_placement_ref01_match['app_id'] = setup.idmap['app01'];
        const app_service_placement_ref01_list = (await app_service_placement_ref01_ent.list(app_service_placement_ref01_match)).map((e) => e.data());
        // LOAD
        const app_service_placement_ref01_match_dt0 = {};
        app_service_placement_ref01_match_dt0.id = app_service_placement_ref01_data.id;
        app_service_placement_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01'];
        const app_service_placement_ref01_data_dt0 = (await app_service_placement_ref01_ent.load(app_service_placement_ref01_match_dt0)).data();
        (0, node_assert_1.default)(app_service_placement_ref01_data_dt0.id === app_service_placement_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/app_service_placement/AppServicePlacementTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['app_service_placement01', 'app_service_placement02', 'app_service_placement03', 'app01', 'app02', 'app03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_APP_SERVICE_PLACEMENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_APP_SERVICE_PLACEMENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_APP_SERVICE_PLACEMENT_ENTID'];
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
//# sourceMappingURL=AppServicePlacementEntity.test.js.map