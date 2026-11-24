

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


describe('VerificationProjectCredentialEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.VerificationProjectCredential()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.VerificationProjectCredential().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'verification_project_credential.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"browser_authentication":{"a":true,"h":"Browser Authentication","n":"browser_authentication","r":false,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"browser_authentication","index$":0},"browser_session":{"a":true,"h":"Browser Session","n":"browser_session","r":false,"sh":"JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected.","t":"`$STRING`","wo":true,"key$":"browser_session","index$":1},"composal_address":{"a":true,"h":"Composal Address","n":"composal_address","r":true,"sh":"The Composal address provisioned for this account, kept while it signs in with another username so turning the address back on reuses it.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"composal_address","index$":2},"composal_inbox":{"a":true,"h":"Composal Inbox","n":"composal_inbox","r":false,"sh":"email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address,…","t":"`$BOOLEAN`","key$":"composal_inbox","index$":3},"composal_inbox_user":{"a":true,"h":"Composal Inbox User","n":"composal_inbox_user","r":false,"sh":"The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com.","t":"`$STRING`","key$":"composal_inbox_user","index$":4},"composal_managed_google":{"a":true,"h":"Composal Managed Google","n":"composal_managed_google","r":false,"sh":"Select the Composal-managed Google test account when available.","t":"`$BOOLEAN`","key$":"composal_managed_google","index$":5},"configured":{"a":true,"h":"Configured","n":"configured","r":true,"t":"`$BOOLEAN`","key$":"configured","index$":6},"cookies":{"a":true,"h":"Cookies","n":"cookies","r":false,"sh":"Pasted cookies as name=value (Cookie header supported) or name:\"value\", separated by newlines or semicolons.","t":"`$STRING`","wo":true,"key$":"cookies","index$":7},"credential_keys":{"a":true,"h":"Credential Keys","n":"credential_keys","r":true,"t":"`$OBJECT`","key$":"credential_keys","index$":8},"description":{"a":true,"h":"Description","n":"description","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"When to choose this account: role, plan, tenant and intended journeys","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":9},"email_link_auth_origins":{"a":true,"h":"Email Link Auth Origins","n":"email_link_auth_origins","op":{"create":{"req":false,"type":"`$ARRAY`"},"patch":{"req":false,"type":"`$ARRAY`"},"update":{"req":false,"type":"`$ARRAY`"}},"r":true,"sh":"Explicit auth-service origins for protected email-link login and signup links.","t":"`$ARRAY`","key$":"email_link_auth_origins","index$":10},"has_inbox":{"a":true,"h":"Has Inbox","n":"has_inbox","r":true,"sh":"Whether Composal provisioned this address and can show the mail it receives","t":"`$BOOLEAN`","key$":"has_inbox","index$":11},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":12},"identity_provider":{"a":true,"h":"Identity Provider","n":"identity_provider","r":true,"sh":"For oidc_identity accounts, the Composal issuer the app trusts and the persona settings it must match","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"identity_provider","index$":13},"instructions":{"a":true,"h":"Instructions","n":"instructions","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Non-secret login instructions and the expected signed-in state; required for custom login","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"instructions","index$":14},"login_method":{"a":true,"h":"Login Method","n":"login_method","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"login_method","index$":15},"login_url":{"a":true,"h":"Login Url","n":"login_url","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Optional sign-in path or URL.","t":"`$STRING`","key$":"login_url","index$":16},"managed":{"a":true,"h":"Managed","n":"managed","r":true,"t":"`$BOOLEAN`","key$":"managed","index$":17},"mfa_enabled":{"a":true,"h":"Mfa Enabled","n":"mfa_enabled","r":true,"t":"`$BOOLEAN`","key$":"mfa_enabled","index$":18},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":19},"oidc":{"a":true,"h":"Oidc","n":"oidc","r":false,"sh":"Composal sign-in settings for oidc_identity, which only project credentials accept.","t":"`$OBJECT`","key$":"oidc","index$":20},"passkey":{"a":true,"h":"Passkey","n":"passkey","r":false,"sh":"JSON enrollment artifact for a cloud-managed software passkey; never returned.","t":"`$STRING`","wo":true,"key$":"passkey","index$":21},"password":{"a":true,"h":"Password","n":"password","r":false,"sh":"Required for email_password and other password methods, except an email_password account that uses a Composal address","t":"`$STRING`","wo":true,"key$":"password","index$":22},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"t":"`$STRING`","key$":"project_id","index$":23},"provider_guidance":{"a":true,"h":"Provider Guidance","n":"provider_guidance","r":true,"t":"`$STRING`","key$":"provider_guidance","index$":24},"remove_browser_authentication":{"a":true,"h":"Remove Browser Authentication","n":"remove_browser_authentication","r":false,"t":"`$BOOLEAN`","key$":"remove_browser_authentication","index$":25},"remove_totp":{"a":true,"h":"Remove Totp","n":"remove_totp","r":false,"t":"`$BOOLEAN`","key$":"remove_totp","index$":26},"sign_in_verified":{"a":true,"h":"Sign In Verified","n":"sign_in_verified","r":true,"sh":"A sign-in check confirmed this account signs in with its current settings","t":"`$BOOLEAN`","key$":"sign_in_verified","index$":27},"sign_in_verified_at":{"a":true,"fo":"date-time","h":"Sign In Verified At","n":"sign_in_verified_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sign_in_verified_at","index$":28},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":29},"totp_secret":{"a":true,"h":"Totp Secret","n":"totp_secret","r":false,"sh":"Base32 setup key or otpauth URI, not a current one-time code","t":"`$STRING`","wo":true,"key$":"totp_secret","index$":30},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":31},"username":{"a":true,"h":"Username","n":"username","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"username","index$":32}},"id":{"field":"id","name":"id"},"name":"verification_project_credential","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable","q":{"$action":"disable","exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"credentials"},{"var":"id"},{"lit":"disable"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["browser_session","composal_inbox","composal_inbox_user","composal_managed_google","cookies","description","email_link_auth_origins","instructions","login_method","login_url","name","oidc","passkey","password","remove_browser_authentication","remove_totp","totp_secret","username"],"co":{"id":"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"credentials"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"credentials"}],"t":{"req":"`reqdata`","res":"`body.credentials`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"credentials"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/inbox","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/inbox","q":{"$action":"inbox","exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"credentials"},{"var":"id"},{"lit":"inbox"}],"t":{"req":"`reqdata`","res":"`body.messages`"},"index$":1}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["browser_session","composal_inbox","composal_inbox_user","composal_managed_google","cookies","description","email_link_auth_origins","instructions","login_method","login_url","name","oidc","passkey","password","remove_browser_authentication","remove_totp","totp_secret","username"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"credentials"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}],"query":[{"a":true,"ex":false,"explode":true,"k":"query","n":"permanent","or":"permanent","r":false,"style":"form","t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"DELETE","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"credentials"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["browser_session","composal_inbox","composal_inbox_user","composal_managed_google","cookies","description","email_link_auth_origins","instructions","login_method","login_url","name","oidc","passkey","password","remove_browser_authentication","remove_totp","totp_secret","username"],"co":{"id":"PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","q":{"exist":["id","organization_id","project_id"]},"r":{"param":{"id":"id","project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"credentials"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"key$":"verification_project_credential","name__orig":"verification_project_credential","Name":"VerificationProjectCredential","name_":"verification_project_credential","name-":"verification-project-credential","NAME":"VERIFICATION_PROJECT_CREDENTIAL","index$":531}, {"active":true,"entity":"verification_project_credential","key$":"BasicVerificationProjectCredentialFlow","kind":"basic","name":"BasicVerificationProjectCredentialFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"verification_project_credential_ref01"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"verification_project_credential_ref01"}}],"index$":1},{"a":true,"d":{"organization_id":"organization01","project_id":"project01"},"i":{"ref":"verification_project_credential_ref01","srcdatavar":"verification_project_credential_ref01_data","suffix":"_up0","textfield":"browser_session"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-verification_project_credential_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"verification_project_credential_ref01","srcdatavar":"verification_project_credential_ref01_data","suffix":"_dt0"},"m":{"id":"verification_project_credential01","organization_id":"organization01","project_id":"project01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-verification_project_credential_ref01"}}],"index$":3,"route":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","record":{"project_id":"project_id"}},{"a":true,"d":{},"i":{"ref":"verification_project_credential_ref01","suffix":"_rm0"},"m":{"id":"verification_project_credential01","organization_id":"organization01","project_id":"project01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"verification_project_credential_ref01"}}],"index$":5}]}, 'VerificationProjectCredential', {"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"allOf":[{"description":"A project credential signs in on every environment in its project.","allOf":[{"type":"object","properties":{"name":{},"username":{},"login_method":{},"login_url":{},"email_link_auth_origins":{},"description":{},"instructions":{},"composal_inbox":{},"composal_managed_google":{},"composal_inbox_user":{},"password":{},"totp_secret":{},"remove_totp":{},"passkey":{},"cookies":{},"browser_session":{},"remove_browser_authentication":{},"oidc":{}},"x-ref":"#/components/schemas/VerifyLoginAccountInput"}],"x-ref":"#/components/schemas/ProjectCredentialInput"},{"required":["name","login_method"]}]}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/inbox":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"PATCH /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"description":"A project credential signs in on every environment in its project.","allOf":[{"type":"object","properties":{"name":{"type":"string","key$":"name"},"username":{"type":"string","key$":"username"},"login_method":{"type":"string","enum":["email_password","email_link","google","github","custom","passkey","session","oidc_identity"],"key$":"login_method"},"login_url":{"type":"string","description":"Optional sign-in path or URL. Runs use the selected environment origin and retain the path, query and fragment. Not required for oidc_identity. Imported session cookies still require their app URL.","key$":"login_url"},"email_link_auth_origins":{"type":"array","maxItems":20,"uniqueItems":true,"description":"Explicit auth-service origins for protected email-link login and signup links. Only email_link accounts support a nonempty list. Keep login_url on the public app entry; origins must be canonical HTTP(S) origins without credentials, paths, queries or fragments.","items":{"type":"string","format":"uri","maxLength":2000},"key$":"email_link_auth_origins"},"description":{"type":"string","description":"When to choose this account: role, plan, tenant and intended journeys","key$":"description"},"instructions":{"type":"string","description":"Non-secret login instructions and the expected signed-in state; required for custom login","key$":"instructions"},"composal_inbox":{"type":"boolean","description":"email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address, and the account is not configured until then. false returns to the sent username. Omitted keeps the current choice. email_link accounts always use one; true is rejected for other login methods.","key$":"composal_inbox"},"composal_managed_google":{"type":"boolean","description":"Select the Composal-managed Google test account when available.","key$":"composal_managed_google"},"composal_inbox_user":{"type":"string","maxLength":64,"pattern":"^[a-z0-9]+([-_][a-z0-9]+)*$","description":"The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. Omit it to have one suggested from the name. Only names a new address: an existing address cannot be renamed.","key$":"composal_inbox_user"},"password":{"type":"string","writeOnly":true,"description":"Required for email_password and other password methods, except an email_password account that uses a Composal address","key$":"password"},"totp_secret":{"type":"string","writeOnly":true,"description":"Base32 setup key or otpauth URI, not a current one-time code","key$":"totp_secret"},"remove_totp":{"type":"boolean","key$":"remove_totp"},"passkey":{"type":"string","writeOnly":true,"description":"JSON enrollment artifact for a cloud-managed software passkey; never returned. Provider acceptance must be tested.","key$":"passkey"},"cookies":{"type":"string","writeOnly":true,"description":"Pasted cookies as name=value (Cookie header supported) or name:\"value\", separated by newlines or semicolons. Requires login_url for the app scope; stored as an encrypted browser session with a 24-hour import expiry. Values are preserved without URL decoding. Maximum 100 cookies and 1 MiB. Mutually exclusive with passkey and browser_session.","key$":"cookies"},"browser_session":{"type":"string","writeOnly":true,"description":"JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. Maximum 1 MiB.","key$":"browser_session"},"remove_browser_authentication":{"type":"boolean","key$":"remove_browser_authentication"},"oidc":{"type":"object","description":"Composal sign-in settings for oidc_identity, which only project credentials accept. Send the persona's user part, such as billing-admin, as username; Composal signs in as <user>.<organization slug>@cred.composal.ai. Blank values use the defaults.","properties":{"provider_id":{},"auth_url":{},"client_id":{}},"key$":"oidc"}},"x-ref":"#/components/schemas/VerifyLoginAccountInput"}],"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/ProjectCredentialInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2},{"name":"permanent","in":"query","required":false,"schema":{"type":"boolean","default":false},"index$":3}]},"PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"description":"A project credential signs in on every environment in its project.","allOf":[{"type":"object","properties":{"name":{"type":"string","key$":"name"},"username":{"type":"string","key$":"username"},"login_method":{"type":"string","enum":["email_password","email_link","google","github","custom","passkey","session","oidc_identity"],"key$":"login_method"},"login_url":{"type":"string","description":"Optional sign-in path or URL. Runs use the selected environment origin and retain the path, query and fragment. Not required for oidc_identity. Imported session cookies still require their app URL.","key$":"login_url"},"email_link_auth_origins":{"type":"array","maxItems":20,"uniqueItems":true,"description":"Explicit auth-service origins for protected email-link login and signup links. Only email_link accounts support a nonempty list. Keep login_url on the public app entry; origins must be canonical HTTP(S) origins without credentials, paths, queries or fragments.","items":{"type":"string","format":"uri","maxLength":2000},"key$":"email_link_auth_origins"},"description":{"type":"string","description":"When to choose this account: role, plan, tenant and intended journeys","key$":"description"},"instructions":{"type":"string","description":"Non-secret login instructions and the expected signed-in state; required for custom login","key$":"instructions"},"composal_inbox":{"type":"boolean","description":"email_password only: true signs in with a Composal-provisioned email address (reused if already provisioned) whose mail people and agents can read, ignoring username; the password may be saved later, after signing up with that address, and the account is not configured until then. false returns to the sent username. Omitted keeps the current choice. email_link accounts always use one; true is rejected for other login methods.","key$":"composal_inbox"},"composal_managed_google":{"type":"boolean","description":"Select the Composal-managed Google test account when available.","key$":"composal_managed_google"},"composal_inbox_user":{"type":"string","maxLength":64,"pattern":"^[a-z0-9]+([-_][a-z0-9]+)*$","description":"The user part of a new Composal address, which becomes <user>@<organization slug>.mailposal.com. Omit it to have one suggested from the name. Only names a new address: an existing address cannot be renamed.","key$":"composal_inbox_user"},"password":{"type":"string","writeOnly":true,"description":"Required for email_password and other password methods, except an email_password account that uses a Composal address","key$":"password"},"totp_secret":{"type":"string","writeOnly":true,"description":"Base32 setup key or otpauth URI, not a current one-time code","key$":"totp_secret"},"remove_totp":{"type":"boolean","key$":"remove_totp"},"passkey":{"type":"string","writeOnly":true,"description":"JSON enrollment artifact for a cloud-managed software passkey; never returned. Provider acceptance must be tested.","key$":"passkey"},"cookies":{"type":"string","writeOnly":true,"description":"Pasted cookies as name=value (Cookie header supported) or name:\"value\", separated by newlines or semicolons. Requires login_url for the app scope; stored as an encrypted browser session with a 24-hour import expiry. Values are preserved without URL decoding. Maximum 100 cookies and 1 MiB. Mutually exclusive with passkey and browser_session.","key$":"cookies"},"browser_session":{"type":"string","writeOnly":true,"description":"JSON artifact containing scoped app cookies, localStorage and IndexedDB; Google provider cookies and other origins are rejected. Maximum 1 MiB.","key$":"browser_session"},"remove_browser_authentication":{"type":"boolean","key$":"remove_browser_authentication"},"oidc":{"type":"object","description":"Composal sign-in settings for oidc_identity, which only project credentials accept. Send the persona's user part, such as billing-admin, as username; Composal signs in as <user>.<organization slug>@cred.composal.ai. Blank values use the defaults.","properties":{"provider_id":{},"auth_url":{},"client_id":{}},"key$":"oidc"}},"x-ref":"#/components/schemas/VerifyLoginAccountInput"}],"type":"object","additionalProperties":true,"x-ref":"#/components/schemas/ProjectCredentialInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"verification_project_credential.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}/disable","verification_project_credential.update.2":"GET-only live run: needs PUT /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","verification_project_credential.remove.4":"GET-only live run: needs DELETE /api/v1/organizations/{organization_id}/verification/projects/{project_id}/credentials/{id}","verification_project_credential.list.5":"GET-only live run: checks a removal this run does not make"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const verification_project_credential_ref01_ent = client.VerificationProjectCredential()
    let verification_project_credential_ref01_data = setup.data.new.verification_project_credential['verification_project_credential_ref01']
    verification_project_credential_ref01_data['organization_id'] = setup.idmap['organization01']
    verification_project_credential_ref01_data['project_id'] = setup.idmap['project01']

    verification_project_credential_ref01_data = (await verification_project_credential_ref01_ent.create(verification_project_credential_ref01_data)).data()
    assert(null != verification_project_credential_ref01_data.id)


    // LIST
    const verification_project_credential_ref01_match: any = {}
    verification_project_credential_ref01_match['organization_id'] = setup.idmap['organization01']
    verification_project_credential_ref01_match['project_id'] = setup.idmap['project01']

    const verification_project_credential_ref01_list = (await verification_project_credential_ref01_ent.list(verification_project_credential_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(verification_project_credential_ref01_list, { id: verification_project_credential_ref01_data.id })))


    // UPDATE
    const verification_project_credential_ref01_data_up0: any = {}
    verification_project_credential_ref01_data_up0.id = verification_project_credential_ref01_data.id
    verification_project_credential_ref01_data_up0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    verification_project_credential_ref01_data_up0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']

    const verification_project_credential_ref01_markdef_up0 = { name: 'browser_session', value: 'Mark01-verification_project_credential_ref01_' + setup.now }
    ;(verification_project_credential_ref01_data_up0 as any)[verification_project_credential_ref01_markdef_up0.name] = verification_project_credential_ref01_markdef_up0.value

    const verification_project_credential_ref01_resdata_up0 = (await verification_project_credential_ref01_ent.update(verification_project_credential_ref01_data_up0)).data()
    assert(verification_project_credential_ref01_resdata_up0.id === verification_project_credential_ref01_data_up0.id)

    assert((verification_project_credential_ref01_resdata_up0 as any)[verification_project_credential_ref01_markdef_up0.name] === verification_project_credential_ref01_markdef_up0.value)


    // LOAD
    const verification_project_credential_ref01_match_dt0: any = {}
    verification_project_credential_ref01_match_dt0.id = verification_project_credential_ref01_data.id
    verification_project_credential_ref01_match_dt0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    verification_project_credential_ref01_match_dt0['project_id'] = ['string', 'number', 'boolean'].includes(typeof verification_project_credential_ref01_data['project_id']) ?
      verification_project_credential_ref01_data['project_id'] : setup.idmap['project_id'] ?? setup.idmap['project01']
    const verification_project_credential_ref01_data_dt0 = (await verification_project_credential_ref01_ent.load(verification_project_credential_ref01_match_dt0)).data()
    assert(verification_project_credential_ref01_data_dt0.id === verification_project_credential_ref01_data.id)


    // REMOVE
    const verification_project_credential_ref01_match_rm0: any = { id: verification_project_credential_ref01_data.id }
    verification_project_credential_ref01_match_rm0['organization_id'] = setup.idmap['organization_id'] ?? setup.idmap['organization01']
    verification_project_credential_ref01_match_rm0['project_id'] = setup.idmap['project_id'] ?? setup.idmap['project01']
    await verification_project_credential_ref01_ent.remove(verification_project_credential_ref01_match_rm0)
  

    // LIST
    const verification_project_credential_ref01_match_rt0: any = {}
    verification_project_credential_ref01_match_rt0['organization_id'] = setup.idmap['organization01']
    verification_project_credential_ref01_match_rt0['project_id'] = setup.idmap['project01']

    const verification_project_credential_ref01_list_rt0 = (await verification_project_credential_ref01_ent.list(verification_project_credential_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(verification_project_credential_ref01_list_rt0, { id: verification_project_credential_ref01_data.id })))


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
      '../../../../.sdk/test/entity/verification_project_credential/VerificationProjectCredentialTestData.json')

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
    ['verification_project_credential01','verification_project_credential02','verification_project_credential03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_VERIFICATION_PROJECT_CREDENTIAL_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_VERIFICATION_PROJECT_CREDENTIAL_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_VERIFICATION_PROJECT_CREDENTIAL_ENTID']
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
  
