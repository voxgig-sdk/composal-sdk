

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


describe('ControlComputerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.ControlComputer()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ControlComputer().list({"organization_id":1,"persistent_agent_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'control_computer.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"connection":{"a":true,"h":"Connection","n":"connection","r":true,"sh":"A point-in-time control transport observation.","t":"`$OBJECT`","key$":"connection","index$":0},"consent":{"a":true,"h":"Consent","n":"consent","r":true,"t":"`$OBJECT`","key$":"consent","index$":1},"device":{"a":true,"h":"Device","n":"device","r":true,"t":"`$OBJECT`","key$":"device","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":3},"provider_status":{"a":true,"h":"Provider Status","n":"provider_status","r":false,"t":"`$ARRAY`","key$":"provider_status","index$":4}},"id":{"field":"id","name":"id"},"name":"control_computer","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/organizations/{organization_id}/control_computers","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"cursor","or":"cursor","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":false,"explode":true,"k":"query","n":"observe_connection","or":"observe_connection","r":false,"style":"form","t":"`$BOOLEAN`","index$":1},{"a":true,"explode":true,"k":"query","n":"persistent_agent_id","or":"persistent_agent_id","r":true,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/organizations/{organization_id}/control_computers","q":{"exist":["organization_id","persistent_agent_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"control_computers"}],"t":{"page":{"cursor":"`body.next_cursor`"},"req":"`reqdata`","res":"`body.computers`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["enabled","expected_revision","persistent_agent_id","providers"],"co":{"id":"PATCH /api/v1/organizations/{organization_id}/control_computers/{computer}/consent","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"computer","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organization_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/api/v1/organizations/{organization_id}/control_computers/{computer}/consent","q":{"$action":"consent","exist":["id","organization_id"]},"r":{"param":{"computer":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"control_computers"},{"var":"id"},{"lit":"consent"}],"t":{"req":"`reqdata`","res":"`body.computer`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"control_computer","name__orig":"control_computer","Name":"ControlComputer","name_":"control_computer","name-":"control-computer","NAME":"CONTROL_COMPUTER","index$":184}, {"active":true,"entity":"control_computer","key$":"BasicControlComputerFlow","kind":"basic","name":"BasicControlComputerFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"control_computer_ref01"}}],"index$":0},{"a":false,"d":{"organization_id":"organization01"},"i":{"ref":"control_computer_ref01","srcdatavar":"control_computer_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-control_computer_ref01"}}],"v":[],"unreachable":true}]}, 'ControlComputer', {"GET /api/v1/organizations/{organization_id}/control_computers":{"protocol":"http","parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"persistent_agent_id","in":"query","required":true,"schema":{"type":"string"},"index$":1},{"name":"cursor","in":"query","schema":{"type":"string"},"index$":2},{"name":"observe_connection","in":"query","description":"Opt in to a bounded live control connection check after loading metadata. Provider readiness and execution authorization remain separate.","schema":{"type":"boolean","default":false},"index$":3}]},"PATCH /api/v1/organizations/{organization_id}/control_computers/{computer}/consent":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"persistent_agent_id":{"type":"string"},"enabled":{"type":"boolean"},"expected_revision":{"type":["integer","null"],"minimum":1},"providers":{"type":"array","uniqueItems":true,"maxItems":2,"items":{"type":"string","enum":["codex","claude"]},"minItems":1,"description":"Explicit providers for this consent. Omitted keeps legacy Codex-only consent."}},"required":["persistent_agent_id","enabled","expected_revision"],"additionalProperties":true,"x-ref":"#/components/schemas/ControlComputerConsentInput"}}}},"parameters":[{"name":"organization_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"computer","in":"path","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"control_computer.update.1":"GET-only live run: needs PATCH /api/v1/organizations/{organization_id}/control_computers/{computer}/consent"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let control_computer_ref01_data = Object.values(setup.data.existing.control_computer)[0] as any

    // LIST
    const control_computer_ref01_ent = client.ControlComputer()
    const control_computer_ref01_match: any = {}
    control_computer_ref01_match['organization_id'] = setup.idmap['organization01']

    const control_computer_ref01_list = (await control_computer_ref01_ent.list(control_computer_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/control_computer/ControlComputerTestData.json')

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
    ['control_computer01','control_computer02','control_computer03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CONTROL_COMPUTER_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CONTROL_COMPUTER_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CONTROL_COMPUTER_ENTID']
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
  
