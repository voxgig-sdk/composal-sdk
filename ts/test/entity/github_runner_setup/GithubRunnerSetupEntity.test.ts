

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


describe('GithubRunnerSetupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.GithubRunnerSetup()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GithubRunnerSetup().load({"organization_id":1,"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'github_runner_setup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"error":{"a":true,"h":"Error","n":"error","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"error","index$":0},"github_repository_connection_id":{"a":true,"h":"Github Repository Connection Id","n":"github_repository_connection_id","r":true,"t":"`$STRING`","key$":"github_repository_connection_id","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":2},"pull_request_url":{"a":true,"h":"Pull Request Url","n":"pull_request_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"pull_request_url","index$":3},"repository_full_name":{"a":true,"h":"Repository Full Name","n":"repository_full_name","r":true,"t":"`$STRING`","key$":"repository_full_name","index$":4},"roder_thread_id":{"a":true,"h":"Roder Thread Id","n":"roder_thread_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"roder_thread_id","index$":5},"runner_labels":{"a":true,"h":"Runner Labels","n":"runner_labels","r":true,"t":"`$ARRAY`","key$":"runner_labels","index$":6},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":7},"status_label":{"a":true,"h":"Status Label","n":"status_label","r":true,"t":"`$STRING`","key$":"status_label","index$":8},"summary":{"a":true,"h":"Summary","n":"summary","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"summary","index$":9}},"id":{"field":"id","name":"id"},"name":"github_runner_setup","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["github_repository_connection_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/github_runner_setup","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/github_runner_setup","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_runner_setup"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/github_runner_setup/agent_session","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/github_runner_setup/agent_session","q":{"$action":"agent_session","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_runner_setup"},{"lit":"agent_session"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/github_runner_setup","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"id","or":"id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/github_runner_setup","q":{"exist":["id","organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"github_runner_setup"}],"t":{"req":"`reqdata`","res":"`body.runner_labels`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"github_runner_setup","name__orig":"github_runner_setup","Name":"GithubRunnerSetup","name_":"github_runner_setup","name-":"github-runner-setup","NAME":"GITHUB_RUNNER_SETUP","index$":271}, {"active":true,"entity":"github_runner_setup","key$":"BasicGithubRunnerSetupFlow","kind":"basic","name":"BasicGithubRunnerSetupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"github_runner_setup_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"github_runner_setup_ref01","srcdatavar":"github_runner_setup_ref01_data","suffix":"_dt0"},"m":{"id":"github_runner_setup01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-github_runner_setup_ref01"}}],"index$":1}]}, 'GithubRunnerSetup', {"POST /api/v1/organizations/{organization_id}/github_runner_setup":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["github_repository_connection_id"],"properties":{"github_repository_connection_id":{"type":"string","key$":"github_repository_connection_id"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/organizations/{organization_id}/github_runner_setup/agent_session":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["id"],"properties":{"id":{"type":"string"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/github_runner_setup":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"in":"query","name":"id","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"github_runner_setup.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/github_runner_setup","github_runner_setup.load.1":"GET-only live run: reads a record only github_runner_setup.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const github_runner_setup_ref01_ent = client.GithubRunnerSetup()
    let github_runner_setup_ref01_data = setup.data.new.github_runner_setup['github_runner_setup_ref01']
    github_runner_setup_ref01_data['organization_id'] = setup.idmap['organization01']

    github_runner_setup_ref01_data = (await github_runner_setup_ref01_ent.create(github_runner_setup_ref01_data)).data()
    assert(null != github_runner_setup_ref01_data.id)


    // LOAD
    const github_runner_setup_ref01_match_dt0: any = {}
    github_runner_setup_ref01_match_dt0.id = github_runner_setup_ref01_data.id
    const github_runner_setup_ref01_data_dt0 = (await github_runner_setup_ref01_ent.load(github_runner_setup_ref01_match_dt0)).data()
    assert(github_runner_setup_ref01_data_dt0.id === github_runner_setup_ref01_data.id)


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
      '../../../../.sdk/test/entity/github_runner_setup/GithubRunnerSetupTestData.json')

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
    ['github_runner_setup01','github_runner_setup02','github_runner_setup03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_GITHUB_RUNNER_SETUP_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_GITHUB_RUNNER_SETUP_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_GITHUB_RUNNER_SETUP_ENTID']
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
  
