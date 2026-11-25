

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


describe('AgentSwarmEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentSwarm()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('agent_swarm hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).AgentSwarm().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).AgentSwarm()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AgentSwarm().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().AgentSwarm().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AgentSwarm().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AgentSwarm().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentSwarm().list({"org":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_swarm.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base_bookmark":{"a":true,"h":"Base Bookmark","n":"base_bookmark","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"base_bookmark","index$":0},"base_ref":{"a":true,"de":true,"h":"Base Ref","n":"base_ref","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"base_ref","index$":1},"base_revision":{"a":true,"h":"Base Revision","n":"base_revision","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"64-hex commit id; skips the head lookup","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"base_revision","index$":2},"budget":{"a":true,"h":"Budget","n":"budget","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$OBJECT`","key$":"budget","index$":3},"canceled_at":{"a":true,"fo":"date-time","h":"Canceled At","n":"canceled_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"canceled_at","index$":4},"canceled_count":{"a":true,"h":"Canceled Count","n":"canceled_count","r":true,"t":"`$INTEGER`","key$":"canceled_count","index$":5},"concurrency_key":{"a":true,"de":true,"h":"Concurrency Key","n":"concurrency_key","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"concurrency_key","index$":6},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":7},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":8},"creator_user_id":{"a":true,"h":"Creator User Id","n":"creator_user_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"creator_user_id","index$":9},"deadline_at":{"a":true,"fo":"date-time","h":"Deadline At","n":"deadline_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"deadline_at","index$":10},"display_id":{"a":true,"h":"Display Id","n":"display_id","r":true,"t":"`$INTEGER`","key$":"display_id","index$":11},"done_count":{"a":true,"h":"Done Count","n":"done_count","r":true,"t":"`$INTEGER`","key$":"done_count","index$":12},"environment":{"a":true,"h":"Environment","n":"environment","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$OBJECT`","key$":"environment","index$":13},"failed_count":{"a":true,"h":"Failed Count","n":"failed_count","r":true,"t":"`$INTEGER`","key$":"failed_count","index$":14},"finished_at":{"a":true,"fo":"date-time","h":"Finished At","n":"finished_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at","index$":15},"finished_at_label":{"a":true,"h":"Finished At Label","n":"finished_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at_label","index$":16},"github":{"a":true,"h":"Github","n":"github","r":true,"t":"`$OBJECT`","key$":"github","index$":17},"goal":{"a":true,"h":"Goal","n":"goal","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"goal","index$":18},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":19},"model":{"a":true,"de":true,"h":"Model","n":"model","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"model","index$":20},"model_provider":{"a":true,"de":true,"h":"Model Provider","n":"model_provider","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"model_provider","index$":21},"number":{"a":true,"h":"Number","n":"number","r":true,"t":"`$INTEGER`","key$":"number","index$":22},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":23},"organization_slug":{"a":true,"h":"Organization Slug","n":"organization_slug","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"organization_slug","index$":24},"outcome":{"a":true,"h":"Outcome","n":"outcome","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"outcome","index$":25},"phase":{"a":true,"h":"Phase","n":"phase","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"phase","index$":26},"policy":{"a":true,"h":"Policy","n":"policy","op":{"create":{"req":false,"type":"`$OBJECT`"}},"r":true,"sh":"Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS.","t":"`$OBJECT`","key$":"policy","index$":27},"queued_at":{"a":true,"de":true,"fo":"date-time","h":"Queued At","n":"queued_at","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"queued_at","index$":28},"queued_at_label":{"a":true,"h":"Queued At Label","n":"queued_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"queued_at_label","index$":29},"repository":{"a":true,"h":"Repository","n":"repository","r":false,"sh":"Repository slug inside the organization","t":"`$STRING`","key$":"repository","index$":30},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_id","index$":31},"repository_slug":{"a":true,"h":"Repository Slug","n":"repository_slug","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_slug","index$":32},"reserved":{"a":true,"h":"Reserved","n":"reserved","r":true,"t":"`$OBJECT`","key$":"reserved","index$":33},"scheduler_generation":{"a":true,"h":"Scheduler Generation","n":"scheduler_generation","r":true,"t":"`$INTEGER`","key$":"scheduler_generation","index$":34},"skipped_count":{"a":true,"h":"Skipped Count","n":"skipped_count","r":true,"t":"`$INTEGER`","key$":"skipped_count","index$":35},"slug":{"a":true,"h":"Slug","n":"slug","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"slug","index$":36},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at","index$":37},"started_at_label":{"a":true,"h":"Started At Label","n":"started_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at_label","index$":38},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":39},"summary":{"a":true,"h":"Summary","n":"summary","r":true,"t":"`$OBJECT`","key$":"summary","index$":40},"target":{"a":true,"h":"Target","n":"target","r":false,"sh":"Where the swarm lands.","t":"`$OBJECT`","key$":"target","index$":41},"task_count":{"a":true,"h":"Task Count","n":"task_count","r":true,"t":"`$INTEGER`","key$":"task_count","index$":42},"task_template_json":{"a":true,"de":true,"h":"Task Template Json","n":"task_template_json","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"task_template_json","index$":43},"tasks":{"a":true,"h":"Tasks","n":"tasks","op":{"create":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"tasks","index$":44},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":45},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":46},"usage":{"a":true,"h":"Usage","n":"usage","r":true,"t":"`$OBJECT`","key$":"usage","index$":47}},"id":{"field":"id","name":"id"},"name":"agent_swarm","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["reason"],"co":{"id":"POST /api/v1/agent/swarms/{id}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/agent/swarms/{id}/cancel","q":{"$action":"cancel","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body.swarm`"},"index$":0},{"a":true,"bf":["base_bookmark","base_ref","base_revision","budget","concurrency_key","environment","goal","model","model_provider","organization_slug","policy","queued_at","repository","slug","target","task_template_json","tasks"],"co":{"id":"POST /api/v1/agent/swarms","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/agent/swarms","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/agent/swarms","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"org","or":"org","r":true,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"per_page","or":"per_page","r":false,"style":"form","t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/agent/swarms","q":{"exist":["org"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"}],"t":{"page":{"more":"`body.has_more`","total":"`body.total`"},"req":"`reqdata`","res":"`body.swarms`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/agent/swarms/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent/swarms/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.swarm`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/agent/swarms/{id}/live","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent/swarms/{id}/live","q":{"$action":"live","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"id"},{"lit":"live"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/agent/swarms/{id}/policy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent/swarms/{id}/policy","q":{"$action":"policy","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"id"},{"lit":"policy"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["policy"],"co":{"id":"PATCH /api/v1/agent/swarms/{id}/policy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/v1/agent/swarms/{id}/policy","q":{"$action":"policy","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"id"},{"lit":"policy"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_swarm","name__orig":"agent_swarm","Name":"AgentSwarm","name_":"agent_swarm","name-":"agent-swarm","NAME":"AGENT_SWARM","index$":54}, {"active":true,"entity":"agent_swarm","key$":"BasicAgentSwarmFlow","kind":"basic","name":"BasicAgentSwarmFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_swarm_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_swarm_ref01"}}],"index$":1},{"a":false,"d":{},"i":{"ref":"agent_swarm_ref01","srcdatavar":"agent_swarm_ref01_data","suffix":"_up0","textfield":"base_bookmark"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_swarm_ref01"}}],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"agent_swarm_ref01","srcdatavar":"agent_swarm_ref01_data","suffix":"_dt0"},"m":{"id":"agent_swarm01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_swarm_ref01"}}],"index$":2,"route":"GET /api/v1/agent/swarms/{id}","record":{}}]}, 'AgentSwarm', {"POST /api/v1/agent/swarms/{id}/cancel":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"reason":{"type":"string"}}}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/agent/swarms":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"description":"PRD 146: the goal form (`goal` + `repository`) starts a planned swarm; the legacy `tasks[]` form materializes a one-level tree. One of `goal` or `tasks` is required.","type":"object","required":["organization_slug"],"properties":{"organization_slug":{"type":"string","key$":"organization_slug"},"slug":{"type":"string","key$":"slug"},"goal":{"type":"string","key$":"goal"},"repository":{"type":"string","description":"Repository slug inside the organization","key$":"repository"},"base_bookmark":{"type":"string","description":"An existing bookmark to start from and land on; the plain form of `target.kind = bookmark`.","key$":"base_bookmark"},"target":{"type":"object","description":"Where the swarm lands. `trunk` is the repository's default branch; `bookmark` an existing bookmark named by `name`; `new_bookmark` a bookmark named by `name` that the launch creates at trunk's head. Every worker starts from the target's head and every Change is opened against it; its merge queue is found or created on the first landing.","required":["kind"],"properties":{"kind":{"type":"string","enum":["trunk","bookmark","new_bookmark"]},"name":{"type":"string","maxLength":128}},"key$":"target"},"base_revision":{"type":"string","description":"64-hex commit id; skips the head lookup","key$":"base_revision"},"policy":{"type":"object","additionalProperties":true,"description":"Every key is optional and defaults to AgentSwarm::POLICY_DEFAULTS.","properties":{"platform":{"type":"string","enum":["composal","github"]},"max_parallel_workers":{"type":"integer","minimum":1},"max_depth":{"type":"integer","minimum":1},"max_subplanner_iterations":{"type":"integer","minimum":1},"max_root_iterations":{"type":"integer","minimum":1},"max_tasks":{"type":"integer","minimum":1},"max_runs":{"type":"integer","minimum":1},"max_task_attempts":{"type":"integer","minimum":1},"task_deadline_seconds":{"type":"integer","minimum":60},"swarm_deadline_seconds":{"type":"integer","minimum":60},"landing":{"type":"string"},"deploy":{"type":"string"},"restack_attempts":{"type":"integer","minimum":0},"reserve_org_slot":{"type":"boolean"},"submit_on_failure":{"type":"boolean"},"plan_only":{"type":"boolean"},"environment_profile":{"type":"string"},"models":{"type":"object","description":"Per-role model overrides; roles left out keep the platform defaults.","additionalProperties":{"type":"object","required":[],"properties":{}}}},"key$":"policy"},"budget":{"type":"object","additionalProperties":true,"properties":{"max_usd":{"type":"number","minimum":0},"max_wall_clock_seconds":{"type":"integer","minimum":60},"cleanup_reserve_usd":{"type":"number","minimum":0},"build_reserve_usd":{"type":"number","minimum":0},"max_build_seconds":{"type":"integer","minimum":0}},"key$":"budget"},"environment":{"type":"object","additionalProperties":true,"key$":"environment"},"model_provider":{"type":"string","deprecated":true,"key$":"model_provider"},"model":{"type":"string","deprecated":true,"key$":"model"},"base_ref":{"type":"string","deprecated":true,"key$":"base_ref"},"concurrency_key":{"type":"string","deprecated":true,"key$":"concurrency_key"},"task_template_json":{"type":"string","deprecated":true,"key$":"task_template_json"},"queued_at":{"type":"string","format":"date-time","deprecated":true,"key$":"queued_at"},"tasks":{"type":"array","items":{"type":"object","required":["prompt"],"properties":{"repo_url":{"type":"string","format":"uri"},"prompt":{"type":"string"},"title":{"type":"string"},"role":{"type":"string","enum":[]},"owned_paths":{"type":"array","items":{}},"acceptance_commands":{"type":"array","items":{}},"depends_on":{"type":"array","items":{}},"stack_after":{"type":"integer","minimum":0,"nullable":true},"environment_profile":{"type":"string"},"harness":{"type":"string","enum":[]}},"x-ref":"#/components/schemas/AgentSwarmTaskCreatePayload"},"key$":"tasks"}},"additionalProperties":true,"x-ref":"#/components/schemas/AgentSwarmCreatePayload"}}}},"parameters":[]},"GET /api/v1/agent/swarms":{"protocol":"http","parameters":[{"name":"org","in":"query","required":true,"description":"Organization slug. Swarms belong to one organization and the list is read under one.","schema":{"type":"string"},"index$":0},{"name":"page","in":"query","required":false,"description":"1-based page number. The list is paginated because counting tasks for every swarm is not free.","schema":{"type":"integer","minimum":1},"index$":1},{"name":"per_page","in":"query","required":false,"description":"Swarms per page, 1 to 100. Defaults to 25.","schema":{"type":"integer","minimum":1,"maximum":100},"index$":2}]},"GET /api/v1/agent/swarms/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/agent/swarms/{id}/live":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/agent/swarms/{id}/policy":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/agent/swarms/{id}/policy":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["policy"],"properties":{"policy":{"type":"object","additionalProperties":true}}}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_swarm.create.0":"GET-only live run: needs POST /api/v1/agent/swarms/{id}/cancel","agent_swarm.update.2":"GET-only live run: needs PATCH /api/v1/agent/swarms/{id}/policy"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_swarm_ref01_ent = client.AgentSwarm()
    let agent_swarm_ref01_data = setup.data.new.agent_swarm['agent_swarm_ref01']

    agent_swarm_ref01_data = (await agent_swarm_ref01_ent.create(agent_swarm_ref01_data)).data()
    assert(null != agent_swarm_ref01_data.id)


    // LIST
    const agent_swarm_ref01_match: any = {}

    const agent_swarm_ref01_list = (await agent_swarm_ref01_ent.list(agent_swarm_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(agent_swarm_ref01_list, { id: agent_swarm_ref01_data.id })))


    // LOAD
    const agent_swarm_ref01_match_dt0: any = {}
    agent_swarm_ref01_match_dt0.id = agent_swarm_ref01_data.id
    const agent_swarm_ref01_data_dt0 = (await agent_swarm_ref01_ent.load(agent_swarm_ref01_match_dt0)).data()
    assert(agent_swarm_ref01_data_dt0.id === agent_swarm_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_swarm/AgentSwarmTestData.json')

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
    ['agent_swarm01','agent_swarm02','agent_swarm03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_SWARM_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_SWARM_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_SWARM_ENTID']
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
  
