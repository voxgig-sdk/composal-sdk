

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


describe('SwarmNoteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SwarmNote()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SwarmNote().create({"swarm_id":1,"text":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'swarm_note.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"task_id":{"a":true,"h":"Task Id","n":"task_id","r":false,"sh":"A task public id; omitted","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"task_id","index$":0},"text":{"a":true,"h":"Text","n":"text","r":true,"t":"`$STRING`","key$":"text","index$":1}},"name":"swarm_note","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["task_id","text"],"co":{"id":"POST /api/v1/agent/swarms/{swarm_id}/notes","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"swarm_id","or":"swarm_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/agent/swarms/{swarm_id}/notes","q":{"exist":["swarm_id"]},"r":{"param":{"swarm_id":"swarm_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"swarm_id"},{"lit":"notes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"swarm_note","name__orig":"swarm_note","Name":"SwarmNote","name_":"swarm_note","name-":"swarm-note","NAME":"SWARM_NOTE","index$":514}, {"active":true,"entity":"swarm_note","key$":"BasicSwarmNoteFlow","kind":"basic","name":"BasicSwarmNoteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"swarm_note_ref01"},"m":{"swarm_id":"swarm01"},"o":"create","s":[],"v":[],"index$":0}]}, 'SwarmNote', {"POST /api/v1/agent/swarms/{swarm_id}/notes":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["text"],"properties":{"text":{"type":"string","maxLength":2000,"key$":"text"},"task_id":{"type":"string","nullable":true,"description":"A task public id; omitted","the note is for the whole swarm and its orchestrator.":null,"key$":"task_id"}}}}}},"parameters":[{"name":"swarm_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"swarm_note.create.0":"GET-only live run: needs POST /api/v1/agent/swarms/{swarm_id}/notes"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const swarm_note_ref01_ent = client.SwarmNote()
    let swarm_note_ref01_data = setup.data.new.swarm_note['swarm_note_ref01']
    swarm_note_ref01_data['swarm_id'] = setup.idmap['swarm01']

    swarm_note_ref01_data = (await swarm_note_ref01_ent.create(swarm_note_ref01_data)).data()
    assert(null != swarm_note_ref01_data)


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
      '../../../../.sdk/test/entity/swarm_note/SwarmNoteTestData.json')

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
    ['swarm_note01','swarm_note02','swarm_note03','swarm01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SWARM_NOTE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SWARM_NOTE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SWARM_NOTE_ENTID']
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
  
