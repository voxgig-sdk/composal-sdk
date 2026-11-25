

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


describe('AuthPasswordResetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AuthPasswordReset()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AuthPasswordReset().create({"email":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'auth_password_reset.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"t":"`$STRING`","key$":"email","index$":0},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":1},"password":{"a":true,"fo":"password","h":"Password","n":"password","r":true,"t":"`$STRING`","key$":"password","index$":2},"token":{"a":true,"h":"Token","n":"token","r":true,"t":"`$STRING`","key$":"token","index$":3}},"name":"auth_password_reset","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email"],"co":{"id":"POST /api/v1/auth/password_resets","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/auth/password_resets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"password_resets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["password","token"],"co":{"id":"PATCH /api/v1/auth/password_resets","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/api/v1/auth/password_resets","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"password_resets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"auth_password_reset","name__orig":"auth_password_reset","Name":"AuthPasswordReset","name_":"auth_password_reset","name-":"auth-password-reset","NAME":"AUTH_PASSWORD_RESET","index$":113}, {"active":true,"entity":"auth_password_reset","key$":"BasicAuthPasswordResetFlow","kind":"basic","name":"BasicAuthPasswordResetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"auth_password_reset_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"auth_password_reset_ref01","srcdatavar":"auth_password_reset_ref01_data","suffix":"_up0","textfield":"email"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-auth_password_reset_ref01"}}],"v":[],"index$":1}]}, 'AuthPasswordReset', {"POST /api/v1/auth/password_resets":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["email"],"properties":{"email":{"type":"string","format":"email","key$":"email"}}}}}},"parameters":[]},"PATCH /api/v1/auth/password_resets":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["token","password"],"properties":{"token":{"type":"string","key$":"token"},"password":{"type":"string","format":"password","key$":"password"}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"auth_password_reset.create.0":"GET-only live run: needs POST /api/v1/auth/password_resets","auth_password_reset.update.1":"GET-only live run: needs PATCH /api/v1/auth/password_resets"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const auth_password_reset_ref01_ent = client.AuthPasswordReset()
    let auth_password_reset_ref01_data = setup.data.new.auth_password_reset['auth_password_reset_ref01']

    auth_password_reset_ref01_data = (await auth_password_reset_ref01_ent.create(auth_password_reset_ref01_data)).data()
    assert(null != auth_password_reset_ref01_data)


    // UPDATE
    const auth_password_reset_ref01_data_up0: any = {}

    const auth_password_reset_ref01_markdef_up0 = { name: 'email', value: 'Mark01-auth_password_reset_ref01_' + setup.now }
    ;(auth_password_reset_ref01_data_up0 as any)[auth_password_reset_ref01_markdef_up0.name] = auth_password_reset_ref01_markdef_up0.value

    const auth_password_reset_ref01_resdata_up0 = (await auth_password_reset_ref01_ent.update(auth_password_reset_ref01_data_up0)).data()
    assert(null != auth_password_reset_ref01_resdata_up0)

    assert((auth_password_reset_ref01_resdata_up0 as any)[auth_password_reset_ref01_markdef_up0.name] === auth_password_reset_ref01_markdef_up0.value)


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
      '../../../../.sdk/test/entity/auth_password_reset/AuthPasswordResetTestData.json')

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
    ['auth_password_reset01','auth_password_reset02','auth_password_reset03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AUTH_PASSWORD_RESET_ENTID']
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
  
