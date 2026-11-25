

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


describe('DeploymentMetricEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeploymentMetric()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeploymentMetric().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deployment_metric.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auto_deploy":{"a":true,"h":"Auto Deploy","n":"auto_deploy","r":true,"t":"`$BOOLEAN`","key$":"auto_deploy","index$":0},"environment_id":{"a":true,"h":"Environment Id","n":"environment_id","r":true,"t":"`$STRING`","key$":"environment_id","index$":1},"environment_name":{"a":true,"h":"Environment Name","n":"environment_name","r":true,"t":"`$STRING`","key$":"environment_name","index$":2},"placement_id":{"a":true,"h":"Placement Id","n":"placement_id","r":true,"t":"`$STRING`","key$":"placement_id","index$":3},"redeploy":{"a":true,"h":"Redeploy","n":"redeploy","r":true,"t":"`$BOOLEAN`","key$":"redeploy","index$":4},"region_count":{"a":true,"h":"Region Count","n":"region_count","r":true,"t":"`$INTEGER`","key$":"region_count","index$":5},"replicas_per_region":{"a":true,"h":"Replicas Per Region","n":"replicas_per_region","r":true,"t":"`$INTEGER`","key$":"replicas_per_region","index$":6},"rollout_strategy":{"a":true,"h":"Rollout Strategy","n":"rollout_strategy","r":true,"t":"`$STRING`","key$":"rollout_strategy","index$":7},"service_id":{"a":true,"h":"Service Id","n":"service_id","r":true,"t":"`$STRING`","key$":"service_id","index$":8},"service_name":{"a":true,"h":"Service Name","n":"service_name","r":true,"t":"`$STRING`","key$":"service_name","index$":9},"source_ref":{"a":true,"h":"Source Ref","n":"source_ref","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_ref","index$":10}},"name":"deployment_metric","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/pages/deployments/metrics","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"app","or":"app","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"environment","or":"environment","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"metrics_range","or":"metrics_range","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"service","or":"service","r":false,"style":"form","t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/pages/deployments/metrics","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"pages"},{"lit":"deployments"},{"lit":"metrics"}],"t":{"req":"`reqdata`","res":"`body.deploy_targets`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"deployment_metric","name__orig":"deployment_metric","Name":"DeploymentMetric","name_":"deployment_metric","name-":"deployment-metric","NAME":"DEPLOYMENT_METRIC","index$":205}, {"active":true,"entity":"deployment_metric","key$":"BasicDeploymentMetricFlow","kind":"basic","name":"BasicDeploymentMetricFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deployment_metric_ref01"}}],"index$":0}]}, 'DeploymentMetric', {"GET /api/v1/organizations/{org_slug}/pages/deployments/metrics":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"in":"query","name":"app","required":false,"schema":{"type":"string"},"index$":1},{"in":"query","name":"service","required":false,"schema":{"type":"string"},"index$":2},{"in":"query","name":"environment","required":false,"schema":{"type":"string"},"index$":3},{"in":"query","name":"metrics_range","required":false,"description":"Window for the observed-usage charts. An unknown value falls back to the default.","schema":{"type":"string","enum":["1h","6h","24h","7d"]},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deployment_metric_ref01_data = Object.values(setup.data.existing.deployment_metric)[0] as any

    // LIST
    const deployment_metric_ref01_ent = client.DeploymentMetric()
    const deployment_metric_ref01_match: any = {}
    deployment_metric_ref01_match['organization_id'] = setup.idmap['organization01']

    const deployment_metric_ref01_list = (await deployment_metric_ref01_ent.list(deployment_metric_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/deployment_metric/DeploymentMetricTestData.json')

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
    ['deployment_metric01','deployment_metric02','deployment_metric03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEPLOYMENT_METRIC_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEPLOYMENT_METRIC_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEPLOYMENT_METRIC_ENTID']
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
  
