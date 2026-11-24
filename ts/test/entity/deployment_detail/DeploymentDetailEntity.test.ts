

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


describe('DeploymentDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeploymentDetail()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeploymentDetail().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deployment_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activity":{"a":true,"h":"Activity","n":"activity","r":true,"t":"`$ARRAY`","key$":"activity","index$":0},"app":{"a":true,"h":"App","n":"app","r":true,"t":"`$ANY`","key$":"app","index$":1},"app_id":{"a":true,"h":"App Id","n":"app_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_id","index$":2},"audit_events":{"a":true,"h":"Audit Events","n":"audit_events","r":true,"t":"`$ARRAY`","key$":"audit_events","index$":3},"capacity":{"a":true,"h":"Capacity","n":"capacity","r":true,"t":"`$OBJECT`","key$":"capacity","index$":4},"data_resources":{"a":true,"h":"Data Resources","n":"data_resources","r":true,"t":"`$ARRAY`","key$":"data_resources","index$":5},"deploy_targets":{"a":true,"h":"Deploy Targets","n":"deploy_targets","r":true,"t":"`$ARRAY`","key$":"deploy_targets","index$":6},"deployments":{"a":true,"h":"Deployments","n":"deployments","r":true,"t":"`$ARRAY`","key$":"deployments","index$":7},"desired_states":{"a":true,"h":"Desired States","n":"desired_states","r":true,"t":"`$ARRAY`","key$":"desired_states","index$":8},"environments":{"a":true,"h":"Environments","n":"environments","r":true,"t":"`$ARRAY`","key$":"environments","index$":9},"filters":{"a":true,"h":"Filters","n":"filters","r":true,"sh":"The option lists the deployments page's app, service and stage pickers narrow by.","t":"`$OBJECT`","key$":"filters","index$":10},"health":{"a":true,"h":"Health","n":"health","r":true,"sh":"The rolled-up state of the selected scope.","t":"`$OBJECT`","key$":"health","index$":11},"nomad":{"a":true,"h":"Nomad","n":"nomad","r":true,"sh":"The Nomad footprint of the selected scope, deduplicated.","t":"`$OBJECT`","key$":"nomad","index$":12},"operations":{"a":true,"h":"Operations","n":"operations","r":true,"t":"`$ARRAY`","key$":"operations","index$":13},"placements":{"a":true,"h":"Placements","n":"placements","r":true,"t":"`$ARRAY`","key$":"placements","index$":14},"reconciler_ticks":{"a":true,"h":"Reconciler Ticks","n":"reconciler_ticks","r":true,"t":"`$ARRAY`","key$":"reconciler_ticks","index$":15},"releases":{"a":true,"h":"Releases","n":"releases","r":true,"t":"`$ARRAY`","key$":"releases","index$":16},"runtime_instances":{"a":true,"h":"Runtime Instances","n":"runtime_instances","r":true,"t":"`$ARRAY`","key$":"runtime_instances","index$":17},"service_bindings":{"a":true,"h":"Service Bindings","n":"service_bindings","r":true,"t":"`$ARRAY`","key$":"service_bindings","index$":18},"service_views":{"a":true,"h":"Service Views","n":"service_views","r":true,"t":"`$ARRAY`","key$":"service_views","index$":19},"storage_resources":{"a":true,"h":"Storage Resources","n":"storage_resources","r":true,"t":"`$ARRAY`","key$":"storage_resources","index$":20}},"name":"deployment_detail","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/pages/deployments/details","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"app","or":"app","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"environment","or":"environment","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"service","or":"service","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/pages/deployments/details","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"pages"},{"lit":"deployments"},{"lit":"details"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"deployment_detail","name__orig":"deployment_detail","Name":"DeploymentDetail","name_":"deployment_detail","name-":"deployment-detail","NAME":"DEPLOYMENT_DETAIL","index$":198}, {"active":true,"entity":"deployment_detail","key$":"BasicDeploymentDetailFlow","kind":"basic","name":"BasicDeploymentDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deployment_detail_ref01"}}],"index$":0}]}, 'DeploymentDetail', {"GET /api/v1/organizations/{org_slug}/pages/deployments/details":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"in":"query","name":"app","required":false,"schema":{"type":"string"},"index$":1},{"in":"query","name":"service","required":false,"schema":{"type":"string"},"index$":2},{"in":"query","name":"environment","required":false,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deployment_detail_ref01_data = Object.values(setup.data.existing.deployment_detail)[0] as any

    // LIST
    const deployment_detail_ref01_ent = client.DeploymentDetail()
    const deployment_detail_ref01_match: any = {}
    deployment_detail_ref01_match['organization_id'] = setup.idmap['organization01']

    const deployment_detail_ref01_list = (await deployment_detail_ref01_ent.list(deployment_detail_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/deployment_detail/DeploymentDetailTestData.json')

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
    ['deployment_detail01','deployment_detail02','deployment_detail03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEPLOYMENT_DETAIL_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEPLOYMENT_DETAIL_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEPLOYMENT_DETAIL_ENTID']
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
  
