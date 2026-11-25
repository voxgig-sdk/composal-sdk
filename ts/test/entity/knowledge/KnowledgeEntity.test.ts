

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


describe('KnowledgeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Knowledge()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Knowledge().load({"id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'knowledge.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"content_digest":{"a":true,"h":"Content Digest","n":"content_digest","r":true,"t":"`$STRING`","key$":"content_digest","index$":0},"content_json":{"a":true,"h":"Content Json","n":"content_json","r":true,"t":"`$OBJECT`","key$":"content_json","index$":1},"document":{"a":true,"h":"Document","n":"document","r":true,"t":"`$OBJECT`","key$":"document","index$":2},"documents":{"a":true,"h":"Documents","n":"documents","r":true,"t":"`$ARRAY`","key$":"documents","index$":3},"dreaming":{"a":true,"h":"Dreaming","n":"dreaming","r":true,"t":"`$OBJECT`","key$":"dreaming","index$":4},"expected_digest":{"a":true,"h":"Expected Digest","n":"expected_digest","r":true,"t":"`$STRING`","key$":"expected_digest","index$":5},"history":{"a":true,"h":"History","n":"history","r":true,"t":"`$ARRAY`","key$":"history","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":8},"markdown":{"a":true,"h":"Markdown","n":"markdown","r":true,"t":"`$STRING`","key$":"markdown","index$":9},"observed_at":{"a":true,"fo":"date-time","h":"Observed At","n":"observed_at","r":true,"t":"`$STRING`","key$":"observed_at","index$":10},"organization":{"a":true,"h":"Organization","n":"organization","r":true,"t":"`$OBJECT`","key$":"organization","index$":11},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":12},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"t":"`$STRING`","key$":"project_id","index$":13},"project_name":{"a":true,"h":"Project Name","n":"project_name","r":true,"t":"`$STRING`","key$":"project_name","index$":14},"projects":{"a":true,"h":"Projects","n":"projects","r":true,"t":"`$ARRAY`","key$":"projects","index$":15},"selected_project_id":{"a":true,"h":"Selected Project Id","n":"selected_project_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"selected_project_id","index$":16},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$OBJECT`","key$":"source","index$":17},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":18},"total":{"a":true,"h":"Total","n":"total","r":true,"t":"`$INTEGER`","key$":"total","index$":19}},"id":{"field":"id","name":"id"},"name":"knowledge","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["markdown","project_id","title"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/knowledge","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/knowledge","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"knowledge"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/knowledge/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/knowledge/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"knowledge"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/knowledge","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/knowledge","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"knowledge"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["expected_digest","markdown","title"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/verify/knowledge/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/verify/knowledge/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"knowledge"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/verify/knowledge/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/verify/knowledge/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"knowledge"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/organizations/{organization_id}/verify/knowledge/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/verify/knowledge/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"knowledge"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"knowledge","name__orig":"knowledge","Name":"Knowledge","name_":"knowledge","name-":"knowledge","NAME":"KNOWLEDGE","index$":287}, {"active":true,"entity":"knowledge","key$":"BasicKnowledgeFlow","kind":"basic","name":"BasicKnowledgeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"knowledge_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"knowledge_ref01","srcdatavar":"knowledge_ref01_data","suffix":"_up0","textfield":"content_digest"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-knowledge_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"knowledge_ref01","srcdatavar":"knowledge_ref01_data","suffix":"_dt0"},"m":{"id":"knowledge01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-knowledge_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"knowledge_ref01","suffix":"_rm0"},"m":{"id":"knowledge01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'Knowledge', {"POST /api/v1/organizations/{organization_id}/verify/knowledge":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["project_id","title","markdown"],"properties":{"project_id":{"type":"string","key$":"project_id"},"title":{"type":"string","maxLength":160,"key$":"title"},"markdown":{"type":"string","maxLength":200000,"key$":"markdown"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/verify/knowledge/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verify/knowledge":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","schema":{"type":"string","maxLength":500},"index$":1},{"name":"project_id","in":"query","schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/organizations/{organization_id}/verify/knowledge/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["title","markdown","expected_digest"],"properties":{"title":{"type":"string","maxLength":160,"key$":"title"},"markdown":{"type":"string","maxLength":200000,"key$":"markdown"},"expected_digest":{"type":"string","key$":"expected_digest"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/organizations/{organization_id}/verify/knowledge/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/organizations/{organization_id}/verify/knowledge/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"knowledge.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/knowledge","knowledge.update.1":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verify/knowledge/{id}","knowledge.load.2":"GET-only live run: reads a record only knowledge.create.0 gives","knowledge.remove.3":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/knowledge/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const knowledge_ref01_ent = client.Knowledge()
    let knowledge_ref01_data = setup.data.new.knowledge['knowledge_ref01']
    knowledge_ref01_data['organization_id'] = setup.idmap['organization01']

    knowledge_ref01_data = (await knowledge_ref01_ent.create(knowledge_ref01_data)).data()
    assert(null != knowledge_ref01_data.id)


    // UPDATE
    const knowledge_ref01_data_up0: any = {}
    knowledge_ref01_data_up0.id = knowledge_ref01_data.id
    knowledge_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const knowledge_ref01_markdef_up0 = { name: 'content_digest', value: 'Mark01-knowledge_ref01_' + setup.now }
    ;(knowledge_ref01_data_up0 as any)[knowledge_ref01_markdef_up0.name] = knowledge_ref01_markdef_up0.value

    const knowledge_ref01_resdata_up0 = (await knowledge_ref01_ent.update(knowledge_ref01_data_up0)).data()
    assert(knowledge_ref01_resdata_up0.id === knowledge_ref01_data_up0.id)

    assert((knowledge_ref01_resdata_up0 as any)[knowledge_ref01_markdef_up0.name] === knowledge_ref01_markdef_up0.value)


    // LOAD
    const knowledge_ref01_match_dt0: any = {}
    knowledge_ref01_match_dt0.id = knowledge_ref01_data.id
    const knowledge_ref01_data_dt0 = (await knowledge_ref01_ent.load(knowledge_ref01_match_dt0)).data()
    assert(knowledge_ref01_data_dt0.id === knowledge_ref01_data.id)


    // REMOVE
    const knowledge_ref01_match_rm0: any = { id: knowledge_ref01_data.id }
    knowledge_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await knowledge_ref01_ent.remove(knowledge_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/knowledge/KnowledgeTestData.json')

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
    ['knowledge01','knowledge02','knowledge03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_KNOWLEDGE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_KNOWLEDGE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_KNOWLEDGE_ENTID']
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
  
