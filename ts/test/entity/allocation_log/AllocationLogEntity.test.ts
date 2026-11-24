

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


describe('AllocationLogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AllocationLog()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AllocationLog().list({"allocation_id":1,"app_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'allocation_log.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"allocation_id":{"a":true,"h":"Allocation Id","n":"allocation_id","r":true,"t":"`$STRING`","key$":"allocation_id","index$":0},"environment":{"a":true,"h":"Environment","n":"environment","r":false,"t":"`$STRING`","key$":"environment","index$":1},"fetched_at":{"a":true,"fo":"date-time","h":"Fetched At","n":"fetched_at","r":true,"t":"`$STRING`","key$":"fetched_at","index$":2},"location":{"a":true,"h":"Location","n":"location","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"location","index$":3},"logs":{"a":true,"h":"Logs","n":"logs","r":true,"t":"`$STRING`","key$":"logs","index$":4},"namespace":{"a":true,"h":"Namespace","n":"namespace","r":true,"t":"`$STRING`","key$":"namespace","index$":5},"offset":{"a":true,"h":"Offset","n":"offset","r":true,"t":"`$INTEGER`","key$":"offset","index$":6},"origin":{"a":true,"h":"Origin","n":"origin","r":true,"t":"`$STRING`","key$":"origin","index$":7},"service":{"a":true,"h":"Service","n":"service","r":false,"t":"`$STRING`","key$":"service","index$":8},"task":{"a":true,"h":"Task","n":"task","r":true,"t":"`$STRING`","key$":"task","index$":9},"type":{"a":true,"h":"Type","n":"type","r":true,"t":"`$STRING`","key$":"type","index$":10}},"name":"allocation_log","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"allocation_id","or":"allocation_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":65536,"explode":true,"k":"query","n":"offset","or":"offset","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"ex":"end","explode":true,"k":"query","n":"origin","or":"origin","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"task","or":"task","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"ex":"stdout","explode":true,"k":"query","n":"type","or":"type","r":false,"style":"form","t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}/logs","q":{"exist":["allocation_id","app_id"]},"r":{"param":{"allocation_id":"allocation_id","app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_dashboard"},{"lit":"nomad"},{"lit":"allocations"},{"var":"allocation_id"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"allocation_log","name__orig":"allocation_log","Name":"AllocationLog","name_":"allocation_log","name-":"allocation-log","NAME":"ALLOCATION_LOG","index$":75}, {"active":true,"entity":"allocation_log","key$":"BasicAllocationLogFlow","kind":"basic","name":"BasicAllocationLogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"allocation_id":"allocation01","app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"allocation_log_ref01"}}],"index$":0}]}, 'AllocationLog', {"GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}/logs":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"allocation_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"task","in":"query","required":false,"schema":{"type":"string"},"index$":2},{"name":"type","in":"query","required":false,"schema":{"type":"string","enum":["stdout","stderr"],"default":"stdout"},"index$":3},{"name":"origin","in":"query","required":false,"schema":{"type":"string","enum":["start","end"],"default":"end"},"index$":4},{"name":"offset","in":"query","required":false,"schema":{"type":"integer","minimum":0,"maximum":262144,"default":65536},"index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let allocation_log_ref01_data = Object.values(setup.data.existing.allocation_log)[0] as any

    // LIST
    const allocation_log_ref01_ent = client.AllocationLog()
    const allocation_log_ref01_match: any = {}
    allocation_log_ref01_match['allocation_id'] = setup.idmap['allocation01']
    allocation_log_ref01_match['app_id'] = setup.idmap['app01']

    const allocation_log_ref01_list = (await allocation_log_ref01_ent.list(allocation_log_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/allocation_log/AllocationLogTestData.json')

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
    ['allocation_log01','allocation_log02','allocation_log03','app01','app02','app03','allocation01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ALLOCATION_LOG_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ALLOCATION_LOG_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ALLOCATION_LOG_ENTID']
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
  
