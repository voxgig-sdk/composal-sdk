

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


describe('SwarmTaskEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SwarmTask()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SwarmTask().list({"swarm_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'swarm_task.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"acceptance_commands":{"a":true,"h":"Acceptance Commands","n":"acceptance_commands","r":true,"t":"`$ARRAY`","key$":"acceptance_commands","index$":0},"agent_swarm_id":{"a":true,"h":"Agent Swarm Id","n":"agent_swarm_id","r":true,"t":"`$STRING`","key$":"agent_swarm_id","index$":1},"assigned_runner_id":{"a":true,"h":"Assigned Runner Id","n":"assigned_runner_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"assigned_runner_id","index$":2},"blocked_reason":{"a":true,"h":"Blocked Reason","n":"blocked_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"blocked_reason","index$":3},"changes":{"a":true,"h":"Changes","n":"changes","r":true,"t":"`$ARRAY`","key$":"changes","index$":4},"commit_count":{"a":true,"h":"Commit Count","n":"commit_count","r":true,"t":"`$INTEGER`","key$":"commit_count","index$":5},"commit_sha_result":{"a":true,"h":"Commit Sha Result","n":"commit_sha_result","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"commit_sha_result","index$":6},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":7},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":8},"current_attempt_id":{"a":true,"h":"Current Attempt Id","n":"current_attempt_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"current_attempt_id","index$":9},"deadline_at":{"a":true,"fo":"date-time","h":"Deadline At","n":"deadline_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"deadline_at","index$":10},"depends_on_task_ids":{"a":true,"h":"Depends On Task Ids","n":"depends_on_task_ids","r":true,"t":"`$ARRAY`","key$":"depends_on_task_ids","index$":11},"depth":{"a":true,"h":"Depth","n":"depth","r":true,"t":"`$INTEGER`","key$":"depth","index$":12},"diff_artifact_url":{"a":true,"fo":"uri","h":"Diff Artifact Url","n":"diff_artifact_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"diff_artifact_url","index$":13},"display_id":{"a":true,"h":"Display Id","n":"display_id","r":true,"t":"`$INTEGER`","key$":"display_id","index$":14},"environment_profile":{"a":true,"h":"Environment Profile","n":"environment_profile","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"environment_profile","index$":15},"error_message":{"a":true,"h":"Error Message","n":"error_message","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error_message","index$":16},"failure_code":{"a":true,"h":"Failure Code","n":"failure_code","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_code","index$":17},"finished_at":{"a":true,"fo":"date-time","h":"Finished At","n":"finished_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at","index$":18},"finished_at_label":{"a":true,"h":"Finished At Label","n":"finished_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at_label","index$":19},"harness":{"a":true,"h":"Harness","n":"harness","r":true,"t":"`$STRING`","key$":"harness","index$":20},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":21},"input_revision":{"a":true,"h":"Input Revision","n":"input_revision","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"input_revision","index$":22},"iteration":{"a":true,"h":"Iteration","n":"iteration","r":true,"t":"`$INTEGER`","key$":"iteration","index$":23},"landing_state":{"a":true,"h":"Landing State","n":"landing_state","r":true,"t":"`$STRING`","key$":"landing_state","index$":24},"model":{"a":true,"h":"Model","n":"model","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"model","index$":25},"model_provider":{"a":true,"h":"Model Provider","n":"model_provider","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"model_provider","index$":26},"number":{"a":true,"h":"Number","n":"number","r":true,"t":"`$INTEGER`","key$":"number","index$":27},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":28},"owned_paths":{"a":true,"h":"Owned Paths","n":"owned_paths","r":true,"t":"`$ARRAY`","key$":"owned_paths","index$":29},"parent_task_id":{"a":true,"h":"Parent Task Id","n":"parent_task_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"parent_task_id","index$":30},"position":{"a":true,"h":"Position","n":"position","r":true,"t":"`$INTEGER`","key$":"position","index$":31},"prompt":{"a":true,"h":"Prompt","n":"prompt","r":true,"t":"`$STRING`","key$":"prompt","index$":32},"queued_at":{"a":true,"fo":"date-time","h":"Queued At","n":"queued_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"queued_at","index$":33},"queued_at_label":{"a":true,"h":"Queued At Label","n":"queued_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"queued_at_label","index$":34},"reasoning_effort":{"a":true,"h":"Reasoning Effort","n":"reasoning_effort","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"reasoning_effort","index$":35},"recent_activity":{"a":true,"h":"Recent Activity","n":"recent_activity","r":true,"t":"`$ARRAY`","key$":"recent_activity","index$":36},"repo_url":{"a":true,"fo":"uri","h":"Repo Url","n":"repo_url","r":true,"t":"`$STRING`","key$":"repo_url","index$":37},"result":{"a":true,"h":"Result","n":"result","r":true,"t":"`$OBJECT`","key$":"result","index$":38},"retry_number":{"a":true,"h":"Retry Number","n":"retry_number","r":true,"t":"`$INTEGER`","key$":"retry_number","index$":39},"role":{"a":true,"h":"Role","n":"role","r":true,"t":"`$STRING`","key$":"role","index$":40},"run_id":{"a":true,"h":"Run Id","n":"run_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"run_id","index$":41},"stack_after_task_id":{"a":true,"h":"Stack After Task Id","n":"stack_after_task_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"stack_after_task_id","index$":42},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at","index$":43},"started_at_label":{"a":true,"h":"Started At Label","n":"started_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at_label","index$":44},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":45},"title":{"a":true,"h":"Title","n":"title","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"title","index$":46},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":47},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":48}},"id":{"field":"id","name":"id"},"name":"swarm_task","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/agent/swarms/{swarm_id}/tasks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"swarm_id","or":"swarm_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent/swarms/{swarm_id}/tasks","q":{"exist":["swarm_id"]},"r":{"param":{"swarm_id":"swarm_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"swarm_id"},{"lit":"tasks"}],"t":{"req":"`reqdata`","res":"`body.tasks`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/activity","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"task_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"swarm_id","or":"swarm_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"after_seq","or":"after_seq","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/activity","q":{"$action":"activity","exist":["id","swarm_id"]},"r":{"param":{"swarm_id":"swarm_id","task_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"swarm_id"},{"lit":"tasks"},{"var":"id"},{"lit":"activity"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"swarm_task","name__orig":"swarm_task","Name":"SwarmTask","name_":"swarm_task","name-":"swarm-task","NAME":"SWARM_TASK","index$":515}, {"active":true,"entity":"swarm_task","key$":"BasicSwarmTaskFlow","kind":"basic","name":"BasicSwarmTaskFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"swarm_id":"swarm01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"swarm_task_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"swarm_task_ref01","srcdatavar":"swarm_task_ref01_data","suffix":"_dt0"},"m":{"id":"swarm_task01","swarm_id":"swarm01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-swarm_task_ref01"}}],"unreachable":true}]}, 'SwarmTask', {"GET /api/v1/agent/swarms/{swarm_id}/tasks":{"protocol":"http","parameters":[{"name":"swarm_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/activity":{"protocol":"http","parameters":[{"name":"swarm_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"task_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"after_seq","in":"query","required":false,"schema":{"type":"integer","minimum":0},"index$":2},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":2000},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let swarm_task_ref01_data = Object.values(setup.data.existing.swarm_task)[0] as any

    // LIST
    const swarm_task_ref01_ent = client.SwarmTask()
    const swarm_task_ref01_match: any = {}
    swarm_task_ref01_match['swarm_id'] = setup.idmap['swarm01']

    const swarm_task_ref01_list = (await swarm_task_ref01_ent.list(swarm_task_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/swarm_task/SwarmTaskTestData.json')

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
    ['swarm_task01','swarm_task02','swarm_task03','swarm01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SWARM_TASK_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SWARM_TASK_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SWARM_TASK_ENTID']
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
  
