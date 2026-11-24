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
(0, node_test_1.describe)('RunJobEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.RunJob();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.RunJob().list({ "pipeline_id": 1, "run_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'run_job.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active": { "a": true, "h": "Active", "n": "active", "r": true, "t": "`$BOOLEAN`", "key$": "active", "index$": 0 }, "allow_failure": { "a": true, "h": "Allow Failure", "n": "allow_failure", "r": true, "t": "`$BOOLEAN`", "key$": "allow_failure", "index$": 1 }, "cache_archive_observations": { "a": true, "h": "Cache Archive Observations", "n": "cache_archive_observations", "r": true, "sh": "Bounded server response history; it does not confirm runner extraction or test-result reuse.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "cache_archive_observations", "index$": 2 }, "ci_pipeline_run_id": { "a": true, "h": "Ci Pipeline Run Id", "n": "ci_pipeline_run_id", "r": true, "t": "`$STRING`", "key$": "ci_pipeline_run_id", "index$": 3 }, "ci_runner_id": { "a": true, "h": "Ci Runner Id", "n": "ci_runner_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "ci_runner_id", "index$": 4 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 5 }, "dependencies_csv": { "a": true, "h": "Dependencies Csv", "n": "dependencies_csv", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "dependencies_csv", "index$": 6 }, "display_id": { "a": true, "h": "Display Id", "n": "display_id", "r": true, "t": "`$INTEGER`", "key$": "display_id", "index$": 7 }, "environment_csv": { "a": true, "h": "Environment Csv", "n": "environment_csv", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "environment_csv", "index$": 8 }, "execution_order": { "a": true, "h": "Execution Order", "n": "execution_order", "r": true, "t": "`$INTEGER`", "key$": "execution_order", "index$": 9 }, "execution_profile": { "a": true, "h": "Execution Profile", "n": "execution_profile", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "execution_profile", "index$": 10 }, "exit_code": { "a": true, "h": "Exit Code", "n": "exit_code", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "exit_code", "index$": 11 }, "failed": { "a": true, "h": "Failed", "n": "failed", "r": true, "t": "`$BOOLEAN`", "key$": "failed", "index$": 12 }, "finished_at": { "a": true, "fo": "date-time", "h": "Finished At", "n": "finished_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "finished_at", "index$": 13 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 14 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "t": "`$STRING`", "key$": "kind", "index$": 15 }, "log_chunks": { "a": true, "h": "Log Chunks", "n": "log_chunks", "r": true, "t": "`$ARRAY`", "key$": "log_chunks", "index$": 16 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 17 }, "number": { "a": true, "h": "Number", "n": "number", "r": true, "t": "`$INTEGER`", "key$": "number", "index$": 18 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 19 }, "queued_at": { "a": true, "fo": "date-time", "h": "Queued At", "n": "queued_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "queued_at", "index$": 20 }, "reconciliation_id": { "a": true, "h": "Reconciliation Id", "n": "reconciliation_id", "r": false, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "reconciliation_id", "index$": 21 }, "retry_number": { "a": true, "h": "Retry Number", "n": "retry_number", "r": true, "t": "`$INTEGER`", "key$": "retry_number", "index$": 22 }, "reuse": { "a": true, "h": "Reuse", "n": "reuse", "r": true, "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "reuse", "index$": 23 }, "runner_label_selector": { "a": true, "h": "Runner Label Selector", "n": "runner_label_selector", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "runner_label_selector", "index$": 24 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 25 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "started_at", "index$": 26 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 27 }, "status_label": { "a": true, "h": "Status Label", "n": "status_label", "r": true, "t": "`$STRING`", "key$": "status_label", "index$": 28 }, "status_state": { "a": true, "h": "Status State", "n": "status_state", "r": true, "t": "`$STRING`", "key$": "status_state", "index$": 29 }, "status_tone": { "a": true, "h": "Status Tone", "n": "status_tone", "r": true, "t": "`$STRING`", "key$": "status_tone", "index$": 30 }, "steps": { "a": true, "h": "Steps", "n": "steps", "r": true, "t": "`$ARRAY`", "key$": "steps", "index$": 31 }, "timeout_seconds": { "a": true, "h": "Timeout Seconds", "n": "timeout_seconds", "r": true, "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "timeout_seconds", "index$": 32 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 33 } }, "id": { "field": "id", "name": "id" }, "name": "run_job", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "pipeline_id", "or": "pipeline_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "run_id", "or": "run_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs", "q": { "exist": ["pipeline_id", "run_id"] }, "r": { "param": { "pipeline_id": "pipeline_id", "run_id": "run_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "pipelines" }, { "var": "pipeline_id" }, { "lit": "runs" }, { "var": "run_id" }, { "lit": "jobs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "pipeline_id", "or": "pipeline_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "run_id", "or": "run_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs", "q": { "exist": ["pipeline_id", "run_id"] }, "r": { "param": { "pipeline_id": "pipeline_id", "run_id": "run_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "pipelines" }, { "var": "pipeline_id" }, { "lit": "runs" }, { "var": "run_id" }, { "lit": "jobs" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "pipeline_id", "or": "pipeline_id", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "run_id", "or": "run_id", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{id}", "q": { "exist": ["id", "pipeline_id", "run_id"] }, "r": { "param": { "id": "id", "pipeline_id": "pipeline_id", "run_id": "run_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ci" }, { "lit": "pipelines" }, { "var": "pipeline_id" }, { "lit": "runs" }, { "var": "run_id" }, { "lit": "jobs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.job`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "run_job", "name__orig": "run_job", "Name": "RunJob", "name_": "run_job", "name-": "run-job", "NAME": "RUN_JOB", "index$": 448 }, { "active": true, "entity": "run_job", "key$": "BasicRunJobFlow", "kind": "basic", "name": "BasicRunJobFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "run_job_ref01" }, "m": { "pipeline_id": "pipeline01", "run_id": "run01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "pipeline_id": "pipeline01", "run_id": "run01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "run_job_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "run_job_ref01", "srcdatavar": "run_job_ref01_data", "suffix": "_dt0" }, "m": { "id": "run_job01", "pipeline_id": "pipeline01", "run_id": "run01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-run_job_ref01" } }], "index$": 2, "route": "GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{id}", "record": {} }] }, 'RunJob', { "POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "pipeline_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs": { "protocol": "http", "parameters": [{ "name": "pipeline_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{id}": { "protocol": "http", "parameters": [{ "name": "pipeline_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "run_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "run_job.create.0": "GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const run_job_ref01_ent = client.RunJob();
        let run_job_ref01_data = setup.data.new.run_job['run_job_ref01'];
        run_job_ref01_data['pipeline_id'] = setup.idmap['pipeline01'];
        run_job_ref01_data['run_id'] = setup.idmap['run01'];
        run_job_ref01_data = (await run_job_ref01_ent.create(run_job_ref01_data)).data();
        (0, node_assert_1.default)(null != run_job_ref01_data.id);
        // LIST
        const run_job_ref01_match = {};
        run_job_ref01_match['pipeline_id'] = setup.idmap['pipeline01'];
        run_job_ref01_match['run_id'] = setup.idmap['run01'];
        const run_job_ref01_list = (await run_job_ref01_ent.list(run_job_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(run_job_ref01_list, { id: run_job_ref01_data.id })));
        // LOAD
        const run_job_ref01_match_dt0 = {};
        run_job_ref01_match_dt0.id = run_job_ref01_data.id;
        run_job_ref01_match_dt0['pipeline_id'] = setup.idmap['pipeline_id'] ?? setup.idmap['pipeline01'];
        run_job_ref01_match_dt0['run_id'] = setup.idmap['run_id'] ?? setup.idmap['run01'];
        const run_job_ref01_data_dt0 = (await run_job_ref01_ent.load(run_job_ref01_match_dt0)).data();
        (0, node_assert_1.default)(run_job_ref01_data_dt0.id === run_job_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/run_job/RunJobTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['run_job01', 'run_job02', 'run_job03', 'pipeline01', 'run01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_RUN_JOB_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_RUN_JOB_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_RUN_JOB_ENTID'];
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
//# sourceMappingURL=RunJobEntity.test.js.map