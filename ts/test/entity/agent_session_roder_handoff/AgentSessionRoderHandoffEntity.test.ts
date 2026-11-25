

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


describe('AgentSessionRoderHandoffEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentSessionRoderHandoff()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentSessionRoderHandoff().create({"agent_session_id":1,"organization_id":"x","repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_session_roder_handoff.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"checkpoint_id":{"a":true,"h":"Checkpoint Id","n":"checkpoint_id","r":false,"sh":"Public id of the checkpoint to hand off.","t":"`$STRING`","key$":"checkpoint_id","index$":0},"purpose":{"a":true,"h":"Purpose","n":"purpose","r":false,"sh":"Handoff intent; defaults to `continue`.","t":"`$STRING`","key$":"purpose","index$":1}},"name":"agent_session_roder_handoff","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["checkpoint_id","purpose"],"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/roder_handoffs","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_session_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/roder_handoffs","q":{"exist":["agent_session_id","organization_id","repo_id"]},"r":{"param":{"id":"agent_session_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"agent_session_id"},{"lit":"roder_handoffs"}],"t":{"req":{"checkpoint_id":"`reqdata.checkpoint_id`","purpose":"`reqdata.purpose`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo","$.main.kit.entity.agent_session"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_session_roder_handoff","name__orig":"agent_session_roder_handoff","Name":"AgentSessionRoderHandoff","name_":"agent_session_roder_handoff","name-":"agent-session-roder-handoff","NAME":"AGENT_SESSION_RODER_HANDOFF","index$":46}, {"active":true,"entity":"agent_session_roder_handoff","key$":"BasicAgentSessionRoderHandoffFlow","kind":"basic","name":"BasicAgentSessionRoderHandoffFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_session_roder_handoff_ref01"},"m":{"agent_session_id":"agent_session01","organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0}]}, 'AgentSessionRoderHandoff', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/roder_handoffs":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"checkpoint_id":{"type":"string","description":"Public id of the checkpoint to hand off. Defaults to the latest uploaded.","key$":"checkpoint_id"},"purpose":{"type":"string","enum":["ask_why","continue"],"description":"Handoff intent; defaults to `continue`.","key$":"purpose"}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_session_roder_handoff.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/roder_handoffs"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_session_roder_handoff_ref01_ent = client.AgentSessionRoderHandoff()
    let agent_session_roder_handoff_ref01_data = setup.data.new.agent_session_roder_handoff['agent_session_roder_handoff_ref01']
    agent_session_roder_handoff_ref01_data['agent_session_id'] = setup.idmap['agent_session01']
    agent_session_roder_handoff_ref01_data['organization_id'] = setup.idmap['organization01']
    agent_session_roder_handoff_ref01_data['repo_id'] = setup.idmap['repo01']

    agent_session_roder_handoff_ref01_data = (await agent_session_roder_handoff_ref01_ent.create(agent_session_roder_handoff_ref01_data)).data()
    assert(null != agent_session_roder_handoff_ref01_data)


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
      '../../../../.sdk/test/entity/agent_session_roder_handoff/AgentSessionRoderHandoffTestData.json')

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
    ['agent_session_roder_handoff01','agent_session_roder_handoff02','agent_session_roder_handoff03','organization01','organization02','organization03','repo01','repo02','repo03','agent_session01','agent_session02','agent_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_SESSION_RODER_HANDOFF_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_SESSION_RODER_HANDOFF_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_SESSION_RODER_HANDOFF_ENTID']
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
  
