

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


describe('AppDeployEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppDeploy()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppDeploy().create({"app_id":1,"image":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_deploy.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_environment_id":{"a":true,"h":"App Environment Id","n":"app_environment_id","r":false,"t":"`$STRING`","key$":"app_environment_id","index$":0},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","r":false,"t":"`$STRING`","key$":"app_service_id","index$":1},"channel":{"a":true,"h":"Channel","n":"channel","r":false,"t":"`$STRING`","key$":"channel","index$":2},"command":{"a":true,"h":"Command","n":"command","r":false,"t":"`$STRING`","key$":"command","index$":3},"commit_sha":{"a":true,"h":"Commit Sha","n":"commit_sha","r":false,"t":"`$STRING`","key$":"commit_sha","index$":4},"desired_instances":{"a":true,"h":"Desired Instances","n":"desired_instances","r":false,"t":"`$INTEGER`","key$":"desired_instances","index$":5},"environment":{"a":true,"h":"Environment","n":"environment","r":false,"sh":"Environment slug or public ID, all, or existing.","t":"`$STRING`","key$":"environment","index$":6},"image":{"a":true,"h":"Image","n":"image","r":true,"t":"`$STRING`","key$":"image","index$":7},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$STRING`","key$":"region","index$":8},"rollout_predecessor":{"a":true,"h":"Rollout Predecessor","n":"rollout_predecessor","r":false,"sh":"Public deployment operation ID from the same app that must succeed before this rollout starts.","t":"`$STRING`","key$":"rollout_predecessor","index$":9},"service":{"a":true,"h":"Service","n":"service","r":false,"sh":"Service slug or public ID; required unless app_service_id is supplied.","t":"`$STRING`","key$":"service","index$":10},"source_ref":{"a":true,"h":"Source Ref","n":"source_ref","r":false,"t":"`$STRING`","key$":"source_ref","index$":11}},"name":"app_deploy","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["app_environment_id","app_service_id","channel","command","commit_sha","desired_instances","environment","image","region","rollout_predecessor","service","source_ref"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deploys","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deploys","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deploys"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"app_deploy","name__orig":"app_deploy","Name":"AppDeploy","name_":"app_deploy","name-":"app-deploy","NAME":"APP_DEPLOY","index$":81}, {"active":true,"entity":"app_deploy","key$":"BasicAppDeployFlow","kind":"basic","name":"BasicAppDeployFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_deploy_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0}]}, 'AppDeploy', {"POST /api/v1/hosting/apps/{app_id}/deploys":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["image"],"properties":{"image":{"type":"string","key$":"image"},"service":{"type":"string","description":"Service slug or public ID; required unless app_service_id is supplied.","key$":"service"},"app_service_id":{"type":"string","key$":"app_service_id"},"environment":{"type":"string","description":"Environment slug or public ID, all, or existing.","key$":"environment"},"app_environment_id":{"type":"string","key$":"app_environment_id"},"region":{"type":"string","key$":"region"},"desired_instances":{"type":"integer","minimum":0,"key$":"desired_instances"},"command":{"type":"string","key$":"command"},"channel":{"type":"string","key$":"channel"},"source_ref":{"type":"string","key$":"source_ref"},"commit_sha":{"type":"string","key$":"commit_sha"},"rollout_predecessor":{"type":"string","description":"Public deployment operation ID from the same app that must succeed before this rollout starts.","key$":"rollout_predecessor"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_deploy.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/deploys"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_deploy_ref01_ent = client.AppDeploy()
    let app_deploy_ref01_data = setup.data.new.app_deploy['app_deploy_ref01']
    app_deploy_ref01_data['app_id'] = setup.idmap['app01']

    app_deploy_ref01_data = (await app_deploy_ref01_ent.create(app_deploy_ref01_data)).data()
    assert(null != app_deploy_ref01_data)


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
      '../../../../.sdk/test/entity/app_deploy/AppDeployTestData.json')

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
    ['app_deploy01','app_deploy02','app_deploy03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_DEPLOY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_DEPLOY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_DEPLOY_ENTID']
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
  
