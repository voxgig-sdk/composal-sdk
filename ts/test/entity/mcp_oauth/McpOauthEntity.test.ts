

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ComposalSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('McpOauthEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.McpOauth()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mcp_oauth.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"mcp_oauth","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["all_organizations","approve","organization_id","request"],"co":{"id":"POST /api/v1/mcp/oauth/consent","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/mcp/oauth/consent","q":{"$action":"consent"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"mcp"},{"lit":"oauth"},{"lit":"consent"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/mcp/oauth/register","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/mcp/oauth/register","q":{"$action":"register"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"mcp"},{"lit":"oauth"},{"lit":"register"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/mcp/oauth/revoke","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/mcp/oauth/revoke","q":{"$action":"revoke"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"mcp"},{"lit":"oauth"},{"lit":"revoke"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/mcp/oauth/token","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/mcp/oauth/token","q":{"$action":"token"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"mcp"},{"lit":"oauth"},{"lit":"token"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/mcp/oauth/consent","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"request","or":"request","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/mcp/oauth/consent","q":{"$action":"consent","exist":["request"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"mcp"},{"lit":"oauth"},{"lit":"consent"}],"t":{"req":"`reqdata`","res":"`body.organizations`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/mcp/oauth/authorize","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/mcp/oauth/authorize","q":{"$action":"authorize"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"mcp"},{"lit":"oauth"},{"lit":"authorize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"mcp_oauth","name__orig":"mcp_oauth","Name":"McpOauth","name_":"mcp_oauth","name-":"mcp-oauth","NAME":"MCP_OAUTH","index$":306}, {"active":true,"entity":"mcp_oauth","key$":"BasicMcpOauthFlow","kind":"basic","name":"BasicMcpOauthFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"mcp_oauth_ref01"},"m":{},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"mcp_oauth_ref01","srcdatavar":"mcp_oauth_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-mcp_oauth_ref01"}}],"unreachable":true}]}, 'McpOauth', {"POST /api/v1/mcp/oauth/consent":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["request","approve"],"properties":{"request":{"type":"string"},"approve":{"type":"boolean"},"organization_id":{"type":"string"},"all_organizations":{"type":"boolean","description":"Approve access to all organizations the signed-in user can access, including future memberships. Defaults to false; otherwise organization_id is required."}}}}}},"parameters":[]},"POST /api/v1/mcp/oauth/register":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"POST /api/v1/mcp/oauth/revoke":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"POST /api/v1/mcp/oauth/token":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"GET /api/v1/mcp/oauth/consent":{"protocol":"http","parameters":[{"name":"request","in":"query","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/mcp/oauth/authorize":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"mcp_oauth.create.0":"GET-only live run: needs POST /api/v1/mcp/oauth/consent"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mcp_oauth_ref01_data = Object.values(setup.data.existing.mcp_oauth)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mcp_oauth/McpOauthTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ComposalSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['mcp_oauth01','mcp_oauth02','mcp_oauth03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_MCP_OAUTH_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_MCP_OAUTH_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_MCP_OAUTH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ComposalSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
