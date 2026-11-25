

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


describe('GithubCiRepositoryCompatibilityReportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GithubCiRepositoryCompatibilityReport()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GithubCiRepositoryCompatibilityReport().list({"github_ci_repository_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_ci_repository_compatibility_report.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"analyzed_at":{"a":true,"fo":"date-time","h":"Analyzed At","n":"analyzed_at","r":true,"t":"`$STRING`","key$":"analyzed_at","index$":0},"analyzed_at_label":{"a":true,"h":"Analyzed At Label","n":"analyzed_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"analyzed_at_label","index$":1},"ci_pipeline_id":{"a":true,"h":"Ci Pipeline Id","n":"ci_pipeline_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ci_pipeline_id","index$":2},"ci_pipeline_run_id":{"a":true,"h":"Ci Pipeline Run Id","n":"ci_pipeline_run_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ci_pipeline_run_id","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":4},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":5},"diagnostics":{"a":true,"h":"Diagnostics","n":"diagnostics","r":true,"t":"`$ARRAY`","key$":"diagnostics","index$":6},"errors":{"a":true,"h":"Errors","n":"errors","r":true,"t":"`$ARRAY`","key$":"errors","index$":7},"event_action":{"a":true,"h":"Event Action","n":"event_action","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"event_action","index$":8},"event_name":{"a":true,"h":"Event Name","n":"event_name","r":true,"t":"`$STRING`","key$":"event_name","index$":9},"execution_allowed":{"a":true,"h":"Execution Allowed","n":"execution_allowed","r":true,"t":"`$BOOLEAN`","key$":"execution_allowed","index$":10},"github_ci_repository_id":{"a":true,"h":"Github Ci Repository Id","n":"github_ci_repository_id","r":true,"t":"`$STRING`","key$":"github_ci_repository_id","index$":11},"head_sha":{"a":true,"h":"Head Sha","n":"head_sha","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"head_sha","index$":12},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":13},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":true,"t":"`$OBJECT`","key$":"metadata","index$":14},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":15},"parser_version":{"a":true,"h":"Parser Version","n":"parser_version","r":true,"t":"`$STRING`","key$":"parser_version","index$":16},"pull_request_number":{"a":true,"h":"Pull Request Number","n":"pull_request_number","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"pull_request_number","index$":17},"ref_name":{"a":true,"h":"Ref Name","n":"ref_name","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ref_name","index$":18},"referenced_actions":{"a":true,"h":"Referenced Actions","n":"referenced_actions","r":true,"t":"`$ARRAY`","key$":"referenced_actions","index$":19},"required_secrets":{"a":true,"h":"Required Secrets","n":"required_secrets","r":true,"t":"`$ARRAY`","key$":"required_secrets","index$":20},"runner_labels":{"a":true,"h":"Runner Labels","n":"runner_labels","r":true,"t":"`$ARRAY`","key$":"runner_labels","index$":21},"source_blob_sha":{"a":true,"h":"Source Blob Sha","n":"source_blob_sha","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_blob_sha","index$":22},"source_sha":{"a":true,"h":"Source Sha","n":"source_sha","r":true,"t":"`$STRING`","key$":"source_sha","index$":23},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":24},"supported_features":{"a":true,"h":"Supported Features","n":"supported_features","r":true,"t":"`$OBJECT`","key$":"supported_features","index$":25},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":26},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":27},"warnings":{"a":true,"h":"Warnings","n":"warnings","r":true,"t":"`$ARRAY`","key$":"warnings","index$":28},"workflow_name":{"a":true,"h":"Workflow Name","n":"workflow_name","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"workflow_name","index$":29},"workflow_path":{"a":true,"h":"Workflow Path","n":"workflow_path","r":true,"t":"`$STRING`","key$":"workflow_path","index$":30}},"id":{"field":"id","name":"id"},"name":"github_ci_repository_compatibility_report","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"github_ci_repository_id","or":"github_ci_repository_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"event_name","or":"event_name","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"source_sha","or":"source_sha","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports","q":{"exist":["github_ci_repository_id","organization_id"]},"r":{"param":{"github_ci_repository_id":"github_ci_repository_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_ci_repositories"},{"var":"github_ci_repository_id"},{"lit":"compatibility_reports"}],"t":{"req":"`reqdata`","res":"`body.ci_workflow_compatibility_reports`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"github_ci_repository_id","or":"github_ci_repository_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports/{id}","q":{"exist":["github_ci_repository_id","id","organization_id"]},"r":{"param":{"github_ci_repository_id":"github_ci_repository_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_ci_repositories"},{"var":"github_ci_repository_id"},{"lit":"compatibility_reports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.github_ci_repository"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"github_ci_repository_compatibility_report","name__orig":"github_ci_repository_compatibility_report","Name":"GithubCiRepositoryCompatibilityReport","name_":"github_ci_repository_compatibility_report","name-":"github-ci-repository-compatibility-report","NAME":"GITHUB_CI_REPOSITORY_COMPATIBILITY_REPORT","index$":254}, {"active":true,"entity":"github_ci_repository_compatibility_report","key$":"BasicGithubCiRepositoryCompatibilityReportFlow","kind":"basic","name":"BasicGithubCiRepositoryCompatibilityReportFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"github_ci_repository_id":"github_ci_repository01","organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"github_ci_repository_compatibility_report_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"github_ci_repository_compatibility_report_ref01","srcdatavar":"github_ci_repository_compatibility_report_ref01_data","suffix":"_dt0"},"m":{"github_ci_repository_id":"github_ci_repository01","id":"github_ci_repository_compatibility_report01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-github_ci_repository_compatibility_report_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports/{id}","record":{"github_ci_repository_id":"github_ci_repository_id","organization_id":"organization_id"}}]}, 'GithubCiRepositoryCompatibilityReport', {"GET /api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"github_ci_repository_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"status","in":"query","required":false,"schema":{"type":"string","enum":["executable","warning","blocked","error"]},"index$":2},{"name":"source_sha","in":"query","required":false,"schema":{"type":"string"},"index$":3},{"name":"event_name","in":"query","required":false,"schema":{"type":"string"},"index$":4}]},"GET /api/v1/organizations/{organization_id}/github_ci_repositories/{github_ci_repository_id}/compatibility_reports/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"github_ci_repository_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let github_ci_repository_compatibility_report_ref01_data = Object.values(setup.data.existing.github_ci_repository_compatibility_report)[0] as any

    // LIST
    const github_ci_repository_compatibility_report_ref01_ent = client.GithubCiRepositoryCompatibilityReport()
    const github_ci_repository_compatibility_report_ref01_match: any = {}
    github_ci_repository_compatibility_report_ref01_match['github_ci_repository_id'] = setup.idmap['github_ci_repository01']
    github_ci_repository_compatibility_report_ref01_match['organization_id'] = setup.idmap['organization01']

    const github_ci_repository_compatibility_report_ref01_list = (await github_ci_repository_compatibility_report_ref01_ent.list(github_ci_repository_compatibility_report_ref01_match)).map((e: any) => e.data())


    // LOAD
    const github_ci_repository_compatibility_report_ref01_match_dt0: any = {}
    github_ci_repository_compatibility_report_ref01_match_dt0.id = github_ci_repository_compatibility_report_ref01_data.id
    github_ci_repository_compatibility_report_ref01_match_dt0['github_ci_repository_id'] = ['string', 'number', 'boolean'].includes(typeof github_ci_repository_compatibility_report_ref01_data['github_ci_repository_id']) ?
      github_ci_repository_compatibility_report_ref01_data['github_ci_repository_id'] : setup.idmap['github_ci_repository_id'] ?? setup.idmap['github_ci_repository01']
    github_ci_repository_compatibility_report_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof github_ci_repository_compatibility_report_ref01_data['organization_id']) ?
      github_ci_repository_compatibility_report_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const github_ci_repository_compatibility_report_ref01_data_dt0 = (await github_ci_repository_compatibility_report_ref01_ent.load(github_ci_repository_compatibility_report_ref01_match_dt0)).data()
    assert(github_ci_repository_compatibility_report_ref01_data_dt0.id === github_ci_repository_compatibility_report_ref01_data.id)


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
      '../../../../.sdk/test/entity/github_ci_repository_compatibility_report/GithubCiRepositoryCompatibilityReportTestData.json')

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
    ['github_ci_repository_compatibility_report01','github_ci_repository_compatibility_report02','github_ci_repository_compatibility_report03','organization01','organization02','organization03','github_ci_repository01','github_ci_repository02','github_ci_repository03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GITHUB_CI_REPOSITORY_COMPATIBILITY_REPORT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GITHUB_CI_REPOSITORY_COMPATIBILITY_REPORT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GITHUB_CI_REPOSITORY_COMPATIBILITY_REPORT_ENTID']
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
  
