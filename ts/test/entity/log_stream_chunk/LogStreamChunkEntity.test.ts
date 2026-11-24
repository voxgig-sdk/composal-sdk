

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


describe('LogStreamChunkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.LogStreamChunk()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LogStreamChunk().list({"log_stream_id":1,"space_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'log_stream_chunk.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"log_stream_chunk","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"log_stream_id","or":"log_stream_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks","q":{"exist":["log_stream_id","space_id"]},"r":{"param":{"log_stream_id":"log_stream_id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"log_streams"},{"var":"log_stream_id"},{"lit":"chunks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"log_stream_id","or":"log_stream_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks","q":{"exist":["log_stream_id","space_id"]},"r":{"param":{"log_stream_id":"log_stream_id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"log_streams"},{"var":"log_stream_id"},{"lit":"chunks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"log_stream_id","or":"log_stream_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks/{id}","q":{"exist":["id","log_stream_id","space_id"]},"r":{"param":{"id":"id","log_stream_id":"log_stream_id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"log_streams"},{"var":"log_stream_id"},{"lit":"chunks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"log_stream_chunk","name__orig":"log_stream_chunk","Name":"LogStreamChunk","name_":"log_stream_chunk","name-":"log-stream-chunk","NAME":"LOG_STREAM_CHUNK","index$":306}, {"active":true,"entity":"log_stream_chunk","key$":"BasicLogStreamChunkFlow","kind":"basic","name":"BasicLogStreamChunkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"log_stream_chunk_ref01"},"m":{"log_stream_id":"log_stream01","space_id":"space01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"log_stream_id":"log_stream01","space_id":"space01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"log_stream_chunk_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"log_stream_chunk_ref01","srcdatavar":"log_stream_chunk_ref01_data","suffix":"_dt0"},"m":{"id":"log_stream_chunk01","log_stream_id":"log_stream01","space_id":"space01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-log_stream_chunk_ref01"}}],"index$":2,"route":"GET /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks/{id}","record":{}}]}, 'LogStreamChunk', {"POST /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"log_stream_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"log_stream_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks/{id}":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"log_stream_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"log_stream_chunk.create.0":"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/log_streams/{log_stream_id}/chunks"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const log_stream_chunk_ref01_ent = client.LogStreamChunk()
    let log_stream_chunk_ref01_data = setup.data.new.log_stream_chunk['log_stream_chunk_ref01']
    log_stream_chunk_ref01_data['log_stream_id'] = setup.idmap['log_stream01']
    log_stream_chunk_ref01_data['space_id'] = setup.idmap['space01']

    log_stream_chunk_ref01_data = (await log_stream_chunk_ref01_ent.create(log_stream_chunk_ref01_data)).data()
    assert(null != log_stream_chunk_ref01_data.id)


    // LIST
    const log_stream_chunk_ref01_match: any = {}
    log_stream_chunk_ref01_match['log_stream_id'] = setup.idmap['log_stream01']
    log_stream_chunk_ref01_match['space_id'] = setup.idmap['space01']

    const log_stream_chunk_ref01_list = (await log_stream_chunk_ref01_ent.list(log_stream_chunk_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(log_stream_chunk_ref01_list, { id: log_stream_chunk_ref01_data.id })))


    // LOAD
    const log_stream_chunk_ref01_match_dt0: any = {}
    log_stream_chunk_ref01_match_dt0.id = log_stream_chunk_ref01_data.id
    log_stream_chunk_ref01_match_dt0['log_stream_id'] = setup.idmap['log_stream_id'] ?? setup.idmap['log_stream01']
    log_stream_chunk_ref01_match_dt0['space_id'] = setup.idmap['space_id'] ?? setup.idmap['space01']
    const log_stream_chunk_ref01_data_dt0 = (await log_stream_chunk_ref01_ent.load(log_stream_chunk_ref01_match_dt0)).data()
    assert(log_stream_chunk_ref01_data_dt0.id === log_stream_chunk_ref01_data.id)


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
      '../../../../.sdk/test/entity/log_stream_chunk/LogStreamChunkTestData.json')

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
    ['log_stream_chunk01','log_stream_chunk02','log_stream_chunk03','log_stream01','space01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_LOG_STREAM_CHUNK_ENTID']
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
  
