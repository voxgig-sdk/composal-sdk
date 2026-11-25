

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


describe('ProductMapJourneyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProductMapJourney()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProductMapJourney().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'product_map_journey.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"default_variant_id":{"a":true,"h":"Default Variant Id","n":"default_variant_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"default_variant_id","index$":0},"goal":{"a":true,"h":"Goal","n":"goal","r":true,"t":"`$STRING`","key$":"goal","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"journey":{"a":true,"h":"Journey","n":"journey","r":true,"t":"`$OBJECT`","key$":"journey","index$":3},"next_cursor":{"a":true,"h":"Next Cursor","n":"next_cursor","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"next_cursor","index$":4},"preview":{"a":true,"h":"Preview","n":"preview","r":false,"t":"`$ANY`","key$":"preview","index$":5},"scope":{"a":true,"h":"Scope","n":"scope","r":true,"t":"`$OBJECT`","key$":"scope","index$":6},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":7},"tree":{"a":true,"h":"Tree","n":"tree","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":7},"key$":"tree","index$":8},"tree_loaded":{"a":true,"h":"Tree Loaded","n":"tree_loaded","r":false,"t":"`$BOOLEAN`","key$":"tree_loaded","index$":9},"variant_count":{"a":true,"h":"Variant Count","n":"variant_count","r":true,"t":"`$INTEGER`","key$":"variant_count","index$":10},"variants":{"a":true,"h":"Variants","n":"variants","r":true,"t":"`$ARRAY`","key$":"variants","index$":11}},"id":{"field":"id","name":"id"},"name":"product_map_journey","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"account_id","or":"account_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"after","or":"after","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"area","or":"area","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"before","or":"before","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"include_coverage","or":"include_coverage","r":false,"style":"form","t":"`$BOOLEAN`","index$":4},{"a":true,"explode":true,"k":"query","n":"journey_query","or":"journey_query","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"persona_id","or":"persona_id","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"query","or":"query","r":false,"style":"form","t":"`$STRING`","index$":7},{"a":true,"explode":true,"k":"query","n":"revision_id","or":"revision_id","r":false,"style":"form","t":"`$STRING`","index$":8},{"a":true,"explode":true,"k":"query","n":"since","or":"since","r":false,"style":"form","t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"product_map"},{"lit":"journeys"}],"t":{"page":{"cursor":"`body.next_cursor`"},"req":"`reqdata`","res":"`body.journeys`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys/{journey_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"journey_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"account_id","or":"account_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"after","or":"after","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"area","or":"area","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"before","or":"before","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"ex":true,"explode":true,"k":"query","n":"include_tree","or":"include_tree","r":false,"style":"form","t":"`$BOOLEAN`","index$":4},{"a":true,"explode":true,"k":"query","n":"persona_id","or":"persona_id","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"query","or":"query","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"revision_id","or":"revision_id","r":false,"style":"form","t":"`$STRING`","index$":7},{"a":true,"explode":true,"k":"query","n":"since","or":"since","r":false,"style":"form","t":"`$STRING`","index$":8},{"a":true,"explode":true,"k":"query","n":"variant_id","or":"variant_id","r":false,"style":"form","t":"`$STRING`","index$":9}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys/{journey_id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"journey_id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"product_map"},{"lit":"journeys"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"product_map_journey","name__orig":"product_map_journey","Name":"ProductMapJourney","name_":"product_map_journey","name-":"product-map-journey","NAME":"PRODUCT_MAP_JOURNEY","index$":383}, {"active":true,"entity":"product_map_journey","key$":"BasicProductMapJourneyFlow","kind":"basic","name":"BasicProductMapJourneyFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"product_map_journey_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"product_map_journey_ref01","srcdatavar":"product_map_journey_ref01_data","suffix":"_dt0"},"m":{"id":"product_map_journey01","organization_id":"organization01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-product_map_journey_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys/{journey_id}","record":{}}]}, 'ProductMapJourney', {"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"journey_query","in":"query","description":"Search canonical journey titles and goals before pagination without filtering screen captures.","schema":{"type":"string","maxLength":800},"index$":2},{"name":"revision_id","in":"query","schema":{"type":"string"},"index$":3},{"name":"persona_id","in":"query","schema":{"type":"string"},"index$":4},{"name":"account_id","in":"query","schema":{"type":"string"},"index$":5},{"name":"query","in":"query","schema":{"type":"string"},"index$":6},{"name":"area","in":"query","schema":{"type":"string"},"index$":7},{"name":"since","in":"query","schema":{"type":"string"},"index$":8},{"name":"before","in":"query","schema":{"type":"string"},"index$":9},{"name":"after","in":"query","schema":{"type":"string"},"index$":10},{"name":"include_coverage","in":"query","schema":{"type":"boolean"},"index$":11}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/product_map/journeys/{journey_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"journey_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"revision_id","in":"query","schema":{"type":"string"},"index$":3},{"name":"persona_id","in":"query","schema":{"type":"string"},"index$":4},{"name":"account_id","in":"query","schema":{"type":"string"},"index$":5},{"name":"query","in":"query","schema":{"type":"string"},"index$":6},{"name":"area","in":"query","schema":{"type":"string"},"index$":7},{"name":"since","in":"query","schema":{"type":"string"},"index$":8},{"name":"before","in":"query","schema":{"type":"string"},"index$":9},{"name":"after","in":"query","schema":{"type":"string"},"index$":10},{"name":"variant_id","in":"query","schema":{"type":"string"},"index$":11},{"name":"include_tree","in":"query","schema":{"type":"boolean","default":true},"index$":12}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let product_map_journey_ref01_data = Object.values(setup.data.existing.product_map_journey)[0] as any

    // LIST
    const product_map_journey_ref01_ent = client.ProductMapJourney()
    const product_map_journey_ref01_match: any = {}
    product_map_journey_ref01_match['organization_id'] = setup.idmap['organization01']
    product_map_journey_ref01_match['project_id'] = setup.idmap['project01']

    const product_map_journey_ref01_list = (await product_map_journey_ref01_ent.list(product_map_journey_ref01_match)).map((e: any) => e.data())


    // LOAD
    const product_map_journey_ref01_match_dt0: any = {}
    product_map_journey_ref01_match_dt0.id = product_map_journey_ref01_data.id
    product_map_journey_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    product_map_journey_ref01_match_dt0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    const product_map_journey_ref01_data_dt0 = (await product_map_journey_ref01_ent.load(product_map_journey_ref01_match_dt0)).data()
    assert(product_map_journey_ref01_data_dt0.id === product_map_journey_ref01_data.id)


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
      '../../../../.sdk/test/entity/product_map_journey/ProductMapJourneyTestData.json')

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
    ['product_map_journey01','product_map_journey02','product_map_journey03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PRODUCT_MAP_JOURNEY_ENTID']
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
  
