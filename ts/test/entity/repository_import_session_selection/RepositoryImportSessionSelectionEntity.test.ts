

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


describe('RepositoryImportSessionSelectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepositoryImportSessionSelection()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepositoryImportSessionSelection().create({"repository_import_session_id":1,"repositories":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repository_import_session_selection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"repositories":{"a":true,"h":"Repositories","n":"repositories","r":true,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"repositories","index$":0}},"name":"repository_import_session_selection","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["repositories"],"co":{"id":"POST /api/v1/repository_import_sessions/{id}/selections","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"repository_import_session_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/repository_import_sessions/{id}/selections","q":{"exist":["repository_import_session_id"]},"r":{"param":{"id":"repository_import_session_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"repository_import_sessions"},{"var":"repository_import_session_id"},{"lit":"selections"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.repository_import_session"]]},"key$":"repository_import_session_selection","name__orig":"repository_import_session_selection","Name":"RepositoryImportSessionSelection","name_":"repository_import_session_selection","name-":"repository-import-session-selection","NAME":"REPOSITORY_IMPORT_SESSION_SELECTION","index$":440}, {"active":true,"entity":"repository_import_session_selection","key$":"BasicRepositoryImportSessionSelectionFlow","kind":"basic","name":"BasicRepositoryImportSessionSelectionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"repository_import_session_selection_ref01"},"m":{"repository_import_session_id":"repository_import_session01"},"o":"create","s":[],"v":[],"index$":0}]}, 'RepositoryImportSessionSelection', {"POST /api/v1/repository_import_sessions/{id}/selections":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["repositories"],"properties":{"repositories":{"oneOf":[{"type":"string","enum":["all"]},{"type":"array","items":{"type":"object","required":[],"properties":{}}}],"key$":"repositories"}},"additionalProperties":true,"x-ref":"#/components/schemas/RepositoryImportSelectionRequest"}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"repository_import_session_selection.create.0":"GET-only live run: needs POST /api/v1/repository_import_sessions/{id}/selections"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const repository_import_session_selection_ref01_ent = client.RepositoryImportSessionSelection()
    let repository_import_session_selection_ref01_data = setup.data.new.repository_import_session_selection['repository_import_session_selection_ref01']
    repository_import_session_selection_ref01_data['repository_import_session_id'] = setup.idmap['repository_import_session01']

    repository_import_session_selection_ref01_data = (await repository_import_session_selection_ref01_ent.create(repository_import_session_selection_ref01_data)).data()
    assert(null != repository_import_session_selection_ref01_data)


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
      '../../../../.sdk/test/entity/repository_import_session_selection/RepositoryImportSessionSelectionTestData.json')

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
    ['repository_import_session_selection01','repository_import_session_selection02','repository_import_session_selection03','repository_import_session01','repository_import_session02','repository_import_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_SELECTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_SELECTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPOSITORY_IMPORT_SESSION_SELECTION_ENTID']
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
  
