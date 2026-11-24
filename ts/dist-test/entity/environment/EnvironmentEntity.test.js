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
(0, node_test_1.describe)('EnvironmentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ComposalSDK.test();
        const ent = testsdk.Environment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.ComposalSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Environment().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'environment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_revision_id": { "a": true, "h": "Active Revision Id", "n": "active_revision_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "active_revision_id", "index$": 0 }, "agent_sign_up_available": { "a": true, "h": "Agent Sign Up Available", "n": "agent_sign_up_available", "r": true, "sh": "Whether the signed-in admin can have Verify's agent create a test user for the included Deep Scan (`POST .../first_run/test_user`).", "t": "`$BOOLEAN`", "key$": "agent_sign_up_available", "index$": 1 }, "allowed_actions": { "a": true, "h": "Allowed Actions", "n": "allowed_actions", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "read_only only looks around; writes may create, change and delete data.", "t": "`$STRING`", "key$": "allowed_actions", "index$": 2 }, "billing": { "a": true, "h": "Billing", "n": "billing", "r": true, "t": "`$OBJECT`", "key$": "billing", "index$": 3 }, "cleanup": { "a": true, "h": "Cleanup", "n": "cleanup", "r": true, "t": "`$ARRAY`", "key$": "cleanup", "index$": 4 }, "connection": { "a": true, "h": "Connection", "n": "connection", "r": true, "t": "`$STRING`", "key$": "connection", "index$": 5 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": true, "t": "`$STRING`", "key$": "created_at", "index$": 6 }, "default_policy": { "a": true, "h": "Default Policy", "n": "default_policy", "r": false, "t": "`$OBJECT`", "key$": "default_policy", "index$": 7 }, "default_policy_json": { "a": true, "h": "Default Policy Json", "n": "default_policy_json", "r": true, "t": "`$OBJECT`", "key$": "default_policy_json", "index$": 8 }, "discovery_defaults": { "a": true, "h": "Discovery Defaults", "n": "discovery_defaults", "r": true, "t": "`$OBJECT`", "key$": "discovery_defaults", "index$": 9 }, "environment": { "a": true, "h": "Environment", "n": "environment", "r": true, "t": "`$OBJECT`", "key$": "environment", "index$": 10 }, "exploration_accounts": { "a": true, "h": "Exploration Accounts", "n": "exploration_accounts", "r": false, "t": "`$ARRAY`", "key$": "exploration_accounts", "index$": 11 }, "explorations": { "a": true, "h": "Explorations", "n": "explorations", "r": false, "t": "`$ARRAY`", "key$": "explorations", "index$": 12 }, "first_run": { "a": true, "h": "First Run", "n": "first_run", "r": false, "t": "`$ANY`", "key$": "first_run", "index$": 13 }, "hosted_app_id": { "a": true, "h": "Hosted App Id", "n": "hosted_app_id", "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "hosted_app_id", "index$": 14 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 15 }, "imessage_number": { "a": true, "h": "Imessage Number", "n": "imessage_number", "op": { "create": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] }, "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "sh": "International destination number; blank or null clears it on an added environment.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "imessage_number", "index$": 16 }, "included_deep_scan": { "a": true, "h": "Included Deep Scan", "n": "included_deep_scan", "r": true, "sh": "Whether this app still gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account or is marked as having no sign-in, so setup asks for one before anything else.", "t": "`$BOOLEAN`", "key$": "included_deep_scan", "index$": 17 }, "lock_version": { "a": true, "h": "Lock Version", "n": "lock_version", "r": true, "t": "`$INTEGER`", "key$": "lock_version", "index$": 18 }, "managed_google_available": { "a": true, "h": "Managed Google Available", "n": "managed_google_available", "r": true, "sh": "Whether the managed Google account can be offered for this app.", "t": "`$BOOLEAN`", "key$": "managed_google_available", "index$": 19 }, "managed_google_email": { "a": true, "h": "Managed Google Email", "n": "managed_google_email", "r": true, "t": "`$STRING`", "key$": "managed_google_email", "index$": 20 }, "messaging_tester_number": { "a": true, "h": "Messaging Tester Number", "n": "messaging_tester_number", "r": false, "sh": "One configured tester number.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "messaging_tester_number", "index$": 21 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Optional for a website target; defaults to its hostname.", "t": "`$STRING`", "key$": "name", "index$": 22 }, "network_connections": { "a": true, "h": "Network Connections", "n": "network_connections", "r": true, "t": "`$ARRAY`", "key$": "network_connections", "index$": 23 }, "onboarding_discovery": { "a": true, "h": "Onboarding Discovery", "n": "onboarding_discovery", "r": false, "t": "`$ANY`", "key$": "onboarding_discovery", "index$": 24 }, "organization_id": { "a": true, "h": "Organization Id", "n": "organization_id", "r": true, "t": "`$STRING`", "key$": "organization_id", "index$": 25 }, "pending_accounts": { "a": true, "h": "Pending Accounts", "n": "pending_accounts", "r": false, "sh": "Credentials on a Composal address still waiting for the password the customer chose at signup.", "t": "`$ARRAY`", "key$": "pending_accounts", "index$": 26 }, "permissions": { "a": true, "h": "Permissions", "n": "permissions", "r": true, "t": "`$OBJECT`", "key$": "permissions", "index$": 27 }, "project_id": { "a": true, "h": "Project Id", "n": "project_id", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "Owning project.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "project_id", "index$": 28 }, "repository_id": { "a": true, "h": "Repository Id", "n": "repository_id", "op": { "create": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "repository_id", "index$": 29 }, "revisions": { "a": true, "h": "Revisions", "n": "revisions", "r": true, "t": "`$ARRAY`", "key$": "revisions", "index$": 30 }, "setup_discovery_id": { "a": true, "h": "Setup Discovery Id", "n": "setup_discovery_id", "r": false, "sh": "Existing discovery to resume after setup or Checkout, selected within this environment.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "setup_discovery_id", "index$": 31 }, "sign_in_check_available": { "a": true, "h": "Sign In Check Available", "n": "sign_in_check_available", "r": true, "sh": "Whether a test account's live sign-in check can run on this app.", "t": "`$BOOLEAN`", "key$": "sign_in_check_available", "index$": 32 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "t": "`$STRING`", "key$": "slug", "index$": 33 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 34 }, "target_kind": { "a": true, "h": "Target Kind", "n": "target_kind", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "target_kind", "index$": 35 }, "target_url": { "a": true, "fo": "uri", "h": "Target Url", "n": "target_url", "op": { "create": { "req": false, "type": "`$STRING`" }, "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "target_url", "index$": 36 }, "test_accounts": { "a": true, "h": "Test Accounts", "n": "test_accounts", "r": true, "t": "`$OBJECT`", "key$": "test_accounts", "index$": 37 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "t": "`$STRING`", "key$": "updated_at", "index$": 38 }, "verify_network_connection_id": { "a": true, "h": "Verify Network Connection Id", "n": "verify_network_connection_id", "op": { "patch": { "req": false, "type": ["`$ONE`", ["`$STRING`", "`$NULL`"]] } }, "r": true, "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "verify_network_connection_id", "index$": 39 }, "version": { "a": true, "h": "Version", "n": "version", "r": false, "sh": "Required for target or tester changes; use lock_version from the environment.", "t": "`$INTEGER`", "key$": "version", "index$": 40 } }, "id": { "field": "id", "name": "id" }, "name": "environment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["allowed_actions", "default_policy", "imessage_number", "messaging_tester_number", "name", "project_id", "repository_id", "slug", "target_kind", "target_url"], "co": { "id": "POST /api/v1/organizations/{organization_id}/verify/environments", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "idempotency_key", "or": "Idempotency-Key", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/organizations/{organization_id}/verify/environments", "q": { "exist": ["idempotency_key", "organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/environments", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/environments", "q": { "exist": ["organization_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/organizations/{organization_id}/verify/environments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "project_id", "or": "project_id", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/organizations/{organization_id}/verify/environments/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "bf": ["allowed_actions", "imessage_number", "messaging_tester_number", "name", "target_url", "verify_network_connection_id", "version"], "co": { "id": "PATCH /api/v1/organizations/{organization_id}/verify/environments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/api/v1/organizations/{organization_id}/verify/environments/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "id" }], "t": { "req": { "allowed_actions": "`reqdata.allowed_action`", "imessage_number": "`reqdata.imessage_number`", "messaging_tester_number": "`reqdata.messaging_tester_number`", "name": "`reqdata.name`", "target_url": "`reqdata.target_url`", "verify_network_connection_id": "`reqdata.verify_network_connection_id`", "version": "`reqdata.version`" }, "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/verify/environments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/verify/environments/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "verify_environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run", "q": { "$action": "first_run", "exist": ["id", "organization_id"] }, "r": { "param": { "verify_environment_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "id" }, { "lit": "first_run" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": false, "co": { "id": "PUT /api/v1/organizations/{organization_id}/verify/environments/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/verify/environments/{id}", "q": { "exist": ["id", "organization_id"] }, "r": { "param": { "id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["account_id", "finish", "finish_if_waiting", "keep_chosen", "no_sign_in"], "co": { "id": "PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "verify_environment_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organization_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run", "q": { "$action": "first_run", "exist": ["id", "organization_id"] }, "r": { "param": { "verify_environment_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "verify" }, { "lit": "environments" }, { "var": "id" }, { "lit": "first_run" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "environment", "name__orig": "environment", "Name": "Environment", "name_": "environment", "name-": "environment", "NAME": "ENVIRONMENT", "index$": 230 }, { "active": true, "entity": "environment", "key$": "BasicEnvironmentFlow", "kind": "basic", "name": "BasicEnvironmentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "environment_ref01" }, "m": { "organization_id": "organization01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "environment_ref01" } }], "index$": 1 }, { "a": true, "d": { "organization_id": "organization01" }, "i": { "ref": "environment_ref01", "srcdatavar": "environment_ref01_data", "suffix": "_up0", "textfield": "active_revision_id" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-environment_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "environment_ref01", "srcdatavar": "environment_ref01_data", "suffix": "_dt0" }, "m": { "id": "environment01", "organization_id": "organization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-environment_ref01" } }], "index$": 3, "route": "GET /api/v1/organizations/{organization_id}/verify/environments/{id}", "record": { "organization_id": "organization_id" } }, { "a": true, "d": {}, "i": { "ref": "environment_ref01", "suffix": "_rm0" }, "m": { "id": "environment01", "organization_id": "organization01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "environment_ref01" } }], "index$": 5 }] }, 'Environment', { "POST /api/v1/organizations/{organization_id}/verify/environments": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "required": ["slug"], "anyOf": [{ "required": ["target_url"] }, { "required": ["name"] }], "properties": { "project_id": { "type": "string", "description": "Project slug or public ID. When omitted, creates a separate project for this environment.", "key$": "project_id" }, "repository_id": { "type": "string", "nullable": true, "key$": "repository_id" }, "slug": { "type": "string", "minLength": 1, "key$": "slug" }, "name": { "type": "string", "minLength": 1, "description": "Optional for a website target; defaults to its hostname. Required for a draft environment without a target URL.", "key$": "name" }, "target_url": { "type": "string", "format": "uri", "key$": "target_url" }, "target_kind": { "type": "string", "enum": ["production", "staging", "preview", "development", "custom"], "default": "staging", "key$": "target_kind" }, "default_policy": { "type": "object", "additionalProperties": true, "key$": "default_policy" }, "allowed_actions": { "type": "string", "enum": ["read_only", "writes"], "description": "read_only only looks around; writes may create, change and delete data. Defaults to read_only for production and writes otherwise.", "key$": "allowed_actions" }, "imessage_number": { "type": "string", "nullable": true, "description": "International destination number; blank or null clears it on an added environment.", "key$": "imessage_number" }, "messaging_tester_number": { "type": "string", "nullable": true, "description": "One configured tester number. Copied to each preview; may be overridden locally before preparation.", "key$": "messaging_tester_number" } }, "x-ref": "#/components/schemas/VerifyEnvironmentCreateInput" } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "Idempotency-Key", "in": "header", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verify/environments": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "project_id", "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/organizations/{organization_id}/verify/environments/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "name": "project_id", "in": "query", "schema": { "type": "string" }, "index$": 2 }] }, "PATCH /api/v1/organizations/{organization_id}/verify/environments/{id}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": false, "properties": { "name": { "type": "string", "key$": "name" }, "verify_network_connection_id": { "type": "string", "nullable": true, "key$": "verify_network_connection_id" }, "allowed_actions": { "type": "string", "enum": ["read_only", "writes"], "description": "read_only only looks around; writes may create, change and delete data.", "key$": "allowed_actions" }, "target_url": { "type": ["string", "null"], "key$": "target_url" }, "imessage_number": { "type": ["string", "null"], "key$": "imessage_number" }, "messaging_tester_number": { "type": ["string", "null"], "key$": "messaging_tester_number" }, "version": { "type": "integer", "description": "Required for target or tester changes; use lock_version from the environment.", "key$": "version" } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/organizations/{organization_id}/verify/environments/{id}": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "DELETE /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run": { "protocol": "http", "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "verify_environment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/organizations/{organization_id}/verify/environments/{id}": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/first_run": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "additionalProperties": true, "properties": { "account_id": { "type": "string", "nullable": true, "description": "Test account the discovery signs in with; null tests public pages only." }, "no_sign_in": { "type": "boolean", "description": "The app has no sign-in. With no account it gets the workspace's included Deep Scan of public pages. Ignored with an account; omitted keeps the saved choice." }, "finish": { "type": "boolean", "description": "Setup is finished. Rails starts the discovery now if billing allows, otherwise when billing is confirmed. Repeating it retries a refused start." }, "finish_if_waiting": { "type": "boolean", "description": "Finish setup only when the workspace's included Deep Scan waits for the chosen account's sign-in check (`starts_after_sign_in_check`); otherwise only save the choice, since finishing would start a run at once." }, "keep_chosen": { "type": "boolean", "description": "Save the account only while no test access is chosen, for an account adopted automatically; a choice already saved stays and is returned unchanged." } } } } } }, "parameters": [{ "name": "organization_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "verify_environment_id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "environment.create.0": "GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments", "environment.update.2": "GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/environments/{id}", "environment.remove.4": "GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/environments/{id}", "environment.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const environment_ref01_ent = client.Environment();
        let environment_ref01_data = setup.data.new.environment['environment_ref01'];
        environment_ref01_data['organization_id'] = setup.idmap['organization01'];
        environment_ref01_data = (await environment_ref01_ent.create(environment_ref01_data)).data();
        (0, node_assert_1.default)(null != environment_ref01_data.id);
        // LIST
        const environment_ref01_match = {};
        environment_ref01_match['organization_id'] = setup.idmap['organization01'];
        const environment_ref01_list = (await environment_ref01_ent.list(environment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(environment_ref01_list, { id: environment_ref01_data.id })));
        // UPDATE
        const environment_ref01_data_up0 = {};
        environment_ref01_data_up0.id = environment_ref01_data.id;
        environment_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const environment_ref01_markdef_up0 = { name: 'active_revision_id', value: 'Mark01-environment_ref01_' + setup.now };
        environment_ref01_data_up0[environment_ref01_markdef_up0.name] = environment_ref01_markdef_up0.value;
        const environment_ref01_resdata_up0 = (await environment_ref01_ent.update(environment_ref01_data_up0)).data();
        (0, node_assert_1.default)(environment_ref01_resdata_up0.id === environment_ref01_data_up0.id);
        (0, node_assert_1.default)(environment_ref01_resdata_up0[environment_ref01_markdef_up0.name] === environment_ref01_markdef_up0.value);
        // LOAD
        const environment_ref01_match_dt0 = {};
        environment_ref01_match_dt0.id = environment_ref01_data.id;
        environment_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof environment_ref01_data['organization_id']) ?
            environment_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        const environment_ref01_data_dt0 = (await environment_ref01_ent.load(environment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(environment_ref01_data_dt0.id === environment_ref01_data.id);
        // REMOVE
        const environment_ref01_match_rm0 = { id: environment_ref01_data.id };
        environment_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01'];
        await environment_ref01_ent.remove(environment_ref01_match_rm0);
        // LIST
        const environment_ref01_match_rt0 = {};
        environment_ref01_match_rt0['organization_id'] = setup.idmap['organization01'];
        const environment_ref01_list_rt0 = (await environment_ref01_ent.list(environment_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(environment_ref01_list_rt0, { id: environment_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/environment/EnvironmentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ComposalSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['environment01', 'environment02', 'environment03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_ENVIRONMENT_ENTID': idmap,
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_TEST_EXPLAIN': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    idmap = env['COMPOSAL_TEST_ENVIRONMENT_ENTID'];
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COMPOSAL_TEST_ENVIRONMENT_ENTID'];
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
//# sourceMappingURL=EnvironmentEntity.test.js.map