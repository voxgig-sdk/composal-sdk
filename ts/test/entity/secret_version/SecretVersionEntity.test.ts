

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


describe('SecretVersionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.SecretVersion()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SecretVersion().load({"id":1,"organization_id":"x","secret_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'secret_version.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"secret_version","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"secret_id","or":"secret_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact","q":{"$action":"redact","exist":["id","organization_id","secret_id"]},"r":{"param":{"id":"id","organization_id":"organization_id","secret_id":"secret_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"secret_id"},{"lit":"versions"},{"var":"id"},{"lit":"redact"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/revoke","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"secret_id","or":"secret_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/revoke","q":{"$action":"revoke","exist":["id","organization_id","secret_id"]},"r":{"param":{"id":"id","organization_id":"organization_id","secret_id":"secret_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"secret_id"},{"lit":"versions"},{"var":"id"},{"lit":"revoke"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"secret_id","or":"secret_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions","q":{"exist":["organization_id","secret_id"]},"r":{"param":{"organization_id":"organization_id","secret_id":"secret_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"secret_id"},{"lit":"versions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"secret_id","or":"secret_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","q":{"exist":["id","organization_id","secret_id"]},"r":{"param":{"id":"id","organization_id":"organization_id","secret_id":"secret_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"secret_id"},{"lit":"versions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"secret_id","or":"secret_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions","q":{"exist":["organization_id","secret_id"]},"r":{"param":{"organization_id":"organization_id","secret_id":"secret_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"secret_id"},{"lit":"versions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"secret_id","or":"secret_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","q":{"exist":["id","organization_id","secret_id"]},"r":{"param":{"id":"id","organization_id":"organization_id","secret_id":"secret_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"secret_id"},{"lit":"versions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"secret_id","or":"secret_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","q":{"exist":["id","organization_id","secret_id"]},"r":{"param":{"id":"id","organization_id":"organization_id","secret_id":"secret_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"secret_id"},{"lit":"versions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"secret_id","or":"secret_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","q":{"exist":["id","organization_id","secret_id"]},"r":{"param":{"id":"id","organization_id":"organization_id","secret_id":"secret_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"secret_id"},{"lit":"versions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"secret_version","name__orig":"secret_version","Name":"SecretVersion","name_":"secret_version","name-":"secret-version","NAME":"SECRET_VERSION","index$":465}, {"active":true,"entity":"secret_version","key$":"BasicSecretVersionFlow","kind":"basic","name":"BasicSecretVersionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"secret_version_ref01"},"m":{"organization_id":"organization01","secret_id":"secret01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"organization_id":"organization01","secret_id":"secret01"},"i":{"ref":"secret_version_ref01","srcdatavar":"secret_version_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-secret_version_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"secret_version_ref01","srcdatavar":"secret_version_ref01_data","suffix":"_dt0"},"m":{"id":"secret_version01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-secret_version_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"secret_version_ref01","suffix":"_rm0"},"m":{"id":"secret_version01","organization_id":"organization01","secret_id":"secret01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'SecretVersion', {"POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"secret_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/revoke":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"secret_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"secret_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"secret_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"secret_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"secret_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"secret_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"secret_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"secret_version.create.0":"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}/redact","secret_version.update.1":"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}","secret_version.load.2":"GET-only live run: reads a record only secret_version.create.0 gives","secret_version.remove.3":"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/secrets/{secret_id}/versions/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const secret_version_ref01_ent = client.SecretVersion()
    let secret_version_ref01_data = setup.data.new.secret_version['secret_version_ref01']
    secret_version_ref01_data['organization_id'] = setup.idmap['organization01']
    secret_version_ref01_data['secret_id'] = setup.idmap['secret01']

    secret_version_ref01_data = (await secret_version_ref01_ent.create(secret_version_ref01_data)).data()
    assert(null != secret_version_ref01_data.id)


    // UPDATE
    const secret_version_ref01_data_up0: any = {}
    secret_version_ref01_data_up0.id = secret_version_ref01_data.id
    secret_version_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    secret_version_ref01_data_up0['secret_id'] = setup.idmap['secret_id'] ?? setup.idmap['secret01']

    const secret_version_ref01_resdata_up0 = (await secret_version_ref01_ent.update(secret_version_ref01_data_up0)).data()
    assert(secret_version_ref01_resdata_up0.id === secret_version_ref01_data_up0.id)


    // LOAD
    const secret_version_ref01_match_dt0: any = {}
    secret_version_ref01_match_dt0.id = secret_version_ref01_data.id
    secret_version_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const secret_version_ref01_data_dt0 = (await secret_version_ref01_ent.load(secret_version_ref01_match_dt0)).data()
    assert(secret_version_ref01_data_dt0.id === secret_version_ref01_data.id)


    // REMOVE
    const secret_version_ref01_match_rm0: any = { id: secret_version_ref01_data.id }
    secret_version_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    secret_version_ref01_match_rm0['secret_id'] = setup.idmap['secret_id'] ?? setup.idmap['secret01']
    await secret_version_ref01_ent.remove(secret_version_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/secret_version/SecretVersionTestData.json')

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
    ['secret_version01','secret_version02','secret_version03','organization01','organization02','organization03','secret01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SECRET_VERSION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SECRET_VERSION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SECRET_VERSION_ENTID']
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
  
