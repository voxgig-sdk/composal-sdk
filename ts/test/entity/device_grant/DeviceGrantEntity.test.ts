

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


describe('DeviceGrantEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DeviceGrant()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeviceGrant().list({"device_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'device_grant.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active_grants":{"a":true,"h":"Active Grants","n":"active_grants","r":true,"t":"`$ARRAY`","key$":"active_grants","index$":0},"agent_choices":{"a":true,"h":"Agent Choices","n":"agent_choices","r":true,"sh":"Eligible picker choices, with current owner grant targets, on the first page only.","t":"`$ARRAY`","key$":"agent_choices","index$":1},"agent_id":{"a":true,"h":"Agent Id","n":"agent_id","r":true,"t":"`$STRING`","key$":"agent_id","index$":2},"all_agents_access":{"a":true,"h":"All Agents Access","n":"all_agents_access","r":true,"sh":"Whether every agent the owner can use may use this computer for the owner's messages, including agents added later.","t":"`$BOOLEAN`","key$":"all_agents_access","index$":3},"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","r":true,"t":"`$ARRAY`","key$":"capabilities","index$":4},"execution_available":{"a":true,"h":"Execution Available","n":"execution_available","r":true,"t":"`$BOOLEAN`","key$":"execution_available","index$":5},"grants":{"a":true,"h":"Grants","n":"grants","r":true,"t":"`$ARRAY`","key$":"grants","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":7},"next_cursor":{"a":true,"h":"Next Cursor","n":"next_cursor","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"next_cursor","index$":8},"principal_id":{"a":true,"h":"Principal Id","n":"principal_id","r":true,"t":"`$STRING`","key$":"principal_id","index$":9}},"id":{"field":"id","name":"id"},"name":"device_grant","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["capabilities","revision"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revise","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"device_id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"device_grant_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revise","q":{"$action":"revise","exist":["device_id","id","organization_id"]},"r":{"param":{"device_grant_id":"id","device_registration_id":"device_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"device_id"},{"lit":"grants"},{"var":"id"},{"lit":"revise"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revoke","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"device_id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"device_grant_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revoke","q":{"$action":"revoke","exist":["device_id","id","organization_id"]},"r":{"param":{"device_grant_id":"id","device_registration_id":"device_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"device_id"},{"lit":"grants"},{"var":"id"},{"lit":"revoke"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["agent_id","capabilities","principal_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"device_id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants","q":{"exist":["device_id","organization_id"]},"r":{"param":{"device_registration_id":"device_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"device_id"},{"lit":"grants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"device_id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants","q":{"exist":["device_id","organization_id"]},"r":{"param":{"device_registration_id":"device_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"device_id"},{"lit":"grants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.device"]]},"key$":"device_grant","name__orig":"device_grant","Name":"DeviceGrant","name_":"device_grant","name-":"device-grant","NAME":"DEVICE_GRANT","index$":216}, {"active":true,"entity":"device_grant","key$":"BasicDeviceGrantFlow","kind":"basic","name":"BasicDeviceGrantFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"device_grant_ref01"},"m":{"device_id":"device01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"device_id":"device01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"device_grant_ref01"}}],"index$":1}]}, 'DeviceGrant', {"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revise":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["revision","capabilities"],"properties":{"revision":{"type":"integer","minimum":1,"maximum":9223372036854776000},"capabilities":{"type":"array","minItems":1,"maxItems":7,"uniqueItems":true,"items":{"type":"string","enum":["browser","claude_code","coding_agents","computer","files","harnesses","processes"]}}},"x-ref":"#/components/schemas/DeviceGrantRevisionInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"device_grant_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revoke":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":[],"properties":{}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"device_grant_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["agent_id","principal_id","capabilities"],"properties":{"agent_id":{"type":"string","key$":"agent_id"},"principal_id":{"type":"string","key$":"principal_id"},"capabilities":{"type":"array","minItems":1,"maxItems":7,"uniqueItems":true,"items":{"type":"string","enum":["browser","claude_code","coding_agents","computer","files","harnesses","processes"]},"key$":"capabilities"}},"x-ref":"#/components/schemas/DeviceGrantInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"cursor","in":"query","required":false,"schema":{"type":"string","maxLength":200},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"device_grant.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/grants/{device_grant_id}/revise"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const device_grant_ref01_ent = client.DeviceGrant()
    let device_grant_ref01_data = setup.data.new.device_grant['device_grant_ref01']
    device_grant_ref01_data['device_id'] = setup.idmap['device01']
    device_grant_ref01_data['organization_id'] = setup.idmap['organization01']

    device_grant_ref01_data = (await device_grant_ref01_ent.create(device_grant_ref01_data)).data()
    assert(null != device_grant_ref01_data.id)


    // LIST
    const device_grant_ref01_match: any = {}
    device_grant_ref01_match['device_id'] = setup.idmap['device01']
    device_grant_ref01_match['organization_id'] = setup.idmap['organization01']

    const device_grant_ref01_list = (await device_grant_ref01_ent.list(device_grant_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(device_grant_ref01_list, { id: device_grant_ref01_data.id })))


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
      '../../../../.sdk/test/entity/device_grant/DeviceGrantTestData.json')

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
    ['device_grant01','device_grant02','device_grant03','organization01','organization02','organization03','device01','device02','device03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEVICE_GRANT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEVICE_GRANT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEVICE_GRANT_ENTID']
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
  
