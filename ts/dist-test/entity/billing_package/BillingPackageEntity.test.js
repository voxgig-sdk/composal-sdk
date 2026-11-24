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
(0, node_test_1.describe)('BillingPackageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.BillingPackage();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('billing_package hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.ComposalSDK.test(offline).BillingPackage().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.ComposalSDK.test(offline).BillingPackage()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.BillingPackage().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.ComposalSDK.test().BillingPackage().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.ComposalSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.BillingPackage().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.BillingPackage().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.BillingPackage().list({ "base_price_cents": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'billing_package.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "addons": { "a": true, "h": "Addons", "n": "addons", "r": true, "t": "`$ARRAY`", "key$": "addons", "index$": 0 }, "base_price_cents": { "a": true, "h": "Base Price Cents", "n": "base_price_cents", "r": true, "t": "`$INTEGER`", "key$": "base_price_cents", "index$": 1 }, "billing_interval": { "a": true, "h": "Billing Interval", "n": "billing_interval", "r": true, "t": "`$STRING`", "key$": "billing_interval", "index$": 2 }, "billing_policy": { "a": true, "h": "Billing Policy", "n": "billing_policy", "r": true, "t": "`$STRING`", "key$": "billing_policy", "index$": 3 }, "ci_included_spend_cents": { "a": true, "h": "Ci Included Spend Cents", "n": "ci_included_spend_cents", "r": false, "sh": "Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive.", "t": "`$INTEGER`", "key$": "ci_included_spend_cents", "index$": 4 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "t": "`$STRING`", "key$": "currency", "index$": 5 }, "key": { "a": true, "h": "Key", "n": "key", "r": true, "t": "`$STRING`", "key$": "key", "index$": 6 }, "max_seats": { "a": true, "h": "Max Seats", "n": "max_seats", "r": false, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "max_seats", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 8 }, "pay_as_you_go_enabled": { "a": true, "h": "Pay As You Go Enabled", "n": "pay_as_you_go_enabled", "r": true, "t": "`$BOOLEAN`", "key$": "pay_as_you_go_enabled", "index$": 9 }, "rates": { "a": true, "h": "Rates", "n": "rates", "r": true, "t": "`$ARRAY`", "key$": "rates", "index$": 10 }, "revision": { "a": true, "h": "Revision", "n": "revision", "r": true, "t": "`$INTEGER`", "key$": "revision", "index$": 11 }, "roder_daily_run_limit": { "a": true, "h": "Roder Daily Run Limit", "n": "roder_daily_run_limit", "r": false, "t": "`$INTEGER`", "key$": "roder_daily_run_limit", "index$": 12 }, "roder_run_concurrency_limit": { "a": true, "h": "Roder Run Concurrency Limit", "n": "roder_run_concurrency_limit", "r": false, "t": "`$INTEGER`", "key$": "roder_run_concurrency_limit", "index$": 13 }, "seat_price_cents": { "a": true, "h": "Seat Price Cents", "n": "seat_price_cents", "r": true, "t": "`$INTEGER`", "key$": "seat_price_cents", "index$": 14 }, "trial_days": { "a": true, "h": "Trial Days", "n": "trial_days", "r": true, "t": "`$INTEGER`", "key$": "trial_days", "index$": 15 }, "visibility": { "a": true, "h": "Visibility", "n": "visibility", "r": true, "t": "`$STRING`", "key$": "visibility", "index$": 16 } }, "name": "billing_package", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/billing/packages", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/billing/packages", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "billing" }, { "lit": "packages" }], "t": { "req": "`reqdata`", "res": "`body.packages`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "billing_package", "name__orig": "billing_package", "Name": "BillingPackage", "name_": "billing_package", "name-": "billing-package", "NAME": "BILLING_PACKAGE", "index$": 128 }, { "active": true, "entity": "billing_package", "key$": "BasicBillingPackageFlow", "kind": "basic", "name": "BasicBillingPackageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "billing_package_ref01" } }], "index$": 0 }] }, 'BillingPackage', { "GET /api/v1/billing/packages": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let billing_package_ref01_data = Object.values(setup.data.existing.billing_package)[0];
        // LIST
        const billing_package_ref01_ent = client.BillingPackage();
        const billing_package_ref01_match = {};
        const billing_package_ref01_list = (await billing_package_ref01_ent.list(billing_package_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/billing_package/BillingPackageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['billing_package01', 'billing_package02', 'billing_package03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_BILLING_PACKAGE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_BILLING_PACKAGE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_BILLING_PACKAGE_ENTID'];
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
//# sourceMappingURL=BillingPackageEntity.test.js.map