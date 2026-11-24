

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


describe('BinaryVersionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.BinaryVersion()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BinaryVersion().list({"binary_id":1,"organization_id":"x","project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'binary_version.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"arch":{"a":true,"h":"Arch","n":"arch","r":false,"t":"`$ANY`","key$":"arch","index$":0},"cancelable":{"a":true,"h":"Cancelable","n":"cancelable","r":true,"t":"`$BOOLEAN`","key$":"cancelable","index$":1},"configuration":{"a":true,"h":"Configuration","n":"configuration","r":true,"t":"`$OBJECT`","key$":"configuration","index$":2},"configuration_digest":{"a":true,"h":"Configuration Digest","n":"configuration_digest","r":true,"t":"`$STRING`","key$":"configuration_digest","index$":3},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":4},"deletable":{"a":true,"h":"Deletable","n":"deletable","r":true,"t":"`$BOOLEAN`","key$":"deletable","index$":5},"download_secret":{"a":true,"h":"Download Secret","n":"download_secret","r":false,"t":"`$STRING`","key$":"download_secret","index$":6},"download_url":{"a":true,"h":"Download Url","n":"download_url","r":true,"t":"`$STRING`","key$":"download_url","index$":7},"environment_uses":{"a":true,"h":"Environment Uses","n":"environment_uses","r":true,"t":"`$ARRAY`","key$":"environment_uses","index$":8},"executable":{"a":true,"h":"Executable","n":"executable","r":false,"t":"`$STRING`","key$":"executable","index$":9},"format":{"a":true,"h":"Format","n":"format","r":false,"t":"`$ANY`","key$":"format","index$":10},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":11},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":true,"t":"`$STRING`","key$":"idempotency_key","index$":12},"launch_args":{"a":true,"h":"Launch Args","n":"launch_args","r":false,"t":"`$ARRAY`","key$":"launch_args","index$":13},"operation":{"a":true,"h":"Operation","n":"operation","r":true,"t":"`$OBJECT`","key$":"operation","index$":14},"package_sha256":{"a":true,"h":"Package Sha256","n":"package_sha256","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"package_sha256","index$":15},"package_size":{"a":true,"h":"Package Size","n":"package_size","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"package_size","index$":16},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":17},"platform":{"a":true,"h":"Platform","n":"platform","r":false,"t":"`$ANY`","key$":"platform","index$":18},"preparations":{"a":true,"h":"Preparations","n":"preparations","r":true,"t":"`$ARRAY`","key$":"preparations","index$":19},"retryable":{"a":true,"h":"Retryable","n":"retryable","r":true,"t":"`$BOOLEAN`","key$":"retryable","index$":20},"sha256":{"a":true,"h":"Sha256","n":"sha256","r":false,"t":"`$STRING`","key$":"sha256","index$":21},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":22},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$OBJECT`","key$":"version","index$":23},"window_title":{"a":true,"h":"Window Title","n":"window_title","r":false,"t":"`$STRING`","key$":"window_title","index$":24}},"id":{"field":"id","name":"id"},"name":"binary_version","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"binary_id","or":"binary_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel","q":{"$action":"cancel","exist":["binary_id","id","organization_id","project_id"]},"r":{"param":{"binary_id":"binary_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"binary_id"},{"lit":"versions"},{"var":"id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/retry","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"binary_id","or":"binary_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/retry","q":{"$action":"retry","exist":["binary_id","id","organization_id","project_id"]},"r":{"param":{"binary_id":"binary_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"binary_id"},{"lit":"versions"},{"var":"id"},{"lit":"retry"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["arch","download_secret","download_url","executable","format","idempotency_key","launch_args","platform","sha256","window_title"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"binary_id","or":"binary_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions","q":{"exist":["binary_id","organization_id","project_id"]},"r":{"param":{"binary_id":"binary_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"binary_id"},{"lit":"versions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"binary_id","or":"binary_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions","q":{"exist":["binary_id","organization_id","project_id"]},"r":{"param":{"binary_id":"binary_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"binary_id"},{"lit":"versions"}],"t":{"page":{"next":"`body.pagination.next`","total":"`body.pagination.count`"},"req":"`reqdata`","res":"`body.versions`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"binary_id","or":"binary_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}","q":{"exist":["binary_id","id","organization_id","project_id"]},"r":{"param":{"binary_id":"binary_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"binary_id"},{"lit":"versions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"binary_id","or":"binary_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}","q":{"exist":["binary_id","id","organization_id","project_id"]},"r":{"param":{"binary_id":"binary_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"binary_id"},{"lit":"versions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.binary"]]},"key$":"binary_version","name__orig":"binary_version","Name":"BinaryVersion","name_":"binary_version","name-":"binary-version","NAME":"BINARY_VERSION","index$":74}, {"active":true,"entity":"binary_version","key$":"BasicBinaryVersionFlow","kind":"basic","name":"BasicBinaryVersionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"binary_version_ref01"},"m":{"binary_id":"binary01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"binary_id":"binary01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"binary_version_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"binary_version_ref01","srcdatavar":"binary_version_ref01_data","suffix":"_dt0"},"m":{"binary_id":"binary01","id":"binary_version01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-binary_version_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"binary_version_ref01","suffix":"_rm0"},"m":{"binary_id":"binary01","id":"binary_version01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"binary_id":"binary01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"binary_version_ref01"}}],"index$":4}]}, 'BinaryVersion', {"POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"binary_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/retry":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"binary_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["download_url","idempotency_key"],"properties":{"download_url":{"type":"string","key$":"download_url"},"download_secret":{"type":"string","key$":"download_secret"},"sha256":{"type":"string","key$":"sha256"},"platform":{"const":"linux","key$":"platform"},"arch":{"const":"amd64","key$":"arch"},"format":{"enum":["deb","tar.gz"],"key$":"format"},"executable":{"type":"string","minLength":1,"maxLength":1000,"key$":"executable"},"launch_args":{"type":"array","maxItems":64,"items":{"type":"string","maxLength":1000},"key$":"launch_args"},"window_title":{"type":"string","minLength":1,"maxLength":200,"key$":"window_title"},"idempotency_key":{"type":"string","key$":"idempotency_key"}},"additionalProperties":true,"x-ref":"#/components/schemas/VerifyBinaryVersionCreate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"binary_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"binary_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":2},{"name":"page","in":"query","schema":{"type":"integer"},"index$":3}]},"GET /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"binary_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":3}]},"DELETE /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"binary_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"binary_version.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}/cancel","binary_version.remove.3":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verify/binaries/{binary_id}/versions/{id}","binary_version.list.4":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const binary_version_ref01_ent = client.BinaryVersion()
    let binary_version_ref01_data = setup.data.new.binary_version['binary_version_ref01']
    binary_version_ref01_data['binary_id'] = setup.idmap['binary01']
    binary_version_ref01_data['organization_id'] = setup.idmap['organization01']

    binary_version_ref01_data = (await binary_version_ref01_ent.create(binary_version_ref01_data)).data()
    assert(null != binary_version_ref01_data.id)


    // LIST
    const binary_version_ref01_match: any = {}
    binary_version_ref01_match['binary_id'] = setup.idmap['binary01']
    binary_version_ref01_match['organization_id'] = setup.idmap['organization01']

    const binary_version_ref01_list = (await binary_version_ref01_ent.list(binary_version_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(binary_version_ref01_list, { id: binary_version_ref01_data.id })))


    // LOAD
    const binary_version_ref01_match_dt0: any = {}
    binary_version_ref01_match_dt0.id = binary_version_ref01_data.id
    binary_version_ref01_match_dt0['binary_id'] = setup.idmap['binary_id'] ?? setup.idmap['binary01']
    binary_version_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const binary_version_ref01_data_dt0 = (await binary_version_ref01_ent.load(binary_version_ref01_match_dt0)).data()
    assert(binary_version_ref01_data_dt0.id === binary_version_ref01_data.id)


    // REMOVE
    const binary_version_ref01_match_rm0: any = { id: binary_version_ref01_data.id }
    binary_version_ref01_match_rm0['binary_id'] = setup.idmap['binary_id'] ?? setup.idmap['binary01']
    binary_version_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await binary_version_ref01_ent.remove(binary_version_ref01_match_rm0)
  

    // LIST
    const binary_version_ref01_match_rt0: any = {}
    binary_version_ref01_match_rt0['binary_id'] = setup.idmap['binary01']
    binary_version_ref01_match_rt0['organization_id'] = setup.idmap['organization01']

    const binary_version_ref01_list_rt0 = (await binary_version_ref01_ent.list(binary_version_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(binary_version_ref01_list_rt0, { id: binary_version_ref01_data.id })))


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
      '../../../../.sdk/test/entity/binary_version/BinaryVersionTestData.json')

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
    ['binary_version01','binary_version02','binary_version03','organization01','organization02','organization03','binary01','binary02','binary03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BINARY_VERSION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BINARY_VERSION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BINARY_VERSION_ENTID']
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
  
