

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


describe('AgentAvatarEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentAvatar()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_avatar.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"agent_avatar","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["description","expected_generation","mode","pixel","style"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/avatar/generate","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":3}],"query":[{"a":true,"explode":true,"k":"query","n":"style_catalog","or":"style_catalog","r":false,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/avatar/generate","q":{"$action":"generate","exist":["agent_id","idempotency_key","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"avatar"},{"lit":"generate"}],"t":{"req":{"description":"`reqdata.description`","expected_generation":"`reqdata.expected_generation`","mode":"`reqdata.mode`","pixel":"`reqdata.pixel`","style":"`reqdata.style`"},"res":"`body`"},"index$":0},{"a":true,"bf":["expected_generation"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/avatar/retry","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":3}],"query":[{"a":true,"explode":true,"k":"query","n":"style_catalog","or":"style_catalog","r":false,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/avatar/retry","q":{"$action":"retry","exist":["agent_id","idempotency_key","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"avatar"},{"lit":"retry"}],"t":{"req":{"expected_generation":"`reqdata.expected_generation`"},"res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/avatar/configuration","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":3}],"query":[{"a":true,"explode":true,"k":"query","n":"style_catalog","or":"style_catalog","r":false,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/avatar/configuration","q":{"$action":"configuration","exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"avatar"},{"lit":"configuration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"agent_avatar","name__orig":"agent_avatar","Name":"AgentAvatar","name_":"agent_avatar","name-":"agent-avatar","NAME":"AGENT_AVATAR","index$":7}, {"active":true,"entity":"agent_avatar","key$":"BasicAgentAvatarFlow","kind":"basic","name":"BasicAgentAvatarFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"agent_avatar_ref01"},"m":{"agent_id":"agent01","organization_id":"organization01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"agent_avatar_ref01","srcdatavar":"agent_avatar_ref01_data","suffix":"_dt0"},"m":{"id":"agent_avatar01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_avatar_ref01"}}],"unreachable":true}]}, 'AgentAvatar', {"POST /api/v1/organizations/{organization_id}/agents/{id}/avatar/generate":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"expected_generation":{"type":"string","pattern":"^[0-9a-f]{64}$"},"mode":{"type":"string","enum":["edit","new"]},"style":{"type":"string","enum":["pixel","dither","chibi","anime","globby","emoji","animal","dino"],"x-ref":"#/components/schemas/PersistentAgentAvatarStyle"},"description":{"type":"string","maxLength":1200},"pixel":{"type":"object","properties":{"shape":{"type":"string","enum":["ball","blob","star","cloud","heart","gem","ghost","mushroom","cat","bunny","squircle","flower"]},"palette":{"type":"string","enum":["tangerine","periwinkle","pistachio","rosewater","lagoon","buttercup"]},"topping":{"type":"string","enum":["none","sprout","crown","antenna","horns"]}},"additionalProperties":false,"x-ref":"#/components/schemas/PersistentAgentPixelOptions"}},"required":["expected_generation","mode","style"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3},{"name":"style_catalog","in":"query","required":false,"description":"Set to 2 for separate Pixel and Dither choices","schema":{"type":"integer","const":2},"index$":4},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string","maxLength":128},"index$":5}]},"POST /api/v1/organizations/{organization_id}/agents/{id}/avatar/retry":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"expected_generation":{"type":"string","pattern":"^[0-9a-f]{64}$"}},"required":["expected_generation"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3},{"name":"style_catalog","in":"query","required":false,"description":"Set to 2 for separate Pixel and Dither choices","schema":{"type":"integer","const":2},"index$":4},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string","maxLength":128},"index$":5}]},"GET /api/v1/organizations/{organization_id}/agents/{id}/avatar/configuration":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":3},{"name":"style_catalog","in":"query","required":false,"description":"Set to 2 for separate Pixel and Dither choices","schema":{"type":"integer","const":2},"index$":4}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_avatar.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/avatar/generate"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_avatar_ref01_data = Object.values(setup.data.existing.agent_avatar)[0] as any

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
      '../../../../.sdk/test/entity/agent_avatar/AgentAvatarTestData.json')

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
    ['agent_avatar01','agent_avatar02','agent_avatar03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_AVATAR_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_AVATAR_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_AVATAR_ENTID']
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
  
