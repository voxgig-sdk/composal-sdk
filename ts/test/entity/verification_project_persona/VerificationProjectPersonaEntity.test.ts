

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


describe('VerificationProjectPersonaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.VerificationProjectPersona()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VerificationProjectPersona().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'verification_project_persona.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access_mode":{"a":true,"h":"Access Mode","n":"access_mode","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"access_mode","index$":0},"archived_at":{"a":true,"fo":"date-time","h":"Archived At","n":"archived_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"archived_at","index$":1},"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"capabilities","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":3},"credential_id":{"a":true,"h":"Credential Id","n":"credential_id","op":{"create":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]},"patch":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]},"update":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":true,"sh":"The credential this persona signs in with.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"credential_id","index$":4},"goals":{"a":true,"h":"Goals","n":"goals","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"goals","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"lock_version":{"a":true,"h":"Lock Version","n":"lock_version","r":true,"t":"`$INTEGER`","key$":"lock_version","index$":7},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":8},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"t":"`$STRING`","key$":"project_id","index$":9},"role":{"a":true,"h":"Role","n":"role","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"role","index$":10},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":11},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":12}},"id":{"field":"id","name":"id"},"name":"verification_project_persona","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["version"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive","q":{"$action":"archive","exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"personas"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["access_mode","capabilities","credential_id","goals","name","role"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"personas"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"personas"}],"t":{"req":"`reqdata`","res":"`body.personas`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"personas"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["access_mode","capabilities","credential_id","goals","name","role","version"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"personas"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"bf":["version"],"co":{"id":"DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"personas"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["access_mode","capabilities","credential_id","goals","name","role","version"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"personas"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"verification_project_persona","name__orig":"verification_project_persona","Name":"VerificationProjectPersona","name_":"verification_project_persona","name-":"verification-project-persona","NAME":"VERIFICATION_PROJECT_PERSONA","index$":536}, {"active":true,"entity":"verification_project_persona","key$":"BasicVerificationProjectPersonaFlow","kind":"basic","name":"BasicVerificationProjectPersonaFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"verification_project_persona_ref01"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"verification_project_persona_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01","project_id":"project01"},"i":{"ref":"verification_project_persona_ref01","srcdatavar":"verification_project_persona_ref01_data","suffix":"_up0","textfield":"access_mode"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-verification_project_persona_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"verification_project_persona_ref01","srcdatavar":"verification_project_persona_ref01_data","suffix":"_dt0"},"m":{"id":"verification_project_persona01","organization_id":"organization01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-verification_project_persona_ref01"}}],"index$":3,"route":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","record":{"project_id":"project_id"}},{"a":true,"d":{},"i":{"ref":"verification_project_persona_ref01","suffix":"_rm0"},"m":{"id":"verification_project_persona01","organization_id":"organization01","project_id":"project01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"verification_project_persona_ref01"}}],"index$":5}]}, 'VerificationProjectPersona', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version"],"properties":{"version":{"type":"integer","minimum":0}},"additionalProperties":true,"x-ref":"#/components/schemas/RecordVersion"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","role"],"properties":{"name":{"type":"string","maxLength":160,"key$":"name"},"role":{"type":"string","maxLength":255,"key$":"role"},"goals":{"type":"string","maxLength":4000,"key$":"goals"},"capabilities":{"type":"string","maxLength":4000,"key$":"capabilities"},"credential_id":{"description":"The credential this persona signs in with. Without one, a run chooses from the project's credentials.","type":["string","null"],"key$":"credential_id"},"access_mode":{"type":"string","enum":["anonymous","account","signup"],"key$":"access_mode"}},"additionalProperties":true,"x-ref":"#/components/schemas/PersonaCreate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version"],"properties":{"name":{"type":"string","maxLength":160,"key$":"name"},"role":{"type":"string","maxLength":255,"key$":"role"},"goals":{"type":"string","maxLength":4000,"key$":"goals"},"capabilities":{"type":"string","maxLength":4000,"key$":"capabilities"},"credential_id":{"description":"The credential this persona signs in with. Without one, a run chooses from the project's credentials.","type":["string","null"],"key$":"credential_id"},"access_mode":{"type":"string","enum":["anonymous","account","signup"],"key$":"access_mode"},"version":{"type":"integer","minimum":0,"key$":"version"}},"additionalProperties":true,"x-ref":"#/components/schemas/PersonaUpdate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version"],"properties":{"version":{"type":"integer","minimum":0}},"x-ref":"#/components/schemas/RecordVersion"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["version"],"properties":{"name":{"type":"string","maxLength":160,"key$":"name"},"role":{"type":"string","maxLength":255,"key$":"role"},"goals":{"type":"string","maxLength":4000,"key$":"goals"},"capabilities":{"type":"string","maxLength":4000,"key$":"capabilities"},"credential_id":{"description":"The credential this persona signs in with. Without one, a run chooses from the project's credentials.","type":["string","null"],"key$":"credential_id"},"access_mode":{"type":"string","enum":["anonymous","account","signup"],"key$":"access_mode"},"version":{"type":"integer","minimum":0,"key$":"version"}},"additionalProperties":true,"x-ref":"#/components/schemas/PersonaUpdate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"verification_project_persona.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}/archive","verification_project_persona.update.2":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","verification_project_persona.remove.4":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/personas/{id}","verification_project_persona.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const verification_project_persona_ref01_ent = client.VerificationProjectPersona()
    let verification_project_persona_ref01_data = setup.data.new.verification_project_persona['verification_project_persona_ref01']
    verification_project_persona_ref01_data['organization_id'] = setup.idmap['organization01']
    verification_project_persona_ref01_data['project_id'] = setup.idmap['project01']

    verification_project_persona_ref01_data = (await verification_project_persona_ref01_ent.create(verification_project_persona_ref01_data)).data()
    assert(null != verification_project_persona_ref01_data.id)


    // LIST
    const verification_project_persona_ref01_match: any = {}
    verification_project_persona_ref01_match['organization_id'] = setup.idmap['organization01']
    verification_project_persona_ref01_match['project_id'] = setup.idmap['project01']

    const verification_project_persona_ref01_list = (await verification_project_persona_ref01_ent.list(verification_project_persona_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(verification_project_persona_ref01_list, { id: verification_project_persona_ref01_data.id })))


    // UPDATE
    const verification_project_persona_ref01_data_up0: any = {}
    verification_project_persona_ref01_data_up0.id = verification_project_persona_ref01_data.id
    verification_project_persona_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    verification_project_persona_ref01_data_up0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']

    const verification_project_persona_ref01_markdef_up0 = { name: 'access_mode', value: 'Mark01-verification_project_persona_ref01_' + setup.now }
    ;(verification_project_persona_ref01_data_up0 as any)[verification_project_persona_ref01_markdef_up0.name] = verification_project_persona_ref01_markdef_up0.value

    const verification_project_persona_ref01_resdata_up0 = (await verification_project_persona_ref01_ent.update(verification_project_persona_ref01_data_up0)).data()
    assert(verification_project_persona_ref01_resdata_up0.id === verification_project_persona_ref01_data_up0.id)

    assert((verification_project_persona_ref01_resdata_up0 as any)[verification_project_persona_ref01_markdef_up0.name] === verification_project_persona_ref01_markdef_up0.value)


    // LOAD
    const verification_project_persona_ref01_match_dt0: any = {}
    verification_project_persona_ref01_match_dt0.id = verification_project_persona_ref01_data.id
    verification_project_persona_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    verification_project_persona_ref01_match_dt0['project_id'] = ['string', 'number', 'boolean'].includes(typeof verification_project_persona_ref01_data['project_id']) ?
      verification_project_persona_ref01_data['project_id'] : setup.idmap['project_id'] ?? setup.idmap['project01']
    const verification_project_persona_ref01_data_dt0 = (await verification_project_persona_ref01_ent.load(verification_project_persona_ref01_match_dt0)).data()
    assert(verification_project_persona_ref01_data_dt0.id === verification_project_persona_ref01_data.id)


    // REMOVE
    const verification_project_persona_ref01_match_rm0: any = { id: verification_project_persona_ref01_data.id }
    verification_project_persona_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    verification_project_persona_ref01_match_rm0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    await verification_project_persona_ref01_ent.remove(verification_project_persona_ref01_match_rm0)
  

    // LIST
    const verification_project_persona_ref01_match_rt0: any = {}
    verification_project_persona_ref01_match_rt0['organization_id'] = setup.idmap['organization01']
    verification_project_persona_ref01_match_rt0['project_id'] = setup.idmap['project01']

    const verification_project_persona_ref01_list_rt0 = (await verification_project_persona_ref01_ent.list(verification_project_persona_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(verification_project_persona_ref01_list_rt0, { id: verification_project_persona_ref01_data.id })))


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
      '../../../../.sdk/test/entity/verification_project_persona/VerificationProjectPersonaTestData.json')

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
    ['verification_project_persona01','verification_project_persona02','verification_project_persona03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_VERIFICATION_PROJECT_PERSONA_ENTID']
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
  
