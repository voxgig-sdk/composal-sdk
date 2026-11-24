

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


describe('ProductMapJourneyReplayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProductMapJourneyReplay()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProductMapJourneyReplay().load({"id":1,"organization_id":"x","project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'product_map_journey_replay.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actor_id":{"a":true,"h":"Actor Id","n":"actor_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"actor_id","index$":0},"can_request_qualification":{"a":true,"h":"Can Request Qualification","n":"can_request_qualification","r":true,"t":"`$BOOLEAN`","key$":"can_request_qualification","index$":1},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":2},"failure_code":{"a":true,"h":"Failure Code","n":"failure_code","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_code","index$":3},"failure_message":{"a":true,"h":"Failure Message","n":"failure_message","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_message","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"preparation_receipt":{"a":true,"h":"Preparation Receipt","n":"preparation_receipt","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"preparation_receipt","index$":6},"qualification":{"a":true,"h":"Qualification","n":"qualification","r":true,"t":"`$ANY`","key$":"qualification","index$":7},"qualification_status":{"a":true,"h":"Qualification Status","n":"qualification_status","r":true,"t":"`$STRING`","key$":"qualification_status","index$":8},"replay_required":{"a":true,"h":"Replay Required","n":"replay_required","r":true,"t":"`$BOOLEAN`","key$":"replay_required","index$":9},"review_reason":{"a":true,"h":"Review Reason","n":"review_reason","r":true,"t":"`$STRING`","key$":"review_reason","index$":10},"run_id":{"a":true,"h":"Run Id","n":"run_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"run_id","index$":11},"scenario_run_id":{"a":true,"h":"Scenario Run Id","n":"scenario_run_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"scenario_run_id","index$":12},"source_digest":{"a":true,"h":"Source Digest","n":"source_digest","r":true,"t":"`$STRING`","key$":"source_digest","index$":13},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":14},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":15},"variant_id":{"a":true,"h":"Variant Id","n":"variant_id","r":true,"t":"`$STRING`","key$":"variant_id","index$":16}},"id":{"field":"id","name":"id"},"name":"product_map_journey_replay","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"replay_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification","q":{"$action":"qualification","exist":["id","organization_id","project_id"]},"r":{"param":{"project_id":"project_id","replay_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"product_map"},{"lit":"journey_replays"},{"var":"id"},{"lit":"qualification"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"replay_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"project_id":"project_id","replay_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"product_map"},{"lit":"journey_replays"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"product_map_journey_replay","name__orig":"product_map_journey_replay","Name":"ProductMapJourneyReplay","name_":"product_map_journey_replay","name-":"product-map-journey-replay","NAME":"PRODUCT_MAP_JOURNEY_REPLAY","index$":157}, {"active":true,"entity":"product_map_journey_replay","key$":"BasicProductMapJourneyReplayFlow","kind":"basic","name":"BasicProductMapJourneyReplayFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"product_map_journey_replay_ref01"},"m":{"organization_id":"organization01","project_id":"project01","replay_id":"replay01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"product_map_journey_replay_ref01","srcdatavar":"product_map_journey_replay_ref01_data","suffix":"_dt0"},"m":{"id":"product_map_journey_replay01","organization_id":"organization01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-product_map_journey_replay_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}","record":{}}]}, 'ProductMapJourneyReplay', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"replay_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"replay_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"product_map_journey_replay.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journey_replays/{replay_id}/qualification","product_map_journey_replay.load.1":"GET-only live run: reads a record only product_map_journey_replay.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let product_map_journey_replay_ref01_data = Object.values(setup.data.existing.product_map_journey_replay)[0] as any

    // LOAD
    const product_map_journey_replay_ref01_ent = client.ProductMapJourneyReplay()
    const product_map_journey_replay_ref01_match_dt0: any = {}
    product_map_journey_replay_ref01_match_dt0.id = product_map_journey_replay_ref01_data.id
    product_map_journey_replay_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    product_map_journey_replay_ref01_match_dt0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    const product_map_journey_replay_ref01_data_dt0 = (await product_map_journey_replay_ref01_ent.load(product_map_journey_replay_ref01_match_dt0)).data()
    assert(product_map_journey_replay_ref01_data_dt0.id === product_map_journey_replay_ref01_data.id)


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
      '../../../../.sdk/test/entity/product_map_journey_replay/ProductMapJourneyReplayTestData.json')

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
    ['product_map_journey_replay01','product_map_journey_replay02','product_map_journey_replay03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_REPLAY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_REPLAY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_REPLAY_ENTID']
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
  
