

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


describe('NomadAllocationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.NomadAllocation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.NomadAllocation().load({"app_id":1,"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'nomad_allocation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"allocation_id":{"a":true,"h":"Allocation Id","n":"allocation_id","r":true,"t":"`$STRING`","key$":"allocation_id","index$":0},"client_status":{"a":true,"h":"Client Status","n":"client_status","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"client_status","index$":1},"create_time":{"a":true,"h":"Create Time","n":"create_time","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"create_time","index$":2},"datacenter":{"a":true,"h":"Datacenter","n":"datacenter","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"datacenter","index$":3},"desired_description":{"a":true,"h":"Desired Description","n":"desired_description","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"desired_description","index$":4},"desired_status":{"a":true,"h":"Desired Status","n":"desired_status","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"desired_status","index$":5},"fetched_at":{"a":true,"fo":"date-time","h":"Fetched At","n":"fetched_at","r":true,"t":"`$STRING`","key$":"fetched_at","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":7},"job_id":{"a":true,"h":"Job Id","n":"job_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"job_id","index$":8},"modify_time":{"a":true,"h":"Modify Time","n":"modify_time","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"modify_time","index$":9},"name":{"a":true,"h":"Name","n":"name","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"name","index$":10},"namespace":{"a":true,"h":"Namespace","n":"namespace","r":true,"t":"`$STRING`","key$":"namespace","index$":11},"node_id":{"a":true,"h":"Node Id","n":"node_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"node_id","index$":12},"node_name":{"a":true,"h":"Node Name","n":"node_name","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"node_name","index$":13},"resources":{"a":true,"h":"Resources","n":"resources","r":true,"t":"`$OBJECT`","key$":"resources","index$":14},"task_group":{"a":true,"h":"Task Group","n":"task_group","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"task_group","index$":15},"task_states":{"a":true,"h":"Task States","n":"task_states","r":true,"t":"`$ARRAY`","key$":"task_states","index$":16},"verify_runner_images":{"a":true,"h":"Verify Runner Images","n":"verify_runner_images","r":false,"sh":"Public Verify image pins from tasks in this allocation's attached job group, not current app settings.","t":"`$ARRAY`","key$":"verify_runner_images","index$":17}},"id":{"field":"id","name":"id"},"name":"nomad_allocation","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"allocation_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}","q":{"exist":["app_id","id"]},"r":{"param":{"allocation_id":"id","app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_dashboard"},{"lit":"nomad"},{"lit":"allocations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"nomad_allocation","name__orig":"nomad_allocation","Name":"NomadAllocation","name_":"nomad_allocation","name-":"nomad-allocation","NAME":"NOMAD_ALLOCATION","index$":326}, {"active":true,"entity":"nomad_allocation","key$":"BasicNomadAllocationFlow","kind":"basic","name":"BasicNomadAllocationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"nomad_allocation_ref01","srcdatavar":"nomad_allocation_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","id":"nomad_allocation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-nomad_allocation_ref01"}}],"index$":0,"route":"GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}","record":{}}]}, 'NomadAllocation', {"GET /api/v1/hosting/apps/{app_id}/deployment_dashboard/nomad/allocations/{allocation_id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"allocation_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let nomad_allocation_ref01_data = Object.values(setup.data.existing.nomad_allocation)[0] as any

    // LOAD
    const nomad_allocation_ref01_ent = client.NomadAllocation()
    const nomad_allocation_ref01_match_dt0: any = {}
    nomad_allocation_ref01_match_dt0.id = nomad_allocation_ref01_data.id
    nomad_allocation_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    const nomad_allocation_ref01_data_dt0 = (await nomad_allocation_ref01_ent.load(nomad_allocation_ref01_match_dt0)).data()
    assert(nomad_allocation_ref01_data_dt0.id === nomad_allocation_ref01_data.id)


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
      '../../../../.sdk/test/entity/nomad_allocation/NomadAllocationTestData.json')

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
    ['nomad_allocation01','nomad_allocation02','nomad_allocation03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_NOMAD_ALLOCATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_NOMAD_ALLOCATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_NOMAD_ALLOCATION_ENTID']
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
  
