

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


describe('AlertRuleEventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COMPOSAL_TEST_LIVE=TRUE.
  afterEach(liveDelay('COMPOSAL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ComposalSDK.test()
    const ent = testsdk.AlertRuleEvent()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ComposalSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AlertRuleEvent().load({"alert_rule_id":1,"space_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COMPOSAL_TEST_LIVE
    for (const op of ['create', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'alert_rule_event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"alert_rule_event","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"alert_rule_id","or":"alert_rule_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge","q":{"$action":"acknowledge","exist":["alert_rule_id","id","space_id"]},"r":{"param":{"alert_rule_id":"alert_rule_id","id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"alert_rules"},{"var":"alert_rule_id"},{"lit":"events"},{"var":"id"},{"lit":"acknowledge"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/resolve","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"alert_rule_id","or":"alert_rule_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/resolve","q":{"$action":"resolve","exist":["alert_rule_id","id","space_id"]},"r":{"param":{"alert_rule_id":"alert_rule_id","id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"alert_rules"},{"var":"alert_rule_id"},{"lit":"events"},{"var":"id"},{"lit":"resolve"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":false,"co":{"id":"POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/silence","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"alert_rule_id","or":"alert_rule_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"POST","o":"/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/silence","q":{"$action":"silence","exist":["alert_rule_id","id","space_id"]},"r":{"param":{"alert_rule_id":"alert_rule_id","id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"alert_rules"},{"var":"alert_rule_id"},{"lit":"events"},{"var":"id"},{"lit":"silence"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"alert_rule_id","or":"alert_rule_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events","q":{"exist":["alert_rule_id","space_id"]},"r":{"param":{"alert_rule_id":"alert_rule_id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"alert_rules"},{"var":"alert_rule_id"},{"lit":"events"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"alert_rule_id","or":"alert_rule_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}","q":{"exist":["alert_rule_id","id","space_id"]},"r":{"param":{"alert_rule_id":"alert_rule_id","id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"alert_rules"},{"var":"alert_rule_id"},{"lit":"events"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"alert_rule_id","or":"alert_rule_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events","q":{"exist":["alert_rule_id","space_id"]},"r":{"param":{"alert_rule_id":"alert_rule_id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"alert_rules"},{"var":"alert_rule_id"},{"lit":"events"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"alert_rule_id","or":"alert_rule_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"param","n":"space_id","or":"space_id","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"DELETE","o":"/api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}","q":{"exist":["alert_rule_id","id","space_id"]},"r":{"param":{"alert_rule_id":"alert_rule_id","id":"id","space_id":"space_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"observability"},{"lit":"spaces"},{"var":"space_id"},{"lit":"alert_rules"},{"var":"alert_rule_id"},{"lit":"events"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"","code":"","codecell":"","flat":"","inline":"","label":"","link":"","raw":"","text":"","vendor":true}},"key$":"alert_rule_event","name__orig":"alert_rule_event","Name":"AlertRuleEvent","name_":"alert_rule_event","name-":"alert-rule-event","NAME":"ALERT_RULE_EVENT","index$":73}, {"active":true,"entity":"alert_rule_event","key$":"BasicAlertRuleEventFlow","kind":"basic","name":"BasicAlertRuleEventFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"alert_rule_event_ref01"},"m":{"alert_rule_id":"alert_rule01","space_id":"space01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"alert_rule_event_ref01","srcdatavar":"alert_rule_event_ref01_data","suffix":"_dt0"},"m":{"id":"alert_rule_event01","space_id":"space01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-alert_rule_event_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"alert_rule_event_ref01","suffix":"_rm0"},"m":{"alert_rule_id":"alert_rule01","id":"alert_rule_event01","space_id":"space01"},"o":"remove","s":[],"v":[],"index$":2}]}, 'AlertRuleEvent', {"POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"alert_rule_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/resolve":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"alert_rule_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/silence":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"alert_rule_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","additionalProperties":true}}}},"parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"alert_rule_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"alert_rule_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]},"GET /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"alert_rule_id","in":"path","required":true,"schema":{"type":"string"},"index$":1}]},"DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}":{"protocol":"http","parameters":[{"name":"space_id","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"alert_rule_id","in":"path","required":true,"schema":{"type":"string"},"index$":1},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"alert_rule_event.create.0":"GET-only live run: needs POST /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}/acknowledge","alert_rule_event.load.1":"GET-only live run: reads a record only alert_rule_event.create.0 gives","alert_rule_event.remove.2":"GET-only live run: needs DELETE /api/v1/observability/spaces/{space_id}/alert_rules/{alert_rule_id}/events/{id}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const alert_rule_event_ref01_ent = client.AlertRuleEvent()
    let alert_rule_event_ref01_data = setup.data.new.alert_rule_event['alert_rule_event_ref01']
    alert_rule_event_ref01_data['alert_rule_id'] = setup.idmap['alert_rule01']
    alert_rule_event_ref01_data['space_id'] = setup.idmap['space01']

    alert_rule_event_ref01_data = (await alert_rule_event_ref01_ent.create(alert_rule_event_ref01_data)).data()
    assert(null != alert_rule_event_ref01_data.id)


    // LOAD
    const alert_rule_event_ref01_match_dt0: any = {}
    alert_rule_event_ref01_match_dt0.id = alert_rule_event_ref01_data.id
    alert_rule_event_ref01_match_dt0['space_id'] = setup.idmap['space_id'] ?? setup.idmap['space01']
    const alert_rule_event_ref01_data_dt0 = (await alert_rule_event_ref01_ent.load(alert_rule_event_ref01_match_dt0)).data()
    assert(alert_rule_event_ref01_data_dt0.id === alert_rule_event_ref01_data.id)


    // REMOVE
    const alert_rule_event_ref01_match_rm0: any = { id: alert_rule_event_ref01_data.id }
    alert_rule_event_ref01_match_rm0['alert_rule_id'] = setup.idmap['alert_rule_id'] ?? setup.idmap['alert_rule01']
    alert_rule_event_ref01_match_rm0['space_id'] = setup.idmap['space_id'] ?? setup.idmap['space01']
    await alert_rule_event_ref01_ent.remove(alert_rule_event_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/alert_rule_event/AlertRuleEventTestData.json')

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
    ['alert_rule_event01','alert_rule_event02','alert_rule_event03','alert_rule01','space01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID': idmap,
    'COMPOSAL_TEST_LIVE': 'FALSE',
    'COMPOSAL_TEST_EXPLAIN': 'FALSE',
    'COMPOSAL_APIKEY': '',
  })

  idmap = env['COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID']

  const live = 'TRUE' === env.COMPOSAL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COMPOSAL_TEST_ALERT_RULE_EVENT_ENTID']
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
  
