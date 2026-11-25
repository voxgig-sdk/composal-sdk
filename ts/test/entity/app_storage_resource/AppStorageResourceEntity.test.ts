

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


describe('AppStorageResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AppStorageResource()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AppStorageResource().load({"app_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'app_storage_resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access_mode":{"a":true,"h":"Access Mode","n":"access_mode","r":true,"sh":"Object-store semantics only; ignored for volume resources","t":"`$STRING`","key$":"access_mode","index$":0},"app_environment_id":{"a":true,"h":"App Environment Id","n":"app_environment_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"app_environment_id","index$":1},"attachment":{"a":true,"h":"Attachment","n":"attachment","r":true,"sh":"Attachment readback: CSI publish state for nomad_csi, or the nodes carrying the directory for local_nvme.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"attachment","index$":2},"capacity_gb":{"a":true,"h":"Capacity Gb","n":"capacity_gb","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"Enforced for nomad_csi (minimum 10 GB).","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"capacity_gb","index$":3},"capacity_label":{"a":true,"h":"Capacity Label","n":"capacity_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"capacity_label","index$":4},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":5},"ephemeral":{"a":true,"h":"Ephemeral","n":"ephemeral","r":true,"sh":"True when the contents may be deleted at any time and do not survive the loss of the underlying node.","t":"`$BOOLEAN`","key$":"ephemeral","index$":6},"external_volume_id":{"a":true,"h":"External Volume Id","n":"external_volume_id","r":true,"sh":"Nomad/CSI volume id assigned at provisioning","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"external_volume_id","index$":7},"hosted_app_id":{"a":true,"h":"Hosted App Id","n":"hosted_app_id","r":true,"t":"`$STRING`","key$":"hosted_app_id","index$":8},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":9},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"t":"`$STRING`","key$":"kind","index$":10},"location_code":{"a":true,"h":"Location Code","n":"location_code","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"location_code","index$":11},"location_id":{"a":true,"h":"Location Id","n":"location_id","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Volume datacenter pin (volume kind only)","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"location_id","index$":12},"mount_path":{"a":true,"h":"Mount Path","n":"mount_path","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"mount_path","index$":13},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":14},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"sh":"Storage backend.","t":"`$STRING`","key$":"provider","index$":15},"provider_error":{"a":true,"h":"Provider Error","n":"provider_error","r":true,"sh":"Last provisioning/teardown error from the storage provider","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"provider_error","index$":16},"region":{"a":true,"h":"Region","n":"region","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"region","index$":17},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":18},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":19},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":20}},"id":{"field":"id","name":"id"},"name":"app_storage_resource","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["confirm"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive","q":{"$action":"archive","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"},{"var":"id"},{"lit":"archive"}],"t":{"req":"`reqdata`","res":"`body.storage_resource`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/issue_access_key","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/storage_resources/{id}/issue_access_key","q":{"$action":"issue_access_key","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"},{"var":"id"},{"lit":"issue_access_key"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/resume","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/storage_resources/{id}/resume","q":{"$action":"resume","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"},{"var":"id"},{"lit":"resume"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/suspend","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/storage_resources/{id}/suspend","q":{"$action":"suspend","exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"},{"var":"id"},{"lit":"suspend"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"bf":["access_mode","app_environment_id","capacity_gb","kind","location_id","mount_path","name","provider","region","slug","status"],"co":{"id":"POST /api/v1/hosting/apps/{app_id}/storage_resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/hosting/apps/{app_id}/storage_resources","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"}],"t":{"req":"`reqdata`","res":"`body.storage_resource`"},"index$":4}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/storage_resources/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/storage_resources/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/hosting/apps/{app_id}/storage_resources","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/hosting/apps/{app_id}/storage_resources","q":{"exist":["app_id"]},"r":{"param":{"app_id":"app_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/hosting/apps/{app_id}/storage_resources/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/hosting/apps/{app_id}/storage_resources/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/hosting/apps/{app_id}/storage_resources/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/hosting/apps/{app_id}/storage_resources/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PUT /api/v1/hosting/apps/{app_id}/storage_resources/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"app_id","or":"app_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/hosting/apps/{app_id}/storage_resources/{id}","q":{"exist":["app_id","id"]},"r":{"param":{"app_id":"app_id","id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"hosting"},{"lit":"apps"},{"var":"app_id"},{"lit":"storage_resources"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.app"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"app_storage_resource","name__orig":"app_storage_resource","Name":"AppStorageResource","name_":"app_storage_resource","name-":"app-storage-resource","NAME":"APP_STORAGE_RESOURCE","index$":96}, {"active":true,"entity":"app_storage_resource","key$":"BasicAppStorageResourceFlow","kind":"basic","name":"BasicAppStorageResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"app_storage_resource_ref01"},"m":{"app_id":"app01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"app_id":"app01"},"i":{"ref":"app_storage_resource_ref01","srcdatavar":"app_storage_resource_ref01_data","suffix":"_up0","textfield":"access_mode"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_storage_resource_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"app_storage_resource_ref01","srcdatavar":"app_storage_resource_ref01_data","suffix":"_dt0"},"m":{"id":"app_storage_resource01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-app_storage_resource_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"app_storage_resource_ref01","suffix":"_rm0"},"m":{"app_id":"app01","id":"app_storage_resource01"},"o":"remove","s":[],"v":[],"index$":3}]}, 'AppStorageResource', {"POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"description":"Volume archives are destructive (detach + cloud delete) and must send confirm=archive; bucket archives need no body","properties":{"confirm":{"type":"string","enum":["archive"]}}}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/issue_access_key":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/resume":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/suspend":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/hosting/apps/{app_id}/storage_resources":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["slug","name","kind","provider","access_mode","status"],"properties":{"app_environment_id":{"type":"string","key$":"app_environment_id"},"location_id":{"type":"string","description":"Required for volume kind. nomad_csi needs a CSI-plugin-enabled location; local_nvme works in any location and pins the volume to that datacenter","key$":"location_id"},"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"kind":{"type":"string","enum":["bucket","volume"],"key$":"kind"},"provider":{"type":"string","enum":["s3","tigris","nomad_csi","local_nvme","local_nvme_authority"],"description":"Storage backend. `local_nvme` volumes are node-local NVMe caches and are EPHEMERAL by contract — deletable at any time, gone with their node, and safe to lose. They ignore capacity_gb (it is advisory) and are not resizable. `local_nvme_authority` provisions one pinned single-writer directory and refuses destructive repair or empty replacement after node loss. Remote replication and fenced restoration are required for repository authority durability.","key$":"provider"},"region":{"type":"string","key$":"region"},"access_mode":{"type":"string","enum":["private","public","internal"],"key$":"access_mode"},"mount_path":{"type":"string","key$":"mount_path"},"capacity_gb":{"type":"integer","minimum":0,"description":"Enforced for nomad_csi (minimum 10 GB). Advisory only for local_nvme, which claims no reservation","key$":"capacity_gb"},"status":{"type":"string","enum":["provisioning","available","updating","failed","archived"],"key$":"status"}},"additionalProperties":true,"x-ref":"#/components/schemas/AppStorageResourceCreatePayload"}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"GET /api/v1/hosting/apps/{app_id}/storage_resources/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/hosting/apps/{app_id}/storage_resources":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/hosting/apps/{app_id}/storage_resources/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/hosting/apps/{app_id}/storage_resources/{id}":{"protocol":"http","parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/hosting/apps/{app_id}/storage_resources/{id}":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"app_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"app_storage_resource.create.0":"GET-only live run: needs POST /api/v1/hosting/apps/{app_id}/storage_resources/{id}/archive","app_storage_resource.update.1":"GET-only live run: needs PUT /api/v1/hosting/apps/{app_id}/storage_resources/{id}","app_storage_resource.load.2":"GET-only live run: reads a record only app_storage_resource.create.0 gives","app_storage_resource.remove.3":"GET-only live run: needs DELETE /api/v1/hosting/apps/{app_id}/storage_resources/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const app_storage_resource_ref01_ent = client.AppStorageResource()
    let app_storage_resource_ref01_data = setup.data.new.app_storage_resource['app_storage_resource_ref01']
    app_storage_resource_ref01_data['app_id'] = setup.idmap['app01']

    app_storage_resource_ref01_data = (await app_storage_resource_ref01_ent.create(app_storage_resource_ref01_data)).data()
    assert(null != app_storage_resource_ref01_data.id)


    // UPDATE
    const app_storage_resource_ref01_data_up0: any = {}
    app_storage_resource_ref01_data_up0.id = app_storage_resource_ref01_data.id
    app_storage_resource_ref01_data_up0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']

    const app_storage_resource_ref01_markdef_up0 = { name: 'access_mode', value: 'Mark01-app_storage_resource_ref01_' + setup.now }
    ;(app_storage_resource_ref01_data_up0 as any)[app_storage_resource_ref01_markdef_up0.name] = app_storage_resource_ref01_markdef_up0.value

    const app_storage_resource_ref01_resdata_up0 = (await app_storage_resource_ref01_ent.update(app_storage_resource_ref01_data_up0)).data()
    assert(app_storage_resource_ref01_resdata_up0.id === app_storage_resource_ref01_data_up0.id)

    assert((app_storage_resource_ref01_resdata_up0 as any)[app_storage_resource_ref01_markdef_up0.name] === app_storage_resource_ref01_markdef_up0.value)


    // LOAD
    const app_storage_resource_ref01_match_dt0: any = {}
    app_storage_resource_ref01_match_dt0.id = app_storage_resource_ref01_data.id
    const app_storage_resource_ref01_data_dt0 = (await app_storage_resource_ref01_ent.load(app_storage_resource_ref01_match_dt0)).data()
    assert(app_storage_resource_ref01_data_dt0.id === app_storage_resource_ref01_data.id)


    // REMOVE
    const app_storage_resource_ref01_match_rm0: any = { id: app_storage_resource_ref01_data.id }
    app_storage_resource_ref01_match_rm0['app_id'] = setup.idmap['app_id'] ?? setup.idmap['app01']
    await app_storage_resource_ref01_ent.remove(app_storage_resource_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/app_storage_resource/AppStorageResourceTestData.json')

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
    ['app_storage_resource01','app_storage_resource02','app_storage_resource03','app01','app02','app03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_APP_STORAGE_RESOURCE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_APP_STORAGE_RESOURCE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_APP_STORAGE_RESOURCE_ENTID']
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
  
