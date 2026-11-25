

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


describe('EnvironmentTestAccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.EnvironmentTestAccount()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EnvironmentTestAccount().list({"environment_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'environment_test_account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"configured":{"a":true,"h":"Configured","n":"configured","r":true,"t":"`$BOOLEAN`","key$":"configured","index$":0},"credentials":{"a":true,"h":"Credentials","n":"credentials","r":true,"t":"`$ARRAY`","key$":"credentials","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":2},"persona":{"a":true,"h":"Persona","n":"persona","r":true,"t":"`$STRING`","key$":"persona","index$":3},"revision_id":{"a":true,"h":"Revision Id","n":"revision_id","r":true,"t":"`$STRING`","key$":"revision_id","index$":4},"role":{"a":true,"h":"Role","n":"role","r":true,"t":"`$STRING`","key$":"role","index$":5},"tenant":{"a":true,"h":"Tenant","n":"tenant","r":true,"t":"`$STRING`","key$":"tenant","index$":6}},"id":{"field":"id","name":"id"},"name":"environment_test_account","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"environment_id","or":"verify_environment_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts","q":{"exist":["environment_id","organization_id"]},"r":{"param":{"verify_environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"environments"},{"var":"environment_id"},{"lit":"test_accounts"}],"t":{"req":"`reqdata`","res":"`body.accounts`"},"index$":0}],"key$":"list"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["credentials","revision_id"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"environment_id","or":"verify_environment_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"persona","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}","q":{"exist":["environment_id","id","organization_id"]},"r":{"param":{"persona":"id","verify_environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"environments"},{"var":"environment_id"},{"lit":"test_accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"environment_id","or":"verify_environment_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"persona","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}","q":{"exist":["environment_id","id","organization_id"]},"r":{"param":{"persona":"id","verify_environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"environments"},{"var":"environment_id"},{"lit":"test_accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"environment_test_account","name__orig":"environment_test_account","Name":"EnvironmentTestAccount","name_":"environment_test_account","name-":"environment-test-account","NAME":"ENVIRONMENT_TEST_ACCOUNT","index$":235}, {"active":true,"entity":"environment_test_account","key$":"BasicEnvironmentTestAccountFlow","kind":"basic","name":"BasicEnvironmentTestAccountFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"environment_id":"environment01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"environment_test_account_ref01"}}],"index$":0},{"a":true,"d":{"environment_id":"environment01","organization_id":"organization01"},"i":{"ref":"environment_test_account_ref01","srcdatavar":"environment_test_account_ref01_data","suffix":"_up0","textfield":"persona"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-environment_test_account_ref01"}}],"v":[],"index$":1}]}, 'EnvironmentTestAccount', {"GET /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"verify_environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["revision_id","credentials"],"properties":{"revision_id":{"type":"string","key$":"revision_id"},"credentials":{"type":"object","minProperties":1,"additionalProperties":{"oneOf":[{"type":"string","minLength":1,"writeOnly":true},{"type":"object","additionalProperties":false,"required":[],"properties":{}}]},"key$":"credentials"}},"x-ref":"#/components/schemas/VerifyTestAccountUpdateInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"verify_environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"persona","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"verify_environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"persona","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"environment_test_account.update.1":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/environments/{verify_environment_id}/test_accounts/{persona}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let environment_test_account_ref01_data = Object.values(setup.data.existing.environment_test_account)[0] as any

    // LIST
    const environment_test_account_ref01_ent = client.EnvironmentTestAccount()
    const environment_test_account_ref01_match: any = {}
    environment_test_account_ref01_match['environment_id'] = setup.idmap['environment01']
    environment_test_account_ref01_match['organization_id'] = setup.idmap['organization01']

    const environment_test_account_ref01_list = (await environment_test_account_ref01_ent.list(environment_test_account_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const environment_test_account_ref01_data_up0: any = {}
    environment_test_account_ref01_data_up0.id = environment_test_account_ref01_data.id
    environment_test_account_ref01_data_up0['environment_id'] = setup.idmap['environment_id'] ?? setup.idmap['environment01']
    environment_test_account_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const environment_test_account_ref01_markdef_up0 = { name: 'persona', value: 'Mark01-environment_test_account_ref01_' + setup.now }
    ;(environment_test_account_ref01_data_up0 as any)[environment_test_account_ref01_markdef_up0.name] = environment_test_account_ref01_markdef_up0.value

    const environment_test_account_ref01_resdata_up0 = (await environment_test_account_ref01_ent.update(environment_test_account_ref01_data_up0)).data()
    assert(environment_test_account_ref01_resdata_up0.id === environment_test_account_ref01_data_up0.id)

    assert((environment_test_account_ref01_resdata_up0 as any)[environment_test_account_ref01_markdef_up0.name] === environment_test_account_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/environment_test_account/EnvironmentTestAccountTestData.json')

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
    ['environment_test_account01','environment_test_account02','environment_test_account03','organization01','organization02','organization03','environment01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ENVIRONMENT_TEST_ACCOUNT_ENTID']
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
  
