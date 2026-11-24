

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


describe('RoderCodeRepairEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RoderCodeRepair()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('roder_code_repair hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).RoderCodeRepair().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).RoderCodeRepair()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.RoderCodeRepair().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().RoderCodeRepair().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.RoderCodeRepair().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.RoderCodeRepair().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RoderCodeRepair().list({"scenario_run_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'roder_code_repair.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base_sha":{"a":true,"h":"Base Sha","n":"base_sha","r":true,"t":"`$STRING`","key$":"base_sha","index$":0},"cancel_requested":{"a":true,"h":"Cancel Requested","n":"cancel_requested","r":true,"t":"`$BOOLEAN`","key$":"cancel_requested","index$":1},"failure_code":{"a":true,"h":"Failure Code","n":"failure_code","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_code","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"launch_state":{"a":true,"h":"Launch State","n":"launch_state","r":true,"t":"`$STRING`","key$":"launch_state","index$":4},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":5},"repository_slug":{"a":true,"h":"Repository Slug","n":"repository_slug","r":true,"t":"`$STRING`","key$":"repository_slug","index$":6},"roder_thread_id":{"a":true,"h":"Roder Thread Id","n":"roder_thread_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"roder_thread_id","index$":7},"roder_turn_id":{"a":true,"h":"Roder Turn Id","n":"roder_turn_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"roder_turn_id","index$":8},"scenario_run_id":{"a":true,"h":"Scenario Run Id","n":"scenario_run_id","r":true,"t":"`$STRING`","key$":"scenario_run_id","index$":9},"task":{"a":true,"h":"Task","n":"task","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"task","index$":10},"trigger_kind":{"a":true,"h":"Trigger Kind","n":"trigger_kind","r":true,"t":"`$STRING`","key$":"trigger_kind","index$":11}},"id":{"field":"id","name":"id"},"name":"roder_code_repair","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/agent/roder/code_repairs/{id}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/agent/roder/code_repairs/{id}/cancel","q":{"$action":"cancel","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"code_repairs"},{"var":"id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["base_sha","organization_id","repository_slug","scenario_run_id"],"co":{"id":"POST /api/v1/agent/roder/code_repairs","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/agent/roder/code_repairs","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"code_repairs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/agent/roder/code_repairs","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"scenario_run_id","or":"scenario_run_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent/roder/code_repairs","q":{"exist":["scenario_run_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"code_repairs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/agent/roder/code_repairs/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent/roder/code_repairs/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"code_repairs"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"roder_code_repair","name__orig":"roder_code_repair","Name":"RoderCodeRepair","name_":"roder_code_repair","name-":"roder-code-repair","NAME":"RODER_CODE_REPAIR","index$":442}, {"active":true,"entity":"roder_code_repair","key$":"BasicRoderCodeRepairFlow","kind":"basic","name":"BasicRoderCodeRepairFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"roder_code_repair_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"roder_code_repair_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"roder_code_repair_ref01","srcdatavar":"roder_code_repair_ref01_data","suffix":"_dt0"},"m":{"id":"roder_code_repair01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-roder_code_repair_ref01"}}],"index$":2,"route":"GET /api/v1/agent/roder/code_repairs/{id}","record":{}}]}, 'RoderCodeRepair', {"POST /api/v1/agent/roder/code_repairs/{id}/cancel":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/agent/roder/code_repairs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["organization_id","scenario_run_id","repository_slug","base_sha"],"properties":{"organization_id":{"type":"string","key$":"organization_id"},"scenario_run_id":{"type":"string","key$":"scenario_run_id"},"repository_slug":{"type":"string","key$":"repository_slug"},"base_sha":{"type":"string","pattern":"^[0-9a-f]{40}$","key$":"base_sha"}}}}}},"parameters":[]},"GET /api/v1/agent/roder/code_repairs":{"protocol":"http","parameters":[{"in":"query","name":"scenario_run_id","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/agent/roder/code_repairs/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"roder_code_repair.create.0":"GET-only live run: needs POST /api/v1/agent/roder/code_repairs/{id}/cancel"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const roder_code_repair_ref01_ent = client.RoderCodeRepair()
    let roder_code_repair_ref01_data = setup.data.new.roder_code_repair['roder_code_repair_ref01']

    roder_code_repair_ref01_data = (await roder_code_repair_ref01_ent.create(roder_code_repair_ref01_data)).data()
    assert(null != roder_code_repair_ref01_data.id)


    // LIST
    const roder_code_repair_ref01_match: any = {}

    const roder_code_repair_ref01_list = (await roder_code_repair_ref01_ent.list(roder_code_repair_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(roder_code_repair_ref01_list, { id: roder_code_repair_ref01_data.id })))


    // LOAD
    const roder_code_repair_ref01_match_dt0: any = {}
    roder_code_repair_ref01_match_dt0.id = roder_code_repair_ref01_data.id
    const roder_code_repair_ref01_data_dt0 = (await roder_code_repair_ref01_ent.load(roder_code_repair_ref01_match_dt0)).data()
    assert(roder_code_repair_ref01_data_dt0.id === roder_code_repair_ref01_data.id)


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
      '../../../../.sdk/test/entity/roder_code_repair/RoderCodeRepairTestData.json')

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
    ['roder_code_repair01','roder_code_repair02','roder_code_repair03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_RODER_CODE_REPAIR_ENTID']
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
  
