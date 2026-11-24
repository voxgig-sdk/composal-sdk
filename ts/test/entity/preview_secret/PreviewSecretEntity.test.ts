

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


describe('PreviewSecretEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PreviewSecret()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PreviewSecret().create({"app_id":1,"preview_id":"x","env_key":"x","name":"x","slug":"x","value":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'preview_secret.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"env_key":{"a":true,"h":"Env Key","n":"env_key","r":true,"t":"`$STRING`","key$":"env_key","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":2},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":3},"value":{"a":true,"h":"Value","n":"value","r":true,"t":"`$STRING`","wo":true,"key$":"value","index$":4}},"id":{"field":"id","name":"id"},"name":"preview_secret","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["value"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"preview_id","or":"preview_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate","q":{"$action":"rotate","exist":["app_id","id","preview_id"]},"r":{"param":{"app_id":"app_id","id":"id","preview_id":"preview_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"preview_id"},{"lit":"secrets"},{"var":"id"},{"lit":"rotate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["env_key","name","slug","value"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"preview_id","or":"preview_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets","q":{"exist":["app_id","preview_id"]},"r":{"param":{"app_id":"app_id","preview_id":"preview_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"preview_id"},{"lit":"secrets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"preview_id","or":"preview_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}","q":{"exist":["app_id","id","preview_id"]},"r":{"param":{"app_id":"app_id","id":"id","preview_id":"preview_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"preview_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"preview_secret","name__orig":"preview_secret","Name":"PreviewSecret","name_":"preview_secret","name-":"preview-secret","NAME":"PREVIEW_SECRET","index$":153}, {"active":true,"entity":"preview_secret","key$":"BasicPreviewSecretFlow","kind":"basic","name":"BasicPreviewSecretFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"preview_secret_ref01"},"m":{"app_id":"app01","preview_id":"preview01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"preview_secret_ref01","suffix":"_rm0"},"m":{"app_id":"app01","id":"preview_secret01","preview_id":"preview01"},"o":"remove","s":[],"v":[],"index$":1}]}, 'PreviewSecret', {"POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["value"],"properties":{"value":{"type":"string","writeOnly":true}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"preview_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["name","slug","env_key","value"],"properties":{"name":{"type":"string","key$":"name"},"slug":{"type":"string","key$":"slug"},"env_key":{"type":"string","key$":"env_key"},"value":{"type":"string","writeOnly":true,"key$":"value"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"preview_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"preview_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"preview_secret.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}/rotate","preview_secret.remove.1":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/previews/{preview_id}/secrets/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const preview_secret_ref01_ent = client.PreviewSecret()
    let preview_secret_ref01_data = setup.data.new.preview_secret['preview_secret_ref01']
    preview_secret_ref01_data['app_id'] = setup.idmap['app01']
    preview_secret_ref01_data['preview_id'] = setup.idmap['preview01']

    preview_secret_ref01_data = (await preview_secret_ref01_ent.create(preview_secret_ref01_data)).data()
    assert(null != preview_secret_ref01_data.id)


    // REMOVE
    const preview_secret_ref01_match_rm0: any = { id: preview_secret_ref01_data.id }
    preview_secret_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    preview_secret_ref01_match_rm0['preview_id'] = setup.idmap['preview_id'] ?? setup.idmap['preview01']
    await preview_secret_ref01_ent.remove(preview_secret_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/preview_secret/PreviewSecretTestData.json')

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
    ['preview_secret01','preview_secret02','preview_secret03','app01','app02','app03','preview01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PREVIEW_SECRET_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PREVIEW_SECRET_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PREVIEW_SECRET_ENTID']
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
  
