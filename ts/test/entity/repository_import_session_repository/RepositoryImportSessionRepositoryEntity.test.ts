

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


describe('RepositoryImportSessionRepositoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepositoryImportSessionRepository()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepositoryImportSessionRepository().list({"repository_import_session_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repository_import_session_repository.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"default_branch":{"a":true,"h":"Default Branch","n":"default_branch","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"default_branch","index$":0},"full_name":{"a":true,"h":"Full Name","n":"full_name","r":true,"t":"`$STRING`","key$":"full_name","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":2},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"t":"`$STRING`","key$":"owner","index$":3},"private":{"a":true,"h":"Private","n":"private","r":true,"t":"`$BOOLEAN`","key$":"private","index$":4},"reason":{"a":true,"h":"Reason","n":"reason","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"reason","index$":5},"selectable":{"a":true,"h":"Selectable","n":"selectable","r":true,"t":"`$BOOLEAN`","key$":"selectable","index$":6},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":7},"visibility":{"a":true,"h":"Visibility","n":"visibility","r":true,"t":"`$STRING`","key$":"visibility","index$":8}},"name":"repository_import_session_repository","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/repository_import_sessions/{id}/repositories","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"repository_import_session_id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/repository_import_sessions/{id}/repositories","q":{"exist":["repository_import_session_id"]},"r":{"param":{"id":"repository_import_session_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"repository_import_sessions"},{"var":"repository_import_session_id"},{"lit":"repositories"}],"t":{"req":"`reqdata`","res":"`body.repositories`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.repository_import_session"]]},"key$":"repository_import_session_repository","name__orig":"repository_import_session_repository","Name":"RepositoryImportSessionRepository","name_":"repository_import_session_repository","name-":"repository-import-session-repository","NAME":"REPOSITORY_IMPORT_SESSION_REPOSITORY","index$":443}, {"active":true,"entity":"repository_import_session_repository","key$":"BasicRepositoryImportSessionRepositoryFlow","kind":"basic","name":"BasicRepositoryImportSessionRepositoryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"repository_import_session_id":"repository_import_session01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"repository_import_session_repository_ref01"}}],"index$":0}]}, 'RepositoryImportSessionRepository', {"GET /api/v1/repository_import_sessions/{id}/repositories":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","required":false,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let repository_import_session_repository_ref01_data = Object.values(setup.data.existing.repository_import_session_repository)[0] as any

    // LIST
    const repository_import_session_repository_ref01_ent = client.RepositoryImportSessionRepository()
    const repository_import_session_repository_ref01_match: any = {}
    repository_import_session_repository_ref01_match['repository_import_session_id'] = setup.idmap['repository_import_session01']

    const repository_import_session_repository_ref01_list = (await repository_import_session_repository_ref01_ent.list(repository_import_session_repository_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/repository_import_session_repository/RepositoryImportSessionRepositoryTestData.json')

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
    ['repository_import_session_repository01','repository_import_session_repository02','repository_import_session_repository03','repository_import_session01','repository_import_session02','repository_import_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_REPOSITORY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_REPOSITORY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_REPOSITORY_ENTID']
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
  
