

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


describe('JobLogChunkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.JobLogChunk()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.JobLogChunk().list({"job_id":1,"pipeline_id":"x","run_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'job_log_chunk.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"byte_size":{"a":true,"h":"Byte Size","n":"byte_size","r":true,"t":"`$INTEGER`","key$":"byte_size","index$":0},"ci_job_id":{"a":true,"h":"Ci Job Id","n":"ci_job_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ci_job_id","index$":1},"ci_pipeline_run_id":{"a":true,"h":"Ci Pipeline Run Id","n":"ci_pipeline_run_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ci_pipeline_run_id","index$":2},"ci_step_id":{"a":true,"h":"Ci Step Id","n":"ci_step_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ci_step_id","index$":3},"content":{"a":true,"h":"Content","n":"content","r":true,"t":"`$STRING`","key$":"content","index$":4},"content_format":{"a":true,"h":"Content Format","n":"content_format","r":true,"t":"`$STRING`","key$":"content_format","index$":5},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":8},"sequence_number":{"a":true,"h":"Sequence Number","n":"sequence_number","r":true,"t":"`$INTEGER`","key$":"sequence_number","index$":9},"stream":{"a":true,"h":"Stream","n":"stream","r":true,"t":"`$STRING`","key$":"stream","index$":10},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":11}},"id":{"field":"id","name":"id"},"name":"job_log_chunk","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"job_id","or":"job_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"run_id","or":"run_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks","q":{"exist":["job_id","pipeline_id","run_id"]},"r":{"param":{"job_id":"job_id","pipeline_id":"pipeline_id","run_id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"jobs"},{"var":"job_id"},{"lit":"log_chunks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"job_id","or":"job_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"run_id","or":"run_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"after_sequence","or":"after_sequence","r":false,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks","q":{"exist":["job_id","pipeline_id","run_id"]},"r":{"param":{"job_id":"job_id","pipeline_id":"pipeline_id","run_id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"jobs"},{"var":"job_id"},{"lit":"log_chunks"}],"t":{"req":"`reqdata`","res":"`body.log_chunks`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"job_log_chunk","name__orig":"job_log_chunk","Name":"JobLogChunk","name_":"job_log_chunk","name-":"job-log-chunk","NAME":"JOB_LOG_CHUNK","index$":282}, {"active":true,"entity":"job_log_chunk","key$":"BasicJobLogChunkFlow","kind":"basic","name":"BasicJobLogChunkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"job_log_chunk_ref01"},"m":{"job_id":"job01","pipeline_id":"pipeline01","run_id":"run01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"job_id":"job01","pipeline_id":"pipeline01","run_id":"run01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"job_log_chunk_ref01"}}],"index$":1}]}, 'JobLogChunk', {"POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"job_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks":{"protocol":"http","parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"job_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"after_sequence","in":"query","required":false,"description":"Return only chunks with a sequence number greater than this.","schema":{"type":"integer","minimum":0},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"job_log_chunk.create.0":"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/jobs/{job_id}/log_chunks"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const job_log_chunk_ref01_ent = client.JobLogChunk()
    let job_log_chunk_ref01_data = setup.data.new.job_log_chunk['job_log_chunk_ref01']
    job_log_chunk_ref01_data['job_id'] = setup.idmap['job01']
    job_log_chunk_ref01_data['pipeline_id'] = setup.idmap['pipeline01']
    job_log_chunk_ref01_data['run_id'] = setup.idmap['run01']

    job_log_chunk_ref01_data = (await job_log_chunk_ref01_ent.create(job_log_chunk_ref01_data)).data()
    assert(null != job_log_chunk_ref01_data.id)


    // LIST
    const job_log_chunk_ref01_match: any = {}
    job_log_chunk_ref01_match['job_id'] = setup.idmap['job01']
    job_log_chunk_ref01_match['pipeline_id'] = setup.idmap['pipeline01']
    job_log_chunk_ref01_match['run_id'] = setup.idmap['run01']

    const job_log_chunk_ref01_list = (await job_log_chunk_ref01_ent.list(job_log_chunk_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(job_log_chunk_ref01_list, { id: job_log_chunk_ref01_data.id })))


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
      '../../../../.sdk/test/entity/job_log_chunk/JobLogChunkTestData.json')

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
    ['job_log_chunk01','job_log_chunk02','job_log_chunk03','job01','pipeline01','run01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_JOB_LOG_CHUNK_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_JOB_LOG_CHUNK_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_JOB_LOG_CHUNK_ENTID']
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
  
