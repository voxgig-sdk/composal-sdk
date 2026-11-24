

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


describe('MessagingConversationUploadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.MessagingConversationUpload()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MessagingConversationUpload().create({"messaging_conversation_id":1,"organization_id":"x","project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'messaging_conversation_upload.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachment":{"a":true,"h":"Attachment","n":"attachment","r":true,"t":"`$OBJECT`","key$":"attachment","index$":0},"upload_id":{"a":true,"h":"Upload Id","n":"upload_id","r":true,"t":"`$STRING`","key$":"upload_id","index$":1}},"name":"messaging_conversation_upload","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"messaging_conversation_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads","q":{"exist":["messaging_conversation_id","organization_id","project_id"]},"r":{"param":{"id":"messaging_conversation_id","project_id":"project_id"}},"rb":{"alternatives":[{"fields":[{"binary":true,"name":"file"}],"kind":"multipart","media":"multipart/form-data"}],"kind":"json","media":"application/json"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"messaging_conversations"},{"var":"messaging_conversation_id"},{"lit":"uploads"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"messaging_conversation_upload","name__orig":"messaging_conversation_upload","Name":"MessagingConversationUpload","name_":"messaging_conversation_upload","name-":"messaging-conversation-upload","NAME":"MESSAGING_CONVERSATION_UPLOAD","index$":137}, {"active":true,"entity":"messaging_conversation_upload","key$":"BasicMessagingConversationUploadFlow","kind":"basic","name":"BasicMessagingConversationUploadFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"messaging_conversation_upload_ref01"},"m":{"messaging_conversation_id":"messaging_conversation01","organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0}]}, 'MessagingConversationUpload', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}},"multipart/form-data":{"schema":{"type":"object","required":["file"],"properties":{"file":{"type":"string","format":"binary"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"messaging_conversation_upload.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/messaging_conversations/{id}/uploads"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const messaging_conversation_upload_ref01_ent = client.MessagingConversationUpload()
    let messaging_conversation_upload_ref01_data = setup.data.new.messaging_conversation_upload['messaging_conversation_upload_ref01']
    messaging_conversation_upload_ref01_data['messaging_conversation_id'] = setup.idmap['messaging_conversation01']
    messaging_conversation_upload_ref01_data['organization_id'] = setup.idmap['organization01']
    messaging_conversation_upload_ref01_data['project_id'] = setup.idmap['project01']

    messaging_conversation_upload_ref01_data = (await messaging_conversation_upload_ref01_ent.create(messaging_conversation_upload_ref01_data)).data()
    assert(null != messaging_conversation_upload_ref01_data)


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
      '../../../../.sdk/test/entity/messaging_conversation_upload/MessagingConversationUploadTestData.json')

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
    ['messaging_conversation_upload01','messaging_conversation_upload02','messaging_conversation_upload03','organization01','organization02','organization03','project01','project02','project03','messaging_conversation01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_MESSAGING_CONVERSATION_UPLOAD_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_MESSAGING_CONVERSATION_UPLOAD_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_MESSAGING_CONVERSATION_UPLOAD_ENTID']
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
  
