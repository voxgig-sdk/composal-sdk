

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


describe('GithubAppImportableRepositoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GithubAppImportableRepository()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('github_app_importable_repository hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).GithubAppImportableRepository().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).GithubAppImportableRepository()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.GithubAppImportableRepository().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().GithubAppImportableRepository().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.GithubAppImportableRepository().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.GithubAppImportableRepository().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GithubAppImportableRepository().list({"github_app_installation_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_app_importable_repository.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_login":{"a":true,"h":"Account Login","n":"account_login","r":true,"t":"`$STRING`","key$":"account_login","index$":0},"github_app_installation_id":{"a":true,"h":"Github App Installation Id","n":"github_app_installation_id","r":true,"t":"`$STRING`","key$":"github_app_installation_id","index$":1},"next_page":{"a":true,"h":"Next Page","n":"next_page","r":true,"sh":"Next GitHub page for this installation","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"next_page","index$":2},"repositories":{"a":true,"h":"Repositories","n":"repositories","r":true,"t":"`$ARRAY`","key$":"repositories","index$":3}},"name":"github_app_importable_repository","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/github_app/importable_repositories","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"github_app_installation_id","or":"github_app_installation_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/github_app/importable_repositories","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"github_app"},{"lit":"importable_repositories"}],"t":{"req":"`reqdata`","res":"`body.accounts`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"github_app_importable_repository","name__orig":"github_app_importable_repository","Name":"GithubAppImportableRepository","name_":"github_app_importable_repository","name-":"github-app-importable-repository","NAME":"GITHUB_APP_IMPORTABLE_REPOSITORY","index$":247}, {"active":true,"entity":"github_app_importable_repository","key$":"BasicGithubAppImportableRepositoryFlow","kind":"basic","name":"BasicGithubAppImportableRepositoryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"github_app_importable_repository_ref01"}}],"index$":0}]}, 'GithubAppImportableRepository', {"GET /api/v1/github_app/importable_repositories":{"protocol":"http","parameters":[{"name":"github_app_installation_id","in":"query","required":false,"description":"When set with page, returns one installation page for client-side streaming.","schema":{"type":"string"},"index$":0},{"name":"page","in":"query","required":false,"description":"GitHub installation-repositories page (1-based). Defaults to 1.","schema":{"type":"integer","minimum":1,"default":1},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let github_app_importable_repository_ref01_data = Object.values(setup.data.existing.github_app_importable_repository)[0] as any

    // LIST
    const github_app_importable_repository_ref01_ent = client.GithubAppImportableRepository()
    const github_app_importable_repository_ref01_match: any = {}

    const github_app_importable_repository_ref01_list = (await github_app_importable_repository_ref01_ent.list(github_app_importable_repository_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/github_app_importable_repository/GithubAppImportableRepositoryTestData.json')

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
    ['github_app_importable_repository01','github_app_importable_repository02','github_app_importable_repository03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GITHUB_APP_IMPORTABLE_REPOSITORY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GITHUB_APP_IMPORTABLE_REPOSITORY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GITHUB_APP_IMPORTABLE_REPOSITORY_ENTID']
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
  
