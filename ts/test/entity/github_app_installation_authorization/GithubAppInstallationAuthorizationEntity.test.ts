

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


describe('GithubAppInstallationAuthorizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GithubAppInstallationAuthorization()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GithubAppInstallationAuthorization().create({"organization_slug":1,"return_target":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_app_installation_authorization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"installation_url":{"a":true,"fo":"uri","h":"Installation Url","n":"installation_url","r":true,"t":"`$STRING`","key$":"installation_url","index$":0},"organization_slug":{"a":true,"h":"Organization Slug","n":"organization_slug","r":true,"sh":"Vex organization slug whose installation will be linked.","t":"`$STRING`","key$":"organization_slug","index$":1},"return_target":{"a":true,"h":"Return Target","n":"return_target","r":true,"sh":"Server-validated Vex application target used after verification.","t":"`$STRING`","key$":"return_target","index$":2}},"name":"github_app_installation_authorization","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["organization_slug","return_target"],"co":{"id":"POST /api/v1/github_app/installation_authorizations","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/github_app/installation_authorizations","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"github_app"},{"lit":"installation_authorizations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["code","error","state"],"co":{"id":"POST /api/v1/github_app/installation_authorizations/complete","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/github_app/installation_authorizations/complete","q":{"$action":"complete"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"github_app"},{"lit":"installation_authorizations"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["installation_id","setup_action","state"],"co":{"id":"POST /api/v1/github_app/installation_authorizations/setup","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/github_app/installation_authorizations/setup","q":{"$action":"setup"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"github_app"},{"lit":"installation_authorizations"},{"lit":"setup"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"github_app_installation_authorization","name__orig":"github_app_installation_authorization","Name":"GithubAppInstallationAuthorization","name_":"github_app_installation_authorization","name-":"github-app-installation-authorization","NAME":"GITHUB_APP_INSTALLATION_AUTHORIZATION","index$":251}, {"active":true,"entity":"github_app_installation_authorization","key$":"BasicGithubAppInstallationAuthorizationFlow","kind":"basic","name":"BasicGithubAppInstallationAuthorizationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"github_app_installation_authorization_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'GithubAppInstallationAuthorization', {"POST /api/v1/github_app/installation_authorizations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["organization_slug","return_target"],"properties":{"organization_slug":{"type":"string","description":"Vex organization slug whose installation will be linked.","key$":"organization_slug"},"return_target":{"type":"string","description":"Server-validated Vex application target used after verification.","key$":"return_target"}}}}}},"parameters":[]},"POST /api/v1/github_app/installation_authorizations/complete":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["state"],"properties":{"code":{"type":"string","description":"GitHub App user authorization code when authorization succeeds."},"error":{"type":"string","description":"GitHub OAuth error when the user denies or cannot grant authorization."},"state":{"type":"string","description":"Opaque one-time verification state returned by GitHub OAuth."}}}}}},"parameters":[]},"POST /api/v1/github_app/installation_authorizations/setup":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["installation_id","setup_action","state"],"properties":{"installation_id":{"type":"string"},"setup_action":{"type":"string","enum":["install","update"]},"state":{"type":"string","description":"Opaque one-time state returned in the GitHub Setup URL callback."}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"github_app_installation_authorization.create.0":"GET-only live run: needs POST /api/v1/github_app/installation_authorizations"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const github_app_installation_authorization_ref01_ent = client.GithubAppInstallationAuthorization()
    let github_app_installation_authorization_ref01_data = setup.data.new.github_app_installation_authorization['github_app_installation_authorization_ref01']

    github_app_installation_authorization_ref01_data = (await github_app_installation_authorization_ref01_ent.create(github_app_installation_authorization_ref01_data)).data()
    assert(null != github_app_installation_authorization_ref01_data)


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
      '../../../../.sdk/test/entity/github_app_installation_authorization/GithubAppInstallationAuthorizationTestData.json')

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
    ['github_app_installation_authorization01','github_app_installation_authorization02','github_app_installation_authorization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GITHUB_APP_INSTALLATION_AUTHORIZATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GITHUB_APP_INSTALLATION_AUTHORIZATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GITHUB_APP_INSTALLATION_AUTHORIZATION_ENTID']
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
  
