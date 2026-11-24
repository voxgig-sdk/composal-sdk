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
(0, node_test_1.describe)('ControlComputerControlOperationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ControlComputerControlOperation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ControlComputerControlOperation().load({ "control_computer_id": 1, "id": "x", "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'control_computer_control_operation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "action": { "a": true, "h": "Action", "n": "action", "r": true, "t": "`$STRING`", "key$": "action", "index$": 0 }, "arguments": { "a": true, "h": "Arguments", "n": "arguments", "r": true, "t": "`$OBJECT`", "key$": "arguments", "index$": 1 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 2 }, "delivery": { "a": true, "h": "Delivery", "n": "delivery", "r": true, "sh": "Present while a request waits on an offline computer and after it expires unclaimed: whether the computer is checking for requests and when it last did.", "t": "`$OBJECT`", "key$": "delivery", "index$": 3 }, "device_id": { "a": true, "h": "Device Id", "n": "device_id", "r": true, "t": "`$STRING`", "key$": "device_id", "index$": 4 }, "diagnostic_code": { "a": true, "h": "Diagnostic Code", "n": "diagnostic_code", "r": false, "sh": "Approved product error code retained after copied diagnostics expire.", "t": "`$STRING`", "key$": "diagnostic_code", "index$": 5 }, "end": { "a": true, "h": "End", "n": "end", "r": true, "t": "`$OBJECT`", "key$": "end", "index$": 6 }, "expires_at": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expires_at", "r": true, "t": "`$STRING`", "key$": "expires_at", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 8 }, "key": { "a": true, "h": "Key", "n": "key", "r": true, "t": "`$STRING`", "key$": "key", "index$": 9 }, "provider": { "a": true, "h": "Provider", "n": "provider", "r": true, "t": "`$STRING`", "key$": "provider", "index$": 10 }, "references": { "a": true, "h": "References", "n": "references", "r": true, "t": "`$OBJECT`", "key$": "references", "index$": 11 }, "result": { "a": true, "h": "Result", "n": "result", "r": true, "t": "`$ANY`", "union": { "branches": 10, "count": 1, "depth": 2 }, "key$": "result", "index$": 12 }, "result_expired": { "a": true, "h": "Result Expired", "n": "result_expired", "r": true, "sh": "Private cached prompts/results expire after one hour; intent digests and native references remain as replay fences.", "t": "`$BOOLEAN`", "key$": "result_expired", "index$": 13 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "t": "`$STRING`", "key$": "state", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "control_computer_control_operation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["action", "arguments", "key"], "co": { "id": "POST /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "control_computer_id", "or": "computer", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations", "q": { "exist": ["control_computer_id", "organization_id"] }, "r": { "param": { "computer": "control_computer_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "control_computers" }, { "var": "control_computer_id" }, { "lit": "control_operations" }], "t": { "req": "`reqdata`", "res": "`body.operation`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "control_computer_id", "or": "computer", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations/{id}", "q": { "exist": ["control_computer_id", "id", "organization_id"] }, "r": { "param": { "computer": "control_computer_id", "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "control_computers" }, { "var": "control_computer_id" }, { "lit": "control_operations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.operation`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations/request", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "control_computer_id", "or": "computer", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "request_key", "or": "request_key", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations/request", "q": { "$action": "request", "exist": ["control_computer_id", "organization_id", "request_key"] }, "r": { "param": { "computer": "control_computer_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "control_computers" }, { "var": "control_computer_id" }, { "lit": "control_operations" }, { "lit": "request" }], "t": { "req": "`reqdata`", "res": "`body.operation`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.control_computer"]] }, "key$": "control_computer_control_operation", "name__orig": "control_computer_control_operation", "Name": "ControlComputerControlOperation", "name_": "control_computer_control_operation", "name-": "control-computer-control-operation", "NAME": "CONTROL_COMPUTER_CONTROL_OPERATION", "index$": 185 }, { "active": true, "entity": "control_computer_control_operation", "key$": "BasicControlComputerControlOperationFlow", "kind": "basic", "name": "BasicControlComputerControlOperationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "control_computer_control_operation_ref01" }, "m": { "control_computer_id": "control_computer01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "control_computer_control_operation_ref01", "srcdatavar": "control_computer_control_operation_ref01_data", "suffix": "_dt0" }, "m": { "id": "control_computer_control_operation01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-control_computer_control_operation_ref01" } }], "index$": 1 }] }, 'ControlComputerControlOperation', { "POST /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "key": { "type": "string", "minLength": 1, "maxLength": 512, "key$": "key" }, "action": { "type": "string", "enum": ["agents.list", "threads.list", "threads.read", "threads.start", "threads.adopt", "threads.release", "threads.end", "turns.start", "turns.interrupt", "claude.agents.list", "claude.threads.list", "claude.threads.read", "claude.threads.start", "claude.threads.release", "claude.threads.end", "claude.turns.start", "claude.turns.interrupt", "threads.rename", "claude.threads.rename", "threads.archive", "threads.unarchive"], "key$": "action" }, "arguments": { "type": "object", "additionalProperties": true, "properties": { "result_delivery": { "type": "string", "enum": ["notify", "caller"], "description": "Structured source enrollment only; requires result_schema. notify preserves ordinary parent notifications. caller returns retained results to the workflow without another parent wake; explicit owner Always still reports the native final answer." } }, "key$": "arguments" } }, "required": ["key", "action", "arguments"], "additionalProperties": true, "x-ref": "#/components/schemas/DeviceControlInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "computer", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "computer", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "GET /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations/request": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "computer", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "request_key", "in": "query", "required": true, "description": "The original exact owner request key, from 1 to 512 UTF-8 bytes.", "schema": { "type": "string", "minLength": 1, "maxLength": 512 }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "control_computer_control_operation.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/control_computers/{computer}/control_operations", "control_computer_control_operation.load.1": "GET-only live run: reads a record only control_computer_control_operation.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const control_computer_control_operation_ref01_ent = client.ControlComputerControlOperation();
        let control_computer_control_operation_ref01_data = setup.data.new.control_computer_control_operation['control_computer_control_operation_ref01'];
        control_computer_control_operation_ref01_data['control_computer_id'] = setup.idmap['control_computer01'];
        control_computer_control_operation_ref01_data['organization_id'] = setup.idmap['organization01'];
        control_computer_control_operation_ref01_data = (await control_computer_control_operation_ref01_ent.create(control_computer_control_operation_ref01_data)).data();
        (0, node_assert_1.default)(null != control_computer_control_operation_ref01_data.id);
        // LOAD
        const control_computer_control_operation_ref01_match_dt0 = {};
        control_computer_control_operation_ref01_match_dt0.id = control_computer_control_operation_ref01_data.id;
        control_computer_control_operation_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const control_computer_control_operation_ref01_data_dt0 = (await control_computer_control_operation_ref01_ent.load(control_computer_control_operation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(control_computer_control_operation_ref01_data_dt0.id === control_computer_control_operation_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/control_computer_control_operation/ControlComputerControlOperationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['control_computer_control_operation01', 'control_computer_control_operation02', 'control_computer_control_operation03', 'organization01', 'organization02', 'organization03', 'control_computer01', 'control_computer02', 'control_computer03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CONTROL_COMPUTER_CONTROL_OPERATION_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CONTROL_COMPUTER_CONTROL_OPERATION_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CONTROL_COMPUTER_CONTROL_OPERATION_ENTID'];
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
//# sourceMappingURL=ControlComputerControlOperationEntity.test.js.map