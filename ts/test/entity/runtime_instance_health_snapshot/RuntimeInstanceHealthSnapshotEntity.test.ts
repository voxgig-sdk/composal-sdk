

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


describe('RuntimeInstanceHealthSnapshotEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RuntimeInstanceHealthSnapshot()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RuntimeInstanceHealthSnapshot().list({"runtime_instance_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'runtime_instance_health_snapshot.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"runtime_instance_health_snapshot","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"runtime_instance_id","or":"runtime_instance_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots","q":{"exist":["runtime_instance_id"]},"r":{"param":{"runtime_instance_id":"runtime_instance_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"runtime_instances"},{"var":"runtime_instance_id"},{"lit":"health_snapshots"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"runtime_instance_id","or":"runtime_instance_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots","q":{"exist":["runtime_instance_id"]},"r":{"param":{"runtime_instance_id":"runtime_instance_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"runtime_instances"},{"var":"runtime_instance_id"},{"lit":"health_snapshots"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"runtime_instance_health_snapshot","name__orig":"runtime_instance_health_snapshot","Name":"RuntimeInstanceHealthSnapshot","name_":"runtime_instance_health_snapshot","name-":"runtime-instance-health-snapshot","NAME":"RUNTIME_INSTANCE_HEALTH_SNAPSHOT","index$":457}, {"active":true,"entity":"runtime_instance_health_snapshot","key$":"BasicRuntimeInstanceHealthSnapshotFlow","kind":"basic","name":"BasicRuntimeInstanceHealthSnapshotFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"runtime_instance_health_snapshot_ref01"},"m":{"runtime_instance_id":"runtime_instance01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"runtime_instance_id":"runtime_instance01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"runtime_instance_health_snapshot_ref01"}}],"index$":1}]}, 'RuntimeInstanceHealthSnapshot', {"POST /api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"runtime_instance_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots":{"protocol":"http","parameters":[{"name":"runtime_instance_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"runtime_instance_health_snapshot.create.0":"GET-only live run: needs POST /api/v1/execution/runtime_instances/{runtime_instance_id}/health_snapshots"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const runtime_instance_health_snapshot_ref01_ent = client.RuntimeInstanceHealthSnapshot()
    let runtime_instance_health_snapshot_ref01_data = setup.data.new.runtime_instance_health_snapshot['runtime_instance_health_snapshot_ref01']
    runtime_instance_health_snapshot_ref01_data['runtime_instance_id'] = setup.idmap['runtime_instance01']

    runtime_instance_health_snapshot_ref01_data = (await runtime_instance_health_snapshot_ref01_ent.create(runtime_instance_health_snapshot_ref01_data)).data()
    assert(null != runtime_instance_health_snapshot_ref01_data)


    // LIST
    const runtime_instance_health_snapshot_ref01_match: any = {}
    runtime_instance_health_snapshot_ref01_match['runtime_instance_id'] = setup.idmap['runtime_instance01']

    const runtime_instance_health_snapshot_ref01_list = (await runtime_instance_health_snapshot_ref01_ent.list(runtime_instance_health_snapshot_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/runtime_instance_health_snapshot/RuntimeInstanceHealthSnapshotTestData.json')

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
    ['runtime_instance_health_snapshot01','runtime_instance_health_snapshot02','runtime_instance_health_snapshot03','runtime_instance01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_RUNTIME_INSTANCE_HEALTH_SNAPSHOT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_RUNTIME_INSTANCE_HEALTH_SNAPSHOT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_RUNTIME_INSTANCE_HEALTH_SNAPSHOT_ENTID']
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
  
