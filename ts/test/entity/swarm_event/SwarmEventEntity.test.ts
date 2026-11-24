

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


describe('SwarmEventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SwarmEvent()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SwarmEvent().list({"swarm_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'swarm_event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_swarm_id":{"a":true,"h":"Agent Swarm Id","n":"agent_swarm_id","r":true,"t":"`$STRING`","key$":"agent_swarm_id","index$":0},"attempt_id":{"a":true,"h":"Attempt Id","n":"attempt_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"attempt_id","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":2},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":4},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":5},"payload":{"a":true,"h":"Payload","n":"payload","r":true,"t":"`$OBJECT`","key$":"payload","index$":6},"reason":{"a":true,"h":"Reason","n":"reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"reason","index$":7},"scheduler_generation":{"a":true,"h":"Scheduler Generation","n":"scheduler_generation","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"scheduler_generation","index$":8},"task_id":{"a":true,"h":"Task Id","n":"task_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"task_id","index$":9}},"id":{"field":"id","name":"id"},"name":"swarm_event","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/agent/swarms/{swarm_id}/events","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"swarm_id","or":"swarm_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"after","or":"after","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"kind","or":"kind","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/agent/swarms/{swarm_id}/events","q":{"exist":["swarm_id"]},"r":{"param":{"swarm_id":"swarm_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"swarm_id"},{"lit":"events"}],"t":{"req":"`reqdata`","res":"`body.events`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"swarm_event","name__orig":"swarm_event","Name":"SwarmEvent","name_":"swarm_event","name-":"swarm-event","NAME":"SWARM_EVENT","index$":516}, {"active":true,"entity":"swarm_event","key$":"BasicSwarmEventFlow","kind":"basic","name":"BasicSwarmEventFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"swarm_id":"swarm01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"swarm_event_ref01"}}],"index$":0}]}, 'SwarmEvent', {"GET /api/v1/agent/swarms/{swarm_id}/events":{"protocol":"http","parameters":[{"name":"swarm_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"after","in":"query","required":false,"schema":{"type":"integer"},"index$":1},{"name":"kind","in":"query","required":false,"schema":{"type":"string"},"index$":2},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":1000},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let swarm_event_ref01_data = Object.values(setup.data.existing.swarm_event)[0] as any

    // LIST
    const swarm_event_ref01_ent = client.SwarmEvent()
    const swarm_event_ref01_match: any = {}
    swarm_event_ref01_match['swarm_id'] = setup.idmap['swarm01']

    const swarm_event_ref01_list = (await swarm_event_ref01_ent.list(swarm_event_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/swarm_event/SwarmEventTestData.json')

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
    ['swarm_event01','swarm_event02','swarm_event03','swarm01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SWARM_EVENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SWARM_EVENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SWARM_EVENT_ENTID']
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
  
