

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


describe('SignalIntegrationDeliveryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SignalIntegrationDelivery()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SignalIntegrationDelivery().list({"organization_id":1,"signal_integration_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'signal_integration_delivery.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attempt_count":{"a":true,"h":"Attempt Count","n":"attempt_count","r":true,"t":"`$INTEGER`","key$":"attempt_count","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at","index$":1},"delivery_id":{"a":true,"h":"Delivery Id","n":"delivery_id","r":true,"sh":"The provider's delivery id, or a `content-…` id derived from the event kind, its timestamp header and the body checksum when it sends none.","t":"`$STRING`","key$":"delivery_id","index$":2},"event_kind":{"a":true,"h":"Event Kind","n":"event_kind","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"event_kind","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Public id (`sdel_…`).","t":"`$STRING`","key$":"id","index$":4},"last_error":{"a":true,"h":"Last Error","n":"last_error","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_error","index$":5},"ops_signal_id":{"a":true,"h":"Ops Signal Id","n":"ops_signal_id","r":false,"sh":"Public id (`sig_…`) of the signal this delivery emitted.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ops_signal_id","index$":6},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":7},"processed_at":{"a":true,"h":"Processed At","n":"processed_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"processed_at","index$":8},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"t":"`$STRING`","key$":"provider","index$":9},"received_at":{"a":true,"h":"Received At","n":"received_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"received_at","index$":10},"signal_integration_id":{"a":true,"h":"Signal Integration Id","n":"signal_integration_id","r":true,"t":"`$STRING`","key$":"signal_integration_id","index$":11},"state":{"a":true,"h":"State","n":"state","r":true,"t":"`$STRING`","key$":"state","index$":12}},"id":{"field":"id","name":"id"},"name":"signal_integration_delivery","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/deliveries","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"signal_integration_id","or":"signal_integration_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/deliveries","q":{"exist":["organization_id","signal_integration_id"]},"r":{"param":{"signal_integration_id":"signal_integration_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"},{"var":"signal_integration_id"},{"lit":"deliveries"}],"t":{"req":"`reqdata`","res":"`body.signal_integration_deliveries`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.signal_integration"]]},"key$":"signal_integration_delivery","name__orig":"signal_integration_delivery","Name":"SignalIntegrationDelivery","name_":"signal_integration_delivery","name-":"signal-integration-delivery","NAME":"SIGNAL_INTEGRATION_DELIVERY","index$":474}, {"active":true,"entity":"signal_integration_delivery","key$":"BasicSignalIntegrationDeliveryFlow","kind":"basic","name":"BasicSignalIntegrationDeliveryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","signal_integration_id":"signal_integration01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"signal_integration_delivery_ref01"}}],"index$":0}]}, 'SignalIntegrationDelivery', {"GET /api/v1/organizations/{organization_id}/signal_integrations/{signal_integration_id}/deliveries":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"signal_integration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"in":"query","name":"limit","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let signal_integration_delivery_ref01_data = Object.values(setup.data.existing.signal_integration_delivery)[0] as any

    // LIST
    const signal_integration_delivery_ref01_ent = client.SignalIntegrationDelivery()
    const signal_integration_delivery_ref01_match: any = {}
    signal_integration_delivery_ref01_match['organization_id'] = setup.idmap['organization01']
    signal_integration_delivery_ref01_match['signal_integration_id'] = setup.idmap['signal_integration01']

    const signal_integration_delivery_ref01_list = (await signal_integration_delivery_ref01_ent.list(signal_integration_delivery_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/signal_integration_delivery/SignalIntegrationDeliveryTestData.json')

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
    ['signal_integration_delivery01','signal_integration_delivery02','signal_integration_delivery03','organization01','organization02','organization03','signal_integration01','signal_integration02','signal_integration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SIGNAL_INTEGRATION_DELIVERY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SIGNAL_INTEGRATION_DELIVERY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SIGNAL_INTEGRATION_DELIVERY_ENTID']
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
  
