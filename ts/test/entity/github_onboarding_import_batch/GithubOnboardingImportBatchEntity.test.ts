

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


describe('GithubOnboardingImportBatchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GithubOnboardingImportBatch()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GithubOnboardingImportBatch().load({"id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_onboarding_import_batch.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_login":{"a":true,"h":"Account Login","n":"account_login","r":true,"t":"`$STRING`","key$":"account_login","index$":0},"complete":{"a":true,"h":"Complete","n":"complete","r":true,"sh":"Whether every item has settled and the wizard should treat the import as finished.","t":"`$BOOLEAN`","key$":"complete","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":2},"failed_item_count":{"a":true,"h":"Failed Item Count","n":"failed_item_count","r":true,"t":"`$INTEGER`","key$":"failed_item_count","index$":3},"github_app_installation_id":{"a":true,"h":"Github App Installation Id","n":"github_app_installation_id","r":true,"t":"`$STRING`","key$":"github_app_installation_id","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"imported_item_count":{"a":true,"h":"Imported Item Count","n":"imported_item_count","r":true,"t":"`$INTEGER`","key$":"imported_item_count","index$":6},"item_count":{"a":true,"h":"Item Count","n":"item_count","r":true,"t":"`$INTEGER`","key$":"item_count","index$":7},"items":{"a":true,"h":"Items","n":"items","r":true,"t":"`$ARRAY`","key$":"items","index$":8},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":9},"terminal_item_count":{"a":true,"h":"Terminal Item Count","n":"terminal_item_count","r":true,"t":"`$INTEGER`","key$":"terminal_item_count","index$":10},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":11}},"id":{"field":"id","name":"id"},"name":"github_onboarding_import_batch","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/github_onboarding/import_batches/{github_import_batch_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"github_import_batch_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/github_onboarding/import_batches/{github_import_batch_id}","q":{"exist":["id","organization_id"]},"r":{"param":{"github_import_batch_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_onboarding"},{"lit":"import_batches"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.batch`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"github_onboarding_import_batch","name__orig":"github_onboarding_import_batch","Name":"GithubOnboardingImportBatch","name_":"github_onboarding_import_batch","name-":"github-onboarding-import-batch","NAME":"GITHUB_ONBOARDING_IMPORT_BATCH","index$":262}, {"active":true,"entity":"github_onboarding_import_batch","key$":"BasicGithubOnboardingImportBatchFlow","kind":"basic","name":"BasicGithubOnboardingImportBatchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"github_onboarding_import_batch_ref01","srcdatavar":"github_onboarding_import_batch_ref01_data","suffix":"_dt0"},"m":{"id":"github_onboarding_import_batch01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-github_onboarding_import_batch_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/github_onboarding/import_batches/{github_import_batch_id}","record":{}}]}, 'GithubOnboardingImportBatch', {"GET /api/v1/organizations/{organization_id}/github_onboarding/import_batches/{github_import_batch_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"github_import_batch_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let github_onboarding_import_batch_ref01_data = Object.values(setup.data.existing.github_onboarding_import_batch)[0] as any

    // LOAD
    const github_onboarding_import_batch_ref01_ent = client.GithubOnboardingImportBatch()
    const github_onboarding_import_batch_ref01_match_dt0: any = {}
    github_onboarding_import_batch_ref01_match_dt0.id = github_onboarding_import_batch_ref01_data.id
    github_onboarding_import_batch_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const github_onboarding_import_batch_ref01_data_dt0 = (await github_onboarding_import_batch_ref01_ent.load(github_onboarding_import_batch_ref01_match_dt0)).data()
    assert(github_onboarding_import_batch_ref01_data_dt0.id === github_onboarding_import_batch_ref01_data.id)


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
      '../../../../.sdk/test/entity/github_onboarding_import_batch/GithubOnboardingImportBatchTestData.json')

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
    ['github_onboarding_import_batch01','github_onboarding_import_batch02','github_onboarding_import_batch03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GITHUB_ONBOARDING_IMPORT_BATCH_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GITHUB_ONBOARDING_IMPORT_BATCH_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GITHUB_ONBOARDING_IMPORT_BATCH_ENTID']
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
  
