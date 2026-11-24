

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


describe('AgentAutomationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentAutomation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentAutomation().list({"agent_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_automation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"can_manage":{"a":true,"h":"Can Manage","n":"can_manage","r":true,"t":"`$BOOLEAN`","key$":"can_manage","index$":0},"can_manage_events":{"a":true,"h":"Can Manage Events","n":"can_manage_events","r":true,"sh":"Whether new event triggers can be attached or existing settings saved.","t":"`$BOOLEAN`","key$":"can_manage_events","index$":1},"can_run":{"a":true,"h":"Can Run","n":"can_run","r":true,"sh":"Whether the viewer can request a manual Temporal run","t":"`$BOOLEAN`","key$":"can_run","index$":2},"can_schedule":{"a":true,"h":"Can Schedule","n":"can_schedule","r":true,"t":"`$BOOLEAN`","key$":"can_schedule","index$":3},"definition":{"a":true,"h":"Definition","n":"definition","r":true,"t":"`$OBJECT`","union":{"branches":12,"count":14,"depth":10},"key$":"definition","index$":4},"event_subscriptions":{"a":true,"h":"Event Subscriptions","n":"event_subscriptions","r":true,"t":"`$ARRAY`","key$":"event_subscriptions","index$":5},"event_triggers":{"a":true,"h":"Event Triggers","n":"event_triggers","r":true,"t":"`$ARRAY`","key$":"event_triggers","index$":6},"expected_revision":{"a":true,"h":"Expected Revision","n":"expected_revision","r":true,"t":"`$INTEGER`","key$":"expected_revision","index$":7},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":8},"key":{"a":true,"h":"Key","n":"key","r":true,"t":"`$STRING`","key$":"key","index$":9},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":10},"revision":{"a":true,"h":"Revision","n":"revision","r":true,"t":"`$INTEGER`","key$":"revision","index$":11},"schedule":{"a":true,"h":"Schedule","n":"schedule","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":4},"key$":"schedule","index$":12},"schedules":{"a":true,"h":"Schedules","n":"schedules","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":3},"key$":"schedules","index$":13},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$OBJECT`","union":{"branches":12,"count":14,"depth":12},"key$":"version","index$":14}},"id":{"field":"id","name":"id"},"name":"agent_automation","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/automations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":30,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/automations","q":{"exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"automations"}],"t":{"page":{"next":"`body.pagination.next`"},"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"automation_key","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}","q":{"exist":["agent_id","id","organization_id"]},"r":{"param":{"automation_key":"id","id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"automations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["definition","expected_revision"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"automation_key","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}","q":{"exist":["agent_id","id","organization_id"]},"r":{"param":{"automation_key":"id","id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"automations"},{"var":"id"}],"t":{"req":{"definition":"`reqdata.definition`","expected_revision":"`reqdata.expected_revision`"},"res":"`body`"},"index$":0},{"a":true,"bf":["action","expected_revision","schedule_key","settings"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/schedule","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"automation_key","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/schedule","q":{"$action":"schedule","exist":["agent_id","id","organization_id"]},"r":{"param":{"automation_key":"id","id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"automations"},{"var":"id"},{"lit":"schedule"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"agent_automation","name__orig":"agent_automation","Name":"AgentAutomation","name_":"agent_automation","name-":"agent-automation","NAME":"AGENT_AUTOMATION","index$":2}, {"active":true,"entity":"agent_automation","key$":"BasicAgentAutomationFlow","kind":"basic","name":"BasicAgentAutomationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"agent_id":"agent01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_automation_ref01"}}],"index$":0},{"a":true,"d":{"agent_id":"agent01","organization_id":"organization01"},"i":{"ref":"agent_automation_ref01","srcdatavar":"agent_automation_ref01_data","suffix":"_up0","textfield":"key"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_automation_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"agent_automation_ref01","srcdatavar":"agent_automation_ref01_data","suffix":"_dt0"},"m":{"agent_id":"agent01","id":"agent_automation01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_automation_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}","record":{}}]}, 'AgentAutomation', {"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/automations":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"cursor","in":"query","schema":{"type":"string"},"index$":2},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":100,"default":30},"index$":3}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"automation_key","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["definition","expected_revision"],"properties":{"definition":{"type":"object","properties":{"version":{"type":"number","const":1},"name":{"type":"string","minLength":1,"maxLength":160},"description":{"type":"string","maxLength":4000},"imported_from":{"type":"object","properties":{"format":{},"digest":{}},"required":["format","digest"],"additionalProperties":false},"arguments":{"type":"object","propertyNames":{"type":"string","pattern":"^[A-Za-z0-9_-]{1,64}$"},"additionalProperties":{"type":"object","properties":{},"additionalProperties":false}},"defaults":{"type":"object","properties":{"executor":{}},"required":["executor"],"additionalProperties":false},"steps":{"minItems":1,"maxItems":80,"type":"array","items":{"oneOf":[]}}},"required":["version","name","steps"],"additionalProperties":false,"x-ref":"#/components/schemas/AgentAutomationDefinition","key$":"definition"},"expected_revision":{"type":"integer","minimum":0,"key$":"expected_revision"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"automation_key","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/schedule":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["action","expected_revision"],"properties":{"action":{"type":"string","enum":["save","pause","resume","remove"]},"expected_revision":{"type":["string","null"]},"settings":{"type":"object","additionalProperties":false,"properties":{"version_id":{"type":"string"},"schedule":{"oneOf":[{},{}],"x-ref":"#/components/schemas/AgentAutomationTiming"},"input":{"type":"object","additionalProperties":true},"conversation_id":{"type":"string"},"budgets":{"type":"object","additionalProperties":false,"properties":{"run_budget_usd":{},"run_budget_seconds":{},"budget_usd":{},"budget_period":{}}}}},"schedule_key":{"type":"string","pattern":"^[a-z][a-z0-9_-]{0,63}$"}},"x-ref":"#/components/schemas/AgentAutomationScheduleChange"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"automation_key","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_automation.update.1":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_automation_ref01_data = Object.values(setup.data.existing.agent_automation)[0] as any

    // LIST
    const agent_automation_ref01_ent = client.AgentAutomation()
    const agent_automation_ref01_match: any = {}
    agent_automation_ref01_match['agent_id'] = setup.idmap['agent01']
    agent_automation_ref01_match['organization_id'] = setup.idmap['organization01']

    const agent_automation_ref01_list = (await agent_automation_ref01_ent.list(agent_automation_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const agent_automation_ref01_data_up0: any = {}
    agent_automation_ref01_data_up0.id = agent_automation_ref01_data.id
    agent_automation_ref01_data_up0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    agent_automation_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const agent_automation_ref01_markdef_up0 = { name: 'key', value: 'Mark01-agent_automation_ref01_' + setup.now }
    ;(agent_automation_ref01_data_up0 as any)[agent_automation_ref01_markdef_up0.name] = agent_automation_ref01_markdef_up0.value

    const agent_automation_ref01_resdata_up0 = (await agent_automation_ref01_ent.update(agent_automation_ref01_data_up0)).data()
    assert(agent_automation_ref01_resdata_up0.id === agent_automation_ref01_data_up0.id)

    assert((agent_automation_ref01_resdata_up0 as any)[agent_automation_ref01_markdef_up0.name] === agent_automation_ref01_markdef_up0.value)


    // LOAD
    const agent_automation_ref01_match_dt0: any = {}
    agent_automation_ref01_match_dt0.id = agent_automation_ref01_data.id
    agent_automation_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    agent_automation_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const agent_automation_ref01_data_dt0 = (await agent_automation_ref01_ent.load(agent_automation_ref01_match_dt0)).data()
    assert(agent_automation_ref01_data_dt0.id === agent_automation_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_automation/AgentAutomationTestData.json')

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
    ['agent_automation01','agent_automation02','agent_automation03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_AUTOMATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_AUTOMATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_AUTOMATION_ENTID']
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
  
