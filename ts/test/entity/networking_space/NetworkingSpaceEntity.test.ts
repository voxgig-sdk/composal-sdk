

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


describe('NetworkingSpaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.NetworkingSpace()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('networking_space hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).NetworkingSpace().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).NetworkingSpace()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.NetworkingSpace().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().NetworkingSpace().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.NetworkingSpace().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.NetworkingSpace().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.NetworkingSpace().list({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'networking_space.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"networking_space","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/networking/spaces/{id}/activate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/networking/spaces/{id}/activate","q":{"$action":"activate","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"},{"lit":"activate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/networking/spaces/{id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/networking/spaces/{id}/archive","q":{"$action":"archive","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/networking/spaces/{id}/pause","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/networking/spaces/{id}/pause","q":{"$action":"pause","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"},{"lit":"pause"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/networking/spaces/{id}/validate_route","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/networking/spaces/{id}/validate_route","q":{"$action":"validate_route","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"},{"lit":"validate_route"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"bf":false,"co":{"id":"POST /api/v1/networking/spaces","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/networking/spaces","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/networking/spaces","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/networking/spaces","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/networking/spaces/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/networking/spaces/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/networking/spaces/{space_id}/catalog","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"space_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/networking/spaces/{space_id}/catalog","q":{"$action":"catalog","exist":["id"]},"r":{"param":{"space_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"},{"lit":"catalog"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/networking/spaces/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/v1/networking/spaces/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/networking/spaces/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/networking/spaces/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/networking/spaces/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/networking/spaces/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"networking"},{"lit":"spaces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"networking_space","name__orig":"networking_space","Name":"NetworkingSpace","name_":"networking_space","name-":"networking-space","NAME":"NETWORKING_SPACE","index$":322}, {"active":true,"entity":"networking_space","key$":"BasicNetworkingSpaceFlow","kind":"basic","name":"BasicNetworkingSpaceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"networking_space_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"networking_space_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"networking_space_ref01","srcdatavar":"networking_space_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-networking_space_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"networking_space_ref01","srcdatavar":"networking_space_ref01_data","suffix":"_dt0"},"m":{"id":"networking_space01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-networking_space_ref01"}}],"index$":3,"route":"GET /api/v1/networking/spaces/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"networking_space_ref01","suffix":"_rm0"},"m":{"id":"networking_space01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"networking_space_ref01"}}],"index$":5}]}, 'NetworkingSpace', {"POST /api/v1/networking/spaces/{id}/activate":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/networking/spaces/{id}/archive":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/networking/spaces/{id}/pause":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/networking/spaces/{id}/validate_route":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/networking/spaces":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"GET /api/v1/networking/spaces":{"protocol":"http","parameters":[]},"GET /api/v1/networking/spaces/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/networking/spaces/{space_id}/catalog":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/networking/spaces/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"DELETE /api/v1/networking/spaces/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /api/v1/networking/spaces/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"networking_space.create.0":"GET-only live run: needs POST /api/v1/networking/spaces/{id}/activate","networking_space.update.2":"GET-only live run: needs PUT /api/v1/networking/spaces/{id}","networking_space.remove.4":"GET-only live run: needs DELETE /api/v1/networking/spaces/{id}","networking_space.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const networking_space_ref01_ent = client.NetworkingSpace()
    let networking_space_ref01_data = setup.data.new.networking_space['networking_space_ref01']

    networking_space_ref01_data = (await networking_space_ref01_ent.create(networking_space_ref01_data)).data()
    assert(null != networking_space_ref01_data.id)


    // LIST
    const networking_space_ref01_match: any = {}

    const networking_space_ref01_list = (await networking_space_ref01_ent.list(networking_space_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(networking_space_ref01_list, { id: networking_space_ref01_data.id })))


    // UPDATE
    const networking_space_ref01_data_up0: any = {}
    networking_space_ref01_data_up0.id = networking_space_ref01_data.id

    const networking_space_ref01_resdata_up0 = (await networking_space_ref01_ent.update(networking_space_ref01_data_up0)).data()
    assert(networking_space_ref01_resdata_up0.id === networking_space_ref01_data_up0.id)


    // LOAD
    const networking_space_ref01_match_dt0: any = {}
    networking_space_ref01_match_dt0.id = networking_space_ref01_data.id
    const networking_space_ref01_data_dt0 = (await networking_space_ref01_ent.load(networking_space_ref01_match_dt0)).data()
    assert(networking_space_ref01_data_dt0.id === networking_space_ref01_data.id)


    // REMOVE
    const networking_space_ref01_match_rm0: any = { id: networking_space_ref01_data.id }
    await networking_space_ref01_ent.remove(networking_space_ref01_match_rm0)
  

    // LIST
    const networking_space_ref01_match_rt0: any = {}

    const networking_space_ref01_list_rt0 = (await networking_space_ref01_ent.list(networking_space_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(networking_space_ref01_list_rt0, { id: networking_space_ref01_data.id })))


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
      '../../../../.sdk/test/entity/networking_space/NetworkingSpaceTestData.json')

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
    ['networking_space01','networking_space02','networking_space03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_NETWORKING_SPACE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_NETWORKING_SPACE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_NETWORKING_SPACE_ENTID']
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
  
