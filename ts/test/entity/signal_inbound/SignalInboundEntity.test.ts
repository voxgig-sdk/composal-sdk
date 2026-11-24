

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


describe('SignalInboundEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SignalInbound()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SignalInbound().update({"id":1,"inbound_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'signal_inbound.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id","parts":["inbound_id","id"],"sep":"/"},"name":"signal_inbound","op":{"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/signals/inbound/{provider}/{inbound_token}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"inbound_token","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"inbound_token","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"inbound_id","or":"provider","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"inbound_id","or":"provider","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/signals/inbound/{provider}/{inbound_token}","q":{"exist":["id","inbound_id"]},"r":{"param":{"inbound_token":"id","provider":"inbound_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"signals"},{"lit":"inbound"},{"var":"inbound_id"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"signal_inbound","name__orig":"signal_inbound","Name":"SignalInbound","name_":"signal_inbound","name-":"signal-inbound","NAME":"SIGNAL_INBOUND","index$":468}, {"active":true,"entity":"signal_inbound","key$":"BasicSignalInboundFlow","kind":"basic","name":"BasicSignalInboundFlow","param":{},"step":[{"a":true,"d":{"inbound_id":"inbound01"},"i":{"ref":"signal_inbound_ref01","srcdatavar":"signal_inbound_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-signal_inbound_ref01"}}],"v":[],"index$":0}]}, 'SignalInbound', {"POST /api/v1/signals/inbound/{provider}/{inbound_token}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}},"description":"The provider's raw event body, capped at 1 MB."},"parameters":[{"name":"provider","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"inbound_token","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"in":"path","name":"provider","required":true,"schema":{"type":"string","enum":["sentry","planetscale"]},"index$":2},{"in":"path","name":"inbound_token","required":true,"description":"The integration's random inbound token. Not a public id.","schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"signal_inbound.update.0":"GET-only live run: needs POST /api/v1/signals/inbound/{provider}/{inbound_token}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let signal_inbound_ref01_data = Object.values(setup.data.existing.signal_inbound)[0] as any

    // UPDATE
    const signal_inbound_ref01_ent = client.SignalInbound()
    const signal_inbound_ref01_data_up0: any = {}
    signal_inbound_ref01_data_up0.id = signal_inbound_ref01_data.id
    signal_inbound_ref01_data_up0['inbound_id'] = setup.idmap['inbound_id'] ?? setup.idmap['inbound01']

    const signal_inbound_ref01_resdata_up0 = (await signal_inbound_ref01_ent.update(signal_inbound_ref01_data_up0)).data()
    assert(signal_inbound_ref01_resdata_up0.id === signal_inbound_ref01_data_up0.id)


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
      '../../../../.sdk/test/entity/signal_inbound/SignalInboundTestData.json')

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
    ['signal_inbound01','signal_inbound02','signal_inbound03','inbound01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SIGNAL_INBOUND_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SIGNAL_INBOUND_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SIGNAL_INBOUND_ENTID']
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
  
