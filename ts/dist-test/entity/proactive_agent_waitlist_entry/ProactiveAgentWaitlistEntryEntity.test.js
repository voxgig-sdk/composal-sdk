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
(0, node_test_1.describe)('ProactiveAgentWaitlistEntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.ProactiveAgentWaitlistEntry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ProactiveAgentWaitlistEntry().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'proactive_agent_waitlist_entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "email": { "a": true, "h": "Email", "n": "email", "r": true, "t": "`$STRING`", "key$": "email", "index$": 0 }, "first_task": { "a": true, "h": "First Task", "n": "first_task", "r": false, "sh": "The first job they would hand an agent.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "first_task", "index$": 1 }, "invite_code": { "a": true, "h": "Invite Code", "n": "invite_code", "r": false, "sh": "The referral code of the invite link they arrived through.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "invite_code", "index$": 2 }, "places_per_referral": { "a": true, "h": "Places Per Referral", "n": "places_per_referral", "r": true, "sh": "Most places one referral moves the entry up; fewer when boosted entries are ahead.", "t": "`$INTEGER`", "key$": "places_per_referral", "index$": 3 }, "position": { "a": true, "h": "Position", "n": "position", "r": true, "sh": "1-based place in the queue.", "t": "`$INTEGER`", "key$": "position", "index$": 4 }, "position_after_next_referral": { "a": true, "h": "Position After Next Referral", "n": "position_after_next_referral", "r": true, "sh": "The place one more referral would give this entry, as Rails would assign it.", "t": "`$INTEGER`", "key$": "position_after_next_referral", "index$": 5 }, "referral_code": { "a": true, "h": "Referral Code", "n": "referral_code", "r": true, "sh": "Shared in this entry's invite link.", "t": "`$STRING`", "key$": "referral_code", "index$": 6 }, "referral_count": { "a": true, "h": "Referral Count", "n": "referral_count", "r": true, "sh": "People who joined through this entry's link.", "t": "`$INTEGER`", "key$": "referral_count", "index$": 7 }, "total": { "a": true, "h": "Total", "n": "total", "r": true, "sh": "Display total including a random increment per signup; not the actual number of entries.", "t": "`$INTEGER`", "key$": "total", "index$": 8 }, "website": { "a": true, "h": "Website", "n": "website", "r": false, "sh": "Honeypot.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "website", "index$": 9 } }, "id": { "field": "referral_code", "name": "id" }, "name": "proactive_agent_waitlist_entry", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["email", "first_task", "invite_code", "website"], "co": { "id": "POST /api/v1/proactive_agent_waitlist_entries", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/v1/proactive_agent_waitlist_entries", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "proactive_agent_waitlist_entries" }], "t": { "req": { "email": "`reqdata.email`", "first_task": "`reqdata.first_task`", "invite_code": "`reqdata.invite_code`", "website": "`reqdata.website`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/proactive_agent_waitlist_entries/{referral_code}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "referral_code", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/proactive_agent_waitlist_entries/{referral_code}", "q": { "exist": ["id"] }, "r": { "param": { "referral_code": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "proactive_agent_waitlist_entries" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "proactive_agent_waitlist_entry", "name__orig": "proactive_agent_waitlist_entry", "Name": "ProactiveAgentWaitlistEntry", "name_": "proactive_agent_waitlist_entry", "name-": "proactive-agent-waitlist-entry", "NAME": "PROACTIVE_AGENT_WAITLIST_ENTRY", "index$": 379 }, { "active": true, "entity": "proactive_agent_waitlist_entry", "key$": "BasicProactiveAgentWaitlistEntryFlow", "kind": "basic", "name": "BasicProactiveAgentWaitlistEntryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "proactive_agent_waitlist_entry_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "proactive_agent_waitlist_entry_ref01", "srcdatavar": "proactive_agent_waitlist_entry_ref01_data", "suffix": "_dt0" }, "m": { "id": "proactive_agent_waitlist_entry01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-proactive_agent_waitlist_entry_ref01" } }], "index$": 1, "route": "GET /api/v1/proactive_agent_waitlist_entries/{referral_code}", "record": {} }] }, 'ProactiveAgentWaitlistEntry', { "POST /api/v1/proactive_agent_waitlist_entries": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["email"], "additionalProperties": false, "properties": { "email": { "type": "string", "maxLength": 255, "key$": "email" }, "first_task": { "type": "string", "maxLength": 280, "nullable": true, "description": "The first job they would hand an agent. Optional.", "key$": "first_task" }, "invite_code": { "type": "string", "maxLength": 16, "nullable": true, "description": "The referral code of the invite link they arrived through.", "key$": "invite_code" }, "website": { "type": "string", "nullable": true, "description": "Honeypot. Render it hidden and leave it empty; any value discards the request.", "key$": "website" } }, "x-ref": "#/components/schemas/ProactiveAgentWaitlistJoinRequest" } } } }, "parameters": [] }, "GET /api/v1/proactive_agent_waitlist_entries/{referral_code}": { "protocol": "http", "parameters": [{ "name": "referral_code", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "proactive_agent_waitlist_entry.create.0": "GET-only live run: needs POST /api/v1/proactive_agent_waitlist_entries", "proactive_agent_waitlist_entry.load.1": "GET-only live run: reads a record only proactive_agent_waitlist_entry.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const proactive_agent_waitlist_entry_ref01_ent = client.ProactiveAgentWaitlistEntry();
        let proactive_agent_waitlist_entry_ref01_data = setup.data.new.proactive_agent_waitlist_entry['proactive_agent_waitlist_entry_ref01'];
        proactive_agent_waitlist_entry_ref01_data = (await proactive_agent_waitlist_entry_ref01_ent.create(proactive_agent_waitlist_entry_ref01_data)).data();
        (0, node_assert_1.default)(null != proactive_agent_waitlist_entry_ref01_data.referral_code);
        // LOAD
        const proactive_agent_waitlist_entry_ref01_match_dt0 = {};
        proactive_agent_waitlist_entry_ref01_match_dt0.id = proactive_agent_waitlist_entry_ref01_data.referral_code;
        const proactive_agent_waitlist_entry_ref01_data_dt0 = (await proactive_agent_waitlist_entry_ref01_ent.load(proactive_agent_waitlist_entry_ref01_match_dt0)).data();
        (0, node_assert_1.default)(proactive_agent_waitlist_entry_ref01_data_dt0.referral_code === proactive_agent_waitlist_entry_ref01_data.referral_code);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/proactive_agent_waitlist_entry/ProactiveAgentWaitlistEntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    for (const rec of Object.values(entityData.existing?.["proactive_agent_waitlist_entry"] ?? {})) {
        if (null != rec?.id)
            rec.referral_code = rec.id;
    }
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['proactive_agent_waitlist_entry01', 'proactive_agent_waitlist_entry02', 'proactive_agent_waitlist_entry03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_PROACTIVE_AGENT_WAITLIST_ENTRY_ENTID'];
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
//# sourceMappingURL=ProactiveAgentWaitlistEntryEntity.test.js.map