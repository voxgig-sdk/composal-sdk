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
(0, node_test_1.describe)('AdminOrgEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AdminOrg();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AdminOrg().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'admin_org.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "billing_email": { "a": true, "h": "Billing Email", "n": "billing_email", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "billing_email", "index$": 0 }, "billing_reason": { "a": true, "h": "Billing Reason", "n": "billing_reason", "r": false, "sh": "Required when setting an agreed price", "t": "`$STRING`", "key$": "billing_reason", "index$": 1 }, "customize_onboarding_packages": { "a": true, "h": "Customize Onboarding Packages", "n": "customize_onboarding_packages", "r": false, "t": "`$BOOLEAN`", "key$": "customize_onboarding_packages", "index$": 2 }, "deployment_usage_visibility": { "a": true, "h": "Deployment Usage Visibility", "n": "deployment_usage_visibility", "r": true, "t": "`$STRING`", "key$": "deployment_usage_visibility", "index$": 3 }, "deployment_usage_visible": { "a": true, "h": "Deployment Usage Visible", "n": "deployment_usage_visible", "r": true, "t": "`$BOOLEAN`", "key$": "deployment_usage_visible", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "monthly_price_dollars": { "a": true, "h": "Monthly Price Dollars", "n": "monthly_price_dollars", "r": false, "sh": "Ongoing USD workspace price, for example '50.00'", "t": ["`$ONE`", ["`$STRING`", "`$NUMBER`"]], "key$": "monthly_price_dollars", "index$": 6 }, "monthly_price_override_cents": { "a": true, "h": "Monthly Price Override Cents", "n": "monthly_price_override_cents", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "monthly_price_override_cents", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 8 }, "onboarding_custom_pricing": { "a": true, "h": "Onboarding Custom Pricing", "n": "onboarding_custom_pricing", "r": false, "t": "`$BOOLEAN`", "key$": "onboarding_custom_pricing", "index$": 9 }, "onboarding_package_keys": { "a": true, "h": "Onboarding Package Keys", "n": "onboarding_package_keys", "r": false, "sh": "Package keys offered when customizing onboarding.", "t": ["`$ONE`", ["`$ARRAY`", "`$NULL`"]], "key$": "onboarding_package_keys", "index$": 10 }, "owner_email": { "a": true, "fo": "email", "h": "Owner Email", "n": "owner_email", "r": true, "t": "`$STRING`", "key$": "owner_email", "index$": 11 }, "package_id": { "a": true, "h": "Package Id", "n": "package_id", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Active customer package public ID.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "package_id", "index$": 12 }, "skip_payment": { "a": true, "h": "Skip Payment", "n": "skip_payment", "r": false, "sh": "Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits.", "t": "`$BOOLEAN`", "key$": "skip_payment", "index$": 13 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "admin_org", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/admin/organizations/{org_slug}/checkout_session", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/admin/organizations/{org_slug}/checkout_session", "q": { "$action": "checkout_session", "exist": ["id"] }, "r": { "param": { "org_slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "admin" }, { "lit": "organizations" }, { "var": "id" }, { "lit": "checkout_session" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["billing_reason", "customize_onboarding_packages", "monthly_price_dollars", "name", "onboarding_custom_pricing", "onboarding_package_keys", "owner_email", "package_id", "skip_payment", "slug"], "co": { "id": "POST /api/v1/admin/organizations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/admin/organizations", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "admin" }, { "lit": "organizations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/admin/organizations/{org_slug}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/admin/organizations/{org_slug}", "q": { "exist": ["id"] }, "r": { "param": { "org_slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "admin" }, { "lit": "organizations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/admin/organizations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/v1/admin/organizations", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "admin" }, { "lit": "organizations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["monthly_price_dollars", "reason"], "co": { "id": "PUT /api/v1/admin/organizations/{org_slug}/billing_agreement", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/admin/organizations/{org_slug}/billing_agreement", "q": { "$action": "billing_agreement", "exist": ["id"] }, "r": { "param": { "org_slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "admin" }, { "lit": "organizations" }, { "var": "id" }, { "lit": "billing_agreement" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["billing_email"], "co": { "id": "PATCH /api/v1/admin/organizations/{org_slug}/billing_contact", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/admin/organizations/{org_slug}/billing_contact", "q": { "$action": "billing_contact", "exist": ["id"] }, "r": { "param": { "org_slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "admin" }, { "lit": "organizations" }, { "var": "id" }, { "lit": "billing_contact" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["package_id"], "co": { "id": "PUT /api/v1/admin/organizations/{org_slug}/package", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/admin/organizations/{org_slug}/package", "q": { "$action": "package", "exist": ["id"] }, "r": { "param": { "org_slug": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "admin" }, { "lit": "organizations" }, { "var": "id" }, { "lit": "package" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "admin_org", "name__orig": "admin_org", "Name": "AdminOrg", "name_": "admin_org", "name-": "admin-org", "NAME": "ADMIN_ORG", "index$": 1 }, { "active": true, "entity": "admin_org", "key$": "BasicAdminOrgFlow", "kind": "basic", "name": "BasicAdminOrgFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "admin_org_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "admin_org_ref01", "srcdatavar": "admin_org_ref01_data", "suffix": "_up0", "textfield": "billing_email" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-admin_org_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "admin_org_ref01", "srcdatavar": "admin_org_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-admin_org_ref01" } }], "index$": 1, "route": "GET /api/v1/admin/organizations/{org_slug}", "record": {} }] }, 'AdminOrg', { "POST /api/v1/admin/organizations/{org_slug}/checkout_session": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/admin/organizations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["name", "slug", "owner_email"], "properties": { "name": { "type": "string", "key$": "name" }, "slug": { "type": "string", "key$": "slug" }, "owner_email": { "type": "string", "format": "email", "key$": "owner_email" }, "package_id": { "type": "string", "description": "Active customer package public ID. Defaults to prepaid Entry unless an agreed monthly price is supplied.", "key$": "package_id" }, "customize_onboarding_packages": { "type": "boolean", "key$": "customize_onboarding_packages" }, "onboarding_package_keys": { "type": "array", "items": { "type": "string" }, "description": "Package keys offered when customizing onboarding.", "key$": "onboarding_package_keys" }, "onboarding_custom_pricing": { "type": "boolean", "key$": "onboarding_custom_pricing" }, "skip_payment": { "type": "boolean", "default": false, "description": "Grant the selected package as an ongoing complimentary subscription with monthly included usage and package limits. No card or checkout is required. Cannot be combined with an agreed monthly price.", "key$": "skip_payment" }, "monthly_price_dollars": { "type": ["string", "number"], "description": "Ongoing USD workspace price, for example '50.00'", "key$": "monthly_price_dollars" }, "billing_reason": { "type": "string", "description": "Required when setting an agreed price", "key$": "billing_reason" } } } } } }, "parameters": [] }, "GET /api/v1/admin/organizations/{org_slug}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/admin/organizations": { "protocol": "http", "parameters": [] }, "PUT /api/v1/admin/organizations/{org_slug}/billing_agreement": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["monthly_price_dollars", "reason"], "properties": { "monthly_price_dollars": { "type": ["string", "number"] }, "reason": { "type": "string", "maxLength": 500 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/admin/organizations/{org_slug}/billing_contact": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["billing_email"], "properties": { "billing_email": { "type": "string", "format": "email" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/admin/organizations/{org_slug}/package": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["package_id"], "properties": { "package_id": { "type": "string" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "admin_org.create.0": "GET-only live run: needs POST /api/v1/admin/organizations/{org_slug}/checkout_session", "admin_org.update.1": "GET-only live run: needs PUT /api/v1/admin/organizations/{org_slug}/billing_agreement", "admin_org.load.2": "GET-only live run: reads a record only admin_org.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const admin_org_ref01_ent = client.AdminOrg();
        let admin_org_ref01_data = setup.data.new.admin_org['admin_org_ref01'];
        admin_org_ref01_data = (await admin_org_ref01_ent.create(admin_org_ref01_data)).data();
        (0, node_assert_1.default)(null != admin_org_ref01_data.id);
        // LOAD
        const admin_org_ref01_match_dt0 = {};
        admin_org_ref01_match_dt0.id = admin_org_ref01_data.id;
        const admin_org_ref01_data_dt0 = (await admin_org_ref01_ent.load(admin_org_ref01_match_dt0)).data();
        (0, node_assert_1.default)(admin_org_ref01_data_dt0.id === admin_org_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/admin_org/AdminOrgTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['admin_org01', 'admin_org02', 'admin_org03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ADMIN_ORG_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ADMIN_ORG_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ADMIN_ORG_ENTID'];
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
//# sourceMappingURL=AdminOrgEntity.test.js.map