

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


describe('BillingInvoiceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BillingInvoice()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BillingInvoice().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing_invoice.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount_due_cents":{"a":true,"h":"Amount Due Cents","n":"amount_due_cents","r":true,"t":"`$INTEGER`","key$":"amount_due_cents","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"t":"`$STRING`","key$":"currency","index$":2},"hosted_invoice_url":{"a":true,"h":"Hosted Invoice Url","n":"hosted_invoice_url","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"hosted_invoice_url","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":4},"invoice_pdf":{"a":true,"h":"Invoice Pdf","n":"invoice_pdf","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"invoice_pdf","index$":5},"metronome_invoice_id":{"a":true,"h":"Metronome Invoice Id","n":"metronome_invoice_id","r":false,"sh":"Metronome's id for the invoice it pushed","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"metronome_invoice_id","index$":6},"number":{"a":true,"h":"Number","n":"number","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"number","index$":7},"period_ended_at":{"a":true,"h":"Period Ended At","n":"period_ended_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"period_ended_at","index$":8},"period_started_at":{"a":true,"h":"Period Started At","n":"period_started_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"period_started_at","index$":9},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":10},"total_cents":{"a":true,"h":"Total Cents","n":"total_cents","r":true,"t":"`$INTEGER`","key$":"total_cents","index$":11}},"id":{"field":"id","name":"id"},"name":"billing_invoice","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/billing/invoices","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/billing/invoices","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"billing"},{"lit":"invoices"}],"t":{"req":"`reqdata`","res":"`body.invoices`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"billing_invoice","name__orig":"billing_invoice","Name":"BillingInvoice","name_":"billing_invoice","name-":"billing-invoice","NAME":"BILLING_INVOICE","index$":130}, {"active":true,"entity":"billing_invoice","key$":"BasicBillingInvoiceFlow","kind":"basic","name":"BasicBillingInvoiceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"billing_invoice_ref01"}}],"index$":0}]}, 'BillingInvoice', {"GET /api/v1/organizations/{organization_id}/billing/invoices":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_invoice_ref01_data = Object.values(setup.data.existing.billing_invoice)[0] as any

    // LIST
    const billing_invoice_ref01_ent = client.BillingInvoice()
    const billing_invoice_ref01_match: any = {}
    billing_invoice_ref01_match['organization_id'] = setup.idmap['organization01']

    const billing_invoice_ref01_list = (await billing_invoice_ref01_ent.list(billing_invoice_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/billing_invoice/BillingInvoiceTestData.json')

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
    ['billing_invoice01','billing_invoice02','billing_invoice03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BILLING_INVOICE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BILLING_INVOICE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BILLING_INVOICE_ENTID']
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
  
