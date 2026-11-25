

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


describe('OrgInvitationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.OrgInvitation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OrgInvitation().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'org_invitation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0},"invitation":{"a":true,"h":"Invitation","n":"invitation","r":true,"t":"`$OBJECT`","key$":"invitation","index$":1},"registration_options":{"a":true,"h":"Registration Options","n":"registration_options","r":true,"t":"`$ANY`","key$":"registration_options","index$":2},"requires_password_setup":{"a":true,"h":"Requires Password Setup","n":"requires_password_setup","r":true,"t":"`$BOOLEAN`","key$":"requires_password_setup","index$":3},"start_guided_setup":{"a":true,"h":"Start Guided Setup","n":"start_guided_setup","r":true,"t":"`$BOOLEAN`","key$":"start_guided_setup","index$":4}},"id":{"field":"id","name":"id"},"name":"org_invitation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/org_invitations/{token}/accept","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/org_invitations/{token}/accept","q":{"$action":"accept","exist":["id"]},"r":{"param":{"token":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"org_invitations"},{"var":"id"},{"lit":"accept"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/org_invitations/{token}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/org_invitations/{token}","q":{"exist":["id"]},"r":{"param":{"token":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"org_invitations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"org_invitation","name__orig":"org_invitation","Name":"OrgInvitation","name_":"org_invitation","name-":"org-invitation","NAME":"ORG_INVITATION","index$":333}, {"active":true,"entity":"org_invitation","key$":"BasicOrgInvitationFlow","kind":"basic","name":"BasicOrgInvitationFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"org_invitation_ref01"},"m":{"token":"token01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"org_invitation_ref01","srcdatavar":"org_invitation_ref01_data","suffix":"_dt0"},"m":{"id":"org_invitation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-org_invitation_ref01"}}],"index$":0,"route":"GET /api/v1/org_invitations/{token}","record":{}}]}, 'OrgInvitation', {"POST /api/v1/org_invitations/{token}/accept":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"token","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/org_invitations/{token}":{"protocol":"http","parameters":[{"name":"token","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"org_invitation.create.0":"GET-only live run: needs POST /api/v1/org_invitations/{token}/accept","org_invitation.load.1":"GET-only live run: reads a record only org_invitation.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let org_invitation_ref01_data = Object.values(setup.data.existing.org_invitation)[0] as any

    // LOAD
    const org_invitation_ref01_ent = client.OrgInvitation()
    const org_invitation_ref01_match_dt0: any = {}
    org_invitation_ref01_match_dt0.id = org_invitation_ref01_data.id
    const org_invitation_ref01_data_dt0 = (await org_invitation_ref01_ent.load(org_invitation_ref01_match_dt0)).data()
    assert(org_invitation_ref01_data_dt0.id === org_invitation_ref01_data.id)


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
      '../../../../.sdk/test/entity/org_invitation/OrgInvitationTestData.json')

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
    ['org_invitation01','org_invitation02','org_invitation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ORG_INVITATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ORG_INVITATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ORG_INVITATION_ENTID']
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
  
