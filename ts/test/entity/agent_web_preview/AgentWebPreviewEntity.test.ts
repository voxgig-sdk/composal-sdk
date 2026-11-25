

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


describe('AgentWebPreviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentWebPreview()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentWebPreview().load({"asset":1,"token":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_web_preview.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":0},"icon_url":{"a":true,"fo":"uri","h":"Icon Url","n":"icon_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"icon_url","index$":1},"image_url":{"a":true,"fo":"uri","h":"Image Url","n":"image_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"image_url","index$":2},"title":{"a":true,"h":"Title","n":"title","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"title","index$":3}},"name":"agent_web_preview","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/agent_web_previews","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"asset","or":"asset","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"token","or":"token","r":true,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/agent_web_previews","q":{"exist":["token"]},"r":{},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"image/jpeg"},{"binary":true,"kind":"raw","media":"image/png"},{"binary":true,"kind":"raw","media":"image/vnd.microsoft.icon"},{"binary":true,"kind":"raw","media":"image/webp"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent_web_previews"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_web_preview","name__orig":"agent_web_preview","Name":"AgentWebPreview","name_":"agent_web_preview","name-":"agent-web-preview","NAME":"AGENT_WEB_PREVIEW","index$":62}, {"active":true,"entity":"agent_web_preview","key$":"BasicAgentWebPreviewFlow","kind":"basic","name":"BasicAgentWebPreviewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_web_preview_ref01","srcdatavar":"agent_web_preview_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_web_preview_ref01"}}],"index$":0}]}, 'AgentWebPreview', {"GET /api/v1/agent_web_previews":{"protocol":"http","parameters":[{"name":"token","in":"query","required":true,"schema":{"type":"string"},"description":"Expiring capability issued in an authorized agent transcript.","index$":0},{"name":"asset","in":"query","schema":{"type":"string","enum":["icon","image"]},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_web_preview_ref01_data = Object.values(setup.data.existing.agent_web_preview)[0] as any

    // LOAD
    const agent_web_preview_ref01_ent = client.AgentWebPreview()
    const agent_web_preview_ref01_match_dt0: any = {}
    const agent_web_preview_ref01_data_dt0 = (await agent_web_preview_ref01_ent.load(agent_web_preview_ref01_match_dt0)).data()
    assert(null != agent_web_preview_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/agent_web_preview/AgentWebPreviewTestData.json')

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
    ['agent_web_preview01','agent_web_preview02','agent_web_preview03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_WEB_PREVIEW_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_WEB_PREVIEW_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_WEB_PREVIEW_ENTID']
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
  
