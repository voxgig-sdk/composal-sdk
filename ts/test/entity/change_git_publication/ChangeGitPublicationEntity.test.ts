

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


describe('ChangeGitPublicationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ChangeGitPublication()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ChangeGitPublication().load({"id":1,"organization_id":"x","repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'change_git_publication.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"expected_target_commit_id":{"a":true,"h":"Expected Target Commit Id","n":"expected_target_commit_id","r":true,"t":"`$STRING`","key$":"expected_target_commit_id","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":1},"operation_key":{"a":true,"h":"Operation Key","n":"operation_key","r":true,"t":"`$STRING`","key$":"operation_key","index$":2},"publication_id":{"a":true,"h":"Publication Id","n":"publication_id","r":true,"t":"`$STRING`","key$":"publication_id","index$":3},"request":{"a":true,"h":"Request","n":"request","r":true,"t":"`$OBJECT`","key$":"request","index$":4},"request_digest":{"a":true,"h":"Request Digest","n":"request_digest","r":true,"t":"`$STRING`","key$":"request_digest","index$":5},"revisions":{"a":true,"h":"Revisions","n":"revisions","r":true,"t":"`$ARRAY`","key$":"revisions","index$":6},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":7},"transfer_refs":{"a":true,"h":"Transfer Refs","n":"transfer_refs","r":false,"sh":"Immutable receipt-owned refs returned by preparation; transfer each exact Git target before polling readiness.","t":"`$ARRAY`","key$":"transfer_refs","index$":8}},"id":{"field":"id","name":"id"},"name":"change_git_publication","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["operation_key","request"],"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"changes"},{"lit":"git_publications"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications/{id}","q":{"exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"vcs"},{"lit":"changes"},{"lit":"git_publications"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"change_git_publication","name__orig":"change_git_publication","Name":"ChangeGitPublication","name_":"change_git_publication","name-":"change-git-publication","NAME":"CHANGE_GIT_PUBLICATION","index$":162}, {"active":true,"entity":"change_git_publication","key$":"BasicChangeGitPublicationFlow","kind":"basic","name":"BasicChangeGitPublicationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"change_git_publication_ref01"},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"change_git_publication_ref01","srcdatavar":"change_git_publication_ref01_data","suffix":"_dt0"},"m":{"id":"change_git_publication01","organization_id":"organization01","repo_id":"repo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-change_git_publication_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications/{id}","record":{}}]}, 'ChangeGitPublication', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["operation_key","request"],"properties":{"operation_key":{"type":"string","pattern":"^[a-zA-Z0-9_-]{1,96}$","key$":"operation_key"},"request":{"type":"object","additionalProperties":false,"required":["target_branch","expected_target_git_id","revisions"],"properties":{"target_branch":{"type":"string"},"expected_target_git_id":{"type":"string","pattern":"^[0-9a-f]{40}$"},"revisions":{"type":"array","minItems":1,"maxItems":100,"items":{"type":"object","additionalProperties":false,"required":[],"dependentRequired":{},"properties":{}}}},"x-ref":"#/components/schemas/GitPublicationRequest","key$":"request"}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications/{id}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"change_git_publication.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/vcs/changes/git_publications","change_git_publication.load.1":"GET-only live run: reads a record only change_git_publication.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const change_git_publication_ref01_ent = client.ChangeGitPublication()
    let change_git_publication_ref01_data = setup.data.new.change_git_publication['change_git_publication_ref01']
    change_git_publication_ref01_data['organization_id'] = setup.idmap['organization01']
    change_git_publication_ref01_data['repo_id'] = setup.idmap['repo01']

    change_git_publication_ref01_data = (await change_git_publication_ref01_ent.create(change_git_publication_ref01_data)).data()
    assert(null != change_git_publication_ref01_data.id)


    // LOAD
    const change_git_publication_ref01_match_dt0: any = {}
    change_git_publication_ref01_match_dt0.id = change_git_publication_ref01_data.id
    change_git_publication_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    change_git_publication_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    const change_git_publication_ref01_data_dt0 = (await change_git_publication_ref01_ent.load(change_git_publication_ref01_match_dt0)).data()
    assert(change_git_publication_ref01_data_dt0.id === change_git_publication_ref01_data.id)


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
      '../../../../.sdk/test/entity/change_git_publication/ChangeGitPublicationTestData.json')

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
    ['change_git_publication01','change_git_publication02','change_git_publication03','organization01','organization02','organization03','repo01','repo02','repo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CHANGE_GIT_PUBLICATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CHANGE_GIT_PUBLICATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CHANGE_GIT_PUBLICATION_ENTID']
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
  
