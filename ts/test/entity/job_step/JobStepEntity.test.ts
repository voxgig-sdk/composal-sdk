

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


describe('JobStepEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.JobStep()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.JobStep().load({"job_id":1,"pipeline_id":"x","run_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'job_step.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"job_step","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"job_id","or":"job_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"run_id","or":"run_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps","q":{"exist":["job_id","pipeline_id","run_id"]},"r":{"param":{"job_id":"job_id","pipeline_id":"pipeline_id","run_id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"jobs"},{"var":"job_id"},{"lit":"steps"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"job_id","or":"job_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"run_id","or":"run_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps","q":{"exist":["job_id","pipeline_id","run_id"]},"r":{"param":{"job_id":"job_id","pipeline_id":"pipeline_id","run_id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"jobs"},{"var":"job_id"},{"lit":"steps"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"job_id","or":"job_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"run_id","or":"run_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"PATCH","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}","q":{"exist":["id","job_id","pipeline_id","run_id"]},"r":{"param":{"id":"id","job_id":"job_id","pipeline_id":"pipeline_id","run_id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"jobs"},{"var":"job_id"},{"lit":"steps"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"job_id","or":"job_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"run_id","or":"run_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"PUT","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}","q":{"exist":["id","job_id","pipeline_id","run_id"]},"r":{"param":{"id":"id","job_id":"job_id","pipeline_id":"pipeline_id","run_id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"jobs"},{"var":"job_id"},{"lit":"steps"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"job_step","name__orig":"job_step","Name":"JobStep","name_":"job_step","name-":"job-step","NAME":"JOB_STEP","index$":284}, {"active":true,"entity":"job_step","key$":"BasicJobStepFlow","kind":"basic","name":"BasicJobStepFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"job_step_ref01"},"m":{"job_id":"job01","pipeline_id":"pipeline01","run_id":"run01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"job_id":"job01","pipeline_id":"pipeline01","run_id":"run01"},"i":{"ref":"job_step_ref01","srcdatavar":"job_step_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-job_step_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"job_step_ref01","srcdatavar":"job_step_ref01_data","suffix":"_dt0"},"m":{"id":"job_step01","pipeline_id":"pipeline01","run_id":"run01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-job_step_ref01"}}],"index$":2}]}, 'JobStep', {"POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"job_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps":{"protocol":"http","parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"job_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"job_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"job_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"job_step.create.0":"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps","job_step.update.1":"GET-only live run: needs PUT /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/steps/{id}","job_step.load.2":"GET-only live run: reads a record only job_step.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const job_step_ref01_ent = client.JobStep()
    let job_step_ref01_data = setup.data.new.job_step['job_step_ref01']
    job_step_ref01_data['job_id'] = setup.idmap['job01']
    job_step_ref01_data['pipeline_id'] = setup.idmap['pipeline01']
    job_step_ref01_data['run_id'] = setup.idmap['run01']

    job_step_ref01_data = (await job_step_ref01_ent.create(job_step_ref01_data)).data()
    assert(null != job_step_ref01_data.id)


    // UPDATE
    const job_step_ref01_data_up0: any = {}
    job_step_ref01_data_up0.id = job_step_ref01_data.id
    job_step_ref01_data_up0['job_id'] = setup.idmap['job_id'] ?? setup.idmap['job01']
    job_step_ref01_data_up0['pipeline_id'] = setup.idmap['pipeline_id'] ?? setup.idmap['pipeline01']
    job_step_ref01_data_up0['run_id'] = setup.idmap['run_id'] ?? setup.idmap['run01']

    const job_step_ref01_resdata_up0 = (await job_step_ref01_ent.update(job_step_ref01_data_up0)).data()
    assert(job_step_ref01_resdata_up0.id === job_step_ref01_data_up0.id)


    // LOAD
    const job_step_ref01_match_dt0: any = {}
    job_step_ref01_match_dt0.id = job_step_ref01_data.id
    job_step_ref01_match_dt0['pipeline_id'] = setup.idmap['pipeline_id'] ?? setup.idmap['pipeline01']
    job_step_ref01_match_dt0['run_id'] = setup.idmap['run_id'] ?? setup.idmap['run01']
    const job_step_ref01_data_dt0 = (await job_step_ref01_ent.load(job_step_ref01_match_dt0)).data()
    assert(job_step_ref01_data_dt0.id === job_step_ref01_data.id)


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
      '../../../../.sdk/test/entity/job_step/JobStepTestData.json')

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
    ['job_step01','job_step02','job_step03','job01','pipeline01','run01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_JOB_STEP_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_JOB_STEP_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_JOB_STEP_ENTID']
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
  
