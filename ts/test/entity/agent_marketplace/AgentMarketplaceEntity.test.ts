

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


describe('AgentMarketplaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentMarketplace()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentMarketplace().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_marketplace.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bundle":{"a":true,"h":"Bundle","n":"bundle","r":true,"t":"`$OBJECT`","key$":"bundle","index$":0},"can_manage":{"a":true,"h":"Can Manage","n":"can_manage","r":true,"t":"`$BOOLEAN`","key$":"can_manage","index$":1},"catalog_key":{"a":true,"h":"Catalog Key","n":"catalog_key","r":true,"sh":"Stable key of a Composal listing, which names its character; null for other listings.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"catalog_key","index$":2},"categories":{"a":true,"h":"Categories","n":"categories","r":true,"t":"`$ARRAY`","key$":"categories","index$":3},"category":{"a":true,"h":"Category","n":"category","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"category","index$":4},"counts":{"a":true,"h":"Counts","n":"counts","r":true,"t":"`$OBJECT`","key$":"counts","index$":5},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":6},"expected_version":{"a":true,"h":"Expected Version","n":"expected_version","r":true,"t":"`$INTEGER`","key$":"expected_version","index$":7},"explainer":{"a":true,"h":"Explainer","n":"explainer","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The listing's public write-up in Markdown.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"explainer","index$":8},"featured":{"a":true,"h":"Featured","n":"featured","r":true,"t":"`$BOOLEAN`","key$":"featured","index$":9},"from_composal":{"a":true,"h":"From Composal","n":"from_composal","r":true,"sh":"One of Composal's ready-made listings.","t":"`$BOOLEAN`","key$":"from_composal","index$":10},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":11},"installs_count":{"a":true,"h":"Installs Count","n":"installs_count","r":true,"t":"`$INTEGER`","key$":"installs_count","index$":12},"instructions":{"a":true,"h":"Instructions","n":"instructions","r":true,"t":"`$STRING`","key$":"instructions","index$":13},"integration_toolkits":{"a":true,"h":"Integration Toolkits","n":"integration_toolkits","r":true,"t":"`$ARRAY`","key$":"integration_toolkits","index$":14},"integrations":{"a":true,"h":"Integrations","n":"integrations","r":true,"t":"`$ARRAY`","key$":"integrations","index$":15},"listing":{"a":true,"h":"Listing","n":"listing","r":true,"t":"`$ANY`","key$":"listing","index$":16},"listings":{"a":true,"h":"Listings","n":"listings","r":true,"t":"`$ARRAY`","key$":"listings","index$":17},"memories":{"a":true,"h":"Memories","n":"memories","r":true,"t":"`$ARRAY`","key$":"memories","index$":18},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":19},"next_page":{"a":true,"h":"Next Page","n":"next_page","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"next_page","index$":20},"organization_name":{"a":true,"h":"Organization Name","n":"organization_name","r":true,"t":"`$STRING`","key$":"organization_name","index$":21},"page_apps":{"a":true,"h":"Page Apps","n":"page_apps","r":true,"t":"`$ARRAY`","key$":"page_apps","index$":22},"publisher_avatar_url":{"a":true,"h":"Publisher Avatar Url","n":"publisher_avatar_url","r":true,"sh":"The publisher's own profile picture; null for Composal's listings and publishers without one.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"publisher_avatar_url","index$":23},"publisher_name":{"a":true,"h":"Publisher Name","n":"publisher_name","r":true,"sh":"\"Composal\" on listings Composal publishes.","t":"`$STRING`","key$":"publisher_name","index$":24},"sections":{"a":true,"h":"Sections","n":"sections","r":true,"t":"`$ARRAY`","key$":"sections","index$":25},"share_token":{"a":true,"h":"Share Token","n":"share_token","r":true,"sh":"Present only for people who manage the listing.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"share_token","index$":26},"skills":{"a":true,"h":"Skills","n":"skills","r":true,"t":"`$ARRAY`","key$":"skills","index$":27},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"sh":"Readable, permanent address segment: /marketplace/<slug>.","t":"`$STRING`","key$":"slug","index$":28},"source_agent_id":{"a":true,"h":"Source Agent Id","n":"source_agent_id","r":false,"sh":"The V2 agent this listing was published from.","t":"`$STRING`","key$":"source_agent_id","index$":29},"summary":{"a":true,"h":"Summary","n":"summary","op":{"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"summary","index$":30},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":31},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":32},"viewer":{"a":true,"h":"Viewer","n":"viewer","r":true,"sh":"Who a public marketplace response was read for.","t":"`$OBJECT`","key$":"viewer","index$":33},"visibility":{"a":true,"h":"Visibility","n":"visibility","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"visibility","index$":34}},"id":{"field":"id","name":"id"},"name":"agent_marketplace","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_marketplace/{id}/install","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_marketplace/{id}/install","q":{"$action":"install","exist":["id","idempotency_key","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"},{"var":"id"},{"lit":"install"}],"t":{"req":"`reqdata`","res":"`body.install`"},"index$":0},{"a":true,"bf":["bundle","category","explainer","name","source_agent_id","summary","visibility"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_marketplace","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_marketplace","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"}],"t":{"req":"`reqdata`","res":"`body.listing`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_marketplace/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_marketplace/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.listing`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/agent_marketplace/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent_marketplace/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent_marketplace"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_marketplace","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"category","or":"category","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"scope","or":"scope","r":false,"style":"form","t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_marketplace","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_marketplace/draft","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"agent_id","or":"agent_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"listing_id","or":"listing_id","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_marketplace/draft","q":{"$action":"draft","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"},{"lit":"draft"}],"t":{"req":"`reqdata`","res":"`body.page_app_choices`"},"index$":3},{"a":true,"co":{"id":"GET /api/v1/agent_marketplace","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"category","or":"category","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"scope","or":"scope","r":false,"style":"form","t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/agent_marketplace","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent_marketplace"}],"t":{"req":"`reqdata`","res":"`body.featured`"},"index$":4}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["bundle","category","expected_version","explainer","name","summary","visibility"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/agent_marketplace/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/agent_marketplace/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.listing`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/agent_marketplace/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/agent_marketplace/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/organizations/{organization_id}/agent_marketplace/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/agent_marketplace/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_marketplace"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"agent_marketplace","name__orig":"agent_marketplace","Name":"AgentMarketplace","name_":"agent_marketplace","name-":"agent-marketplace","NAME":"AGENT_MARKETPLACE","index$":17}, {"active":true,"entity":"agent_marketplace","key$":"BasicAgentMarketplaceFlow","kind":"basic","name":"BasicAgentMarketplaceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_marketplace_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"agent_marketplace_ref01","srcdatavar":"agent_marketplace_ref01_data","suffix":"_up0","textfield":"catalog_key"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_marketplace_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"agent_marketplace_ref01","srcdatavar":"agent_marketplace_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_marketplace_ref01"}}],"index$":2,"route":"GET /api/v1/agent_marketplace/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"agent_marketplace_ref01","suffix":"_rm0"},"m":{"id":"agent_marketplace01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'AgentMarketplace', {"POST /api/v1/organizations/{organization_id}/agent_marketplace/{id}/install":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","required":true,"description":"One key per install; retrying it returns the same agent.","schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/agent_marketplace":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["name","summary","category","bundle"],"properties":{"name":{"type":"string","maxLength":80,"key$":"name"},"summary":{"type":"string","maxLength":280,"key$":"summary"},"explainer":{"type":"string","maxLength":8000,"description":"Markdown shown as the listing's public write-up.","key$":"explainer"},"category":{"type":"string","key$":"category"},"visibility":{"type":"string","enum":["organization","link","public"],"x-ref":"#/components/schemas/AgentListingVisibility","key$":"visibility"},"source_agent_id":{"type":"string","description":"The V2 agent this listing was published from.","key$":"source_agent_id"},"bundle":{"type":"object","required":["instructions"],"properties":{"instructions":{"type":"string"},"page_apps":{"type":"array","maxItems":5,"description":"Reviewed code templates belonging to the source agent. Each install gets new apps with empty storage.","items":{"type":"object","additionalProperties":false,"required":[],"properties":{},"x-ref":"#/components/schemas/AgentListingPageAppReference"}},"memories":{"type":"array","items":{"type":"string"}},"skills":{"type":"array","items":{"type":"object","required":[],"properties":{},"x-ref":"#/components/schemas/AgentListingSkill"}},"integrations":{"type":"array","items":{"type":"object","required":[],"properties":{}}}},"x-ref":"#/components/schemas/AgentListingBundle","key$":"bundle"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/agent_marketplace/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/agent_marketplace/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/agent_marketplace":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","required":false,"schema":{"type":"string"},"index$":1},{"name":"category","in":"query","required":false,"schema":{"type":"string"},"index$":2},{"name":"scope","in":"query","required":false,"schema":{"type":"string","enum":["mine","composal"]},"index$":3},{"name":"page","in":"query","required":false,"schema":{"type":"integer","minimum":1},"index$":4}]},"GET /api/v1/organizations/{organization_id}/agent_marketplace/draft":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"agent_id","in":"query","required":false,"schema":{"type":"string"},"index$":1},{"name":"listing_id","in":"query","required":false,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/agent_marketplace":{"protocol":"http","parameters":[{"name":"q","in":"query","required":false,"schema":{"type":"string"},"index$":0},{"name":"category","in":"query","required":false,"schema":{"type":"string"},"index$":1},{"name":"scope","in":"query","required":false,"schema":{"type":"string","enum":["composal","mine"]},"index$":2},{"name":"page","in":"query","required":false,"schema":{"type":"integer","minimum":1},"index$":3}]},"PATCH /api/v1/organizations/{organization_id}/agent_marketplace/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["expected_version"],"properties":{"expected_version":{"type":"integer","key$":"expected_version"},"name":{"type":"string","maxLength":80,"key$":"name"},"summary":{"type":"string","maxLength":280,"key$":"summary"},"explainer":{"type":"string","maxLength":8000,"description":"Markdown shown as the listing's public write-up.","key$":"explainer"},"category":{"type":"string","key$":"category"},"visibility":{"type":"string","enum":["organization","link","public"],"x-ref":"#/components/schemas/AgentListingVisibility","key$":"visibility"},"bundle":{"type":"object","required":["instructions"],"properties":{"instructions":{"type":"string"},"page_apps":{"type":"array","maxItems":5,"description":"Reviewed code templates belonging to the source agent. Each install gets new apps with empty storage.","items":{"type":"object","additionalProperties":false,"required":[],"properties":{},"x-ref":"#/components/schemas/AgentListingPageAppReference"}},"memories":{"type":"array","items":{"type":"string"}},"skills":{"type":"array","items":{"type":"object","required":[],"properties":{},"x-ref":"#/components/schemas/AgentListingSkill"}},"integrations":{"type":"array","items":{"type":"object","required":[],"properties":{}}}},"x-ref":"#/components/schemas/AgentListingBundle","key$":"bundle"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/organizations/{organization_id}/agent_marketplace/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/organizations/{organization_id}/agent_marketplace/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_marketplace.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_marketplace/{id}/install","agent_marketplace.update.1":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_marketplace/{id}","agent_marketplace.load.2":"GET-only live run: reads a record only agent_marketplace.create.0 gives","agent_marketplace.remove.3":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_marketplace/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_marketplace_ref01_ent = client.AgentMarketplace()
    let agent_marketplace_ref01_data = setup.data.new.agent_marketplace['agent_marketplace_ref01']
    agent_marketplace_ref01_data['organization_id'] = setup.idmap['organization01']

    agent_marketplace_ref01_data = (await agent_marketplace_ref01_ent.create(agent_marketplace_ref01_data)).data()
    assert(null != agent_marketplace_ref01_data.id)


    // UPDATE
    const agent_marketplace_ref01_data_up0: any = {}
    agent_marketplace_ref01_data_up0.id = agent_marketplace_ref01_data.id
    agent_marketplace_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const agent_marketplace_ref01_markdef_up0 = { name: 'catalog_key', value: 'Mark01-agent_marketplace_ref01_' + setup.now }
    ;(agent_marketplace_ref01_data_up0 as any)[agent_marketplace_ref01_markdef_up0.name] = agent_marketplace_ref01_markdef_up0.value

    const agent_marketplace_ref01_resdata_up0 = (await agent_marketplace_ref01_ent.update(agent_marketplace_ref01_data_up0)).data()
    assert(agent_marketplace_ref01_resdata_up0.id === agent_marketplace_ref01_data_up0.id)

    assert((agent_marketplace_ref01_resdata_up0 as any)[agent_marketplace_ref01_markdef_up0.name] === agent_marketplace_ref01_markdef_up0.value)


    // LOAD
    const agent_marketplace_ref01_match_dt0: any = {}
    agent_marketplace_ref01_match_dt0.id = agent_marketplace_ref01_data.id
    const agent_marketplace_ref01_data_dt0 = (await agent_marketplace_ref01_ent.load(agent_marketplace_ref01_match_dt0)).data()
    assert(agent_marketplace_ref01_data_dt0.id === agent_marketplace_ref01_data.id)


    // REMOVE
    const agent_marketplace_ref01_match_rm0: any = { id: agent_marketplace_ref01_data.id }
    agent_marketplace_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await agent_marketplace_ref01_ent.remove(agent_marketplace_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/agent_marketplace/AgentMarketplaceTestData.json')

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
    ['agent_marketplace01','agent_marketplace02','agent_marketplace03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_MARKETPLACE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_MARKETPLACE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_MARKETPLACE_ENTID']
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
  
