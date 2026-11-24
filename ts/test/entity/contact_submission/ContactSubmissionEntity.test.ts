

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


describe('ContactSubmissionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ContactSubmission()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ContactSubmission().create({"company":1,"email":"x","message":"x","name":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact_submission.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"company":{"a":true,"h":"Company","n":"company","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"company","index$":0},"email":{"a":true,"h":"Email","n":"email","r":true,"sh":"Stored downcased and stripped.","t":"`$STRING`","key$":"email","index$":1},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$STRING`","key$":"message","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":3},"website":{"a":true,"h":"Website","n":"website","r":false,"sh":"Honeypot.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"website","index$":4}},"name":"contact_submission","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["company","email","message","name","website"],"co":{"id":"POST /api/v1/contact_submissions","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/contact_submissions","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"contact_submissions"}],"t":{"req":{"company":"`reqdata.company`","email":"`reqdata.email`","message":"`reqdata.message`","name":"`reqdata.name`","website":"`reqdata.website`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"contact_submission","name__orig":"contact_submission","Name":"ContactSubmission","name_":"contact_submission","name-":"contact-submission","NAME":"CONTACT_SUBMISSION","index$":187}, {"active":true,"entity":"contact_submission","key$":"BasicContactSubmissionFlow","kind":"basic","name":"BasicContactSubmissionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"contact_submission_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ContactSubmission', {"POST /api/v1/contact_submissions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["name","email","message"],"additionalProperties":false,"properties":{"name":{"type":"string","maxLength":255,"key$":"name"},"email":{"type":"string","maxLength":255,"description":"Stored downcased and stripped.","key$":"email"},"company":{"type":"string","maxLength":255,"nullable":true,"key$":"company"},"message":{"type":"string","maxLength":5000,"key$":"message"},"website":{"type":"string","nullable":true,"description":"Honeypot. Render it hidden and leave it empty; any value discards the submission.","key$":"website"}},"x-ref":"#/components/schemas/ContactSubmissionRequest"}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"contact_submission.create.0":"GET-only live run: needs POST /api/v1/contact_submissions"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const contact_submission_ref01_ent = client.ContactSubmission()
    let contact_submission_ref01_data = setup.data.new.contact_submission['contact_submission_ref01']

    contact_submission_ref01_data = (await contact_submission_ref01_ent.create(contact_submission_ref01_data)).data()
    assert(null != contact_submission_ref01_data)


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
      '../../../../.sdk/test/entity/contact_submission/ContactSubmissionTestData.json')

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
    ['contact_submission01','contact_submission02','contact_submission03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CONTACT_SUBMISSION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CONTACT_SUBMISSION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CONTACT_SUBMISSION_ENTID']
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
  
