

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


describe('ImageRepositoryTagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ImageRepositoryTag()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ImageRepositoryTag().list({"image_repository_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'image_repository_tag.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"image_repository":{"a":true,"h":"Image Repository","n":"image_repository","r":true,"t":"`$OBJECT`","key$":"image_repository","index$":0},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":1},"registry_url":{"a":true,"fo":"uri","h":"Registry Url","n":"registry_url","r":true,"t":"`$STRING`","key$":"registry_url","index$":2},"tags":{"a":true,"h":"Tags","n":"tags","r":true,"t":"`$ARRAY`","key$":"tags","index$":3}},"name":"image_repository_tag","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/artifacts/image_repositories/{id}/tags","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"image_repository_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/artifacts/image_repositories/{id}/tags","q":{"exist":["image_repository_id"]},"r":{"param":{"id":"image_repository_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"artifacts"},{"lit":"image_repositories"},{"var":"image_repository_id"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body.tags`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.image_repository"]]},"key$":"image_repository_tag","name__orig":"image_repository_tag","Name":"ImageRepositoryTag","name_":"image_repository_tag","name-":"image-repository-tag","NAME":"IMAGE_REPOSITORY_TAG","index$":280}, {"active":true,"entity":"image_repository_tag","key$":"BasicImageRepositoryTagFlow","kind":"basic","name":"BasicImageRepositoryTagFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"image_repository_id":"image_repository01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"image_repository_tag_ref01"}}],"index$":0}]}, 'ImageRepositoryTag', {"GET /api/v1/artifacts/image_repositories/{id}/tags":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let image_repository_tag_ref01_data = Object.values(setup.data.existing.image_repository_tag)[0] as any

    // LIST
    const image_repository_tag_ref01_ent = client.ImageRepositoryTag()
    const image_repository_tag_ref01_match: any = {}
    image_repository_tag_ref01_match['image_repository_id'] = setup.idmap['image_repository01']

    const image_repository_tag_ref01_list = (await image_repository_tag_ref01_ent.list(image_repository_tag_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/image_repository_tag/ImageRepositoryTagTestData.json')

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
    ['image_repository_tag01','image_repository_tag02','image_repository_tag03','image_repository01','image_repository02','image_repository03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_IMAGE_REPOSITORY_TAG_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_IMAGE_REPOSITORY_TAG_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_IMAGE_REPOSITORY_TAG_ENTID']
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
  
