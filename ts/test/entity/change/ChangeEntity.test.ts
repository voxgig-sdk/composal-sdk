

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


describe('ChangeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Change()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Change().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'change.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"counts":{"a":true,"h":"Counts","n":"counts","r":true,"sh":"Counts for each state across the active non-state filters.","t":"`$OBJECT`","key$":"counts","index$":0},"filters":{"a":true,"h":"Filters","n":"filters","r":true,"t":"`$OBJECT`","key$":"filters","index$":1},"github_sync":{"a":true,"h":"Github Sync","n":"github_sync","r":true,"t":"`$OBJECT`","key$":"github_sync","index$":2},"result":{"a":true,"h":"Result","n":"result","r":true,"sh":"What this page is a page of.","t":"`$ANY`","union":{"branches":4,"count":6,"depth":9},"key$":"result","index$":3}},"name":"change","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{org_slug}/changes","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"author","or":"author","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"awaiting_review","or":"awaiting_review","r":false,"style":"form","t":"`$BOOLEAN`","index$":1},{"a":true,"ex":"desc","explode":true,"k":"query","n":"direction","or":"direction","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"group_page","or":"group_pages","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"label","or":"label","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"mine","or":"mine","r":false,"style":"form","t":"`$BOOLEAN`","index$":5},{"a":true,"explode":true,"k":"query","n":"number","or":"number","r":false,"style":"form","t":"`$INTEGER`","index$":6},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":7},{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":8},{"a":true,"explode":true,"k":"query","n":"repo","or":"repo","r":false,"style":"form","t":"`$STRING`","index$":9},{"a":true,"ex":"submitted","explode":true,"k":"query","n":"sort","or":"sort","r":false,"style":"form","t":"`$STRING`","index$":10},{"a":true,"explode":true,"k":"query","n":"source","or":"source","r":false,"style":"form","t":"`$STRING`","index$":11},{"a":true,"explode":true,"k":"query","n":"stack","or":"stack","r":false,"style":"form","t":"`$STRING`","index$":12},{"a":true,"explode":true,"k":"query","n":"state","or":"state","r":false,"style":"form","t":"`$STRING`","index$":13},{"a":true,"explode":true,"k":"query","n":"target","or":"target","r":false,"style":"form","t":"`$STRING`","index$":14},{"a":true,"explode":true,"k":"query","n":"tips_only","or":"tips_only","r":false,"style":"form","t":"`$BOOLEAN`","index$":15},{"a":true,"ex":"list","explode":true,"k":"query","n":"view","or":"view","r":false,"style":"form","t":"`$STRING`","index$":16}]},"k":"http","m":"GET","o":"/api/v1/organizations/{org_slug}/changes","q":{"exist":["organization_id"]},"r":{"param":{"org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"changes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"change","name__orig":"change","Name":"Change","name_":"change","name-":"change","NAME":"CHANGE","index$":156}, {"active":true,"entity":"change","key$":"BasicChangeFlow","kind":"basic","name":"BasicChangeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"change_ref01"}}],"index$":0}]}, 'Change', {"GET /api/v1/organizations/{org_slug}/changes":{"protocol":"http","parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"source","in":"query","schema":{"type":"string","enum":["all","vex","github"]},"index$":1},{"name":"q","in":"query","required":false,"schema":{"type":"string"},"index$":2},{"name":"state","in":"query","required":false,"schema":{"type":"string","enum":["open","needs_review","changes_requested","approved","ready_to_land","landed","abandoned","folded","orphaned","needs_restack"]},"index$":3},{"name":"repo","in":"query","required":false,"schema":{"type":"string"},"index$":4},{"name":"author","in":"query","required":false,"description":"Public ID of the user who created the change.","schema":{"type":"string"},"index$":5},{"name":"mine","in":"query","required":false,"schema":{"type":"boolean"},"index$":6},{"name":"tips_only","in":"query","required":false,"description":"Show only active stack tips and standalone changes.","schema":{"type":"boolean"},"index$":7},{"name":"awaiting_review","in":"query","required":false,"description":"Only open changes that explicitly request a current patchset review from the signed-in user. Excludes changes authored by that user.","schema":{"type":"boolean"},"index$":8},{"name":"target","in":"query","required":false,"schema":{"type":"string"},"index$":9},{"name":"stack","in":"query","required":false,"description":"Durable stack code or the stack's optional human alias.","schema":{"type":"string"},"index$":10},{"name":"sort","in":"query","required":false,"schema":{"type":"string","enum":["submitted","updated","number"],"default":"submitted"},"index$":11},{"name":"direction","in":"query","required":false,"schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":12},{"name":"view","in":"query","required":false,"description":"Return paginated groups instead of the flat change list. `stack` groups by active stack, `author` by the user who created each change, and `created_time` by rolling period.","schema":{"type":"string","enum":["list","stack","author","created_time"],"default":"list"},"index$":13},{"name":"number","in":"query","required":false,"schema":{"type":"integer","minimum":1},"index$":14},{"name":"label","in":"query","required":false,"description":"Label slug. Repeat the parameter or comma-separate values to require every label.","schema":{"type":"string"},"index$":15},{"name":"page","in":"query","required":false,"description":"Outer page. Selects changes in the list view and group keys in a grouped view. Ignored by `created_time`, whose four periods are all returned.","schema":{"type":"integer","minimum":1,"default":1},"index$":16},{"name":"group_pages","in":"query","required":false,"description":"Inner page positions, as a comma-separated list of `key:page` pairs such as `usr_a:3,usr_b:2`. Keys are the group keys this endpoint returned. Unknown, duplicate, malformed, and currently invisible keys are ignored, and a page past the end of a group resolves to that group's last page.","schema":{"type":"string"},"index$":17}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let change_ref01_data = Object.values(setup.data.existing.change)[0] as any

    // LIST
    const change_ref01_ent = client.Change()
    const change_ref01_match: any = {}
    change_ref01_match['organization_id'] = setup.idmap['organization01']

    const change_ref01_list = (await change_ref01_ent.list(change_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/change/ChangeTestData.json')

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
    ['change01','change02','change03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CHANGE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CHANGE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CHANGE_ENTID']
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
  
