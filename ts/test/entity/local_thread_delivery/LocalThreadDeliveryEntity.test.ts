

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


describe('LocalThreadDeliveryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.LocalThreadDelivery()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LocalThreadDelivery().load({"agent_id":1,"id":"x","local_thread_id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'local_thread_delivery.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"decision":{"a":true,"h":"Decision","n":"decision","r":true,"t":"`$STRING`","key$":"decision","index$":0},"decision_pending":{"a":true,"h":"Decision Pending","n":"decision_pending","r":true,"t":"`$BOOLEAN`","key$":"decision_pending","index$":1},"delivery":{"a":true,"h":"Delivery","n":"delivery","r":true,"t":"`$OBJECT`","key$":"delivery","index$":2},"expected_version":{"a":true,"h":"Expected Version","n":"expected_version","r":true,"t":"`$INTEGER`","key$":"expected_version","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":4},"policy":{"a":true,"h":"Policy","n":"policy","r":true,"t":"`$OBJECT`","key$":"policy","index$":5},"recovery_message":{"a":true,"h":"Recovery Message","n":"recovery_message","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"recovery_message","index$":6}},"id":{"field":"id","name":"id"},"name":"local_thread_delivery","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"delivery_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"local_thread_id","or":"local_thread_id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":3}],"query":[{"a":true,"explode":true,"k":"query","n":"expected_version","or":"expected_version","r":false,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}","q":{"exist":["agent_id","id","local_thread_id","organization_id"]},"r":{"param":{"delivery_id":"id","id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"local_threads"},{"var":"local_thread_id"},{"lit":"deliveries"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["decision","expected_version"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"delivery_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"local_thread_id","or":"local_thread_id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}","q":{"exist":["agent_id","id","local_thread_id","organization_id"]},"r":{"param":{"delivery_id":"id","id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"local_threads"},{"var":"local_thread_id"},{"lit":"deliveries"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"local_thread_delivery","name__orig":"local_thread_delivery","Name":"LocalThreadDelivery","name_":"local_thread_delivery","name-":"local-thread-delivery","NAME":"LOCAL_THREAD_DELIVERY","index$":126}, {"active":true,"entity":"local_thread_delivery","key$":"BasicLocalThreadDeliveryFlow","kind":"basic","name":"BasicLocalThreadDeliveryFlow","param":{},"step":[{"a":true,"d":{"agent_id":"agent01","local_thread_id":"local_thread01","organization_id":"organization01"},"i":{"ref":"local_thread_delivery_ref01","srcdatavar":"local_thread_delivery_ref01_data","suffix":"_up0","textfield":"decision"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-local_thread_delivery_ref01"}}],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"local_thread_delivery_ref01","srcdatavar":"local_thread_delivery_ref01_data","suffix":"_dt0"},"m":{"agent_id":"agent01","id":"local_thread_delivery01","local_thread_id":"local_thread01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-local_thread_delivery_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}","record":{}}]}, 'LocalThreadDelivery', {"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"local_thread_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"delivery_id","in":"path","required":true,"schema":{"type":"string"},"index$":3},{"name":"expected_version","in":"query","required":false,"schema":{"type":"integer","minimum":1},"description":"Original preference version retained with an unconfirmed decision.","index$":4}]},"PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"expected_version":{"type":"integer","minimum":1,"key$":"expected_version"},"decision":{"type":"string","enum":["approve","dismiss"],"key$":"decision"}},"required":["expected_version","decision"],"x-ref":"#/components/schemas/AgentRelayDeliveryDecisionInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"local_thread_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"delivery_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"local_thread_delivery.update.0":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/local_threads/{local_thread_id}/deliveries/{delivery_id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let local_thread_delivery_ref01_data = Object.values(setup.data.existing.local_thread_delivery)[0] as any

    // UPDATE
    const local_thread_delivery_ref01_ent = client.LocalThreadDelivery()
    const local_thread_delivery_ref01_data_up0: any = {}
    local_thread_delivery_ref01_data_up0.id = local_thread_delivery_ref01_data.id
    local_thread_delivery_ref01_data_up0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    local_thread_delivery_ref01_data_up0['local_thread_id'] = setup.idmap['local_thread_id'] ?? setup.idmap['local_thread01']
    local_thread_delivery_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const local_thread_delivery_ref01_markdef_up0 = { name: 'decision', value: 'Mark01-local_thread_delivery_ref01_' + setup.now }
    ;(local_thread_delivery_ref01_data_up0 as any)[local_thread_delivery_ref01_markdef_up0.name] = local_thread_delivery_ref01_markdef_up0.value

    const local_thread_delivery_ref01_resdata_up0 = (await local_thread_delivery_ref01_ent.update(local_thread_delivery_ref01_data_up0)).data()
    assert(local_thread_delivery_ref01_resdata_up0.id === local_thread_delivery_ref01_data_up0.id)

    assert((local_thread_delivery_ref01_resdata_up0 as any)[local_thread_delivery_ref01_markdef_up0.name] === local_thread_delivery_ref01_markdef_up0.value)


    // LOAD
    const local_thread_delivery_ref01_match_dt0: any = {}
    local_thread_delivery_ref01_match_dt0.id = local_thread_delivery_ref01_data.id
    local_thread_delivery_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    local_thread_delivery_ref01_match_dt0['local_thread_id'] = setup.idmap['local_thread_id'] ?? setup.idmap['local_thread01']
    local_thread_delivery_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const local_thread_delivery_ref01_data_dt0 = (await local_thread_delivery_ref01_ent.load(local_thread_delivery_ref01_match_dt0)).data()
    assert(local_thread_delivery_ref01_data_dt0.id === local_thread_delivery_ref01_data.id)


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
      '../../../../.sdk/test/entity/local_thread_delivery/LocalThreadDeliveryTestData.json')

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
    ['local_thread_delivery01','local_thread_delivery02','local_thread_delivery03','organization01','organization02','organization03','agent01','agent02','agent03','local_thread01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_LOCAL_THREAD_DELIVERY_ENTID']
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
  
