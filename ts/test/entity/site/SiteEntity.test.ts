

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


describe('SiteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Site()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Site().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'site.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activated_at":{"a":true,"fo":"date-time","h":"Activated At","n":"activated_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"activated_at","index$":0},"activated_at_label":{"a":true,"h":"Activated At Label","n":"activated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"activated_at_label","index$":1},"commit_sha":{"a":true,"h":"Commit Sha","n":"commit_sha","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"commit_sha","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":3},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":4},"creator_user_id":{"a":true,"h":"Creator User Id","n":"creator_user_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"creator_user_id","index$":5},"deploy_slug":{"a":true,"h":"Deploy Slug","n":"deploy_slug","r":true,"t":"`$STRING`","key$":"deploy_slug","index$":6},"failure_message":{"a":true,"h":"Failure Message","n":"failure_message","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_message","index$":7},"file_count":{"a":true,"h":"File Count","n":"file_count","r":true,"t":"`$INTEGER`","key$":"file_count","index$":8},"file_count_label":{"a":true,"h":"File Count Label","n":"file_count_label","r":true,"t":"`$STRING`","key$":"file_count_label","index$":9},"finished_at":{"a":true,"fo":"date-time","h":"Finished At","n":"finished_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at","index$":10},"finished_at_label":{"a":true,"h":"Finished At Label","n":"finished_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at_label","index$":11},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":12},"is_active":{"a":true,"h":"Is Active","n":"is_active","r":true,"t":"`$BOOLEAN`","key$":"is_active","index$":13},"source_ref":{"a":true,"h":"Source Ref","n":"source_ref","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_ref","index$":14},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at","index$":15},"started_at_label":{"a":true,"h":"Started At Label","n":"started_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at_label","index$":16},"static_site_id":{"a":true,"h":"Static Site Id","n":"static_site_id","r":true,"t":"`$STRING`","key$":"static_site_id","index$":17},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":18},"total_bytes":{"a":true,"h":"Total Bytes","n":"total_bytes","r":true,"t":"`$INTEGER`","key$":"total_bytes","index$":19},"total_bytes_label":{"a":true,"h":"Total Bytes Label","n":"total_bytes_label","r":true,"t":"`$STRING`","key$":"total_bytes_label","index$":20},"trigger_kind":{"a":true,"h":"Trigger Kind","n":"trigger_kind","r":true,"t":"`$STRING`","key$":"trigger_kind","index$":21},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":22},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":23},"uploaded_at":{"a":true,"fo":"date-time","h":"Uploaded At","n":"uploaded_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"uploaded_at","index$":24},"uploaded_at_label":{"a":true,"h":"Uploaded At Label","n":"uploaded_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"uploaded_at_label","index$":25}},"id":{"field":"id","name":"id"},"name":"site","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/pages/sites","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"site","or":"site","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/pages/sites","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"pages"},{"lit":"sites"}],"t":{"req":"`reqdata`","res":"`body.deployments`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"site","name__orig":"site","Name":"Site","name_":"site","name-":"site","NAME":"SITE","index$":475}, {"active":true,"entity":"site","key$":"BasicSiteFlow","kind":"basic","name":"BasicSiteFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"site_ref01"}}],"index$":0}]}, 'Site', {"GET /api/v1/organizations/{org_slug}/pages/sites":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"in":"query","name":"site","required":false,"description":"Public id of the site to open. A value naming nothing is ignored and the first site answers instead.","schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let site_ref01_data = Object.values(setup.data.existing.site)[0] as any

    // LIST
    const site_ref01_ent = client.Site()
    const site_ref01_match: any = {}
    site_ref01_match['organization_id'] = setup.idmap['organization01']

    const site_ref01_list = (await site_ref01_ent.list(site_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/site/SiteTestData.json')

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
    ['site01','site02','site03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SITE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SITE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SITE_ENTID']
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
  
