

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


describe('AgentConnectionDelegationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentConnectionDelegation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentConnectionDelegation().list({"agent_connection_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_connection_delegation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"authorized_by_id":{"a":true,"h":"Authorized By Id","n":"authorized_by_id","r":true,"t":"`$STRING`","key$":"authorized_by_id","index$":0},"automation_connection_grant_id":{"a":true,"h":"Automation Connection Grant Id","n":"automation_connection_grant_id","r":true,"t":"`$STRING`","key$":"automation_connection_grant_id","index$":1},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"member_name":{"a":true,"h":"Member Name","n":"member_name","r":true,"t":"`$STRING`","key$":"member_name","index$":4},"revoked_at":{"a":true,"h":"Revoked At","n":"revoked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at","index$":5},"roles":{"a":true,"h":"Roles","n":"roles","r":true,"t":"`$ARRAY`","key$":"roles","index$":6},"usable":{"a":true,"h":"Usable","n":"usable","r":true,"t":"`$BOOLEAN`","key$":"usable","index$":7},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"t":"`$STRING`","key$":"user_id","index$":8}},"id":{"field":"id","name":"id"},"name":"agent_connection_delegation","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_connections/{id}/delegations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_connection_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/delegations","q":{"exist":["agent_connection_id","organization_id"]},"r":{"param":{"id":"agent_connection_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"agent_connection_id"},{"lit":"delegations"}],"t":{"page":{"next":"`body.pagination.next`"},"req":"`reqdata`","res":"`body.delegations`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent_connection"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_connection_delegation","name__orig":"agent_connection_delegation","Name":"AgentConnectionDelegation","name_":"agent_connection_delegation","name-":"agent-connection-delegation","NAME":"AGENT_CONNECTION_DELEGATION","index$":10}, {"active":true,"entity":"agent_connection_delegation","key$":"BasicAgentConnectionDelegationFlow","kind":"basic","name":"BasicAgentConnectionDelegationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"agent_connection_id":"agent_connection01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_connection_delegation_ref01"}}],"index$":0}]}, 'AgentConnectionDelegation', {"GET /api/v1/organizations/{organization_id}/agent_connections/{id}/delegations":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_connection_delegation_ref01_data = Object.values(setup.data.existing.agent_connection_delegation)[0] as any

    // LIST
    const agent_connection_delegation_ref01_ent = client.AgentConnectionDelegation()
    const agent_connection_delegation_ref01_match: any = {}
    agent_connection_delegation_ref01_match['agent_connection_id'] = setup.idmap['agent_connection01']
    agent_connection_delegation_ref01_match['organization_id'] = setup.idmap['organization01']

    const agent_connection_delegation_ref01_list = (await agent_connection_delegation_ref01_ent.list(agent_connection_delegation_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/agent_connection_delegation/AgentConnectionDelegationTestData.json')

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
    ['agent_connection_delegation01','agent_connection_delegation02','agent_connection_delegation03','organization01','organization02','organization03','agent_connection01','agent_connection02','agent_connection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_CONNECTION_DELEGATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_CONNECTION_DELEGATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_CONNECTION_DELEGATION_ENTID']
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
  
