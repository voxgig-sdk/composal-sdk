

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


describe('RepositoryImportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepositoryImport()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepositoryImport().load({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repository_import.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"can_manage_connections":{"a":true,"h":"Can Manage Connections","n":"can_manage_connections","r":true,"t":"`$BOOLEAN`","key$":"can_manage_connections","index$":0},"github_imports":{"a":true,"h":"Github Imports","n":"github_imports","r":true,"t":"`$ARRAY`","key$":"github_imports","index$":1},"github_installations":{"a":true,"h":"Github Installations","n":"github_installations","r":true,"t":"`$ARRAY`","key$":"github_installations","index$":2},"gitlab_configured":{"a":true,"h":"Gitlab Configured","n":"gitlab_configured","r":true,"t":"`$BOOLEAN`","key$":"gitlab_configured","index$":3},"gitlab_imports":{"a":true,"h":"Gitlab Imports","n":"gitlab_imports","r":true,"t":"`$ARRAY`","key$":"gitlab_imports","index$":4},"gitlab_integrations":{"a":true,"h":"Gitlab Integrations","n":"gitlab_integrations","r":true,"t":"`$ARRAY`","key$":"gitlab_integrations","index$":5},"gitlab_redirect_uri":{"a":true,"h":"Gitlab Redirect Uri","n":"gitlab_redirect_uri","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"gitlab_redirect_uri","index$":6},"gitlab_self_managed_available":{"a":true,"h":"Gitlab Self Managed Available","n":"gitlab_self_managed_available","r":true,"t":"`$BOOLEAN`","key$":"gitlab_self_managed_available","index$":7},"inventory_errors":{"a":true,"h":"Inventory Errors","n":"inventory_errors","r":true,"t":"`$ARRAY`","key$":"inventory_errors","index$":8},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":9},"repositories":{"a":true,"h":"Repositories","n":"repositories","r":true,"t":"`$ARRAY`","key$":"repositories","index$":10}},"name":"repository_import","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/pages/repository_import","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"accounts_only","or":"accounts_only","r":false,"style":"form","t":"`$BOOLEAN`","index$":0},{"a":true,"explode":true,"k":"query","n":"search","or":"search","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/pages/repository_import","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"pages"},{"lit":"repository_import"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"repository_import","name__orig":"repository_import","Name":"RepositoryImport","name_":"repository_import","name-":"repository-import","NAME":"REPOSITORY_IMPORT","index$":437}, {"active":true,"entity":"repository_import","key$":"BasicRepositoryImportFlow","kind":"basic","name":"BasicRepositoryImportFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"repository_import_ref01","srcdatavar":"repository_import_ref01_data","suffix":"_dt0"},"m":{"id":"repository_import01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-repository_import_ref01"}}],"unreachable":true}]}, 'RepositoryImport', {"GET /api/v1/organizations/{org_slug}/pages/repository_import":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"search","in":"query","required":false,"schema":{"type":"string"},"index$":1},{"name":"accounts_only","in":"query","required":false,"schema":{"type":"boolean"},"description":"Return accounts and resumable imports without fetching provider repository inventories.","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let repository_import_ref01_data = Object.values(setup.data.existing.repository_import)[0] as any

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
      '../../../../.sdk/test/entity/repository_import/RepositoryImportTestData.json')

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
    ['repository_import01','repository_import02','repository_import03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPOSITORY_IMPORT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPOSITORY_IMPORT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPOSITORY_IMPORT_ENTID']
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
  
