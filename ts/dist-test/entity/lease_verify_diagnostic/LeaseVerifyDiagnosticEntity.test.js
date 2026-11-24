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
(0, node_test_1.describe)('LeaseVerifyDiagnosticEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.LeaseVerifyDiagnostic();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LeaseVerifyDiagnostic().create({ "lease_id": 1, "swarm_id": "x", "task_id": "x", "browser_events": "x", "live_browser": "x", "live_view": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'lease_verify_diagnostic.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "browser_events": { "a": true, "h": "Browser Events", "n": "browser_events", "r": true, "t": "`$OBJECT`", "key$": "browser_events", "index$": 0 }, "live_browser": { "a": true, "h": "Live Browser", "n": "live_browser", "r": true, "t": "`$OBJECT`", "key$": "live_browser", "index$": 1 }, "live_view": { "a": true, "h": "Live View", "n": "live_view", "r": true, "sh": "The tester's read-only live stream for page viewers.", "t": "`$OBJECT`", "key$": "live_view", "index$": 2 }, "steps": { "a": true, "h": "Steps", "n": "steps", "r": false, "t": "`$ARRAY`", "key$": "steps", "index$": 3 } }, "name": "lease_verify_diagnostic", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["browser_events", "live_browser", "live_view", "steps"], "co": { "id": "POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "x_vex_lease_token", "or": "X-Vex-Lease-Token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "lease_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "swarm_id", "or": "swarm_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "task_id", "or": "task_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics", "q": { "exist": ["lease_id", "swarm_id", "task_id", "x_vex_lease_token"] }, "r": { "param": { "id": "lease_id", "swarm_id": "swarm_id", "task_id": "task_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "agent" }, { "lit": "swarms" }, { "var": "swarm_id" }, { "lit": "tasks" }, { "var": "task_id" }, { "lit": "leases" }, { "var": "lease_id" }, { "lit": "verify_diagnostics" }], "t": { "req": { "browser_events": "`reqdata.browser_event`", "live_browser": "`reqdata.live_browser`", "live_view": "`reqdata.live_view`", "steps": "`reqdata.step`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "lease_verify_diagnostic", "name__orig": "lease_verify_diagnostic", "Name": "LeaseVerifyDiagnostic", "name_": "lease_verify_diagnostic", "name-": "lease-verify-diagnostic", "NAME": "LEASE_VERIFY_DIAGNOSTIC", "index$": 294 }, { "active": true, "entity": "lease_verify_diagnostic", "key$": "BasicLeaseVerifyDiagnosticFlow", "kind": "basic", "name": "BasicLeaseVerifyDiagnosticFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "lease_verify_diagnostic_ref01" }, "m": { "lease_id": "lease01", "swarm_id": "swarm01", "task_id": "task01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'LeaseVerifyDiagnostic', { "POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "required": ["browser_events"], "properties": { "browser_events": { "type": "object", "additionalProperties": true, "key$": "browser_events" }, "steps": { "type": "array", "maxItems": 200, "items": { "type": "object", "additionalProperties": false, "required": ["id", "status", "start_ms", "duration_ms"], "properties": { "id": { "type": "string", "pattern": "^[A-Za-z0-9][A-Za-z0-9_-]{1,127}$" }, "status": { "type": "string", "enum": [] }, "start_ms": { "type": "integer", "minimum": 0, "maximum": 86400000 }, "duration_ms": { "type": "integer", "minimum": 0, "maximum": 86400000 }, "safe_error": { "type": "string", "maxLength": 1000 } } }, "key$": "steps" }, "live_view": { "type": "object", "description": "The tester's read-only live stream for page viewers.", "additionalProperties": false, "required": ["url", "token"], "properties": { "url": { "type": "string", "format": "uri" }, "token": { "type": "string", "pattern": "^view_[a-f0-9]{32}$" }, "cdp_token": { "type": "string", "description": "Opens full Chrome DevTools on the tester; sent only when its runner serves DevTools, and shown only to people who may run tests.", "pattern": "^cdp_[a-f0-9]{32}$" } }, "key$": "live_view" }, "live_browser": { "type": "object", "additionalProperties": false, "required": ["captured_at", "url", "action", "completed_steps", "image"], "properties": { "captured_at": { "type": "string", "format": "date-time" }, "url": { "type": "string", "maxLength": 1000 }, "action": { "type": "string", "maxLength": 1000 }, "completed_steps": { "type": "integer", "minimum": 0, "maximum": 1000 }, "image": { "type": "string", "nullable": true, "maxLength": 200023 } }, "key$": "live_browser" } } } } } }, "parameters": [{ "name": "swarm_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "task_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "X-Vex-Lease-Token", "in": "header", "required": true, "schema": { "type": "string" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "lease_verify_diagnostic.create.0": "GET-only live run: needs POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const lease_verify_diagnostic_ref01_ent = client.LeaseVerifyDiagnostic();
        let lease_verify_diagnostic_ref01_data = setup.data.new.lease_verify_diagnostic['lease_verify_diagnostic_ref01'];
        lease_verify_diagnostic_ref01_data['lease_id'] = setup.idmap['lease01'];
        lease_verify_diagnostic_ref01_data['swarm_id'] = setup.idmap['swarm01'];
        lease_verify_diagnostic_ref01_data['task_id'] = setup.idmap['task01'];
        lease_verify_diagnostic_ref01_data = (await lease_verify_diagnostic_ref01_ent.create(lease_verify_diagnostic_ref01_data)).data();
        (0, node_assert_1.default)(null != lease_verify_diagnostic_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/lease_verify_diagnostic/LeaseVerifyDiagnosticTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['lease_verify_diagnostic01', 'lease_verify_diagnostic02', 'lease_verify_diagnostic03', 'lease01', 'swarm01', 'task01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID'];
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
//# sourceMappingURL=LeaseVerifyDiagnosticEntity.test.js.map