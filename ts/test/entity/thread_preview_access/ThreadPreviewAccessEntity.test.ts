

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


describe('ThreadPreviewAccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ThreadPreviewAccess()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'thread_preview_access.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"thread_preview_access","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["host","token"],"co":{"id":"POST /api/v1/thread_preview_access/redeem","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/thread_preview_access/redeem","q":{"$action":"redeem"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"thread_preview_access"},{"lit":"redeem"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["host"],"co":{"id":"POST /api/v1/thread_preview_access/upstream","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/thread_preview_access/upstream","q":{"$action":"upstream"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"thread_preview_access"},{"lit":"upstream"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/thread_preview_access/start","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"host","or":"host","r":true,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"return_to","or":"return_to","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/thread_preview_access/start","q":{"$action":"start","exist":["host"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"thread_preview_access"},{"lit":"start"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"thread_preview_access","name__orig":"thread_preview_access","Name":"ThreadPreviewAccess","name_":"thread_preview_access","name-":"thread-preview-access","NAME":"THREAD_PREVIEW_ACCESS","index$":522}, {"active":true,"entity":"thread_preview_access","key$":"BasicThreadPreviewAccessFlow","kind":"basic","name":"BasicThreadPreviewAccessFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"thread_preview_access_ref01"},"m":{},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"thread_preview_access_ref01","srcdatavar":"thread_preview_access_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-thread_preview_access_ref01"}}],"unreachable":true}]}, 'ThreadPreviewAccess', {"POST /api/v1/thread_preview_access/redeem":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["host","token"],"properties":{"host":{"type":"string"},"token":{"type":"string"}}}}}},"parameters":[]},"POST /api/v1/thread_preview_access/upstream":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["host"],"properties":{"host":{"type":"string"}}}}}},"parameters":[]},"GET /api/v1/thread_preview_access/start":{"protocol":"http","parameters":[{"name":"host","in":"query","required":true,"schema":{"type":"string"},"description":"Preview hostname, for example p3000-0123abcd0123abcd0123abcd0123abcd-g1.us-was-1.preview.example.com","index$":0},{"name":"return_to","in":"query","required":false,"schema":{"type":"string"},"description":"Relative path to open after sign-in","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"thread_preview_access.create.0":"GET-only live run: needs POST /api/v1/thread_preview_access/redeem"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let thread_preview_access_ref01_data = Object.values(setup.data.existing.thread_preview_access)[0] as any

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
      '../../../../.sdk/test/entity/thread_preview_access/ThreadPreviewAccessTestData.json')

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
    ['thread_preview_access01','thread_preview_access02','thread_preview_access03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_THREAD_PREVIEW_ACCESS_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_THREAD_PREVIEW_ACCESS_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_THREAD_PREVIEW_ACCESS_ENTID']
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
  
