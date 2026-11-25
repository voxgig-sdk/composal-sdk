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
(0, node_test_1.describe)('BillingBudgetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.BillingBudget();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.BillingBudget().update({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'billing_budget.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "addons": { "a": true, "h": "Addons", "n": "addons", "r": true, "t": "`$ARRAY`", "key$": "addons", "index$": 0 }, "breakdown": { "a": true, "h": "Breakdown", "n": "breakdown", "r": true, "sh": "The 24-hour live series with its provenance; null only when the rollup fallback itself failed.", "t": "`$ANY`", "key$": "breakdown", "index$": 1 }, "budget": { "a": true, "h": "Budget", "n": "budget", "r": true, "t": "`$ANY`", "key$": "budget", "index$": 2 }, "can_manage_contact": { "a": true, "h": "Can Manage Contact", "n": "can_manage_contact", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_contact", "index$": 3 }, "can_manage_extra_spend": { "a": true, "h": "Can Manage Extra Spend", "n": "can_manage_extra_spend", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_extra_spend", "index$": 4 }, "can_manage_local_subscription": { "a": true, "h": "Can Manage Local Subscription", "n": "can_manage_local_subscription", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_local_subscription", "index$": 5 }, "can_manage_payment_method": { "a": true, "h": "Can Manage Payment Method", "n": "can_manage_payment_method", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_payment_method", "index$": 6 }, "can_set_up_billing": { "a": true, "h": "Can Set Up Billing", "n": "can_set_up_billing", "r": true, "t": "`$BOOLEAN`", "key$": "can_set_up_billing", "index$": 7 }, "customer": { "a": true, "h": "Customer", "n": "customer", "r": true, "t": "`$ANY`", "key$": "customer", "index$": 8 }, "deployment_usage_visible": { "a": true, "h": "Deployment Usage Visible", "n": "deployment_usage_visible", "r": true, "t": "`$BOOLEAN`", "key$": "deployment_usage_visible", "index$": 9 }, "entitlements": { "a": true, "h": "Entitlements", "n": "entitlements", "r": true, "t": "`$OBJECT`", "key$": "entitlements", "index$": 10 }, "extra_spend_enabled": { "a": true, "h": "Extra Spend Enabled", "n": "extra_spend_enabled", "r": true, "sh": "Organization consent to paid overages across all metered usage.", "t": "`$BOOLEAN`", "key$": "extra_spend_enabled", "index$": 11 }, "feature_enabled": { "a": true, "h": "Feature Enabled", "n": "feature_enabled", "r": true, "sh": "Whether the `billing` feature is on for this organization.", "t": "`$BOOLEAN`", "key$": "feature_enabled", "index$": 12 }, "monthly_cap_cents": { "a": true, "h": "Monthly Cap Cents", "n": "monthly_cap_cents", "r": false, "sh": "Null clears the budget.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "monthly_cap_cents", "index$": 13 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 14 }, "package": { "a": true, "h": "Package", "n": "package", "r": true, "t": "`$ANY`", "key$": "package", "index$": 15 }, "prepaid": { "a": true, "h": "Prepaid", "n": "prepaid", "r": true, "t": "`$ANY`", "key$": "prepaid", "index$": 16 }, "preview": { "a": true, "h": "Preview", "n": "preview", "r": true, "sh": "Metronome draft invoice and credits, or null.", "t": "`$ANY`", "key$": "preview", "index$": 17 }, "storage_usage": { "a": true, "h": "Storage Usage", "n": "storage_usage", "r": true, "t": "`$OBJECT`", "key$": "storage_usage", "index$": 18 }, "stripe": { "a": true, "h": "Stripe", "n": "stripe", "r": true, "t": "`$OBJECT`", "key$": "stripe", "index$": 19 }, "subscription": { "a": true, "h": "Subscription", "n": "subscription", "r": true, "t": "`$ANY`", "key$": "subscription", "index$": 20 }, "token_account": { "a": true, "h": "Token Account", "n": "token_account", "r": true, "t": "`$OBJECT`", "key$": "token_account", "index$": 21 } }, "name": "billing_budget", "op": { "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/organizations/{organization_id}/billing/budget", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/billing/budget", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "budget" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["monthly_cap_cents"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/billing/budget", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/billing/budget", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "budget" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "billing_budget", "name__orig": "billing_budget", "Name": "BillingBudget", "name_": "billing_budget", "name-": "billing-budget", "NAME": "BILLING_BUDGET", "index$": 126 }, { "active": true, "entity": "billing_budget", "key$": "BasicBillingBudgetFlow", "kind": "basic", "name": "BasicBillingBudgetFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "billing_budget_ref01", "srcdatavar": "billing_budget_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-billing_budget_ref01" } }], "v": [], "unreachable": true }] }, 'BillingBudget', { "PATCH /api/v1/organizations/{organization_id}/billing/budget": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/organizations/{organization_id}/billing/budget": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "monthly_cap_cents": { "type": ["integer", "null"], "description": "Null clears the budget.", "key$": "monthly_cap_cents" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "billing_budget.update.0": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/billing/budget" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let billing_budget_ref01_data = Object.values(setup.data.existing.billing_budget)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/billing_budget/BillingBudgetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['billing_budget01', 'billing_budget02', 'billing_budget03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_BILLING_BUDGET_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_BILLING_BUDGET_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_BILLING_BUDGET_ENTID'];
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
//# sourceMappingURL=BillingBudgetEntity.test.js.map