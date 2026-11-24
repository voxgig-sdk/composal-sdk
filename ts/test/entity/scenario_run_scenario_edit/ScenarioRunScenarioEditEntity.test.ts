

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


describe('ScenarioRunScenarioEditEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ScenarioRunScenarioEdit()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'scenario_run_scenario_edit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"scenario_run_scenario_edit","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["idempotency_key","version","viewer_time_zone"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"run_id","or":"id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"scenario_run_id","or":"scenario_run_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run","q":{"$action":"run","exist":["organization_id","project_id","run_id","scenario_run_id"]},"r":{"param":{"id":"run_id","project_id":"project_id","scenario_run_id":"scenario_run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"scenario_runs"},{"var":"scenario_run_id"},{"lit":"scenario_edit"},{"lit":"run"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["outcomes","prompt","steps","version"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"run_id","or":"id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"scenario_run_id","or":"scenario_run_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest","q":{"$action":"suggest","exist":["organization_id","project_id","run_id","scenario_run_id"]},"r":{"param":{"id":"run_id","project_id":"project_id","scenario_run_id":"scenario_run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"scenario_runs"},{"var":"scenario_run_id"},{"lit":"scenario_edit"},{"lit":"suggest"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["outcomes","steps","version"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"run_id","or":"id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"scenario_run_id","or":"scenario_run_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate","q":{"$action":"validate","exist":["organization_id","project_id","run_id","scenario_run_id"]},"r":{"param":{"id":"run_id","project_id":"project_id","scenario_run_id":"scenario_run_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"runs"},{"var":"run_id"},{"lit":"scenario_runs"},{"var":"scenario_run_id"},{"lit":"scenario_edit"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"scenario_run_scenario_edit","name__orig":"scenario_run_scenario_edit","Name":"ScenarioRunScenarioEdit","name_":"scenario_run_scenario_edit","name-":"scenario-run-scenario-edit","NAME":"SCENARIO_RUN_SCENARIO_EDIT","index$":461}, {"active":true,"entity":"scenario_run_scenario_edit","key$":"BasicScenarioRunScenarioEditFlow","kind":"basic","name":"BasicScenarioRunScenarioEditFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"scenario_run_scenario_edit_ref01"},"m":{"organization_id":"organization01","project_id":"project01","run_id":"run01","scenario_run_id":"scenario_run01"},"o":"create","s":[],"v":[],"unreachable":true}]}, 'ScenarioRunScenarioEdit', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["version","idempotency_key"],"properties":{"version":{"type":"integer"},"idempotency_key":{"type":"string"},"viewer_time_zone":{"type":"string"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"scenario_run_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/suggest":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"allOf":[{"type":"object","required":["steps","outcomes"],"properties":{"steps":{},"outcomes":{}},"x-ref":"#/components/schemas/ScenarioEditContent"},{"type":"object","required":["version"],"properties":{"version":{}}}],"x-ref":"#/components/schemas/ScenarioRunEditSave"},{"type":"object","required":["prompt"],"properties":{"prompt":{"type":"string","minLength":1,"maxLength":4000}}}],"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/ScenarioEditSuggestionRequest"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"scenario_run_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/validate":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","required":["steps","outcomes"],"properties":{"steps":{"type":"array","minItems":1,"maxItems":1000,"items":{"oneOf":[]}},"outcomes":{"type":"array","minItems":1,"maxItems":100,"items":{"oneOf":[]}}},"x-ref":"#/components/schemas/ScenarioEditContent"},{"type":"object","required":["version"],"properties":{"version":{"type":"integer"}}}],"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/ScenarioRunEditSave"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"scenario_run_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"scenario_run_scenario_edit.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/runs/{id}/scenario_runs/{scenario_run_id}/scenario_edit/run"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let scenario_run_scenario_edit_ref01_data = Object.values(setup.data.existing.scenario_run_scenario_edit)[0] as any

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
      '../../../../.sdk/test/entity/scenario_run_scenario_edit/ScenarioRunScenarioEditTestData.json')

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
    ['scenario_run_scenario_edit01','scenario_run_scenario_edit02','scenario_run_scenario_edit03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SCENARIO_RUN_SCENARIO_EDIT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SCENARIO_RUN_SCENARIO_EDIT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SCENARIO_RUN_SCENARIO_EDIT_ENTID']
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
  
