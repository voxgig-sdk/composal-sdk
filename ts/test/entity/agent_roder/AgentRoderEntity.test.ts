

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


describe('AgentRoderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AgentRoder()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_roder.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"agent_roder","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/agent/roder/browser_executor_authorization","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/agent/roder/browser_executor_authorization","q":{"$action":"browser_executor_authorization"},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"browser_executor_authorization"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["checkpoint_handoff","github_repository","organization_id","repository_slug","session_purpose"],"co":{"id":"POST /api/v1/agent/roder/session","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/agent/roder/session","q":{"$action":"session"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"session"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /api/v1/agent/roder/workspace_authorization","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/v1/agent/roder/workspace_authorization","q":{"$action":"workspace_authorization"},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"workspace_authorization"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/agent/roder/browser_authorization","source":"openapi3","version":2},"g":{"query":[{"a":true,"explode":true,"k":"query","n":"organization_id","or":"organization_id","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/agent/roder/browser_authorization","q":{"$action":"browser_authorization","exist":["organization_id"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent"},{"lit":"roder"},{"lit":"browser_authorization"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"agent_roder","name__orig":"agent_roder","Name":"AgentRoder","name_":"agent_roder","name-":"agent-roder","NAME":"AGENT_RODER","index$":41}, {"active":true,"entity":"agent_roder","key$":"BasicAgentRoderFlow","kind":"basic","name":"BasicAgentRoderFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"agent_roder_ref01"},"m":{},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"agent_roder_ref01","srcdatavar":"agent_roder_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_roder_ref01"}}],"unreachable":true}]}, 'AgentRoder', {"POST /api/v1/agent/roder/browser_executor_authorization":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[]},"POST /api/v1/agent/roder/session":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["organization_id"],"properties":{"organization_id":{"type":"string"},"repository_slug":{"type":"string","nullable":true},"github_repository":{"type":"string","nullable":true,"description":"Internal operator access to an explicit owner/name connected to this organization. Uses GitHub authentication directly for the normal coding workspace."},"session_purpose":{"type":"string","enum":["coding","browser_setup","onboarding"],"default":"coding"},"checkpoint_handoff":{"type":"object","additionalProperties":false,"required":["organization_slug","repository_slug","change_id","expected_commit_id","agent_checkpoint_id","purpose","max_bytes"],"properties":{"organization_slug":{"type":"string"},"repository_slug":{"type":"string"},"change_id":{"type":"string"},"expected_commit_id":{"type":"string"},"agent_checkpoint_id":{"type":"string"},"purpose":{"type":"string","enum":["ask_why","continue"]},"max_bytes":{"type":"integer","minimum":1,"maximum":24576}}}},"additionalProperties":true,"x-ref":"#/components/schemas/AgentRoderSessionPayload"}}}},"parameters":[]},"POST /api/v1/agent/roder/workspace_authorization":{"protocol":"http","parameters":[]},"GET /api/v1/agent/roder/browser_authorization":{"protocol":"http","parameters":[{"in":"query","name":"organization_id","required":true,"schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"agent_roder.create.0":"GET-only live run: needs POST /api/v1/agent/roder/browser_executor_authorization"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_roder_ref01_data = Object.values(setup.data.existing.agent_roder)[0] as any

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
      '../../../../.sdk/test/entity/agent_roder/AgentRoderTestData.json')

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
    ['agent_roder01','agent_roder02','agent_roder03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_AGENT_RODER_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_AGENT_RODER_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_AGENT_RODER_ENTID']
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
  
