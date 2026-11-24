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
(0, node_test_1.describe)('VcStackEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.VcStack();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.VcStack().list({ "organization_id": 1, "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vc_stack.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "alias_ref_name": { "a": true, "h": "Alias Ref Name", "n": "alias_ref_name", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "alias_ref_name", "index$": 0 }, "changes": { "a": true, "h": "Changes", "n": "changes", "r": true, "t": "`$ARRAY`", "key$": "changes", "index$": 1 }, "code": { "a": true, "h": "Code", "n": "code", "r": true, "t": "`$STRING`", "key$": "code", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 3 }, "landing": { "a": true, "h": "Landing", "n": "landing", "r": true, "sh": "Compact landing state for the Stack CLI.", "t": "`$OBJECT`", "key$": "landing", "index$": 4 }, "member_count": { "a": true, "h": "Member Count", "n": "member_count", "r": true, "t": "`$INTEGER`", "key$": "member_count", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "name", "index$": 6 }, "ref_name": { "a": true, "h": "Ref Name", "n": "ref_name", "r": true, "t": "`$STRING`", "key$": "ref_name", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 8 }, "tip_change_number": { "a": true, "h": "Tip Change Number", "n": "tip_change_number", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "tip_change_number", "index$": 9 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 10 }, "updated_at_label": { "a": true, "h": "Updated At Label", "n": "updated_at_label", "r": true, "t": "`$STRING`", "key$": "updated_at_label", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "vc_stack", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks", "q": { "exist": ["organization_id", "repo_id"] }, "r": { "param": { "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "stacks" }], "t": { "req": "`reqdata`", "res": "`body.stacks`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "code", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "code", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}", "q": { "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "code": "id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "stacks" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.stack`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["name"], "co": { "id": "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "code", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "code", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name", "q": { "$action": "name", "exist": ["id", "organization_id", "repo_id"] }, "r": { "param": { "code": "id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "stacks" }, { "var": "id" }, { "lit": "name" }], "t": { "req": "`reqdata`", "res": "`body.stack`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo"]] }, "key$": "vc_stack", "name__orig": "vc_stack", "Name": "VcStack", "name_": "vc_stack", "name-": "vc-stack", "NAME": "VC_STACK", "index$": 532 }, { "active": true, "entity": "vc_stack", "key$": "BasicVcStackFlow", "kind": "basic", "name": "BasicVcStackFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01", "repo_id": "repo01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vc_stack_ref01" } }], "index$": 0 }, { "a": false, "d": { "organization_id": "organization01", "repo_id": "repo01" }, "i": { "ref": "vc_stack_ref01", "srcdatavar": "vc_stack_ref01_data", "suffix": "_up0", "textfield": "alias_ref_name" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vc_stack_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "vc_stack_ref01", "srcdatavar": "vc_stack_ref01_data", "suffix": "_dt0" }, "m": { "id": "vc_stack01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vc_stack_ref01" } }], "index$": 1, "route": "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}", "record": {} }] }, 'VcStack', { "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}": { "protocol": "http", "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "code", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "code", "in": "path", "required": true, "schema": { "type": "string", "pattern": "^[A-Za-z0-9]{4}$" }, "index$": 3 }] }, "PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["name"], "properties": { "name": { "type": "string", "nullable": true } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "code", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "code", "in": "path", "required": true, "schema": { "type": "string", "pattern": "^[A-Za-z0-9]{4}$" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "vc_stack.update.1": "GET-only live run: needs PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vc_stack_ref01_data = Object.values(setup.data.existing.vc_stack)[0];
        // LIST
        const vc_stack_ref01_ent = client.VcStack();
        const vc_stack_ref01_match = {};
        vc_stack_ref01_match['organization_id'] = setup.idmap['organization01'];
        vc_stack_ref01_match['repo_id'] = setup.idmap['repo01'];
        const vc_stack_ref01_list = (await vc_stack_ref01_ent.list(vc_stack_ref01_match)).map((e) => e.data());
        // LOAD
        const vc_stack_ref01_match_dt0 = {};
        vc_stack_ref01_match_dt0.id = vc_stack_ref01_data.id;
        vc_stack_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        vc_stack_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        const vc_stack_ref01_data_dt0 = (await vc_stack_ref01_ent.load(vc_stack_ref01_match_dt0)).data();
        (0, node_assert_1.default)(vc_stack_ref01_data_dt0.id === vc_stack_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vc_stack/VcStackTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vc_stack01', 'vc_stack02', 'vc_stack03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_VC_STACK_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_VC_STACK_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_VC_STACK_ENTID'];
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
//# sourceMappingURL=VcStackEntity.test.js.map