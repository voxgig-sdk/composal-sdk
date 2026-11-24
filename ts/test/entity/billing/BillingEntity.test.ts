

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


describe('BillingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Billing()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Billing().load({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addons":{"a":true,"h":"Addons","n":"addons","r":true,"t":"`$ARRAY`","key$":"addons","index$":0},"breakdown":{"a":true,"h":"Breakdown","n":"breakdown","r":true,"sh":"The 24-hour live series with its provenance; null only when the rollup fallback itself failed.","t":"`$ANY`","key$":"breakdown","index$":1},"budget":{"a":true,"h":"Budget","n":"budget","r":true,"t":"`$ANY`","key$":"budget","index$":2},"can_manage_contact":{"a":true,"h":"Can Manage Contact","n":"can_manage_contact","r":true,"t":"`$BOOLEAN`","key$":"can_manage_contact","index$":3},"can_manage_extra_spend":{"a":true,"h":"Can Manage Extra Spend","n":"can_manage_extra_spend","r":true,"t":"`$BOOLEAN`","key$":"can_manage_extra_spend","index$":4},"can_manage_local_subscription":{"a":true,"h":"Can Manage Local Subscription","n":"can_manage_local_subscription","r":true,"t":"`$BOOLEAN`","key$":"can_manage_local_subscription","index$":5},"can_manage_payment_method":{"a":true,"h":"Can Manage Payment Method","n":"can_manage_payment_method","r":true,"t":"`$BOOLEAN`","key$":"can_manage_payment_method","index$":6},"can_set_up_billing":{"a":true,"h":"Can Set Up Billing","n":"can_set_up_billing","r":true,"t":"`$BOOLEAN`","key$":"can_set_up_billing","index$":7},"customer":{"a":true,"h":"Customer","n":"customer","r":true,"t":"`$ANY`","key$":"customer","index$":8},"deployment_usage_visible":{"a":true,"h":"Deployment Usage Visible","n":"deployment_usage_visible","r":true,"t":"`$BOOLEAN`","key$":"deployment_usage_visible","index$":9},"entitlements":{"a":true,"h":"Entitlements","n":"entitlements","r":true,"t":"`$OBJECT`","key$":"entitlements","index$":10},"extra_spend_enabled":{"a":true,"h":"Extra Spend Enabled","n":"extra_spend_enabled","r":true,"sh":"Organization consent to paid overages across all metered usage.","t":"`$BOOLEAN`","key$":"extra_spend_enabled","index$":11},"feature_enabled":{"a":true,"h":"Feature Enabled","n":"feature_enabled","r":true,"sh":"Whether the `billing` feature is on for this organization.","t":"`$BOOLEAN`","key$":"feature_enabled","index$":12},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":13},"package":{"a":true,"h":"Package","n":"package","r":true,"t":"`$ANY`","key$":"package","index$":14},"prepaid":{"a":true,"h":"Prepaid","n":"prepaid","r":true,"t":"`$ANY`","key$":"prepaid","index$":15},"preview":{"a":true,"h":"Preview","n":"preview","r":true,"sh":"Metronome draft invoice and credits, or null.","t":"`$ANY`","key$":"preview","index$":16},"storage_usage":{"a":true,"h":"Storage Usage","n":"storage_usage","r":true,"t":"`$OBJECT`","key$":"storage_usage","index$":17},"stripe":{"a":true,"h":"Stripe","n":"stripe","r":true,"t":"`$OBJECT`","key$":"stripe","index$":18},"subscription":{"a":true,"h":"Subscription","n":"subscription","r":true,"t":"`$ANY`","key$":"subscription","index$":19},"token_account":{"a":true,"h":"Token Account","n":"token_account","r":true,"t":"`$OBJECT`","key$":"token_account","index$":20}},"name":"billing","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/billing","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/billing","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"billing"}],"t":{"req":"`reqdata`","res":"`body.addons`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/billing/usage","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/billing/usage","q":{"$action":"usage","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"billing"},{"lit":"usage"}],"t":{"req":"`reqdata`","res":"`body.meters`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"billing","name__orig":"billing","Name":"Billing","name_":"billing","name-":"billing","NAME":"BILLING","index$":124}, {"active":true,"entity":"billing","key$":"BasicBillingFlow","kind":"basic","name":"BasicBillingFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"billing_ref01","srcdatavar":"billing_ref01_data","suffix":"_dt0"},"m":{"id":"billing01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-billing_ref01"}}],"unreachable":true}]}, 'Billing', {"GET /api/v1/organizations/{organization_id}/billing":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/billing/usage":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_ref01_data = Object.values(setup.data.existing.billing)[0] as any

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
      '../../../../.sdk/test/entity/billing/BillingTestData.json')

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
    ['billing01','billing02','billing03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BILLING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BILLING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BILLING_ENTID']
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
  
