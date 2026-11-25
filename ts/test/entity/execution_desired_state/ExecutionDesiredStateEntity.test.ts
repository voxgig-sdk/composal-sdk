

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


describe('ExecutionDesiredStateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ExecutionDesiredState()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ExecutionDesiredState().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'execution_desired_state.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"desired_state":{"a":true,"h":"Desired State","n":"desired_state","r":true,"t":"`$OBJECT`","key$":"desired_state","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":1},"stop_observed":{"a":true,"h":"Stop Observed","n":"stop_observed","r":true,"sh":"True only for archived zero-capacity states with all known jobs stopped and allocations terminated.","t":"`$BOOLEAN`","key$":"stop_observed","index$":2}},"id":{"field":"id","name":"id"},"name":"execution_desired_state","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/execution/desired_states/{id}/reconcile","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/execution/desired_states/{id}/reconcile","q":{"$action":"reconcile","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"desired_states"},{"var":"id"},{"lit":"reconcile"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/execution/desired_states","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/execution/desired_states","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"desired_states"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/execution/desired_states/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/execution/desired_states/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"desired_states"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.desired_state`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/execution/desired_states","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/execution/desired_states","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"desired_states"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/execution/desired_states/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/v1/execution/desired_states/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"desired_states"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/execution/desired_states/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/execution/desired_states/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"desired_states"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/execution/desired_states/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/execution/desired_states/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"desired_states"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"execution_desired_state","name__orig":"execution_desired_state","Name":"ExecutionDesiredState","name_":"execution_desired_state","name-":"execution-desired-state","NAME":"EXECUTION_DESIRED_STATE","index$":236}, {"active":true,"entity":"execution_desired_state","key$":"BasicExecutionDesiredStateFlow","kind":"basic","name":"BasicExecutionDesiredStateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"execution_desired_state_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"execution_desired_state_ref01","srcdatavar":"execution_desired_state_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-execution_desired_state_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"execution_desired_state_ref01","srcdatavar":"execution_desired_state_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-execution_desired_state_ref01"}}],"index$":2,"route":"GET /api/v1/execution/desired_states/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"execution_desired_state_ref01","suffix":"_rm0"},"m":{"id":"execution_desired_state01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'ExecutionDesiredState', {"POST /api/v1/execution/desired_states/{id}/reconcile":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/execution/desired_states":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"GET /api/v1/execution/desired_states/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/execution/desired_states":{"protocol":"http","parameters":[]},"PATCH /api/v1/execution/desired_states/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /api/v1/execution/desired_states/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /api/v1/execution/desired_states/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"execution_desired_state.create.0":"GET-only live run: needs POST /api/v1/execution/desired_states/{id}/reconcile","execution_desired_state.update.1":"GET-only live run: needs PUT /api/v1/execution/desired_states/{id}","execution_desired_state.load.2":"GET-only live run: reads a record only execution_desired_state.create.0 gives","execution_desired_state.remove.3":"GET-only live run: needs DELETE /api/v1/execution/desired_states/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const execution_desired_state_ref01_ent = client.ExecutionDesiredState()
    let execution_desired_state_ref01_data = setup.data.new.execution_desired_state['execution_desired_state_ref01']

    execution_desired_state_ref01_data = (await execution_desired_state_ref01_ent.create(execution_desired_state_ref01_data)).data()
    assert(null != execution_desired_state_ref01_data.id)


    // UPDATE
    const execution_desired_state_ref01_data_up0: any = {}
    execution_desired_state_ref01_data_up0.id = execution_desired_state_ref01_data.id

    const execution_desired_state_ref01_resdata_up0 = (await execution_desired_state_ref01_ent.update(execution_desired_state_ref01_data_up0)).data()
    assert(execution_desired_state_ref01_resdata_up0.id === execution_desired_state_ref01_data_up0.id)


    // LOAD
    const execution_desired_state_ref01_match_dt0: any = {}
    execution_desired_state_ref01_match_dt0.id = execution_desired_state_ref01_data.id
    const execution_desired_state_ref01_data_dt0 = (await execution_desired_state_ref01_ent.load(execution_desired_state_ref01_match_dt0)).data()
    assert(execution_desired_state_ref01_data_dt0.id === execution_desired_state_ref01_data.id)


    // REMOVE
    const execution_desired_state_ref01_match_rm0: any = { id: execution_desired_state_ref01_data.id }
    await execution_desired_state_ref01_ent.remove(execution_desired_state_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/execution_desired_state/ExecutionDesiredStateTestData.json')

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
    ['execution_desired_state01','execution_desired_state02','execution_desired_state03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_EXECUTION_DESIRED_STATE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_EXECUTION_DESIRED_STATE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_EXECUTION_DESIRED_STATE_ENTID']
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
  
