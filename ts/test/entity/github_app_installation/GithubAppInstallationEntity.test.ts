

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


describe('GithubAppInstallationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GithubAppInstallation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GithubAppInstallation().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_app_installation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_avatar_url":{"a":true,"fo":"uri","h":"Account Avatar Url","n":"account_avatar_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"account_avatar_url","index$":0},"account_id":{"a":true,"h":"Account Id","n":"account_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"account_id","index$":1},"account_login":{"a":true,"h":"Account Login","n":"account_login","r":true,"t":"`$STRING`","key$":"account_login","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":3},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"installation_id":{"a":true,"h":"Installation Id","n":"installation_id","r":true,"t":"`$STRING`","key$":"installation_id","index$":6},"installed_at":{"a":true,"fo":"date-time","h":"Installed At","n":"installed_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"installed_at","index$":7},"installed_at_label":{"a":true,"h":"Installed At Label","n":"installed_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"installed_at_label","index$":8},"manage_access_url":{"a":true,"fo":"uri","h":"Manage Access Url","n":"manage_access_url","r":true,"t":"`$STRING`","key$":"manage_access_url","index$":9},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":10},"permission_entries":{"a":true,"h":"Permission Entries","n":"permission_entries","r":true,"sh":"GitHub's permission hash as a display-ready list, sorted by name.","t":"`$ARRAY`","key$":"permission_entries","index$":11},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":12},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":13},"suspended_at":{"a":true,"fo":"date-time","h":"Suspended At","n":"suspended_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"suspended_at","index$":14},"suspended_at_label":{"a":true,"h":"Suspended At Label","n":"suspended_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"suspended_at_label","index$":15},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":16},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":17}},"id":{"field":"id","name":"id"},"name":"github_app_installation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/organizations/{organization_id}/github_app/installations/{id}/check_connection","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/github_app/installations/{id}/check_connection","q":{"$action":"check_connection","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_app"},{"lit":"installations"},{"var":"id"},{"lit":"check_connection"}],"t":{"req":"`reqdata`","res":"`body.health`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/github_app/installations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/github_app/installations","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_app"},{"lit":"installations"}],"t":{"req":"`reqdata`","res":"`body.github_app_installations`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/github_app/installations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"force","or":"force","r":false,"style":"form","t":"`$BOOLEAN`","index$":0},{"a":true,"explode":true,"k":"query","n":"uninstall_on_github","or":"uninstall_on_github","r":false,"style":"form","t":"`$BOOLEAN`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/github_app/installations/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_app"},{"lit":"installations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"github_app_installation","name__orig":"github_app_installation","Name":"GithubAppInstallation","name_":"github_app_installation","name-":"github-app-installation","NAME":"GITHUB_APP_INSTALLATION","index$":252}, {"active":true,"entity":"github_app_installation","key$":"BasicGithubAppInstallationFlow","kind":"basic","name":"BasicGithubAppInstallationFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"github_app_installation_ref01"},"m":{"id":"id01","organization_id":"organization01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"github_app_installation_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"github_app_installation_ref01","suffix":"_rm0"},"m":{"id":"github_app_installation01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":1},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"github_app_installation_ref01"}}],"index$":2}]}, 'GithubAppInstallation', {"POST /api/v1/organizations/{organization_id}/github_app/installations/{id}/check_connection":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/github_app/installations":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /api/v1/organizations/{organization_id}/github_app/installations/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"force","in":"query","required":false,"description":"Turn off dependent GitHub sync, CI, and in-flight landings instead of refusing.","schema":{"type":"boolean"},"index$":2},{"name":"uninstall_on_github","in":"query","required":false,"description":"Also uninstall the App from the GitHub account.","schema":{"type":"boolean"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"github_app_installation.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/github_app/installations/{id}/check_connection","github_app_installation.remove.2":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/github_app/installations/{id}","github_app_installation.list.3":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let github_app_installation_ref01_data = Object.values(setup.data.existing.github_app_installation)[0] as any

    // LIST
    const github_app_installation_ref01_ent = client.GithubAppInstallation()
    const github_app_installation_ref01_match: any = {}
    github_app_installation_ref01_match['organization_id'] = setup.idmap['organization01']

    const github_app_installation_ref01_list = (await github_app_installation_ref01_ent.list(github_app_installation_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/github_app_installation/GithubAppInstallationTestData.json')

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
    ['github_app_installation01','github_app_installation02','github_app_installation03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GITHUB_APP_INSTALLATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GITHUB_APP_INSTALLATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GITHUB_APP_INSTALLATION_ENTID']
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
  
