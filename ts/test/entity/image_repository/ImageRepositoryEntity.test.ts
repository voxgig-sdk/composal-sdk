

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


describe('ImageRepositoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ImageRepository()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ImageRepository().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image_repository.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auth_configured":{"a":true,"h":"Auth Configured","n":"auth_configured","r":true,"t":"`$BOOLEAN`","key$":"auth_configured","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":2},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"hosted_app_id","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":5},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":6},"provider_kind":{"a":true,"h":"Provider Kind","n":"provider_kind","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"provider_kind","index$":7},"registry_auth_token":{"a":true,"h":"Registry Auth Token","n":"registry_auth_token","r":false,"t":"`$STRING`","key$":"registry_auth_token","index$":8},"repository_path":{"a":true,"h":"Repository Path","n":"repository_path","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"repository_path","index$":9},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":10},"status":{"a":true,"h":"Status","n":"status","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"status","index$":11},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":12},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":13},"visibility":{"a":true,"h":"Visibility","n":"visibility","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"visibility","index$":14}},"id":{"field":"id","name":"id"},"name":"image_repository","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["hosted_app_id","name","provider_kind","registry_auth_token","repository_path","slug","status","visibility"],"co":{"id":"POST /api/v1/organizations/{org_slug}/image_repositories","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/image_repositories","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"image_repositories"}],"t":{"req":"`reqdata`","res":"`body.image_repository`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/image_repositories","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/image_repositories","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"image_repositories"}],"t":{"req":"`reqdata`","res":"`body.image_repositories`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"image_repository","name__orig":"image_repository","Name":"ImageRepository","name_":"image_repository","name-":"image-repository","NAME":"IMAGE_REPOSITORY","index$":120}, {"active":true,"entity":"image_repository","key$":"BasicImageRepositoryFlow","kind":"basic","name":"BasicImageRepositoryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"image_repository_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"image_repository_ref01"}}],"index$":1}]}, 'ImageRepository', {"POST /api/v1/organizations/{org_slug}/image_repositories":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["slug","name"],"properties":{"hosted_app_id":{"type":"string","key$":"hosted_app_id"},"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"provider_kind":{"type":"string","enum":["oci","docker_registry"],"key$":"provider_kind"},"repository_path":{"type":"string","key$":"repository_path"},"visibility":{"type":"string","enum":["private","internal","public"],"key$":"visibility"},"status":{"type":"string","enum":["active","paused","archived"],"key$":"status"},"registry_auth_token":{"type":"string","key$":"registry_auth_token"}},"additionalProperties":true,"x-ref":"#/components/schemas/ImageRepositoryCreatePayload"}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{org_slug}/image_repositories":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"image_repository.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/image_repositories"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const image_repository_ref01_ent = client.ImageRepository()
    let image_repository_ref01_data = setup.data.new.image_repository['image_repository_ref01']
    image_repository_ref01_data['organization_id'] = setup.idmap['organization01']

    image_repository_ref01_data = (await image_repository_ref01_ent.create(image_repository_ref01_data)).data()
    assert(null != image_repository_ref01_data.id)


    // LIST
    const image_repository_ref01_match: any = {}
    image_repository_ref01_match['organization_id'] = setup.idmap['organization01']

    const image_repository_ref01_list = (await image_repository_ref01_ent.list(image_repository_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(image_repository_ref01_list, { id: image_repository_ref01_data.id })))


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
      '../../../../.sdk/test/entity/image_repository/ImageRepositoryTestData.json')

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
    ['image_repository01','image_repository02','image_repository03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_IMAGE_REPOSITORY_ENTID']
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
  
