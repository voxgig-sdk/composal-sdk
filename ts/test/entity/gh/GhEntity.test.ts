

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


describe('GhEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Gh()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Gh().load({"gh_id":1,"github_repo":"x","id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'gh.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","r":true,"t":"`$OBJECT`","key$":"capabilities","index$":0},"content":{"a":true,"h":"Content","n":"content","r":true,"t":"`$OBJECT`","key$":"content","index$":1},"fetched_at":{"a":true,"h":"Fetched At","n":"fetched_at","r":true,"t":"`$STRING`","key$":"fetched_at","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":3},"magic_merge":{"a":true,"h":"Magic Merge","n":"magic_merge","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"magic_merge","index$":4},"pull_request":{"a":true,"h":"Pull Request","n":"pull_request","r":true,"t":"`$ANY`","key$":"pull_request","index$":5},"stack":{"a":true,"h":"Stack","n":"stack","r":true,"t":"`$OBJECT`","key$":"stack","index$":6},"transcript_paths":{"a":true,"h":"Transcript Paths","n":"transcript_paths","r":true,"t":"`$ARRAY`","key$":"transcript_paths","index$":7}},"id":{"field":"id","name":"id","parts":["gh_id","github_repo","id"],"sep":"/"},"name":"gh","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/gh/{github_owner}/{github_repo}/{number}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"gh_id","or":"github_owner","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"gh_id","or":"github_owner","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"github_repo","or":"github_repo","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"github_repo","or":"github_repo","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"param","n":"id","or":"number","r":true,"t":"`$STRING`","index$":4},{"a":true,"k":"param","n":"id","or":"number","r":true,"t":"`$STRING`","index$":5},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":6},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":7}],"query":[{"a":true,"explode":true,"k":"query","n":"check_id","or":"check_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"job_id","or":"job_id","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":3},{"a":true,"explode":true,"k":"query","n":"run_id","or":"run_id","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"section","or":"section","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"thread_id","or":"thread_id","r":false,"style":"form","t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/gh/{github_owner}/{github_repo}/{number}","q":{"exist":["gh_id","github_repo","id","organization_id"]},"r":{"param":{"github_owner":"gh_id","github_repo":"github_repo","number":"id","org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"gh"},{"var":"gh_id"},{"var":"github_repo"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"gh","name__orig":"gh","Name":"Gh","name_":"gh","name-":"gh","NAME":"GH","index$":243}, {"active":true,"entity":"gh","key$":"BasicGhFlow","kind":"basic","name":"BasicGhFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"gh_ref01","srcdatavar":"gh_ref01_data","suffix":"_dt0"},"m":{"gh_id":"gh01","github_repo":"github_repo01","id":"gh01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-gh_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{org_slug}/gh/{github_owner}/{github_repo}/{number}","record":{}}]}, 'Gh', {"GET /api/v1/organizations/{org_slug}/gh/{github_owner}/{github_repo}/{number}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"github_owner","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"github_repo","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"number","in":"path","required":true,"schema":{"type":"string"},"index$":3},{"in":"path","name":"org_slug","required":true,"schema":{"type":"string"},"index$":4},{"in":"path","required":true,"schema":{"type":"string"},"name":"github_owner","index$":5},{"in":"path","required":true,"schema":{"type":"string"},"name":"github_repo","index$":6},{"in":"path","name":"number","required":true,"schema":{"type":"string"},"index$":7},{"in":"query","name":"section","schema":{"type":"string"},"index$":8},{"in":"query","name":"page","schema":{"type":"integer"},"index$":9},{"in":"query","name":"cursor","schema":{"type":"string"},"index$":10},{"name":"thread_id","in":"query","schema":{"type":"string"},"index$":11},{"name":"check_id","in":"query","schema":{"type":"string"},"index$":12},{"in":"query","name":"run_id","schema":{"type":"string"},"index$":13},{"in":"query","name":"job_id","schema":{"type":"string"},"index$":14}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let gh_ref01_data = Object.values(setup.data.existing.gh)[0] as any

    // LOAD
    const gh_ref01_ent = client.Gh()
    const gh_ref01_match_dt0: any = {}
    gh_ref01_match_dt0.id = gh_ref01_data.id
    gh_ref01_match_dt0['gh_id'] = setup.idmap['gh_id'] ?? setup.idmap['gh01']
    gh_ref01_match_dt0['github_repo'] = setup.idmap['github_repo'] ?? setup.idmap['github_repo01']
    gh_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const gh_ref01_data_dt0 = (await gh_ref01_ent.load(gh_ref01_match_dt0)).data()
    assert(gh_ref01_data_dt0.id === gh_ref01_data.id)


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
      '../../../../.sdk/test/entity/gh/GhTestData.json')

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
    ['gh01','gh02','gh03','organization01','organization02','organization03','github_repo01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GH_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GH_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GH_ENTID']
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
  
