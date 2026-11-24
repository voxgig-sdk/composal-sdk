

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


describe('LeaseVerifyDiagnosticEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.LeaseVerifyDiagnostic()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LeaseVerifyDiagnostic().create({"lease_id":1,"swarm_id":"x","task_id":"x","browser_events":"x","live_browser":"x","live_view":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lease_verify_diagnostic.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser_events":{"a":true,"h":"Browser Events","n":"browser_events","r":true,"t":"`$OBJECT`","key$":"browser_events","index$":0},"live_browser":{"a":true,"h":"Live Browser","n":"live_browser","r":true,"t":"`$OBJECT`","key$":"live_browser","index$":1},"live_view":{"a":true,"h":"Live View","n":"live_view","r":true,"sh":"The tester's read-only live stream for page viewers.","t":"`$OBJECT`","key$":"live_view","index$":2},"steps":{"a":true,"h":"Steps","n":"steps","r":false,"t":"`$ARRAY`","key$":"steps","index$":3}},"name":"lease_verify_diagnostic","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["browser_events","live_browser","live_view","steps"],"co":{"id":"POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"x_vex_lease_token","or":"X-Vex-Lease-Token","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"lease_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"swarm_id","or":"swarm_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"task_id","or":"task_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics","q":{"exist":["lease_id","swarm_id","task_id","x_vex_lease_token"]},"r":{"param":{"id":"lease_id","swarm_id":"swarm_id","task_id":"task_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"swarm_id"},{"lit":"tasks"},{"var":"task_id"},{"lit":"leases"},{"var":"lease_id"},{"lit":"verify_diagnostics"}],"t":{"req":{"browser_events":"`reqdata.browser_event`","live_browser":"`reqdata.live_browser`","live_view":"`reqdata.live_view`","steps":"`reqdata.step`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"lease_verify_diagnostic","name__orig":"lease_verify_diagnostic","Name":"LeaseVerifyDiagnostic","name_":"lease_verify_diagnostic","name-":"lease-verify-diagnostic","NAME":"LEASE_VERIFY_DIAGNOSTIC","index$":298}, {"active":true,"entity":"lease_verify_diagnostic","key$":"BasicLeaseVerifyDiagnosticFlow","kind":"basic","name":"BasicLeaseVerifyDiagnosticFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lease_verify_diagnostic_ref01"},"m":{"lease_id":"lease01","swarm_id":"swarm01","task_id":"task01"},"o":"create","s":[],"v":[],"index$":0}]}, 'LeaseVerifyDiagnostic', {"POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["browser_events"],"properties":{"browser_events":{"type":"object","additionalProperties":true,"key$":"browser_events"},"steps":{"type":"array","maxItems":200,"items":{"type":"object","additionalProperties":false,"required":["id","status","start_ms","duration_ms"],"properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9_-]{1,127}$"},"status":{"type":"string","enum":[]},"start_ms":{"type":"integer","minimum":0,"maximum":86400000},"duration_ms":{"type":"integer","minimum":0,"maximum":86400000},"safe_error":{"type":"string","maxLength":1000}}},"key$":"steps"},"live_view":{"type":"object","description":"The tester's read-only live stream for page viewers.","additionalProperties":false,"required":["url","token"],"properties":{"url":{"type":"string","format":"uri"},"token":{"type":"string","pattern":"^view_[a-f0-9]{32}$"},"cdp_token":{"type":"string","description":"Opens full Chrome DevTools on the tester; sent only when its runner serves DevTools, and shown only to people who may run tests.","pattern":"^cdp_[a-f0-9]{32}$"}},"key$":"live_view"},"live_browser":{"type":"object","additionalProperties":false,"required":["captured_at","url","action","completed_steps","image"],"properties":{"captured_at":{"type":"string","format":"date-time"},"url":{"type":"string","maxLength":1000},"action":{"type":"string","maxLength":1000},"completed_steps":{"type":"integer","minimum":0,"maximum":1000},"image":{"type":"string","nullable":true,"maxLength":200023}},"key$":"live_browser"}}}}}},"parameters":[{"name":"swarm_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"task_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"X-Vex-Lease-Token","in":"header","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"lease_verify_diagnostic.create.0":"GET-only live run: needs POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_diagnostics"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const lease_verify_diagnostic_ref01_ent = client.LeaseVerifyDiagnostic()
    let lease_verify_diagnostic_ref01_data = setup.data.new.lease_verify_diagnostic['lease_verify_diagnostic_ref01']
    lease_verify_diagnostic_ref01_data['lease_id'] = setup.idmap['lease01']
    lease_verify_diagnostic_ref01_data['swarm_id'] = setup.idmap['swarm01']
    lease_verify_diagnostic_ref01_data['task_id'] = setup.idmap['task01']

    lease_verify_diagnostic_ref01_data = (await lease_verify_diagnostic_ref01_ent.create(lease_verify_diagnostic_ref01_data)).data()
    assert(null != lease_verify_diagnostic_ref01_data)


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
      '../../../../.sdk/test/entity/lease_verify_diagnostic/LeaseVerifyDiagnosticTestData.json')

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
    ['lease_verify_diagnostic01','lease_verify_diagnostic02','lease_verify_diagnostic03','lease01','swarm01','task01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_LEASE_VERIFY_DIAGNOSTIC_ENTID']
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
  
