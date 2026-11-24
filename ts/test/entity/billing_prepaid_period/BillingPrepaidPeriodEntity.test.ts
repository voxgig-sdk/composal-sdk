

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


describe('BillingPrepaidPeriodEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BillingPrepaidPeriod()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BillingPrepaidPeriod().load({"id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing_prepaid_period.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activated_at":{"a":true,"fo":"date-time","h":"Activated At","n":"activated_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"activated_at","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"t":"`$STRING`","key$":"currency","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"last_error":{"a":true,"h":"Last Error","n":"last_error","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_error","index$":4},"minutes":{"a":true,"h":"Minutes","n":"minutes","r":true,"t":"`$INTEGER`","key$":"minutes","index$":5},"net_amount_cents":{"a":true,"h":"Net Amount Cents","n":"net_amount_cents","r":true,"t":"`$INTEGER`","key$":"net_amount_cents","index$":6},"paid_at":{"a":true,"fo":"date-time","h":"Paid At","n":"paid_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"paid_at","index$":7},"paid_total_cents":{"a":true,"h":"Paid Total Cents","n":"paid_total_cents","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"paid_total_cents","index$":8},"payment_action_url":{"a":true,"h":"Payment Action Url","n":"payment_action_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"payment_action_url","index$":9},"period_ended_at":{"a":true,"fo":"date-time","h":"Period Ended At","n":"period_ended_at","r":true,"t":"`$STRING`","key$":"period_ended_at","index$":10},"period_started_at":{"a":true,"fo":"date-time","h":"Period Started At","n":"period_started_at","r":true,"t":"`$STRING`","key$":"period_started_at","index$":11},"receipt_url":{"a":true,"h":"Receipt Url","n":"receipt_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"receipt_url","index$":12},"refunded_net_cents":{"a":true,"h":"Refunded Net Cents","n":"refunded_net_cents","r":true,"t":"`$INTEGER`","key$":"refunded_net_cents","index$":13},"state":{"a":true,"h":"State","n":"state","r":true,"t":"`$STRING`","key$":"state","index$":14}},"id":{"field":"id","name":"id"},"name":"billing_prepaid_period","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"billing"},{"lit":"prepaid_periods"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}/payment_page","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}/payment_page","q":{"$action":"payment_page","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"billing"},{"lit":"prepaid_periods"},{"var":"id"},{"lit":"payment_page"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"billing_prepaid_period","name__orig":"billing_prepaid_period","Name":"BillingPrepaidPeriod","name_":"billing_prepaid_period","name-":"billing-prepaid-period","NAME":"BILLING_PREPAID_PERIOD","index$":130}, {"active":true,"entity":"billing_prepaid_period","key$":"BasicBillingPrepaidPeriodFlow","kind":"basic","name":"BasicBillingPrepaidPeriodFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"billing_prepaid_period_ref01","srcdatavar":"billing_prepaid_period_ref01_data","suffix":"_dt0"},"m":{"id":"billing_prepaid_period01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-billing_prepaid_period_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}","record":{}}]}, 'BillingPrepaidPeriod', {"GET /api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/billing/prepaid_periods/{id}/payment_page":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_prepaid_period_ref01_data = Object.values(setup.data.existing.billing_prepaid_period)[0] as any

    // LOAD
    const billing_prepaid_period_ref01_ent = client.BillingPrepaidPeriod()
    const billing_prepaid_period_ref01_match_dt0: any = {}
    billing_prepaid_period_ref01_match_dt0.id = billing_prepaid_period_ref01_data.id
    billing_prepaid_period_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const billing_prepaid_period_ref01_data_dt0 = (await billing_prepaid_period_ref01_ent.load(billing_prepaid_period_ref01_match_dt0)).data()
    assert(billing_prepaid_period_ref01_data_dt0.id === billing_prepaid_period_ref01_data.id)


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
      '../../../../.sdk/test/entity/billing_prepaid_period/BillingPrepaidPeriodTestData.json')

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
    ['billing_prepaid_period01','billing_prepaid_period02','billing_prepaid_period03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BILLING_PREPAID_PERIOD_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BILLING_PREPAID_PERIOD_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BILLING_PREPAID_PERIOD_ENTID']
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
  
