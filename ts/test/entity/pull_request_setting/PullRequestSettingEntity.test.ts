

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


describe('PullRequestSettingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PullRequestSetting()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PullRequestSetting().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pull_request_setting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_preview_profile_id":{"a":true,"h":"App Preview Profile Id","n":"app_preview_profile_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_preview_profile_id","index$":0},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_service_id","index$":1},"bots":{"a":true,"h":"Bots","n":"bots","r":true,"sh":"hosting: bot accounts that comment the preview link, such as netlify[bot].","t":"`$ARRAY`","key$":"bots","index$":2},"browser_options_available":{"a":true,"h":"Browser Options Available","n":"browser_options_available","r":true,"sh":"Whether browser demo and scenario-writing options apply to this saved repository setup.","t":"`$BOOLEAN`","key$":"browser_options_available","index$":3},"ci_preview":{"a":true,"h":"Ci Preview","n":"ci_preview","r":true,"sh":"The latest preview the project's CI handed over, while the saved setting uses CI","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"ci_preview","index$":4},"concurrency":{"a":true,"h":"Concurrency","n":"concurrency","r":false,"sh":"Up to 50 parallel browsers per run, lowered only by an explicit administrator override.","t":"`$INTEGER`","key$":"concurrency","index$":5},"configured_repository":{"a":true,"h":"Configured Repository","n":"configured_repository","r":true,"t":"`$ANY`","key$":"configured_repository","index$":6},"demo_videos":{"a":true,"h":"Demo Videos","n":"demo_videos","r":true,"sh":"Record a short walkthrough of the change and add it to the PR comment.","t":"`$BOOLEAN`","key$":"demo_videos","index$":7},"demo_videos_enabled":{"a":true,"h":"Demo Videos Enabled","n":"demo_videos_enabled","r":false,"sh":"Record a short walkthrough of the change and add it to the PR comment.","t":"`$BOOLEAN`","key$":"demo_videos_enabled","index$":8},"deployment":{"a":true,"h":"Deployment","n":"deployment","r":true,"sh":"hosting: the deployment environment name the host reports on each PR, such as Preview.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"deployment","index$":9},"deployment_environment":{"a":true,"h":"Deployment Environment","n":"deployment_environment","r":false,"t":"`$STRING`","key$":"deployment_environment","index$":10},"enabled":{"a":true,"h":"Enabled","n":"enabled","r":true,"sh":"Test PRs automatically.","t":"`$BOOLEAN`","key$":"enabled","index$":11},"environment":{"a":true,"h":"Environment","n":"environment","r":true,"sh":"The environment whose test accounts sign in to the previews.","t":"`$STRING`","key$":"environment","index$":12},"environments":{"a":true,"h":"Environments","n":"environments","r":true,"t":"`$ARRAY`","key$":"environments","index$":13},"github_check_enabled":{"a":true,"h":"Github Check Enabled","n":"github_check_enabled","r":false,"sh":"Report the Composal Verify check on GitHub pull requests.","t":"`$BOOLEAN`","key$":"github_check_enabled","index$":14},"hosting_presets":{"a":true,"h":"Hosting Presets","n":"hosting_presets","r":true,"sh":"Hosting services that build PR previews and the setup answers each needs","t":"`$ARRAY`","key$":"hosting_presets","index$":15},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":16},"imessage_comment_prefix":{"a":true,"h":"Imessage Comment Prefix","n":"imessage_comment_prefix","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"imessage_comment_prefix","index$":17},"imessage_number":{"a":true,"h":"Imessage Number","n":"imessage_number","r":true,"sh":"International destination number; blank or null clears it on an added environment.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"imessage_number","index$":18},"imessage_number_source":{"a":true,"h":"Imessage Number Source","n":"imessage_number_source","r":true,"t":"`$STRING`","key$":"imessage_number_source","index$":19},"limits":{"a":true,"h":"Limits","n":"limits","r":true,"t":"`$OBJECT`","key$":"limits","index$":20},"link_pattern":{"a":true,"h":"Link Pattern","n":"link_pattern","r":true,"sh":"hosting: a regular expression for the preview link, as preview detection returns it.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"link_pattern","index$":21},"links":{"a":true,"h":"Links","n":"links","r":true,"sh":"hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"links","index$":22},"max_seconds":{"a":true,"h":"Max Seconds","n":"max_seconds","r":false,"t":"`$INTEGER`","key$":"max_seconds","index$":23},"messaging_enabled":{"a":true,"h":"Messaging Enabled","n":"messaging_enabled","r":true,"t":"`$BOOLEAN`","key$":"messaging_enabled","index$":24},"messaging_tester_number":{"a":true,"h":"Messaging Tester Number","n":"messaging_tester_number","r":true,"sh":"One configured tester number.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"messaging_tester_number","index$":25},"non_product_paths":{"a":true,"h":"Non Product Paths","n":"non_product_paths","r":false,"t":"`$ARRAY`","key$":"non_product_paths","index$":26},"permissions":{"a":true,"h":"Permissions","n":"permissions","r":true,"t":"`$OBJECT`","key$":"permissions","index$":27},"pr_check":{"a":true,"h":"Pr Check","n":"pr_check","r":true,"sh":"Report a Composal Verify check on GitHub PRs.","t":"`$BOOLEAN`","key$":"pr_check","index$":28},"preview_access":{"a":true,"h":"Preview Access","n":"preview_access","r":false,"t":"`$STRING`","key$":"preview_access","index$":29},"preview_comment_authors":{"a":true,"h":"Preview Comment Authors","n":"preview_comment_authors","r":false,"t":"`$ARRAY`","key$":"preview_comment_authors","index$":30},"preview_comment_pattern":{"a":true,"h":"Preview Comment Pattern","n":"preview_comment_pattern","r":false,"t":"`$STRING`","key$":"preview_comment_pattern","index$":31},"preview_comment_wildcard":{"a":true,"h":"Preview Comment Wildcard","n":"preview_comment_wildcard","r":true,"sh":"A preview address with * for the part that changes, such as https://*.vercel.app.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"preview_comment_wildcard","index$":32},"preview_profile":{"a":true,"h":"Preview Profile","n":"preview_profile","r":true,"sh":"composal: the preview profile that builds each PR.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"preview_profile","index$":33},"preview_profiles":{"a":true,"h":"Preview Profiles","n":"preview_profiles","r":true,"t":"`$ARRAY`","key$":"preview_profiles","index$":34},"previews":{"a":true,"h":"Previews","n":"previews","r":true,"sh":"Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting.","t":"`$STRING`","key$":"previews","index$":35},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"sh":"Composal project owning this PR Testing configuration.","t":"`$STRING`","key$":"project_id","index$":36},"project_repositories":{"a":true,"h":"Project Repositories","n":"project_repositories","r":true,"t":"`$ARRAY`","key$":"project_repositories","index$":37},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"t":"`$STRING`","key$":"provider","index$":38},"repositories":{"a":true,"h":"Repositories","n":"repositories","r":true,"t":"`$ARRAY`","key$":"repositories","index$":39},"repository":{"a":true,"h":"Repository","n":"repository","r":true,"sh":"Repository ID; see repositories for its name.","t":"`$STRING`","key$":"repository","index$":40},"repository_id":{"a":true,"h":"Repository Id","n":"repository_id","r":true,"t":"`$STRING`","key$":"repository_id","index$":41},"repository_kind":{"a":true,"h":"Repository Kind","n":"repository_kind","r":true,"sh":"Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment.","t":"`$STRING`","key$":"repository_kind","index$":42},"selected_repository":{"a":true,"h":"Selected Repository","n":"selected_repository","r":true,"t":"`$ANY`","key$":"selected_repository","index$":43},"service":{"a":true,"h":"Service","n":"service","r":true,"sh":"composal: the public service the browsers open.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"service","index$":44},"settings":{"a":true,"h":"Settings","n":"settings","r":true,"t":"`$ARRAY`","key$":"settings","index$":45},"setup":{"a":true,"h":"Setup","n":"setup","r":true,"sh":"The project's saved setup as answers, when it has one.","t":"`$ANY`","key$":"setup","index$":46},"setup_defaults":{"a":true,"h":"Setup Defaults","n":"setup_defaults","r":true,"sh":"The answers a new setup starts from","t":"`$OBJECT`","key$":"setup_defaults","index$":47},"source_repository":{"a":true,"h":"Source Repository","n":"source_repository","r":true,"t":"`$STRING`","key$":"source_repository","index$":48},"target_mode":{"a":true,"h":"Target Mode","n":"target_mode","r":true,"t":"`$STRING`","key$":"target_mode","index$":49},"tester_numbers":{"a":true,"h":"Tester Numbers","n":"tester_numbers","r":true,"t":"`$ARRAY`","key$":"tester_numbers","index$":50},"trigger_label":{"a":true,"h":"Trigger Label","n":"trigger_label","r":true,"sh":"Label whose addition triggers verification when trigger_on_label is enabled.","t":"`$STRING`","key$":"trigger_label","index$":51},"trigger_on_comment":{"a":true,"h":"Trigger On Comment","n":"trigger_on_comment","r":false,"t":"`$BOOLEAN`","key$":"trigger_on_comment","index$":52},"trigger_on_label":{"a":true,"h":"Trigger On Label","n":"trigger_on_label","r":false,"t":"`$BOOLEAN`","key$":"trigger_on_label","index$":53},"trigger_on_push":{"a":true,"h":"Trigger On Push","n":"trigger_on_push","r":false,"t":"`$BOOLEAN`","key$":"trigger_on_push","index$":54},"trigger_on_ready":{"a":true,"h":"Trigger On Ready","n":"trigger_on_ready","r":false,"t":"`$BOOLEAN`","key$":"trigger_on_ready","index$":55},"triggers":{"a":true,"h":"Triggers","n":"triggers","r":true,"sh":"When runs start.","t":"`$OBJECT`","key$":"triggers","index$":56},"verify_environment_id":{"a":true,"h":"Verify Environment Id","n":"verify_environment_id","r":true,"t":"`$STRING`","key$":"verify_environment_id","index$":57},"write_scenarios":{"a":true,"h":"Write Scenarios","n":"write_scenarios","r":true,"sh":"Draft and validate focused scenarios for each change on its preview.","t":"`$BOOLEAN`","key$":"write_scenarios","index$":58}},"id":{"field":"id","name":"id"},"name":"pull_request_setting","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["app_preview_profile_id","app_service_id","bots","concurrency","demo_videos","demo_videos_enabled","deployment","deployment_environment","enabled","environment","github_check_enabled","imessage_comment_prefix","imessage_number","imessage_number_source","limits","link_pattern","links","max_seconds","messaging_tester_number","non_product_paths","pr_check","preview_access","preview_comment_authors","preview_comment_pattern","preview_comment_wildcard","preview_profile","previews","project_id","provider","repository","repository_id","repository_kind","service","target_mode","trigger_label","trigger_on_comment","trigger_on_label","trigger_on_push","trigger_on_ready","triggers","verify_environment_id","write_scenarios"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/pull_request_settings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/pull_request_settings","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"pull_request_settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["project_id","repository_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_preview","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_preview","q":{"$action":"detect_preview","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"pull_request_settings"},{"lit":"detect_preview"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verify/pull_request_settings","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"project_id","or":"project_id","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"provider","or":"provider","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"repository_id","or":"repository_id","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verify/pull_request_settings","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verify"},{"lit":"pull_request_settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"pull_request_setting","name__orig":"pull_request_setting","Name":"PullRequestSetting","name_":"pull_request_setting","name-":"pull-request-setting","NAME":"PULL_REQUEST_SETTING","index$":407}, {"active":true,"entity":"pull_request_setting","key$":"BasicPullRequestSettingFlow","kind":"basic","name":"BasicPullRequestSettingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"pull_request_setting_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pull_request_setting_ref01"}}],"index$":1}]}, 'PullRequestSetting', {"POST /api/v1/organizations/{organization_id}/verify/pull_request_settings":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"anyOf":[{"type":"object","required":["project_id"],"additionalProperties":false,"description":"PR testing setup answers. Give deployment, or bots with links or link_pattern, for hosting; preview_profile and service for composal.","properties":{"enabled":{"type":"boolean","description":"Test PRs automatically. New setups stay off until this is true."},"previews":{"type":"string","enum":["hosting","ci","composal"],"description":"Who builds each PR's preview: a hosting service such as Vercel or Netlify, your CI workflow, or Composal hosting."},"deployment":{"type":["string","null"],"description":"hosting: the deployment environment name the host reports on each PR, such as Preview."},"bots":{"type":"array","maxItems":10,"items":{"type":"string"},"description":"hosting: bot accounts that comment the preview link, such as netlify[bot]. GitHub only."},"links":{"type":["string","null"],"description":"hosting: the preview address with * for the part that changes, such as https://deploy-preview-*--shop.netlify.app."},"link_pattern":{"type":["string","null"],"maxLength":512,"description":"hosting: a regular expression for the preview link, as preview detection returns it. Use links when a * address fits."},"preview_profile":{"type":["string","null"],"description":"composal: the preview profile that builds each PR. Name, slug or ID."},"service":{"type":["string","null"],"description":"composal: the public service the browsers open. Name, slug or ID."},"environment":{"type":"string","description":"The environment whose test accounts sign in to the previews. Hosting and Composal previews need an external environment. Name, slug or ID; defaults to the saved or only fitting one."},"triggers":{"type":"object","additionalProperties":false,"properties":{"push":{},"ready":{},"label":{},"comment":{}},"description":"When runs start. GitHub only; GitLab runs on every MR update out of draft."},"pr_check":{"type":"boolean","description":"Report a Composal Verify check on GitHub PRs."},"demo_videos":{"type":"boolean","description":"Record a short walkthrough of the change and add it to the PR comment. Off by default."},"limits":{"type":"object","additionalProperties":false,"properties":{"max_minutes":{},"skip_paths":{}}},"project_id":{"type":"string","description":"Project slug or ID."},"repository":{"type":"string","description":"Repository slug, ID or owner/name. Defaults to the saved or only repository. repository_id is accepted too."},"provider":{"type":"string","enum":["github","gitlab"],"description":"Only needed when the repository is connected to both."},"imessage_number":{"type":"string","nullable":true,"description":"International destination number; blank or null clears it on an added environment."},"messaging_tester_number":{"type":"string","nullable":true,"description":"One configured tester number. Copied to each preview; may be overridden locally before preparation."},"imessage_number_source":{"type":"string","enum":["configured","deployment"]},"imessage_comment_prefix":{"type":"string","nullable":true,"maxLength":128},"write_scenarios":{"type":"boolean","default":false,"description":"Draft and validate focused scenarios for each change on its preview. Off by default."},"repository_kind":{"type":"string","enum":["auto","mfe","api"],"description":"Auto assesses each diff; MFE supports browser previews; API analyzes changes and offers manual runs against the configured test environment."}},"x-ref":"#/components/schemas/VerifyPullRequestSetupInput"},{"type":"object","required":["repository_id","verify_environment_id","target_mode","project_id"],"properties":{"repository_id":{"type":"string","key$":"repository_id"},"verify_environment_id":{"type":"string","key$":"verify_environment_id"},"target_mode":{"type":"string","enum":["preview","managed","ci","comments"],"key$":"target_mode"},"deployment_environment":{"type":"string","key$":"deployment_environment"},"preview_access":{"type":"string","enum":["org_members","public"],"key$":"preview_access"},"non_product_paths":{"type":"array","items":{"type":"string"},"key$":"non_product_paths"},"concurrency":{"type":"integer","description":"Up to 50 parallel browsers per run, lowered only by an explicit administrator override. Submitted values are ignored; packages do not cap browser parallelism.","key$":"concurrency"},"max_seconds":{"type":"integer","key$":"max_seconds"},"enabled":{"type":"boolean","key$":"enabled"},"app_preview_profile_id":{"type":"string","nullable":true,"key$":"app_preview_profile_id"},"app_service_id":{"type":"string","nullable":true,"key$":"app_service_id"},"provider":{"type":"string","enum":["github","gitlab"],"default":"github","key$":"provider"},"project_id":{"type":"string","description":"Composal project owning this PR Testing configuration.","key$":"project_id"},"trigger_on_push":{"type":"boolean","default":true,"key$":"trigger_on_push"},"trigger_on_ready":{"type":"boolean","default":true,"key$":"trigger_on_ready"},"trigger_on_label":{"type":"boolean","default":false,"key$":"trigger_on_label"},"trigger_on_comment":{"type":"boolean","default":false,"key$":"trigger_on_comment"},"trigger_label":{"type":"string","maxLength":255,"default":"qa","description":"Label whose addition triggers verification when trigger_on_label is enabled.","key$":"trigger_label"},"github_check_enabled":{"type":"boolean","default":true,"description":"Report the Composal Verify check on GitHub pull requests. When false, new commits get no check and open checks are closed as neutral.","key$":"github_check_enabled"},"demo_videos_enabled":{"type":"boolean","default":false,"description":"Record a short walkthrough of the change and add it to the PR comment. Off by default.","key$":"demo_videos_enabled"},"preview_comment_authors":{"type":"array","items":{"type":"string"},"maxItems":10,"key$":"preview_comment_authors"},"preview_comment_pattern":{"type":"string","maxLength":512,"key$":"preview_comment_pattern"},"preview_comment_wildcard":{"type":"string","nullable":true,"description":"A preview address with * for the part that changes, such as https://*.vercel.app. Replaces preview_comment_pattern when present; responses carry it when the pattern was written this way.","key$":"preview_comment_wildcard"},"imessage_number":{"type":"string","nullable":true,"description":"International destination number; blank or null clears it on an added environment.","key$":"imessage_number"},"messaging_tester_number":{"type":"string","nullable":true,"description":"One configured tester number. Copied to each preview; may be overridden locally before preparation.","key$":"messaging_tester_number"},"imessage_number_source":{"type":"string","enum":["configured","deployment"],"key$":"imessage_number_source"},"imessage_comment_prefix":{"type":"string","nullable":true,"maxLength":128,"key$":"imessage_comment_prefix"},"write_scenarios":{"type":"boolean","default":false,"description":"Draft and validate focused scenarios for each change on its preview. Off by default.","key$":"write_scenarios"}},"description":"The stored-setting shape released CLIs send. Prefer VerifyPullRequestSetupInput.","x-ref":"#/components/schemas/VerifyPullRequestSettingInput"}]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/organizations/{organization_id}/verify/pull_request_settings/detect_preview":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["project_id"],"properties":{"project_id":{"type":"string","description":"Project slug or ID."},"repository_id":{"type":"string","description":"Repository slug, ID or owner/name. Defaults to the project's configured or only repository."}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/verify/pull_request_settings":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"provider","in":"query","required":false,"description":"Limit repositories to one source provider","schema":{"type":"string","enum":["github","gitlab"]},"index$":1},{"in":"query","name":"project_id","schema":{"type":"string"},"description":"Scope configuration options to this Composal project.","index$":2},{"in":"query","name":"repository_id","schema":{"type":"string"},"description":"Select the configured repository in a multi-repository project.","index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"pull_request_setting.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verify/pull_request_settings"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const pull_request_setting_ref01_ent = client.PullRequestSetting()
    let pull_request_setting_ref01_data = setup.data.new.pull_request_setting['pull_request_setting_ref01']
    pull_request_setting_ref01_data['organization_id'] = setup.idmap['organization01']

    pull_request_setting_ref01_data = (await pull_request_setting_ref01_ent.create(pull_request_setting_ref01_data)).data()
    assert(null != pull_request_setting_ref01_data.id)


    // LIST
    const pull_request_setting_ref01_match: any = {}
    pull_request_setting_ref01_match['organization_id'] = setup.idmap['organization01']

    const pull_request_setting_ref01_list = (await pull_request_setting_ref01_ent.list(pull_request_setting_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(pull_request_setting_ref01_list, { id: pull_request_setting_ref01_data.id })))


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
      '../../../../.sdk/test/entity/pull_request_setting/PullRequestSettingTestData.json')

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
    ['pull_request_setting01','pull_request_setting02','pull_request_setting03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PULL_REQUEST_SETTING_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PULL_REQUEST_SETTING_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PULL_REQUEST_SETTING_ENTID']
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
  
