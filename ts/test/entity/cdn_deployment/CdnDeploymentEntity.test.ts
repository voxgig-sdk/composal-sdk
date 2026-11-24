

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


describe('CdnDeploymentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.CdnDeployment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CdnDeployment().list({"app_id":1,"cdn_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cdn_deployment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"cdn_deployment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments","q":{"exist":["app_id","cdn_id"]},"r":{"param":{"app_id":"app_id","cdn_id":"cdn_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"deployments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments","q":{"exist":["app_id","cdn_id"]},"r":{"param":{"app_id":"app_id","cdn_id":"cdn_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"deployments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}","q":{"exist":["app_id","cdn_id","id"]},"r":{"param":{"app_id":"app_id","cdn_id":"cdn_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"deployments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"cdn_deployment","name__orig":"cdn_deployment","Name":"CdnDeployment","name_":"cdn_deployment","name-":"cdn-deployment","NAME":"CDN_DEPLOYMENT","index$":152}, {"active":true,"entity":"cdn_deployment","key$":"BasicCdnDeploymentFlow","kind":"basic","name":"BasicCdnDeploymentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"cdn_deployment_ref01"},"m":{"app_id":"app01","cdn_id":"cdn01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01","cdn_id":"cdn01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"cdn_deployment_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"cdn_deployment_ref01","srcdatavar":"cdn_deployment_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","cdn_id":"cdn01","id":"cdn_deployment01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cdn_deployment_ref01"}}],"index$":2,"route":"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}","record":{}}]}, 'CdnDeployment', {"POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"cdn_deployment.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/deployments"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const cdn_deployment_ref01_ent = client.CdnDeployment()
    let cdn_deployment_ref01_data = setup.data.new.cdn_deployment['cdn_deployment_ref01']
    cdn_deployment_ref01_data['app_id'] = setup.idmap['app01']
    cdn_deployment_ref01_data['cdn_id'] = setup.idmap['cdn01']

    cdn_deployment_ref01_data = (await cdn_deployment_ref01_ent.create(cdn_deployment_ref01_data)).data()
    assert(null != cdn_deployment_ref01_data.id)


    // LIST
    const cdn_deployment_ref01_match: any = {}
    cdn_deployment_ref01_match['app_id'] = setup.idmap['app01']
    cdn_deployment_ref01_match['cdn_id'] = setup.idmap['cdn01']

    const cdn_deployment_ref01_list = (await cdn_deployment_ref01_ent.list(cdn_deployment_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(cdn_deployment_ref01_list, { id: cdn_deployment_ref01_data.id })))


    // LOAD
    const cdn_deployment_ref01_match_dt0: any = {}
    cdn_deployment_ref01_match_dt0.id = cdn_deployment_ref01_data.id
    cdn_deployment_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    cdn_deployment_ref01_match_dt0['cdn_id'] = setup.idmap['cdn_id'] ?? setup.idmap['cdn01']
    const cdn_deployment_ref01_data_dt0 = (await cdn_deployment_ref01_ent.load(cdn_deployment_ref01_match_dt0)).data()
    assert(cdn_deployment_ref01_data_dt0.id === cdn_deployment_ref01_data.id)


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
      '../../../../.sdk/test/entity/cdn_deployment/CdnDeploymentTestData.json')

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
    ['cdn_deployment01','cdn_deployment02','cdn_deployment03','app01','app02','app03','cdn01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CDN_DEPLOYMENT_ENTID']
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
  
