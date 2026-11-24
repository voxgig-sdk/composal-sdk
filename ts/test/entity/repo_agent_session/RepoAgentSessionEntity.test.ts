

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


describe('RepoAgentSessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepoAgentSession()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepoAgentSession().list({"organization_id":1,"repo_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repo_agent_session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"adapter":{"a":true,"h":"Adapter","n":"adapter","r":false,"t":"`$STRING`","key$":"adapter","index$":0},"agent_session":{"a":true,"h":"Agent Session","n":"agent_session","r":true,"t":"`$OBJECT`","key$":"agent_session","index$":1},"external_session_id":{"a":true,"h":"External Session Id","n":"external_session_id","r":false,"t":"`$STRING`","key$":"external_session_id","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":4},"title":{"a":true,"h":"Title","n":"title","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"title","index$":5}},"id":{"field":"id","name":"id"},"name":"repo_agent_session","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/complete","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/complete","q":{"$action":"complete","exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"id"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions","q":{"exist":["organization_id","repo_id"]},"r":{"param":{"org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}","q":{"exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"checkpoint","or":"checkpoint","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript","q":{"$action":"transcript","exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"id"},{"lit":"transcript"}],"t":{"req":"`reqdata`","res":"`body.events`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript_export","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"explode":true,"k":"query","n":"checkpoint","or":"checkpoint","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":"markdown","explode":true,"k":"query","n":"format","or":"format","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript_export","q":{"$action":"transcript_export","exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"application/x-ndjson"},{"kind":"raw","media":"text/markdown"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"id"},{"lit":"transcript_export"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript_index","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":3}],"query":[{"a":true,"explode":true,"k":"query","n":"checkpoint","or":"checkpoint","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"chunk","or":"chunk","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript_index","q":{"$action":"transcript_index","exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"id"},{"lit":"transcript_index"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["agent_session"],"co":{"id":"PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}","q":{"exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.agent_session`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"repo_id","or":"repo_slug","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}","q":{"exist":["id","organization_id","repo_id"]},"r":{"param":{"id":"id","org_slug":"organization_id","repo_slug":"repo_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"repos"},{"var":"repo_id"},{"lit":"agent_sessions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.repo"]]},"key$":"repo_agent_session","name__orig":"repo_agent_session","Name":"RepoAgentSession","name_":"repo_agent_session","name-":"repo-agent-session","NAME":"REPO_AGENT_SESSION","index$":423}, {"active":true,"entity":"repo_agent_session","key$":"BasicRepoAgentSessionFlow","kind":"basic","name":"BasicRepoAgentSessionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"repo_agent_session_ref01"},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","repo_id":"repo01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"repo_agent_session_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01","repo_id":"repo01"},"i":{"ref":"repo_agent_session_ref01","srcdatavar":"repo_agent_session_ref01_data","suffix":"_up0","textfield":"adapter"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-repo_agent_session_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"repo_agent_session_ref01","srcdatavar":"repo_agent_session_ref01_data","suffix":"_dt0"},"m":{"id":"repo_agent_session01","organization_id":"organization01","repo_id":"repo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-repo_agent_session_ref01"}}],"index$":3,"route":"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}","record":{}}]}, 'RepoAgentSession', {"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/complete":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"in":"query","name":"cursor","required":false,"description":"Opaque backward-pagination cursor from a previous response's `prev_cursor`. Omit for the latest (tail) page.","schema":{"type":"string"},"index$":3},{"in":"query","name":"limit","required":false,"description":"Events per page (default 200).","schema":{"type":"integer","minimum":1,"maximum":500},"index$":4},{"in":"query","name":"checkpoint","required":false,"description":"Public id of a specific uploaded checkpoint to read. Defaults to the session's latest uploaded checkpoint.","schema":{"type":"string"},"index$":5}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript_export":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"in":"query","name":"checkpoint","required":false,"description":"Public id of a specific uploaded checkpoint to export.","schema":{"type":"string"},"index$":3},{"in":"query","name":"format","required":false,"description":"Export format. Defaults to Markdown.","schema":{"type":"string","enum":["markdown","jsonl"],"default":"markdown"},"index$":4}]},"GET /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/transcript_index":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"in":"path","name":"id","required":true,"description":"Public id of the session.","schema":{"type":"string"},"index$":3},{"in":"query","name":"checkpoint","required":false,"description":"Public id of a specific uploaded checkpoint. Defaults to the session's latest uploaded checkpoint.","schema":{"type":"string"},"index$":4},{"in":"query","name":"chunk","required":false,"description":"Sequence number of a single chunk to serve instead of the index body. Must be a non-negative integer listed in the manifest's `chunks`; anything else is a 404. Clients follow the `url` from the index response rather than building this themselves.","schema":{"type":"integer","minimum":0},"index$":5}]},"PATCH /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["agent_session"],"properties":{"agent_session":{"type":"object","required":["title"],"properties":{"title":{"type":"string","maxLength":120,"nullable":true}},"key$":"agent_session"}}}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"repo_slug","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"repo_agent_session.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}/complete","repo_agent_session.update.2":"GET-only live run: needs PUT /api/v1/organizations/{org_slug}/repos/{repo_slug}/agent_sessions/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const repo_agent_session_ref01_ent = client.RepoAgentSession()
    let repo_agent_session_ref01_data = setup.data.new.repo_agent_session['repo_agent_session_ref01']
    repo_agent_session_ref01_data['organization_id'] = setup.idmap['organization01']
    repo_agent_session_ref01_data['repo_id'] = setup.idmap['repo01']

    repo_agent_session_ref01_data = (await repo_agent_session_ref01_ent.create(repo_agent_session_ref01_data)).data()
    assert(null != repo_agent_session_ref01_data.id)


    // LIST
    const repo_agent_session_ref01_match: any = {}
    repo_agent_session_ref01_match['organization_id'] = setup.idmap['organization01']
    repo_agent_session_ref01_match['repo_id'] = setup.idmap['repo01']

    const repo_agent_session_ref01_list = (await repo_agent_session_ref01_ent.list(repo_agent_session_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(repo_agent_session_ref01_list, { id: repo_agent_session_ref01_data.id })))


    // UPDATE
    const repo_agent_session_ref01_data_up0: any = {}
    repo_agent_session_ref01_data_up0.id = repo_agent_session_ref01_data.id
    repo_agent_session_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    repo_agent_session_ref01_data_up0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']

    const repo_agent_session_ref01_markdef_up0 = { name: 'adapter', value: 'Mark01-repo_agent_session_ref01_' + setup.now }
    ;(repo_agent_session_ref01_data_up0 as any)[repo_agent_session_ref01_markdef_up0.name] = repo_agent_session_ref01_markdef_up0.value

    const repo_agent_session_ref01_resdata_up0 = (await repo_agent_session_ref01_ent.update(repo_agent_session_ref01_data_up0)).data()
    assert(repo_agent_session_ref01_resdata_up0.id === repo_agent_session_ref01_data_up0.id)

    assert((repo_agent_session_ref01_resdata_up0 as any)[repo_agent_session_ref01_markdef_up0.name] === repo_agent_session_ref01_markdef_up0.value)


    // LOAD
    const repo_agent_session_ref01_match_dt0: any = {}
    repo_agent_session_ref01_match_dt0.id = repo_agent_session_ref01_data.id
    repo_agent_session_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    repo_agent_session_ref01_match_dt0['repo_id'] = setup.idmap['repo_id'] ?? setup.idmap['repo01']
    const repo_agent_session_ref01_data_dt0 = (await repo_agent_session_ref01_ent.load(repo_agent_session_ref01_match_dt0)).data()
    assert(repo_agent_session_ref01_data_dt0.id === repo_agent_session_ref01_data.id)


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
      '../../../../.sdk/test/entity/repo_agent_session/RepoAgentSessionTestData.json')

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
    ['repo_agent_session01','repo_agent_session02','repo_agent_session03','organization01','organization02','organization03','repo01','repo02','repo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPO_AGENT_SESSION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPO_AGENT_SESSION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPO_AGENT_SESSION_ENTID']
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
  
