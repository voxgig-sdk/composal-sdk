

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


describe('DeepScanFindingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeepScanFinding()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeepScanFinding().list({"deep_scan_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deep_scan_finding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"finding_count":{"a":true,"h":"Finding Count","n":"finding_count","r":true,"sh":"Findings at every priority; findings lists only the listed priority.","t":"`$INTEGER`","key$":"finding_count","index$":0},"finding_ids":{"a":true,"h":"Finding Ids","n":"finding_ids","r":true,"sh":"Original team order used by legacy hash links and rerun indices.","t":"`$ARRAY`","key$":"finding_ids","index$":1},"findings":{"a":true,"h":"Findings","n":"findings","r":true,"t":"`$ARRAY`","key$":"findings","index$":2},"findings_fix_prompt":{"a":true,"h":"Findings Fix Prompt","n":"findings_fix_prompt","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"findings_fix_prompt","index$":3},"free_findings_pending":{"a":true,"h":"Free Findings Pending","n":"free_findings_pending","r":true,"sh":"Whether a scan with locked findings has yet to choose which are free, so every row is locked for now.","t":"`$BOOLEAN`","key$":"free_findings_pending","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"mode":{"a":true,"h":"Mode","n":"mode","r":true,"t":"`$STRING`","key$":"mode","index$":6},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":7},"priority":{"a":true,"h":"Priority","n":"priority","r":true,"sh":"The priority findings are narrowed to, or null when they are not narrowed.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"priority","index$":8},"priority_counts":{"a":true,"h":"Priority Counts","n":"priority_counts","r":true,"t":"`$OBJECT`","key$":"priority_counts","index$":9},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"project_id","index$":10},"reproduction_of":{"a":true,"h":"Reproduction Of","n":"reproduction_of","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"reproduction_of","index$":11},"reproductions":{"a":true,"h":"Reproductions","n":"reproductions","r":true,"sh":"Fresh-browser reruns of this scan's reported bugs.","t":"`$ARRAY`","key$":"reproductions","index$":12},"reruns_available":{"a":true,"h":"Reruns Available","n":"reruns_available","r":true,"sh":"Whether findings can be rerun; a scan with locked findings waits for a paid plan.","t":"`$BOOLEAN`","key$":"reruns_available","index$":13},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":14},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":15},"unlock":{"a":true,"h":"Unlock","n":"unlock","r":true,"sh":"Whether a paid plan would unlock some of this scan's findings, and whether this person may choose one.","t":"`$OBJECT`","key$":"unlock","index$":16},"web_url":{"a":true,"h":"Web Url","n":"web_url","r":true,"t":"`$STRING`","key$":"web_url","index$":17}},"id":{"field":"id","name":"id"},"name":"deep_scan_finding","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"deep_scan_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"priority","or":"priority","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings","q":{"exist":["deep_scan_id","organization_id"]},"r":{"param":{"id":"deep_scan_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"deep_scans"},{"var":"deep_scan_id"},{"lit":"findings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.deep_scan"]]},"key$":"deep_scan_finding","name__orig":"deep_scan_finding","Name":"DeepScanFinding","name_":"deep_scan_finding","name-":"deep-scan-finding","NAME":"DEEP_SCAN_FINDING","index$":194}, {"active":true,"entity":"deep_scan_finding","key$":"BasicDeepScanFindingFlow","kind":"basic","name":"BasicDeepScanFindingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"deep_scan_id":"deep_scan01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deep_scan_finding_ref01"}}],"index$":0}]}, 'DeepScanFinding', {"GET /api/v1/organizations/{organization_id}/verify/deep_scans/{id}/findings":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","schema":{"type":"string"},"index$":2},{"name":"priority","in":"query","description":"List only findings at this priority. Ignored when the scan has none at it.","schema":{"type":"string","enum":["high","medium","low"]},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deep_scan_finding_ref01_data = Object.values(setup.data.existing.deep_scan_finding)[0] as any

    // LIST
    const deep_scan_finding_ref01_ent = client.DeepScanFinding()
    const deep_scan_finding_ref01_match: any = {}
    deep_scan_finding_ref01_match['deep_scan_id'] = setup.idmap['deep_scan01']
    deep_scan_finding_ref01_match['organization_id'] = setup.idmap['organization01']

    const deep_scan_finding_ref01_list = (await deep_scan_finding_ref01_ent.list(deep_scan_finding_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/deep_scan_finding/DeepScanFindingTestData.json')

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
    ['deep_scan_finding01','deep_scan_finding02','deep_scan_finding03','organization01','organization02','organization03','deep_scan01','deep_scan02','deep_scan03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEEP_SCAN_FINDING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEEP_SCAN_FINDING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEEP_SCAN_FINDING_ENTID']
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
  
