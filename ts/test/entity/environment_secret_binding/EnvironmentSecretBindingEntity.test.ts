

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


describe('EnvironmentSecretBindingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.EnvironmentSecretBinding()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.EnvironmentSecretBinding().load({"app_id":1,"environment_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'environment_secret_binding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"env_key":{"a":true,"h":"Env Key","n":"env_key","r":true,"t":"`$STRING`","key$":"env_key","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":1},"mode":{"a":true,"h":"Mode","n":"mode","r":false,"t":"`$STRING`","key$":"mode","index$":2},"secret_id":{"a":true,"h":"Secret Id","n":"secret_id","r":false,"t":"`$STRING`","key$":"secret_id","index$":3},"secret_version_id":{"a":true,"h":"Secret Version Id","n":"secret_version_id","r":false,"t":"`$STRING`","key$":"secret_version_id","index$":4}},"id":{"field":"id","name":"id"},"name":"environment_secret_binding","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["env_key","mode","secret_id","secret_version_id"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"environment_id","or":"environment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings","q":{"exist":["app_id","environment_id"]},"r":{"param":{"app_id":"app_id","environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"secret_bindings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["env_key","mode","secret_id","secret_version_id"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/copy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"environment_id","or":"environment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/copy","q":{"$action":"copy","exist":["app_id","environment_id"]},"r":{"param":{"app_id":"app_id","environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"secret_bindings"},{"lit":"copy"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"environment_id","or":"environment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings","q":{"exist":["app_id","environment_id"]},"r":{"param":{"app_id":"app_id","environment_id":"environment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"secret_bindings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"environment_id","or":"environment_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/{id}","q":{"exist":["app_id","environment_id","id"]},"r":{"param":{"app_id":"app_id","environment_id":"environment_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"environments"},{"var":"environment_id"},{"lit":"secret_bindings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.app","$.main.kit.entity.environment"]]},"key$":"environment_secret_binding","name__orig":"environment_secret_binding","Name":"EnvironmentSecretBinding","name_":"environment_secret_binding","name-":"environment-secret-binding","NAME":"ENVIRONMENT_SECRET_BINDING","index$":235}, {"active":true,"entity":"environment_secret_binding","key$":"BasicEnvironmentSecretBindingFlow","kind":"basic","name":"BasicEnvironmentSecretBindingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"environment_secret_binding_ref01"},"m":{"app_id":"app01","environment_id":"environment01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"environment_secret_binding_ref01","srcdatavar":"environment_secret_binding_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","id":"environment_secret_binding01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-environment_secret_binding_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"environment_secret_binding_ref01","suffix":"_rm0"},"m":{"app_id":"app01","environment_id":"environment01","id":"environment_secret_binding01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'EnvironmentSecretBinding', {"POST /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["env_key"],"properties":{"env_key":{"type":"string","key$":"env_key"},"mode":{"type":"string","enum":["linked","masked"],"key$":"mode"},"secret_id":{"type":"string","key$":"secret_id"},"secret_version_id":{"type":"string","key$":"secret_version_id"}},"additionalProperties":true,"x-ref":"#/components/schemas/PreviewBindingSelection"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/copy":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["env_key"],"properties":{"env_key":{"type":"string","key$":"env_key"},"mode":{"type":"string","enum":["linked","masked"],"key$":"mode"},"secret_id":{"type":"string","key$":"secret_id"},"secret_version_id":{"type":"string","key$":"secret_version_id"}},"additionalProperties":true,"x-ref":"#/components/schemas/PreviewBindingSelection"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"environment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"environment_secret_binding.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings","environment_secret_binding.load.1":"GET-only live run: reads a record only environment_secret_binding.create.0 gives","environment_secret_binding.remove.2":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/environments/{environment_id}/secret_bindings/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const environment_secret_binding_ref01_ent = client.EnvironmentSecretBinding()
    let environment_secret_binding_ref01_data = setup.data.new.environment_secret_binding['environment_secret_binding_ref01']
    environment_secret_binding_ref01_data['app_id'] = setup.idmap['app01']
    environment_secret_binding_ref01_data['environment_id'] = setup.idmap['environment01']

    environment_secret_binding_ref01_data = (await environment_secret_binding_ref01_ent.create(environment_secret_binding_ref01_data)).data()
    assert(null != environment_secret_binding_ref01_data.id)


    // LOAD
    const environment_secret_binding_ref01_match_dt0: any = {}
    environment_secret_binding_ref01_match_dt0.id = environment_secret_binding_ref01_data.id
    environment_secret_binding_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    const environment_secret_binding_ref01_data_dt0 = (await environment_secret_binding_ref01_ent.load(environment_secret_binding_ref01_match_dt0)).data()
    assert(environment_secret_binding_ref01_data_dt0.id === environment_secret_binding_ref01_data.id)


    // REMOVE
    const environment_secret_binding_ref01_match_rm0: any = { id: environment_secret_binding_ref01_data.id }
    environment_secret_binding_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    environment_secret_binding_ref01_match_rm0['environment_id'] = setup.idmap['environment_id'] ?? setup.idmap['environment01']
    await environment_secret_binding_ref01_ent.remove(environment_secret_binding_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/environment_secret_binding/EnvironmentSecretBindingTestData.json')

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
    ['environment_secret_binding01','environment_secret_binding02','environment_secret_binding03','app01','app02','app03','environment01','environment02','environment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ENVIRONMENT_SECRET_BINDING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ENVIRONMENT_SECRET_BINDING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ENVIRONMENT_SECRET_BINDING_ENTID']
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
  
