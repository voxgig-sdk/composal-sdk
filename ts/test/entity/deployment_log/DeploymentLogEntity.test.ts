

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


describe('DeploymentLogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeploymentLog()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeploymentLog().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deployment_log.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"allocation_id":{"a":true,"h":"Allocation Id","n":"allocation_id","r":true,"t":"`$STRING`","key$":"allocation_id","index$":0},"app_environment_id":{"a":true,"h":"App Environment Id","n":"app_environment_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_environment_id","index$":1},"app_release_id":{"a":true,"h":"App Release Id","n":"app_release_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_release_id","index$":2},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_service_id","index$":3},"details":{"a":true,"h":"Details","n":"details","r":true,"t":"`$ANY`","key$":"details","index$":4},"environment_name":{"a":true,"h":"Environment Name","n":"environment_name","r":true,"t":"`$STRING`","key$":"environment_name","index$":5},"release_version":{"a":true,"h":"Release Version","n":"release_version","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"release_version","index$":6},"service_name":{"a":true,"h":"Service Name","n":"service_name","r":true,"t":"`$STRING`","key$":"service_name","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":8},"task":{"a":true,"h":"Task","n":"task","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"task","index$":9},"unreachable_reason":{"a":true,"h":"Unreachable Reason","n":"unreachable_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"unreachable_reason","index$":10}},"name":"deployment_log","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/pages/deployments/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"app","or":"app","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"environment","or":"environment","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"ex":800,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"explode":true,"k":"query","n":"log_location","or":"log_location","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"log_service","or":"log_service","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"service","or":"service","r":false,"style":"form","t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/pages/deployments/logs","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"pages"},{"lit":"deployments"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.allocations`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"deployment_log","name__orig":"deployment_log","Name":"DeploymentLog","name_":"deployment_log","name-":"deployment-log","NAME":"DEPLOYMENT_LOG","index$":200}, {"active":true,"entity":"deployment_log","key$":"BasicDeploymentLogFlow","kind":"basic","name":"BasicDeploymentLogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deployment_log_ref01"}}],"index$":0}]}, 'DeploymentLog', {"GET /api/v1/organizations/{org_slug}/pages/deployments/logs":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"in":"query","name":"app","required":false,"schema":{"type":"string"},"index$":1},{"in":"query","name":"service","required":false,"schema":{"type":"string"},"index$":2},{"in":"query","name":"environment","required":false,"schema":{"type":"string"},"index$":3},{"in":"query","name":"log_service","required":false,"description":"Public id of the service to read. Ignored when it has no allocations; the first service that does answers instead.","schema":{"type":"string"},"index$":4},{"in":"query","name":"log_location","required":false,"description":"Restricts the merge to allocations in one location.","schema":{"type":"string"},"index$":5},{"in":"query","name":"limit","required":false,"description":"Merged lines to keep, counted from the end.","schema":{"type":"integer","minimum":1,"maximum":5000,"default":800},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deployment_log_ref01_data = Object.values(setup.data.existing.deployment_log)[0] as any

    // LIST
    const deployment_log_ref01_ent = client.DeploymentLog()
    const deployment_log_ref01_match: any = {}
    deployment_log_ref01_match['organization_id'] = setup.idmap['organization01']

    const deployment_log_ref01_list = (await deployment_log_ref01_ent.list(deployment_log_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/deployment_log/DeploymentLogTestData.json')

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
    ['deployment_log01','deployment_log02','deployment_log03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEPLOYMENT_LOG_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEPLOYMENT_LOG_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEPLOYMENT_LOG_ENTID']
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
  
