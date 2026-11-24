

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


describe('RunnerLeaseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RunnerLease()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RunnerLease().list({"runner_id":1,"runner_pool_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'runner_lease.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"runner_lease","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_id","or":"runner_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim","q":{"$action":"claim","exist":["id","runner_id","runner_pool_id"]},"r":{"param":{"id":"id","runner_id":"runner_id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"runner_id"},{"lit":"leases"},{"var":"id"},{"lit":"claim"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/heartbeat","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_id","or":"runner_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/heartbeat","q":{"$action":"heartbeat","exist":["id","runner_id","runner_pool_id"]},"r":{"param":{"id":"id","runner_id":"runner_id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"runner_id"},{"lit":"leases"},{"var":"id"},{"lit":"heartbeat"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/release","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_id","or":"runner_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/release","q":{"$action":"release","exist":["id","runner_id","runner_pool_id"]},"r":{"param":{"id":"id","runner_id":"runner_id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"runner_id"},{"lit":"leases"},{"var":"id"},{"lit":"release"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"runner_id","or":"runner_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases","q":{"exist":["runner_id","runner_pool_id"]},"r":{"param":{"runner_id":"runner_id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"runner_id"},{"lit":"leases"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"runner_id","or":"runner_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases","q":{"exist":["runner_id","runner_pool_id"]},"r":{"param":{"runner_id":"runner_id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"runner_id"},{"lit":"leases"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"runner_lease","name__orig":"runner_lease","Name":"RunnerLease","name_":"runner_lease","name-":"runner-lease","NAME":"RUNNER_LEASE","index$":458}, {"active":true,"entity":"runner_lease","key$":"BasicRunnerLeaseFlow","kind":"basic","name":"BasicRunnerLeaseFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"runner_lease_ref01"},"m":{"runner_id":"runner01","runner_pool_id":"runner_pool01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"runner_id":"runner01","runner_pool_id":"runner_pool01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"runner_lease_ref01"}}],"index$":1}]}, 'RunnerLease', {"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"runner_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/heartbeat":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"runner_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/release":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"runner_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"runner_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases":{"protocol":"http","parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"runner_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"runner_lease.create.0":"GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{runner_id}/leases/{id}/claim"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const runner_lease_ref01_ent = client.RunnerLease()
    let runner_lease_ref01_data = setup.data.new.runner_lease['runner_lease_ref01']
    runner_lease_ref01_data['runner_id'] = setup.idmap['runner01']
    runner_lease_ref01_data['runner_pool_id'] = setup.idmap['runner_pool01']

    runner_lease_ref01_data = (await runner_lease_ref01_ent.create(runner_lease_ref01_data)).data()
    assert(null != runner_lease_ref01_data.id)


    // LIST
    const runner_lease_ref01_match: any = {}
    runner_lease_ref01_match['runner_id'] = setup.idmap['runner01']
    runner_lease_ref01_match['runner_pool_id'] = setup.idmap['runner_pool01']

    const runner_lease_ref01_list = (await runner_lease_ref01_ent.list(runner_lease_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(runner_lease_ref01_list, { id: runner_lease_ref01_data.id })))


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
      '../../../../.sdk/test/entity/runner_lease/RunnerLeaseTestData.json')

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
    ['runner_lease01','runner_lease02','runner_lease03','runner01','runner_pool01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_RUNNER_LEASE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_RUNNER_LEASE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_RUNNER_LEASE_ENTID']
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
  
