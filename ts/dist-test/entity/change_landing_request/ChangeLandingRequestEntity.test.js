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
(0, node_test_1.describe)('ChangeLandingRequestEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ChangeLandingRequest();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ChangeLandingRequest().create({ "change_id": 1, "organization_id": "x", "repo_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'change_landing_request.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "change_ids": { "a": true, "h": "Change Ids", "n": "change_ids", "r": false, "t": "`$ARRAY`", "key$": "change_ids", "index$": 0 }, "count": { "a": true, "h": "Count", "n": "count", "r": true, "t": "`$INTEGER`", "key$": "count", "index$": 1 }, "defer_until_ready": { "a": true, "h": "Defer Until Ready", "n": "defer_until_ready", "r": false, "sh": "Admit the request while approvals or checks are pending", "t": "`$BOOLEAN`", "key$": "defer_until_ready", "index$": 2 }, "expected_requirement_version": { "a": true, "h": "Expected Requirement Version", "n": "expected_requirement_version", "r": false, "t": "`$STRING`", "key$": "expected_requirement_version", "index$": 3 }, "expected_scope_version": { "a": true, "h": "Expected Scope Version", "n": "expected_scope_version", "r": false, "t": "`$STRING`", "key$": "expected_scope_version", "index$": 4 }, "head_change_id": { "a": true, "h": "Head Change Id", "n": "head_change_id", "r": false, "t": "`$STRING`", "key$": "head_change_id", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "id", "index$": 6 }, "numbers": { "a": true, "h": "Numbers", "n": "numbers", "r": true, "t": "`$ARRAY`", "key$": "numbers", "index$": 7 }, "override_acknowledged": { "a": true, "h": "Override Acknowledged", "n": "override_acknowledged", "r": false, "t": "`$BOOLEAN`", "key$": "override_acknowledged", "index$": 8 }, "override_codes": { "a": true, "h": "Override Codes", "n": "override_codes", "r": false, "t": "`$ARRAY`", "key$": "override_codes", "index$": 9 }, "position": { "a": true, "h": "Position", "n": "position", "r": false, "t": "`$INTEGER`", "key$": "position", "index$": 10 }, "priority": { "a": true, "h": "Priority", "n": "priority", "r": false, "t": "`$STRING`", "key$": "priority", "index$": 11 }, "scope_version": { "a": true, "h": "Scope Version", "n": "scope_version", "r": true, "t": "`$STRING`", "key$": "scope_version", "index$": 12 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "t": "`$STRING`", "key$": "state", "index$": 13 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "t": "`$INTEGER`", "key$": "version", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "change_landing_request", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["defer_until_ready", "expected_requirement_version", "expected_scope_version", "override_acknowledged", "override_codes", "priority"], "co": { "id": "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "change_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests", "q": { "exist": ["change_id", "organization_id", "repo_id"] }, "r": { "param": { "id": "change_id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "var": "change_id" }, { "lit": "landing_requests" }], "t": { "req": "`reqdata`", "res": "`body.request`" }, "index$": 0 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "bf": ["expected_version"], "co": { "id": "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests/{entry_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "change_id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "entry_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_id", "or": "org_slug", "r": true, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "param", "n": "repo_id", "or": "repo_slug", "r": true, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests/{entry_id}", "q": { "exist": ["change_id", "id", "organization_id", "repo_id"] }, "r": { "param": { "entry_id": "id", "id": "change_id", "org_slug": "organization_id", "repo_slug": "repo_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "repos" }, { "var": "repo_id" }, { "lit": "vcs" }, { "lit": "changes" }, { "var": "change_id" }, { "lit": "landing_requests" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.repo", "$.main.kit.entity.change"]] }, "key$": "change_landing_request", "name__orig": "change_landing_request", "Name": "ChangeLandingRequest", "name_": "change_landing_request", "name-": "change-landing-request", "NAME": "CHANGE_LANDING_REQUEST", "index$": 162 }, { "active": true, "entity": "change_landing_request", "key$": "BasicChangeLandingRequestFlow", "kind": "basic", "name": "BasicChangeLandingRequestFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "change_landing_request_ref01" }, "m": { "change_id": "change01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "change_landing_request_ref01", "suffix": "_rm0" }, "m": { "change_id": "change01", "id": "change_landing_request01", "organization_id": "organization01", "repo_id": "repo01" }, "o": "remove", "s": [], "v": [], "index$": 1 }] }, 'ChangeLandingRequest', { "POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "expected_scope_version": { "type": "string", "key$": "expected_scope_version" }, "override_acknowledged": { "type": "boolean", "key$": "override_acknowledged" }, "expected_requirement_version": { "type": "string", "key$": "expected_requirement_version" }, "override_codes": { "type": "array", "items": { "type": "string" }, "key$": "override_codes" }, "priority": { "type": "string", "enum": ["normal", "high"], "default": "normal", "key$": "priority" }, "defer_until_ready": { "type": "boolean", "description": "Admit the request while approvals or checks are pending", "key$": "defer_until_ready" } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] }, "DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests/{entry_id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["expected_version"], "properties": { "expected_version": { "type": "integer", "minimum": 1 } } } } } }, "parameters": [{ "name": "org_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "repo_slug", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }, { "name": "entry_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "change_landing_request.create.0": "GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests", "change_landing_request.remove.1": "GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/landing_requests/{entry_id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const change_landing_request_ref01_ent = client.ChangeLandingRequest();
        let change_landing_request_ref01_data = setup.data.new.change_landing_request['change_landing_request_ref01'];
        change_landing_request_ref01_data['change_id'] = setup.idmap['change01'];
        change_landing_request_ref01_data['organization_id'] = setup.idmap['organization01'];
        change_landing_request_ref01_data['repo_id'] = setup.idmap['repo01'];
        change_landing_request_ref01_data = (await change_landing_request_ref01_ent.create(change_landing_request_ref01_data)).data();
        (0, node_assert_1.default)(null != change_landing_request_ref01_data.id);
        // REMOVE
        const change_landing_request_ref01_match_rm0 = { id: change_landing_request_ref01_data.id };
        change_landing_request_ref01_match_rm0['change_id'] = setup.idmap['change_id'] ?? setup.idmap['change01'];
        change_landing_request_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        change_landing_request_ref01_match_rm0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01'];
        await change_landing_request_ref01_ent.remove(change_landing_request_ref01_match_rm0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/change_landing_request/ChangeLandingRequestTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['change_landing_request01', 'change_landing_request02', 'change_landing_request03', 'organization01', 'organization02', 'organization03', 'repo01', 'repo02', 'repo03', 'change01', 'change02', 'change03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CHANGE_LANDING_REQUEST_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CHANGE_LANDING_REQUEST_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CHANGE_LANDING_REQUEST_ENTID'];
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
//# sourceMappingURL=ChangeLandingRequestEntity.test.js.map