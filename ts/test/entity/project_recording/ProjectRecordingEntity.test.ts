

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


describe('ProjectRecordingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProjectRecording()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectRecording().load({"id":1,"organization_id":"x","project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_recording.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser":{"a":true,"h":"Browser","n":"browser","r":true,"t":"`$OBJECT`","key$":"browser","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"draft":{"a":true,"h":"Draft","n":"draft","r":true,"sh":"Present once drafted.","t":"`$ANY`","key$":"draft","index$":2},"environment_id":{"a":true,"h":"Environment Id","n":"environment_id","r":true,"sh":"The project environment the browser opens.","t":"`$STRING`","key$":"environment_id","index$":3},"error":{"a":true,"h":"Error","n":"error","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error","index$":4},"event_count":{"a":true,"h":"Event Count","n":"event_count","r":true,"t":"`$INTEGER`","key$":"event_count","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"persona_id":{"a":true,"h":"Persona Id","n":"persona_id","r":true,"sh":"The project persona the journey acts as.","t":"`$STRING`","key$":"persona_id","index$":7},"phase":{"a":true,"h":"Phase","n":"phase","r":true,"sh":"What the owner can do now.","t":"`$STRING`","key$":"phase","index$":8},"signed_in_during_recording":{"a":true,"h":"Signed In During Recording","n":"signed_in_during_recording","r":true,"t":"`$BOOLEAN`","key$":"signed_in_during_recording","index$":9},"start_path":{"a":true,"h":"Start Path","n":"start_path","r":false,"sh":"A path on the environment to start at, such as /settings.","t":"`$STRING`","key$":"start_path","index$":10},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":11},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":12}},"id":{"field":"id","name":"id"},"name":"project_recording","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["outcome_hint"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/finish","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/finish","q":{"$action":"finish","exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"recordings"},{"var":"id"},{"lit":"finish"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/redraft","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/redraft","q":{"$action":"redraft","exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"recordings"},{"var":"id"},{"lit":"redraft"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["environment_id","persona_id","start_path"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings","q":{"exist":["organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"recordings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"recordings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"recordings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"project_recording","name__orig":"project_recording","Name":"ProjectRecording","name_":"project_recording","name-":"project-recording","NAME":"PROJECT_RECORDING","index$":172}, {"active":true,"entity":"project_recording","key$":"BasicProjectRecordingFlow","kind":"basic","name":"BasicProjectRecordingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_recording_ref01"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"project_recording_ref01","srcdatavar":"project_recording_ref01_data","suffix":"_dt0"},"m":{"id":"project_recording01","organization_id":"organization01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_recording_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"project_recording_ref01","suffix":"_rm0"},"m":{"id":"project_recording01","organization_id":"organization01","project_id":"project01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'ProjectRecording', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/finish":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"outcome_hint":{"type":"string","maxLength":1000,"description":"What shows the journey worked."}},"additionalProperties":true,"x-ref":"#/components/schemas/ScenarioRecordingFinish"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/redraft":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["persona_id","environment_id"],"properties":{"persona_id":{"type":"string","description":"The project persona the journey acts as.","key$":"persona_id"},"environment_id":{"type":"string","description":"The project environment the browser opens.","key$":"environment_id"},"start_path":{"type":"string","maxLength":500,"description":"A path on the environment to start at, such as /settings. Defaults to its address.","key$":"start_path"}},"additionalProperties":true,"x-ref":"#/components/schemas/ScenarioRecordingCreate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"project_recording.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}/finish","project_recording.load.1":"GET-only live run: reads a record only project_recording.create.0 gives","project_recording.remove.2":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/recordings/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_recording_ref01_ent = client.ProjectRecording()
    let project_recording_ref01_data = setup.data.new.project_recording['project_recording_ref01']
    project_recording_ref01_data['organization_id'] = setup.idmap['organization01']
    project_recording_ref01_data['project_id'] = setup.idmap['project01']

    project_recording_ref01_data = (await project_recording_ref01_ent.create(project_recording_ref01_data)).data()
    assert(null != project_recording_ref01_data.id)


    // LOAD
    const project_recording_ref01_match_dt0: any = {}
    project_recording_ref01_match_dt0.id = project_recording_ref01_data.id
    project_recording_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    project_recording_ref01_match_dt0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    const project_recording_ref01_data_dt0 = (await project_recording_ref01_ent.load(project_recording_ref01_match_dt0)).data()
    assert(project_recording_ref01_data_dt0.id === project_recording_ref01_data.id)


    // REMOVE
    const project_recording_ref01_match_rm0: any = { id: project_recording_ref01_data.id }
    project_recording_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    project_recording_ref01_match_rm0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    await project_recording_ref01_ent.remove(project_recording_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/project_recording/ProjectRecordingTestData.json')

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
    ['project_recording01','project_recording02','project_recording03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PROJECT_RECORDING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PROJECT_RECORDING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PROJECT_RECORDING_ENTID']
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
  
