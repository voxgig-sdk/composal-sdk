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
(0, node_test_1.describe)('SignalIntegrationTargetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.SignalIntegrationTarget();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SignalIntegrationTarget().list({ "organization_id": 1, "signal_integration_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'signal_integration_target.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "app_service_id": { "a": true, "h": "App Service Id", "n": "app_service_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "app_service_id", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at", "index$": 1 }, "display_name": { "a": true, "h": "Display Name", "n": "display_name", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "display_name", "index$": 2 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "r": true, "t": "`$BOOLEAN`", "key$": "enabled", "index$": 3 }, "external_id": { "a": true, "h": "External Id", "n": "external_id", "r": true, "t": "`$STRING`", "key$": "external_id", "index$": 4 }, "external_kind": { "a": true, "h": "External Kind", "n": "external_kind", "r": true, "t": "`$STRING`", "key$": "external_kind", "index$": 5 }, "external_slug": { "a": true, "h": "External Slug", "n": "external_slug", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "external_slug", "index$": 6 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "hosted_app_id", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Public id (`stgt_…`).", "t": "`$STRING`", "key$": "id", "index$": 8 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 9 }, "signal_integration_id": { "a": true, "h": "Signal Integration Id", "n": "signal_integration_id", "r": true, "t": "`$STRING`", "key$": "signal_integration_id", "index$": 10 }, "signal_integration_targets": { "a": true, "h": "Signal Integration Targets", "n": "signal_integration_targets", "r": true, "t": "`$ARRAY`", "key$": "signal_integration_targets", "index$": 11 }, "targets": { "a": true, "h": "Targets", "n": "targets", "r": true, "t": "`$ARRAY`", "key$": "targets", "index$": 12 }, "updated_at": { "a": true, "h": "Updated At", "n": "updated_at", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "signal_integration_target", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "signal_integration_id", "or": "signal_integration_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets", "q": { "exist": ["organization_id", "signal_integration_id"] }, "r": { "param": { "signal_integration_id": "signal_integration_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "signal_integrations" }, { "var": "signal_integration_id" }, { "lit": "targets" }], "t": { "req": "`reqdata`", "res": "`body.signal_integration_targets`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["targets"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "signal_integration_id", "or": "signal_integration_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets", "q": { "exist": ["organization_id", "signal_integration_id"] }, "r": { "param": { "signal_integration_id": "signal_integration_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "signal_integrations" }, { "var": "signal_integration_id" }, { "lit": "targets" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.signal_integration"]] }, "key$": "signal_integration_target", "name__orig": "signal_integration_target", "Name": "SignalIntegrationTarget", "name_": "signal_integration_target", "name-": "signal-integration-target", "NAME": "SIGNAL_INTEGRATION_TARGET", "index$": 471 }, { "active": true, "entity": "signal_integration_target", "key$": "BasicSignalIntegrationTargetFlow", "kind": "basic", "name": "BasicSignalIntegrationTargetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "signal_integration_id": "signal_integration01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "signal_integration_target_ref01" } }], "index$": 0 }, { "a": false, "d": { "organization_id": "organization01" }, "i": { "ref": "signal_integration_target_ref01", "srcdatavar": "signal_integration_target_ref01_data", "suffix": "_up0", "textfield": "app_service_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-signal_integration_target_ref01" } }], "v": [], "unreachable": true }] }, 'SignalIntegrationTarget', { "GET /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "signal_integration_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["targets"], "properties": { "targets": { "type": "array", "items": { "type": "object", "required": ["external_id"], "properties": { "external_kind": { "type": "string", "enum": [], "x-ref": "#/components/schemas/SignalIntegrationExternalKind" }, "external_id": { "type": "string" }, "external_slug": { "type": "string" }, "display_name": { "type": "string" }, "hosted_app_id": { "type": "string", "description": "Hosted app public id (`app_…`), raw id, or slug." }, "app_service_id": { "type": "string" }, "enabled": { "type": "boolean" } }, "additionalProperties": false }, "key$": "targets" } }, "additionalProperties": true, "x-ref": "#/components/schemas/SignalIntegrationTargetsPayload" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "signal_integration_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "signal_integration_target.update.1": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/targets" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let signal_integration_target_ref01_data = Object.values(setup.data.existing.signal_integration_target)[0];
        // LIST
        const signal_integration_target_ref01_ent = client.SignalIntegrationTarget();
        const signal_integration_target_ref01_match = {};
        signal_integration_target_ref01_match['organization_id'] = setup.idmap['organization01'];
        signal_integration_target_ref01_match['signal_integration_id'] = setup.idmap['signal_integration01'];
        const signal_integration_target_ref01_list = (await signal_integration_target_ref01_ent.list(signal_integration_target_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/signal_integration_target/SignalIntegrationTargetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['signal_integration_target01', 'signal_integration_target02', 'signal_integration_target03', 'organization01', 'organization02', 'organization03', 'signal_integration01', 'signal_integration02', 'signal_integration03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_SIGNAL_INTEGRATION_TARGET_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_SIGNAL_INTEGRATION_TARGET_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_SIGNAL_INTEGRATION_TARGET_ENTID'];
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
//# sourceMappingURL=SignalIntegrationTargetEntity.test.js.map