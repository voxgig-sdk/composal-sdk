

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


describe('MessagingConversationMessageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.MessagingConversationMessage()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MessagingConversationMessage().create({"messaging_conversation_id":1,"organization_id":"x","project_id":"x","client_operation_id":"x","content":"x","media":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'messaging_conversation_message.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachment_limit":{"a":true,"h":"Attachment Limit","n":"attachment_limit","r":true,"t":"`$INTEGER`","key$":"attachment_limit","index$":0},"attachment_max_bytes":{"a":true,"h":"Attachment Max Bytes","n":"attachment_max_bytes","r":true,"t":"`$INTEGER`","key$":"attachment_max_bytes","index$":1},"client_operation_id":{"a":true,"h":"Client Operation Id","n":"client_operation_id","r":true,"t":"`$STRING`","key$":"client_operation_id","index$":2},"content":{"a":true,"h":"Content","n":"content","r":true,"t":"`$STRING`","key$":"content","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":4},"media":{"a":true,"h":"Media","n":"media","r":true,"t":"`$OBJECT`","key$":"media","index$":5},"media_upload_ids":{"a":true,"h":"Media Upload Ids","n":"media_upload_ids","r":false,"sh":"Ordered staged upload IDs; six on Photon, one on Sendblue.","t":"`$ARRAY`","key$":"media_upload_ids","index$":6},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"t":"`$ARRAY`","key$":"messages","index$":7},"reply_to":{"a":true,"h":"Reply To","n":"reply_to","r":false,"sh":"Public ID of a visible message","t":"`$STRING`","key$":"reply_to","index$":8},"retry_attachment":{"a":true,"h":"Retry Attachment","n":"retry_attachment","r":false,"sh":"Retry an already recorded attachment when its file bytes are no longer on this page.","t":"`$BOOLEAN`","key$":"retry_attachment","index$":9},"send_blocked_reason":{"a":true,"h":"Send Blocked Reason","n":"send_blocked_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"send_blocked_reason","index$":10},"send_disposition":{"a":true,"h":"Send Disposition","n":"send_disposition","r":false,"t":"`$STRING`","key$":"send_disposition","index$":11},"send_error":{"a":true,"h":"Send Error","n":"send_error","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"send_error","index$":12},"send_style":{"a":true,"h":"Send Style","n":"send_style","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"send_style","index$":13}},"id":{"field":"id","name":"id"},"name":"messaging_conversation_message","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["reaction"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"message_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"messaging_conversation_id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction","q":{"$action":"reaction","exist":["id","messaging_conversation_id","organization_id","project_id"]},"r":{"param":{"id":"messaging_conversation_id","message_id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"messaging_conversations"},{"var":"messaging_conversation_id"},{"lit":"messages"},{"var":"id"},{"lit":"reaction"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["client_operation_id","content","media","media_upload_ids","reply_to","retry_attachment","send_style"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"messaging_conversation_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages","q":{"exist":["messaging_conversation_id","organization_id","project_id"]},"r":{"param":{"id":"messaging_conversation_id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"messaging_conversations"},{"var":"messaging_conversation_id"},{"lit":"messages"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"messaging_conversation_message","name__orig":"messaging_conversation_message","Name":"MessagingConversationMessage","name_":"messaging_conversation_message","name-":"messaging-conversation-message","NAME":"MESSAGING_CONVERSATION_MESSAGE","index$":315}, {"active":true,"entity":"messaging_conversation_message","key$":"BasicMessagingConversationMessageFlow","kind":"basic","name":"BasicMessagingConversationMessageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"messaging_conversation_message_ref01"},"m":{"messaging_conversation_id":"messaging_conversation01","organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'MessagingConversationMessage', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["reaction"],"properties":{"reaction":{"type":"string"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"message_id","in":"path","required":true,"schema":{"type":"string"},"index$":3}]},"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["client_operation_id","content"],"properties":{"client_operation_id":{"type":"string","key$":"client_operation_id"},"content":{"type":"string","key$":"content"},"media":{"type":"object","required":["name","content_type","data"],"properties":{"name":{"type":"string"},"content_type":{"type":"string"},"data":{"type":"string","description":"Base64 encoded file, maximum 10 MB decoded"}},"x-ref":"#/components/schemas/VerifyMessagingMediaInput","key$":"media"},"media_upload_ids":{"type":"array","maxItems":6,"items":{"type":"string"},"description":"Ordered staged upload IDs; six on Photon, one on Sendblue. Mutually exclusive with media.","key$":"media_upload_ids"},"retry_attachment":{"type":"boolean","description":"Retry an already recorded attachment when its file bytes are no longer on this page.","key$":"retry_attachment"},"reply_to":{"type":"string","description":"Public ID of a visible message","key$":"reply_to"},"send_style":{"type":["string","null"],"enum":["celebration","shooting_star","fireworks","lasers","love","confetti","balloons","spotlight","echo","invisible","gentle","loud","slam",null],"key$":"send_style"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"messaging_conversation_message.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/messages/{message_id}/reaction"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const messaging_conversation_message_ref01_ent = client.MessagingConversationMessage()
    let messaging_conversation_message_ref01_data = setup.data.new.messaging_conversation_message['messaging_conversation_message_ref01']
    messaging_conversation_message_ref01_data['messaging_conversation_id'] = setup.idmap['messaging_conversation01']
    messaging_conversation_message_ref01_data['organization_id'] = setup.idmap['organization01']
    messaging_conversation_message_ref01_data['project_id'] = setup.idmap['project01']

    messaging_conversation_message_ref01_data = (await messaging_conversation_message_ref01_ent.create(messaging_conversation_message_ref01_data)).data()
    assert(null != messaging_conversation_message_ref01_data.id)


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
      '../../../../.sdk/test/entity/messaging_conversation_message/MessagingConversationMessageTestData.json')

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
    ['messaging_conversation_message01','messaging_conversation_message02','messaging_conversation_message03','organization01','organization02','organization03','project01','project02','project03','messaging_conversation01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_MESSAGING_CONVERSATION_MESSAGE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_MESSAGING_CONVERSATION_MESSAGE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_MESSAGING_CONVERSATION_MESSAGE_ENTID']
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
  
