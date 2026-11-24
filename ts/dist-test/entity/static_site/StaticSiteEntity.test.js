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
(0, node_test_1.describe)('StaticSiteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.StaticSite();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.StaticSite().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'static_site.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_deployment_id": { "a": true, "h": "Active Deployment Id", "n": "active_deployment_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "active_deployment_id", "index$": 0 }, "cdn_hostname": { "a": true, "h": "Cdn Hostname", "n": "cdn_hostname", "r": true, "t": "`$STRING`", "key$": "cdn_hostname", "index$": 1 }, "cdn_url": { "a": true, "fo": "uri", "h": "Cdn Url", "n": "cdn_url", "r": true, "t": "`$STRING`", "key$": "cdn_url", "index$": 2 }, "cname_target": { "a": true, "h": "Cname Target", "n": "cname_target", "r": true, "t": "`$STRING`", "key$": "cname_target", "index$": 3 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 4 }, "default_url": { "a": true, "fo": "uri", "h": "Default Url", "n": "default_url", "r": true, "t": "`$STRING`", "key$": "default_url", "index$": 5 }, "description": { "a": true, "h": "Description", "n": "description", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "description", "index$": 6 }, "error_document": { "a": true, "h": "Error Document", "n": "error_document", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "error_document", "index$": 7 }, "failure_message": { "a": true, "h": "Failure Message", "n": "failure_message", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "failure_message", "index$": 8 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "hosted_app_id", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 10 }, "index_document": { "a": true, "h": "Index Document", "n": "index_document", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": "`$STRING`", "key$": "index_document", "index$": 11 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 12 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 13 }, "provisioned": { "a": true, "h": "Provisioned", "n": "provisioned", "r": true, "t": "`$BOOLEAN`", "key$": "provisioned", "index$": 14 }, "provisioned_at": { "a": true, "fo": "date-time", "h": "Provisioned At", "n": "provisioned_at", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "provisioned_at", "index$": 15 }, "region": { "a": true, "h": "Region", "n": "region", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "region", "index$": 16 }, "replication_regions": { "a": true, "h": "Replication Regions", "n": "replication_regions", "op": { "create": { "req": false, "type": "`$ARRAY`" } }, "r": true, "t": "`$ARRAY`", "key$": "replication_regions", "index$": 17 }, "repository_id": { "a": true, "h": "Repository Id", "n": "repository_id", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "repository_id", "index$": 18 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 19 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 20 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 21 } }, "id": { "field": "id", "name": "id" }, "name": "static_site", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /api/v1/static_sites/{id}/provision", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/static_sites/{id}/provision", "q": { "$action": "provision", "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "id" }, { "lit": "provision" }], "t": { "req": "`reqdata`", "res": "`body.static_site`" }, "index$": 0 }, { "a": true, "bf": ["description", "error_document", "hosted_app_id", "index_document", "name", "region", "replication_regions", "repository_id", "slug"], "co": { "id": "POST /api/v1/organizations/{organization_id}/static_sites", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/static_sites", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "static_sites" }], "t": { "req": "`reqdata`", "res": "`body.static_site`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/static_sites", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/static_sites", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "static_sites" }], "t": { "req": "`reqdata`", "res": "`body.static_sites`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/static_sites/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/static_sites/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": false, "co": { "id": "PATCH /api/v1/static_sites/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/static_sites/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/static_sites/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/static_sites/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/static_sites/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/api/v1/static_sites/{id}", "q": { "exist": ["id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "static_sites" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "static_site", "name__orig": "static_site", "Name": "StaticSite", "name_": "static_site", "name-": "static-site", "NAME": "STATIC_SITE", "index$": 199 }, { "active": true, "entity": "static_site", "key$": "BasicStaticSiteFlow", "kind": "basic", "name": "BasicStaticSiteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "static_site_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "static_site_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "static_site_ref01", "srcdatavar": "static_site_ref01_data", "suffix": "_up0", "textfield": "active_deployment_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-static_site_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "static_site_ref01", "srcdatavar": "static_site_ref01_data", "suffix": "_dt0" }, "m": { "id": "static_site01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-static_site_ref01" } }], "index$": 3, "route": "GET /api/v1/static_sites/{id}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "static_site_ref01", "suffix": "_rm0" }, "m": { "id": "static_site01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "static_site_ref01" } }], "index$": 5 }] }, 'StaticSite', { "POST /api/v1/static_sites/{id}/provision": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "POST /api/v1/organizations/{organization_id}/static_sites": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["slug", "name"], "properties": { "slug": { "type": "string", "key$": "slug" }, "name": { "type": "string", "key$": "name" }, "description": { "type": "string", "key$": "description" }, "region": { "type": "string", "key$": "region" }, "replication_regions": { "type": "array", "items": { "type": "string" }, "key$": "replication_regions" }, "index_document": { "type": "string", "key$": "index_document" }, "error_document": { "type": "string", "key$": "error_document" }, "hosted_app_id": { "type": "string", "key$": "hosted_app_id" }, "repository_id": { "type": "string", "key$": "repository_id" } }, "additionalProperties": true, "x-ref": "#/components/schemas/StaticSiteCreatePayload" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/organizations/{organization_id}/static_sites": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "GET /api/v1/static_sites/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PATCH /api/v1/static_sites/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "DELETE /api/v1/static_sites/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] }, "PUT /api/v1/static_sites/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "static_site.create.0": "GET-only live run: needs POST /api/v1/static_sites/{id}/provision", "static_site.update.2": "GET-only live run: needs PUT /api/v1/static_sites/{id}", "static_site.remove.4": "GET-only live run: needs DELETE /api/v1/static_sites/{id}", "static_site.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const static_site_ref01_ent = client.StaticSite();
        let static_site_ref01_data = setup.data.new.static_site['static_site_ref01'];
        static_site_ref01_data['organization_id'] = setup.idmap['organization01'];
        static_site_ref01_data = (await static_site_ref01_ent.create(static_site_ref01_data)).data();
        (0, node_assert_1.default)(null != static_site_ref01_data.id);
        // LIST
        const static_site_ref01_match = {};
        static_site_ref01_match['organization_id'] = setup.idmap['organization01'];
        const static_site_ref01_list = (await static_site_ref01_ent.list(static_site_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(static_site_ref01_list, { id: static_site_ref01_data.id })));
        // UPDATE
        const static_site_ref01_data_up0 = {};
        static_site_ref01_data_up0.id = static_site_ref01_data.id;
        const static_site_ref01_markdef_up0 = { name: 'active_deployment_id', value: 'Mark01-static_site_ref01_' + setup.now };
        static_site_ref01_data_up0[static_site_ref01_markdef_up0.name] = static_site_ref01_markdef_up0.value;
        const static_site_ref01_resdata_up0 = (await static_site_ref01_ent.update(static_site_ref01_data_up0)).data();
        (0, node_assert_1.default)(static_site_ref01_resdata_up0.id === static_site_ref01_data_up0.id);
        (0, node_assert_1.default)(static_site_ref01_resdata_up0[static_site_ref01_markdef_up0.name] === static_site_ref01_markdef_up0.value);
        // LOAD
        const static_site_ref01_match_dt0 = {};
        static_site_ref01_match_dt0.id = static_site_ref01_data.id;
        const static_site_ref01_data_dt0 = (await static_site_ref01_ent.load(static_site_ref01_match_dt0)).data();
        (0, node_assert_1.default)(static_site_ref01_data_dt0.id === static_site_ref01_data.id);
        // REMOVE
        const static_site_ref01_match_rm0 = { id: static_site_ref01_data.id };
        await static_site_ref01_ent.remove(static_site_ref01_match_rm0);
        // LIST
        const static_site_ref01_match_rt0 = {};
        static_site_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        const static_site_ref01_list_rt0 = (await static_site_ref01_ent.list(static_site_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(static_site_ref01_list_rt0, { id: static_site_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/static_site/StaticSiteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['static_site01', 'static_site02', 'static_site03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_STATIC_SITE_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_STATIC_SITE_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_STATIC_SITE_ENTID'];
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
//# sourceMappingURL=StaticSiteEntity.test.js.map