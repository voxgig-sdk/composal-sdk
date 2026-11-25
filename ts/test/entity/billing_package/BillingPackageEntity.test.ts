

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


describe('BillingPackageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BillingPackage()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('billing_package hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).BillingPackage().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).BillingPackage()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.BillingPackage().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().BillingPackage().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.BillingPackage().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.BillingPackage().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BillingPackage().list({"base_price_cents":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing_package.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addons":{"a":true,"h":"Addons","n":"addons","r":true,"t":"`$ARRAY`","key$":"addons","index$":0},"base_price_cents":{"a":true,"h":"Base Price Cents","n":"base_price_cents","r":true,"t":"`$INTEGER`","key$":"base_price_cents","index$":1},"billing_interval":{"a":true,"h":"Billing Interval","n":"billing_interval","r":true,"t":"`$STRING`","key$":"billing_interval","index$":2},"billing_policy":{"a":true,"h":"Billing Policy","n":"billing_policy","r":true,"t":"`$STRING`","key$":"billing_policy","index$":3},"ci_included_spend_cents":{"a":true,"h":"Ci Included Spend Cents","n":"ci_included_spend_cents","r":false,"sh":"Monthly USD credit in cents shared by all CI charges, including runners, cache, storage and add-ons; replaces CI unit allowances when positive.","t":"`$INTEGER`","key$":"ci_included_spend_cents","index$":4},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"t":"`$STRING`","key$":"currency","index$":5},"key":{"a":true,"h":"Key","n":"key","r":true,"t":"`$STRING`","key$":"key","index$":6},"max_seats":{"a":true,"h":"Max Seats","n":"max_seats","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"max_seats","index$":7},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":8},"pay_as_you_go_enabled":{"a":true,"h":"Pay As You Go Enabled","n":"pay_as_you_go_enabled","r":true,"t":"`$BOOLEAN`","key$":"pay_as_you_go_enabled","index$":9},"rates":{"a":true,"h":"Rates","n":"rates","r":true,"t":"`$ARRAY`","key$":"rates","index$":10},"revision":{"a":true,"h":"Revision","n":"revision","r":true,"t":"`$INTEGER`","key$":"revision","index$":11},"roder_daily_run_limit":{"a":true,"h":"Roder Daily Run Limit","n":"roder_daily_run_limit","r":false,"t":"`$INTEGER`","key$":"roder_daily_run_limit","index$":12},"roder_run_concurrency_limit":{"a":true,"h":"Roder Run Concurrency Limit","n":"roder_run_concurrency_limit","r":false,"t":"`$INTEGER`","key$":"roder_run_concurrency_limit","index$":13},"seat_price_cents":{"a":true,"h":"Seat Price Cents","n":"seat_price_cents","r":true,"t":"`$INTEGER`","key$":"seat_price_cents","index$":14},"trial_days":{"a":true,"h":"Trial Days","n":"trial_days","r":true,"t":"`$INTEGER`","key$":"trial_days","index$":15},"visibility":{"a":true,"h":"Visibility","n":"visibility","r":true,"t":"`$STRING`","key$":"visibility","index$":16}},"name":"billing_package","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/billing/packages","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/billing/packages","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"billing"},{"lit":"packages"}],"t":{"req":"`reqdata`","res":"`body.packages`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"billing_package","name__orig":"billing_package","Name":"BillingPackage","name_":"billing_package","name-":"billing-package","NAME":"BILLING_PACKAGE","index$":131}, {"active":true,"entity":"billing_package","key$":"BasicBillingPackageFlow","kind":"basic","name":"BasicBillingPackageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"billing_package_ref01"}}],"index$":0}]}, 'BillingPackage', {"GET /api/v1/billing/packages":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_package_ref01_data = Object.values(setup.data.existing.billing_package)[0] as any

    // LIST
    const billing_package_ref01_ent = client.BillingPackage()
    const billing_package_ref01_match: any = {}

    const billing_package_ref01_list = (await billing_package_ref01_ent.list(billing_package_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/billing_package/BillingPackageTestData.json')

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
    ['billing_package01','billing_package02','billing_package03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BILLING_PACKAGE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BILLING_PACKAGE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BILLING_PACKAGE_ENTID']
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
  
