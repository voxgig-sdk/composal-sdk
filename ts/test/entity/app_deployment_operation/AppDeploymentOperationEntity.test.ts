

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


describe('AppDeploymentOperationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppDeploymentOperation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppDeploymentOperation().list({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_deployment_operation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app":{"a":true,"h":"App","n":"app","r":true,"t":"`$OBJECT`","key$":"app","index$":0},"app_environment_id":{"a":true,"h":"App Environment Id","n":"app_environment_id","r":false,"t":"`$STRING`","key$":"app_environment_id","index$":1},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","r":false,"t":"`$STRING`","key$":"app_service_id","index$":2},"app_service_placement_id":{"a":true,"h":"App Service Placement Id","n":"app_service_placement_id","r":false,"t":"`$STRING`","key$":"app_service_placement_id","index$":3},"artifact_locator":{"a":true,"h":"Artifact Locator","n":"artifact_locator","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"artifact_locator","index$":4},"build_duration_seconds":{"a":true,"h":"Build Duration Seconds","n":"build_duration_seconds","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"build_duration_seconds","index$":5},"build_source":{"a":true,"h":"Build Source","n":"build_source","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"build_source","index$":6},"build_status":{"a":true,"h":"Build Status","n":"build_status","r":true,"t":"`$STRING`","key$":"build_status","index$":7},"children":{"a":true,"h":"Children","n":"children","r":true,"t":"`$ARRAY`","key$":"children","index$":8},"ci_pipeline_id":{"a":true,"h":"Ci Pipeline Id","n":"ci_pipeline_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ci_pipeline_id","index$":9},"ci_pipeline_run_id":{"a":true,"h":"Ci Pipeline Run Id","n":"ci_pipeline_run_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"ci_pipeline_run_id","index$":10},"commit_sha":{"a":true,"h":"Commit Sha","n":"commit_sha","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"commit_sha","index$":11},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":12},"creator":{"a":true,"h":"Creator","n":"creator","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"creator","index$":13},"deployed_url":{"a":true,"fo":"uri","h":"Deployed Url","n":"deployed_url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"deployed_url","index$":14},"duration_seconds":{"a":true,"h":"Duration Seconds","n":"duration_seconds","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"duration_seconds","index$":15},"environment":{"a":true,"h":"Environment","n":"environment","r":true,"t":"`$OBJECT`","key$":"environment","index$":16},"failure_message":{"a":true,"h":"Failure Message","n":"failure_message","r":false,"t":"`$STRING`","key$":"failure_message","index$":17},"finished_at":{"a":true,"fo":"date-time","h":"Finished At","n":"finished_at","r":false,"t":"`$STRING`","key$":"finished_at","index$":18},"history_kind":{"a":true,"h":"History Kind","n":"history_kind","r":true,"t":"`$STRING`","key$":"history_kind","index$":19},"history_reason":{"a":true,"h":"History Reason","n":"history_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"history_reason","index$":20},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":21},"is_live":{"a":true,"h":"Is Live","n":"is_live","r":true,"t":"`$BOOLEAN`","key$":"is_live","index$":22},"is_rollback":{"a":true,"h":"Is Rollback","n":"is_rollback","r":true,"t":"`$BOOLEAN`","key$":"is_rollback","index$":23},"live_region_count":{"a":true,"h":"Live Region Count","n":"live_region_count","r":true,"t":"`$INTEGER`","key$":"live_region_count","index$":24},"location_id":{"a":true,"h":"Location Id","n":"location_id","r":false,"t":"`$STRING`","key$":"location_id","index$":25},"number":{"a":true,"h":"Number","n":"number","r":true,"t":"`$INTEGER`","key$":"number","index$":26},"placement":{"a":true,"h":"Placement","n":"placement","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"placement","index$":27},"region_count":{"a":true,"h":"Region Count","n":"region_count","r":true,"t":"`$INTEGER`","key$":"region_count","index$":28},"replicas_per_region":{"a":true,"h":"Replicas Per Region","n":"replicas_per_region","r":true,"t":"`$INTEGER`","key$":"replicas_per_region","index$":29},"rollback_reason":{"a":true,"h":"Rollback Reason","n":"rollback_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rollback_reason","index$":30},"rollback_source_release_id":{"a":true,"h":"Rollback Source Release Id","n":"rollback_source_release_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rollback_source_release_id","index$":31},"rollback_target_release_id":{"a":true,"h":"Rollback Target Release Id","n":"rollback_target_release_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rollback_target_release_id","index$":32},"rollout_predecessor_id":{"a":true,"h":"Rollout Predecessor Id","n":"rollout_predecessor_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rollout_predecessor_id","index$":33},"rollout_status":{"a":true,"h":"Rollout Status","n":"rollout_status","r":true,"t":"`$STRING`","key$":"rollout_status","index$":34},"rollout_strategy":{"a":true,"h":"Rollout Strategy","n":"rollout_strategy","r":true,"t":"`$STRING`","key$":"rollout_strategy","index$":35},"service":{"a":true,"h":"Service","n":"service","r":true,"t":"`$OBJECT`","key$":"service","index$":36},"source_ref":{"a":true,"h":"Source Ref","n":"source_ref","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_ref","index$":37},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","r":false,"t":"`$STRING`","key$":"started_at","index$":38},"status":{"a":true,"h":"Status","n":"status","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"status","index$":39},"total_replicas":{"a":true,"h":"Total Replicas","n":"total_replicas","r":true,"t":"`$INTEGER`","key$":"total_replicas","index$":40},"trigger_kind":{"a":true,"h":"Trigger Kind","n":"trigger_kind","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"trigger_kind","index$":41},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":42}},"id":{"field":"id","name":"id"},"name":"app_deployment_operation","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"operation_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel","q":{"$action":"cancel","exist":["app_id","id"]},"r":{"param":{"operation_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_operations"},{"var":"id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body.operation`"},"index$":0},{"a":true,"bf":["idempotency_key"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/redeploy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"operation_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/redeploy","q":{"$action":"redeploy","exist":["app_id","id"]},"r":{"param":{"operation_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_operations"},{"var":"id"},{"lit":"redeploy"}],"t":{"req":"`reqdata`","res":"`body.operation`"},"index$":1},{"a":true,"bf":["app_environment_id","app_service_id","deployment","environment","force","idempotency_key","reason","service","to"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/rollback","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"operation_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/rollback","q":{"$action":"rollback","exist":["app_id","id"]},"r":{"param":{"operation_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_operations"},{"var":"id"},{"lit":"rollback"}],"t":{"req":"`reqdata`","res":"`body.operation`"},"index$":2},{"a":true,"bf":["app_environment_id","app_service_id","app_service_placement_id","artifact_locator","commit_sha","deployed_url","failure_message","finished_at","location_id","source_ref","started_at","status","trigger_kind"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deployment_operations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deployment_operations","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_operations"}],"t":{"req":"`reqdata`","res":"`body.operation`"},"index$":3}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/deployment_operations","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/deployment_operations","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_operations"}],"t":{"page":{"next":"`body.pagination.next`","total":"`body.pagination.count`"},"req":"`reqdata`","res":"`body.operations`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"operation_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}","q":{"exist":["app_id","id"]},"r":{"param":{"operation_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_operations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.operation`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/live","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"operation_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/live","q":{"$action":"live","exist":["app_id","id"]},"r":{"param":{"operation_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployment_operations"},{"var":"id"},{"lit":"live"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"app_deployment_operation","name__orig":"app_deployment_operation","Name":"AppDeploymentOperation","name_":"app_deployment_operation","name-":"app-deployment-operation","NAME":"APP_DEPLOYMENT_OPERATION","index$":57}, {"active":true,"entity":"app_deployment_operation","key$":"BasicAppDeploymentOperationFlow","kind":"basic","name":"BasicAppDeploymentOperationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_deployment_operation_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"app_deployment_operation_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"app_deployment_operation_ref01","srcdatavar":"app_deployment_operation_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","id":"app_deployment_operation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_deployment_operation_ref01"}}],"index$":2,"route":"GET /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}","record":{}}]}, 'AppDeploymentOperation', {"POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"operation_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/redeploy":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"idempotency_key":{"type":"string"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"operation_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/rollback":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"app_service_id":{"type":"string","key$":"app_service_id"},"service":{"type":"string","key$":"service"},"app_environment_id":{"type":"string","key$":"app_environment_id"},"environment":{"type":"string","key$":"environment"},"to":{"type":"string","key$":"to"},"deployment":{"type":"string","key$":"deployment"},"reason":{"type":"string","key$":"reason"},"force":{"type":"boolean","key$":"force"},"idempotency_key":{"type":"string","key$":"idempotency_key"}},"additionalProperties":true,"x-ref":"#/components/schemas/DeploymentRollbackPayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"operation_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/deployment_operations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","anyOf":[{"required":["app_service_placement_id"]},{"required":["app_service_id","app_environment_id"]}],"properties":{"app_service_placement_id":{"type":"string","key$":"app_service_placement_id"},"app_service_id":{"type":"string","key$":"app_service_id"},"app_environment_id":{"type":"string","key$":"app_environment_id"},"location_id":{"type":"string","key$":"location_id"},"status":{"type":"string","enum":["queued","building","deploying","active","failed","rolled_back","canceled"],"key$":"status"},"source_ref":{"type":"string","key$":"source_ref"},"commit_sha":{"type":"string","key$":"commit_sha"},"artifact_locator":{"type":"string","key$":"artifact_locator"},"deployed_url":{"type":"string","key$":"deployed_url"},"trigger_kind":{"type":"string","enum":["manual","push","schedule","api","rollback"],"key$":"trigger_kind"},"failure_message":{"type":"string","key$":"failure_message"},"started_at":{"type":"string","format":"date-time","key$":"started_at"},"finished_at":{"type":"string","format":"date-time","key$":"finished_at"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppDeploymentCreatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/deployment_operations":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"page","in":"query","required":false,"schema":{"type":"integer","minimum":1},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":100},"index$":2}]},"GET /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"operation_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/live":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"operation_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_deployment_operation.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/deployment_operations/{operation_id}/cancel"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_deployment_operation_ref01_ent = client.AppDeploymentOperation()
    let app_deployment_operation_ref01_data = setup.data.new.app_deployment_operation['app_deployment_operation_ref01']
    app_deployment_operation_ref01_data['app_id'] = setup.idmap['app01']

    app_deployment_operation_ref01_data = (await app_deployment_operation_ref01_ent.create(app_deployment_operation_ref01_data)).data()
    assert(null != app_deployment_operation_ref01_data.id)


    // LIST
    const app_deployment_operation_ref01_match: any = {}
    app_deployment_operation_ref01_match['app_id'] = setup.idmap['app01']

    const app_deployment_operation_ref01_list = (await app_deployment_operation_ref01_ent.list(app_deployment_operation_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(app_deployment_operation_ref01_list, { id: app_deployment_operation_ref01_data.id })))


    // LOAD
    const app_deployment_operation_ref01_match_dt0: any = {}
    app_deployment_operation_ref01_match_dt0.id = app_deployment_operation_ref01_data.id
    app_deployment_operation_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    const app_deployment_operation_ref01_data_dt0 = (await app_deployment_operation_ref01_ent.load(app_deployment_operation_ref01_match_dt0)).data()
    assert(app_deployment_operation_ref01_data_dt0.id === app_deployment_operation_ref01_data.id)


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
      '../../../../.sdk/test/entity/app_deployment_operation/AppDeploymentOperationTestData.json')

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
    ['app_deployment_operation01','app_deployment_operation02','app_deployment_operation03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_DEPLOYMENT_OPERATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_DEPLOYMENT_OPERATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_DEPLOYMENT_OPERATION_ENTID']
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
  
