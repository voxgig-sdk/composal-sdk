

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


describe('AgentSubscriptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentSubscription()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentSubscription().load({"agent_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_subscription.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"agent_subscription","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["action_name","label","login_id","method","model","profile_id","provider","reasoning","step_id","token","value","version"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions","q":{"exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"subscriptions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"refresh_provider","or":"refresh_provider","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions","q":{"exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"subscriptions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"agent_subscription","name__orig":"agent_subscription","Name":"AgentSubscription","name_":"agent_subscription","name-":"agent-subscription","NAME":"AGENT_SUBSCRIPTION","index$":54}, {"active":true,"entity":"agent_subscription","key$":"BasicAgentSubscriptionFlow","kind":"basic","name":"BasicAgentSubscriptionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_subscription_ref01"},"m":{"agent_id":"agent01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"agent_subscription_ref01","srcdatavar":"agent_subscription_ref01_data","suffix":"_dt0"},"m":{"id":"agent_subscription01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_subscription_ref01"}}],"index$":1}]}, 'AgentSubscription', {"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"action_name":{"type":"string","enum":["start"]},"method":{"type":"string","enum":["openai/openai","openai/openai-device-code","xai/xai-oauth"]}},"required":["action_name","method"],"additionalProperties":false},{"type":"object","properties":{"action_name":{"type":"string","enum":["answer"]},"login_id":{"type":"string"},"step_id":{"type":"string"},"value":{"oneOf":[{},{}]}},"required":["action_name","login_id","step_id"],"additionalProperties":false},{"type":"object","properties":{"action_name":{"type":"string","enum":["cancel"]},"login_id":{"type":"string"}},"required":["action_name","login_id"],"additionalProperties":false},{"type":"object","properties":{"action_name":{"type":"string","enum":["claude"]},"token":{"type":"string","maxLength":8192},"label":{"type":"string","minLength":1,"maxLength":160}},"required":["action_name","token"],"additionalProperties":false},{"type":"object","properties":{"action_name":{"type":"string","enum":["select"]},"provider":{"type":"string","enum":["openai","anthropic","xai"]},"profile_id":{"type":"string","description":"Account to bill. Omit to let Rails choose: the account in use for this provider, else its first usable one."},"model":{"type":"string"},"reasoning":{"type":"string","description":"Effort for the plan model, one of the model's reasoning levels. Omit for the model default."},"version":{"type":"string"}},"required":["action_name","provider","model","version"],"additionalProperties":false},{"type":"object","properties":{"action_name":{"type":"string","enum":["platform"]},"version":{"type":"string"}},"required":["action_name","version"],"additionalProperties":false},{"type":"object","description":"Applies the agent's chosen plan again when its worker lost the binding. Responds 503 when no account for that plan can bill, so the owner must sign in again.","properties":{"action_name":{"type":"string","enum":["reconnect"]}},"required":["action_name"],"additionalProperties":false},{"type":"object","properties":{"action_name":{"type":"string","enum":["disconnect"]},"provider":{"type":"string","enum":["openai","anthropic","xai"]},"profile_id":{"type":"string"}},"required":["action_name","provider","profile_id"],"additionalProperties":false},{"type":"object","properties":{"action_name":{"type":"string","enum":["forget"]},"profile_id":{"type":"string"}},"required":["action_name","profile_id"],"additionalProperties":false},{"type":"object","properties":{"action_name":{"type":"string","enum":["rename"]},"profile_id":{"type":"string"},"label":{"type":"string","minLength":1,"maxLength":160}},"required":["action_name","profile_id","label"],"additionalProperties":false}],"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/ClawderSubscriptionInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"refresh_provider","in":"query","description":"Request fresh model discovery for this subscription provider.","schema":{"type":"string","enum":["anthropic","openai","xai"]},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_subscription.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/subscriptions"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_subscription_ref01_ent = client.AgentSubscription()
    let agent_subscription_ref01_data = setup.data.new.agent_subscription['agent_subscription_ref01']
    agent_subscription_ref01_data['agent_id'] = setup.idmap['agent01']
    agent_subscription_ref01_data['organization_id'] = setup.idmap['organization01']

    agent_subscription_ref01_data = (await agent_subscription_ref01_ent.create(agent_subscription_ref01_data)).data()
    assert(null != agent_subscription_ref01_data)



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
      '../../../../.sdk/test/entity/agent_subscription/AgentSubscriptionTestData.json')

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
    ['agent_subscription01','agent_subscription02','agent_subscription03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_SUBSCRIPTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_SUBSCRIPTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_SUBSCRIPTION_ENTID']
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
  
