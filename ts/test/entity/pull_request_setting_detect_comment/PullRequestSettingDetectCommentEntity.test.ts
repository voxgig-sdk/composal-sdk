

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


describe('PullRequestSettingDetectCommentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PullRequestSettingDetectComment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PullRequestSettingDetectComment().create({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pull_request_setting_detect_comment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bots":{"a":true,"h":"Bots","n":"bots","r":false,"sh":"The bots answer","t":"`$ARRAY`","key$":"bots","index$":0},"deployment":{"a":true,"h":"Deployment","n":"deployment","r":false,"sh":"The deployment answer","t":"`$STRING`","key$":"deployment","index$":1},"example_url":{"a":true,"h":"Example Url","n":"example_url","r":false,"t":"`$STRING`","key$":"example_url","index$":2},"imessage_comment_prefix":{"a":true,"h":"Imessage Comment Prefix","n":"imessage_comment_prefix","r":false,"t":"`$STRING`","key$":"imessage_comment_prefix","index$":3},"imessage_number":{"a":true,"h":"Imessage Number","n":"imessage_number","r":false,"sh":"International destination number; blank or null clears it on an added environment.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"imessage_number","index$":4},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":5},"link_pattern":{"a":true,"h":"Link Pattern","n":"link_pattern","r":false,"sh":"The link_pattern answer","t":"`$STRING`","key$":"link_pattern","index$":6},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"sh":"Project slug or ID.","t":"`$STRING`","key$":"project_id","index$":7},"provider":{"a":true,"h":"Provider","n":"provider","r":false,"sh":"Who builds the previews, such as Vercel or GitLab","t":"`$STRING`","key$":"provider","index$":8},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":false,"sh":"Repository slug, ID or owner/name.","t":"`$STRING`","key$":"repository_id","index$":9},"request_number":{"a":true,"h":"Request Number","n":"request_number","r":false,"t":"`$INTEGER`","key$":"request_number","index$":10}},"name":"pull_request_setting_detect_comment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["project_id","repository_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"pull_request_settings"},{"lit":"detect_comments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"pull_request_setting_detect_comment","name__orig":"pull_request_setting_detect_comment","Name":"PullRequestSettingDetectComment","name_":"pull_request_setting_detect_comment","name-":"pull-request-setting-detect-comment","NAME":"PULL_REQUEST_SETTING_DETECT_COMMENT","index$":409}, {"active":true,"entity":"pull_request_setting_detect_comment","key$":"BasicPullRequestSettingDetectCommentFlow","kind":"basic","name":"BasicPullRequestSettingDetectCommentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pull_request_setting_detect_comment_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0}]}, 'PullRequestSettingDetectComment', {"POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["project_id"],"properties":{"project_id":{"type":"string","description":"Project slug or ID.","key$":"project_id"},"repository_id":{"type":"string","description":"Repository slug, ID or owner/name. Defaults to the project's configured or only repository.","key$":"repository_id"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"pull_request_setting_detect_comment.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_comments"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const pull_request_setting_detect_comment_ref01_ent = client.PullRequestSettingDetectComment()
    let pull_request_setting_detect_comment_ref01_data = setup.data.new.pull_request_setting_detect_comment['pull_request_setting_detect_comment_ref01']
    pull_request_setting_detect_comment_ref01_data['organization_id'] = setup.idmap['organization01']

    pull_request_setting_detect_comment_ref01_data = (await pull_request_setting_detect_comment_ref01_ent.create(pull_request_setting_detect_comment_ref01_data)).data()
    assert(null != pull_request_setting_detect_comment_ref01_data)


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
      '../../../../.sdk/test/entity/pull_request_setting_detect_comment/PullRequestSettingDetectCommentTestData.json')

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
    ['pull_request_setting_detect_comment01','pull_request_setting_detect_comment02','pull_request_setting_detect_comment03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PULL_REQUEST_SETTING_DETECT_COMMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PULL_REQUEST_SETTING_DETECT_COMMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PULL_REQUEST_SETTING_DETECT_COMMENT_ENTID']
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
  
