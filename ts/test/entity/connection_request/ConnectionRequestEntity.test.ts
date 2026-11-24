

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


describe('ConnectionRequestEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ConnectionRequest()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ConnectionRequest().load({"agent_id":1,"id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'connection_request.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agent_card_url":{"a":true,"fo":"uri","h":"Agent Card Url","n":"agent_card_url","r":true,"t":"`$STRING`","key$":"agent_card_url","index$":0},"auth_scheme":{"a":true,"h":"Auth Scheme","n":"auth_scheme","r":true,"t":"`$STRING`","key$":"auth_scheme","index$":1},"can_configure":{"a":true,"h":"Can Configure","n":"can_configure","r":true,"t":"`$BOOLEAN`","key$":"can_configure","index$":2},"can_disconnect":{"a":true,"h":"Can Disconnect","n":"can_disconnect","r":true,"t":"`$BOOLEAN`","key$":"can_disconnect","index$":3},"can_setup":{"a":true,"h":"Can Setup","n":"can_setup","r":true,"t":"`$BOOLEAN`","key$":"can_setup","index$":4},"error_code":{"a":true,"h":"Error Code","n":"error_code","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error_code","index$":5},"generation":{"a":true,"fo":"int64","h":"Generation","n":"generation","r":true,"t":"`$INTEGER`","key$":"generation","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":8},"remote_agent":{"a":true,"h":"Remote Agent","n":"remote_agent","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"remote_agent","index$":9},"retired_at":{"a":true,"fo":"date-time","h":"Retired At","n":"retired_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"retired_at","index$":10},"revoked_at":{"a":true,"fo":"date-time","h":"Revoked At","n":"revoked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at","index$":11},"source_operation_id":{"a":true,"h":"Source Operation Id","n":"source_operation_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_operation_id","index$":12},"state":{"a":true,"h":"State","n":"state","r":true,"t":"`$STRING`","key$":"state","index$":13}},"id":{"field":"id","name":"id"},"name":"connection_request","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"x_composal_relay_scope","or":"X-Composal-Relay-Scope","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"explode":false,"k":"header","n":"x_composal_requester_id","or":"X-Composal-Requester-Id","r":true,"style":"simple","t":"`$STRING`","index$":1}],"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"request_key","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"request_key","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}","q":{"exist":["agent_id","id","organization_id","x_composal_relay_scope","x_composal_requester_id"]},"r":{"param":{"id":"agent_id","request_key":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"relay"},{"lit":"connections"},{"lit":"requests"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"connection_request","name__orig":"connection_request","Name":"ConnectionRequest","name_":"connection_request","name-":"connection-request","NAME":"CONNECTION_REQUEST","index$":89}, {"active":true,"entity":"connection_request","key$":"BasicConnectionRequestFlow","kind":"basic","name":"BasicConnectionRequestFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"connection_request_ref01","srcdatavar":"connection_request_ref01_data","suffix":"_dt0"},"m":{"agent_id":"agent01","id":"connection_request01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-connection_request_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}","record":{}}]}, 'ConnectionRequest', {"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/relay/connections/requests/{request_key}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"request_key","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"X-Composal-Requester-Id","in":"header","required":true,"schema":{"type":"string","minLength":1,"maxLength":200},"description":"Retain the signed-in requester ID from list/detail with this exact intended write.","index$":3},{"name":"X-Composal-Relay-Scope","in":"header","required":true,"schema":{"type":"string","pattern":"^[a-f0-9]{64}$"},"description":"Retain the scope_key from list/detail with the original requester and intended write. A new membership cannot inherit that intent.","index$":4},{"name":"request_key","in":"path","required":true,"schema":{"type":"string","minLength":1,"maxLength":160,"pattern":"^[A-Za-z0-9_-]+$"},"index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let connection_request_ref01_data = Object.values(setup.data.existing.connection_request)[0] as any

    // LOAD
    const connection_request_ref01_ent = client.ConnectionRequest()
    const connection_request_ref01_match_dt0: any = {}
    connection_request_ref01_match_dt0.id = connection_request_ref01_data.id
    connection_request_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    connection_request_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const connection_request_ref01_data_dt0 = (await connection_request_ref01_ent.load(connection_request_ref01_match_dt0)).data()
    assert(connection_request_ref01_data_dt0.id === connection_request_ref01_data.id)


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
      '../../../../.sdk/test/entity/connection_request/ConnectionRequestTestData.json')

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
    ['connection_request01','connection_request02','connection_request03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CONNECTION_REQUEST_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CONNECTION_REQUEST_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CONNECTION_REQUEST_ENTID']
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
  
