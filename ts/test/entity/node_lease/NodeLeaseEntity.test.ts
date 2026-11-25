

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


describe('NodeLeaseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.NodeLease()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.NodeLease().load({"node_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'node_lease.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"node_lease","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/claim","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"lease_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"node_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/leases/{lease_id}/claim","q":{"$action":"claim","exist":["id","node_id"]},"r":{"param":{"id":"node_id","lease_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"node_id"},{"lit":"leases"},{"var":"id"},{"lit":"claim"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/heartbeat","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"lease_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"node_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/leases/{lease_id}/heartbeat","q":{"$action":"heartbeat","exist":["id","node_id"]},"r":{"param":{"id":"node_id","lease_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"node_id"},{"lit":"leases"},{"var":"id"},{"lit":"heartbeat"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/release","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"lease_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"node_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ci/nodes/{id}/leases/{lease_id}/release","q":{"$action":"release","exist":["id","node_id"]},"r":{"param":{"id":"node_id","lease_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"node_id"},{"lit":"leases"},{"var":"id"},{"lit":"release"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/ci/nodes/{id}/leases/{lease_id}/job","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"lease_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"node_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/ci/nodes/{id}/leases/{lease_id}/job","q":{"$action":"job","exist":["id","node_id"]},"r":{"param":{"id":"node_id","lease_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"node_id"},{"lit":"leases"},{"var":"id"},{"lit":"job"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/ci/nodes/{id}/leases/{lease_id}/workspace_archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"lease_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"node_id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/ci/nodes/{id}/leases/{lease_id}/workspace_archive","q":{"$action":"workspace_archive","exist":["id","node_id"]},"r":{"param":{"id":"node_id","lease_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"node_id"},{"lit":"leases"},{"var":"id"},{"lit":"workspace_archive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/ci/nodes/{id}/leases","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"node_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/ci/nodes/{id}/leases","q":{"exist":["node_id"]},"r":{"param":{"id":"node_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ci"},{"lit":"nodes"},{"var":"node_id"},{"lit":"leases"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.node"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"node_lease","name__orig":"node_lease","Name":"NodeLease","name_":"node_lease","name-":"node-lease","NAME":"NODE_LEASE","index$":325}, {"active":true,"entity":"node_lease","key$":"BasicNodeLeaseFlow","kind":"basic","name":"BasicNodeLeaseFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"node_lease_ref01"},"m":{"lease_id":"lease01","node_id":"node01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"node_lease_ref01","srcdatavar":"node_lease_ref01_data","suffix":"_dt0"},"m":{"id":"node_lease01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-node_lease_ref01"}}],"unreachable":true}]}, 'NodeLease', {"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/claim":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"lease_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/heartbeat":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"lease_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/ci/nodes/{id}/leases/{lease_id}/release":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"lease_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/ci/nodes/{id}/leases/{lease_id}/job":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"lease_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/ci/nodes/{id}/leases/{lease_id}/workspace_archive":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"lease_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/ci/nodes/{id}/leases":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"node_lease.create.0":"GET-only live run: needs POST /api/v1/ci/nodes/{id}/leases/{lease_id}/claim","node_lease.load.1":"GET-only live run: reads a record only node_lease.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let node_lease_ref01_data = Object.values(setup.data.existing.node_lease)[0] as any

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
      '../../../../.sdk/test/entity/node_lease/NodeLeaseTestData.json')

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
    ['node_lease01','node_lease02','node_lease03','node01','node02','node03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_NODE_LEASE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_NODE_LEASE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_NODE_LEASE_ENTID']
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
  
