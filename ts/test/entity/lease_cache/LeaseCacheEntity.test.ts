

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


describe('LeaseCacheEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.LeaseCache()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lease_cache.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"lease_cache","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/cache/restore","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"lease_id","or":"lease_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"node_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/leases/{lease_id}/cache/restore","q":{"$action":"restore","exist":["lease_id","node_id"]},"r":{"param":{"id":"node_id","lease_id":"lease_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"node_id"},{"lit":"leases"},{"var":"lease_id"},{"lit":"cache"},{"lit":"restore"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/cache/save","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"lease_id","or":"lease_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"node_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/leases/{lease_id}/cache/save","q":{"$action":"save","exist":["lease_id","node_id"]},"r":{"param":{"id":"node_id","lease_id":"lease_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"node_id"},{"lit":"leases"},{"var":"lease_id"},{"lit":"cache"},{"lit":"save"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.node"]]},"key$":"lease_cache","name__orig":"lease_cache","Name":"LeaseCache","name_":"lease_cache","name-":"lease-cache","NAME":"LEASE_CACHE","index$":290}, {"active":true,"entity":"lease_cache","key$":"BasicLeaseCacheFlow","kind":"basic","name":"BasicLeaseCacheFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"lease_cache_ref01"},"m":{"lease_id":"lease01","node_id":"node01"},"o":"create","s":[],"v":[],"unreachable":true}]}, 'LeaseCache', {"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/cache/restore":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"lease_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/cache/save":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"lease_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"lease_cache.create.0":"GET-only live run: needs POST /api/v1/ci/nodes/{id}/leases/{lease_id}/cache/restore"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let lease_cache_ref01_data = Object.values(setup.data.existing.lease_cache)[0] as any

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
      '../../../../.sdk/test/entity/lease_cache/LeaseCacheTestData.json')

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
    ['lease_cache01','lease_cache02','lease_cache03','node01','node02','node03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_LEASE_CACHE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_LEASE_CACHE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_LEASE_CACHE_ENTID']
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
  
