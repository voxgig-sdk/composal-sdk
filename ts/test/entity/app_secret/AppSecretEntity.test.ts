

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


describe('AppSecretEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppSecret()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppSecret().list({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_secret.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":1},"env_key":{"a":true,"h":"Env Key","n":"env_key","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"env_key","index$":2},"expose_to_build":{"a":true,"h":"Expose To Build","n":"expose_to_build","r":false,"t":"`$BOOLEAN`","key$":"expose_to_build","index$":3},"has_value":{"a":true,"h":"Has Value","n":"has_value","r":false,"t":"`$BOOLEAN`","key$":"has_value","index$":4},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":"`$STRING`","key$":"hosted_app_id","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":6},"latest_version_number":{"a":true,"h":"Latest Version Number","n":"latest_version_number","r":false,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"latest_version_number","index$":7},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":8},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":9},"rotation_policy":{"a":true,"h":"Rotation Policy","n":"rotation_policy","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rotation_policy","index$":10},"scope_kind":{"a":true,"h":"Scope Kind","n":"scope_kind","r":true,"t":"`$STRING`","key$":"scope_kind","index$":11},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":12},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"t":"`$STRING`","key$":"updated_at","index$":14},"value":{"a":true,"h":"Value","n":"value","r":false,"t":"`$STRING`","wo":true,"key$":"value","index$":15},"value_digest":{"a":true,"h":"Value Digest","n":"value_digest","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"value_digest","index$":16},"value_kind":{"a":true,"h":"Value Kind","n":"value_kind","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"value_kind","index$":17}},"id":{"field":"id","name":"id"},"name":"app_secret","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["value","value_kind"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/secrets/{id}/set_value","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/secrets/{id}/set_value","q":{"$action":"set_value","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"},{"var":"id"},{"lit":"set_value"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["description","env_key","expose_to_build","name","rotation_policy","slug","value","value_kind"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/secrets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/secrets","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["dotenv","dry_run","prune"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/secrets/bulk","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/secrets/bulk","q":{"$action":"bulk","exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"},{"lit":"bulk"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/secrets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/secrets","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"}],"t":{"req":"`reqdata`","res":"`body.secrets`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/secrets/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/secrets/{id}/value","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/secrets/{id}/value","q":{"$action":"value","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"},{"var":"id"},{"lit":"value"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/secrets/dotenv","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"environment","or":"environment","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"service","or":"service","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/secrets/dotenv","q":{"$action":"dotenv","exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"alternatives":[{"kind":"raw","media":"text/plain"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"},{"lit":"dotenv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["description","env_key","expose_to_build","name","rotation_policy"],"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/secrets/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/secrets/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["description","env_key","expose_to_build","name","rotation_policy"],"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/secrets/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"app_secret","name__orig":"app_secret","Name":"AppSecret","name_":"app_secret","name-":"app-secret","NAME":"APP_SECRET","index$":65}, {"active":true,"entity":"app_secret","key$":"BasicAppSecretFlow","kind":"basic","name":"BasicAppSecretFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_secret_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"app_secret_ref01"}}],"index$":1},{"a":true,"d":{"app_id":"app01"},"i":{"ref":"app_secret_ref01","srcdatavar":"app_secret_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_secret_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"app_secret_ref01","srcdatavar":"app_secret_ref01_data","suffix":"_dt0"},"m":{"id":"app_secret01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_secret_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"app_secret_ref01","suffix":"_rm0"},"m":{"app_id":"app01","id":"app_secret01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"app_secret_ref01"}}],"index$":5}]}, 'AppSecret', {"POST /api/v1/hosting/apps/{app_id}/secrets/{id}/set_value":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["value"],"properties":{"value":{"type":"string","writeOnly":true},"value_kind":{"type":"string"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/secrets":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["slug","name"],"properties":{"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"env_key":{"type":"string","nullable":true,"key$":"env_key"},"description":{"type":"string","nullable":true,"key$":"description"},"rotation_policy":{"type":"string","nullable":true,"key$":"rotation_policy"},"expose_to_build":{"type":"boolean","key$":"expose_to_build"},"value":{"type":"string","writeOnly":true,"key$":"value"},"value_kind":{"type":"string","key$":"value_kind"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/hosting/apps/{app_id}/secrets/bulk":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["dotenv"],"properties":{"dotenv":{"type":"string"},"dry_run":{"type":"boolean","default":false},"prune":{"type":"boolean","default":false}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/secrets":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/secrets/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/secrets/{id}/value":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/secrets/dotenv":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"environment","in":"query","schema":{"type":"string"},"description":"Environment id, slug or name belonging to the app.","index$":1},{"name":"service","in":"query","schema":{"type":"string"},"description":"Optional service id, slug or name. Requires an environment; applies service-specific preview overrides.","index$":2}]},"PATCH /api/v1/hosting/apps/{app_id}/secrets/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"name":{"type":"string","key$":"name"},"env_key":{"type":"string","nullable":true,"key$":"env_key"},"description":{"type":"string","nullable":true,"key$":"description"},"rotation_policy":{"type":"string","nullable":true,"key$":"rotation_policy"},"expose_to_build":{"type":"boolean","key$":"expose_to_build"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/secrets/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/hosting/apps/{app_id}/secrets/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"name":{"type":"string","key$":"name"},"env_key":{"type":"string","nullable":true,"key$":"env_key"},"description":{"type":"string","nullable":true,"key$":"description"},"rotation_policy":{"type":"string","nullable":true,"key$":"rotation_policy"},"expose_to_build":{"type":"boolean","key$":"expose_to_build"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_secret.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/secrets/{id}/set_value","app_secret.update.2":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/secrets/{id}","app_secret.remove.4":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/secrets/{id}","app_secret.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_secret_ref01_ent = client.AppSecret()
    let app_secret_ref01_data = setup.data.new.app_secret['app_secret_ref01']
    app_secret_ref01_data['app_id'] = setup.idmap['app01']

    app_secret_ref01_data = (await app_secret_ref01_ent.create(app_secret_ref01_data)).data()
    assert(null != app_secret_ref01_data.id)


    // LIST
    const app_secret_ref01_match: any = {}
    app_secret_ref01_match['app_id'] = setup.idmap['app01']

    const app_secret_ref01_list = (await app_secret_ref01_ent.list(app_secret_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(app_secret_ref01_list, { id: app_secret_ref01_data.id })))


    // UPDATE
    const app_secret_ref01_data_up0: any = {}
    app_secret_ref01_data_up0.id = app_secret_ref01_data.id
    app_secret_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']

    const app_secret_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-app_secret_ref01_' + setup.now }
    ;(app_secret_ref01_data_up0 as any)[app_secret_ref01_markdef_up0.name] = app_secret_ref01_markdef_up0.value

    const app_secret_ref01_resdata_up0 = (await app_secret_ref01_ent.update(app_secret_ref01_data_up0)).data()
    assert(app_secret_ref01_resdata_up0.id === app_secret_ref01_data_up0.id)

    assert((app_secret_ref01_resdata_up0 as any)[app_secret_ref01_markdef_up0.name] === app_secret_ref01_markdef_up0.value)


    // LOAD
    const app_secret_ref01_match_dt0: any = {}
    app_secret_ref01_match_dt0.id = app_secret_ref01_data.id
    const app_secret_ref01_data_dt0 = (await app_secret_ref01_ent.load(app_secret_ref01_match_dt0)).data()
    assert(app_secret_ref01_data_dt0.id === app_secret_ref01_data.id)


    // REMOVE
    const app_secret_ref01_match_rm0: any = { id: app_secret_ref01_data.id }
    app_secret_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    await app_secret_ref01_ent.remove(app_secret_ref01_match_rm0)
  

    // LIST
    const app_secret_ref01_match_rt0: any = {}
    app_secret_ref01_match_rt0['app_id'] = setup.idmap['app01']

    const app_secret_ref01_list_rt0 = (await app_secret_ref01_ent.list(app_secret_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(app_secret_ref01_list_rt0, { id: app_secret_ref01_data.id })))


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
      '../../../../.sdk/test/entity/app_secret/AppSecretTestData.json')

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
    ['app_secret01','app_secret02','app_secret03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_SECRET_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_SECRET_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_SECRET_ENTID']
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
  
