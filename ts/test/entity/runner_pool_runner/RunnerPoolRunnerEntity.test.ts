

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


describe('RunnerPoolRunnerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RunnerPoolRunner()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RunnerPoolRunner().load({"id":1,"runner_pool_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'runner_pool_runner.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"runner_pool_runner","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat","q":{"$action":"heartbeat","exist":["id","runner_pool_id"]},"r":{"param":{"id":"id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"id"},{"lit":"heartbeat"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners","q":{"exist":["runner_pool_id"]},"r":{"param":{"runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}","q":{"exist":["id","runner_pool_id"]},"r":{"param":{"id":"id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/ci/runner_pools/{runner_pool_id}/runners","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners","q":{"exist":["runner_pool_id"]},"r":{"param":{"runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}","q":{"exist":["id","runner_pool_id"]},"r":{"param":{"id":"id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"runner_pool_id","or":"runner_pool_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}","q":{"exist":["id","runner_pool_id"]},"r":{"param":{"id":"id","runner_pool_id":"runner_pool_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"runner_pools"},{"var":"runner_pool_id"},{"lit":"runners"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"runner_pool_runner","name__orig":"runner_pool_runner","Name":"RunnerPoolRunner","name_":"runner_pool_runner","name-":"runner-pool-runner","NAME":"RUNNER_POOL_RUNNER","index$":458}, {"active":true,"entity":"runner_pool_runner","key$":"BasicRunnerPoolRunnerFlow","kind":"basic","name":"BasicRunnerPoolRunnerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"runner_pool_runner_ref01"},"m":{"runner_pool_id":"runner_pool01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"runner_pool_id":"runner_pool01"},"i":{"ref":"runner_pool_runner_ref01","srcdatavar":"runner_pool_runner_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-runner_pool_runner_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"runner_pool_runner_ref01","srcdatavar":"runner_pool_runner_ref01_data","suffix":"_dt0"},"m":{"id":"runner_pool_runner01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-runner_pool_runner_ref01"}}],"index$":2}]}, 'RunnerPoolRunner', {"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/ci/runner_pools/{runner_pool_id}/runners":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}":{"protocol":"http","parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/ci/runner_pools/{runner_pool_id}/runners":{"protocol":"http","parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runner_pool_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"runner_pool_runner.create.0":"GET-only live run: needs POST /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}/heartbeat","runner_pool_runner.update.1":"GET-only live run: needs PUT /api/v1/ci/runner_pools/{runner_pool_id}/runners/{id}","runner_pool_runner.load.2":"GET-only live run: reads a record only runner_pool_runner.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const runner_pool_runner_ref01_ent = client.RunnerPoolRunner()
    let runner_pool_runner_ref01_data = setup.data.new.runner_pool_runner['runner_pool_runner_ref01']
    runner_pool_runner_ref01_data['runner_pool_id'] = setup.idmap['runner_pool01']

    runner_pool_runner_ref01_data = (await runner_pool_runner_ref01_ent.create(runner_pool_runner_ref01_data)).data()
    assert(null != runner_pool_runner_ref01_data.id)


    // UPDATE
    const runner_pool_runner_ref01_data_up0: any = {}
    runner_pool_runner_ref01_data_up0.id = runner_pool_runner_ref01_data.id
    runner_pool_runner_ref01_data_up0['runner_pool_id'] = setup.idmap['runner_pool_id'] ?? setup.idmap['runner_pool01']

    const runner_pool_runner_ref01_resdata_up0 = (await runner_pool_runner_ref01_ent.update(runner_pool_runner_ref01_data_up0)).data()
    assert(runner_pool_runner_ref01_resdata_up0.id === runner_pool_runner_ref01_data_up0.id)


    // LOAD
    const runner_pool_runner_ref01_match_dt0: any = {}
    runner_pool_runner_ref01_match_dt0.id = runner_pool_runner_ref01_data.id
    const runner_pool_runner_ref01_data_dt0 = (await runner_pool_runner_ref01_ent.load(runner_pool_runner_ref01_match_dt0)).data()
    assert(runner_pool_runner_ref01_data_dt0.id === runner_pool_runner_ref01_data.id)


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
      '../../../../.sdk/test/entity/runner_pool_runner/RunnerPoolRunnerTestData.json')

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
    ['runner_pool_runner01','runner_pool_runner02','runner_pool_runner03','runner_pool01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_RUNNER_POOL_RUNNER_ENTID']
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
  
