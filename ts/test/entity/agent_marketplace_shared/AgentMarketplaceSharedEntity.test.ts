

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


describe('AgentMarketplaceSharedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentMarketplaceShared()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentMarketplaceShared().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_marketplace_shared.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"can_manage":{"a":true,"h":"Can Manage","n":"can_manage","r":true,"t":"`$BOOLEAN`","key$":"can_manage","index$":0},"catalog_key":{"a":true,"h":"Catalog Key","n":"catalog_key","r":true,"sh":"Stable key of a Composal listing, which names its character; null for other listings.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"catalog_key","index$":1},"category":{"a":true,"h":"Category","n":"category","r":true,"t":"`$STRING`","key$":"category","index$":2},"counts":{"a":true,"h":"Counts","n":"counts","r":true,"t":"`$OBJECT`","key$":"counts","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":4},"explainer":{"a":true,"h":"Explainer","n":"explainer","r":true,"sh":"The listing's public write-up in Markdown.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"explainer","index$":5},"featured":{"a":true,"h":"Featured","n":"featured","r":true,"t":"`$BOOLEAN`","key$":"featured","index$":6},"from_composal":{"a":true,"h":"From Composal","n":"from_composal","r":true,"sh":"One of Composal's ready-made listings.","t":"`$BOOLEAN`","key$":"from_composal","index$":7},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":8},"installs_count":{"a":true,"h":"Installs Count","n":"installs_count","r":true,"t":"`$INTEGER`","key$":"installs_count","index$":9},"instructions":{"a":true,"h":"Instructions","n":"instructions","r":true,"t":"`$STRING`","key$":"instructions","index$":10},"integration_toolkits":{"a":true,"h":"Integration Toolkits","n":"integration_toolkits","r":true,"t":"`$ARRAY`","key$":"integration_toolkits","index$":11},"integrations":{"a":true,"h":"Integrations","n":"integrations","r":true,"t":"`$ARRAY`","key$":"integrations","index$":12},"listing":{"a":true,"h":"Listing","n":"listing","r":true,"t":"`$ANY`","key$":"listing","index$":13},"memories":{"a":true,"h":"Memories","n":"memories","r":true,"t":"`$ARRAY`","key$":"memories","index$":14},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":15},"organization_name":{"a":true,"h":"Organization Name","n":"organization_name","r":true,"t":"`$STRING`","key$":"organization_name","index$":16},"page_apps":{"a":true,"h":"Page Apps","n":"page_apps","r":true,"t":"`$ARRAY`","key$":"page_apps","index$":17},"publisher_avatar_url":{"a":true,"h":"Publisher Avatar Url","n":"publisher_avatar_url","r":true,"sh":"The publisher's own profile picture; null for Composal's listings and publishers without one.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"publisher_avatar_url","index$":18},"publisher_name":{"a":true,"h":"Publisher Name","n":"publisher_name","r":true,"sh":"\"Composal\" on listings Composal publishes.","t":"`$STRING`","key$":"publisher_name","index$":19},"share_token":{"a":true,"h":"Share Token","n":"share_token","r":true,"sh":"Present only for people who manage the listing.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"share_token","index$":20},"skills":{"a":true,"h":"Skills","n":"skills","r":true,"t":"`$ARRAY`","key$":"skills","index$":21},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"sh":"Readable, permanent address segment: /marketplace/<slug>.","t":"`$STRING`","key$":"slug","index$":22},"summary":{"a":true,"h":"Summary","n":"summary","r":true,"t":"`$STRING`","key$":"summary","index$":23},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":24},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":25},"viewer":{"a":true,"h":"Viewer","n":"viewer","r":true,"sh":"Who a public marketplace response was read for.","t":"`$OBJECT`","key$":"viewer","index$":26},"visibility":{"a":true,"h":"Visibility","n":"visibility","r":true,"t":"`$STRING`","key$":"visibility","index$":27}},"id":{"field":"id","name":"id"},"name":"agent_marketplace_shared","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}/install","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"share_token","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}/install","q":{"$action":"install","exist":["id","idempotency_key","organization_id"]},"r":{"param":{"share_token":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"},{"lit":"shared"},{"var":"id"},{"lit":"install"}],"t":{"req":"`reqdata`","res":"`body.install`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"share_token","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}","q":{"exist":["id","organization_id"]},"r":{"param":{"share_token":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"},{"lit":"shared"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.listing`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/agent_marketplace/shared/{share_token}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"share_token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent_marketplace/shared/{share_token}","q":{"exist":["id"]},"r":{"param":{"share_token":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent_marketplace"},{"lit":"shared"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_marketplace_shared","name__orig":"agent_marketplace_shared","Name":"AgentMarketplaceShared","name_":"agent_marketplace_shared","name-":"agent-marketplace-shared","NAME":"AGENT_MARKETPLACE_SHARED","index$":30}, {"active":true,"entity":"agent_marketplace_shared","key$":"BasicAgentMarketplaceSharedFlow","kind":"basic","name":"BasicAgentMarketplaceSharedFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"agent_marketplace_shared_ref01"},"m":{"organization_id":"organization01","share_token":"share_token01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"agent_marketplace_shared_ref01","srcdatavar":"agent_marketplace_shared_ref01_data","suffix":"_dt0"},"m":{"id":"agent_marketplace_shared01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_marketplace_shared_ref01"}}],"index$":0,"route":"GET /api/v1/agent_marketplace/shared/{share_token}","record":{}}]}, 'AgentMarketplaceShared', {"POST /api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}/install":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"share_token","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","required":true,"description":"One key per install; retrying it returns the same agent.","schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"share_token","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/agent_marketplace/shared/{share_token}":{"protocol":"http","parameters":[{"name":"share_token","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_marketplace_shared.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_marketplace/shared/{share_token}/install","agent_marketplace_shared.load.1":"GET-only live run: reads a record only agent_marketplace_shared.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_marketplace_shared_ref01_data = Object.values(setup.data.existing.agent_marketplace_shared)[0] as any

    // LOAD
    const agent_marketplace_shared_ref01_ent = client.AgentMarketplaceShared()
    const agent_marketplace_shared_ref01_match_dt0: any = {}
    agent_marketplace_shared_ref01_match_dt0.id = agent_marketplace_shared_ref01_data.id
    const agent_marketplace_shared_ref01_data_dt0 = (await agent_marketplace_shared_ref01_ent.load(agent_marketplace_shared_ref01_match_dt0)).data()
    assert(agent_marketplace_shared_ref01_data_dt0.id === agent_marketplace_shared_ref01_data.id)


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
      '../../../../.sdk/test/entity/agent_marketplace_shared/AgentMarketplaceSharedTestData.json')

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
    ['agent_marketplace_shared01','agent_marketplace_shared02','agent_marketplace_shared03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_MARKETPLACE_SHARED_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_MARKETPLACE_SHARED_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_MARKETPLACE_SHARED_ENTID']
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
  
