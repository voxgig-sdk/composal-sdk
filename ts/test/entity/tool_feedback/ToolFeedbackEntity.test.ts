

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


describe('ToolFeedbackEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ToolFeedback()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ToolFeedback().load({"id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tool_feedback.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"category":{"a":true,"h":"Category","n":"category","r":true,"t":"`$STRING`","key$":"category","index$":0},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":1},"details":{"a":true,"h":"Details","n":"details","r":true,"t":"`$STRING`","key$":"details","index$":2},"feedback":{"a":true,"h":"Feedback","n":"feedback","r":true,"t":"`$OBJECT`","key$":"feedback","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":4},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":true,"sh":"Caller-supplied session context; no secrets or transcripts","t":"`$OBJECT`","key$":"metadata","index$":5},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":6},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":7},"summary":{"a":true,"h":"Summary","n":"summary","r":true,"t":"`$STRING`","key$":"summary","index$":8},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"t":"`$STRING`","key$":"user_id","index$":9}},"id":{"field":"id","name":"id"},"name":"tool_feedback","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["feedback"],"co":{"id":"POST /api/v1/organizations/{organization_id}/tool_feedbacks","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/tool_feedbacks","q":{"exist":["idempotency_key","organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"tool_feedbacks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/tool_feedbacks/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/tool_feedbacks/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"tool_feedbacks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"tool_feedback","name__orig":"tool_feedback","Name":"ToolFeedback","name_":"tool_feedback","name-":"tool-feedback","NAME":"TOOL_FEEDBACK","index$":523}, {"active":true,"entity":"tool_feedback","key$":"BasicToolFeedbackFlow","kind":"basic","name":"BasicToolFeedbackFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"tool_feedback_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"tool_feedback_ref01","srcdatavar":"tool_feedback_ref01_data","suffix":"_dt0"},"m":{"id":"tool_feedback01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tool_feedback_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/tool_feedbacks/{id}","record":{"organization_id":"organization_id"}}]}, 'ToolFeedback', {"POST /api/v1/organizations/{organization_id}/tool_feedbacks":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["feedback"],"properties":{"feedback":{"type":"object","required":["source","summary","details"],"properties":{"category":{"type":"string","enum":["bug","feedback"],"default":"feedback"},"source":{"type":"string","enum":["cli","mcp","harness","android"]},"summary":{"type":"string","minLength":1,"maxLength":255},"details":{"type":"string","minLength":1,"maxLength":12000},"metadata":{"type":"object","additionalProperties":false,"description":"Caller-supplied session context; no secrets or transcripts","properties":{"session_id":{},"harness":{},"model":{},"client_version":{},"platform":{},"tool_name":{},"command":{},"run_id":{}},"x-ref":"#/components/schemas/ToolFeedbackMetadata"}},"x-ref":"#/components/schemas/ToolFeedbackInput","key$":"feedback"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string","minLength":1,"maxLength":128},"index$":1}]},"GET /api/v1/organizations/{organization_id}/tool_feedbacks/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"tool_feedback.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/tool_feedbacks","tool_feedback.load.1":"GET-only live run: reads a record only tool_feedback.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const tool_feedback_ref01_ent = client.ToolFeedback()
    let tool_feedback_ref01_data = setup.data.new.tool_feedback['tool_feedback_ref01']
    tool_feedback_ref01_data['organization_id'] = setup.idmap['organization01']

    tool_feedback_ref01_data = (await tool_feedback_ref01_ent.create(tool_feedback_ref01_data)).data()
    assert(null != tool_feedback_ref01_data.id)


    // LOAD
    const tool_feedback_ref01_match_dt0: any = {}
    tool_feedback_ref01_match_dt0.id = tool_feedback_ref01_data.id
    tool_feedback_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof tool_feedback_ref01_data['organization_id']) ?
      tool_feedback_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const tool_feedback_ref01_data_dt0 = (await tool_feedback_ref01_ent.load(tool_feedback_ref01_match_dt0)).data()
    assert(tool_feedback_ref01_data_dt0.id === tool_feedback_ref01_data.id)


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
      '../../../../.sdk/test/entity/tool_feedback/ToolFeedbackTestData.json')

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
    ['tool_feedback01','tool_feedback02','tool_feedback03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_TOOL_FEEDBACK_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_TOOL_FEEDBACK_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_TOOL_FEEDBACK_ENTID']
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
  
