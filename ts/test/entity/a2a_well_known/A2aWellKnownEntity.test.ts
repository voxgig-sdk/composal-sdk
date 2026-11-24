

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


describe('A2aWellKnownEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.A2aWellKnown()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'a2a_well_known.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"a2a_well_known","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/control/a2a/{connection_id}/.well-known/agent-card.json","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"a2a_id","or":"connection_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"a2a_id","or":"connection_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/control/a2a/{connection_id}/.well-known/agent-card.json","q":{"$action":"agent_card_json","exist":["a2a_id"]},"r":{"param":{"connection_id":"a2a_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"control"},{"lit":"a2a"},{"var":"a2a_id"},{"lit":".well-known"},{"lit":"agent-card.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"a2a_well_known","name__orig":"a2a_well_known","Name":"A2aWellKnown","name_":"a2a_well_known","name-":"a2a-well-known","NAME":"A2A_WELL_KNOWN","index$":0}, {"active":true,"entity":"a2a_well_known","key$":"BasicA2aWellKnownFlow","kind":"basic","name":"BasicA2aWellKnownFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"a2a_well_known_ref01","srcdatavar":"a2a_well_known_ref01_data","suffix":"_dt0"},"m":{"id":"a2a_well_known01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-a2a_well_known_ref01"}}],"unreachable":true}]}, 'A2aWellKnown', {"GET /api/v1/control/a2a/{connection_id}/.well-known/agent-card.json":{"protocol":"http","parameters":[{"name":"connection_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"connection_id","in":"path","required":true,"schema":{"type":"string","pattern":"^agent_relay_a2a_connection_[A-Za-z0-9_-]{1,160}$"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let a2a_well_known_ref01_data = Object.values(setup.data.existing.a2a_well_known)[0] as any

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
      '../../../../.sdk/test/entity/a2a_well_known/A2aWellKnownTestData.json')

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
    ['a2a_well_known01','a2a_well_known02','a2a_well_known03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_A2A_WELL_KNOWN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_A2A_WELL_KNOWN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_A2A_WELL_KNOWN_ENTID']
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
  
