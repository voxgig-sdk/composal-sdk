

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


describe('VerifySignalIntegrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.VerifySignalIntegration()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VerifySignalIntegration().create({"id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'verify_signal_integration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_token_stored":{"a":true,"h":"Api Token Stored","n":"api_token_stored","r":true,"t":"`$BOOLEAN`","key$":"api_token_stored","index$":0},"config":{"a":true,"h":"Config","n":"config","r":true,"t":"`$OBJECT`","key$":"config","index$":1},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at","index$":2},"failure_message":{"a":true,"h":"Failure Message","n":"failure_message","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_message","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Public id (`sint_…`).","t":"`$STRING`","key$":"id","index$":4},"inbound_path":{"a":true,"h":"Inbound Path","n":"inbound_path","r":true,"t":"`$STRING`","key$":"inbound_path","index$":5},"inbound_url":{"a":true,"h":"Inbound Url","n":"inbound_url","r":true,"sh":"The absolute URL to paste into the provider's webhook configuration.","t":"`$STRING`","key$":"inbound_url","index$":6},"last_received_at":{"a":true,"h":"Last Received At","n":"last_received_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_received_at","index$":7},"last_verified_at":{"a":true,"h":"Last Verified At","n":"last_verified_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_verified_at","index$":8},"mode":{"a":true,"h":"Mode","n":"mode","r":true,"sh":"`connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential.","t":"`$STRING`","key$":"mode","index$":9},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":10},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":11},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"t":"`$STRING`","key$":"provider","index$":12},"rejected_signature_count":{"a":true,"h":"Rejected Signature Count","n":"rejected_signature_count","r":true,"sh":"Deliveries rejected for a bad or missing signature.","t":"`$INTEGER`","key$":"rejected_signature_count","index$":13},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":14},"target_count":{"a":true,"h":"Target Count","n":"target_count","r":true,"t":"`$INTEGER`","key$":"target_count","index$":15},"unmapped_delivery_count":{"a":true,"h":"Unmapped Delivery Count","n":"unmapped_delivery_count","r":true,"sh":"Deliveries accepted whose provider resource matched no enabled target.","t":"`$INTEGER`","key$":"unmapped_delivery_count","index$":16},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at","index$":17},"webhook_secret_stored":{"a":true,"h":"Webhook Secret Stored","n":"webhook_secret_stored","r":true,"t":"`$BOOLEAN`","key$":"webhook_secret_stored","index$":18}},"id":{"field":"id","name":"id"},"name":"verify_signal_integration","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/verify","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/signal_integrations/{id}/verify","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"},{"var":"id"},{"lit":"verify"}],"t":{"req":"`reqdata`","res":"`body.signal_integration`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"verify_signal_integration","name__orig":"verify_signal_integration","Name":"VerifySignalIntegration","name_":"verify_signal_integration","name-":"verify-signal-integration","NAME":"VERIFY_SIGNAL_INTEGRATION","index$":545}, {"active":true,"entity":"verify_signal_integration","key$":"BasicVerifySignalIntegrationFlow","kind":"basic","name":"BasicVerifySignalIntegrationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"verify_signal_integration_ref01"},"m":{"id":"id01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'VerifySignalIntegration', {"POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/verify":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"verify_signal_integration.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/verify"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const verify_signal_integration_ref01_ent = client.VerifySignalIntegration()
    let verify_signal_integration_ref01_data = setup.data.new.verify_signal_integration['verify_signal_integration_ref01']
    verify_signal_integration_ref01_data['id'] = setup.idmap['id01']
    verify_signal_integration_ref01_data['organization_id'] = setup.idmap['organization01']

    verify_signal_integration_ref01_data = (await verify_signal_integration_ref01_ent.create(verify_signal_integration_ref01_data)).data()
    assert(null != verify_signal_integration_ref01_data.id)


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
      '../../../../.sdk/test/entity/verify_signal_integration/VerifySignalIntegrationTestData.json')

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
    ['verify_signal_integration01','verify_signal_integration02','verify_signal_integration03','organization01','organization02','organization03','id01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_VERIFY_SIGNAL_INTEGRATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_VERIFY_SIGNAL_INTEGRATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_VERIFY_SIGNAL_INTEGRATION_ENTID']
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
  
