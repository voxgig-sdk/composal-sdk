

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


describe('LeaseVerifySecretEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.LeaseVerifySecret()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.LeaseVerifySecret().create({"lease_id":1,"swarm_id":"x","task_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lease_verify_secret.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"lease_verify_secret","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_secrets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"lease_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"swarm_id","or":"swarm_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"task_id","or":"task_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_secrets","q":{"exist":["lease_id","swarm_id","task_id"]},"r":{"param":{"id":"lease_id","swarm_id":"swarm_id","task_id":"task_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"swarms"},{"var":"swarm_id"},{"lit":"tasks"},{"var":"task_id"},{"lit":"leases"},{"var":"lease_id"},{"lit":"verify_secrets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"lease_verify_secret","name__orig":"lease_verify_secret","Name":"LeaseVerifySecret","name_":"lease_verify_secret","name-":"lease-verify-secret","NAME":"LEASE_VERIFY_SECRET","index$":299}, {"active":true,"entity":"lease_verify_secret","key$":"BasicLeaseVerifySecretFlow","kind":"basic","name":"BasicLeaseVerifySecretFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"lease_verify_secret_ref01"},"m":{"lease_id":"lease01","swarm_id":"swarm01","task_id":"task01"},"o":"create","s":[],"v":[],"index$":0}]}, 'LeaseVerifySecret', {"POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_secrets":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"swarm_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"task_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"lease_verify_secret.create.0":"GET-only live run: needs POST /api/v1/agent/swarms/{swarm_id}/tasks/{task_id}/leases/{id}/verify_secrets"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const lease_verify_secret_ref01_ent = client.LeaseVerifySecret()
    let lease_verify_secret_ref01_data = setup.data.new.lease_verify_secret['lease_verify_secret_ref01']
    lease_verify_secret_ref01_data['lease_id'] = setup.idmap['lease01']
    lease_verify_secret_ref01_data['swarm_id'] = setup.idmap['swarm01']
    lease_verify_secret_ref01_data['task_id'] = setup.idmap['task01']

    lease_verify_secret_ref01_data = (await lease_verify_secret_ref01_ent.create(lease_verify_secret_ref01_data)).data()
    assert(null != lease_verify_secret_ref01_data)


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
      '../../../../.sdk/test/entity/lease_verify_secret/LeaseVerifySecretTestData.json')

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
    ['lease_verify_secret01','lease_verify_secret02','lease_verify_secret03','lease01','swarm01','task01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_LEASE_VERIFY_SECRET_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_LEASE_VERIFY_SECRET_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_LEASE_VERIFY_SECRET_ENTID']
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
  
