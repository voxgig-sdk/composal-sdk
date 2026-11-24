

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


describe('PatchsetDiffEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PatchsetDiff()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PatchsetDiff().load({"change_id":1,"id":"x","organization_id":"x","patchset_id":"x","repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'patchset_diff.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"files":{"a":true,"h":"Files","n":"files","r":true,"t":"`$ARRAY`","key$":"files","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":1},"patchset":{"a":true,"h":"Patchset","n":"patchset","r":true,"t":"`$OBJECT`","key$":"patchset","index$":2}},"id":{"field":"id","name":"id"},"name":"patchset_diff","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/patchsets/{patchset_number}/diff/{fingerprint}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"change_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"fingerprint","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"fingerprint","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"param","n":"patchset_id","or":"patchset_number","r":true,"t":"`$STRING`","index$":4},{"a":true,"k":"param","n":"patchset_id","or":"patchset_number","r":true,"t":"`$INTEGER`","index$":5},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/patchsets/{patchset_number}/diff/{fingerprint}","q":{"exist":["change_id","id","organization_id","patchset_id","repo_id"]},"r":{"param":{"fingerprint":"id","id":"change_id","org_slug":"organization_id","patchset_number":"patchset_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"changes"},{"var":"change_id"},{"lit":"patchsets"},{"var":"patchset_id"},{"lit":"diff"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo","$.main.kit.entity.change"]]},"key$":"patchset_diff","name__orig":"patchset_diff","Name":"PatchsetDiff","name_":"patchset_diff","name-":"patchset-diff","NAME":"PATCHSET_DIFF","index$":373}, {"active":true,"entity":"patchset_diff","key$":"BasicPatchsetDiffFlow","kind":"basic","name":"BasicPatchsetDiffFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"patchset_diff_ref01","srcdatavar":"patchset_diff_ref01_data","suffix":"_dt0"},"m":{"change_id":"change01","id":"patchset_diff01","organization_id":"organization01","patchset_id":"patchset01","repo_id":"repo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-patchset_diff_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/patchsets/{patchset_number}/diff/{fingerprint}","record":{}}]}, 'PatchsetDiff', {"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/patchsets/{patchset_number}/diff/{fingerprint}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"patchset_number","in":"path","required":true,"schema":{"type":"string"},"index$":3},{"name":"fingerprint","in":"path","required":true,"schema":{"type":"string"},"index$":4},{"name":"patchset_number","in":"path","required":true,"schema":{"type":"integer","minimum":1},"index$":5},{"name":"fingerprint","in":"path","required":true,"description":"Opaque cache token from the patchset's `diff_path`. It is not a capability — every request is authorized like any other read of the change. A fingerprint that no longer matches still returns the current diff, but without the `immutable` directive.","schema":{"type":"string","pattern":"^[0-9a-f]{16}$"},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let patchset_diff_ref01_data = Object.values(setup.data.existing.patchset_diff)[0] as any

    // LOAD
    const patchset_diff_ref01_ent = client.PatchsetDiff()
    const patchset_diff_ref01_match_dt0: any = {}
    patchset_diff_ref01_match_dt0.id = patchset_diff_ref01_data.id
    patchset_diff_ref01_match_dt0['change_id'] = setup.idmap['change_id'] ?? setup.idmap['change01']
    patchset_diff_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    patchset_diff_ref01_match_dt0['patchset_id'] = setup.idmap['patchset_id'] ?? setup.idmap['patchset01']
    patchset_diff_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    const patchset_diff_ref01_data_dt0 = (await patchset_diff_ref01_ent.load(patchset_diff_ref01_match_dt0)).data()
    assert(patchset_diff_ref01_data_dt0.id === patchset_diff_ref01_data.id)


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
      '../../../../.sdk/test/entity/patchset_diff/PatchsetDiffTestData.json')

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
    ['patchset_diff01','patchset_diff02','patchset_diff03','organization01','organization02','organization03','repo01','repo02','repo03','change01','change02','change03','patchset01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PATCHSET_DIFF_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PATCHSET_DIFF_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PATCHSET_DIFF_ENTID']
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
  
