

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


describe('DesktopLocalAgentResponseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DesktopLocalAgentResponse()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DesktopLocalAgentResponse().create({"organization_id":1,"input":"x","model":"x","store":true,"stream":true} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'desktop_local_agent_response.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"input":{"a":true,"h":"Input","n":"input","r":true,"t":"`$ARRAY`","key$":"input","index$":0},"max_output_tokens":{"a":true,"h":"Max Output Tokens","n":"max_output_tokens","r":false,"t":"`$INTEGER`","key$":"max_output_tokens","index$":1},"model":{"a":true,"h":"Model","n":"model","r":true,"t":"`$STRING`","key$":"model","index$":2},"store":{"a":true,"h":"Store","n":"store","r":true,"t":"`$BOOLEAN`","key$":"store","index$":3},"stream":{"a":true,"h":"Stream","n":"stream","r":true,"t":"`$BOOLEAN`","key$":"stream","index$":4}},"name":"desktop_local_agent_response","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["input","max_output_tokens","model","store","stream"],"co":{"id":"POST /api/v1/organizations/{organization_id}/desktop_local_agent/responses","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/desktop_local_agent/responses","q":{"exist":["organization_id"]},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"text/event-stream"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"desktop_local_agent"},{"lit":"responses"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"desktop_local_agent_response","name__orig":"desktop_local_agent_response","Name":"DesktopLocalAgentResponse","name_":"desktop_local_agent_response","name-":"desktop-local-agent-response","NAME":"DESKTOP_LOCAL_AGENT_RESPONSE","index$":209}, {"active":true,"entity":"desktop_local_agent_response","key$":"BasicDesktopLocalAgentResponseFlow","kind":"basic","name":"BasicDesktopLocalAgentResponseFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"desktop_local_agent_response_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'DesktopLocalAgentResponse', {"POST /api/v1/organizations/{organization_id}/desktop_local_agent/responses":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"A stateless OpenAI Responses request from the standalone Desktop Local gateway. At most 4 MiB.","additionalProperties":true,"required":["model","input","stream","store"],"properties":{"model":{"type":"string","enum":["gpt-6-luna","gpt-6.1-terra"],"key$":"model"},"input":{"type":"array","items":{"type":"object","additionalProperties":true},"key$":"input"},"stream":{"type":"boolean","enum":[true],"key$":"stream"},"store":{"type":"boolean","enum":[false],"key$":"store"},"max_output_tokens":{"type":"integer","minimum":1,"maximum":4096,"key$":"max_output_tokens"}},"x-ref":"#/components/schemas/DesktopLocalResponsesRequest"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"desktop_local_agent_response.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/desktop_local_agent/responses"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const desktop_local_agent_response_ref01_ent = client.DesktopLocalAgentResponse()
    let desktop_local_agent_response_ref01_data = setup.data.new.desktop_local_agent_response['desktop_local_agent_response_ref01']
    desktop_local_agent_response_ref01_data['organization_id'] = setup.idmap['organization01']

    desktop_local_agent_response_ref01_data = (await desktop_local_agent_response_ref01_ent.create(desktop_local_agent_response_ref01_data)).data()
    assert(null != desktop_local_agent_response_ref01_data)


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
      '../../../../.sdk/test/entity/desktop_local_agent_response/DesktopLocalAgentResponseTestData.json')

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
    ['desktop_local_agent_response01','desktop_local_agent_response02','desktop_local_agent_response03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DESKTOP_LOCAL_AGENT_RESPONSE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DESKTOP_LOCAL_AGENT_RESPONSE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DESKTOP_LOCAL_AGENT_RESPONSE_ENTID']
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
  
