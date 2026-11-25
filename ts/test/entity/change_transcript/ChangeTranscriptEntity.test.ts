

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


describe('ChangeTranscriptEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ChangeTranscript()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ChangeTranscript().list({"change_id":1,"organization_id":"x","repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'change_transcript.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"capture_kind":{"a":true,"h":"Capture Kind","n":"capture_kind","r":true,"t":"`$STRING`","key$":"capture_kind","index$":0},"captured_at":{"a":true,"fo":"date-time","h":"Captured At","n":"captured_at","r":true,"t":"`$STRING`","key$":"captured_at","index$":1},"harness":{"a":true,"h":"Harness","n":"harness","r":true,"t":"`$OBJECT`","key$":"harness","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"original_resume":{"a":true,"h":"Original Resume","n":"original_resume","r":false,"t":"`$ANY`","key$":"original_resume","index$":4},"patchset_commit_id":{"a":true,"h":"Patchset Commit Id","n":"patchset_commit_id","r":true,"t":"`$STRING`","key$":"patchset_commit_id","index$":5},"patchset_number":{"a":true,"h":"Patchset Number","n":"patchset_number","r":true,"t":"`$INTEGER`","key$":"patchset_number","index$":6},"redaction_count":{"a":true,"h":"Redaction Count","n":"redaction_count","r":true,"t":"`$INTEGER`","key$":"redaction_count","index$":7},"session_id":{"a":true,"h":"Session Id","n":"session_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"session_id","index$":8},"session_title":{"a":true,"h":"Session Title","n":"session_title","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"session_title","index$":9},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":10},"superseded":{"a":true,"h":"Superseded","n":"superseded","r":true,"t":"`$BOOLEAN`","key$":"superseded","index$":11},"user":{"a":true,"h":"User","n":"user","r":false,"t":"`$OBJECT`","key$":"user","index$":12}},"id":{"field":"id","name":"id"},"name":"change_transcript","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/transcripts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"change_id","or":"change_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/transcripts","q":{"exist":["change_id","organization_id","repo_id"]},"r":{"param":{"change_id":"change_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"changes"},{"var":"change_id"},{"lit":"transcripts"}],"t":{"req":"`reqdata`","res":"`body.transcripts`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo","$.main.kit.entity.change"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"change_transcript","name__orig":"change_transcript","Name":"ChangeTranscript","name_":"change_transcript","name-":"change-transcript","NAME":"CHANGE_TRANSCRIPT","index$":169}, {"active":true,"entity":"change_transcript","key$":"BasicChangeTranscriptFlow","kind":"basic","name":"BasicChangeTranscriptFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"change_id":"change01","organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"change_transcript_ref01"}}],"index$":0}]}, 'ChangeTranscript', {"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/{change_id}/transcripts":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"change_id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let change_transcript_ref01_data = Object.values(setup.data.existing.change_transcript)[0] as any

    // LIST
    const change_transcript_ref01_ent = client.ChangeTranscript()
    const change_transcript_ref01_match: any = {}
    change_transcript_ref01_match['change_id'] = setup.idmap['change01']
    change_transcript_ref01_match['organization_id'] = setup.idmap['organization01']
    change_transcript_ref01_match['repo_id'] = setup.idmap['repo01']

    const change_transcript_ref01_list = (await change_transcript_ref01_ent.list(change_transcript_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/change_transcript/ChangeTranscriptTestData.json')

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
    ['change_transcript01','change_transcript02','change_transcript03','organization01','organization02','organization03','repo01','repo02','repo03','change01','change02','change03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CHANGE_TRANSCRIPT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CHANGE_TRANSCRIPT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CHANGE_TRANSCRIPT_ENTID']
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
  
