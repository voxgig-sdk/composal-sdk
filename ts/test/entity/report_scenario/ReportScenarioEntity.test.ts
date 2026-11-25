

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


describe('ReportScenarioEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ReportScenario()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ReportScenario().create({"exploration_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'report_scenario.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"environment_name":{"a":true,"h":"Environment Name","n":"environment_name","r":true,"t":"`$STRING`","key$":"environment_name","index$":0},"goal":{"a":true,"h":"Goal","n":"goal","r":true,"t":"`$STRING`","key$":"goal","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"mode":{"a":true,"h":"Mode","n":"mode","r":true,"t":"`$STRING`","key$":"mode","index$":3},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":4},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"project_id","index$":5},"related_explorations":{"a":true,"h":"Related Explorations","n":"related_explorations","r":true,"t":"`$ARRAY`","key$":"related_explorations","index$":6},"report":{"a":true,"h":"Report","n":"report","r":true,"t":"`$OBJECT`","key$":"report","index$":7},"saves_scenarios":{"a":true,"h":"Saves Scenarios","n":"saves_scenarios","r":true,"t":"`$BOOLEAN`","key$":"saves_scenarios","index$":8},"scenario_generation":{"a":true,"h":"Scenario Generation","n":"scenario_generation","r":true,"t":"`$OBJECT`","key$":"scenario_generation","index$":9},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":10}},"id":{"field":"id","name":"id"},"name":"report_scenario","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/scenarios","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"exploration_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/scenarios","q":{"exist":["exploration_id","organization_id"]},"r":{"param":{"id":"exploration_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"explorations"},{"var":"exploration_id"},{"lit":"report"},{"lit":"scenarios"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.exploration"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"report_scenario","name__orig":"report_scenario","Name":"ReportScenario","name_":"report_scenario","name-":"report-scenario","NAME":"REPORT_SCENARIO","index$":435}, {"active":true,"entity":"report_scenario","key$":"BasicReportScenarioFlow","kind":"basic","name":"BasicReportScenarioFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"report_scenario_ref01"},"m":{"exploration_id":"exploration01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ReportScenario', {"POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/scenarios":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"report_scenario.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/scenarios"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const report_scenario_ref01_ent = client.ReportScenario()
    let report_scenario_ref01_data = setup.data.new.report_scenario['report_scenario_ref01']
    report_scenario_ref01_data['exploration_id'] = setup.idmap['exploration01']
    report_scenario_ref01_data['organization_id'] = setup.idmap['organization01']

    report_scenario_ref01_data = (await report_scenario_ref01_ent.create(report_scenario_ref01_data)).data()
    assert(null != report_scenario_ref01_data.id)


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
      '../../../../.sdk/test/entity/report_scenario/ReportScenarioTestData.json')

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
    ['report_scenario01','report_scenario02','report_scenario03','organization01','organization02','organization03','exploration01','exploration02','exploration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPORT_SCENARIO_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPORT_SCENARIO_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPORT_SCENARIO_ENTID']
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
  
