

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


describe('CdnHostnameEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.CdnHostname()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CdnHostname().list({"app_id":1,"cdn_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cdn_hostname.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_cdn_distribution_id":{"a":true,"h":"App Cdn Distribution Id","n":"app_cdn_distribution_id","r":true,"t":"`$STRING`","key$":"app_cdn_distribution_id","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"dns_status":{"a":true,"h":"Dns Status","n":"dns_status","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"dns_status","index$":2},"force_ssl":{"a":true,"h":"Force Ssl","n":"force_ssl","op":{"create":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"force_ssl","index$":3},"hostname":{"a":true,"h":"Hostname","n":"hostname","r":true,"t":"`$STRING`","key$":"hostname","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"provider_hostname_id":{"a":true,"h":"Provider Hostname Id","n":"provider_hostname_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"provider_hostname_id","index$":6},"tls_status":{"a":true,"h":"Tls Status","n":"tls_status","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"tls_status","index$":7},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":8}},"id":{"field":"id","name":"id"},"name":"cdn_hostname","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["dns_status","force_ssl","hostname","tls_status"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames","q":{"exist":["app_id","cdn_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"hostnames"}],"t":{"req":"`reqdata`","res":"`body.hostname`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames","q":{"exist":["app_id","cdn_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"hostnames"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","q":{"exist":["app_id","cdn_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"hostnames"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","q":{"exist":["app_id","cdn_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"hostnames"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","q":{"exist":["app_id","cdn_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"hostnames"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"cdn_id","or":"cdn_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","q":{"exist":["app_id","cdn_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"cdn_id"},{"lit":"hostnames"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"cdn_hostname","name__orig":"cdn_hostname","Name":"CdnHostname","name_":"cdn_hostname","name-":"cdn-hostname","NAME":"CDN_HOSTNAME","index$":86}, {"active":true,"entity":"cdn_hostname","key$":"BasicCdnHostnameFlow","kind":"basic","name":"BasicCdnHostnameFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"cdn_hostname_ref01"},"m":{"app_id":"app01","cdn_id":"cdn01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01","cdn_id":"cdn01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"cdn_hostname_ref01"}}],"index$":1},{"a":true,"d":{"app_id":"app01","cdn_id":"cdn01"},"i":{"ref":"cdn_hostname_ref01","srcdatavar":"cdn_hostname_ref01_data","suffix":"_up0","textfield":"app_cdn_distribution_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cdn_hostname_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"cdn_hostname_ref01","srcdatavar":"cdn_hostname_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","cdn_id":"cdn01","id":"cdn_hostname01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cdn_hostname_ref01"}}],"index$":3,"route":"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"cdn_hostname_ref01","suffix":"_rm0"},"m":{"app_id":"app01","cdn_id":"cdn01","id":"cdn_hostname01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"app_id":"app01","cdn_id":"cdn01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"cdn_hostname_ref01"}}],"index$":5}]}, 'CdnHostname', {"POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["hostname"],"properties":{"hostname":{"type":"string","key$":"hostname"},"force_ssl":{"type":"boolean","key$":"force_ssl"},"tls_status":{"type":"string","enum":["pending","active","failed"],"key$":"tls_status"},"dns_status":{"type":"string","enum":["pending","configured","failed"],"key$":"dns_status"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppCdnHostnameCreatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cdn_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"cdn_hostname.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames","cdn_hostname.update.2":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","cdn_hostname.remove.4":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{cdn_id}/hostnames/{id}","cdn_hostname.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const cdn_hostname_ref01_ent = client.CdnHostname()
    let cdn_hostname_ref01_data = setup.data.new.cdn_hostname['cdn_hostname_ref01']
    cdn_hostname_ref01_data['app_id'] = setup.idmap['app01']
    cdn_hostname_ref01_data['cdn_id'] = setup.idmap['cdn01']

    cdn_hostname_ref01_data = (await cdn_hostname_ref01_ent.create(cdn_hostname_ref01_data)).data()
    assert(null != cdn_hostname_ref01_data.id)


    // LIST
    const cdn_hostname_ref01_match: any = {}
    cdn_hostname_ref01_match['app_id'] = setup.idmap['app01']
    cdn_hostname_ref01_match['cdn_id'] = setup.idmap['cdn01']

    const cdn_hostname_ref01_list = (await cdn_hostname_ref01_ent.list(cdn_hostname_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(cdn_hostname_ref01_list, { id: cdn_hostname_ref01_data.id })))


    // UPDATE
    const cdn_hostname_ref01_data_up0: any = {}
    cdn_hostname_ref01_data_up0.id = cdn_hostname_ref01_data.id
    cdn_hostname_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    cdn_hostname_ref01_data_up0['cdn_id'] = setup.idmap['cdn_id'] ?? setup.idmap['cdn01']

    const cdn_hostname_ref01_markdef_up0 = { name: 'app_cdn_distribution_id', value: 'Mark01-cdn_hostname_ref01_' + setup.now }
    ;(cdn_hostname_ref01_data_up0 as any)[cdn_hostname_ref01_markdef_up0.name] = cdn_hostname_ref01_markdef_up0.value

    const cdn_hostname_ref01_resdata_up0 = (await cdn_hostname_ref01_ent.update(cdn_hostname_ref01_data_up0)).data()
    assert(cdn_hostname_ref01_resdata_up0.id === cdn_hostname_ref01_data_up0.id)

    assert((cdn_hostname_ref01_resdata_up0 as any)[cdn_hostname_ref01_markdef_up0.name] === cdn_hostname_ref01_markdef_up0.value)


    // LOAD
    const cdn_hostname_ref01_match_dt0: any = {}
    cdn_hostname_ref01_match_dt0.id = cdn_hostname_ref01_data.id
    cdn_hostname_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    cdn_hostname_ref01_match_dt0['cdn_id'] = setup.idmap['cdn_id'] ?? setup.idmap['cdn01']
    const cdn_hostname_ref01_data_dt0 = (await cdn_hostname_ref01_ent.load(cdn_hostname_ref01_match_dt0)).data()
    assert(cdn_hostname_ref01_data_dt0.id === cdn_hostname_ref01_data.id)


    // REMOVE
    const cdn_hostname_ref01_match_rm0: any = { id: cdn_hostname_ref01_data.id }
    cdn_hostname_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    cdn_hostname_ref01_match_rm0['cdn_id'] = setup.idmap['cdn_id'] ?? setup.idmap['cdn01']
    await cdn_hostname_ref01_ent.remove(cdn_hostname_ref01_match_rm0)
  

    // LIST
    const cdn_hostname_ref01_match_rt0: any = {}
    cdn_hostname_ref01_match_rt0['app_id'] = setup.idmap['app01']
    cdn_hostname_ref01_match_rt0['cdn_id'] = setup.idmap['cdn01']

    const cdn_hostname_ref01_list_rt0 = (await cdn_hostname_ref01_ent.list(cdn_hostname_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(cdn_hostname_ref01_list_rt0, { id: cdn_hostname_ref01_data.id })))


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
      '../../../../.sdk/test/entity/cdn_hostname/CdnHostnameTestData.json')

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
    ['cdn_hostname01','cdn_hostname02','cdn_hostname03','app01','app02','app03','cdn01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CDN_HOSTNAME_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CDN_HOSTNAME_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CDN_HOSTNAME_ENTID']
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
  
