

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


describe('DockerBuilderSessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.DockerBuilderSession()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DockerBuilderSession().load({"id":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'docker_builder_session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":0},"docker_builder_id":{"a":true,"h":"Docker Builder Id","n":"docker_builder_id","r":true,"t":"`$STRING`","key$":"docker_builder_id","index$":1},"expires_at":{"a":true,"fo":"date-time","h":"Expires At","n":"expires_at","r":true,"t":"`$STRING`","key$":"expires_at","index$":2},"gateway_url":{"a":true,"h":"Gateway Url","n":"gateway_url","r":false,"sh":"Organization-addressed public WSS gateway; null until configured","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"gateway_url","index$":3},"generation":{"a":true,"h":"Generation","n":"generation","r":true,"t":"`$INTEGER`","key$":"generation","index$":4},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":5},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":6},"revoked_at":{"a":true,"fo":"date-time","h":"Revoked At","n":"revoked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at","index$":7},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"t":"`$STRING`","key$":"user_id","index$":8}},"id":{"field":"id","name":"id"},"name":"docker_builder_session","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"docker_builder_id","or":"docker_builder_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions","q":{"exist":["docker_builder_id","organization_id"]},"r":{"param":{"docker_builder_id":"docker_builder_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"docker_builders"},{"var":"docker_builder_id"},{"lit":"sessions"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}/refresh","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/docker_builder_sessions/{id}/refresh","q":{"$action":"refresh","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"docker_builder_sessions"},{"var":"id"},{"lit":"refresh"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/docker_builder_sessions/authorize","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/docker_builder_sessions/authorize","q":{"$action":"authorize","exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"docker_builder_sessions"},{"lit":"authorize"}],"t":{"req":"`reqdata`","res":"`body.docker_builder_session`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/docker_builder_sessions/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"docker_builder_sessions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.docker_builder_session`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/docker_builder_sessions/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"docker_builder_sessions"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.organization"],["$.main.kit.entity.organization","$.main.kit.entity.docker_builder"]]},"key$":"docker_builder_session","name__orig":"docker_builder_session","Name":"DockerBuilderSession","name_":"docker_builder_session","name-":"docker-builder-session","NAME":"DOCKER_BUILDER_SESSION","index$":223}, {"active":true,"entity":"docker_builder_session","key$":"BasicDockerBuilderSessionFlow","kind":"basic","name":"BasicDockerBuilderSessionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"docker_builder_session_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"docker_builder_session_ref01","srcdatavar":"docker_builder_session_ref01_data","suffix":"_dt0"},"m":{"id":"docker_builder_session01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-docker_builder_session_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}","record":{"organization_id":"organization_id"}},{"a":true,"d":{},"i":{"ref":"docker_builder_session_ref01","suffix":"_rm0"},"m":{"id":"docker_builder_session01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'DockerBuilderSession', {"POST /api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"docker_builder_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}/refresh":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/docker_builder_sessions/authorize":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"docker_builder_session.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/docker_builders/{docker_builder_id}/sessions","docker_builder_session.load.1":"GET-only live run: reads a record only docker_builder_session.create.0 gives","docker_builder_session.remove.2":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/docker_builder_sessions/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const docker_builder_session_ref01_ent = client.DockerBuilderSession()
    let docker_builder_session_ref01_data = setup.data.new.docker_builder_session['docker_builder_session_ref01']
    docker_builder_session_ref01_data['organization_id'] = setup.idmap['organization01']

    docker_builder_session_ref01_data = (await docker_builder_session_ref01_ent.create(docker_builder_session_ref01_data)).data()
    assert(null != docker_builder_session_ref01_data.id)


    // LOAD
    const docker_builder_session_ref01_match_dt0: any = {}
    docker_builder_session_ref01_match_dt0.id = docker_builder_session_ref01_data.id
    docker_builder_session_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof docker_builder_session_ref01_data['organization_id']) ?
      docker_builder_session_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const docker_builder_session_ref01_data_dt0 = (await docker_builder_session_ref01_ent.load(docker_builder_session_ref01_match_dt0)).data()
    assert(docker_builder_session_ref01_data_dt0.id === docker_builder_session_ref01_data.id)


    // REMOVE
    const docker_builder_session_ref01_match_rm0: any = { id: docker_builder_session_ref01_data.id }
    docker_builder_session_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await docker_builder_session_ref01_ent.remove(docker_builder_session_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/docker_builder_session/DockerBuilderSessionTestData.json')

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
    ['docker_builder_session01','docker_builder_session02','docker_builder_session03','organization01','organization02','organization03','docker_builder01','docker_builder02','docker_builder03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DOCKER_BUILDER_SESSION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DOCKER_BUILDER_SESSION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DOCKER_BUILDER_SESSION_ENTID']
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
  
