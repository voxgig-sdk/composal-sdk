

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


describe('ProjectRunScheduleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProjectRunSchedule()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectRunSchedule().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_run_schedule.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"credential_ids":{"a":true,"h":"Credential Ids","n":"credential_ids","op":{"patch":{"req":false,"type":"`$OBJECT`"},"update":{"req":false,"type":"`$OBJECT`"}},"r":true,"t":"`$OBJECT`","key$":"credential_ids","index$":0},"cron_expression":{"a":true,"h":"Cron Expression","n":"cron_expression","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cron_expression","index$":1},"environment_id":{"a":true,"h":"Environment Id","n":"environment_id","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Project environment slug or public ID.","t":"`$STRING`","key$":"environment_id","index$":2},"environment_name":{"a":true,"h":"Environment Name","n":"environment_name","r":false,"t":"`$STRING`","key$":"environment_name","index$":3},"history":{"a":true,"h":"History","n":"history","r":true,"t":"`$ARRAY`","key$":"history","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"labels":{"a":true,"h":"Labels","n":"labels","op":{"patch":{"req":false,"type":"`$ARRAY`"},"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"labels","index$":6},"lock_version":{"a":true,"h":"Lock Version","n":"lock_version","r":true,"t":"`$INTEGER`","key$":"lock_version","index$":7},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":8},"next_run_at":{"a":true,"fo":"date-time","h":"Next Run At","n":"next_run_at","r":true,"t":"`$STRING`","key$":"next_run_at","index$":9},"notification_channel":{"a":true,"h":"Notification Channel","n":"notification_channel","r":false,"sh":"Email the schedule owner by default; legacy requests with a Slack subscription keep Slack.","t":"`$STRING`","key$":"notification_channel","index$":10},"scenario_count":{"a":true,"h":"Scenario Count","n":"scenario_count","r":true,"t":"`$INTEGER`","key$":"scenario_count","index$":11},"selection_mode":{"a":true,"h":"Selection Mode","n":"selection_mode","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"selection_mode","index$":12},"slack_subscription_id":{"a":true,"h":"Slack Subscription Id","n":"slack_subscription_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"slack_subscription_id","index$":13},"source_scenario_id":{"a":true,"h":"Source Scenario Id","n":"source_scenario_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_scenario_id","index$":14},"state":{"a":true,"h":"State","n":"state","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"state","index$":15},"time_of_day":{"a":true,"h":"Time Of Day","n":"time_of_day","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"time_of_day","index$":16},"time_zone":{"a":true,"h":"Time Zone","n":"time_zone","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"time_zone","index$":17},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":18}},"id":{"field":"id","name":"id"},"name":"project_run_schedule","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["credential_ids","environment_id","labels","name","notification_channel","selection_mode","slack_subscription_id","state","time_of_day","time_zone"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"run_schedules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["labels","selection_mode"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/preview","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/preview","q":{"$action":"preview","exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"run_schedules"},{"lit":"preview"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"run_schedules"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"run_schedules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/lookup","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"name","or":"name","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/lookup","q":{"$action":"lookup","exist":["name","organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"run_schedules"},{"lit":"lookup"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["credential_ids","environment_id","labels","name","notification_channel","selection_mode","slack_subscription_id","state","time_of_day","time_zone","version"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"run_schedules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["credential_ids","environment_id","labels","name","notification_channel","selection_mode","slack_subscription_id","state","time_of_day","time_zone","version"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"run_schedules"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"project_run_schedule","name__orig":"project_run_schedule","Name":"ProjectRunSchedule","name_":"project_run_schedule","name-":"project-run-schedule","NAME":"PROJECT_RUN_SCHEDULE","index$":174}, {"active":true,"entity":"project_run_schedule","key$":"BasicProjectRunScheduleFlow","kind":"basic","name":"BasicProjectRunScheduleFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_run_schedule_ref01"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_run_schedule_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01","project_id":"project01"},"i":{"ref":"project_run_schedule_ref01","srcdatavar":"project_run_schedule_ref01_data","suffix":"_up0","textfield":"cron_expression"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_run_schedule_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"project_run_schedule_ref01","srcdatavar":"project_run_schedule_ref01_data","suffix":"_dt0"},"m":{"id":"project_run_schedule01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_run_schedule_ref01"}}],"index$":3}]}, 'ProjectRunSchedule', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","state","time_of_day","time_zone","credential_ids","environment_id","selection_mode","labels"],"properties":{"name":{"type":"string","key$":"name"},"state":{"type":"string","enum":["active","paused"],"key$":"state"},"time_of_day":{"type":"string","key$":"time_of_day"},"time_zone":{"type":"string","key$":"time_zone"},"credential_ids":{"type":"object","additionalProperties":{"type":"string"},"key$":"credential_ids"},"environment_id":{"type":"string","description":"Project environment slug or public ID.","key$":"environment_id"},"notification_channel":{"type":"string","enum":["email","slack"],"description":"Email the schedule owner by default; legacy requests with a Slack subscription keep Slack.","key$":"notification_channel"},"slack_subscription_id":{"type":"string","nullable":true,"key$":"slack_subscription_id"},"selection_mode":{"type":"string","enum":["all","labels"],"key$":"selection_mode"},"labels":{"type":"array","items":{"type":"string","maxLength":40},"maxItems":20,"key$":"labels"}},"additionalProperties":true,"x-ref":"#/components/schemas/RunScheduleCreate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/preview":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["selection_mode","labels"],"properties":{"selection_mode":{"type":"string","enum":["all","labels"]},"labels":{"type":"array","items":{"type":"string","maxLength":40},"maxItems":20}},"additionalProperties":true,"x-ref":"#/components/schemas/RunScheduleSelection"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/lookup":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"name","in":"query","required":true,"schema":{"type":"string"},"description":"Exact schedule name; ambiguous names require a public ID.","index$":2}]},"PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version"],"properties":{"name":{"type":"string","key$":"name"},"state":{"type":"string","enum":["active","paused"],"key$":"state"},"time_of_day":{"type":"string","key$":"time_of_day"},"time_zone":{"type":"string","key$":"time_zone"},"credential_ids":{"type":"object","additionalProperties":{"type":"string"},"key$":"credential_ids"},"environment_id":{"type":"string","description":"Project environment slug or public ID.","key$":"environment_id"},"notification_channel":{"type":"string","enum":["email","slack"],"description":"Email the schedule owner by default; legacy requests with a Slack subscription keep Slack.","key$":"notification_channel"},"slack_subscription_id":{"type":"string","nullable":true,"key$":"slack_subscription_id"},"version":{"type":"integer","key$":"version"},"selection_mode":{"type":"string","enum":["all","labels"],"key$":"selection_mode"},"labels":{"type":"array","items":{"type":"string","maxLength":40},"maxItems":20,"key$":"labels"}},"additionalProperties":true,"x-ref":"#/components/schemas/RunScheduleUpdate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version"],"properties":{"name":{"type":"string","key$":"name"},"state":{"type":"string","enum":["active","paused"],"key$":"state"},"time_of_day":{"type":"string","key$":"time_of_day"},"time_zone":{"type":"string","key$":"time_zone"},"credential_ids":{"type":"object","additionalProperties":{"type":"string"},"key$":"credential_ids"},"environment_id":{"type":"string","description":"Project environment slug or public ID.","key$":"environment_id"},"notification_channel":{"type":"string","enum":["email","slack"],"description":"Email the schedule owner by default; legacy requests with a Slack subscription keep Slack.","key$":"notification_channel"},"slack_subscription_id":{"type":"string","nullable":true,"key$":"slack_subscription_id"},"version":{"type":"integer","key$":"version"},"selection_mode":{"type":"string","enum":["all","labels"],"key$":"selection_mode"},"labels":{"type":"array","items":{"type":"string","maxLength":40},"maxItems":20,"key$":"labels"}},"additionalProperties":true,"x-ref":"#/components/schemas/RunScheduleUpdate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"project_run_schedule.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules","project_run_schedule.update.2":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/run_schedules/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_run_schedule_ref01_ent = client.ProjectRunSchedule()
    let project_run_schedule_ref01_data = setup.data.new.project_run_schedule['project_run_schedule_ref01']
    project_run_schedule_ref01_data['organization_id'] = setup.idmap['organization01']
    project_run_schedule_ref01_data['project_id'] = setup.idmap['project01']

    project_run_schedule_ref01_data = (await project_run_schedule_ref01_ent.create(project_run_schedule_ref01_data)).data()
    assert(null != project_run_schedule_ref01_data.id)


    // LIST
    const project_run_schedule_ref01_match: any = {}
    project_run_schedule_ref01_match['organization_id'] = setup.idmap['organization01']
    project_run_schedule_ref01_match['project_id'] = setup.idmap['project01']

    const project_run_schedule_ref01_list = (await project_run_schedule_ref01_ent.list(project_run_schedule_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(project_run_schedule_ref01_list, { id: project_run_schedule_ref01_data.id })))


    // UPDATE
    const project_run_schedule_ref01_data_up0: any = {}
    project_run_schedule_ref01_data_up0.id = project_run_schedule_ref01_data.id
    project_run_schedule_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    project_run_schedule_ref01_data_up0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']

    const project_run_schedule_ref01_markdef_up0 = { name: 'cron_expression', value: 'Mark01-project_run_schedule_ref01_' + setup.now }
    ;(project_run_schedule_ref01_data_up0 as any)[project_run_schedule_ref01_markdef_up0.name] = project_run_schedule_ref01_markdef_up0.value

    const project_run_schedule_ref01_resdata_up0 = (await project_run_schedule_ref01_ent.update(project_run_schedule_ref01_data_up0)).data()
    assert(project_run_schedule_ref01_resdata_up0.id === project_run_schedule_ref01_data_up0.id)

    assert((project_run_schedule_ref01_resdata_up0 as any)[project_run_schedule_ref01_markdef_up0.name] === project_run_schedule_ref01_markdef_up0.value)


    // LOAD
    const project_run_schedule_ref01_match_dt0: any = {}
    project_run_schedule_ref01_match_dt0.id = project_run_schedule_ref01_data.id
    project_run_schedule_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const project_run_schedule_ref01_data_dt0 = (await project_run_schedule_ref01_ent.load(project_run_schedule_ref01_match_dt0)).data()
    assert(project_run_schedule_ref01_data_dt0.id === project_run_schedule_ref01_data.id)


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
      '../../../../.sdk/test/entity/project_run_schedule/ProjectRunScheduleTestData.json')

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
    ['project_run_schedule01','project_run_schedule02','project_run_schedule03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PROJECT_RUN_SCHEDULE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PROJECT_RUN_SCHEDULE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PROJECT_RUN_SCHEDULE_ENTID']
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
  
