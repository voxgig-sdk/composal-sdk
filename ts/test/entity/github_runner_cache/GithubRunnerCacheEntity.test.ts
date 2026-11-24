

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


describe('GithubRunnerCacheEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GithubRunnerCache()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GithubRunnerCache().create({"entry_id":1,"operation":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_runner_cache.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"entry_id":{"a":true,"h":"Entry Id","n":"entry_id","r":false,"t":"`$STRING`","key$":"entry_id","index$":0},"key":{"a":true,"h":"Key","n":"key","r":false,"t":"`$STRING`","key$":"key","index$":1},"matched_key":{"a":true,"h":"Matched Key","n":"matched_key","r":false,"t":"`$STRING`","key$":"matched_key","index$":2},"ok":{"a":true,"h":"Ok","n":"ok","r":true,"t":"`$BOOLEAN`","key$":"ok","index$":3},"operation":{"a":true,"h":"Operation","n":"operation","r":true,"t":"`$STRING`","key$":"operation","index$":4},"restore_keys":{"a":true,"h":"Restore Keys","n":"restore_keys","r":false,"t":"`$ARRAY`","key$":"restore_keys","index$":5},"signed_download_url":{"a":true,"h":"Signed Download Url","n":"signed_download_url","r":false,"t":"`$STRING`","key$":"signed_download_url","index$":6},"size_bytes":{"a":true,"h":"Size Bytes","n":"size_bytes","r":false,"t":"`$STRING`","key$":"size_bytes","index$":7},"upload_path":{"a":true,"h":"Upload Path","n":"upload_path","r":false,"t":"`$STRING`","key$":"upload_path","index$":8},"version":{"a":true,"h":"Version","n":"version","r":false,"t":"`$STRING`","key$":"version","index$":9}},"name":"github_runner_cache","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["entry_id","key","operation","restore_keys","size_bytes","version"],"co":{"id":"POST /api/v1/github_runner_cache","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/github_runner_cache","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"github_runner_cache"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"github_runner_cache","name__orig":"github_runner_cache","Name":"GithubRunnerCache","name_":"github_runner_cache","name-":"github-runner-cache","NAME":"GITHUB_RUNNER_CACHE","index$":266}, {"active":true,"entity":"github_runner_cache","key$":"BasicGithubRunnerCacheFlow","kind":"basic","name":"BasicGithubRunnerCacheFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"github_runner_cache_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'GithubRunnerCache', {"POST /api/v1/github_runner_cache":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["operation"],"properties":{"operation":{"type":"string","enum":["GetCacheEntryDownloadURL","CreateCacheEntry","ReserveUpload","FinalizeCacheEntryUpload"],"key$":"operation"},"key":{"type":"string","maxLength":512,"key$":"key"},"version":{"type":"string","maxLength":512,"key$":"version"},"restore_keys":{"type":"array","maxItems":32,"items":{"type":"string","maxLength":512},"key$":"restore_keys"},"entry_id":{"type":"string","key$":"entry_id"},"size_bytes":{"type":"string","key$":"size_bytes"}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"github_runner_cache.create.0":"GET-only live run: needs POST /api/v1/github_runner_cache"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const github_runner_cache_ref01_ent = client.GithubRunnerCache()
    let github_runner_cache_ref01_data = setup.data.new.github_runner_cache['github_runner_cache_ref01']

    github_runner_cache_ref01_data = (await github_runner_cache_ref01_ent.create(github_runner_cache_ref01_data)).data()
    assert(null != github_runner_cache_ref01_data)


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
      '../../../../.sdk/test/entity/github_runner_cache/GithubRunnerCacheTestData.json')

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
    ['github_runner_cache01','github_runner_cache02','github_runner_cache03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GITHUB_RUNNER_CACHE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GITHUB_RUNNER_CACHE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GITHUB_RUNNER_CACHE_ENTID']
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
  
