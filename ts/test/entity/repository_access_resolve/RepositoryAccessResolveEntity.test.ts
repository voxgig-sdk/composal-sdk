

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


describe('RepositoryAccessResolveEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepositoryAccessResolve()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepositoryAccessResolve().load({"id":1,"resolve_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repository_access_resolve.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"default_branch":{"a":true,"h":"Default Branch","n":"default_branch","r":true,"t":"`$STRING`","key$":"default_branch","index$":0},"git_auth_username":{"a":true,"h":"Git Auth Username","n":"git_auth_username","r":true,"t":"`$STRING`","key$":"git_auth_username","index$":1},"git_https_clone_url":{"a":true,"fo":"uri","h":"Git Https Clone Url","n":"git_https_clone_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"git_https_clone_url","index$":2},"git_https_supported":{"a":true,"h":"Git Https Supported","n":"git_https_supported","r":true,"t":"`$BOOLEAN`","key$":"git_https_supported","index$":3},"github_access_warnings":{"a":true,"h":"Github Access Warnings","n":"github_access_warnings","r":false,"t":"`$ARRAY`","key$":"github_access_warnings","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":5},"membership_role":{"a":true,"h":"Membership Role","n":"membership_role","r":true,"t":"`$STRING`","key$":"membership_role","index$":6},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":7},"organization_name":{"a":true,"h":"Organization Name","n":"organization_name","r":true,"t":"`$STRING`","key$":"organization_name","index$":8},"organization_slug":{"a":true,"h":"Organization Slug","n":"organization_slug","r":true,"t":"`$STRING`","key$":"organization_slug","index$":9},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":true,"t":"`$STRING`","key$":"repository_id","index$":10},"repository_name":{"a":true,"h":"Repository Name","n":"repository_name","r":true,"t":"`$STRING`","key$":"repository_name","index$":11},"repository_slug":{"a":true,"h":"Repository Slug","n":"repository_slug","r":true,"t":"`$STRING`","key$":"repository_slug","index$":12}},"id":{"field":"id","name":"id","parts":["resolve_id","id"],"sep":"/"},"name":"repository_access_resolve","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/repository_access/resolve/{org_slug}/{repo_slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"repo_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"resolve_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/repository_access/resolve/{org_slug}/{repo_slug}","q":{"exist":["id","resolve_id"]},"r":{"param":{"org_slug":"resolve_id","repo_slug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"repository_access"},{"lit":"resolve"},{"var":"resolve_id"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.repository`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"repository_access_resolve","name__orig":"repository_access_resolve","Name":"RepositoryAccessResolve","name_":"repository_access_resolve","name-":"repository-access-resolve","NAME":"REPOSITORY_ACCESS_RESOLVE","index$":437}, {"active":true,"entity":"repository_access_resolve","key$":"BasicRepositoryAccessResolveFlow","kind":"basic","name":"BasicRepositoryAccessResolveFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"repository_access_resolve_ref01","srcdatavar":"repository_access_resolve_ref01_data","suffix":"_dt0"},"m":{"id":"repository_access_resolve01","resolve_id":"resolve01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-repository_access_resolve_ref01"}}],"index$":0,"route":"GET /api/v1/repository_access/resolve/{org_slug}/{repo_slug}","record":{}}]}, 'RepositoryAccessResolve', {"GET /api/v1/repository_access/resolve/{org_slug}/{repo_slug}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let repository_access_resolve_ref01_data = Object.values(setup.data.existing.repository_access_resolve)[0] as any

    // LOAD
    const repository_access_resolve_ref01_ent = client.RepositoryAccessResolve()
    const repository_access_resolve_ref01_match_dt0: any = {}
    repository_access_resolve_ref01_match_dt0.id = repository_access_resolve_ref01_data.id
    repository_access_resolve_ref01_match_dt0['resolve_id'] = setup.idmap['resolve_id'] ?? setup.idmap['resolve01']
    const repository_access_resolve_ref01_data_dt0 = (await repository_access_resolve_ref01_ent.load(repository_access_resolve_ref01_match_dt0)).data()
    assert(repository_access_resolve_ref01_data_dt0.id === repository_access_resolve_ref01_data.id)


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
      '../../../../.sdk/test/entity/repository_access_resolve/RepositoryAccessResolveTestData.json')

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
    ['repository_access_resolve01','repository_access_resolve02','repository_access_resolve03','resolve01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPOSITORY_ACCESS_RESOLVE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPOSITORY_ACCESS_RESOLVE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPOSITORY_ACCESS_RESOLVE_ENTID']
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
  
