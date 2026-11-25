

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


describe('ModelSubscriptionAccountConnectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ModelSubscriptionAccountConnection()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ModelSubscriptionAccountConnection().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'model_subscription_account_connection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"model_subscription_account_connection","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/model_subscription_accounts/connection/{agent_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"agent_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/model_subscription_accounts/connection/{agent_id}","q":{"exist":["id"]},"r":{"param":{"agent_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"model_subscription_accounts"},{"lit":"connection"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["action_name","login_id","method","step_id","value"],"co":{"id":"POST /api/v1/model_subscription_accounts/connection/{agent_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"agent_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/model_subscription_accounts/connection/{agent_id}","q":{"exist":["id"]},"r":{"param":{"agent_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"model_subscription_accounts"},{"lit":"connection"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"model_subscription_account_connection","name__orig":"model_subscription_account_connection","Name":"ModelSubscriptionAccountConnection","name_":"model_subscription_account_connection","name-":"model-subscription-account-connection","NAME":"MODEL_SUBSCRIPTION_ACCOUNT_CONNECTION","index$":320}, {"active":true,"entity":"model_subscription_account_connection","key$":"BasicModelSubscriptionAccountConnectionFlow","kind":"basic","name":"BasicModelSubscriptionAccountConnectionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"model_subscription_account_connection_ref01","srcdatavar":"model_subscription_account_connection_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-model_subscription_account_connection_ref01"}}],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"model_subscription_account_connection_ref01","srcdatavar":"model_subscription_account_connection_ref01_data","suffix":"_dt0"},"m":{"id":"model_subscription_account_connection01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-model_subscription_account_connection_ref01"}}],"index$":1,"route":"GET /api/v1/model_subscription_accounts/connection/{agent_id}","record":{}}]}, 'ModelSubscriptionAccountConnection', {"GET /api/v1/model_subscription_accounts/connection/{agent_id}":{"protocol":"http","parameters":[{"name":"agent_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/model_subscription_accounts/connection/{agent_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"oneOf":[{"type":"object","required":["action_name","method"],"properties":{"action_name":{"type":"string","enum":["start"]},"method":{"type":"string","enum":["openai/openai-device-code","xai/xai-oauth"]}}},{"type":"object","required":["action_name","login_id","step_id"],"properties":{"action_name":{"type":"string","enum":["answer"]},"login_id":{"type":"string"},"step_id":{"type":"string"},"value":{"oneOf":[{},{}]}}},{"type":"object","required":["action_name","login_id"],"properties":{"action_name":{"type":"string","enum":["cancel"]},"login_id":{"type":"string"}}}]}}}},"parameters":[{"name":"agent_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"model_subscription_account_connection.update.0":"GET-only live run: needs POST /api/v1/model_subscription_accounts/connection/{agent_id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let model_subscription_account_connection_ref01_data = Object.values(setup.data.existing.model_subscription_account_connection)[0] as any

    // UPDATE
    const model_subscription_account_connection_ref01_ent = client.ModelSubscriptionAccountConnection()
    const model_subscription_account_connection_ref01_data_up0: any = {}
    model_subscription_account_connection_ref01_data_up0.id = model_subscription_account_connection_ref01_data.id

    const model_subscription_account_connection_ref01_resdata_up0 = (await model_subscription_account_connection_ref01_ent.update(model_subscription_account_connection_ref01_data_up0)).data()
    assert(model_subscription_account_connection_ref01_resdata_up0.id === model_subscription_account_connection_ref01_data_up0.id)


    // LOAD
    const model_subscription_account_connection_ref01_match_dt0: any = {}
    model_subscription_account_connection_ref01_match_dt0.id = model_subscription_account_connection_ref01_data.id
    const model_subscription_account_connection_ref01_data_dt0 = (await model_subscription_account_connection_ref01_ent.load(model_subscription_account_connection_ref01_match_dt0)).data()
    assert(model_subscription_account_connection_ref01_data_dt0.id === model_subscription_account_connection_ref01_data.id)


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
      '../../../../.sdk/test/entity/model_subscription_account_connection/ModelSubscriptionAccountConnectionTestData.json')

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
    ['model_subscription_account_connection01','model_subscription_account_connection02','model_subscription_account_connection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_MODEL_SUBSCRIPTION_ACCOUNT_CONNECTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_MODEL_SUBSCRIPTION_ACCOUNT_CONNECTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_MODEL_SUBSCRIPTION_ACCOUNT_CONNECTION_ENTID']
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
  
