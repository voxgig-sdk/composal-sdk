

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


describe('ChangeCommentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ChangeComment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ChangeComment().load({"change_id":1,"organization_id":"x","repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'change_comment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"body":{"a":true,"h":"Body","n":"body","r":true,"t":"`$STRING`","key$":"body","index$":0},"comment":{"a":true,"h":"Comment","n":"comment","r":false,"t":"`$OBJECT`","key$":"comment","index$":1},"comments":{"a":true,"h":"Comments","n":"comments","r":true,"t":"`$ARRAY`","key$":"comments","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":3},"kind":{"a":true,"h":"Kind","n":"kind","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"kind","index$":4},"line":{"a":true,"h":"Line","n":"line","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"line","index$":5},"parent_comment_id":{"a":true,"h":"Parent Comment Id","n":"parent_comment_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"parent_comment_id","index$":6},"patchset_id":{"a":true,"h":"Patchset Id","n":"patchset_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"patchset_id","index$":7},"path":{"a":true,"h":"Path","n":"path","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"path","index$":8},"side":{"a":true,"h":"Side","n":"side","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"side","index$":9}},"id":{"field":"id","name":"id"},"name":"change_comment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"change_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve","q":{"$action":"resolve","exist":["change_id","id","organization_id","repo_id"]},"r":{"param":{"comment_id":"id","id":"change_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"changes"},{"var":"change_id"},{"lit":"comments"},{"var":"id"},{"lit":"resolve"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/unresolve","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"change_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"comment_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/unresolve","q":{"$action":"unresolve","exist":["change_id","id","organization_id","repo_id"]},"r":{"param":{"comment_id":"id","id":"change_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"changes"},{"var":"change_id"},{"lit":"comments"},{"var":"id"},{"lit":"unresolve"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["body","kind","line","parent_comment_id","patchset_id","path","side"],"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"change_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments","q":{"exist":["change_id","organization_id","repo_id"]},"r":{"param":{"id":"change_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"changes"},{"var":"change_id"},{"lit":"comments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"change_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"path","or":"path","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"resolved","or":"resolved","r":false,"style":"form","t":"`$BOOLEAN`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments","q":{"exist":["change_id","organization_id","repo_id"]},"r":{"param":{"id":"change_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"changes"},{"var":"change_id"},{"lit":"comments"}],"t":{"req":"`reqdata`","res":"`body.comment`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo","$.main.kit.entity.change"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"change_comment","name__orig":"change_comment","Name":"ChangeComment","name_":"change_comment","name-":"change-comment","NAME":"CHANGE_COMMENT","index$":158}, {"active":true,"entity":"change_comment","key$":"BasicChangeCommentFlow","kind":"basic","name":"BasicChangeCommentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"change_comment_ref01"},"m":{"change_id":"change01","organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"change_comment_ref01","srcdatavar":"change_comment_ref01_data","suffix":"_dt0"},"m":{"id":"change_comment01","organization_id":"organization01","repo_id":"repo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-change_comment_ref01"}}],"index$":1}]}, 'ChangeComment', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"comment_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/unresolve":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"comment_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["body"],"properties":{"body":{"type":"string","key$":"body"},"patchset_id":{"type":"string","nullable":true,"key$":"patchset_id"},"path":{"type":"string","nullable":true,"key$":"path"},"side":{"type":"string","enum":["additions","deletions"],"nullable":true,"key$":"side"},"line":{"type":"integer","nullable":true,"key$":"line"},"parent_comment_id":{"type":"string","nullable":true,"key$":"parent_comment_id"},"kind":{"type":"string","nullable":true,"key$":"kind"}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"path","in":"query","required":false,"schema":{"type":"string"},"index$":3},{"name":"resolved","in":"query","required":false,"schema":{"type":"boolean"},"index$":4}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"change_comment.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{id}/comments/{comment_id}/resolve","change_comment.load.1":"GET-only live run: reads a record only change_comment.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const change_comment_ref01_ent = client.ChangeComment()
    let change_comment_ref01_data = setup.data.new.change_comment['change_comment_ref01']
    change_comment_ref01_data['change_id'] = setup.idmap['change01']
    change_comment_ref01_data['organization_id'] = setup.idmap['organization01']
    change_comment_ref01_data['repo_id'] = setup.idmap['repo01']

    change_comment_ref01_data = (await change_comment_ref01_ent.create(change_comment_ref01_data)).data()
    assert(null != change_comment_ref01_data.id)


    // LOAD
    const change_comment_ref01_match_dt0: any = {}
    change_comment_ref01_match_dt0.id = change_comment_ref01_data.id
    change_comment_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    change_comment_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    const change_comment_ref01_data_dt0 = (await change_comment_ref01_ent.load(change_comment_ref01_match_dt0)).data()
    assert(change_comment_ref01_data_dt0.id === change_comment_ref01_data.id)


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
      '../../../../.sdk/test/entity/change_comment/ChangeCommentTestData.json')

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
    ['change_comment01','change_comment02','change_comment03','organization01','organization02','organization03','repo01','repo02','repo03','change01','change02','change03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CHANGE_COMMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CHANGE_COMMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CHANGE_COMMENT_ENTID']
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
  
