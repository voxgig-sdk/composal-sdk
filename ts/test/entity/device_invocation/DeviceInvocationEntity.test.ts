

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


describe('DeviceInvocationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeviceInvocation()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'device_invocation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"device_invocation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["invocation_id","request_hash"],"co":{"id":"POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/challenge","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"x_composal_device_connection","or":"X-Composal-Device-Connection","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"device_id","or":"device_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/challenge","q":{"$action":"challenge","exist":["device_id","organization_id"]},"r":{"param":{"device_id":"device_id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"device_runtime"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"device_id"},{"lit":"invocations"},{"lit":"challenge"}],"t":{"req":{"invocation_id":"`reqdata.invocation_id`","request_hash":"`reqdata.request_hash`"},"res":"`body`"},"index$":0},{"a":true,"bf":["challenge","signature"],"co":{"id":"POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/lease","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"x_composal_device_connection","or":"X-Composal-Device-Connection","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"device_id","or":"device_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/lease","q":{"$action":"lease","exist":["device_id","organization_id"]},"r":{"param":{"device_id":"device_id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"device_runtime"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"device_id"},{"lit":"invocations"},{"lit":"lease"}],"t":{"req":{"challenge":"`reqdata.challenge`","signature":"`reqdata.signature`"},"res":"`body.lease`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.device"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"device_invocation","name__orig":"device_invocation","Name":"DeviceInvocation","name_":"device_invocation","name-":"device-invocation","NAME":"DEVICE_INVOCATION","index$":216}, {"active":true,"entity":"device_invocation","key$":"BasicDeviceInvocationFlow","kind":"basic","name":"BasicDeviceInvocationFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"device_invocation_ref01"},"m":{"device_id":"device01","organization_id":"organization01"},"o":"create","s":[],"v":[],"unreachable":true}]}, 'DeviceInvocation', {"POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/challenge":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["invocation_id","request_hash"],"properties":{"invocation_id":{"type":"string","minLength":1,"maxLength":200},"request_hash":{"type":"string","pattern":"^[0-9a-f]{64}$"}},"x-ref":"#/components/schemas/DeviceInvocationChallengeInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"X-Composal-Device-Connection","in":"header","required":false,"description":"The Rails-issued routing selector for this physical pairing and selected OCE agent runtime. It is bound into the signed challenge; it does not replace native key proof or authorize execution. Retained tenant connections omit it.","schema":{"type":"string","maxLength":1800,"pattern":"^[A-Za-z0-9_-]+$"},"index$":2}]},"POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/lease":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["challenge","signature"],"properties":{"challenge":{"type":"string","minLength":1,"maxLength":8192},"signature":{"type":"string","pattern":"^[A-Za-z0-9_-]{86}$"}},"x-ref":"#/components/schemas/DeviceExecutionLeaseInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"X-Composal-Device-Connection","in":"header","required":false,"description":"The Rails-issued routing selector for this physical pairing and selected OCE agent runtime. It is bound into the signed challenge; it does not replace native key proof or authorize execution. Retained tenant connections omit it.","schema":{"type":"string","maxLength":1800,"pattern":"^[A-Za-z0-9_-]+$"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"device_invocation.create.0":"GET-only live run: needs POST /api/v1/device_runtime/organizations/{organization_id}/devices/{device_id}/invocations/challenge"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let device_invocation_ref01_data = Object.values(setup.data.existing.device_invocation)[0] as any

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
      '../../../../.sdk/test/entity/device_invocation/DeviceInvocationTestData.json')

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
    ['device_invocation01','device_invocation02','device_invocation03','organization01','organization02','organization03','device01','device02','device03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEVICE_INVOCATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEVICE_INVOCATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEVICE_INVOCATION_ENTID']
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
  
