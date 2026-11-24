

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


describe('ProjectScenarioRowEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProjectScenarioRow()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectScenarioRow().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_scenario_row.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actor_count":{"a":true,"h":"Actor Count","n":"actor_count","r":true,"t":"`$INTEGER`","key$":"actor_count","index$":0},"dependency_count":{"a":true,"h":"Dependency Count","n":"dependency_count","r":true,"t":"`$INTEGER`","key$":"dependency_count","index$":1},"health":{"a":true,"h":"Health","n":"health","r":true,"t":"`$OBJECT`","key$":"health","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"labels":{"a":true,"h":"Labels","n":"labels","r":true,"t":"`$ARRAY`","key$":"labels","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":5},"persona_id":{"a":true,"h":"Persona Id","n":"persona_id","r":true,"t":"`$STRING`","key$":"persona_id","index$":6},"selectable_for_run":{"a":true,"h":"Selectable For Run","n":"selectable_for_run","r":true,"t":"`$BOOLEAN`","key$":"selectable_for_run","index$":7},"step_count":{"a":true,"h":"Step Count","n":"step_count","r":true,"t":"`$INTEGER`","key$":"step_count","index$":8}},"id":{"field":"id","name":"id"},"name":"project_scenario_row","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_rows","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"sort","or":"sort","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"state","or":"state","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_rows","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"pages"},{"lit":"scenario_rows"}],"t":{"page":{"next":"`body.pagination.next`","total":"`body.pagination.count`"},"req":"`reqdata`","res":"`body.scenarios`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"project_scenario_row","name__orig":"project_scenario_row","Name":"ProjectScenarioRow","name_":"project_scenario_row","name-":"project-scenario-row","NAME":"PROJECT_SCENARIO_ROW","index$":176}, {"active":true,"entity":"project_scenario_row","key$":"BasicProjectScenarioRowFlow","kind":"basic","name":"BasicProjectScenarioRowFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_scenario_row_ref01"}}],"index$":0}]}, 'ProjectScenarioRow', {"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/scenario_rows":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"page","in":"query","schema":{"type":"integer","minimum":1},"index$":2},{"name":"sort","in":"query","schema":{"type":"string","enum":["name","last_run","recently_added"]},"index$":3},{"name":"state","in":"query","schema":{"type":"string","enum":["passing","failing","blocked","cancelled","running","not_run"]},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let project_scenario_row_ref01_data = Object.values(setup.data.existing.project_scenario_row)[0] as any

    // LIST
    const project_scenario_row_ref01_ent = client.ProjectScenarioRow()
    const project_scenario_row_ref01_match: any = {}
    project_scenario_row_ref01_match['organization_id'] = setup.idmap['organization01']
    project_scenario_row_ref01_match['project_id'] = setup.idmap['project01']

    const project_scenario_row_ref01_list = (await project_scenario_row_ref01_ent.list(project_scenario_row_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/project_scenario_row/ProjectScenarioRowTestData.json')

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
    ['project_scenario_row01','project_scenario_row02','project_scenario_row03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PROJECT_SCENARIO_ROW_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PROJECT_SCENARIO_ROW_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PROJECT_SCENARIO_ROW_ENTID']
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
  
