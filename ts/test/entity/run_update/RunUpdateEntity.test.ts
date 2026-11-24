

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


describe('RunUpdateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RunUpdate()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RunUpdate().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'run_update.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"base_sha":{"a":true,"h":"Base Sha","n":"base_sha","r":true,"t":"`$STRING`","key$":"base_sha","index$":0},"can_verify":{"a":true,"h":"Can Verify","n":"can_verify","r":true,"t":"`$BOOLEAN`","key$":"can_verify","index$":1},"comment_url":{"a":true,"h":"Comment Url","n":"comment_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"comment_url","index$":2},"draft":{"a":true,"h":"Draft","n":"draft","r":true,"t":"`$BOOLEAN`","key$":"draft","index$":3},"github_repository":{"a":true,"h":"Github Repository","n":"github_repository","r":true,"sh":"GitHub owner/repository associated with this pull request.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"github_repository","index$":4},"github_url":{"a":true,"h":"Github Url","n":"github_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"github_url","index$":5},"head_sha":{"a":true,"h":"Head Sha","n":"head_sha","r":true,"t":"`$STRING`","key$":"head_sha","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"latest_created_at":{"a":true,"fo":"date-time","h":"Latest Created At","n":"latest_created_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"latest_created_at","index$":8},"latest_current":{"a":true,"h":"Latest Current","n":"latest_current","r":true,"t":"`$BOOLEAN`","key$":"latest_current","index$":9},"latest_head_sha":{"a":true,"h":"Latest Head Sha","n":"latest_head_sha","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"latest_head_sha","index$":10},"latest_reason":{"a":true,"h":"Latest Reason","n":"latest_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"latest_reason","index$":11},"latest_run_id":{"a":true,"h":"Latest Run Id","n":"latest_run_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"latest_run_id","index$":12},"latest_state":{"a":true,"h":"Latest State","n":"latest_state","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"latest_state","index$":13},"number":{"a":true,"h":"Number","n":"number","r":true,"t":"`$INTEGER`","key$":"number","index$":14},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"project_id","index$":15},"project_slug":{"a":true,"h":"Project Slug","n":"project_slug","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"project_slug","index$":16},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"t":"`$STRING`","key$":"provider","index$":17},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":true,"t":"`$STRING`","key$":"repository_id","index$":18},"request_label":{"a":true,"h":"Request Label","n":"request_label","r":true,"t":"`$STRING`","key$":"request_label","index$":19},"source_branch":{"a":true,"h":"Source Branch","n":"source_branch","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_branch","index$":20},"source_repository":{"a":true,"h":"Source Repository","n":"source_repository","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_repository","index$":21},"source_url":{"a":true,"h":"Source Url","n":"source_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_url","index$":22},"state":{"a":true,"h":"State","n":"state","r":true,"t":"`$STRING`","key$":"state","index$":23},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":24},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":25},"web_path":{"a":true,"h":"Web Path","n":"web_path","r":true,"t":"`$STRING`","key$":"web_path","index$":26}},"id":{"field":"id","name":"id"},"name":"run_update","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/run_updates","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"query","or":"query","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"explode":true,"k":"query","n":"verify_environment_id","or":"verify_environment_id","r":false,"style":"form","t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/run_updates","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"run_updates"}],"t":{"req":"`reqdata`","res":"`body.pull_requests`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"run_update","name__orig":"run_update","Name":"RunUpdate","name_":"run_update","name-":"run-update","NAME":"RUN_UPDATE","index$":456}, {"active":true,"entity":"run_update","key$":"BasicRunUpdateFlow","kind":"basic","name":"BasicRunUpdateFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"run_update_ref01"}}],"index$":0}]}, 'RunUpdate', {"GET /api/v1/organizations/{organization_id}/verify/run_updates":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"page","in":"query","schema":{"type":"integer","minimum":1},"index$":1},{"name":"verify_environment_id","in":"query","schema":{"type":"string"},"index$":2},{"name":"query","in":"query","schema":{"type":"string","maxLength":200},"index$":3},{"name":"status","in":"query","schema":{"type":"string","enum":["all","active","passed","failed","cancelled","timed_out","blocked","skipped","cleanup_blocked"]},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let run_update_ref01_data = Object.values(setup.data.existing.run_update)[0] as any

    // LIST
    const run_update_ref01_ent = client.RunUpdate()
    const run_update_ref01_match: any = {}
    run_update_ref01_match['organization_id'] = setup.idmap['organization01']

    const run_update_ref01_list = (await run_update_ref01_ent.list(run_update_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/run_update/RunUpdateTestData.json')

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
    ['run_update01','run_update02','run_update03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_RUN_UPDATE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_RUN_UPDATE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_RUN_UPDATE_ENTID']
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
  
