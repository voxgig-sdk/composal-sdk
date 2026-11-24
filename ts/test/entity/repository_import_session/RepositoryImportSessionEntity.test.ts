

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


describe('RepositoryImportSessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepositoryImportSession()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepositoryImportSession().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repository_import_session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action_required":{"a":true,"h":"Action Required","n":"action_required","r":false,"t":"`$STRING`","key$":"action_required","index$":0},"authorization_endpoint":{"a":true,"h":"Authorization Endpoint","n":"authorization_endpoint","r":false,"t":"`$STRING`","key$":"authorization_endpoint","index$":1},"can_authorize_github":{"a":true,"h":"Can Authorize Github","n":"can_authorize_github","r":true,"t":"`$BOOLEAN`","key$":"can_authorize_github","index$":2},"client_name":{"a":true,"h":"Client Name","n":"client_name","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"client_name","index$":3},"client_version":{"a":true,"h":"Client Version","n":"client_version","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"client_version","index$":4},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":5},"error_message":{"a":true,"h":"Error Message","n":"error_message","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error_message","index$":6},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":true,"t":"`$STRING`","key$":"expires_at","index$":7},"git_imports":{"a":true,"h":"Git Imports","n":"git_imports","r":true,"t":"`$ARRAY`","key$":"git_imports","index$":8},"github_app_installation_id":{"a":true,"h":"Github App Installation Id","n":"github_app_installation_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"github_app_installation_id","index$":9},"github_connected":{"a":true,"h":"Github Connected","n":"github_connected","r":true,"t":"`$BOOLEAN`","key$":"github_connected","index$":10},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":11},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":true,"t":"`$STRING`","key$":"idempotency_key","index$":12},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":13},"organization_slug":{"a":true,"h":"Organization Slug","n":"organization_slug","r":true,"t":"`$STRING`","key$":"organization_slug","index$":14},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":15},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":16}},"id":{"field":"id","name":"id"},"name":"repository_import_session","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/repository_import_sessions/{id}/authorization","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/repository_import_sessions/{id}/authorization","q":{"$action":"authorization","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"repository_import_sessions"},{"var":"id"},{"lit":"authorization"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["message"],"co":{"id":"POST /api/v1/repository_import_sessions/{id}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/repository_import_sessions/{id}/cancel","q":{"$action":"cancel","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"repository_import_sessions"},{"var":"id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["client_name","client_version","github_app_installation_id","idempotency_key"],"co":{"id":"POST /api/v1/organizations/{organization_id}/repository_import_sessions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/repository_import_sessions","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repository_import_sessions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/repository_import_sessions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/repository_import_sessions/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"repository_import_sessions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"repository_import_session","name__orig":"repository_import_session","Name":"RepositoryImportSession","name_":"repository_import_session","name-":"repository-import-session","NAME":"REPOSITORY_IMPORT_SESSION","index$":438}, {"active":true,"entity":"repository_import_session","key$":"BasicRepositoryImportSessionFlow","kind":"basic","name":"BasicRepositoryImportSessionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"repository_import_session_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"repository_import_session_ref01","srcdatavar":"repository_import_session_ref01_data","suffix":"_dt0"},"m":{"id":"repository_import_session01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-repository_import_session_ref01"}}],"index$":1,"route":"GET /api/v1/repository_import_sessions/{id}","record":{}}]}, 'RepositoryImportSession', {"POST /api/v1/repository_import_sessions/{id}/authorization":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/repository_import_sessions/{id}/cancel":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"message":{"type":"string","maxLength":500}}}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/organizations/{organization_id}/repository_import_sessions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["idempotency_key"],"properties":{"idempotency_key":{"type":"string","key$":"idempotency_key"},"github_app_installation_id":{"type":"string","key$":"github_app_installation_id"},"client_name":{"type":"string","key$":"client_name"},"client_version":{"type":"string","key$":"client_version"}},"additionalProperties":true,"x-ref":"#/components/schemas/RepositoryImportSessionCreateRequest"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/repository_import_sessions/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"repository_import_session.create.0":"GET-only live run: needs POST /api/v1/repository_import_sessions/{id}/authorization","repository_import_session.load.1":"GET-only live run: reads a record only repository_import_session.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const repository_import_session_ref01_ent = client.RepositoryImportSession()
    let repository_import_session_ref01_data = setup.data.new.repository_import_session['repository_import_session_ref01']
    repository_import_session_ref01_data['organization_id'] = setup.idmap['organization01']

    repository_import_session_ref01_data = (await repository_import_session_ref01_ent.create(repository_import_session_ref01_data)).data()
    assert(null != repository_import_session_ref01_data.id)


    // LOAD
    const repository_import_session_ref01_match_dt0: any = {}
    repository_import_session_ref01_match_dt0.id = repository_import_session_ref01_data.id
    const repository_import_session_ref01_data_dt0 = (await repository_import_session_ref01_ent.load(repository_import_session_ref01_match_dt0)).data()
    assert(repository_import_session_ref01_data_dt0.id === repository_import_session_ref01_data.id)


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
      '../../../../.sdk/test/entity/repository_import_session/RepositoryImportSessionTestData.json')

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
    ['repository_import_session01','repository_import_session02','repository_import_session03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_ENTID']
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
  
