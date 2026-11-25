

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


describe('SparkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.Spark()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Spark().load({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'spark.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"activated_products":{"a":true,"h":"Activated Products","n":"activated_products","r":true,"sh":"Products this organization has activated (PRD 144).","t":"`$ARRAY`","key$":"activated_products","index$":0},"agents_only":{"a":true,"h":"Agents Only","n":"agents_only","r":false,"sh":"Whether this organization uses the agents-only interface; older responses may omit this value.","t":"`$BOOLEAN`","key$":"agents_only","index$":1},"can_activate_products":{"a":true,"h":"Can Activate Products","n":"can_activate_products","r":true,"sh":"Whether the current user may activate a product for this organization: the organization-admin rule the activation endpoint enforces.","t":"`$BOOLEAN`","key$":"can_activate_products","index$":2},"can_manage":{"a":true,"h":"Can Manage","n":"can_manage","r":true,"t":"`$BOOLEAN`","key$":"can_manage","index$":3},"compute_credit_cents":{"a":true,"h":"Compute Credit Cents","n":"compute_credit_cents","r":true,"sh":"Included compute the workspace started Sparks with, when it is on compute billing.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"compute_credit_cents","index$":4},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":5},"created_at_label":{"a":true,"h":"Created At Label","n":"created_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at_label","index$":6},"credit_cents":{"a":true,"h":"Credit Cents","n":"credit_cents","r":true,"sh":"Inference credit the workspace started Sparks with.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"credit_cents","index$":7},"first_spark":{"a":true,"h":"First Spark","n":"first_spark","r":true,"sh":"Null until the first Spark exists or when the viewer cannot read it.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"first_spark","index$":8},"github_connected":{"a":true,"h":"Github Connected","n":"github_connected","r":true,"t":"`$BOOLEAN`","key$":"github_connected","index$":9},"github_prs_authored_by_change_author":{"a":true,"h":"Github Prs Authored By Change Author","n":"github_prs_authored_by_change_author","r":true,"t":"`$BOOLEAN`","key$":"github_prs_authored_by_change_author","index$":10},"id":{"a":true,"h":"Id","n":"id","op":{"create":{"req":false,"type":["`$ONE`",["`$STRING`","`$INTEGER`"]]}},"r":true,"t":"`$STRING`","key$":"id","index$":11},"jsonrpc":{"a":true,"h":"Jsonrpc","n":"jsonrpc","r":true,"t":"`$STRING`","key$":"jsonrpc","index$":12},"logo_url":{"a":true,"h":"Logo Url","n":"logo_url","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"logo_url","index$":13},"member_count":{"a":true,"h":"Member Count","n":"member_count","r":true,"t":"`$INTEGER`","key$":"member_count","index$":14},"method":{"a":true,"h":"Method","n":"method","r":true,"t":"`$STRING`","key$":"method","index$":15},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":16},"params":{"a":true,"h":"Params","n":"params","r":false,"t":"`$OBJECT`","key$":"params","index$":17},"pending_invitation_count":{"a":true,"h":"Pending Invitation Count","n":"pending_invitation_count","r":true,"t":"`$INTEGER`","key$":"pending_invitation_count","index$":18},"personal":{"a":true,"h":"Personal","n":"personal","r":true,"t":"`$BOOLEAN`","key$":"personal","index$":19},"repository_count":{"a":true,"h":"Repository Count","n":"repository_count","r":true,"t":"`$INTEGER`","key$":"repository_count","index$":20},"role":{"a":true,"h":"Role","n":"role","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"role","index$":21},"sandbox_region":{"a":true,"h":"Sandbox Region","n":"sandbox_region","r":true,"t":"`$STRING`","key$":"sandbox_region","index$":22},"shared_agent_personal_accounts_enabled":{"a":true,"h":"Shared Agent Personal Accounts Enabled","n":"shared_agent_personal_accounts_enabled","r":false,"sh":"Whether a shared agent may use one person's account for everyone who chats with it.","t":"`$BOOLEAN`","key$":"shared_agent_personal_accounts_enabled","index$":23},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":24},"source_control_providers":{"a":true,"h":"Source Control Providers","n":"source_control_providers","r":false,"sh":"Connected source control providers for this organization.","t":"`$ARRAY`","key$":"source_control_providers","index$":25},"source_ui_enabled":{"a":true,"h":"Source Ui Enabled","n":"source_ui_enabled","r":false,"sh":"Organization-scoped Source workspace rollout; missing values mean disabled.","t":"`$BOOLEAN`","key$":"source_ui_enabled","index$":26},"started":{"a":true,"h":"Started","n":"started","r":true,"sh":"Whether the workspace has started Sparks.","t":"`$BOOLEAN`","key$":"started","index$":27},"timezone":{"a":true,"h":"Timezone","n":"timezone","r":true,"sh":"Default IANA timezone for organization-local schedules such as nightly dreaming.","t":"`$STRING`","key$":"timezone","index$":28},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":29},"updated_at_label":{"a":true,"h":"Updated At Label","n":"updated_at_label","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at_label","index$":30},"verify_pr_scenario_writing_enabled":{"a":true,"h":"Verify Pr Scenario Writing Enabled","n":"verify_pr_scenario_writing_enabled","r":true,"t":"`$BOOLEAN`","key$":"verify_pr_scenario_writing_enabled","index$":31}},"id":{"field":"id","name":"id"},"name":"spark","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/organizations/{organization_id}/sparks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/organizations/{organization_id}/sparks","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sparks"}],"t":{"req":"`reqdata`","res":"`body.organization`"},"index$":0},{"a":true,"bf":["id","jsonrpc","method","params"],"co":{"id":"POST /v1/mcp/spark","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/mcp/spark","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"mcp"},{"lit":"spark"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/sparks","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/sparks","q":{"exist":["organization_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"sparks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"spark","name__orig":"spark","Name":"Spark","name_":"spark","name-":"spark","NAME":"SPARK","index$":496}, {"active":true,"entity":"spark","key$":"BasicSparkFlow","kind":"basic","name":"BasicSparkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"spark_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":false,"d":{},"i":{"ref":"spark_ref01","srcdatavar":"spark_ref01_data","suffix":"_dt0"},"m":{"id":"spark01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-spark_ref01"}}],"unreachable":true}]}, 'Spark', {"POST /api/v1/organizations/{organization_id}/sparks":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]},"POST /v1/mcp/spark":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["jsonrpc","method"],"properties":{"jsonrpc":{"type":"string","const":"2.0","key$":"jsonrpc"},"id":{"type":["string","integer"],"key$":"id"},"method":{"type":"string","key$":"method"},"params":{"type":"object","additionalProperties":true,"key$":"params"}}}}}},"parameters":[]},"GET /api/v1/organizations/{organization_id}/sparks":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"spark.create.0":"GET-only live run: needs POST /api/v1/organizations/{organization_id}/sparks","spark.load.1":"GET-only live run: reads a record only spark.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const spark_ref01_ent = client.Spark()
    let spark_ref01_data = setup.data.new.spark['spark_ref01']

    spark_ref01_data = (await spark_ref01_ent.create(spark_ref01_data)).data()
    assert(null != spark_ref01_data.id)


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
      '../../../../.sdk/test/entity/spark/SparkTestData.json')

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
    ['spark01','spark02','spark03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_SPARK_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_SPARK_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_SPARK_ENTID']
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
  
