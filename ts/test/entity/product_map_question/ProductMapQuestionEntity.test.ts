

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


describe('ProductMapQuestionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProductMapQuestion()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProductMapQuestion().create({"organization_id":1,"project_id":"x","question":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'product_map_question.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_id":{"a":true,"h":"Account Id","n":"account_id","r":false,"t":"`$STRING`","key$":"account_id","index$":0},"area":{"a":true,"h":"Area","n":"area","r":false,"t":"`$STRING`","key$":"area","index$":1},"before":{"a":true,"h":"Before","n":"before","r":false,"t":"`$STRING`","key$":"before","index$":2},"claims":{"a":true,"h":"Claims","n":"claims","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":11},"key$":"claims","index$":3},"evidence_truncated":{"a":true,"h":"Evidence Truncated","n":"evidence_truncated","r":true,"t":"`$BOOLEAN`","key$":"evidence_truncated","index$":4},"model":{"a":true,"h":"Model","n":"model","r":true,"t":"`$STRING`","key$":"model","index$":5},"persona_id":{"a":true,"h":"Persona Id","n":"persona_id","r":false,"t":"`$STRING`","key$":"persona_id","index$":6},"query":{"a":true,"h":"Query","n":"query","r":false,"t":"`$STRING`","key$":"query","index$":7},"question":{"a":true,"h":"Question","n":"question","r":true,"t":"`$STRING`","key$":"question","index$":8},"reasoning_effort":{"a":true,"h":"Reasoning Effort","n":"reasoning_effort","r":true,"t":"`$STRING`","key$":"reasoning_effort","index$":9},"revision_id":{"a":true,"h":"Revision Id","n":"revision_id","r":false,"t":"`$STRING`","key$":"revision_id","index$":10},"scope":{"a":true,"h":"Scope","n":"scope","r":true,"t":"`$OBJECT`","key$":"scope","index$":11},"since":{"a":true,"h":"Since","n":"since","r":false,"t":"`$STRING`","key$":"since","index$":12},"state_id":{"a":true,"h":"State Id","n":"state_id","r":false,"t":"`$STRING`","key$":"state_id","index$":13},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":14},"unknowns":{"a":true,"h":"Unknowns","n":"unknowns","r":true,"t":"`$ARRAY`","key$":"unknowns","index$":15}},"name":"product_map_question","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["account_id","area","before","persona_id","query","question","revision_id","since","state_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/questions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/questions","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"product_map"},{"lit":"questions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"product_map_question","name__orig":"product_map_question","Name":"ProductMapQuestion","name_":"product_map_question","name-":"product-map-question","NAME":"PRODUCT_MAP_QUESTION","index$":159}, {"active":true,"entity":"product_map_question","key$":"BasicProductMapQuestionFlow","kind":"basic","name":"BasicProductMapQuestionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"product_map_question_ref01"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ProductMapQuestion', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/questions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["question"],"properties":{"question":{"type":"string","minLength":1,"maxLength":2000,"key$":"question"},"state_id":{"type":"string","key$":"state_id"},"revision_id":{"type":"string","key$":"revision_id"},"account_id":{"type":"string","key$":"account_id"},"persona_id":{"type":"string","key$":"persona_id"},"query":{"type":"string","key$":"query"},"area":{"type":"string","key$":"area"},"since":{"type":"string","key$":"since"},"before":{"type":"string","key$":"before"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"product_map_question.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/questions"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const product_map_question_ref01_ent = client.ProductMapQuestion()
    let product_map_question_ref01_data = setup.data.new.product_map_question['product_map_question_ref01']
    product_map_question_ref01_data['organization_id'] = setup.idmap['organization01']
    product_map_question_ref01_data['project_id'] = setup.idmap['project01']

    product_map_question_ref01_data = (await product_map_question_ref01_ent.create(product_map_question_ref01_data)).data()
    assert(null != product_map_question_ref01_data)


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
      '../../../../.sdk/test/entity/product_map_question/ProductMapQuestionTestData.json')

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
    ['product_map_question01','product_map_question02','product_map_question03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PRODUCT_MAP_QUESTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PRODUCT_MAP_QUESTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PRODUCT_MAP_QUESTION_ENTID']
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
  
