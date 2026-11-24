

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


describe('AgentWorkflowTriggerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentWorkflowTrigger()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentWorkflowTrigger().list({"agent_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_workflow_trigger.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"budget":{"a":true,"h":"Budget","n":"budget","r":true,"sh":"Each run's limits, and what the trigger may spend per period with its runs' spend in the current one","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"budget","index$":0},"can_manage":{"a":true,"h":"Can Manage","n":"can_manage","r":true,"t":"`$BOOLEAN`","key$":"can_manage","index$":1},"can_pause":{"a":true,"h":"Can Pause","n":"can_pause","r":true,"sh":"It is running, so a manager can pause it","t":"`$BOOLEAN`","key$":"can_pause","index$":2},"can_resume":{"a":true,"h":"Can Resume","n":"can_resume","r":true,"sh":"A person paused it, so a manager can resume it","t":"`$BOOLEAN`","key$":"can_resume","index$":3},"can_review":{"a":true,"h":"Can Review","n":"can_review","r":true,"sh":"The file changed and nobody checked it, so a manager can review it and resume","t":"`$BOOLEAN`","key$":"can_review","index$":4},"daily_limit":{"a":true,"h":"Daily Limit","n":"daily_limit","r":true,"sh":"How many events a day may start an event workflow's runs","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"daily_limit","index$":5},"day_resets_at":{"a":true,"h":"Day Resets At","n":"day_resets_at","r":true,"sh":"When the daily count starts again, at the organization's midnight","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"day_resets_at","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":8},"next_due_at":{"a":true,"h":"Next Due At","n":"next_due_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"next_due_at","index$":9},"pause_cause":{"a":true,"h":"Pause Cause","n":"pause_cause","r":true,"sh":"A person paused it, the file changed and nobody checked it, the saved steps can't run on it, or it is kept only so its subscription starts nothing","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"pause_cause","index$":10},"paused":{"a":true,"h":"Paused","n":"paused","r":true,"sh":"The workflow starts nothing until a person resumes or checks it","t":"`$BOOLEAN`","key$":"paused","index$":11},"read_at":{"a":true,"h":"Read At","n":"read_at","r":true,"sh":"The settings_changed_at you read; a change made since is refused","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"read_at","index$":12},"run_budget_usd":{"a":true,"h":"Run Budget Usd","n":"run_budget_usd","r":true,"t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"run_budget_usd","index$":13},"schedule":{"a":true,"h":"Schedule","n":"schedule","r":true,"sh":"A cron expression with its time zone, or an interval in seconds from an anchor time","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"schedule","index$":14},"settings_changed_at":{"a":true,"h":"Settings Changed At","n":"settings_changed_at","r":true,"sh":"When a person or the agent last changed the run settings; sent back with a change","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"settings_changed_at","index$":15},"skipped_today":{"a":true,"h":"Skipped Today","n":"skipped_today","r":true,"sh":"Events skipped today, over the daily limit or while paused","t":"`$INTEGER`","key$":"skipped_today","index$":16},"stale_at":{"a":true,"h":"Stale At","n":"stale_at","r":true,"sh":"When the workflow was paused; it starts nothing until resumed","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"stale_at","index$":17},"stale_reason":{"a":true,"h":"Stale Reason","n":"stale_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"stale_reason","index$":18},"starts":{"a":true,"h":"Starts","n":"starts","r":true,"sh":"What events start an event workflow, as a proposal's start shows them","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"starts","index$":19},"subscription_id":{"a":true,"h":"Subscription Id","n":"subscription_id","r":true,"sh":"The event subscription that starts it","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"subscription_id","index$":20},"time_zone":{"a":true,"h":"Time Zone","n":"time_zone","r":true,"sh":"The organization's IANA time zone, which the daily limit and budget periods count in","t":"`$STRING`","key$":"time_zone","index$":21},"today_count":{"a":true,"h":"Today Count","n":"today_count","r":true,"sh":"Events that started a run today, for an event workflow","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"today_count","index$":22},"trigger":{"a":true,"h":"Trigger","n":"trigger","r":true,"t":"`$OBJECT`","key$":"trigger","index$":23},"workflow_path":{"a":true,"h":"Workflow Path","n":"workflow_path","r":true,"t":"`$STRING`","key$":"workflow_path","index$":24}},"id":{"field":"id","name":"id"},"name":"agent_workflow_trigger","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers","q":{"exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"trigger_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}","q":{"exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","trigger_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"trigger_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review","q":{"$action":"review","exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","trigger_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"},{"var":"id"},{"lit":"review"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"trigger_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped","q":{"$action":"skipped","exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","trigger_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"},{"var":"id"},{"lit":"skipped"}],"t":{"page":{"total":"`body.count`"},"req":"`reqdata`","res":"`body.items`"},"index$":2}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"trigger_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}","q":{"exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","trigger_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["daily_limit","read_at","run_budget_usd"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"trigger_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}","q":{"exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","trigger_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"},{"var":"id"}],"t":{"req":{"daily_limit":"`reqdata.daily_limit`","read_at":"`reqdata.read_at`","run_budget_usd":"`reqdata.run_budget_usd`"},"res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/pause","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"trigger_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/pause","q":{"$action":"pause","exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","trigger_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"},{"var":"id"},{"lit":"pause"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/resume","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"trigger_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/resume","q":{"$action":"resume","exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","trigger_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"},{"var":"id"},{"lit":"resume"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["digest"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"trigger_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review","q":{"$action":"review","exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","trigger_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"workflow_triggers"},{"var":"id"},{"lit":"review"}],"t":{"req":{"digest":"`reqdata.digest`"},"res":"`body`"},"index$":3}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"agent_workflow_trigger","name__orig":"agent_workflow_trigger","Name":"AgentWorkflowTrigger","name_":"agent_workflow_trigger","name-":"agent-workflow-trigger","NAME":"AGENT_WORKFLOW_TRIGGER","index$":69}, {"active":true,"entity":"agent_workflow_trigger","key$":"BasicAgentWorkflowTriggerFlow","kind":"basic","name":"BasicAgentWorkflowTriggerFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"agent_id":"agent01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_workflow_trigger_ref01"}}],"index$":0},{"a":true,"d":{"agent_id":"agent01","organization_id":"organization01"},"i":{"ref":"agent_workflow_trigger_ref01","srcdatavar":"agent_workflow_trigger_ref01_data","suffix":"_up0","textfield":"day_resets_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_workflow_trigger_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"agent_workflow_trigger_ref01","srcdatavar":"agent_workflow_trigger_ref01_data","suffix":"_dt0"},"m":{"agent_id":"agent01","id":"agent_workflow_trigger01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_workflow_trigger_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}","record":{}}]}, 'AgentWorkflowTrigger', {"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"trigger_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"trigger_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/skipped":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"trigger_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"trigger_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"read_at":{"type":"string","nullable":true,"description":"The settings_changed_at you read; a change made since is refused","key$":"read_at"},"daily_limit":{"type":"integer","nullable":true,"minimum":1,"maximum":1000,"key$":"daily_limit"},"run_budget_usd":{"type":"number","nullable":true,"key$":"run_budget_usd"}},"required":["read_at","daily_limit","run_budget_usd"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"trigger_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/pause":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"trigger_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/resume":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"trigger_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}/review":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"digest":{"type":"string"}},"required":["digest"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"trigger_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_workflow_trigger.update.1":"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/agents/{id}/spark/workflow_triggers/{trigger_id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_workflow_trigger_ref01_data = Object.values(setup.data.existing.agent_workflow_trigger)[0] as any

    // LIST
    const agent_workflow_trigger_ref01_ent = client.AgentWorkflowTrigger()
    const agent_workflow_trigger_ref01_match: any = {}
    agent_workflow_trigger_ref01_match['agent_id'] = setup.idmap['agent01']
    agent_workflow_trigger_ref01_match['organization_id'] = setup.idmap['organization01']

    const agent_workflow_trigger_ref01_list = (await agent_workflow_trigger_ref01_ent.list(agent_workflow_trigger_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const agent_workflow_trigger_ref01_data_up0: any = {}
    agent_workflow_trigger_ref01_data_up0.id = agent_workflow_trigger_ref01_data.id
    agent_workflow_trigger_ref01_data_up0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    agent_workflow_trigger_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const agent_workflow_trigger_ref01_markdef_up0 = { name: 'day_resets_at', value: 'Mark01-agent_workflow_trigger_ref01_' + setup.now }
    ;(agent_workflow_trigger_ref01_data_up0 as any)[agent_workflow_trigger_ref01_markdef_up0.name] = agent_workflow_trigger_ref01_markdef_up0.value

    const agent_workflow_trigger_ref01_resdata_up0 = (await agent_workflow_trigger_ref01_ent.update(agent_workflow_trigger_ref01_data_up0)).data()
    assert(agent_workflow_trigger_ref01_resdata_up0.id === agent_workflow_trigger_ref01_data_up0.id)

    assert((agent_workflow_trigger_ref01_resdata_up0 as any)[agent_workflow_trigger_ref01_markdef_up0.name] === agent_workflow_trigger_ref01_markdef_up0.value)


    // LOAD
    const agent_workflow_trigger_ref01_match_dt0: any = {}
    agent_workflow_trigger_ref01_match_dt0.id = agent_workflow_trigger_ref01_data.id
    agent_workflow_trigger_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    agent_workflow_trigger_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const agent_workflow_trigger_ref01_data_dt0 = (await agent_workflow_trigger_ref01_ent.load(agent_workflow_trigger_ref01_match_dt0)).data()
    assert(agent_workflow_trigger_ref01_data_dt0.id === agent_workflow_trigger_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_workflow_trigger/AgentWorkflowTriggerTestData.json')

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
    ['agent_workflow_trigger01','agent_workflow_trigger02','agent_workflow_trigger03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_WORKFLOW_TRIGGER_ENTID']
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
  
