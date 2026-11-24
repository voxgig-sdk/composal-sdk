

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


describe('PagesProjectRunEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PagesProjectRun()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PagesProjectRun().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pages_project_run.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"environment_query":{"a":true,"h":"Environment Query","n":"environment_query","r":true,"t":"`$STRING`","key$":"environment_query","index$":0},"environments":{"a":true,"h":"Environments","n":"environments","r":true,"t":"`$ARRAY`","key$":"environments","index$":1},"environments_has_more":{"a":true,"h":"Environments Has More","n":"environments_has_more","r":true,"t":"`$BOOLEAN`","key$":"environments_has_more","index$":2},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":3},"key$":"pagination","index$":3},"runs":{"a":true,"h":"Runs","n":"runs","r":true,"t":"`$ARRAY`","key$":"runs","index$":4},"selected_environment":{"a":true,"h":"Selected Environment","n":"selected_environment","r":true,"t":"`$ANY`","key$":"selected_environment","index$":5}},"name":"pages_project_run","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/runs","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"environment_id","or":"environment_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"environment_query","or":"environment_query","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"explode":true,"k":"query","n":"query","or":"query","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"trigger","or":"trigger","r":false,"style":"form","t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/runs","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"pages"},{"lit":"runs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"pages_project_run","name__orig":"pages_project_run","Name":"PagesProjectRun","name_":"pages_project_run","name-":"pages-project-run","NAME":"PAGES_PROJECT_RUN","index$":366}, {"active":true,"entity":"pages_project_run","key$":"BasicPagesProjectRunFlow","kind":"basic","name":"BasicPagesProjectRunFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pages_project_run_ref01"}}],"index$":0}]}, 'PagesProjectRun', {"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/runs":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"page","in":"query","schema":{"type":"integer","minimum":1},"index$":2},{"name":"status","in":"query","schema":{"type":"string","enum":["all","active","passed","failed","blocked","cancelled","timed_out","skipped","cleanup_blocked","archived"]},"index$":3},{"name":"trigger","in":"query","schema":{"type":"string","enum":["all","pull_request","writer","rerun","direct"]},"index$":4},{"name":"environment_id","in":"query","schema":{"type":"string"},"index$":5},{"name":"query","in":"query","schema":{"type":"string","maxLength":200},"index$":6},{"name":"environment_query","in":"query","schema":{"type":"string","maxLength":200},"index$":7}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pages_project_run_ref01_data = Object.values(setup.data.existing.pages_project_run)[0] as any

    // LIST
    const pages_project_run_ref01_ent = client.PagesProjectRun()
    const pages_project_run_ref01_match: any = {}
    pages_project_run_ref01_match['organization_id'] = setup.idmap['organization01']
    pages_project_run_ref01_match['project_id'] = setup.idmap['project01']

    const pages_project_run_ref01_list = (await pages_project_run_ref01_ent.list(pages_project_run_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/pages_project_run/PagesProjectRunTestData.json')

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
    ['pages_project_run01','pages_project_run02','pages_project_run03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PAGES_PROJECT_RUN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PAGES_PROJECT_RUN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PAGES_PROJECT_RUN_ENTID']
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
  
