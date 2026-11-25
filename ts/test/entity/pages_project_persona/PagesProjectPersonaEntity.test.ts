

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


describe('PagesProjectPersonaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.PagesProjectPersona()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PagesProjectPersona().list({"organization_id":1,"project_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pages_project_persona.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access_mode":{"a":true,"h":"Access Mode","n":"access_mode","r":true,"t":"`$STRING`","key$":"access_mode","index$":0},"active_run_count":{"a":true,"h":"Active Run Count","n":"active_run_count","r":true,"t":"`$INTEGER`","key$":"active_run_count","index$":1},"archived_at":{"a":true,"fo":"date-time","h":"Archived At","n":"archived_at","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"archived_at","index$":2},"attention":{"a":true,"h":"Attention","n":"attention","r":true,"sh":"What needs an operator's eye, problems before notices","t":"`$ARRAY`","key$":"attention","index$":3},"capabilities":{"a":true,"h":"Capabilities","n":"capabilities","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"capabilities","index$":4},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"t":"`$STRING`","key$":"created_at","index$":5},"credential":{"a":true,"h":"Credential","n":"credential","r":true,"t":"`$ANY`","key$":"credential","index$":6},"credential_id":{"a":true,"h":"Credential Id","n":"credential_id","r":true,"sh":"The credential this persona signs in with.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"credential_id","index$":7},"goals":{"a":true,"h":"Goals","n":"goals","r":true,"t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"goals","index$":8},"health":{"a":true,"h":"Health","n":"health","r":true,"t":"`$OBJECT`","key$":"health","index$":9},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":10},"lock_version":{"a":true,"h":"Lock Version","n":"lock_version","r":true,"t":"`$INTEGER`","key$":"lock_version","index$":11},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":12},"project_id":{"a":true,"h":"Project Id","n":"project_id","r":true,"t":"`$STRING`","key$":"project_id","index$":13},"role":{"a":true,"h":"Role","n":"role","r":true,"t":"`$STRING`","key$":"role","index$":14},"scenario_count":{"a":true,"h":"Scenario Count","n":"scenario_count","r":true,"t":"`$INTEGER`","key$":"scenario_count","index$":15},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"t":"`$STRING`","key$":"updated_at","index$":16}},"id":{"field":"id","name":"id"},"name":"pages_project_persona","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"project_id","or":"project_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas","q":{"exist":["organization_id","project_id"]},"r":{"param":{"project_id":"project_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"verification"},{"lit":"projects"},{"var":"project_id"},{"lit":"pages"},{"lit":"personas"}],"t":{"req":"`reqdata`","res":"`body.personas`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.project"]]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"pages_project_persona","name__orig":"pages_project_persona","Name":"PagesProjectPersona","name_":"pages_project_persona","name-":"pages-project-persona","NAME":"PAGES_PROJECT_PERSONA","index$":366}, {"active":true,"entity":"pages_project_persona","key$":"BasicPagesProjectPersonaFlow","kind":"basic","name":"BasicPagesProjectPersonaFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01","project_id":"project01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pages_project_persona_ref01"}}],"index$":0}]}, 'PagesProjectPersona', {"GET /api/v1/organizations/{organization_id}/verification/projects/{project_id}/pages/personas":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"project_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pages_project_persona_ref01_data = Object.values(setup.data.existing.pages_project_persona)[0] as any

    // LIST
    const pages_project_persona_ref01_ent = client.PagesProjectPersona()
    const pages_project_persona_ref01_match: any = {}
    pages_project_persona_ref01_match['organization_id'] = setup.idmap['organization01']
    pages_project_persona_ref01_match['project_id'] = setup.idmap['project01']

    const pages_project_persona_ref01_list = (await pages_project_persona_ref01_ent.list(pages_project_persona_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/pages_project_persona/PagesProjectPersonaTestData.json')

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
    ['pages_project_persona01','pages_project_persona02','pages_project_persona03','organization01','organization02','organization03','project01','project02','project03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_PAGES_PROJECT_PERSONA_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_PAGES_PROJECT_PERSONA_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_PAGES_PROJECT_PERSONA_ENTID']
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
  
