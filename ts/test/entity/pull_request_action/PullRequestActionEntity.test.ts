

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


describe('PullRequestActionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PullRequestAction()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PullRequestAction().create({"number":1,"organization_id":"x","pull_request_id":"x","action_name":"x","operation_key":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pull_request_action.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"action_name":{"a":true,"h":"Action Name","n":"action_name","r":true,"t":"`$STRING`","key$":"action_name","index$":0},"body":{"a":true,"h":"Body","n":"body","r":false,"t":"`$STRING`","key$":"body","index$":1},"comment_id":{"a":true,"h":"Comment Id","n":"comment_id","r":false,"t":"`$STRING`","key$":"comment_id","index$":2},"comments":{"a":true,"h":"Comments","n":"comments","r":false,"t":"`$ARRAY`","key$":"comments","index$":3},"event":{"a":true,"h":"Event","n":"event","r":false,"t":"`$STRING`","key$":"event","index$":4},"expected_head_sha":{"a":true,"h":"Expected Head Sha","n":"expected_head_sha","r":false,"t":"`$STRING`","key$":"expected_head_sha","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"id","index$":6},"label":{"a":true,"h":"Label","n":"label","r":false,"t":"`$STRING`","key$":"label","index$":7},"line":{"a":true,"h":"Line","n":"line","r":false,"t":"`$INTEGER`","key$":"line","index$":8},"node_id":{"a":true,"h":"Node Id","n":"node_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"node_id","index$":9},"operation_key":{"a":true,"h":"Operation Key","n":"operation_key","r":true,"t":"`$STRING`","key$":"operation_key","index$":10},"path":{"a":true,"h":"Path","n":"path","r":false,"t":"`$STRING`","key$":"path","index$":11},"run_id":{"a":true,"h":"Run Id","n":"run_id","r":false,"t":"`$STRING`","key$":"run_id","index$":12},"side":{"a":true,"h":"Side","n":"side","r":false,"t":"`$STRING`","key$":"side","index$":13},"start_line":{"a":true,"h":"Start Line","n":"start_line","r":false,"t":"`$INTEGER`","key$":"start_line","index$":14},"start_side":{"a":true,"h":"Start Side","n":"start_side","r":false,"t":"`$STRING`","key$":"start_side","index$":15},"thread_id":{"a":true,"h":"Thread Id","n":"thread_id","r":false,"t":"`$STRING`","key$":"thread_id","index$":16}},"id":{"field":"id","name":"id"},"name":"pull_request_action","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["action_name","body","comment_id","comments","event","expected_head_sha","label","line","operation_key","path","run_id","side","start_line","start_side","thread_id"],"co":{"id":"POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/actions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"number","or":"number","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"number","or":"number","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"org_slug","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"param","n":"pull_request_id","or":"github_repository_id","r":true,"t":"`$STRING`","index$":4},{"a":true,"k":"param","n":"pull_request_id","or":"github_repository_id","r":true,"t":"`$STRING`","index$":5}]},"k":"http","m":"POST","o":"/api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/actions","q":{"exist":["number","organization_id","pull_request_id"]},"r":{"param":{"github_repository_id":"pull_request_id","number":"number","org_slug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github"},{"lit":"pull_requests"},{"var":"pull_request_id"},{"var":"number"},{"lit":"actions"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.pull_request"]]},"key$":"pull_request_action","name__orig":"pull_request_action","Name":"PullRequestAction","name_":"pull_request_action","name-":"pull-request-action","NAME":"PULL_REQUEST_ACTION","index$":405}, {"active":true,"entity":"pull_request_action","key$":"BasicPullRequestActionFlow","kind":"basic","name":"BasicPullRequestActionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pull_request_action_ref01"},"m":{"number":"number01","organization_id":"organization01","pull_request_id":"pull_request01"},"o":"create","s":[],"v":[],"index$":0}]}, 'PullRequestAction', {"POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/actions":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"operation_key":{"type":"string","key$":"operation_key"},"action_name":{"type":"string","enum":["comment","inline","reply","review","edit_comment","delete_comment","edit_inline","delete_inline","resolve","unresolve","add_label","remove_label","rerun","cancel_run"],"key$":"action_name"},"body":{"type":"string","key$":"body"},"expected_head_sha":{"type":"string","key$":"expected_head_sha"},"event":{"type":"string","enum":["COMMENT","APPROVE","REQUEST_CHANGES"],"key$":"event"},"path":{"type":"string","key$":"path"},"line":{"type":"integer","key$":"line"},"side":{"type":"string","enum":["LEFT","RIGHT"],"key$":"side"},"start_line":{"type":"integer","key$":"start_line"},"start_side":{"type":"string","key$":"start_side"},"comment_id":{"type":"string","key$":"comment_id"},"thread_id":{"type":"string","key$":"thread_id"},"label":{"type":"string","key$":"label"},"run_id":{"type":"string","key$":"run_id"},"comments":{"type":"array","maxItems":100,"items":{"type":"object","required":["path","line","side","body"],"properties":{"path":{"type":"string"},"line":{"type":"integer","minimum":1},"side":{"type":"string","enum":[]},"body":{"type":"string","minLength":1,"maxLength":65000}}},"key$":"comments"}},"required":["operation_key","action_name"],"additionalProperties":true,"x-ref":"#/components/schemas/GithubReviewMutation"}}}},"parameters":[{"name":"org_slug","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"github_repository_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"number","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"in":"path","name":"org_slug","required":true,"schema":{"type":"string"},"index$":3},{"in":"path","name":"github_repository_id","required":true,"schema":{"type":"string"},"index$":4},{"in":"path","name":"number","required":true,"schema":{"type":"string"},"index$":5}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"pull_request_action.create.0":"GET-only live run: needs POST /api/v1/organizations/{org_slug}/github/pull_requests/{github_repository_id}/{number}/actions"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const pull_request_action_ref01_ent = client.PullRequestAction()
    let pull_request_action_ref01_data = setup.data.new.pull_request_action['pull_request_action_ref01']
    pull_request_action_ref01_data['number'] = setup.idmap['number01']
    pull_request_action_ref01_data['organization_id'] = setup.idmap['organization01']
    pull_request_action_ref01_data['pull_request_id'] = setup.idmap['pull_request01']

    pull_request_action_ref01_data = (await pull_request_action_ref01_ent.create(pull_request_action_ref01_data)).data()
    assert(null != pull_request_action_ref01_data.id)


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
      '../../../../.sdk/test/entity/pull_request_action/PullRequestActionTestData.json')

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
    ['pull_request_action01','pull_request_action02','pull_request_action03','organization01','organization02','organization03','pull_request01','pull_request02','pull_request03','number01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PULL_REQUEST_ACTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PULL_REQUEST_ACTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PULL_REQUEST_ACTION_ENTID']
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
  
