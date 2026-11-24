

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


describe('AgentAppEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentApp()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentApp().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_app.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"author":{"a":true,"h":"Author","n":"author","r":true,"t":"`$OBJECT`","key$":"author","index$":0},"can_message":{"a":true,"h":"Can Message","n":"can_message","r":true,"sh":"The viewer may send input to the author agent","t":"`$BOOLEAN`","key$":"can_message","index$":1},"deployments_count":{"a":true,"h":"Deployments Count","n":"deployments_count","r":true,"sh":"Increases with every deploy of the site","t":"`$INTEGER`","key$":"deployments_count","index$":2},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":3},"hidden_install_count":{"a":true,"h":"Hidden Install Count","n":"hidden_install_count","r":true,"sh":"Installs by agents the viewer cannot open","t":"`$INTEGER`","key$":"hidden_install_count","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"install_count":{"a":true,"h":"Install Count","n":"install_count","r":true,"t":"`$INTEGER`","key$":"install_count","index$":6},"install_targets":{"a":true,"h":"Install Targets","n":"install_targets","r":true,"sh":"Active agents the viewer owns or manages, which they can install apps on","t":"`$ARRAY`","key$":"install_targets","index$":7},"installed_by":{"a":true,"h":"Installed By","n":"installed_by","r":true,"t":"`$ARRAY`","key$":"installed_by","index$":8},"installed_target_ids":{"a":true,"h":"Installed Target Ids","n":"installed_target_ids","r":true,"sh":"Install targets of the viewer that have this app installed","t":"`$ARRAY`","key$":"installed_target_ids","index$":9},"items":{"a":true,"h":"Items","n":"items","r":true,"t":"`$ARRAY`","key$":"items","index$":10},"mcp_url":{"a":true,"h":"Mcp Url","n":"mcp_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"mcp_url","index$":11},"next_cursor":{"a":true,"h":"Next Cursor","n":"next_cursor","r":true,"sh":"Pass as cursor to load older apps","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"next_cursor","index$":12},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"sh":"The person who controls the author agent","t":"`$OBJECT`","key$":"owner","index$":13},"thread":{"a":true,"h":"Thread","n":"thread","r":true,"sh":"The thread that published the app, when the viewer can open the author agent","t":"`$ANY`","key$":"thread","index$":14},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":15},"url":{"a":true,"h":"Url","n":"url","r":true,"t":"`$STRING`","key$":"url","index$":16},"visibility":{"a":true,"h":"Visibility","n":"visibility","r":true,"t":"`$STRING`","key$":"visibility","index$":17}},"id":{"field":"id","name":"id"},"name":"agent_app","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["surface","view"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_apps/{id}/opened","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_apps/{id}/opened","q":{"$action":"opened","exist":["id","idempotency_key","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_apps"},{"var":"id"},{"lit":"opened"}],"t":{"req":{"surface":"`reqdata.surface`","view":"`reqdata.view`"},"res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_apps","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_apps","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_apps"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_apps/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_apps/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_apps"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"agent_app","name__orig":"agent_app","Name":"AgentApp","name_":"agent_app","name-":"agent-app","NAME":"AGENT_APP","index$":3}, {"active":true,"entity":"agent_app","key$":"BasicAgentAppFlow","kind":"basic","name":"BasicAgentAppFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"agent_app_ref01"},"m":{"id":"id01","organization_id":"organization01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_app_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"agent_app_ref01","srcdatavar":"agent_app_ref01_data","suffix":"_dt0"},"m":{"id":"agent_app01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_app_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/agent_apps/{id}","record":{}}]}, 'AgentApp', {"POST /api/v1/organizations/{organization_id}/agent_apps/{id}/opened":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["surface","view"],"properties":{"surface":{"type":"string","enum":["web","desktop"]},"view":{"type":"string","enum":["frame","external"],"description":"Beside its agent in Composal, or in the person's own browser"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/agent_apps":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/agent_apps/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_app.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_apps/{id}/opened"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_app_ref01_data = Object.values(setup.data.existing.agent_app)[0] as any

    // LIST
    const agent_app_ref01_ent = client.AgentApp()
    const agent_app_ref01_match: any = {}
    agent_app_ref01_match['organization_id'] = setup.idmap['organization01']

    const agent_app_ref01_list = (await agent_app_ref01_ent.list(agent_app_ref01_match)).map((e: any) => e.data())


    // LOAD
    const agent_app_ref01_match_dt0: any = {}
    agent_app_ref01_match_dt0.id = agent_app_ref01_data.id
    agent_app_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const agent_app_ref01_data_dt0 = (await agent_app_ref01_ent.load(agent_app_ref01_match_dt0)).data()
    assert(agent_app_ref01_data_dt0.id === agent_app_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_app/AgentAppTestData.json')

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
    ['agent_app01','agent_app02','agent_app03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_APP_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_APP_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_APP_ENTID']
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
  
