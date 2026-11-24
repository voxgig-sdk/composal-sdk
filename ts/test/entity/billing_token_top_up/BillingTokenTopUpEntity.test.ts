

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


describe('BillingTokenTopUpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BillingTokenTopUp()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BillingTokenTopUp().create({"organization_id":1,"amount_cents":1,"request_key":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing_token_top_up.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount_cents":{"a":true,"h":"Amount Cents","n":"amount_cents","r":true,"t":"`$INTEGER`","key$":"amount_cents","index$":0},"request_key":{"a":true,"fo":"uuid","h":"Request Key","n":"request_key","r":true,"t":"`$STRING`","key$":"request_key","index$":1}},"name":"billing_token_top_up","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["amount_cents","request_key"],"co":{"id":"POST /api/v1/organizations/{organization_id}/billing/token_top_ups","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/billing/token_top_ups","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"billing"},{"lit":"token_top_ups"}],"t":{"req":{"amount_cents":"`reqdata.amount_cent`","request_key":"`reqdata.request_key`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"billing_token_top_up","name__orig":"billing_token_top_up","Name":"BillingTokenTopUp","name_":"billing_token_top_up","name-":"billing-token-top-up","NAME":"BILLING_TOKEN_TOP_UP","index$":132}, {"active":true,"entity":"billing_token_top_up","key$":"BasicBillingTokenTopUpFlow","kind":"basic","name":"BasicBillingTokenTopUpFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"billing_token_top_up_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'BillingTokenTopUp', {"POST /api/v1/organizations/{organization_id}/billing/token_top_ups":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["amount_cents","request_key"],"properties":{"amount_cents":{"type":"integer","enum":[1000,2500,5000,10000],"key$":"amount_cents"},"request_key":{"type":"string","format":"uuid","key$":"request_key"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"billing_token_top_up.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/billing/token_top_ups"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const billing_token_top_up_ref01_ent = client.BillingTokenTopUp()
    let billing_token_top_up_ref01_data = setup.data.new.billing_token_top_up['billing_token_top_up_ref01']
    billing_token_top_up_ref01_data['organization_id'] = setup.idmap['organization01']

    billing_token_top_up_ref01_data = (await billing_token_top_up_ref01_ent.create(billing_token_top_up_ref01_data)).data()
    assert(null != billing_token_top_up_ref01_data)


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
      '../../../../.sdk/test/entity/billing_token_top_up/BillingTokenTopUpTestData.json')

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
    ['billing_token_top_up01','billing_token_top_up02','billing_token_top_up03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BILLING_TOKEN_TOP_UP_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BILLING_TOKEN_TOP_UP_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BILLING_TOKEN_TOP_UP_ENTID']
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
  
