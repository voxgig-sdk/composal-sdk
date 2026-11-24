

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


describe('PageAgentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PageAgent()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PageAgent().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'page_agent.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agents":{"a":true,"h":"Agents","n":"agents","r":true,"t":"`$ARRAY`","key$":"agents","index$":0},"can_edit_integration_connections":{"a":true,"h":"Can Edit Integration Connections","n":"can_edit_integration_connections","r":true,"t":"`$BOOLEAN`","key$":"can_edit_integration_connections","index$":1},"creation_enabled":{"a":true,"h":"Creation Enabled","n":"creation_enabled","r":true,"t":"`$BOOLEAN`","key$":"creation_enabled","index$":2},"inbox":{"a":true,"h":"Inbox","n":"inbox","r":false,"t":"`$ANY`","union":{"branches":6,"count":3,"depth":14},"key$":"inbox","index$":3},"integration_choices":{"a":true,"h":"Integration Choices","n":"integration_choices","r":true,"t":"`$ARRAY`","key$":"integration_choices","index$":4},"integration_choices_truncated":{"a":true,"h":"Integration Choices Truncated","n":"integration_choices_truncated","r":true,"t":"`$BOOLEAN`","key$":"integration_choices_truncated","index$":5},"integration_selected":{"a":true,"h":"Integration Selected","n":"integration_selected","r":true,"t":"`$ARRAY`","key$":"integration_selected","index$":6},"model_choices":{"a":true,"h":"Model Choices","n":"model_choices","r":false,"t":"`$ARRAY`","key$":"model_choices","index$":7},"new_configuration":{"a":true,"h":"New Configuration","n":"new_configuration","r":true,"t":"`$ANY`","union":{"branches":5,"count":3,"depth":9},"key$":"new_configuration","index$":8},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":9},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":true,"t":"`$OBJECT`","key$":"pagination","index$":10},"pinned_agent":{"a":true,"h":"Pinned Agent","n":"pinned_agent","r":true,"t":"`$ANY`","key$":"pinned_agent","index$":11},"platform_event_types":{"a":true,"h":"Platform Event Types","n":"platform_event_types","r":true,"t":"`$ARRAY`","key$":"platform_event_types","index$":12},"repository_choices":{"a":true,"de":true,"h":"Repository Choices","n":"repository_choices","r":true,"sh":"Empty compatibility field.","t":"`$ARRAY`","key$":"repository_choices","index$":13},"repository_choices_truncated":{"a":true,"de":true,"h":"Repository Choices Truncated","n":"repository_choices_truncated","r":true,"t":"`$BOOLEAN`","key$":"repository_choices_truncated","index$":14},"runtime_versions":{"a":true,"h":"Runtime Versions","n":"runtime_versions","r":false,"sh":"Runtime choices authorized for this organization.","t":"`$ARRAY`","key$":"runtime_versions","index$":15},"selected_agent":{"a":true,"h":"Selected Agent","n":"selected_agent","r":true,"t":"`$ANY`","union":{"branches":5,"count":3,"depth":15},"key$":"selected_agent","index$":16},"selected_reference":{"a":true,"h":"Selected Reference","n":"selected_reference","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"selected_reference","index$":17},"viewer_id":{"a":true,"h":"Viewer Id","n":"viewer_id","r":true,"t":"`$STRING`","key$":"viewer_id","index$":18}},"name":"page_agent","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["agent_ids"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/page/activity","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/page/activity","q":{"$action":"activity","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"lit":"page"},{"lit":"activity"}],"t":{"req":{"agent_ids":"`reqdata.agent_id`"},"res":"`body.agents`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/page","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"agent","or":"agent","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"agent_search","or":"agent_search","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"agent_visibility","or":"agent_visibility","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"integration_search","or":"integration_search","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"ex":30,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":5}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/page","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"lit":"page"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/page/roster","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"agent","or":"agent","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"agent_search","or":"agent_search","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"agent_visibility","or":"agent_visibility","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/page/roster","q":{"$action":"roster","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"lit":"page"},{"lit":"roster"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"page_agent","name__orig":"page_agent","Name":"PageAgent","name_":"page_agent","name-":"page-agent","NAME":"PAGE_AGENT","index$":144}, {"active":true,"entity":"page_agent","key$":"BasicPageAgentFlow","kind":"basic","name":"BasicPageAgentFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"page_agent_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"page_agent_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"page_agent_ref01","srcdatavar":"page_agent_ref01_data","suffix":"_dt0"},"m":{"id":"page_agent01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-page_agent_ref01"}}],"unreachable":true}]}, 'PageAgent', {"POST /api/v1/organizations/{organization_id}/agents/page/activity":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["agent_ids"],"properties":{"agent_ids":{"type":"array","minItems":1,"maxItems":200,"items":{"type":"string"}}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/agents/page":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"agent","in":"query","schema":{"type":"string"},"index$":1},{"name":"agent_search","in":"query","schema":{"type":"string"},"index$":2},{"name":"agent_visibility","in":"query","description":"Limit the roster, including its pinned row, without changing the selected agent or inbox.","schema":{"type":"string","enum":["private","organization"]},"index$":3},{"name":"integration_search","in":"query","schema":{"type":"string"},"index$":4},{"name":"cursor","in":"query","schema":{"type":"string"},"index$":5},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":100,"default":30},"index$":6}]},"GET /api/v1/organizations/{organization_id}/agents/page/roster":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"agent","in":"query","schema":{"type":"string"},"index$":1},{"name":"agent_search","in":"query","schema":{"type":"string"},"index$":2},{"name":"agent_visibility","in":"query","description":"Limit the roster, including its pinned row, to this audience. Omit for all authorized agents.","schema":{"type":"string","enum":["private","organization"]},"index$":3},{"name":"cursor","in":"query","schema":{"type":"string"},"index$":4},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":100},"index$":5}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"page_agent.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/page/activity"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let page_agent_ref01_data = Object.values(setup.data.existing.page_agent)[0] as any

    // LIST
    const page_agent_ref01_ent = client.PageAgent()
    const page_agent_ref01_match: any = {}
    page_agent_ref01_match['organization_id'] = setup.idmap['organization01']

    const page_agent_ref01_list = (await page_agent_ref01_ent.list(page_agent_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/page_agent/PageAgentTestData.json')

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
    ['page_agent01','page_agent02','page_agent03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PAGE_AGENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PAGE_AGENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PAGE_AGENT_ENTID']
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
  
