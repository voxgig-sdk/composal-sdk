

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


describe('PageArtefactEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PageArtefact()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PageArtefact().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'page_artefact.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"artefact":{"a":true,"h":"Artefact","n":"artefact","r":true,"t":"`$ANY`","key$":"artefact","index$":0},"automation":{"a":true,"h":"Automation","n":"automation","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"automation","index$":1},"automation_invocation_id":{"a":true,"h":"Automation Invocation Id","n":"automation_invocation_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"automation_invocation_id","index$":2},"byte_size":{"a":true,"h":"Byte Size","n":"byte_size","r":true,"t":"`$INTEGER`","key$":"byte_size","index$":3},"checksum_sha256":{"a":true,"h":"Checksum Sha256","n":"checksum_sha256","r":true,"t":"`$STRING`","key$":"checksum_sha256","index$":4},"comment_threads":{"a":true,"h":"Comment Threads","n":"comment_threads","r":true,"t":"`$ARRAY`","key$":"comment_threads","index$":5},"content_type":{"a":true,"h":"Content Type","n":"content_type","r":true,"t":"`$STRING`","key$":"content_type","index$":6},"created_at":{"a":true,"h":"Created At","n":"created_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at","index$":7},"created_by_user_id":{"a":true,"h":"Created By User Id","n":"created_by_user_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_by_user_id","index$":8},"description":{"a":true,"h":"Description","n":"description","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":9},"document_key":{"a":true,"h":"Document Key","n":"document_key","r":false,"sh":"Stable document identity shared by all revisions.","t":"`$STRING`","key$":"document_key","index$":10},"draft":{"a":true,"h":"Draft","n":"draft","r":true,"sh":"The autosaved working copy of the newest Markdown version; null for older versions and other files.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"draft","index$":11},"entrypoint":{"a":true,"h":"Entrypoint","n":"entrypoint","r":false,"t":"`$STRING`","key$":"entrypoint","index$":12},"expires_at":{"a":true,"h":"Expires At","n":"expires_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"expires_at","index$":13},"filename":{"a":true,"h":"Filename","n":"filename","r":true,"t":"`$STRING`","key$":"filename","index$":14},"files":{"a":true,"h":"Files","n":"files","r":false,"t":"`$ARRAY`","key$":"files","index$":15},"harness":{"a":true,"h":"Harness","n":"harness","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"harness","index$":16},"harness_version":{"a":true,"h":"Harness Version","n":"harness_version","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"harness_version","index$":17},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":18},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":19},"kinds":{"a":true,"h":"Kinds","n":"kinds","r":true,"t":"`$ARRAY`","key$":"kinds","index$":20},"model":{"a":true,"h":"Model","n":"model","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"model","index$":21},"organization":{"a":true,"h":"Organization","n":"organization","r":true,"t":"`$OBJECT`","key$":"organization","index$":22},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":23},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":true,"t":"`$OBJECT`","key$":"pagination","index$":24},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":25},"preview":{"a":true,"h":"Preview","n":"preview","r":true,"t":"`$OBJECT`","key$":"preview","index$":26},"published_at":{"a":true,"h":"Published At","n":"published_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"published_at","index$":27},"published_at_label":{"a":true,"h":"Published At Label","n":"published_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"published_at_label","index$":28},"publisher":{"a":true,"h":"Publisher","n":"publisher","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"publisher","index$":29},"repository":{"a":true,"h":"Repository","n":"repository","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"repository","index$":30},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_id","index$":31},"selected_path":{"a":true,"h":"Selected Path","n":"selected_path","r":false,"t":"`$STRING`","key$":"selected_path","index$":32},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":33},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":34},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":35},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":36},"vcs_agent_checkpoint_id":{"a":true,"h":"Vcs Agent Checkpoint Id","n":"vcs_agent_checkpoint_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"vcs_agent_checkpoint_id","index$":37},"vcs_agent_session_id":{"a":true,"h":"Vcs Agent Session Id","n":"vcs_agent_session_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"vcs_agent_session_id","index$":38},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":39},"versions":{"a":true,"h":"Versions","n":"versions","r":true,"t":"`$ARRAY`","key$":"versions","index$":40},"view_url":{"a":true,"fo":"uri","h":"View Url","n":"view_url","r":true,"t":"`$STRING`","key$":"view_url","index$":41},"web_url":{"a":true,"fo":"uri","h":"Web Url","n":"web_url","r":true,"t":"`$STRING`","key$":"web_url","index$":42}},"id":{"field":"id","name":"id"},"name":"page_artefact","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/artefacts/page","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"author","or":"author","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"harness","or":"harness","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"kind","or":"kind","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"model","or":"model","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":4},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"repo","or":"repo","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"slug","or":"slug","r":false,"style":"form","t":"`$STRING`","index$":7},{"a":true,"explode":true,"k":"query","n":"source","or":"source","r":false,"style":"form","t":"`$STRING`","index$":8}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/artefacts/page","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"lit":"page"}],"t":{"page":{"next":"`body.pagination.next`","total":"`body.pagination.count`"},"req":"`reqdata`","res":"`body.artefacts`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/page","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"artefact_ref","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"file","or":"file","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"version","or":"version","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"explode":true,"k":"query","n":"versions_page","or":"versions_page","r":false,"style":"form","t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/page","q":{"exist":["id","organization_id"]},"r":{"param":{"artefact_ref":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"artefacts"},{"var":"id"},{"lit":"page"}],"t":{"req":"`reqdata`","res":"`body.artefact`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"page_artefact","name__orig":"page_artefact","Name":"PageArtefact","name_":"page_artefact","name-":"page-artefact","NAME":"PAGE_ARTEFACT","index$":357}, {"active":true,"entity":"page_artefact","key$":"BasicPageArtefactFlow","kind":"basic","name":"BasicPageArtefactFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"page_artefact_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"page_artefact_ref01","srcdatavar":"page_artefact_ref01_data","suffix":"_dt0"},"m":{"id":"page_artefact01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-page_artefact_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/page","record":{"organization_id":"organization_id"}}]}, 'PageArtefact', {"GET /api/v1/organizations/{organization_id}/artefacts/page":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"page","in":"query","schema":{"type":"integer","minimum":1},"index$":1},{"name":"q","in":"query","schema":{"type":"string","maxLength":200},"index$":2},{"name":"kind","in":"query","schema":{"type":"string","maxLength":200},"index$":3},{"name":"harness","in":"query","schema":{"type":"string","maxLength":200},"index$":4},{"name":"model","in":"query","schema":{"type":"string","maxLength":200},"index$":5},{"name":"author","in":"query","schema":{"type":"string","maxLength":200},"index$":6},{"name":"repo","in":"query","schema":{"type":"string","maxLength":200},"index$":7},{"name":"slug","in":"query","schema":{"type":"string","maxLength":200},"index$":8},{"name":"source","in":"query","schema":{"type":"string","enum":["automation","agent","user"]},"index$":9}]},"GET /api/v1/organizations/{organization_id}/artefacts/{artefact_ref}/page":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"artefact_ref","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"version","in":"query","schema":{"type":"integer","minimum":1},"index$":2},{"name":"versions_page","in":"query","schema":{"type":"integer","minimum":1},"index$":3},{"name":"file","in":"query","schema":{"type":"string","maxLength":500},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let page_artefact_ref01_data = Object.values(setup.data.existing.page_artefact)[0] as any

    // LIST
    const page_artefact_ref01_ent = client.PageArtefact()
    const page_artefact_ref01_match: any = {}
    page_artefact_ref01_match['organization_id'] = setup.idmap['organization01']

    const page_artefact_ref01_list = (await page_artefact_ref01_ent.list(page_artefact_ref01_match)).map((e: any) => e.data())


    // LOAD
    const page_artefact_ref01_match_dt0: any = {}
    page_artefact_ref01_match_dt0.id = page_artefact_ref01_data.id
    page_artefact_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof page_artefact_ref01_data['organization_id']) ?
      page_artefact_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const page_artefact_ref01_data_dt0 = (await page_artefact_ref01_ent.load(page_artefact_ref01_match_dt0)).data()
    assert(page_artefact_ref01_data_dt0.id === page_artefact_ref01_data.id)


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
      '../../../../.sdk/test/entity/page_artefact/PageArtefactTestData.json')

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
    ['page_artefact01','page_artefact02','page_artefact03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PAGE_ARTEFACT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PAGE_ARTEFACT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PAGE_ARTEFACT_ENTID']
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
  
