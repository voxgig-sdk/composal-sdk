

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


describe('ExplorationScenarioEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ExplorationScenario()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ExplorationScenario().create({"exploration_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'exploration_scenario.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_filters":{"a":true,"h":"Agent Filters","n":"agent_filters","r":true,"sh":"Status counts and matching agent IDs for every filter in this live snapshot.","t":"`$OBJECT`","key$":"agent_filters","index$":0},"agents":{"a":true,"h":"Agents","n":"agents","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":6},"key$":"agents","index$":1},"can_continue":{"a":true,"h":"Can Continue","n":"can_continue","r":false,"sh":"Whether a finished run can be resumed through the orchestrator.","t":"`$BOOLEAN`","key$":"can_continue","index$":2},"chat_messages":{"a":true,"h":"Chat Messages","n":"chat_messages","r":false,"t":"`$ARRAY`","key$":"chat_messages","index$":3},"concurrency":{"a":true,"h":"Concurrency","n":"concurrency","r":true,"t":"`$INTEGER`","key$":"concurrency","index$":4},"covered_areas":{"a":true,"h":"Covered Areas","n":"covered_areas","r":true,"sh":"Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.","t":"`$ARRAY`","key$":"covered_areas","index$":5},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":6},"deadline_at":{"a":true,"h":"Deadline At","n":"deadline_at","r":true,"t":"`$STRING`","key$":"deadline_at","index$":7},"demo_project":{"a":true,"h":"Demo Project","n":"demo_project","r":true,"sh":"The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"demo_project","index$":8},"ended_early":{"a":true,"h":"Ended Early","n":"ended_early","r":true,"sh":"Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed.","t":"`$BOOLEAN`","key$":"ended_early","index$":9},"environment_id":{"a":true,"h":"Environment Id","n":"environment_id","r":true,"t":"`$STRING`","key$":"environment_id","index$":10},"environment_name":{"a":true,"h":"Environment Name","n":"environment_name","r":true,"t":"`$STRING`","key$":"environment_name","index$":11},"explorer_activity":{"a":true,"h":"Explorer Activity","n":"explorer_activity","r":true,"sh":"What the team is doing now.","t":"`$OBJECT`","key$":"explorer_activity","index$":12},"finding_count":{"a":true,"h":"Finding Count","n":"finding_count","r":true,"sh":"Findings at every priority, locked ones included.","t":"`$INTEGER`","key$":"finding_count","index$":13},"findings":{"a":true,"h":"Findings","n":"findings","r":true,"sh":"Every tester's findings, most severe first, with the checks each one cites.","t":"`$ARRAY`","key$":"findings","index$":14},"findings_fix_prompt":{"a":true,"h":"Findings Fix Prompt","n":"findings_fix_prompt","r":true,"sh":"One coding-agent prompt covering every finding, most severe first.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"findings_fix_prompt","index$":15},"finished_at":{"a":true,"h":"Finished At","n":"finished_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at","index$":16},"goal":{"a":true,"h":"Goal","n":"goal","r":true,"t":"`$STRING`","key$":"goal","index$":17},"huntable_flows":{"a":true,"de":true,"h":"Huntable Flows","n":"huntable_flows","r":true,"sh":"Deprecated alias of scannable_flows, kept for released CLIs.","t":"`$ARRAY`","key$":"huntable_flows","index$":18},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":19},"max_seconds":{"a":true,"h":"Max Seconds","n":"max_seconds","r":true,"t":"`$INTEGER`","key$":"max_seconds","index$":20},"max_testers":{"a":true,"h":"Max Testers","n":"max_testers","r":true,"t":"`$INTEGER`","key$":"max_testers","index$":21},"mode":{"a":true,"h":"Mode","n":"mode","r":false,"t":"`$STRING`","key$":"mode","index$":22},"next_scan_improvements":{"a":true,"h":"Next Scan Improvements","n":"next_scan_improvements","r":true,"sh":"The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan.","t":"`$ARRAY`","key$":"next_scan_improvements","index$":23},"observed_at":{"a":true,"h":"Observed At","n":"observed_at","r":false,"sh":"Time this run snapshot was read; distinct from browser activity timestamps.","t":"`$STRING`","key$":"observed_at","index$":24},"onboarding":{"a":true,"h":"Onboarding","n":"onboarding","r":true,"sh":"Whether this is the workspace's free first discovery, started by setup.","t":"`$BOOLEAN`","key$":"onboarding","index$":25},"paywalled":{"a":true,"h":"Paywalled","n":"paywalled","r":true,"sh":"Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid.","t":"`$BOOLEAN`","key$":"paywalled","index$":26},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":27},"priority_counts":{"a":true,"h":"Priority Counts","n":"priority_counts","r":true,"t":"`$OBJECT`","key$":"priority_counts","index$":28},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"Set when the exploration targets a project environment.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"project_id","index$":29},"related_explorations":{"a":true,"h":"Related Explorations","n":"related_explorations","r":true,"t":"`$ARRAY`","key$":"related_explorations","index$":30},"report":{"a":true,"h":"Report","n":"report","r":true,"t":"`$OBJECT`","key$":"report","index$":31},"reproduction_of":{"a":true,"h":"Reproduction Of","n":"reproduction_of","r":true,"sh":"The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"reproduction_of","index$":32},"reproductions":{"a":true,"h":"Reproductions","n":"reproductions","r":true,"sh":"Fresh-browser reruns of this scan's reported bugs.","t":"`$ARRAY`","key$":"reproductions","index$":33},"saves_scenarios":{"a":true,"h":"Saves Scenarios","n":"saves_scenarios","r":true,"sh":"Whether this exploration has started saving scenarios.","t":"`$BOOLEAN`","key$":"saves_scenarios","index$":34},"scannable_flows":{"a":true,"h":"Scannable Flows","n":"scannable_flows","r":true,"sh":"Flows a finished exploration recorded that deep scans can start from.","t":"`$ARRAY`","key$":"scannable_flows","index$":35},"scenario_generation":{"a":true,"h":"Scenario Generation","n":"scenario_generation","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":2,"depth":6},"key$":"scenario_generation","index$":36},"sign_in_needs_answer":{"a":true,"h":"Sign In Needs Answer","n":"sign_in_needs_answer","r":true,"sh":"Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again.","t":"`$BOOLEAN`","key$":"sign_in_needs_answer","index$":37},"sign_in_outcome":{"a":true,"h":"Sign In Outcome","n":"sign_in_outcome","r":true,"sh":"A sign-in check's outcome; null for other runs.","t":"`$STRING`","key$":"sign_in_outcome","index$":38},"sign_in_question":{"a":true,"h":"Sign In Question","n":"sign_in_question","r":false,"sh":"What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sign_in_question","index$":39},"startup_retryable":{"a":true,"h":"Startup Retryable","n":"startup_retryable","r":false,"sh":"Failed browser startup can be retried without extending the original deadline or tester budget.","t":"`$BOOLEAN`","key$":"startup_retryable","index$":40},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":41},"time_limit_reached":{"a":true,"h":"Time Limit Reached","n":"time_limit_reached","r":true,"sh":"Whether a partial run ended because it used its whole time budget, rather than stopping early.","t":"`$BOOLEAN`","key$":"time_limit_reached","index$":42},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`.","t":"`$STRING`","key$":"title","index$":43},"unlock":{"a":true,"h":"Unlock","n":"unlock","r":true,"sh":"Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page.","t":"`$ANY`","key$":"unlock","index$":44},"web_url":{"a":true,"h":"Web Url","n":"web_url","r":true,"sh":"The run's page in the Composal web app","t":"`$STRING`","key$":"web_url","index$":45}},"id":{"field":"id","name":"id"},"name":"exploration_scenario","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/scenarios","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"exploration_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/explorations/{id}/scenarios","q":{"exist":["exploration_id","organization_id"]},"r":{"param":{"id":"exploration_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"explorations"},{"var":"exploration_id"},{"lit":"scenarios"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.exploration"]]},"key$":"exploration_scenario","name__orig":"exploration_scenario","Name":"ExplorationScenario","name_":"exploration_scenario","name-":"exploration-scenario","NAME":"EXPLORATION_SCENARIO","index$":116}, {"active":true,"entity":"exploration_scenario","key$":"BasicExplorationScenarioFlow","kind":"basic","name":"BasicExplorationScenarioFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"exploration_scenario_ref01"},"m":{"exploration_id":"exploration01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ExplorationScenario', {"POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/scenarios":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"exploration_scenario.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/explorations/{id}/scenarios"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const exploration_scenario_ref01_ent = client.ExplorationScenario()
    let exploration_scenario_ref01_data = setup.data.new.exploration_scenario['exploration_scenario_ref01']
    exploration_scenario_ref01_data['exploration_id'] = setup.idmap['exploration01']
    exploration_scenario_ref01_data['organization_id'] = setup.idmap['organization01']

    exploration_scenario_ref01_data = (await exploration_scenario_ref01_ent.create(exploration_scenario_ref01_data)).data()
    assert(null != exploration_scenario_ref01_data.id)


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
      '../../../../.sdk/test/entity/exploration_scenario/ExplorationScenarioTestData.json')

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
    ['exploration_scenario01','exploration_scenario02','exploration_scenario03','organization01','organization02','organization03','exploration01','exploration02','exploration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_EXPLORATION_SCENARIO_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_EXPLORATION_SCENARIO_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_EXPLORATION_SCENARIO_ENTID']
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
  
