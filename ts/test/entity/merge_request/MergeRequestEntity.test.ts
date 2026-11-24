

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


describe('MergeRequestEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.MergeRequest()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MergeRequest().load({"id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'merge_request.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"available_tests":{"a":true,"h":"Available Tests","n":"available_tests","r":true,"sh":"All active saved scenarios in the configured project, including scenarios outside the automatic selection.","t":"`$ARRAY`","key$":"available_tests","index$":0},"base_sha":{"a":true,"h":"Base Sha","n":"base_sha","r":true,"t":"`$STRING`","key$":"base_sha","index$":1},"branch":{"a":true,"h":"Branch","n":"branch","r":false,"sh":"Exact deployed source branch; refused if it differs from the canonical request branch.","t":"`$STRING`","key$":"branch","index$":2},"comment_url":{"a":true,"h":"Comment Url","n":"comment_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"comment_url","index$":3},"current_run":{"a":true,"h":"Current Run","n":"current_run","r":false,"sh":"Latest verification request if it matches the current head and base, independent of history pagination.","t":"`$ANY`","key$":"current_run","index$":4},"draft":{"a":true,"h":"Draft","n":"draft","r":true,"t":"`$BOOLEAN`","key$":"draft","index$":5},"findings":{"a":true,"h":"Findings","n":"findings","r":true,"t":"`$ARRAY`","key$":"findings","index$":6},"github_repository":{"a":true,"h":"Github Repository","n":"github_repository","r":true,"sh":"GitHub owner/repository associated with this pull request.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"github_repository","index$":7},"github_url":{"a":true,"h":"Github Url","n":"github_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"github_url","index$":8},"head_sha":{"a":true,"h":"Head Sha","n":"head_sha","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"If supplied, refuse to create a run unless this is the current PR head.","t":"`$STRING`","key$":"head_sha","index$":9},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":10},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":true,"t":"`$STRING`","key$":"idempotency_key","index$":11},"number":{"a":true,"h":"Number","n":"number","r":true,"t":"`$INTEGER`","key$":"number","index$":12},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":true,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":3},"key$":"pagination","index$":13},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":14},"preview_cleanup_ready":{"a":true,"h":"Preview Cleanup Ready","n":"preview_cleanup_ready","r":true,"sh":"The source is closed or merged and unfinished Scenario execution and Discovery have stopped.","t":"`$BOOLEAN`","key$":"preview_cleanup_ready","index$":15},"preview_url":{"a":true,"h":"Preview Url","n":"preview_url","r":false,"sh":"Most recently supplied preview URL for the current head commit, retained across verification attempts.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"preview_url","index$":16},"project":{"a":true,"h":"Project","n":"project","r":false,"t":"`$ANY`","key$":"project","index$":17},"project_id":{"a":true,"h":"Project Id","n":"project_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Composal project slug or public ID for PR preview environments.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"project_id","index$":18},"project_slug":{"a":true,"h":"Project Slug","n":"project_slug","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"project_slug","index$":19},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"t":"`$STRING`","key$":"provider","index$":20},"pull_request":{"a":true,"h":"Pull Request","n":"pull_request","r":true,"t":"`$OBJECT`","key$":"pull_request","index$":21},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"repository_id","index$":22},"request_label":{"a":true,"h":"Request Label","n":"request_label","r":true,"t":"`$STRING`","key$":"request_label","index$":23},"requested_run_id":{"a":true,"h":"Requested Run Id","n":"requested_run_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"requested_run_id","index$":24},"runs":{"a":true,"h":"Runs","n":"runs","r":true,"t":"`$ARRAY`","key$":"runs","index$":25},"source_branch":{"a":true,"h":"Source Branch","n":"source_branch","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_branch","index$":26},"source_repository":{"a":true,"h":"Source Repository","n":"source_repository","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_repository","index$":27},"source_url":{"a":true,"h":"Source Url","n":"source_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_url","index$":28},"state":{"a":true,"h":"State","n":"state","r":true,"t":"`$STRING`","key$":"state","index$":29},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":30},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":31},"web_path":{"a":true,"h":"Web Path","n":"web_path","r":true,"t":"`$STRING`","key$":"web_path","index$":32}},"id":{"field":"id","name":"id"},"name":"merge_request","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["head_sha","idempotency_key","scenario_ids"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun","q":{"$action":"rerun","exist":["id","organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"merge_requests"},{"var":"id"},{"lit":"rerun"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["branch","head_sha","idempotency_key","number","project_id","repository_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/merge_requests","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/merge_requests","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"merge_requests"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["branch","environment","head_sha","imessage_number","no_preview","number","preview_url","project_id","repository_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/merge_requests/preview","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/merge_requests/preview","q":{"$action":"preview","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"merge_requests"},{"lit":"preview"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/merge_requests/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/merge_requests/{id}","q":{"exist":["id","organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"merge_requests"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"merge_request","name__orig":"merge_request","Name":"MergeRequest","name_":"merge_request","name-":"merge-request","NAME":"MERGE_REQUEST","index$":135}, {"active":true,"entity":"merge_request","key$":"BasicMergeRequestFlow","kind":"basic","name":"BasicMergeRequestFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"merge_request_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"merge_request_ref01","srcdatavar":"merge_request_ref01_data","suffix":"_dt0"},"m":{"id":"merge_request01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-merge_request_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/verify/merge_requests/{id}","record":{}}]}, 'MergeRequest', {"POST /api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["idempotency_key"],"properties":{"idempotency_key":{"type":"string"},"head_sha":{"type":"string","description":"If supplied, refuse to create a run unless this is the current PR head."},"scenario_ids":{"type":"array","minItems":1,"items":{"type":"string"},"description":"Manually run these available project scenarios instead of automatic relevance selection."}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/verify/merge_requests":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["number","idempotency_key"],"properties":{"repository_id":{"type":"string","key$":"repository_id"},"number":{"type":"integer","key$":"number"},"idempotency_key":{"type":"string","key$":"idempotency_key"},"head_sha":{"type":"string","description":"If supplied, refuse to create a run unless this is the current PR head.","key$":"head_sha"},"project_id":{"type":"string","description":"Composal project slug or public ID for PR preview environments. Defaults to the configured template project. Cannot reassign a tracked PR.","key$":"project_id"},"branch":{"type":"string","description":"Exact deployed source branch; refused if it differs from the canonical request branch.","key$":"branch"}},"anyOf":[{"required":["project_id"]},{"required":["repository_id"]}]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/organizations/{organization_id}/verify/merge_requests/preview":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["number","head_sha"],"properties":{"repository_id":{"type":"string"},"number":{"type":"integer"},"head_sha":{"type":"string"},"environment":{"type":"string"},"preview_url":{"type":"string","format":"uri","description":"Deployed URL for this exact PR head. Requires an external Verify template. Mutually exclusive with environment."},"project_id":{"type":"string","description":"Composal project slug or public ID for PR preview environments. Defaults to the configured template project. Cannot reassign a tracked PR."},"branch":{"type":"string","description":"Exact deployed source branch; refused if it differs from the canonical request branch."},"no_preview":{"type":"boolean","enum":[true],"description":"CI built no preview because this commit changes nothing a preview serves. The commit's waiting run is skipped instead of timing out as blocked."},"imessage_number":{"type":"string","description":"International destination of this exact deployed commit. May accompany preview_url."}},"oneOf":[{"required":["environment"]},{"anyOf":[{"required":["preview_url"]},{"required":["imessage_number"]}]},{"required":["no_preview"]}],"anyOf":[{"required":["project_id"]},{"required":["repository_id"]}]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/verify/merge_requests/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"page","in":"query","schema":{"type":"integer"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"merge_request.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/merge_requests/{id}/rerun","merge_request.load.1":"GET-only live run: reads a record only merge_request.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const merge_request_ref01_ent = client.MergeRequest()
    let merge_request_ref01_data = setup.data.new.merge_request['merge_request_ref01']
    merge_request_ref01_data['organization_id'] = setup.idmap['organization01']

    merge_request_ref01_data = (await merge_request_ref01_ent.create(merge_request_ref01_data)).data()
    assert(null != merge_request_ref01_data.id)


    // LOAD
    const merge_request_ref01_match_dt0: any = {}
    merge_request_ref01_match_dt0.id = merge_request_ref01_data.id
    merge_request_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const merge_request_ref01_data_dt0 = (await merge_request_ref01_ent.load(merge_request_ref01_match_dt0)).data()
    assert(merge_request_ref01_data_dt0.id === merge_request_ref01_data.id)


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
      '../../../../.sdk/test/entity/merge_request/MergeRequestTestData.json')

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
    ['merge_request01','merge_request02','merge_request03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_MERGE_REQUEST_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_MERGE_REQUEST_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_MERGE_REQUEST_ENTID']
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
  
