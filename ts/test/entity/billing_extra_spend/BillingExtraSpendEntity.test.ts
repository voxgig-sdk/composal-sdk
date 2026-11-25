

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


describe('BillingExtraSpendEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BillingExtraSpend()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BillingExtraSpend().update({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing_extra_spend.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addons":{"a":true,"h":"Addons","n":"addons","r":true,"t":"`$ARRAY`","key$":"addons","index$":0},"breakdown":{"a":true,"h":"Breakdown","n":"breakdown","r":true,"sh":"The 24-hour live series with its provenance; null only when the rollup fallback itself failed.","t":"`$ANY`","key$":"breakdown","index$":1},"budget":{"a":true,"h":"Budget","n":"budget","r":true,"t":"`$ANY`","key$":"budget","index$":2},"can_manage_contact":{"a":true,"h":"Can Manage Contact","n":"can_manage_contact","r":true,"t":"`$BOOLEAN`","key$":"can_manage_contact","index$":3},"can_manage_extra_spend":{"a":true,"h":"Can Manage Extra Spend","n":"can_manage_extra_spend","r":true,"t":"`$BOOLEAN`","key$":"can_manage_extra_spend","index$":4},"can_manage_local_subscription":{"a":true,"h":"Can Manage Local Subscription","n":"can_manage_local_subscription","r":true,"t":"`$BOOLEAN`","key$":"can_manage_local_subscription","index$":5},"can_manage_payment_method":{"a":true,"h":"Can Manage Payment Method","n":"can_manage_payment_method","r":true,"t":"`$BOOLEAN`","key$":"can_manage_payment_method","index$":6},"can_set_up_billing":{"a":true,"h":"Can Set Up Billing","n":"can_set_up_billing","r":true,"t":"`$BOOLEAN`","key$":"can_set_up_billing","index$":7},"customer":{"a":true,"h":"Customer","n":"customer","r":true,"t":"`$ANY`","key$":"customer","index$":8},"deployment_usage_visible":{"a":true,"h":"Deployment Usage Visible","n":"deployment_usage_visible","r":true,"t":"`$BOOLEAN`","key$":"deployment_usage_visible","index$":9},"enabled":{"a":true,"h":"Enabled","n":"enabled","r":true,"t":"`$BOOLEAN`","key$":"enabled","index$":10},"entitlements":{"a":true,"h":"Entitlements","n":"entitlements","r":true,"t":"`$OBJECT`","key$":"entitlements","index$":11},"extra_spend_enabled":{"a":true,"h":"Extra Spend Enabled","n":"extra_spend_enabled","r":true,"sh":"Organization consent to paid overages across all metered usage.","t":"`$BOOLEAN`","key$":"extra_spend_enabled","index$":12},"feature_enabled":{"a":true,"h":"Feature Enabled","n":"feature_enabled","r":true,"sh":"Whether the `billing` feature is on for this organization.","t":"`$BOOLEAN`","key$":"feature_enabled","index$":13},"monthly_cap_cents":{"a":true,"h":"Monthly Cap Cents","n":"monthly_cap_cents","r":false,"sh":"Monthly limit across all metered overages, excluding plan fees.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"monthly_cap_cents","index$":14},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":15},"package":{"a":true,"h":"Package","n":"package","r":true,"t":"`$ANY`","key$":"package","index$":16},"prepaid":{"a":true,"h":"Prepaid","n":"prepaid","r":true,"t":"`$ANY`","key$":"prepaid","index$":17},"preview":{"a":true,"h":"Preview","n":"preview","r":true,"sh":"Metronome draft invoice and credits, or null.","t":"`$ANY`","key$":"preview","index$":18},"storage_usage":{"a":true,"h":"Storage Usage","n":"storage_usage","r":true,"t":"`$OBJECT`","key$":"storage_usage","index$":19},"stripe":{"a":true,"h":"Stripe","n":"stripe","r":true,"t":"`$OBJECT`","key$":"stripe","index$":20},"subscription":{"a":true,"h":"Subscription","n":"subscription","r":true,"t":"`$ANY`","key$":"subscription","index$":21},"token_account":{"a":true,"h":"Token Account","n":"token_account","r":true,"t":"`$OBJECT`","key$":"token_account","index$":22}},"name":"billing_extra_spend","op":{"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["enabled","monthly_cap_cents"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/billing/extra_spend","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/billing/extra_spend","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"billing"},{"lit":"extra_spend"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["enabled","monthly_cap_cents"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/billing/extra_spend","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/billing/extra_spend","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"billing"},{"lit":"extra_spend"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"billing_extra_spend","name__orig":"billing_extra_spend","Name":"BillingExtraSpend","name_":"billing_extra_spend","name-":"billing-extra-spend","NAME":"BILLING_EXTRA_SPEND","index$":129}, {"active":true,"entity":"billing_extra_spend","key$":"BasicBillingExtraSpendFlow","kind":"basic","name":"BasicBillingExtraSpendFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"billing_extra_spend_ref01","srcdatavar":"billing_extra_spend_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-billing_extra_spend_ref01"}}],"v":[],"unreachable":true}]}, 'BillingExtraSpend', {"PATCH /api/v1/organizations/{organization_id}/billing/extra_spend":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["enabled"],"properties":{"enabled":{"type":"boolean","key$":"enabled"},"monthly_cap_cents":{"type":["integer","null"],"minimum":1,"maximum":2147483647,"description":"Monthly limit across all metered overages, excluding plan fees. Null removes the limit; omission preserves it.","key$":"monthly_cap_cents"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /api/v1/organizations/{organization_id}/billing/extra_spend":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["enabled"],"properties":{"enabled":{"type":"boolean","key$":"enabled"},"monthly_cap_cents":{"type":["integer","null"],"minimum":1,"maximum":2147483647,"description":"Monthly limit across all metered overages, excluding plan fees. Null removes the limit; omission preserves it.","key$":"monthly_cap_cents"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"billing_extra_spend.update.0":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/billing/extra_spend"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_extra_spend_ref01_data = Object.values(setup.data.existing.billing_extra_spend)[0] as any

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
      '../../../../.sdk/test/entity/billing_extra_spend/BillingExtraSpendTestData.json')

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
    ['billing_extra_spend01','billing_extra_spend02','billing_extra_spend03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BILLING_EXTRA_SPEND_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BILLING_EXTRA_SPEND_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BILLING_EXTRA_SPEND_ENTID']
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
  
