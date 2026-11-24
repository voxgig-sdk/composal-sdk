

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


describe('ComSiteAccessSessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ComSiteAccessSession()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ComSiteAccessSession().create({"host":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'com_site_access_session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cookie_name":{"a":true,"h":"Cookie Name","n":"cookie_name","r":true,"t":"`$STRING`","key$":"cookie_name","index$":0},"host":{"a":true,"h":"Host","n":"host","r":true,"sh":"Site hostname, for example docs.acme.composal.page","t":"`$STRING`","key$":"host","index$":1},"max_age":{"a":true,"h":"Max Age","n":"max_age","r":true,"t":"`$INTEGER`","key$":"max_age","index$":2},"session_token":{"a":true,"h":"Session Token","n":"session_token","r":true,"t":"`$STRING`","key$":"session_token","index$":3}},"name":"com_site_access_session","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["host"],"co":{"id":"POST /api/v1/com_site_access/sessions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/com_site_access/sessions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"com_site_access"},{"lit":"sessions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"com_site_access_session","name__orig":"com_site_access_session","Name":"ComSiteAccessSession","name_":"com_site_access_session","name-":"com-site-access-session","NAME":"COM_SITE_ACCESS_SESSION","index$":182}, {"active":true,"entity":"com_site_access_session","key$":"BasicComSiteAccessSessionFlow","kind":"basic","name":"BasicComSiteAccessSessionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"com_site_access_session_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ComSiteAccessSession', {"POST /api/v1/com_site_access/sessions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["host"],"properties":{"host":{"type":"string","description":"Site hostname, for example docs.acme.composal.page","key$":"host"}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"com_site_access_session.create.0":"GET-only live run: needs POST /api/v1/com_site_access/sessions"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const com_site_access_session_ref01_ent = client.ComSiteAccessSession()
    let com_site_access_session_ref01_data = setup.data.new.com_site_access_session['com_site_access_session_ref01']

    com_site_access_session_ref01_data = (await com_site_access_session_ref01_ent.create(com_site_access_session_ref01_data)).data()
    assert(null != com_site_access_session_ref01_data)


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
      '../../../../.sdk/test/entity/com_site_access_session/ComSiteAccessSessionTestData.json')

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
    ['com_site_access_session01','com_site_access_session02','com_site_access_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_COM_SITE_ACCESS_SESSION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_COM_SITE_ACCESS_SESSION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_COM_SITE_ACCESS_SESSION_ENTID']
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
  
