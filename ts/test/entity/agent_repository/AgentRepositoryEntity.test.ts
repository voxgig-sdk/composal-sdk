

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


describe('AgentRepositoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentRepository()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentRepository().load({"agent_id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_repository.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"can_manage":{"a":true,"h":"Can Manage","n":"can_manage","r":true,"t":"`$BOOLEAN`","key$":"can_manage","index$":0},"environments":{"a":true,"h":"Environments","n":"environments","r":true,"sh":"Sandbox environment per granted repository ID, shared by every bot granted that repository.","t":"`$OBJECT`","key$":"environments","index$":1},"expected_version":{"a":true,"h":"Expected Version","n":"expected_version","r":true,"t":"`$INTEGER`","key$":"expected_version","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":3},"repository_choices":{"a":true,"h":"Repository Choices","n":"repository_choices","r":true,"t":"`$ARRAY`","key$":"repository_choices","index$":4},"repository_choices_error":{"a":true,"h":"Repository Choices Error","n":"repository_choices_error","r":false,"sh":"GitHub discovery warning.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"repository_choices_error","index$":5},"repository_choices_truncated":{"a":true,"h":"Repository Choices Truncated","n":"repository_choices_truncated","r":true,"t":"`$BOOLEAN`","key$":"repository_choices_truncated","index$":6},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$INTEGER`","key$":"version","index$":7},"work_repositories":{"a":true,"h":"Work Repositories","n":"work_repositories","r":true,"t":"`$ARRAY`","key$":"work_repositories","index$":8}},"id":{"field":"id","name":"id"},"name":"agent_repository","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"q","or":"q","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories","q":{"exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"repositories"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["branch"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"repository","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"id","or":"repository","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment","q":{"$action":"environment","exist":["agent_id","id","organization_id"]},"r":{"param":{"id":"agent_id","repository":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"repositories"},{"var":"id"},{"lit":"environment"}],"t":{"req":{"branch":"`reqdata.branch`"},"res":"`body.environment`"},"index$":0},{"a":true,"bf":["expected_version","work_repositories"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"agent_id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/agents/{id}/spark/repositories","q":{"exist":["agent_id","organization_id"]},"r":{"param":{"id":"agent_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agents"},{"var":"agent_id"},{"lit":"spark"},{"lit":"repositories"}],"t":{"req":{"expected_version":"`reqdata.expected_version`","work_repositories":"`reqdata.work_repository`"},"res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.agent"]]},"key$":"agent_repository","name__orig":"agent_repository","Name":"AgentRepository","name_":"agent_repository","name-":"agent-repository","NAME":"AGENT_REPOSITORY","index$":39}, {"active":true,"entity":"agent_repository","key$":"BasicAgentRepositoryFlow","kind":"basic","name":"BasicAgentRepositoryFlow","param":{},"step":[{"a":false,"d":{"organization_id":"organization01"},"i":{"ref":"agent_repository_ref01","srcdatavar":"agent_repository_ref01_data","suffix":"_up0","textfield":"repository_choices_error"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_repository_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"agent_repository_ref01","srcdatavar":"agent_repository_ref01_data","suffix":"_dt0"},"m":{"id":"agent_repository01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_repository_ref01"}}],"unreachable":true}]}, 'AgentRepository', {"GET /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"in":"query","name":"q","schema":{"type":"string","maxLength":200},"index$":2}]},"POST /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"branch":{"type":"string","maxLength":255,"description":"A branch other than the default one. The bot builds the recipe on it and checks the image on a fresh machine, on a thread it reports in. Nothing is promoted, so thread sandboxes keep their current environment."}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"repository","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"in":"path","name":"repository","required":true,"schema":{"type":"string"},"index$":3}]},"PUT /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["work_repositories","expected_version"],"properties":{"work_repositories":{"type":"array","maxItems":20,"items":{"type":"object","properties":{"repository_id":{"type":"string"},"permission":{"description":"Defaults to write when omitted.","type":"string","enum":[]},"write_branches":{"description":"Exact branches allowed for writes. Empty or omitted allows all branches, subject to exclude_default_branch and normal repository protections.","type":"array","items":{},"maxItems":32},"exclude_default_branch":{"type":"boolean","description":"With write permission, exclude the current default branch. Defaults to false."}},"required":["repository_id"],"additionalProperties":false,"x-ref":"#/components/schemas/PersistentAgentWorkRepository"},"key$":"work_repositories"},"expected_version":{"type":"integer","minimum":0,"key$":"expected_version"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_repository.update.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agents/{id}/spark/repositories/{repository}/environment"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_repository_ref01_data = Object.values(setup.data.existing.agent_repository)[0] as any

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
      '../../../../.sdk/test/entity/agent_repository/AgentRepositoryTestData.json')

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
    ['agent_repository01','agent_repository02','agent_repository03','organization01','organization02','organization03','agent01','agent02','agent03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_REPOSITORY_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_REPOSITORY_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_REPOSITORY_ENTID']
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
  
