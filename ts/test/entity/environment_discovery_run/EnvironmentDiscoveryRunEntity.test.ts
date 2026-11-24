

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


describe('EnvironmentDiscoveryRunEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.EnvironmentDiscoveryRun()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EnvironmentDiscoveryRun().load({"environment_id":1,"id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'environment_discovery_run.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_id":{"a":true,"h":"Account Id","n":"account_id","op":{"create":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":true,"sh":"Omit for anonymous exploration","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"account_id","index$":0},"deadline_at":{"a":true,"fo":"date-time","h":"Deadline At","n":"deadline_at","r":true,"t":"`$STRING`","key$":"deadline_at","index$":1},"environment_revision_id":{"a":true,"h":"Environment Revision Id","n":"environment_revision_id","r":true,"t":"`$STRING`","key$":"environment_revision_id","index$":2},"evidence":{"a":true,"h":"Evidence","n":"evidence","r":false,"t":"`$ARRAY`","key$":"evidence","index$":3},"failure_code":{"a":true,"h":"Failure Code","n":"failure_code","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_code","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"queued_at":{"a":true,"fo":"date-time","h":"Queued At","n":"queued_at","r":true,"t":"`$STRING`","key$":"queued_at","index$":6},"recording":{"a":true,"h":"Recording","n":"recording","r":true,"t":"`$OBJECT`","key$":"recording","index$":7},"result":{"a":true,"h":"Result","n":"result","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"result","index$":8},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":9}},"id":{"field":"id","name":"id"},"name":"environment_discovery_run","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}/stop","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"environment_id","or":"verify_environment_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}/stop","q":{"$action":"stop","exist":["environment_id","id","organization_id"]},"r":{"param":{"verify_environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"environments"},{"var":"environment_id"},{"lit":"discovery_runs"},{"var":"id"},{"lit":"stop"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["account_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"environment_id","or":"verify_environment_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs","q":{"exist":["environment_id","idempotency_key","organization_id"]},"r":{"param":{"verify_environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"environments"},{"var":"environment_id"},{"lit":"discovery_runs"}],"t":{"req":{"account_id":"`reqdata.account_id`"},"res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"environment_id","or":"verify_environment_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}","q":{"exist":["environment_id","id","organization_id"]},"r":{"param":{"verify_environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"environments"},{"var":"environment_id"},{"lit":"discovery_runs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.environment"]]},"key$":"environment_discovery_run","name__orig":"environment_discovery_run","Name":"EnvironmentDiscoveryRun","name_":"environment_discovery_run","name-":"environment-discovery-run","NAME":"ENVIRONMENT_DISCOVERY_RUN","index$":106}, {"active":true,"entity":"environment_discovery_run","key$":"BasicEnvironmentDiscoveryRunFlow","kind":"basic","name":"BasicEnvironmentDiscoveryRunFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"environment_discovery_run_ref01"},"m":{"environment_id":"environment01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"environment_discovery_run_ref01","srcdatavar":"environment_discovery_run_ref01_data","suffix":"_dt0"},"m":{"environment_id":"environment01","id":"environment_discovery_run01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-environment_discovery_run_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}","record":{}}]}, 'EnvironmentDiscoveryRun', {"POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}/stop":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"verify_environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"account_id":{"type":"string","nullable":true,"description":"Omit for anonymous exploration","key$":"account_id"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"verify_environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"verify_environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"environment_discovery_run.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/discovery_runs/{id}/stop","environment_discovery_run.load.1":"GET-only live run: reads a record only environment_discovery_run.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const environment_discovery_run_ref01_ent = client.EnvironmentDiscoveryRun()
    let environment_discovery_run_ref01_data = setup.data.new.environment_discovery_run['environment_discovery_run_ref01']
    environment_discovery_run_ref01_data['environment_id'] = setup.idmap['environment01']
    environment_discovery_run_ref01_data['organization_id'] = setup.idmap['organization01']

    environment_discovery_run_ref01_data = (await environment_discovery_run_ref01_ent.create(environment_discovery_run_ref01_data)).data()
    assert(null != environment_discovery_run_ref01_data.id)


    // LOAD
    const environment_discovery_run_ref01_match_dt0: any = {}
    environment_discovery_run_ref01_match_dt0.id = environment_discovery_run_ref01_data.id
    environment_discovery_run_ref01_match_dt0['environment_id'] = setup.idmap['environment_id'] ?? setup.idmap['environment01']
    environment_discovery_run_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const environment_discovery_run_ref01_data_dt0 = (await environment_discovery_run_ref01_ent.load(environment_discovery_run_ref01_match_dt0)).data()
    assert(environment_discovery_run_ref01_data_dt0.id === environment_discovery_run_ref01_data.id)


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
      '../../../../.sdk/test/entity/environment_discovery_run/EnvironmentDiscoveryRunTestData.json')

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
    ['environment_discovery_run01','environment_discovery_run02','environment_discovery_run03','organization01','organization02','organization03','environment01','environment02','environment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ENVIRONMENT_DISCOVERY_RUN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ENVIRONMENT_DISCOVERY_RUN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ENVIRONMENT_DISCOVERY_RUN_ENTID']
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
  
