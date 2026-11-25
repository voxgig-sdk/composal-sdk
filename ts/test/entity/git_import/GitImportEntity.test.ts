

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


describe('GitImportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GitImport()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GitImport().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'git_import.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"destination_mode":{"a":true,"h":"Destination Mode","n":"destination_mode","r":true,"t":"`$STRING`","key$":"destination_mode","index$":0},"error":{"a":true,"h":"Error","n":"error","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error","index$":1},"git_default_branch":{"a":true,"h":"Git Default Branch","n":"git_default_branch","r":false,"sh":"Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion","t":"`$STRING`","key$":"git_default_branch","index$":2},"git_status":{"a":true,"h":"Git Status","n":"git_status","r":true,"t":"`$STRING`","key$":"git_status","index$":3},"git_url":{"a":true,"h":"Git Url","n":"git_url","r":true,"t":"`$STRING`","key$":"git_url","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":true,"t":"`$STRING`","key$":"idempotency_key","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":7},"native_status":{"a":true,"h":"Native Status","n":"native_status","r":true,"t":"`$STRING`","key$":"native_status","index$":8},"organization":{"a":true,"h":"Organization","n":"organization","r":true,"t":"`$STRING`","key$":"organization","index$":9},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_id","index$":10},"root_path":{"a":true,"h":"Root Path","n":"root_path","r":true,"t":"`$STRING`","key$":"root_path","index$":11},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":12},"source_branch":{"a":true,"h":"Source Branch","n":"source_branch","r":true,"t":"`$STRING`","key$":"source_branch","index$":13},"target_branch":{"a":true,"h":"Target Branch","n":"target_branch","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"target_branch","index$":14}},"id":{"field":"id","name":"id"},"name":"git_import","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["destination_mode","git_default_branch","idempotency_key","name","root_path","slug","source_branch","target_branch"],"co":{"id":"POST /api/v1/organizations/{organization_id}/git_imports","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/git_imports","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"git_imports"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/git_imports/{id}/complete","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/git_imports/{id}/complete","q":{"$action":"complete","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"git_imports"},{"var":"id"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/git_imports/{id}/retry","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/git_imports/{id}/retry","q":{"$action":"retry","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"git_imports"},{"var":"id"},{"lit":"retry"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/git_imports/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/git_imports/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"git_imports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"git_import","name__orig":"git_import","Name":"GitImport","name_":"git_import","name-":"git-import","NAME":"GIT_IMPORT","index$":246}, {"active":true,"entity":"git_import","key$":"BasicGitImportFlow","kind":"basic","name":"BasicGitImportFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"git_import_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"git_import_ref01","srcdatavar":"git_import_ref01_data","suffix":"_dt0"},"m":{"id":"git_import01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-git_import_ref01"}}],"index$":1,"route":"GET /api/v1/git_imports/{id}","record":{}}]}, 'GitImport', {"POST /api/v1/organizations/{organization_id}/git_imports":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["idempotency_key","slug","destination_mode","root_path","source_branch"],"properties":{"idempotency_key":{"type":"string","key$":"idempotency_key"},"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"root_path":{"type":"string","key$":"root_path"},"source_branch":{"type":"string","key$":"source_branch"},"target_branch":{"type":"string","key$":"target_branch"},"destination_mode":{"type":"string","enum":["standalone","home"],"key$":"destination_mode"},"git_default_branch":{"type":"string","description":"Original Git symbolic HEAD branch, independent of the branch selected for JJ conversion","key$":"git_default_branch"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/git_imports/{id}/complete":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/git_imports/{id}/retry":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/git_imports/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"git_import.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/git_imports","git_import.load.1":"GET-only live run: reads a record only git_import.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const git_import_ref01_ent = client.GitImport()
    let git_import_ref01_data = setup.data.new.git_import['git_import_ref01']
    git_import_ref01_data['organization_id'] = setup.idmap['organization01']

    git_import_ref01_data = (await git_import_ref01_ent.create(git_import_ref01_data)).data()
    assert(null != git_import_ref01_data.id)


    // LOAD
    const git_import_ref01_match_dt0: any = {}
    git_import_ref01_match_dt0.id = git_import_ref01_data.id
    const git_import_ref01_data_dt0 = (await git_import_ref01_ent.load(git_import_ref01_match_dt0)).data()
    assert(git_import_ref01_data_dt0.id === git_import_ref01_data.id)


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
      '../../../../.sdk/test/entity/git_import/GitImportTestData.json')

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
    ['git_import01','git_import02','git_import03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GIT_IMPORT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GIT_IMPORT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GIT_IMPORT_ENTID']
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
  
