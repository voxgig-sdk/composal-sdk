

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


describe('SparkCreditEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SparkCredit()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SparkCredit().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'spark_credit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount_cents":{"a":true,"h":"Amount Cents","n":"amount_cents","r":false,"sh":"Purchase amount in USD cents.","t":"`$INTEGER`","key$":"amount_cents","index$":0},"autofill":{"a":true,"h":"Autofill","n":"autofill","r":true,"t":"`$ANY`","key$":"autofill","index$":1},"autofill_payment_unconfirmed":{"a":true,"h":"Autofill Payment Unconfirmed","n":"autofill_payment_unconfirmed","r":true,"t":"`$BOOLEAN`","key$":"autofill_payment_unconfirmed","index$":2},"available_usd":{"a":true,"h":"Available Usd","n":"available_usd","r":true,"t":"`$STRING`","key$":"available_usd","index$":3},"billing_unit":{"a":true,"h":"Billing Unit","n":"billing_unit","r":false,"sh":"Compute minute quote version returned by the billing summary.","t":"`$STRING`","key$":"billing_unit","index$":4},"can_manage":{"a":true,"h":"Can Manage","n":"can_manage","r":true,"t":"`$BOOLEAN`","key$":"can_manage","index$":5},"compute_minutes":{"a":true,"h":"Compute Minutes","n":"compute_minutes","r":true,"t":"`$OBJECT`","key$":"compute_minutes","index$":6},"compute_usd":{"a":true,"h":"Compute Usd","n":"compute_usd","r":false,"t":"`$STRING`","key$":"compute_usd","index$":7},"credits_per_usd":{"a":true,"h":"Credits Per Usd","n":"credits_per_usd","r":true,"t":"`$INTEGER`","key$":"credits_per_usd","index$":8},"inference_usd":{"a":true,"h":"Inference Usd","n":"inference_usd","r":false,"t":"`$STRING`","key$":"inference_usd","index$":9},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":10},"payment_method":{"a":true,"h":"Payment Method","n":"payment_method","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"payment_method","index$":11},"payments_enabled":{"a":true,"h":"Payments Enabled","n":"payments_enabled","r":true,"t":"`$BOOLEAN`","key$":"payments_enabled","index$":12},"plan":{"a":true,"h":"Plan","n":"plan","op":{"list":{"req":true,"type":["`$ONE`",["`$STRING`","`$NULL`"]]},"patch":{"req":true,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":false,"t":"`$STRING`","key$":"plan","index$":13},"plans":{"a":true,"h":"Plans","n":"plans","r":true,"t":"`$ARRAY`","key$":"plans","index$":14},"quoted_credits_cents":{"a":true,"h":"Quoted Credits Cents","n":"quoted_credits_cents","r":false,"sh":"Grant shown for a top-up or subscription, in usage cents.","t":"`$INTEGER`","key$":"quoted_credits_cents","index$":15},"quoted_price_cents":{"a":true,"h":"Quoted Price Cents","n":"quoted_price_cents","r":false,"sh":"Monthly cash price shown for a subscription, in USD cents.","t":"`$INTEGER`","key$":"quoted_price_cents","index$":16},"refill_limits_cents":{"a":true,"h":"Refill Limits Cents","n":"refill_limits_cents","r":true,"t":"`$ARRAY`","key$":"refill_limits_cents","index$":17},"refill_options":{"a":true,"h":"Refill Options","n":"refill_options","r":true,"t":"`$ARRAY`","key$":"refill_options","index$":18},"refill_thresholds_cents":{"a":true,"h":"Refill Thresholds Cents","n":"refill_thresholds_cents","r":true,"t":"`$ARRAY`","key$":"refill_thresholds_cents","index$":19},"request_key":{"a":true,"fo":"uuid","h":"Request Key","n":"request_key","r":true,"t":"`$STRING`","key$":"request_key","index$":20},"settings":{"a":true,"h":"Settings","n":"settings","r":true,"t":"`$ANY`","key$":"settings","index$":21},"starter_cents":{"a":true,"h":"Starter Cents","n":"starter_cents","r":true,"t":"`$INTEGER`","key$":"starter_cents","index$":22},"top_up_max_cents":{"a":true,"h":"Top Up Max Cents","n":"top_up_max_cents","r":true,"sh":"Maximum manual top-up, in USD cents.","t":"`$INTEGER`","key$":"top_up_max_cents","index$":23},"top_up_step_cents":{"a":true,"h":"Top Up Step Cents","n":"top_up_step_cents","r":true,"sh":"Minimum manual top-up and increment, in USD cents.","t":"`$INTEGER`","key$":"top_up_step_cents","index$":24}},"name":"spark_credit","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["amount_cents","billing_unit","kind","plan","quoted_credits_cents","quoted_price_cents","request_key"],"co":{"id":"POST /api/v1/organizations/{org_slug}/spark_credits","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/spark_credits","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"spark_credits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/spark_credits","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"view","or":"view","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/spark_credits","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"spark_credits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/spark_credits/daily_usage","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/spark_credits/daily_usage","q":{"$action":"daily_usage","exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"spark_credits"},{"lit":"daily_usage"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["settings"],"co":{"id":"PATCH /api/v1/organizations/{org_slug}/spark_credits","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"view","or":"view","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{org_slug}/spark_credits","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"spark_credits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/organizations/{org_slug}/spark_credits","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{org_slug}/spark_credits","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"spark_credits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"spark_credit","name__orig":"spark_credit","Name":"SparkCredit","name_":"spark_credit","name-":"spark-credit","NAME":"SPARK_CREDIT","index$":504}, {"active":true,"entity":"spark_credit","key$":"BasicSparkCreditFlow","kind":"basic","name":"BasicSparkCreditFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"spark_credit_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"spark_credit_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"spark_credit_ref01","srcdatavar":"spark_credit_ref01_data","suffix":"_up0","textfield":"available_usd"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-spark_credit_ref01"}}],"v":[],"index$":2},{"a":false,"d":{},"i":{"ref":"spark_credit_ref01","srcdatavar":"spark_credit_ref01_data","suffix":"_dt0"},"m":{"id":"spark_credit01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-spark_credit_ref01"}}],"unreachable":true}]}, 'SparkCredit', {"POST /api/v1/organizations/{org_slug}/spark_credits":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["kind","request_key"],"properties":{"kind":{"type":"string","enum":["top_up","inference_top_up","subscribe","payment_method","manage_plan"],"key$":"kind"},"request_key":{"type":"string","format":"uuid","key$":"request_key"},"plan":{"type":"string","key$":"plan"},"amount_cents":{"type":"integer","minimum":1000,"maximum":99999000,"description":"Purchase amount in USD cents. Compute top-ups use $10 increments; inference uses its USD presets.","key$":"amount_cents"},"billing_unit":{"type":"string","description":"Compute minute quote version returned by the billing summary.","key$":"billing_unit"},"quoted_credits_cents":{"type":"integer","description":"Grant shown for a top-up or subscription, in usage cents.","key$":"quoted_credits_cents"},"quoted_price_cents":{"type":"integer","description":"Monthly cash price shown for a subscription, in USD cents.","key$":"quoted_price_cents"}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{org_slug}/spark_credits":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"view","in":"query","schema":{"type":"string","enum":["wallet"]},"description":"Omit monthly usage from the wallet response.","index$":1}]},"GET /api/v1/organizations/{org_slug}/spark_credits/daily_usage":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/organizations/{org_slug}/spark_credits":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["settings"],"properties":{"settings":{"anyOf":[{"allOf":[{},{}],"x-ref":"#/components/schemas/SparkCreditsAutofillInput"},{"type":"null"}],"key$":"settings"}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"view","in":"query","schema":{"type":"string","enum":["wallet"]},"description":"Omit monthly usage from the wallet response.","index$":1}]},"PUT /api/v1/organizations/{org_slug}/spark_credits":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"spark_credit.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/spark_credits","spark_credit.update.2":"GET-only live run: needs PUT /api/v1/organizations/{org_slug}/spark_credits"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const spark_credit_ref01_ent = client.SparkCredit()
    let spark_credit_ref01_data = setup.data.new.spark_credit['spark_credit_ref01']
    spark_credit_ref01_data['organization_id'] = setup.idmap['organization01']

    spark_credit_ref01_data = (await spark_credit_ref01_ent.create(spark_credit_ref01_data)).data()
    assert(null != spark_credit_ref01_data)


    // LIST
    const spark_credit_ref01_match: any = {}
    spark_credit_ref01_match['organization_id'] = setup.idmap['organization01']

    const spark_credit_ref01_list = (await spark_credit_ref01_ent.list(spark_credit_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const spark_credit_ref01_data_up0: any = {}

    const spark_credit_ref01_markdef_up0 = { name: 'available_usd', value: 'Mark01-spark_credit_ref01_' + setup.now }
    ;(spark_credit_ref01_data_up0 as any)[spark_credit_ref01_markdef_up0.name] = spark_credit_ref01_markdef_up0.value

    const spark_credit_ref01_resdata_up0 = (await spark_credit_ref01_ent.update(spark_credit_ref01_data_up0)).data()
    assert(null != spark_credit_ref01_resdata_up0)

    assert((spark_credit_ref01_resdata_up0 as any)[spark_credit_ref01_markdef_up0.name] === spark_credit_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/spark_credit/SparkCreditTestData.json')

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
    ['spark_credit01','spark_credit02','spark_credit03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SPARK_CREDIT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SPARK_CREDIT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SPARK_CREDIT_ENTID']
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
  
