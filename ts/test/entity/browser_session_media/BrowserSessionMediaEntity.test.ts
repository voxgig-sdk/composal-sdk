

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


describe('BrowserSessionMediaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BrowserSessionMedia()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BrowserSessionMedia().load({"browser_session_id":1,"id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'browser_session_media.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser_session_id":{"a":true,"h":"Browser Session Id","n":"browser_session_id","r":true,"t":"`$STRING`","key$":"browser_session_id","index$":0},"capture_omissions":{"a":true,"h":"Capture Omissions","n":"capture_omissions","r":false,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"capture_omissions","index$":1},"captured_at":{"a":true,"fo":"date-time","h":"Captured At","n":"captured_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"captured_at","index$":2},"ended_at":{"a":true,"fo":"date-time","h":"Ended At","n":"ended_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ended_at","index$":3},"failure_code":{"a":true,"h":"Failure Code","n":"failure_code","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_code","index$":4},"files":{"a":true,"h":"Files","n":"files","r":true,"t":"`$ARRAY`","key$":"files","index$":5},"frames":{"a":true,"h":"Frames","n":"frames","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"frames","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":8},"partial":{"a":true,"h":"Partial","n":"partial","r":true,"sh":"Retained footage has a capture failure or reported omissions.","t":"`$BOOLEAN`","key$":"partial","index$":9},"retention_expires_at":{"a":true,"fo":"date-time","h":"Retention Expires At","n":"retention_expires_at","r":true,"t":"`$STRING`","key$":"retention_expires_at","index$":10},"source":{"a":true,"h":"Source","n":"source","r":false,"sh":"Screenshot provenance.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"source","index$":11},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":12},"stop_requested_at":{"a":true,"fo":"date-time","h":"Stop Requested At","n":"stop_requested_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"stop_requested_at","index$":13}},"id":{"field":"id","name":"id"},"name":"browser_session_media","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"browser_session_id","or":"browser_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}","q":{"exist":["browser_session_id","id","organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"browser_sessions"},{"var":"browser_session_id"},{"lit":"media"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.browser_session"]]},"key$":"browser_session_media","name__orig":"browser_session_media","Name":"BrowserSessionMedia","name_":"browser_session_media","name-":"browser-session-media","NAME":"BROWSER_SESSION_MEDIA","index$":80}, {"active":true,"entity":"browser_session_media","key$":"BasicBrowserSessionMediaFlow","kind":"basic","name":"BasicBrowserSessionMediaFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"browser_session_media_ref01","srcdatavar":"browser_session_media_ref01_data","suffix":"_dt0"},"m":{"browser_session_id":"browser_session01","id":"browser_session_media01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-browser_session_media_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}","record":{"browser_session_id":"browser_session_id"}}]}, 'BrowserSessionMedia', {"GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/media/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"browser_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let browser_session_media_ref01_data = Object.values(setup.data.existing.browser_session_media)[0] as any

    // LOAD
    const browser_session_media_ref01_ent = client.BrowserSessionMedia()
    const browser_session_media_ref01_match_dt0: any = {}
    browser_session_media_ref01_match_dt0.id = browser_session_media_ref01_data.id
    browser_session_media_ref01_match_dt0['browser_session_id'] = ['string', 'number', 'boolean'].includes(typeof browser_session_media_ref01_data['browser_session_id']) ?
      browser_session_media_ref01_data['browser_session_id'] : setup.idmap['browser_session_id'] ?? setup.idmap['browser_session01']
    browser_session_media_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const browser_session_media_ref01_data_dt0 = (await browser_session_media_ref01_ent.load(browser_session_media_ref01_match_dt0)).data()
    assert(browser_session_media_ref01_data_dt0.id === browser_session_media_ref01_data.id)


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
      '../../../../.sdk/test/entity/browser_session_media/BrowserSessionMediaTestData.json')

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
    ['browser_session_media01','browser_session_media02','browser_session_media03','organization01','organization02','organization03','browser_session01','browser_session02','browser_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BROWSER_SESSION_MEDIA_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BROWSER_SESSION_MEDIA_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BROWSER_SESSION_MEDIA_ENTID']
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
  
