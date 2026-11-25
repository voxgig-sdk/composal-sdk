

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


describe('AgentEmailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentEmail()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentEmail().load({"agent_id":1,"id":"x","organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_email.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"delivery":{"a":true,"h":"Delivery","n":"delivery","r":true,"sh":"What SES reported for mail the agent sent; null for received mail","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"delivery","index$":0},"direction":{"a":true,"h":"Direction","n":"direction","r":true,"sh":"inbound: mail the agent received; outbound: mail it sent","t":"`$STRING`","key$":"direction","index$":1},"from":{"a":true,"h":"From","n":"from","r":true,"t":"`$STRING`","key$":"from","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"preview":{"a":true,"h":"Preview","n":"preview","r":false,"t":"`$STRING`","key$":"preview","index$":4},"received_at":{"a":true,"fo":"date-time","h":"Received At","n":"received_at","r":true,"t":"`$STRING`","key$":"received_at","index$":5},"recipient_tag":{"a":true,"h":"Recipient Tag","n":"recipient_tag","r":true,"sh":"The +tag the sender used, if any","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"recipient_tag","index$":6},"spam":{"a":true,"h":"Spam","n":"spam","r":true,"sh":"SES judged it spam","t":"`$BOOLEAN`","key$":"spam","index$":7},"subject":{"a":true,"h":"Subject","n":"subject","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"subject","index$":8},"text":{"a":true,"h":"Text","n":"text","r":true,"sh":"From, To, Subject and Date headers, a blank line, then the body as plain text","t":"`$STRING`","key$":"text","index$":9},"to":{"a":true,"h":"To","n":"to","r":true,"t":"`$ARRAY`","key$":"to","index$":10}},"id":{"field":"id","name":"id"},"name":"agent_email","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/email/{message_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"message_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/email/{message_id}","q":{"exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","message_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"email"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_email","name__orig":"agent_email","Name":"AgentEmail","name_":"agent_email","name-":"agent-email","NAME":"AGENT_EMAIL","index$":18}, {"active":true,"entity":"agent_email","key$":"BasicAgentEmailFlow","kind":"basic","name":"BasicAgentEmailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_email_ref01","srcdatavar":"agent_email_ref01_data","suffix":"_dt0"},"m":{"agent_id":"agent01","id":"agent_email01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_email_ref01"}}],"index$":0,"route":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/email/{message_id}","record":{}}]}, 'AgentEmail', {"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/email/{message_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"message_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_email_ref01_data = Object.values(setup.data.existing.agent_email)[0] as any

    // LOAD
    const agent_email_ref01_ent = client.AgentEmail()
    const agent_email_ref01_match_dt0: any = {}
    agent_email_ref01_match_dt0.id = agent_email_ref01_data.id
    agent_email_ref01_match_dt0['agent_id'] = setup.idmap['agent_id'] ?? setup.idmap['agent01']
    agent_email_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const agent_email_ref01_data_dt0 = (await agent_email_ref01_ent.load(agent_email_ref01_match_dt0)).data()
    assert(agent_email_ref01_data_dt0.id === agent_email_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_email/AgentEmailTestData.json')

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
    ['agent_email01','agent_email02','agent_email03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_EMAIL_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_EMAIL_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_EMAIL_ENTID']
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
  
