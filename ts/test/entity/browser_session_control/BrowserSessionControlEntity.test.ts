

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


describe('BrowserSessionControlEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BrowserSessionControl()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BrowserSessionControl().load({"browser_session_id":1,"id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'browser_session_control.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser_session_id":{"a":true,"h":"Browser Session Id","n":"browser_session_id","r":true,"t":"`$STRING`","key$":"browser_session_id","index$":0},"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"completed_at","index$":1},"completed_generation":{"a":true,"h":"Completed Generation","n":"completed_generation","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"completed_generation","index$":2},"connection":{"a":true,"h":"Connection","n":"connection","r":false,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"connection","index$":3},"failure_code":{"a":true,"h":"Failure Code","n":"failure_code","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_code","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"requested_controller":{"a":true,"h":"Requested Controller","n":"requested_controller","r":true,"t":"`$STRING`","key$":"requested_controller","index$":6},"requested_generation":{"a":true,"h":"Requested Generation","n":"requested_generation","r":true,"t":"`$INTEGER`","key$":"requested_generation","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":8}},"id":{"field":"id","name":"id"},"name":"browser_session_control","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/controls/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"browser_session_id","or":"browser_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/controls/{id}","q":{"exist":["browser_session_id","id","organization_id"]},"r":{"param":{"browser_session_id":"browser_session_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"browser_sessions"},{"var":"browser_session_id"},{"lit":"controls"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.browser_session"]]},"key$":"browser_session_control","name__orig":"browser_session_control","Name":"BrowserSessionControl","name_":"browser_session_control","name-":"browser-session-control","NAME":"BROWSER_SESSION_CONTROL","index$":140}, {"active":true,"entity":"browser_session_control","key$":"BasicBrowserSessionControlFlow","kind":"basic","name":"BasicBrowserSessionControlFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"browser_session_control_ref01","srcdatavar":"browser_session_control_ref01_data","suffix":"_dt0"},"m":{"browser_session_id":"browser_session01","id":"browser_session_control01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-browser_session_control_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/controls/{id}","record":{"browser_session_id":"browser_session_id"}}]}, 'BrowserSessionControl', {"GET /api/v1/organizations/{organization_id}/browser_sessions/{browser_session_id}/controls/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"browser_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let browser_session_control_ref01_data = Object.values(setup.data.existing.browser_session_control)[0] as any

    // LOAD
    const browser_session_control_ref01_ent = client.BrowserSessionControl()
    const browser_session_control_ref01_match_dt0: any = {}
    browser_session_control_ref01_match_dt0.id = browser_session_control_ref01_data.id
    browser_session_control_ref01_match_dt0['browser_session_id'] = ['string', 'number', 'boolean'].includes(typeof browser_session_control_ref01_data['browser_session_id']) ?
      browser_session_control_ref01_data['browser_session_id'] : setup.idmap['browser_session_id'] ?? setup.idmap['browser_session01']
    browser_session_control_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const browser_session_control_ref01_data_dt0 = (await browser_session_control_ref01_ent.load(browser_session_control_ref01_match_dt0)).data()
    assert(browser_session_control_ref01_data_dt0.id === browser_session_control_ref01_data.id)


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
      '../../../../.sdk/test/entity/browser_session_control/BrowserSessionControlTestData.json')

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
    ['browser_session_control01','browser_session_control02','browser_session_control03','organization01','organization02','organization03','browser_session01','browser_session02','browser_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BROWSER_SESSION_CONTROL_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BROWSER_SESSION_CONTROL_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BROWSER_SESSION_CONTROL_ENTID']
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
  
