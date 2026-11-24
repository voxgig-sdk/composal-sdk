

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


describe('RepositorySandboxEnvironmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.RepositorySandboxEnvironment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RepositorySandboxEnvironment().load({"id":1,"repository_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'repository_sandbox_environment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"repository_sandbox_environment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/repositories/{repository}/sandbox_environments/validate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"repository_id","or":"repository","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/repositories/{repository}/sandbox_environments/validate","q":{"$action":"validate","exist":["repository_id"]},"r":{"param":{"repository":"repository_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"repositories"},{"var":"repository_id"},{"lit":"sandbox_environments"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/repositories/{repository}/sandbox_environments/{profile}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"profile","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"repository_id","or":"repository","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/repositories/{repository}/sandbox_environments/{profile}","q":{"exist":["id","repository_id"]},"r":{"param":{"profile":"id","repository":"repository_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"repositories"},{"var":"repository_id"},{"lit":"sandbox_environments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"repository_sandbox_environment","name__orig":"repository_sandbox_environment","Name":"RepositorySandboxEnvironment","name_":"repository_sandbox_environment","name-":"repository-sandbox-environment","NAME":"REPOSITORY_SANDBOX_ENVIRONMENT","index$":445}, {"active":true,"entity":"repository_sandbox_environment","key$":"BasicRepositorySandboxEnvironmentFlow","kind":"basic","name":"BasicRepositorySandboxEnvironmentFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"repository_sandbox_environment_ref01"},"m":{"repository_id":"repository01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"repository_sandbox_environment_ref01","srcdatavar":"repository_sandbox_environment_ref01_data","suffix":"_dt0"},"m":{"id":"repository_sandbox_environment01","repository_id":"repository01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-repository_sandbox_environment_ref01"}}],"index$":0,"route":"GET /api/v1/repositories/{repository}/sandbox_environments/{profile}","record":{}}]}, 'RepositorySandboxEnvironment', {"POST /api/v1/repositories/{repository}/sandbox_environments/validate":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"repository","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/repositories/{repository}/sandbox_environments/{profile}":{"protocol":"http","parameters":[{"name":"repository","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"profile","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"repository_sandbox_environment.create.0":"GET-only live run: needs POST /api/v1/repositories/{repository}/sandbox_environments/validate","repository_sandbox_environment.load.1":"GET-only live run: reads a record only repository_sandbox_environment.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let repository_sandbox_environment_ref01_data = Object.values(setup.data.existing.repository_sandbox_environment)[0] as any

    // LOAD
    const repository_sandbox_environment_ref01_ent = client.RepositorySandboxEnvironment()
    const repository_sandbox_environment_ref01_match_dt0: any = {}
    repository_sandbox_environment_ref01_match_dt0.id = repository_sandbox_environment_ref01_data.id
    repository_sandbox_environment_ref01_match_dt0['repository_id'] = setup.idmap['repository_id'] ?? setup.idmap['repository01']
    const repository_sandbox_environment_ref01_data_dt0 = (await repository_sandbox_environment_ref01_ent.load(repository_sandbox_environment_ref01_match_dt0)).data()
    assert(repository_sandbox_environment_ref01_data_dt0.id === repository_sandbox_environment_ref01_data.id)


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
      '../../../../.sdk/test/entity/repository_sandbox_environment/RepositorySandboxEnvironmentTestData.json')

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
    ['repository_sandbox_environment01','repository_sandbox_environment02','repository_sandbox_environment03','repository01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_REPOSITORY_SANDBOX_ENVIRONMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_REPOSITORY_SANDBOX_ENVIRONMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_REPOSITORY_SANDBOX_ENVIRONMENT_ENTID']
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
  
