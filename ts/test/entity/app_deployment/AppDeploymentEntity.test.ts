

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


describe('AppDeploymentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppDeployment()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppDeployment().load({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_deployment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_environment_id":{"a":true,"h":"App Environment Id","n":"app_environment_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"app_environment_id","index$":0},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"app_service_id","index$":1},"app_service_placement_id":{"a":true,"h":"App Service Placement Id","n":"app_service_placement_id","r":false,"t":"`$STRING`","key$":"app_service_placement_id","index$":2},"artifact_locator":{"a":true,"h":"Artifact Locator","n":"artifact_locator","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"artifact_locator","index$":3},"build_role":{"a":true,"h":"Build Role","n":"build_role","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"build_role","index$":4},"commit_sha":{"a":true,"h":"Commit Sha","n":"commit_sha","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"commit_sha","index$":5},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":6},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":7},"creator_user_id":{"a":true,"h":"Creator User Id","n":"creator_user_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"creator_user_id","index$":8},"deployed_url":{"a":true,"h":"Deployed Url","n":"deployed_url","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"deployed_url","index$":9},"display_id":{"a":true,"h":"Display Id","n":"display_id","r":true,"t":"`$INTEGER`","key$":"display_id","index$":10},"failure_message":{"a":true,"h":"Failure Message","n":"failure_message","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_message","index$":11},"finished_at":{"a":true,"fo":"date-time","h":"Finished At","n":"finished_at","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at","index$":12},"finished_at_label":{"a":true,"h":"Finished At Label","n":"finished_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"finished_at_label","index$":13},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":"`$STRING`","key$":"hosted_app_id","index$":14},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":15},"idempotency_key":{"a":true,"h":"Idempotency Key","n":"idempotency_key","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"idempotency_key","index$":16},"is_rollback":{"a":true,"h":"Is Rollback","n":"is_rollback","r":true,"t":"`$BOOLEAN`","key$":"is_rollback","index$":17},"location":{"a":true,"h":"Location","n":"location","r":true,"t":"`$ANY`","key$":"location","index$":18},"location_id":{"a":true,"h":"Location Id","n":"location_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"location_id","index$":19},"number":{"a":true,"h":"Number","n":"number","r":true,"t":"`$INTEGER`","key$":"number","index$":20},"operation_key":{"a":true,"h":"Operation Key","n":"operation_key","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"operation_key","index$":21},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":22},"rollback_reason":{"a":true,"h":"Rollback Reason","n":"rollback_reason","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rollback_reason","index$":23},"rollback_source_deployment_id":{"a":true,"h":"Rollback Source Deployment Id","n":"rollback_source_deployment_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rollback_source_deployment_id","index$":24},"rollback_source_release_id":{"a":true,"h":"Rollback Source Release Id","n":"rollback_source_release_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rollback_source_release_id","index$":25},"rollback_target_release_id":{"a":true,"h":"Rollback Target Release Id","n":"rollback_target_release_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rollback_target_release_id","index$":26},"source_ref":{"a":true,"h":"Source Ref","n":"source_ref","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"source_ref","index$":27},"started_at":{"a":true,"fo":"date-time","h":"Started At","n":"started_at","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at","index$":28},"started_at_label":{"a":true,"h":"Started At Label","n":"started_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"started_at_label","index$":29},"status":{"a":true,"h":"Status","n":"status","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"status","index$":30},"trigger_kind":{"a":true,"h":"Trigger Kind","n":"trigger_kind","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"trigger_kind","index$":31},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":32},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":33}},"id":{"field":"id","name":"id"},"name":"app_deployment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deployments/{id}/cancel","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deployments/{id}/cancel","q":{"$action":"cancel","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deployments/{id}/fail","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deployments/{id}/fail","q":{"$action":"fail","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"},{"lit":"fail"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deployments/{id}/succeed","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deployments/{id}/succeed","q":{"$action":"succeed","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"},{"lit":"succeed"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":2},{"a":true,"bf":["app_environment_id","app_service_id","app_service_placement_id","artifact_locator","commit_sha","deployed_url","failure_message","finished_at","location_id","source_ref","started_at","status","trigger_kind"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/deployments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/deployments","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":3}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/deployments/{deployment_id}/live","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"deployment_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/deployments/{deployment_id}/live","q":{"$action":"live","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","deployment_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"},{"lit":"live"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/deployments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/deployments/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/deployments","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/deployments","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/deployments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/deployments/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/deployments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/deployments/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/deployments/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/deployments/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"deployments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"app_deployment","name__orig":"app_deployment","Name":"AppDeployment","name_":"app_deployment","name-":"app-deployment","NAME":"APP_DEPLOYMENT","index$":83}, {"active":true,"entity":"app_deployment","key$":"BasicAppDeploymentFlow","kind":"basic","name":"BasicAppDeploymentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_deployment_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"app_id":"app01"},"i":{"ref":"app_deployment_ref01","srcdatavar":"app_deployment_ref01_data","suffix":"_up0","textfield":"app_environment_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_deployment_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"app_deployment_ref01","srcdatavar":"app_deployment_ref01_data","suffix":"_dt0"},"m":{"id":"app_deployment01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_deployment_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"app_deployment_ref01","suffix":"_rm0"},"m":{"app_id":"app01","id":"app_deployment01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'AppDeployment', {"POST /api/v1/hosting/apps/{app_id}/deployments/{id}/cancel":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/deployments/{id}/fail":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/deployments/{id}/succeed":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/deployments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","anyOf":[{"required":["app_service_placement_id"]},{"required":["app_service_id","app_environment_id"]}],"properties":{"app_service_placement_id":{"type":"string","key$":"app_service_placement_id"},"app_service_id":{"type":"string","key$":"app_service_id"},"app_environment_id":{"type":"string","key$":"app_environment_id"},"location_id":{"type":"string","key$":"location_id"},"status":{"type":"string","enum":["queued","building","deploying","active","failed","rolled_back","canceled"],"key$":"status"},"source_ref":{"type":"string","key$":"source_ref"},"commit_sha":{"type":"string","key$":"commit_sha"},"artifact_locator":{"type":"string","key$":"artifact_locator"},"deployed_url":{"type":"string","key$":"deployed_url"},"trigger_kind":{"type":"string","enum":["manual","push","schedule","api","rollback"],"key$":"trigger_kind"},"failure_message":{"type":"string","key$":"failure_message"},"started_at":{"type":"string","format":"date-time","key$":"started_at"},"finished_at":{"type":"string","format":"date-time","key$":"finished_at"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppDeploymentCreatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/deployments/{deployment_id}/live":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"deployment_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/deployments/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/deployments":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/hosting/apps/{app_id}/deployments/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/deployments/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/hosting/apps/{app_id}/deployments/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_deployment.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/deployments/{id}/cancel","app_deployment.update.1":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/deployments/{id}","app_deployment.load.2":"GET-only live run: reads a record only app_deployment.create.0 gives","app_deployment.remove.3":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/deployments/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_deployment_ref01_ent = client.AppDeployment()
    let app_deployment_ref01_data = setup.data.new.app_deployment['app_deployment_ref01']
    app_deployment_ref01_data['app_id'] = setup.idmap['app01']

    app_deployment_ref01_data = (await app_deployment_ref01_ent.create(app_deployment_ref01_data)).data()
    assert(null != app_deployment_ref01_data.id)


    // UPDATE
    const app_deployment_ref01_data_up0: any = {}
    app_deployment_ref01_data_up0.id = app_deployment_ref01_data.id
    app_deployment_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']

    const app_deployment_ref01_markdef_up0 = { name: 'app_environment_id', value: 'Mark01-app_deployment_ref01_' + setup.now }
    ;(app_deployment_ref01_data_up0 as any)[app_deployment_ref01_markdef_up0.name] = app_deployment_ref01_markdef_up0.value

    const app_deployment_ref01_resdata_up0 = (await app_deployment_ref01_ent.update(app_deployment_ref01_data_up0)).data()
    assert(app_deployment_ref01_resdata_up0.id === app_deployment_ref01_data_up0.id)

    assert((app_deployment_ref01_resdata_up0 as any)[app_deployment_ref01_markdef_up0.name] === app_deployment_ref01_markdef_up0.value)


    // LOAD
    const app_deployment_ref01_match_dt0: any = {}
    app_deployment_ref01_match_dt0.id = app_deployment_ref01_data.id
    const app_deployment_ref01_data_dt0 = (await app_deployment_ref01_ent.load(app_deployment_ref01_match_dt0)).data()
    assert(app_deployment_ref01_data_dt0.id === app_deployment_ref01_data.id)


    // REMOVE
    const app_deployment_ref01_match_rm0: any = { id: app_deployment_ref01_data.id }
    app_deployment_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    await app_deployment_ref01_ent.remove(app_deployment_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/app_deployment/AppDeploymentTestData.json')

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
    ['app_deployment01','app_deployment02','app_deployment03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_DEPLOYMENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_DEPLOYMENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_DEPLOYMENT_ENTID']
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
  
