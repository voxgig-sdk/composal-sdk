

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


describe('OrganizationServiceAccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.OrganizationServiceAccount()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OrganizationServiceAccount().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization_service_account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"organization_service_account","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/activate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/service_accounts/{id}/activate","q":{"$action":"activate","exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"},{"var":"id"},{"lit":"activate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/revoke","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/service_accounts/{id}/revoke","q":{"$action":"revoke","exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"},{"var":"id"},{"lit":"revoke"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/suspend","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/service_accounts/{id}/suspend","q":{"$action":"suspend","exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"},{"var":"id"},{"lit":"suspend"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/service_accounts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/service_accounts","q":{"exist":["organization_id"]},"r":{"param":{"organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/identity/organizations/{organization_id}/service_accounts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/identity/organizations/{organization_id}/service_accounts","q":{"exist":["organization_id"]},"r":{"param":{"organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/identity/organizations/{organization_id}/service_accounts/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/identity/organizations/{organization_id}/service_accounts/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/identity/organizations/{organization_id}/service_accounts/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/identity/organizations/{organization_id}/service_accounts/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/identity/organizations/{organization_id}/service_accounts/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/identity/organizations/{organization_id}/service_accounts/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/identity/organizations/{organization_id}/service_accounts/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/identity/organizations/{organization_id}/service_accounts/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"service_accounts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"organization_service_account","name__orig":"organization_service_account","Name":"OrganizationServiceAccount","name_":"organization_service_account","name-":"organization-service-account","NAME":"ORGANIZATION_SERVICE_ACCOUNT","index$":348}, {"active":true,"entity":"organization_service_account","key$":"BasicOrganizationServiceAccountFlow","kind":"basic","name":"BasicOrganizationServiceAccountFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"organization_service_account_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"organization_service_account_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"organization_service_account_ref01","srcdatavar":"organization_service_account_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_service_account_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"organization_service_account_ref01","srcdatavar":"organization_service_account_ref01_data","suffix":"_dt0"},"m":{"id":"organization_service_account01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_service_account_ref01"}}],"index$":3,"route":"GET /api/v1/identity/organizations/{organization_id}/service_accounts/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"organization_service_account_ref01","suffix":"_rm0"},"m":{"id":"organization_service_account01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"organization_service_account_ref01"}}],"index$":5}]}, 'OrganizationServiceAccount', {"POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/activate":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/revoke":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/suspend":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/identity/organizations/{organization_id}/service_accounts":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/identity/organizations/{organization_id}/service_accounts":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/identity/organizations/{organization_id}/service_accounts/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/identity/organizations/{organization_id}/service_accounts/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/identity/organizations/{organization_id}/service_accounts/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/identity/organizations/{organization_id}/service_accounts/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"organization_service_account.create.0":"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/service_accounts/{id}/activate","organization_service_account.update.2":"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/service_accounts/{id}","organization_service_account.remove.4":"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/service_accounts/{id}","organization_service_account.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const organization_service_account_ref01_ent = client.OrganizationServiceAccount()
    let organization_service_account_ref01_data = setup.data.new.organization_service_account['organization_service_account_ref01']
    organization_service_account_ref01_data['organization_id'] = setup.idmap['organization01']

    organization_service_account_ref01_data = (await organization_service_account_ref01_ent.create(organization_service_account_ref01_data)).data()
    assert(null != organization_service_account_ref01_data.id)


    // LIST
    const organization_service_account_ref01_match: any = {}
    organization_service_account_ref01_match['organization_id'] = setup.idmap['organization01']

    const organization_service_account_ref01_list = (await organization_service_account_ref01_ent.list(organization_service_account_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(organization_service_account_ref01_list, { id: organization_service_account_ref01_data.id })))


    // UPDATE
    const organization_service_account_ref01_data_up0: any = {}
    organization_service_account_ref01_data_up0.id = organization_service_account_ref01_data.id
    organization_service_account_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const organization_service_account_ref01_resdata_up0 = (await organization_service_account_ref01_ent.update(organization_service_account_ref01_data_up0)).data()
    assert(organization_service_account_ref01_resdata_up0.id === organization_service_account_ref01_data_up0.id)


    // LOAD
    const organization_service_account_ref01_match_dt0: any = {}
    organization_service_account_ref01_match_dt0.id = organization_service_account_ref01_data.id
    organization_service_account_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const organization_service_account_ref01_data_dt0 = (await organization_service_account_ref01_ent.load(organization_service_account_ref01_match_dt0)).data()
    assert(organization_service_account_ref01_data_dt0.id === organization_service_account_ref01_data.id)


    // REMOVE
    const organization_service_account_ref01_match_rm0: any = { id: organization_service_account_ref01_data.id }
    organization_service_account_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await organization_service_account_ref01_ent.remove(organization_service_account_ref01_match_rm0)
  

    // LIST
    const organization_service_account_ref01_match_rt0: any = {}
    organization_service_account_ref01_match_rt0['organization_id'] = setup.idmap['organization01']

    const organization_service_account_ref01_list_rt0 = (await organization_service_account_ref01_ent.list(organization_service_account_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(organization_service_account_ref01_list_rt0, { id: organization_service_account_ref01_data.id })))


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
      '../../../../.sdk/test/entity/organization_service_account/OrganizationServiceAccountTestData.json')

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
    ['organization_service_account01','organization_service_account02','organization_service_account03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ORGANIZATION_SERVICE_ACCOUNT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ORGANIZATION_SERVICE_ACCOUNT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ORGANIZATION_SERVICE_ACCOUNT_ENTID']
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
  
