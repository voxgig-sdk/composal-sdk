

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


describe('ArtefactCommentThreadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ArtefactCommentThread()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ArtefactCommentThread().list({"artefact_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'artefact_comment_thread.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"anchor":{"a":true,"h":"Anchor","n":"anchor","r":true,"sh":"The `#anchor` written into the Markdown.","t":"`$STRING`","key$":"anchor","index$":0},"body":{"a":true,"h":"Body","n":"body","r":true,"t":"`$STRING`","key$":"body","index$":1},"comments":{"a":true,"h":"Comments","n":"comments","r":true,"t":"`$ARRAY`","key$":"comments","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The anchor key.","t":"`$STRING`","key$":"id","index$":3},"quote":{"a":true,"h":"Quote","n":"quote","op":{"list":{"req":true,"type":"`$STRING`"},"update":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$STRING`","key$":"quote","index$":4},"resolved":{"a":true,"h":"Resolved","n":"resolved","r":true,"t":"`$BOOLEAN`","key$":"resolved","index$":5}},"id":{"field":"id","name":"id"},"name":"artefact_comment_thread","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["anchor","body","quote"],"co":{"id":"POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"artefact_id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads","q":{"exist":["artefact_id","organization_id"]},"r":{"param":{"artefact_ref":"artefact_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"artefact_id"},{"lit":"comment_threads"}],"t":{"req":"`reqdata`","res":"`body.thread`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"artefact_id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads","q":{"exist":["artefact_id","organization_id"]},"r":{"param":{"artefact_ref":"artefact_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"artefact_id"},{"lit":"comment_threads"}],"t":{"req":"`reqdata`","res":"`body.threads`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["resolved"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"artefact_id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"anchor","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}","q":{"exist":["artefact_id","id","organization_id"]},"r":{"param":{"anchor":"id","artefact_ref":"artefact_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"artefact_id"},{"lit":"comment_threads"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.thread`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.artefact"]]},"key$":"artefact_comment_thread","name__orig":"artefact_comment_thread","Name":"ArtefactCommentThread","name_":"artefact_comment_thread","name-":"artefact-comment-thread","NAME":"ARTEFACT_COMMENT_THREAD","index$":98}, {"active":true,"entity":"artefact_comment_thread","key$":"BasicArtefactCommentThreadFlow","kind":"basic","name":"BasicArtefactCommentThreadFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"artefact_comment_thread_ref01"},"m":{"artefact_id":"artefact01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"artefact_id":"artefact01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"artefact_comment_thread_ref01"}}],"index$":1},{"a":true,"d":{"artefact_id":"artefact01","organization_id":"organization01"},"i":{"ref":"artefact_comment_thread_ref01","srcdatavar":"artefact_comment_thread_ref01_data","suffix":"_up0","textfield":"anchor"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-artefact_comment_thread_ref01"}}],"v":[],"index$":2}]}, 'ArtefactCommentThread', {"POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["anchor","body"],"properties":{"anchor":{"type":"string","pattern":"^[A-Za-z0-9_-]{1,64}$","description":"The `#anchor` written into the Markdown.","key$":"anchor"},"quote":{"type":"string","maxLength":1000,"key$":"quote"},"body":{"type":"string","maxLength":10000,"key$":"body"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["resolved"],"properties":{"resolved":{"type":"boolean","key$":"resolved"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"anchor","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"artefact_comment_thread.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads","artefact_comment_thread.update.2":"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/comment_threads/{anchor}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const artefact_comment_thread_ref01_ent = client.ArtefactCommentThread()
    let artefact_comment_thread_ref01_data = setup.data.new.artefact_comment_thread['artefact_comment_thread_ref01']
    artefact_comment_thread_ref01_data['artefact_id'] = setup.idmap['artefact01']
    artefact_comment_thread_ref01_data['organization_id'] = setup.idmap['organization01']

    artefact_comment_thread_ref01_data = (await artefact_comment_thread_ref01_ent.create(artefact_comment_thread_ref01_data)).data()
    assert(null != artefact_comment_thread_ref01_data.id)


    // LIST
    const artefact_comment_thread_ref01_match: any = {}
    artefact_comment_thread_ref01_match['artefact_id'] = setup.idmap['artefact01']
    artefact_comment_thread_ref01_match['organization_id'] = setup.idmap['organization01']

    const artefact_comment_thread_ref01_list = (await artefact_comment_thread_ref01_ent.list(artefact_comment_thread_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(artefact_comment_thread_ref01_list, { id: artefact_comment_thread_ref01_data.id })))


    // UPDATE
    const artefact_comment_thread_ref01_data_up0: any = {}
    artefact_comment_thread_ref01_data_up0.id = artefact_comment_thread_ref01_data.id
    artefact_comment_thread_ref01_data_up0['artefact_id'] = setup.idmap['artefact_id'] ?? setup.idmap['artefact01']
    artefact_comment_thread_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const artefact_comment_thread_ref01_markdef_up0 = { name: 'anchor', value: 'Mark01-artefact_comment_thread_ref01_' + setup.now }
    ;(artefact_comment_thread_ref01_data_up0 as any)[artefact_comment_thread_ref01_markdef_up0.name] = artefact_comment_thread_ref01_markdef_up0.value

    const artefact_comment_thread_ref01_resdata_up0 = (await artefact_comment_thread_ref01_ent.update(artefact_comment_thread_ref01_data_up0)).data()
    assert(artefact_comment_thread_ref01_resdata_up0.id === artefact_comment_thread_ref01_data_up0.id)

    assert((artefact_comment_thread_ref01_resdata_up0 as any)[artefact_comment_thread_ref01_markdef_up0.name] === artefact_comment_thread_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/artefact_comment_thread/ArtefactCommentThreadTestData.json')

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
    ['artefact_comment_thread01','artefact_comment_thread02','artefact_comment_thread03','organization01','organization02','organization03','artefact01','artefact02','artefact03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ARTEFACT_COMMENT_THREAD_ENTID']
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
  
