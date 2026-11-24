

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


describe('RunArtifactEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RunArtifact()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RunArtifact().list({"pipeline_id":1,"run_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'run_artifact.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"run_artifact","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"run_id","or":"run_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts","q":{"exist":["pipeline_id","run_id"]},"r":{"param":{"pipeline_id":"pipeline_id","run_id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"artifacts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"pipeline_id","or":"pipeline_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"run_id","or":"run_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts","q":{"exist":["pipeline_id","run_id"]},"r":{"param":{"pipeline_id":"pipeline_id","run_id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"pipelines"},{"var":"pipeline_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"artifacts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"run_artifact","name__orig":"run_artifact","Name":"RunArtifact","name_":"run_artifact","name-":"run-artifact","NAME":"RUN_ARTIFACT","index$":447}, {"active":true,"entity":"run_artifact","key$":"BasicRunArtifactFlow","kind":"basic","name":"BasicRunArtifactFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"run_artifact_ref01"},"m":{"pipeline_id":"pipeline01","run_id":"run01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"pipeline_id":"pipeline01","run_id":"run01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"run_artifact_ref01"}}],"index$":1}]}, 'RunArtifact', {"POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts":{"protocol":"http","parameters":[{"name":"pipeline_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"run_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"run_artifact.create.0":"GET-only live run: needs POST /api/v1/ci/pipelines/{pipeline_id}/runs/{run_id}/artifacts"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const run_artifact_ref01_ent = client.RunArtifact()
    let run_artifact_ref01_data = setup.data.new.run_artifact['run_artifact_ref01']
    run_artifact_ref01_data['pipeline_id'] = setup.idmap['pipeline01']
    run_artifact_ref01_data['run_id'] = setup.idmap['run01']

    run_artifact_ref01_data = (await run_artifact_ref01_ent.create(run_artifact_ref01_data)).data()
    assert(null != run_artifact_ref01_data)


    // LIST
    const run_artifact_ref01_match: any = {}
    run_artifact_ref01_match['pipeline_id'] = setup.idmap['pipeline01']
    run_artifact_ref01_match['run_id'] = setup.idmap['run01']

    const run_artifact_ref01_list = (await run_artifact_ref01_ent.list(run_artifact_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/run_artifact/RunArtifactTestData.json')

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
    ['run_artifact01','run_artifact02','run_artifact03','pipeline01','run01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_RUN_ARTIFACT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_RUN_ARTIFACT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_RUN_ARTIFACT_ENTID']
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
  
