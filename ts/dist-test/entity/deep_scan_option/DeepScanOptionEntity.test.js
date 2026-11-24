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
(0, node_test_1.describe)('DeepScanOptionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.DeepScanOption();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DeepScanOption().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'deep_scan_option.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accounts": { "a": true, "h": "Accounts", "n": "accounts", "r": true, "t": "`$ARRAY`", "key$": "accounts", "index$": 0 }, "deep_scan_defaults": { "a": true, "h": "Deep Scan Defaults", "n": "deep_scan_defaults", "r": false, "sh": "The team a signed-out Deep Scan of this environment gets without budgets.", "t": "`$ANY`", "key$": "deep_scan_defaults", "index$": 1 }, "flow_map": { "a": true, "h": "Flow Map", "n": "flow_map", "r": true, "sh": "Flows from the newest discovery; null until discovery has recorded some.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "flow_map", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 4 }, "personas": { "a": true, "h": "Personas", "n": "personas", "r": false, "t": "`$ARRAY`", "key$": "personas", "index$": 5 }, "preview": { "a": true, "h": "Preview", "n": "preview", "r": false, "sh": "A short-lived pull request or branch deployment, listed after configured environments.", "t": "`$BOOLEAN`", "key$": "preview", "index$": 6 }, "target_url": { "a": true, "h": "Target Url", "n": "target_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "target_url", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "deep_scan_option", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/deep_scans/options", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "environment_query", "or": "environment_query", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/deep_scans/options", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "deep_scans" }, { "lit": "options" }], "t": { "req": "`reqdata`", "res": "`body.environments`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "deep_scan_option", "name__orig": "deep_scan_option", "Name": "DeepScanOption", "name_": "deep_scan_option", "name-": "deep-scan-option", "NAME": "DEEP_SCAN_OPTION", "index$": 197 }, { "active": true, "entity": "deep_scan_option", "key$": "BasicDeepScanOptionFlow", "kind": "basic", "name": "BasicDeepScanOptionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "deep_scan_option_ref01" } }], "index$": 0 }] }, 'DeepScanOption', { "GET /api/v1/organizations/{organization_id}/verify/deep_scans/options": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "query", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "environment_query", "in": "query", "required": false, "description": "Matches environment names, addresses, types, branches and pull request numbers, and limits the list to 25 configured environments and 25 previews; send it empty for the first page. Omit it to list every ready environment.", "schema": { "type": "string", "maxLength": 200 }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let deep_scan_option_ref01_data = Object.values(setup.data.existing.deep_scan_option)[0];
        // LIST
        const deep_scan_option_ref01_ent = client.DeepScanOption();
        const deep_scan_option_ref01_match = {};
        deep_scan_option_ref01_match['organization_id'] = setup.idmap['organization01'];
        const deep_scan_option_ref01_list = (await deep_scan_option_ref01_ent.list(deep_scan_option_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/deep_scan_option/DeepScanOptionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['deep_scan_option01', 'deep_scan_option02', 'deep_scan_option03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_DEEP_SCAN_OPTION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_DEEP_SCAN_OPTION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_DEEP_SCAN_OPTION_ENTID'];
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
//# sourceMappingURL=DeepScanOptionEntity.test.js.map