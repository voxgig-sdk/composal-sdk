

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


describe('OrganizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Organization()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('organization hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of ComposalSDK.test(offline).Organization().stream('list')) { }
    }, /offline/)

    for await (const _item of ComposalSDK.test(offline).Organization()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = ComposalSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Organization().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of ComposalSDK.test().Organization().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new ComposalSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Organization().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Organization().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Organization().list({"agents_only":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activated_products":{"a":true,"h":"Activated Products","n":"activated_products","r":true,"sh":"Products this organization has activated (PRD 144).","t":"`$ARRAY`","key$":"activated_products","index$":0},"agents_only":{"a":true,"h":"Agents Only","n":"agents_only","r":false,"sh":"Whether this organization uses the agents-only interface; older responses may omit this value.","t":"`$BOOLEAN`","key$":"agents_only","index$":1},"can_activate_products":{"a":true,"h":"Can Activate Products","n":"can_activate_products","r":true,"sh":"Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces.","t":"`$BOOLEAN`","key$":"can_activate_products","index$":2},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":3},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":4},"github_prs_authored_by_change_author":{"a":true,"h":"Github Prs Authored By Change Author","n":"github_prs_authored_by_change_author","op":{"patch":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"github_prs_authored_by_change_author","index$":5},"google_workspace_domain":{"a":true,"h":"Google Workspace Domain","n":"google_workspace_domain","r":false,"sh":"Owners can approve their verified Google Workspace domain, or send null to disable automatic joining.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"google_workspace_domain","index$":6},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":7},"logo_url":{"a":true,"h":"Logo Url","n":"logo_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"logo_url","index$":8},"member_count":{"a":true,"h":"Member Count","n":"member_count","r":true,"t":"`$INTEGER`","key$":"member_count","index$":9},"name":{"a":true,"h":"Name","n":"name","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"name","index$":10},"pending_invitation_count":{"a":true,"h":"Pending Invitation Count","n":"pending_invitation_count","r":true,"t":"`$INTEGER`","key$":"pending_invitation_count","index$":11},"personal":{"a":true,"h":"Personal","n":"personal","r":true,"t":"`$BOOLEAN`","key$":"personal","index$":12},"repository_count":{"a":true,"h":"Repository Count","n":"repository_count","r":true,"t":"`$INTEGER`","key$":"repository_count","index$":13},"role":{"a":true,"h":"Role","n":"role","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"role","index$":14},"sandbox_region":{"a":true,"h":"Sandbox Region","n":"sandbox_region","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"sandbox_region","index$":15},"shared_agent_personal_accounts_enabled":{"a":true,"h":"Shared Agent Personal Accounts Enabled","n":"shared_agent_personal_accounts_enabled","r":false,"sh":"Whether a shared agent may use one person's account for everyone who chats with it.","t":"`$BOOLEAN`","key$":"shared_agent_personal_accounts_enabled","index$":16},"slug":{"a":true,"h":"Slug","n":"slug","op":{"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"slug","index$":17},"source_control_providers":{"a":true,"h":"Source Control Providers","n":"source_control_providers","r":false,"sh":"Connected source control providers for this organization.","t":"`$ARRAY`","key$":"source_control_providers","index$":18},"source_ui_enabled":{"a":true,"h":"Source Ui Enabled","n":"source_ui_enabled","r":false,"sh":"Organization-scoped Source workspace rollout; missing values mean disabled.","t":"`$BOOLEAN`","key$":"source_ui_enabled","index$":19},"timezone":{"a":true,"h":"Timezone","n":"timezone","op":{"create":{"req":false,"type":"`$STRING`"},"patch":{"req":false,"type":"`$STRING`"},"update":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Default IANA timezone for organization-local schedules such as nightly dreaming.","t":"`$STRING`","key$":"timezone","index$":20},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":21},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":22},"verify_pr_scenario_writing_enabled":{"a":true,"h":"Verify Pr Scenario Writing Enabled","n":"verify_pr_scenario_writing_enabled","op":{"patch":{"req":false,"type":"`$BOOLEAN`"},"update":{"req":false,"type":"`$BOOLEAN`"}},"r":true,"t":"`$BOOLEAN`","key$":"verify_pr_scenario_writing_enabled","index$":23}},"id":{"field":"id","name":"id"},"name":"organization","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["name","slug","timezone"],"co":{"id":"POST /api/v1/organizations","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/organizations","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"}],"t":{"req":"`reqdata`","res":"`body.organization`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/organizations","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"}],"t":{"req":"`reqdata`","res":"`body.organizations`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.organization`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"bf":["github_prs_authored_by_change_author","google_workspace_domain","name","sandbox_region","shared_agent_personal_accounts_enabled","slug","timezone","verify_pr_scenario_writing_enabled"],"co":{"id":"PATCH /api/v1/organizations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.organization`"},"index$":0}],"key$":"patch"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["github_prs_authored_by_change_author","google_workspace_domain","name","sandbox_region","shared_agent_personal_accounts_enabled","slug","timezone","verify_pr_scenario_writing_enabled"],"co":{"id":"PUT /api/v1/organizations/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PUT","o":"/api/v1/organizations/{id}","q":{"exist":["id"]},"r":{"param":{"id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.organization`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"organization","name__orig":"organization","Name":"Organization","name_":"organization","name-":"organization","NAME":"ORGANIZATION","index$":334}, {"active":true,"entity":"organization","key$":"BasicOrganizationFlow","kind":"basic","name":"BasicOrganizationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"organization_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"organization_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_up0","textfield":"created_at"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_dt0"},"m":{"id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"index$":3,"route":"GET /api/v1/organizations/{id}","record":{}}]}, 'Organization', {"POST /api/v1/organizations":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["slug","name"],"properties":{"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"timezone":{"type":"string","description":"IANA timezone; defaults to UTC","key$":"timezone"}},"additionalProperties":true,"x-ref":"#/components/schemas/OrganizationCreatePayload"}}}},"parameters":[]},"GET /api/v1/organizations":{"protocol":"http","parameters":[]},"GET /api/v1/organizations/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PATCH /api/v1/organizations/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"google_workspace_domain":{"type":"string","nullable":true,"description":"Owners can approve their verified Google Workspace domain, or send null to disable automatic joining.","key$":"google_workspace_domain"},"sandbox_region":{"type":"string","enum":["us-was-1","us-pdx-1","eu-lon-1","eu-fra-1","auto"],"key$":"sandbox_region"},"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"timezone":{"type":"string","description":"IANA timezone such as America/New_York","key$":"timezone"},"github_prs_authored_by_change_author":{"type":"boolean","key$":"github_prs_authored_by_change_author"},"verify_pr_scenario_writing_enabled":{"type":"boolean","key$":"verify_pr_scenario_writing_enabled"},"shared_agent_personal_accounts_enabled":{"type":"boolean","description":"Whether a shared agent may use one person's account for everyone who chats with it.","key$":"shared_agent_personal_accounts_enabled"}},"additionalProperties":true,"x-ref":"#/components/schemas/OrganizationUpdatePayload"}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"PUT /api/v1/organizations/{id}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"google_workspace_domain":{"type":"string","nullable":true,"description":"Owners can approve their verified Google Workspace domain, or send null to disable automatic joining.","key$":"google_workspace_domain"},"sandbox_region":{"type":"string","enum":["us-was-1","us-pdx-1","eu-lon-1","eu-fra-1","auto"],"key$":"sandbox_region"},"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"timezone":{"type":"string","description":"IANA timezone such as America/New_York","key$":"timezone"},"github_prs_authored_by_change_author":{"type":"boolean","key$":"github_prs_authored_by_change_author"},"verify_pr_scenario_writing_enabled":{"type":"boolean","key$":"verify_pr_scenario_writing_enabled"},"shared_agent_personal_accounts_enabled":{"type":"boolean","description":"Whether a shared agent may use one person's account for everyone who chats with it.","key$":"shared_agent_personal_accounts_enabled"}},"additionalProperties":true,"x-ref":"#/components/schemas/OrganizationUpdatePayload"}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"organization.create.0":"GET-only live run: needs POST /api/v1/organizations","organization.update.2":"GET-only live run: needs PUT /api/v1/organizations/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const organization_ref01_ent = client.Organization()
    let organization_ref01_data = setup.data.new.organization['organization_ref01']

    organization_ref01_data = (await organization_ref01_ent.create(organization_ref01_data)).data()
    assert(null != organization_ref01_data.id)


    // LIST
    const organization_ref01_match: any = {}

    const organization_ref01_list = (await organization_ref01_ent.list(organization_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(organization_ref01_list, { id: organization_ref01_data.id })))


    // UPDATE
    const organization_ref01_data_up0: any = {}
    organization_ref01_data_up0.id = organization_ref01_data.id

    const organization_ref01_markdef_up0 = { name: 'created_at', value: 'Mark01-organization_ref01_' + setup.now }
    ;(organization_ref01_data_up0 as any)[organization_ref01_markdef_up0.name] = organization_ref01_markdef_up0.value

    const organization_ref01_resdata_up0 = (await organization_ref01_ent.update(organization_ref01_data_up0)).data()
    assert(organization_ref01_resdata_up0.id === organization_ref01_data_up0.id)

    assert((organization_ref01_resdata_up0 as any)[organization_ref01_markdef_up0.name] === organization_ref01_markdef_up0.value)


    // LOAD
    const organization_ref01_match_dt0: any = {}
    organization_ref01_match_dt0.id = organization_ref01_data.id
    const organization_ref01_data_dt0 = (await organization_ref01_ent.load(organization_ref01_match_dt0)).data()
    assert(organization_ref01_data_dt0.id === organization_ref01_data.id)


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
      '../../../../.sdk/test/entity/organization/OrganizationTestData.json')

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
    ['organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ORGANIZATION_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ORGANIZATION_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ORGANIZATION_ENTID']
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
  
