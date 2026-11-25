

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


describe('AgentSessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentSession()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"agent_session","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/agent_sessions/{session_id}/transcript","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"session_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"around_event","or":"around_event","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"checkpoint","or":"checkpoint","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"event_digest","or":"event_digest","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"ex":false,"explode":true,"k":"query","n":"include_tool","or":"include_tools","r":false,"style":"form","t":"`$BOOLEAN`","index$":4},{"a":true,"ex":50,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":5},{"a":true,"ex":32768,"explode":true,"k":"query","n":"max_byte","or":"max_bytes","r":false,"style":"form","t":"`$INTEGER`","index$":6},{"a":true,"explode":true,"k":"query","n":"source_ref","or":"source_ref","r":false,"style":"form","t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/api/v1/agent_sessions/{session_id}/transcript","q":{"$action":"transcript","exist":["id"]},"r":{"param":{"session_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent_sessions"},{"var":"id"},{"lit":"transcript"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_session","name__orig":"agent_session","Name":"AgentSession","name_":"agent_session","name-":"agent-session","NAME":"AGENT_SESSION","index$":44}, {"active":true,"entity":"agent_session","key$":"BasicAgentSessionFlow","kind":"basic","name":"BasicAgentSessionFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"agent_session_ref01","srcdatavar":"agent_session_ref01_data","suffix":"_dt0"},"m":{"id":"agent_session01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_session_ref01"}}],"unreachable":true}]}, 'AgentSession', {"GET /api/v1/agent_sessions/{session_id}/transcript":{"protocol":"http","parameters":[{"name":"session_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"in":"query","name":"checkpoint","schema":{"type":"string"},"index$":1},{"in":"query","name":"source_ref","description":"Opaque source reference returned by discovery, required on the source route unless continuing with a cursor.","schema":{"type":"string"},"x-ref":"#/components/parameters/TranscriptReadSource","index$":2},{"in":"query","name":"cursor","schema":{"type":"string"},"x-ref":"#/components/parameters/TranscriptReadCursor","index$":3},{"in":"query","name":"limit","schema":{"type":"integer","minimum":1,"maximum":200,"default":50},"x-ref":"#/components/parameters/TranscriptReadLimit","index$":4},{"in":"query","name":"max_bytes","schema":{"type":"integer","minimum":8192,"maximum":131072,"default":32768},"x-ref":"#/components/parameters/TranscriptReadBytes","index$":5},{"in":"query","name":"include_tools","schema":{"type":"boolean","default":false},"x-ref":"#/components/parameters/TranscriptReadTools","index$":6},{"in":"query","name":"around_event","schema":{"type":"integer","minimum":0},"description":"Cited event index, paired with event_digest and without cursor.","x-ref":"#/components/parameters/TranscriptReadAround","index$":7},{"in":"query","name":"event_digest","schema":{"type":"string","pattern":"^[0-9a-f]{64}$"},"x-ref":"#/components/parameters/TranscriptReadDigest","index$":8}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_session_ref01_data = Object.values(setup.data.existing.agent_session)[0] as any

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
      '../../../../.sdk/test/entity/agent_session/AgentSessionTestData.json')

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
    ['agent_session01','agent_session02','agent_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_SESSION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_SESSION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_SESSION_ENTID']
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
  
