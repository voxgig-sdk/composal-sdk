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
(0, node_test_1.describe)('BillingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Billing();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Billing().load({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'billing.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "addons": { "a": true, "h": "Addons", "n": "addons", "r": true, "t": "`$ARRAY`", "key$": "addons", "index$": 0 }, "breakdown": { "a": true, "h": "Breakdown", "n": "breakdown", "r": true, "sh": "The 24-hour live series with its provenance; null only when the rollup fallback itself failed.", "t": "`$ANY`", "key$": "breakdown", "index$": 1 }, "budget": { "a": true, "h": "Budget", "n": "budget", "r": true, "t": "`$ANY`", "key$": "budget", "index$": 2 }, "can_manage_contact": { "a": true, "h": "Can Manage Contact", "n": "can_manage_contact", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_contact", "index$": 3 }, "can_manage_extra_spend": { "a": true, "h": "Can Manage Extra Spend", "n": "can_manage_extra_spend", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_extra_spend", "index$": 4 }, "can_manage_local_subscription": { "a": true, "h": "Can Manage Local Subscription", "n": "can_manage_local_subscription", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_local_subscription", "index$": 5 }, "can_manage_payment_method": { "a": true, "h": "Can Manage Payment Method", "n": "can_manage_payment_method", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage_payment_method", "index$": 6 }, "can_set_up_billing": { "a": true, "h": "Can Set Up Billing", "n": "can_set_up_billing", "r": true, "t": "`$BOOLEAN`", "key$": "can_set_up_billing", "index$": 7 }, "customer": { "a": true, "h": "Customer", "n": "customer", "r": true, "t": "`$ANY`", "key$": "customer", "index$": 8 }, "deployment_usage_visible": { "a": true, "h": "Deployment Usage Visible", "n": "deployment_usage_visible", "r": true, "t": "`$BOOLEAN`", "key$": "deployment_usage_visible", "index$": 9 }, "entitlements": { "a": true, "h": "Entitlements", "n": "entitlements", "r": true, "t": "`$OBJECT`", "key$": "entitlements", "index$": 10 }, "extra_spend_enabled": { "a": true, "h": "Extra Spend Enabled", "n": "extra_spend_enabled", "r": true, "sh": "Organization consent to paid overages across all metered usage.", "t": "`$BOOLEAN`", "key$": "extra_spend_enabled", "index$": 11 }, "feature_enabled": { "a": true, "h": "Feature Enabled", "n": "feature_enabled", "r": true, "sh": "Whether the `billing` feature is on for this organization.", "t": "`$BOOLEAN`", "key$": "feature_enabled", "index$": 12 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 13 }, "package": { "a": true, "h": "Package", "n": "package", "r": true, "t": "`$ANY`", "key$": "package", "index$": 14 }, "prepaid": { "a": true, "h": "Prepaid", "n": "prepaid", "r": true, "t": "`$ANY`", "key$": "prepaid", "index$": 15 }, "preview": { "a": true, "h": "Preview", "n": "preview", "r": true, "sh": "Metronome draft invoice and credits, or null.", "t": "`$ANY`", "key$": "preview", "index$": 16 }, "storage_usage": { "a": true, "h": "Storage Usage", "n": "storage_usage", "r": true, "t": "`$OBJECT`", "key$": "storage_usage", "index$": 17 }, "stripe": { "a": true, "h": "Stripe", "n": "stripe", "r": true, "t": "`$OBJECT`", "key$": "stripe", "index$": 18 }, "subscription": { "a": true, "h": "Subscription", "n": "subscription", "r": true, "t": "`$ANY`", "key$": "subscription", "index$": 19 }, "token_account": { "a": true, "h": "Token Account", "n": "token_account", "r": true, "t": "`$OBJECT`", "key$": "token_account", "index$": 20 } }, "name": "billing", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/billing", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/billing", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }], "t": { "req": "`reqdata`", "res": "`body.addons`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/billing/usage", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/billing/usage", "q": { "$action": "usage", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "usage" }], "t": { "req": "`reqdata`", "res": "`body.meters`" }, "index$": 1 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/organizations/{organization_id}/billing/budget", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/billing/budget", "q": { "$action": "budget", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "budget" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["monthly_cap_cents"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/billing/budget", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/billing/budget", "q": { "$action": "budget", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "budget" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["billing_email"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/billing/contact", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/billing/contact", "q": { "$action": "contact", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "contact" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "PUT /api/v1/organizations/{organization_id}/billing/contact", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/billing/contact", "q": { "$action": "contact", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "contact" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": ["enabled", "monthly_cap_cents"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/billing/extra_spend", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/billing/extra_spend", "q": { "$action": "extra_spend", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "extra_spend" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "bf": ["enabled", "monthly_cap_cents"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/billing/extra_spend", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/billing/extra_spend", "q": { "$action": "extra_spend", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "extra_spend" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }, { "a": true, "bf": ["cancel_at_period_end"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/billing/subscription", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/billing/subscription", "q": { "$action": "subscription", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "subscription" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 6 }, { "a": true, "bf": false, "co": { "id": "PUT /api/v1/organizations/{organization_id}/billing/subscription", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/billing/subscription", "q": { "$action": "subscription", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "billing" }, { "lit": "subscription" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 7 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "billing", "name__orig": "billing", "Name": "Billing", "name_": "billing", "name-": "billing", "NAME": "BILLING", "index$": 124 }, { "active": true, "entity": "billing", "key$": "BasicBillingFlow", "kind": "basic", "name": "BasicBillingFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "billing_ref01", "srcdatavar": "billing_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-billing_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "billing_ref01", "srcdatavar": "billing_ref01_data", "suffix": "_dt0" }, "m": { "id": "billing01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-billing_ref01" } }], "unreachable": true }] }, 'Billing', { "GET /api/v1/organizations/{organization_id}/billing": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/billing/usage": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/organizations/{organization_id}/billing/budget": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/organizations/{organization_id}/billing/budget": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "monthly_cap_cents": { "type": ["integer", "null"], "description": "Null clears the budget." } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/organizations/{organization_id}/billing/contact": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["billing_email"], "properties": { "billing_email": { "type": "string", "format": "email" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/organizations/{organization_id}/billing/contact": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/organizations/{organization_id}/billing/extra_spend": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["enabled"], "properties": { "enabled": { "type": "boolean" }, "monthly_cap_cents": { "type": ["integer", "null"], "minimum": 1, "maximum": 2147483647, "description": "Monthly limit across all metered overages, excluding plan fees. Null removes the limit; omission preserves it." } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/organizations/{organization_id}/billing/extra_spend": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["enabled"], "properties": { "enabled": { "type": "boolean" }, "monthly_cap_cents": { "type": ["integer", "null"], "minimum": 1, "maximum": 2147483647, "description": "Monthly limit across all metered overages, excluding plan fees. Null removes the limit; omission preserves it." } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/organizations/{organization_id}/billing/subscription": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["cancel_at_period_end"], "properties": { "cancel_at_period_end": { "type": "boolean" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/organizations/{organization_id}/billing/subscription": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "billing.update.0": "GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/billing/budget" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let billing_ref01_data = Object.values(setup.data.existing.billing)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/billing/BillingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['billing01', 'billing02', 'billing03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_BILLING_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_BILLING_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_BILLING_ENTID'];
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
//# sourceMappingURL=BillingEntity.test.js.map