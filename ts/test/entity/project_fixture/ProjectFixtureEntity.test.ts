

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


describe('ProjectFixtureEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProjectFixture()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectFixture().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_fixture.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"assignments":{"a":true,"h":"Assignments","n":"assignments","r":true,"sh":"Every assignment with its target's name, including targets archived or disabled since.","t":"`$ARRAY`","key$":"assignments","index$":0},"byte_size":{"a":true,"h":"Byte Size","n":"byte_size","r":true,"t":"`$INTEGER`","key$":"byte_size","index$":1},"content_type":{"a":true,"h":"Content Type","n":"content_type","r":true,"t":"`$STRING`","key$":"content_type","index$":2},"credential_ids":{"a":true,"h":"Credential Ids","n":"credential_ids","op":{"patch":{"req":false,"type":"`$ARRAY`"},"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"credential_ids","index$":3},"credentials":{"a":true,"h":"Credentials","n":"credentials","r":true,"t":"`$ARRAY`","key$":"credentials","index$":4},"environment_ids":{"a":true,"h":"Environment Ids","n":"environment_ids","op":{"patch":{"req":false,"type":"`$ARRAY`"},"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"environment_ids","index$":5},"environments":{"a":true,"h":"Environments","n":"environments","r":true,"t":"`$ARRAY`","key$":"environments","index$":6},"fixtures":{"a":true,"h":"Fixtures","n":"fixtures","r":true,"t":"`$ARRAY`","key$":"fixtures","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":8},"lock_version":{"a":true,"h":"Lock Version","n":"lock_version","r":true,"t":"`$INTEGER`","key$":"lock_version","index$":9},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":10},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":3},"key$":"pagination","index$":11},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":12},"persona_ids":{"a":true,"h":"Persona Ids","n":"persona_ids","op":{"patch":{"req":false,"type":"`$ARRAY`"},"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"t":"`$ARRAY`","key$":"persona_ids","index$":13},"personas":{"a":true,"h":"Personas","n":"personas","r":true,"t":"`$ARRAY`","key$":"personas","index$":14},"project":{"a":true,"h":"Project","n":"project","r":true,"t":"`$OBJECT`","key$":"project","index$":15},"sha256":{"a":true,"h":"Sha256","n":"sha256","r":true,"t":"`$STRING`","key$":"sha256","index$":16},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"t":"`$STRING`","key$":"url","index$":17},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":18}},"id":{"field":"id","name":"id"},"name":"project_fixture","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures","q":{"exist":["organization_id","project_id"]},"r":{},"rb":{"alternatives":[{"fields":[{"binary":true,"name":"file"}],"kind":"multipart","media":"multipart/form-data"}],"kind":"json","media":"application/json"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"fixtures"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"credential_id","or":"credential_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"environment_id","or":"environment_id","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"explode":true,"k":"query","n":"persona_id","or":"persona_id","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures","q":{"exist":["organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"fixtures"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"fixtures"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["credential_ids","environment_ids","name","persona_ids","version"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"fixtures"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"version","or":"version","r":true,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","q":{"exist":["id","organization_id","project_id","version"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"fixtures"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["credential_ids","environment_ids","name","persona_ids","version"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"fixtures"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"project_fixture","name__orig":"project_fixture","Name":"ProjectFixture","name_":"project_fixture","name-":"project-fixture","NAME":"PROJECT_FIXTURE","index$":166}, {"active":true,"entity":"project_fixture","key$":"BasicProjectFixtureFlow","kind":"basic","name":"BasicProjectFixtureFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_fixture_ref01"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"project_fixture_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01","project_id":"project01"},"i":{"ref":"project_fixture_ref01","srcdatavar":"project_fixture_ref01_data","suffix":"_up0","textfield":"content_type"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_fixture_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"project_fixture_ref01","srcdatavar":"project_fixture_ref01_data","suffix":"_dt0"},"m":{"id":"project_fixture01","organization_id":"organization01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_fixture_ref01"}}],"index$":3,"route":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"project_fixture_ref01","suffix":"_rm0"},"m":{"id":"project_fixture01","organization_id":"organization01","project_id":"project01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"project_fixture_ref01"}}],"index$":5}]}, 'ProjectFixture', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}},"multipart/form-data":{"schema":{"type":"object","required":["file"],"properties":{"file":{"type":"string","format":"binary","description":"At most 25 MiB"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"q","in":"query","schema":{"type":"string","maxLength":200},"index$":2},{"name":"page","in":"query","schema":{"type":"integer","minimum":1},"index$":3},{"name":"persona_id","in":"query","description":"Only files assigned to this persona","schema":{"type":"string"},"index$":4},{"name":"credential_id","in":"query","description":"Only files assigned to this credential","schema":{"type":"string"},"index$":5},{"name":"environment_id","in":"query","description":"Only files assigned to this environment","schema":{"type":"string"},"index$":6}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version"],"description":"Each assignment list that is sent replaces that kind of assignment; omitted lists are kept.","properties":{"version":{"type":"integer","key$":"version"},"name":{"type":"string","maxLength":255,"key$":"name"},"persona_ids":{"type":"array","items":{"type":"string"},"key$":"persona_ids"},"credential_ids":{"type":"array","items":{"type":"string"},"key$":"credential_ids"},"environment_ids":{"type":"array","items":{"type":"string"},"key$":"environment_ids"}},"additionalProperties":true,"x-ref":"#/components/schemas/VerifyFixtureUpdate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"version","in":"query","required":true,"schema":{"type":"integer"},"index$":3}]},"PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version"],"description":"Each assignment list that is sent replaces that kind of assignment; omitted lists are kept.","properties":{"version":{"type":"integer","key$":"version"},"name":{"type":"string","maxLength":255,"key$":"name"},"persona_ids":{"type":"array","items":{"type":"string"},"key$":"persona_ids"},"credential_ids":{"type":"array","items":{"type":"string"},"key$":"credential_ids"},"environment_ids":{"type":"array","items":{"type":"string"},"key$":"environment_ids"}},"additionalProperties":true,"x-ref":"#/components/schemas/VerifyFixtureUpdate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"project_fixture.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures","project_fixture.update.2":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","project_fixture.remove.4":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/fixtures/{id}","project_fixture.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_fixture_ref01_ent = client.ProjectFixture()
    let project_fixture_ref01_data = setup.data.new.project_fixture['project_fixture_ref01']
    project_fixture_ref01_data['organization_id'] = setup.idmap['organization01']
    project_fixture_ref01_data['project_id'] = setup.idmap['project01']

    project_fixture_ref01_data = (await project_fixture_ref01_ent.create(project_fixture_ref01_data)).data()
    assert(null != project_fixture_ref01_data.id)


    // LIST
    const project_fixture_ref01_match: any = {}
    project_fixture_ref01_match['organization_id'] = setup.idmap['organization01']
    project_fixture_ref01_match['project_id'] = setup.idmap['project01']

    const project_fixture_ref01_list = (await project_fixture_ref01_ent.list(project_fixture_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(project_fixture_ref01_list, { id: project_fixture_ref01_data.id })))


    // UPDATE
    const project_fixture_ref01_data_up0: any = {}
    project_fixture_ref01_data_up0.id = project_fixture_ref01_data.id
    project_fixture_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    project_fixture_ref01_data_up0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']

    const project_fixture_ref01_markdef_up0 = { name: 'content_type', value: 'Mark01-project_fixture_ref01_' + setup.now }
    ;(project_fixture_ref01_data_up0 as any)[project_fixture_ref01_markdef_up0.name] = project_fixture_ref01_markdef_up0.value

    const project_fixture_ref01_resdata_up0 = (await project_fixture_ref01_ent.update(project_fixture_ref01_data_up0)).data()
    assert(project_fixture_ref01_resdata_up0.id === project_fixture_ref01_data_up0.id)

    assert((project_fixture_ref01_resdata_up0 as any)[project_fixture_ref01_markdef_up0.name] === project_fixture_ref01_markdef_up0.value)


    // LOAD
    const project_fixture_ref01_match_dt0: any = {}
    project_fixture_ref01_match_dt0.id = project_fixture_ref01_data.id
    project_fixture_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    project_fixture_ref01_match_dt0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    const project_fixture_ref01_data_dt0 = (await project_fixture_ref01_ent.load(project_fixture_ref01_match_dt0)).data()
    assert(project_fixture_ref01_data_dt0.id === project_fixture_ref01_data.id)


    // REMOVE
    const project_fixture_ref01_match_rm0: any = { id: project_fixture_ref01_data.id }
    project_fixture_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    project_fixture_ref01_match_rm0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    await project_fixture_ref01_ent.remove(project_fixture_ref01_match_rm0)
  

    // LIST
    const project_fixture_ref01_match_rt0: any = {}
    project_fixture_ref01_match_rt0['organization_id'] = setup.idmap['organization01']
    project_fixture_ref01_match_rt0['project_id'] = setup.idmap['project01']

    const project_fixture_ref01_list_rt0 = (await project_fixture_ref01_ent.list(project_fixture_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(project_fixture_ref01_list_rt0, { id: project_fixture_ref01_data.id })))


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
      '../../../../.sdk/test/entity/project_fixture/ProjectFixtureTestData.json')

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
    ['project_fixture01','project_fixture02','project_fixture03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PROJECT_FIXTURE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PROJECT_FIXTURE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PROJECT_FIXTURE_ENTID']
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
  
