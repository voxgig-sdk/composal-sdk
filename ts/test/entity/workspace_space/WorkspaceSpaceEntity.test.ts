

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


describe('WorkspaceSpaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.WorkspaceSpace()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.WorkspaceSpace().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'workspace_space.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":0},"default_branch":{"a":true,"h":"Default Branch","n":"default_branch","r":false,"t":"`$STRING`","key$":"default_branch","index$":1},"description":{"a":true,"h":"Description","n":"description","op":{"create":{"req":false,"type":["`$ONE`",["`$STRING`","`$NULL`"]]}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":2},"hidden":{"a":true,"h":"Hidden","n":"hidden","r":true,"t":"`$BOOLEAN`","key$":"hidden","index$":3},"icon_name":{"a":true,"h":"Icon Name","n":"icon_name","r":true,"t":"`$STRING`","key$":"icon_name","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"import_status":{"a":true,"h":"Import Status","n":"import_status","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"import_status","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":7},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":8},"position":{"a":true,"h":"Position","n":"position","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"position","index$":9},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":true,"t":"`$STRING`","key$":"repository_id","index$":10},"repository_slug":{"a":true,"h":"Repository Slug","n":"repository_slug","r":true,"t":"`$STRING`","key$":"repository_slug","index$":11},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":12},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":14}},"id":{"field":"id","name":"id"},"name":"workspace_space","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["default_branch","description","icon_name","name","slug"],"co":{"id":"POST /api/v1/organizations/{organization_id}/workspace_spaces","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/workspace_spaces","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"workspace_spaces"}],"t":{"req":"`reqdata`","res":"`body.space`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/workspace_spaces","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/workspace_spaces","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"workspace_spaces"}],"t":{"req":"`reqdata`","res":"`body.spaces`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/workspace_spaces/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/workspace_spaces/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"workspace_spaces"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.space`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"workspace_space","name__orig":"workspace_space","Name":"WorkspaceSpace","name_":"workspace_space","name-":"workspace-space","NAME":"WORKSPACE_SPACE","index$":553}, {"active":true,"entity":"workspace_space","key$":"BasicWorkspaceSpaceFlow","kind":"basic","name":"BasicWorkspaceSpaceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"workspace_space_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"workspace_space_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"workspace_space_ref01","srcdatavar":"workspace_space_ref01_data","suffix":"_dt0"},"m":{"id":"workspace_space01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-workspace_space_ref01"}}],"index$":2,"route":"GET /api/v1/organizations/{organization_id}/workspace_spaces/{id}","record":{"organization_id":"organization_id"}}]}, 'WorkspaceSpace', {"POST /api/v1/organizations/{organization_id}/workspace_spaces":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["slug","name","icon_name"],"properties":{"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"description":{"type":"string","nullable":true,"key$":"description"},"default_branch":{"type":"string","key$":"default_branch"},"icon_name":{"type":"string","enum":["book-open","boxes","briefcase-business","code-xml","file-text","folder","folder-code","globe-2","lightbulb","panel-top","rocket","server","shield-check","sparkles","terminal"],"key$":"icon_name"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/workspace_spaces":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/workspace_spaces/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"workspace_space.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/workspace_spaces"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const workspace_space_ref01_ent = client.WorkspaceSpace()
    let workspace_space_ref01_data = setup.data.new.workspace_space['workspace_space_ref01']
    workspace_space_ref01_data['organization_id'] = setup.idmap['organization01']

    workspace_space_ref01_data = (await workspace_space_ref01_ent.create(workspace_space_ref01_data)).data()
    assert(null != workspace_space_ref01_data.id)


    // LIST
    const workspace_space_ref01_match: any = {}
    workspace_space_ref01_match['organization_id'] = setup.idmap['organization01']

    const workspace_space_ref01_list = (await workspace_space_ref01_ent.list(workspace_space_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(workspace_space_ref01_list, { id: workspace_space_ref01_data.id })))


    // LOAD
    const workspace_space_ref01_match_dt0: any = {}
    workspace_space_ref01_match_dt0.id = workspace_space_ref01_data.id
    workspace_space_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof workspace_space_ref01_data['organization_id']) ?
      workspace_space_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const workspace_space_ref01_data_dt0 = (await workspace_space_ref01_ent.load(workspace_space_ref01_match_dt0)).data()
    assert(workspace_space_ref01_data_dt0.id === workspace_space_ref01_data.id)


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
      '../../../../.sdk/test/entity/workspace_space/WorkspaceSpaceTestData.json')

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
    ['workspace_space01','workspace_space02','workspace_space03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_WORKSPACE_SPACE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_WORKSPACE_SPACE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_WORKSPACE_SPACE_ENTID']
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
  
