

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


describe('AppEnvironmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppEnvironment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppEnvironment().list({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_environment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auto_deploy":{"a":true,"h":"Auto Deploy","n":"auto_deploy","op":{"patch":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"auto_deploy","index$":0},"base_domain":{"a":true,"h":"Base Domain","n":"base_domain","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]},"update":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"base_domain","index$":1},"branch_pattern":{"a":true,"h":"Branch Pattern","n":"branch_pattern","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]},"update":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"branch_pattern","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":3},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":4},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":"`$STRING`","key$":"hosted_app_id","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"kind":{"a":true,"h":"Kind","n":"kind","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"kind","index$":7},"location":{"a":true,"h":"Location","n":"location","r":true,"t":"`$ANY`","key$":"location","index$":8},"location_id":{"a":true,"h":"Location Id","n":"location_id","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"location_id","index$":9},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":10},"slug":{"a":true,"h":"Slug","n":"slug","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"slug","index$":11},"status":{"a":true,"h":"Status","n":"status","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"status","index$":12},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":13},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":14}},"id":{"field":"id","name":"id"},"name":"app_environment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/environments/{id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/environments/{id}/archive","q":{"$action":"archive","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body.environment`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/environments/{id}/pause","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/environments/{id}/pause","q":{"$action":"pause","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"id"},{"lit":"pause"}],"t":{"req":"`reqdata`","res":"`body.environment`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/environments/{id}/resume","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/environments/{id}/resume","q":{"$action":"resume","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"id"},{"lit":"resume"}],"t":{"req":"`reqdata`","res":"`body.environment`"},"index$":2},{"a":true,"bf":["auto_deploy","base_domain","branch_pattern","kind","location_id","name","slug","status"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/environments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/environments","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"}],"t":{"req":"`reqdata`","res":"`body.environment`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/environments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/environments","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/environments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/environments/{id}","q":{"exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["auto_deploy","base_domain","branch_pattern","kind","location_id","name","slug","status"],"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/environments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/environments/{id}","q":{"exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.environment`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/environments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/environments/{id}","q":{"exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["auto_deploy","base_domain","branch_pattern","kind","location_id","name","slug","status"],"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/environments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/environments/{id}","q":{"exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.environment`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"app_environment","name__orig":"app_environment","Name":"AppEnvironment","name_":"app_environment","name-":"app-environment","NAME":"APP_ENVIRONMENT","index$":59}, {"active":true,"entity":"app_environment","key$":"BasicAppEnvironmentFlow","kind":"basic","name":"BasicAppEnvironmentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_environment_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"app_environment_ref01"}}],"index$":1},{"a":true,"d":{"app_id":"app01"},"i":{"ref":"app_environment_ref01","srcdatavar":"app_environment_ref01_data","suffix":"_up0","textfield":"base_domain"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_environment_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"app_environment_ref01","srcdatavar":"app_environment_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","id":"app_environment01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_environment_ref01"}}],"index$":3,"route":"GET /api/v1/hosting/apps/{app_id}/environments/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"app_environment_ref01","suffix":"_rm0"},"m":{"app_id":"app01","id":"app_environment01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"app_environment_ref01"}}],"index$":5}]}, 'AppEnvironment', {"POST /api/v1/hosting/apps/{app_id}/environments/{id}/archive":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/environments/{id}/pause":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/environments/{id}/resume":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/environments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["slug","name","kind","status","location_id","auto_deploy"],"properties":{"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"kind":{"type":"string","enum":["production","staging","development","preview","ephemeral","custom"],"key$":"kind"},"status":{"type":"string","enum":["active","paused","archived"],"key$":"status"},"location_id":{"type":"string","key$":"location_id"},"branch_pattern":{"type":"string","key$":"branch_pattern"},"base_domain":{"type":"string","key$":"base_domain"},"auto_deploy":{"type":"boolean","key$":"auto_deploy"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppEnvironmentCreatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/environments":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/environments/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/hosting/apps/{app_id}/environments/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"kind":{"type":"string","enum":["production","staging","development","preview","ephemeral","custom"],"key$":"kind"},"status":{"type":"string","enum":["active","paused","archived"],"key$":"status"},"location_id":{"type":"string","key$":"location_id"},"branch_pattern":{"type":"string","nullable":true,"key$":"branch_pattern"},"base_domain":{"type":"string","nullable":true,"key$":"base_domain"},"auto_deploy":{"type":"boolean","key$":"auto_deploy"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppEnvironmentUpdatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/environments/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/hosting/apps/{app_id}/environments/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"kind":{"type":"string","enum":["production","staging","development","preview","ephemeral","custom"],"key$":"kind"},"status":{"type":"string","enum":["active","paused","archived"],"key$":"status"},"location_id":{"type":"string","key$":"location_id"},"branch_pattern":{"type":"string","nullable":true,"key$":"branch_pattern"},"base_domain":{"type":"string","nullable":true,"key$":"base_domain"},"auto_deploy":{"type":"boolean","key$":"auto_deploy"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppEnvironmentUpdatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_environment.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/environments/{id}/archive","app_environment.update.2":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/environments/{id}","app_environment.remove.4":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/environments/{id}","app_environment.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_environment_ref01_ent = client.AppEnvironment()
    let app_environment_ref01_data = setup.data.new.app_environment['app_environment_ref01']
    app_environment_ref01_data['app_id'] = setup.idmap['app01']

    app_environment_ref01_data = (await app_environment_ref01_ent.create(app_environment_ref01_data)).data()
    assert(null != app_environment_ref01_data.id)


    // LIST
    const app_environment_ref01_match: any = {}
    app_environment_ref01_match['app_id'] = setup.idmap['app01']

    const app_environment_ref01_list = (await app_environment_ref01_ent.list(app_environment_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(app_environment_ref01_list, { id: app_environment_ref01_data.id })))


    // UPDATE
    const app_environment_ref01_data_up0: any = {}
    app_environment_ref01_data_up0.id = app_environment_ref01_data.id
    app_environment_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']

    const app_environment_ref01_markdef_up0 = { name: 'base_domain', value: 'Mark01-app_environment_ref01_' + setup.now }
    ;(app_environment_ref01_data_up0 as any)[app_environment_ref01_markdef_up0.name] = app_environment_ref01_markdef_up0.value

    const app_environment_ref01_resdata_up0 = (await app_environment_ref01_ent.update(app_environment_ref01_data_up0)).data()
    assert(app_environment_ref01_resdata_up0.id === app_environment_ref01_data_up0.id)

    assert((app_environment_ref01_resdata_up0 as any)[app_environment_ref01_markdef_up0.name] === app_environment_ref01_markdef_up0.value)


    // LOAD
    const app_environment_ref01_match_dt0: any = {}
    app_environment_ref01_match_dt0.id = app_environment_ref01_data.id
    app_environment_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    const app_environment_ref01_data_dt0 = (await app_environment_ref01_ent.load(app_environment_ref01_match_dt0)).data()
    assert(app_environment_ref01_data_dt0.id === app_environment_ref01_data.id)


    // REMOVE
    const app_environment_ref01_match_rm0: any = { id: app_environment_ref01_data.id }
    app_environment_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    await app_environment_ref01_ent.remove(app_environment_ref01_match_rm0)
  

    // LIST
    const app_environment_ref01_match_rt0: any = {}
    app_environment_ref01_match_rt0['app_id'] = setup.idmap['app01']

    const app_environment_ref01_list_rt0 = (await app_environment_ref01_ent.list(app_environment_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(app_environment_ref01_list_rt0, { id: app_environment_ref01_data.id })))


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
      '../../../../.sdk/test/entity/app_environment/AppEnvironmentTestData.json')

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
    ['app_environment01','app_environment02','app_environment03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_ENVIRONMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_ENVIRONMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_ENVIRONMENT_ENTID']
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
  
