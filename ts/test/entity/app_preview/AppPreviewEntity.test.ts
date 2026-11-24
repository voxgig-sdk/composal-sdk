

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


describe('AppPreviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppPreview()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppPreview().list({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_preview.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access":{"a":true,"h":"Access","n":"access","r":false,"t":"`$STRING`","key$":"access","index$":0},"app_preview_profile_id":{"a":true,"h":"App Preview Profile Id","n":"app_preview_profile_id","r":true,"t":"`$STRING`","key$":"app_preview_profile_id","index$":1},"change_number":{"a":true,"h":"Change Number","n":"change_number","r":false,"sh":"Organization Change number, optionally prefixed with #; mutually exclusive with source_ref.","t":"`$STRING`","key$":"change_number","index$":2},"expected_generation":{"a":true,"h":"Expected Generation","n":"expected_generation","r":false,"sh":"Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409.","t":"`$INTEGER`","key$":"expected_generation","index$":3},"expected_patchset":{"a":true,"h":"Expected Patchset","n":"expected_patchset","r":false,"sh":"Optional public Change patchset fence; stale selections return 409.","t":"`$INTEGER`","key$":"expected_patchset","index$":4},"expires_at":{"a":true,"h":"Expires At","n":"expires_at","r":false,"t":"`$STRING`","key$":"expires_at","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":6},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":7},"resource_overrides":{"a":true,"h":"Resource Overrides","n":"resource_overrides","r":false,"sh":"Service public IDs mapped to resource overrides.","t":"`$OBJECT`","key$":"resource_overrides","index$":8},"retained":{"a":true,"h":"Retained","n":"retained","r":false,"t":"`$BOOLEAN`","key$":"retained","index$":9},"shared_data_binding_ids":{"a":true,"h":"Shared Data Binding Ids","n":"shared_data_binding_ids","r":false,"sh":"Replace explicitly shared captured native data connections.","t":"`$ARRAY`","key$":"shared_data_binding_ids","index$":10},"shared_service_binding_ids":{"a":true,"h":"Shared Service Binding Ids","n":"shared_service_binding_ids","r":false,"sh":"Replace the explicitly shared captured service dependencies.","t":"`$ARRAY`","key$":"shared_service_binding_ids","index$":11},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":12},"source_ref":{"a":true,"h":"Source Ref","n":"source_ref","r":false,"t":"`$STRING`","key$":"source_ref","index$":13},"storage_binding_resources":{"a":true,"h":"Storage Binding Resources","n":"storage_binding_resources","r":false,"sh":"Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs.","t":"`$OBJECT`","key$":"storage_binding_resources","index$":14}},"id":{"field":"id","name":"id"},"name":"app_preview","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/archive","q":{"$action":"archive","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["app_service_ids","share_app_default_secrets"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{id}/deploy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/deploy","q":{"$action":"deploy","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"deploy"}],"t":{"req":{"app_service_ids":"`reqdata.app_service_id`","share_app_default_secrets":"`reqdata.share_app_default_secret`"},"res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{id}/expire","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/expire","q":{"$action":"expire","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"expire"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{id}/pause","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/pause","q":{"$action":"pause","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"pause"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"bf":["review_token"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{id}/refresh_source","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/refresh_source","q":{"$action":"refresh_source","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"refresh_source"}],"t":{"req":"`reqdata`","res":"`body.preview`"},"index$":4},{"a":true,"bf":["app_service_ids","share_app_default_secrets"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{id}/resume","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/resume","q":{"$action":"resume","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"resume"}],"t":{"req":{"app_service_ids":"`reqdata.app_service_id`","share_app_default_secrets":"`reqdata.share_app_default_secret`"},"res":"`body`"},"index$":5},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{id}/review_source","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/review_source","q":{"$action":"review_source","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"review_source"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6},{"a":true,"bf":["expected_generation","source_ref"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews/{id}/update_revision","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/update_revision","q":{"$action":"update_revision","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"update_revision"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":7},{"a":true,"bf":["app_preview_profile_id","change_number","expected_patchset","name","slug","source_ref"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/previews","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/previews","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"}],"t":{"req":"`reqdata`","res":"`body.preview`"},"index$":8}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/previews","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/previews","q":{"exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/previews/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/previews/{id}","q":{"exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/previews/{id}/administration","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/administration","q":{"$action":"administration","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"administration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/previews/{id}/secret_comparison","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/previews/{id}/secret_comparison","q":{"$action":"secret_comparison","exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"},{"lit":"secret_comparison"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/previews/administration_index","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/previews/administration_index","q":{"$action":"administration_index","exist":["app_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"lit":"administration_index"}],"t":{"req":"`reqdata`","res":"`body.binding_sources`"},"index$":3}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["access","expected_generation","expires_at","resource_overrides","retained","shared_data_binding_ids","shared_service_binding_ids","storage_binding_resources"],"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/previews/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/previews/{id}","q":{"exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/previews/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/previews/{id}","q":{"exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/previews/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/previews/{id}","q":{"exist":["app_id","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"previews"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"key$":"app_preview","name__orig":"app_preview","Name":"AppPreview","name_":"app_preview","name-":"app-preview","NAME":"APP_PREVIEW","index$":62}, {"active":true,"entity":"app_preview","key$":"BasicAppPreviewFlow","kind":"basic","name":"BasicAppPreviewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_preview_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"app_preview_ref01"}}],"index$":1},{"a":true,"d":{"app_id":"app01"},"i":{"ref":"app_preview_ref01","srcdatavar":"app_preview_ref01_data","suffix":"_up0","textfield":"access"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_preview_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"app_preview_ref01","srcdatavar":"app_preview_ref01_data","suffix":"_dt0"},"m":{"id":"app_preview01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_preview_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"app_preview_ref01","suffix":"_rm0"},"m":{"app_id":"app01","id":"app_preview01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"app_id":"app01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"app_preview_ref01"}}],"index$":5}]}, 'AppPreview', {"POST /api/v1/hosting/apps/{app_id}/previews/{id}/archive":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/previews/{id}/deploy":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"app_service_ids":{"type":"array","minItems":1,"items":{"type":"string"},"description":"Public service IDs belonging to this app and configured in this preview. Omit to deploy all configured services. Invalid or empty selections queue no deployments."},"share_app_default_secrets":{"type":"boolean","default":false,"description":"Explicitly approve active app-default secrets for this preview before deployment."}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/previews/{id}/expire":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/previews/{id}/pause":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/previews/{id}/refresh_source":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["review_token"],"properties":{"review_token":{"type":"string"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/previews/{id}/resume":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"app_service_ids":{"type":"array","minItems":1,"items":{"type":"string"},"description":"Public service IDs belonging to this app and configured in this preview. Omit to deploy all configured services. Invalid or empty selections queue no deployments."},"share_app_default_secrets":{"type":"boolean","default":false,"description":"Explicitly approve active app-default secrets for this preview before deployment."}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/previews/{id}/review_source":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/previews/{id}/update_revision":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["source_ref","expected_generation"],"properties":{"source_ref":{"type":"string","minLength":1},"expected_generation":{"type":"integer","minimum":1}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/previews":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["name","slug","app_preview_profile_id"],"properties":{"name":{"type":"string","key$":"name"},"slug":{"type":"string","key$":"slug"},"app_preview_profile_id":{"type":"string","key$":"app_preview_profile_id"},"source_ref":{"type":"string","key$":"source_ref"},"change_number":{"type":"string","description":"Organization Change number, optionally prefixed with #; mutually exclusive with source_ref. Home reviews resolve the app's physical component.","key$":"change_number"},"expected_patchset":{"type":"integer","minimum":1,"description":"Optional public Change patchset fence; stale selections return 409.","key$":"expected_patchset"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/previews":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/previews/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/previews/{id}/administration":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/previews/{id}/secret_comparison":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/previews/administration_index":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/hosting/apps/{app_id}/previews/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"access":{"type":"string","enum":["org_members","public"],"key$":"access"},"retained":{"type":"boolean","key$":"retained"},"expires_at":{"type":"string","key$":"expires_at"},"expected_generation":{"type":"integer","description":"Required for resource_overrides, storage_binding_resources, shared_service_binding_ids or shared_data_binding_ids; stale generations return 409.","key$":"expected_generation"},"storage_binding_resources":{"type":"object","additionalProperties":{"type":"string"},"description":"Replace preview storage selections, mapping captured mount binding IDs to storage resource IDs. Empty removes mounts. Requires a paused preview and completed cleanup. Shared source local caches and compatible pre-provisioned preview-owned volumes are supported; production single-writer volumes cannot be shared. Source refresh resets selections.","key$":"storage_binding_resources"},"shared_data_binding_ids":{"type":"array","items":{"type":"string"},"description":"Replace explicitly shared captured native data connections. Empty removes sharing. Requires paused preview and completed cleanup; runtime credentials come only from active managed connection secrets and require workload grants.","key$":"shared_data_binding_ids"},"shared_service_binding_ids":{"type":"array","items":{"type":"string"},"description":"Replace the explicitly shared captured service dependencies. Empty removes sharing. Requires paused preview and completed cleanup. Source refresh resets this selection.","key$":"shared_service_binding_ids"},"resource_overrides":{"type":"object","description":"Service public IDs mapped to resource overrides. Omitted fields inherit; an empty map removes all local overrides. Null reservations select platform defaults.","additionalProperties":{"type":"object","additionalProperties":false,"properties":{"cpu_mhz":{"type":"integer","minimum":0,"nullable":true},"cpu_hard_limit":{"type":"boolean"},"memory_mb":{"type":"integer","minimum":0,"nullable":true},"memory_max_mb":{"type":"integer","minimum":1,"nullable":true},"disk_mb":{"type":"integer","minimum":0,"nullable":true}},"x-ref":"#/components/schemas/PreviewResourceSettings"},"x-ref":"#/components/schemas/PreviewResourceOverrides","key$":"resource_overrides"}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/previews/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/hosting/apps/{app_id}/previews/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_preview.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/previews/{id}/archive","app_preview.update.2":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/previews/{id}","app_preview.remove.4":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/previews/{id}","app_preview.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_preview_ref01_ent = client.AppPreview()
    let app_preview_ref01_data = setup.data.new.app_preview['app_preview_ref01']
    app_preview_ref01_data['app_id'] = setup.idmap['app01']

    app_preview_ref01_data = (await app_preview_ref01_ent.create(app_preview_ref01_data)).data()
    assert(null != app_preview_ref01_data.id)


    // LIST
    const app_preview_ref01_match: any = {}
    app_preview_ref01_match['app_id'] = setup.idmap['app01']

    const app_preview_ref01_list = (await app_preview_ref01_ent.list(app_preview_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(app_preview_ref01_list, { id: app_preview_ref01_data.id })))


    // UPDATE
    const app_preview_ref01_data_up0: any = {}
    app_preview_ref01_data_up0.id = app_preview_ref01_data.id
    app_preview_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']

    const app_preview_ref01_markdef_up0 = { name: 'access', value: 'Mark01-app_preview_ref01_' + setup.now }
    ;(app_preview_ref01_data_up0 as any)[app_preview_ref01_markdef_up0.name] = app_preview_ref01_markdef_up0.value

    const app_preview_ref01_resdata_up0 = (await app_preview_ref01_ent.update(app_preview_ref01_data_up0)).data()
    assert(app_preview_ref01_resdata_up0.id === app_preview_ref01_data_up0.id)

    assert((app_preview_ref01_resdata_up0 as any)[app_preview_ref01_markdef_up0.name] === app_preview_ref01_markdef_up0.value)


    // LOAD
    const app_preview_ref01_match_dt0: any = {}
    app_preview_ref01_match_dt0.id = app_preview_ref01_data.id
    const app_preview_ref01_data_dt0 = (await app_preview_ref01_ent.load(app_preview_ref01_match_dt0)).data()
    assert(app_preview_ref01_data_dt0.id === app_preview_ref01_data.id)


    // REMOVE
    const app_preview_ref01_match_rm0: any = { id: app_preview_ref01_data.id }
    app_preview_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    await app_preview_ref01_ent.remove(app_preview_ref01_match_rm0)
  

    // LIST
    const app_preview_ref01_match_rt0: any = {}
    app_preview_ref01_match_rt0['app_id'] = setup.idmap['app01']

    const app_preview_ref01_list_rt0 = (await app_preview_ref01_ent.list(app_preview_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(app_preview_ref01_list_rt0, { id: app_preview_ref01_data.id })))


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
      '../../../../.sdk/test/entity/app_preview/AppPreviewTestData.json')

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
    ['app_preview01','app_preview02','app_preview03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_PREVIEW_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_PREVIEW_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_PREVIEW_ENTID']
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
  
