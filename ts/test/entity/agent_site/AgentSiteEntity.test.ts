

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


describe('AgentSiteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentSite()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentSite().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_site.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"author":{"a":true,"h":"Author","n":"author","r":true,"t":"`$OBJECT`","key$":"author","index$":0},"can_message":{"a":true,"h":"Can Message","n":"can_message","r":true,"sh":"The viewer may send input to the author agent","t":"`$BOOLEAN`","key$":"can_message","index$":1},"deployments_count":{"a":true,"h":"Deployments Count","n":"deployments_count","r":true,"sh":"Increases with every deploy of the site","t":"`$INTEGER`","key$":"deployments_count","index$":2},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"The team app description, when the site is a team app","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":3},"icon_url":{"a":true,"h":"Icon Url","n":"icon_url","r":true,"sh":"Path of the site's generated icon, versioned by the picture; null until one is generated","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"icon_url","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The site's DNS label","t":"`$STRING`","key$":"name","index$":6},"owner":{"a":true,"h":"Owner","n":"owner","r":true,"sh":"The person who controls the author agent","t":"`$OBJECT`","key$":"owner","index$":7},"thread":{"a":true,"h":"Thread","n":"thread","r":true,"sh":"The thread that published the site as a team app, when the viewer can open the author agent","t":"`$ANY`","key$":"thread","index$":8},"title":{"a":true,"h":"Title","n":"title","r":true,"sh":"The team app title, or the site name read as words","t":"`$STRING`","key$":"title","index$":9},"url":{"a":true,"h":"Url","n":"url","r":true,"t":"`$STRING`","key$":"url","index$":10},"visibility":{"a":true,"h":"Visibility","n":"visibility","r":true,"t":"`$STRING`","key$":"visibility","index$":11}},"id":{"field":"id","name":"id"},"name":"agent_site","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["surface","view"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_sites/{id}/opened","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_sites/{id}/opened","q":{"$action":"opened","exist":["id","idempotency_key","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_sites"},{"var":"id"},{"lit":"opened"}],"t":{"req":{"surface":"`reqdata.surface`","view":"`reqdata.view`"},"res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_sites","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_sites","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_sites"}],"t":{"page":{"cursor":"`body.next_cursor`"},"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_sites/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_sites/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_sites"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_sites/{id}/icon","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_sites/{id}/icon","q":{"$action":"icon","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"image/webp"}],"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_sites"},{"var":"id"},{"lit":"icon"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"agent_site","name__orig":"agent_site","Name":"AgentSite","name_":"agent_site","name-":"agent-site","NAME":"AGENT_SITE","index$":50}, {"active":true,"entity":"agent_site","key$":"BasicAgentSiteFlow","kind":"basic","name":"BasicAgentSiteFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"agent_site_ref01"},"m":{"id":"id01","organization_id":"organization01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_site_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"agent_site_ref01","srcdatavar":"agent_site_ref01_data","suffix":"_dt0"},"m":{"id":"agent_site01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_site_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/agent_sites/{id}","record":{}}]}, 'AgentSite', {"POST /api/v1/organizations/{organization_id}/agent_sites/{id}/opened":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["surface","view"],"properties":{"surface":{"type":"string","enum":["web","desktop"]},"view":{"type":"string","enum":["frame","external"],"description":"Beside its agent in Composal, or in the person's own browser"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/agent_sites":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/agent_sites/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/agent_sites/{id}/icon":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_site.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_sites/{id}/opened"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_site_ref01_data = Object.values(setup.data.existing.agent_site)[0] as any

    // LIST
    const agent_site_ref01_ent = client.AgentSite()
    const agent_site_ref01_match: any = {}
    agent_site_ref01_match['organization_id'] = setup.idmap['organization01']

    const agent_site_ref01_list = (await agent_site_ref01_ent.list(agent_site_ref01_match)).map((e: any) => e.data())


    // LOAD
    const agent_site_ref01_match_dt0: any = {}
    agent_site_ref01_match_dt0.id = agent_site_ref01_data.id
    agent_site_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const agent_site_ref01_data_dt0 = (await agent_site_ref01_ent.load(agent_site_ref01_match_dt0)).data()
    assert(agent_site_ref01_data_dt0.id === agent_site_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_site/AgentSiteTestData.json')

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
    ['agent_site01','agent_site02','agent_site03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_SITE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_SITE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_SITE_ENTID']
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
  
