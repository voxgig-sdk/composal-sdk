

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


describe('RepoVcCommitEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepoVcCommit()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepoVcCommit().list({"organization_id":1,"repo_id":"x","ref":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repo_vc_commit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":0},"target_commit_id":{"a":true,"h":"Target Commit Id","n":"target_commit_id","r":true,"t":"`$STRING`","key$":"target_commit_id","index$":1}},"name":"repo_vc_commit","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":50,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"ex":25,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"explode":true,"k":"query","n":"offset","or":"offset","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"ex":0,"explode":true,"k":"query","n":"offset","or":"offset","r":false,"style":"form","t":"`$INTEGER`","index$":3},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":4},{"a":true,"explode":true,"k":"query","n":"path","or":"path","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":7},{"a":true,"explode":true,"k":"query","n":"ref","or":"ref","r":true,"style":"form","t":"`$STRING`","index$":8},{"a":true,"explode":true,"k":"query","n":"ref","or":"ref","r":false,"style":"form","t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits","q":{"exist":["organization_id","ref","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"commits"}],"t":{"page":{"more":"`body.has_more`","next":"`body.pagination.next`"},"req":"`reqdata`","res":"`body.branches`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"key$":"repo_vc_commit","name__orig":"repo_vc_commit","Name":"RepoVcCommit","name_":"repo_vc_commit","name-":"repo-vc-commit","NAME":"REPO_VC_COMMIT","index$":431}, {"active":true,"entity":"repo_vc_commit","key$":"BasicRepoVcCommitFlow","kind":"basic","name":"BasicRepoVcCommitFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"repo_vc_commit_ref01"}}],"index$":0}]}, 'RepoVcCommit', {"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/commits":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"ref","in":"query","required":true,"schema":{"type":"string"},"index$":2},{"name":"limit","in":"query","schema":{"type":"integer","default":50,"maximum":100},"index$":3},{"name":"offset","in":"query","schema":{"type":"integer","default":0},"index$":4},{"name":"q","in":"query","description":"Filter by commit message, author, or SHA","schema":{"type":"string"},"index$":5},{"name":"ref","in":"query","required":false,"description":"Bookmark or commit id to walk. Omitted, the repository's authoritative trunk is resolved server-side and echoed back as `ref_name`.","schema":{"type":"string"},"index$":6},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":25},"index$":7},{"name":"page","in":"query","required":false,"description":"1-based page number. Prefer this over `offset`.","schema":{"type":"integer","minimum":1,"default":1},"index$":8},{"name":"offset","in":"query","required":false,"description":"Deprecated alias for `page`; snapped to the page containing this offset. Use `page`.","deprecated":true,"schema":{"type":"integer","minimum":0,"default":0},"index$":9},{"name":"q","in":"query","required":false,"schema":{"type":"string"},"index$":10},{"name":"path","in":"query","required":false,"schema":{"type":"string"},"index$":11}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let repo_vc_commit_ref01_data = Object.values(setup.data.existing.repo_vc_commit)[0] as any

    // LIST
    const repo_vc_commit_ref01_ent = client.RepoVcCommit()
    const repo_vc_commit_ref01_match: any = {}
    repo_vc_commit_ref01_match['organization_id'] = setup.idmap['organization01']
    repo_vc_commit_ref01_match['repo_id'] = setup.idmap['repo01']

    const repo_vc_commit_ref01_list = (await repo_vc_commit_ref01_ent.list(repo_vc_commit_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/repo_vc_commit/RepoVcCommitTestData.json')

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
    ['repo_vc_commit01','repo_vc_commit02','repo_vc_commit03','organization01','organization02','organization03','repo01','repo02','repo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPO_VC_COMMIT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPO_VC_COMMIT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPO_VC_COMMIT_ENTID']
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
  
