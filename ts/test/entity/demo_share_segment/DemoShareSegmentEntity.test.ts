

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


describe('DemoShareSegmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DemoShareSegment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DemoShareSegment().load({"demo_share_id":1,"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'demo_share_segment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"demo_share_segment","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/verify/demo_shares/{token}/segments/{segment_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"demo_share_id","or":"token","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"segment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/verify/demo_shares/{token}/segments/{segment_id}","q":{"exist":["demo_share_id","id"]},"r":{"param":{"segment_id":"id","token":"demo_share_id"}},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"video/mp4"},{"binary":true,"kind":"raw","media":"video/webm"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"verify"},{"lit":"demo_shares"},{"var":"demo_share_id"},{"lit":"segments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.demo_share"]]},"key$":"demo_share_segment","name__orig":"demo_share_segment","Name":"DemoShareSegment","name_":"demo_share_segment","name-":"demo-share-segment","NAME":"DEMO_SHARE_SEGMENT","index$":100}, {"active":true,"entity":"demo_share_segment","key$":"BasicDemoShareSegmentFlow","kind":"basic","name":"BasicDemoShareSegmentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"demo_share_segment_ref01","srcdatavar":"demo_share_segment_ref01_data","suffix":"_dt0"},"m":{"demo_share_id":"demo_share01","id":"demo_share_segment01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-demo_share_segment_ref01"}}],"index$":0,"route":"GET /api/v1/verify/demo_shares/{token}/segments/{segment_id}","record":{}}]}, 'DemoShareSegment', {"GET /api/v1/verify/demo_shares/{token}/segments/{segment_id}":{"protocol":"http","parameters":[{"name":"token","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"segment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let demo_share_segment_ref01_data = Object.values(setup.data.existing.demo_share_segment)[0] as any

    // LOAD
    const demo_share_segment_ref01_ent = client.DemoShareSegment()
    const demo_share_segment_ref01_match_dt0: any = {}
    demo_share_segment_ref01_match_dt0.id = demo_share_segment_ref01_data.id
    demo_share_segment_ref01_match_dt0['demo_share_id'] = setup.idmap['demo_share_id'] ?? setup.idmap['demo_share01']
    const demo_share_segment_ref01_data_dt0 = (await demo_share_segment_ref01_ent.load(demo_share_segment_ref01_match_dt0)).data()
    assert(demo_share_segment_ref01_data_dt0.id === demo_share_segment_ref01_data.id)


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
      '../../../../.sdk/test/entity/demo_share_segment/DemoShareSegmentTestData.json')

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
    ['demo_share_segment01','demo_share_segment02','demo_share_segment03','demo_share01','demo_share02','demo_share03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEMO_SHARE_SEGMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEMO_SHARE_SEGMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEMO_SHARE_SEGMENT_ENTID']
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
  
