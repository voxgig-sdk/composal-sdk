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
(0, node_test_1.describe)('AutomationEventEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AutomationEvent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AutomationEvent().update({ "agent_id": 1, "automation_id": "x", "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'automation_event.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "r": true, "t": "`$STRING`", "key$": "action", "index$": 0 }, "can_manage": { "a": true, "h": "Can Manage", "n": "can_manage", "r": true, "t": "`$BOOLEAN`", "key$": "can_manage", "index$": 1 }, "can_manage_events": { "a": true, "h": "Can Manage Events", "n": "can_manage_events", "r": true, "sh": "Whether new event triggers can be attached or existing settings saved.", "t": "`$BOOLEAN`", "key$": "can_manage_events", "index$": 2 }, "can_run": { "a": true, "h": "Can Run", "n": "can_run", "r": true, "sh": "Whether the viewer can request a manual Temporal run", "t": "`$BOOLEAN`", "key$": "can_run", "index$": 3 }, "can_schedule": { "a": true, "h": "Can Schedule", "n": "can_schedule", "r": true, "t": "`$BOOLEAN`", "key$": "can_schedule", "index$": 4 }, "event_subscriptions": { "a": true, "h": "Event Subscriptions", "n": "event_subscriptions", "r": true, "t": "`$ARRAY`", "key$": "event_subscriptions", "index$": 5 }, "event_triggers": { "a": true, "h": "Event Triggers", "n": "event_triggers", "r": true, "t": "`$ARRAY`", "key$": "event_triggers", "index$": 6 }, "expected_revision": { "a": true, "h": "Expected Revision", "n": "expected_revision", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "expected_revision", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 8 }, "key": { "a": true, "h": "Key", "n": "key", "r": true, "t": "`$STRING`", "key$": "key", "index$": 9 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 10 }, "revision": { "a": true, "h": "Revision", "n": "revision", "r": true, "t": "`$INTEGER`", "key$": "revision", "index$": 11 }, "schedule": { "a": true, "h": "Schedule", "n": "schedule", "r": true, "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 4 }, "key$": "schedule", "index$": 12 }, "schedules": { "a": true, "h": "Schedules", "n": "schedules", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 1, "depth": 3 }, "key$": "schedules", "index$": 13 }, "settings": { "a": true, "h": "Settings", "n": "settings", "r": false, "t": "`$OBJECT`", "key$": "settings", "index$": 14 }, "subscription_key": { "a": true, "h": "Subscription Key", "n": "subscription_key", "r": true, "t": "`$STRING`", "key$": "subscription_key", "index$": 15 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "t": "`$OBJECT`", "union": { "branches": 12, "count": 14, "depth": 12 }, "key$": "version", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "automation_event", "op": { "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["action", "expected_revision", "settings", "subscription_key"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/events", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "agent_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "automation_id", "or": "automation_key", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/events", "q": { "exist": ["agent_id", "automation_id", "organization_id"] }, "r": { "param": { "automation_key": "automation_id", "id": "agent_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "agents" }, { "var": "agent_id" }, { "lit": "spark" }, { "lit": "automations" }, { "var": "automation_id" }, { "lit": "events" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.agent"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "automation_event", "name__orig": "automation_event", "Name": "AutomationEvent", "name_": "automation_event", "name-": "automation-event", "NAME": "AUTOMATION_EVENT", "index$": 115 }, { "active": true, "entity": "automation_event", "key$": "BasicAutomationEventFlow", "kind": "basic", "name": "BasicAutomationEventFlow", "param": {}, "step": [{ "a": false, "d": { "agent_id": "agent01", "organization_id": "organization01" }, "i": { "ref": "automation_event_ref01", "srcdatavar": "automation_event_ref01_data", "suffix": "_up0", "textfield": "action" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-automation_event_ref01" } }], "v": [], "unreachable": true }] }, 'AutomationEvent', { "PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/events": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["action", "expected_revision", "subscription_key"], "properties": { "action": { "type": "string", "enum": ["save", "pause", "resume", "remove"], "key$": "action" }, "expected_revision": { "type": ["string", "null"], "key$": "expected_revision" }, "settings": { "type": "object", "additionalProperties": false, "properties": { "version_id": { "type": "string" }, "input": { "type": "object", "additionalProperties": true }, "budgets": { "type": "object", "additionalProperties": false, "properties": { "run_budget_usd": {}, "run_budget_seconds": {}, "budget_usd": {}, "budget_period": {} } }, "daily_limit": { "type": "integer", "minimum": 1, "maximum": 1000 } }, "key$": "settings" }, "subscription_key": { "type": "string", "key$": "subscription_key" } }, "x-ref": "#/components/schemas/AgentAutomationEventChange" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "automation_key", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "automation_event.update.0": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/events" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let automation_event_ref01_data = Object.values(setup.data.existing.automation_event)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/automation_event/AutomationEventTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['automation_event01', 'automation_event02', 'automation_event03', 'organization01', 'organization02', 'organization03', 'agent01', 'agent02', 'agent03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_AUTOMATION_EVENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_AUTOMATION_EVENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_AUTOMATION_EVENT_ENTID'];
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
//# sourceMappingURL=AutomationEventEntity.test.js.map