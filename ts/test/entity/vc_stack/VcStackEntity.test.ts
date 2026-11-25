

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


describe('VcStackEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.VcStack()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VcStack().list({"organization_id":1,"repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'vc_stack.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"alias_ref_name":{"a":true,"h":"Alias Ref Name","n":"alias_ref_name","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"alias_ref_name","index$":0},"changes":{"a":true,"h":"Changes","n":"changes","r":true,"t":"`$ARRAY`","key$":"changes","index$":1},"code":{"a":true,"h":"Code","n":"code","r":true,"t":"`$STRING`","key$":"code","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":3},"landing":{"a":true,"h":"Landing","n":"landing","r":false,"sh":"Compact landing state for the Stack CLI.","t":"`$OBJECT`","key$":"landing","index$":4},"member_count":{"a":true,"h":"Member Count","n":"member_count","r":true,"t":"`$INTEGER`","key$":"member_count","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"name","index$":6},"ref_name":{"a":true,"h":"Ref Name","n":"ref_name","r":true,"t":"`$STRING`","key$":"ref_name","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":8},"tip_change_number":{"a":true,"h":"Tip Change Number","n":"tip_change_number","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"tip_change_number","index$":9},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":10},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":"`$STRING`","key$":"updated_at_label","index$":11}},"id":{"field":"id","name":"id"},"name":"vc_stack","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"stacks"}],"t":{"req":"`reqdata`","res":"`body.stacks`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"code","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}","q":{"exist":["id","organization_id","repo_id"]},"r":{"param":{"code":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"stacks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.stack`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["name"],"co":{"id":"PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"code","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name","q":{"$action":"name","exist":["id","organization_id","repo_id"]},"r":{"param":{"code":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"stacks"},{"var":"id"},{"lit":"name"}],"t":{"req":"`reqdata`","res":"`body.stack`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"vc_stack","name__orig":"vc_stack","Name":"VcStack","name_":"vc_stack","name-":"vc-stack","NAME":"VC_STACK","index$":531}, {"active":true,"entity":"vc_stack","key$":"BasicVcStackFlow","kind":"basic","name":"BasicVcStackFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"vc_stack_ref01"}}],"index$":0},{"a":false,"d":{"organization_id":"organization01","repo_id":"repo01"},"i":{"ref":"vc_stack_ref01","srcdatavar":"vc_stack_ref01_data","suffix":"_up0","textfield":"alias_ref_name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vc_stack_ref01"}}],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"vc_stack_ref01","srcdatavar":"vc_stack_ref01_data","suffix":"_dt0"},"m":{"id":"vc_stack01","organization_id":"organization01","repo_id":"repo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-vc_stack_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}","record":{}}]}, 'VcStack', {"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"code","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["name"],"properties":{"name":{"type":"string","nullable":true}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"code","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"vc_stack.update.1":"GET-only live run: needs PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/stacks/{code}/name"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let vc_stack_ref01_data = Object.values(setup.data.existing.vc_stack)[0] as any

    // LIST
    const vc_stack_ref01_ent = client.VcStack()
    const vc_stack_ref01_match: any = {}
    vc_stack_ref01_match['organization_id'] = setup.idmap['organization01']
    vc_stack_ref01_match['repo_id'] = setup.idmap['repo01']

    const vc_stack_ref01_list = (await vc_stack_ref01_ent.list(vc_stack_ref01_match)).map((e: any) => e.data())


    // LOAD
    const vc_stack_ref01_match_dt0: any = {}
    vc_stack_ref01_match_dt0.id = vc_stack_ref01_data.id
    vc_stack_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    vc_stack_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    const vc_stack_ref01_data_dt0 = (await vc_stack_ref01_ent.load(vc_stack_ref01_match_dt0)).data()
    assert(vc_stack_ref01_data_dt0.id === vc_stack_ref01_data.id)


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
      '../../../../.sdk/test/entity/vc_stack/VcStackTestData.json')

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
    ['vc_stack01','vc_stack02','vc_stack03','organization01','organization02','organization03','repo01','repo02','repo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_VC_STACK_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_VC_STACK_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_VC_STACK_ENTID']
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
  
