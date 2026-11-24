

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


describe('CiPipelineEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.CiPipeline()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('ci_pipeline hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).CiPipeline().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).CiPipeline()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.CiPipeline().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().CiPipeline().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.CiPipeline().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.CiPipeline().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CiPipeline().list({"ci_runner_pool_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ci_pipeline.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ci_runner_pool_id":{"a":true,"h":"Ci Runner Pool Id","n":"ci_runner_pool_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ci_runner_pool_id","index$":0},"concurrency_key":{"a":true,"h":"Concurrency Key","n":"concurrency_key","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"concurrency_key","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":2},"default_branch":{"a":true,"h":"Default Branch","n":"default_branch","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"default_branch","index$":3},"description":{"a":true,"h":"Description","n":"description","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":4},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"hosted_app_id","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":7},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":8},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_id","index$":9},"required_capabilities_csv":{"a":true,"h":"Required Capabilities Csv","n":"required_capabilities_csv","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"required_capabilities_csv","index$":10},"runner_pool":{"a":true,"h":"Runner Pool","n":"runner_pool","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"runner_pool","index$":11},"runs":{"a":true,"h":"Runs","n":"runs","r":true,"t":"`$ARRAY`","key$":"runs","index$":12},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":13},"source_kind":{"a":true,"h":"Source Kind","n":"source_kind","r":true,"t":"`$STRING`","key$":"source_kind","index$":14},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":15},"status_label":{"a":true,"h":"Status Label","n":"status_label","r":true,"t":"`$STRING`","key$":"status_label","index$":16},"status_state":{"a":true,"h":"Status State","n":"status_state","r":true,"t":"`$STRING`","key$":"status_state","index$":17},"status_tone":{"a":true,"h":"Status Tone","n":"status_tone","r":true,"t":"`$STRING`","key$":"status_tone","index$":18},"trigger_on_pull_request":{"a":true,"h":"Trigger On Pull Request","n":"trigger_on_pull_request","r":true,"t":"`$BOOLEAN`","key$":"trigger_on_pull_request","index$":19},"trigger_on_push":{"a":true,"h":"Trigger On Push","n":"trigger_on_push","r":true,"t":"`$BOOLEAN`","key$":"trigger_on_push","index$":20},"trigger_on_schedule":{"a":true,"h":"Trigger On Schedule","n":"trigger_on_schedule","r":true,"t":"`$BOOLEAN`","key$":"trigger_on_schedule","index$":21},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":22},"workflow_path":{"a":true,"h":"Workflow Path","n":"workflow_path","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"workflow_path","index$":23}},"id":{"field":"id","name":"id"},"name":"ci_pipeline","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/pipelines","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/ci/pipelines","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/ci/pipelines","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/ci/pipelines","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"}],"t":{"req":"`reqdata`","res":"`body.pipelines`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/ci/pipelines/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/ci/pipelines/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.pipeline`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ci_pipeline","name__orig":"ci_pipeline","Name":"CiPipeline","name_":"ci_pipeline","name-":"ci-pipeline","NAME":"CI_PIPELINE","index$":173}, {"active":true,"entity":"ci_pipeline","key$":"BasicCiPipelineFlow","kind":"basic","name":"BasicCiPipelineFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ci_pipeline_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ci_pipeline_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"ci_pipeline_ref01","srcdatavar":"ci_pipeline_ref01_data","suffix":"_dt0"},"m":{"id":"ci_pipeline01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ci_pipeline_ref01"}}],"index$":2,"route":"GET /api/v1/ci/pipelines/{id}","record":{}}]}, 'CiPipeline', {"POST /api/v1/ci/pipelines":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"GET /api/v1/ci/pipelines":{"protocol":"http","parameters":[]},"GET /api/v1/ci/pipelines/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"ci_pipeline.create.0":"GET-only live run: needs POST /api/v1/ci/pipelines"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const ci_pipeline_ref01_ent = client.CiPipeline()
    let ci_pipeline_ref01_data = setup.data.new.ci_pipeline['ci_pipeline_ref01']

    ci_pipeline_ref01_data = (await ci_pipeline_ref01_ent.create(ci_pipeline_ref01_data)).data()
    assert(null != ci_pipeline_ref01_data.id)


    // LIST
    const ci_pipeline_ref01_match: any = {}

    const ci_pipeline_ref01_list = (await ci_pipeline_ref01_ent.list(ci_pipeline_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(ci_pipeline_ref01_list, { id: ci_pipeline_ref01_data.id })))


    // LOAD
    const ci_pipeline_ref01_match_dt0: any = {}
    ci_pipeline_ref01_match_dt0.id = ci_pipeline_ref01_data.id
    const ci_pipeline_ref01_data_dt0 = (await ci_pipeline_ref01_ent.load(ci_pipeline_ref01_match_dt0)).data()
    assert(ci_pipeline_ref01_data_dt0.id === ci_pipeline_ref01_data.id)


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
      '../../../../.sdk/test/entity/ci_pipeline/CiPipelineTestData.json')

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
    ['ci_pipeline01','ci_pipeline02','ci_pipeline03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CI_PIPELINE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CI_PIPELINE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CI_PIPELINE_ENTID']
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
  
