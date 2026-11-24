

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


describe('AgentConnectionResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentConnectionResource()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentConnectionResource().create({"agent_connection_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_connection_resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cursor":{"a":true,"h":"Cursor","n":"cursor","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cursor","index$":0},"next_cursor":{"a":true,"h":"Next Cursor","n":"next_cursor","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"next_cursor","index$":1},"query":{"a":true,"h":"Query","n":"query","r":false,"t":"`$STRING`","key$":"query","index$":2},"resources":{"a":true,"h":"Resources","n":"resources","r":true,"t":"`$ARRAY`","key$":"resources","index$":3}},"name":"agent_connection_resource","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["cursor","query"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_connection_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/resources","q":{"exist":["agent_connection_id","organization_id"]},"r":{"param":{"id":"agent_connection_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"agent_connection_id"},{"lit":"resources"}],"t":{"req":{"cursor":"`reqdata.cursor`","query":"`reqdata.query`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent_connection"]]},"key$":"agent_connection_resource","name__orig":"agent_connection_resource","Name":"AgentConnectionResource","name_":"agent_connection_resource","name-":"agent-connection-resource","NAME":"AGENT_CONNECTION_RESOURCE","index$":13}, {"active":true,"entity":"agent_connection_resource","key$":"BasicAgentConnectionResourceFlow","kind":"basic","name":"BasicAgentConnectionResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_connection_resource_ref01"},"m":{"agent_connection_id":"agent_connection01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'AgentConnectionResource', {"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/resources":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"query":{"type":"string","maxLength":200,"key$":"query"},"cursor":{"type":["string","null"],"maxLength":2048,"key$":"cursor"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_connection_resource.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_connections/{id}/resources"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_connection_resource_ref01_ent = client.AgentConnectionResource()
    let agent_connection_resource_ref01_data = setup.data.new.agent_connection_resource['agent_connection_resource_ref01']
    agent_connection_resource_ref01_data['agent_connection_id'] = setup.idmap['agent_connection01']
    agent_connection_resource_ref01_data['organization_id'] = setup.idmap['organization01']

    agent_connection_resource_ref01_data = (await agent_connection_resource_ref01_ent.create(agent_connection_resource_ref01_data)).data()
    assert(null != agent_connection_resource_ref01_data)


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
      '../../../../.sdk/test/entity/agent_connection_resource/AgentConnectionResourceTestData.json')

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
    ['agent_connection_resource01','agent_connection_resource02','agent_connection_resource03','organization01','organization02','organization03','agent_connection01','agent_connection02','agent_connection03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_CONNECTION_RESOURCE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_CONNECTION_RESOURCE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_CONNECTION_RESOURCE_ENTID']
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
  
