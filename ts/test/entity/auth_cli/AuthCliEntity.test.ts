

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


describe('AuthCliEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AuthCli()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'auth_cli.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"auth_cli","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["login_id","organization_id"],"co":{"id":"POST /api/v1/auth/cli/complete","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/cli/complete","q":{"$action":"complete"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"cli"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/auth/cli/exchange","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/cli/exchange","q":{"$action":"exchange"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"cli"},{"lit":"exchange"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["organization_slug"],"co":{"id":"POST /api/v1/auth/cli/install","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/cli/install","q":{"$action":"install"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"cli"},{"lit":"install"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["client_kind","intent","name"],"co":{"id":"POST /api/v1/auth/cli/start","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/cli/start","q":{"$action":"start"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"cli"},{"lit":"start"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"auth_cli","name__orig":"auth_cli","Name":"AuthCli","name_":"auth_cli","name-":"auth-cli","NAME":"AUTH_CLI","index$":109}, {"active":true,"entity":"auth_cli","key$":"BasicAuthCliFlow","kind":"basic","name":"BasicAuthCliFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"auth_cli_ref01"},"m":{},"o":"create","s":[],"v":[],"unreachable":true}]}, 'AuthCli', {"POST /api/v1/auth/cli/complete":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["login_id"],"properties":{"login_id":{"type":"string"},"organization_id":{"type":"string","description":"Public ID of the organization the CLI saves as its default."}},"additionalProperties":true,"x-ref":"#/components/schemas/CliLoginCompletePayload"}}}},"parameters":[]},"POST /api/v1/auth/cli/exchange":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"POST /api/v1/auth/cli/install":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["organization_slug"],"properties":{"organization_slug":{"type":"string"}}}}}},"parameters":[]},"POST /api/v1/auth/cli/start":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"name":{"type":"string"},"client_kind":{"type":"string","enum":["cli","desktop","android","android_dev","ios","ios_dev"],"description":"android_dev and ios_dev return to their separate local apps using server-owned callback URLs. Clients cannot supply arbitrary callback URLs."},"intent":{"type":"string","enum":["signin","signup"]}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"auth_cli.create.0":"GET-only live run: needs POST /api/v1/auth/cli/complete"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let auth_cli_ref01_data = Object.values(setup.data.existing.auth_cli)[0] as any

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
      '../../../../.sdk/test/entity/auth_cli/AuthCliTestData.json')

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
    ['auth_cli01','auth_cli02','auth_cli03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AUTH_CLI_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AUTH_CLI_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AUTH_CLI_ENTID']
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
  
