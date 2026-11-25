

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


describe('PullRequestTranscriptEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PullRequestTranscript()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PullRequestTranscript().list({"organization_id":1,"pull_request_id":"x","repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pull_request_transcript.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"adapter":{"a":true,"h":"Adapter","n":"adapter","r":true,"t":"`$STRING`","key$":"adapter","index$":0},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at","index$":1},"ended_at":{"a":true,"h":"Ended At","n":"ended_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ended_at","index$":2},"external_session_id":{"a":true,"h":"External Session Id","n":"external_session_id","r":true,"t":"`$STRING`","key$":"external_session_id","index$":3},"harness":{"a":true,"h":"Harness","n":"harness","r":true,"sh":"Harness id the session presents as (codex, claude-code, cursor, roder, grok): the captured envelope's harness when recorded, else the adapter's canonical harness.","t":"`$STRING`","key$":"harness","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"last_activity_at":{"a":true,"h":"Last Activity At","n":"last_activity_at","r":true,"sh":"When the session last did anything: the newest checkpoint capture, else the session end, else its start.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_activity_at","index$":6},"last_checkpoint_at":{"a":true,"h":"Last Checkpoint At","n":"last_checkpoint_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_checkpoint_at","index$":7},"repository":{"a":true,"h":"Repository","n":"repository","r":true,"t":"`$ANY`","key$":"repository","index$":8},"started_at":{"a":true,"h":"Started At","n":"started_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at","index$":9},"stats":{"a":true,"h":"Stats","n":"stats","r":true,"t":"`$OBJECT`","key$":"stats","index$":10},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":11},"title":{"a":true,"h":"Title","n":"title","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"title","index$":12},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at","index$":13},"user":{"a":true,"h":"User","n":"user","r":true,"t":"`$ANY`","key$":"user","index$":14}},"id":{"field":"id","name":"id"},"name":"pull_request_transcript","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/pull_request/{number}/transcripts","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"pull_request_id","or":"number","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":20,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"ex":false,"explode":true,"k":"query","n":"paginated","or":"paginated","r":false,"style":"form","t":"`$BOOLEAN`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/pull_request/{number}/transcripts","q":{"exist":["organization_id","pull_request_id","repo_id"]},"r":{"param":{"number":"pull_request_id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"pages"},{"lit":"pull_request"},{"var":"pull_request_id"},{"lit":"transcripts"}],"t":{"page":{"cursor":"`body.pagination.next_cursor`","more":"`body.pagination.has_more`"},"req":"`reqdata`","res":"`body.sessions`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"pull_request_transcript","name__orig":"pull_request_transcript","Name":"PullRequestTranscript","name_":"pull_request_transcript","name-":"pull-request-transcript","NAME":"PULL_REQUEST_TRANSCRIPT","index$":412}, {"active":true,"entity":"pull_request_transcript","key$":"BasicPullRequestTranscriptFlow","kind":"basic","name":"BasicPullRequestTranscriptFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","pull_request_id":"pull_request01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pull_request_transcript_ref01"}}],"index$":0}]}, 'PullRequestTranscript', {"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/pages/pull_request/{number}/transcripts":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"number","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"in":"query","name":"paginated","description":"Opt in to bounded session pages. Omit to retain the legacy complete list.","schema":{"type":"boolean","default":false},"index$":3},{"in":"query","name":"cursor","description":"Opaque next_cursor from a previous page for this pull request.","schema":{"type":"string"},"index$":4},{"in":"query","name":"limit","description":"Maximum sessions in paginated mode.","schema":{"type":"integer","minimum":1,"maximum":100,"default":20},"index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pull_request_transcript_ref01_data = Object.values(setup.data.existing.pull_request_transcript)[0] as any

    // LIST
    const pull_request_transcript_ref01_ent = client.PullRequestTranscript()
    const pull_request_transcript_ref01_match: any = {}
    pull_request_transcript_ref01_match['organization_id'] = setup.idmap['organization01']
    pull_request_transcript_ref01_match['pull_request_id'] = setup.idmap['pull_request01']
    pull_request_transcript_ref01_match['repo_id'] = setup.idmap['repo01']

    const pull_request_transcript_ref01_list = (await pull_request_transcript_ref01_ent.list(pull_request_transcript_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/pull_request_transcript/PullRequestTranscriptTestData.json')

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
    ['pull_request_transcript01','pull_request_transcript02','pull_request_transcript03','organization01','organization02','organization03','repo01','repo02','repo03','pull_request01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PULL_REQUEST_TRANSCRIPT_ENTID']
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
  
