

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


describe('BackendRunnerPoolEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BackendRunnerPool()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BackendRunnerPool().load({"backend_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'backend_runner_pool.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"backend_runner_pool","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/bazel/backends/{backend_id}/runner_pools","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"backend_id","or":"backend_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/bazel/backends/{backend_id}/runner_pools","q":{"exist":["backend_id"]},"r":{"param":{"backend_id":"backend_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"bazel"},{"lit":"backends"},{"var":"backend_id"},{"lit":"runner_pools"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/bazel/backends/{backend_id}/runner_pools","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"backend_id","or":"backend_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/bazel/backends/{backend_id}/runner_pools","q":{"exist":["backend_id"]},"r":{"param":{"backend_id":"backend_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"bazel"},{"lit":"backends"},{"var":"backend_id"},{"lit":"runner_pools"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/bazel/backends/{backend_id}/runner_pools/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"backend_id","or":"backend_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/bazel/backends/{backend_id}/runner_pools/{id}","q":{"exist":["backend_id","id"]},"r":{"param":{"backend_id":"backend_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"bazel"},{"lit":"backends"},{"var":"backend_id"},{"lit":"runner_pools"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"backend_runner_pool","name__orig":"backend_runner_pool","Name":"BackendRunnerPool","name_":"backend_runner_pool","name-":"backend-runner-pool","NAME":"BACKEND_RUNNER_POOL","index$":117}, {"active":true,"entity":"backend_runner_pool","key$":"BasicBackendRunnerPoolFlow","kind":"basic","name":"BasicBackendRunnerPoolFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"backend_runner_pool_ref01"},"m":{"backend_id":"backend01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"backend_runner_pool_ref01","srcdatavar":"backend_runner_pool_ref01_data","suffix":"_dt0"},"m":{"id":"backend_runner_pool01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-backend_runner_pool_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"backend_runner_pool_ref01","suffix":"_rm0"},"m":{"backend_id":"backend01","id":"backend_runner_pool01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'BackendRunnerPool', {"POST /api/v1/bazel/backends/{backend_id}/runner_pools":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"backend_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/bazel/backends/{backend_id}/runner_pools":{"protocol":"http","parameters":[{"name":"backend_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /api/v1/bazel/backends/{backend_id}/runner_pools/{id}":{"protocol":"http","parameters":[{"name":"backend_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"backend_runner_pool.create.0":"GET-only live run: needs POST /api/v1/bazel/backends/{backend_id}/runner_pools","backend_runner_pool.load.1":"GET-only live run: reads a record only backend_runner_pool.create.0 gives","backend_runner_pool.remove.2":"GET-only live run: needs DELETE /api/v1/bazel/backends/{backend_id}/runner_pools/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const backend_runner_pool_ref01_ent = client.BackendRunnerPool()
    let backend_runner_pool_ref01_data = setup.data.new.backend_runner_pool['backend_runner_pool_ref01']
    backend_runner_pool_ref01_data['backend_id'] = setup.idmap['backend01']

    backend_runner_pool_ref01_data = (await backend_runner_pool_ref01_ent.create(backend_runner_pool_ref01_data)).data()
    assert(null != backend_runner_pool_ref01_data.id)


    // LOAD
    const backend_runner_pool_ref01_match_dt0: any = {}
    backend_runner_pool_ref01_match_dt0.id = backend_runner_pool_ref01_data.id
    const backend_runner_pool_ref01_data_dt0 = (await backend_runner_pool_ref01_ent.load(backend_runner_pool_ref01_match_dt0)).data()
    assert(backend_runner_pool_ref01_data_dt0.id === backend_runner_pool_ref01_data.id)


    // REMOVE
    const backend_runner_pool_ref01_match_rm0: any = { id: backend_runner_pool_ref01_data.id }
    backend_runner_pool_ref01_match_rm0['backend_id'] = setup.idmap['backend_id'] ?? setup.idmap['backend01']
    await backend_runner_pool_ref01_ent.remove(backend_runner_pool_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/backend_runner_pool/BackendRunnerPoolTestData.json')

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
    ['backend_runner_pool01','backend_runner_pool02','backend_runner_pool03','backend01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BACKEND_RUNNER_POOL_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BACKEND_RUNNER_POOL_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BACKEND_RUNNER_POOL_ENTID']
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
  
