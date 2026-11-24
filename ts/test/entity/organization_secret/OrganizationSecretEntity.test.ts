

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


describe('OrganizationSecretEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.OrganizationSecret()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OrganizationSecret().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization_secret.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"app_environment_id":{"a":true,"h":"App Environment Id","n":"app_environment_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_environment_id","index$":0},"app_service_id":{"a":true,"h":"App Service Id","n":"app_service_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_service_id","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":2},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":3},"created_by":{"a":true,"h":"Created By","n":"created_by","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"created_by","index$":4},"current_version":{"a":true,"h":"Current Version","n":"current_version","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"current_version","index$":5},"description":{"a":true,"h":"Description","n":"description","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":6},"env_key":{"a":true,"h":"Env Key","n":"env_key","r":true,"t":"`$STRING`","key$":"env_key","index$":7},"expose_to_build":{"a":true,"h":"Expose To Build","n":"expose_to_build","r":true,"t":"`$BOOLEAN`","key$":"expose_to_build","index$":8},"expose_to_ci":{"a":true,"h":"Expose To Ci","n":"expose_to_ci","r":true,"t":"`$BOOLEAN`","key$":"expose_to_ci","index$":9},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"hosted_app_id","index$":10},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":11},"last_accessed_at":{"a":true,"fo":"date-time","h":"Last Accessed At","n":"last_accessed_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_accessed_at","index$":12},"last_accessed_at_label":{"a":true,"h":"Last Accessed At Label","n":"last_accessed_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_accessed_at_label","index$":13},"last_accessed_by":{"a":true,"h":"Last Accessed By","n":"last_accessed_by","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"last_accessed_by","index$":14},"latest_version_number":{"a":true,"h":"Latest Version Number","n":"latest_version_number","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"latest_version_number","index$":15},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":16},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"organization_id","index$":17},"owner_service_account_id":{"a":true,"h":"Owner Service Account Id","n":"owner_service_account_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"owner_service_account_id","index$":18},"rotation_policy":{"a":true,"h":"Rotation Policy","n":"rotation_policy","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"rotation_policy","index$":19},"scope_kind":{"a":true,"h":"Scope Kind","n":"scope_kind","r":true,"t":"`$STRING`","key$":"scope_kind","index$":20},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":21},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":22},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":23},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":24}},"id":{"field":"id","name":"id"},"name":"organization_secret","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/disable","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/secrets/{id}/disable","q":{"$action":"disable","exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"id"},{"lit":"disable"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/enable","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/secrets/{id}/enable","q":{"$action":"enable","exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"id"},{"lit":"enable"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/rotate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/secrets/{id}/rotate","q":{"$action":"rotate","exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"id"},{"lit":"rotate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/secrets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/secrets","q":{"exist":["organization_id"]},"r":{"param":{"organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"bf":["env_key","expose_to_ci","name","scope_kind","value"],"co":{"id":"POST /api/v1/identity/organizations/{organization_id}/secrets/upsert","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/identity/organizations/{organization_id}/secrets/upsert","q":{"$action":"upsert","exist":["organization_id"]},"r":{"param":{"organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"lit":"upsert"}],"t":{"req":"`reqdata`","res":"`body.secret`"},"index$":4}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/identity/organizations/{organization_id}/secrets","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/identity/organizations/{organization_id}/secrets","q":{"exist":["organization_id"]},"r":{"param":{"organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"}],"t":{"req":"`reqdata`","res":"`body.secrets`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/identity/organizations/{organization_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/identity/organizations/{organization_id}/secrets/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/identity/organizations/{organization_id}/secrets/{id}/value","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/identity/organizations/{organization_id}/secrets/{id}/value","q":{"$action":"value","exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"id"},{"lit":"value"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/identity/organizations/{organization_id}/secrets/dotenv","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/identity/organizations/{organization_id}/secrets/dotenv","q":{"$action":"dotenv","exist":["organization_id"]},"r":{"param":{"organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"lit":"dotenv"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/identity/organizations/{organization_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/identity/organizations/{organization_id}/secrets/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/identity/organizations/{organization_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/identity/organizations/{organization_id}/secrets/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/identity/organizations/{organization_id}/secrets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/identity/organizations/{organization_id}/secrets/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id","organization_id":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"identity"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"secrets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"organization_secret","name__orig":"organization_secret","Name":"OrganizationSecret","name_":"organization_secret","name-":"organization-secret","NAME":"ORGANIZATION_SECRET","index$":347}, {"active":true,"entity":"organization_secret","key$":"BasicOrganizationSecretFlow","kind":"basic","name":"BasicOrganizationSecretFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"organization_secret_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"organization_secret_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"organization_secret_ref01","srcdatavar":"organization_secret_ref01_data","suffix":"_up0","textfield":"app_environment_id"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_secret_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"organization_secret_ref01","srcdatavar":"organization_secret_ref01_data","suffix":"_dt0"},"m":{"id":"organization_secret01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_secret_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"organization_secret_ref01","suffix":"_rm0"},"m":{"id":"organization_secret01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"organization_secret_ref01"}}],"index$":5}]}, 'OrganizationSecret', {"POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/disable":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/enable":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/rotate":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/identity/organizations/{organization_id}/secrets":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /api/v1/identity/organizations/{organization_id}/secrets/upsert":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["env_key","value"],"properties":{"env_key":{"type":"string"},"name":{"type":"string"},"scope_kind":{"type":"string","enum":["organization"]},"expose_to_ci":{"type":"boolean"},"value":{"type":"string","writeOnly":true}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/identity/organizations/{organization_id}/secrets":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/identity/organizations/{organization_id}/secrets/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/identity/organizations/{organization_id}/secrets/{id}/value":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/identity/organizations/{organization_id}/secrets/dotenv":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/identity/organizations/{organization_id}/secrets/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/identity/organizations/{organization_id}/secrets/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/identity/organizations/{organization_id}/secrets/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"organization_secret.create.0":"GET-only live run: needs POST /api/v1/identity/organizations/{organization_id}/secrets/{id}/disable","organization_secret.update.2":"GET-only live run: needs PUT /api/v1/identity/organizations/{organization_id}/secrets/{id}","organization_secret.remove.4":"GET-only live run: needs DELETE /api/v1/identity/organizations/{organization_id}/secrets/{id}","organization_secret.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const organization_secret_ref01_ent = client.OrganizationSecret()
    let organization_secret_ref01_data = setup.data.new.organization_secret['organization_secret_ref01']
    organization_secret_ref01_data['organization_id'] = setup.idmap['organization01']

    organization_secret_ref01_data = (await organization_secret_ref01_ent.create(organization_secret_ref01_data)).data()
    assert(null != organization_secret_ref01_data.id)


    // LIST
    const organization_secret_ref01_match: any = {}
    organization_secret_ref01_match['organization_id'] = setup.idmap['organization01']

    const organization_secret_ref01_list = (await organization_secret_ref01_ent.list(organization_secret_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(organization_secret_ref01_list, { id: organization_secret_ref01_data.id })))


    // UPDATE
    const organization_secret_ref01_data_up0: any = {}
    organization_secret_ref01_data_up0.id = organization_secret_ref01_data.id
    organization_secret_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const organization_secret_ref01_markdef_up0 = { name: 'app_environment_id', value: 'Mark01-organization_secret_ref01_' + setup.now }
    ;(organization_secret_ref01_data_up0 as any)[organization_secret_ref01_markdef_up0.name] = organization_secret_ref01_markdef_up0.value

    const organization_secret_ref01_resdata_up0 = (await organization_secret_ref01_ent.update(organization_secret_ref01_data_up0)).data()
    assert(organization_secret_ref01_resdata_up0.id === organization_secret_ref01_data_up0.id)

    assert((organization_secret_ref01_resdata_up0 as any)[organization_secret_ref01_markdef_up0.name] === organization_secret_ref01_markdef_up0.value)


    // LOAD
    const organization_secret_ref01_match_dt0: any = {}
    organization_secret_ref01_match_dt0.id = organization_secret_ref01_data.id
    const organization_secret_ref01_data_dt0 = (await organization_secret_ref01_ent.load(organization_secret_ref01_match_dt0)).data()
    assert(organization_secret_ref01_data_dt0.id === organization_secret_ref01_data.id)


    // REMOVE
    const organization_secret_ref01_match_rm0: any = { id: organization_secret_ref01_data.id }
    organization_secret_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await organization_secret_ref01_ent.remove(organization_secret_ref01_match_rm0)
  

    // LIST
    const organization_secret_ref01_match_rt0: any = {}
    organization_secret_ref01_match_rt0['organization_id'] = setup.idmap['organization01']

    const organization_secret_ref01_list_rt0 = (await organization_secret_ref01_ent.list(organization_secret_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(organization_secret_ref01_list_rt0, { id: organization_secret_ref01_data.id })))


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
      '../../../../.sdk/test/entity/organization_secret/OrganizationSecretTestData.json')

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
    ['organization_secret01','organization_secret02','organization_secret03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ORGANIZATION_SECRET_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ORGANIZATION_SECRET_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ORGANIZATION_SECRET_ENTID']
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
  
