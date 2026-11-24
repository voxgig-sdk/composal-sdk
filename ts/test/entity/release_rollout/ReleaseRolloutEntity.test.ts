

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


describe('ReleaseRolloutEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ReleaseRollout()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ReleaseRollout().list({"release_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'release_rollout.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"release_rollout","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/execution/releases/{release_id}/rollouts/{id}/complete","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"release_id","or":"release_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/execution/releases/{release_id}/rollouts/{id}/complete","q":{"$action":"complete","exist":["id","release_id"]},"r":{"param":{"id":"id","release_id":"release_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"releases"},{"var":"release_id"},{"lit":"rollouts"},{"var":"id"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/execution/releases/{release_id}/rollouts/{id}/fail","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"release_id","or":"release_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/execution/releases/{release_id}/rollouts/{id}/fail","q":{"$action":"fail","exist":["id","release_id"]},"r":{"param":{"id":"id","release_id":"release_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"releases"},{"var":"release_id"},{"lit":"rollouts"},{"var":"id"},{"lit":"fail"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/execution/releases/{release_id}/rollouts/{id}/start","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"release_id","or":"release_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/execution/releases/{release_id}/rollouts/{id}/start","q":{"$action":"start","exist":["id","release_id"]},"r":{"param":{"id":"id","release_id":"release_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"releases"},{"var":"release_id"},{"lit":"rollouts"},{"var":"id"},{"lit":"start"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/execution/releases/{release_id}/rollouts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"release_id","or":"release_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/execution/releases/{release_id}/rollouts","q":{"exist":["release_id"]},"r":{"param":{"release_id":"release_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"releases"},{"var":"release_id"},{"lit":"rollouts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/execution/releases/{release_id}/rollouts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"release_id","or":"release_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/execution/releases/{release_id}/rollouts","q":{"exist":["release_id"]},"r":{"param":{"release_id":"release_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"releases"},{"var":"release_id"},{"lit":"rollouts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/execution/releases/{release_id}/rollouts/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"release_id","or":"release_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/execution/releases/{release_id}/rollouts/{id}","q":{"exist":["id","release_id"]},"r":{"param":{"id":"id","release_id":"release_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"execution"},{"lit":"releases"},{"var":"release_id"},{"lit":"rollouts"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"release_rollout","name__orig":"release_rollout","Name":"ReleaseRollout","name_":"release_rollout","name-":"release-rollout","NAME":"RELEASE_ROLLOUT","index$":418}, {"active":true,"entity":"release_rollout","key$":"BasicReleaseRolloutFlow","kind":"basic","name":"BasicReleaseRolloutFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"release_rollout_ref01"},"m":{"release_id":"release01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"release_id":"release01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"release_rollout_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"release_rollout_ref01","srcdatavar":"release_rollout_ref01_data","suffix":"_dt0"},"m":{"id":"release_rollout01","release_id":"release01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-release_rollout_ref01"}}],"index$":2,"route":"GET /api/v1/execution/releases/{release_id}/rollouts/{id}","record":{}}]}, 'ReleaseRollout', {"POST /api/v1/execution/releases/{release_id}/rollouts/{id}/complete":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"release_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/execution/releases/{release_id}/rollouts/{id}/fail":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"release_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/execution/releases/{release_id}/rollouts/{id}/start":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"release_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/execution/releases/{release_id}/rollouts":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"release_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/execution/releases/{release_id}/rollouts":{"protocol":"http","parameters":[{"name":"release_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/execution/releases/{release_id}/rollouts/{id}":{"protocol":"http","parameters":[{"name":"release_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"release_rollout.create.0":"GET-only live run: needs POST /api/v1/execution/releases/{release_id}/rollouts/{id}/complete"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const release_rollout_ref01_ent = client.ReleaseRollout()
    let release_rollout_ref01_data = setup.data.new.release_rollout['release_rollout_ref01']
    release_rollout_ref01_data['release_id'] = setup.idmap['release01']

    release_rollout_ref01_data = (await release_rollout_ref01_ent.create(release_rollout_ref01_data)).data()
    assert(null != release_rollout_ref01_data.id)


    // LIST
    const release_rollout_ref01_match: any = {}
    release_rollout_ref01_match['release_id'] = setup.idmap['release01']

    const release_rollout_ref01_list = (await release_rollout_ref01_ent.list(release_rollout_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(release_rollout_ref01_list, { id: release_rollout_ref01_data.id })))


    // LOAD
    const release_rollout_ref01_match_dt0: any = {}
    release_rollout_ref01_match_dt0.id = release_rollout_ref01_data.id
    release_rollout_ref01_match_dt0['release_id'] = setup.idmap['release_id'] ?? setup.idmap['release01']
    const release_rollout_ref01_data_dt0 = (await release_rollout_ref01_ent.load(release_rollout_ref01_match_dt0)).data()
    assert(release_rollout_ref01_data_dt0.id === release_rollout_ref01_data.id)


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
      '../../../../.sdk/test/entity/release_rollout/ReleaseRolloutTestData.json')

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
    ['release_rollout01','release_rollout02','release_rollout03','release01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_RELEASE_ROLLOUT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_RELEASE_ROLLOUT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_RELEASE_ROLLOUT_ENTID']
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
  
