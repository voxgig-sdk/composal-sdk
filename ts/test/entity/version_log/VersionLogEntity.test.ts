

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


describe('VersionLogEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.VersionLog()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VersionLog().list({"binary_id":1,"organization_id":"x","version_id":"x","project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'version_log.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base_image":{"a":true,"h":"Base Image","n":"base_image","r":true,"t":"`$STRING`","key$":"base_image","index$":0},"failure_phase":{"a":true,"h":"Failure Phase","n":"failure_phase","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_phase","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"image_digest":{"a":true,"h":"Image Digest","n":"image_digest","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"image_digest","index$":3},"image_reference":{"a":true,"h":"Image Reference","n":"image_reference","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"image_reference","index$":4},"installer_version":{"a":true,"h":"Installer Version","n":"installer_version","r":true,"t":"`$STRING`","key$":"installer_version","index$":5},"ready_at":{"a":true,"h":"Ready At","n":"ready_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ready_at","index$":6},"receipt":{"a":true,"h":"Receipt","n":"receipt","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"receipt","index$":7},"safe_error":{"a":true,"h":"Safe Error","n":"safe_error","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"safe_error","index$":8},"started_at":{"a":true,"h":"Started At","n":"started_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at","index$":9},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":10}},"id":{"field":"id","name":"id"},"name":"version_log","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/logs","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"binary_id","or":"binary_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"version_id","or":"id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/logs","q":{"exist":["binary_id","organization_id","project_id","version_id"]},"r":{"param":{"binary_id":"binary_id","id":"version_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"binary_id"},{"lit":"versions"},{"var":"version_id"},{"lit":"logs"}],"t":{"req":"`reqdata`","res":"`body.operations`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.binary"]]},"key$":"version_log","name__orig":"version_log","Name":"VersionLog","name_":"version_log","name-":"version-log","NAME":"VERSION_LOG","index$":540}, {"active":true,"entity":"version_log","key$":"BasicVersionLogFlow","kind":"basic","name":"BasicVersionLogFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"binary_id":"binary01","organization_id":"organization01","version_id":"version01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"version_log_ref01"}}],"index$":0}]}, 'VersionLog', {"GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/logs":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"binary_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let version_log_ref01_data = Object.values(setup.data.existing.version_log)[0] as any

    // LIST
    const version_log_ref01_ent = client.VersionLog()
    const version_log_ref01_match: any = {}
    version_log_ref01_match['binary_id'] = setup.idmap['binary01']
    version_log_ref01_match['organization_id'] = setup.idmap['organization01']
    version_log_ref01_match['version_id'] = setup.idmap['version01']

    const version_log_ref01_list = (await version_log_ref01_ent.list(version_log_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/version_log/VersionLogTestData.json')

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
    ['version_log01','version_log02','version_log03','organization01','organization02','organization03','binary01','binary02','binary03','version01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_VERSION_LOG_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_VERSION_LOG_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_VERSION_LOG_ENTID']
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
  
