

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


describe('OrganizationSiteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.OrganizationSite()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OrganizationSite().load({"organization_id":1,"native_agent_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization_site.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"organization_site","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/spark/organizations/{organization_id}/sites/{name}/token","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/spark/organizations/{organization_id}/sites/{name}/token","q":{"$action":"token","exist":["id","organization_id"]},"r":{"param":{"name":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"},{"var":"id"},{"lit":"token"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/spark/organizations/{organization_id}/sites","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/spark/organizations/{organization_id}/sites","q":{"exist":["organization_id"]},"r":{"param":{"organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/spark/organizations/{organization_id}/sites","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"native_agent_id","or":"native_agent_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/spark/organizations/{organization_id}/sites","q":{"exist":["native_agent_id","organization_id"]},"r":{"param":{"organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/spark/organizations/{organization_id}/sites/{name}","q":{"exist":["id","organization_id"]},"r":{"param":{"name":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/app","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/spark/organizations/{organization_id}/sites/{name}/app","q":{"$action":"app","exist":["id","organization_id"]},"r":{"param":{"name":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"},{"var":"id"},{"lit":"app"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/spark/organizations/{organization_id}/sites/{name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/spark/organizations/{organization_id}/sites/{name}","q":{"exist":["id","organization_id"]},"r":{"param":{"name":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/app","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/spark/organizations/{organization_id}/sites/{name}/app","q":{"$action":"app","exist":["id","organization_id"]},"r":{"param":{"name":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"},{"var":"id"},{"lit":"app"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/marketplace_template","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/spark/organizations/{organization_id}/sites/{name}/marketplace_template","q":{"$action":"marketplace_template","exist":["id","organization_id"]},"r":{"param":{"name":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"},{"var":"id"},{"lit":"marketplace_template"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"organization_site","name__orig":"organization_site","Name":"OrganizationSite","name_":"organization_site","name-":"organization-site","NAME":"ORGANIZATION_SITE","index$":354}, {"active":true,"entity":"organization_site","key$":"BasicOrganizationSiteFlow","kind":"basic","name":"BasicOrganizationSiteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"organization_site_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"organization_site_ref01","srcdatavar":"organization_site_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_site_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"organization_site_ref01","srcdatavar":"organization_site_ref01_data","suffix":"_dt0"},"m":{"id":"organization_site01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_site_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"organization_site_ref01","suffix":"_rm0"},"m":{"id":"organization_site01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'OrganizationSite', {"POST /api/v1/spark/organizations/{organization_id}/sites/{name}/token":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/spark/organizations/{organization_id}/sites":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/spark/organizations/{organization_id}/sites":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"native_agent_id","in":"query","required":true,"schema":{"type":"string"},"description":"The calling agent's native id","index$":1}]},"DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/app":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/spark/organizations/{organization_id}/sites/{name}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/app":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/marketplace_template":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"organization_site.create.0":"GET-only live run: needs POST /api/v1/spark/organizations/{organization_id}/sites/{name}/token","organization_site.update.1":"GET-only live run: needs PATCH /api/v1/spark/organizations/{organization_id}/sites/{name}","organization_site.load.2":"GET-only live run: reads a record only organization_site.create.0 gives","organization_site.remove.3":"GET-only live run: needs DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const organization_site_ref01_ent = client.OrganizationSite()
    let organization_site_ref01_data = setup.data.new.organization_site['organization_site_ref01']
    organization_site_ref01_data['organization_id'] = setup.idmap['organization01']

    organization_site_ref01_data = (await organization_site_ref01_ent.create(organization_site_ref01_data)).data()
    assert(null != organization_site_ref01_data.id)


    // UPDATE
    const organization_site_ref01_data_up0: any = {}
    organization_site_ref01_data_up0.id = organization_site_ref01_data.id
    organization_site_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const organization_site_ref01_resdata_up0 = (await organization_site_ref01_ent.update(organization_site_ref01_data_up0)).data()
    assert(organization_site_ref01_resdata_up0.id === organization_site_ref01_data_up0.id)


    // LOAD
    const organization_site_ref01_match_dt0: any = {}
    organization_site_ref01_match_dt0.id = organization_site_ref01_data.id
    const organization_site_ref01_data_dt0 = (await organization_site_ref01_ent.load(organization_site_ref01_match_dt0)).data()
    assert(organization_site_ref01_data_dt0.id === organization_site_ref01_data.id)


    // REMOVE
    const organization_site_ref01_match_rm0: any = { id: organization_site_ref01_data.id }
    organization_site_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await organization_site_ref01_ent.remove(organization_site_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/organization_site/OrganizationSiteTestData.json')

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
    ['organization_site01','organization_site02','organization_site03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ORGANIZATION_SITE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ORGANIZATION_SITE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ORGANIZATION_SITE_ENTID']
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
  
