

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


describe('RepoAccessTokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepoAccessToken()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepoAccessToken().list({"organization_id":1,"repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repo_access_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access_token":{"a":true,"h":"Access Token","n":"access_token","r":true,"t":"`$OBJECT`","key$":"access_token","index$":0},"active":{"a":true,"h":"Active","n":"active","r":true,"t":"`$BOOLEAN`","key$":"active","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":2},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":3},"credential_purpose":{"a":true,"h":"Credential Purpose","n":"credential_purpose","r":false,"sh":"Issues a revocable read-write system credential valid for one hour.","t":"`$STRING`","key$":"credential_purpose","index$":4},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"expires_at","index$":5},"expires_at_label":{"a":true,"h":"Expires At Label","n":"expires_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"expires_at_label","index$":6},"expires_in_days":{"a":true,"h":"Expires In Days","n":"expires_in_days","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"expires_in_days","index$":7},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":8},"last_used_at":{"a":true,"fo":"date-time","h":"Last Used At","n":"last_used_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_used_at","index$":9},"last_used_at_label":{"a":true,"h":"Last Used At Label","n":"last_used_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_used_at_label","index$":10},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":11},"permission_level":{"a":true,"h":"Permission Level","n":"permission_level","op":{"list":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$STRING`","key$":"permission_level","index$":12},"plain_text_token":{"a":true,"h":"Plain Text Token","n":"plain_text_token","r":true,"t":"`$STRING`","key$":"plain_text_token","index$":13},"revoked_at":{"a":true,"fo":"date-time","h":"Revoked At","n":"revoked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at","index$":14},"revoked_at_label":{"a":true,"h":"Revoked At Label","n":"revoked_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at_label","index$":15},"token_preview":{"a":true,"h":"Token Preview","n":"token_preview","r":true,"t":"`$STRING`","key$":"token_preview","index$":16},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":17},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":18}},"id":{"field":"id","name":"id"},"name":"repo_access_token","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["credential_purpose","expires_in_days","name","permission_level"],"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"access_tokens"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"access_tokens"}],"t":{"req":"`reqdata`","res":"`body.access_tokens`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens/{id}","q":{"exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"access_tokens"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"key$":"repo_access_token","name__orig":"repo_access_token","Name":"RepoAccessToken","name_":"repo_access_token","name-":"repo-access-token","NAME":"REPO_ACCESS_TOKEN","index$":424}, {"active":true,"entity":"repo_access_token","key$":"BasicRepoAccessTokenFlow","kind":"basic","name":"BasicRepoAccessTokenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"repo_access_token_ref01"},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"repo_access_token_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"repo_access_token_ref01","suffix":"_rm0"},"m":{"id":"repo_access_token01","organization_id":"organization01","repo_id":"repo01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"repo_access_token_ref01"}}],"index$":3}]}, 'RepoAccessToken', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["name"],"properties":{"name":{"type":"string","key$":"name"},"permission_level":{"type":"string","enum":["read_only","read_write"],"key$":"permission_level"},"credential_purpose":{"type":"string","enum":["git_remote_helper"],"description":"Issues a revocable read-write system credential valid for one hour.","key$":"credential_purpose"},"expires_in_days":{"type":"integer","minimum":1,"nullable":true,"key$":"expires_in_days"}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens/{id}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"repo_access_token.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens","repo_access_token.remove.2":"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/access_tokens/{id}","repo_access_token.list.3":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const repo_access_token_ref01_ent = client.RepoAccessToken()
    let repo_access_token_ref01_data = setup.data.new.repo_access_token['repo_access_token_ref01']
    repo_access_token_ref01_data['organization_id'] = setup.idmap['organization01']
    repo_access_token_ref01_data['repo_id'] = setup.idmap['repo01']

    repo_access_token_ref01_data = (await repo_access_token_ref01_ent.create(repo_access_token_ref01_data)).data()
    assert(null != repo_access_token_ref01_data.id)


    // LIST
    const repo_access_token_ref01_match: any = {}
    repo_access_token_ref01_match['organization_id'] = setup.idmap['organization01']
    repo_access_token_ref01_match['repo_id'] = setup.idmap['repo01']

    const repo_access_token_ref01_list = (await repo_access_token_ref01_ent.list(repo_access_token_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(repo_access_token_ref01_list, { id: repo_access_token_ref01_data.id })))


    // REMOVE
    const repo_access_token_ref01_match_rm0: any = { id: repo_access_token_ref01_data.id }
    repo_access_token_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    repo_access_token_ref01_match_rm0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    await repo_access_token_ref01_ent.remove(repo_access_token_ref01_match_rm0)
  

    // LIST
    const repo_access_token_ref01_match_rt0: any = {}
    repo_access_token_ref01_match_rt0['organization_id'] = setup.idmap['organization01']
    repo_access_token_ref01_match_rt0['repo_id'] = setup.idmap['repo01']

    const repo_access_token_ref01_list_rt0 = (await repo_access_token_ref01_ent.list(repo_access_token_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(repo_access_token_ref01_list_rt0, { id: repo_access_token_ref01_data.id })))


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
      '../../../../.sdk/test/entity/repo_access_token/RepoAccessTokenTestData.json')

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
    ['repo_access_token01','repo_access_token02','repo_access_token03','organization01','organization02','organization03','repo01','repo02','repo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPO_ACCESS_TOKEN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPO_ACCESS_TOKEN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPO_ACCESS_TOKEN_ENTID']
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
  
