

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


describe('ProductMapIdentityDecisionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProductMapIdentityDecision()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProductMapIdentityDecision().create({"organization_id":1,"project_id":"x","observations":"x","operation":"x","reason":"x","target":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'product_map_identity_decision.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"observations":{"a":true,"h":"Observations","n":"observations","r":true,"t":"`$ARRAY`","key$":"observations","index$":0},"operation":{"a":true,"h":"Operation","n":"operation","r":true,"t":"`$STRING`","key$":"operation","index$":1},"reason":{"a":true,"h":"Reason","n":"reason","r":true,"t":"`$STRING`","key$":"reason","index$":2},"target":{"a":true,"h":"Target","n":"target","r":true,"t":"`$OBJECT`","key$":"target","index$":3}},"name":"product_map_identity_decision","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["observations","operation","reason","target"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/identity_decisions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/identity_decisions","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"product_map"},{"lit":"identity_decisions"}],"t":{"req":{"observations":"`reqdata.observation`","operation":"`reqdata.operation`","reason":"`reqdata.reason`","target":"`reqdata.target`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"product_map_identity_decision","name__orig":"product_map_identity_decision","Name":"ProductMapIdentityDecision","name_":"product_map_identity_decision","name-":"product-map-identity-decision","NAME":"PRODUCT_MAP_IDENTITY_DECISION","index$":381}, {"active":true,"entity":"product_map_identity_decision","key$":"BasicProductMapIdentityDecisionFlow","kind":"basic","name":"BasicProductMapIdentityDecisionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"product_map_identity_decision_ref01"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ProductMapIdentityDecision', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/identity_decisions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["operation","reason","observations"],"properties":{"operation":{"type":"string","enum":["merge","split"],"key$":"operation"},"reason":{"type":"string","minLength":1,"maxLength":1000,"key$":"reason"},"observations":{"type":"array","minItems":1,"maxItems":100,"items":{"type":"object","additionalProperties":false,"required":["observation_id","state_id","interpretation_id","identity_decision_id"],"properties":{"observation_id":{"type":"string"},"state_id":{"type":"string","pattern":"^[a-f0-9]{64}$"},"interpretation_id":{"type":[]},"identity_decision_id":{"type":[]}},"x-ref":"#/components/schemas/ProductMapIdentitySnapshot"},"key$":"observations"},"target":{"type":"object","additionalProperties":false,"required":["observation_id","state_id","interpretation_id","identity_decision_id"],"properties":{"observation_id":{"type":"string"},"state_id":{"type":"string","pattern":"^[a-f0-9]{64}$"},"interpretation_id":{"type":["string","null"]},"identity_decision_id":{"type":["string","null"]}},"x-ref":"#/components/schemas/ProductMapIdentitySnapshot","key$":"target"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"product_map_identity_decision.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/identity_decisions"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const product_map_identity_decision_ref01_ent = client.ProductMapIdentityDecision()
    let product_map_identity_decision_ref01_data = setup.data.new.product_map_identity_decision['product_map_identity_decision_ref01']
    product_map_identity_decision_ref01_data['organization_id'] = setup.idmap['organization01']
    product_map_identity_decision_ref01_data['project_id'] = setup.idmap['project01']

    product_map_identity_decision_ref01_data = (await product_map_identity_decision_ref01_ent.create(product_map_identity_decision_ref01_data)).data()
    assert(null != product_map_identity_decision_ref01_data)


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
      '../../../../.sdk/test/entity/product_map_identity_decision/ProductMapIdentityDecisionTestData.json')

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
    ['product_map_identity_decision01','product_map_identity_decision02','product_map_identity_decision03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PRODUCT_MAP_IDENTITY_DECISION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PRODUCT_MAP_IDENTITY_DECISION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PRODUCT_MAP_IDENTITY_DECISION_ENTID']
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
  
