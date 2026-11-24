

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


describe('AgentInteractionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentInteraction()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentInteraction().list({"agent_id":1,"organization_id":"x","conversation_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_interaction.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0},"interactions":{"a":true,"h":"Interactions","n":"interactions","r":true,"t":"`$ARRAY`","union":{"branches":12,"count":8,"depth":17},"key$":"interactions","index$":1}},"id":{"field":"id","name":"id"},"name":"agent_interaction","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["conversation_id","expected_revision"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"request_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel","q":{"$action":"cancel","exist":["agent_id","id","idempotency_key","organization_id"]},"r":{"param":{"id":"agent_id","request_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"interactions"},{"var":"id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["conversation_id","expected_revision"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/connect","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"request_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/connect","q":{"$action":"connect","exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","request_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"interactions"},{"var":"id"},{"lit":"connect"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"conversation_id","or":"conversation_id","r":true,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"ids","or":"ids[]","r":false,"style":"form","t":"`$ARRAY`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions","q":{"exist":["agent_id","conversation_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"interactions"}],"t":{"req":"`reqdata`","res":"`body.interactions`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"request_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"conversation_id","or":"conversation_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}","q":{"exist":["agent_id","conversation_id","id","organization_id"]},"r":{"param":{"id":"agent_id","request_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"interactions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"agent_interaction","name__orig":"agent_interaction","Name":"AgentInteraction","name_":"agent_interaction","name-":"agent-interaction","NAME":"AGENT_INTERACTION","index$":26}, {"active":true,"entity":"agent_interaction","key$":"BasicAgentInteractionFlow","kind":"basic","name":"BasicAgentInteractionFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"agent_interaction_ref01"},"m":{"agent_id":"agent01","organization_id":"organization01","request_id":"request01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"agent_id":"agent01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_interaction_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"agent_interaction_ref01","srcdatavar":"agent_interaction_ref01_data","suffix":"_dt0"},"m":{"agent_id":"agent01","id":"agent_interaction01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_interaction_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}","record":{}}]}, 'AgentInteraction', {"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Exact JSON body, at most 4 KiB serialized UTF-8. The idempotency key is bound to actor, request, operation, expected revision, and canonical validated body.","additionalProperties":true,"required":["conversation_id","expected_revision"],"properties":{"conversation_id":{"type":"string","minLength":1,"description":"Explicit conversation identity, including an agent-scoped native session alias.","x-ref":"#/components/schemas/PersistentAgentClawderInteractionFields/properties/conversation_id"},"expected_revision":{"type":"integer","minimum":1,"maximum":9223372036854776000}},"x-ref":"#/components/schemas/PersistentAgentClawderInteractionCancelInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"request_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"Idempotency-Key","in":"header","required":true,"description":"Stable unique operation key; reuse only for the identical request, including expected versions.","schema":{"type":"string","pattern":"^[a-zA-Z0-9_-]{1,128}$"},"index$":3}]},"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/connect":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Exact JSON body, at most 4 KiB serialized UTF-8. The idempotency key is bound to actor, request, operation, expected revision, and canonical validated body.","additionalProperties":true,"required":["conversation_id","expected_revision"],"properties":{"conversation_id":{"type":"string","minLength":1,"description":"Explicit conversation identity, including an agent-scoped native session alias.","x-ref":"#/components/schemas/PersistentAgentClawderInteractionFields/properties/conversation_id"},"expected_revision":{"type":"integer","minimum":1,"maximum":9223372036854776000}},"x-ref":"#/components/schemas/PersistentAgentClawderInteractionCancelInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"request_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"conversation_id","in":"query","required":true,"schema":{"type":"string","minLength":1,"description":"Explicit conversation identity, including an agent-scoped native session alias.","x-ref":"#/components/schemas/PersistentAgentClawderInteractionFields/properties/conversation_id"},"index$":2},{"name":"ids[]","in":"query","required":false,"description":"Explicit interaction IDs. When omitted, Rails selects up to 50 skill-share offers for this target and conversation, prioritizing the oldest unexpired awaiting or processing offers, then recent terminal receipts. Answering open offers reveals the next batch.","style":"form","explode":true,"schema":{"type":"array","minItems":1,"maxItems":50,"items":{"type":"string","minLength":1,"maxLength":256,"description":"Durable request ID; at most 256 UTF-8 bytes.","x-ref":"#/components/schemas/PersistentAgentClawderInteractionFields/properties/id"}},"index$":3}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"request_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"conversation_id","in":"query","required":true,"schema":{"type":"string","minLength":1,"description":"Explicit conversation identity, including an agent-scoped native session alias.","x-ref":"#/components/schemas/PersistentAgentClawderInteractionFields/properties/conversation_id"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_interaction.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/interactions/{request_id}/cancel"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_interaction_ref01_data = Object.values(setup.data.existing.agent_interaction)[0] as any

    // LIST
    const agent_interaction_ref01_ent = client.AgentInteraction()
    const agent_interaction_ref01_match: any = {}
    agent_interaction_ref01_match['agent_id'] = setup.idmap['agent01']
    agent_interaction_ref01_match['organization_id'] = setup.idmap['organization01']

    const agent_interaction_ref01_list = (await agent_interaction_ref01_ent.list(agent_interaction_ref01_match)).map((e: any) => e.data())


    // LOAD
    const agent_interaction_ref01_match_dt0: any = {}
    agent_interaction_ref01_match_dt0.id = agent_interaction_ref01_data.id
    agent_interaction_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    agent_interaction_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const agent_interaction_ref01_data_dt0 = (await agent_interaction_ref01_ent.load(agent_interaction_ref01_match_dt0)).data()
    assert(agent_interaction_ref01_data_dt0.id === agent_interaction_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_interaction/AgentInteractionTestData.json')

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
    ['agent_interaction01','agent_interaction02','agent_interaction03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_INTERACTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_INTERACTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_INTERACTION_ENTID']
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
  
