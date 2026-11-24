

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


describe('SiteSecretEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SiteSecret()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SiteSecret().update({"id":1,"organization_id":"x","site_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'site_secret.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0},"native_agent_id":{"a":true,"h":"Native Agent Id","n":"native_agent_id","r":true,"t":"`$STRING`","key$":"native_agent_id","index$":1},"value":{"a":true,"h":"Value","n":"value","r":true,"t":"`$STRING`","key$":"value","index$":2}},"id":{"field":"id","name":"id"},"name":"site_secret","op":{"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"secret_name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"site_id","or":"name","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}","q":{"exist":["id","organization_id","site_id"]},"r":{"param":{"name":"site_id","organization_id":"organization_id","secret_name":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"},{"var":"site_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["native_agent_id","value"],"co":{"id":"PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"secret_name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"site_id","or":"name","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}","q":{"exist":["id","organization_id","site_id"]},"r":{"param":{"name":"site_id","organization_id":"organization_id","secret_name":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"spark"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sites"},{"var":"site_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.site"]]},"key$":"site_secret","name__orig":"site_secret","Name":"SiteSecret","name_":"site_secret","name-":"site-secret","NAME":"SITE_SECRET","index$":476}, {"active":true,"entity":"site_secret","key$":"BasicSiteSecretFlow","kind":"basic","name":"BasicSiteSecretFlow","param":{},"step":[{"a":true,"d":{"organization_id":"organization01","site_id":"site01"},"i":{"ref":"site_secret_ref01","srcdatavar":"site_secret_ref01_data","suffix":"_up0","textfield":"native_agent_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-site_secret_ref01"}}],"v":[],"index$":0}]}, 'SiteSecret', {"DELETE /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"secret_name","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["native_agent_id","value"],"properties":{"native_agent_id":{"type":"string","key$":"native_agent_id"},"value":{"type":"string","maxLength":5120,"key$":"value"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"name","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"secret_name","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"site_secret.update.0":"GET-only live run: needs PUT /api/v1/spark/organizations/{organization_id}/sites/{name}/secrets/{secret_name}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let site_secret_ref01_data = Object.values(setup.data.existing.site_secret)[0] as any

    // UPDATE
    const site_secret_ref01_ent = client.SiteSecret()
    const site_secret_ref01_data_up0: any = {}
    site_secret_ref01_data_up0.id = site_secret_ref01_data.id
    site_secret_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    site_secret_ref01_data_up0['site_id'] = setup.idmap['site_id'] ?? setup.idmap['site01']

    const site_secret_ref01_markdef_up0 = { name: 'native_agent_id', value: 'Mark01-site_secret_ref01_' + setup.now }
    ;(site_secret_ref01_data_up0 as any)[site_secret_ref01_markdef_up0.name] = site_secret_ref01_markdef_up0.value

    const site_secret_ref01_resdata_up0 = (await site_secret_ref01_ent.update(site_secret_ref01_data_up0)).data()
    assert(site_secret_ref01_resdata_up0.id === site_secret_ref01_data_up0.id)

    assert((site_secret_ref01_resdata_up0 as any)[site_secret_ref01_markdef_up0.name] === site_secret_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/site_secret/SiteSecretTestData.json')

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
    ['site_secret01','site_secret02','site_secret03','organization01','organization02','organization03','site01','site02','site03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SITE_SECRET_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SITE_SECRET_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SITE_SECRET_ENTID']
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
  
