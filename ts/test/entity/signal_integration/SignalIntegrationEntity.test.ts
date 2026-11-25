

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


describe('SignalIntegrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SignalIntegration()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SignalIntegration().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'signal_integration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_token":{"a":true,"h":"Api Token","n":"api_token","r":false,"sh":"Optional provider API token for target discovery and backfill.","t":"`$STRING`","key$":"api_token","index$":0},"api_token_stored":{"a":true,"h":"Api Token Stored","n":"api_token_stored","r":true,"t":"`$BOOLEAN`","key$":"api_token_stored","index$":1},"config":{"a":true,"h":"Config","n":"config","op":{"create":{"req":false,"type":"`$OBJECT`"},"patch":{"req":false,"type":"`$OBJECT`"},"update":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$OBJECT`","key$":"config","index$":2},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at","index$":3},"failure_message":{"a":true,"h":"Failure Message","n":"failure_message","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_message","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Public id (`sint_…`).","t":"`$STRING`","key$":"id","index$":5},"inbound_path":{"a":true,"h":"Inbound Path","n":"inbound_path","r":true,"t":"`$STRING`","key$":"inbound_path","index$":6},"inbound_url":{"a":true,"h":"Inbound Url","n":"inbound_url","r":true,"sh":"The absolute URL to paste into the provider's webhook configuration.","t":"`$STRING`","key$":"inbound_url","index$":7},"last_received_at":{"a":true,"h":"Last Received At","n":"last_received_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_received_at","index$":8},"last_verified_at":{"a":true,"h":"Last Verified At","n":"last_verified_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_verified_at","index$":9},"mode":{"a":true,"h":"Mode","n":"mode","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"`connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential.","t":"`$STRING`","key$":"mode","index$":10},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":11},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":12},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"t":"`$STRING`","key$":"provider","index$":13},"rejected_signature_count":{"a":true,"h":"Rejected Signature Count","n":"rejected_signature_count","r":true,"sh":"Deliveries rejected for a bad or missing signature.","t":"`$INTEGER`","key$":"rejected_signature_count","index$":14},"status":{"a":true,"h":"Status","n":"status","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"status","index$":15},"target_count":{"a":true,"h":"Target Count","n":"target_count","r":true,"t":"`$INTEGER`","key$":"target_count","index$":16},"unmapped_delivery_count":{"a":true,"h":"Unmapped Delivery Count","n":"unmapped_delivery_count","r":true,"sh":"Deliveries accepted whose provider resource matched no enabled target.","t":"`$INTEGER`","key$":"unmapped_delivery_count","index$":17},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at","index$":18},"webhook_secret":{"a":true,"h":"Webhook Secret","n":"webhook_secret","r":false,"sh":"The provider's signing secret.","t":"`$STRING`","key$":"webhook_secret","index$":19},"webhook_secret_stored":{"a":true,"h":"Webhook Secret Stored","n":"webhook_secret_stored","r":true,"t":"`$BOOLEAN`","key$":"webhook_secret_stored","index$":20}},"id":{"field":"id","name":"id"},"name":"signal_integration","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token","q":{"$action":"regenerate_inbound_token","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"},{"var":"id"},{"lit":"regenerate_inbound_token"}],"t":{"req":"`reqdata`","res":"`body.signal_integration`"},"index$":0},{"a":true,"bf":["api_token","config","mode","name","provider","webhook_secret"],"co":{"id":"POST /api/v1/organizations/{organization_id}/signal_integrations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/signal_integrations","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"}],"t":{"req":"`reqdata`","res":"`body.signal_integration`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/signal_integrations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/signal_integrations","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"}],"t":{"req":"`reqdata`","res":"`body.signal_integrations`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/signal_integrations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/signal_integrations/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.signal_integration`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["api_token","config","mode","name","status","webhook_secret"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/signal_integrations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/signal_integrations/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.signal_integration`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/signal_integrations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/signal_integrations/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["api_token","config","mode","name","status","webhook_secret"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/signal_integrations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/signal_integrations/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"signal_integrations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.signal_integration`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"signal_integration","name__orig":"signal_integration","Name":"SignalIntegration","name_":"signal_integration","name-":"signal-integration","NAME":"SIGNAL_INTEGRATION","index$":471}, {"active":true,"entity":"signal_integration","key$":"BasicSignalIntegrationFlow","kind":"basic","name":"BasicSignalIntegrationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"signal_integration_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"signal_integration_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"signal_integration_ref01","srcdatavar":"signal_integration_ref01_data","suffix":"_up0","textfield":"api_token"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-signal_integration_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"signal_integration_ref01","srcdatavar":"signal_integration_ref01_data","suffix":"_dt0"},"m":{"id":"signal_integration01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-signal_integration_ref01"}}],"index$":3,"route":"GET /api/v1/organizations/{organization_id}/signal_integrations/{id}","record":{"organization_id":"organization_id"}},{"a":true,"d":{},"i":{"ref":"signal_integration_ref01","suffix":"_rm0"},"m":{"id":"signal_integration01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"signal_integration_ref01"}}],"index$":5}]}, 'SignalIntegration', {"POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/signal_integrations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["provider","name"],"properties":{"provider":{"type":"string","enum":["sentry","planetscale"],"x-ref":"#/components/schemas/SignalIntegrationProvider","key$":"provider"},"mode":{"type":"string","description":"`connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential.","enum":["connected","managed"],"x-ref":"#/components/schemas/SignalIntegrationMode","key$":"mode"},"name":{"type":"string","key$":"name"},"webhook_secret":{"type":"string","description":"The provider's signing secret. Stored as an organization secret; never read back.","key$":"webhook_secret"},"api_token":{"type":"string","description":"Optional provider API token for target discovery and backfill.","key$":"api_token"},"config":{"type":"object","additionalProperties":true,"key$":"config"}},"additionalProperties":true,"x-ref":"#/components/schemas/SignalIntegrationCreatePayload"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/signal_integrations":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/signal_integrations/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/organizations/{organization_id}/signal_integrations/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"mode":{"type":"string","description":"`connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential.","enum":["connected","managed"],"x-ref":"#/components/schemas/SignalIntegrationMode","key$":"mode"},"status":{"type":"string","enum":["pending","active","failed","disabled"],"x-ref":"#/components/schemas/SignalIntegrationStatus","key$":"status"},"webhook_secret":{"type":"string","key$":"webhook_secret"},"api_token":{"type":"string","key$":"api_token"},"config":{"type":"object","additionalProperties":true,"key$":"config"}},"additionalProperties":true,"x-ref":"#/components/schemas/SignalIntegrationUpdatePayload"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/organizations/{organization_id}/signal_integrations/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/organizations/{organization_id}/signal_integrations/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","key$":"name"},"mode":{"type":"string","description":"`connected` is a customer-owned credential pasted into Vex; `managed` is a Vex-provisioned resource where Vex already holds the credential.","enum":["connected","managed"],"x-ref":"#/components/schemas/SignalIntegrationMode","key$":"mode"},"status":{"type":"string","enum":["pending","active","failed","disabled"],"x-ref":"#/components/schemas/SignalIntegrationStatus","key$":"status"},"webhook_secret":{"type":"string","key$":"webhook_secret"},"api_token":{"type":"string","key$":"api_token"},"config":{"type":"object","additionalProperties":true,"key$":"config"}},"additionalProperties":true,"x-ref":"#/components/schemas/SignalIntegrationUpdatePayload"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"signal_integration.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/signal_integrations/{id}/regenerate_inbound_token","signal_integration.update.2":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/signal_integrations/{id}","signal_integration.remove.4":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/signal_integrations/{id}","signal_integration.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const signal_integration_ref01_ent = client.SignalIntegration()
    let signal_integration_ref01_data = setup.data.new.signal_integration['signal_integration_ref01']
    signal_integration_ref01_data['organization_id'] = setup.idmap['organization01']

    signal_integration_ref01_data = (await signal_integration_ref01_ent.create(signal_integration_ref01_data)).data()
    assert(null != signal_integration_ref01_data.id)


    // LIST
    const signal_integration_ref01_match: any = {}
    signal_integration_ref01_match['organization_id'] = setup.idmap['organization01']

    const signal_integration_ref01_list = (await signal_integration_ref01_ent.list(signal_integration_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(signal_integration_ref01_list, { id: signal_integration_ref01_data.id })))


    // UPDATE
    const signal_integration_ref01_data_up0: any = {}
    signal_integration_ref01_data_up0.id = signal_integration_ref01_data.id
    signal_integration_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const signal_integration_ref01_markdef_up0 = { name: 'api_token', value: 'Mark01-signal_integration_ref01_' + setup.now }
    ;(signal_integration_ref01_data_up0 as any)[signal_integration_ref01_markdef_up0.name] = signal_integration_ref01_markdef_up0.value

    const signal_integration_ref01_resdata_up0 = (await signal_integration_ref01_ent.update(signal_integration_ref01_data_up0)).data()
    assert(signal_integration_ref01_resdata_up0.id === signal_integration_ref01_data_up0.id)

    assert((signal_integration_ref01_resdata_up0 as any)[signal_integration_ref01_markdef_up0.name] === signal_integration_ref01_markdef_up0.value)


    // LOAD
    const signal_integration_ref01_match_dt0: any = {}
    signal_integration_ref01_match_dt0.id = signal_integration_ref01_data.id
    signal_integration_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof signal_integration_ref01_data['organization_id']) ?
      signal_integration_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const signal_integration_ref01_data_dt0 = (await signal_integration_ref01_ent.load(signal_integration_ref01_match_dt0)).data()
    assert(signal_integration_ref01_data_dt0.id === signal_integration_ref01_data.id)


    // REMOVE
    const signal_integration_ref01_match_rm0: any = { id: signal_integration_ref01_data.id }
    signal_integration_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await signal_integration_ref01_ent.remove(signal_integration_ref01_match_rm0)
  

    // LIST
    const signal_integration_ref01_match_rt0: any = {}
    signal_integration_ref01_match_rt0['organization_id'] = setup.idmap['organization01']

    const signal_integration_ref01_list_rt0 = (await signal_integration_ref01_ent.list(signal_integration_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(signal_integration_ref01_list_rt0, { id: signal_integration_ref01_data.id })))


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
      '../../../../.sdk/test/entity/signal_integration/SignalIntegrationTestData.json')

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
    ['signal_integration01','signal_integration02','signal_integration03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SIGNAL_INTEGRATION_ENTID']
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
  
