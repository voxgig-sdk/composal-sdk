

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


describe('DeploymentPreviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeploymentPreview()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeploymentPreview().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deployment_preview.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access":{"a":true,"h":"Access","n":"access","r":true,"t":"`$STRING`","key$":"access","index$":0},"app_environment_id":{"a":true,"h":"App Environment Id","n":"app_environment_id","r":true,"t":"`$STRING`","key$":"app_environment_id","index$":1},"app_name":{"a":true,"h":"App Name","n":"app_name","r":true,"t":"`$STRING`","key$":"app_name","index$":2},"app_preview_profile_id":{"a":true,"h":"App Preview Profile Id","n":"app_preview_profile_id","r":true,"t":"`$STRING`","key$":"app_preview_profile_id","index$":3},"app_slug":{"a":true,"h":"App Slug","n":"app_slug","r":true,"t":"`$STRING`","key$":"app_slug","index$":4},"change_number":{"a":true,"h":"Change Number","n":"change_number","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"change_number","index$":5},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":6},"created_by_user_id":{"a":true,"h":"Created By User Id","n":"created_by_user_id","r":false,"t":"`$STRING`","union":{"branches":2,"count":1,"depth":0},"key$":"created_by_user_id","index$":7},"expires_at":{"a":true,"h":"Expires At","n":"expires_at","r":true,"t":"`$STRING`","key$":"expires_at","index$":8},"generation":{"a":true,"h":"Generation","n":"generation","r":true,"t":"`$INTEGER`","key$":"generation","index$":9},"health":{"a":true,"h":"Health","n":"health","r":true,"t":"`$STRING`","key$":"health","index$":10},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":"`$STRING`","key$":"hosted_app_id","index$":11},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":12},"latest_operation_status":{"a":true,"h":"Latest Operation Status","n":"latest_operation_status","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"latest_operation_status","index$":13},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":14},"owner_name":{"a":true,"h":"Owner Name","n":"owner_name","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"owner_name","index$":15},"profile_name":{"a":true,"h":"Profile Name","n":"profile_name","r":true,"t":"`$STRING`","key$":"profile_name","index$":16},"resource_overrides":{"a":true,"h":"Resource Overrides","n":"resource_overrides","r":false,"sh":"Service public IDs mapped to resource overrides.","t":"`$OBJECT`","key$":"resource_overrides","index$":17},"retained":{"a":true,"h":"Retained","n":"retained","r":true,"t":"`$BOOLEAN`","key$":"retained","index$":18},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":19},"snapshot_version":{"a":true,"h":"Snapshot Version","n":"snapshot_version","r":true,"t":"`$INTEGER`","key$":"snapshot_version","index$":20},"source_revision":{"a":true,"h":"Source Revision","n":"source_revision","r":true,"t":"`$STRING`","key$":"source_revision","index$":21},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":22},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":23},"urls":{"a":true,"h":"Urls","n":"urls","r":true,"t":"`$ARRAY`","key$":"urls","index$":24},"vcs_change_id":{"a":true,"h":"Vcs Change Id","n":"vcs_change_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"vcs_change_id","index$":25}},"id":{"field":"id","name":"id"},"name":"deployment_preview","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/pages/deployments/previews","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"app","or":"app","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"change","or":"change","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"expiry","or":"expiry","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"health","or":"health","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"owner","or":"owner","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":5}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/pages/deployments/previews","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"pages"},{"lit":"deployments"},{"lit":"previews"}],"t":{"page":{"total":"`body.pagination.total_count`"},"req":"`reqdata`","res":"`body.previews`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"deployment_preview","name__orig":"deployment_preview","Name":"DeploymentPreview","name_":"deployment_preview","name-":"deployment-preview","NAME":"DEPLOYMENT_PREVIEW","index$":202}, {"active":true,"entity":"deployment_preview","key$":"BasicDeploymentPreviewFlow","kind":"basic","name":"BasicDeploymentPreviewFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deployment_preview_ref01"}}],"index$":0}]}, 'DeploymentPreview', {"GET /api/v1/organizations/{org_slug}/pages/deployments/previews":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"app","in":"query","schema":{"type":"string"},"index$":1},{"name":"owner","in":"query","schema":{"type":"string"},"index$":2},{"name":"change","in":"query","schema":{"type":"string"},"index$":3},{"name":"health","in":"query","schema":{"type":"string","enum":["degraded","running","starting","stopped"]},"index$":4},{"name":"expiry","in":"query","schema":{"type":"string","enum":["expiring","expired","retained"]},"index$":5},{"name":"page","in":"query","schema":{"type":"integer","minimum":1},"index$":6}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deployment_preview_ref01_data = Object.values(setup.data.existing.deployment_preview)[0] as any

    // LIST
    const deployment_preview_ref01_ent = client.DeploymentPreview()
    const deployment_preview_ref01_match: any = {}
    deployment_preview_ref01_match['organization_id'] = setup.idmap['organization01']

    const deployment_preview_ref01_list = (await deployment_preview_ref01_ent.list(deployment_preview_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/deployment_preview/DeploymentPreviewTestData.json')

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
    ['deployment_preview01','deployment_preview02','deployment_preview03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEPLOYMENT_PREVIEW_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEPLOYMENT_PREVIEW_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEPLOYMENT_PREVIEW_ENTID']
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
  
