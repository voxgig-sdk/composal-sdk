

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


describe('BrowserSessionConnectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BrowserSessionConnection()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BrowserSessionConnection().create({"browser_session_id":1,"organization_id":"x","generation":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'browser_session_connection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"generation":{"a":true,"h":"Generation","n":"generation","r":true,"t":"`$INTEGER`","key$":"generation","index$":0},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":false,"t":"`$STRING`","key$":"idempotency_key","index$":1}},"name":"browser_session_connection","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["generation","idempotency_key"],"co":{"id":"POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/connections","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"browser_session_id","or":"browser_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/connections","q":{"exist":["browser_session_id","organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"browser_sessions"},{"var":"browser_session_id"},{"lit":"connections"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.browser_session"]]},"key$":"browser_session_connection","name__orig":"browser_session_connection","Name":"BrowserSessionConnection","name_":"browser_session_connection","name-":"browser-session-connection","NAME":"BROWSER_SESSION_CONNECTION","index$":77}, {"active":true,"entity":"browser_session_connection","key$":"BasicBrowserSessionConnectionFlow","kind":"basic","name":"BasicBrowserSessionConnectionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"browser_session_connection_ref01"},"m":{"browser_session_id":"browser_session01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'BrowserSessionConnection', {"POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/connections":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["generation"],"properties":{"generation":{"type":"integer","minimum":0,"key$":"generation"},"idempotency_key":{"type":"string","minLength":1,"maxLength":255,"key$":"idempotency_key"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"browser_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","required":false,"schema":{"type":"string","minLength":1,"maxLength":255},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"browser_session_connection.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/connections"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const browser_session_connection_ref01_ent = client.BrowserSessionConnection()
    let browser_session_connection_ref01_data = setup.data.new.browser_session_connection['browser_session_connection_ref01']
    browser_session_connection_ref01_data['browser_session_id'] = setup.idmap['browser_session01']
    browser_session_connection_ref01_data['organization_id'] = setup.idmap['organization01']

    browser_session_connection_ref01_data = (await browser_session_connection_ref01_ent.create(browser_session_connection_ref01_data)).data()
    assert(null != browser_session_connection_ref01_data)


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
      '../../../../.sdk/test/entity/browser_session_connection/BrowserSessionConnectionTestData.json')

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
    ['browser_session_connection01','browser_session_connection02','browser_session_connection03','organization01','organization02','organization03','browser_session01','browser_session02','browser_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BROWSER_SESSION_CONNECTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BROWSER_SESSION_CONNECTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BROWSER_SESSION_CONNECTION_ENTID']
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
  
