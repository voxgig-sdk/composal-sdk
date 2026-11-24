

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


describe('ScenarioRunLessonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ScenarioRunLesson()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ScenarioRunLesson().create({"organization_id":1,"project_id":"x","run_id":"x","scenario_run_id":"x","finding":"x","workaround":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'scenario_run_lesson.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"finding":{"a":true,"h":"Finding","n":"finding","r":true,"t":"`$STRING`","key$":"finding","index$":0},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Defaults to the Scenario's name.","t":"`$STRING`","key$":"title","index$":1},"workaround":{"a":true,"h":"Workaround","n":"workaround","r":true,"t":"`$STRING`","key$":"workaround","index$":2}},"name":"scenario_run_lesson","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["finding","title","workaround"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"run_id","or":"id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"scenario_run_id","or":"scenario_run_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons","q":{"exist":["organization_id","project_id","run_id","scenario_run_id"]},"r":{"param":{"id":"run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"scenario_runs"},{"var":"scenario_run_id"},{"lit":"lessons"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"scenario_run_lesson","name__orig":"scenario_run_lesson","Name":"ScenarioRunLesson","name_":"scenario_run_lesson","name-":"scenario-run-lesson","NAME":"SCENARIO_RUN_LESSON","index$":193}, {"active":true,"entity":"scenario_run_lesson","key$":"BasicScenarioRunLessonFlow","kind":"basic","name":"BasicScenarioRunLessonFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"scenario_run_lesson_ref01"},"m":{"organization_id":"organization01","project_id":"project01","run_id":"run01","scenario_run_id":"scenario_run01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ScenarioRunLesson', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["finding","workaround"],"properties":{"title":{"type":"string","maxLength":160,"description":"Defaults to the Scenario's name.","key$":"title"},"finding":{"type":"string","maxLength":1000,"key$":"finding"},"workaround":{"type":"string","maxLength":1000,"key$":"workaround"}},"additionalProperties":true,"x-ref":"#/components/schemas/ScenarioRunLessonInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"scenario_run_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"scenario_run_lesson.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/lessons"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const scenario_run_lesson_ref01_ent = client.ScenarioRunLesson()
    let scenario_run_lesson_ref01_data = setup.data.new.scenario_run_lesson['scenario_run_lesson_ref01']
    scenario_run_lesson_ref01_data['organization_id'] = setup.idmap['organization01']
    scenario_run_lesson_ref01_data['project_id'] = setup.idmap['project01']
    scenario_run_lesson_ref01_data['run_id'] = setup.idmap['run01']
    scenario_run_lesson_ref01_data['scenario_run_id'] = setup.idmap['scenario_run01']

    scenario_run_lesson_ref01_data = (await scenario_run_lesson_ref01_ent.create(scenario_run_lesson_ref01_data)).data()
    assert(null != scenario_run_lesson_ref01_data)


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
      '../../../../.sdk/test/entity/scenario_run_lesson/ScenarioRunLessonTestData.json')

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
    ['scenario_run_lesson01','scenario_run_lesson02','scenario_run_lesson03','organization01','organization02','organization03','project01','project02','project03','run01','scenario_run01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SCENARIO_RUN_LESSON_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SCENARIO_RUN_LESSON_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SCENARIO_RUN_LESSON_ENTID']
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
  
