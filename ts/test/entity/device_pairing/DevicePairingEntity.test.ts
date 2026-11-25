

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


describe('DevicePairingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DevicePairing()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DevicePairing().create({"organization_id":1,"architecture":"x","channel":"x","name":"x","platform":"x","public_key":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'device_pairing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"architecture":{"a":true,"h":"Architecture","n":"architecture","r":true,"t":"`$STRING`","key$":"architecture","index$":0},"channel":{"a":true,"h":"Channel","n":"channel","r":true,"t":"`$STRING`","key$":"channel","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":3},"platform":{"a":true,"h":"Platform","n":"platform","r":true,"t":"`$STRING`","key$":"platform","index$":4},"public_key":{"a":true,"h":"Public Key","n":"public_key","r":true,"t":"`$STRING`","key$":"public_key","index$":5}},"id":{"field":"id","name":"id"},"name":"device_pairing","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["signature","token"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/pairings/{device_pairing_intent_id}/complete","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_pairing_intent_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/pairings/{device_pairing_intent_id}/complete","q":{"$action":"complete","exist":["id","organization_id"]},"r":{"param":{"device_pairing_intent_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"lit":"pairings"},{"var":"id"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["architecture","channel","name","platform","public_key"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/pairings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/pairings","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"lit":"pairings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"device_pairing","name__orig":"device_pairing","Name":"DevicePairing","name_":"device_pairing","name-":"device-pairing","NAME":"DEVICE_PAIRING","index$":219}, {"active":true,"entity":"device_pairing","key$":"BasicDevicePairingFlow","kind":"basic","name":"BasicDevicePairingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"device_pairing_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'DevicePairing', {"POST /api/v1/organizations/{organization_id}/devices/pairings/{device_pairing_intent_id}/complete":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["token","signature"],"properties":{"token":{"type":"string","maxLength":512},"signature":{"type":"string","pattern":"^[A-Za-z0-9_-]{86}$"}},"x-ref":"#/components/schemas/DevicePairingProof"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_pairing_intent_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/pairings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["name","platform","architecture","channel","public_key"],"properties":{"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"},"platform":{"type":"string","enum":["darwin","win32","linux"],"key$":"platform"},"architecture":{"type":"string","enum":["arm64","x64"],"key$":"architecture"},"channel":{"type":"string","enum":["dev","alpha","release"],"key$":"channel"},"public_key":{"type":"string","pattern":"^[A-Za-z0-9_-]{43}$","key$":"public_key"}},"x-ref":"#/components/schemas/DevicePairingInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"device_pairing.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/devices/pairings/{device_pairing_intent_id}/complete"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const device_pairing_ref01_ent = client.DevicePairing()
    let device_pairing_ref01_data = setup.data.new.device_pairing['device_pairing_ref01']
    device_pairing_ref01_data['organization_id'] = setup.idmap['organization01']

    device_pairing_ref01_data = (await device_pairing_ref01_ent.create(device_pairing_ref01_data)).data()
    assert(null != device_pairing_ref01_data.id)


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
      '../../../../.sdk/test/entity/device_pairing/DevicePairingTestData.json')

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
    ['device_pairing01','device_pairing02','device_pairing03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEVICE_PAIRING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEVICE_PAIRING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEVICE_PAIRING_ENTID']
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
  
