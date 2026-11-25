

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


describe('DeepScanEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeepScan()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeepScan().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deep_scan.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_id":{"a":true,"h":"Account Id","n":"account_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"account_id","index$":0},"agent_filters":{"a":true,"h":"Agent Filters","n":"agent_filters","r":true,"sh":"Status counts and matching agent IDs for every filter in this live snapshot.","t":"`$OBJECT`","key$":"agent_filters","index$":1},"agents":{"a":true,"h":"Agents","n":"agents","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":1,"depth":6},"key$":"agents","index$":2},"can_continue":{"a":true,"h":"Can Continue","n":"can_continue","r":false,"sh":"Whether a finished run can be resumed through the orchestrator.","t":"`$BOOLEAN`","key$":"can_continue","index$":3},"chat_messages":{"a":true,"h":"Chat Messages","n":"chat_messages","r":false,"t":"`$ARRAY`","key$":"chat_messages","index$":4},"check_count":{"a":true,"h":"Check Count","n":"check_count","r":true,"t":"`$INTEGER`","key$":"check_count","index$":5},"concurrency":{"a":true,"h":"Concurrency","n":"concurrency","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"t":"`$INTEGER`","key$":"concurrency","index$":6},"covered_areas":{"a":true,"h":"Covered Areas","n":"covered_areas","r":true,"sh":"Titles of the testers that reported checks, in team order; areas assigned to testers that never ran are left out.","t":"`$ARRAY`","key$":"covered_areas","index$":7},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":8},"credential_name":{"a":true,"h":"Credential Name","n":"credential_name","r":false,"sh":"The credential the team signed in with, by its saved name if it was deleted; null for public access.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"credential_name","index$":9},"deadline_at":{"a":true,"fo":"date-time","h":"Deadline At","n":"deadline_at","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"When the team's time limit ends.","t":"`$STRING`","key$":"deadline_at","index$":10},"demo_project":{"a":true,"h":"Demo Project","n":"demo_project","r":true,"sh":"The workspace's copy of the demo project, linked from the free first discovery as an example; null for other runs or without one.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"demo_project","index$":11},"duration_ms":{"a":true,"h":"Duration Ms","n":"duration_ms","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"duration_ms","index$":12},"ended_early":{"a":true,"h":"Ended Early","n":"ended_early","r":true,"sh":"Whether a partial run stopped before its team did its work: no tester completed or reported a check and no agent reported a finding, as when the lead stopped at sign-in, or inference failed.","t":"`$BOOLEAN`","key$":"ended_early","index$":13},"environment_id":{"a":true,"h":"Environment Id","n":"environment_id","r":true,"t":"`$STRING`","key$":"environment_id","index$":14},"environment_name":{"a":true,"h":"Environment Name","n":"environment_name","r":true,"t":"`$STRING`","key$":"environment_name","index$":15},"explorer_activity":{"a":true,"h":"Explorer Activity","n":"explorer_activity","r":true,"sh":"What the team is doing now.","t":"`$OBJECT`","key$":"explorer_activity","index$":16},"finding_count":{"a":true,"h":"Finding Count","n":"finding_count","r":true,"sh":"Findings at every priority, locked ones included.","t":"`$INTEGER`","key$":"finding_count","index$":17},"findings":{"a":true,"h":"Findings","n":"findings","r":true,"sh":"Every tester's findings, most severe first, with the checks each one cites.","t":"`$ARRAY`","key$":"findings","index$":18},"findings_fix_prompt":{"a":true,"h":"Findings Fix Prompt","n":"findings_fix_prompt","r":true,"sh":"One coding-agent prompt covering every finding, most severe first.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"findings_fix_prompt","index$":19},"finished_at":{"a":true,"fo":"date-time","h":"Finished At","n":"finished_at","op":{"list":{"req":true,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at","index$":20},"goal":{"a":true,"h":"Goal","n":"goal","r":true,"t":"`$STRING`","key$":"goal","index$":21},"huntable_flows":{"a":true,"de":true,"h":"Huntable Flows","n":"huntable_flows","r":true,"sh":"Deprecated alias of scannable_flows, kept for released CLIs.","t":"`$ARRAY`","key$":"huntable_flows","index$":22},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":23},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":false,"t":"`$STRING`","key$":"idempotency_key","index$":24},"max_seconds":{"a":true,"h":"Max Seconds","n":"max_seconds","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"t":"`$INTEGER`","key$":"max_seconds","index$":25},"max_testers":{"a":true,"h":"Max Testers","n":"max_testers","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"t":"`$INTEGER`","key$":"max_testers","index$":26},"mode":{"a":true,"h":"Mode","n":"mode","r":false,"t":"`$STRING`","key$":"mode","index$":27},"next_scan_improvements":{"a":true,"h":"Next Scan Improvements","n":"next_scan_improvements","r":true,"sh":"The optional setup the first scan's page offers for a better next scan, in order: a test account for a run without one, a repository except for a Deep Scan, and a plan.","t":"`$ARRAY`","key$":"next_scan_improvements","index$":28},"observed_at":{"a":true,"h":"Observed At","n":"observed_at","r":false,"sh":"Time this run snapshot was read; distinct from browser activity timestamps.","t":"`$STRING`","key$":"observed_at","index$":29},"onboarding":{"a":true,"h":"Onboarding","n":"onboarding","r":true,"sh":"Whether this is the workspace's free first discovery, started by setup.","t":"`$BOOLEAN`","key$":"onboarding","index$":30},"paywalled":{"a":true,"h":"Paywalled","n":"paywalled","r":true,"sh":"Whether this is the workspace's included Deep Scan (verify_onboarding_deep_scan), or a rerun of it, while the workspace has not paid.","t":"`$BOOLEAN`","key$":"paywalled","index$":31},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":32},"priority_counts":{"a":true,"h":"Priority Counts","n":"priority_counts","r":true,"t":"`$OBJECT`","key$":"priority_counts","index$":33},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"Set when the exploration targets a project environment.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"project_id","index$":34},"related_explorations":{"a":true,"h":"Related Explorations","n":"related_explorations","r":true,"t":"`$ARRAY`","key$":"related_explorations","index$":35},"report":{"a":true,"h":"Report","n":"report","r":true,"t":"`$OBJECT`","key$":"report","index$":36},"reproduction_of":{"a":true,"h":"Reproduction Of","n":"reproduction_of","r":true,"sh":"The Deep Scan or Discovery and reported bug this scan reruns in a fresh browser.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"reproduction_of","index$":37},"reproductions":{"a":true,"h":"Reproductions","n":"reproductions","r":true,"sh":"Fresh-browser reruns of this scan's reported bugs.","t":"`$ARRAY`","key$":"reproductions","index$":38},"saves_scenarios":{"a":true,"h":"Saves Scenarios","n":"saves_scenarios","r":true,"sh":"Whether this exploration has started saving scenarios.","t":"`$BOOLEAN`","key$":"saves_scenarios","index$":39},"scannable_flows":{"a":true,"h":"Scannable Flows","n":"scannable_flows","r":true,"sh":"Flows a finished exploration recorded that deep scans can start from.","t":"`$ARRAY`","key$":"scannable_flows","index$":40},"scenario_count":{"a":true,"h":"Scenario Count","n":"scenario_count","r":false,"sh":"Scenarios saved from this discovery.","t":"`$INTEGER`","key$":"scenario_count","index$":41},"scenario_generation":{"a":true,"h":"Scenario Generation","n":"scenario_generation","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":2,"depth":6},"key$":"scenario_generation","index$":42},"scenarios_pending":{"a":true,"h":"Scenarios Pending","n":"scenarios_pending","r":false,"sh":"Scenarios are still being prepared, so scenario_count may still grow.","t":"`$BOOLEAN`","key$":"scenarios_pending","index$":43},"sign_in_needs_answer":{"a":true,"h":"Sign In Needs Answer","n":"sign_in_needs_answer","r":true,"sh":"Whether a sign-in check needs the person's answer next: its agent waits in its browser with no reply on the way, or the check ended on an unanswered question and an answer starts the agent again.","t":"`$BOOLEAN`","key$":"sign_in_needs_answer","index$":44},"sign_in_outcome":{"a":true,"h":"Sign In Outcome","n":"sign_in_outcome","r":true,"sh":"A sign-in check's outcome; null for other runs.","t":"`$STRING`","key$":"sign_in_outcome","index$":45},"sign_in_question":{"a":true,"h":"Sign In Question","n":"sign_in_question","r":false,"sh":"What a sign-in check's agent asked the person while it needs their answer; null otherwise and for other runs.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sign_in_question","index$":46},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":true,"t":"`$STRING`","key$":"started_at","index$":47},"startup_retryable":{"a":true,"h":"Startup Retryable","n":"startup_retryable","r":false,"sh":"Failed browser startup can be retried without extending the original deadline or tester budget.","t":"`$BOOLEAN`","key$":"startup_retryable","index$":48},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":49},"time_limit_reached":{"a":true,"h":"Time Limit Reached","n":"time_limit_reached","r":true,"sh":"Whether a partial run ended because it used its whole time budget, rather than stopping early.","t":"`$BOOLEAN`","key$":"time_limit_reached","index$":50},"title":{"a":true,"h":"Title","n":"title","op":{"list":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The page's title; the workspace's included Deep Scan is named for the app it tested, as in `Free scan of acme.example.com`.","t":"`$STRING`","key$":"title","index$":51},"unlock":{"a":true,"h":"Unlock","n":"unlock","r":true,"sh":"Once a paywalled scan ends, whether a paid plan would unlock its locked findings and whether this person may choose one, as on its findings page.","t":"`$ANY`","key$":"unlock","index$":52},"web_url":{"a":true,"h":"Web Url","n":"web_url","r":true,"sh":"The run's page in the Composal web app","t":"`$STRING`","key$":"web_url","index$":53}},"id":{"field":"id","name":"id"},"name":"deep_scan","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["finding_index","idempotency_key"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce","q":{"$action":"reproduce","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"},{"var":"id"},{"lit":"reproduce"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/stop","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/stop","q":{"$action":"stop","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"},{"var":"id"},{"lit":"stop"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["account_id","concurrency","environment_id","goal","idempotency_key","max_seconds","max_testers"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/deep_scans","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/deep_scans","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/deep_scans","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"finding","or":"findings","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"query","or":"query","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/deep_scans","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"}],"t":{"page":{"next":"`body.pagination.next`","total":"`body.pagination.count`"},"req":"`reqdata`","res":"`body.active`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"agent_id","or":"agent_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"evidence","or":"evidence","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"finding_id","or":"finding_id","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/deep_scans/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/agent","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"agent_id","or":"agent_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"finding_id","or":"finding_id","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/agent","q":{"$action":"agent","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"},{"var":"id"},{"lit":"agent"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/context","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/context","q":{"$action":"context","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"},{"var":"id"},{"lit":"context"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"deep_scan","name__orig":"deep_scan","Name":"DeepScan","name_":"deep_scan","name-":"deep-scan","NAME":"DEEP_SCAN","index$":193}, {"active":true,"entity":"deep_scan","key$":"BasicDeepScanFlow","kind":"basic","name":"BasicDeepScanFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"deep_scan_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deep_scan_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"deep_scan_ref01","srcdatavar":"deep_scan_ref01_data","suffix":"_dt0"},"m":{"id":"deep_scan01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-deep_scan_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}","record":{}}]}, 'DeepScan', {"POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["finding_index"],"properties":{"finding_index":{"type":"integer","minimum":0},"idempotency_key":{"type":"string"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":2},{"name":"Idempotency-Key","in":"header","schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/stop":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/verify/deep_scans":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["environment_id","goal"],"properties":{"environment_id":{"type":"string","key$":"environment_id"},"account_id":{"type":"string","nullable":true,"key$":"account_id"},"goal":{"type":"string","minLength":1,"maxLength":4000,"key$":"goal"},"max_seconds":{"type":"integer","minimum":60,"maximum":43200,"default":14400,"key$":"max_seconds"},"max_testers":{"type":"integer","minimum":1,"maximum":200,"default":40,"key$":"max_testers"},"concurrency":{"type":"integer","minimum":1,"maximum":96,"default":20,"key$":"concurrency"},"idempotency_key":{"type":"string","key$":"idempotency_key"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verify/deep_scans":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":1},{"name":"page","in":"query","schema":{"type":"integer","minimum":1},"index$":2},{"name":"query","in":"query","schema":{"type":"string","maxLength":200},"index$":3},{"name":"status","in":"query","schema":{"type":"string","enum":["all","active","completed","partial","canceled"]},"index$":4},{"name":"findings","in":"query","schema":{"type":"string","enum":["all","with_findings"]},"index$":5}]},"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":2},{"name":"evidence","in":"query","description":"Use selected to include evidence file metadata only for the selected agent. Recordings remain available for every agent; report sources are omitted until the full report is requested.","schema":{"type":"string","enum":["selected"]},"index$":3},{"name":"agent_id","in":"query","description":"Agent whose evidence files to include with evidence=selected. Defaults to the first agent in working, attention, queued, completed, stopped, setup order.","schema":{"type":"string"},"index$":4},{"name":"finding_id","in":"query","description":"Finding report ID whose tester's evidence files to include with evidence=selected, taking precedence over agent_id.","schema":{"type":"string"},"index$":5}]},"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/agent":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","schema":{"type":"string"},"index$":2},{"name":"agent_id","in":"query","schema":{"type":"string"},"index$":3},{"name":"finding_id","in":"query","description":"Select the tester that owns this finding, taking precedence over agent_id.","schema":{"type":"string"},"index$":4}]},"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/context":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"deep_scan.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/reproduce"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const deep_scan_ref01_ent = client.DeepScan()
    let deep_scan_ref01_data = setup.data.new.deep_scan['deep_scan_ref01']
    deep_scan_ref01_data['organization_id'] = setup.idmap['organization01']

    deep_scan_ref01_data = (await deep_scan_ref01_ent.create(deep_scan_ref01_data)).data()
    assert(null != deep_scan_ref01_data.id)


    // LIST
    const deep_scan_ref01_match: any = {}
    deep_scan_ref01_match['organization_id'] = setup.idmap['organization01']

    const deep_scan_ref01_list = (await deep_scan_ref01_ent.list(deep_scan_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(deep_scan_ref01_list, { id: deep_scan_ref01_data.id })))


    // LOAD
    const deep_scan_ref01_match_dt0: any = {}
    deep_scan_ref01_match_dt0.id = deep_scan_ref01_data.id
    deep_scan_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const deep_scan_ref01_data_dt0 = (await deep_scan_ref01_ent.load(deep_scan_ref01_match_dt0)).data()
    assert(deep_scan_ref01_data_dt0.id === deep_scan_ref01_data.id)


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
      '../../../../.sdk/test/entity/deep_scan/DeepScanTestData.json')

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
    ['deep_scan01','deep_scan02','deep_scan03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEEP_SCAN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEEP_SCAN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEEP_SCAN_ENTID']
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
  
