

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


describe('AgentConnectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentConnection()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentConnection().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_connection.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actions":{"a":true,"h":"Actions","n":"actions","r":true,"t":"`$ARRAY`","key$":"actions","index$":0},"activity":{"a":true,"h":"Activity","n":"activity","r":true,"t":"`$ARRAY`","key$":"activity","index$":1},"admin_disabled_at":{"a":true,"fo":"date-time","h":"Admin Disabled At","n":"admin_disabled_at","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"admin_disabled_at","index$":2},"agent_tools":{"a":true,"h":"Agent Tools","n":"agent_tools","r":false,"t":"`$BOOLEAN`","key$":"agent_tools","index$":3},"authentication":{"a":true,"h":"Authentication","n":"authentication","r":true,"t":"`$STRING`","key$":"authentication","index$":4},"authorized_at":{"a":true,"h":"Authorized At","n":"authorized_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"authorized_at","index$":5},"can_create_account":{"a":true,"h":"Can Create Account","n":"can_create_account","r":false,"sh":"Whether another account can be created directly from this provider.","t":"`$BOOLEAN`","key$":"can_create_account","index$":6},"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","r":true,"t":"`$OBJECT`","key$":"capabilities","index$":7},"catalog_section":{"a":true,"h":"Catalog Section","n":"catalog_section","r":false,"sh":"Server-owned grouping in the agent integration catalog.","t":"`$STRING`","key$":"catalog_section","index$":8},"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"Short product label, such as CRM or Email.","t":"`$STRING`","key$":"category","index$":9},"certification":{"a":true,"h":"Certification","n":"certification","r":true,"t":"`$STRING`","key$":"certification","index$":10},"checked_at":{"a":true,"h":"Checked At","n":"checked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"checked_at","index$":11},"connection":{"a":true,"h":"Connection","n":"connection","r":true,"t":"`$OBJECT`","key$":"connection","index$":12},"consent":{"a":true,"h":"Consent","n":"consent","r":true,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"consent","index$":13},"created_at":{"a":true,"h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":14},"creation_key":{"a":true,"h":"Creation Key","n":"creation_key","r":false,"sh":"Reuse the same key to recover the account after an interrupted response.","t":"`$STRING`","key$":"creation_key","index$":15},"custodian_id":{"a":true,"h":"Custodian Id","n":"custodian_id","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"custodian_id","index$":16},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"One-line catalog description of the app.","t":"`$STRING`","key$":"description","index$":17},"disabled_reason":{"a":true,"h":"Disabled Reason","n":"disabled_reason","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"disabled_reason","index$":18},"failure_code":{"a":true,"h":"Failure Code","n":"failure_code","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"failure_code","index$":19},"generation":{"a":true,"h":"Generation","n":"generation","r":true,"t":"`$INTEGER`","key$":"generation","index$":20},"grants":{"a":true,"h":"Grants","n":"grants","r":true,"t":"`$ARRAY`","key$":"grants","index$":21},"grants_pagination":{"a":true,"h":"Grants Pagination","n":"grants_pagination","r":true,"t":"`$OBJECT`","key$":"grants_pagination","index$":22},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":23},"limits":{"a":true,"h":"Limits","n":"limits","r":true,"t":"`$OBJECT`","key$":"limits","index$":24},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":25},"organization_id":{"a":true,"h":"Organization Id","n":"organization_id","r":true,"t":"`$STRING`","key$":"organization_id","index$":26},"owner_name":{"a":true,"h":"Owner Name","n":"owner_name","r":false,"t":"`$STRING`","key$":"owner_name","index$":27},"ownership_kind":{"a":true,"h":"Ownership Kind","n":"ownership_kind","r":true,"t":"`$STRING`","key$":"ownership_kind","index$":28},"pagination":{"a":true,"h":"Pagination","n":"pagination","r":true,"t":"`$OBJECT`","key$":"pagination","index$":29},"policy_digest":{"a":true,"h":"Policy Digest","n":"policy_digest","r":true,"t":"`$STRING`","key$":"policy_digest","index$":30},"provider":{"a":true,"h":"Provider","n":"provider","r":true,"t":"`$OBJECT`","key$":"provider","index$":31},"provider_disabled_reason":{"a":true,"h":"Provider Disabled Reason","n":"provider_disabled_reason","r":false,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"provider_disabled_reason","index$":32},"provider_identity":{"a":true,"h":"Provider Identity","n":"provider_identity","r":true,"t":"`$OBJECT`","key$":"provider_identity","index$":33},"revoked_at":{"a":true,"h":"Revoked At","n":"revoked_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"revoked_at","index$":34},"schema_version":{"a":true,"h":"Schema Version","n":"schema_version","r":true,"t":"`$INTEGER`","key$":"schema_version","index$":35},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":36},"toolkit":{"a":true,"h":"Toolkit","n":"toolkit","r":true,"t":"`$STRING`","key$":"toolkit","index$":37},"triggers":{"a":true,"h":"Triggers","n":"triggers","r":true,"t":"`$ARRAY`","key$":"triggers","index$":38},"updated_at":{"a":true,"h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":39},"user_id":{"a":true,"h":"User Id","n":"user_id","r":true,"t":"`$STRING`","key$":"user_id","index$":40},"version":{"a":true,"h":"Version","n":"version","r":true,"t":"`$STRING`","key$":"version","index$":41}},"id":{"field":"id","name":"id"},"name":"agent_connection","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["reason"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/adopt_custody","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/adopt_custody","q":{"$action":"adopt_custody","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"adopt_custody"}],"t":{"req":{"reason":"`reqdata.reason`"},"res":"`body.connection`"},"index$":0},{"a":true,"bf":["callback","enable_for_agent"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/authorize","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/authorize","q":{"$action":"authorize","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"authorize"}],"t":{"req":{"callback":"`reqdata.callback`","enable_for_agent":"`reqdata.enable_for_agent`"},"res":"`body`"},"index$":1},{"a":true,"bf":["expected_generation"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/cancel_sign_in","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/cancel_sign_in","q":{"$action":"cancel_sign_in","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"cancel_sign_in"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["state"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/complete","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/complete","q":{"$action":"complete","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"complete"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":3},{"a":true,"bf":["auth_mode","discovery_url","name","url"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/custom_mcp","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":true,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/custom_mcp","q":{"$action":"custom_mcp","exist":["idempotency_key","organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"lit":"custom_mcp"}],"t":{"req":{"auth_mode":"`reqdata.auth_mode`","discovery_url":"`reqdata.discovery_url`","name":"`reqdata.name`","url":"`reqdata.url`"},"res":"`body.connection`"},"index$":4},{"a":true,"bf":["grant_id","member_id","roles"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/delegate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/delegate","q":{"$action":"delegate","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"delegate"}],"t":{"req":{"grant_id":"`reqdata.grant_id`","member_id":"`reqdata.member_id`","roles":"`reqdata.role`"},"res":"`body`"},"index$":5},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/disconnect","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/disconnect","q":{"$action":"disconnect","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"disconnect"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":6},{"a":true,"bf":["member_id","reason"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/reassign_custody","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/reassign_custody","q":{"$action":"reassign_custody","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"reassign_custody"}],"t":{"req":{"member_id":"`reqdata.member_id`","reason":"`reqdata.reason`"},"res":"`body.connection`"},"index$":7},{"a":true,"bf":["delegation_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/revoke_delegation","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/revoke_delegation","q":{"$action":"revoke_delegation","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"revoke_delegation"}],"t":{"req":{"delegation_id":"`reqdata.delegation_id`"},"res":"`body.delegation`"},"index$":8},{"a":true,"bf":["grant_id"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/revoke_grant","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/revoke_grant","q":{"$action":"revoke_grant","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"revoke_grant"}],"t":{"req":"`reqdata`","res":"`body.grant`"},"index$":9},{"a":true,"bf":["disabled","reason"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/safety_control","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/safety_control","q":{"$action":"safety_control","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"safety_control"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":10},{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/sync","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/sync","q":{"$action":"sync","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"sync"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":11},{"a":true,"bf":["creation_key","name","toolkit"],"co":{"id":"POST /api/v1/organizations/{organization_id}/agent_connections","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"idempotency_key","or":"Idempotency-Key","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/agent_connections","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":12}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_connections","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_connections","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"}],"t":{"page":{"next":"`body.pagination.next`"},"req":"`reqdata`","res":"`body.catalog`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_connections/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"grants_cursor","or":"grants_cursor","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"ex":25,"explode":true,"k":"query","n":"grants_limit","or":"grants_limit","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"ex":25,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_connections/{id}/custody","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/custody","q":{"$action":"custody","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"custody"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/agent_connections/{id}/disconnect_impact","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}/disconnect_impact","q":{"$action":"disconnect_impact","exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"},{"lit":"disconnect_impact"}],"t":{"req":"`reqdata`","res":"`body.automations`"},"index$":2}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["name"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/agent_connections/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/agent_connections/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["name"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/agent_connections/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/agent_connections/{id}","q":{"exist":["id","organization_id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"agent_connections"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.connection`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"agent_connection","name__orig":"agent_connection","Name":"AgentConnection","name_":"agent_connection","name-":"agent-connection","NAME":"AGENT_CONNECTION","index$":9}, {"active":true,"entity":"agent_connection","key$":"BasicAgentConnectionFlow","kind":"basic","name":"BasicAgentConnectionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_connection_ref01"},"m":{"organization_id":"organization01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"agent_connection_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01"},"i":{"ref":"agent_connection_ref01","srcdatavar":"agent_connection_ref01_data","suffix":"_up0","textfield":"admin_disabled_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_connection_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"agent_connection_ref01","srcdatavar":"agent_connection_ref01_data","suffix":"_dt0"},"m":{"id":"agent_connection01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_connection_ref01"}}],"index$":3,"route":"GET /api/v1/organizations/{organization_id}/agent_connections/{id}","record":{"organization_id":"organization_id"}},{"a":true,"d":{},"i":{"ref":"agent_connection_ref01","suffix":"_rm0"},"m":{"id":"agent_connection01","organization_id":"organization01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"agent_connection_ref01"}}],"index$":5}]}, 'AgentConnection', {"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/adopt_custody":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["reason"],"properties":{"reason":{"type":"string","minLength":1,"maxLength":500}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/authorize":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"callback":{"type":"string","enum":["app"],"description":"Return the browser to a page that finishes the sign-in without a Composal session, for the desktop app."},"enable_for_agent":{"type":"string","description":"An agent the caller can change; Rails switches the account on for it once the sign-in finishes."}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/cancel_sign_in":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"expected_generation":{"type":"integer","minimum":0,"description":"The authorization generation displayed on the unfinished account."}},"required":["expected_generation"],"additionalProperties":true,"x-ref":"#/components/schemas/CancelIntegrationSignIn"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/complete":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"state":{"type":"string","minLength":64,"maxLength":64}},"required":["state"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/custom_mcp":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["name","url","auth_mode"],"properties":{"name":{"type":"string","maxLength":100},"url":{"type":"string","maxLength":2048},"auth_mode":{"type":"string","enum":["NO_AUTH","API_KEY","DCR_OAUTH"]},"discovery_url":{"type":"string","maxLength":2048}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"Idempotency-Key","in":"header","required":true,"schema":{"type":"string","maxLength":80},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/delegate":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"grant_id":{"type":"string"},"member_id":{"type":"string"},"roles":{"type":"array","items":{"type":"string","enum":["invoke","approve"]},"minItems":1,"maxItems":2,"uniqueItems":true}},"required":["grant_id","member_id","roles"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/disconnect":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/reassign_custody":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"required":["reason","member_id"],"properties":{"reason":{"type":"string","minLength":1,"maxLength":500},"member_id":{"type":"string","minLength":1}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/revoke_delegation":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":false,"properties":{"delegation_id":{"type":"string"}},"required":["delegation_id"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/revoke_grant":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"grant_id":{"type":"string"}},"required":["grant_id"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/safety_control":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["disabled","reason"],"properties":{"disabled":{"type":"boolean"},"reason":{"type":"string","minLength":1,"maxLength":500}}}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections/{id}/sync":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/organizations/{organization_id}/agent_connections":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"toolkit":{"type":"string","key$":"toolkit"},"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"},"creation_key":{"type":"string","pattern":"^[a-zA-Z0-9_-]{1,80}$","description":"Reuse the same key to recover the account after an interrupted response. If the Idempotency-Key header is also sent, both values must match.","key$":"creation_key"}},"required":["toolkit","name"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"Idempotency-Key","in":"header","schema":{"type":"string","pattern":"^[a-zA-Z0-9_-]{1,80}$"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/agent_connections":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","schema":{"type":"string"},"index$":1},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":100},"index$":2}]},"GET /api/v1/organizations/{organization_id}/agent_connections/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":25},"index$":2},{"name":"cursor","in":"query","required":false,"schema":{"type":"string"},"index$":3},{"name":"grants_limit","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":25},"index$":4},{"name":"grants_cursor","in":"query","required":false,"schema":{"type":"string"},"index$":5}]},"GET /api/v1/organizations/{organization_id}/agent_connections/{id}/custody":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"cursor","in":"query","schema":{"type":"string"},"index$":2},{"name":"limit","in":"query","schema":{"type":"integer","minimum":1,"maximum":100},"index$":3}]},"GET /api/v1/organizations/{organization_id}/agent_connections/{id}/disconnect_impact":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PATCH /api/v1/organizations/{organization_id}/agent_connections/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"}},"required":["name"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/organizations/{organization_id}/agent_connections/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"PUT /api/v1/organizations/{organization_id}/agent_connections/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"properties":{"name":{"type":"string","minLength":1,"maxLength":100,"key$":"name"}},"required":["name"]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_connection.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/agent_connections/{id}/adopt_custody","agent_connection.update.2":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/agent_connections/{id}","agent_connection.remove.4":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/agent_connections/{id}","agent_connection.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const agent_connection_ref01_ent = client.AgentConnection()
    let agent_connection_ref01_data = setup.data.new.agent_connection['agent_connection_ref01']
    agent_connection_ref01_data['organization_id'] = setup.idmap['organization01']

    agent_connection_ref01_data = (await agent_connection_ref01_ent.create(agent_connection_ref01_data)).data()
    assert(null != agent_connection_ref01_data.id)


    // LIST
    const agent_connection_ref01_match: any = {}
    agent_connection_ref01_match['organization_id'] = setup.idmap['organization01']

    const agent_connection_ref01_list = (await agent_connection_ref01_ent.list(agent_connection_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(agent_connection_ref01_list, { id: agent_connection_ref01_data.id })))


    // UPDATE
    const agent_connection_ref01_data_up0: any = {}
    agent_connection_ref01_data_up0.id = agent_connection_ref01_data.id
    agent_connection_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']

    const agent_connection_ref01_markdef_up0 = { name: 'admin_disabled_at', value: 'Mark01-agent_connection_ref01_' + setup.now }
    ;(agent_connection_ref01_data_up0 as any)[agent_connection_ref01_markdef_up0.name] = agent_connection_ref01_markdef_up0.value

    const agent_connection_ref01_resdata_up0 = (await agent_connection_ref01_ent.update(agent_connection_ref01_data_up0)).data()
    assert(agent_connection_ref01_resdata_up0.id === agent_connection_ref01_data_up0.id)

    assert((agent_connection_ref01_resdata_up0 as any)[agent_connection_ref01_markdef_up0.name] === agent_connection_ref01_markdef_up0.value)


    // LOAD
    const agent_connection_ref01_match_dt0: any = {}
    agent_connection_ref01_match_dt0.id = agent_connection_ref01_data.id
    agent_connection_ref01_match_dt0['organization_id'] = ['string', 'number', 'boolean'].includes(typeof agent_connection_ref01_data['organization_id']) ?
      agent_connection_ref01_data['organization_id'] : setup.idmap['organization_id'] ?? setup.idmap['organization01']
    const agent_connection_ref01_data_dt0 = (await agent_connection_ref01_ent.load(agent_connection_ref01_match_dt0)).data()
    assert(agent_connection_ref01_data_dt0.id === agent_connection_ref01_data.id)


    // REMOVE
    const agent_connection_ref01_match_rm0: any = { id: agent_connection_ref01_data.id }
    agent_connection_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    await agent_connection_ref01_ent.remove(agent_connection_ref01_match_rm0)
  

    // LIST
    const agent_connection_ref01_match_rt0: any = {}
    agent_connection_ref01_match_rt0['organization_id'] = setup.idmap['organization01']

    const agent_connection_ref01_list_rt0 = (await agent_connection_ref01_ent.list(agent_connection_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(agent_connection_ref01_list_rt0, { id: agent_connection_ref01_data.id })))


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
      '../../../../.sdk/test/entity/agent_connection/AgentConnectionTestData.json')

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
    ['agent_connection01','agent_connection02','agent_connection03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_CONNECTION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_CONNECTION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_CONNECTION_ENTID']
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
  
