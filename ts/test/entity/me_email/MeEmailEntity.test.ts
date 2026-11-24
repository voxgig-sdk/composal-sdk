

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


describe('MeEmailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.MeEmail()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('me_email hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).MeEmail().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).MeEmail()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MeEmail().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().MeEmail().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MeEmail().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MeEmail().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MeEmail().list({"account":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'me_email.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account":{"a":true,"h":"Account","n":"account","r":true,"t":"`$BOOLEAN`","key$":"account","index$":0},"can_delete":{"a":true,"h":"Can Delete","n":"can_delete","r":true,"t":"`$BOOLEAN`","key$":"can_delete","index$":1},"can_resend_verification":{"a":true,"h":"Can Resend Verification","n":"can_resend_verification","r":true,"t":"`$BOOLEAN`","key$":"can_resend_verification","index$":2},"can_set_account":{"a":true,"h":"Can Set Account","n":"can_set_account","r":true,"t":"`$BOOLEAN`","key$":"can_set_account","index$":3},"can_set_commit_author":{"a":true,"h":"Can Set Commit Author","n":"can_set_commit_author","r":true,"t":"`$BOOLEAN`","key$":"can_set_commit_author","index$":4},"commit_author":{"a":true,"h":"Commit Author","n":"commit_author","r":true,"t":"`$BOOLEAN`","key$":"commit_author","index$":5},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":6},"emails":{"a":true,"h":"Emails","n":"emails","r":true,"t":"`$ARRAY`","key$":"emails","index$":7},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":8},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":9},"verification_status":{"a":true,"h":"Verification Status","n":"verification_status","r":true,"t":"`$STRING`","key$":"verification_status","index$":10},"verified":{"a":true,"h":"Verified","n":"verified","r":true,"t":"`$BOOLEAN`","key$":"verified","index$":11}},"id":{"field":"id","name":"id"},"name":"me_email","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/me/emails/{id}/resend_verification","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/me/emails/{id}/resend_verification","q":{"$action":"resend_verification","exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"me"},{"lit":"emails"},{"var":"id"},{"lit":"resend_verification"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["email"],"co":{"id":"POST /api/v1/me/emails","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/me/emails","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"me"},{"lit":"emails"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/me/emails","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/me/emails","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"me"},{"lit":"emails"}],"t":{"req":"`reqdata`","res":"`body.emails`"},"index$":0}],"key$":"list"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["account","commit_author"],"co":{"id":"PATCH /api/v1/me/emails/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/me/emails/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"me"},{"lit":"emails"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/me/emails/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/me/emails/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"me"},{"lit":"emails"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/me/emails/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/me/emails/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"me"},{"lit":"emails"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"me_email","name__orig":"me_email","Name":"MeEmail","name_":"me_email","name-":"me-email","NAME":"ME_EMAIL","index$":307}, {"active":true,"entity":"me_email","key$":"BasicMeEmailFlow","kind":"basic","name":"BasicMeEmailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"me_email_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"me_email_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"me_email_ref01","srcdatavar":"me_email_ref01_data","suffix":"_up0","textfield":"email"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-me_email_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"me_email_ref01","suffix":"_rm0"},"m":{"id":"me_email01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"me_email_ref01"}}],"index$":4}]}, 'MeEmail', {"POST /api/v1/me/emails/{id}/resend_verification":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/me/emails":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["email"],"properties":{"email":{"type":"string","format":"email","key$":"email"}}}}}},"parameters":[]},"GET /api/v1/me/emails":{"protocol":"http","parameters":[]},"PATCH /api/v1/me/emails/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"oneOf":[{"type":"object","required":["account"],"properties":{"account":{"type":"boolean"}}},{"type":"object","required":["commit_author"],"properties":{"commit_author":{"type":"boolean"}}}]}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/me/emails/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/me/emails/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"me_email.create.0":"GET-only live run: needs POST /api/v1/me/emails/{id}/resend_verification","me_email.update.2":"GET-only live run: needs PUT /api/v1/me/emails/{id}","me_email.remove.3":"GET-only live run: needs DELETE /api/v1/me/emails/{id}","me_email.list.4":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const me_email_ref01_ent = client.MeEmail()
    let me_email_ref01_data = setup.data.new.me_email['me_email_ref01']

    me_email_ref01_data = (await me_email_ref01_ent.create(me_email_ref01_data)).data()
    assert(null != me_email_ref01_data.id)


    // LIST
    const me_email_ref01_match: any = {}

    const me_email_ref01_list = (await me_email_ref01_ent.list(me_email_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(me_email_ref01_list, { id: me_email_ref01_data.id })))


    // UPDATE
    const me_email_ref01_data_up0: any = {}
    me_email_ref01_data_up0.id = me_email_ref01_data.id

    const me_email_ref01_markdef_up0 = { name: 'email', value: 'Mark01-me_email_ref01_' + setup.now }
    ;(me_email_ref01_data_up0 as any)[me_email_ref01_markdef_up0.name] = me_email_ref01_markdef_up0.value

    const me_email_ref01_resdata_up0 = (await me_email_ref01_ent.update(me_email_ref01_data_up0)).data()
    assert(me_email_ref01_resdata_up0.id === me_email_ref01_data_up0.id)

    assert((me_email_ref01_resdata_up0 as any)[me_email_ref01_markdef_up0.name] === me_email_ref01_markdef_up0.value)


    // REMOVE
    const me_email_ref01_match_rm0: any = { id: me_email_ref01_data.id }
    await me_email_ref01_ent.remove(me_email_ref01_match_rm0)
  

    // LIST
    const me_email_ref01_match_rt0: any = {}

    const me_email_ref01_list_rt0 = (await me_email_ref01_ent.list(me_email_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(me_email_ref01_list_rt0, { id: me_email_ref01_data.id })))


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
      '../../../../.sdk/test/entity/me_email/MeEmailTestData.json')

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
    ['me_email01','me_email02','me_email03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ME_EMAIL_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ME_EMAIL_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ME_EMAIL_ENTID']
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
  
