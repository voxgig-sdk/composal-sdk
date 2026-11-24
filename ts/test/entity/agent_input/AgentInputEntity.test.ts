

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


describe('AgentInputEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentInput()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentInput().create({"agent_id":1,"organization_id":"x","browser_context":"x","client_time":"x","conversation_id":"x","text":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_input.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachment_ids":{"a":true,"h":"Attachment Ids","n":"attachment_ids","r":false,"sh":"Completed uploads from the attachments endpoint, in order.","t":"`$ARRAY`","key$":"attachment_ids","index$":0},"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"t":"`$ARRAY`","key$":"attachments","index$":1},"browser_context":{"a":true,"h":"Browser Context","n":"browser_context","r":true,"sh":"Advisory snapshot of the browser pane beside this conversation when the message was sent.","t":"`$OBJECT`","key$":"browser_context","index$":2},"client_time":{"a":true,"h":"Client Time","n":"client_time","r":true,"sh":"The sending app's IANA time zone and clock, so the agent answers in the person's local time.","t":"`$OBJECT`","key$":"client_time","index$":3},"conversation_id":{"a":true,"h":"Conversation Id","n":"conversation_id","r":true,"sh":"Main or a conversation identity returned by the agent thread list.","t":"`$STRING`","key$":"conversation_id","index$":4},"model_policy":{"a":true,"h":"Model Policy","n":"model_policy","r":false,"t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"model_policy","index$":5},"requester_membership_id":{"a":true,"h":"Requester Membership Id","n":"requester_membership_id","r":false,"sh":"Snapshot the membership supplied by conversation history for a NEW V1 input.","t":"`$STRING`","key$":"requester_membership_id","index$":6},"speed":{"a":true,"h":"Speed","n":"speed","r":false,"sh":"Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route.","t":"`$STRING`","key$":"speed","index$":7},"text":{"a":true,"h":"Text","n":"text","r":true,"t":"`$STRING`","key$":"text","index$":8}},"name":"agent_input","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["attachment_ids","attachments","browser_context","client_time","conversation_id","model_policy","requester_membership_id","speed","text"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/inputs","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"explode":false,"k":"header","n":"x_composal_input_delivery","or":"X-Composal-Input-Delivery","r":false,"style":"simple","t":"`$STRING`","index$":1},{"a":true,"explode":false,"k":"header","n":"x_composal_requester_id","or":"X-Composal-Requester-Id","r":false,"style":"simple","t":"`$STRING`","index$":2}],"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/inputs","q":{"exist":["agent_id","idempotency_key","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"inputs"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"agent_input","name__orig":"agent_input","Name":"AgentInput","name_":"agent_input","name-":"agent-input","NAME":"AGENT_INPUT","index$":22}, {"active":true,"entity":"agent_input","key$":"BasicAgentInputFlow","kind":"basic","name":"BasicAgentInputFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_input_ref01"},"m":{"agent_id":"agent01","organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'AgentInput', {"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/inputs":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["conversation_id","text"],"additionalProperties":true,"properties":{"conversation_id":{"type":"string","pattern":"^(?:[a-zA-Z0-9_-]{1,128}|native\\.[A-Za-z0-9_-]{1,512})$","description":"Main or a conversation identity returned by the agent thread list. Native aliases are scoped to the selected agent.","key$":"conversation_id"},"requester_membership_id":{"type":"string","minLength":1,"maxLength":200,"description":"Snapshot the membership supplied by conversation history for a NEW V1 input. Preserve the original body on retries; absent means legacy unbound input. V1 uses a separate native identity namespace and binds even if the rollout flag changes.","key$":"requester_membership_id"},"text":{"type":"string","maxLength":32768,"key$":"text"},"browser_context":{"type":"object","description":"Advisory snapshot of the browser pane beside this conversation when the message was sent.","required":["view","tabs"],"additionalProperties":false,"properties":{"view":{"type":"string","enum":["local","remote","desktop"]},"active_tab":{"type":"object","required":["location","title"],"additionalProperties":false,"properties":{"location":{},"title":{},"url":{},"target_id":{}},"x-ref":"#/components/schemas/ClawderBrowserContextTab"},"tabs":{"type":"array","maxItems":8,"items":{"type":"object","required":[],"additionalProperties":false,"properties":{},"x-ref":"#/components/schemas/ClawderBrowserContextTab"}}},"x-ref":"#/components/schemas/ClawderBrowserContext","key$":"browser_context"},"client_time":{"type":"object","additionalProperties":false,"required":["time_zone"],"description":"The sending app's IANA time zone and clock, so the agent answers in the person's local time. It is not part of the message, so a retry may send a newer value; the first admitted one is kept. An unknown zone is ignored, and a clock more than five minutes from the server's gives way to the server's.","properties":{"time_zone":{"type":"string","maxLength":64,"description":"IANA zone, such as Europe/London."},"at":{"type":"string","format":"date-time","description":"The app's current time with its UTC offset."}},"key$":"client_time"},"model_policy":{"oneOf":[{"type":"object","properties":{"mode":{}},"required":["mode"],"additionalProperties":false},{"type":"object","properties":{"provider":{},"model":{},"reasoning":{}},"required":["provider","model"],"additionalProperties":false}],"x-ref":"#/components/schemas/PersistentAgentSavedConfiguration/properties/model_policy","key$":"model_policy"},"speed":{"type":"string","enum":["regular","fast","ultrafast"],"description":"Fast uses OpenAI priority processing for GPT models (2x price) or the quickest approved OpenRouter route. Ultrafast uses OpenAI's fastest tier at the selected model's Ultrafast price.","key$":"speed"},"attachments":{"type":"array","maxItems":8,"items":{"type":"object","required":["fileName","mimeType","content"],"additionalProperties":false,"properties":{"fileName":{"type":"string","minLength":1,"maxLength":255},"mimeType":{"type":"string"},"content":{"type":"string","description":"Base64 bytes. Up to 4 MB per file and 8 MB total."}}},"key$":"attachments"},"attachment_ids":{"type":"array","minItems":1,"maxItems":20,"uniqueItems":true,"description":"Completed uploads from the attachments endpoint, in order. Use instead of attachments, not with it. Together they can total 2 GB.","items":{"type":"string"},"key$":"attachment_ids"}},"x-ref":"#/components/schemas/PersistentAgentClawderInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"X-Composal-Requester-Id","in":"header","description":"Fence a retained operation to its original authenticated user; never grants authority.","schema":{"type":"string","maxLength":200},"index$":2},{"name":"X-Composal-Input-Delivery","in":"header","description":"Advertise support for waiting delivery custody. Without this header, waiting retains the legacy retryable 503 contract; 202 always means native acknowledged.","schema":{"type":"string","enum":["durable"]},"index$":3},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string"},"index$":4}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_input.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/inputs"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_input_ref01_ent = client.AgentInput()
    let agent_input_ref01_data = setup.data.new.agent_input['agent_input_ref01']
    agent_input_ref01_data['agent_id'] = setup.idmap['agent01']
    agent_input_ref01_data['organization_id'] = setup.idmap['organization01']

    agent_input_ref01_data = (await agent_input_ref01_ent.create(agent_input_ref01_data)).data()
    assert(null != agent_input_ref01_data)


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
      '../../../../.sdk/test/entity/agent_input/AgentInputTestData.json')

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
    ['agent_input01','agent_input02','agent_input03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_INPUT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_INPUT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_INPUT_ENTID']
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
  
