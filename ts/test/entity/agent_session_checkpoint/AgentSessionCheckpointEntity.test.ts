

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


describe('AgentSessionCheckpointEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentSessionCheckpoint()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentSessionCheckpoint().list({"agent_session_id":1,"organization_id":"x","repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_session_checkpoint.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"agent_session_checkpoint","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_session_id","or":"agent_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize","q":{"$action":"finalize","exist":["agent_session_id","id","organization_id","repo_id"]},"r":{"param":{"agent_session_id":"agent_session_id","id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"agent_session_id"},{"lit":"checkpoints"},{"var":"id"},{"lit":"finalize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["git_commit_sha"],"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/seal","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_session_id","or":"agent_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/seal","q":{"$action":"seal","exist":["agent_session_id","id","organization_id","repo_id"]},"r":{"param":{"agent_session_id":"agent_session_id","id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"agent_session_id"},{"lit":"checkpoints"},{"var":"id"},{"lit":"seal"}],"t":{"req":"`reqdata`","res":"`body.agent_checkpoint`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_session_id","or":"agent_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints","q":{"exist":["agent_session_id","organization_id","repo_id"]},"r":{"param":{"agent_session_id":"agent_session_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"agent_session_id"},{"lit":"checkpoints"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_session_id","or":"agent_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints","q":{"exist":["agent_session_id","organization_id","repo_id"]},"r":{"param":{"agent_session_id":"agent_session_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"agent_session_id"},{"lit":"checkpoints"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_session_id","or":"agent_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}","q":{"exist":["agent_session_id","id","organization_id","repo_id"]},"r":{"param":{"agent_session_id":"agent_session_id","id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"agent_session_id"},{"lit":"checkpoints"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/download","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_session_id","or":"agent_session_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/download","q":{"$action":"download","exist":["agent_session_id","id","organization_id","repo_id"]},"r":{"param":{"agent_session_id":"agent_session_id","id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"agent_session_id"},{"lit":"checkpoints"},{"var":"id"},{"lit":"download"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo","$.main.kit.entity.agent_session"]]},"key$":"agent_session_checkpoint","name__orig":"agent_session_checkpoint","Name":"AgentSessionCheckpoint","name_":"agent_session_checkpoint","name-":"agent-session-checkpoint","NAME":"AGENT_SESSION_CHECKPOINT","index$":46}, {"active":true,"entity":"agent_session_checkpoint","key$":"BasicAgentSessionCheckpointFlow","kind":"basic","name":"BasicAgentSessionCheckpointFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_session_checkpoint_ref01"},"m":{"agent_session_id":"agent_session01","organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"agent_session_id":"agent_session01","organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_session_checkpoint_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"agent_session_checkpoint_ref01","srcdatavar":"agent_session_checkpoint_ref01_data","suffix":"_dt0"},"m":{"agent_session_id":"agent_session01","id":"agent_session_checkpoint01","organization_id":"organization01","repo_id":"repo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_session_checkpoint_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}","record":{}}]}, 'AgentSessionCheckpoint', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"agent_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/seal":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["git_commit_sha"],"properties":{"git_commit_sha":{"type":"string","pattern":"^[0-9a-fA-F]{40}$","description":"Complete nonzero original Git SHA; normalized to lowercase."}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"agent_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"agent_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"agent_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"agent_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/download":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"agent_session_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_session_checkpoint.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{agent_session_id}/checkpoints/{id}/finalize"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_session_checkpoint_ref01_ent = client.AgentSessionCheckpoint()
    let agent_session_checkpoint_ref01_data = setup.data.new.agent_session_checkpoint['agent_session_checkpoint_ref01']
    agent_session_checkpoint_ref01_data['agent_session_id'] = setup.idmap['agent_session01']
    agent_session_checkpoint_ref01_data['organization_id'] = setup.idmap['organization01']
    agent_session_checkpoint_ref01_data['repo_id'] = setup.idmap['repo01']

    agent_session_checkpoint_ref01_data = (await agent_session_checkpoint_ref01_ent.create(agent_session_checkpoint_ref01_data)).data()
    assert(null != agent_session_checkpoint_ref01_data.id)


    // LIST
    const agent_session_checkpoint_ref01_match: any = {}
    agent_session_checkpoint_ref01_match['agent_session_id'] = setup.idmap['agent_session01']
    agent_session_checkpoint_ref01_match['organization_id'] = setup.idmap['organization01']
    agent_session_checkpoint_ref01_match['repo_id'] = setup.idmap['repo01']

    const agent_session_checkpoint_ref01_list = (await agent_session_checkpoint_ref01_ent.list(agent_session_checkpoint_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(agent_session_checkpoint_ref01_list, { id: agent_session_checkpoint_ref01_data.id })))


    // LOAD
    const agent_session_checkpoint_ref01_match_dt0: any = {}
    agent_session_checkpoint_ref01_match_dt0.id = agent_session_checkpoint_ref01_data.id
    agent_session_checkpoint_ref01_match_dt0['agent_session_id'] = setup.idmap['agent_session_id'] ?? setup.idmap['agent_session01']
    agent_session_checkpoint_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    agent_session_checkpoint_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    const agent_session_checkpoint_ref01_data_dt0 = (await agent_session_checkpoint_ref01_ent.load(agent_session_checkpoint_ref01_match_dt0)).data()
    assert(agent_session_checkpoint_ref01_data_dt0.id === agent_session_checkpoint_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_session_checkpoint/AgentSessionCheckpointTestData.json')

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
    ['agent_session_checkpoint01','agent_session_checkpoint02','agent_session_checkpoint03','organization01','organization02','organization03','repo01','repo02','repo03','agent_session01','agent_session02','agent_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_SESSION_CHECKPOINT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_SESSION_CHECKPOINT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_SESSION_CHECKPOINT_ENTID']
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
  
