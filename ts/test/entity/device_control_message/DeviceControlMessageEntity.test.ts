

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


describe('DeviceControlMessageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeviceControlMessage()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeviceControlMessage().list({"device_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'device_control_message.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_id":{"a":true,"h":"Agent Id","n":"agent_id","r":true,"t":"`$STRING`","key$":"agent_id","index$":0},"agent_name":{"a":true,"h":"Agent Name","n":"agent_name","r":true,"t":"`$STRING`","key$":"agent_name","index$":1},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":true,"t":"`$STRING`","key$":"expires_at","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"sender":{"a":true,"h":"Sender","n":"sender","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sender","index$":4},"text":{"a":true,"h":"Text","n":"text","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"text","index$":5},"text_omitted":{"a":true,"h":"Text Omitted","n":"text_omitted","r":true,"t":"`$BOOLEAN`","key$":"text_omitted","index$":6},"thread":{"a":true,"h":"Thread","n":"thread","r":true,"t":"`$OBJECT`","key$":"thread","index$":7}},"id":{"field":"id","name":"id"},"name":"device_control_message","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_messages","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"device_id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_messages","q":{"exist":["device_id","organization_id"]},"r":{"param":{"device_registration_id":"device_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"device_id"},{"lit":"control_messages"}],"t":{"page":{"cursor":"`body.next_cursor`"},"req":"`reqdata`","res":"`body.messages`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.device"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"device_control_message","name__orig":"device_control_message","Name":"DeviceControlMessage","name_":"device_control_message","name-":"device-control-message","NAME":"DEVICE_CONTROL_MESSAGE","index$":212}, {"active":true,"entity":"device_control_message","key$":"BasicDeviceControlMessageFlow","kind":"basic","name":"BasicDeviceControlMessageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"device_id":"device01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"device_control_message_ref01"}}],"index$":0}]}, 'DeviceControlMessage', {"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_messages":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"cursor","in":"query","required":false,"schema":{"type":"string","pattern":"^[1-9][0-9]{0,18}$"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let device_control_message_ref01_data = Object.values(setup.data.existing.device_control_message)[0] as any

    // LIST
    const device_control_message_ref01_ent = client.DeviceControlMessage()
    const device_control_message_ref01_match: any = {}
    device_control_message_ref01_match['device_id'] = setup.idmap['device01']
    device_control_message_ref01_match['organization_id'] = setup.idmap['organization01']

    const device_control_message_ref01_list = (await device_control_message_ref01_ent.list(device_control_message_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/device_control_message/DeviceControlMessageTestData.json')

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
    ['device_control_message01','device_control_message02','device_control_message03','organization01','organization02','organization03','device01','device02','device03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEVICE_CONTROL_MESSAGE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEVICE_CONTROL_MESSAGE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEVICE_CONTROL_MESSAGE_ENTID']
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
  
