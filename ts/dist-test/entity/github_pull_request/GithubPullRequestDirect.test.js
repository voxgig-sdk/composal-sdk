"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GithubPullRequestDirect', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COMPOSAL_TEST_LIVE'));
    (0, node_test_1.test)('direct-exists', async () => {
        const sdk = new __1.ComposalSDK({
            base: 'http://localhost:8080',
            system: { fetch: async () => ({}) }
        });
        (0, node_assert_1.default)('function' === typeof sdk.direct);
        (0, node_assert_1.default)('function' === typeof sdk.prepare);
    });
    (0, node_test_1.test)('direct-load-github_pull_request', async (t) => {
        if (liveScenariosActive()) {
            t.skip('Covered by live operation scenarios');
            return;
        }
        const setup = directSetup({ id: 'direct01' });
        if ((0, utility_1.maybeSkipControl)(t, 'direct', 'direct-load-github_pull_request', setup.live))
            return;
        if (setup.live && 'TRUE' === process.env.VOXGIG_GETONLY_GUARD && null == setup.idmap?.["github_pull_request01"]) {
            console.log("LIVE STEP {\"id\":\"direct-load-github_pull_request\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs github_pull_request01, which only POST /api/v1/organizations/{org_slug}/github/pull_requests/refresh gives\"}");
            t.skip("Live coverage incomplete: direct-load-github_pull_request excluded (GET-only live run: needs github_pull_request01, which only POST /api/v1/organizations/{org_slug}/github/pull_requests/refresh gives)");
            return;
        }
        if (setup.live && 'TRUE' === process.env.VOXGIG_GETONLY_GUARD && null == setup.idmap?.["github_pull_request01"]) {
            console.log("LIVE STEP {\"id\":\"direct-load-github_pull_request\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs github_pull_request01, which only POST /api/v1/organizations/{org_slug}/github/pull_requests/refresh gives\"}");
            t.skip("Live coverage incomplete: direct-load-github_pull_request excluded (GET-only live run: needs github_pull_request01, which only POST /api/v1/organizations/{org_slug}/github/pull_requests/refresh gives)");
            return;
        }
        if (setup.live && 'TRUE' === process.env.VOXGIG_GETONLY_GUARD && null == setup.idmap?.["pull_request01"]) {
            console.log("LIVE STEP {\"id\":\"direct-load-github_pull_request\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives\"}");
            t.skip("Live coverage incomplete: direct-load-github_pull_request excluded (GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives)");
            return;
        }
        if (setup.live && 'TRUE' === process.env.VOXGIG_GETONLY_GUARD && null == setup.idmap?.["pull_request01"]) {
            console.log("LIVE STEP {\"id\":\"direct-load-github_pull_request\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives\"}");
            t.skip("Live coverage incomplete: direct-load-github_pull_request excluded (GET-only live run: needs pull_request01, which only POST /api/v1/organizations/{organization_id}/verify/pull_requests/{id}/demo_share gives)");
            return;
        }
        if ((0, utility_1.skipIfMissingIds)(t, setup, ["github_pull_request01", "github_pull_request01", "organization01", "organization01", "pull_request01", "pull_request01"], LIVE_STRICT))
            return;
        const { client, calls } = setup;
        const params = {};
        const query = {};
        if (setup.live) {
            params.id = setup.idmap['github_pull_request01'];
            params.id = setup.idmap['github_pull_request01'];
            params.organization_id = setup.idmap['organization01'];
            params.organization_id = setup.idmap['organization01'];
            params.pull_request_id = setup.idmap['pull_request01'];
            params.pull_request_id = setup.idmap['pull_request01'];
        }
        else {
            params.id = 'direct01';
            params.id = 'direct02';
            params.organization_id = 'direct03';
            params.organization_id = 'direct04';
            params.pull_request_id = 'direct05';
            params.pull_request_id = 'direct06';
        }
        const result = await client.direct({
            path: 'api/v1/organizations/{organization_id}/github/pull_requests/{pull_request_id}/{id}',
            method: 'GET',
            params,
            query,
        });
        if (setup.live) {
            if (!result.ok || result.status < 200 || result.status >= 300) {
                return void (0, utility_1.liveMiss)(t, LIVE_STRICT, 'Live load failed: ' + (0, utility_1.describeLive)(result));
            }
            if (!(null != result.data)) {
                return void (0, utility_1.liveMiss)(t, LIVE_STRICT, 'Live load returned no data: ' + (0, utility_1.describeLive)(result));
            }
        }
        else {
            (0, node_assert_1.default)(result.ok === true);
            (0, node_assert_1.default)(result.status === 200);
            (0, node_assert_1.default)(null != result.data);
            (0, node_assert_1.default)(result.data.id === 'direct01');
            (0, node_assert_1.default)(calls.length === 1);
            (0, node_assert_1.default)(calls[0].init.method === 'GET');
            (0, node_assert_1.default)(calls[0].url.includes('direct01'));
            (0, node_assert_1.default)(calls[0].url.includes('direct02'));
            (0, node_assert_1.default)(calls[0].url.includes('direct03'));
            (0, node_assert_1.default)(calls[0].url.includes('direct04'));
            (0, node_assert_1.default)(calls[0].url.includes('direct05'));
            (0, node_assert_1.default)(calls[0].url.includes('direct06'));
        }
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function liveScenariosActive() { return false && process.env.COMPOSAL_TEST_LIVE === 'TRUE'; }
function directSetup(mockres) {
    const calls = [];
    const env = (0, utility_1.envOverride)({
        'COMPOSAL_TEST_GITHUB_PULL_REQUEST_ENTID': {},
        'COMPOSAL_TEST_LIVE': 'FALSE',
        'COMPOSAL_APIKEY': '',
    });
    const live = 'TRUE' === env.COMPOSAL_TEST_LIVE;
    if (live) {
        const transport = (0, live_runner_1.createLiveTransport)();
        // Merged so the generated fields win: sdk-test-control.json's
        // test.client.options adds to the live client, it does not redirect it.
        const client = new __1.ComposalSDK(Object.assign({}, (0, utility_1.liveClientOptions)(), { system: { fetch: transport.fetch },
            apikey: env.COMPOSAL_APIKEY,
        }));
        let idmap = env['COMPOSAL_TEST_GITHUB_PULL_REQUEST_ENTID'];
        if ('string' === typeof idmap && idmap.startsWith('{')) {
            idmap = JSON.parse(idmap);
        }
        return { client, calls, live, idmap, transport };
    }
    const mockFetch = async (url, init) => {
        calls.push({ url, init });
        return {
            status: 200,
            statusText: 'OK',
            headers: {},
            json: async () => (null != mockres ? mockres : { id: 'direct01' }),
        };
    };
    const client = new __1.ComposalSDK({
        base: 'http://localhost:8080',
        system: { fetch: mockFetch },
    });
    return { client, calls, live, idmap: {} };
}
// direct() returns the raw response body. List endpoints often wrap the
// array in an envelope (e.g. { data: [...] }, { entities: [...] },
// { pagination, data: [...] }). The test transforms the raw body to
// extract the first array — either the body itself or the first array
// property of an envelope object.
function unwrapListData(data) {
    if (Array.isArray(data))
        return data;
    if (data && 'object' === typeof data) {
        for (const v of Object.values(data)) {
            if (Array.isArray(v))
                return v;
        }
    }
    return null;
}
//# sourceMappingURL=GithubPullRequestDirect.test.js.map