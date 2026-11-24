

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


describe('AppServiceBindingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppServiceBinding()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppServiceBinding().load({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_service_binding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"app_service_binding","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable","q":{"$action":"disable","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"service_bindings"},{"var":"id"},{"lit":"disable"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/enable","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/service_bindings/{id}/enable","q":{"$action":"enable","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"service_bindings"},{"var":"id"},{"lit":"enable"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/service_bindings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/service_bindings","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"service_bindings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/service_bindings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/service_bindings/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"service_bindings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/service_bindings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/service_bindings","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"service_bindings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/service_bindings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/service_bindings/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"service_bindings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/service_bindings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/service_bindings/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"service_bindings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/service_bindings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/service_bindings/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"service_bindings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"app_service_binding","name__orig":"app_service_binding","Name":"AppServiceBinding","name_":"app_service_binding","name-":"app-service-binding","NAME":"APP_SERVICE_BINDING","index$":94}, {"active":true,"entity":"app_service_binding","key$":"BasicAppServiceBindingFlow","kind":"basic","name":"BasicAppServiceBindingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_service_binding_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"app_id":"app01"},"i":{"ref":"app_service_binding_ref01","srcdatavar":"app_service_binding_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_service_binding_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"app_service_binding_ref01","srcdatavar":"app_service_binding_ref01_data","suffix":"_dt0"},"m":{"id":"app_service_binding01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_service_binding_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"app_service_binding_ref01","suffix":"_rm0"},"m":{"app_id":"app01","id":"app_service_binding01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'AppServiceBinding', {"POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/enable":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/service_bindings":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/service_bindings/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/service_bindings":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/hosting/apps/{app_id}/service_bindings/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/service_bindings/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/hosting/apps/{app_id}/service_bindings/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_service_binding.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/service_bindings/{id}/disable","app_service_binding.update.1":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/service_bindings/{id}","app_service_binding.load.2":"GET-only live run: reads a record only app_service_binding.create.0 gives","app_service_binding.remove.3":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/service_bindings/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_service_binding_ref01_ent = client.AppServiceBinding()
    let app_service_binding_ref01_data = setup.data.new.app_service_binding['app_service_binding_ref01']
    app_service_binding_ref01_data['app_id'] = setup.idmap['app01']

    app_service_binding_ref01_data = (await app_service_binding_ref01_ent.create(app_service_binding_ref01_data)).data()
    assert(null != app_service_binding_ref01_data.id)


    // UPDATE
    const app_service_binding_ref01_data_up0: any = {}
    app_service_binding_ref01_data_up0.id = app_service_binding_ref01_data.id
    app_service_binding_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']

    const app_service_binding_ref01_resdata_up0 = (await app_service_binding_ref01_ent.update(app_service_binding_ref01_data_up0)).data()
    assert(app_service_binding_ref01_resdata_up0.id === app_service_binding_ref01_data_up0.id)


    // LOAD
    const app_service_binding_ref01_match_dt0: any = {}
    app_service_binding_ref01_match_dt0.id = app_service_binding_ref01_data.id
    const app_service_binding_ref01_data_dt0 = (await app_service_binding_ref01_ent.load(app_service_binding_ref01_match_dt0)).data()
    assert(app_service_binding_ref01_data_dt0.id === app_service_binding_ref01_data.id)


    // REMOVE
    const app_service_binding_ref01_match_rm0: any = { id: app_service_binding_ref01_data.id }
    app_service_binding_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    await app_service_binding_ref01_ent.remove(app_service_binding_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/app_service_binding/AppServiceBindingTestData.json')

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
    ['app_service_binding01','app_service_binding02','app_service_binding03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_SERVICE_BINDING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_SERVICE_BINDING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_SERVICE_BINDING_ENTID']
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
  
