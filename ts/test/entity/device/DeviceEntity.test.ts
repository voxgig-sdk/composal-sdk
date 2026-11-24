

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


describe('DeviceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Device()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Device().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'device.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"architecture":{"a":true,"h":"Architecture","n":"architecture","r":true,"t":"`$STRING`","key$":"architecture","index$":0},"channel":{"a":true,"h":"Channel","n":"channel","r":true,"t":"`$STRING`","key$":"channel","index$":1},"coding_connection":{"a":true,"h":"Coding Connection","n":"coding_connection","r":true,"sh":"Independent organization coding-control service state for the current device owner.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"coding_connection","index$":2},"connection_checked_at":{"a":true,"fo":"date-time","h":"Connection Checked At","n":"connection_checked_at","r":true,"sh":"When this native presence observation was obtained; null when unobserved or unavailable.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"connection_checked_at","index$":3},"connection_status":{"a":true,"h":"Connection Status","n":"connection_status","r":true,"sh":"Display-only native presence.","t":"`$STRING`","key$":"connection_status","index$":4},"control_delivery_policy":{"a":true,"h":"Control Delivery Policy","n":"control_delivery_policy","r":true,"t":"`$OBJECT`","key$":"control_delivery_policy","index$":5},"control_spawn_policy":{"a":true,"h":"Control Spawn Policy","n":"control_spawn_policy","r":true,"t":"`$OBJECT`","key$":"control_spawn_policy","index$":6},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":7},"device":{"a":true,"h":"Device","n":"device","r":true,"t":"`$OBJECT`","key$":"device","index$":8},"environment":{"a":true,"h":"Environment","n":"environment","r":true,"t":"`$STRING`","key$":"environment","index$":9},"execution_available":{"a":true,"h":"Execution Available","n":"execution_available","r":true,"t":"`$BOOLEAN`","key$":"execution_available","index$":10},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":11},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":12},"native_device_id":{"a":true,"h":"Native Device Id","n":"native_device_id","r":true,"t":"`$STRING`","key$":"native_device_id","index$":13},"paired_at":{"a":true,"fo":"date-time","h":"Paired At","n":"paired_at","r":true,"t":"`$STRING`","key$":"paired_at","index$":14},"pairing_generation":{"a":true,"h":"Pairing Generation","n":"pairing_generation","r":true,"t":"`$INTEGER`","key$":"pairing_generation","index$":15},"platform":{"a":true,"h":"Platform","n":"platform","r":true,"t":"`$STRING`","key$":"platform","index$":16},"project_visibility":{"a":true,"h":"Project Visibility","n":"project_visibility","r":true,"sh":"Folder discovery and new-thread selection.","t":"`$OBJECT`","key$":"project_visibility","index$":17},"provider_status":{"a":true,"h":"Provider Status","n":"provider_status","r":false,"sh":"Recent native provider observations; absent on older API replicas.","t":"`$ARRAY`","key$":"provider_status","index$":18},"revoked_at":{"a":true,"fo":"date-time","h":"Revoked At","n":"revoked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at","index$":19},"scheduled_check_ins":{"a":true,"h":"Scheduled Check Ins","n":"scheduled_check_ins","r":false,"sh":"Whether the owner's private agents may check this computer's connection during scheduled runs.","t":"`$BOOLEAN`","key$":"scheduled_check_ins","index$":20},"user_browser_access":{"a":true,"h":"User Browser Access","n":"user_browser_access","r":true,"sh":"Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab.","t":"`$STRING`","key$":"user_browser_access","index$":21}},"id":{"field":"id","name":"id"},"name":"device","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["transport"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/connection","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/connection","q":{"$action":"connection","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"connection"}],"t":{"req":{"transport":"`reqdata.transport`"},"res":"`body`"},"index$":0},{"a":true,"bf":["restricted","version"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_delivery_policy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_delivery_policy","q":{"$action":"control_delivery_policy","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"control_delivery_policy"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["max_agents","repositories","version"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_spawn_policy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_spawn_policy","q":{"$action":"control_spawn_policy","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"control_spawn_policy"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["transport"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/desktop_connection","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/desktop_connection","q":{"$action":"desktop_connection","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"desktop_connection"}],"t":{"req":{"transport":"`reqdata.transport`"},"res":"`body`"},"index$":3},{"a":true,"bf":["transport"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/process_surface","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/process_surface","q":{"$action":"process_surface","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"process_surface"}],"t":{"req":{"transport":"`reqdata.transport`"},"res":"`body`"},"index$":4},{"a":true,"bf":["folders","mode","version"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/project_visibility","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/project_visibility","q":{"$action":"project_visibility","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"project_visibility"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"bf":["architecture","channel","name","platform","public_key"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/reconnect","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/reconnect","q":{"$action":"reconnect","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"reconnect"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6},{"a":true,"bf":["name"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/rename","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/rename","q":{"$action":"rename","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"rename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":7},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/retry_control","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/retry_control","q":{"$action":"retry_control","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"retry_control"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":8},{"a":true,"bf":["pairing_generation"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/revoke","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/revoke","q":{"$action":"revoke","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"revoke"}],"t":{"req":{"pairing_generation":"`reqdata.pairing_generation`"},"res":"`body`"},"index$":9},{"a":true,"bf":["access"],"co":{"id":"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/user_browser_access","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/user_browser_access","q":{"$action":"user_browser_access","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"user_browser_access"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":10}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/devices","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":false,"explode":true,"k":"query","n":"include_revoked","or":"include_revoked","r":false,"style":"form","t":"`$BOOLEAN`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/devices","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"}],"t":{"page":{"cursor":"`body.next_cursor`"},"req":"`reqdata`","res":"`body.devices`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}","q":{"exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.device`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_delivery_policy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_delivery_policy","q":{"$action":"control_delivery_policy","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"control_delivery_policy"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_spawn_policy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_registration_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_spawn_policy","q":{"$action":"control_spawn_policy","exist":["id","organization_id"]},"r":{"param":{"device_registration_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"devices"},{"var":"id"},{"lit":"control_spawn_policy"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"device","name__orig":"device","Name":"Device","name_":"device","name-":"device","NAME":"DEVICE","index$":210}, {"active":true,"entity":"device","key$":"BasicDeviceFlow","kind":"basic","name":"BasicDeviceFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"device_ref01"},"m":{"device_registration_id":"device_registration01","organization_id":"organization01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"device_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"device_ref01","srcdatavar":"device_ref01_data","suffix":"_dt0"},"m":{"id":"device01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-device_ref01"}}],"index$":1,"route":"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}","record":{}}]}, 'Device', {"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/connection":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"transport":{"type":"string","const":"https-control-v1"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_delivery_policy":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["restricted","version"],"properties":{"restricted":{"type":"boolean"},"version":{"type":"integer","minimum":1}},"x-ref":"#/components/schemas/DeviceControlDeliveryPolicy"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_spawn_policy":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["max_agents","repositories","version"],"properties":{"max_agents":{"type":"integer","minimum":0,"maximum":32,"description":"Maximum sessions agents can create through Control. Zero permits unlimited sessions."},"repositories":{"type":"array","maxItems":64,"items":{"type":"string","minLength":3,"maxLength":201,"pattern":"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$"}},"version":{"type":"integer","minimum":1}},"x-ref":"#/components/schemas/DeviceControlSpawnPolicy"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/desktop_connection":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"transport":{"type":"string","const":"https-control-v1"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/process_surface":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"transport":{"type":"string","const":"https-control-v1"}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/project_visibility":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["mode","folders","version"],"properties":{"mode":{"type":"string","enum":["all","selected"]},"folders":{"type":"array","maxItems":20,"items":{"type":"string","maxLength":4096}},"version":{"type":"integer","minimum":1}},"description":"Folder discovery and new-thread selection. Does not restrict existing threads or OS-account command access.","x-ref":"#/components/schemas/DeviceProjectVisibility"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/reconnect":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["name","platform","architecture","channel","public_key"],"properties":{"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"},"platform":{"type":"string","enum":["darwin","win32","linux"],"key$":"platform"},"architecture":{"type":"string","enum":["arm64","x64"],"key$":"architecture"},"channel":{"type":"string","enum":["dev","alpha","release"],"key$":"channel"},"public_key":{"type":"string","pattern":"^[A-Za-z0-9_-]{43}$","key$":"public_key"}},"x-ref":"#/components/schemas/DevicePairingInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/rename":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["name"],"properties":{"name":{"type":"string","minLength":1,"maxLength":100}},"x-ref":"#/components/schemas/DeviceRenameInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/retry_control":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/revoke":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":[],"properties":{"pairing_generation":{"type":"integer","minimum":1,"description":"The generation reviewed by the owner. A newer pairing returns 409."}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/user_browser_access":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["access"],"properties":{"access":{"type":"string","enum":["off","agent_tabs","all_tabs"],"description":"Whether agents may use the owner's own Chrome-family browser here: off, only tabs agents open or the owner shares, or every tab."}},"x-ref":"#/components/schemas/DeviceUserBrowserAccessInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/devices":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"include_revoked","in":"query","required":false,"description":"Include this owner's revoked identity reservations for computer pairing recovery. Ordinary device lists omit them.","schema":{"type":"boolean","default":false},"index$":1},{"name":"cursor","in":"query","required":false,"schema":{"type":"string","maxLength":200},"index$":2}]},"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_delivery_policy":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/devices/{device_registration_id}/control_spawn_policy":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"device_registration_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"device.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/devices/{device_registration_id}/connection"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let device_ref01_data = Object.values(setup.data.existing.device)[0] as any

    // LIST
    const device_ref01_ent = client.Device()
    const device_ref01_match: any = {}
    device_ref01_match['organization_id'] = setup.idmap['organization01']

    const device_ref01_list = (await device_ref01_ent.list(device_ref01_match)).map((e: any) => e.data())


    // LOAD
    const device_ref01_match_dt0: any = {}
    device_ref01_match_dt0.id = device_ref01_data.id
    device_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const device_ref01_data_dt0 = (await device_ref01_ent.load(device_ref01_match_dt0)).data()
    assert(device_ref01_data_dt0.id === device_ref01_data.id)


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
      '../../../../.sdk/test/entity/device/DeviceTestData.json')

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
    ['device01','device02','device03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_DEVICE_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_DEVICE_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_DEVICE_ENTID']
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
  
