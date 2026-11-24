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
(0, node_test_1.describe)('CiPipelineRunEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.CiPipelineRun();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CiPipelineRun().list({ "pipeline_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ci_pipeline_run.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active": { "a": true, "h": "Active", "n": "active", "r": true, "t": "`$BOOLEAN`", "key$": "active", "index$": 0 }, "canceled_at": { "a": true, "fo": "date-time", "h": "Canceled At", "n": "canceled_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "canceled_at", "index$": 1 }, "ci_pipeline_id": { "a": true, "h": "Ci Pipeline Id", "n": "ci_pipeline_id", "r": true, "t": "`$STRING`", "key$": "ci_pipeline_id", "index$": 2 }, "ci_runner_pool_id": { "a": true, "h": "Ci Runner Pool Id", "n": "ci_runner_pool_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ci_runner_pool_id", "index$": 3 }, "commit_sha": { "a": true, "h": "Commit Sha", "n": "commit_sha", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "commit_sha", "index$": 4 }, "concurrency_key": { "a": true, "h": "Concurrency Key", "n": "concurrency_key", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "concurrency_key", "index$": 5 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 6 }, "creator_user_id": { "a": true, "h": "Creator User Id", "n": "creator_user_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "creator_user_id", "index$": 7 }, "display_id": { "a": true, "h": "Display Id", "n": "display_id", "r": true, "t": "`$INTEGER`", "key$": "display_id", "index$": 8 }, "failed": { "a": true, "h": "Failed", "n": "failed", "r": true, "t": "`$BOOLEAN`", "key$": "failed", "index$": 9 }, "finished_at": { "a": true, "fo": "date-time", "h": "Finished At", "n": "finished_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "finished_at", "index$": 10 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "hosted_app_id", "index$": 11 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 12 }, "jobs": { "a": true, "h": "Jobs", "n": "jobs", "r": true, "t": "`$ARRAY`", "key$": "jobs", "index$": 13 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "message", "index$": 14 }, "number": { "a": true, "h": "Number", "n": "number", "r": true, "t": "`$INTEGER`", "key$": "number", "index$": 15 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 16 }, "parameters_json": { "a": true, "h": "Parameters Json", "n": "parameters_json", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "parameters_json", "index$": 17 }, "queued_at": { "a": true, "fo": "date-time", "h": "Queued At", "n": "queued_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "queued_at", "index$": 18 }, "ref_name": { "a": true, "h": "Ref Name", "n": "ref_name", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ref_name", "index$": 19 }, "repository_id": { "a": true, "h": "Repository Id", "n": "repository_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "repository_id", "index$": 20 }, "required_capabilities_csv": { "a": true, "h": "Required Capabilities Csv", "n": "required_capabilities_csv", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "required_capabilities_csv", "index$": 21 }, "retry_number": { "a": true, "h": "Retry Number", "n": "retry_number", "r": true, "t": "`$INTEGER`", "key$": "retry_number", "index$": 22 }, "retryable": { "a": true, "h": "Retryable", "n": "retryable", "r": true, "t": "`$BOOLEAN`", "key$": "retryable", "index$": 23 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 24 }, "source_url": { "a": true, "h": "Source Url", "n": "source_url", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "source_url", "index$": 25 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "started_at", "index$": 26 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 27 }, "status_label": { "a": true, "h": "Status Label", "n": "status_label", "r": true, "t": "`$STRING`", "key$": "status_label", "index$": 28 }, "status_state": { "a": true, "h": "Status State", "n": "status_state", "r": true, "t": "`$STRING`", "key$": "status_state", "index$": 29 }, "status_tone": { "a": true, "h": "Status Tone", "n": "status_tone", "r": true, "t": "`$STRING`", "key$": "status_tone", "index$": 30 }, "trigger_kind": { "a": true, "h": "Trigger Kind", "n": "trigger_kind", "r": true, "t": "`$STRING`", "key$": "trigger_kind", "index$": 31 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 32 } }, "id": { "field": "id", "name": "id" }, "name": "ci_pipeline_run", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["request_id"], "co": { "id": "POST /api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "pipeline_id", "or": "pipeline_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry", "q": { "$action": "retry", "exist": ["id", "pipeline_id"] }, "r": { "param": { "id": "id", "pipeline_id": "pipeline_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "pipelines" }, { "var": "pipeline_id" }, { "lit": "runs" }, { "var": "id" }, { "lit": "retry" }], "t": { "req": "`reqdata`", "res": "`body.pipeline_run`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /api/v1/ci/pipelines/{pipeline_id}/runs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "pipeline_id", "or": "pipeline_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/ci/pipelines/{pipeline_id}/runs", "q": { "exist": ["pipeline_id"] }, "r": { "param": { "pipeline_id": "pipeline_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "pipelines" }, { "var": "pipeline_id" }, { "lit": "runs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/ci/pipelines/{pipeline_id}/runs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "pipeline_id", "or": "pipeline_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/ci/pipelines/{pipeline_id}/runs", "q": { "exist": ["pipeline_id"] }, "r": { "param": { "pipeline_id": "pipeline_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "pipelines" }, { "var": "pipeline_id" }, { "lit": "runs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/ci/pipelines/{pipeline_id}/runs/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "pipeline_id", "or": "pipeline_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/ci/pipelines/{pipeline_id}/runs/{id}", "q": { "exist": ["id", "pipeline_id"] }, "r": { "param": { "id": "id", "pipeline_id": "pipeline_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "pipelines" }, { "var": "pipeline_id" }, { "lit": "runs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.pipeline_run`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "ci_pipeline_run", "name__orig": "ci_pipeline_run", "Name": "CiPipelineRun", "name_": "ci_pipeline_run", "name-": "ci-pipeline-run", "NAME": "CI_PIPELINE_RUN", "index$": 174 }, { "active": true, "entity": "ci_pipeline_run", "key$": "BasicCiPipelineRunFlow", "kind": "basic", "name": "BasicCiPipelineRunFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "ci_pipeline_run_ref01" }, "m": { "pipeline_id": "pipeline01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "pipeline_id": "pipeline01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "ci_pipeline_run_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "ci_pipeline_run_ref01", "srcdatavar": "ci_pipeline_run_ref01_data", "suffix": "_dt0" }, "m": { "id": "ci_pipeline_run01", "pipeline_id": "pipeline01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ci_pipeline_run_ref01" } }], "index$": 2, "route": "GET /api/v1/ci/pipelines/{pipeline_id}/runs/{id}", "record": {} }] }, 'CiPipelineRun', { "POST /api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["request_id"], "properties": { "request_id": { "type": "string", "maxLength": 100 } } } } } }, "parameters": [{ "name": "pipeline_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/ci/pipelines/{pipeline_id}/runs": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "pipeline_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/ci/pipelines/{pipeline_id}/runs": { "protocol": "http", "parameters": [{ "name": "pipeline_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/ci/pipelines/{pipeline_id}/runs/{id}": { "protocol": "http", "parameters": [{ "name": "pipeline_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "ci_pipeline_run.create.0": "GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{id}/retry" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ci_pipeline_run_ref01_ent = client.CiPipelineRun();
        let ci_pipeline_run_ref01_data = setup.data.new.ci_pipeline_run['ci_pipeline_run_ref01'];
        ci_pipeline_run_ref01_data['pipeline_id'] = setup.idmap['pipeline01'];
        ci_pipeline_run_ref01_data = (await ci_pipeline_run_ref01_ent.create(ci_pipeline_run_ref01_data)).data();
        (0, node_assert_1.default)(null != ci_pipeline_run_ref01_data.id);
        // LIST
        const ci_pipeline_run_ref01_match = {};
        ci_pipeline_run_ref01_match['pipeline_id'] = setup.idmap['pipeline01'];
        const ci_pipeline_run_ref01_list = (await ci_pipeline_run_ref01_ent.list(ci_pipeline_run_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(ci_pipeline_run_ref01_list, { id: ci_pipeline_run_ref01_data.id })));
        // LOAD
        const ci_pipeline_run_ref01_match_dt0 = {};
        ci_pipeline_run_ref01_match_dt0.id = ci_pipeline_run_ref01_data.id;
        ci_pipeline_run_ref01_match_dt0['pipeline_id'] = setup.idmap['pipeline_id'] ?? setup.idmap['pipeline01'];
        const ci_pipeline_run_ref01_data_dt0 = (await ci_pipeline_run_ref01_ent.load(ci_pipeline_run_ref01_match_dt0)).data();
        (0, node_assert_1.default)(ci_pipeline_run_ref01_data_dt0.id === ci_pipeline_run_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ci_pipeline_run/CiPipelineRunTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ci_pipeline_run01', 'ci_pipeline_run02', 'ci_pipeline_run03', 'pipeline01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_CI_PIPELINE_RUN_ENTID'];
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
//# sourceMappingURL=CiPipelineRunEntity.test.js.map