

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


describe('PageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Page()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Page().load({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'page.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active_runs":{"a":true,"h":"Active Runs","n":"active_runs","r":true,"t":"`$ARRAY`","key$":"active_runs","index$":0},"checkout_required":{"a":true,"h":"Checkout Required","n":"checkout_required","r":true,"t":"`$BOOLEAN`","key$":"checkout_required","index$":1},"cli_signed_in_at":{"a":true,"fo":"date-time","h":"Cli Signed In At","n":"cli_signed_in_at","r":true,"sh":"When the signed-in user last finished a CLI sign-in for this organization, so agent setup can show the CLI is connected.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cli_signed_in_at","index$":2},"counts":{"a":true,"h":"Counts","n":"counts","r":true,"t":"`$OBJECT`","key$":"counts","index$":3},"demo_project":{"a":true,"h":"Demo Project","n":"demo_project","r":true,"sh":"The workspace's copy of the demo project, which setup offers as example data.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"demo_project","index$":4},"environments":{"a":true,"h":"Environments","n":"environments","r":true,"t":"`$ARRAY`","key$":"environments","index$":5},"included_deep_scan":{"a":true,"h":"Included Deep Scan","n":"included_deep_scan","r":true,"sh":"Whether a new app gets the signed-in user's included Deep Scan (verify_onboarding_deep_scan) once it has a test account, so setup asks for one right after the app.","t":"`$BOOLEAN`","key$":"included_deep_scan","index$":6},"onboarding_discovery":{"a":true,"h":"Onboarding Discovery","n":"onboarding_discovery","r":false,"t":"`$ANY`","key$":"onboarding_discovery","index$":7},"organization":{"a":true,"h":"Organization","n":"organization","r":true,"t":"`$OBJECT`","key$":"organization","index$":8},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":9},"project":{"a":true,"h":"Project","n":"project","r":true,"sh":"The project the page is limited to, or null for the whole organization.","t":"`$ANY`","key$":"project","index$":10},"pull_request_launch_options":{"a":true,"h":"Pull Request Launch Options","n":"pull_request_launch_options","r":false,"t":"`$ARRAY`","key$":"pull_request_launch_options","index$":11},"pull_requests":{"a":true,"h":"Pull Requests","n":"pull_requests","r":false,"t":"`$ARRAY`","key$":"pull_requests","index$":12},"repositories":{"a":true,"h":"Repositories","n":"repositories","r":true,"t":"`$ARRAY`","key$":"repositories","index$":13},"runs":{"a":true,"h":"Runs","n":"runs","r":true,"t":"`$ARRAY`","key$":"runs","index$":14},"runs_pagination":{"a":true,"h":"Runs Pagination","n":"runs_pagination","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":3},"key$":"runs_pagination","index$":15},"suggested_app_url":{"a":true,"h":"Suggested App Url","n":"suggested_app_url","r":true,"sh":"The URL first-run setup prefills for a new app, from the workspace's project website or the signed-in user's work email domain.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"suggested_app_url","index$":16},"url_first_start":{"a":true,"h":"Url First Start","n":"url_first_start","r":true,"sh":"Whether setup opens on the URL-first screen, which saves the app and asks for test access next.","t":"`$BOOLEAN`","key$":"url_first_start","index$":17}},"name":"page","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/page","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"query","or":"query","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"section","or":"section","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"verify_environment_id","or":"verify_environment_id","r":false,"style":"form","t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/page","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"page"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"page","name__orig":"page","Name":"Page","name_":"page","name-":"page","NAME":"PAGE","index$":143}, {"active":true,"entity":"page","key$":"BasicPageFlow","kind":"basic","name":"BasicPageFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"page_ref01","srcdatavar":"page_ref01_data","suffix":"_dt0"},"m":{"id":"page01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-page_ref01"}}],"unreachable":true}]}, 'Page', {"GET /api/v1/organizations/{organization_id}/verify/page":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"page","in":"query","schema":{"type":"integer","minimum":1},"index$":1},{"name":"section","in":"query","schema":{"type":"string","enum":["runs","environments"]},"index$":2},{"name":"verify_environment_id","in":"query","schema":{"type":"string"},"index$":3},{"name":"project_id","in":"query","description":"Limits the page to one project, by slug or public ID.","schema":{"type":"string"},"index$":4},{"name":"query","in":"query","schema":{"type":"string","maxLength":200},"index$":5},{"name":"status","in":"query","schema":{"type":"string","enum":["all","active","passed","failed","cancelled","timed_out","blocked","skipped","cleanup_blocked"]},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let page_ref01_data = Object.values(setup.data.existing.page)[0] as any

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
      '../../../../.sdk/test/entity/page/PageTestData.json')

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
    ['page01','page02','page03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PAGE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PAGE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PAGE_ENTID']
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
  
