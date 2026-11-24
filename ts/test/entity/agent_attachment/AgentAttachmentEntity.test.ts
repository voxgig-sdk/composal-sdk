

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


describe('AgentAttachmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentAttachment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentAttachment().create({"agent_id":1,"organization_id":"x","byte_size":1,"content_type":"x","file_name":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_attachment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"byte_size":{"a":true,"h":"Byte Size","n":"byte_size","r":true,"t":"`$INTEGER`","key$":"byte_size","index$":0},"content_type":{"a":true,"h":"Content Type","n":"content_type","r":true,"t":"`$STRING`","key$":"content_type","index$":1},"file_name":{"a":true,"h":"File Name","n":"file_name","r":true,"t":"`$STRING`","key$":"file_name","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":3}},"id":{"field":"id","name":"id"},"name":"agent_attachment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"x_composal_requester_id","or":"X-Composal-Requester-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"attachment_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete","q":{"$action":"complete","exist":["agent_id","id","organization_id"]},"r":{"param":{"attachment_id":"id","id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"attachments"},{"var":"id"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["byte_size","content_type","file_name"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"x_composal_requester_id","or":"X-Composal-Requester-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/attachments","q":{"exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"attachments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"agent_attachment","name__orig":"agent_attachment","Name":"AgentAttachment","name_":"agent_attachment","name-":"agent-attachment","NAME":"AGENT_ATTACHMENT","index$":1}, {"active":true,"entity":"agent_attachment","key$":"BasicAgentAttachmentFlow","kind":"basic","name":"BasicAgentAttachmentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_attachment_ref01"},"m":{"agent_id":"agent01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'AgentAttachment', {"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"attachment_id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"X-Composal-Requester-Id","in":"header","description":"Fence a retained operation to its original authenticated user; never grants authority.","schema":{"type":"string","maxLength":200},"index$":3}]},"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["file_name","content_type","byte_size"],"additionalProperties":true,"properties":{"file_name":{"type":"string","minLength":1,"maxLength":255,"key$":"file_name"},"content_type":{"type":"string","maxLength":255,"key$":"content_type"},"byte_size":{"type":"integer","minimum":1,"key$":"byte_size"}},"x-ref":"#/components/schemas/SparkAttachmentUpload"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"X-Composal-Requester-Id","in":"header","description":"Fence a retained operation to its original authenticated user; never grants authority.","schema":{"type":"string","maxLength":200},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_attachment.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/attachments/{attachment_id}/complete"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_attachment_ref01_ent = client.AgentAttachment()
    let agent_attachment_ref01_data = setup.data.new.agent_attachment['agent_attachment_ref01']
    agent_attachment_ref01_data['agent_id'] = setup.idmap['agent01']
    agent_attachment_ref01_data['organization_id'] = setup.idmap['organization01']

    agent_attachment_ref01_data = (await agent_attachment_ref01_ent.create(agent_attachment_ref01_data)).data()
    assert(null != agent_attachment_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_attachment/AgentAttachmentTestData.json')

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
    ['agent_attachment01','agent_attachment02','agent_attachment03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_ATTACHMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_ATTACHMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_ATTACHMENT_ENTID']
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
  
