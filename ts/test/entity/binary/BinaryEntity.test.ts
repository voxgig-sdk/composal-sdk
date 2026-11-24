

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


describe('BinaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Binary()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Binary().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'binary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accepts_versions":{"a":true,"h":"Accepts Versions","n":"accepts_versions","r":true,"t":"`$BOOLEAN`","key$":"accepts_versions","index$":0},"arch":{"a":true,"h":"Arch","n":"arch","r":false,"t":"`$ANY`","key$":"arch","index$":1},"archived_at":{"a":true,"h":"Archived At","n":"archived_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"archived_at","index$":2},"binary":{"a":true,"h":"Binary","n":"binary","r":true,"t":"`$OBJECT`","key$":"binary","index$":3},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":4},"download_secret":{"a":true,"h":"Download Secret","n":"download_secret","r":false,"t":"`$STRING`","key$":"download_secret","index$":5},"download_url":{"a":true,"h":"Download Url","n":"download_url","r":true,"t":"`$STRING`","key$":"download_url","index$":6},"executable":{"a":true,"h":"Executable","n":"executable","r":true,"t":"`$STRING`","key$":"executable","index$":7},"format":{"a":true,"h":"Format","n":"format","r":true,"t":"`$ANY`","key$":"format","index$":8},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":9},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":true,"t":"`$STRING`","key$":"idempotency_key","index$":10},"latest_version":{"a":true,"h":"Latest Version","n":"latest_version","r":true,"t":"`$ANY`","key$":"latest_version","index$":11},"launch_args":{"a":true,"h":"Launch Args","n":"launch_args","r":false,"t":"`$ARRAY`","key$":"launch_args","index$":12},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":13},"needs_refresh":{"a":true,"h":"Needs Refresh","n":"needs_refresh","r":true,"t":"`$BOOLEAN`","key$":"needs_refresh","index$":14},"operation":{"a":true,"h":"Operation","n":"operation","r":true,"t":"`$OBJECT`","key$":"operation","index$":15},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":3},"key$":"pagination","index$":16},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":17},"platform":{"a":true,"h":"Platform","n":"platform","r":false,"t":"`$ANY`","key$":"platform","index$":18},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"t":"`$STRING`","key$":"project_id","index$":19},"sha256":{"a":true,"h":"Sha256","n":"sha256","r":false,"t":"`$STRING`","key$":"sha256","index$":20},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":21},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$OBJECT`","key$":"version","index$":22},"version_defaults":{"a":true,"h":"Version Defaults","n":"version_defaults","r":false,"t":"`$ANY`","key$":"version_defaults","index$":23},"versions":{"a":true,"h":"Versions","n":"versions","r":true,"t":"`$ARRAY`","key$":"versions","index$":24},"window_title":{"a":true,"h":"Window Title","n":"window_title","r":true,"t":"`$STRING`","key$":"window_title","index$":25}},"id":{"field":"id","name":"id"},"name":"binary","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/binaries/{id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/binaries/{id}/archive","q":{"$action":"archive","exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["arch","download_secret","download_url","executable","format","idempotency_key","launch_args","name","platform","sha256","slug","window_title"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/binaries","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/binaries","q":{"exist":["organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/binaries","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/binaries","q":{"exist":["organization_id","project_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/binaries/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":true,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/binaries/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"binaries"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"binary","name__orig":"binary","Name":"Binary","name_":"binary","name-":"binary","NAME":"BINARY","index$":73}, {"active":true,"entity":"binary","key$":"BasicBinaryFlow","kind":"basic","name":"BasicBinaryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"binary_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"binary_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"binary_ref01","srcdatavar":"binary_ref01_data","suffix":"_dt0"},"m":{"id":"binary01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-binary_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{organization_id}/verify/binaries/{id}","record":{}}]}, 'Binary', {"POST /api/v1/organizations/{organization_id}/verify/binaries/{id}/archive":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/verify/binaries":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["slug","name","download_url","format","executable","window_title","idempotency_key"],"properties":{"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"download_url":{"type":"string","key$":"download_url"},"download_secret":{"type":"string","key$":"download_secret"},"sha256":{"type":"string","key$":"sha256"},"platform":{"const":"linux","key$":"platform"},"arch":{"const":"amd64","key$":"arch"},"format":{"enum":["deb","tar.gz"],"key$":"format"},"executable":{"type":"string","minLength":1,"maxLength":1000,"key$":"executable"},"launch_args":{"type":"array","maxItems":64,"items":{"type":"string","maxLength":1000},"key$":"launch_args"},"window_title":{"type":"string","minLength":1,"maxLength":200,"key$":"window_title"},"idempotency_key":{"type":"string","key$":"idempotency_key"}},"additionalProperties":true,"x-ref":"#/components/schemas/VerifyBinaryCreate"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verify/binaries":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":1},{"name":"page","in":"query","schema":{"type":"integer"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verify/binaries/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"project_id","in":"query","required":true,"schema":{"type":"string"},"index$":2},{"name":"page","in":"query","schema":{"type":"integer"},"index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"binary.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/binaries/{id}/archive"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const binary_ref01_ent = client.Binary()
    let binary_ref01_data = setup.data.new.binary['binary_ref01']
    binary_ref01_data['organization_id'] = setup.idmap['organization01']

    binary_ref01_data = (await binary_ref01_ent.create(binary_ref01_data)).data()
    assert(null != binary_ref01_data.id)


    // LIST
    const binary_ref01_match: any = {}
    binary_ref01_match['organization_id'] = setup.idmap['organization01']

    const binary_ref01_list = (await binary_ref01_ent.list(binary_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(binary_ref01_list, { id: binary_ref01_data.id })))


    // LOAD
    const binary_ref01_match_dt0: any = {}
    binary_ref01_match_dt0.id = binary_ref01_data.id
    binary_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const binary_ref01_data_dt0 = (await binary_ref01_ent.load(binary_ref01_match_dt0)).data()
    assert(binary_ref01_data_dt0.id === binary_ref01_data.id)


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
      '../../../../.sdk/test/entity/binary/BinaryTestData.json')

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
    ['binary01','binary02','binary03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_BINARY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_BINARY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_BINARY_ENTID']
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
  
