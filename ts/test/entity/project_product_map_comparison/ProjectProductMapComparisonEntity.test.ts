

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


describe('ProjectProductMapComparisonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProjectProductMapComparison()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectProductMapComparison().load({"id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_product_map_comparison.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accounts":{"a":true,"h":"Accounts","n":"accounts","r":true,"t":"`$ARRAY`","key$":"accounts","index$":0},"comparison":{"a":true,"h":"Comparison","n":"comparison","r":true,"t":"`$ANY`","key$":"comparison","index$":1},"filters":{"a":true,"h":"Filters","n":"filters","r":true,"t":"`$ANY`","key$":"filters","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":3},"project":{"a":true,"h":"Project","n":"project","r":true,"t":"`$OBJECT`","key$":"project","index$":4},"requirements":{"a":true,"h":"Requirements","n":"requirements","r":true,"t":"`$ARRAY`","key$":"requirements","index$":5},"revisions":{"a":true,"h":"Revisions","n":"revisions","r":true,"t":"`$ARRAY`","key$":"revisions","index$":6}},"id":{"field":"id","name":"id"},"name":"project_product_map_comparison","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map_comparison","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"project_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"account_id","or":"account_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"area","or":"area","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"before","or":"before","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"compare_revision_id","or":"compare_revision_id","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"persona_id","or":"persona_id","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"query","or":"query","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"revision_id","or":"revision_id","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"since","or":"since","r":false,"style":"form","t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map_comparison","q":{"exist":["id","organization_id"]},"r":{"param":{"project_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"id"},{"lit":"pages"},{"lit":"product_map_comparison"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"project_product_map_comparison","name__orig":"project_product_map_comparison","Name":"ProjectProductMapComparison","name_":"project_product_map_comparison","name-":"project-product-map-comparison","NAME":"PROJECT_PRODUCT_MAP_COMPARISON","index$":400}, {"active":true,"entity":"project_product_map_comparison","key$":"BasicProjectProductMapComparisonFlow","kind":"basic","name":"BasicProjectProductMapComparisonFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_product_map_comparison_ref01","srcdatavar":"project_product_map_comparison_ref01_data","suffix":"_dt0"},"m":{"id":"project_product_map_comparison01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-project_product_map_comparison_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map_comparison","record":{}}]}, 'ProjectProductMapComparison', {"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/product_map_comparison":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"revision_id","in":"query","schema":{"type":"string"},"index$":2},{"name":"compare_revision_id","in":"query","schema":{"type":"string"},"index$":3},{"name":"persona_id","in":"query","schema":{"type":"string"},"index$":4},{"name":"account_id","in":"query","schema":{"type":"string"},"index$":5},{"name":"query","in":"query","schema":{"type":"string"},"index$":6},{"name":"area","in":"query","schema":{"type":"string"},"index$":7},{"name":"since","in":"query","schema":{"type":"string"},"index$":8},{"name":"before","in":"query","schema":{"type":"string"},"index$":9}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let project_product_map_comparison_ref01_data = Object.values(setup.data.existing.project_product_map_comparison)[0] as any

    // LOAD
    const project_product_map_comparison_ref01_ent = client.ProjectProductMapComparison()
    const project_product_map_comparison_ref01_match_dt0: any = {}
    project_product_map_comparison_ref01_match_dt0.id = project_product_map_comparison_ref01_data.id
    project_product_map_comparison_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const project_product_map_comparison_ref01_data_dt0 = (await project_product_map_comparison_ref01_ent.load(project_product_map_comparison_ref01_match_dt0)).data()
    assert(project_product_map_comparison_ref01_data_dt0.id === project_product_map_comparison_ref01_data.id)


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
      '../../../../.sdk/test/entity/project_product_map_comparison/ProjectProductMapComparisonTestData.json')

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
    ['project_product_map_comparison01','project_product_map_comparison02','project_product_map_comparison03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PROJECT_PRODUCT_MAP_COMPARISON_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PROJECT_PRODUCT_MAP_COMPARISON_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PROJECT_PRODUCT_MAP_COMPARISON_ENTID']
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
  
