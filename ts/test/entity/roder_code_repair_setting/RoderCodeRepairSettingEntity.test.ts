

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


describe('RoderCodeRepairSettingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RoderCodeRepairSetting()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('roder_code_repair_setting hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).RoderCodeRepairSetting().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).RoderCodeRepairSetting()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.RoderCodeRepairSetting().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().RoderCodeRepairSetting().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.RoderCodeRepairSetting().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.RoderCodeRepairSetting().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RoderCodeRepairSetting().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'roder_code_repair_setting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"available":{"a":true,"h":"Available","n":"available","r":true,"t":"`$BOOLEAN`","key$":"available","index$":0},"daily_limit":{"a":true,"h":"Daily Limit","n":"daily_limit","r":true,"t":"`$INTEGER`","key$":"daily_limit","index$":1},"enabled":{"a":true,"h":"Enabled","n":"enabled","r":true,"t":"`$BOOLEAN`","key$":"enabled","index$":2},"enabled_at":{"a":true,"fo":"date-time","h":"Enabled At","n":"enabled_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"enabled_at","index$":3},"operator_user_id":{"a":true,"h":"Operator User Id","n":"operator_user_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"operator_user_id","index$":4},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":5},"repository_slug":{"a":true,"h":"Repository Slug","n":"repository_slug","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Connected Composal repository required when enabling","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_slug","index$":6}},"name":"roder_code_repair_setting","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["enabled","organization_id","repository_slug"],"co":{"id":"POST /api/v1/agent/roder/code_repair_settings","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/agent/roder/code_repair_settings","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"code_repair_settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/agent/roder/code_repair_settings","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"organization_id","or":"organization_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent/roder/code_repair_settings","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"code_repair_settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"roder_code_repair_setting","name__orig":"roder_code_repair_setting","Name":"RoderCodeRepairSetting","name_":"roder_code_repair_setting","name-":"roder-code-repair-setting","NAME":"RODER_CODE_REPAIR_SETTING","index$":443}, {"active":true,"entity":"roder_code_repair_setting","key$":"BasicRoderCodeRepairSettingFlow","kind":"basic","name":"BasicRoderCodeRepairSettingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"roder_code_repair_setting_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"roder_code_repair_setting_ref01"}}],"index$":1}]}, 'RoderCodeRepairSetting', {"POST /api/v1/agent/roder/code_repair_settings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["organization_id","enabled"],"properties":{"organization_id":{"type":"string","key$":"organization_id"},"enabled":{"type":"boolean","key$":"enabled"},"repository_slug":{"type":"string","description":"Connected Composal repository required when enabling","key$":"repository_slug"}}}}}},"parameters":[]},"GET /api/v1/agent/roder/code_repair_settings":{"protocol":"http","parameters":[{"in":"query","name":"organization_id","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"roder_code_repair_setting.create.0":"GET-only live run: needs POST /api/v1/agent/roder/code_repair_settings"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const roder_code_repair_setting_ref01_ent = client.RoderCodeRepairSetting()
    let roder_code_repair_setting_ref01_data = setup.data.new.roder_code_repair_setting['roder_code_repair_setting_ref01']

    roder_code_repair_setting_ref01_data = (await roder_code_repair_setting_ref01_ent.create(roder_code_repair_setting_ref01_data)).data()
    assert(null != roder_code_repair_setting_ref01_data)


    // LIST
    const roder_code_repair_setting_ref01_match: any = {}

    const roder_code_repair_setting_ref01_list = (await roder_code_repair_setting_ref01_ent.list(roder_code_repair_setting_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/roder_code_repair_setting/RoderCodeRepairSettingTestData.json')

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
    ['roder_code_repair_setting01','roder_code_repair_setting02','roder_code_repair_setting03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_RODER_CODE_REPAIR_SETTING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_RODER_CODE_REPAIR_SETTING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_RODER_CODE_REPAIR_SETTING_ENTID']
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
  
