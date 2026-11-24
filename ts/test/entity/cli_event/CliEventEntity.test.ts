

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


describe('CliEventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.CliEvent()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CliEvent().create({"event":1,"properties":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cli_event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"event":{"a":true,"h":"Event","n":"event","r":true,"t":"`$STRING`","key$":"event","index$":0},"properties":{"a":true,"h":"Properties","n":"properties","r":true,"t":"`$OBJECT`","key$":"properties","index$":1}},"name":"cli_event","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["event","properties"],"co":{"id":"POST /api/v1/cli_events","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/cli_events","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"cli_events"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"cli_event","name__orig":"cli_event","Name":"CliEvent","name_":"cli_event","name-":"cli-event","NAME":"CLI_EVENT","index$":177}, {"active":true,"entity":"cli_event","key$":"BasicCliEventFlow","kind":"basic","name":"BasicCliEventFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"cli_event_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'CliEvent', {"POST /api/v1/cli_events":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true,"required":["event","properties"],"properties":{"event":{"type":"string","enum":["cli_command","cli_command_started","cli_command_completed"],"key$":"event"},"properties":{"type":"object","required":["command","invocation_id","cli_name","cli_version","os","arch","agent_mode","json_mode"],"properties":{"command":{"type":"string","maxLength":160},"invocation_id":{"type":"string","pattern":"^[0-9a-f]{32}$"},"cli_name":{"type":"string","enum":["com","vex"]},"cli_version":{"type":"string","maxLength":100},"os":{"type":"string","enum":["linux","macos","windows"]},"arch":{"type":"string","enum":["x86_64","aarch64"]},"agent_mode":{"type":"boolean"},"json_mode":{"type":"boolean"},"success":{"type":"boolean","description":"Required for cli_command and legacy completion events"},"duration_ms":{"type":"integer","minimum":0,"description":"Required for cli_command and legacy completion events"}},"key$":"properties"}}}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"cli_event.create.0":"GET-only live run: needs POST /api/v1/cli_events"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const cli_event_ref01_ent = client.CliEvent()
    let cli_event_ref01_data = setup.data.new.cli_event['cli_event_ref01']

    cli_event_ref01_data = (await cli_event_ref01_ent.create(cli_event_ref01_data)).data()
    assert(null != cli_event_ref01_data)


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
      '../../../../.sdk/test/entity/cli_event/CliEventTestData.json')

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
    ['cli_event01','cli_event02','cli_event03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_CLI_EVENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_CLI_EVENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_CLI_EVENT_ENTID']
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
  
