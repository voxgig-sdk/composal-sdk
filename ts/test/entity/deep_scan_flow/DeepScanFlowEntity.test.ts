

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


describe('DeepScanFlowEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeepScanFlow()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeepScanFlow().create({"organization_id":1,"flow_names":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deep_scan_flow.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_id":{"a":true,"h":"Account Id","n":"account_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"account_id","index$":0},"concurrency":{"a":true,"h":"Concurrency","n":"concurrency","r":false,"t":"`$INTEGER`","key$":"concurrency","index$":1},"environment_id":{"a":true,"h":"Environment Id","n":"environment_id","r":false,"t":"`$STRING`","key$":"environment_id","index$":2},"exploration_id":{"a":true,"h":"Exploration Id","n":"exploration_id","r":false,"t":"`$STRING`","key$":"exploration_id","index$":3},"flow_names":{"a":true,"h":"Flow Names","n":"flow_names","r":true,"t":"`$ARRAY`","key$":"flow_names","index$":4},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":false,"t":"`$STRING`","key$":"idempotency_key","index$":5},"max_seconds":{"a":true,"h":"Max Seconds","n":"max_seconds","r":false,"t":"`$INTEGER`","key$":"max_seconds","index$":6},"max_testers":{"a":true,"h":"Max Testers","n":"max_testers","r":false,"t":"`$INTEGER`","key$":"max_testers","index$":7},"note":{"a":true,"h":"Note","n":"note","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"note","index$":8}},"name":"deep_scan_flow","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["account_id","concurrency","environment_id","exploration_id","flow_names","idempotency_key","max_seconds","max_testers","note"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/deep_scans/flows","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/deep_scans/flows","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"},{"lit":"flows"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"deep_scan_flow","name__orig":"deep_scan_flow","Name":"DeepScanFlow","name_":"deep_scan_flow","name-":"deep-scan-flow","NAME":"DEEP_SCAN_FLOW","index$":195}, {"active":true,"entity":"deep_scan_flow","key$":"BasicDeepScanFlowFlow","kind":"basic","name":"BasicDeepScanFlowFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"deep_scan_flow_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'DeepScanFlow', {"POST /api/v1/organizations/{organization_id}/verify/deep_scans/flows":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["flow_names"],"description":"Supply exploration_id to scan that exploration's flows on its environment, or environment_id to scan the environment's newest discovery map.","properties":{"environment_id":{"type":"string","key$":"environment_id"},"exploration_id":{"type":"string","key$":"exploration_id"},"account_id":{"type":"string","nullable":true,"key$":"account_id"},"flow_names":{"type":"array","minItems":1,"items":{"type":"string"},"key$":"flow_names"},"note":{"type":"string","nullable":true,"maxLength":1000,"key$":"note"},"max_seconds":{"type":"integer","minimum":60,"maximum":43200,"default":14400,"key$":"max_seconds"},"max_testers":{"type":"integer","minimum":1,"maximum":200,"default":40,"key$":"max_testers"},"concurrency":{"type":"integer","minimum":1,"maximum":96,"default":20,"key$":"concurrency"},"idempotency_key":{"type":"string","key$":"idempotency_key"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"deep_scan_flow.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/deep_scans/flows"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const deep_scan_flow_ref01_ent = client.DeepScanFlow()
    let deep_scan_flow_ref01_data = setup.data.new.deep_scan_flow['deep_scan_flow_ref01']
    deep_scan_flow_ref01_data['organization_id'] = setup.idmap['organization01']

    deep_scan_flow_ref01_data = (await deep_scan_flow_ref01_ent.create(deep_scan_flow_ref01_data)).data()
    assert(null != deep_scan_flow_ref01_data)


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
      '../../../../.sdk/test/entity/deep_scan_flow/DeepScanFlowTestData.json')

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
    ['deep_scan_flow01','deep_scan_flow02','deep_scan_flow03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEEP_SCAN_FLOW_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEEP_SCAN_FLOW_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEEP_SCAN_FLOW_ENTID']
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
  
