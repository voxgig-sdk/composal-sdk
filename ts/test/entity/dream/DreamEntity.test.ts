

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


describe('DreamEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Dream()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Dream().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dream.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attention":{"a":true,"h":"Attention","n":"attention","r":true,"sh":"The dream skipped at least one run, which will not be retried","t":"`$BOOLEAN`","key$":"attention","index$":0},"changes":{"a":true,"h":"Changes","n":"changes","r":true,"sh":"One page of changes when tab is changes; empty otherwise","t":"`$ARRAY`","key$":"changes","index$":1},"completed_at":{"a":true,"fo":"date-time","h":"Completed At","n":"completed_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"completed_at","index$":2},"counts":{"a":true,"h":"Counts","n":"counts","r":true,"t":"`$OBJECT`","key$":"counts","index$":3},"dream":{"a":true,"h":"Dream","n":"dream","r":true,"t":"`$ANY`","key$":"dream","index$":4},"error_code":{"a":true,"h":"Error Code","n":"error_code","r":true,"sh":"Diagnostic code from the last failure, or from a dream that stopped early; not display copy, show reason instead","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error_code","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Public id used in the dream's URL","t":"`$STRING`","key$":"id","index$":6},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":3},"key$":"pagination","index$":7},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":8},"phase":{"a":true,"h":"Phase","n":"phase","r":true,"sh":"Where the dream is.","t":"`$STRING`","key$":"phase","index$":9},"reason":{"a":true,"h":"Reason","n":"reason","r":true,"sh":"Plain-language explanation of the phase: the cause and what happens next.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"reason","index$":10},"reviewed":{"a":true,"h":"Reviewed","n":"reviewed","r":true,"sh":"Finished runs and blocked executions reviewed, not counting skipped ones","t":"`$INTEGER`","key$":"reviewed","index$":11},"reviewed_date":{"a":true,"fo":"date","h":"Reviewed Date","n":"reviewed_date","r":true,"sh":"Local day whose finished runs it reviewed","t":"`$STRING`","key$":"reviewed_date","index$":12},"runs":{"a":true,"h":"Runs","n":"runs","r":true,"sh":"One page of covered runs, reviewed or skipped, when tab is runs; empty otherwise","t":"`$ARRAY`","key$":"runs","index$":13},"scope_name":{"a":true,"h":"Scope Name","n":"scope_name","r":true,"sh":"Project or unassigned environment name","t":"`$STRING`","key$":"scope_name","index$":14},"skipped":{"a":true,"h":"Skipped","n":"skipped","r":true,"sh":"Runs skipped after repeated rejected review output","t":"`$INTEGER`","key$":"skipped","index$":15},"tab":{"a":true,"h":"Tab","n":"tab","r":true,"t":"`$STRING`","key$":"tab","index$":16},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":true,"sh":"Organization timezone the dream used","t":"`$STRING`","key$":"timezone","index$":17}},"id":{"field":"id","name":"id"},"name":"dream","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/dreams/{id}/resume","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/dreams/{id}/resume","q":{"$action":"resume","exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"dreams"},{"var":"id"},{"lit":"resume"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/dreams","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/dreams","q":{"exist":["organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"dreams"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/dreams/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":1},{"a":true,"ex":"changes","explode":true,"k":"query","n":"tab","or":"tab","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/dreams/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"dreams"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"dream","name__orig":"dream","Name":"Dream","name_":"dream","name-":"dream","NAME":"DREAM","index$":104}, {"active":true,"entity":"dream","key$":"BasicDreamFlow","kind":"basic","name":"BasicDreamFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"dream_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"dream_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"dream_ref01","srcdatavar":"dream_ref01_data","suffix":"_dt0"},"m":{"id":"dream01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dream_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/verify/dreams/{id}","record":{}}]}, 'Dream', {"POST /api/v1/organizations/{organization_id}/verify/dreams/{id}/resume":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":true,"description":"Project slug or public id that owns the dream","schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verify/dreams":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"query","required":true,"description":"Project slug or public id","schema":{"type":"string"},"index$":1},{"name":"page","in":"query","required":false,"schema":{"type":"integer","minimum":1},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verify/dreams/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":true,"description":"Project slug or public id that owns the dream","schema":{"type":"string"},"index$":2},{"name":"tab","in":"query","required":false,"description":"Which list to populate; defaults to changes","schema":{"type":"string","enum":["changes","runs"],"default":"changes"},"index$":3},{"name":"page","in":"query","required":false,"schema":{"type":"integer","minimum":1},"index$":4}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"dream.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/dreams/{id}/resume"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dream_ref01_data = Object.values(setup.data.existing.dream)[0] as any

    // LIST
    const dream_ref01_ent = client.Dream()
    const dream_ref01_match: any = {}
    dream_ref01_match['organization_id'] = setup.idmap['organization01']

    const dream_ref01_list = (await dream_ref01_ent.list(dream_ref01_match)).map((e: any) => e.data())


    // LOAD
    const dream_ref01_match_dt0: any = {}
    dream_ref01_match_dt0.id = dream_ref01_data.id
    dream_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const dream_ref01_data_dt0 = (await dream_ref01_ent.load(dream_ref01_match_dt0)).data()
    assert(dream_ref01_data_dt0.id === dream_ref01_data.id)


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
      '../../../../.sdk/test/entity/dream/DreamTestData.json')

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
    ['dream01','dream02','dream03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DREAM_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DREAM_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DREAM_ENTID']
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
  
