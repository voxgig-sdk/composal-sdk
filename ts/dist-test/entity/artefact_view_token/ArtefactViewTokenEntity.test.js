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
(0, node_test_1.describe)('ArtefactViewTokenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ArtefactViewToken();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ArtefactViewToken().create({ "artefact_id": 1, "organization_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'artefact_view_token.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "expires_in": { "a": true, "h": "Expires In", "n": "expires_in", "r": true, "t": "`$INTEGER`", "key$": "expires_in", "index$": 0 }, "file": { "a": true, "h": "File", "n": "file", "r": false, "sh": "Exact manifest path.", "t": "`$STRING`", "key$": "file", "index$": 1 }, "organization_slug": { "a": true, "h": "Organization Slug", "n": "organization_slug", "r": false, "sh": "If provided, must match the organization addressed by the route.", "t": "`$STRING`", "key$": "organization_slug", "index$": 2 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "t": "`$INTEGER`", "key$": "version", "index$": 3 }, "viewer_url": { "a": true, "fo": "uri", "h": "Viewer Url", "n": "viewer_url", "r": true, "t": "`$STRING`", "key$": "viewer_url", "index$": 4 } }, "name": "artefact_view_token", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["file", "organization_slug", "version"], "co": { "id": "POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/view_tokens", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "artefact_id", "or": "artefact_ref", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/view_tokens", "q": { "exist": ["artefact_id", "organization_id"] }, "r": { "param": { "artefact_ref": "artefact_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "artefacts" }, { "var": "artefact_id" }, { "lit": "view_tokens" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.artefact"]] }, "fact": { "desc": { "cell": "", "code": "", "codecell": "", "flat": "", "inline": "", "label": "", "link": "", "raw": "", "text": "", "vendor": true } }, "key$": "artefact_view_token", "name__orig": "artefact_view_token", "Name": "ArtefactViewToken", "name_": "artefact_view_token", "name-": "artefact-view-token", "NAME": "ARTEFACT_VIEW_TOKEN", "index$": 100 }, { "active": true, "entity": "artefact_view_token", "key$": "BasicArtefactViewTokenFlow", "kind": "basic", "name": "BasicArtefactViewTokenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "artefact_view_token_ref01" }, "m": { "artefact_id": "artefact01", "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'ArtefactViewToken', { "POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/view_tokens": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "organization_slug": { "type": "string", "description": "If provided, must match the organization addressed by the route.", "key$": "organization_slug" }, "version": { "type": "integer", "minimum": 1, "key$": "version" }, "file": { "type": "string", "description": "Exact manifest path. Defaults to the revision entrypoint.", "key$": "file" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "artefact_ref", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "artefact_view_token.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/view_tokens" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const artefact_view_token_ref01_ent = client.ArtefactViewToken();
        let artefact_view_token_ref01_data = setup.data.new.artefact_view_token['artefact_view_token_ref01'];
        artefact_view_token_ref01_data['artefact_id'] = setup.idmap['artefact01'];
        artefact_view_token_ref01_data['organization_id'] = setup.idmap['organization01'];
        artefact_view_token_ref01_data = (await artefact_view_token_ref01_ent.create(artefact_view_token_ref01_data)).data();
        (0, node_assert_1.default)(null != artefact_view_token_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/artefact_view_token/ArtefactViewTokenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['artefact_view_token01', 'artefact_view_token02', 'artefact_view_token03', 'organization01', 'organization02', 'organization03', 'artefact01', 'artefact02', 'artefact03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ARTEFACT_VIEW_TOKEN_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ARTEFACT_VIEW_TOKEN_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ARTEFACT_VIEW_TOKEN_ENTID'];
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
//# sourceMappingURL=ArtefactViewTokenEntity.test.js.map