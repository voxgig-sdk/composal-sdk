

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


describe('GithubConnectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GithubConnection()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GithubConnection().load({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_connection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accounts":{"a":true,"h":"Accounts","n":"accounts","r":true,"t":"`$ARRAY`","key$":"accounts","index$":0},"github_app_installation_id":{"a":true,"h":"Github App Installation Id","n":"github_app_installation_id","r":true,"t":"`$STRING`","key$":"github_app_installation_id","index$":1},"installations":{"a":true,"h":"Installations","n":"installations","r":true,"t":"`$ARRAY`","key$":"installations","index$":2},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":false,"sh":"Project slug or public ID the repositories are added to.","t":"`$STRING`","key$":"project_id","index$":3},"replace":{"a":true,"h":"Replace","n":"replace","r":false,"sh":"Make these the project's only repositories.","t":"`$BOOLEAN`","key$":"replace","index$":4},"repositories":{"a":true,"h":"Repositories","n":"repositories","r":true,"t":"`$ARRAY`","key$":"repositories","index$":5}},"name":"github_connection","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["github_app_installation_id","project_id","replace","repositories"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/github_connections","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/github_connections","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"github_connections"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/github_connections","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"github_app_installation_id","or":"github_app_installation_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/github_connections","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"github_connections"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"github_connection","name__orig":"github_connection","Name":"GithubConnection","name_":"github_connection","name-":"github-connection","NAME":"GITHUB_CONNECTION","index$":255}, {"active":true,"entity":"github_connection","key$":"BasicGithubConnectionFlow","kind":"basic","name":"BasicGithubConnectionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"github_connection_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"github_connection_ref01","srcdatavar":"github_connection_ref01_data","suffix":"_dt0"},"m":{"id":"github_connection01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-github_connection_ref01"}}],"index$":1}]}, 'GithubConnection', {"POST /api/v1/organizations/{organization_id}/verify/github_connections":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["github_app_installation_id","repositories"],"properties":{"github_app_installation_id":{"type":"string","key$":"github_app_installation_id"},"repositories":{"type":"array","items":{"type":"object","required":["owner","name"],"properties":{"owner":{"type":"string"},"name":{"type":"string"}}},"key$":"repositories"},"project_id":{"type":"string","description":"Project slug or public ID the repositories are added to.","key$":"project_id"},"replace":{"type":"boolean","description":"Make these the project's only repositories. Refused when another of its repositories has PR testing set up.","key$":"replace"}},"additionalProperties":true,"x-ref":"#/components/schemas/VerifyGithubConnectionInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/verify/github_connections":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"in":"query","name":"github_app_installation_id","required":false,"schema":{"type":"string"},"description":"List this account's repositories.","index$":1},{"in":"query","name":"project_id","required":false,"schema":{"type":"string"},"description":"Mark only this project's repositories as connected.","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"github_connection.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/github_connections"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const github_connection_ref01_ent = client.GithubConnection()
    let github_connection_ref01_data = setup.data.new.github_connection['github_connection_ref01']
    github_connection_ref01_data['organization_id'] = setup.idmap['organization01']

    github_connection_ref01_data = (await github_connection_ref01_ent.create(github_connection_ref01_data)).data()
    assert(null != github_connection_ref01_data)



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
      '../../../../.sdk/test/entity/github_connection/GithubConnectionTestData.json')

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
    ['github_connection01','github_connection02','github_connection03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GITHUB_CONNECTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GITHUB_CONNECTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GITHUB_CONNECTION_ENTID']
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
  
