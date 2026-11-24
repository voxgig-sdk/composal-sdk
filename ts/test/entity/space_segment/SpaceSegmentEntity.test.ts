

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


describe('SpaceSegmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SpaceSegment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SpaceSegment().list({"space_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'space_segment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"space_segment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/networking/spaces/{space_id}/segments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/networking/spaces/{space_id}/segments","q":{"exist":["space_id"]},"r":{"param":{"space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"space_id"},{"lit":"segments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/networking/spaces/{space_id}/segments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/networking/spaces/{space_id}/segments","q":{"exist":["space_id"]},"r":{"param":{"space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"space_id"},{"lit":"segments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/networking/spaces/{space_id}/segments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/networking/spaces/{space_id}/segments/{id}","q":{"exist":["id","space_id"]},"r":{"param":{"id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"space_id"},{"lit":"segments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/networking/spaces/{space_id}/segments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/networking/spaces/{space_id}/segments/{id}","q":{"exist":["id","space_id"]},"r":{"param":{"id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"space_id"},{"lit":"segments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/networking/spaces/{space_id}/segments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/networking/spaces/{space_id}/segments/{id}","q":{"exist":["id","space_id"]},"r":{"param":{"id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"space_id"},{"lit":"segments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/networking/spaces/{space_id}/segments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/networking/spaces/{space_id}/segments/{id}","q":{"exist":["id","space_id"]},"r":{"param":{"id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"space_id"},{"lit":"segments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"space_segment","name__orig":"space_segment","Name":"SpaceSegment","name_":"space_segment","name-":"space-segment","NAME":"SPACE_SEGMENT","index$":496}, {"active":true,"entity":"space_segment","key$":"BasicSpaceSegmentFlow","kind":"basic","name":"BasicSpaceSegmentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"space_segment_ref01"},"m":{"space_id":"space01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"space_id":"space01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"space_segment_ref01"}}],"index$":1},{"a":true,"d":{"space_id":"space01"},"i":{"ref":"space_segment_ref01","srcdatavar":"space_segment_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-space_segment_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"space_segment_ref01","srcdatavar":"space_segment_ref01_data","suffix":"_dt0"},"m":{"id":"space_segment01","space_id":"space01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-space_segment_ref01"}}],"index$":3,"route":"GET /api/v1/networking/spaces/{space_id}/segments/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"space_segment_ref01","suffix":"_rm0"},"m":{"id":"space_segment01","space_id":"space01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"space_id":"space01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"space_segment_ref01"}}],"index$":5}]}, 'SpaceSegment', {"POST /api/v1/networking/spaces/{space_id}/segments":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/networking/spaces/{space_id}/segments":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/networking/spaces/{space_id}/segments/{id}":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/networking/spaces/{space_id}/segments/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/networking/spaces/{space_id}/segments/{id}":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/networking/spaces/{space_id}/segments/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"space_segment.create.0":"GET-only live run: needs POST /api/v1/networking/spaces/{space_id}/segments","space_segment.update.2":"GET-only live run: needs PUT /api/v1/networking/spaces/{space_id}/segments/{id}","space_segment.remove.4":"GET-only live run: needs DELETE /api/v1/networking/spaces/{space_id}/segments/{id}","space_segment.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const space_segment_ref01_ent = client.SpaceSegment()
    let space_segment_ref01_data = setup.data.new.space_segment['space_segment_ref01']
    space_segment_ref01_data['space_id'] = setup.idmap['space01']

    space_segment_ref01_data = (await space_segment_ref01_ent.create(space_segment_ref01_data)).data()
    assert(null != space_segment_ref01_data.id)


    // LIST
    const space_segment_ref01_match: any = {}
    space_segment_ref01_match['space_id'] = setup.idmap['space01']

    const space_segment_ref01_list = (await space_segment_ref01_ent.list(space_segment_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(space_segment_ref01_list, { id: space_segment_ref01_data.id })))


    // UPDATE
    const space_segment_ref01_data_up0: any = {}
    space_segment_ref01_data_up0.id = space_segment_ref01_data.id
    space_segment_ref01_data_up0['space_id'] = setup.idmap['space_id'] ?? setup.idmap['space01']

    const space_segment_ref01_resdata_up0 = (await space_segment_ref01_ent.update(space_segment_ref01_data_up0)).data()
    assert(space_segment_ref01_resdata_up0.id === space_segment_ref01_data_up0.id)


    // LOAD
    const space_segment_ref01_match_dt0: any = {}
    space_segment_ref01_match_dt0.id = space_segment_ref01_data.id
    space_segment_ref01_match_dt0['space_id'] = setup.idmap['space_id'] ?? setup.idmap['space01']
    const space_segment_ref01_data_dt0 = (await space_segment_ref01_ent.load(space_segment_ref01_match_dt0)).data()
    assert(space_segment_ref01_data_dt0.id === space_segment_ref01_data.id)


    // REMOVE
    const space_segment_ref01_match_rm0: any = { id: space_segment_ref01_data.id }
    space_segment_ref01_match_rm0['space_id'] = setup.idmap['space_id'] ?? setup.idmap['space01']
    await space_segment_ref01_ent.remove(space_segment_ref01_match_rm0)
  

    // LIST
    const space_segment_ref01_match_rt0: any = {}
    space_segment_ref01_match_rt0['space_id'] = setup.idmap['space01']

    const space_segment_ref01_list_rt0 = (await space_segment_ref01_ent.list(space_segment_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(space_segment_ref01_list_rt0, { id: space_segment_ref01_data.id })))


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
      '../../../../.sdk/test/entity/space_segment/SpaceSegmentTestData.json')

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
    ['space_segment01','space_segment02','space_segment03','space01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SPACE_SEGMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SPACE_SEGMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SPACE_SEGMENT_ENTID']
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
  
