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
(0, node_test_1.describe)('GithubRunnerPoolEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.GithubRunnerPool();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.GithubRunnerPool().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'github_runner_pool.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cpu_millicores": { "a": true, "h": "Cpu Millicores", "n": "cpu_millicores", "r": true, "t": "`$INTEGER`", "key$": "cpu_millicores", "index$": 0 }, "enabled": { "a": true, "h": "Enabled", "n": "enabled", "op": { "create": { "req": false, "type": "`$BOOLEAN`" }, "update": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "enabled", "index$": 1 }, "github_app_installation_id": { "a": true, "h": "Github App Installation Id", "n": "github_app_installation_id", "r": true, "t": "`$STRING`", "key$": "github_app_installation_id", "index$": 2 }, "github_repository_id": { "a": true, "h": "Github Repository Id", "n": "github_repository_id", "r": true, "t": "`$STRING`", "key$": "github_repository_id", "index$": 3 }, "github_runner_image": { "a": true, "h": "Github Runner Image", "n": "github_runner_image", "r": true, "t": "`$ANY`", "key$": "github_runner_image", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 5 }, "image": { "a": true, "h": "Image", "n": "image", "r": false, "sh": "Organization image name or ID; null restores the standard image", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "image", "index$": 6 }, "invocations": { "a": true, "h": "Invocations", "n": "invocations", "r": true, "t": "`$ARRAY`", "key$": "invocations", "index$": 7 }, "label": { "a": true, "h": "Label", "n": "label", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "label", "index$": 8 }, "last_error": { "a": true, "h": "Last Error", "n": "last_error", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_error", "index$": 9 }, "last_polled_at": { "a": true, "h": "Last Polled At", "n": "last_polled_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "last_polled_at", "index$": 10 }, "max_concurrency": { "a": true, "h": "Max Concurrency", "n": "max_concurrency", "op": { "create": { "req": false, "type": "`$INTEGER`" }, "update": { "req": false, "type": "`$INTEGER`" } }, "r": true, "t": "`$INTEGER`", "key$": "max_concurrency", "index$": 11 }, "memory_mb": { "a": true, "h": "Memory Mb", "n": "memory_mb", "r": true, "t": "`$INTEGER`", "key$": "memory_mb", "index$": 12 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 13 }, "provider": { "a": true, "h": "Provider", "n": "provider", "op": { "create": { "req": false, "type": "`$STRING`" }, "update": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "provider", "index$": 14 }, "repository_full_name": { "a": true, "h": "Repository Full Name", "n": "repository_full_name", "r": true, "t": "`$STRING`", "key$": "repository_full_name", "index$": 15 }, "runtime_kind": { "a": true, "h": "Runtime Kind", "n": "runtime_kind", "r": true, "t": "`$STRING`", "key$": "runtime_kind", "index$": 16 }, "timeout_seconds": { "a": true, "h": "Timeout Seconds", "n": "timeout_seconds", "op": { "create": { "req": false, "type": "`$INTEGER`" }, "update": { "req": false, "type": "`$INTEGER`" } }, "r": true, "t": "`$INTEGER`", "key$": "timeout_seconds", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "github_runner_pool", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["enabled", "github_app_installation_id", "image", "label", "max_concurrency", "provider", "repository_full_name", "timeout_seconds"], "co": { "id": "POST /api/v1/organizations/{organization_id}/github_runner_pools", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/github_runner_pools", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_runner_pools" }], "t": { "req": "`reqdata`", "res": "`body.github_runner_pool`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/github_runner_pools", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/github_runner_pools", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_runner_pools" }], "t": { "req": "`reqdata`", "res": "`body.github_runner_pools`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["enabled", "image", "max_concurrency", "provider", "timeout_seconds"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/github_runner_pools/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/github_runner_pools/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_runner_pools" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.github_runner_pool`" }, "index$": 0 }, { "a": true, "bf": ["enabled", "github_app_installation_id", "image", "label", "max_concurrency", "provider", "repository_full_name", "timeout_seconds"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/github_runner_pools/configure", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/github_runner_pools/configure", "q": { "$action": "configure", "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "github_runner_pools" }, { "lit": "configure" }], "t": { "req": "`reqdata`", "res": "`body.github_runner_pool`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "github_runner_pool", "name__orig": "github_runner_pool", "Name": "GithubRunnerPool", "name_": "github_runner_pool", "name-": "github-runner-pool", "NAME": "GITHUB_RUNNER_POOL", "index$": 266 }, { "active": true, "entity": "github_runner_pool", "key$": "BasicGithubRunnerPoolFlow", "kind": "basic", "name": "BasicGithubRunnerPoolFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "github_runner_pool_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "github_runner_pool_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "github_runner_pool_ref01", "srcdatavar": "github_runner_pool_ref01_data", "suffix": "_up0", "textfield": "github_app_installation_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-github_runner_pool_ref01" } }], "v": [], "index$": 2 }] }, 'GithubRunnerPool', { "POST /api/v1/organizations/{organization_id}/github_runner_pools": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["github_app_installation_id", "repository_full_name"], "properties": { "github_app_installation_id": { "type": "string", "key$": "github_app_installation_id" }, "repository_full_name": { "type": "string", "key$": "repository_full_name" }, "label": { "type": "string", "enum": ["composal", "composal-x64-2x-8gb", "composal-x64-2x", "composal-x64-4x", "composal-x64-8x", "composal-x64-16x", "composal-vm-x64-2x", "composal-vm-x64-4x", "composal-vm-x64-8x", "composal-vm-x64-16x", "composal-sandbox-x64-2x", "composal-sandbox-x64-4x", "composal-sandbox-x64-8x", "composal-sandbox-x64-16x", "composal-sandbox-x64", "composal-sandbox-x64-0.5x", "composal-boxmad-x64", "composal-boxmad-x64-2x", "composal-boxmad-x64-4x", "composal-boxmad-x64-8x", "composal-boxmad-x64-16x", "composal-boxmad-x64-2x-8gb", "composal-gen2", "composal-gen2-x64", "composal-gen2-x64-2x", "composal-gen2-x64-2x-8gb", "composal-gen2-x64-4x", "composal-gen2-x64-8x", "composal-gen2-x64-16x"], "default": "composal-x64-2x", "key$": "label" }, "image": { "type": "string", "nullable": true, "description": "Organization image name or ID; null restores the standard image", "key$": "image" }, "provider": { "type": "string", "enum": ["modal", "boxmad"], "key$": "provider" }, "enabled": { "type": "boolean", "key$": "enabled" }, "max_concurrency": { "type": "integer", "key$": "max_concurrency" }, "timeout_seconds": { "type": "integer", "key$": "timeout_seconds" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/github_runner_pools": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/organizations/{organization_id}/github_runner_pools/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "image": { "type": "string", "nullable": true, "description": "Organization image name or ID; null restores the standard image", "key$": "image" }, "provider": { "type": "string", "enum": ["modal", "boxmad"], "key$": "provider" }, "enabled": { "type": "boolean", "key$": "enabled" }, "max_concurrency": { "type": "integer", "key$": "max_concurrency" }, "timeout_seconds": { "type": "integer", "key$": "timeout_seconds" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/organizations/{organization_id}/github_runner_pools/configure": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["repository_full_name"], "properties": { "repository_full_name": { "type": "string" }, "github_app_installation_id": { "type": "string" }, "label": { "type": "string" }, "image": { "type": "string", "nullable": true }, "provider": { "type": "string", "enum": ["modal", "boxmad"] }, "enabled": { "type": "boolean" }, "max_concurrency": { "type": "integer" }, "timeout_seconds": { "type": "integer" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "github_runner_pool.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/github_runner_pools", "github_runner_pool.update.2": "GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/github_runner_pools/{id}" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const github_runner_pool_ref01_ent = client.GithubRunnerPool();
        let github_runner_pool_ref01_data = setup.data.new.github_runner_pool['github_runner_pool_ref01'];
        github_runner_pool_ref01_data['organization_id'] = setup.idmap['organization01'];
        github_runner_pool_ref01_data = (await github_runner_pool_ref01_ent.create(github_runner_pool_ref01_data)).data();
        (0, node_assert_1.default)(null != github_runner_pool_ref01_data.id);
        // LIST
        const github_runner_pool_ref01_match = {};
        github_runner_pool_ref01_match['organization_id'] = setup.idmap['organization01'];
        const github_runner_pool_ref01_list = (await github_runner_pool_ref01_ent.list(github_runner_pool_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(github_runner_pool_ref01_list, { id: github_runner_pool_ref01_data.id })));
        // UPDATE
        const github_runner_pool_ref01_data_up0 = {};
        github_runner_pool_ref01_data_up0.id = github_runner_pool_ref01_data.id;
        const github_runner_pool_ref01_markdef_up0 = { name: 'github_app_installation_id', value: 'Mark01-github_runner_pool_ref01_' + setup.now };
        github_runner_pool_ref01_data_up0[github_runner_pool_ref01_markdef_up0.name] = github_runner_pool_ref01_markdef_up0.value;
        const github_runner_pool_ref01_resdata_up0 = (await github_runner_pool_ref01_ent.update(github_runner_pool_ref01_data_up0)).data();
        (0, node_assert_1.default)(github_runner_pool_ref01_resdata_up0.id === github_runner_pool_ref01_data_up0.id);
        (0, node_assert_1.default)(github_runner_pool_ref01_resdata_up0[github_runner_pool_ref01_markdef_up0.name] === github_runner_pool_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/github_runner_pool/GithubRunnerPoolTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['github_runner_pool01', 'github_runner_pool02', 'github_runner_pool03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_GITHUB_RUNNER_POOL_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_GITHUB_RUNNER_POOL_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_GITHUB_RUNNER_POOL_ENTID'];
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
//# sourceMappingURL=GithubRunnerPoolEntity.test.js.map