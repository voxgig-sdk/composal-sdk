

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


describe('PersonalAccessTokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PersonalAccessToken()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PersonalAccessToken().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'personal_access_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"personal_access_token","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/personal_access_tokens","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/personal_access_tokens","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"personal_access_tokens"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/personal_access_tokens","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/personal_access_tokens","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"personal_access_tokens"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/personal_access_tokens/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/personal_access_tokens/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"personal_access_tokens"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"The calling user's personal access tokens: list, create or revoke one.","code":"`The calling user's personal access tokens: list, create or revoke one.`","codecell":"`The calling user's personal access tokens: list, create or revoke one.`","flat":"The calling user's personal access tokens: list, create or revoke one.","inline":"The calling user's personal access tokens: list, create or revoke one.","label":"The calling user's personal access tokens: list, create or revoke one.","link":"The%20calling%20user's%20personal%20access%20tokens:%20list,%20create%20or%20revoke%20one.","raw":"The calling user's personal access tokens: list, create or revoke one.","text":"The calling user's personal access tokens: list, create or revoke one.","vendor":false}},"key$":"personal_access_token","name__orig":"personal_access_token","Name":"PersonalAccessToken","name_":"personal_access_token","name-":"personal-access-token","NAME":"PERSONAL_ACCESS_TOKEN","index$":375}, {"active":true,"entity":"personal_access_token","key$":"BasicPersonalAccessTokenFlow","kind":"basic","name":"BasicPersonalAccessTokenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"personal_access_token_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"personal_access_token_ref01","srcdatavar":"personal_access_token_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-personal_access_token_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"personal_access_token_ref01","suffix":"_rm0"},"m":{"id":"personal_access_token01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'PersonalAccessToken', {"POST /api/v1/personal_access_tokens":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"GET /api/v1/personal_access_tokens":{"protocol":"http","parameters":[]},"DELETE /api/v1/personal_access_tokens/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"personal_access_token.create.0":"GET-only live run: needs POST /api/v1/personal_access_tokens","personal_access_token.load.1":"GET-only live run: reads a record only personal_access_token.create.0 gives","personal_access_token.remove.2":"GET-only live run: needs DELETE /api/v1/personal_access_tokens/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const personal_access_token_ref01_ent = client.PersonalAccessToken()
    let personal_access_token_ref01_data = setup.data.new.personal_access_token['personal_access_token_ref01']

    personal_access_token_ref01_data = (await personal_access_token_ref01_ent.create(personal_access_token_ref01_data)).data()
    assert(null != personal_access_token_ref01_data.id)


    // LOAD
    const personal_access_token_ref01_match_dt0: any = {}
    personal_access_token_ref01_match_dt0.id = personal_access_token_ref01_data.id
    const personal_access_token_ref01_data_dt0 = (await personal_access_token_ref01_ent.load(personal_access_token_ref01_match_dt0)).data()
    assert(personal_access_token_ref01_data_dt0.id === personal_access_token_ref01_data.id)


    // REMOVE
    const personal_access_token_ref01_match_rm0: any = { id: personal_access_token_ref01_data.id }
    await personal_access_token_ref01_ent.remove(personal_access_token_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/personal_access_token/PersonalAccessTokenTestData.json')

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
    ['personal_access_token01','personal_access_token02','personal_access_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PERSONAL_ACCESS_TOKEN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PERSONAL_ACCESS_TOKEN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PERSONAL_ACCESS_TOKEN_ENTID']
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
  
