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
(0, node_test_1.describe)('OrganizationSettingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.OrganizationSetting();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.OrganizationSetting().update({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'organization_setting.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "concurrent_run_limit_override": { "a": true, "h": "Concurrent Run Limit Override", "n": "concurrent_run_limit_override", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "concurrent_run_limit_override", "index$": 0 }, "customize_onboarding_packages": { "a": true, "h": "Customize Onboarding Packages", "n": "customize_onboarding_packages", "r": false, "t": "`$BOOLEAN`", "key$": "customize_onboarding_packages", "index$": 1 }, "daily_run_limit_override": { "a": true, "h": "Daily Run Limit Override", "n": "daily_run_limit_override", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "daily_run_limit_override", "index$": 2 }, "deployment_usage_visibility": { "a": true, "h": "Deployment Usage Visibility", "n": "deployment_usage_visibility", "r": false, "t": "`$STRING`", "key$": "deployment_usage_visibility", "index$": 3 }, "monthly_browser_minutes_limit_override": { "a": true, "h": "Monthly Browser Minutes Limit Override", "n": "monthly_browser_minutes_limit_override", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "monthly_browser_minutes_limit_override", "index$": 4 }, "monthly_budget_dollars": { "a": true, "h": "Monthly Budget Dollars", "n": "monthly_budget_dollars", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NUMBER`", "`$NULL`"]], "key$": "monthly_budget_dollars", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "t": "`$STRING`", "key$": "name", "index$": 6 }, "onboarding_custom_pricing": { "a": true, "h": "Onboarding Custom Pricing", "n": "onboarding_custom_pricing", "r": false, "t": "`$BOOLEAN`", "key$": "onboarding_custom_pricing", "index$": 7 }, "onboarding_package_keys": { "a": true, "h": "Onboarding Package Keys", "n": "onboarding_package_keys", "r": false, "t": "`$ARRAY`", "key$": "onboarding_package_keys", "index$": 8 } }, "name": "organization_setting", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["concurrent_run_limit_override", "customize_onboarding_packages", "daily_run_limit_override", "deployment_usage_visibility", "monthly_browser_minutes_limit_override", "monthly_budget_dollars", "name", "onboarding_custom_pricing", "onboarding_package_keys"], "co": { "id": "PATCH /api/v1/admin/organizations/{org_slug}/settings", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/admin/organizations/{org_slug}/settings", "q": { "exist": ["organization_id"] }, "r": { "param": { "org_slug": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "admin" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "settings" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "organization_setting", "name__orig": "organization_setting", "Name": "OrganizationSetting", "name_": "organization_setting", "name-": "organization-setting", "NAME": "ORGANIZATION_SETTING", "index$": 349 }, { "active": true, "entity": "organization_setting", "key$": "BasicOrganizationSettingFlow", "kind": "basic", "name": "BasicOrganizationSettingFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "organization_setting_ref01", "srcdatavar": "organization_setting_ref01_data", "suffix": "_up0", "textfield": "deployment_usage_visibility" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-organization_setting_ref01" } }], "v": [], "unreachable": true }] }, 'OrganizationSetting', { "PATCH /api/v1/admin/organizations/{org_slug}/settings": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "customize_onboarding_packages": { "type": "boolean", "key$": "customize_onboarding_packages" }, "onboarding_package_keys": { "type": "array", "items": { "type": "string" }, "key$": "onboarding_package_keys" }, "onboarding_custom_pricing": { "type": "boolean", "key$": "onboarding_custom_pricing" }, "deployment_usage_visibility": { "type": "string", "enum": ["automatic", "hidden", "shown"], "key$": "deployment_usage_visibility" }, "name": { "type": "string", "key$": "name" }, "monthly_budget_dollars": { "type": ["string", "number", "null"], "key$": "monthly_budget_dollars" }, "monthly_browser_minutes_limit_override": { "type": ["integer", "null"], "minimum": 0, "key$": "monthly_browser_minutes_limit_override" }, "daily_run_limit_override": { "type": ["integer", "null"], "minimum": 0, "key$": "daily_run_limit_override" }, "concurrent_run_limit_override": { "type": ["integer", "null"], "minimum": 1, "key$": "concurrent_run_limit_override" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "organization_setting.update.0": "GET-only live run: needs PATCH /api/v1/admin/organizations/{org_slug}/settings" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let organization_setting_ref01_data = Object.values(setup.data.existing.organization_setting)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/organization_setting/OrganizationSettingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['organization_setting01', 'organization_setting02', 'organization_setting03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ORGANIZATION_SETTING_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ORGANIZATION_SETTING_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ORGANIZATION_SETTING_ENTID'];
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
//# sourceMappingURL=OrganizationSettingEntity.test.js.map