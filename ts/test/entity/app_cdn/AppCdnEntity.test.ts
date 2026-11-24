

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


describe('AppCdnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppCdn()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppCdn().list({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_cdn.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_environment_id":{"a":true,"h":"App Environment Id","n":"app_environment_id","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_environment_id","index$":0},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_service_id","index$":1},"cache_path_prefix":{"a":true,"h":"Cache Path Prefix","n":"cache_path_prefix","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cache_path_prefix","index$":2},"cache_settings_json":{"a":true,"h":"Cache Settings Json","n":"cache_settings_json","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cache_settings_json","index$":3},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":4},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":5},"distribution_kind":{"a":true,"h":"Distribution Kind","n":"distribution_kind","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"distribution_kind","index$":6},"edge_hostname":{"a":true,"h":"Edge Hostname","n":"edge_hostname","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"edge_hostname","index$":7},"failure_message":{"a":true,"h":"Failure Message","n":"failure_message","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_message","index$":8},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":"`$STRING`","key$":"hosted_app_id","index$":9},"hostnames":{"a":true,"h":"Hostnames","n":"hostnames","r":true,"t":"`$ARRAY`","key$":"hostnames","index$":10},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":11},"last_deployed_at":{"a":true,"fo":"date-time","h":"Last Deployed At","n":"last_deployed_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_deployed_at","index$":12},"last_deployed_at_label":{"a":true,"h":"Last Deployed At Label","n":"last_deployed_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_deployed_at_label","index$":13},"last_purged_at":{"a":true,"fo":"date-time","h":"Last Purged At","n":"last_purged_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_purged_at","index$":14},"last_purged_at_label":{"a":true,"h":"Last Purged At Label","n":"last_purged_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_purged_at_label","index$":15},"last_synced_at":{"a":true,"fo":"date-time","h":"Last Synced At","n":"last_synced_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_synced_at","index$":16},"last_synced_at_label":{"a":true,"h":"Last Synced At Label","n":"last_synced_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_synced_at_label","index$":17},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":18},"origin_url":{"a":true,"fo":"uri","h":"Origin Url","n":"origin_url","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"origin_url","index$":19},"provisioned":{"a":true,"h":"Provisioned","n":"provisioned","r":true,"t":"`$BOOLEAN`","key$":"provisioned","index$":20},"routing_settings_json":{"a":true,"h":"Routing Settings Json","n":"routing_settings_json","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"routing_settings_json","index$":21},"security_settings_json":{"a":true,"h":"Security Settings Json","n":"security_settings_json","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"security_settings_json","index$":22},"slug":{"a":true,"h":"Slug","n":"slug","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"slug","index$":23},"status":{"a":true,"h":"Status","n":"status","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"status","index$":24},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":25},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":26}},"id":{"field":"id","name":"id"},"name":"app_cdn","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}/archive","q":{"$action":"archive","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body.cdn`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/pause","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}/pause","q":{"$action":"pause","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"},{"lit":"pause"}],"t":{"req":"`reqdata`","res":"`body.cdn`"},"index$":1},{"a":true,"bf":["commit_sha","source_ref"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/provision","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}/provision","q":{"$action":"provision","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"},{"lit":"provision"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":2},{"a":true,"bf":["commit_sha","purge_urls","source_ref","urls"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/purge","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}/purge","q":{"$action":"purge","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"},{"lit":"purge"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":3},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/resume","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}/resume","q":{"$action":"resume","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"},{"lit":"resume"}],"t":{"req":"`reqdata`","res":"`body.cdn`"},"index$":4},{"a":true,"bf":["commit_sha","source_ref"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/sync","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}/sync","q":{"$action":"sync","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"},{"lit":"sync"}],"t":{"req":"`reqdata`","res":"`body.deployment`"},"index$":5},{"a":true,"bf":["app_environment_id","app_service_id","cache_path_prefix","cache_settings_json","distribution_kind","name","origin_url","routing_settings_json","security_settings_json","slug","status"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/cdns","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/cdns","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"}],"t":{"req":"`reqdata`","res":"`body.cdn`"},"index$":6}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/cdns","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/cdns","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/cdns/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["app_environment_id","app_service_id","cache_path_prefix","cache_settings_json","distribution_kind","name","origin_url","routing_settings_json","security_settings_json","slug","status"],"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/cdns/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.cdn`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/cdns/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["app_environment_id","app_service_id","cache_path_prefix","cache_settings_json","distribution_kind","name","origin_url","routing_settings_json","security_settings_json","slug","status"],"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/cdns/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/cdns/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"cdns"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.cdn`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"app_cdn","name__orig":"app_cdn","Name":"AppCdn","name_":"app_cdn","name-":"app-cdn","NAME":"APP_CDN","index$":79}, {"active":true,"entity":"app_cdn","key$":"BasicAppCdnFlow","kind":"basic","name":"BasicAppCdnFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_cdn_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"app_cdn_ref01"}}],"index$":1},{"a":true,"d":{"app_id":"app01"},"i":{"ref":"app_cdn_ref01","srcdatavar":"app_cdn_ref01_data","suffix":"_up0","textfield":"app_environment_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_cdn_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"app_cdn_ref01","srcdatavar":"app_cdn_ref01_data","suffix":"_dt0"},"m":{"app_id":"app01","id":"app_cdn01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_cdn_ref01"}}],"index$":3,"route":"GET /api/v1/hosting/apps/{app_id}/cdns/{id}","record":{}},{"a":true,"d":{},"i":{"ref":"app_cdn_ref01","suffix":"_rm0"},"m":{"app_id":"app01","id":"app_cdn01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"app_cdn_ref01"}}],"index$":5}]}, 'AppCdn', {"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/archive":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/pause":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/provision":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"source_ref":{"type":"string"},"commit_sha":{"type":"string"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppCdnDeploymentPayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/purge":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"source_ref":{"type":"string"},"commit_sha":{"type":"string"}},"x-ref":"#/components/schemas/AppCdnDeploymentPayload"},{"type":"object","properties":{"urls":{"type":"array","items":{"type":"string"}},"purge_urls":{"type":"array","items":{"type":"string"}}}}],"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/AppCdnPurgePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/resume":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/cdns/{id}/sync":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"source_ref":{"type":"string"},"commit_sha":{"type":"string"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppCdnDeploymentPayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/cdns":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["slug","name","origin_url"],"properties":{"app_environment_id":{"type":"string","key$":"app_environment_id"},"app_service_id":{"type":"string","key$":"app_service_id"},"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"distribution_kind":{"type":"string","enum":["pull_zone"],"key$":"distribution_kind"},"status":{"type":"string","enum":["draft","provisioning","active","degraded","paused","archived","failed"],"key$":"status"},"origin_url":{"type":"string","format":"uri","key$":"origin_url"},"cache_path_prefix":{"type":"string","nullable":true,"key$":"cache_path_prefix"},"cache_settings_json":{"type":"string","key$":"cache_settings_json"},"security_settings_json":{"type":"string","key$":"security_settings_json"},"routing_settings_json":{"type":"string","key$":"routing_settings_json"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppCdnDistributionCreatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/cdns":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/cdns/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/hosting/apps/{app_id}/cdns/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"app_environment_id":{"type":"string","key$":"app_environment_id"},"app_service_id":{"type":"string","key$":"app_service_id"},"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"distribution_kind":{"type":"string","enum":["pull_zone"],"key$":"distribution_kind"},"status":{"type":"string","enum":["draft","provisioning","active","degraded","paused","archived","failed"],"key$":"status"},"origin_url":{"type":"string","format":"uri","key$":"origin_url"},"cache_path_prefix":{"type":"string","nullable":true,"key$":"cache_path_prefix"},"cache_settings_json":{"type":"string","key$":"cache_settings_json"},"security_settings_json":{"type":"string","key$":"security_settings_json"},"routing_settings_json":{"type":"string","key$":"routing_settings_json"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppCdnDistributionUpdatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/cdns/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/hosting/apps/{app_id}/cdns/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"app_environment_id":{"type":"string","key$":"app_environment_id"},"app_service_id":{"type":"string","key$":"app_service_id"},"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"distribution_kind":{"type":"string","enum":["pull_zone"],"key$":"distribution_kind"},"status":{"type":"string","enum":["draft","provisioning","active","degraded","paused","archived","failed"],"key$":"status"},"origin_url":{"type":"string","format":"uri","key$":"origin_url"},"cache_path_prefix":{"type":"string","nullable":true,"key$":"cache_path_prefix"},"cache_settings_json":{"type":"string","key$":"cache_settings_json"},"security_settings_json":{"type":"string","key$":"security_settings_json"},"routing_settings_json":{"type":"string","key$":"routing_settings_json"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppCdnDistributionUpdatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_cdn.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/cdns/{id}/archive","app_cdn.update.2":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/cdns/{id}","app_cdn.remove.4":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/cdns/{id}","app_cdn.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_cdn_ref01_ent = client.AppCdn()
    let app_cdn_ref01_data = setup.data.new.app_cdn['app_cdn_ref01']
    app_cdn_ref01_data['app_id'] = setup.idmap['app01']

    app_cdn_ref01_data = (await app_cdn_ref01_ent.create(app_cdn_ref01_data)).data()
    assert(null != app_cdn_ref01_data.id)


    // LIST
    const app_cdn_ref01_match: any = {}
    app_cdn_ref01_match['app_id'] = setup.idmap['app01']

    const app_cdn_ref01_list = (await app_cdn_ref01_ent.list(app_cdn_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(app_cdn_ref01_list, { id: app_cdn_ref01_data.id })))


    // UPDATE
    const app_cdn_ref01_data_up0: any = {}
    app_cdn_ref01_data_up0.id = app_cdn_ref01_data.id
    app_cdn_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']

    const app_cdn_ref01_markdef_up0 = { name: 'app_environment_id', value: 'Mark01-app_cdn_ref01_' + setup.now }
    ;(app_cdn_ref01_data_up0 as any)[app_cdn_ref01_markdef_up0.name] = app_cdn_ref01_markdef_up0.value

    const app_cdn_ref01_resdata_up0 = (await app_cdn_ref01_ent.update(app_cdn_ref01_data_up0)).data()
    assert(app_cdn_ref01_resdata_up0.id === app_cdn_ref01_data_up0.id)

    assert((app_cdn_ref01_resdata_up0 as any)[app_cdn_ref01_markdef_up0.name] === app_cdn_ref01_markdef_up0.value)


    // LOAD
    const app_cdn_ref01_match_dt0: any = {}
    app_cdn_ref01_match_dt0.id = app_cdn_ref01_data.id
    app_cdn_ref01_match_dt0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    const app_cdn_ref01_data_dt0 = (await app_cdn_ref01_ent.load(app_cdn_ref01_match_dt0)).data()
    assert(app_cdn_ref01_data_dt0.id === app_cdn_ref01_data.id)


    // REMOVE
    const app_cdn_ref01_match_rm0: any = { id: app_cdn_ref01_data.id }
    app_cdn_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    await app_cdn_ref01_ent.remove(app_cdn_ref01_match_rm0)
  

    // LIST
    const app_cdn_ref01_match_rt0: any = {}
    app_cdn_ref01_match_rt0['app_id'] = setup.idmap['app01']

    const app_cdn_ref01_list_rt0 = (await app_cdn_ref01_ent.list(app_cdn_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(app_cdn_ref01_list_rt0, { id: app_cdn_ref01_data.id })))


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
      '../../../../.sdk/test/entity/app_cdn/AppCdnTestData.json')

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
    ['app_cdn01','app_cdn02','app_cdn03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_CDN_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_CDN_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_CDN_ENTID']
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
  
