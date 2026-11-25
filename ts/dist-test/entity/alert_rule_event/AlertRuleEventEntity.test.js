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
(0, node_test_1.describe)('AlertRuleEventEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.AlertRuleEvent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AlertRuleEvent().load({ "alert_rule_id": 1, "space_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'alert_rule_event.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "alert_rule_event", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "alert_rule_id", "or": "alert_rule_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "space_id", "or": "space_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge", "q": { "$action": "acknowledge", "exist": ["alert_rule_id", "id", "space_id"] }, "r": { "param": { "alert_rule_id": "alert_rule_id", "id": "id", "space_id": "space_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "observability" }, { "lit": "spaces" }, { "var": "space_id" }, { "lit": "alert_rules" }, { "var": "alert_rule_id" }, { "lit": "events" }, { "var": "id" }, { "lit": "acknowledge" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/resolve", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "alert_rule_id", "or": "alert_rule_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "space_id", "or": "space_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/resolve", "q": { "$action": "resolve", "exist": ["alert_rule_id", "id", "space_id"] }, "r": { "param": { "alert_rule_id": "alert_rule_id", "id": "id", "space_id": "space_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "observability" }, { "lit": "spaces" }, { "var": "space_id" }, { "lit": "alert_rules" }, { "var": "alert_rule_id" }, { "lit": "events" }, { "var": "id" }, { "lit": "resolve" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/silence", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "alert_rule_id", "or": "alert_rule_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "space_id", "or": "space_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/silence", "q": { "$action": "silence", "exist": ["alert_rule_id", "id", "space_id"] }, "r": { "param": { "alert_rule_id": "alert_rule_id", "id": "id", "space_id": "space_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "observability" }, { "lit": "spaces" }, { "var": "space_id" }, { "lit": "alert_rules" }, { "var": "alert_rule_id" }, { "lit": "events" }, { "var": "id" }, { "lit": "silence" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "alert_rule_id", "or": "alert_rule_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "space_id", "or": "space_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events", "q": { "exist": ["alert_rule_id", "space_id"] }, "r": { "param": { "alert_rule_id": "alert_rule_id", "space_id": "space_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "observability" }, { "lit": "spaces" }, { "var": "space_id" }, { "lit": "alert_rules" }, { "var": "alert_rule_id" }, { "lit": "events" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "alert_rule_id", "or": "alert_rule_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "space_id", "or": "space_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}", "q": { "exist": ["alert_rule_id", "id", "space_id"] }, "r": { "param": { "alert_rule_id": "alert_rule_id", "id": "id", "space_id": "space_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "observability" }, { "lit": "spaces" }, { "var": "space_id" }, { "lit": "alert_rules" }, { "var": "alert_rule_id" }, { "lit": "events" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "alert_rule_id", "or": "alert_rule_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "space_id", "or": "space_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events", "q": { "exist": ["alert_rule_id", "space_id"] }, "r": { "param": { "alert_rule_id": "alert_rule_id", "space_id": "space_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "observability" }, { "lit": "spaces" }, { "var": "space_id" }, { "lit": "alert_rules" }, { "var": "alert_rule_id" }, { "lit": "events" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "alert_rule_id", "or": "alert_rule_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "space_id", "or": "space_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}", "q": { "exist": ["alert_rule_id", "id", "space_id"] }, "r": { "param": { "alert_rule_id": "alert_rule_id", "id": "id", "space_id": "space_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "observability" }, { "lit": "spaces" }, { "var": "space_id" }, { "lit": "alert_rules" }, { "var": "alert_rule_id" }, { "lit": "events" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "alert_rule_event", "name__orig": "alert_rule_event", "Name": "AlertRuleEvent", "name_": "alert_rule_event", "name-": "alert-rule-event", "NAME": "ALERT_RULE_EVENT", "index$": 73 }, { "active": true, "entity": "alert_rule_event", "key$": "BasicAlertRuleEventFlow", "kind": "basic", "name": "BasicAlertRuleEventFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "alert_rule_event_ref01" }, "m": { "alert_rule_id": "alert_rule01", "space_id": "space01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "alert_rule_event_ref01", "srcdatavar": "alert_rule_event_ref01_data", "suffix": "_dt0" }, "m": { "id": "alert_rule_event01", "space_id": "space01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-alert_rule_event_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "alert_rule_event_ref01", "suffix": "_rm0" }, "m": { "alert_rule_id": "alert_rule01", "id": "alert_rule_event01", "space_id": "space01" }, "o": "remove", "s": [], "v": [], "index$": 2 }] }, 'AlertRuleEvent', { "POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "space_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "alert_rule_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/resolve": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "space_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "alert_rule_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/silence": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "space_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "alert_rule_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "space_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "alert_rule_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}": { "protocol": "http", "parameters": [{ "name": "space_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "alert_rule_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events": { "protocol": "http", "parameters": [{ "name": "space_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "alert_rule_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}": { "protocol": "http", "parameters": [{ "name": "space_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "alert_rule_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "alert_rule_event.create.0": "GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge", "alert_rule_event.load.1": "GET-only live run: reads a record only alert_rule_event.create.0 gives", "alert_rule_event.remove.2": "GET-only live run: needs DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const alert_rule_event_ref01_ent = client.AlertRuleEvent();
        let alert_rule_event_ref01_data = setup.data.new.alert_rule_event['alert_rule_event_ref01'];
        alert_rule_event_ref01_data['alert_rule_id'] = setup.idmap['alert_rule01'];
        alert_rule_event_ref01_data['space_id'] = setup.idmap['space01'];
        alert_rule_event_ref01_data = (await alert_rule_event_ref01_ent.create(alert_rule_event_ref01_data)).data();
        (0, node_assert_1.default)(null != alert_rule_event_ref01_data.id);
        // LOAD
        const alert_rule_event_ref01_match_dt0 = {};
        alert_rule_event_ref01_match_dt0.id = alert_rule_event_ref01_data.id;
        alert_rule_event_ref01_match_dt0['space_id'] = setup.idmap['space_id'] ?? setup.idmap['space01'];
        const alert_rule_event_ref01_data_dt0 = (await alert_rule_event_ref01_ent.load(alert_rule_event_ref01_match_dt0)).data();
        (0, node_assert_1.default)(alert_rule_event_ref01_data_dt0.id === alert_rule_event_ref01_data.id);
        // REMOVE
        const alert_rule_event_ref01_match_rm0 = { id: alert_rule_event_ref01_data.id };
        alert_rule_event_ref01_match_rm0['alert_rule_id'] = setup.idmap['alert_rule_id'] ?? setup.idmap['alert_rule01'];
        alert_rule_event_ref01_match_rm0['space_id'] = setup.idmap['space_id'] ?? setup.idmap['space01'];
        await alert_rule_event_ref01_ent.remove(alert_rule_event_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/alert_rule_event/AlertRuleEventTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['alert_rule_event01', 'alert_rule_event02', 'alert_rule_event03', 'alert_rule01', 'space01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID'];
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
//# sourceMappingURL=AlertRuleEventEntity.test.js.map