

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


describe('ChangeGroupMemberEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ChangeGroupMember()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ChangeGroupMember().create({"change_group_id":1,"organization_id":"x","repo_id":"x","change_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'change_group_member.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"change_id":{"a":true,"h":"Change Id","n":"change_id","r":true,"sh":"Change number","t":"`$STRING`","key$":"change_id","index$":0},"changes":{"a":true,"h":"Changes","n":"changes","r":true,"t":"`$ARRAY`","key$":"changes","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":3},"number":{"a":true,"h":"Number","n":"number","r":false,"t":"`$INTEGER`","key$":"number","index$":4},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":5},"title":{"a":true,"h":"Title","n":"title","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"title","index$":6}},"id":{"field":"id","name":"id"},"name":"change_group_member","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["change_id"],"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"change_group_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members","q":{"exist":["change_group_id","organization_id","repo_id"]},"r":{"param":{"id":"change_group_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"change_groups"},{"var":"change_group_id"},{"lit":"members"}],"t":{"req":"`reqdata`","res":"`body.group`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members/{change_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"change_group_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"change_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members/{change_id}","q":{"exist":["change_group_id","id","organization_id","repo_id"]},"r":{"param":{"change_id":"id","id":"change_group_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"change_groups"},{"var":"change_group_id"},{"lit":"members"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.group`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"change_group_member","name__orig":"change_group_member","Name":"ChangeGroupMember","name_":"change_group_member","name-":"change-group-member","NAME":"CHANGE_GROUP_MEMBER","index$":163}, {"active":true,"entity":"change_group_member","key$":"BasicChangeGroupMemberFlow","kind":"basic","name":"BasicChangeGroupMemberFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"change_group_member_ref01"},"m":{"change_group_id":"change_group01","organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"change_group_member_ref01","suffix":"_rm0"},"m":{"change_group_id":"change_group01","id":"change_group_member01","organization_id":"organization01","repo_id":"repo01"},"o":"remove","s":[],"v":[],"index$":1}]}, 'ChangeGroupMember', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["change_id"],"properties":{"change_id":{"type":"string","description":"Change number","canonical id":null,"or legacy diff id.":null,"key$":"change_id"}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members/{change_id}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"change_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"change_group_member.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members","change_group_member.remove.1":"GET-only live run: needs DELETE /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/change_groups/{id}/members/{change_id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const change_group_member_ref01_ent = client.ChangeGroupMember()
    let change_group_member_ref01_data = setup.data.new.change_group_member['change_group_member_ref01']
    change_group_member_ref01_data['change_group_id'] = setup.idmap['change_group01']
    change_group_member_ref01_data['organization_id'] = setup.idmap['organization01']
    change_group_member_ref01_data['repo_id'] = setup.idmap['repo01']

    change_group_member_ref01_data = (await change_group_member_ref01_ent.create(change_group_member_ref01_data)).data()
    assert(null != change_group_member_ref01_data.id)


    // REMOVE
    const change_group_member_ref01_match_rm0: any = { id: change_group_member_ref01_data.id }
    change_group_member_ref01_match_rm0['change_group_id'] = setup.idmap['change_group_id'] ?? setup.idmap['change_group01']
    change_group_member_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    change_group_member_ref01_match_rm0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    await change_group_member_ref01_ent.remove(change_group_member_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/change_group_member/ChangeGroupMemberTestData.json')

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
    ['change_group_member01','change_group_member02','change_group_member03','organization01','organization02','organization03','repo01','repo02','repo03','change_group01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CHANGE_GROUP_MEMBER_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CHANGE_GROUP_MEMBER_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CHANGE_GROUP_MEMBER_ENTID']
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
  
