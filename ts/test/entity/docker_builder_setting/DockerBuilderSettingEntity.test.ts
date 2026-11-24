

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


describe('DockerBuilderSettingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DockerBuilderSetting()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DockerBuilderSetting().load({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'docker_builder_setting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"idle_timeout_seconds":{"a":true,"h":"Idle Timeout Seconds","n":"idle_timeout_seconds","op":{"patch":{"req":false,"type":"`$INTEGER`"}},"r":true,"t":"`$INTEGER`","key$":"idle_timeout_seconds","index$":0},"max_concurrency":{"a":true,"h":"Max Concurrency","n":"max_concurrency","op":{"patch":{"req":false,"type":"`$INTEGER`"}},"r":true,"t":"`$INTEGER`","key$":"max_concurrency","index$":1},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":2},"region":{"a":true,"h":"Region","n":"region","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"region","index$":3},"runtime_timeout_seconds":{"a":true,"h":"Runtime Timeout Seconds","n":"runtime_timeout_seconds","op":{"patch":{"req":false,"type":"`$INTEGER`"}},"r":true,"t":"`$INTEGER`","key$":"runtime_timeout_seconds","index$":4}},"name":"docker_builder_setting","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/docker_builder_settings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/docker_builder_settings","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"docker_builder_settings"}],"t":{"req":"`reqdata`","res":"`body.docker_builder_settings`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["idle_timeout_seconds","max_concurrency","region","runtime_timeout_seconds"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/docker_builder_settings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/docker_builder_settings","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"docker_builder_settings"}],"t":{"req":"`reqdata`","res":"`body.docker_builder_settings`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/organizations/{organization_id}/docker_builder_settings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/docker_builder_settings","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"docker_builder_settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"docker_builder_setting","name__orig":"docker_builder_setting","Name":"DockerBuilderSetting","name_":"docker_builder_setting","name-":"docker-builder-setting","NAME":"DOCKER_BUILDER_SETTING","index$":224}, {"active":true,"entity":"docker_builder_setting","key$":"BasicDockerBuilderSettingFlow","kind":"basic","name":"BasicDockerBuilderSettingFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"docker_builder_setting_ref01","srcdatavar":"docker_builder_setting_ref01_data","suffix":"_up0","textfield":"region"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-docker_builder_setting_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"docker_builder_setting_ref01","srcdatavar":"docker_builder_setting_ref01_data","suffix":"_dt0"},"m":{"id":"docker_builder_setting01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-docker_builder_setting_ref01"}}],"unreachable":true}]}, 'DockerBuilderSetting', {"GET /api/v1/organizations/{organization_id}/docker_builder_settings":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/organizations/{organization_id}/docker_builder_settings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"max_concurrency":{"type":"integer","minimum":1,"maximum":128,"default":1,"key$":"max_concurrency"},"idle_timeout_seconds":{"type":"integer","minimum":60,"maximum":86400,"default":600,"key$":"idle_timeout_seconds"},"runtime_timeout_seconds":{"type":"integer","minimum":300,"maximum":86400,"default":3600,"key$":"runtime_timeout_seconds"},"region":{"type":"string","enum":["us-east","us-west","eu-west","ap-southeast"],"default":"us-east","key$":"region"}},"x-ref":"#/components/schemas/DockerBuilderSettingsUpdate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /api/v1/organizations/{organization_id}/docker_builder_settings":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"docker_builder_setting.update.0":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/docker_builder_settings"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let docker_builder_setting_ref01_data = Object.values(setup.data.existing.docker_builder_setting)[0] as any

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
      '../../../../.sdk/test/entity/docker_builder_setting/DockerBuilderSettingTestData.json')

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
    ['docker_builder_setting01','docker_builder_setting02','docker_builder_setting03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DOCKER_BUILDER_SETTING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DOCKER_BUILDER_SETTING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DOCKER_BUILDER_SETTING_ENTID']
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
  
