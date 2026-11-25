

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


describe('AgentOperationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentOperation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentOperation().load({"agent_id":1,"id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_operation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"arguments":{"a":true,"h":"Arguments","n":"arguments","r":true,"sh":"JSON object limited to 65536 encoded bytes.","t":"`$OBJECT`","key$":"arguments","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":1},"key":{"a":true,"h":"Key","n":"key","r":true,"t":"`$STRING`","key$":"key","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":3},"operation":{"a":true,"h":"Operation","n":"operation","r":true,"t":"`$OBJECT`","key$":"operation","index$":4},"participant":{"a":true,"h":"Participant","n":"participant","r":true,"t":"`$STRING`","key$":"participant","index$":5},"requester_id":{"a":true,"h":"Requester Id","n":"requester_id","r":true,"sh":"Signed-in user public ID returned by discovery.","t":"`$STRING`","key$":"requester_id","index$":6},"scope_key":{"a":true,"h":"Scope Key","n":"scope_key","r":true,"t":"`$STRING`","key$":"scope_key","index$":7}},"id":{"field":"id","name":"id"},"name":"agent_operation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["arguments","key","name","requester_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations","q":{"exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"relay"},{"lit":"operations"}],"t":{"req":"`reqdata`","res":"`body.operation`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations/{operation_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"operation_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations/{operation_id}","q":{"exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","operation_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"relay"},{"lit":"operations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_operation","name__orig":"agent_operation","Name":"AgentOperation","name_":"agent_operation","name-":"agent-operation","NAME":"AGENT_OPERATION","index$":32}, {"active":true,"entity":"agent_operation","key$":"BasicAgentOperationFlow","kind":"basic","name":"BasicAgentOperationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_operation_ref01"},"m":{"agent_id":"agent01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"agent_operation_ref01","srcdatavar":"agent_operation_ref01_data","suffix":"_dt0"},"m":{"agent_id":"agent01","id":"agent_operation01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_operation_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations/{operation_id}","record":{}}]}, 'AgentOperation', {"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["requester_id","key","name","arguments"],"properties":{"requester_id":{"type":"string","description":"Signed-in user public ID returned by discovery. Retain it with the exact request key.","key$":"requester_id"},"key":{"type":"string","minLength":1,"maxLength":200,"key$":"key"},"name":{"type":"string","pattern":"^[a-z][a-z0-9_.]{0,99}$","key$":"name"},"arguments":{"type":"object","additionalProperties":true,"description":"JSON object limited to 65536 encoded bytes. Reserved routing fields are rejected.","key$":"arguments"}},"x-ref":"#/components/schemas/RelayOperatorCall"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations/{operation_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"operation_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_operation.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/operations","agent_operation.load.1":"GET-only live run: reads a record only agent_operation.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_operation_ref01_ent = client.AgentOperation()
    let agent_operation_ref01_data = setup.data.new.agent_operation['agent_operation_ref01']
    agent_operation_ref01_data['agent_id'] = setup.idmap['agent01']
    agent_operation_ref01_data['organization_id'] = setup.idmap['organization01']

    agent_operation_ref01_data = (await agent_operation_ref01_ent.create(agent_operation_ref01_data)).data()
    assert(null != agent_operation_ref01_data.id)


    // LOAD
    const agent_operation_ref01_match_dt0: any = {}
    agent_operation_ref01_match_dt0.id = agent_operation_ref01_data.id
    agent_operation_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    agent_operation_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const agent_operation_ref01_data_dt0 = (await agent_operation_ref01_ent.load(agent_operation_ref01_match_dt0)).data()
    assert(agent_operation_ref01_data_dt0.id === agent_operation_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_operation/AgentOperationTestData.json')

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
    ['agent_operation01','agent_operation02','agent_operation03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_OPERATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_OPERATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_OPERATION_ENTID']
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
  
