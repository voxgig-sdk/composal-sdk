

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


describe('BrowserSessionEventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BrowserSessionEvent()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BrowserSessionEvent().list({"browser_session_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'browser_session_event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser_task_id":{"a":true,"h":"Browser Task Id","n":"browser_task_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"browser_task_id","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":3},"payload":{"a":true,"h":"Payload","n":"payload","r":true,"t":"`$OBJECT`","key$":"payload","index$":4},"source_sequence":{"a":true,"h":"Source Sequence","n":"source_sequence","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"source_sequence","index$":5}},"id":{"field":"id","name":"id"},"name":"browser_session_event","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/events","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"browser_session_id","or":"browser_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"after","or":"after","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/events","q":{"exist":["browser_session_id","organization_id"]},"r":{"param":{"browser_session_id":"browser_session_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"browser_sessions"},{"var":"browser_session_id"},{"lit":"events"}],"t":{"page":{"cursor":"`body.next_cursor`"},"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.browser_session"]]},"key$":"browser_session_event","name__orig":"browser_session_event","Name":"BrowserSessionEvent","name_":"browser_session_event","name-":"browser-session-event","NAME":"BROWSER_SESSION_EVENT","index$":79}, {"active":true,"entity":"browser_session_event","key$":"BasicBrowserSessionEventFlow","kind":"basic","name":"BasicBrowserSessionEventFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"browser_session_id":"browser_session01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"browser_session_event_ref01"}}],"index$":0}]}, 'BrowserSessionEvent', {"GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/events":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"browser_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"after","in":"query","schema":{"type":"string"},"description":"Cursor from the same browser session.","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let browser_session_event_ref01_data = Object.values(setup.data.existing.browser_session_event)[0] as any

    // LIST
    const browser_session_event_ref01_ent = client.BrowserSessionEvent()
    const browser_session_event_ref01_match: any = {}
    browser_session_event_ref01_match['browser_session_id'] = setup.idmap['browser_session01']
    browser_session_event_ref01_match['organization_id'] = setup.idmap['organization01']

    const browser_session_event_ref01_list = (await browser_session_event_ref01_ent.list(browser_session_event_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/browser_session_event/BrowserSessionEventTestData.json')

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
    ['browser_session_event01','browser_session_event02','browser_session_event03','organization01','organization02','organization03','browser_session01','browser_session02','browser_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BROWSER_SESSION_EVENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BROWSER_SESSION_EVENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BROWSER_SESSION_EVENT_ENTID']
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
  
