

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


describe('PageCiPipelineRunEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PageCiPipelineRun()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PageCiPipelineRun().load({"id":1,"pipeline_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'page_ci_pipeline_run.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"error":{"a":true,"h":"Error","n":"error","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":1},"jobs":{"a":true,"h":"Jobs","n":"jobs","r":true,"t":"`$ARRAY`","key$":"jobs","index$":2}},"id":{"field":"id","name":"id"},"name":"page_ci_pipeline_run","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/page","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"run_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/page","q":{"exist":["id","pipeline_id"]},"r":{"param":{"pipeline_id":"pipeline_id","run_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"id"},{"lit":"page"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"page_ci_pipeline_run","name__orig":"page_ci_pipeline_run","Name":"PageCiPipelineRun","name_":"page_ci_pipeline_run","name-":"page-ci-pipeline-run","NAME":"PAGE_CI_PIPELINE_RUN","index$":358}, {"active":true,"entity":"page_ci_pipeline_run","key$":"BasicPageCiPipelineRunFlow","kind":"basic","name":"BasicPageCiPipelineRunFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"page_ci_pipeline_run_ref01","srcdatavar":"page_ci_pipeline_run_ref01_data","suffix":"_dt0"},"m":{"id":"page_ci_pipeline_run01","pipeline_id":"pipeline01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-page_ci_pipeline_run_ref01"}}],"index$":0,"route":"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/page","record":{}}]}, 'PageCiPipelineRun', {"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/page":{"protocol":"http","parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let page_ci_pipeline_run_ref01_data = Object.values(setup.data.existing.page_ci_pipeline_run)[0] as any

    // LOAD
    const page_ci_pipeline_run_ref01_ent = client.PageCiPipelineRun()
    const page_ci_pipeline_run_ref01_match_dt0: any = {}
    page_ci_pipeline_run_ref01_match_dt0.id = page_ci_pipeline_run_ref01_data.id
    page_ci_pipeline_run_ref01_match_dt0['pipeline_id'] = setup.idmap['pipeline_id'] ?? setup.idmap['pipeline01']
    const page_ci_pipeline_run_ref01_data_dt0 = (await page_ci_pipeline_run_ref01_ent.load(page_ci_pipeline_run_ref01_match_dt0)).data()
    assert(page_ci_pipeline_run_ref01_data_dt0.id === page_ci_pipeline_run_ref01_data.id)


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
      '../../../../.sdk/test/entity/page_ci_pipeline_run/PageCiPipelineRunTestData.json')

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
    ['page_ci_pipeline_run01','page_ci_pipeline_run02','page_ci_pipeline_run03','pipeline01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PAGE_CI_PIPELINE_RUN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PAGE_CI_PIPELINE_RUN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PAGE_CI_PIPELINE_RUN_ENTID']
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
  
