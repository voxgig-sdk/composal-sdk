

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


describe('ProjectIosAppEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ProjectIosApp()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ProjectIosApp().create({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'project_ios_app.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"android":{"a":true,"h":"Android","n":"android","r":true,"t":"`$OBJECT`","key$":"android","index$":0},"artifact_paths":{"a":true,"h":"Artifact Paths","n":"artifact_paths","r":false,"t":"`$ARRAY`","key$":"artifact_paths","index$":1},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":2},"image":{"a":true,"h":"Image","n":"image","r":true,"t":"`$STRING`","key$":"image","index$":3},"ios":{"a":true,"h":"Ios","n":"ios","r":true,"t":"`$OBJECT`","key$":"ios","index$":4},"launch_command":{"a":true,"h":"Launch Command","n":"launch_command","r":false,"t":"`$STRING`","key$":"launch_command","index$":5},"managed_binary":{"a":true,"h":"Managed Binary","n":"managed_binary","r":true,"t":"`$OBJECT`","key$":"managed_binary","index$":6},"platform":{"a":true,"h":"Platform","n":"platform","r":false,"t":"`$STRING`","key$":"platform","index$":7},"provider":{"a":true,"h":"Provider","n":"provider","r":false,"t":"`$STRING`","key$":"provider","index$":8},"setup_command":{"a":true,"h":"Setup Command","n":"setup_command","r":false,"t":"`$STRING`","key$":"setup_command","index$":9}},"name":"project_ios_app","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/ios_apps","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/ios_apps","q":{"exist":["organization_id","project_id"]},"r":{},"rb":{"alternatives":[{"fields":[{"binary":true,"name":"app"}],"kind":"multipart","media":"multipart/form-data"}],"kind":"json","media":"application/json"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"ios_apps"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"project_ios_app","name__orig":"project_ios_app","Name":"ProjectIosApp","name_":"project_ios_app","name-":"project-ios-app","NAME":"PROJECT_IOS_APP","index$":167}, {"active":true,"entity":"project_ios_app","key$":"BasicProjectIosAppFlow","kind":"basic","name":"BasicProjectIosAppFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"project_ios_app_ref01"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ProjectIosApp', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/ios_apps":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}},"multipart/form-data":{"schema":{"type":"object","required":["app"],"properties":{"app":{"type":"string","format":"binary"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"project_ios_app.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/ios_apps"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const project_ios_app_ref01_ent = client.ProjectIosApp()
    let project_ios_app_ref01_data = setup.data.new.project_ios_app['project_ios_app_ref01']
    project_ios_app_ref01_data['organization_id'] = setup.idmap['organization01']
    project_ios_app_ref01_data['project_id'] = setup.idmap['project01']

    project_ios_app_ref01_data = (await project_ios_app_ref01_ent.create(project_ios_app_ref01_data)).data()
    assert(null != project_ios_app_ref01_data)


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
      '../../../../.sdk/test/entity/project_ios_app/ProjectIosAppTestData.json')

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
    ['project_ios_app01','project_ios_app02','project_ios_app03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PROJECT_IOS_APP_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PROJECT_IOS_APP_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PROJECT_IOS_APP_ENTID']
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
  
