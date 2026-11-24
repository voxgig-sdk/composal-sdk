

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


describe('WaitlistApplicationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.WaitlistApplication()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'waitlist_application.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"waitlist_application","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["company_name","company_size","email","invite_code","name","use_case"],"co":{"id":"POST /api/v1/waitlist_applications","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/waitlist_applications","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"waitlist_applications"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"waitlist_application","name__orig":"waitlist_application","Name":"WaitlistApplication","name_":"waitlist_application","name-":"waitlist-application","NAME":"WAITLIST_APPLICATION","index$":545}, {"active":true,"entity":"waitlist_application","key$":"BasicWaitlistApplicationFlow","kind":"basic","name":"BasicWaitlistApplicationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"waitlist_application_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'WaitlistApplication', {"POST /api/v1/waitlist_applications":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"anyOf":[{"type":"object","required":["invite_code"],"properties":{"name":{"type":"string"},"email":{"type":"string","format":"email"},"invite_code":{"type":"string","minLength":1,"description":"Waitlist bypass code. May be submitted without name or email."},"use_case":{"type":"string","enum":["personal","company"]},"company_name":{"type":"string"},"company_size":{"type":"string"}}},{"type":"object","required":["name","email"],"properties":{"name":{"type":"string"},"email":{"type":"string","format":"email"},"invite_code":{"type":"string","minLength":1,"description":"Waitlist bypass code. May be submitted without name or email."},"use_case":{"type":"string","enum":["personal","company"]},"company_name":{"type":"string"},"company_size":{"type":"string"}}}]}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"waitlist_application.create.0":"GET-only live run: needs POST /api/v1/waitlist_applications"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const waitlist_application_ref01_ent = client.WaitlistApplication()
    let waitlist_application_ref01_data = setup.data.new.waitlist_application['waitlist_application_ref01']

    waitlist_application_ref01_data = (await waitlist_application_ref01_ent.create(waitlist_application_ref01_data)).data()
    assert(null != waitlist_application_ref01_data)


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
      '../../../../.sdk/test/entity/waitlist_application/WaitlistApplicationTestData.json')

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
    ['waitlist_application01','waitlist_application02','waitlist_application03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_WAITLIST_APPLICATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_WAITLIST_APPLICATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_WAITLIST_APPLICATION_ENTID']
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
  
