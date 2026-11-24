

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


describe('AutomationRunEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AutomationRun()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AutomationRun().create({"agent_id":1,"automation_id":"x","organization_id":"x","input":"x","request_id":"x","version_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'automation_run.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action":{"a":true,"h":"Action","n":"action","r":true,"t":"`$STRING`","key$":"action","index$":0},"automation":{"a":true,"h":"Automation","n":"automation","r":true,"sh":"Saved native automation identity.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"automation","index$":1},"budget_seconds":{"a":true,"h":"Budget Seconds","n":"budget_seconds","r":true,"sh":"The run stops once it has been running this long","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"budget_seconds","index$":2},"budget_usd":{"a":true,"h":"Budget Usd","n":"budget_usd","r":true,"sh":"The run stops before a step once it has spent this much","t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"budget_usd","index$":3},"can_answer":{"a":true,"h":"Can Answer","n":"can_answer","r":true,"sh":"Whether this viewer can answer the step that stopped the run; the answer runs that step again","t":"`$BOOLEAN`","key$":"can_answer","index$":4},"can_approve":{"a":true,"h":"Can Approve","n":"can_approve","r":true,"sh":"Whether this viewer can approve or decline the checkpoint the run waits at; only a person can approve one","t":"`$BOOLEAN`","key$":"can_approve","index$":5},"can_dismiss":{"a":true,"h":"Can Dismiss","n":"can_dismiss","r":true,"sh":"Whether this viewer can dismiss the run waiting for them, which ends it unanswered","t":"`$BOOLEAN`","key$":"can_dismiss","index$":6},"checkpoint":{"a":true,"h":"Checkpoint","n":"checkpoint","r":true,"sh":"The question a run waiting at a checkpoint is asking","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"checkpoint","index$":7},"conversation_id":{"a":true,"h":"Conversation Id","n":"conversation_id","r":true,"sh":"The thread the run works in, which the person opens to follow it","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"conversation_id","index$":8},"decision_history":{"a":true,"h":"Decision History","n":"decision_history","r":true,"t":"`$OBJECT`","key$":"decision_history","index$":9},"error":{"a":true,"h":"Error","n":"error","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error","index$":10},"finished_at":{"a":true,"h":"Finished At","n":"finished_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at","index$":11},"flow_steps":{"a":true,"h":"Flow Steps","n":"flow_steps","r":true,"sh":"How the run went at each step of its workflow file, in the order it reached them; null when steps were recorded without their step of the file","t":["`$ONE`",["`$ARRAY`","`$NULL`"]],"key$":"flow_steps","index$":12},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":13},"input":{"a":true,"h":"Input","n":"input","r":true,"t":"`$OBJECT`","key$":"input","index$":14},"needs_you":{"a":true,"h":"Needs You","n":"needs_you","r":true,"sh":"Whether a step stopped the run for the person, who can answer it","t":"`$BOOLEAN`","key$":"needs_you","index$":15},"note":{"a":true,"h":"Note","n":"note","r":true,"sh":"One sentence a workflow step left for the person, which the run's card leads with","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"note","index$":16},"nothing_to_do_reason":{"a":true,"h":"Nothing To Do Reason","n":"nothing_to_do_reason","r":true,"sh":"Why a run that succeeded did no work, as the step that found nothing to do said; null otherwise.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"nothing_to_do_reason","index$":17},"request_id":{"a":true,"fo":"uuid","h":"Request Id","n":"request_id","r":true,"t":"`$STRING`","key$":"request_id","index$":18},"resume_count":{"a":true,"h":"Resume Count","n":"resume_count","r":true,"sh":"How many times the run went on from a checkpoint; it tells one pause from the next, even at the same checkpoint","t":"`$INTEGER`","key$":"resume_count","index$":19},"retry_step_id":{"a":true,"h":"Retry Step Id","n":"retry_step_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"retry_step_id","index$":20},"running_seconds":{"a":true,"h":"Running Seconds","n":"running_seconds","r":true,"sh":"How long the run has been running, not counting time waiting at a checkpoint or for a retry","t":"`$INTEGER`","key$":"running_seconds","index$":21},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":22},"spent_tokens":{"a":true,"h":"Spent Tokens","n":"spent_tokens","r":true,"sh":"The tokens the run's agent steps have used so far","t":"`$INTEGER`","key$":"spent_tokens","index$":23},"spent_usd":{"a":true,"h":"Spent Usd","n":"spent_usd","r":true,"sh":"What the run's agent steps have cost so far, as the agent reported it","t":"`$NUMBER`","key$":"spent_usd","index$":24},"stalled":{"a":true,"h":"Stalled","n":"stalled","r":true,"sh":"Whether a running run has had no sign of its worker for five minutes; it continues if the worker comes back","t":"`$BOOLEAN`","key$":"stalled","index$":25},"started_at":{"a":true,"h":"Started At","n":"started_at","r":true,"t":"`$STRING`","key$":"started_at","index$":26},"started_by":{"a":true,"h":"Started By","n":"started_by","r":true,"sh":"The event that started the run","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"started_by","index$":27},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":28},"step_count":{"a":true,"h":"Step Count","n":"step_count","r":true,"t":"`$INTEGER`","key$":"step_count","index$":29},"steps":{"a":true,"h":"Steps","n":"steps","r":true,"t":"`$ARRAY`","key$":"steps","index$":30},"trigger_id":{"a":true,"h":"Trigger Id","n":"trigger_id","r":true,"sh":"The run settings that started it, for a run an event or schedule started","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"trigger_id","index$":31},"version_id":{"a":true,"h":"Version Id","n":"version_id","r":true,"t":"`$STRING`","key$":"version_id","index$":32},"wake_at":{"a":true,"h":"Wake At","n":"wake_at","r":true,"sh":"When a sleeping run's step looks again","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"wake_at","index$":33},"workflow_digest":{"a":true,"h":"Workflow Digest","n":"workflow_digest","r":true,"sh":"SHA-256 of the immutable definition this run uses","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"workflow_digest","index$":34},"workflow_path":{"a":true,"h":"Workflow Path","n":"workflow_path","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"workflow_path","index$":35}},"id":{"field":"id","name":"id"},"name":"automation_run","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["input","request_id","version_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/runs","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"automation_id","or":"automation_key","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/runs","q":{"exist":["agent_id","automation_id","organization_id"]},"r":{"param":{"automation_key":"automation_id","id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"automations"},{"var":"automation_id"},{"lit":"runs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"automation_run","name__orig":"automation_run","Name":"AutomationRun","name_":"automation_run","name-":"automation-run","NAME":"AUTOMATION_RUN","index$":72}, {"active":true,"entity":"automation_run","key$":"BasicAutomationRunFlow","kind":"basic","name":"BasicAutomationRunFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"automation_run_ref01"},"m":{"agent_id":"agent01","automation_id":"automation01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'AutomationRun', {"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/runs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version_id","request_id","input"],"properties":{"version_id":{"type":"string","key$":"version_id"},"request_id":{"type":"string","format":"uuid","key$":"request_id"},"input":{"type":"object","additionalProperties":true,"key$":"input"}},"additionalProperties":true,"x-ref":"#/components/schemas/AgentAutomationRunRequest"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"automation_key","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"automation_run.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/automations/{automation_key}/runs"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const automation_run_ref01_ent = client.AutomationRun()
    let automation_run_ref01_data = setup.data.new.automation_run['automation_run_ref01']
    automation_run_ref01_data['agent_id'] = setup.idmap['agent01']
    automation_run_ref01_data['automation_id'] = setup.idmap['automation01']
    automation_run_ref01_data['organization_id'] = setup.idmap['organization01']

    automation_run_ref01_data = (await automation_run_ref01_ent.create(automation_run_ref01_data)).data()
    assert(null != automation_run_ref01_data.id)


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
      '../../../../.sdk/test/entity/automation_run/AutomationRunTestData.json')

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
    ['automation_run01','automation_run02','automation_run03','organization01','organization02','organization03','agent01','agent02','agent03','automation01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AUTOMATION_RUN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AUTOMATION_RUN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AUTOMATION_RUN_ENTID']
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
  
