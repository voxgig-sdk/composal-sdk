

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


describe('BazelBlobEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BazelBlob()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BazelBlob().load({"blob_id":1,"hash":"x","id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bazel_blob.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id","parts":["blob_id","hash","id"],"sep":"/"},"name":"bazel_blob","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"blob_id","or":"kind","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"hash","or":"hash","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"size_bytes","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}","q":{"exist":["blob_id","hash","id"]},"r":{"param":{"hash":"hash","kind":"blob_id","size_bytes":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"bazel"},{"lit":"blobs"},{"var":"blob_id"},{"var":"hash"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"blob_id","or":"kind","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"hash","or":"hash","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"size_bytes","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}","q":{"exist":["blob_id","hash","id"]},"r":{"param":{"hash":"hash","kind":"blob_id","size_bytes":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"bazel"},{"lit":"blobs"},{"var":"blob_id"},{"var":"hash"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"bazel_blob","name__orig":"bazel_blob","Name":"BazelBlob","name_":"bazel_blob","name-":"bazel-blob","NAME":"BAZEL_BLOB","index$":121}, {"active":true,"entity":"bazel_blob","key$":"BasicBazelBlobFlow","kind":"basic","name":"BasicBazelBlobFlow","param":{},"step":[{"a":true,"d":{"blob_id":"blob01","hash":"hash01"},"i":{"ref":"bazel_blob_ref01","srcdatavar":"bazel_blob_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bazel_blob_ref01"}}],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"bazel_blob_ref01","srcdatavar":"bazel_blob_ref01_data","suffix":"_dt0"},"m":{"blob_id":"blob01","hash":"hash01","id":"bazel_blob01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bazel_blob_ref01"}}],"index$":1,"route":"GET /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}","record":{}}]}, 'BazelBlob', {"GET /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}":{"protocol":"http","parameters":[{"name":"kind","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"hash","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"size_bytes","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"kind","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"hash","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"size_bytes","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"bazel_blob.update.0":"GET-only live run: needs PUT /api/v1/bazel/blobs/{kind}/{hash}/{size_bytes}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bazel_blob_ref01_data = Object.values(setup.data.existing.bazel_blob)[0] as any

    // UPDATE
    const bazel_blob_ref01_ent = client.BazelBlob()
    const bazel_blob_ref01_data_up0: any = {}
    bazel_blob_ref01_data_up0.id = bazel_blob_ref01_data.id
    bazel_blob_ref01_data_up0['blob_id'] = setup.idmap['blob_id'] ?? setup.idmap['blob01']
    bazel_blob_ref01_data_up0['hash'] = setup.idmap['hash'] ?? setup.idmap['hash01']

    const bazel_blob_ref01_resdata_up0 = (await bazel_blob_ref01_ent.update(bazel_blob_ref01_data_up0)).data()
    assert(bazel_blob_ref01_resdata_up0.id === bazel_blob_ref01_data_up0.id)


    // LOAD
    const bazel_blob_ref01_match_dt0: any = {}
    bazel_blob_ref01_match_dt0.id = bazel_blob_ref01_data.id
    bazel_blob_ref01_match_dt0['blob_id'] = setup.idmap['blob_id'] ?? setup.idmap['blob01']
    bazel_blob_ref01_match_dt0['hash'] = setup.idmap['hash'] ?? setup.idmap['hash01']
    const bazel_blob_ref01_data_dt0 = (await bazel_blob_ref01_ent.load(bazel_blob_ref01_match_dt0)).data()
    assert(bazel_blob_ref01_data_dt0.id === bazel_blob_ref01_data.id)


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
      '../../../../.sdk/test/entity/bazel_blob/BazelBlobTestData.json')

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
    ['bazel_blob01','bazel_blob02','bazel_blob03','blob01','hash01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BAZEL_BLOB_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BAZEL_BLOB_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BAZEL_BLOB_ENTID']
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
  
