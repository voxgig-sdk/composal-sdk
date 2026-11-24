

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


describe('FindingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Finding()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Finding().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'finding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"confidence":{"a":true,"h":"Confidence","n":"confidence","r":true,"t":"`$STRING`","key$":"confidence","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"deferred_until":{"a":true,"fo":"date-time","h":"Deferred Until","n":"deferred_until","r":false,"sh":"Required future time when status is deferred","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"deferred_until","index$":2},"finding":{"a":true,"h":"Finding","n":"finding","r":true,"t":"`$OBJECT`","key$":"finding","index$":3},"fingerprint":{"a":true,"h":"Fingerprint","n":"fingerprint","r":true,"t":"`$STRING`","key$":"fingerprint","index$":4},"first_seen_at":{"a":true,"fo":"date-time","h":"First Seen At","n":"first_seen_at","r":true,"t":"`$STRING`","key$":"first_seen_at","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"last_seen_at":{"a":true,"fo":"date-time","h":"Last Seen At","n":"last_seen_at","r":true,"t":"`$STRING`","key$":"last_seen_at","index$":7},"locked":{"a":true,"h":"Locked","n":"locked","r":true,"sh":"True when the workspace's included scan reported this finding, it is not one of the free ones, and the workspace has not paid.","t":"`$BOOLEAN`","key$":"locked","index$":8},"occurrence_count":{"a":true,"h":"Occurrence Count","n":"occurrence_count","r":true,"t":"`$INTEGER`","key$":"occurrence_count","index$":9},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":10},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":11},"reason":{"a":true,"h":"Reason","n":"reason","r":false,"sh":"Why the finding was resolved or ignored, such as \"Expected for trial accounts\".","t":"`$STRING`","key$":"reason","index$":12},"reported_occurrence":{"a":true,"h":"Reported Occurrence","n":"reported_occurrence","r":true,"sh":"The Discovery or Deep Scan report behind the finding; null for scenario run findings","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"reported_occurrence","index$":13},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_id","index$":14},"safe_summary":{"a":true,"h":"Safe Summary","n":"safe_summary","r":true,"t":"`$STRING`","key$":"safe_summary","index$":15},"scenario_occurrences":{"a":true,"h":"Scenario Occurrences","n":"scenario_occurrences","r":false,"t":"`$ARRAY`","key$":"scenario_occurrences","index$":16},"severity":{"a":true,"h":"Severity","n":"severity","r":true,"t":"`$STRING`","key$":"severity","index$":17},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":18},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":19},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":20},"verification":{"a":true,"h":"Verification","n":"verification","r":true,"sh":"Whether a model that did not report the finding, and for a P0 or P1 Deep Scan finding an independent rerun, confirmed it.","t":"`$ANY`","key$":"verification","index$":21}},"id":{"field":"id","name":"id"},"name":"finding","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/findings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/findings","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"findings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/findings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"repository_id","or":"repository_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"repository_id","or":"repository_id","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/findings/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"findings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["deferred_until","reason","status"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/verify/findings/{id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":1}],"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"repository_id","or":"repository_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"repository_id","or":"repository_id","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/verify/findings/{id}","q":{"exist":["id","idempotency_key","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"findings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/organizations/{organization_id}/verify/findings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/verify/findings/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"findings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"finding","name__orig":"finding","Name":"Finding","name_":"finding","name-":"finding","NAME":"FINDING","index$":117}, {"active":true,"entity":"finding","key$":"BasicFindingFlow","kind":"basic","name":"BasicFindingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"finding_ref01"}}],"index$":0},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"finding_ref01","srcdatavar":"finding_ref01_data","suffix":"_up0","textfield":"confidence"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-finding_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"finding_ref01","srcdatavar":"finding_ref01_data","suffix":"_dt0"},"m":{"id":"finding01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-finding_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{organization_id}/verify/findings/{id}","record":{"organization_id":"organization_id"}}]}, 'Finding', {"GET /api/v1/organizations/{organization_id}/verify/findings":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"status","in":"query","schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verify/findings/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"repository_id","in":"query","required":false,"schema":{"type":"string"},"index$":2},{"name":"repository_id","in":"query","schema":{"type":"string"},"index$":3}]},"PATCH /api/v1/organizations/{organization_id}/verify/findings/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["status","status"],"properties":{"status":{"type":"string","enum":["open","resolved","ignored"],"x-ref":"#/components/schemas/SettableFindingStatus","key$":"status"},"reason":{"type":"string","maxLength":1000,"description":"Why the finding was resolved or ignored, such as \"Expected for trial accounts\". Dreaming learns from it.","key$":"reason"},"deferred_until":{"type":"string","format":"date-time","description":"Required future time when status is deferred","key$":"deferred_until"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"repository_id","in":"query","required":false,"schema":{"type":"string"},"index$":2},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string"},"index$":3},{"name":"repository_id","in":"query","schema":{"type":"string"},"index$":4},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string"},"index$":5}]},"PUT /api/v1/organizations/{organization_id}/verify/findings/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"finding.update.1":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/findings/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let finding_ref01_data = Object.values(setup.data.existing.finding)[0] as any

    // LIST
    const finding_ref01_ent = client.Finding()
    const finding_ref01_match: any = {}
    finding_ref01_match['organization_id'] = setup.idmap['organization01']

    const finding_ref01_list = (await finding_ref01_ent.list(finding_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const finding_ref01_data_up0: any = {}
    finding_ref01_data_up0.id = finding_ref01_data.id
    finding_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const finding_ref01_markdef_up0 = { name: 'confidence', value: 'Mark01-finding_ref01_' + setup.now }
    ;(finding_ref01_data_up0 as any)[finding_ref01_markdef_up0.name] = finding_ref01_markdef_up0.value

    const finding_ref01_resdata_up0 = (await finding_ref01_ent.update(finding_ref01_data_up0)).data()
    assert(finding_ref01_resdata_up0.id === finding_ref01_data_up0.id)

    assert((finding_ref01_resdata_up0 as any)[finding_ref01_markdef_up0.name] === finding_ref01_markdef_up0.value)


    // LOAD
    const finding_ref01_match_dt0: any = {}
    finding_ref01_match_dt0.id = finding_ref01_data.id
    finding_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof finding_ref01_data['organization_id']) ?
      finding_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const finding_ref01_data_dt0 = (await finding_ref01_ent.load(finding_ref01_match_dt0)).data()
    assert(finding_ref01_data_dt0.id === finding_ref01_data.id)


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
      '../../../../.sdk/test/entity/finding/FindingTestData.json')

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
    ['finding01','finding02','finding03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_FINDING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_FINDING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_FINDING_ENTID']
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
  
