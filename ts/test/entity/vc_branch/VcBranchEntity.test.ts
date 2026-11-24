

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


describe('VcBranchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.VcBranch()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VcBranch().list({"organization_id":1,"repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vc_branch.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":1},"target_commit_id":{"a":true,"h":"Target Commit Id","n":"target_commit_id","r":true,"t":"`$STRING`","key$":"target_commit_id","index$":2}},"id":{"field":"id","name":"id"},"name":"vc_branch","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"branches"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"branches"}],"t":{"req":"`reqdata`","res":"`body.branches`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches/{branch_name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"branch_name","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches/{branch_name}","q":{"exist":["id","organization_id","repo_id"]},"r":{"param":{"branch_name":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"branches"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"key$":"vc_branch","name__orig":"vc_branch","Name":"VcBranch","name_":"vc_branch","name-":"vc-branch","NAME":"VC_BRANCH","index$":522}, {"active":true,"entity":"vc_branch","key$":"BasicVcBranchFlow","kind":"basic","name":"BasicVcBranchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"vc_branch_ref01"},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vc_branch_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"vc_branch_ref01","suffix":"_rm0"},"m":{"id":"vc_branch01","organization_id":"organization01","repo_id":"repo01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"vc_branch_ref01"}}],"index$":3}]}, 'VcBranch', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches/{branch_name}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"branch_name","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"vc_branch.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches","vc_branch.remove.2":"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/branches/{branch_name}","vc_branch.list.3":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const vc_branch_ref01_ent = client.VcBranch()
    let vc_branch_ref01_data = setup.data.new.vc_branch['vc_branch_ref01']
    vc_branch_ref01_data['organization_id'] = setup.idmap['organization01']
    vc_branch_ref01_data['repo_id'] = setup.idmap['repo01']

    vc_branch_ref01_data = (await vc_branch_ref01_ent.create(vc_branch_ref01_data)).data()
    assert(null != vc_branch_ref01_data.id)


    // LIST
    const vc_branch_ref01_match: any = {}
    vc_branch_ref01_match['organization_id'] = setup.idmap['organization01']
    vc_branch_ref01_match['repo_id'] = setup.idmap['repo01']

    const vc_branch_ref01_list = (await vc_branch_ref01_ent.list(vc_branch_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(vc_branch_ref01_list, { id: vc_branch_ref01_data.id })))


    // REMOVE
    const vc_branch_ref01_match_rm0: any = { id: vc_branch_ref01_data.id }
    vc_branch_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    vc_branch_ref01_match_rm0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    await vc_branch_ref01_ent.remove(vc_branch_ref01_match_rm0)
  

    // LIST
    const vc_branch_ref01_match_rt0: any = {}
    vc_branch_ref01_match_rt0['organization_id'] = setup.idmap['organization01']
    vc_branch_ref01_match_rt0['repo_id'] = setup.idmap['repo01']

    const vc_branch_ref01_list_rt0 = (await vc_branch_ref01_ent.list(vc_branch_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(vc_branch_ref01_list_rt0, { id: vc_branch_ref01_data.id })))


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
      '../../../../.sdk/test/entity/vc_branch/VcBranchTestData.json')

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
    ['vc_branch01','vc_branch02','vc_branch03','organization01','organization02','organization03','repo01','repo02','repo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_VC_BRANCH_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_VC_BRANCH_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_VC_BRANCH_ENTID']
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
  
