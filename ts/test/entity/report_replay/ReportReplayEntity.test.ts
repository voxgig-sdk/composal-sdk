

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


describe('ReportReplayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ReportReplay()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ReportReplay().load({"exploration_id":1,"id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'report_replay.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_id":{"a":true,"h":"Agent Id","n":"agent_id","r":true,"t":"`$STRING`","key$":"agent_id","index$":0},"generated_at":{"a":true,"h":"Generated At","n":"generated_at","r":true,"t":"`$STRING`","key$":"generated_at","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":2},"recording":{"a":true,"h":"Recording","n":"recording","r":true,"t":"`$OBJECT`","key$":"recording","index$":3},"replay_steps":{"a":true,"h":"Replay Steps","n":"replay_steps","r":true,"t":"`$ARRAY`","key$":"replay_steps","index$":4}},"id":{"field":"id","name":"id"},"name":"report_replay","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/replay/{agent_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"exploration_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"agent_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"generated_at","or":"generated_at","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/explorations/{id}/report/replay/{agent_id}","q":{"exist":["exploration_id","id","organization_id"]},"r":{"param":{"agent_id":"id","id":"exploration_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"explorations"},{"var":"exploration_id"},{"lit":"report"},{"lit":"replay"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.exploration"]]},"key$":"report_replay","name__orig":"report_replay","Name":"ReportReplay","name_":"report_replay","name-":"report-replay","NAME":"REPORT_REPLAY","index$":432}, {"active":true,"entity":"report_replay","key$":"BasicReportReplayFlow","kind":"basic","name":"BasicReportReplayFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"report_replay_ref01","srcdatavar":"report_replay_ref01_data","suffix":"_dt0"},"m":{"exploration_id":"exploration01","id":"report_replay01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-report_replay_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/replay/{agent_id}","record":{}}]}, 'ReportReplay', {"GET /api/v1/organizations/{organization_id}/verify/explorations/{id}/report/replay/{agent_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"agent_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"project_id","in":"query","required":false,"schema":{"type":"string"},"index$":3},{"name":"generated_at","in":"query","required":false,"description":"Publication timestamp shown in the report; a stale value is refused with 422 `report_changed`. Omit it to read the current publication.","schema":{"type":"string"},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let report_replay_ref01_data = Object.values(setup.data.existing.report_replay)[0] as any

    // LOAD
    const report_replay_ref01_ent = client.ReportReplay()
    const report_replay_ref01_match_dt0: any = {}
    report_replay_ref01_match_dt0.id = report_replay_ref01_data.id
    report_replay_ref01_match_dt0['exploration_id'] = setup.idmap['exploration_id'] ?? setup.idmap['exploration01']
    report_replay_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const report_replay_ref01_data_dt0 = (await report_replay_ref01_ent.load(report_replay_ref01_match_dt0)).data()
    assert(report_replay_ref01_data_dt0.id === report_replay_ref01_data.id)


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
      '../../../../.sdk/test/entity/report_replay/ReportReplayTestData.json')

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
    ['report_replay01','report_replay02','report_replay03','organization01','organization02','organization03','exploration01','exploration02','exploration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPORT_REPLAY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPORT_REPLAY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPORT_REPLAY_ENTID']
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
  
